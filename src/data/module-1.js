import { match, sort, order, fill, quiz, hot, asm, sim } from './dsl.js';

export default {
  id: 1, title: 'Généralités sur les systèmes informatiques', short: 'Systèmes informatiques', icon: '🖥️', color: 'm1',
  sessions: [
    { title: 'Définitions et vocabulaire de base', topics: ['information', 'traitement', 'informatique', 'système informatique'], acts: [
      match('Associe les définitions', 'Associer chaque notion de base à sa définition.', [
        ['Information', 'Élément de connaissance (texte, nombre, image, son) que l’on peut représenter, conserver ou communiquer.'],
        ['Traitement', 'Opération appliquée à des informations pour obtenir un résultat (calculer, trier, classer…).'],
        ['Informatique', 'Science du traitement automatique de l’information par des ordinateurs.'],
        ['Système informatique', 'Ensemble formé du matériel (ordinateur, périphériques) et des logiciels qui traitent l’information.'],
        ['Donnée', 'Information brute, avant tout traitement, comme la note 14 ou le mot « Rabat ».'],
      ]),
      sort('Information ou traitement ?', 'Distinguer une information d’une opération de traitement.', ['Information', 'Traitement'], [
        ['25 °C', 0, 'C’est une donnée mesurée.'], ['La note 15/20', 0, 'C’est une donnée.'], ['Le prénom « Salma »', 0, 'C’est une donnée de type texte.'], ['La ville de Fès', 0, 'C’est une donnée.'], ['Une photo de classe', 0, 'C’est une information sous forme d’image.'],
        ['Calculer une moyenne', 1, 'On transforme des données en résultat.'], ['Trier des noms par ordre alphabétique', 1, 'Trier est une opération.'], ['Convertir des dirhams en euros', 1, 'Opération de calcul.'], ['Corriger les fautes d’un texte', 1, 'Opération de modification.'], ['Rechercher un mot dans un document', 1, 'Opération sur l’information.'],
      ]),
      fill('Compléter le schéma Entrée → Traitement → Sortie', 'Placer les trois étapes du fonctionnement d’un système informatique.', [
        ['Les informations de départ (deux nombres tapés au clavier) constituent l’[[entrée|sortie|traitement]].', 'Ce qui est fourni au système au départ s’appelle l’entrée.'],
        ['Additionner ces deux nombres est une opération de [[traitement|entrée|sortie]].', 'Le calcul transforme les données.'],
        ['Le résultat affiché à l’écran est la [[sortie|entrée|donnée brute]].', 'Ce que le système restitue est la sortie.'],
        ['Dans l’ordre logique, c’est le [[traitement|résultat|clavier]] qui transforme l’information d’entrée en information de sortie.', 'Le traitement est l’étape intermédiaire.'],
        ['Un correcteur reçoit un texte (entrée), le corrige (traitement) et affiche un texte [[corrigé|inchangé|supprimé]] (sortie).', 'La sortie est le résultat du traitement.'],
      ]),
      quiz('Mission : le bulletin scolaire', 'Identifier entrée, traitement et sortie dans la production d’un bulletin.', [
        ['Pour calculer la moyenne de Sara, quelles sont les informations d’entrée ?', ['Ses notes dans chaque matière et les coefficients', 'La moyenne finale', 'Le bulletin imprimé', 'Le nom de l’école seulement'], 'Les notes sont les données de départ.'],
        ['Quelle opération constitue le traitement ?', ['Multiplier chaque note par son coefficient, additionner, puis diviser par la somme des coefficients', 'Écrire le nom de l’élève', 'Imprimer la feuille', 'Brancher l’imprimante'], 'Le traitement transforme les notes en moyenne.'],
        ['Que représente la moyenne affichée sur le bulletin ?', ['Une information de sortie, résultat du traitement', 'Une information d’entrée', 'Un logiciel', 'Un périphérique'], 'Elle est produite par le traitement.'],
        ['Le professeur corrige une note. Que faut-il refaire ?', ['Relancer le traitement avec la note corrigée pour obtenir une nouvelle moyenne', 'Rien, la moyenne se corrige seule', 'Changer d’ordinateur', 'Supprimer tous les bulletins'], 'Une entrée modifiée impose un nouveau traitement.'],
        ['Le bulletin complet est produit par :', ['Un système informatique (matériel + logiciels + données)', 'Le seul clavier', 'La seule imprimante', 'Uniquement l’écran'], 'Plusieurs éléments travaillent ensemble.'],
      ]),
    ] },
    { title: 'Schéma fonctionnel d’un ordinateur', topics: ['entrée', 'traitement', 'sortie', 'stockage'], acts: [
      sort('Construis le schéma', 'Placer chaque élément dans le bloc fonctionnel qui lui correspond.', ['Entrée', 'Traitement', 'Sortie', 'Stockage'], [
        ['Clavier', 0, 'Il envoie des informations à l’ordinateur.'], ['Souris', 0, 'Elle envoie des positions et des clics.'], ['Scanner', 0, 'Il fait entrer une image dans l’ordinateur.'],
        ['Processeur (CPU)', 1, 'Il exécute les calculs.'], ['Mémoire vive (RAM)', 1, 'Elle contient ce que le processeur utilise en ce moment.'],
        ['Écran', 2, 'Il affiche le résultat.'], ['Haut-parleurs', 2, 'Ils restituent le son.'], ['Imprimante', 2, 'Elle produit le résultat sur papier.'],
        ['Disque dur / SSD', 3, 'Il conserve les fichiers durablement.'], ['Clé USB', 3, 'Elle conserve des fichiers et se transporte.'],
      ]),
      match('Relie les périphériques', 'Associer chaque périphérique à son rôle.', [
        ['Clavier', 'Saisir du texte et des commandes'], ['Souris', 'Pointer et sélectionner à l’écran'], ['Écran', 'Afficher le résultat sous forme visuelle'], ['Imprimante', 'Produire le résultat sur papier'], ['Disque dur', 'Conserver durablement les fichiers'],
      ]),
      order('Le parcours de l’information', 'Ordonner les étapes entre la frappe d’une touche et l’affichage.', [
        'Tu tapes la touche A sur le clavier.', 'Le clavier envoie le signal à l’unité centrale.', 'Le processeur traite l’information avec la mémoire.', 'Le système prépare l’image de la lettre.', 'La lettre A s’affiche sur l’écran.',
      ], { explain: 'Le chemin suit toujours entrée → traitement → sortie.' }),
      sim('Mission ordinateur', 'Simuler la saisie de deux nombres, leur addition, l’affichage et l’enregistrement.', 'calc', {}, [
        ['Saisis le nombre 12 dans la première case (entrée).', { a: 12 }, 'La saisie est l’étape d’entrée.'],
        ['Saisis le nombre 30 dans la deuxième case.', { b: 30 }, 'Les deux données sont prêtes.'],
        ['Lance le traitement : clique sur « Additionner ».', { calc: true }, 'Le processeur calcule 12 + 30.'],
        ['Fais afficher le résultat sur l’écran (sortie).', { shown: true }, 'On ne peut afficher qu’un résultat déjà calculé.'],
        ['Conserve le résultat dans le stockage.', { saved: true }, 'Le stockage garde le résultat après l’extinction.'],
      ]),
    ] },
    { title: 'Périphériques et unité centrale', topics: ['processeur', 'mémoire vive', 'stockage', 'carte mère', 'périphériques'], acts: [
      hot('Reconnais les composants', 'Identifier les composants principaux sur un schéma de l’intérieur du boîtier.', 'pc', [
        ['ram', 'Clique sur la mémoire vive (RAM).', 'La RAM est formée de barrettes longues enfichées dans des fentes.'], ['cpu', 'Clique sur le processeur (CPU).', 'Le processeur est le cerveau qui exécute les instructions.'], ['mobo', 'Clique sur la carte mère.', 'Elle relie tous les composants.'],
        ['ssd', 'Clique sur l’unité de stockage SSD.', 'Elle conserve les fichiers même éteinte.'], ['psu', 'Clique sur l’alimentation.', 'Elle transforme le courant de la prise pour les composants.'],
      ]),
      sort('Classe les périphériques', 'Classer des périphériques selon leur rôle (entrée, sortie, les deux, stockage).', ['Entrée', 'Sortie', 'Entrée et sortie', 'Stockage'], [
        ['Souris', 0, 'Elle envoie des informations seulement.'], ['Microphone', 0, 'Il capte le son.'], ['Scanner', 0, 'Il numérise un document.'],
        ['Vidéoprojecteur', 1, 'Il projette l’image.'], ['Haut-parleurs', 1, 'Ils restituent le son.'],
        ['Écran tactile', 2, 'Il affiche et reçoit les touches.'], ['Casque avec micro', 2, 'Il écoute et capte la voix.'], ['Imprimante multifonction', 2, 'Elle imprime (sortie) et numérise (entrée).'],
        ['Clé USB', 3, 'Elle conserve des fichiers.'], ['Disque dur externe', 3, 'Il conserve de grands volumes de données.'],
      ]),
      asm('Assemble l’ordinateur', 'Placer les composants au bon endroit dans le boîtier.', [
        { name: 'Carte mère', icon: '🟩' }, { name: 'Processeur (CPU)', icon: '🔲' }, { name: 'Mémoire vive (RAM)', icon: '📏' }, { name: 'Disque SSD', icon: '💾' }, { name: 'Ventilateur', icon: '🌀' }, { name: 'Alimentation', icon: '🔌' },
      ], [
        { x: 3, y: 4, w: 62, h: 92, hint: 'Grande plaque fixée au fond du boîtier, elle relie tous les composants', part: 0, why: 'la carte mère se fixe au fond du boîtier et reçoit tous les autres composants.' },
        { x: 20, y: 40, w: 17, h: 24, hint: 'Support carré au centre de la plaque', part: 1, why: 'le processeur se place dans le support (socket) de la carte mère.' },
        { x: 44, y: 12, w: 15, h: 64, hint: 'Fentes longues et fines à côté du processeur', part: 2, why: 'les barrettes de RAM s’enfichent dans les fentes de la carte mère.' },
        { x: 72, y: 8, w: 25, h: 18, hint: 'Baie de stockage au bord, reliée par un câble de données', part: 3, why: 'le SSD se fixe dans une baie et se relie à la carte mère par câble ; il ne se confond pas avec la RAM.' },
        { x: 18, y: 10, w: 22, h: 24, hint: 'Se pose au‑dessus du processeur pour évacuer la chaleur', part: 4, why: 'le ventilateur refroidit le processeur, qui chauffe beaucoup.' },
        { x: 72, y: 64, w: 25, h: 30, hint: 'Bloc en bas du boîtier qui reçoit le courant de la prise', part: 5, why: 'l’alimentation fournit le courant à tous les composants.' },
      ]),
      quiz('Mission dépannage', 'Choisir le matériel adapté à une situation et expliquer pourquoi.', [
        ['L’ordinateur est très lent quand on ouvre plusieurs programmes lourds. Quel composant ajouter en priorité ?', ['De la mémoire vive (RAM)', 'Un second clavier', 'Un écran plus grand', 'Une imprimante'], 'La RAM contient les programmes en cours d’utilisation : plus elle est grande, plus l’ordinateur respire.'],
        ['Le disque est plein : impossible d’enregistrer de nouveaux fichiers. Que faire ?', ['Libérer de l’espace ou ajouter un disque de stockage', 'Ajouter une souris', 'Changer le ventilateur', 'Brancher des haut-parleurs'], 'Le stockage conserve les fichiers ; il manque de la place.'],
        ['Un élève veut écouter une vidéo mais n’entend rien. Quel périphérique manque ?', ['Des haut-parleurs ou un casque', 'Un scanner', 'Un microphone', 'Une imprimante'], 'Le son est une sortie.'],
        ['L’ordinateur chauffe beaucoup et ralentit. Quel élément vérifier ?', ['Le ventilateur de refroidissement (poussière, panne)', 'Le clavier', 'La souris', 'Le fond d’écran'], 'Un mauvais refroidissement fait chauffer le processeur.'],
        ['Le professeur veut projeter la leçon au tableau. Quel périphérique de sortie choisir ?', ['Un vidéoprojecteur', 'Un scanner', 'Un microphone', 'Une webcam'], 'Projeter une image est une sortie.'],
      ]),
    ] },
    { title: 'Types de logiciels et domaines d’application', topics: ['logiciel de base', 'logiciel d’application', 'domaines d’utilisation'], acts: [
      match('Associe les logiciels', 'Associer des logiciels courants à leur fonction.', [
        ['Windows', 'Système d’exploitation de nombreux PC : il gère le matériel et lance les programmes'], ['Android', 'Système d’exploitation des téléphones et tablettes'], ['Writer', 'Application pour rédiger des documents'], ['Calc', 'Application pour faire des calculs dans un tableau'], ['Navigateur web', 'Application pour consulter des pages sur Internet'],
      ]),
      sort('Classe les logiciels', 'Distinguer logiciels de base et logiciels d’application.', ['Logiciel de base', 'Logiciel d’application'], [
        ['Windows', 0, 'C’est un système d’exploitation.'], ['Linux', 0, 'C’est un système d’exploitation.'], ['Android', 0, 'C’est un système d’exploitation.'], ['macOS', 0, 'C’est un système d’exploitation.'], ['iOS', 0, 'C’est un système d’exploitation.'],
        ['Writer', 1, 'Application de rédaction.'], ['Calc', 1, 'Application de calcul.'], ['Navigateur web', 1, 'Application de navigation.'], ['Lecteur de musique', 1, 'Application multimédia.'], ['Logiciel de dessin', 1, 'Application graphique.'],
      ]),
      quiz('Trouve le bon outil', 'Choisir le logiciel adapté à un besoin.', [
        ['Tu dois écrire une lettre à la directrice. Quel outil choisis‑tu ?', ['Un traitement de texte', 'Un tableur', 'Un navigateur', 'Un lecteur de musique'], 'Le traitement de texte sert à rédiger.'],
        ['Tu veux calculer les moyennes de la classe. Quel outil ?', ['Un tableur', 'Un traitement de texte', 'Un logiciel de dessin', 'Un lecteur vidéo'], 'Le tableur calcule avec des formules.'],
        ['Tu veux chercher des informations sur Internet. Quel outil ?', ['Un navigateur web', 'Un tableur', 'Un traitement de texte', 'Un antivirus'], 'Le navigateur affiche les pages web.'],
        ['Tu veux créer une affiche illustrée. Quel outil ?', ['Un logiciel de dessin ou de mise en page', 'Un tableur', 'Un système d’exploitation', 'Un navigateur'], 'On dessine et on dispose images et texte.'],
        ['Tu dois présenter un exposé avec des diapositives. Quel outil ?', ['Un logiciel de présentation', 'Un antivirus', 'Un tableur', 'Un lecteur audio'], 'Il sert à projeter des diapositives.'],
      ]),
      fill('Mission école numérique', 'Équiper une salle informatique avec les logiciels adaptés et justifier.', [
        ['Pour que les ordinateurs fonctionnent, chaque poste doit d’abord avoir un [[système d’exploitation|tableur|navigateur]].', 'Sans lui, aucun autre logiciel ne peut tourner.'],
        ['Les élèves rédigent leurs comptes rendus avec un [[traitement de texte|lecteur audio|antivirus]].', 'Il sert à écrire et à mettre en forme.'],
        ['Le professeur de mathématiques calcule les moyennes avec un [[tableur|navigateur|logiciel de dessin]].', 'Le tableur fait les calculs automatiquement.'],
        ['Pour faire des recherches sur Internet, on installe un [[navigateur web|traitement de texte|tableur]].', 'Il affiche les pages web.'],
        ['Pour créer l’affiche de la fête de l’école, on utilise un [[logiciel de dessin ou de mise en page|tableur|système d’exploitation]].', 'Il permet d’assembler image et texte.'],
      ]),
    ] },
  ],
};
