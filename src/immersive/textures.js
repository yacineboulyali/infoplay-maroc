// Textures générées localement sur <canvas> : aucun fichier ni appel réseau.
import * as THREE from 'three';

const FONT = 'Nunito,"Segoe UI",system-ui,sans-serif';
const AR_FONT = 'Cairo,Tahoma,"Segoe UI",system-ui,sans-serif';

function canvas(w, hgt) { const c = document.createElement('canvas'); c.width = w; c.height = hgt; return c; }
function tex(c, { repeat = null } = {}) {
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
  if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat, repeat); }
  return t;
}

/** Motif de zellige (étoile à 8 branches) pour le sol de la place centrale. */
export function zelligeTexture(a = '#0a7467', b = '#f2b418', ground = '#f7f2e8', line = '#1c2340') {
  const S = 256; const c = canvas(S, S); const g = c.getContext('2d');
  g.fillStyle = ground; g.fillRect(0, 0, S, S);
  const star = (cx, cy, R, r, fill) => {
    g.beginPath();
    for (let i = 0; i < 16; i++) { const ang = (Math.PI / 8) * i - Math.PI / 2; const rad = i % 2 ? r : R; g.lineTo(cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad); }
    g.closePath(); g.fillStyle = fill; g.fill(); g.lineWidth = 4; g.strokeStyle = line; g.stroke();
  };
  for (const [x, y] of [[0, 0], [S, 0], [0, S], [S, S]]) star(x, y, 70, 48, a);
  star(S / 2, S / 2, 70, 48, b);
  for (const [x, y] of [[S / 2, 0], [0, S / 2], [S, S / 2], [S / 2, S]]) {
    g.beginPath(); g.moveTo(x, y - 22); g.lineTo(x + 22, y); g.lineTo(x, y + 22); g.lineTo(x - 22, y); g.closePath();
    g.fillStyle = '#c8431a'; g.fill(); g.lineWidth = 3; g.strokeStyle = line; g.stroke();
  }
  return tex(c, { repeat: 6 });
}

/** Étiquette (sprite) avec titre, sous-titre et ligne arabe facultative. */
export function labelTexture({ title, sub = '', ar = '', color = '#2b3fc4', pct = null }) {
  const W = 1024, H = ar ? 330 : 260; const c = canvas(W, H); const g = c.getContext('2d');
  const r = 46;
  g.beginPath(); g.roundRect(8, 8, W - 16, H - 16, r); g.fillStyle = 'rgba(14,18,40,.82)'; g.fill();
  g.lineWidth = 8; g.strokeStyle = color; g.stroke();
  g.fillStyle = '#fff'; g.font = `800 82px ${FONT}`; g.textBaseline = 'top'; g.textAlign = 'center';
  g.fillText(fit(g, title, W - 80), W / 2, 34);
  g.font = `700 50px ${FONT}`; g.fillStyle = '#ffd86b'; g.fillText(fit(g, sub, W - 80), W / 2, 130);
  if (ar) { g.font = `700 50px ${AR_FONT}`; g.fillStyle = '#c9d2ff'; g.direction = 'rtl'; g.fillText(fit(g, ar, W - 80), W / 2, 196); g.direction = 'ltr'; }
  if (pct != null) {
    const y = H - 48; g.fillStyle = 'rgba(255,255,255,.18)'; g.beginPath(); g.roundRect(80, y, W - 160, 18, 9); g.fill();
    g.fillStyle = color === '#f2b418' ? '#fff' : '#7dffb0'; g.beginPath(); g.roundRect(80, y, Math.max(18, (W - 160) * pct / 100), 18, 9); g.fill();
  }
  const t = tex(c); t.userData = { aspect: W / H }; return t;
}

function fit(g, text, max) {
  let s = String(text || ''); if (g.measureText(s).width <= max) return s;
  while (s.length > 3 && g.measureText(s + '…').width > max) s = s.slice(0, -1);
  return s + '…';
}

/** Gros chiffre / emoji centré, pour les portails et les icônes de module. */
export function glyphTexture(glyph, { color = '#fff', bg = null, size = 256, font = 800 } = {}) {
  const c = canvas(size, size); const g = c.getContext('2d');
  if (bg) { g.beginPath(); g.arc(size / 2, size / 2, size / 2 - 6, 0, Math.PI * 2); g.fillStyle = bg; g.fill(); g.lineWidth = 10; g.strokeStyle = '#fff'; g.stroke(); }
  g.fillStyle = color; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.font = `${font} ${Math.round(size * (String(glyph).length > 2 ? 0.42 : 0.62))}px ${FONT},"Segoe UI Emoji","Noto Color Emoji",sans-serif`;
  g.fillText(String(glyph), size / 2, size / 2 + size * 0.04);
  return tex(c);
}

/** Petite tache lumineuse douce (étoiles, poussière, étincelles). */
export function dotTexture() {
  const S = 64; const c = canvas(S, S); const g = c.getContext('2d');
  const grd = g.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2);
  grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.35, 'rgba(255,255,255,.55)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd; g.fillRect(0, 0, S, S); return tex(c);
}

/** Écran d'ordinateur : lignes de code lumineuses. */
export function screenTexture(accent = '#7dffb0') {
  const c = canvas(512, 320); const g = c.getContext('2d');
  const grd = g.createLinearGradient(0, 0, 0, 320); grd.addColorStop(0, '#16205a'); grd.addColorStop(1, '#0b1030'); g.fillStyle = grd; g.fillRect(0, 0, 512, 320);
  const words = ['si', 'alors', 'tant que', 'Écrire', 'Lire', 'pour', '←', 'fin'];
  g.font = `700 26px Consolas,monospace`;
  for (let i = 0; i < 9; i++) {
    let x = 26 + (i % 3) * 22; g.fillStyle = 'rgba(255,255,255,.35)'; g.fillText(String(i + 1), 8, 40 + i * 31);
    for (let k = 0; k < 3; k++) { const w = words[(i * 3 + k) % words.length]; g.fillStyle = k === 0 ? accent : k === 1 ? '#ffd86b' : '#c9d2ff'; g.fillText(w, x + 24, 40 + i * 31); x += g.measureText(w).width + 18; }
  }
  return tex(c);
}
