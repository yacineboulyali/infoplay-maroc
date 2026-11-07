// Moteur « Mission robot » en 3D : même logique et même notation que la version classique.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { h, reduced } from '../utils/dom.js';
import { audio } from '../audio/audio.js';
import { parseLevel, runProgram, shortest, robotGame } from '../games/robot.js';
import { makeRobot } from './models.js';
import { glyphTexture } from './textures.js';
import { webglAvailable } from './world.js';

const NAME = { A: 'Avancer', G: 'Pivoter à gauche', D: 'Pivoter à droite' };
const ICON = { A: '⬆ Avancer', G: '⟲ Gauche', D: '⟳ Droite' };
const yawOf = (d) => Math.PI / 2 - d * (Math.PI / 2);

export function robot3dGame(root, d) {
  if (!webglAvailable()) return robotGame(root, d);
  const lvs = d.levels.map((l) => ({ ...l, ...parseLevel(l.grid), best: shortest(parseLevel(l.grid)) }));
  const progs = lvs.map(() => []); const solved = lvs.map(() => false); let cur = 0;

  const tabs = h('div', { class: 'lvtabs', role: 'tablist' });
  const view = h('div', { class: 'robot3d-view', role: 'img', 'aria-label': 'Plateau du robot en 3D' });
  const seq = h('ol', { class: 'rseq', 'aria-label': 'Programme du robot' });
  const counter = h('span', { class: 'muted' });
  const msg = h('p', { class: 'hint-line', 'aria-live': 'polite' });
  const desc = h('p', { class: 'vh', 'aria-live': 'polite' });

  // ---------- scène ----------
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75)); renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  view.append(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1.6, 0.1, 100);
  const controls = new OrbitControls(camera, renderer.domElement); controls.enableDamping = true; controls.enablePan = false; controls.maxPolarAngle = Math.PI * 0.45; controls.minDistance = 4; controls.maxDistance = 22;
  scene.add(new THREE.HemisphereLight('#dfe6ff', '#c98b5a', 1.3));
  const sun = new THREE.DirectionalLight('#fff1d6', 2.2); sun.position.set(6, 10, 4); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8 }); scene.add(sun);
  const board = new THREE.Group(); scene.add(board);
  const bot = makeRobot('#c8431a'); bot.scale.setScalar(0.55); scene.add(bot);
  const tileGeo = new THREE.BoxGeometry(0.94, 0.2, 0.94); const wallGeo = new THREE.BoxGeometry(0.9, 0.8, 0.9);
  const mats = {
    a: new THREE.MeshStandardMaterial({ color: '#f7f2e8', roughness: 0.7 }), b: new THREE.MeshStandardMaterial({ color: '#e9dfc9', roughness: 0.7 }),
    wall: new THREE.MeshStandardMaterial({ color: '#6b77a8', roughness: 0.6, flatShading: true }),
    goal: new THREE.MeshStandardMaterial({ color: '#f2b418', emissive: '#f2b418', emissiveIntensity: 0.6 }),
    start: new THREE.MeshStandardMaterial({ color: '#9fd8ff', roughness: 0.6 }),
  };
  let flag = null;

  function buildBoard() {
    board.clear(); const lv = lvs[cur];
    lv.g.forEach((row, i) => row.forEach((ch, j) => {
      const tile = new THREE.Mesh(tileGeo, ch === 'G' ? mats.goal : ch === 'S' ? mats.start : (i + j) % 2 ? mats.a : mats.b); tile.position.set(j, -0.1, i); tile.receiveShadow = true; board.add(tile);
      if (ch === '#') { const w = new THREE.Mesh(wallGeo, mats.wall); w.position.set(j, 0.4, i); w.castShadow = w.receiveShadow = true; board.add(w); }
      if (ch === 'G') {
        flag = new THREE.Group(); flag.position.set(j, 0, i);
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.1), new THREE.MeshStandardMaterial({ color: '#1c2340' })); pole.position.y = 0.55; pole.castShadow = true; flag.add(pole);
        const cloth = new THREE.Mesh(new THREE.PlaneGeometry(0.45, 0.3), new THREE.MeshStandardMaterial({ color: '#c1272d', side: THREE.DoubleSide, emissive: '#c1272d', emissiveIntensity: 0.3 })); cloth.position.set(0.24, 0.95, 0); flag.add(cloth);
        const star = new THREE.Sprite(new THREE.SpriteMaterial({ map: glyphTexture('★', { color: '#0a7467' }), transparent: true })); star.scale.setScalar(0.22); star.position.set(0.24, 0.95, 0.01); flag.add(star);
        board.add(flag);
      }
    }));
    const cx = (lv.W - 1) / 2, cz = (lv.H - 1) / 2; const span = Math.max(lv.W, lv.H);
    const dist = span * 1.15 + 1.6; const dir = new THREE.Vector3(-0.12, 0.8, 0.62).normalize();
    controls.target.set(cx, 0, cz); camera.position.set(cx + dir.x * dist, dir.y * dist, cz + dir.z * dist); controls.update();
  }

  // ---------- animation ----------
  let anim = null; let raf = 0; const state = { x: 0, z: 0, yaw: 0, y: 0 };
  function place(p, victory = false) { state.x = p.c; state.z = p.r; state.yaw = yawOf(p.d); state.y = 0; apply(victory); }
  function apply() { bot.position.set(state.x, state.y, state.z); bot.rotation.y = state.yaw; }
  function play(trace, ok, done) {
    if (reduced()) { place(trace[trace.length - 1]); done(); return; }
    let k = 0; place(trace[0]);
    const next = () => {
      k++; if (k >= trace.length) { if (ok) victory(done); else done(); return; }
      const a = trace[k - 1], b = trace[k]; let dy = 0;
      if (b.d !== a.d) dy = ((b.d - a.d + 4) % 4 === 1 ? -1 : 1) * (Math.PI / 2);
      audio.play('robot');
      anim = { from: { x: state.x, z: state.z, yaw: state.yaw }, to: { x: b.c, z: b.r, yaw: state.yaw + dy }, bump: !!b.bump, start: performance.now(), dur: 420, then: next };
    };
    next();
  }
  function victory(done) { audio.play('success'); anim = { victory: true, start: performance.now(), dur: 900, base: state.yaw, then: done }; }
  function loop() {
    raf = requestAnimationFrame(loop);
    if (!view.isConnected) { stopAll(); return; }
    const t = performance.now();
    if (anim) {
      const k = Math.min(1, (t - anim.start) / anim.dur); const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      if (anim.victory) { state.y = Math.sin(k * Math.PI) * 0.6; state.yaw = anim.base + e * Math.PI * 2; }
      else if (anim.bump) { const s = Math.sin(k * Math.PI); const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]][((Math.round((Math.PI / 2 - anim.from.yaw) / (Math.PI / 2)) % 4) + 4) % 4]; state.x = anim.from.x + dir[0] * s * 0.25; state.z = anim.from.z + dir[1] * s * 0.25; }
      else { state.x = anim.from.x + (anim.to.x - anim.from.x) * e; state.z = anim.from.z + (anim.to.z - anim.from.z) * e; state.yaw = anim.from.yaw + (anim.to.yaw - anim.from.yaw) * e; state.y = Math.abs(Math.sin(k * Math.PI)) * 0.08; }
      apply();
      if (k >= 1) { const f = anim; anim = null; if (f.victory) { state.y = 0; state.yaw = f.base; apply(); } f.then && f.then(); }
    }
    if (flag && !reduced()) flag.children[1].rotation.y = Math.sin(t / 300) * 0.25;
    if (bot.userData.head && !reduced()) bot.userData.bulb.material.emissiveIntensity = 2 + Math.sin(t / 150) * 1.2;
    controls.update(); renderer.render(scene, camera);
  }
  function resize() { const w = view.clientWidth || 600, hh = view.clientHeight || 360; renderer.setSize(w, hh, false); camera.aspect = w / hh; camera.updateProjectionMatrix(); }
  const ro = new ResizeObserver(resize); ro.observe(view);
  function stopAll() { cancelAnimationFrame(raf); ro.disconnect(); renderer.dispose(); }

  // ---------- interface ----------
  function drawTabs() { tabs.replaceChildren(...lvs.map((_, i) => h('button', { type: 'button', role: 'tab', 'aria-selected': String(i === cur), class: 'tab' + (i === cur ? ' on' : '') + (solved[i] ? ' done' : ''), onclick: () => { anim = null; cur = i; draw(); } }, `Niveau ${i + 1}` + (solved[i] ? ' ✔' : '')))); }
  function drawSeq() {
    const p = progs[cur]; seq.replaceChildren(...p.map((c) => h('li', null, ICON[c])));
    if (!p.length) seq.append(h('li', { class: 'muted' }, 'Programme vide'));
    counter.textContent = `${p.length} / ${lvs[cur].max} commandes`;
  }
  function describe() {
    const lv = lvs[cur]; desc.textContent = `Niveau ${cur + 1} : grille de ${lv.H} lignes et ${lv.W} colonnes. Départ ligne ${lv.start[0] + 1}, colonne ${lv.start[1] + 1}, robot tourné vers la droite. Objectif ligne ${lv.goal[0] + 1}, colonne ${lv.goal[1] + 1}. Obstacles : ${lv.g.flatMap((r, i) => r.map((c, j) => (c === '#' ? `(${i + 1},${j + 1})` : null))).filter(Boolean).join(' ') || 'aucun'}.`;
  }
  function draw() { drawTabs(); drawSeq(); buildBoard(); place({ r: lvs[cur].start[0], c: lvs[cur].start[1], d: 0 }); msg.textContent = ''; describe(); }
  function add(c) { if (progs[cur].length >= lvs[cur].max) { msg.textContent = 'Programme complet : retire une commande ou simplifie.'; return; } progs[cur].push(c); drawSeq(); }
  function run() {
    anim = null; const lv = lvs[cur]; const res = runProgram(lv, progs[cur]); const lvl = cur; msg.textContent = 'Exécution…';
    play(res.trace, res.ok, () => { if (res.ok) solved[lvl] = true; if (lvl === cur) msg.textContent = res.reason; drawTabs(); });
  }
  const bar = h('div', { class: 'rbar' }, ['A', 'G', 'D'].map((c) => h('button', { type: 'button', class: 'btn', 'aria-label': NAME[c], onclick: () => add(c) }, ICON[c])),
    h('button', { type: 'button', class: 'btn ghost', onclick: () => { progs[cur].pop(); drawSeq(); } }, '⌫ Retirer la dernière'),
    h('button', { type: 'button', class: 'btn ghost', onclick: () => { progs[cur] = []; anim = null; draw(); } }, 'Tout effacer'),
    h('button', { type: 'button', class: 'btn primary', onclick: run }, '▶ Exécuter'));
  root.append(h('p', { class: 'muted' }, 'Le robot démarre tourné vers la droite. Fais glisser la scène pour tourner autour du plateau. Construis la suite de commandes, exécute-la, puis clique sur « Vérifier ».'),
    tabs, h('div', { class: 'rwrap robot3d-wrap' }, view, h('div', null, h('h3', { class: 'small-h' }, 'Programme'), seq, counter)), bar, msg, desc);
  draw(); requestAnimationFrame(() => { resize(); loop(); });

  return {
    check() {
      const items = lvs.map((lv, i) => ({ ok: solved[i], msg: `Niveau ${i + 1} : ` + (solved[i] ? 'réussi.' : 'non réussi.') + ` Une solution en ${lv.best.length} commandes : ${lv.best.map((c) => NAME[c].toLowerCase()).join(', ')}.` }));
      return { correct: solved.filter(Boolean).length, total: lvs.length, items, unanswered: 0 };
    },
    reveal() { anim = null; },
    solve() { lvs.forEach((lv, i) => { progs[i] = [...lv.best]; solved[i] = runProgram(lv, progs[i]).ok; }); draw(); },
    dispose: stopAll,
  };
}
