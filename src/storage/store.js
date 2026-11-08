// Stockage local versionné. Aucune donnée ne quitte l'ordinateur.
export const SCHEMA = 1;
export const KEY = 'infoplay.v1';
const ACT_RE = /^m([1-4]|205)-s\d{1,2}-a[1-4]$/; // Tronc Commun (m1–m4) et parcours OFPPT M205
const ID_RE = /^[A-Za-z0-9_-]{1,64}$/;
export const MAX_IMPORT_BYTES = 5 * 1024 * 1024;
const uid = () => (globalThis.crypto && crypto.randomUUID ? crypto.randomUUID() : 'id-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10));
export function memoryAdapter() { const m = {}; return { persistent: false, get: (k) => m[k] ?? null, set: (k, v) => { m[k] = v; }, del: (k) => { delete m[k]; } }; }
export function localAdapter() {
  try { const t = '__ip_test'; localStorage.setItem(t, '1'); localStorage.removeItem(t);
    return { persistent: true, get: (k) => localStorage.getItem(k), set: (k, v) => localStorage.setItem(k, v), del: (k) => localStorage.removeItem(k) };
  } catch { return memoryAdapter(); }
}
const blank = () => ({ schemaVersion: SCHEMA, installationId: uid(), profiles: [], activeProfileId: null, progressByProfile: {} });
const cleanStr = (s, max) => String(s ?? '').replace(/[\u0000-\u001f\u007f<>]/g, '').trim().slice(0, max);
const isoOr = (s) => { const d = new Date(s); return isNaN(d) ? new Date().toISOString() : d.toISOString(); };

/** Valide et nettoie un objet de sauvegarde. Retourne {ok, error, data, ignored}. */
export function validateBackup(obj, isActivity = () => true) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return { ok: false, error: 'Le fichier ne contient pas une sauvegarde InfoPlay.' };
  if (obj.app !== undefined && obj.app !== 'InfoPlay Maroc') return { ok: false, error: 'Ce fichier ne provient pas d’InfoPlay Maroc.' };
  if (obj.schemaVersion !== SCHEMA) return { ok: false, error: 'Version de sauvegarde non prise en charge (' + String(obj.schemaVersion) + ').' };
  if (!Array.isArray(obj.profiles) || obj.profiles.length > 200) return { ok: false, error: 'Liste de profils invalide.' };
  const profiles = []; const progress = {}; let ignored = 0;
  const seen = new Set();
  for (const p of obj.profiles) {
    if (!p || typeof p !== 'object' || typeof p.id !== 'string' || !ID_RE.test(p.id) || seen.has(p.id)) { ignored++; continue; }
    const name = cleanStr(p.displayName, 24); if (!name) { ignored++; continue; }
    seen.add(p.id);
    profiles.push({ id: p.id, displayName: name, className: cleanStr(p.className, 12), createdAt: isoOr(p.createdAt), preferences: cleanPrefs(p.preferences) });
    const src = obj.progressByProfile && typeof obj.progressByProfile === 'object' ? obj.progressByProfile[p.id] : null;
    const out = {};
    if (src && typeof src === 'object') for (const k of Object.keys(src)) {
      if (!ACT_RE.test(k) || !isActivity(k)) { ignored++; continue; }
      const at = Array.isArray(src[k]?.attempts) ? src[k].attempts.slice(0, 100) : [];
      const good = [];
      for (const a of at) {
        if (!a || typeof a.id !== 'string' || !ID_RE.test(a.id) || typeof a.score !== 'number' || !isFinite(a.score)) { ignored++; continue; }
        good.push({ id: a.id, score: Math.round(Math.min(5, Math.max(0, a.score)) * 10) / 10, maxScore: 5, completedAt: isoOr(a.completedAt), contentVersion: Number.isInteger(a.contentVersion) && a.contentVersion > 0 ? a.contentVersion : 1 });
      }
      good.sort((x, y) => x.completedAt.localeCompare(y.completedAt));
      if (good.length) out[k] = { attempts: good };
    }
    progress[p.id] = out;
  }
  return { ok: true, data: { profiles, progressByProfile: progress }, ignored };
}
function cleanPrefs(p) {
  p = p && typeof p === 'object' ? p : {};
  const volume = Number(p.volume);
  return {
    reducedMotion: !!p.reducedMotion,
    largeText: !!p.largeText,
    highContrast: !!p.highContrast,
    soundEnabled: p.soundEnabled === undefined ? true : !!p.soundEnabled,
    hoverSound: !!p.hoverSound,
    volume: Number.isFinite(volume) ? Math.min(1, Math.max(0, volume)) : 0.45,
  };
}

