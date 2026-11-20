// Schémas animés et interactifs des leçons : chaque élément se touche pour afficher son détail.
// HTML + CSS pour le texte (bidirectionnel, responsive), SVG pour les tracés.
import { h } from '../utils/dom.js';
import { trBtn, trLine } from './tr-ui.js';
import { sfx } from './sfx.js';

const NS = 'http://www.w3.org/2000/svg';
const s = (tag, attrs = {}, ...kids) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); kids.forEach((c) => c && e.append(c)); return e; };

/** Construit le schéma `v`. `color` = couleur de la partie ; `lang` = 'fr' | 'ar'. */
// Fenêtre d'explication : s'ouvre au centre quand on touche un élément, se ferme par le bouton, Échap ou un clic à côté.
function popup(label, detail, { color, lang, back }) {
  const close = () => { bg.classList.remove('open'); setTimeout(() => bg.remove(), 220); document.removeEventListener('keydown', onKey); back?.focus({ preventScroll: true }); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  const box = h('div', { class: 'ex-pop', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'ex-pop-t', dir: lang === 'ar' ? 'rtl' : 'ltr', lang, style: `--c:${color}` },
    h('button', { type: 'button', class: 'ex-pop-x', 'aria-label': lang === 'ar' ? 'إغلاق' : 'Fermer', onclick: close }, '✕'),
    h('h3', { id: 'ex-pop-t' }, label, trLine(label, lang)),
    h('p', null, detail, trLine(detail, lang)),
    lang === 'ar' ? null : h('div', { class: 'ex-pop-tr' }, trBtn(lang)),
    h('button', { type: 'button', class: 'ex-btn ex-primary', onclick: close }, lang === 'ar' ? 'إغلاق' : 'Fermer'));
  const bg = h('div', { class: 'ex-pop-bg ex-layer', onclick: (e) => { if (e.target === bg) close(); } }, box);
  document.body.append(bg); sfx('flip');
  document.addEventListener('keydown', onKey);
  requestAnimationFrame(() => bg.classList.add('open'));
  setTimeout(() => box.querySelector('.ex-primary').focus({ preventScroll: true }), 40);
}

export function visual(v, { color = '#6d4aff', lang = 'fr' } = {}) {
  const cap = h('p', { class: 'ex-cap' }, lang === 'ar' ? '👆 المس عنصرا لقراءة شرحه.' : '👆 Touche un élément pour lire son explication.');
  const show = (label, detail, el) => {
    wrap.querySelectorAll('.is-on').forEach((x) => x.classList.remove('is-on'));
    el?.classList.add('is-on');
    popup(label, detail, { color, lang, back: el });
  };
  const item = (cls, i, label, detail, ...kids) => {
    const el = h('button', { type: 'button', class: 'ex-vi ' + cls, style: `--i:${i}`, 'aria-label': `${label} : ${detail}` }, ...kids);
    el.addEventListener('click', () => show(label, detail, el));
    return el;
  };
  const build = BUILDERS[v.type] || BUILDERS.flow;
  const body = build(v, item, { show, lang });
  const replay = h('button', { type: 'button', class: 'ex-replay', title: lang === 'ar' ? 'إعادة الحركة' : 'Rejouer l’animation', 'aria-label': lang === 'ar' ? 'إعادة الحركة' : 'Rejouer l’animation' }, '↻');
  const wrap = h('figure', { class: 'ex-vis ex-v-' + v.type, style: `--c:${color}` }, replay, body, cap);
  replay.addEventListener('click', () => { const fresh = visual(v, { color, lang }); wrap.replaceWith(fresh); });
  return wrap;
}

const BUILDERS = {
  flow(v, item) {
    return h('ol', { class: 'ex-flow' }, v.steps.map(([l, d], i) => h('li', { style: `--i:${i}` },
      item('ex-node', i, l, d, h('span', { class: 'ex-num' }, String(i + 1)), h('span', null, l)),
      i < v.steps.length - 1 ? h('span', { class: 'ex-arrow', 'aria-hidden': 'true', style: `--i:${i}` }) : null)));
  },

  cycle(v, item) {
    const n = v.steps.length;
    const ring = h('div', { class: 'ex-cycle' },
      h('div', { class: 'ex-orbit', 'aria-hidden': 'true' }, h('i')),
      h('span', { class: 'ex-cycle-mid', 'aria-hidden': 'true' }, '↻'),
      v.steps.map(([l, d], i) => {
        const a = (-90 + (360 / n) * i) * Math.PI / 180;
        const el = item('ex-node ex-cnode', i, l, d, h('span', { class: 'ex-num' }, String(i + 1)), h('span', null, l));
        el.style.left = (50 + 40 * Math.cos(a)) + '%'; el.style.top = (50 + 40 * Math.sin(a)) + '%';
        return el;
      }));
    return ring;
  },

  pyramid(v, item) {
    const n = v.levels.length;
    return h('div', { class: 'ex-pyr' }, v.levels.map(([l, d], i) => item('ex-lvl', i, l, d, h('span', null, l)))
      .map((el, i) => { el.style.width = (100 - (78 / n) * i) + '%'; el.style.setProperty('--k', i / Math.max(1, n - 1)); return el; }));
  },

  triangle(v, item) {
    const P = [[150, 28], [48, 222], [252, 222]];
    const svg = s('svg', { viewBox: '0 0 300 250', class: 'ex-tri-svg', 'aria-hidden': 'true' },
      s('polygon', { points: P.map((p) => p.join(',')).join(' '), class: 'ex-tri-fill' }),
      ...[[0, 1], [1, 2], [2, 0]].map(([a, b], i) => s('line', { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], class: 'ex-tri-line', style: `--i:${i}` })));
    const pos = [['50%', '4%'], ['16%', '86%'], ['84%', '86%']];
    const nodes = v.nodes.map(([l, d], i) => { const el = item('ex-tnode', i, l, d, h('span', null, l)); el.style.left = pos[i][0]; el.style.top = pos[i][1]; return el; });
    const epos = [['24%', '46%'], ['50%', '97%'], ['76%', '46%']];
    const edges = v.edges.map(([l, d], i) => { const el = item('ex-tedge', i + 3, l, d, h('span', null, l)); el.style.left = epos[i][0]; el.style.top = epos[i][1]; return el; });
    return h('div', { class: 'ex-tri' }, svg, ...nodes, ...edges);
  },

  rings(v, item) {
    const n = v.rings.length;
    return h('div', { class: 'ex-rings' }, v.rings.map(([l, d], i) => {
      const size = 34 + (66 / Math.max(1, n - 1)) * i;
      const el = item('ex-ring', i, l, d, h('span', null, l));
      el.style.width = el.style.height = size + '%'; el.style.zIndex = String(n - i); el.style.setProperty('--k', i / Math.max(1, n - 1));
      return el;
    }).reverse());
  },

  versus(v, item) {
    const col = ([title, items], side) => h('div', { class: 'ex-vs-col ex-vs-' + side },
      h('h4', null, title),
      h('ul', null, items.map((t, i) => h('li', null, item('ex-vs-it', i + 1, title, t, h('span', null, t))))));
    return h('div', { class: 'ex-vs' }, col(v.a, 'a'), h('span', { class: 'ex-vs-mid', 'aria-hidden': 'true' }, 'VS'), col(v.b, 'b'));
  },

  grid(v, item) {
    return h('div', { class: 'ex-grid' }, v.items.map(([ico, l, d], i) => {
      const el = item('ex-tile', i, l, d, h('span', { class: 'ex-tile-in' },
        h('span', { class: 'ex-tile-f' }, h('span', { class: 'ex-ico', 'aria-hidden': 'true' }, ico), h('b', null, l)),
        h('span', { class: 'ex-tile-b' }, d)));
      return el;
    }));
  },

  stages(v, item) {
    return h('ol', { class: 'ex-stages' }, v.items.map(([tag, l, d], i) => h('li', { style: `--i:${i}` },
      item('ex-stage', i, l, d, h('span', { class: 'ex-tag' }, tag), h('b', null, l)))));
  },

  bars(v, item) {
    const max = Math.max(...v.items.map((x) => x[1]));
    return h('div', { class: 'ex-bars' }, v.items.map(([l, val, d], i) => item('ex-bar', i, l, d || `${val} ${v.unit || ''}`,
      h('span', { class: 'ex-bar-l' }, l),
      h('span', { class: 'ex-bar-t' }, h('span', { class: 'ex-bar-f', style: `--w:${(val / max) * 100}%` }), h('span', { class: 'ex-bar-v' }, `${val} ${v.unit || ''}`)))));
  },

  tree(v, item) {
    return h('div', { class: 'ex-tree' },
      h('div', { class: 'ex-root' }, v.root),
      h('div', { class: 'ex-kids' }, v.kids.map(([l, d], i) => item('ex-kid', i + 1, l, d, h('b', null, l), h('small', null, d)))));
  },

  branch(v, item, { lang }) {
    return h('div', { class: 'ex-branch' },
      h('div', { class: 'ex-cond' }, h('span', null, v.cond)),
      h('div', { class: 'ex-paths' },
        item('ex-path ex-yes', 1, v.yes[0], v.yes[1], h('b', null, v.yes[0]), h('span', null, v.yes[1])),
        item('ex-path ex-no', 2, v.no[0], v.no[1], h('b', null, v.no[0]), h('span', null, v.no[1]))),
      h('div', { class: 'ex-bend' }, lang === 'ar' ? 'نهاية' : 'Fin'));
  },

  trace(v, item) {
    return h('div', { class: 'ex-trace' }, v.rows.map(([ins, st], i) => item('ex-row', i, ins, st,
      h('code', null, ins), h('span', { class: 'ex-mem' }, st))));
  },

  line(v, item) {
    const W = 300; const x = (n) => 14 + ((n - v.min) / (v.max - v.min)) * (W - 28);
    const svg = s('svg', { viewBox: `0 0 ${W} 60`, class: 'ex-line-svg', 'aria-hidden': 'true' },
      s('line', { x1: 8, y1: 40, x2: W - 8, y2: 40, class: 'ex-axis' }),
      ...v.marks.map(([n], i) => s('circle', { cx: x(n), cy: 40, r: 6, class: 'ex-dot', style: `--i:${i}` })));
    const labels = h('div', { class: 'ex-line-l' }, v.marks.map(([n, l, d], i) => { const el = item('ex-mark', i, l, d, h('span', null, l)); el.style.left = (x(n) / W) * 100 + '%'; el.style.top = (i % 2 ? 0 : 52) + '%'; return el; }));
    return h('div', { class: 'ex-line' }, svg, labels);
  },

  star(v, item, { show, lang }) {
    const n = v.nodes.length;
    const svg = s('svg', { viewBox: '0 0 300 300', class: 'ex-star-svg', 'aria-hidden': 'true' },
      ...v.nodes.map((_, i) => { const a = (-90 + (360 / n) * i) * Math.PI / 180; return s('line', { x1: 150, y1: 150, x2: 150 + 112 * Math.cos(a), y2: 150 + 112 * Math.sin(a), class: 'ex-link', style: `--i:${i}` }); }));
    const wrap = h('div', { class: 'ex-star' }, svg);
    v.nodes.forEach((l, i) => {
      const a = (-90 + (360 / n) * i) * Math.PI / 180;
      const el = item('ex-snode', i, l, lang === 'ar' ? 'حاسوب متصل بالمحول.' : 'Relié au commutateur central.', h('span', null, l));
      el.style.left = (50 + 37.5 * Math.cos(a)) + '%'; el.style.top = (50 + 37.5 * Math.sin(a)) + '%';
      wrap.append(el);
    });
    const hub = h('button', { type: 'button', class: 'ex-vi ex-hub', 'aria-pressed': 'false' }, '🔀', h('small', null, v.center[0]));
    hub.addEventListener('click', () => {
      const down = wrap.classList.toggle('down'); hub.setAttribute('aria-pressed', String(down));
      show(v.center[0], down ? '⚠️ ' + v.center[1] : (lang === 'ar' ? 'أُصلح المحول: عاد الاتصال.' : 'Commutateur réparé : le réseau fonctionne de nouveau.'), hub);
    });
    wrap.append(hub);
    return wrap;
  },
};
