import { svgFrom } from './dom.js';

// Code-native signs complement photographs; each keeps the visible label beside it.
const paths = {
  document: '<path d="M6 3h8l4 4v14H6zM14 3v5h4M9 12h6M9 16h6"/>',
  folder: '<path d="M3 6h7l2 3h9v11H3z"/>',
  save: '<path d="M4 3h14l3 3v15H3V3zM7 3v6h10V3M7 21v-8h10v8"/>',
  search: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
  table: '<rect x="3" y="4" width="18" height="16" rx="1"/><path d="M3 9h18M3 14h18M9 4v16M15 4v16"/>',
  chart: '<path d="M3 3v18h19M7 17V9h3v8M13 17V5h3v12M19 17v-6h2"/>',
  formula: '<path d="M18 4h-6L8 20H4M6 10h10M15 15l6 6M21 15l-6 6"/>',
  sort: '<path d="M7 3v18m-4-4 4 4 4-4M14 5h7M14 10h5M14 15h3M14 20h1"/>',
  filter: '<path d="M3 4h18l-7 8v7l-4 2v-9z"/>',
  pivot: '<path d="M3 4h12v12H3zM3 8h12M7 4v12M18 7l3 3-3 3M21 10h-4M8 19l3 3 3-3M11 22v-4"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v3"/>',
  link: '<path d="m10 14 4-4M8 16l-2 2a3 3 0 0 1-4-4l5-5a3 3 0 0 1 4 0M13 15a3 3 0 0 0 4 0l5-5a3 3 0 0 0-4-4l-2 2"/>',
  bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>',
  quote: '<path d="M4 7h6v7H5l-1 4M14 7h6v7h-5l-1 4"/>',
  comment: '<path d="M3 4h18v13H9l-6 4zM7 8h10M7 12h7"/>',
  merge: '<path d="M3 4h6v6H3zM3 14h6v6H3zM10 7h3l3 5-3 5h-3M16 12h6m-3-3 3 3-3 3"/>',
  columns: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M8 7h2M8 11h2M8 15h2M14 7h2M14 11h2M14 15h2"/>',
  heading: '<path d="M4 4v9M11 4v9M4 8h7M15 6h6M15 10h5M4 17h17M4 21h14"/>',
  pagebreak: '<path d="M5 3h14v6M5 21h14v-6M5 3v6M5 21v-6M2 12h3m3 0h3m3 0h3m3 0h2"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="2"/><path d="m3 18 6-6 4 4 3-5 5 7"/>',
  video: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m10 9 6 3-6 3z"/>',
  slide: '<path d="M2 3h20M4 3v13h16V3M12 16v6M7 22l5-3 5 3M7 7h10M7 11h5"/>',
  animation: '<path d="m15 3 1.5 5 5 .5-4 3 1 5-4-3-4 3 1-5-4-3 5-.5zM3 17h5M2 21h8"/>',
  transition: '<rect x="2" y="5" width="7" height="14" rx="1"/><rect x="15" y="5" width="7" height="14" rx="1"/><path d="M9 12h6m-3-3 3 3-3 3"/>',
  palette: '<circle cx="12" cy="12" r="9"/><circle cx="8" cy="8" r="1"/><circle cx="15" cy="7" r="1"/><circle cx="18" cy="13" r="1"/><path d="M5 14h5l2 7"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6M17 2v6M3 10h18M7 14h3M14 14h3M7 18h3"/>',
  contact: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M5 17a4 4 0 0 1 8 0M15 9h3M15 13h3"/>',
  flag: '<path d="M5 22V3h14l-3 5 3 5H5"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/>',
  cross: '<circle cx="12" cy="12" r="9"/><path d="m8 8 8 8m0-8-8 8"/>',
  task: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="m7 8 1 1 2-2M13 8h4m-10 6 1 1 2-2M13 14h4"/>',
  code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18"/>',
  network: '<rect x="8" y="2" width="8" height="6" rx="1"/><path d="M12 8v5M4 13h16M4 13v3m16-3v3"/><rect x="1" y="16" width="6" height="5"/><rect x="17" y="16" width="6" height="5"/>',
  computer: '<rect x="3" y="3" width="18" height="13" rx="1"/><path d="M12 16v5M7 21h10"/>',
  keyboard: '<rect x="2" y="6" width="20" height="14" rx="2"/><path d="M5 10h1m3 0h1m3 0h1m3 0h2M5 14h1m3 0h1m3 0h1m3 0h2M7 17h10"/>',
  print: '<path d="M6 8V2h12v6M6 17H3V9h18v8h-3M6 13h12v9H6zM17 10h1"/>',
  trash: '<path d="M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7"/>',
  download: '<path d="M12 2v13m-5-5 5 5 5-5M3 16v5h18v-5"/>',
  upload: '<path d="M12 16V3m-5 5 5-5 5 5M3 16v5h18v-5"/>',
  copy: '<rect x="8" y="7" width="13" height="15" rx="1"/><path d="M5 17H2V2h13v2"/>',
  scissors: '<circle cx="5" cy="6" r="3"/><circle cx="5" cy="18" r="3"/><path d="m7 8 14 13M7 16 21 3"/>',
  align: '<path d="M4 3v18M7 5h14M7 10h9M7 15h14M7 20h9"/>',
  history: '<path d="M3 11a9 9 0 1 1 2 7M3 4v7h7M12 7v6l4 2"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9 8a3 3 0 1 1 4 3c-1 1-1 2-1 3M12 18h.01"/>',
  match: '<path d="M2 4h6v6H2zM16 14h6v6h-6zM8 7h4v10h4M2 17h6M16 7h6"/>',
  order: '<path d="M8 4h13M8 12h13M8 20h13M3 3v3m0 5v3m0 5v3"/>',
  text: '<path d="M3 5h18M3 10h14M3 15h18M3 20h10"/>',
};
const rules = [
  [/^(vrai|correct|réponse correcte|juste|autorisé|permis)$/i, 'check'], [/^(faux|incorrect|réponse incorrecte|interdit)$/i, 'cross'],
  [/mot de passe|protéger|protection|antivirus|confidential|sécurit/i, 'lock'],
  [/supprim|corbeille|effacer|archiver/i, 'trash'], [/copier|copie|dupliqu|coller|presse.papiers/i, 'copy'], [/couper/i, 'scissors'],
  [/enregistrer|sauvegard/i, 'save'], [/imprim/i, 'print'], [/télécharger|importer/i, 'download'], [/exporter|envoyer|transférer/i, 'upload'],
  [/signet/i, 'bookmark'], [/citation|bibliograph|note de bas|note de fin/i, 'quote'], [/lien|renvoi|hypertexte|ancre/i, 'link'],
  [/commentaire|révision|correction|orthograph/i, 'comment'], [/fusion|publipostage/i, 'merge'], [/colonne|orientation/i, 'columns'],
  [/saut|section/i, 'pagebreak'], [/style|titre|sommaire|plan du document|hiérarch/i, 'heading'],
  [/croisé|consolid|sous.total/i, 'pivot'], [/filtr|validation|critère/i, 'filter'], [/\btri\b|trier|alphabétique|ordre croissant|ordre décroissant/i, 'sort'],
  [/graphique|courbe|histogramme|secteur/i, 'chart'], [/formule|fonction|calcul|moyenne|somme|coefficient|dirham|convertir|pourcentage/i, 'formula'],
  [/tableau|cellule|plage|feuille|classeur/i, 'table'], [/animation|trajectoire/i, 'animation'], [/transition/i, 'transition'],
  [/thème|couleur|police|palette/i, 'palette'], [/diapositive|diaporama|présentation|masque/i, 'slide'],
  [/calendrier|réunion|rendez.vous|date|heure/i, 'calendar'], [/contact|carnet|prénom|nom de l.élève/i, 'contact'],
  [/indicateur|suivi|drapeau|importance|priorité/i, 'flag'], [/tâche|rappel|échéance|terminé/i, 'task'],
  [/dossier|répertoire|explorateur/i, 'folder'], [/courriel|courrier|message|e.mail|boîte|réception/i, 'mail'],
  [/recherch|trouver/i, 'search'], [/macro|code|algorithme|programme|condition|boucle|python|langage/i, 'code'],
  [/réseau|internet|web|connexion|serveur|routeur|wifi|wi.fi|\bLAN\b|\bWAN\b/i, 'network'],
  [/clavier|saisir|saisie/i, 'keyboard'], [/ordinateur|informatique|périphérique|système|logiciel/i, 'computer'],
  [/photo|image|dessin|capture/i, 'image'], [/vidéo|son|audio|musique/i, 'video'],
  [/aligner|alignement|retrait|marge|paragraphe/i, 'align'], [/annuler|rétablir|historique/i, 'history'],
  [/fichier|document|texte|information|donnée|rapport|bulletin|nombre|note|°c/i, 'document'],
];
export function semanticKind(label) {
  return rules.find(([re]) => re.test(String(label)))?.[1] || 'text';
}
export function semanticIcon(label, { kind, large = false } = {}) {
  const key = kind || semanticKind(label);
  const svg = svgFrom(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths[key] || paths.text}</svg>`);
  svg.setAttribute('class', 'semantic-icon' + (large ? ' semantic-icon-large' : ''));
  svg.setAttribute('aria-hidden', 'true'); svg.setAttribute('focusable', 'false');
  svg.dataset.symbol = key;
  return svg;
}
export function mechanicIcon(type) {
  return semanticIcon('', { kind: { match: 'match', sort: 'sort', order: 'order', fill: 'text', quiz: 'help', sim: 'computer', hot: 'search', asm: 'computer', net: 'network', robot: 'code', prog: 'code' }[type] || 'document' });
}
