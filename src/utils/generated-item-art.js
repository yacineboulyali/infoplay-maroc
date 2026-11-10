import { h } from './dom.js';

// Each entry points to a reviewed cell in a six-panel illustration sheet.
const sheets = [
  ['reseau', [
    [1, /branche le cable du pc 1|relie un pc au (switch|commutateur)/],
    [2, /branche aussi les pc 2 et 3|trois pc relies|topologie en etoile|^communication entre ordinateurs$/],
    [3, /imprimante (partagee|reseau)/],
    [4, /debranche seulement son cable|debrancher le pc 3/],
    [5, /^(le |un )?(switch|commutateur)( reseau)?$/],
  ]],
  ['impression', [
    [0, /orientation paysage|section en paysage|^paysage$/],
    [1, /format (de papier )?a4|papier a4|^a4$/],
    [2, /marges etroites/],
    [3, /nombre de copies sur 3|trois exemplaires/],
    [4, /clique sur imprimer|lance l.impression|^imprimer$/],
  ]],
  ['fenetre', [
    [0, /reduis la fenetre|reduire (une |la )fenetre/],
    [1, /rouvre la fenetre|rouvrir (une |la )fenetre/],
    [2, /agrandis la fenetre|agrandir (une |la )fenetre/],
    [3, /restaure la fenetre|restaurer (une |la )fenetre/],
    [4, /ferme la fenetre|fermer (une |la )fenetre/],
  ]],
  ['explorateur', [
    [0, /cre[eé] (un )?nouveau dossier|creer (un )?dossier|^nouveau dossier$/],
    [1, /renomme (le |un )?fichier|renommer (le |un )?fichier/],
    [2, /copie plage\.jpg|copier (une |la )photo/],
    [4, /supprime brouillon\.txt|mettre (un |le )fichier (a|dans) la corbeille/],
    [5, /restaure brouillon\.txt|restaurer (un |le )fichier depuis la corbeille/],
  ]],
  ['word-actions', [
    [0, /nouvel onglet personnalise|creer un onglet personnalise/],
    [1, /\ben-tete\b|\ben tete\b/],
    [2, /deux colonnes|espacement .*colonnes/],
    [3, /mode plan|niveaux 1 et 2|table des matieres/],
    [5, /champ filiere|case a cocher|formulaire .*liste deroulante/],
  ]],
  ['excel-actions', [
    [0, /mise en forme conditionnelle|mets en evidence les ventes|modifie le seuil de la premiere regle/],
    [1, /titres des axes|^graphique en barres$/],
    [2, /filtres automatiques|filtre les montants|^filtrer$/],
    [3, /tableau croise dynamique|\btcd\b/],
    [4, /validation de type liste|liste deroulante .*cellule/],
    [5, /consolide les .*feuilles|consolidation des feuilles/],
  ]],
  ['presentation-mail', [
    [0, /masque des diapositives|masque principal|disposition au masque|mode masque/],
    [1, /transition.*fondu|transition entre (les |des )?diapositives/],
    [2, /animation.*trajectoire|trajectoire d.animation/],
    [3, /programme l.envoi|envoi differe|planifie l.envoi/],
    [4, /regle de classement automatique|classement automatique des messages/],
    [5, /groupe de contacts|ajoute des membres depuis tes contacts/],
  ]],
];

export function generatedItemArt(normalized) {
  for (const [sheet, cells] of sheets) {
    const cell = cells.find(([, pattern]) => pattern.test(normalized));
    if (!cell) continue;
    const [index] = cell;
    return generatedArt(sheet, index);
  }
  return null;
}

export function generatedArt(sheet, index) {
  return h('span', {
    class: 'generated-item-art',
    'aria-hidden': 'true',
    'data-art': sheet + '-' + (index + 1),
    style: 'background-image:url(images/activity-art/generated/' + sheet + '.webp);'
      + 'background-position:' + (index % 3 * 50) + '% ' + (index < 3 ? '0%' : '100%'),
  });
}
