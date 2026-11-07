// Monde 3D d'InfoPlay Immersif : place centrale, 4 îles-modules, portails-séances.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { zelligeTexture, labelTexture, glyphTexture, dotTexture } from './textures.js';
import { makeRobot, makeComputer, makeWindows, makeGlobe, makeArch, makeRock, archShape } from './models.js';

export const MODULE_COLORS = { 1: '#4a5fe0', 2: '#13a190', 3: '#e8683a', 4: '#9159cf' };
const STATUS_COLORS = { todo: '#7f8bc4', doing: '#f2b418', done: '#2fd17a' };
const ISLAND_R = 17;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function webglAvailable() {
  try { const c = document.createElement('canvas'); return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl'))); } catch { return false; }
}

/**
 * @param {HTMLElement} host
 * @param {{modules: Array, onPick: Function, onHover: Function, reduced: () => boolean}} opts
 */
export function createWorld(host, { modules, onPick, onHover, reduced }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  // Téléphones : résolution et ombres allégées pour rester fluide sans chauffer.
  const lite = typeof matchMedia !== 'undefined' && matchMedia('(pointer: coarse)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.3 : 1.75));
  renderer.setSize(host.clientWidth, host.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.append(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog('#5a3d7e', 90, 260);
  const camera = new THREE.PerspectiveCamera(50, host.clientWidth / host.clientHeight, 0.1, 600);
  camera.position.set(0, 40, 70);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.07; controls.enablePan = false;
  controls.minDistance = 6; controls.maxDistance = 75; controls.maxPolarAngle = Math.PI * 0.47; controls.minPolarAngle = Math.PI * 0.12;
  controls.target.set(0, 1, 0);
  controls.addEventListener('start', () => { controls.autoRotate = false; });

  // ---------- ciel, étoiles, montagnes ----------
  const sky = new THREE.Mesh(new THREE.SphereGeometry(400, 32, 16), new THREE.ShaderMaterial({
    side: THREE.BackSide, depthWrite: false, fog: false,
    uniforms: { top: { value: new THREE.Color('#0b1036') }, mid: { value: new THREE.Color('#3b2a78') }, low: { value: new THREE.Color('#f39a5b') } },
    vertexShader: 'varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform vec3 top; uniform vec3 mid; uniform vec3 low; varying vec3 vP; void main(){ float y = vP.y; vec3 deep = vec3(0.10, 0.07, 0.24); vec3 c = y > 0.12 ? mix(mid, top, smoothstep(0.12, 0.7, y)) : y > -0.02 ? mix(low, mid, smoothstep(-0.02, 0.12, y)) : mix(low, deep, smoothstep(-0.02, -0.35, y)); gl_FragColor = vec4(c, 1.0); }',
  }));
  scene.add(sky);
  const dot = dotTexture();
  {
    const n = 1400; const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { const th = Math.random() * Math.PI * 2; const ph = Math.acos(Math.random() * 0.85 + 0.15); const r = 350; p.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th)], i * 3); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3));
    scene.add(new THREE.Points(g, new THREE.PointsMaterial({ size: 2.2, map: dot, transparent: true, depthWrite: false, fog: false, color: '#fff7d6' })));
  }
  {
    const mat = new THREE.MeshStandardMaterial({ color: '#3a2457', flatShading: true, roughness: 1 });
    for (let i = 0; i < 30; i++) {
      const a = (i / 30) * Math.PI * 2 + Math.random() * 0.12; const r = 200 + Math.random() * 25; const H = 30 + Math.random() * 22;
      const m = new THREE.Mesh(new THREE.ConeGeometry(26 + Math.random() * 16, H, 6), mat); m.position.set(Math.cos(a) * r, H / 2 - 30, Math.sin(a) * r); m.rotation.y = Math.random() * 3; scene.add(m);
    }
  }

  // ---------- lumières ----------
  scene.add(new THREE.HemisphereLight('#c3ccff', '#c98b5a', 1.0));
  const sun = new THREE.DirectionalLight('#ffe0b5', 2.4); sun.position.set(28, 40, 18); sun.castShadow = true;
  sun.shadow.mapSize.set(lite ? 1024 : 2048, lite ? 1024 : 2048); Object.assign(sun.shadow.camera, { left: -32, right: 32, top: 32, bottom: -32, near: 1, far: 120 }); sun.shadow.bias = -0.0005;
  scene.add(sun);

  // ---------- place centrale ----------
  const hub = new THREE.Group(); scene.add(hub);
  const terracotta = new THREE.MeshStandardMaterial({ color: '#c8643a', roughness: 0.8 });
  const plazaTop = new THREE.MeshStandardMaterial({ map: zelligeTexture(), roughness: 0.6 });
  const plaza = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 0.7, 64), [terracotta, plazaTop, terracotta]); plaza.receiveShadow = true; plaza.position.y = -0.35; hub.add(plaza);
  const hubRock = makeRock(8, 7, 7); hubRock.position.y = -4.2; hub.add(hubRock);
  // Fontaine
  const fountain = new THREE.Group(); hub.add(fountain);
  const stone = new THREE.MeshStandardMaterial({ color: '#f7f2e8', roughness: 0.6 });
  const basin = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.6, 0.6, 8), stone); basin.position.y = 0.3; basin.castShadow = basin.receiveShadow = true; fountain.add(basin);
  const water = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.05, 8), new THREE.MeshStandardMaterial({ color: '#4fd6ff', emissive: '#1aa6d9', emissiveIntensity: 0.9, roughness: 0.15, metalness: 0.2 })); water.position.y = 0.58; fountain.add(water);
  const col = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.4, 1.6, 8), stone); col.position.y = 1.2; col.castShadow = true; fountain.add(col);
  const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.9, 0), new THREE.MeshStandardMaterial({ color: '#f2b418', emissive: '#f2b418', emissiveIntensity: 1.6, flatShading: true, roughness: 0.3 }));
  crystal.position.y = 3.4; fountain.add(crystal);
  const crystalWire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.6, 1), new THREE.MeshBasicMaterial({ color: '#ffe9a6', wireframe: true, transparent: true, opacity: 0.35 })); crystalWire.position.y = 3.4; fountain.add(crystalWire);
  const hubLight = new THREE.PointLight('#ffcf6b', 30, 18, 2); hubLight.position.y = 3.4; fountain.add(hubLight);
  const title = sprite(labelTexture({ title: 'InfoPlay Maroc', sub: 'Choisis une île pour commencer', color: '#f2b418' }), 10); title.position.y = 7.2; hub.add(title);

  // ---------- îles ----------
  const pickables = []; const islands = {}; const portals = {}; const bridges = [];
  const landmarkFor = { 1: makeComputer, 2: makeWindows, 3: () => { const r = makeRobot('#c8431a'); r.scale.setScalar(1.7); return r; }, 4: makeGlobe };
  modules.forEach((m, i) => {
    const color = MODULE_COLORS[m.id];
    const ang = (i / modules.length) * Math.PI * 2 + Math.PI / 4;
    const dir = new THREE.Vector3(Math.cos(ang), 0, Math.sin(ang));
    const g = new THREE.Group(); g.position.copy(dir).multiplyScalar(ISLAND_R); g.position.y = 0.5; scene.add(g);
    const top = new THREE.Mesh(new THREE.CylinderGeometry(5, 5, 0.5, 12), [terracotta, new THREE.MeshStandardMaterial({ map: zelligeTexture(color, '#f2b418'), roughness: 0.7 }), terracotta]);
    top.receiveShadow = true; top.castShadow = true; g.add(top);
    const rock = makeRock(5, 5.5, 11 + i * 13); rock.position.y = -3; g.add(rock);
    const ringMat = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.4 });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(5.15, 0.09, 8, 72).rotateX(Math.PI / 2), ringMat); ring.position.y = 0.26; g.add(ring);
    const lm = landmarkFor[m.id](); lm.position.y = 0.25; lm.rotation.y = Math.atan2(dir.x, dir.z); g.add(lm);
    const icon = sprite(glyphTexture(m.icon, { bg: color }), 2); icon.position.y = 5.6; g.add(icon);
    const lab = sprite(labelTexture({ title: `Module ${m.id}`, sub: m.short || m.title, color, pct: 0 }), 8.5); lab.position.y = 8.2; g.add(lab);
    const light = new THREE.PointLight(color, 10, 14, 2); light.position.set(0, 3, 0); g.add(light);
    const hit = new THREE.Mesh(new THREE.CylinderGeometry(5.4, 5.4, 9, 12), new THREE.MeshBasicMaterial({ visible: false })); hit.position.y = 2.5; g.add(hit);
    hit.userData.target = { type: 'module', mi: m.id }; pickables.push(hit);
    islands[m.id] = { g, dir, ringMat, lab, lm, icon, color, base: g.position.y, phase: i * 1.7, hover: 0 };
    buildBridge(dir, color);
    // Arche d'entrée sur la place, orientée vers l'île
    const arch = makeArch(1.3, 1.7, 0.32, '#f7f2e8'); arch.position.copy(dir).multiplyScalar(7.2); arch.rotation.y = Math.atan2(dir.x, dir.z); hub.add(arch);
    const archGlow = new THREE.Mesh(new THREE.ShapeGeometry(archShape(0.98, 1.7, 0.32), 16), new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.35, side: THREE.DoubleSide, depthWrite: false })); archGlow.position.copy(arch.position); archGlow.rotation.copy(arch.rotation); hub.add(archGlow);
    // Portails des séances, en arc de cercle face à l'extérieur
    portals[m.id] = buildPortals(m, g, dir, color);
  });

  function buildBridge(dir, color) {
    const n = 9; const geo = new THREE.BoxGeometry(1.4, 0.18, 0.9); const mat = new THREE.MeshStandardMaterial({ color: '#f7f2e8', emissive: color, emissiveIntensity: 0.35, roughness: 0.5 });
    const inst = new THREE.InstancedMesh(geo, mat, n); inst.castShadow = true; inst.receiveShadow = true; const tmp = new THREE.Object3D();
    const yaw = Math.atan2(dir.x, dir.z);
    for (let k = 0; k < n; k++) { const t = (k + 0.5) / n; const r = 8 + t * (ISLAND_R - 5 - 8); tmp.position.copy(dir).multiplyScalar(r); tmp.position.y = -0.2 + Math.sin(t * Math.PI) * 0.6; tmp.rotation.set(0, yaw, 0); tmp.updateMatrix(); inst.setMatrixAt(k, tmp.matrix); }
    inst.userData = { dir, n, yaw }; bridges.push(inst); scene.add(inst);
  }

  function buildPortals(m, g, dir, color) {
    const list = []; const n = m.sessions.length; const spread = Math.min(Math.PI * 0.95, 0.36 * n);
    const base = Math.atan2(dir.z, dir.x);
    m.sessions.forEach((s, k) => {
      const a = base + (n === 1 ? 0 : -spread / 2 + (spread * k) / (n - 1));
      const p = new THREE.Group(); p.position.set(Math.cos(a) * 3.6, 0.25, Math.sin(a) * 3.6);
      const outward = new THREE.Vector3(Math.cos(a), 0, Math.sin(a));
      p.rotation.y = Math.atan2(outward.x, outward.z);
      const arch = makeArch(0.62, 1.0, 0.14, '#f7f2e8', 0.16); p.add(arch);
      const mat = portalMaterial(STATUS_COLORS.todo); const fill = new THREE.Mesh(new THREE.ShapeGeometry(archShape(0.48, 1.0, 0.14), 20), mat); fill.position.z = 0.01; p.add(fill);
      const num = sprite(glyphTexture(String(s.index), { bg: color }), 0.55); num.position.y = 1.95; p.add(num);
      const hit = new THREE.Mesh(new THREE.BoxGeometry(1.35, 2.3, 0.6), new THREE.MeshBasicMaterial({ visible: false })); hit.position.y = 1.05; p.add(hit);
      hit.userData.target = { type: 'session', mi: m.id, si: s.index }; pickables.push(hit);
      p.visible = false; p.scale.setScalar(0.001); g.add(p);
      list.push({ p, mat, outward, hover: 0, show: 0 });
    });
    return list;
  }

  function portalMaterial(color) {
    return new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide,
      uniforms: { t: { value: 0 }, col: { value: new THREE.Color(color) }, boost: { value: 0 } },
      vertexShader: 'varying vec2 vUv; void main(){ vUv = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'uniform float t; uniform vec3 col; uniform float boost; varying vec2 vUv; void main(){ vec2 c = vUv - vec2(0.0, 0.85); float r = length(c); float a = atan(c.y, c.x); float sw = sin(a*4.0 + r*10.0 - t*2.5)*0.5+0.5; float glow = 0.35 + 0.45*sw*(1.0-smoothstep(0.0,1.2,r)); gl_FragColor = vec4(col*(1.6+boost*1.5)*glow + vec3(0.15*boost), 0.75 + 0.2*boost); }',
    });
  }

  // ---------- poussières lumineuses ----------
  const motes = (() => {
    const n = 380; const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) p.set([(Math.random() - 0.5) * 70, Math.random() * 18 - 2, (Math.random() - 0.5) * 70], i * 3);
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(p, 3));
    const pts = new THREE.Points(g, new THREE.PointsMaterial({ size: 0.35, map: dot, color: '#ffd98a', transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    scene.add(pts); return pts;
  })();

  // ---------- post-traitement ----------
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(host.clientWidth / 2, host.clientHeight / 2), 0.45, 0.5, 0.88); composer.addPass(bloom);
  composer.addPass(new OutputPass());

  // ---------- sélection à la souris ----------
  const ray = new THREE.Raycaster(); const ndc = new THREE.Vector2(); let hovered = null; let down = null;
  const pick = (e) => {
    const r = renderer.domElement.getBoundingClientRect(); ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(pickables.filter((o) => isShown(o)), false)[0]; return hit ? hit.object.userData.target : null;
  };
  const isShown = (o) => { for (let x = o; x; x = x.parent) if (!x.visible) return false; return true; };
  const same = (a, b) => a && b && a.type === b.type && a.mi === b.mi && a.si === b.si;
  renderer.domElement.addEventListener('pointermove', (e) => {
    if (interactionLocked || e.pointerType === 'touch') return; // pas de survol au doigt
    const t = pick(e); if (!same(t, hovered)) { hovered = t; renderer.domElement.style.cursor = t ? 'pointer' : ''; onHover && onHover(t, e); } else if (t) onHover && onHover(t, e);
  });
  renderer.domElement.addEventListener('pointerleave', () => { hovered = null; onHover && onHover(null); });
  renderer.domElement.addEventListener('pointerdown', (e) => { down = [e.clientX, e.clientY]; });
  renderer.domElement.addEventListener('pointerup', (e) => {
    if (!down || interactionLocked) return; const moved = Math.hypot(e.clientX - down[0], e.clientY - down[1]); down = null;
    if (moved < 6) { const t = pick(e); if (t) onPick(t); }
  });

  // ---------- caméra ----------
  let inset = 0; let insetB = 0; let flight = null; let focusMod = null; let focusSi = null; let interactionLocked = false; let lowPower = false;
  function flyTo(pos, target, after) {
    controls.autoRotate = false;
    if (reduced()) { camera.position.copy(pos); controls.target.copy(target); controls.update(); after && after(); return; }
    flight = { p0: camera.position.clone(), t0: controls.target.clone(), p1: pos, t1: target, start: performance.now(), dur: 1500, after };
    controls.enabled = false;
  }
  // Écran en portrait (téléphone) : on recule la caméra pour garder la scène entière dans le cadre.
  function fit() { const a = host.clientWidth / Math.max(1, host.clientHeight - insetB * 0.6); return a >= 1.2 ? 1 : Math.min(2.1, 1.2 / a); }
  function islandWorld(mi) { return islands[mi].g.position.clone(); }
  function showPortals(mi) {
    for (const id in portals) portals[id].forEach((x) => { x.wanted = Number(id) === mi; if (x.wanted) x.p.visible = true; });
  }

  const api = {
    focusHub() {
      focusMod = null; focusSi = null; showPortals(null); interactionLocked = false; lowPower = false;
      const k = fit(); flyTo(new THREE.Vector3(0, 19 * k, 50 * k), new THREE.Vector3(0, 0, 0), () => { controls.autoRotate = !reduced(); controls.autoRotateSpeed = 0.35; });
      controls.minDistance = 14; controls.maxDistance = 75 * fit();
    },
    focusModule(mi) {
      focusMod = mi; focusSi = null; showPortals(mi); interactionLocked = false; lowPower = false;
      const c = islandWorld(mi); const d = islands[mi].dir;
      const k = fit(); flyTo(c.clone().add(d.clone().multiplyScalar(14 * k)).add(new THREE.Vector3(0, 5 * k, 0)), c.clone().add(new THREE.Vector3(0, 1.6, 0)));
      controls.minDistance = 6; controls.maxDistance = 30 * fit();
    },
    focusSession(mi, si) {
      focusMod = mi; focusSi = si; showPortals(mi); interactionLocked = false; lowPower = false;
      const pt = portals[mi][si - 1]; if (!pt) return;
      const c = islandWorld(mi); const wp = c.clone().add(pt.p.position);
      const k = fit(); flyTo(wp.clone().add(pt.outward.clone().multiplyScalar(4.6 * k)).add(new THREE.Vector3(0, 1.7 * k, 0)), wp.clone().add(new THREE.Vector3(0, 1.05, 0)));
      controls.minDistance = 3; controls.maxDistance = 16 * fit();
    },
    focusActivity(mi, si) {
      api.focusSession(mi, si); interactionLocked = true; lowPower = true;
      const done = () => { controls.autoRotate = !reduced(); controls.autoRotateSpeed = 0.6; };
      if (flight) flight.after = done; else done();
    },
    setProgress(stats) {
      // stats: { [mi]: { pct, sessions: { [si]: 'todo'|'doing'|'done' } } }
      for (const m of modules) {
        const s = stats[m.id]; if (!s) continue; const isl = islands[m.id];
        const nt = labelTexture({ title: `Module ${m.id}`, sub: `${m.short || m.title} · ${s.pct} %`, color: isl.color, pct: s.pct });
        isl.lab.material.map.dispose(); isl.lab.material.map = nt; isl.lab.material.needsUpdate = true;
        portals[m.id].forEach((pt, k) => { pt.mat.uniforms.col.value.set(STATUS_COLORS[s.sessions[k + 1] || 'todo']); });
      }
    },
    burst(perfect = false) {
      const at = focusMod ? controls.target.clone() : new THREE.Vector3(0, 3.4, 0);
      spawnBurst(at, perfect ? 260 : 120, perfect);
    },
    /** Largeur (px) masquée à droite par le panneau HTML : la scène se recentre sur la zone visible. */
    setInset(px, bottom = 0) { if (px !== inset || bottom !== insetB) { inset = px; insetB = bottom; api.resize(); } },
    resize() {
      const w = host.clientWidth, hh = host.clientHeight; const full = w + inset; const fullH = hh + insetB; camera.aspect = full / fullH;
      if (inset || insetB) camera.setViewOffset(full, fullH, inset, insetB, w, hh); else camera.clearViewOffset(); camera.updateProjectionMatrix();
      renderer.setSize(w, hh); composer.setSize(w, hh); bloom.setSize(w / 2, hh / 2);
    },
    setHighlight(t) { hovered = t; },
    camera, scene,
  };

  // ---------- gerbes de particules ----------
  const bursts = [];
  function spawnBurst(at, n, perfect) {
    if (reduced()) return;
    const pos = new Float32Array(n * 3); const col = new Float32Array(n * 3); const vel = [];
    const palette = ['#f2b418', '#2fd17a', '#4a5fe0', '#e8683a', '#ffffff', '#9159cf'].map((c) => new THREE.Color(c));
    for (let i = 0; i < n; i++) {
      pos.set([at.x, at.y, at.z], i * 3); const c = palette[i % palette.length]; col.set([c.r, c.g, c.b], i * 3);
      const v = new THREE.Vector3(Math.random() - 0.5, Math.random() * 0.9 + 0.4, Math.random() - 0.5).normalize().multiplyScalar(4 + Math.random() * (perfect ? 7 : 4)); vel.push(v);
    }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const pts = new THREE.Points(g, new THREE.PointsMaterial({ size: perfect ? 0.38 : 0.3, map: dot, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    scene.add(pts); bursts.push({ pts, vel, life: 0 });
  }

  // ---------- boucle d'animation ----------
  const clock = new THREE.Clock(); let frame = 0; let raf = 0; const tmp = new THREE.Object3D();
  function tick() {
    raf = requestAnimationFrame(tick); frame++;
    const dt = Math.min(clock.getDelta(), 0.05); const t = clock.elapsedTime; const still = reduced();
    if (lowPower && frame % 2) return; // le panneau d'activité est ouvert : on économise le processeur

    if (flight) {
      const k = Math.min(1, (performance.now() - flight.start) / flight.dur); const e = ease(k);
      camera.position.lerpVectors(flight.p0, flight.p1, e); controls.target.lerpVectors(flight.t0, flight.t1, e);
      if (k >= 1) { const f = flight; flight = null; controls.enabled = true; f.after && f.after(); }
    }
    controls.update();

    if (!still) {
      crystal.rotation.y += dt * 0.8; crystal.position.y = 3.4 + Math.sin(t * 1.5) * 0.18; crystalWire.rotation.y -= dt * 0.3; crystalWire.rotation.x += dt * 0.15;
      title.position.y = 7.2 + Math.sin(t) * 0.12;
      title.material.opacity += ((focusMod ? 0 : 1) - title.material.opacity) * Math.min(1, dt * 6); title.visible = title.material.opacity > 0.02;
      const mp = motes.geometry.attributes.position; for (let i = 0; i < mp.count; i++) { let y = mp.getY(i) + dt * 0.4; if (y > 16) y = -2; mp.setY(i, y); } mp.needsUpdate = true;
      for (const b of bridges) { const { dir, n, yaw } = b.userData; for (let k = 0; k < n; k++) { const tt = (k + 0.5) / n; const r = 8 + tt * (ISLAND_R - 5 - 8); tmp.position.copy(dir).multiplyScalar(r); tmp.position.y = -0.2 + Math.sin(tt * Math.PI) * 0.6 + Math.sin(t * 2 + k * 0.7) * 0.08; tmp.rotation.set(0, yaw, 0); tmp.updateMatrix(); b.setMatrixAt(k, tmp.matrix); } b.instanceMatrix.needsUpdate = true; }
    }
    for (const id in islands) {
      const isl = islands[id]; const isHover = hovered && hovered.type === 'module' && hovered.mi === Number(id);
      isl.hover += ((isHover ? 1 : 0) - isl.hover) * Math.min(1, dt * 8);
      if (!still) isl.g.position.y = isl.base + Math.sin(t * 0.8 + isl.phase) * 0.25;
      isl.ringMat.emissiveIntensity = 1.2 + isl.hover * 2.5 + (focusMod === Number(id) ? 1 : 0);
      isl.icon.position.y = 5.6 + (still ? 0 : Math.sin(t * 2 + isl.phase) * 0.15);
      const lm = isl.lm;
      if (!still) {
        if (lm.userData.spin) lm.userData.spin.rotation.y += dt * 0.4;
        if (lm.userData.float) lm.children.forEach((w) => { w.position.y = w.userData.base + Math.sin(t * 1.4 + w.userData.phase) * 0.12; });
        if (lm.userData.head) { lm.userData.head.rotation.y = Math.sin(t * 0.9) * 0.5; lm.userData.bulb.material.emissiveIntensity = 2 + Math.sin(t * 5) * 1.2; }
      }
    }
    for (const id in portals) portals[id].forEach((pt, k) => {
      const goal = pt.wanted ? 1 : 0; pt.show += (goal - pt.show) * Math.min(1, dt * (still ? 60 : 5 + k * 0.05));
      if (pt.show < 0.01 && !pt.wanted) { pt.p.visible = false; pt.p.scale.setScalar(0.001); return; }
      const isHover = hovered && hovered.type === 'session' && hovered.mi === Number(id) && hovered.si === k + 1;
      pt.hover += ((isHover ? 1 : 0) - pt.hover) * Math.min(1, dt * 8);
      pt.p.scale.setScalar(Math.max(0.001, pt.show * (1 + pt.hover * 0.12)));
      const selected = focusSi === k + 1 && focusMod === Number(id);
      pt.mat.uniforms.t.value = still ? 0 : t; pt.mat.uniforms.boost.value = Math.max(pt.hover, selected ? 0.7 + (still ? 0 : Math.sin(t * 3) * 0.3) : 0);
    });
    for (let i = bursts.length - 1; i >= 0; i--) {
      const b = bursts[i]; b.life += dt; const pa = b.pts.geometry.attributes.position;
      for (let k = 0; k < b.vel.length; k++) { const v = b.vel[k]; v.y -= 6 * dt; pa.setXYZ(k, pa.getX(k) + v.x * dt, pa.getY(k) + v.y * dt, pa.getZ(k) + v.z * dt); }
      pa.needsUpdate = true; b.pts.material.opacity = Math.max(0, 1 - b.life / 2.2);
      if (b.life > 2.2) { scene.remove(b.pts); b.pts.geometry.dispose(); b.pts.material.dispose(); bursts.splice(i, 1); }
    }
    composer.render();
  }
  window.addEventListener('resize', api.resize);
  api.focusHub();
  tick();
  api.dispose = () => { cancelAnimationFrame(raf); window.removeEventListener('resize', api.resize); renderer.dispose(); };
  return api;
}

function sprite(texture, width) {
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }));
  const aspect = texture.userData?.aspect || 1; s.scale.set(width, width / aspect, 1); return s;
}
