// Traduction arabe du contenu français du module : clé = empreinte du texte français.
// Les dictionnaires vivent dans data/tr/*.js ; `trAr(texte)` renvoie '' si le texte n'est pas traduit.
export function trKey(s) {
  const t = String(s).normalize('NFC').replace(/\s+/g, ' ').trim();
  let h = 0x811c9dc5;
  for (let i = 0; i < t.length; i++) { h ^= t.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; }
  return h.toString(36);
}

import LESSONS from './data/tr/ar-lessons.js';
import FEEDBACK from './data/tr/ar-feedback.js';
import QCM_AR from './data/tr/ar-qcm.js';
import ANNALES_AR from './data/tr/ar-annales.js';
const DICT = { ...ANNALES_AR, ...QCM_AR, ...FEEDBACK, ...LESSONS };
/** Traduction arabe d'un texte français du module ('' si absente). */
export const trAr = (s) => (s ? DICT[trKey(s)] || '' : '');
