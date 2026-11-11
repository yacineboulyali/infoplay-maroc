import { h, shuffle } from '../utils/dom.js';
import { artFor, visualLabel } from './basic.js';
import { audio } from '../audio/audio.js';
import { slotVisual } from '../utils/item-visuals.js';
import { studentIllustration } from '../utils/student-illustrations.js';

// ---- Assemblage de l'ordinateur : boîtier en volume (CSS 3D), composants posés en relief ----
const partKind = (name) => { const t = name.toLowerCase(); return /carte m/.test(t) ? 'board' : /processeur|cpu/.test(t) ? 'cpu' : /ram|mémoire/.test(t) ? 'ram' : /ssd|disque/.test(t) ? 'ssd' : /ventil/.test(t) ? 'fan' : /aliment/.test(t) ? 'psu' : 'part'; };
export function asmGame(root, d) {
  const n = d.slots.length; const put = Array(n).fill(null); let sel = null; const used = new Set();
  const live = h('p', { class: 'hint-line', 'aria-live': 'polite' });
  const tray = h('div', { class: 'tray asm-tray', role: 'group', 'aria-label': 'Composants disponibles' });
  const slotEls = d.slots.map((s, i) => h('button', { type: 'button', class: 'slot', style: `left:${s.x}%;top:${s.y}%;width:${s.w}%;height:${s.h}%`, onclick: () => { if (!justDragged) place(i); }, onpointerdown: (e) => { if (put[i] != null) startDrag(e, put[i], i); } }));
  const wall = (side) => h('div', { class: 'case-wall ' + side, 'aria-hidden': 'true' });
  const case3d = h('div', { class: 'case3d' }, wall('l'), wall('r'), wall('t'), wall('b'), h('div', { class: 'case-grille', 'aria-hidden': 'true' }), h('div', { class: 'case-io', 'aria-hidden': 'true' }), slotEls);
  const rot = h('input', { type: 'range', min: '-38', max: '38', value: '-18', 'aria-label': 'Faire pivoter la vue du boîtier', oninput: () => { case3d.style.transform = `rotateY(${rot.value}deg) rotateX(10deg)`; } });
  case3d.style.transform = 'rotateY(-18deg) rotateX(10deg)';
  const parts = shuffle(d.parts.map((_, i) => i));

  // ---- Glisser-déposer au pointeur (souris, doigt, stylet) ; le clic reste possible ----
  let drag = null; let justDragged = false;
  const targetAt = (x, y) => { const el = document.elementFromPoint(x, y); const slot = el && el.closest('.slot'); const i = slot ? slotEls.indexOf(slot) : -1; return i >= 0 ? { slot: i } : el && el.closest('.asm-tray') ? { tray: true } : {}; };
  const mark = (t) => { slotEls.forEach((el, i) => el.classList.toggle('drag-over', t.slot === i)); tray.classList.toggle('drag-over', !!t.tray); };
  function startDrag(e, part, fromSlot) {
    if (e.button) return;
    drag = { part, fromSlot, sx: e.clientX, sy: e.clientY, ghost: null, src: e.currentTarget };
    window.addEventListener('pointermove', onMove); window.addEventListener('pointerup', onUp); window.addEventListener('pointercancel', onCancel);
  }
  function onMove(e) {
    if (!drag) return;
    if (!drag.ghost) {
      if (Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) < 7) return;
      drag.ghost = h('div', { class: 'asm-ghost', 'data-part': partKind(d.parts[drag.part].name), 'aria-hidden': 'true' }, d.parts[drag.part].name);
      document.body.append(drag.ghost); drag.src.classList.add('dragging'); audio.play('select');
    }
    drag.ghost.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    mark(targetAt(e.clientX, e.clientY)); e.preventDefault();
  }
  function stop() { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); window.removeEventListener('pointercancel', onCancel); if (drag && drag.ghost) drag.ghost.remove(); if (drag) drag.src.classList.remove('dragging'); mark({}); }
  function onCancel() { stop(); drag = null; }
  function onUp(e) {
    const g = drag; stop(); drag = null; if (!g || !g.ghost) return; // simple clic : géré par onclick
    justDragged = true; setTimeout(() => { justDragged = false; }, 0);
    const t = targetAt(e.clientX, e.clientY);
    if (t.slot != null && t.slot !== g.fromSlot) {
      const occupant = put[t.slot];
      if (g.fromSlot != null) put[g.fromSlot] = occupant; // échange entre deux emplacements
      else if (occupant != null) used.delete(occupant); // l'ancien composant retourne dans la liste
      put[t.slot] = g.part; used.add(g.part); sel = null; live.textContent = ''; audio.play('snap');
    } else if (t.slot == null && g.fromSlot != null) { put[g.fromSlot] = null; used.delete(g.part); sel = null; audio.play('pop'); live.textContent = 'Composant retiré du boîtier.'; }
    draw();
  }
  function place(i) {
    if (put[i] != null) { used.delete(put[i]); sel = put[i]; put[i] = null; audio.play('pop'); draw(); return; }
    if (sel == null) { live.textContent = 'Choisis d’abord un composant dans la liste.'; return; }
    put[i] = sel; used.add(sel); sel = null; live.textContent = ''; audio.play('snap'); draw();
  }
  function draw() {
    tray.replaceChildren(...parts.filter((p) => !used.has(p)).map((p) => h('button', { type: 'button', class: 'chip' + (studentIllustration(d, p) || artFor(d.parts[p].name) ? ' has-art' : '') + (sel === p ? ' sel' : ''), 'aria-pressed': String(sel === p), onpointerdown: (e) => startDrag(e, p, null), onclick: () => { if (justDragged) return; sel = sel === p ? null : p; if (sel != null) audio.play('select'); draw(); } }, visualLabel(d.parts[p].name, null, studentIllustration(d, p)))));
    if (!tray.children.length) tray.append(h('em', { class: 'muted' }, 'Tous les composants sont posés.'));
    slotEls.forEach((el, i) => { const p = put[i]; el.className = 'slot' + (p != null ? ' filled' : '') + (i === 0 ? ' base' : ''); el.dataset.part = p != null ? partKind(d.parts[p].name) : '';
      el.replaceChildren(p != null ? h('span', { class: 'placed' }, d.parts[p].name) : h('span', { class: 'slot-hint' }, slotVisual(d.slots[i]), d.slots[i].hint));
      el.setAttribute('aria-label', `Emplacement ${i + 1} : ${d.slots[i].hint}${p != null ? '. Contient : ' + d.parts[p].name : '. Vide'}`); });
  }
  root.append(h('p', { class: 'muted' }, 'Lis l’indice de chaque emplacement, puis fais glisser le composant dans le boîtier (ou clique sur le composant, puis sur l’emplacement). Tu peux déplacer un composant déjà posé. Le curseur fait pivoter la vue.'), tray, h('div', { class: 'stage' }, case3d), h('label', { class: 'rot' }, 'Vue : ', rot), live);
  draw();
  return {
    check() {
      const items = d.slots.map((s, i) => { const ok = put[i] === s.part; return { ok, msg: `${d.parts[s.part].name} : ${s.why}` }; });
      return { correct: items.filter((x) => x.ok).length, total: n, items, unanswered: put.filter((x) => x == null).length };
    },
    reveal(res) { slotEls.forEach((el, i) => el.classList.add(res.items[i].ok ? 'ok' : 'ko')); },
    solve() { d.slots.forEach((s, i) => { put[i] = s.part; used.add(s.part); }); draw(); },
  };
}

