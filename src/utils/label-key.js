// Clé stable d'un libellé d'activité : sert à relier un libellé à son image (images/label-illustrations/<clé>.webp).
// Module pur (sans DOM) : utilisé par l'application et par les scripts d'audit et de synchronisation.
const norm = (s) => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’']/g, "'").replace(/\s+/g, ' ').trim();
export function labelKey(label) {
  const text = norm(label); let hash = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) { hash ^= text.charCodeAt(i); hash = Math.imul(hash, 0x01000193); }
  return 'lbl-' + (hash >>> 0).toString(16).padStart(8, '0');
}