export function createStore(adapter = localAdapter(), isActivity = () => true) {
  let s; let recovered = false;
  function load() {
    const raw = adapter.get(KEY);
    if (!raw) return blank();
    try {
      const o = JSON.parse(raw);
      const v = validateBackup({ ...o, app: undefined }, isActivity);
      if (!v.ok) throw new Error(v.error);
      return { schemaVersion: SCHEMA, installationId: typeof o.installationId === 'string' ? o.installationId.slice(0, 64) : uid(), profiles: v.data.profiles, progressByProfile: v.data.progressByProfile, activeProfileId: v.data.profiles.some((p) => p.id === o.activeProfileId) ? o.activeProfileId : null };
    } catch (e) {
      try { adapter.set(KEY + '.corrupt', raw); } catch { /* ignore */ }
      recovered = true; return blank();
    }
  }
  s = load();
  let saveError = false;
  const save = () => { try { adapter.set(KEY, JSON.stringify(s)); saveError = false; } catch { saveError = true; } };
  const api = {
    get persistent() { return adapter.persistent !== false && !saveError; },
    get recovered() { return recovered; },
    state: () => s,
    profiles: () => s.profiles,
    active: () => s.profiles.find((p) => p.id === s.activeProfileId) || null,
    setActive(id) { s.activeProfileId = s.profiles.some((p) => p.id === id) ? id : null; save(); },
    logout() { s.activeProfileId = null; save(); },
    createProfile(name, className = '') {
      const n = cleanStr(name, 24); if (!n) throw new Error('Le prénom ou pseudo est obligatoire.');
      if (s.profiles.length >= 200) throw new Error('Trop de profils sur cet ordinateur.');
      const p = { id: uid().replace(/[^A-Za-z0-9_-]/g, '').slice(0, 40), displayName: n, className: cleanStr(className, 12), createdAt: new Date().toISOString(), preferences: cleanPrefs({}) };
      s.profiles.push(p); s.progressByProfile[p.id] = {}; s.activeProfileId = p.id; save(); return p;
    },
    updateProfile(id, patch) {
      const p = s.profiles.find((x) => x.id === id); if (!p) return;
      if (patch.displayName !== undefined) { const n = cleanStr(patch.displayName, 24); if (!n) throw new Error('Le prénom ou pseudo est obligatoire.'); p.displayName = n; }
      if (patch.className !== undefined) p.className = cleanStr(patch.className, 12);
      if (patch.preferences) p.preferences = cleanPrefs({ ...p.preferences, ...patch.preferences });
      save();
    },
    deleteProfile(id) { s.profiles = s.profiles.filter((p) => p.id !== id); delete s.progressByProfile[id]; if (s.activeProfileId === id) s.activeProfileId = null; save(); },
    record(pid, actId) { return (s.progressByProfile[pid] || {})[actId]; },
    /** Ajoute un essai. Le premier essai n'est jamais modifié ensuite. */
    recordAttempt(pid, actId, score, contentVersion = 1) {
      if (!s.profiles.some((p) => p.id === pid)) throw new Error('Profil inconnu.');
      if (!ACT_RE.test(actId)) throw new Error('Activité inconnue.');
      const prog = s.progressByProfile[pid] || (s.progressByProfile[pid] = {});
      const rec = prog[actId] || (prog[actId] = { attempts: [] });
      const at = { id: uid().replace(/[^A-Za-z0-9_-]/g, '').slice(0, 40), score: Math.round(Math.min(5, Math.max(0, score)) * 10) / 10, maxScore: 5, completedAt: new Date().toISOString(), contentVersion };
      rec.attempts.push(at); save(); return rec.attempts.length;
    },
    first(pid, actId) { const r = api.record(pid, actId); return r && r.attempts.length ? r.attempts[0].score : null; },
    best(pid, actId) { const r = api.record(pid, actId); return r && r.attempts.length ? Math.max(...r.attempts.map((a) => a.score)) : null; },
    exportJSON(ids) {
      const set = ids ? new Set(ids) : null;
      const profiles = s.profiles.filter((p) => !set || set.has(p.id));
      const progress = {}; for (const p of profiles) progress[p.id] = s.progressByProfile[p.id] || {};
      return JSON.stringify({ app: 'InfoPlay Maroc', schemaVersion: SCHEMA, exportedAt: new Date().toISOString(), installationId: s.installationId, profiles, progressByProfile: progress }, null, 1);
    },
    /** Fusion sans écrasement : profils nouveaux ajoutés, essais ajoutés par identifiant. */
    importJSON(text) {
      if (typeof text !== 'string' || text.length > MAX_IMPORT_BYTES) return { ok: false, error: 'Fichier trop volumineux (maximum 5 Mo).' };
      let obj; try { obj = JSON.parse(text); } catch { return { ok: false, error: 'Fichier illisible : ce n’est pas un JSON valide.' }; }
      const v = validateBackup(obj, isActivity); if (!v.ok) return v;
      const rep = { ok: true, profilesAdded: 0, profilesMerged: 0, attemptsAdded: 0, ignored: v.ignored };
      for (const p of v.data.profiles) {
        const exists = s.profiles.find((x) => x.id === p.id);
        if (!exists) { s.profiles.push(p); s.progressByProfile[p.id] = {}; rep.profilesAdded++; } else rep.profilesMerged++;
        const dst = s.progressByProfile[p.id] || (s.progressByProfile[p.id] = {});
        for (const [k, r] of Object.entries(v.data.progressByProfile[p.id] || {})) {
          const rec = dst[k] || (dst[k] = { attempts: [] }); const ids = new Set(rec.attempts.map((a) => a.id));
          for (const a of r.attempts) if (!ids.has(a.id)) { rec.attempts.push(a); rep.attemptsAdded++; }
          rec.attempts.sort((x, y) => x.completedAt.localeCompare(y.completedAt));
        }
      }
      save(); return rep;
    },
    resetAll() { s = blank(); save(); },
    csv(catalogActs) {
      const esc = (v) => { v = String(v ?? ''); if (/^[=+\-@\t\r]/.test(v)) v = "'" + v; return '"' + v.replace(/"/g, '""') + '"'; };
      const rows = [['Profil', 'Classe', 'Module', 'Séance', 'Activité', 'Titre', 'Premier essai', 'Meilleur essai', 'Nombre d’essais'].map(esc).join(';')];
      for (const p of s.profiles) for (const a of catalogActs) { const r = (s.progressByProfile[p.id] || {})[a.id]; if (!r || !r.attempts.length) continue;
        rows.push([p.displayName, p.className, a.moduleId, a.sessionId, a.id, a.title, String(r.attempts[0].score).replace('.', ','), String(Math.max(...r.attempts.map((x) => x.score))).replace('.', ','), r.attempts.length].map(esc).join(';')); }
      return '﻿' + rows.join('\r\n');
    },
  };
  return api;
}
