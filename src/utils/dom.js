// Utilitaires DOM sûrs : jamais d'innerHTML avec des données saisies par l'élève.
export function h(tag, attrs, ...kids) {
  const e = document.createElement(tag);
  if (attrs) for (const k in attrs) {
    const v = attrs[k];
    if (v == null || v === false) continue;
    if (k === 'class') e.className = v;
    else if (k.startsWith('on') && typeof v === 'function') e.addEventListener(k.slice(2), v);
    else if (k === 'value') e.value = v;
    else e.setAttribute(k, v === true ? '' : String(v));
  }
  append(e, kids);
  return e;
}
function append(e, kids) {
  for (const c of kids) {
    if (c == null || c === false) continue;
    if (Array.isArray(c)) append(e, c);
    else e.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
}
export function clear(el) { while (el.firstChild) el.removeChild(el.firstChild); return el; }

// Génération pseudo-aléatoire (injectable pour les tests)
let rng = Math.random;
export function setRng(f) { rng = f || Math.random; }
export function mulberry(seed) { return function () { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
export function shuffle(a, avoidIdentity = true) {
  const n = a.length; let b = a.slice();
  for (let t = 0; t < 10; t++) {
    b = a.slice();
    for (let i = n - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
    if (!avoidIdentity || n < 2 || b.some((x, i) => x !== a[i])) break;
  }
  return b;
}
export const norm = (s) => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').trim();
export const fmtNum = (n) => (typeof n === 'number' ? String(Math.round(n * 1e6) / 1e6).replace('.', ',') : String(n));
export const frDate = (iso) => { try { return new Date(iso).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }); } catch { return ''; } };
// Markup statique uniquement (scènes SVG écrites dans le code source).
export function svgFrom(markup) { const t = document.createElement('template'); t.innerHTML = markup.trim(); return t.content.firstElementChild; }
export function downloadText(name, text, mime = 'application/json') {
  const url = URL.createObjectURL(new Blob([text], { type: mime + ';charset=utf-8' }));
  const a = h('a', { href: url, download: name }); document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
export const reduced = () => typeof document !== 'undefined' && (document.body?.classList?.contains('reduced-motion') || (typeof window !== 'undefined' && window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches));

export function celebrate() {
  if (typeof window === 'undefined' || typeof document === 'undefined' || reduced()) return;
  const canvas = document.createElement('canvas');
  canvas.className = 'confetti-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: '9999',
  });
  document.body.append(canvas);
  const w = (canvas.width = window.innerWidth || 800);
  const h = (canvas.height = window.innerHeight || 600);
  const ctx = canvas.getContext && canvas.getContext('2d');
  if (!ctx) { canvas.remove(); return; }

  const colors = ['#f2b418', '#2b3fc4', '#c8431a', '#15703f', '#9159cf', '#0a7467'];
  const particles = Array.from({ length: 60 }, () => ({
    x: w * (0.2 + Math.random() * 0.6),
    y: h * 0.35,
    vx: (Math.random() - 0.5) * 12,
    vy: (Math.random() - 0.9) * 14,
    size: Math.random() * 7 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    rot: Math.random() * 360,
    vrot: (Math.random() - 0.5) * 10,
    gravity: 0.38,
    alpha: 1,
  }));

  let frame = 0;
  function step() {
    ctx.clearRect(0, 0, w, h);
    let alive = false;
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rot += p.vrot;
      if (frame > 25) p.alpha -= 0.02;
      if (p.alpha > 0) {
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }
    }
    frame++;
    if (alive && frame < 90) {
      requestAnimationFrame(step);
    } else {
      canvas.remove();
    }
  }
  requestAnimationFrame(step);
}
