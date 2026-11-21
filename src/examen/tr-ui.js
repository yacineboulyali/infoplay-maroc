// Traduction arabe « à la demande », comme dans le reste d'InfoPlay (Tronc commun) :
// seule une petite pastille « ?AR » est visible à côté du texte français ; la traduction
// n'apparaît que dans une bulle, au clic. Contenu (leçons, questions, réponses, feedback)
// et interface (titres, compteurs, rangs, badges…) ; les boutons gardent leur seul libellé.
import { arHint } from '../i18n/arhint.js';
import { trAr } from './i18n.js';
import { UI, UI_PATTERNS } from './data/tr/ar-ui.js';

// Pastille du module : même composant que le site, bulle élargie et multi-paragraphes.
function pill(text, cls = '') {
  const b = arHint(text, 'ex-arh' + (cls ? ' ' + cls : ''));
  b?.__arBubble?.classList.add('ex-arh-bubble');
  return b;
}

/** Plus de bouton global : conservé pour compatibilité, ne rend rien. */
export function trBtn() { watch(); return null; }

/** Pastille « ?AR » d'un texte français ; `ar` force une traduction déjà calculée. */
export function trLine(fr, lang = 'fr', ar) {
  if (lang === 'ar' || !fr) return null;
  watch();
  const t = ar ?? trAr(fr);
  return t ? pill(t) : null;
}

/** Pastille d'un bloc de plusieurs paragraphes (feedback, indice). */
export function trBlock(lines, lang = 'fr', title) {
  const list = (lines || []).filter(Boolean);
  if (lang === 'ar' || (!list.length && !title)) return null;
  const p = pill([title, ...list].filter(Boolean).join('\n\n'), 'ex-arh-block');
  return p ? h2row(p) : null;
}
function h2row(p) { const d = document.createElement('div'); d.className = 'ex-arh-row'; d.append(p); return d; }

// ---------- Interface : chaque texte français encore sans pastille reçoit la sienne ----------
const LETTERS = /[a-zA-Zéèàù]{3}/;
const norm = (s) => s.replace(/\s+/g, ' ').trim();
const core = (s) => s.replace(/^[^\p{L}\d«(]+/u, '').replace(/[\s:]+$/, '').trim();
function one(s) {
  if (!s) return '';
  const c = core(s);
  const hit = UI[s] || UI[c] || trAr(s) || trAr(c);
  if (hit) return hit;
  for (const [re, fn] of UI_PATTERNS) { const m = c.match(re); if (m) return fn(m, (x) => one(x) || ''); }
  return '';
}
/** Traduction arabe d'un texte d'interface ('' si inconnue). Les textes « a · b » sont traduits morceau par morceau. */
export function uiAr(text) {
  const s = norm(text); if (!LETTERS.test(s)) return '';
  const direct = one(s); if (direct) return direct;
  if (!s.includes(' · ')) return '';
  const segs = s.split(' · ');
  const out = segs.map((p) => (LETTERS.test(p) ? one(p) : p));
  // Tous les morceaux qui contiennent des mots doivent être traduits ; les nombres et symboles restent tels quels.
  return segs.every((p, i) => !LETTERS.test(p) || out[i]) ? out.join(' · ') : '';
}
// Zones déjà traduites autrement (feedback, indice, références) ou qu'on ne traduit pas (code, lettres, chronomètre).
const SKIP = '.textsize-ctl,.theme-picker,.ex-hans,.arh-btn,.arh-bubble,[dir="rtl"],[lang="ar"],script,style,code,svg,input,textarea,.ex-letter,.ex-clock,.ex-src,.ex-fact small,.ex-fb-head h2,.ex-fb-body,.ex-sheet-lead,.ex-elim,.ex-mem,.ex-float,.ex-ring-l';
// Les boutons gardent leur seul libellé (les réponses et choix de leçon ont leur pastille de contenu).
const BUTTONS = 'button,a,label,[role=button],[role=radio],.ex-btn,.ex-tnav-i,.ex-nav-i,.ex-hint-btn,.ex-cta,.ex-back,.ex-x';
function decorate(root) {
  for (const el of root.querySelectorAll('*')) {
    if (el.closest(SKIP) || el.closest(BUTTONS) || (el.closest('.ex-vis') && !el.closest('.ex-cap'))) continue;
    if (el.querySelector(':scope > .arh-btn')) continue;
    let txt = ''; for (const n of el.childNodes) if (n.nodeType === 3) txt += n.textContent;
    if (!LETTERS.test(txt)) continue;
    const ar = uiAr(txt); if (!ar) continue;
    el.append(pill(ar, 'ex-arh-ui'));
  }
}
export function decorateAll() {
  if (typeof document === 'undefined') return;
  document.querySelectorAll('.ex-app:not(.ex-locked), .ex-layer').forEach(decorate);
}
let watching = false; let queued = false;
function watch() {
  if (watching || typeof MutationObserver === 'undefined' || typeof document === 'undefined') return; watching = true;
  new MutationObserver(() => {
    if (queued) return; queued = true;
    // setTimeout plutôt que requestAnimationFrame : ce dernier ne s'exécute pas dans un onglet en arrière-plan.
    setTimeout(() => { queued = false; decorateAll(); }, 30);
  }).observe(document.body, { childList: true, subtree: true });
  setTimeout(decorateAll, 30);
}
// Démarre dès le chargement : même un écran sans contenu traduit (profil, bilan) reçoit ses pastilles.
if (typeof document !== 'undefined') {
  if (document.body) watch(); else document.addEventListener('DOMContentLoaded', watch, { once: true });
}
