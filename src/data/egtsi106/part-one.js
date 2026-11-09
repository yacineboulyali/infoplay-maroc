import { getActivity } from '../index.js';
import { fill, match, order, quiz } from '../dsl.js';

export const partOneSessions = [
  {
    id: '2',
    title: 'Logiciels, réseaux, appareils mobiles et impression',
    mission: 'Équiper le service administratif pour communiquer, imprimer et numériser ses documents.',
    topics: [
      ['Vocabulaire du numérique', [
        ['Donnée et information', '24 est une donnée. « 24 postes ont été contrôlés » est une information, car la valeur est interprétée dans un contexte.'],
        ['Digitalisation', 'Intégrer des outils numériques dans une activité, par exemple remplacer un registre papier par un formulaire partagé.'],
        ['Système informatique', 'Le matériel et les logiciels coopèrent pour saisir, traiter, stocker et restituer des informations.'],
      ]],
      ['Types d’ordinateurs et logiciels', [
        ['PC, serveur et superordinateur', 'Un PC sert aux tâches courantes. Un serveur fournit des ressources à d’autres appareils. Un superordinateur exécute des calculs massifs, par exemple pour la météo.'],
        ['Logiciels', 'Le système d’exploitation gère le matériel et les programmes. Une application réalise une tâche précise. Un utilitaire sert par exemple à protéger ou à entretenir le poste.'],
      ]],
      ['Communication entre ordinateurs', [
        ['Réseau local et réseau étendu', 'Un LAN couvre une zone limitée. Un WAN relie des sites distants. Les appareils peuvent rejoindre le réseau par Ethernet ou Wi-Fi pour partager des fichiers, des services ou une imprimante.'],
      ]],
      ['Appareils mobiles', [
        ['Équipements et usages', 'Smartphones, tablettes, liseuses et terminaux spécialisés sont conçus pour des usages en déplacement. Android et iOS gèrent les applications, réglages et notifications. Le partage envoie un contenu et la synchronisation maintient des données cohérentes entre appareils.'],
        ['Protection', 'Verrouille l’appareil par un code, installe les mises à jour, sauvegarde les données et accorde seulement les autorisations nécessaires.'],
      ]],
      ['Impression et numérisation', [
        ['Imprimantes', 'Le jet d’encre dépose de l’encre et l’imprimante laser utilise du toner. Compare le format du papier, la résolution, la vitesse en pages par minute, la connectique et le délai avant la première page.'],
        ['Scanner', 'Le scanner transforme un document papier en fichier. Un appareil multifonction peut imprimer, copier et numériser. Avant d’enregistrer, vérifie le cadrage, l’orientation et la lisibilité.'],
      ]],
    ],
    activities: [
      getActivity('m1-s1-a1'),
      match('Choisir le bon type d’ordinateur', 'Associe chaque équipement au besoin du service.', [
        ['PC', 'Rédiger et consulter des documents'],
        ['Serveur', 'Fournir un espace de fichiers commun à plusieurs postes'],
        ['Superordinateur', 'Simuler la météo à grande échelle'],
        ['Appareil mobile', 'Saisir un relevé sur le terrain'],
      ]),
      getActivity('m1-s4-a1'),
      getActivity('m4-s1-a4'),
      quiz('Protéger un appareil mobile', 'Choisis le geste adapté à chaque situation.', [
        ['Une calculatrice demande l’accès aux contacts. Que faire ?', ['Refuser cette autorisation', 'Autoriser tous les accès', 'Désactiver le verrouillage'], 'Les contacts ne sont pas nécessaires au calcul.'],
        ['Comment récupérer des fichiers après la perte du téléphone ?', ['Restaurer une sauvegarde', 'Augmenter la luminosité', 'Supprimer le code PIN'], 'Une sauvegarde conserve une copie récupérable.'],
        ['Une mise à jour de sécurité est proposée par les réglages. Que faire ?', ['Installer la mise à jour', 'Partager son code PIN', 'Désactiver les protections'], 'Les mises à jour corrigent des failles de sécurité.'],
      ]),
      getActivity('m2-s8-a4'),
      order('Numériser une fiche', 'Remets les opérations dans l’ordre pour obtenir un PDF lisible.', [
        'Place la fiche sur le scanner.',
        'Lance l’aperçu et vérifie le cadrage.',
        'Numérise et enregistre le document en PDF.',
        'Ouvre le PDF et vérifie la lisibilité.',
      ]),
    ],
  },
  {
    id: '3',
    title: 'Windows, fichiers, stockage et commandes DOS',
    mission: 'Organiser le dossier Inventaire du service et préparer une copie récupérable.',
    topics: [
      ['Bureau et paramètres de Windows 10', [
        ['Bureau', 'Le menu Démarrer, la recherche, les raccourcis et la barre des tâches donnent accès aux applications. La zone de notification indique notamment le réseau, le son et l’heure.'],
        ['Paramètres et Panneau de configuration', 'Ils donnent accès aux réglages d’affichage, de réseau, de périphériques, de comptes, de langue, d’accessibilité et de confidentialité.'],
      ]],
      ['Fichiers, dossiers et archivage', [
        ['Explorateur', 'Un fichier possède un nom et généralement une extension. Le chemin indique son emplacement. L’Explorateur permet de créer, ouvrir, copier, déplacer, renommer, supprimer et parfois restaurer un élément depuis la Corbeille. Les propriétés renseignent sur le type et l’emplacement.'],
        ['Raccourci et ZIP', 'Le raccourci pointe vers un élément. Une archive ZIP regroupe des fichiers que l’on peut extraire.'],
        ['Archivage', 'Nomme et classe les documents pour les retrouver. Préserve leur intégrité, garde leur origine et leur historique, contrôle l’accès et prévois leur conservation dans le temps.'],
      ]],
      ['Raccourcis clavier', [
        ['Édition', 'Ctrl+C copie, Ctrl+X coupe, Ctrl+V colle, Ctrl+Z annule, Ctrl+Y rétablit et Ctrl+A sélectionne tout. Ctrl+P ouvre l’impression.'],
        ['Bureau et fenêtres', 'Windows ouvre Démarrer, Windows+D affiche ou masque le bureau, Windows+L verrouille la session, F1 ouvre généralement l’aide et F5 actualise dans les applications compatibles. Ctrl+N ouvre une nouvelle fenêtre dans certaines applications. Maj+Suppr peut supprimer sans passer par la Corbeille.'],
      ]],
      ['Unités et solutions de stockage', [
        ['Bit et octet', 'Un bit vaut 0 ou 1 et un octet vaut 8 bits. 1 Mo = 1 000 ko. Les unités binaires sont distinctes, par exemple 1 Mio = 1 024 Kio.'],
        ['Supports', 'HDD et SSD servent au stockage local. Une clé USB ou une carte mémoire est amovible. Un disque optique nécessite un lecteur compatible. Le cloud facilite le partage et la synchronisation à distance. Une sauvegarde est une copie récupérable.'],
      ]],
      ['Invite de commandes Windows', [
        ['Navigation', 'DIR liste le contenu, CD change de dossier, CD .. remonte au dossier parent et CD \\ revient à la racine du lecteur. MKDIR crée un dossier et RMDIR peut supprimer un dossier vide.'],
        ['Gestion des fichiers', 'COPY copie des fichiers, XCOPY peut copier des dossiers, MOVE déplace, REN renomme, DEL supprime des fichiers, CLS efface l’affichage et EXIT ferme l’interpréteur.'],
      ]],
    ],
    activities: [
      getActivity('m2-s2-a3'),
      match('Retrouver le bon réglage Windows', 'Associe chaque besoin à la catégorie appropriée.', [
        ['Agrandir le texte', 'Affichage ou accessibilité'],
        ['Ajouter une imprimante', 'Périphériques'],
        ['Limiter l’accès à la caméra', 'Confidentialité'],
        ['Modifier la langue du poste', 'Heure et langue'],
      ]),
      getActivity('m2-s3-a2'),
      getActivity('m2-s3-a4'),
      quiz('Organiser et archiver l’inventaire', 'Choisis le bon geste pour chaque objectif.', [
        ['Quel nom permet de retrouver la première version par date ?', ['2026-11-09_inventaire_v01.pdf', 'nouveau.pdf', 'document.pdf'], 'La date, le sujet et la version aident à identifier le document.'],
        ['Quel élément permet d’accéder au dossier depuis le bureau ?', ['Un raccourci vers le dossier', 'Une capture d’écran', 'Une extension'], 'Le raccourci pointe vers le dossier.'],
        ['Comment regrouper les fichiers dans une archive ?', ['Créer un ZIP', 'Renommer chaque fichier en .zip', 'Créer un raccourci'], 'Une archive ZIP contient les fichiers regroupés.'],
      ]),
      match('Choisir le bon raccourci', 'Relie chaque action à ses touches.', [
        ['Copier', 'Ctrl+C'], ['Couper', 'Ctrl+X'], ['Coller', 'Ctrl+V'],
        ['Annuler', 'Ctrl+Z'], ['Imprimer', 'Ctrl+P'], ['Verrouiller la session', 'Windows+L'],
      ]),
      quiz('Convertir et choisir un stockage', 'Réponds aux questions de l’inventaire.', [
        ['Combien font 32 bits ?', ['4 octets', '8 octets', '32 octets'], 'Un octet contient 8 bits.'],
        ['Combien font 3 Mo ?', ['3 000 ko', '3 072 ko', '300 ko'], 'Le préfixe décimal utilise un facteur 1 000.'],
        ['Quel support permet de transporter un rapport hors ligne ?', ['Une clé USB', 'Un lien cloud seul', 'Un raccourci sur le poste'], 'Une clé USB peut conserver une copie accessible hors ligne.'],
        ['Comment partager à distance avec des collègues autorisés ?', ['Un dossier cloud avec des droits d’accès', 'Une clé USB gardée au bureau', 'Un raccourci local'], 'Les droits déterminent qui peut accéder au dossier.'],
      ]),
      fill('Compléter les commandes du dossier Inventaire', 'Choisis la commande à exécuter à chaque étape.', [
        ['Créer le dossier → [[MKDIR Inventaire|DIR Inventaire|REN Inventaire]]', 'MKDIR crée un dossier.'],
        ['Entrer dans le dossier → [[CD Inventaire|COPY Inventaire|CLS]]', 'CD change de dossier.'],
        ['Lister le contenu → [[DIR|EXIT|DEL]]', 'DIR affiche les fichiers et dossiers.'],
        ['Remonter d’un niveau → [[CD ..|CD Inventaire|CLS]]', 'CD .. sélectionne le dossier parent.'],
      ]),
      order('Mission finale · préparer une copie récupérable', 'Le poste est branché et le rapport est prêt. Organise les étapes de sauvegarde.', [
        'Créer un dossier Inventaire à l’emplacement de travail.',
        'Enregistrer le rapport dans le dossier avec un nom explicite.',
        'Copier le rapport sur le support de sauvegarde autorisé.',
        'Ouvrir la copie et vérifier qu’elle est lisible.',
      ]),
    ],
  },
];
