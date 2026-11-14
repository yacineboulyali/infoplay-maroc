// Logique du parcours M205 (sans DOM, testable sous Node) : cartes tirées des activités, maîtrise des séances,
// série de jours et périmètre transmis au moteur XP commun.
import { PRO, PRO_ACTIVITIES, PRO_PARTS } from '../data/pro/index.js';
import { sessionStats } from '../scoring/scoring.js';

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

// ---------- maîtrise et carrière ----------
/** Niveau de maîtrise d’une séance : 0 non vue · 1 découverte · 2 en cours · 3 maîtrisée. */
export function mastery(session, rec) {
  const st = sessionStats(session, rec); if (!st.done) return 0;
  const ratio = st.best / st.max;
  if (st.status !== 'done' || ratio < 0.6) return st.status === 'done' ? 2 : 1;
  return ratio < 0.8 ? 2 : 3;
}
export const MASTERY = [
  { label: 'À découvrir', icon: '⚪' }, { label: 'Découverte', icon: '🟡' }, { label: 'En progrès', icon: '🟠' }, { label: 'Maîtrisée', icon: '🟢' },
];

/** Série de jours consécutifs avec au moins une activité M205 terminée. */
export function dayStreak(rec, now = Date.now()) {
  const active = new Set();
  PRO_ACTIVITIES.forEach((a) => (rec(a.id)?.attempts || []).forEach((x) => x.completedAt && active.add(x.completedAt.slice(0, 10))));
  let n = 0; let t = now; if (!active.has(today(t))) t -= DAY;
  while (active.has(today(t))) { n++; t -= DAY; }
  return n;
}

export const PRO_RANKS = ['Stagiaire', 'Assistant(e) junior', 'Assistant(e) administratif(ve)', 'Assistant(e) confirmé(e)', 'Office manager', 'Responsable bureautique', 'Expert(e) MOS', 'Formateur(trice) Office', 'Légende Office'];
/** Périmètre de jeu M205 transmis au moteur XP commun (sans badges). */
export const proScope = () => ({ activities: PRO_ACTIVITIES, groups: PRO_PARTS, ranks: PRO_RANKS, badges: [] });
