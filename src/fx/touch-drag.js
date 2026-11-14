// Glisser au doigt : les navigateurs mobiles ne déclenchent pas le glisser-déposer HTML5 au toucher.
// Ce pont traduit un appui long suivi d'un glissement sur un élément [draggable="true"] en événements
// dragstart / dragenter / dragover / dragleave / drop / dragend, ce qui rend les jeux d'association,
// de classement et d'ordre manipulables au doigt sans modifier leurs moteurs.
// Un geste rapide fait toujours défiler la page ; un simple toucher garde le mode « toucher puis toucher ».
const HOLD_MS = 170; // durée de l'appui avant que la carte « décolle »
const SLOP_PX = 10; // mouvement toléré pendant l'appui (au-delà, c'est un défilement)
const EDGE_PX = 70; // zone près des bords qui fait défiler la page pendant le glissement

export function installTouchDrag(root = document) {
  if (typeof window === 'undefined' || typeof DataTransfer === 'undefined') return;
  let s = null; // geste en cours : { src, x, y, timer, dragging, dt, ghost, over, dx, dy, tick }

  const fire = (el, type, x, y) => {
    if (!el) return true;
    let ev;
    try { ev = new DragEvent(type, { bubbles: true, cancelable: true, clientX: x, clientY: y, dataTransfer: s.dt }); }
    catch { ev = new Event(type, { bubbles: true, cancelable: true }); Object.defineProperty(ev, 'dataTransfer', { value: s.dt }); }
    return el.dispatchEvent(ev);
  };

  const stop = () => {
    if (!s) return;
    clearTimeout(s.timer); clearTimeout(s.tick);
    s.ghost?.remove();
    s.src.classList.remove('touch-dragging');
    document.documentElement.classList.remove('touch-drag-on');
    s = null;
  };

  const lift = () => {
    if (!s || !s.src.isConnected) { stop(); return; }
    s.dragging = true;
    s.dt = new DataTransfer();
    fire(s.src, 'dragstart', s.x, s.y);
    const r = s.src.getBoundingClientRect();
    const g = s.src.cloneNode(true);
    g.removeAttribute('id'); g.setAttribute('aria-hidden', 'true'); g.classList.add('touch-ghost');
    g.style.cssText = `position:fixed;left:0;top:0;width:${r.width}px;height:${r.height}px;margin:0;pointer-events:none;z-index:9999;`;
    s.dx = s.x - r.left; s.dy = s.y - r.top;
    document.body.append(g); s.ghost = g; place(s.x, s.y);
    s.src.classList.add('touch-dragging');
    document.documentElement.classList.add('touch-drag-on');
    try { navigator.vibrate?.(12); } catch { /* vibration indisponible */ }
  };

  const place = (x, y) => { s.ghost.style.transform = `translate(${x - s.dx}px,${y - s.dy}px) rotate(-2deg) scale(1.03)`; };

  // Défilement automatique tant que le doigt reste près du haut ou du bas de l'écran.
  const autoScroll = () => {
    if (!s?.dragging) return;
    const v = s.y < EDGE_PX ? -(EDGE_PX - s.y) / 4 : s.y > innerHeight - EDGE_PX ? (s.y - innerHeight + EDGE_PX) / 4 : 0;
    if (v) { scrollBy(0, v); hover(s.x, s.y); }
    s.tick = setTimeout(autoScroll, 16);
  };

  const hover = (x, y) => {
    const t = document.elementFromPoint(x, y);
    if (t !== s.over) { fire(s.over, 'dragleave', x, y); fire(t, 'dragenter', x, y); s.over = t; }
    fire(t, 'dragover', x, y);
  };

  root.addEventListener('touchstart', (e) => {
    if (e.touches.length !== 1) { if (s?.dragging) fire(s.src, 'dragend', s.x, s.y); stop(); return; }
    const src = e.target.closest?.('[draggable="true"]');
    if (!src || e.target.closest('input,select,textarea,.ord-btns')) return;
    const t = e.touches[0];
    s = { src, x: t.clientX, y: t.clientY, over: null, dragging: false };
    s.timer = setTimeout(lift, HOLD_MS);
  }, { passive: true });

  root.addEventListener('touchmove', (e) => {
    if (!s) return;
    const t = e.touches[0];
    if (!s.dragging) { if (Math.hypot(t.clientX - s.x, t.clientY - s.y) > SLOP_PX) stop(); return; }
    e.preventDefault(); // la page ne défile pas pendant que la carte suit le doigt
    s.x = t.clientX; s.y = t.clientY;
    place(s.x, s.y); hover(s.x, s.y);
    if (!s.tick) s.tick = setTimeout(autoScroll, 16);
  }, { passive: false });

  root.addEventListener('touchend', (e) => {
    if (!s) return;
    if (!s.dragging) { stop(); return; } // simple toucher : le clic habituel suit
    e.preventDefault(); // pas de clic fantôme après le dépôt
    const t = e.changedTouches[0];
    s.ghost.remove();
    const target = document.elementFromPoint(t.clientX, t.clientY);
    if (target) fire(target, 'drop', t.clientX, t.clientY);
    fire(s.src, 'dragend', t.clientX, t.clientY);
    stop();
  }, { passive: false });

  root.addEventListener('touchcancel', () => { if (s?.dragging) fire(s.src, 'dragend', s.x, s.y); stop(); });

  // Certains navigateurs lancent aussi leur propre glisser natif à l'appui long : on le bloque
  // pour ne pas traiter le dépôt deux fois (nos événements, eux, ne sont pas « isTrusted »).
  root.addEventListener('dragstart', (e) => { if (s && e.isTrusted) { e.preventDefault(); e.stopImmediatePropagation(); } }, true);
  // Pas de menu « copier / ouvrir l'image » pendant l'appui long sur une carte.
  root.addEventListener('contextmenu', (e) => { if (s || (e.target.closest?.('[draggable="true"]') && matchMedia('(pointer:coarse)').matches)) e.preventDefault(); });
}
