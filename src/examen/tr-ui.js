// Bouton de traduction « 文A AR » et lignes de traduction arabe sous les textes français.
// Un seul interrupteur pour tout le module : une fois ouvert, la traduction reste visible
// d'une question, d'une carte ou d'une fenêtre à l'autre (classe sur <body>).
import { h } from '../utils/dom.js';
import { trAr } from './i18n.js';
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
  });
  return b;
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
