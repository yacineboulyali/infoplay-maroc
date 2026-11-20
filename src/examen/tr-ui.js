// Bouton de traduction « 文A AR » et lignes de traduction arabe sous les textes français.
// Un seul interrupteur pour tout le module : une fois ouvert, la traduction reste visible
// d'une question, d'une carte ou d'une fenêtre à l'autre (classe sur <body>).
import { h } from '../utils/dom.js';
import { trAr } from './i18n.js';
import { UI, UI_PATTERNS } from './data/tr/ar-ui.js';
import { sfx } from './sfx.js';

const ON = 'ex-tr-on';
const ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h9M7.5 3v2M10 5c-.5 3.5-3 6.5-6 8M5.5 8.5c1 2 2.8 3.6 5 4.5"/><path d="m13 21 4-9 4 9M14.5 18h5"/></svg>';

export const trIsOn = () => document.body.classList.contains(ON);

/** Petit bouton « traduction arabe » (rien pour un contenu déjà en arabe). */
export function trBtn(lang = 'fr') {
  if (lang === 'ar') return null;
  const ico = h('span', { class: 'ex-trbtn-ico', 'aria-hidden': 'true' }); ico.innerHTML = ICON;
  const b = h('button', { type: 'button', class: 'ex-trbtn', 'aria-pressed': String(trIsOn()), title: 'Traduction en arabe', 'aria-label': 'Afficher la traduction en arabe' }, ico, h('b', null, 'AR'));
  b.addEventListener('click', (e) => {
    e.preventDefault(); e.stopPropagation();
    const on = !trIsOn(); document.body.classList.toggle(ON, on); sfx('flip');
    document.querySelectorAll('.ex-trbtn').forEach((x) => x.setAttribute('aria-pressed', String(on)));
    if (on) decorateAll();
  });
  watch();
  return b;
}

// ---------- Interface : chaque texte français encore sans traduction reçoit sa ligne arabe ----------
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
const SKIP = '.ex-tr,.ex-trbtn,[dir="rtl"],[lang="ar"],script,style,code,svg,input,textarea,.ex-letter,.ex-clock,.ex-src,.ex-fact small,.ex-fb-head h2,.ex-fb-body,.ex-sheet-lead,.ex-elim,.ex-mem,.ex-float,.ex-ring-l';
function decorate(root) {
  for (const el of root.querySelectorAll('*')) {
    if (el.closest(SKIP) || (el.closest('.ex-vis') && !el.closest('.ex-cap'))) continue;
    if (el.querySelector(':scope > .ex-tr')) continue;
    let txt = ''; for (const n of el.childNodes) if (n.nodeType === 3) txt += n.textContent;
    if (!LETTERS.test(txt)) continue;
    const ar = uiAr(txt); if (!ar) continue;
    el.append(h('span', { class: 'ex-tr ex-tr-ui', dir: 'rtl', lang: 'ar' }, ar));
  }
}
export function decorateAll() {
  if (!trIsOn()) return;
  document.querySelectorAll('.ex-app, .ex-layer').forEach(decorate);
}
let watching = false; let queued = false;
function watch() {
  if (watching || typeof MutationObserver === 'undefined') return; watching = true;
  new MutationObserver(() => {
    if (queued || !trIsOn()) return; queued = true;
    // setTimeout plutôt que requestAnimationFrame : ce dernier ne s'exécute pas dans un onglet en arrière-plan.
    setTimeout(() => { queued = false; decorateAll(); }, 30);
  }).observe(document.body, { childList: true, subtree: true });
}

/** Ligne arabe sous un texte français ; `ar` force une traduction déjà calculée. */
export function trLine(fr, lang = 'fr', ar) {
  if (lang === 'ar' || !fr) return null;
  const t = ar ?? trAr(fr);
  return t ? h('span', { class: 'ex-tr', dir: 'rtl', lang: 'ar' }, t) : null;
}

/** Bloc arabe de plusieurs paragraphes (feedback, indice). */
export function trBlock(lines, lang = 'fr', title) {
  const list = (lines || []).filter(Boolean);
  if (lang === 'ar' || (!list.length && !title)) return null;
  return h('div', { class: 'ex-tr ex-tr-block', dir: 'rtl', lang: 'ar' }, title ? h('b', null, title) : null, ...list.map((p) => h('p', null, p)));
}
