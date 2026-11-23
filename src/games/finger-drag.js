// Glisser-déposer commun (doigt, stylet, souris) pour les exercices « glisser vers la bonne réponse ».
// Pendant le glissement, une copie de l'élément reste accrochée sous le doigt, réduite de 80 %
// (taille × 0,2), et la cible survolée s'allume.
// Doigt qui remonte = défilement de la page ; vers le bas ou sur le côté = glisser.
export const DRAG_SCALE = 0.2;

/**
 * @param {HTMLElement} el      élément à glisser
 * @param {object} o
 * @param {HTMLElement} o.root  zone de l'exercice (les cibles doivent s'y trouver)
 * @param {string} o.target     sélecteur des cibles de dépôt
 * @param {() => boolean} [o.can]          le glisser est-il permis maintenant ?
 * @param {(t: HTMLElement) => void} o.drop dépôt réussi sur la cible t
 * @param {() => void} [o.start]           début du glisser
 */
export function fingerDrag(el, o) {
  let start = null; let mode = null; let ghost = null; let over = null; let lastY = 0;
  let pos = null; let timer = null; // défilement automatique près des bords pendant le glisser
  const targetAt = (x, y) => {
    if (ghost) ghost.style.display = 'none';
    const hit = document.elementFromPoint(x, y)?.closest(o.target);
    if (ghost) ghost.style.display = '';
    return hit && o.root.contains(hit) && hit !== el ? hit : null;
  };
  const light = (t) => {
    if (t === over) return;
    over?.classList.remove('drag-over');
    t?.classList.add('drag-over');
    over = t;
  };
  const stop = () => {
    document.removeEventListener('pointermove', move);
    document.removeEventListener('pointerup', up);
    document.removeEventListener('pointercancel', cancel);
    clearInterval(timer); timer = null; pos = null;
    light(null);
    o.root.classList.remove('is-dragging');
    el.classList.remove('dragging-src');
    start = null; mode = null;
  };
  const begin = (e) => {
    mode = 'drag'; el.__dragged = true;
    const r = el.getBoundingClientRect();
    ghost = el.cloneNode(true);
    ghost.classList.add('drag-ghost'); ghost.setAttribute('aria-hidden', 'true');
    ghost.classList.remove('sel', 'drag-over');
    // Le point saisi reste sous le doigt : la réduction se fait autour de ce point.
    const gx = start.x - r.left; const gy = start.y - r.top;
    const s = DRAG_SCALE; // −80 % : la copie fait 20 % de la taille de la carte
    Object.assign(ghost.style, { position: 'fixed', margin: '0', zIndex: '3000', boxSizing: 'border-box', left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px`, transformOrigin: `${gx}px ${gy}px`, transform: 'none' });
    ghost.style.setProperty('--drag-scale', String(s));
    document.body.append(ghost);
    setTimeout(() => ghost && ghost.classList.add('shrunk'), 20);
    el.classList.add('dragging-src');
    o.root.classList.add('is-dragging');
    o.start?.();
    // Doigt près du haut ou du bas de l'écran : la page défile pour atteindre une cible cachée.
    timer = setInterval(() => {
      if (!pos) return;
      const edge = 90; const h = window.innerHeight;
      const v = pos.y > h - edge ? Math.min(20, 4 + (pos.y - (h - edge)) / 4) : pos.y < edge ? -Math.min(20, 4 + (edge - pos.y) / 4) : 0;
      if (v) { window.scrollBy(0, v); light(targetAt(pos.x, pos.y)); }
    }, 16);
  };
  const move = (e) => {
    if (!start) return;
    const dx = e.clientX - start.x; const dy = e.clientY - start.y;
    if (!mode) {
      if (Math.hypot(dx, dy) < 8) return;
      if (e.pointerType === 'touch' && dy < 0 && Math.abs(dy) > Math.abs(dx)) { mode = 'scroll'; lastY = e.clientY; } else begin(e);
    }
    if (mode === 'scroll') { window.scrollBy(0, lastY - e.clientY); lastY = e.clientY; return; }
    e.preventDefault();
    ghost.style.translate = `${dx}px ${dy}px`;
    pos = { x: e.clientX, y: e.clientY };
    light(targetAt(e.clientX, e.clientY));
  };
  const up = (e) => {
    if (mode === 'drag') {
      const t = targetAt(e.clientX, e.clientY);
      const g = ghost; ghost = null;
      if (t) {
        g.classList.add('dropping'); setTimeout(() => g.remove(), 180);
        o.drop(t);
      } else {
        // Lâché à côté : la copie revient à sa place et disparaît.
        g.classList.remove('shrunk'); g.style.transition = 'translate .25s ease, scale .25s ease'; g.style.translate = '0 0';
        setTimeout(() => g.remove(), 260);
      }
    }
    stop();
  };
  const cancel = () => { if (ghost) { ghost.remove(); ghost = null; } stop(); };
  el.addEventListener('pointerdown', (e) => {
    if ((o.can && !o.can()) || (e.pointerType === 'mouse' && e.button !== 0)) return;
    start = { x: e.clientX, y: e.clientY }; mode = null; el.__dragged = false;
    document.addEventListener('pointermove', move, { passive: false });
    document.addEventListener('pointerup', up);
    document.addEventListener('pointercancel', cancel);
  });
  el.addEventListener('dragstart', (e) => e.preventDefault()); // pas de glisser natif du navigateur
  // Le clic qui suit un glisser ne doit pas déclencher l'action du toucher simple.
  el.addEventListener('click', (e) => { if (el.__dragged) { el.__dragged = false; e.stopImmediatePropagation(); e.preventDefault(); } }, true);
  el.classList.add('finger-drag');
}
