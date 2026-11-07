// Mécaniques de jeu : XP, niveaux, série, badges et chronos.
// Tout est recalculé à partir des essais déjà enregistrés : aucune donnée nouvelle n'est nécessaire
// pour l'XP ; seuls les meilleurs temps sont gardés à part (clé locale séparée).
// La note officielle (sur 5) n'est jamais modifiée par ces bonus.
import { CATALOG, ACTIVITIES } from '../data/index.js';
import { sessionStats } from '../scoring/scoring.js';

export const BADGES = [
  { id: 'first', icon: '🚀', title: 'Décollage', desc: 'Terminer une première activité.' },
  { id: 'perfect', icon: '💎', title: 'Sans faute', desc: 'Obtenir 5/5 à une activité.' },
  { id: 'sharp', icon: '🎯', title: 'Tireur d’élite', desc: '5 activités réussies à 5/5 dès le premier essai.' },
  { id: 'streak3', icon: '🔥', title: 'En feu', desc: '3 activités d’affilée à au moins 4/5.' },
  { id: 'streak7', icon: '☄️', title: 'Inarrêtable', desc: '7 activités d’affilée à au moins 4/5.' },
  { id: 'session', icon: '🏅', title: 'Séance bouclée', desc: 'Terminer les 4 activités d’une séance.' },
  { id: 'ten', icon: '📚', title: 'Studieux', desc: 'Terminer 10 activités.' },
  { id: 'module', icon: '🏆', title: 'Maître d’un module', desc: 'Terminer toutes les séances d’un module.' },
  { id: 'speed', icon: '⚡', title: 'Éclair', desc: 'Réussir une activité à 5/5 en moins de 45 secondes.' },
  { id: 'comeback', icon: '💪', title: 'Persévérant', desc: 'Passer de moins de 3/5 à 5/5 sur une même activité.' },
  { id: 'half', icon: '🌗', title: 'Mi-parcours', desc: 'Terminer 60 activités.' },
  { id: 'all', icon: '👑', title: 'Légende InfoPlay', desc: 'Terminer les 120 activités.' },
];
export const badgeById = Object.fromEntries(BADGES.map((b) => [b.id, b]));

// Niveau n → n+1 : 120 + 40·(n−1) XP.
const needFor = (lvl) => 120 + 40 * (lvl - 1);
export const RANKS = ['Débutant', 'Apprenti', 'Explorateur', 'Codeur', 'Technicien', 'Ingénieur', 'Expert', 'Maître', 'Génie'];

// ---------- meilleurs temps ----------
const TKEY = 'infoplay.times.v1';
function readTimes() { try { return JSON.parse(localStorage.getItem(TKEY) || '{}') || {}; } catch { return {}; } }
export function bestTime(pid, actId) { return readTimes()[pid]?.[actId] ?? null; }
/** Enregistre un temps (ms) si c'est un record pour une réussite d'au moins 4/5. Retourne true si record. */
export function saveTime(pid, actId, ms, score) {
  if (score < 4 || !(ms > 0)) return false;
  const all = readTimes(); const mine = all[pid] || (all[pid] = {}); const prev = mine[actId];
  if (prev != null && prev <= ms) return false;
  mine[actId] = Math.round(ms); try { localStorage.setItem(TKEY, JSON.stringify(all)); } catch {}
  return prev != null; // un premier temps n'est pas annoncé comme « record »
}
export const fmtTime = (ms) => { const s = Math.max(0, Math.round(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };

/** État de jeu d'un élève. rec(actId) → { attempts: [...] } | undefined */
export function computeGame(rec, pid = null) {
  const times = pid ? readTimes()[pid] || {} : {};
  const all = []; let done = 0, perfectActs = 0, firstPerfect = 0, comeback = false, xp = 0, speed = false;
  for (const a of ACTIVITIES) {
    const at = rec(a.id)?.attempts || []; if (!at.length) continue;
    done++; const best = Math.max(...at.map((x) => x.score));
    xp += Math.round(best * 20); // jusqu'à 100 XP par activité
    if (best === 5) { perfectActs++; xp += 20; }
    if (at[0].score === 5) { firstPerfect++; xp += 30; }
    if (best === 5 && Math.min(...at.map((x) => x.score)) < 3) comeback = true;
    if (best === 5 && times[a.id] != null && times[a.id] < 45000) speed = true;
    at.forEach((x) => all.push({ t: x.completedAt || '', s: x.score }));
  }
  all.sort((p, q) => (p.t < q.t ? -1 : p.t > q.t ? 1 : 0));
  let streak = 0, bestStreak = 0; for (const x of all) { streak = x.s >= 4 ? streak + 1 : 0; bestStreak = Math.max(bestStreak, streak); }
  let sessionsDone = 0, modulesDone = 0;
  for (const m of CATALOG) { let md = true; for (const s of m.sessions) { if (sessionStats(s, rec).status === 'done') sessionsDone++; else md = false; } if (md) modulesDone++; }
  xp += sessionsDone * 60 + modulesDone * 250 + bestStreak * 10;

  let level = 1, rest = xp; while (rest >= needFor(level)) { rest -= needFor(level); level++; }
  const unlocked = new Set();
  if (done >= 1) unlocked.add('first'); if (perfectActs >= 1) unlocked.add('perfect'); if (firstPerfect >= 5) unlocked.add('sharp');
  if (bestStreak >= 3) unlocked.add('streak3'); if (bestStreak >= 7) unlocked.add('streak7'); if (sessionsDone >= 1) unlocked.add('session');
  if (done >= 10) unlocked.add('ten'); if (modulesDone >= 1) unlocked.add('module'); if (speed) unlocked.add('speed'); if (comeback) unlocked.add('comeback');
  if (done >= 60) unlocked.add('half'); if (done >= ACTIVITIES.length) unlocked.add('all');
  return { xp, level, into: rest, need: needFor(level), pct: Math.round((rest / needFor(level)) * 100), rank: RANKS[Math.min(RANKS.length - 1, Math.floor((level - 1) / 2))], streak, bestStreak, done, perfectActs, firstPerfect, sessionsDone, modulesDone, badges: unlocked };
}

/** Différence avant/après un essai : XP gagnée, montée de niveau, nouveaux badges. */
export function diffGame(before, after) {
  return { xpGain: after.xp - before.xp, levelUp: after.level > before.level, newBadges: [...after.badges].filter((b) => !before.badges.has(b)).map((id) => badgeById[id]) };
}
