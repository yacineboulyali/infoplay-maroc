import { match, sort, order, fill, quiz, hot, sim } from './dsl.js';
import { norm } from '../utils/dom.js';

const lines = (s) => s.text.trim().split('\n');
export default {
  id: 2, title: 'Les logiciels', short: 'Les logiciels', icon: '🗂️', color: 'm2',
  groups: [{ label: 'Système d’exploitation (6 h)', sessions: [1, 2, 3] }, { label: 'Traitement de texte (10 h)', sessions: [4, 5, 6, 7, 8] }, { label: 'Tableur (6 h)', sessions: [9, 10, 11] }],
  sessions: [
    { title: 'Fonctionnalités de base d’un système d’exploitation', topics: ['gestion des programmes', 'des fichiers', 'des périphériques', 'interface'], acts: [
      match('Associe fonctions et définitions', 'Relier chaque fonction d’un système d’exploitation à son rôle.', [
        ['Gestion des programmes', 'Lancer, arrêter et répartir le temps du processeur entre les applications'], ['Gestion de la mémoire', 'Attribuer la mémoire vive aux programmes en cours'], ['Gestion des fichiers', 'Organiser, nommer, ranger et retrouver les données sur le stockage'],
        ['Gestion des périphériques', 'Dialoguer avec le clavier, la souris ou l’imprimante grâce aux pilotes'], ['Interface utilisateur', 'Permettre à l’utilisateur de dialoguer avec l’ordinateur (bureau, fenêtres, icônes)'],
      ]),
      quiz('Identifie les systèmes d’exploitation', 'Reconnaître des exemples de systèmes d’exploitation.', [
        ['Lequel de ces logiciels est un système d’exploitation ?', ['Windows', 'Microsoft Word', 'Microsoft Excel', 'Un navigateur web'], 'Windows gère le matériel et lance les autres logiciels.'],
        ['Quel système équipe la plupart des smartphones de la classe (hors iPhone) ?', ['Android', 'Microsoft Word', 'Microsoft Excel', 'Un tableur'], 'Android est un système d’exploitation pour téléphones et tablettes.'],
        ['Linux est :', ['Un système d’exploitation libre', 'Un traitement de texte', 'Un navigateur', 'Un type de clé USB'], 'Linux existe en de nombreuses versions gratuites.'],
        ['macOS est le système d’exploitation :', ['Des ordinateurs de la marque Apple', 'De toutes les imprimantes', 'Des clés USB', 'Des routeurs uniquement'], 'Chaque famille de machines a ses systèmes.'],
        ['Un système d’exploitation s’installe :', ['Avant les logiciels d’application, car ils en ont besoin pour fonctionner', 'Après chaque document créé', 'Uniquement dans l’imprimante', 'Dans la souris'], 'Il est la base sur laquelle tournent les applications.'],
      ]),
      sort('Classe les responsabilités', 'Séparer ce que fait le système d’exploitation et ce que fait une application.', ['Rôle du système d’exploitation', 'Rôle d’une application'], [
        ['Gérer la mémoire vive', 0, 'Il répartit la mémoire entre les programmes.'], ['Lancer et arrêter les programmes', 0, 'C’est sa mission de base.'], ['Gérer les fichiers et dossiers', 0, 'Il organise le stockage.'], ['Piloter l’imprimante grâce à son pilote', 0, 'Il fait le lien avec le matériel.'], ['Gérer les comptes des utilisateurs', 0, 'Il contrôle les accès.'],
        ['Rédiger une lettre', 1, 'Tâche d’un traitement de texte.'], ['Calculer une moyenne', 1, 'Tâche d’un tableur.'], ['Naviguer sur un site web', 1, 'Tâche d’un navigateur.'], ['Dessiner un logo', 1, 'Tâche d’un logiciel de dessin.'], ['Lire une vidéo', 1, 'Tâche d’un lecteur multimédia.'],
      ]),
      fill('Mission OS', 'Choisir les bonnes actions pour lancer des applications, gérer des fichiers et du matériel.', [
        ['Pour ouvrir un programme, on double‑clique sur son [[icône|pilote|extension]] ; le système d’exploitation le charge en mémoire.', 'L’icône est le point d’entrée du programme.'],
        ['Quand on branche une clé USB, le système la reconnaît grâce à un [[pilote|traitement de texte|fond d’écran]].', 'Le pilote fait dialoguer système et matériel.'],
        ['Pour retrouver un document, on passe par le [[gestionnaire de fichiers|tableur|navigateur]] du système.', 'Il montre dossiers et fichiers.'],
        ['Si deux programmes tournent ensemble, le système leur répartit la [[mémoire et le temps du processeur|couleur du bureau|batterie de la souris]].', 'C’est la gestion des programmes et de la mémoire.'],
        ['Pour éteindre proprement l’ordinateur, on utilise la commande [[Arrêter|Supprimer|Copier]] du menu Démarrer.', 'Arrêter ferme les programmes en sécurité.'],
      ]),
    ] },
    { title: 'Environnement d’un système d’exploitation', topics: ['bureau', 'barre des tâches', 'menu Démarrer', 'fenêtres'], acts: [
      hot('Explore le bureau', 'Repérer les éléments de l’environnement de travail.', 'desktop', [
        ['start', 'Clique sur le bouton qui ouvre le menu Démarrer.', 'Il se trouve à gauche de la barre du bas.'], ['taskbar', 'Clique sur la barre des tâches.', 'Elle montre les programmes ouverts.'], ['bin', 'Clique sur la corbeille.', 'Elle garde les fichiers supprimés.'],
        ['win', 'Clique sur une fenêtre.', 'Une fenêtre affiche le contenu d’un programme.'], ['tray', 'Clique sur la zone de notification (heure).', 'Elle affiche l’heure et l’état du système.'],
      ]),
      match('Associe icônes et rôles', 'Relier chaque élément à son rôle.', [
        ['🗑️ Corbeille', 'Contient les fichiers supprimés, qui peuvent être restaurés'], ['📁 Dossier', 'Regroupe des fichiers et d’autres dossiers'], ['📄 Fichier', 'Contient des données : texte, image, son…'], ['🔗 Raccourci', 'Ouvre rapidement un programme ou un fichier situé ailleurs'], ['⊞ Démarrer', 'Ouvre la liste des programmes et les commandes du système'],
      ]),
      sim('Manipule la fenêtre', 'Réduire, agrandir, restaurer et fermer une fenêtre.', 'window', { init: { state: 'normal' } }, [
        ['Réduis la fenêtre dans la barre des tâches.', { state: 'min' }, 'Réduire cache la fenêtre mais le programme reste actif.'], ['Rouvre la fenêtre depuis la barre des tâches.', { state: 'normal' }, 'Un clic sur son bouton la fait réapparaître.'], ['Agrandis la fenêtre pour occuper tout l’écran.', { state: 'max' }, 'Agrandir utilise tout l’écran.'],
        ['Restaure la fenêtre à sa taille précédente.', { state: 'normal' }, 'Restaurer ramène la taille habituelle.'], ['Ferme la fenêtre.', { state: 'closed' }, 'Fermer arrête le programme.'],
      ]),
      quiz('Mission Bureau', 'Choisir la bonne action sur le bureau dans une situation concrète.', [
        ['Tu veux lancer un programme qui n’est pas sur le bureau. Où cliques‑tu ?', ['Sur le bouton Démarrer', 'Sur la corbeille', 'Sur l’horloge', 'Sur le bureau vide'], 'Le menu Démarrer liste les programmes installés.'],
        ['Tu as trop de fenêtres ouvertes. Comment passer de l’une à l’autre ?', ['En cliquant sur leurs boutons dans la barre des tâches', 'En vidant la corbeille', 'En changeant le fond d’écran', 'En éteignant l’ordinateur'], 'La barre des tâches liste les fenêtres ouvertes.'],
        ['Tu as supprimé un fichier par erreur (il est dans la corbeille). Que faire ?', ['Ouvrir la corbeille et restaurer le fichier', 'Redémarrer l’ordinateur', 'Réinstaller le système', 'Renommer le bureau'], 'La corbeille permet de restaurer.'],
        ['Comment connaître l’heure et l’état du réseau ?', ['Regarder la zone de notification à droite de la barre des tâches', 'Ouvrir la corbeille', 'Agrandir une fenêtre', 'Regarder le menu Fichier'], 'La zone de notification donne ces informations.'],
        ['Tu veux un accès rapide à un document souvent utilisé. Quelle solution ?', ['Créer un raccourci sur le bureau', 'Supprimer le document', 'Imprimer le document', 'Réduire la fenêtre'], 'Un raccourci évite de chercher le fichier.'],
      ]),
    ] },
    { title: 'Gestion des fichiers et dossiers', topics: ['fichier', 'dossier', 'extension', 'créer, renommer, copier, déplacer, supprimer'], acts: [
      quiz('Fichier, dossier ou raccourci ?', 'Identifier un fichier, un dossier et un raccourci.', [
        ['Un fichier est :', ['Un ensemble de données enregistré sous un nom, par exemple devoir.docx', 'Un endroit qui contient seulement d’autres éléments', 'Un câble réseau', 'Un composant de la carte mère'], 'Un fichier contient des données.'],
        ['Un dossier sert à :', ['Regrouper et ranger des fichiers et d’autres dossiers', 'Calculer des moyennes', 'Afficher une image à l’écran', 'Imprimer sans papier'], 'Les dossiers organisent le stockage.'],
        ['Un raccourci est :', ['Un lien qui ouvre un élément situé ailleurs', 'Une copie complète du fichier', 'Un virus', 'Un dossier vide'], 'Il renvoie vers l’original.'],
        ['Quelle icône représente un dossier ?', ['📁', '📄', '🔗', '🖼️'], 'Le dossier ressemble à une chemise.'],
        ['Si on supprime un raccourci, que devient le fichier d’origine ?', ['Il reste à son emplacement', 'Il est supprimé aussi', 'Il devient un dossier', 'Il change de nom'], 'Seul le lien disparaît.'],
      ]),
      match('Extensions et types de fichiers', 'Associer chaque extension au type de fichier.', [
        ['.docx', 'Document de traitement de texte'], ['.xlsx', 'Classeur de tableur'], ['.jpg', 'Image (photo)'], ['.mp3', 'Fichier audio'], ['.mp4', 'Vidéo'],
      ]),
      sort('Organise tes fichiers', 'Ranger des fichiers dans le bon dossier.', ['Dossier Maths', 'Dossier Photos', 'Dossier Musique'], [
        ['cours_geometrie.docx', 0, 'Un cours de géométrie va avec les mathématiques.'], ['fractions.xlsx', 0, 'Des calculs de fractions : mathématiques.'], ['theoreme_Pythagore.pdf', 0, 'Un théorème : mathématiques.'],
        ['voyage_Marrakech.jpg', 1, 'Une photo de voyage.'], ['classe_2AC.png', 1, 'Une image de classe.'], ['portrait_Atlas.jpg', 1, 'Une photo.'],
        ['chanson_ecole.mp3', 2, 'Un fichier audio.'], ['concert.mp3', 2, 'Un fichier audio.'], ['rythme.wav', 2, 'Un fichier audio.'], ['hymne.mp3', 2, 'Un fichier audio.'],
      ]),
      sim('Mission Explorateur', 'Créer, renommer, copier, déplacer, supprimer et restaurer dans un explorateur simulé.', 'fs', {
        tree: { n: 'Mes documents', k: [{ n: 'Cours', k: [{ n: 'maths.docx' }] }, { n: 'Photos', k: [{ n: 'plage.jpg' }] }, { n: 'notes.txt' }, { n: 'brouillon.txt' }] },
      }, [
        ['Crée un nouveau dossier nommé Sciences dans Mes documents (sélectionne le dossier racine, écris le nom, clique sur « Nouveau dossier »).', (s, A) => !!A.find('Sciences')?.dir, 'Un nouveau dossier se crée là où l’on est placé.', (s, A) => A.mkdir('', 'Sciences')],
        ['Renomme le fichier notes.txt en notes_2AC.txt.', (s, A) => !!A.find('notes_2AC.txt') && !A.find('notes.txt'), 'Renommer change le nom sans changer le contenu.', (s, A) => A.rename('notes.txt', 'notes_2AC.txt')],
        ['Copie plage.jpg dans le dossier Sciences : l’original doit rester dans Photos.', (s, A) => !!A.find('Sciences/plage.jpg') && !!A.find('Photos/plage.jpg'), 'Copier crée un double ; l’original reste en place.', (s, A) => A.copy('Photos/plage.jpg', 'Sciences')],
        ['Déplace maths.docx du dossier Cours vers Sciences (couper puis coller).', (s, A) => !!A.find('Sciences/maths.docx') && !A.find('Cours/maths.docx'), 'Déplacer retire le fichier de son ancien dossier.', (s, A) => A.move('Cours/maths.docx', 'Sciences')],
        ['Supprime brouillon.txt : il doit se retrouver dans la corbeille.', (s, A) => A.inBin('brouillon.txt') && !A.find('brouillon.txt'), 'Un fichier supprimé va d’abord dans la corbeille.', (s, A) => A.remove('brouillon.txt')],
        ['Restaure brouillon.txt depuis la corbeille.', (s, A) => !!A.find('brouillon.txt') && !A.inBin('brouillon.txt'), 'Restaurer remet le fichier dans son dossier d’origine.', (s, A) => A.restore('brouillon.txt')],
      ]),
    ] },
    { title: 'Traitement de texte : fonctionnalités et environnement', topics: ['fonctions d’un traitement de texte', 'ruban', 'espace de travail'], acts: [
      hot('Découvre la fenêtre', 'Identifier les zones de l’environnement d’un traitement de texte.', 'word', [
        ['ribbon', 'Clique sur le ruban qui regroupe les outils.', 'Le ruban contient les boutons de commande.'], ['tabs', 'Clique sur la zone des onglets.', 'Chaque onglet regroupe des commandes d’un même domaine.'], ['page', 'Clique sur la feuille où l’on tape le texte.', 'C’est la zone d’édition du document.'],
        ['status', 'Clique sur la barre d’état.', 'Elle indique la page et le nombre de mots.'], ['title', 'Clique sur la barre de titre.', 'Elle affiche le nom du document.'],
      ]),
      match('Commandes et icônes', 'Associer chaque icône à sa commande.', [['💾', 'Enregistrer le document'], ['↩', 'Annuler la dernière action'], ['🖨', 'Imprimer le document'], ['📂', 'Ouvrir un document existant'], ['🔍', 'Rechercher un mot dans le texte']]),
      sort('Édition, mise en forme ou insertion ?', 'Classer des commandes selon leur famille.', ['Édition', 'Mise en forme', 'Insertion'], [
        ['Copier', 0, 'Copier modifie le contenu.'], ['Couper', 0, 'Couper retire du texte.'], ['Coller', 0, 'Coller ajoute du texte copié.'],
        ['Gras', 1, 'Change l’aspect des lettres.'], ['Centrer', 1, 'Change la position du texte.'], ['Souligné', 1, 'Change l’aspect des lettres.'],
        ['Image', 2, 'Ajoute un objet.'], ['Tableau', 2, 'Ajoute un objet.'], ['Forme', 2, 'Ajoute un objet.'], ['Numéro de page', 2, 'Ajoute un élément dans la page.'],
      ]),
      sim('Mission Word', 'Créer, nommer et enregistrer un document virtuel.', 'office', { show: ['type', 'save'] }, [
        ['Clique dans la page et tape le mot « Bonjour ».', { text: '~bonjour' }, 'La saisie crée le contenu.'],
        ['Écris le nom « exposeMaroc » dans la case du nom de fichier.', { name: '=exposeMaroc' }, 'Un nom clair permet de retrouver le document.'],
        ['Choisis le dossier « Mes documents ».', { folder: 'Mes documents' }, 'Le dossier détermine où le fichier sera rangé.'],
        ['Clique sur Enregistrer.', { saved: true }, 'Tant qu’on n’enregistre pas, le travail n’est pas conservé (l’étoile * le rappelle).'],
        ['Ajoute le mot « Maroc » dans le texte, puis enregistre de nouveau.', (s) => norm(s.text).includes('maroc') && s.saved, 'Après une modification, il faut réenregistrer.', (s) => { s.text = 'Bonjour Maroc'; s.saved = true; }],
      ]),
    ] },
    { title: 'Saisie et édition', topics: ['saisie au clavier', 'correction', 'sélectionner, copier, couper, coller'], acts: [
      quiz('Le clavier en situation', 'Connaître le rôle des touches principales.', [
        ['Quelle touche efface le caractère à gauche du curseur ?', ['Retour arrière (⌫)', 'Suppr', 'Entrée', 'Tabulation'], 'Retour arrière efface vers la gauche.'],
        ['Quelle touche donne une lettre majuscule quand on la maintient avec une lettre ?', ['Maj (Shift)', 'Ctrl', 'Alt', 'Échap'], 'Maj sert aux majuscules.'],
        ['Pour passer à la ligne et créer un nouveau paragraphe, on appuie sur :', ['Entrée', 'Espace', 'Suppr', 'Échap'], 'Entrée valide la ligne.'],
        ['Quelle touche efface le caractère à droite du curseur ?', ['Suppr', 'Retour arrière', 'Entrée', 'Maj'], 'Suppr efface vers la droite.'],
        ['Pour séparer deux mots, on utilise :', ['La barre d’espace', 'Verr. Maj', 'Ctrl', 'Alt'], 'L’espace sépare les mots.'],
      ]),
      fill('Corrige le texte tapé trop vite', 'Repérer et corriger des fautes de frappe et d’orthographe.', [
        ['Le professeur [[explique|esplique|expliquer]] la leçon aux élèves.', 'Verbe expliquer conjugué.'],
        ['Les élèves [[sont|son|sons]] dans la salle informatique.', 'Verbe être : « sont ».'],
        ['Nous [[utilisons|utilisont|utilisions]] un ordinateur pour écrire.', 'Présent : « nous utilisons ».'],
        ['Il faut [[enregistrer|enregistré|enregistrait]] le document avant de fermer.', 'Après « il faut », on met l’infinitif.'],
        ['Ce texte contient des [[fautes|fautent|faute]] à corriger.', 'Le nom au pluriel s’écrit « fautes ».'],
      ]),
      order('Copier‑coller un mot', 'Ordonner les étapes pour copier un mot à un autre endroit.', ['Sélectionner le mot à copier.', 'Cliquer sur Copier (Ctrl + C).', 'Placer le curseur à l’endroit voulu.', 'Cliquer sur Coller (Ctrl + V).', 'Vérifier que le mot apparaît à la nouvelle place.'], { explain: 'On sélectionne, on copie, on se place, on colle, puis on vérifie.' }),
      sim('Mission Secrétaire', 'Rédiger un avis scolaire court.', 'office', { show: ['type'] }, [
        ['Écris le titre « AVIS » en majuscules.', (s) => s.text.trim().startsWith('AVIS'), 'Les majuscules s’obtiennent avec Maj.', (s) => { s.text = 'AVIS'; }],
        ['Passe à la ligne (touche Entrée) et écris : Réunion des parents le lundi', (s) => s.text.includes('\n') && norm(s.text).replace(/\s+/g, ' ').includes('avis reunion des parents le lundi'), 'Entrée crée un nouveau paragraphe.', (s) => { s.text = 'AVIS\nRéunion des parents le lundi'; }],
        ['Ajoute à la suite : « à 17 h ».', (s) => norm(s.text).includes('lundi a 17 h'), 'L’heure précise l’information.', (s) => { s.text = 'AVIS\nRéunion des parents le lundi à 17 h'; }],
        ['Corrige : remplace « lundi » par « mardi ».', (s) => !norm(s.text).includes('lundi') && norm(s.text).includes('mardi a 17 h'), 'Corriger évite de diffuser une erreur.', (s) => { s.text = 'AVIS\nRéunion des parents le mardi à 17 h'; }],
        ['Termine par une signature sur une nouvelle ligne : La direction', (s) => lines(s).length >= 3 && norm(lines(s).at(-1)) === 'la direction', 'La signature se place à la fin.', (s) => { s.text = 'AVIS\nRéunion des parents le mardi à 17 h\nLa direction'; }],
      ]),
    ] },
    { title: 'Mise en forme', topics: ['gras, italique, souligné', 'police, taille, couleur', 'alignement'], acts: [
      match('Effets et boutons', 'Associer chaque commande de mise en forme à son effet visible.', [['Gras (G)', 'Rend le texte plus épais'], ['Italique (I)', 'Incline le texte'], ['Souligné (S)', 'Trace une ligne sous le texte'], ['Centrer', 'Place le texte au milieu de la ligne'], ['Couleur de police', 'Change la couleur des lettres']]),
      hot('Repère les outils', 'Identifier la taille, la couleur et l’alignement sur la barre d’outils.', 'toolbar', [
        ['size', 'Clique sur la zone de la taille de police.', 'Elle contient un nombre.'], ['color', 'Clique sur le bouton de la couleur du texte.', 'Le A coloré change la couleur.'], ['alignC', 'Clique sur le bouton qui centre le texte.', 'Les traits sont au milieu.'],
        ['alignR', 'Clique sur le bouton qui aligne à droite.', 'Les traits sont collés à droite.'], ['font', 'Clique sur la zone du nom de la police.', 'Elle est large et à gauche.'],
      ]),
      quiz('Répare le paragraphe', 'Corriger une mise en forme maladroite.', [
        ['Le titre est petit et collé à gauche. Pour le rendre bien visible, que faire ?', ['L’agrandir et le centrer', 'Le souligner cinq fois', 'Le mettre en blanc sur fond blanc', 'Le supprimer'], 'Taille et alignement renforcent le titre.'],
        ['Tout le texte est en gras : on ne distingue plus l’important. Que faire ?', ['Garder le gras pour les mots importants seulement', 'Mettre aussi tout en italique', 'Tout souligner', 'Réduire la taille à 4'], 'Le gras n’a de sens que s’il est rare.'],
        ['Le texte est en jaune clair sur fond blanc, illisible. Que faire ?', ['Choisir une couleur foncée et contrastée', 'Augmenter la luminosité de l’écran', 'Le souligner', 'Le mettre en italique'], 'Le contraste permet la lecture.'],
        ['La date est mal placée. Pour l’aligner à droite, on utilise :', ['Le bouton Aligner à droite', 'Le bouton Souligner', 'Le bouton Italique', 'Le bouton Enregistrer'], 'L’alignement se règle avec les boutons d’alignement.'],
        ['Le paragraphe est écrit en taille 4, trop petit. Que faire ?', ['Le sélectionner puis augmenter la taille (par exemple 12)', 'L’imprimer en plus grand sans le changer', 'Le mettre en italique', 'Le centrer'], 'La taille se change après sélection.'],
      ]),
      sim('Mission Designer', 'Reproduire une annonce en respectant des consignes de mise en forme.', 'office', { show: ['fmt'] }, [
        ['Sélectionne le titre et mets-le en gras.', { 'title.b': true }, 'Le gras renforce un titre.'], ['Centre le titre.', { 'title.al': 'centre' }, 'Un titre est souvent centré.'], ['Mets le titre en taille 24.', { 'title.sz': 24 }, 'Un titre est plus grand que le texte.'],
        ['Mets le titre en rouge.', { 'title.col': 'rouge' }, 'La couleur attire le regard (avec un bon contraste).'], ['Sélectionne le paragraphe et mets-le en italique.', { 'para.i': true }, 'L’italique distingue un passage.'],
      ]),
    ] },
    { title: 'Insertion d’objets', topics: ['image', 'tableau', 'formes'], acts: [
      quiz('Image, tableau ou forme ?', 'Identifier les objets que l’on peut insérer dans un document.', [
        ['Quel objet permet d’illustrer un texte avec une photo ?', ['Une image', 'Un tableau', 'Une forme', 'Un saut de page'], 'On insère une image.'],
        ['Quel objet range des données en lignes et en colonnes ?', ['Un tableau', 'Une image', 'Un titre', 'Une marge'], 'Un tableau organise les données.'],
        ['Un cercle, un rectangle ou une flèche sont des :', ['Formes', 'Images', 'Tableaux', 'Extensions'], 'Ce sont des formes dessinées.'],
        ['Quel onglet contient les commandes pour insérer image, tableau et forme ?', ['Insertion', 'Accueil', 'Révision', 'Affichage'], 'L’onglet Insertion regroupe les objets.'],
        ['Pour numéroter les pages, on choisit :', ['Insertion puis Numéro de page', 'Accueil puis Gras', 'Affichage puis Zoom', 'Révision puis Orthographe'], 'Le numéro de page est un élément inséré.'],
      ]),
      match('Objet et utilité', 'Associer chaque objet à son utilité.', [['Image', 'Illustrer ou décorer un document'], ['Tableau', 'Présenter des données organisées'], ['Forme', 'Dessiner des flèches, cadres ou symboles'], ['Zone de texte', 'Placer un texte à un endroit libre de la page'], ['Numéro de page', 'Repérer chaque page du document']]),
      order('Compose l’affiche', 'Organiser les éléments d’une affiche de haut en bas.', ['Titre de l’affiche', 'Image principale', 'Texte de présentation', 'Tableau des horaires', 'Coordonnées de contact en bas de page'], { explain: 'Une affiche se lit de haut en bas : le titre attire, l’image illustre, le texte explique, le tableau précise, le contact conclut.' }),
      sim('Mission Affiche', 'Assembler une affiche éducative dans un éditeur simulé.', 'office', { show: ['fmt', 'insert'], title: 'Journée de l’informatique', para: 'Venez découvrir les ordinateurs de la salle 12 !' }, [
        ['Insère une image.', { img: true }, 'Une image attire l’œil.'], ['Insère un tableau.', { table: true }, 'Un tableau présente les horaires.'], ['Insère une forme.', { shape: true }, 'Une forme met en valeur une information.'],
        ['Centre le titre.', { 'title.al': 'centre' }, 'Un titre d’affiche est centré.'], ['Mets le titre en taille 18 ou plus.', (s) => s['title.sz'] >= 18, 'Le titre doit être lisible de loin.', { 'title.sz': 24 }],
      ]),
    ] },
    { title: 'Mise en page et impression', topics: ['marges', 'orientation', 'format du papier', 'aperçu', 'impression'], acts: [
      match('Réglages de page', 'Associer chaque réglage à sa signification.', [['Marges', 'Espaces blancs entre le texte et le bord de la page'], ['Orientation', 'Portrait (vertical) ou paysage (horizontal)'], ['Format du papier', 'Dimensions de la feuille : A4, A5…'], ['Nombre de copies', 'Combien d’exemplaires imprimer'], ['Aperçu avant impression', 'Voir le rendu avant de gaspiller du papier']]),
      hot('La fenêtre d’impression', 'Repérer les parties de la boîte de dialogue d’impression.', 'printdlg', [
        ['copies', 'Clique sur la zone du nombre de copies.', 'Elle contient un nombre.'], ['preview', 'Clique sur l’aperçu de la page.', 'Il montre la page avant impression.'], ['printbtn', 'Clique sur le bouton qui lance l’impression.', 'Le gros bouton en bas à droite.'],
        ['printer', 'Clique sur la zone du choix de l’imprimante.', 'Elle est tout en haut.'], ['orient', 'Clique sur la zone de l’orientation.', 'Elle contient « Portrait ».'],
      ]),
      fill('Configure selon la situation', 'Choisir les réglages d’impression adaptés à un scénario.', [
        ['Pour imprimer un tableau très large, on choisit l’orientation [[paysage|portrait|diagonale]].', 'Le paysage offre plus de largeur.'],
        ['Pour donner 30 exemplaires à la classe, on règle le nombre de [[copies|marges|polices]] sur 30.', 'Le champ « copies » fixe le nombre d’exemplaires.'],
        ['Pour économiser l’encre d’un brouillon, on imprime en [[noir et blanc|couleur|3D]].', 'Le noir et blanc consomme moins d’encre colorée.'],
        ['Pour n’imprimer que la page 2, on choisit l’étendue [[page 2 uniquement|tout le document|aucune page]].', 'On limite l’impression aux pages voulues.'],
        ['Avant d’imprimer, on consulte l’[[aperçu|enregistrement|copier‑coller]] pour vérifier la mise en page.', 'L’aperçu évite le gaspillage.'],
      ]),
      sim('Mission Impression', 'Prévisualiser un document virtuel et choisir les bons réglages.', 'office', { show: ['print'], title: 'Emploi du temps de la classe', para: 'Lundi à vendredi, de 8 h à 17 h.' }, [
        ['Choisis l’orientation paysage.', { orient: 'paysage' }, 'Un emploi du temps large tient mieux en paysage.'], ['Choisis le format de papier A4.', { paper: 'A4' }, 'A4 est le format courant des classes.'], ['Choisis des marges étroites.', { margins: 'étroites' }, 'Des marges étroites donnent plus de place au contenu.'],
        ['Règle le nombre de copies sur 3.', { copies: 3 }, 'Le champ copies fixe le nombre d’exemplaires.'], ['Clique sur Imprimer (impression simulée).', { printed: true }, 'On lance l’impression après avoir vérifié les réglages.'],
      ]),
    ] },
    { title: 'Tableur : fonctionnalités et environnement', topics: ['cellule', 'ligne', 'colonne', 'feuille', 'classeur'], acts: [
      hot('Découvre le tableur', 'Identifier les éléments de l’espace de travail d’un tableur.', 'sheet', [
        ['colhead', 'Clique sur l’en‑tête d’une colonne.', 'Les colonnes portent des lettres.'], ['rowhead', 'Clique sur l’en‑tête d’une ligne.', 'Les lignes portent des numéros.'], ['fbar', 'Clique sur la barre de formule.', 'Elle montre le contenu de la cellule active.'],
        ['tabs', 'Clique sur les onglets de feuilles.', 'Un classeur peut contenir plusieurs feuilles.'], ['namebox', 'Clique sur la zone qui donne l’adresse de la cellule.', 'Elle affiche par exemple B3.'],
      ]),
      match('Vocabulaire du tableur', 'Associer chaque terme à sa définition.', [['Cellule', 'Intersection d’une ligne et d’une colonne'], ['Ligne', 'Suite horizontale de cellules, repérée par un numéro'], ['Colonne', 'Suite verticale de cellules, repérée par une lettre'], ['Feuille', 'Page de calcul contenant des cellules'], ['Classeur', 'Fichier du tableur contenant une ou plusieurs feuilles']]),
      sim('Place les valeurs par adresse', 'Saisir des valeurs dans des cellules désignées par leur adresse.', 'sheet', { rows: 5, cols: 4, init: {} }, [
        ['Dans la cellule A1, écris le mot Nom.', { c: 'A1', v: 'Nom' }, 'A1 : colonne A, ligne 1.'], ['Dans la cellule B1, écris le mot Note.', { c: 'B1', v: 'Note' }, 'B1 : colonne B, ligne 1.'], ['Dans la cellule A2, écris le prénom Sara.', { c: 'A2', v: 'Sara' }, 'A2 : colonne A, ligne 2.'],
        ['Dans la cellule B2, écris le nombre 14.', { c: 'B2', v: 14 }, 'B2 : colonne B, ligne 2.'], ['Dans la cellule B3, écris le nombre 12.', { c: 'B3', v: 12 }, 'B3 : colonne B, ligne 3.'],
      ]),
      fill('Mission Notes : construire le tableau', 'Concevoir un tableau de notes.', [
        ['Dans un tableau de notes, on écrit les noms des élèves dans une [[colonne|feuille|barre de formule]] (par exemple la colonne A).', 'Une colonne est verticale.'],
        ['Chaque élève occupe une [[ligne|extension|police]] du tableau.', 'Une ligne est horizontale.'],
        ['La cellule à l’intersection de la colonne B et de la ligne 4 s’appelle [[B4|4B|B‑4]].', 'On écrit d’abord la lettre, puis le numéro.'],
        ['La première ligne contient souvent les [[en‑têtes (titres des colonnes)|résultats cachés|formules d’impression]].', 'Elle nomme chaque colonne.'],
        ['Pour calculer le total des notes, on écrira une [[formule|image|marge]] qui commence par le signe =.', 'Une formule débute par =.'],
      ]),
    ] },
    { title: 'Formules, adressage et fonctions', topics: ['formule', 'adresse de cellule', 'plage', 'SOMME, MOYENNE, MAX, MIN'], acts: [
      match('Adresses et plages', 'Associer chaque adresse à sa position.', [['A1', 'Colonne A, ligne 1 (coin supérieur gauche)'], ['B3', 'Colonne B, ligne 3'], ['C5', 'Colonne C, ligne 5'], ['D2', 'Colonne D, ligne 2'], ['A1:A5', 'Plage : les cellules de A1 jusqu’à A5']]),
      fill('Complète les formules', 'Compléter des formules simples.', [
        ['Une formule commence toujours par le signe [[=|+|#]].', 'Le signe = annonce un calcul.'],
        ['Pour additionner A1 et B1, on écrit =[[A1+B1|A1B1|A1 et B1]].', 'On relie les adresses avec +.'],
        ['Pour additionner les cellules de B2 à B6 : =[[SOMME(B2:B6)|SOMME(B2;B6)|ADD(B2‑B6)]]', 'Les deux‑points désignent la plage entière.'],
        ['Pour la moyenne des cellules C2 à C6 : =[[MOYENNE(C2:C6)|MOYEN(C2;C6)|MOY(C2‑C6)]]', 'La fonction s’appelle MOYENNE.'],
        ['Si B2 contient 10 et C2 contient 4, la formule =B2*C2 affiche [[40|14|6]].', 'Le signe * multiplie.'],
      ]),
      quiz('Débogue les formules', 'Trouver les erreurs dans des formules.', [
        ['Formule saisie : SOMME(B2:B6)\nQue faut‑il corriger ?', ['Ajouter le signe = au début', 'Remplacer B2:B6 par B2‑B6', 'Supprimer les parenthèses', 'Rien, c’est correct'], 'Sans =, le tableur lit du texte.'],
        ['En C1, la formule =A1+B1 avec A1 = 5 et B1 = 7. Quel résultat s’affiche ?', ['12', '57', '5+7', '#NOM?'], 'Les cellules sont additionnées : 5 + 7 = 12.'],
        ['Formule : =MOYENNE(B2:B5\nQue manque‑t‑il ?', ['La parenthèse fermante )', 'Un point‑virgule final', 'Une seconde parenthèse ouvrante', 'Le signe $'], 'Chaque parenthèse ouverte doit être fermée.'],
        ['La formule =B2*C2 est recopiée une ligne plus bas. Elle devient :', ['=B3*C3', '=B2*C2', '=B2*C3', '=B3*C2'], 'Les adresses relatives avancent d’une ligne.'],
        ['Une cellule affiche #DIV/0! avec =A1/B1. Cause probable :', ['B1 contient 0 ou est vide', 'A1 contient un grand nombre', 'Le signe / n’existe pas', 'La feuille est trop grande'], 'On ne peut pas diviser par zéro.'],
      ]),
      sim('Mission Moyennes', 'Calculer des moyennes, un total et un maximum avec des formules.', 'sheet', { rows: 6, cols: 4, init: { A1: 'Nom', B1: 'Maths', C1: 'Physique', D1: 'Moyenne', A2: 'Sara', B2: '14', C2: '12', A3: 'Omar', B3: '10', C3: '14', A4: 'Lina', B4: '18', C4: '12', A5: 'Total' } }, [
        ['En D2, calcule la moyenne de Sara avec une formule (=MOYENNE(B2:C2)).', { c: 'D2', v: 13, f: '=MOYENNE(B2:C2)' }, 'En français on écrit MOYENNE et les arguments se séparent par ;.'],
        ['En D3, calcule la moyenne d’Omar avec une formule.', { c: 'D3', v: 12, f: '=MOYENNE(B3:C3)' }, '(10 + 14) / 2 = 12.'], ['En D4, calcule la moyenne de Lina avec une formule.', { c: 'D4', v: 15, f: '=MOYENNE(B4:C4)' }, '(18 + 12) / 2 = 15.'],
        ['En B5, calcule le total des notes de Maths avec SOMME.', { c: 'B5', v: 42, f: '=SOMME(B2:B4)' }, '14 + 10 + 18 = 42.'], ['En C5, trouve la meilleure note de Physique avec MAX.', { c: 'C5', v: 14, f: '=MAX(C2:C4)' }, 'MAX renvoie la plus grande valeur de la plage.'],
      ]),
    ] },
    { title: 'Graphiques', topics: ['diagramme en barres', 'courbe', 'diagramme circulaire', 'titre, axes, légende'], acts: [
      hot('Reconnais les graphiques', 'Identifier des types de graphiques et leurs éléments.', 'charts', [
        ['bar', 'Clique sur le diagramme en barres.', 'Il compare des valeurs avec des rectangles.'], ['line', 'Clique sur la courbe.', 'Elle suit une évolution.'], ['pie', 'Clique sur le diagramme circulaire.', 'Il montre des parts d’un total.'],
        ['axis', 'Clique sur l’axe horizontal du diagramme en barres.', 'L’axe horizontal porte les catégories.'], ['legend', 'Clique sur la légende.', 'Elle explique les couleurs.'],
      ]),
      match('Quel graphique pour quelles données ?', 'Choisir le type de graphique adapté aux données.', [
        ['Comparer les notes de 5 élèves', 'Diagramme en barres'], ['Suivre la température heure par heure', 'Courbe'], ['Montrer la part de chaque sport préféré en pourcentage', 'Diagramme circulaire'], ['Relier la taille et le poids de chaque élève', 'Nuage de points'], ['Garder une liste de noms et de numéros', 'Tableau seul (pas de graphique)'],
      ]),
      fill('Complète les éléments du graphique', 'Compléter titre, axes et légende.', [
        ['Un graphique doit avoir un [[titre|virus|pilote]] qui dit ce qu’il montre.', 'Le titre explique le sujet.'],
        ['L’axe horizontal affiche souvent les [[catégories (par exemple les matières)|numéros de ligne|noms de fichiers]].', 'Ce sont les éléments comparés.'],
        ['L’axe vertical affiche l’[[échelle (les valeurs)|auteur|imprimante]].', 'Il permet de lire les valeurs.'],
        ['La [[légende|barre d’état|règle]] explique la signification des couleurs ou des séries.', 'Sans légende, on ne sait pas quelle couleur correspond à quoi.'],
        ['Un diagramme circulaire convient pour montrer des [[parts d’un total|évolutions dans le temps|adresses]].', 'Chaque secteur est une part du tout.'],
      ]),
      sim('Mission Statistiques', 'Construire et interpréter un graphique à partir des moyennes d’une classe.', 'chart', { data: [['Maths', 14], ['Français', 12], ['Anglais', 15], ['SVT', 11], ['Physique', 13]], init: { type: 'courbe' } }, [
        ['Choisis le type de graphique le plus adapté pour comparer les matières.', { type: 'barres' }, 'Des barres comparent bien plusieurs catégories.'], ['Donne un titre qui contient le mot « moyennes ».', { title: '~moyennes' }, 'Le titre précise ce que montre le graphique.'],
        ['Affiche les titres des axes.', { axes: true }, 'Les axes doivent être nommés.'], ['Affiche la légende.', { legend: true }, 'La légende aide à lire les couleurs.'], ['Interprète : quelle matière a la meilleure moyenne ?', { answer: 'Anglais' }, 'La barre la plus haute est celle d’Anglais (15).'],
      ]),
    ] },
  ],
};
