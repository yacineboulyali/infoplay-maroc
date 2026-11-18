// Parcours « Informatique Collège » : trois niveaux indépendants (1AC, 2AC, 3AC), chacun avec ses
// modules (unités du programme) et ses séances. Identifiants : module = niveau × 10 + rang
// (11…15, 21…25, 31…35), activités m11-s1-a1… — sans collision avec le Tronc Commun (1–4) ni M205.
import n1 from './n1.js';
import n2 from './n2.js';
import n3 from './n3.js';
import { INSTR, HINT } from '../dsl.js';
import { STUDENT_ILLUSTRATIONS } from '../student-illustrations.js';
import m1 from '../module-1.js';
import m2 from '../module-2.js';
import m3 from '../module-3.js';
import m4 from '../module-4.js';
import m205 from '../pro/m205.js';

const ACCESS = 'Toutes les interactions se font à la souris ou au clavier (Tab, Entrée, Espace) ; les glisser‑déposer ont une alternative par clic.';

/** Libellés notés d'une activité, dans l'ordre de ses éléments (même ordre que les images -qNN). */
export function itemLabels(a) {
  const d = a.data; const t = a.mech.split(':')[0];
  if (t === 'sort') return d.items.map((i) => i[0]);
  if (t === 'match') return d.pairs.map((p) => p[0]);
  if (t === 'quiz') return d.qs.map((q) => q[0]);
  if (t === 'order') return d.steps;
  if (t === 'fill') return d.lines.map((l) => (Array.isArray(l) ? l[0] : l));
  return [];
}
// Index « libellé identique → illustration validée » construit sur le Tronc Commun et le M205.
const key = (s) => String(s).trim().toLowerCase();
const LABEL_PICS = new Map();
for (const mod of [m1, m2, m3, m4, m205]) mod.sessions.forEach((s, si) => s.acts.forEach((a, ai) => itemLabels(a).forEach((label, i) => {
  const k = `m${mod.id}-s${si + 1}-a${ai + 1}-q${String(i + 1).padStart(2, '0')}`;
  if (STUDENT_ILLUSTRATIONS[k] && !LABEL_PICS.has(key(label))) LABEL_PICS.set(key(label), k);
})));
// Image d'un élément : choix manuel (PICS du niveau) d'abord, sinon même libellé exact dans un autre parcours.
function picsFor(a, manual) {
  if (a.illus) return null; // activité reprise : elle garde ses propres images
  const auto = itemLabels(a).map((l, i) => (manual && manual[i]) || LABEL_PICS.get(key(l)) || null);
  return auto.some(Boolean) ? auto : null;
}

export const LEVELS = [n1, n2, n3].map((L) => {
  const modules = L.modules.map((m, mi) => {
    const id = L.level * 10 + mi + 1;
    const sessions = m.sessions.map((s, si) => {
      const session = { ...s, id: `m${id}-s${si + 1}`, moduleId: id, index: si + 1, acts: [] };
      session.acts = s.acts.map((a, ai) => {
        const type = a.mech.split(':')[0];
        const pics = picsFor(a, L.pics?.[`${mi + 1}.${si + 1}.${ai + 1}`]);
        return {
          ...a, ...(pics ? { pics, data: { ...a.data, pics } } : {}), id: `m${id}-s${si + 1}-a${ai + 1}`, moduleId: id, sessionId: session.id, sessionIndex: si + 1, index: ai + 1, version: 1,
          type, instructions: a.instructions || INSTR[type], hint: a.hint || HINT[type],
          estimatedMinutes: a.estimatedMinutes || (type === 'sim' || type === 'robot' ? 8 : 5),
          accessibilityAlternative: ACCESS,
        };
      });
      return session;
    });
    return { ...m, id, rank: mi + 1, level: L.level, levelCode: L.code, short: m.title, sessions };
  });
  return { ...L, modules };
});

export const COLLEGE_MODULES = LEVELS.flatMap((L) => L.modules);
export const COLLEGE_ACTIVITIES = COLLEGE_MODULES.flatMap((m) => m.sessions.flatMap((s) => s.acts));
export const getLevel = (n) => LEVELS.find((L) => L.level === Number(n));
export const collegeModule = (id) => COLLEGE_MODULES.find((m) => m.id === Number(id));
export const levelActivities = (L) => L.modules.flatMap((m) => m.sessions.flatMap((s) => s.acts));
