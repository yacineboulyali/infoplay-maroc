// Simulateur de ruban Office (Word, Excel, PowerPoint, Outlook) — esprit « Simulator MOS ».
// L'élève retrouve le bon chemin Onglet › Commande › Option pour réaliser chaque tâche.
// Chemin d'une commande : "Onglet>Commande" ou "Onglet>Commande>Option" (séparateur « > », jamais dans un nom).
import { h } from '../utils/dom.js';
import { semanticIcon } from '../utils/semantic-icons.js';

// Définition compacte : onglet → [ "Groupe: Cmd | Cmd(opt; opt) | …", … ]
const DEF = {
  word: {
    name: 'Word', color: '#2b579a', doc: 'Rapport_annuel.docx',
    tabs: {
      'Fichier': ['Informations: Inspecter le document | Protéger le document(Restreindre la modification; Chiffrer avec mot de passe; Marquer comme final)',
        'Enregistrer: Enregistrer sous(Document Word (*.docx); Modèle Word (*.dotx); PDF (*.pdf))',
        'Options Word: Personnaliser le ruban(Nouvel onglet; Nouveau groupe; Renommer…; Ajouter »; Supprimer) | Barre d’outils Accès rapide(Ajouter »; Supprimer; Monter; Descendre)'],
      'Accueil': ['Police: Gras | Italique | Souligné', 'Paragraphe: Justifier | Interligne(1,0; 1,15; 1,5; 2,0)',
        'Styles: Styles(Normal; Titre 1; Titre 2; Titre 3; Emphase intense; Citation) | Créer un style | Modifier le style…',
        'Modification: Rechercher(Rechercher…; Atteindre…) | Remplacer…'],
      'Insertion': ['Pages: Page de garde | Saut de page', 'Tableaux: Tableau(Insérer un tableau…; Convertir le texte en tableau…)', 'Illustrations: Images | Formes | SmartArt',
        'En-tête et pied de page: En-tête(Vide; À bandes; Austin; Filigrane) | Pied de page(Vide; À bandes; Austin) | Numéro de page(Haut de page; Bas de page; Format des numéros de page…)'],
      'Création': ['Mise en forme du document: Thèmes(Office; Ion; Facette; Rétrospective; Brin) | Couleurs(Office; Ardoise; Bleu chaud; Vert) | Polices(Calibri - Cambria; Arial; Garamond) | Définir par défaut',
        'Arrière-plan: Filigrane | Couleur de page | Bordures de page'],
      'Mise en page': ['Mise en page: Marges(Normales; Étroites; Larges) | Orientation(Portrait; Paysage) | Taille(A4; A5; Lettre) | Colonnes(Une; Deux; Trois; Gauche; Plus de colonnes…) | Sauts(Saut de page; Colonne; Page suivante; Continu; Page paire; Page impaire)',
        'Paragraphe: Retrait | Espacement'],
      'Références': ['Table des matières: Table des matières(Table automatique 1; Table automatique 2; Table personnalisée…) | Ajouter le texte | Mettre à jour la table(Mettre à jour les numéros de page uniquement; Mettre à jour toute la table)',
        'Légendes: Insérer une légende | Insérer une table des illustrations | Renvoi', 'Index: Marquer entrée | Insérer l’index | Mettre à jour l’index'],
      'Publipostage': ['Démarrer la fusion et le publipostage: Démarrer la fusion et le publipostage(Lettres; Messages électroniques; Enveloppes; Étiquettes; Assistant Fusion et publipostage pas à pas) | Sélection des destinataires(Taper une nouvelle liste…; Utiliser une liste existante…; Choisir parmi les contacts Outlook) | Modifier la liste de destinataires',
        'Champs d’écriture et d’insertion: Bloc d’adresse | Ligne de salutation | Insérer un champ de fusion(Nom; Prénom; Filière; Date; Heure; Salle)',
        'Aperçu des résultats: Aperçu des résultats | Rechercher un destinataire', 'Terminer: Terminer et fusionner(Modifier des documents individuels…; Imprimer des documents…; Envoyer des messages électroniques…)'],
      'Révision': ['Vérification: Grammaire et orthographe', 'Commentaires: Nouveau commentaire | Supprimer',
        'Suivi: Suivi des modifications | Volet Vérifications', 'Modifications: Accepter(Accepter et passer à la suivante; Accepter toutes les modifications) | Refuser(Refuser et passer à la suivante; Refuser toutes les modifications)',
        'Protéger: Restreindre la modification'],
      'Affichage': ['Affichages: Mode Lecture | Page | Plan | Brouillon', 'Afficher: Règle | Quadrillage | Volet de navigation', 'Macros: Macros(Afficher les macros; Enregistrer une macro; Arrêter l’enregistrement)'],
      'Développeur': ['Code: Macros | Enregistrer une macro', 'Contrôles: Texte brut | Case à cocher | Liste déroulante | Sélecteur de date | Mode Création', 'Protéger: Restreindre la modification'],
      'En-tête et pied de page': ['Navigation: Atteindre l’en-tête | Atteindre le pied de page | Lier au précédent', 'Options: Première page différente | Pages paires et impaires différentes', 'Fermer: Fermer l’en-tête et le pied de page'],
      'Mode Plan': ['Outils Plan: Promouvoir en Titre 1 | Promouvoir | Abaisser | Abaisser en corps de texte | Monter | Descendre | Développer | Réduire | Afficher le niveau(Niveau 1; Niveau 2; Niveau 3; Tous les niveaux)', 'Fermer: Fermer le mode Plan'],
    },
  },
  excel: {
    name: 'Excel', color: '#217346', doc: 'Ventes_2026.xlsx',
    tabs: {
      'Fichier': ['Enregistrer: Enregistrer sous(Classeur Excel (*.xlsx); Classeur Excel prenant en charge les macros (*.xlsm); PDF (*.pdf))',
        'Options Excel: Options avancées(Modifier les listes personnalisées…; Options de calcul) | Personnaliser le ruban(Afficher l’onglet Développeur)'],
      'Accueil': ['Presse-papiers: Copier | Coller(Coller; Valeurs; Transposer; Collage spécial…)', 'Police: Gras | Bordures',
        'Styles: Mise en forme conditionnelle(Supérieur à…; Inférieur à…; Entre…; Doublons…; Barres de données; Nuances de couleurs; Jeux d’icônes; Effacer les règles; Gérer les règles…) | Mettre sous forme de tableau | Styles de cellules',
        'Cellules: Insérer | Supprimer | Format(Format de cellule…; Verrouiller la cellule; Protéger la feuille…)',
        'Édition: Somme automatique | Remplissage(En bas; À droite; Série…; Remplissage instantané) | Trier et filtrer(Tri de A à Z; Tri de Z à A; Tri personnalisé…; Filtrer) | Rechercher et sélectionner(Rechercher…; Remplacer…; Atteindre…)'],
      'Insertion': ['Tableaux: Tableau croisé dynamique | Tableaux croisés dynamiques recommandés | Tableau', 'Illustrations: Images | Formes | SmartArt | Icônes',
        'Graphiques: Histogramme(Histogramme groupé; Histogramme empilé; Barres groupées) | Courbe(Courbe; Courbe avec marqueurs) | Secteurs(Secteurs; Anneau) | Graphique combiné | Graphique croisé dynamique',
        'Liens: Lien'],
      'Données': ['Trier et filtrer: Trier(Ajouter un niveau; Supprimer un niveau; Options…) | Filtrer | Effacer | Avancé | Filtre de colonne(Filtres textuels…; Filtres numériques…; Filtres chronologiques…)',
        'Outils de données: Convertir | Supprimer les doublons | Validation des données(Validation des données…; Entourer les données non valides; Effacer les cercles de validation) | Consolider',
        'Plan: Grouper | Dissocier | Sous-total | Afficher le détail | Masquer le détail'],
      'Révision': ['Commentaires: Nouveau commentaire', 'Protéger: Protéger la feuille | Protéger le classeur | Permettre la modification des plages | Partager le classeur'],
      'Affichage': ['Fenêtre: Figer les volets | Nouvelle fenêtre', 'Macros: Macros(Afficher les macros; Enregistrer une macro; Arrêter l’enregistrement; Utiliser les références relatives)'],
      'Développeur': ['Code: Visual Basic | Enregistrer une macro | Macros', 'Contrôles: Insérer(Bouton (contrôle de formulaire); Case à cocher; Zone de liste déroulante)'],
      'Format': ['Organiser: Aligner(Aligner à gauche; Centrer; Aligner au milieu; Distribuer horizontalement; Distribuer verticalement) | Grouper(Grouper; Dissocier) | Mettre au premier plan'],
      'Création de graphique': ['Dispositions: Ajouter un élément de graphique(Titre du graphique; Titres des axes; Étiquettes de données; Légende; Courbe de tendance)',
        'Données: Intervertir les lignes/colonnes | Sélectionner des données', 'Type: Modifier le type de graphique', 'Emplacement: Déplacer le graphique'],
      'Analyse du TCD': ['Champ actif: Paramètres de champs(Somme; Nombre; Moyenne; Max)', 'Filtrer: Insérer un segment | Insérer une chronologie',
        'Données: Actualiser | Changer la source de données', 'Outils: Graphique croisé dynamique | Liste des champs'],
    },
  },
  ppt: {
    name: 'PowerPoint', color: '#b7472a', doc: 'Présentation_institutionnelle.pptx',
    tabs: {
      'Fichier': ['Enregistrer: Enregistrer sous(Présentation PowerPoint (*.pptx); Modèle PowerPoint (*.potx))', 'Exporter: Exporter(Créer un document PDF/XPS; Créer une vidéo; Modifier le type de fichier (images PNG))'],
      'Accueil': ['Diapositives: Nouvelle diapositive | Disposition(Titre; Titre et contenu; Deux contenus; Vide)', 'Dessin: Organiser(Aligner; Grouper; Mettre au premier plan; Mettre à l’arrière-plan)'],
      'Insertion': ['Images: Images | Captures', 'Illustrations: Formes | SmartArt | Graphique', 'Liens: Lien | Action',
        'Texte: Zone de texte | En-tête/Pied de page | Numéro de diapositive | Date et heure'],
      'Création': ['Thèmes: Thèmes(Office; Ion; Facette; Rétrospective; Brin)', 'Variantes: Variantes(Couleurs; Polices; Effets; Styles d’arrière-plan)', 'Personnaliser: Taille des diapositives | Format de l’arrière-plan'],
      'Transitions': ['Transition: Transitions(Aucune; Fondu; Poussée; Balayer; Morphose)', 'Minutage: Durée | Appliquer partout | Passer à la diapositive suivante'],
      'Animations': ['Animation: Animations(Apparaître; Fondu; Entrée brusque; Zoom; Trajectoires)', 'Animation avancée: Ajouter une animation | Volet Animation | Déclencheur',
        'Minutage: Démarrer(Au clic; Avec la précédente; Après la précédente) | Durée | Délai'],
      'Diaporama': ['Démarrage: À partir du début | À partir de la diapositive actuelle', 'Configuration: Configurer le diaporama | Vérifier le minutage'],
      'Révision': ['Commentaires: Nouveau commentaire | Afficher les commentaires'],
      'Affichage': ['Modes: Normal | Trieuse de diapositives | Page de commentaires', 'Masques: Masque des diapositives | Masque du document | Masque des pages de notes', 'Afficher: Règle | Quadrillage | Repères | Notes'],
      'Masque des diapositives': ['Modifier le masque: Insérer un masque des diapositives | Insérer une disposition | Renommer',
        'Mise en page du masque: Insérer un espace réservé(Contenu; Texte; Image) | Titre | Pieds de page', 'Modifier le thème: Thèmes | Couleurs | Polices',
        'Arrière-plan: Styles d’arrière-plan | Format de l’arrière-plan', 'Fermer: Fermer le mode Masque'],
      'Format': ['Organiser: Aligner(Aligner à gauche; Centrer; Aligner au milieu; Distribuer horizontalement; Distribuer verticalement) | Grouper(Grouper; Dissocier) | Volet Sélection'],
    },
  },
  outlook: {
    name: 'Outlook', color: '#0072c6', doc: 'Boîte de réception — assistante@atlas.ma',
    tabs: {
      'Fichier': ['Informations: Règles et alertes | Réponses automatiques', 'Options Outlook: Options(Courrier; Signatures…; Papier à lettres; Calendrier)', 'Enregistrer: Enregistrer sous(Message Outlook (*.msg); Modèle Outlook (*.oft))'],
      'Accueil': ['Nouveau: Nouveau courrier | Nouveaux éléments(Rendez-vous; Contact; Groupe de contacts; Tâche; Réunion)', 'Supprimer: Ignorer | Supprimer | Archiver',
        'Déplacer: Déplacer(Clients; Factures; Autre dossier…) | Règles(Toujours déplacer les messages de cet expéditeur; Créer une règle…; Gérer les règles et alertes…) | Actions rapides',
        'Indicateurs: Non lu/Lu | Catégoriser(Rouge; Bleu; Vert) | Assurer un suivi(Aujourd’hui; Demain; Cette semaine; La semaine prochaine; Personnalisé…; Marquer comme terminé)',
        'Rechercher: Rechercher un contact | Carnet d’adresses | Filtrer le courrier(Non lu; Avec pièces jointes; Marqué; Important)'],
      'Dossier': ['Nouveau: Nouveau dossier | Nouveau dossier de recherche', 'Actions: Renommer le dossier | Copier le dossier | Déplacer le dossier', 'Favoris: Afficher dans les Favoris'],
      'Rechercher': ['Étendue: Toutes les boîtes aux lettres | Dossier actif', 'Affiner: De | Objet | Pièces jointes | Non lu | Catégorisé | Cette semaine', 'Options: Recherches récentes | Outils de recherche(Recherche avancée…)'],
      'Message': ['Inclure: Joindre un fichier | Joindre un élément | Signature(Signature officielle; Signatures…) | Insertion automatique (QuickParts)', 'Indicateurs: Assurer un suivi | Importance haute | Importance faible'],
      'Options': ['Thèmes: Thèmes', 'Suivi: Utiliser des boutons de vote | Demander un accusé de réception | Demander une confirmation de lecture', 'Autres options: Enregistrer l’élément envoyé dans | Différer la livraison | Réponses directes à'],
      'Tâche': ['Actions: Enregistrer et fermer | Supprimer | Transférer', 'Gérer la tâche: Marquer comme terminé | Affecter la tâche', 'Périodicité: Périodicité', 'Indicateurs: Priorité haute | Priorité basse | Catégoriser'],
      'Groupe de contacts': ['Membres: Ajouter des membres(À partir des contacts Outlook; À partir du carnet d’adresses; Nouveau contact électronique) | Supprimer un membre', 'Actions: Enregistrer et fermer | Transférer le groupe'],
    },
  },
};

