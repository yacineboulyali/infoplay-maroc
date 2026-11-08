import { h, reduced } from '../utils/dom.js';
import { audio } from '../audio/audio.js';
import { studentIllustration } from '../utils/student-illustrations.js';

const DR = [[0, 1], [1, 0], [0, -1], [-1, 0]];
export function parseLevel(rows) {
  const g = rows.map((r) => r.split('')); let start, goal;
  g.forEach((r, i) => r.forEach((c, j) => { if (c === 'S') start = [i, j]; if (c === 'G') goal = [i, j]; }));
  return { g, start, goal, H: g.length, W: g[0].length };
}
/** Exécute un programme (liste de 'A','G','D'). Retourne {trace, ok, reason}. */
export function runProgram(lv, prog) {
  let [r, c] = lv.start, d = 0; const trace = [{ r, c, d }];
  for (const cmd of prog) {
    if (cmd === 'G') d = (d + 3) % 4; else if (cmd === 'D') d = (d + 1) % 4;
    else { const nr = r + DR[d][0], nc = c + DR[d][1];
      if (nr < 0 || nc < 0 || nr >= lv.H || nc >= lv.W || lv.g[nr][nc] === '#') { trace.push({ r, c, d, bump: true }); return { trace, ok: false, reason: 'Le robot heurte un obstacle ou sort de la grille.' }; }
      r = nr; c = nc; }
    trace.push({ r, c, d });
  }
  const ok = r === lv.goal[0] && c === lv.goal[1];
  return { trace, ok, reason: ok ? 'Objectif atteint !' : 'Le robot s’est arrêté trop tôt ou au mauvais endroit.' };
}
/** Plus court programme par BFS (pour vérifier que les niveaux sont résolvables). */
export function shortest(lv) {
  const q = [[lv.start[0], lv.start[1], 0, []]]; const seen = new Set([lv.start.join() + ',0']);
  while (q.length) { const [r, c, d, p] = q.shift(); if (r === lv.goal[0] && c === lv.goal[1]) return p;
    for (const cmd of ['A', 'G', 'D']) { let nr = r, nc = c, nd = d;
      if (cmd === 'G') nd = (d + 3) % 4; else if (cmd === 'D') nd = (d + 1) % 4; else { nr += DR[d][0]; nc += DR[d][1]; if (nr < 0 || nc < 0 || nr >= lv.H || nc >= lv.W || lv.g[nr][nc] === '#') continue; }
      const k = `${nr},${nc},${nd}`; if (!seen.has(k)) { seen.add(k); q.push([nr, nc, nd, [...p, cmd]]); } } }
  return null;
}
const ARROW = ['▶', '▼', '◀', '▲'];
const NAME = { A: 'Avancer', G: 'Pivoter à gauche', D: 'Pivoter à droite' };
const ICON = { A: '⬆ Avancer', G: '⟲ Gauche', D: '⟳ Droite' };