// ---- Construction d'un réseau : cliquer deux équipements pour (dé)brancher un câble ----
export function netGame(root, d) {
  const key = (a, b) => [a, b].sort().join('~');
  const need = new Set(d.links.map((l) => key(l[0], l[1])));
  const have = new Set(); let sel = null; const dev = Object.fromEntries(d.devices.map((x) => [x.id, x]));
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 100 100'); svg.setAttribute('preserveAspectRatio', 'none'); svg.setAttribute('class', 'netlines'); svg.setAttribute('aria-hidden', 'true');
  const live = h('p', { class: 'hint-line', 'aria-live': 'polite' });
  const list = h('ul', { class: 'netlist', 'aria-label': 'Câbles branchés' });
  const btns = d.devices.map((x, i) => h('button', { type: 'button', class: 'node', style: `left:${x.x}%;top:${x.y}%`, onclick: () => click(x.id) }, studentIllustration(d, i) || h('span', { class: 'ico' }, x.icon), h('span', null, x.label)));
  const board = h('div', { class: 'netboard' }, svg, btns);
  function click(id) {
    if (sel == null) { sel = id; audio.play('select'); live.textContent = `${dev[id].label} sélectionné : choisis l’équipement à relier.`; }
    else if (sel === id) { sel = null; live.textContent = ''; }
    else { const k = key(sel, id); if (have.has(k)) { have.delete(k); audio.play('pop'); live.textContent = 'Câble débranché.'; } else { have.add(k); audio.play('snap'); live.textContent = 'Câble branché.'; } sel = null; }
    draw();
  }
  function draw(res) {
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    for (const k of have) { const [a, b] = k.split('~'); const ln = document.createElementNS(NS, 'line');
      ln.setAttribute('x1', dev[a].x); ln.setAttribute('y1', dev[a].y); ln.setAttribute('x2', dev[b].x); ln.setAttribute('y2', dev[b].y);
      ln.setAttribute('class', 'netline' + (res ? (need.has(k) ? ' ok' : ' ko') : '')); svg.append(ln); }
    btns.forEach((b, i) => b.classList.toggle('sel', sel === d.devices[i].id));
    list.replaceChildren(...[...have].map((k) => { const [a, b] = k.split('~'); return h('li', null, `${dev[a].label} ↔ ${dev[b].label}`); }));
    if (!have.size) list.append(h('li', { class: 'muted' }, 'Aucun câble pour le moment.'));
  }
  root.append(h('p', { class: 'muted' }, 'Clique sur un équipement, puis sur celui auquel tu veux le relier. Clique de nouveau sur la même paire pour retirer le câble.'), board, live, list);
  draw();
  return {
    check() {
      const wrong = [...have].filter((k) => !need.has(k)).length;
      const items = d.links.map((l) => { const ok = have.has(key(l[0], l[1])); return { ok, msg: `${dev[l[0]].label} ↔ ${dev[l[1]].label}` + (l[2] ? ' : ' + l[2] : '') }; });
      if (wrong) items.push({ ok: false, info: true, msg: `${wrong} câble(s) en trop : relie seulement ce qui est nécessaire.` });
      const good = items.filter((x) => !x.info && x.ok).length;
      return { correct: Math.max(0, good - wrong), total: d.links.length, items, unanswered: have.size ? 0 : 1 };
    },
    reveal(res) { draw(true); },
    solve() { have.clear(); d.links.forEach((l) => have.add(key(l[0], l[1]))); draw(); },
  };
}