// Construit la structure : { name, color, doc, tabs: [{ name, groups: [{ name, cmds: [{ name, opts: [] }] }] }] }
function build(def) {
  return { ...def, tabs: Object.entries(def.tabs).map(([name, groups]) => ({ name, groups: groups.map((g) => {
    const i = g.indexOf(':'); const gname = g.slice(0, i).trim();
    return { name: gname, cmds: g.slice(i + 1).split(' | ').map((c) => { const m = c.trim().match(/^([^(]+?)(?:\((.*)\))?$/); return { name: m[1].trim(), opts: m[2] ? m[2].split(';').map((o) => o.trim()) : [] }; }) };
  }) })) };
}
export const RIBBONS = Object.fromEntries(Object.entries(DEF).map(([k, d]) => [k, build(d)]));

/** Tous les chemins valides d'une application (pour les tests et le contrôle du contenu). */
export function allPaths(app) {
  const out = new Set();
  for (const t of RIBBONS[app].tabs) for (const g of t.groups) for (const c of g.cmds) { if (c.opts.length) c.opts.forEach((o) => out.add(`${t.name}>${c.name}>${o}`)); else out.add(`${t.name}>${c.name}`); }
  return out;
}
export const pathLabel = (p) => p.split('>').join(' › ');

const ICONS = { Fichier: '📁', Accueil: '🏠', Insertion: '➕', Création: '🎨', 'Mise en page': '📐', Références: '📑', Publipostage: '✉️', Révision: '✅', Affichage: '👁️', Développeur: '🧩', Données: '🗃️', Transitions: '🔀', Animations: '✨', Diaporama: '▶️', Dossier: '🗂️', Rechercher: '🔎', Message: '📨', Options: '⚙️', Tâche: '☑️', Format: '🔷' };

// Petites réactions visibles du document (le simulateur « répond » à certaines actions).
function react(st, path) {
  const [, cmd, opt] = path.split('>');
  if (cmd === 'Orientation') st.orient = opt;
  if (cmd === 'Colonnes' && /Une|Deux|Trois/.test(opt)) st.cols = { Une: 1, Deux: 2, Trois: 3 }[opt];
  if (cmd === 'Thèmes' && opt) st.theme = opt;
  if (cmd === 'En-tête' && opt) st.header = opt;
  if (cmd === 'Mise en forme conditionnelle' && opt) st.mfc = opt;
  if ((cmd === 'Histogramme' || cmd === 'Courbe' || cmd === 'Secteurs') && opt) st.chart = cmd;
  if (cmd === 'Masque des diapositives') st.master = true;
  if (cmd === 'Fermer le mode Masque') st.master = false;
  if (cmd === 'Plan') st.outline = true;
  if (cmd === 'Fermer le mode Plan') st.outline = false;
}

export function ribbonView(host, st, ctx) {
  const R = RIBBONS[ctx.cfg.app]; st.log ??= []; st.last ??= null; st.tab ??= R.tabs[1].name;
  const tabsBar = h('div', { class: 'rb-tabs', role: 'tablist', 'aria-label': `Onglets du ruban ${R.name}` });
  const panel = h('div', { class: 'rb-panel', role: 'tabpanel' });
  const status = h('p', { class: 'rb-status', 'aria-live': 'polite' });
  const canvas = h('div', { class: 'rb-canvas' });
  const hist = h('ol', { class: 'rb-hist', 'aria-label': 'Dernières actions' });
  let openMenu = null;
  const closeMenu = () => { if (openMenu) { openMenu.remove(); openMenu = null; } };

  function act(path) {
    closeMenu(); st.last = path; st.log = [...st.log, path].slice(-6); react(st, path);
    status.textContent = '✔ Action : ' + pathLabel(path); paint();
  }
  function cmdBtn(tab, c) {
    const b = h('button', { type: 'button', class: 'rb-cmd' + (c.opts.length ? ' has-menu' : ''), 'aria-haspopup': c.opts.length ? 'menu' : null, 'aria-expanded': c.opts.length ? 'false' : null,
      onclick: (e) => {
        e.stopPropagation();
        if (!c.opts.length) { act(`${tab}>${c.name}`); return; }
        const was = openMenu && openMenu.__owner === b; closeMenu(); if (was) return;
        const menu = h('div', { class: 'rb-menu', role: 'menu', 'aria-label': c.name }, c.opts.map((o) => h('button', { type: 'button', role: 'menuitem', class: 'rb-opt', onclick: (ev) => { ev.stopPropagation(); act(`${tab}>${c.name}>${o}`); } }, semanticIcon(o), o)));
        menu.__owner = b; b.setAttribute('aria-expanded', 'true'); b.after(menu); openMenu = menu; menu.querySelector('button')?.focus();
        menu.addEventListener('keydown', (ev) => { if (ev.key === 'Escape') { closeMenu(); b.setAttribute('aria-expanded', 'false'); b.focus(); } });
      } }, semanticIcon(c.name), c.name, c.opts.length ? h('span', { class: 'rb-caret', 'aria-hidden': 'true' }, '▾') : null);
    return h('span', { class: 'rb-cmd-wrap' }, b);
  }
  function paintCanvas() {
    const a = ctx.cfg.app; let doc;
    if (a === 'word') doc = h('div', { class: 'rb-page' + (st.orient === 'Paysage' ? ' land' : '') + (st.outline ? ' outline' : ''), style: `--cols:${st.cols || 1}` },
      st.header ? h('div', { class: 'rb-hdr' }, `En-tête « ${st.header} »`) : null, h('div', { class: 'rb-h1' }), h('div', { class: 'rb-lines' }, Array.from({ length: 9 }, () => h('i'))));
    else if (a === 'excel') doc = h('div', { class: 'rb-grid' + (st.mfc ? ' mfc' : '') }, Array.from({ length: 24 }, (_, i) => h('i', { class: i < 4 ? 'hd' : (i % 4 === 3 && i % 3 === 0 ? 'hi' : '') })), st.chart ? h('div', { class: 'rb-chart' }, `📊 ${st.chart}`) : null);
    else if (a === 'ppt') doc = h('div', { class: 'rb-slide' + (st.master ? ' master' : ''), 'data-theme': st.theme || 'Office' }, h('b', null, st.master ? 'Masque des diapositives' : 'Rapport d’activité 2026'), h('span', null, st.theme ? `Thème ${st.theme}` : 'Atlas Services'));
    else doc = h('div', { class: 'rb-mail' }, ['📩 Facture n° 245 — Fournisseur Sud', '📩 Réunion partenaires jeudi', '📩 Commande client Benali', '📩 Facture n° 246 — Imprimerie'].map((t) => h('div', null, t)));
    canvas.replaceChildren(doc);
  }
  function paint() {
    tabsBar.replaceChildren(...R.tabs.map((t) => h('button', { type: 'button', role: 'tab', class: 'rb-tab' + (t.name === 'Fichier' ? ' file' : ''), 'aria-selected': String(st.tab === t.name), onclick: () => { st.tab = t.name; closeMenu(); paint(); } }, h('span', { 'aria-hidden': 'true' }, ICONS[t.name] || '▫'), ' ', t.name)));
    const tab = R.tabs.find((t) => t.name === st.tab) || R.tabs[1];
    panel.replaceChildren(...tab.groups.map((g) => h('div', { class: 'rb-group' }, h('div', { class: 'rb-cmds' }, g.cmds.map((c) => cmdBtn(tab.name, c))), h('span', { class: 'rb-gname' }, g.name))));
    hist.replaceChildren(...st.log.slice().reverse().map((p) => h('li', null, pathLabel(p))));
    paintCanvas();
  }
  host.addEventListener('click', closeMenu);
  host.append(h('div', { class: 'rb-app', style: `--rb:${R.color}` },
    h('div', { class: 'rb-title' }, h('span', { class: 'rb-qat', 'aria-hidden': 'true' }, '💾 ↶ ↷'), h('b', null, `${R.doc} — ${R.name}`), h('span', { class: 'rb-sim', 'aria-hidden': 'true' }, 'SIMULATEUR')),
    tabsBar, panel,
    h('div', { class: 'rb-body' }, canvas, h('aside', { class: 'rb-side' }, h('b', null, '🧾 Journal'), hist))), status);
  paint();
  return { refresh: paint };
}