export function robotGame(root, d) {
  const lvs = d.levels.map((l) => ({ ...l, ...parseLevel(l.grid), best: shortest(parseLevel(l.grid)) }));
  const progs = lvs.map(() => []); const solved = lvs.map(() => false); let cur = 0; let timer = null;
  const tabs = h('div', { class: 'lvtabs', role: 'tablist' }); const board = h('div', { class: 'rgrid' }); const seq = h('ol', { class: 'rseq', 'aria-label': 'Programme du robot' }); const msg = h('p', { class: 'hint-line', 'aria-live': 'polite' });
  function drawBoard(pos) {
    const lv = lvs[cur]; board.style.gridTemplateColumns = `repeat(${lv.W}, 1fr)`;
    board.replaceChildren(...lv.g.flatMap((row, i) => row.map((ch, j) => { const here = pos && pos.r === i && pos.c === j;
      return h('div', { class: 'rcell' + (ch === '#' ? ' wall' : '') + (ch === 'G' ? ' goal' : ''), role: 'img', 'aria-label': ch === '#' ? 'obstacle' : ch === 'G' ? 'objectif' : ch === 'S' ? 'départ' : 'case libre' }, ch === 'G' ? '⚑' : ch === '#' ? '▩' : '', here ? h('span', { class: `bot robot-dir-${pos.d}` + (pos.bump ? ' bump' : '') + (pos.victory ? ' victory' : ''), 'aria-label': `robot orienté ${ARROW[pos.d]}` }, h('i', null, ARROW[pos.d])) : null); })));
  }
  function drawTabs() { tabs.replaceChildren(...lvs.map((_, i) => h('button', { type: 'button', role: 'tab', 'aria-selected': String(i === cur), class: 'tab' + (i === cur ? ' on' : '') + (solved[i] ? ' done' : ''), onclick: () => { stop(); cur = i; draw(); } }, `Niveau ${i + 1}` + (solved[i] ? ' ✔' : '')))); }
  function drawSeq() {
    const p = progs[cur]; seq.replaceChildren(...p.map((c, i) => h('li', null, ICON[c])));
    if (!p.length) seq.append(h('li', { class: 'muted' }, 'Programme vide'));
    counter.textContent = `${p.length} / ${lvs[cur].max} commandes`;
  }
  const counter = h('span', { class: 'muted' });
  const illustration = h('div', { class: 'student-level-illustration' });
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function draw() { illustration.replaceChildren(...[studentIllustration(d, cur)].filter(Boolean)); drawTabs(); drawSeq(); drawBoard({ r: lvs[cur].start[0], c: lvs[cur].start[1], d: 0 }); msg.textContent = ''; }
  function add(c) { if (progs[cur].length >= lvs[cur].max) { msg.textContent = 'Programme complet : retire une commande ou simplifie.'; return; } progs[cur].push(c); drawSeq(); }
  function run() {
    stop(); const lv = lvs[cur]; const res = runProgram(lv, progs[cur]); let k = 0;
    const finish = () => { if (res.ok) { solved[cur] = true; } msg.textContent = res.reason; drawTabs(); };
    if (reduced()) { drawBoard(res.trace[res.trace.length - 1]); finish(); return; }
    drawBoard(res.trace[0]);
    timer = setInterval(() => {
      k++;
      const isEnd = k >= res.trace.length - 1;
      const step = res.trace[Math.min(k, res.trace.length - 1)];
      audio.play(step.bump ? 'bump' : 'robot');
      drawBoard(isEnd && res.ok ? { ...step, victory: true } : step);
      if (isEnd) {
        stop();
        if (res.ok) audio.play('success');
        finish();
      }
    }, 380);
  }
  const bar = h('div', { class: 'rbar' }, ['A', 'G', 'D'].map((c) => h('button', { type: 'button', class: 'btn', 'aria-label': NAME[c], onclick: () => add(c) }, ICON[c])),
    h('button', { type: 'button', class: 'btn ghost', onclick: () => { progs[cur].pop(); drawSeq(); } }, '⌫ Retirer la dernière'), h('button', { type: 'button', class: 'btn ghost', onclick: () => { progs[cur] = []; stop(); draw(); } }, 'Tout effacer'),
    h('button', { type: 'button', class: 'btn primary', onclick: run }, '▶ Exécuter'));
  root.append(h('p', { class: 'muted' }, 'Le robot démarre tourné vers la droite (▶). Construis la suite de commandes, exécute-la autant de fois que tu veux, puis clique sur « Vérifier » quand tu as terminé.'), tabs, h('div', { class: 'rwrap' }, board, h('div', null, h('h3', { class: 'small-h' }, 'Programme'), seq, counter)), bar, msg);
  root.prepend(illustration);
  draw();
  return {
    check() {
      const items = lvs.map((lv, i) => ({ ok: solved[i], msg: `Niveau ${i + 1} : ` + (solved[i] ? 'réussi.' : 'non réussi.') + ` Une solution en ${lv.best.length} commandes : ${lv.best.map((c) => NAME[c].toLowerCase()).join(', ')}.` }));
      return { correct: solved.filter(Boolean).length, total: lvs.length, items, unanswered: 0 };
    },
    reveal() { stop(); },
    solve() { lvs.forEach((lv, i) => { progs[i] = [...lv.best]; solved[i] = runProgram(lv, progs[i]).ok; }); draw(); },
  };
}
