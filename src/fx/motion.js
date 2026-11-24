// Mouvements des éléments de jeu : fantôme qui suit le pointeur pendant un glisser,
// et vol animé de l'élément jusqu'à la case qu'il remplit (clic ou dépôt).
import { reduced } from '../utils/dom.js';

const canRun = () => typeof document !== 'undefined' && typeof window !== 'undefined' && !!document.body;
const animOk = (el) => el && typeof el.animate === 'function' && !reduced();
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const STATE = ['sel', 'dragging', 'just-dropped', 'drag-over', 'tilting', 'ok', 'ko'];
// Styles copiés : le fantôme vit dans <body>, hors des sélecteurs parents qui habillent l'original.
const COPY = ['backgroundColor', 'backgroundImage', 'color', 'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderStyle', 'borderRadius', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'display', 'alignItems', 'justifyContent', 'gap', 'textAlign'];

/** Copie visuelle d'un élément, posée exactement par-dessus lui (position fixe dans <body>). */
export function lift(src) {
  if (!canRun() || !src || !src.isConnected || typeof src.getBoundingClientRect !== 'function') return null;
  const r = src.getBoundingClientRect();
  if (!r.width && !r.height) return null;
  const g = src.cloneNode(true);
  const cs = getComputedStyle(src);
  for (const k of COPY) g.style[k] = cs[k];
  STATE.forEach((c) => g.classList.remove(c));
  for (const a of ['id', 'aria-pressed', 'aria-current', 'draggable', 'data-f']) g.removeAttribute(a);
  g.querySelectorAll('.ripple-wrap,[id]').forEach((n) => (n.classList.contains('ripple-wrap') ? n.remove() : n.removeAttribute('id')));
  g.setAttribute('aria-hidden', 'true'); g.setAttribute('tabindex', '-1'); g.setAttribute('inert', '');
  g.classList.add('fly-ghost');
  Object.assign(g.style, { position: 'fixed', zIndex: '300', left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', boxSizing: 'border-box', margin: '0', transform: 'none', opacity: '1', visibility: 'visible' });
  document.body.append(g);
  return { ghost: g, x: r.left, y: r.top, w: r.width, h: r.height, dx: 0, dy: 0, s: 1, rot: 0 };
}

/** Reprend un fantôme déjà construit par un jeu (positionné par transform) pour le faire voler. */
export function adopt(el) {
  if (!canRun() || !el || !el.isConnected) return null;
  const r = el.getBoundingClientRect();
  Object.assign(el.style, { position: 'fixed', left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', transform: 'none', boxSizing: 'border-box' });
  return { ghost: el, x: r.left, y: r.top, w: r.width, h: r.height, dx: 0, dy: 0, s: 1, rot: 0 };
}

function place(cap) { cap.ghost.style.transform = `translate(${cap.dx}px, ${cap.dy}px) rotate(${cap.rot}deg) scale(${cap.s})`; }

/**
 * Fait voler le fantôme vers `dest` puis le retire. `keep` : la destination reste visible
 * (association) et le fantôme s'y fond ; sinon elle apparaît à l'arrivée du fantôme.
 */
export function flyTo(cap, dest, { keep = false, done } = {}) {
  if (!cap) { done && done(); return; }
  const g = cap.ghost;
  const to = dest && dest.isConnected && typeof dest.getBoundingClientRect === 'function' ? dest.getBoundingClientRect() : null;
  if (!to || (!to.width && !to.height) || !animOk(g)) { g.remove(); done && done(); return; }
  const s = clamp(Math.min(to.width / cap.w, to.height / cap.h), 0.4, 1.15);
  const tx = to.left + to.width / 2 - (cap.x + cap.w / 2);
  const ty = to.top + to.height / 2 - (cap.y + cap.h / 2);
  const dist = Math.hypot(tx - cap.dx, ty - cap.dy);
  const arc = Math.min(90, dist * 0.28);
  const mx = (cap.dx + tx) / 2; const my = (cap.dy + ty) / 2 - arc;
  const ms = Math.max(cap.s, s) * 1.08;
  if (!keep) dest.style.visibility = 'hidden';
  dest.classList.remove('just-dropped');
  g.classList.add('flying');
  let finished = false;
  const end = () => {
    if (finished) return; finished = true;
    g.remove();
    if (!keep) dest.style.visibility = '';
    if (dest.isConnected && typeof dest.animate === 'function') {
      // Éléments SVG : pas de mise à l'échelle (origine en haut à gauche), seulement un éclat.
      const svg = typeof SVGElement !== 'undefined' && dest instanceof SVGElement;
      dest.animate(svg
        ? [{ filter: 'brightness(1.35)' }, { filter: 'none' }]
        : [{ transform: 'scale(1.14)', filter: 'brightness(1.12)' }, { transform: 'scale(.96)' }, { transform: 'none', filter: 'none' }], { duration: 300, easing: 'ease-out' });
    }
    done && done();
  };
  const duration = clamp(dist * 0.9, 300, 620);
  const a = g.animate([
    { transform: `translate(${cap.dx}px, ${cap.dy}px) rotate(${cap.rot}deg) scale(${cap.s})`, opacity: 1 },
    { transform: `translate(${mx}px, ${my}px) rotate(${cap.rot / 2}deg) scale(${ms})`, opacity: 1, offset: 0.55 },
    { transform: `translate(${tx}px, ${ty}px) rotate(0deg) scale(${s})`, opacity: keep ? 0 : 0.92 },
  ], { duration, easing: 'cubic-bezier(.32,.72,.28,1)', fill: 'forwards' });
  a.onfinish = end; a.oncancel = end;
  setTimeout(end, duration + 800); // filet de sécurité si l'animation est interrompue
}

/** Vol direct d'un élément source vers une destination (cliquer pour remplir une case). */
export function flyFrom(src, findDest, opts) {
  if (reduced()) return;
  const cap = lift(src);
  if (!cap) return;
  const go = () => flyTo(cap, typeof findDest === 'function' ? findDest() : findDest, opts);
  // La destination est créée par le rendu synchrone qui suit l'appel : on la cherche juste après.
  Promise.resolve().then(go);
}

/**
 * Glisser au pointeur (souris, doigt, stylet) avec un fantôme qui suit le curseur.
 * - target(x, y) → élément sous le pointeur (ou null) ; il reçoit la classe drag-over.
 * - drop(targetEl, x, y) → élément où le fantôme doit atterrir (ou { el, keep }), ou null pour revenir.
 * Retourne false si le glisser n'a pas démarré (bouton droit, etc.).
 */
export function dragWith(e, src, { target, drop, start, move, end, threshold = 6, ghost } = {}) {
  if (!canRun() || (e.button != null && e.button !== 0)) return false;
  const sx = e.clientX; const sy = e.clientY;
  let cap = null; let over = null; let last = null; let scrollTimer = null;
  const setOver = (t) => { if (t === over) return; over && over.classList.remove('drag-over'); over = t; over && over.classList.add('drag-over'); };
  const follow = (x, y) => {
    cap.dx = x - sx; cap.dy = y - sy; place(cap);
    const t = target ? target(x, y) : null;
    setOver(t);
    return t;
  };
  // Près du bord haut ou bas de l'écran, la page défile pour atteindre les cases cachées.
  const edge = () => {
    if (!cap || !last) return 0;
    const m = 70; const hgt = window.innerHeight;
    if (last.y < m) return -Math.ceil((m - last.y) / 4);
    if (last.y > hgt - m) return Math.ceil((last.y - (hgt - m)) / 4);
    return 0;
  };
  const autoScroll = () => {
    if (scrollTimer || !edge()) return;
    scrollTimer = setInterval(() => {
      const v = edge();
      if (!v) { clearInterval(scrollTimer); scrollTimer = null; return; }
      window.scrollBy(0, v);
      follow(last.x, last.y);
    }, 16);
  };
  function onMove(ev) {
    if (!cap) {
      if (Math.hypot(ev.clientX - sx, ev.clientY - sy) < threshold) return;
      cap = ghost ? ghost() : lift(src);
      if (!cap) { cleanup(); return; }
      cap.s = 1.06; cap.rot = -3;
      cap.ghost.classList.add('dragging-ghost');
      src.classList.add('dragging');
      document.body.classList.add('is-dragging');
      start && start();
    }
    last = { x: ev.clientX, y: ev.clientY };
    const t = follow(ev.clientX, ev.clientY);
    move && move(ev, t);
    autoScroll();
    ev.preventDefault();
  }
  function cleanup() {
    if (scrollTimer) { clearInterval(scrollTimer); scrollTimer = null; }
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    window.removeEventListener('pointercancel', onCancel);
    setOver(null);
    document.body.classList.remove('is-dragging');
  }
  function swallowClick() {
    const stopClick = (c) => { c.stopPropagation(); c.preventDefault(); };
    window.addEventListener('click', stopClick, true);
    setTimeout(() => window.removeEventListener('click', stopClick, true), 0);
  }
  function onUp(ev) {
    const t = over; cleanup();
    if (!cap) return; // simple clic : laissé au gestionnaire onclick
    swallowClick();
    const c = cap; cap = null;
    src.classList.remove('dragging');
    const res = drop ? drop(t, ev.clientX, ev.clientY) : null;
    const landing = res && res.el !== undefined ? res.el : res;
    c.ghost.classList.remove('dragging-ghost');
    // Dépôt hors cible : le fantôme revient se fondre dans son élément d'origine.
    if (landing) flyTo(c, landing, { keep: !!(res && res.keep) });
    else flyTo(c, src.isConnected ? src : null, { keep: true });
    end && end(!!landing);
  }
  function onCancel() { cleanup(); if (cap) { cap.ghost.remove(); cap = null; } src.classList.remove('dragging'); end && end(false); }
  window.addEventListener('pointermove', onMove, { passive: false });
  window.addEventListener('pointerup', onUp);
  window.addEventListener('pointercancel', onCancel);
  return true;
}

/** Anime le réordonnancement d'une liste (FLIP) : `mutate` redessine, les éléments glissent à leur place. */
export function flipList(container, key, mutate) {
  const before = new Map();
  if (canRun() && !reduced()) container.querySelectorAll(`[${key}]`).forEach((el) => before.set(el.getAttribute(key), el.getBoundingClientRect()));
  mutate();
  if (!before.size) return;
  container.querySelectorAll(`[${key}]`).forEach((el) => {
    const r0 = before.get(el.getAttribute(key)); if (!r0 || typeof el.animate !== 'function') return;
    const r1 = el.getBoundingClientRect(); const dx = r0.left - r1.left; const dy = r0.top - r1.top;
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
    el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'none' }], { duration: 280, easing: 'cubic-bezier(.2,.8,.2,1)' });
  });
}
