import m1 from './module-1.js';
import m2 from './module-2.js';
import m3 from './module-3.js';
import m4 from './module-4.js';
import { INSTR, HINT } from './dsl.js';
import { PRO, PRO_ACTIVITIES } from './pro/index.js';

const raw = [m1, m2, m3, m4];
export const CATALOG = raw.map((m) => ({
  ...m,
  sessions: m.sessions.map((s, si) => {
    const session = { ...s, id: `m${m.id}-s${si + 1}`, moduleId: m.id, index: si + 1, acts: [] };
    session.acts = s.acts.map((a, ai) => ({
      ...a, id: `m${m.id}-s${si + 1}-a${ai + 1}`, moduleId: m.id, sessionId: session.id, sessionIndex: si + 1, index: ai + 1, version: 1,
      type: a.mech.split(':')[0], instructions: a.instructions || INSTR[a.mech.split(':')[0]], hint: a.hint || HINT[a.mech.split(':')[0]],
      estimatedMinutes: a.estimatedMinutes || (a.mech.startsWith('sim') || a.mech === 'robot' ? 8 : 5),
      accessibilityAlternative: 'Toutes les interactions se font à la souris ou au clavier (Tab, Entrée, Espace) ; les glisser‑déposer ont une alternative par clic.',
    }));
    return session;
  }),
}));
export const SESSIONS = CATALOG.flatMap((m) => m.sessions);
export const ACTIVITIES = SESSIONS.flatMap((s) => s.acts);
// Le parcours M205 (OFPPT) partage les écrans et le stockage, mais pas le barème du Tronc Commun.
const byId = new Map([...ACTIVITIES, ...PRO_ACTIVITIES].map((a) => [a.id, a]));
export const getActivity = (id) => byId.get(id);
export const isActivityId = (id) => byId.has(id);
export const getModule = (n) => (Number(n) === PRO.id ? PRO : CATALOG.find((m) => m.id === Number(n)));
export { PRO, PRO_ACTIVITIES };
export const getSession = (mi, si) => getModule(mi)?.sessions[Number(si) - 1];
export const TOTAL_POINTS = ACTIVITIES.length * 5;
