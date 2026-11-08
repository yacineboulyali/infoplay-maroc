// Mécaniques « fondées sur la recherche » du parcours M205 — logique pure (sans DOM), testable sous Node.
//
// • Pratique de récupération (testing effect — Roediger & Karpicke, 2006) : on se teste au lieu de relire.
// • Répétition espacée en boîtes de Leitner (Cepeda et al., 2006) : une carte réussie revient plus tard,
//   une carte ratée revient tout de suite.
// • Indice de certitude et effet d’hypercorrection (Butterfield & Metcalfe, 2001) : une erreur commise
//   avec assurance, une fois corrigée, se retient particulièrement bien ; la calibration développe la métacognition.
// • Pratique entrelacée (Rohrer & Taylor, 2007) : le Défi mixte mélange les séances.
// • Objectifs proches et précis (Locke & Latham) : trois quêtes du jour.
// • Ludification à effets mesurés (Sailer & Homner, 2020) : points, niveaux, badges, récit professionnel,
//   retour immédiat ; besoins de compétence et d’autonomie (théorie de l’autodétermination, Ryan & Deci).
import { PRO, PRO_ACTIVITIES, PRO_PARTS } from '../data/pro/index.js';
import { sessionStats } from '../scoring/scoring.js';

export const BOX_DAYS = [0, 1, 3, 7, 16, 35]; // boîte 0 → révision immédiate … boîte 5 → ancrée
export const DAY = 86400000;
export const today = (t = Date.now()) => new Date(t).toISOString().slice(0, 10);

// ---------- cartes générées à partir des activités ----------
const pick = (arr, n, avoid, rnd) => { const pool = arr.filter((x) => x !== avoid); const out = []; while (pool.length && out.length < n) out.push(pool.splice(Math.floor(rnd() * pool.length), 1)[0]); return out; };

/** Cartes de révision d’une séance : question, bonne réponse, distracteurs, explication, provenance. */
export function cardsOf(session, rnd = Math.random) {
  const cards = [];
  for (const a of session.acts) {
    const d = a.data; const base = { sessionId: session.id, sessionIndex: session.index, actId: a.id, actTitle: a.title };
    if (a.type === 'match') {
      const rights = d.pairs.map((p) => p[1]);
      d.pairs.forEach(([l, r], i) => cards.push({ ...base, id: `${a.id}#${i}`, kind: 'Définition', q: `Que désigne « ${l} » ?`, answer: r, wrong: pick(rights, 3, r, rnd), why: `${l} : ${r}.` }));
    } else if (a.type === 'sort') {
      d.items.forEach(([label, ci, why], i) => cards.push({ ...base, id: `${a.id}#${i}`, kind: 'Classement', q: `${label} — dans quelle catégorie ?`, answer: d.cats[ci], wrong: d.cats.filter((_, k) => k !== ci).slice(0, 3), why: why || '' }));
    } else if (a.type === 'quiz') {
      d.qs.forEach(([q, opts, why], i) => cards.push({ ...base, id: `${a.id}#${i}`, kind: 'Question', q, answer: opts[0], wrong: opts.slice(1, 4), why }));
    } else if (a.type === 'fill') {
      d.lines.forEach((ln, i) => { const [t, why] = Array.isArray(ln) ? ln : [ln, '']; const m = t.match(/\[\[(.+?)\]\]/); if (!m) return; const o = m[1].split('|');
        cards.push({ ...base, id: `${a.id}#${i}`, kind: 'Compléter', q: t.replace(/\[\[(.+?)\]\]/g, '_____'), answer: o[0], wrong: o.slice(1, 4), why }); });
    } else if (a.type === 'order') {
      d.steps.forEach((st, i) => { if (i === d.steps.length - 1) return;
        cards.push({ ...base, id: `${a.id}#${i}`, kind: 'Étape suivante', q: `« ${a.title} » : quelle étape vient juste après « ${st} » ?`, answer: d.steps[i + 1], wrong: pick(d.steps, 3, d.steps[i + 1], rnd).filter((x) => x !== st).slice(0, 3), why: d.explain || '' }); });
    } else if (a.type === 'sim' && a.data.view === 'ribbon') {
      const paths = a.data.tasks.map((t) => t[4]);
      a.data.tasks.forEach((t, i) => cards.push({ ...base, id: `${a.id}#${i}`, kind: 'Simulator', q: t[0], answer: t[4].split('>').join(' › '), wrong: pick(paths, 3, t[4], rnd).map((p) => p.split('>').join(' › ')).filter((p) => p !== t[4].split('>').join(' › ')), why: t[2] || '' }));
    }
  }
  return cards.filter((c) => c.wrong.length >= 1);
}
export const ALL_CARDS = () => PRO.sessions.flatMap((s) => cardsOf(s, () => 0.42));

