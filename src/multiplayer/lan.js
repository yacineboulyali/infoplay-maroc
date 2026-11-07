// Gestionnaire multijoueur sur réseau local (LAN).
// Fonctionne en double canal :
// 1) API HTTP (/api/lan/heartbeat) si le serveur local (serve.ps1 / lan-server.mjs) est actif.
// 2) BroadcastChannel + localStorage pour la synchronisation instantanée entre onglets/fenêtres.

const LAN_CHANNEL = 'infoplay_lan_bus';
const STORAGE_KEY = 'infoplay_lan_peers';
const HEARTBEAT_INTERVAL = 2500;
const PEER_TIMEOUT_MS = 12000;

export class LanManager {
  constructor() {
    this.peerId = 'peer_' + Math.random().toString(36).slice(2, 9);
    this.peers = new Map(); // peerId -> peerData
    this.challenges = [];
    this.messages = [];
    this.currentUser = null;
    this.timer = null;
    this.listeners = new Set();
    this.serverOnline = false;
    this.bc = null;

    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        this.bc = new BroadcastChannel(LAN_CHANNEL);
        this.bc.onmessage = (e) => this.handleLocalMessage(e.data);
      }
    } catch {}

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (e) => {
        if (e.key === STORAGE_KEY && e.newValue) {
          try {
            const data = JSON.parse(e.newValue);
            this.mergePeers(data);
          } catch {}
        }
      });
      window.addEventListener('beforeunload', () => {
        this.broadcast({ type: 'leave', peerId: this.peerId });
      });
    }
  }

  subscribe(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  notify() {
    this.listeners.forEach((fn) => {
      try { fn(this.getState()); } catch {}
    });
  }

  getState() {
    this.pruneStale();
    const all = Array.from(this.peers.values());
    all.sort((a, b) => (b.score || 0) - (a.score || 0));
    return {
      serverOnline: this.serverOnline,
      peerId: this.peerId,
      playerCount: all.length,
      players: all,
      challenges: this.challenges,
      messages: this.messages,
    };
  }

  start(user) {
    this.currentUser = user || { displayName: 'Joueur ' + this.peerId.slice(-3), score: 0 };
    this.touchSelf();
    this.sync();
    if (!this.timer) {
      this.timer = setInterval(() => this.sync(), HEARTBEAT_INTERVAL);
    }
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    this.broadcast({ type: 'leave', peerId: this.peerId });
  }

  updateProfile(user) {
    if (!user) return;
    this.currentUser = { ...this.currentUser, ...user };
    this.touchSelf();
    this.sync();
  }

  setActivity(actId, actTitle) {
    if (!this.currentUser) return;
    this.currentUser.currentActivityId = actId;
    this.currentUser.currentActivityTitle = actTitle || '';
    this.touchSelf();
    this.sync();
  }

  touchSelf() {
    const me = {
      peerId: this.peerId,
      name: this.currentUser?.displayName || 'Anonyme',
      avatar: this.currentUser?.avatar || '🎮',
      score: this.currentUser?.score || 0,
      className: this.currentUser?.className || '',
      activity: this.currentUser?.currentActivityTitle || 'Dans le salon',
      activityId: this.currentUser?.currentActivityId || null,
      lastSeen: Date.now(),
      isMe: true,
    };
    this.peers.set(this.peerId, me);
    this.notify();
  }

  async sync() {
    this.touchSelf();
    const payload = {
      peerId: this.peerId,
      name: this.currentUser?.displayName || 'Anonyme',
      avatar: this.currentUser?.avatar || '🎮',
      score: this.currentUser?.score || 0,
      className: this.currentUser?.className || '',
      activity: this.currentUser?.currentActivityTitle || 'Dans le salon',
      activityId: this.currentUser?.currentActivityId || null,
    };

    // 1. Broadcast vers les autres onglets
    this.broadcast({ type: 'heartbeat', peer: payload, timestamp: Date.now() });

    // 2. Appel au serveur local (/api/lan/heartbeat)
    try {
      const ctrl = new AbortController();
      const tid = setTimeout(() => ctrl.abort(), 1800);
      const res = await fetch('/api/lan/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      clearTimeout(tid);
      if (res.ok) {
        const data = await res.json();
        this.serverOnline = true;
        if (Array.isArray(data.players)) {
          data.players.forEach((p) => {
            if (p.peerId !== this.peerId) {
              this.peers.set(p.peerId, { ...p, isMe: false });
            }
          });
        }
        if (Array.isArray(data.challenges)) this.challenges = data.challenges;
        if (Array.isArray(data.messages)) this.messages = data.messages;
        this.notify();
        return;
      }
    } catch {
      this.serverOnline = false;
    }

    // Si le serveur HTTP ne répond pas, on synchronise via localStorage
    this.syncLocalStorage();
  }

  syncLocalStorage() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const data = raw ? JSON.parse(raw) : {};
      data[this.peerId] = {
        peerId: this.peerId,
        name: this.currentUser?.displayName || 'Anonyme',
        avatar: this.currentUser?.avatar || '🎮',
        score: this.currentUser?.score || 0,
        className: this.currentUser?.className || '',
        activity: this.currentUser?.currentActivityTitle || 'Dans le salon',
        activityId: this.currentUser?.currentActivityId || null,
        lastSeen: Date.now(),
      };
      // Nettoie les anciens
      const now = Date.now();
      for (const k in data) {
        if (now - data[k].lastSeen > PEER_TIMEOUT_MS) delete data[k];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      this.mergePeers(data);
    } catch {}
  }

  mergePeers(dict) {
    const now = Date.now();
    for (const [id, p] of Object.entries(dict)) {
      if (id !== this.peerId && now - (p.lastSeen || 0) < PEER_TIMEOUT_MS) {
        this.peers.set(id, { ...p, isMe: false });
      }
    }
    this.notify();
  }

  handleLocalMessage(msg) {
    if (!msg || typeof msg !== 'object') return;
    if (msg.peerId === this.peerId) return;

    if (msg.type === 'heartbeat' && msg.peer) {
      this.peers.set(msg.peer.peerId, {
        ...msg.peer,
        lastSeen: Date.now(),
        isMe: false,
      });
      this.notify();
    } else if (msg.type === 'leave') {
      this.peers.delete(msg.peerId);
      this.notify();
    } else if (msg.type === 'chat' && msg.message) {
      this.messages.unshift(msg.message);
      if (this.messages.length > 30) this.messages.pop();
      this.notify();
    } else if (msg.type === 'challenge' && msg.challenge) {
      this.challenges.unshift(msg.challenge);
      if (this.challenges.length > 10) this.challenges.pop();
      this.notify();
    }
  }

  broadcast(data) {
    if (this.bc) {
      try { this.bc.postMessage(data); } catch {}
    }
  }

  pruneStale() {
    const now = Date.now();
    for (const [id, p] of this.peers.entries()) {
      if (!p.isMe && now - (p.lastSeen || 0) > PEER_TIMEOUT_MS) {
        this.peers.delete(id);
      }
    }
  }

  async sendChat(text) {
    const msg = {
      id: 'm_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      peerId: this.peerId,
      author: this.currentUser?.displayName || 'Anonyme',
      avatar: this.currentUser?.avatar || '💬',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    this.messages.unshift(msg);
    this.broadcast({ type: 'chat', message: msg });

    try {
      await fetch('/api/lan/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(msg),
      });
    } catch {}

    this.notify();
    return msg;
  }

  async createChallenge(activityId, title) {
    const ch = {
      id: 'ch_' + Date.now(),
      creatorId: this.peerId,
      creatorName: this.currentUser?.displayName || 'Anonyme',
      activityId,
      title,
      timestamp: Date.now(),
      participants: [this.peerId],
    };
    this.challenges.unshift(ch);
    this.broadcast({ type: 'challenge', challenge: ch });

    try {
      await fetch('/api/lan/challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ch),
      });
    } catch {}

    this.notify();
    return ch;
  }
}

export const lanManager = new LanManager();
