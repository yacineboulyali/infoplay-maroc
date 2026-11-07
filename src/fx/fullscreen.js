// Plein écran : bouton bascule + suggestion adaptée (forte sur téléphone, discrète sur ordinateur).
// iPhone ne permet pas le plein écran d'une page : on propose alors « Sur l'écran d'accueil »
// (le manifeste ouvre ensuite l'application en plein écran).
import { h } from '../utils/dom.js';
import { arHint } from '../i18n/arhint.js';

const doc = typeof document !== 'undefined' ? document : null;
export const isMobile = () => typeof matchMedia !== 'undefined' && (matchMedia('(pointer: coarse)').matches || matchMedia('(max-width: 820px)').matches);
const isIOS = () => typeof navigator !== 'undefined' && /iPhone|iPad|iPod/.test(navigator.userAgent) && !window.MSStream;
const standalone = () => typeof matchMedia !== 'undefined' && (matchMedia('(display-mode: fullscreen)').matches || matchMedia('(display-mode: standalone)').matches || navigator.standalone === true);
export const fsSupported = () => !!(doc && (doc.documentElement.requestFullscreen || doc.documentElement.webkitRequestFullscreen));
export const isFs = () => !!(doc && (doc.fullscreenElement || doc.webkitFullscreenElement)) || standalone();

export async function enterFs() {
  const el = doc.documentElement;
  try {
    if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: 'hide' }); else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    return true;
  } catch { return false; }
}
export async function exitFs() { try { if (doc.exitFullscreen) await doc.exitFullscreen(); else if (doc.webkitExitFullscreen) doc.webkitExitFullscreen(); } catch {} }
export function toggleFs() { return isFs() && !standalone() ? exitFs() : enterFs(); }

/** Bouton ⛶ qui suit l'état réel du plein écran. */
export function fsButton(cls = 'fs-btn') {
  if (!fsSupported() || standalone()) return null;
  const b = h('button', { type: 'button', class: cls, onclick: () => toggleFs() });
  const paint = () => { const on = isFs(); b.setAttribute('aria-pressed', String(on)); b.title = on ? 'Quitter le plein écran' : 'Plein écran'; b.setAttribute('aria-label', b.title); b.textContent = on ? '🗗' : '⛶'; };
  paint(); doc.addEventListener('fullscreenchange', paint); doc.addEventListener('webkitfullscreenchange', paint);
  return b;
}

const KEY_DESK = 'infoplay.fs.hint.desktop';
const KEY_MOB = 'infoplay.fs.hint.mobile';
const get = (st, k) => { try { return st.getItem(k); } catch { return null; } };
const set = (st, k, v) => { try { st.setItem(k, v); } catch {} };

/**
 * Suggestion de plein écran.
 * Téléphone : carte bien visible à chaque nouvelle visite (session) tant que l'on n'est pas en plein écran.
 * Ordinateur : petit bandeau discret, que l'on peut masquer définitivement.
 */
export function suggestFullscreen({ delay = 900 } = {}) {
  if (!doc || isFs()) return;
  const mobile = isMobile();
  if (mobile ? get(sessionStorage, KEY_MOB) : get(localStorage, KEY_DESK)) return;
  const ios = isIOS() && !fsSupported();
  if (!fsSupported() && !ios) return;
  setTimeout(() => {
    if (isFs() || doc.querySelector('.fs-suggest')) return;
    const close = (forever) => { box.classList.add('out'); setTimeout(() => box.remove(), 300); if (mobile) set(sessionStorage, KEY_MOB, '1'); else if (forever) set(localStorage, KEY_DESK, '1'); };
    const go = h('button', { type: 'button', class: 'btn primary', onclick: async () => { await enterFs(); close(false); if (mobile) set(sessionStorage, KEY_MOB, '1'); } }, '⛶ Passer en plein écran');
    const box = mobile
      ? h('div', { class: 'fs-suggest mobile', role: 'dialog', 'aria-modal': 'false', 'aria-labelledby': 'fs-h' },
        h('span', { class: 'fs-ic', 'aria-hidden': 'true' }, '📱'),
        h('b', { id: 'fs-h' }, 'Joue en plein écran', arHint('العب في وضع ملء الشاشة لتجربة أفضل')),
        h('p', null, ios ? 'Sur iPhone : touche « Partager » puis « Sur l’écran d’accueil ». InfoPlay s’ouvrira ensuite en plein écran, comme une application.' : 'Plus de place pour jouer, sans barre du navigateur. Tu peux revenir à tout moment avec le bouton ⛶.'),
                h('div', { class: 'row' }, ios ? null : go, h('button', { type: 'button', class: 'btn ghost', onclick: () => close(false) }, ios ? 'Compris' : 'Plus tard')))
      : h('div', { class: 'fs-suggest desktop', role: 'status' },
        h('span', { 'aria-hidden': 'true' }, '⛶'), h('span', null, 'Astuce : joue en plein écran pour une meilleure immersion.'),
        h('button', { type: 'button', class: 'btn small primary', onclick: async () => { await enterFs(); close(false); } }, 'Plein écran'),
        h('button', { type: 'button', class: 'fs-x', 'aria-label': 'Ne plus proposer', title: 'Ne plus proposer', onclick: () => close(true) }, '✕'));
    doc.body.append(box);
    if (mobile) setTimeout(() => (box.querySelector('.btn.primary') || box.querySelector('.btn'))?.focus({ preventScroll: true }), 50);
    else setTimeout(() => { if (box.isConnected) close(false); }, 12000);
  }, delay);
}

/** Masque l'en-tête en faisant défiler vers le bas (téléphone), le réaffiche en remontant. */
export function autoHideHeader(cls = 'hdr-hidden') {
  let last = 0, ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      ticking = false; const y = window.scrollY; const mobile = isMobile();
      if (!mobile || y < 80 || doc.body.classList.contains('nav-open')) doc.body.classList.remove(cls);
      else if (y > last + 6) doc.body.classList.add(cls); else if (y < last - 6) doc.body.classList.remove(cls);
      last = y;
    });
  }, { passive: true });
}
