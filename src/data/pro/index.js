// Parcours professionnel M205 (OFPPT) : même format que les modules du Tronc Commun
// (identifiants m205-sX-aY), mais catalogue séparé pour ne pas modifier le barème du collège.
import raw from './m205.js';
import { INSTR, HINT } from '../dsl.js';

const INSTR_PRO = { ...INSTR, sim: 'Simulator : retrouve dans le ruban la commande qui réalise la tâche (Onglet › Commande › Option), puis clique sur « Valider l’étape ». C’est le même réflexe qu’à l’examen MOS.' };
const HINT_PRO = { ...HINT, sim: 'Lis bien le verbe de la consigne (insérer, mettre en page, référencer…) : il t’indique souvent l’onglet.' };

const m = raw;
const sessions = m.sessions.map((s, si) => {
  const session = { ...s, id: `m${m.id}-s${si + 1}`, moduleId: m.id, index: si + 1, acts: [] };
  session.acts = s.acts.map((a, ai) => {
    const type = a.mech.split(':')[0];
    return {
      ...a, id: `m${m.id}-s${si + 1}-a${ai + 1}`, moduleId: m.id, sessionId: session.id, sessionIndex: si + 1, index: ai + 1, version: 1,
      type, instructions: a.instructions || INSTR_PRO[type], hint: a.hint || HINT_PRO[type],
      estimatedMinutes: a.estimatedMinutes || (type === 'sim' ? 8 : 5),
      accessibilityAlternative: 'Toutes les interactions se font à la souris ou au clavier (Tab, Entrée, Espace) ; les glisser‑déposer ont une alternative par clic.',
    };
  });
  return session;
});

export const PRO = { ...m, sessions };
export const PRO_ACTIVITIES = sessions.flatMap((s) => s.acts);
export const PRO_POINTS = PRO_ACTIVITIES.length * 5;
/** Parties du module (Word, Excel, PowerPoint, Outlook) vues comme des « sous-modules » pour les badges. */
export const PRO_PARTS = m.parts.map((p) => ({ ...p, sessions: p.sessions.map((k) => sessions[k - 1]) }));
export const partOf = (session) => PRO_PARTS.find((p) => p.key === session.part);
