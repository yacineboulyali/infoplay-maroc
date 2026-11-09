import { hot, match, sort, order, quiz } from '../dsl.js';
import { STUDENT_ILLUSTRATIONS } from '../student-illustrations.js';

export const title = 'Fondamentaux du digital et architecture d’un ordinateur';
const images = STUDENT_ILLUSTRATIONS;
const art = (id) => images[id];
const parts = [
  ['Processeur (CPU)', 'Exécute les instructions, effectue les calculs et coordonne les opérations. La fréquence se mesure en GHz et le nombre de cœurs est une autre caractéristique.', art('m1-s2-a1-q04'), 'Puce carrée avec des contacts sur son pourtour'],
  ['Mémoire vive (RAM)', 'Garde temporairement les données et les programmes en cours d’utilisation. Sa capacité s’exprime en Go. Son contenu est perdu à l’arrêt.', art('m1-s2-a1-q05'), 'Barrette allongée avec plusieurs puces'],
  ['Disque dur (HDD)', 'Conserve durablement des fichiers sur des plateaux magnétiques. Il offre souvent une grande capacité et il est généralement plus lent qu’un SSD.', art('m1-s2-a2-q05'), 'Boîtier ouvert laissant voir un plateau circulaire et un bras'],
  ['SSD', 'Conserve durablement les fichiers en mémoire flash. Il est généralement plus rapide qu’un HDD et ne contient aucune pièce mécanique mobile.', 'sprite-stock', 'Deux supports flash : une carte fine et un boîtier plat'],
  ['Carte mère', 'Relie les composants et permet aux données de circuler entre eux.', 'sprite-board', 'Grande carte avec un support de processeur et de nombreux connecteurs'],
  ['Carte graphique (GPU)', 'Traite les images et les vidéos destinées à l’affichage.', 'sprite-gpu', 'Carte d’extension avec deux ventilateurs et des sorties vidéo'],
  ['Alimentation (PSU)', 'Convertit et fournit l’énergie électrique nécessaire aux composants.', 'sprite-psu', 'Bloc électrique avec une prise secteur et une grille'],
  ['Système de refroidissement', 'Évacue la chaleur avec un ventilateur et un radiateur pour éviter la surchauffe.', 'sprite-fan', 'Ventilateur à pales dans un cadre carré'],
  ['ROM et mémoire du micrologiciel', 'La ROM conserve ses données sans alimentation. Sur les PC modernes, le micrologiciel BIOS ou UEFI se trouve généralement dans une mémoire flash non volatile.', 'sprite-flash', 'Petite puce de micrologiciel à huit pattes'],
  ['Lecteur CD/DVD', 'Lit les données d’un disque optique, si le poste dispose de ce lecteur.', 'sprite-disc', 'Boîtier avec un tiroir contenant un disque optique'],
  ['Clé USB', 'Support amovible qui conserve et transporte les fichiers.', art('m1-s2-a1-q10')],
];

export const peripherals = [
  ['Clavier', 0, 'Saisit du texte.', '01'], ['Souris', 0, 'Commande le pointeur.', '02'],
  ['Scanner', 0, 'Numérise un document.', '03'], ['Microphone', 0, 'Capte le son.'],
  ['Écran', 1, 'Affiche les résultats.', '06'], ['Imprimante', 1, 'Imprime sur papier.', '08'],
  ['Haut-parleurs', 1, 'Restituent le son.', '07'], ['Vidéoprojecteur', 1, 'Projette l’image.'],
  ['Écran tactile', 2, 'Affiche une image et reçoit des gestes.'],
  ['Clé USB', 2, 'Permet de lire et d’écrire des données.', '10'],
  ['Disque externe', 2, 'Permet de lire et d’écrire des fichiers.'],
  ['Casque avec microphone', 2, 'Restitue le son et capte la voix.'],
  ['Modem ou box', 2, 'Envoie et reçoit les données du réseau.'],
];

