import { h, shuffle } from '../utils/dom.js';
import { artFor, visualLabel } from './basic.js';
import { audio } from '../audio/audio.js';
import { slotVisual } from '../utils/item-visuals.js';
import { studentIllustration } from '../utils/student-illustrations.js';

// ---- Assemblage 2,5D de l'ordinateur (CSS) ----
export function asmGame(root, d) {
  const n = d.slots.length; const put = Array(n).fill(null); let sel = null; const used = new Set();
  const live = h('p', { class: 'hint-line', 'aria-live': 'polite' });
  const tray = h('div', { class: 'tray', role: 'group', 'aria-label': 'Composants disponibles' });
  const slotEls = d.slots.map((s, i) => h('button', { type: 'button', class: 'slot', style: `left:${s.x}%;top:${s.y}%;width:${s.w}%;height:${s.h}%`, onclick: () => place(i) }));
  const case3d = h('div', { class: 'case3d' }, slotEls);
  const rot = h('input', { type: 'range', min: '-25', max: '25', value: '-12', 'aria-label': 'Faire pivoter la vue du boîtier', oninput: () => { case3d.style.transform = `rotateY(${rot.value}deg) rotateX(8deg)`; } });
  case3d.style.transform = 'rotateY(-12deg) rotateX(8deg)';
  const parts = shuffle(d.parts.map((_, i) => i));
  function place(i) {
    if (put[i] != null) { used.delete(put[i]); sel = put[i]; put[i] = null; audio.play('pop'); draw(); return; }
    if (sel == null) { live.textContent = 'Choisis d’abord un composant dans la liste.'; return; }
    put[i] = sel; used.add(sel); sel = null; live.textContent = ''; audio.play('snap'); draw();
  }
  function draw() {
    tray.replaceChildren(...parts.filter((p) => !used.has(p)).map((p) => h('button', { type: 'button', class: 'chip' + (studentIllustration(d, p) || artFor(d.parts[p].name) ? ' has-art' : '') + (sel === p ? ' sel' : ''), 'aria-pressed': String(sel === p), onclick: () => { sel = sel === p ? null : p; if (sel != null) audio.play('select'); draw(); } }, visualLabel(d.parts[p].name, null, studentIllustration(d, p)))));
    if (!tray.children.length) tray.append(h('em', { class: 'muted' }, 'Tous les composants sont posés.'));
    slotEls.forEach((el, i) => { const p = put[i]; el.className = 'slot' + (p != null ? ' filled' : '') + (i === 0 ? ' base' : '');
      el.replaceChildren(p != null ? h('span', { class: 'placed' }, d.parts[p].name) : h('span', { class: 'slot-hint' }, slotVisual(d.slots[i]), d.slots[i].hint));
      el.setAttribute('aria-label', `Emplacement ${i + 1} : ${d.slots[i].hint}${p != null ? '. Contient : ' + d.parts[p].name : '. Vide'}`); });
  }
  root.append(h('p', { class: 'muted' }, 'Lis l’indice de chaque emplacement, choisis le composant, puis clique sur l’emplacement. Le curseur fait pivoter la vue.'), tray, h('div', { class: 'stage' }, case3d), h('label', { class: 'rot' }, 'Vue : ', rot), live);
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
