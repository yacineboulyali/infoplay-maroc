// Présence et progression des élèves sur le réseau local (LAN).
// Un navigateur ne peut pas « scanner » le réseau : un ordinateur hôte lance le serveur local
// (scripts/lan-server.mjs) et chaque élève ouvre son adresse. Chaque page envoie alors un
// battement de cœur (/api/lan/heartbeat) : le serveur connaît ainsi tous les élèves connectés.
// Sans serveur, les onglets d'un même ordinateur se voient via BroadcastChannel + localStorage.

const LAN_CHANNEL = 'infoplay_lan_bus';
const STORAGE_KEY = 'infoplay_lan_peers';
const DEVICE_KEY = 'infoplay_device_id';
const HEARTBEAT_INTERVAL = 2500;
export const ONLINE_MS = 12000; // au-delà : élève « inactif »
const ROSTER_MS = 10 * 60 * 1000; // au-delà : élève retiré de la liste de suivi

function deviceId() {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) { id = 'd' + Math.random().toString(36).slice(2, 8); localStorage.setItem(DEVICE_KEY, id); }
    return id;
  } catch { return 'd' + Math.random().toString(36).slice(2, 8); }
}

export class LanManager {
  constructor() {
    this.device = deviceId();
    this.peerId = this.device + '-obs';
    this.peers = new Map(); // peerId -> données (lastSeen exprimé avec l'horloge locale)
    this.challenges = [];
    this.messages = [];
    this.race = null; // { id, label, endsAt, durationMs, baseline, ended }
    this.serverInfo = null; // { ips: [...], port }
    this.currentUser = null;
    this.timer = null;
    this.listeners = new Set();
    this.serverOnline = false;
    this.bc = null;
    this.notifyQueued = false;

    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        this.bc = new BroadcastChannel(LAN_CHANNEL);
        this.bc.onmessage = (e) => this.handleLocalMessage(e.data);
      }
    } catch {}

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY && e.newValue) { try { this.mergePeers(JSON.parse(e.newValue)); } catch {} }
      });
      window.addEventListener('beforeunload', () => this.broadcast({ type: 'leave', peerId: this.peerId }));
    }
  }

  subscribe(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }

  // Regroupe les notifications rapprochées (un seul rafraîchissement par tâche).
  notify() {
    if (this.notifyQueued) return; this.notifyQueued = true;
    queueMicrotask(() => { this.notifyQueued = false; const st = this.getState(); this.listeners.forEach((fn) => { try { fn(st); } catch (e) { console.error(e); } }); });
  }

  getState() {
    this.pruneStale();
    const now = Date.now();
    const roster = Array.from(this.peers.values()).map((p) => ({ ...p, online: p.isMe || now - (p.lastSeen || 0) < ONLINE_MS }));
    roster.sort((a, b) => (b.score || 0) - (a.score || 0));
    const players = roster.filter((p) => p.online);
    return {
      serverOnline: this.serverOnline, serverInfo: this.serverInfo, peerId: this.peerId,
      playerCount: players.filter((p) => p.role !== 'observer').length, players, roster,
      challenges: this.challenges, messages: this.messages,
      race: this.race ? { ...this.race, remainingMs: Math.max(0, this.race.endsAt - now) } : null,
    };
  }

  /** Identité stable : un appareil + un profil = un seul élève (pas de doublon au rechargement). */
  setIdentity(profileId) {
    const next = this.device + '-' + (profileId || 'obs');
    if (next === this.peerId) return;
    this.broadcast({ type: 'leave', peerId: this.peerId });
    this.peers.delete(this.peerId);
    this.peerId = next;
  }

  start(user) {
    this.currentUser = { ...(this.currentUser || {}), ...(user || {}) };
    this.touchSelf();
    if (!this.timer) { this.sync(); this.timer = setInterval(() => this.sync(), HEARTBEAT_INTERVAL); }
  }

  stop() {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    this.broadcast({ type: 'leave', peerId: this.peerId });
  }

  updateProfile(user) {
    if (!user) return;
    this.currentUser = { ...this.currentUser, ...user };
    this.touchSelf();
    this.sync();
  }

  setActivity(actId, actTitle) {
    if (!this.currentUser) this.currentUser = {};
    if (this.currentUser.currentActivityId === actId) return;
    this.currentUser.currentActivityId = actId;
    this.currentUser.currentActivityTitle = actTitle || '';
    this.touchSelf();
  }

  selfPayload() {
    const u = this.currentUser || {};
    return {
      peerId: this.peerId,
      role: u.role || 'student',
      name: u.displayName || 'Anonyme',
      avatar: u.avatar || '🎮',
      score: u.score || 0,
      className: u.className || '',
      activity: u.currentActivityTitle || 'Dans le salon',
      activityId: u.currentActivityId || null,
      progress: u.progress || null,
      lastResult: u.lastResult || null,
    };
  }

  touchSelf() {
    this.peers.set(this.peerId, { ...this.selfPayload(), lastSeen: Date.now(), isMe: true });
    this.notify();
  }

  async sync() {
    this.touchSelf();
    const payload = this.selfPayload();
    this.broadcast({ type: 'heartbeat', peer: payload });

    try {
      const ctrl = new AbortController();
      const tid = setTimeout(() => ctrl.abort(), 1800);
      const res = await fetch('/api/lan/heartbeat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: ctrl.signal });
      clearTimeout(tid);
      if (res.ok) {
        const data = await res.json();
        const now = Date.now();
        this.serverOnline = true;
        if (Array.isArray(data.players)) {
          // L'âge (ageMs) est calculé par le serveur : pas de problème d'horloges différentes entre ordinateurs.
          data.players.forEach((p) => { if (p && p.peerId && p.peerId !== this.peerId) this.peers.set(p.peerId, { ...p, lastSeen: now - (p.ageMs || 0), isMe: false }); });
        }
        if (Array.isArray(data.challenges)) this.challenges = data.challenges;
        if (Array.isArray(data.messages)) this.messages = data.messages;
        this.race = data.race ? { ...data.race, endsAt: now + (data.race.remainingMs || 0) } : null;
        if (!this.serverInfo) this.fetchInfo();
        this.notify();
        return;
      }
    } catch {}
    this.serverOnline = false;
    this.syncLocalStorage();
  }

  async fetchInfo() {
    try { const r = await fetch('/api/lan/info'); if (r.ok) { this.serverInfo = await r.json(); this.notify(); } } catch {}
  }

  syncLocalStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : {};
      data[this.peerId] = { ...this.selfPayload(), lastSeen: Date.now() };
      const now = Date.now();
      for (const k in data) if (now - (data[k].lastSeen || 0) > ROSTER_MS) delete data[k];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      this.mergePeers(data);
    } catch {}
  }

  mergePeers(dict) {
    const now = Date.now();
    for (const [id, p] of Object.entries(dict)) {
      if (id !== this.peerId && now - (p.lastSeen || 0) < ROSTER_MS) {
        const known = this.peers.get(id);
        if (!known || (known.lastSeen || 0) <= (p.lastSeen || 0)) this.peers.set(id, { ...p, isMe: false });
      }
    }
    this.notify();
  }

  handleLocalMessage(msg) {
    if (!msg || typeof msg !== 'object' || msg.peerId === this.peerId) return;
    if (msg.type === 'heartbeat' && msg.peer && msg.peer.peerId !== this.peerId) {
      this.peers.set(msg.peer.peerId, { ...msg.peer, lastSeen: Date.now(), isMe: false });
      this.notify();
    } else if (msg.type === 'leave') {
      this.peers.delete(msg.peerId); this.notify();
    } else if (msg.type === 'chat' && msg.message) {
      this.messages.unshift(msg.message); if (this.messages.length > 30) this.messages.pop(); this.notify();
    } else if (msg.type === 'challenge' && msg.challenge) {
      this.challenges.unshift(msg.challenge); if (this.challenges.length > 10) this.challenges.pop(); this.notify();
    }
  }

  broadcast(data) { if (this.bc) { try { this.bc.postMessage(data); } catch {} } }

  pruneStale() {
    const now = Date.now();
    for (const [id, p] of this.peers.entries()) if (!p.isMe && now - (p.lastSeen || 0) > ROSTER_MS) this.peers.delete(id);
  }

  async post(path, body) {
    try {
      const r = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      return r.ok ? await r.json().catch(() => ({ ok: true })) : null;
    } catch { return null; }
  }

  /** Course chronométrée (nécessite le serveur local). */
  async startRace(minutes, label) {
    const r = await this.post('/api/lan/race', { action: 'start', minutes, label });
    if (r) await this.sync();
    return !!r;
  }
  async stopRace() {
    const r = await this.post('/api/lan/race', { action: 'stop' });
    if (r) await this.sync();
    return !!r;
  }

  async sendChat(text) {
    const msg = {
      id: 'm_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      peerId: this.peerId, author: this.currentUser?.displayName || 'Anonyme', avatar: this.currentUser?.avatar || '💬',
      text: String(text).trim().slice(0, 120), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    this.messages.unshift(msg);
    this.broadcast({ type: 'chat', message: msg });
    await this.post('/api/lan/chat', msg);
    this.notify();
    return msg;
  }

  async createChallenge(activityId, title) {
    const ch = { id: 'ch_' + Date.now(), creatorId: this.peerId, creatorName: this.currentUser?.displayName || 'Anonyme', activityId, title, timestamp: Date.now(), participants: [this.peerId] };
    this.challenges.unshift(ch);
    this.broadcast({ type: 'challenge', challenge: ch });
    await this.post('/api/lan/challenge', ch);
    this.notify();
    return ch;
  }
}

export const lanManager = new LanManager();