export const ports = [
  ['USB-A', 'Clavier filaire avec fiche USB-A', 'Port rectangulaire pour un clavier, une souris ou une clé USB compatible.'],
  ['HDMI', 'Écran avec câble HDMI', 'Liaison numérique pour l’image et le son.'],
  ['VGA', 'Vidéoprojecteur avec câble VGA', 'Liaison vidéo analogique. La prise VGA possède trois rangées de cinq contacts.'],
  ['RJ45', 'Box avec câble Ethernet RJ45', 'Liaison au réseau Ethernet par câble.'],
  ['Jack 3,5 mm', 'Casque avec fiche audio 3,5 mm', 'Connexion audio analogique.'],
];

export const portPictures = ['sprite-port-usb', 'sprite-port-hdmi', 'images/egtsi106/vga.svg', 'sprite-port-rj45', 'sprite-port-jack'];
const plugPictures = ['sprite-plug-usb', 'sprite-plug-hdmi', 'images/egtsi106/vga-plug.svg', 'sprite-plug-rj45', 'sprite-plug-jack'];

const cableLabels = [
  'Clavier · fiche plate et rectangulaire',
  'Écran · fiche vidéo fine aux coins biseautés',
  'Vidéoprojecteur · fiche à 15 broches avec deux vis',
  'Box · fiche transparente à languette',
  'Casque · fiche cylindrique à anneaux',
];

export const topics = [
  ['Digitalisation et informatique', [
    ['Le numérique', 'Représente l’information sous forme numérique. Le matériel utilise des bits, 0 et 1, pour la créer, la traiter, la stocker et l’échanger.'],
    ['L’informatique', 'Science et technique du traitement automatique de l’information à l’aide d’ordinateurs et de programmes.'],
    ['La digitalisation', 'Intégration des technologies numériques dans les activités. En entreprise, elle aide à gagner du temps, mieux communiquer, organiser et partager l’information, améliorer la productivité et réduire les coûts.'],
  ]],
  ['Architecture et fonctionnement', [
    ['Système informatique', 'Le matériel et les logiciels travaillent ensemble. Un ordinateur est une machine électronique programmable qui reçoit, traite, stocke et restitue des données.'],
    ['Types d’ordinateurs', 'Poste de bureau, ordinateur portable, tablette et smartphone. Un ordinateur hybride combine des usages du portable et de la tablette. Les appareils mobiles permettent de travailler, communiquer et accéder à Internet en déplacement.'],
    ['Entrée → traitement → sortie', 'Le clavier saisit le texte, le processeur exécute les instructions du programme et l’écran restitue le résultat. Le stockage conserve les données. Dans l’exemple du cours, on saisit le texte, il est traité, on l’enregistre sur le disque, puis on le consulte ou on l’imprime.'],
  ]],
  ['Composants et stockage', parts],
  ['Périphériques et connectiques', [
    ['Entrée', 'Introduit des données dans l’ordinateur.'],
    ['Sortie', 'Restitue les résultats du traitement.'],
    ['Entrée et sortie', 'Permet à la fois d’envoyer et de recevoir des données.'],
    ...peripherals.map(([name, , role, id]) => [name, role, id && art('m1-s2-a1-q' + id)]),
    ...ports.map(([name, , role]) => [name, role]),
  ]],
  ['Logiciels et système d’exploitation', [
    ['Logiciel', 'Programme ou ensemble d’instructions qui permet de réaliser des tâches avec le matériel.'],
    ['Logiciels système', 'Windows, Linux et macOS sont des systèmes d’exploitation. Ils gèrent le matériel, les fichiers, les programmes et les droits d’accès, et fournissent une interface utilisateur.'],
    ['Applications et utilitaires', 'Word, Excel et PowerPoint servent à la bureautique. Chrome et Edge servent à naviguer, VLC à lire des médias. Les utilitaires incluent les antivirus et les outils de compression.'],
  ]],
  ['Réseaux et Internet', [
    ['Réseau', 'Ensemble d’appareils reliés pour communiquer et partager des ressources comme des fichiers, des imprimantes ou une connexion.'],
    ['LAN et WAN', 'Un LAN couvre un espace limité, comme un bureau. Un WAN relie des équipements ou réseaux distants. Internet est un réseau mondial de réseaux.'],
    ['Services', 'Navigation Web, messagerie électronique, stockage dans le cloud et collaboration, par exemple en visioconférence.'],
  ]],
  ['Fichiers, risques et bonnes pratiques', [
    ['Donnée et information', 'Une donnée est un élément brut, par exemple une mesure. Une information est une donnée traitée et interprétée, par exemple un rapport.'],
    ['Fichier, dossier, extension', 'Un fichier est un ensemble de données enregistré, comme facture.pdf. Un dossier regroupe des fichiers. Une extension telle que .docx, .pdf ou .jpg indique le type du fichier.'],
    ['Risques et protection', 'Panne, perte de données, logiciel malveillant et accès non autorisé. Sauvegarder régulièrement, utiliser un antivirus, faire les mises à jour et protéger les accès avec un mot de passe.'],
  ]],
];

