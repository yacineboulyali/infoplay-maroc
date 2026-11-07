// Aide en arabe « à la demande » : seule une petite pastille « ?AR » est visible.
// Un clic (ou Entrée / Espace) ouvre une mini-bulle collée à la pastille avec la traduction.
// Le reste de l'interface reste entièrement en français.
import { h } from '../utils/dom.js';

let installed = false;
let openBtn = null;
let seq = 0;

function close() {
  if (!openBtn) return;
  openBtn.setAttribute('aria-expanded', 'false');
  openBtn.classList.remove('is-open');
  if (openBtn.__arBubble) openBtn.__arBubble.remove();
  openBtn = null;
}

function place(btn, bubble) {
  const r = btn.getBoundingClientRect();
  const vw = document.documentElement.clientWidth;
  const vh = document.documentElement.clientHeight;
  const bw = bubble.offsetWidth, bh = bubble.offsetHeight;
  // Collée sous la pastille, sinon au-dessus si la place manque en bas.
  const below = r.bottom + 8 + bh <= vh || r.top - 8 - bh < 0;
  const top = below ? r.bottom + 8 : r.top - 8 - bh;
  const left = Math.max(8, Math.min(r.left + r.width / 2 - bw / 2, vw - bw - 8));
  bubble.style.left = `${Math.round(left)}px`;
  bubble.style.top = `${Math.round(top)}px`;
  bubble.style.setProperty('--arrow-x', `${Math.round(r.left + r.width / 2 - left)}px`);
  bubble.classList.toggle('is-above', !below);
}

function toggle(btn) {
  if (openBtn === btn) { close(); return; }
  close();
  const b = btn.__arBubble;
  if (!b) return;
  // Bulle rattachée à <body> : jamais coupée par un conteneur (overflow, transform…).
  document.body.append(b);
  btn.setAttribute('aria-expanded', 'true');
  btn.classList.add('is-open');
  openBtn = btn;
  place(btn, b);
}

function install() {
  if (installed || typeof document === 'undefined') return;
  installed = true;
  // Phase de capture : la pastille ne doit jamais déclencher la carte, l'option
  // ou le lien qui la contient (sélection de réponse, glisser-déposer, navigation…).
  const inHint = (e) => e.target.closest && e.target.closest('.arh-btn, .arh-bubble');
  for (const t of ['pointerdown', 'mousedown', 'touchstart', 'dragstart']) {
    document.addEventListener(t, (e) => { if (inHint(e)) e.stopPropagation(); }, true);
  }
  document.addEventListener('click', (e) => {
    const btn = e.target.closest && e.target.closest('.arh-btn');
    if (btn) { e.preventDefault(); e.stopPropagation(); toggle(btn); return; }
    if (inHint(e)) { e.preventDefault(); e.stopPropagation(); return; }
    close();
  }, true);
  document.addEventListener('keydown', (e) => {
    const btn = e.target.closest && e.target.closest('.arh-btn');
    if (btn && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.stopPropagation(); toggle(btn); return; }
    if (e.key === 'Escape' && openBtn) { const b = openBtn; close(); b.focus(); }
  }, true);
  window.addEventListener('resize', close);
  window.addEventListener('scroll', close, true);
  window.addEventListener('hashchange', close);
}

/** Pastille « ?AR » ; la traduction n'apparaît qu'au clic. Renvoie null si le texte est vide. */
export function arHint(text, extraClass = '') {
  if (!text) return null;
  install();
  const id = `arh-${++seq}`;
  const btn = h('span', {
    class: 'arh-btn' + (extraClass ? ' ' + extraClass : ''), role: 'button', tabindex: '0',
    'aria-expanded': 'false', 'aria-controls': id,
    'aria-label': 'Afficher la traduction en arabe', title: 'Traduction en arabe',
  },
  h('span', { class: 'arh-q', 'aria-hidden': 'true' }, '?'),
  h('span', { class: 'arh-ar', 'aria-hidden': 'true' }, 'AR'));
  btn.__arBubble = h('span', { class: 'arh-bubble', id, role: 'tooltip', lang: 'ar', dir: 'rtl' }, text);
  return btn;
}
