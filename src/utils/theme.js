// Thème clair / sombre de toute la plateforme.
// Choix mémorisé sur l'appareil : « auto » (suit le réglage du système), « clair » ou « sombre ».
// En mode auto, aucun attribut n'est posé : la feuille dark.css suit prefers-color-scheme.
import { h } from './dom.js';

const KEY = 'infoplay.theme';
const MODES = ['auto', 'light', 'dark'];
const LABEL = { auto: 'Thème automatique', light: 'Thème clair', dark: 'Thème sombre' };
const LABEL_AR = { auto: 'مظهر تلقائي', light: 'مظهر فاتح', dark: 'مظهر داكن' };
const ICON = { auto: '🌓', light: '☀️', dark: '🌙' };

export function themePref() {
  try { const v = localStorage.getItem(KEY); return MODES.includes(v) ? v : 'auto'; } catch { return 'auto'; }
}
const media = () => (typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : null);
/** Thème réellement affiché ('light' ou 'dark'). */
export const effectiveTheme = (pref = themePref()) => (pref === 'auto' ? (media()?.matches ? 'dark' : 'light') : pref);

export function applyTheme(pref = themePref()) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (pref === 'auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', pref);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', effectiveTheme(pref) === 'dark' ? '#0b0d14' : '#ffffff');
  document.querySelectorAll('.theme-toggle').forEach(paint);
}
export function setTheme(pref) {
  try { localStorage.setItem(KEY, pref); } catch { /* stockage indisponible : le choix vaut pour la session */ }
  applyTheme(pref);
}
// Interrupteur à trois positions : l'option active est marquée (aria-pressed) et mise en relief.
function paint(sw) {
  const m = themePref();
  sw.dataset.mode = m;
  sw.querySelectorAll('[data-mode]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.mode === m)));
}
/** Interrupteur clair / auto / sombre de l'en-tête. */
export function themeButton(cls = '') {
  const sw = h('div', { class: 'theme-toggle' + (cls ? ' ' + cls : ''), role: 'group', 'aria-label': 'Apparence · المظهر' },
    ['light', 'auto', 'dark'].map((m) => h('button', { type: 'button', 'data-mode': m, title: `${LABEL[m]} · ${LABEL_AR[m]}`, 'aria-label': LABEL[m], onclick: () => setTheme(m) },
      h('span', { 'aria-hidden': 'true' }, ICON[m]))));
  paint(sw);
  return sw;
}
/** Sélecteur explicite (paramètres) : trois boutons radio. */
export function themePicker() {
  const cur = themePref();
  return h('div', { class: 'theme-picker', role: 'radiogroup', 'aria-label': 'Apparence' },
    MODES.map((m) => h('label', { class: 'sw' },
      h('input', { type: 'radio', name: 'theme', value: m, checked: m === cur, onchange: () => setTheme(m) }),
      h('span', null, `${ICON[m]} ${LABEL[m]}`))));
}

let installed = false;
export function installTheme() {
  if (installed) return; installed = true;
  applyTheme();
  // En mode auto, la couleur de la barre du navigateur suit le système.
  media()?.addEventListener?.('change', () => { if (themePref() === 'auto') applyTheme('auto'); });
}