export const activities = [
  match('Nommer les composants illustrés', 'Glisse chaque carte illustrée vers le nom du composant ou sélectionne les deux cartes au clavier.',
    parts.filter((part) => part[3]).map(([name, why, , description]) => [description, name, why]),
    { pictures: parts.filter((part) => part[3]).map((part) => part[2]) }),
  match('Associer les composants à leur rôle', 'Glisse chaque composant vers sa fonction.',
    parts.map(([name, why]) => [name, why, why]), { pictures: parts.map((part) => part[2]) }),
  sort('Classer les périphériques', 'Place chaque appareil dans la catégorie qui correspond à son usage.', ['Entrée', 'Sortie', 'Entrée et sortie'],
    peripherals.map(([name, category, why]) => [name, category, why]),
    { pictures: peripherals.map(([, , , id]) => id && art('m1-s2-a1-q' + id)) }),
  match('Brancher les câbles du poste', 'Glisse chaque fiche vers sa prise en observant sa forme. Tu peux aussi sélectionner les deux cartes au clavier.',
    ports.map(([name, , why], i) => [cableLabels[i], name, why]), { pictures: plugPictures, answers: portPictures }),
  order('Reconstituer le cycle de l’information', 'Le poste est branché. Remets dans l’ordre les étapes de rédaction du rapport, de la saisie à la restitution.', [
    'Entrée · Je saisis le texte avec le clavier.', 'Traitement · Le processeur traite les données.',
    'Stockage · J’enregistre le rapport sur le SSD.', 'Sortie · Je consulte le rapport à l’écran ou je l’imprime.',
  ]),
  quiz('Évaluation formative', 'Réponds aux quatre questions des deux storyboards.', [
    ['Quel composant exécute les instructions ?', ['Le CPU', 'La RAM', 'Le disque dur'], 'Le CPU exécute les instructions des programmes.'],
    ['La RAM est une mémoire…', ['Temporaire', 'Permanente'], 'La mémoire vive perd son contenu à l’arrêt.'],
    ['Quel élément est un logiciel ?', ['Windows', 'Un clavier', 'Un écran'], 'Windows est un système d’exploitation.'],
    ['Le processeur est…', ['Le cerveau de l’ordinateur', 'Une mémoire de stockage', 'Un périphérique de sortie', 'Un logiciel d’application'], 'Le processeur traite les données et exécute les instructions.'],
  ]),
  hot('Explorer le bureau du poste', 'Sur le bureau Windows, choisis une consigne puis clique sur la zone correspondante. Tu peux aussi utiliser la liste des zones.', 'desktop', [
    ['start', 'Repère le bouton qui ouvre le menu des applications.', 'Le menu Démarrer donne accès aux applications et aux paramètres.'],
    ['icon', 'Repère les raccourcis vers Ce PC, Documents et le navigateur.', 'Les icônes donnent un accès rapide à ces éléments.'],
    ['win', 'Repère la fenêtre qui affiche les fichiers du dossier ouvert.', 'L’Explorateur permet de consulter et d’organiser les fichiers.'],
    ['taskbar', 'Repère la barre qui affiche les applications ouvertes.', 'La barre des tâches permet de passer d’une application ouverte à l’autre.'],
    ['tray', 'Repère la zone qui affiche l’heure, le son et le réseau.', 'Ces indicateurs se trouvent dans la zone de notification.'],
  ]),
];

// L’ordre pédagogique est indépendant des liens déjà diffusés.
export const activitySequence = [6, 3, 4, 0, 1, 2, 5];
