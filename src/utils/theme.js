// Thème clair / sombre de toute la plateforme.
// Choix mémorisé sur l'appareil : « auto » (suit le réglage du système), « clair » ou « sombre ».
// En mode auto, aucun attribut n'est posé : la feuille dark.css suit prefers-color-scheme.
import { h } from './dom.js';

const KEY = 'infoplay.theme';
const MODES = ['auto', 'light', 'dark'];
const LABEL = { auto: 'Thème du système', light: 'Thème clair', dark: 'Thème sombre' };
const LABEL_AR = { auto: 'مظهر النظام', light: 'مظهر فاتح', dark: 'مظهر داكن' };
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
  document.querySelectorAll('.theme-picker').forEach(paintPicker);
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
// Réglage détaillé du profil : « Système » d'abord (choix par défaut), puis Clair et Sombre.
const PICK = [
  ['auto', 'Système (recommandé)', 'مظهر النظام (موصى به)', 'Suit le réglage de ton téléphone ou de ton ordinateur'],
  ['light', 'Clair', 'فاتح', 'Fond clair, idéal en plein jour'],
  ['dark', 'Sombre', 'داكن', 'Noir, bleu nuit et brun : repose les yeux le soir'],
];
function paintPicker(box) {
  const m = themePref();
  box.querySelectorAll('input').forEach((i) => { i.checked = i.value === m; i.closest('label').classList.toggle('on', i.checked); });
  const now = box.querySelector('.theme-now');
  if (now) now.textContent = `Affichage actuel : ${effectiveTheme() === 'dark' ? 'sombre 🌙' : 'clair ☀️'}${m === 'auto' ? ' (selon ton appareil)' : ''}`;
}
/** Contrôle « Apparence » des pages Profil : trois cartes radio, avec l'affichage effectif. */
export function themePicker() {
  const name = 'theme-' + Math.random().toString(36).slice(2, 7);
  const box = h('fieldset', { class: 'theme-picker' },
    h('legend', null, '🎨 Apparence'),
    h('div', { class: 'theme-opts' }, PICK.map(([m, fr, ar, sub]) => h('label', { class: 'theme-opt' },
      h('input', { type: 'radio', name, value: m, onchange: () => setTheme(m) }),
      h('span', { class: 'theme-opt-ico', 'aria-hidden': 'true' }, ICON[m]),
      h('span', { class: 'theme-opt-t' }, h('b', null, fr), h('small', null, sub), h('small', { lang: 'ar', dir: 'rtl' }, ar))))),
    h('p', { class: 'theme-now', 'aria-live': 'polite' }));
  paintPicker(box);
  return box;
}

let installed = false;
export function installTheme() {
  if (installed) return; installed = true;
  applyTheme();
  // En mode auto, la couleur de la barre du navigateur suit le système.
  media()?.addEventListener?.('change', () => { if (themePref() === 'auto') applyTheme('auto'); });
  // Un autre onglet a changé le thème : on suit.
  if (typeof window !== 'undefined') window.addEventListener('storage', (e) => { if (e.key === KEY) applyTheme(); });
}
