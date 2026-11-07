// Micro-interactions : inclinaison 3D des cartes, onde au clic, apparition au défilement.
import { reduced } from '../utils/dom.js';

export function installInteractions(root = document) {
  // Inclinaison 3D qui suit le pointeur ([data-tilt]).
  root.addEventListener('pointermove', (e) => {
    const el = e.target.closest && e.target.closest('[data-tilt]'); if (!el || reduced() || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg'); el.style.setProperty('--ry', (x * 10).toFixed(2) + 'deg');
    el.style.setProperty('--mx', ((x + 0.5) * 100).toFixed(1) + '%'); el.style.setProperty('--my', ((y + 0.5) * 100).toFixed(1) + '%');
    el.classList.add('tilting');
  }, { passive: true });
  root.addEventListener('pointerout', (e) => {
    const el = e.target.closest && e.target.closest('[data-tilt]'); if (!el || el.contains(e.relatedTarget)) return;
    el.classList.remove('tilting'); el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
  }, { passive: true });
  // Téléphone : la consigne repliée se déplie au toucher.
  root.addEventListener('click', (e) => {
    const b = e.target.closest && e.target.closest('.activity-brief'); if (!b || e.target.closest('a,button')) return;
    b.classList.toggle('open'); b.setAttribute('aria-expanded', String(b.classList.contains('open')));
  });
  // Onde au clic sur les boutons.
  root.addEventListener('pointerdown', (e) => {
    const b = e.target.closest && e.target.closest('.btn, .chip, .pick, .rp-tab, .hud-btn'); if (!b || reduced()) return;
    const r = b.getBoundingClientRect(); const s = Math.max(r.width, r.height) * 2;
    // L'onde vit dans un calque découpé : le bouton lui-même garde overflow visible (pastilles de correction).
    const wrap = document.createElement('span'); wrap.className = 'ripple-wrap'; wrap.setAttribute('aria-hidden', 'true');
    const w = document.createElement('span'); w.className = 'ripple';
    w.style.cssText = `width:${s}px;height:${s}px;left:${e.clientX - r.left - s / 2}px;top:${e.clientY - r.top - s / 2}px`;
    if (getComputedStyle(b).position === 'static') b.style.position = 'relative';
    wrap.append(w); b.append(wrap); setTimeout(() => wrap.remove(), 600);
  }, { passive: true });
}

/** Fait apparaître en cascade les éléments [data-reveal] d'une vue fraîchement affichée. */
export function revealIn(view) {
  const els = view.querySelectorAll('[data-reveal]');
  els.forEach((el, i) => { el.style.setProperty('--d', `${Math.min(i, 12) * 0.05}s`); el.classList.add('reveal'); });
}