// ---------- état de révision (Leitner) ----------
const KEY = 'infoplay.pro.v1';
function readAll() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; } }
function writeAll(all) { try { localStorage.setItem(KEY, JSON.stringify(all)); } catch {} }
export function proState(pid) {
  const s = readAll()[pid] || {};
  return { cards: s.cards || {}, days: s.days || {}, defiBest: s.defiBest || 0, calib: s.calib || { n: 0, ok: 0 } };
}
function saveState(pid, st) { const all = readAll(); all[pid] = st; writeAll(all); }

/** Séances « ouvertes » à la révision : celles où l’élève a au moins tenté une activité. */
export function openedSessions(rec) { return PRO.sessions.filter((s) => s.acts.some((a) => rec(a.id)?.attempts.length)); }

/** Cartes dues aujourd’hui (nouvelles comprises, au plus `newMax` nouvelles), les plus en retard d’abord. */
export function dueCards(pid, rec, { now = Date.now(), newMax = 8, rnd = Math.random } = {}) {
  const st = proState(pid); const due = []; const fresh = [];
  for (const s of openedSessions(rec)) for (const c of cardsOf(s, rnd)) {
    const k = st.cards[c.id];
    if (!k) fresh.push(c); else if (k.due <= now) due.push({ ...c, box: k.box, late: now - k.due });
  }
  due.sort((a, b) => b.late - a.late);
  return [...due, ...fresh.slice(0, newMax).map((c) => ({ ...c, box: 0, isNew: true }))];
}

/** Enregistre une réponse. conf : 0 = je devine, 1 = je pense, 2 = je suis sûr(e). Retourne le retour pédagogique. */
export function review(pid, card, ok, conf = 1, now = Date.now()) {
  const st = proState(pid); const k = st.cards[card.id] || { box: 0, seen: 0, ok: 0 };
  const prevBox = k.box;
  k.box = ok ? Math.min(BOX_DAYS.length - 1, k.box + 1) : 0; // une erreur renvoie en boîte 0
  k.due = now + BOX_DAYS[k.box] * DAY; k.seen++; if (ok) k.ok++;
  st.cards[card.id] = k;
  const d = today(now); const day = st.days[d] || (st.days[d] = { rev: 0, ok: 0, xp: 0, defi: 0 });
  const calibrated = (ok && conf === 2) || (!ok && conf === 0);
  const xp = (ok ? 4 : 1) + (calibrated ? 2 : 0);
  day.rev++; if (ok) day.ok++; day.xp += xp;
  st.calib.n++; if (calibrated || conf === 1) st.calib.ok += calibrated ? 1 : 0.5;
  saveState(pid, st);
  return { box: k.box, prevBox, xp, calibrated, hypercorrection: !ok && conf === 2, days: BOX_DAYS[k.box] };
}

/** Termine un Défi mixte : enregistre le score et le meilleur score. */
export function finishDefi(pid, score, now = Date.now()) {
  const st = proState(pid); const d = today(now); const day = st.days[d] || (st.days[d] = { rev: 0, ok: 0, xp: 0, defi: 0 });
  day.defi = Math.max(day.defi, score); day.xp += Math.min(60, Math.round(score / 10));
  const record = score > st.defiBest; if (record) st.defiBest = score; saveState(pid, st);
  return { record, best: st.defiBest };
}

/** Questions du Défi mixte : cartes entrelacées de plusieurs séances (au moins 2 si possible). */
export function defiDeck(rec, n = 12, rnd = Math.random) {
  let sess = openedSessions(rec); if (sess.length < 2) sess = PRO.sessions.slice(0, Math.max(2, sess.length + 1));
  const bySession = sess.map((s) => cardsOf(s, rnd).sort(() => rnd() - 0.5));
  const out = []; let i = 0;
  while (out.length < n && bySession.some((b) => b.length)) { const b = bySession[i++ % bySession.length]; if (b.length) out.push(b.pop()); }
  return out;
}

// ---------- maîtrise, quêtes, carrière ----------
/** Niveau de maîtrise d’une séance : 0 non vue · 1 découverte · 2 en cours · 3 maîtrisée · 4 ancrée (révisions espacées). */
export function mastery(session, rec, pid) {
  const st = sessionStats(session, rec); if (!st.done) return 0;
  const ratio = st.best / st.max;
  if (st.status !== 'done' || ratio < 0.6) return st.status === 'done' ? 2 : 1;
  if (ratio < 0.8) return 2;
  const cs = proState(pid).cards; const ids = Object.keys(cs).filter((id) => id.startsWith(session.id + '-'));
  const anchored = ids.filter((id) => cs[id].box >= 3).length;
  return anchored >= 5 ? 4 : 3;
}
export const MASTERY = [
  { label: 'À découvrir', icon: '⚪' }, { label: 'Découverte', icon: '🟡' }, { label: 'En progrès', icon: '🟠' }, { label: 'Maîtrisée', icon: '🟢' }, { label: 'Ancrée', icon: '💎' },
];

