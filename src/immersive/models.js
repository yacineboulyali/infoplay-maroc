// Modèles 3D construits uniquement avec des primitives Three.js (aucun fichier externe).
import * as THREE from 'three';
import { screenTexture } from './textures.js';

const std = (color, x = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.55, metalness: 0.08, ...x });
const glow = (color, intensity = 2.2) => new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: intensity, roughness: 0.4 });

function mesh(geo, mat, { x = 0, y = 0, z = 0, cast = true } = {}) {
  const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); m.castShadow = cast; m.receiveShadow = true; return m;
}

/** Robot sympathique : utilisé sur l'île 3 et dans l'activité « Mission robot ». */
export function makeRobot(color = '#c8431a') {
  const g = new THREE.Group(); const body = std(color); const white = std('#f7f2e8'); const dark = std('#1c2340');
  g.add(mesh(new THREE.BoxGeometry(0.9, 0.75, 0.7), body, { y: 0.62 }));
  g.add(mesh(new THREE.BoxGeometry(0.62, 0.36, 0.05), white, { y: 0.66, z: 0.36 }));
  const head = new THREE.Group(); head.position.y = 1.28; g.add(head);
  head.add(mesh(new THREE.BoxGeometry(0.78, 0.52, 0.62), white));
  head.add(mesh(new THREE.BoxGeometry(0.62, 0.3, 0.04), dark, { z: 0.32 }));
  const eyeM = glow('#7dffe0', 3);
  head.add(mesh(new THREE.SphereGeometry(0.07, 12, 8), eyeM, { x: -0.15, z: 0.35, cast: false }));
  head.add(mesh(new THREE.SphereGeometry(0.07, 12, 8), eyeM, { x: 0.15, z: 0.35, cast: false }));
  head.add(mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.3), dark, { y: 0.4 }));
  const bulb = mesh(new THREE.SphereGeometry(0.08, 12, 8), glow('#f2b418', 3), { y: 0.58, cast: false }); head.add(bulb);
  for (const s of [-1, 1]) {
    g.add(mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.18, 16).rotateZ(Math.PI / 2), dark, { x: s * 0.4, y: 0.2 }));
    const arm = mesh(new THREE.CapsuleGeometry(0.08, 0.36, 4, 8), body, { x: s * 0.56, y: 0.62 }); arm.rotation.z = s * 0.25; g.add(arm);
  }
  g.userData = { head, bulb, eyeM };
  return g;
}

/** Ordinateur de bureau (île 1). */
export function makeComputer() {
  const g = new THREE.Group(); const shell = std('#e9ecf7'); const dark = std('#1c2340');
  const scr = new THREE.MeshStandardMaterial({ map: screenTexture(), emissive: '#ffffff', emissiveMap: screenTexture(), emissiveIntensity: 0.9 });
  g.add(mesh(new THREE.BoxGeometry(2.6, 1.7, 0.16), dark, { y: 2.05 }));
  g.add(mesh(new THREE.PlaneGeometry(2.4, 1.5), scr, { y: 2.05, z: 0.085, cast: false }));
  g.add(mesh(new THREE.CylinderGeometry(0.09, 0.12, 0.9), shell, { y: 0.95, z: -0.05 }));
  g.add(mesh(new THREE.BoxGeometry(1.0, 0.08, 0.6), shell, { y: 0.5 }));
  g.add(mesh(new THREE.BoxGeometry(1.9, 0.08, 0.6), shell, { y: 0.5, z: 1.0 }));
  for (let i = 0; i < 4; i++) for (let j = 0; j < 12; j++) g.add(mesh(new THREE.BoxGeometry(0.12, 0.05, 0.1), dark, { x: -0.8 + j * 0.145, y: 0.56, z: 0.8 + i * 0.13, cast: false }));
  const tower = new THREE.Group(); tower.position.set(1.9, 0, -0.1); g.add(tower);
  tower.add(mesh(new THREE.BoxGeometry(0.7, 1.7, 1.3), shell, { y: 1.31 }));
  tower.add(mesh(new THREE.BoxGeometry(0.04, 0.1, 0.1), glow('#7dffb0', 3), { x: 0.36, y: 1.9, z: 0.4, cast: false }));
  g.add(mesh(new THREE.CapsuleGeometry(0.11, 0.12, 4, 8).rotateX(Math.PI / 2), shell, { x: 1.2, y: 0.58, z: 1.0 }));
  return g;
}

