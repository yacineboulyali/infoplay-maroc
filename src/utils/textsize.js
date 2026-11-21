// Taille du texte de toute la plateforme, réglée dans les pages Profil (A− / A+).
// Le choix est mémorisé sur l'appareil ; il agit sur la taille de base (rem) via --text-scale.
import { h } from './dom.js';

const KEY = 'infoplay.textsize';
export const TEXT_STEPS = [0.85, 0.92, 1, 1.1, 1.2, 1.35, 1.5];
const DEFAULT = 1;

export function textScale() {
  try { const v = Number(localStorage.getItem(KEY)); return TEXT_STEPS.includes(v) ? v : DEFAULT; } catch { return DEFAULT; }
}
export function applyTextScale(v = textScale()) {
  if (typeof document === 'undefined') return;
  document.documentElement.style.setProperty('--text-scale', String(v));
  document.querySelectorAll('.textsize-ctl').forEach(paint);
  document.querySelectorAll('.textsize-mini').forEach(paintMini);
}
export function setTextScale(v) {
  try { localStorage.setItem(KEY, String(v)); } catch { /* stockage indisponible : vaut pour la session */ }
  applyTextScale(v);
}
const step = (dir) => {
  const i = TEXT_STEPS.indexOf(textScale());
  setTextScale(TEXT_STEPS[Math.max(0, Math.min(TEXT_STEPS.length - 1, i + dir))]);
};
function paint(box) {
  const v = textScale(); const i = TEXT_STEPS.indexOf(v);
  box.querySelector('.textsize-val').textContent = `${Math.round(v * 100)} %`;
  box.querySelector('[data-act=minus]').disabled = i <= 0;
  box.querySelector('[data-act=plus]').disabled = i >= TEXT_STEPS.length - 1;
  box.querySelector('[data-act=reset]').disabled = v === DEFAULT;
  const bar = box.querySelector('.textsize-bar');
  if (bar) bar.style.setProperty('--w', `${(i / (TEXT_STEPS.length - 1)) * 100}%`);
}
/** Réglage « Taille du texte » : A− / valeur / A+, aperçu et retour à la taille normale. */
export function textSizeControl() {
  const box = h('fieldset', { class: 'textsize-ctl' },
    h('legend', null, '🔠 Taille du texte'),
    h('div', { class: 'textsize-row' },
      h('button', { type: 'button', class: 'textsize-btn', 'data-act': 'minus', 'aria-label': 'Réduire la taille du texte', title: 'Réduire · تصغير', onclick: () => step(-1) }, h('span', { 'aria-hidden': 'true', style: 'font-size:.85em' }, 'A−')),
      h('div', { class: 'textsize-mid' },
        h('output', { class: 'textsize-val', 'aria-live': 'polite' }),
        h('span', { class: 'textsize-bar', 'aria-hidden': 'true' }, h('i'))),
      h('button', { type: 'button', class: 'textsize-btn', 'data-act': 'plus', 'aria-label': 'Agrandir la taille du texte', title: 'Agrandir · تكبير', onclick: () => step(1) }, h('span', { 'aria-hidden': 'true', style: 'font-size:1.25em' }, 'A+'))),
    h('p', { class: 'textsize-demo' }, 'Aperçu : le texte des leçons et des questions s’affiche à cette taille.'),
    h('p', { class: 'textsize-demo', lang: 'ar', dir: 'rtl' }, 'معاينة: يظهر نص الدروس والأسئلة بهذا الحجم.'),
    h('button', { type: 'button', class: 'textsize-reset', 'data-act': 'reset', onclick: () => setTextScale(DEFAULT) }, '↺ Taille normale (100 %)'));
  paint(box);
  return box;
}

function paintMini(box) {
  const i = TEXT_STEPS.indexOf(textScale());
  box.querySelector('[data-act=minus]').disabled = i <= 0;
  box.querySelector('[data-act=plus]').disabled = i >= TEXT_STEPS.length - 1;
  box.title = `Taille du texte : ${Math.round(textScale() * 100)} % · حجم النص`;
}
/** Version compacte, toujours visible dans la barre de progression des quiz et leçons. */
export function textSizeMini() {
  const box = h('div', { class: 'textsize-mini', role: 'group', 'aria-label': 'Taille du texte' },
    h('button', { type: 'button', 'data-act': 'minus', 'aria-label': 'Réduire le texte', onclick: () => step(-1) }, h('span', { 'aria-hidden': 'true' }, 'A−')),
    h('button', { type: 'button', 'data-act': 'plus', 'aria-label': 'Agrandir le texte', onclick: () => step(1) }, h('span', { 'aria-hidden': 'true' }, 'A+')));
  paintMini(box);
  return box;
}

let installed = false;
export function installTextScale() {
  if (installed) return; installed = true;
  applyTextScale();
  if (typeof window !== 'undefined') window.addEventListener('storage', (e) => { if (e.key === KEY) applyTextScale(); });
}
