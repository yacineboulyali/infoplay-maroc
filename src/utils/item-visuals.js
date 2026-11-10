import { h, norm, svgFrom } from './dom.js';
import { generatedItemArt } from './generated-item-art.js';
import { semanticIcon, semanticKind } from './semantic-icons.js';
import { STUDENT_ILLUSTRATIONS } from '../data/student-illustrations.js';
import { ACTIVITIES } from '../data/index.js';

const images = new Map();
// Reuse the reviewed image when the exact concept is found elsewhere.
for (const activity of ACTIVITIES) {
  const { pairs, items, devices, parts } = activity.data;
  const labels = pairs?.map(([label]) => label) || items?.map(([label]) => label)
    || devices?.map(({ label }) => label) || parts?.map(({ name }) => name) || [];
  labels.forEach((label, index) => {
    const image = STUDENT_ILLUSTRATIONS[activity.id + '-q' + String(index + 1).padStart(2, '0')];
    if (image && !images.has(norm(label))) images.set(norm(label), image);
  });
}
for (const [label, index] of [
  ['clavier','01'], ['souris','02'], ['scanner','03'], ['écran','06'],
  ['haut-parleurs','07'], ['imprimante','08'], ['clé USB','10'],
]) {
  images.set(norm(label), STUDENT_ILLUSTRATIONS['m1-s2-a1-q' + index]);
}

const drawings = [
  [/\b(switch|commutateur)\b/, 'switch', '<rect x="2" y="7" width="20" height="10" rx="2"/><path d="M5 10h3v4H5zm6 0h3v4h-3zm6 0h3v4h-3z"/>'],
  [/\b(microphone|micro)\b/, 'microphone', '<rect x="9" y="2" width="6" height="13" rx="3"/><path d="M5 11a7 7 0 0 0 14 0m-7 7v4m-4 0h8"/>'],
  [/videoprojecteur/, 'projector', '<rect x="2" y="7" width="16" height="12" rx="2"/><circle cx="13" cy="13" r="3"/><path d="m20 11 3-3m-3 7 3 3"/>'],
  [/\b(fenetre|ruban|onglet|barre d.outils|barre des taches)\b/, 'window', '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M2 8h20m-5-3h3m-15 7h8m-8 4h12"/>'],
  [/\b(paysage|portrait|marges|a4|previsualis|apercu)\b/, 'page-layout', '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M7 6h10v12H7zm2 3h6m-6 3h6"/>'],
  [/\b(renomme|renommer|nommer|rebaptise)\b/, 'rename', '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M10 9h4m-2 0v6m-2 0h4"/>'],
  [/\b(cable|branch\w*|ethernet|port usb|hdmi|vga|rj45)\b/, 'plug', '<path d="M8 4v4m8-4v4M6 8h12v4a6 6 0 0 1-12 0zm6 10v4"/>'],
  [/\b(aliment\w*|electri\w*|allume\w*|eteint|energie)\b/, 'power', '<path d="M12 2v9M7 5a8 8 0 1 0 10 0"/>'],
  [/\b(carte mere|cpu|processeur|gpu|ram|barrette)\b/, 'chip', '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4"/>'],
  [/\b(cd|dvd|disque|ssd|hdd|stockage)\b/, 'disk', '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="12" cy="11" r="5"/><path d="m16 16-4-5m5 7h1"/>'],
  [/\b(digitalisation|numeris\w*|scanner)\b/, 'digitize', '<path d="M3 8h18v11H3zM5 5h14l2 3M7 15h7m3 0h1"/><path d="M8 2h8"/>'],
  [/\b(autorisation|autoriser|acces|permission)\b/, 'permission', '<circle cx="8" cy="9" r="4"/><path d="m11 12 8 8m-4-4 3-3m-1 5 3-3"/>'],
  [/\b(dir|mkdir|xcopy|cls|del|exit|dos|commande)\b|^cd\b/, 'terminal', '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m5 8 4 4-4 4m7 0h6"/>'],
  [/\b(octets?|bits?|kio|mio|ko|mo|go)\b/, 'binary', '<rect x="3" y="6" width="7" height="12" rx="3"/><path d="m14 9 4-3v12m-4 0h8"/>'],
  [/\b(synchronis\w*|restaure\w*|actualis\w*)\b/, 'sync', '<path d="M3 11a9 9 0 0 1 16-5l2 3m0-6v6h-6M21 13a9 9 0 0 1-16 5l-2-3m0 6v-6h6"/>'],
];

function vector(key, paths) {
  const svg = svgFrom('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + paths + '</svg>');
  svg.dataset.symbol = key;
  svg.classList.add('semantic-icon', 'item-visual-svg');
  return svg;
}

const stopWords = /^(a|au|aux|avec|ce|ces|dans|de|des|du|elle|et|il|la|le|les|leur|on|ou|par|pour|que|quel|quelle|qui|se|sur|un|une)$/;
function wordmark(label) {
  const words = norm(label).match(/[\p{L}\p{N}][\p{L}\p{N}.+_-]*/gu) || [];
  const keyword = words.find(word => !stopWords.test(word)) || words[0] || '•';
  const svg = vector('mot-repere', '<rect x="1" y="4" width="22" height="16" rx="3"/>');
  const text = document.createElementNS(svg.namespaceURI, 'text');
  text.setAttribute('x', '12');
  text.setAttribute('y', '14.2');
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('stroke', 'none');
  text.setAttribute('fill', 'currentColor');
  text.setAttribute('font-size', '5');
  text.setAttribute('font-weight', '700');
  text.textContent = keyword.slice(0, 6).toUpperCase();
  svg.append(text);
  return svg;
}

export function itemVisual(label, { allowImage = true } = {}) {
  const normalized = norm(label);
  const exact = normalized.replace(/^(?:(?:un|une|le|la|les|des)\s+|l')/, '');
  const src = allowImage && (images.get(normalized) || images.get(exact));
  if (src) return h('img', { class: 'item-visual-image', src, alt: '', loading: 'lazy', draggable: 'false',
    onerror: event => event.currentTarget.replaceWith(itemVisual(label, { allowImage: false })) });
  const generated = allowImage && generatedItemArt(normalized);
  if (generated) return generated;
  const drawing = drawings.find(([pattern]) => pattern.test(normalized));
  if (drawing) return vector(drawing[1], drawing[2]);
  const kind = semanticKind(label);
  return kind === 'text' ? wordmark(label) : semanticIcon(label, { kind });
}

export function slotVisual({ x, y, w, h: height }) {
  return vector('emplacement', '<rect x="2" y="2" width="20" height="20" rx="2"/><rect x="' + (2 + x / 5) + '" y="' + (2 + y / 5) + '" width="' + w / 5 + '" height="' + height / 5 + '" fill="currentColor" stroke="none"/>');
}