const attemptsToday = (rec, d) => PRO_ACTIVITIES.flatMap((a) => (rec(a.id)?.attempts || []).filter((x) => (x.completedAt || '').slice(0, 10) === d));

/** Trois quêtes du jour, objectifs courts et précis. */
export function quests(pid, rec, now = Date.now()) {
  const d = today(now); const day = proState(pid).days[d] || { rev: 0, ok: 0, defi: 0 };
  const att = attemptsToday(rec, d);
  return [
    { id: 'act', icon: '🎯', label: 'Terminer 2 activités M205', cur: Math.min(2, att.length), goal: 2, xp: 40 },
    { id: 'rev', icon: '🧠', label: 'Réviser 10 cartes (répétition espacée)', cur: Math.min(10, day.rev), goal: 10, xp: 40 },
    { id: 'defi', icon: '⚡', label: 'Marquer 150 points au Défi mixte', cur: Math.min(150, day.defi), goal: 150, xp: 40 },
  ].map((q) => ({ ...q, done: q.cur >= q.goal }));
}

/** XP gagnée hors activités : révisions, défis et quêtes accomplies. */
export function bonusXp(pid, rec) {
  const st = proState(pid); let xp = 0;
  for (const [d, day] of Object.entries(st.days)) {
    xp += Math.min(150, day.xp || 0);
    const att = attemptsToday(rec, d).length;
    const doneQ = (att >= 2) + ((day.rev || 0) >= 10) + ((day.defi || 0) >= 150);
    xp += doneQ * 40 + (doneQ === 3 ? 60 : 0);
  }
  return xp;
}

/** Série de jours consécutifs avec une révision ou une activité. */
export function dayStreak(pid, rec, now = Date.now()) {
  const st = proState(pid); const active = new Set(Object.entries(st.days).filter(([, v]) => v.rev || v.defi).map(([k]) => k));
  PRO_ACTIVITIES.forEach((a) => (rec(a.id)?.attempts || []).forEach((x) => x.completedAt && active.add(x.completedAt.slice(0, 10))));
  let n = 0; let t = now; if (!active.has(today(t))) t -= DAY;
  while (active.has(today(t))) { n++; t -= DAY; }
  return n;
}

export const PRO_RANKS = ['Stagiaire', 'Assistant(e) junior', 'Assistant(e) administratif(ve)', 'Assistant(e) confirmé(e)', 'Office manager', 'Responsable bureautique', 'Expert(e) MOS', 'Formateur(trice) Office', 'Légende Office'];
export const PRO_BADGES = [
  { id: 'first', icon: '🚀', title: 'Premier jour', desc: 'Terminer une première activité M205.' },
  { id: 'perfect', icon: '💎', title: 'Sans faute', desc: 'Obtenir 5/5 à une activité.' },
  { id: 'sharp', icon: '🎯', title: 'Précision MOS', desc: '5 activités réussies à 5/5 dès le premier essai.' },
  { id: 'streak3', icon: '🔥', title: 'En feu', desc: '3 activités d’affilée à au moins 4/5.' },
  { id: 'streak7', icon: '☄️', title: 'Inarrêtable', desc: '7 activités d’affilée à au moins 4/5.' },
  { id: 'session', icon: '🏅', title: 'Séance bouclée', desc: 'Terminer les 4 activités d’une séance.' },
  { id: 'ten', icon: '📚', title: 'Studieux', desc: 'Terminer 10 activités.' },
  { id: 'module', icon: '🎓', title: 'Certifié(e)', desc: 'Terminer toute une partie : Word, Excel, PowerPoint ou Outlook.' },
  { id: 'speed', icon: '⚡', title: 'Éclair', desc: 'Réussir une activité à 5/5 en moins de 45 secondes.' },
  { id: 'comeback', icon: '💪', title: 'Persévérant', desc: 'Passer de moins de 3/5 à 5/5 sur une même activité.' },
  { id: 'half', icon: '🌗', title: 'Mi-parcours', desc: 'Terminer 40 activités.' },
  { id: 'all', icon: '👑', title: 'Légende Office', desc: 'Terminer les 80 activités du M205.' },
];
/** Périmètre de jeu M205 transmis au moteur XP commun. */
export const proScope = (pid, rec) => ({ activities: PRO_ACTIVITIES, groups: PRO_PARTS, ranks: PRO_RANKS, badges: PRO_BADGES, extraXp: pid ? bonusXp(pid, rec) : 0 });
