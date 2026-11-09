import { h, norm, svgFrom } from '../utils/dom.js';
import { semanticIcon } from '../utils/semantic-icons.js';
import { STUDENT_ILLUSTRATIONS } from '../data/student-illustrations.js';
import { ports, portPictures } from '../data/egtsi106/lesson.js';

const exact = new Map(ports.map(([name], i) => [norm(name), portPictures[i]]));
for (const [name, id] of [
  ['clavier','01'], ['souris','02'], ['scanner','03'], ['écran','06'],
  ['haut-parleurs','07'], ['imprimante','08'], ['clé usb','10'],
]) exact.set(norm(name), STUDENT_ILLUSTRATIONS['m1-s2-a1-q' + id]);

const screen = '<rect x="8" y="5" width="16" height="14" rx="2"/><path d="M16 19v4m-5 0h10"/>';
const device = '<rect x="3" y="10" width="10" height="9" rx="2"/><path d="M6 14h1m2 0h1M19 8h10v10H19zM24 18v4m-3 0h6"/>';
const drawings = {
  input: device + '<path d="M14 14h4m-2-2 2 2-2 2"/>',
  output: screen + '<path d="M25 12h5m-2-2 2 2-2 2"/>',
  duplex: device + '<path d="M14 12h4l-2-2m2 6h-4l2 2"/>',
  microphone: '<rect x="12" y="4" width="8" height="14" rx="4"/><path d="M8 14a8 8 0 0 0 16 0M16 22v6m-5 0h10"/>',
  projector: '<rect x="3" y="10" width="19" height="12" rx="2"/><circle cx="16" cy="16" r="3"/><path d="m24 13 5-3m-5 9 5 3M6 15h4m-4 3h4"/>',
  touch: screen + '<path d="M19 25v-8a2 2 0 0 1 4 0v3l5 1v5l-3 3h-5l-4-5z"/>',
  drive: '<rect x="5" y="6" width="22" height="20" rx="3"/><circle cx="15" cy="15" r="5"/><path d="m22 22-6-6m6-6h2"/>',
  headset: '<path d="M5 18v-3a11 11 0 0 1 22 0v3M25 24l-4 4h-5"/><rect x="4" y="16" width="6" height="9" rx="2"/><rect x="22" y="16" width="6" height="9" rx="2"/>',
  router: '<rect x="3" y="18" width="26" height="9" rx="2"/><path d="M7 18V8m18 10V8M8 23h2m3 0h2m3 0h2M12 10a6 6 0 0 1 8 0m-6 3a3 3 0 0 1 4 0"/>',
  phone: '<rect x="9" y="3" width="14" height="26" rx="3"/><path d="M12 7h8m-6 18h4"/>',
  chip: '<rect x="8" y="8" width="16" height="16" rx="2"/><rect x="12" y="12" width="8" height="8"/><path d="M12 3v5m8-5v5M12 24v5m8-5v5M3 12h5m-5 8h5m16-8h5m-5 8h5"/>',
  ram: '<path d="M3 10h26v12H3zM7 14h4v4H7zm7 0h4v4h-4zm7 0h4v4h-4zM7 22v3m6-3v3m6-3v3m6-3v3"/>',
  cloud: '<path d="M9 24a5 5 0 0 1-1-10 8 8 0 0 1 15 0 5 5 0 0 1 0 10z"/>',
  terminal: '<rect x="3" y="5" width="26" height="22" rx="2"/><path d="m7 12 5 4-5 4m8 0h8"/>',
  wifi: '<path d="M4 11a19 19 0 0 1 24 0m-20 5a12 12 0 0 1 16 0m-12 5a6 6 0 0 1 8 0"/><circle cx="16" cy="26" r="1"/>',
  binary: '<rect x="5" y="9" width="9" height="14" rx="4"/><path d="m18 13 5-4v14m-5 0h10"/>',
};

const shapes = [
  [/^entree et sortie$|envoyer et recevoir/, 'duplex'],
  [/^entree$|saisie d'une donnee|introduit des donnees/, 'input'],
  [/^sortie$|restitution du resultat/, 'output'],
  [/microphone|capte le son/, 'microphone'], [/videoprojecteur|projette l'image/, 'projector'],
  [/ecran tactile/, 'touch'], [/casque/, 'headset'], [/modem|\bbox\b|routeur/, 'router'],
  [/telephone|smartphone|appareil mobile|android|liseuse/, 'phone'],
  [/\bram\b|barrette|memoire vive/, 'ram'], [/\bcpu\b|processeur|execute les instructions/, 'chip'],
  [/\bssd\b|\bhdd\b|disque|memoire flash/, 'drive'],
  [/cloud|nuage/, 'cloud'], [/\bdir\b|mkdir|\bcls\b|^cd\b|commandes? dos|invite de commandes/, 'terminal'],
  [/wi-fi|wifi|sans cable reseau/, 'wifi'], [/\boctets?\b|\bbits?\b/, 'binary'],
  [/^ecran$|affiche le resultat/, 'output'],
];

export function conceptVisual(label, renderPicture, source, context = label) {
  const text = norm(label);
  const image = source || exact.get(text);
  if (image) return renderPicture(image);
  const key = shapes.find(([pattern]) => pattern.test(text))?.[1];
  const illustration = key ? svgFrom('<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + drawings[key] + '</svg>')
    : semanticIcon(label, { large: true });
  if (key) illustration.dataset.symbol = key;
  const fallback = illustration.dataset.symbol === 'text' && context !== label ? semanticIcon(context, { large: true }) : illustration;
  return h('span', { class: 'egtsi-concept-visual', 'aria-hidden': 'true' }, fallback);
}
