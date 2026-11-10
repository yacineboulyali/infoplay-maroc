import { h } from '../utils/dom.js';
import { itemVisual } from '../utils/item-visuals.js';

// Cell order follows the generated, local 6 × 4 educational atlas.
const rows = { word: 0, excel: 1, ppt: 2, outlook: 3 };
const concepts = {
  word: [/ruban|onglet|accès rapide/i, /colonne|orientation|saut|section/i, /style|titre|thème|modèle|sommaire/i, /tableau|cellule|bordure/i, /fusion|publipostage|destinataire|enveloppe/i, /commentaire|révision|suivi|correction/i],
  excel: [/cellule|plage|feuille|classeur/i, /formule|fonction|calcul|somme|\bsi\b|recherche/i, /\btri\b|trier|ordre|liste/i, /filtr|critère|validation/i, /croisé|consolid|synthèse|sous.total/i, /graphique|courbe|histogramme/i],
  ppt: [/disposition|masque|diapositive/i, /thème|couleur|police/i, /image|photo|média|vidéo/i, /transition/i, /animation|trajectoire/i, /diaporama|projection|présentateur/i],
  outlook: [/message|courriel|envoi|réception|boîte/i, /calendrier|rendez.vous|réunion/i, /contact|destinataire|carnet/i, /dossier|règle|recherche/i, /indicateur|suivi|drapeau/i, /tâche|échéance|rappel/i],
};
export function officeConcept(label, part) {
  const matches = (concepts[part] || []).flatMap((re, i) => re.test(label) ? [i] : []);
  // Prefer a specific topic over broad words like cellule, message or diapositive.
  return matches.find(i => i > 0) ?? matches[0] ?? -1;
}
export function officeArt(label, part, cell) {
  if (!(part in rows)) return null;
  const found = officeConcept(label, part);
  // An unmapped concept gets a small sign, never a misleading ribbon screenshot.
  if (cell == null && found < 0) return itemVisual(label);
  const column = cell ?? found;
  return h('span', { class: 'office-art', role: 'img', 'aria-label': `Repère visuel ${part} : ${label}`,
    style: `--office-x:${column * 20}%;--office-y:${rows[part] * 100 / 3}%` });
}