/** Fenêtres de logiciels flottantes (île 2). */
export function makeWindows() {
  const g = new THREE.Group(); const cols = ['#2b3fc4', '#0a7467', '#c8431a', '#f2b418'];
  cols.forEach((c, i) => {
    const w = new THREE.Group(); w.position.set((i - 1.5) * 0.55, 1.2 + i * 0.55, (i % 2) * 0.3 - i * 0.15); w.rotation.y = (i - 1.5) * 0.18;
    w.add(mesh(new THREE.BoxGeometry(1.8, 1.2, 0.06), std('#ffffff')));
    w.add(mesh(new THREE.BoxGeometry(1.8, 0.2, 0.08), glow(c, 0.9), { y: 0.5, cast: false }));
    for (let k = 0; k < 3; k++) w.add(mesh(new THREE.BoxGeometry(1.2 - k * 0.25, 0.08, 0.07), std('#c9d2ff'), { x: -0.2 + k * 0.1, y: 0.18 - k * 0.22, cast: false }));
    w.userData.base = w.position.y; w.userData.phase = i; g.add(w);
  });
  g.userData.float = true; return g;
}

/** Globe et satellites reliés (île 4). */
export function makeGlobe() {
  const g = new THREE.Group(); const core = new THREE.Group(); core.position.y = 2.1; g.add(core);
  core.add(mesh(new THREE.IcosahedronGeometry(1.15, 2), std('#2b3fc4', { flatShading: true })));
  core.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 1), new THREE.MeshBasicMaterial({ color: '#9fd8ff', wireframe: true, transparent: true, opacity: 0.55 })));
  const nodes = []; const line = new THREE.LineBasicMaterial({ color: '#ffd86b', transparent: true, opacity: 0.8 });
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2; const p = new THREE.Vector3(Math.cos(a) * 2.1, Math.sin(a * 2) * 0.5, Math.sin(a) * 2.1);
    core.add(mesh(new THREE.OctahedronGeometry(0.16), glow('#f2b418', 2.5), { x: p.x, y: p.y, z: p.z, cast: false })); nodes.push(p);
  }
  const pts = []; nodes.forEach((p, i) => { pts.push(new THREE.Vector3(), p, p, nodes[(i + 1) % nodes.length]); });
  core.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), line));
  g.add(mesh(new THREE.CylinderGeometry(0.12, 0.3, 1.0, 8), std('#6d3aa8'), { y: 0.5 }));
  g.userData.spin = core; return g;
}

/** Contour d'arc marocain : demi-largeur r, montants de hauteur h, seuil à y0. */
export function archShape(r, h, y0 = 0) {
  const s = new THREE.Shape();
  s.moveTo(-r, y0); s.lineTo(-r, h); s.absarc(0, h, r, Math.PI, 0, true); s.lineTo(r, y0); s.lineTo(-r, y0);
  return s;
}
export function makeArch(w, h, thick, color, depth = 0.25) {
  // Le trou ne touche pas le bas (seuil) pour une triangulation propre.
  const outer = archShape(w, h); outer.holes.push(archShape(w - thick, h, thick));
  const geo = new THREE.ExtrudeGeometry(outer, { depth, bevelEnabled: true, bevelSize: 0.04, bevelThickness: 0.04, bevelSegments: 2, curveSegments: 24 });
  geo.translate(0, 0, -depth / 2);
  return mesh(geo, std(color, { roughness: 0.45 }));
}

/** Rocher flottant low-poly (dessous des îles). */
export function makeRock(radius, height, seed = 1, color = '#c98b5a') {
  const geo = new THREE.CylinderGeometry(radius, radius * 0.25, height, 10, 4); const pos = geo.attributes.position; let s = seed;
  const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i); if (y > height / 2 - 0.01) continue;
    const k = 1 + (rnd() - 0.5) * 0.35; pos.setX(i, pos.getX(i) * k); pos.setZ(i, pos.getZ(i) * k); pos.setY(i, y + (rnd() - 0.5) * 0.4);
  }
  geo.computeVertexNormals();
  return mesh(geo, std(color, { flatShading: true, roughness: 0.9 }));
}
