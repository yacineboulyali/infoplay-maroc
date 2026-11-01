import { match, sort, order, fill, quiz, hot, net, sim } from './dsl.js';

export default {
  id: 4, title: 'Réseaux et Internet', short: 'Réseaux et Internet', icon: '🌐', color: 'm4',
  sessions: [
    { title: 'Notion de réseau informatique', topics: ['réseau', 'poste', 'commutateur', 'liaison'], acts: [
      match('Associe les éléments du réseau', 'Relier chaque élément du réseau à sa définition.', [
        ['Réseau informatique', 'Ensemble d’ordinateurs et d’équipements reliés pour échanger des données'], ['Ordinateur (poste)', 'Machine qui envoie ou reçoit des informations sur le réseau'], ['Commutateur (switch)', 'Équipement qui relie plusieurs ordinateurs d’un même réseau'], ['Liaison (câble ou Wi‑Fi)', 'Moyen de transmission entre deux équipements'], ['Imprimante réseau', 'Périphérique partagé, accessible par plusieurs ordinateurs'],
      ]),
      hot('Identifie les équipements', 'Reconnaître les équipements d’un schéma de réseau local.', 'lan', [
        ['switch', 'Clique sur le commutateur (switch).', 'Tous les câbles arrivent sur lui.'], ['printer', 'Clique sur l’imprimante partagée.', 'Elle est reliée au switch comme les postes.'], ['server', 'Clique sur le serveur.', 'Il stocke des ressources partagées.'],
        ['pc', 'Clique sur l’un des postes de travail.', 'Un poste est un ordinateur d’utilisateur.'], ['link', 'Clique sur l’un des câbles.', 'Un câble relie un équipement au switch.'],
      ]),
      net('Construis le réseau de la salle', 'Relier des postes à un commutateur.', [
        { id: 'sw', label: 'Switch', icon: '⇄', x: 50, y: 50 }, { id: 'p1', label: 'PC 1', icon: '🖥', x: 12, y: 14 }, { id: 'p2', label: 'PC 2', icon: '🖥', x: 12, y: 82 }, { id: 'p3', label: 'PC 3', icon: '🖥', x: 88, y: 14 }, { id: 'p4', label: 'PC 4', icon: '🖥', x: 88, y: 82 }, { id: 'p5', label: 'PC 5', icon: '🖥', x: 50, y: 12 },
      ], [['p1', 'sw', 'chaque poste se branche sur le switch'], ['p2', 'sw', 'chaque poste se branche sur le switch'], ['p3', 'sw', 'chaque poste se branche sur le switch'], ['p4', 'sw', 'chaque poste se branche sur le switch'], ['p5', 'sw', 'chaque poste se branche sur le switch']]),
      sim('Mission : le réseau de la classe', 'Valider logiquement la connectivité d’un réseau local.', 'toggles', {
        init: { sw: false, c1: false, c2: false, c3: false, imp: false },
        items: [['sw', 'Switch alimenté', '⇄'], ['c1', 'Câble du PC 1 branché', '🔌'], ['c2', 'Câble du PC 2 branché', '🔌'], ['c3', 'Câble du PC 3 branché', '🔌'], ['imp', 'Imprimante partagée allumée', '🖨']],
        status: (s) => [['Le switch est alimenté', s.sw], ['PC 1 communique avec le réseau', s.sw && s.c1], ['PC 2 communique avec le réseau', s.sw && s.c2], ['PC 3 communique avec le réseau', s.sw && s.c3], ['L’imprimante est utilisable depuis le réseau', s.sw && s.imp]],
      }, [
        ['Le switch est éteint : aucun PC ne communique. Alimente‑le.', { sw: true }, 'Sans courant, le switch ne transmet rien.'], ['Branche le câble du PC 1 pour qu’il rejoigne le réseau.', { c1: true }, 'Un poste a besoin d’un câble et d’un switch allumé.'],
        ['Branche aussi les PC 2 et 3 (sans débrancher le PC 1).', { c1: true, c2: true, c3: true }, 'Chaque poste a son propre câble.'], ['L’imprimante partagée est éteinte : allume‑la.', { imp: true }, 'Un équipement éteint n’est pas joignable.'],
        ['Le technicien déplace le PC 3 : débranche seulement son câble.', { c3: false, c1: true, c2: true, sw: true, imp: true }, 'Les autres postes continuent de fonctionner.'],
      ]),
    ] },
    { title: 'Typologie et avantages des réseaux', topics: ['LAN', 'MAN', 'WAN', 'partage de ressources'], acts: [
      sort('LAN, MAN ou WAN ?', 'Classer des réseaux selon leur étendue géographique.', ['LAN', 'MAN', 'WAN'], [
        ['Les ordinateurs d’une salle d’informatique', 0, 'Un seul local : réseau local.'], ['Le réseau d’un collège', 0, 'Un seul site : réseau local.'], ['Deux ordinateurs reliés dans une maison', 0, 'Très petite zone.'],
        ['Le réseau reliant plusieurs écoles d’une même ville', 1, 'À l’échelle d’une ville.'], ['Le réseau reliant les mairies d’arrondissement d’une ville', 1, 'À l’échelle d’une ville.'], ['Le réseau d’une chaîne de bibliothèques d’une même agglomération', 1, 'À l’échelle d’une agglomération.'],
        ['Internet', 2, 'Réseau mondial.'], ['Le réseau d’une banque entre plusieurs pays', 2, 'Plusieurs pays.'], ['Les câbles sous‑marins reliant les continents', 2, 'Échelle intercontinentale.'], ['Le réseau d’une compagnie aérienne présente dans plusieurs pays', 2, 'Plusieurs pays.'],
      ]),
      match('Type de réseau et étendue', 'Associer chaque type de réseau à son étendue.', [
        ['LAN', 'Réseau local : une salle, un bâtiment'], ['MAN', 'Réseau métropolitain : une ville'], ['WAN', 'Réseau étendu : pays et continents'], ['PAN', 'Réseau personnel : quelques mètres autour d’une personne (Bluetooth)'], ['Internet', 'Réseau mondial de réseaux'],
      ]),
      fill('Les avantages du réseau', 'Compléter les avantages du partage de ressources.', [
        ['Un réseau permet de [[partager|effacer|éteindre]] des ressources comme une imprimante.', 'Une seule imprimante peut servir à toute la classe.'],
        ['Les utilisateurs peuvent [[échanger des fichiers|réparer la souris|changer le clavier]] rapidement.', 'Le réseau transporte les fichiers.'],
        ['Partager une seule connexion Internet permet d’[[économiser de l’argent|augmenter la poussière|supprimer les fichiers]].', 'Un seul abonnement peut servir à plusieurs postes.'],
        ['Un réseau facilite la [[communication|destruction|déconnexion]] entre utilisateurs (messagerie, visioconférence).', 'Communiquer est un avantage majeur.'],
        ['Les données importantes peuvent être [[sauvegardées sur un serveur central|supprimées automatiquement|cachées dans la souris]].', 'Un serveur centralise et protège les données.'],
      ]),
      quiz('Mission : choisis la solution', 'Choisir la solution réseau adaptée à un scénario scolaire.', [
        ['Une salle de 20 PC doit partager une imprimante. Quelle solution ?', ['Un réseau local (LAN) avec un switch', 'Un réseau mondial entre pays', 'Une clé USB par poste', 'Aucun réseau'], 'Un LAN suffit pour partager dans une salle.'],
        ['Un collège veut relier ses trois bâtiments voisins. Quelle solution ?', ['Un LAN étendu à tout le collège, avec des switches reliés', 'Un réseau Bluetooth', 'Un seul câble de PC en PC', 'Un réseau mondial'], 'Le site reste unique : on étend le réseau local.'],
        ['Une académie veut relier les établissements d’une même ville. Quelle solution ?', ['Un réseau métropolitain (MAN)', 'Un réseau personnel Bluetooth', 'Le réseau d’une seule salle', 'Aucun réseau'], 'Une ville correspond à l’échelle d’un MAN.'],
        ['Une entreprise a des bureaux à Casablanca et à Paris. Quelle solution ?', ['Un réseau étendu (WAN), par exemple via Internet de façon sécurisée', 'Un LAN d’une seule salle', 'Un réseau Bluetooth', 'Des clés USB seulement'], 'Deux pays : réseau étendu.'],
        ['Un élève veut envoyer une photo de son téléphone vers l’ordinateur sans fil, à 1 mètre. Quelle solution ?', ['Un réseau personnel (Bluetooth)', 'Un réseau mondial', 'Un réseau métropolitain', 'Un câble sous‑marin'], 'Très courte distance : réseau personnel.'],
      ]),
    ] },
    { title: 'Définition d’Internet', topics: ['Internet', 'Web', 'navigateur', 'site web', 'client / serveur'], acts: [
      match('Internet, Web, navigateur, site', 'Distinguer les notions liées à Internet.', [
        ['Internet', 'Réseau mondial qui relie des millions de réseaux'], ['Web', 'Service d’Internet qui permet de consulter des pages liées entre elles'], ['Navigateur', 'Logiciel qui affiche les pages web'], ['Site web', 'Ensemble de pages web d’un même éditeur'], ['Serveur web', 'Ordinateur qui stocke les pages et les envoie à la demande'],
      ]),
      sort('Service ou infrastructure ?', 'Distinguer les services d’Internet de son infrastructure matérielle.', ['Service d’Internet', 'Infrastructure / matériel'], [
        ['Le Web', 0, 'Service qui affiche des pages.'], ['La messagerie électronique', 0, 'Service d’échange de messages.'], ['La visioconférence', 0, 'Service de communication.'], ['Le téléchargement de fichiers', 0, 'Service de transfert.'], ['La messagerie instantanée (chat)', 0, 'Service de discussion.'],
        ['Le câble de fibre optique', 1, 'Support physique.'], ['Le routeur', 1, 'Équipement du réseau.'], ['Un serveur (la machine)', 1, 'Matériel qui héberge les services.'], ['Un satellite de télécommunication', 1, 'Support physique.'], ['Le modem', 1, 'Équipement d’accès.'],
      ]),
      fill('Client, réseau, serveur', 'Compléter le schéma d’une demande de page web.', [
        ['Quand tu tapes une adresse, ton ordinateur joue le rôle de [[client|serveur|routeur]].', 'Le client fait la demande.'], ['Ta demande traverse le [[réseau|clavier|scanner]] jusqu’au serveur.', 'Le réseau transporte la requête.'],
        ['Le [[serveur|navigateur|moniteur]] cherche la page demandée.', 'Le serveur stocke les pages.'], ['Le serveur envoie la [[réponse (la page)|demande|facture]] vers ton ordinateur.', 'La réponse contient la page.'], ['Enfin, le [[navigateur|serveur|câble]] affiche la page à l’écran.', 'Le navigateur affiche.'],
      ]),
      sim('Mission : requête et réponse', 'Simuler la demande et la réponse d’une page web.', 'browser', {
        start: null, pages: {
          home: { url: 'www.college.exemple', title: 'Collège Al Atlas – Accueil', body: ['Bienvenue sur le site du collège.'], links: [['Cours d’informatique', 'cours']] },
          cours: { url: 'www.college.exemple/cours', title: 'Cours d’informatique', body: ['Chapitre 1 : les réseaux. Chapitre 2 : Internet.'], links: [['Retour à l’accueil', 'home']] },
        },
      }, [
        ['Dans la barre d’adresse, tape www.college.exemple', { urlInput: '=www.college.exemple' }, 'Le client prépare sa demande.'], ['Envoie la requête : clique sur « Aller ».', { page: 'home' }, 'Le serveur répond 200 OK et envoie la page.'], ['Clique sur le lien « Cours d’informatique ».', { page: 'cours' }, 'Un lien envoie une nouvelle requête.'],
        ['Reviens à l’accueil avec le bouton Retour.', { page: 'home' }, 'Le navigateur garde l’historique.'], ['Tape l’adresse www.inconnu.exemple puis clique sur « Aller ».', { page: '404' }, 'Une adresse inexistante renvoie l’erreur 404.'],
      ]),
    ] },
    { title: 'Connexion à Internet', topics: ['routeur', 'modem', 'Wi‑Fi', 'Ethernet', 'fournisseur d’accès'], acts: [
      hot('Le routeur vu de l’arrière', 'Identifier les éléments du routeur.', 'router', [
        ['wifi', 'Clique sur une antenne Wi‑Fi.', 'Elle émet et reçoit les ondes radio.'], ['lan', 'Clique sur l’un des ports Ethernet du réseau local (LAN).', 'Ils servent à brancher des ordinateurs.'], ['power', 'Clique sur le bouton et la prise d’alimentation.', 'Il met l’appareil sous tension.'],
        ['wan', 'Clique sur le port qui reçoit la ligne vers Internet (WAN).', 'Il est isolé des ports du réseau local.'], ['leds', 'Clique sur les voyants lumineux.', 'Ils indiquent l’état de la connexion.'],
      ]),
      match('Matériel de connexion', 'Associer chaque équipement ou service à son rôle.', [
        ['Modem', 'Convertit le signal de l’opérateur pour accéder à Internet'], ['Routeur', 'Dirige les données entre le réseau local et Internet'], ['Wi‑Fi', 'Connexion sans fil par ondes radio'], ['Câble Ethernet', 'Connexion filaire entre un PC et le routeur'], ['Fournisseur d’accès (FAI)', 'Société qui fournit la connexion à Internet'],
      ]),
      order('Les étapes de la connexion', 'Ordonner les étapes de connexion d’un ordinateur à Internet.', ['Brancher le modem/routeur à la prise électrique.', 'Brancher la ligne de l’opérateur au modem.', 'Attendre que les voyants indiquent la connexion.', 'Connecter l’ordinateur (câble Ethernet, ou Wi‑Fi avec le mot de passe).', 'Ouvrir le navigateur et tester une page web.'], { explain: 'On alimente, on relie à l’opérateur, on attend, on connecte le poste, puis on teste.' }),
      sim('Mission diagnostic', 'Diagnostiquer une panne de connexion simulée.', 'toggles', {
        init: { power: false, line: false, cable: false, wifi: false, pass: false },
        items: [['power', 'Routeur alimenté', '🔌'], ['line', 'Ligne de l’opérateur active', '📞'], ['cable', 'Câble Ethernet branché au PC', '🔗'], ['wifi', 'Wi‑Fi activé sur le PC', '📶'], ['pass', 'Bon mot de passe Wi‑Fi saisi', '🔑']],
        derive: (s) => { s.internet = !!(s.power && s.line && (s.cable || (s.wifi && s.pass))); },
        status: (s) => [['Le routeur est sous tension', s.power], ['La ligne de l’opérateur fonctionne', s.line], ['Le PC est relié au routeur (câble, ou Wi‑Fi avec bon mot de passe)', s.cable || (s.wifi && s.pass)], ['Accès à Internet disponible', s.internet]],
      }, [
        ['Tous les voyants sont éteints : alimente le routeur.', { power: true }, 'Sans courant, rien ne fonctionne.'], ['Le voyant Internet est rouge : la ligne de l’opérateur est coupée. Rétablis la ligne (simulation).', { line: true }, 'Sans ligne, le routeur ne peut pas atteindre Internet.'],
        ['Le PC essaie de se connecter en Wi‑Fi : active le Wi‑Fi du PC.', { wifi: true }, 'Le Wi‑Fi doit être activé sur l’ordinateur.'], ['Le Wi‑Fi refuse la connexion : saisis le bon mot de passe.', { pass: true }, 'Un mot de passe incorrect bloque l’accès.'], ['Vérifie : l’accès à Internet doit fonctionner.', { internet: true }, 'Tous les maillons de la chaîne sont en place.'],
      ]),
    ] },
    { title: 'Service Web', topics: ['navigateur', 'adresse URL', 'lien hypertexte', 'moteur de recherche'], acts: [
      hot('Le navigateur', 'Identifier les contrôles d’un navigateur et la barre d’adresse.', 'browser', [
        ['urlbar', 'Clique sur la barre d’adresse.', 'On y tape l’adresse du site.'], ['tab', 'Clique sur l’onglet.', 'Chaque onglet ouvre une page.'], ['reload', 'Clique sur le bouton qui actualise la page.', 'La flèche en cercle recharge la page.'], ['back', 'Clique sur le bouton Retour.', 'La flèche vers la gauche revient en arrière.'], ['pagezone', 'Clique sur la zone qui affiche le contenu de la page.', 'C’est la grande zone sous la barre d’adresse.'],
      ]),
      match('Vocabulaire du Web', 'Associer chaque terme à sa définition.', [['URL', 'Adresse d’une page web'], ['Onglet', 'Permet d’ouvrir plusieurs pages dans une même fenêtre'], ['Lien hypertexte', 'Élément cliquable qui mène à une autre page'], ['Moteur de recherche', 'Service qui trouve des pages à partir de mots‑clés'], ['Favoris (marque‑pages)', 'Liste d’adresses enregistrées pour y revenir vite']]),
      fill('Décode une adresse', 'Identifier les éléments d’une URL.', [
        ['Dans https://www.ecole.ma/cours/info.html, « https » est le [[protocole|nom de domaine|nom du fichier]].', 'Il indique comment dialoguer avec le serveur.'],
        ['« www.ecole.ma » est le [[nom de domaine (le serveur)|protocole|chemin du dossier]].', 'Il désigne le serveur.'], ['« /cours/ » indique le [[dossier (chemin)|protocole|domaine]].', 'C’est le chemin dans le site.'],
        ['« info.html » est le nom de la [[page (le fichier)|domaine|protocole]].', 'C’est la page demandée.'], ['Le « https » indique que la connexion est [[sécurisée (chiffrée)|plus lente|déconnectée]].', 'Le s signifie sécurisé.'],
      ]),
      sim('Mission recherche', 'Trouver des informations dans un navigateur et un moteur de recherche entièrement simulés (hors ligne).', 'browser', {
        start: 'search', pages: {
          search: { url: 'recherche.exemple', title: 'Moteur de recherche', body: ['Tape des mots‑clés puis clique sur Rechercher.'], search: true },
          rabat: { url: 'www.maroc-info.exemple/rabat', title: 'Rabat, capitale du Maroc', kw: 'capitale maroc rabat administrative royaume', body: ['Rabat est la capitale administrative du Royaume du Maroc.'] },
          casa: { url: 'www.maroc-info.exemple/casablanca', title: 'Casablanca, ville économique et grand port', kw: 'casablanca port économique ville maroc', body: ['Casablanca est la plus grande ville et un port majeur.'] },
          atlas: { url: 'www.maroc-info.exemple/atlas', title: 'Les montagnes de l’Atlas', kw: 'montagnes atlas neige maroc', body: ['Les montagnes de l’Atlas traversent le pays.'] },
          ifrane: { url: 'www.maroc-info.exemple/ifrane', title: 'Ifrane, ville de neige', kw: 'ifrane neige ville montagne hiver', body: ['Ifrane est connue pour ses hivers froids.'] },
          info: { url: 'www.ecole.exemple/info', title: 'Cours d’informatique du collège', kw: 'cours informatique ordinateur collège', body: ['Le programme d’informatique du collège.'] },
        },
      }, [
        ['Cherche « capitale Maroc » et ouvre le résultat qui donne le nom de la capitale.', { page: 'rabat' }, 'Le bon résultat contient les deux mots‑clés.'], ['Reviens à la liste des résultats avec le bouton Retour.', { page: 'results' }, 'Retour ramène à la page précédente.'],
        ['Cherche « montagnes Atlas » et ouvre le bon résultat.', { page: 'atlas' }, 'Les mots‑clés guident vers la bonne page.'], ['Cherche « port économique Casablanca » et ouvre le bon résultat.', { page: 'casa' }, 'Plus les mots‑clés sont précis, meilleur est le résultat.'], ['Cherche « cours informatique » et ouvre le résultat du collège.', { page: 'info' }, 'Choisis le résultat qui correspond à la demande.'],
      ]),
    ] },
    { title: 'E‑mail et chat pédagogique', topics: ['destinataire', 'objet', 'message', 'pièce jointe', 'chat'], acts: [
      hot('Les parties d’un e‑mail', 'Identifier destinataire, objet, message, pièce jointe et bouton d’envoi.', 'mail', [
        ['to', 'Clique sur la zone du destinataire.', 'Elle contient l’adresse de la personne.'], ['subject', 'Clique sur l’objet du message.', 'Il résume le sujet en quelques mots.'], ['body', 'Clique sur le corps du message.', 'C’est le texte principal.'], ['attach', 'Clique sur la pièce jointe.', 'Le trombone signale un fichier joint.'], ['send', 'Clique sur le bouton d’envoi.', 'Il envoie le message.'],
      ]),
      sort('E‑mail ou chat ?', 'Choisir le bon moyen de communication selon la situation.', ['E‑mail', 'Chat pédagogique'], [
        ['Envoyer un document officiel à un professeur', 0, 'Écrit formel avec pièce jointe.'], ['Écrire une lettre avec objet et formule de politesse', 0, 'L’e‑mail suit un cadre formel.'], ['Joindre un devoir en pièce jointe', 0, 'Les pièces jointes sont naturelles par e‑mail.'], ['Répondre plus tard, quand on a le temps', 0, 'L’e‑mail n’est pas instantané.'], ['Garder une trace écrite formelle', 0, 'Un e‑mail se conserve.'],
        ['Discuter en direct avec un camarade pendant un exercice', 1, 'Échange en temps réel.'], ['Poser une question rapide en temps réel', 1, 'Message court et immédiat.'], ['Envoyer un petit message « ok »', 1, 'Message très court.'], ['Discuter à plusieurs en direct dans un groupe de classe', 1, 'Conversation de groupe.'], ['Échanger rapidement des messages courts', 1, 'Le chat est rapide et informel.'],
      ]),
      order('Envoyer un e‑mail', 'Ordonner les étapes d’envoi d’un e‑mail.', ['Ouvrir la messagerie.', 'Cliquer sur « Nouveau message ».', 'Saisir l’adresse du destinataire et l’objet.', 'Rédiger le message (et joindre un fichier).', 'Cliquer sur « Envoyer ».'], { explain: 'On ouvre, on crée, on adresse, on rédige, puis on envoie.' }),
      sim('Mission : écrire et envoyer (simulation)', 'Rédiger et envoyer un message simulé, sans aucune transmission réelle.', 'mail', {}, [
        ['Dans « À », écris prof.info@ecole.exemple', { to: '=prof.info@ecole.exemple' }, 'L’adresse identifie le destinataire (adresse fictive).'], ['Écris un objet qui contient le mot « devoir ».', { subject: '~devoir' }, 'L’objet résume le sujet.'], ['Rédige un message qui commence par « Bonjour ».', { body: '~bonjour' }, 'Une formule de politesse est de mise.'],
        ['Joins le fichier devoir.docx.', { att: true }, 'La pièce jointe accompagne le message.'], ['Clique sur Envoyer (simulation : rien n’est transmis).', { sent: true }, 'Le message simulé reste sur cet ordinateur.'],
      ]),
    ] },
    { title: 'Avantages et inconvénients d’Internet', topics: ['avantages', 'risques', 'protection', 'comportement responsable'], acts: [
      sort('Avantage, risque ou protection ?', 'Classer des situations liées à Internet.', ['Avantage', 'Risque', 'Protection'], [
        ['Trouver rapidement des informations', 0, 'Internet donne accès au savoir.'], ['Communiquer avec des personnes éloignées', 0, 'Il rapproche.'], ['Étudier avec des ressources en ligne', 0, 'Il aide à apprendre.'],
        ['Les messages d’hameçonnage (phishing)', 1, 'Ils cherchent à voler des informations.'], ['Un virus téléchargé par erreur', 1, 'Il peut abîmer l’ordinateur.'], ['Le harcèlement en ligne', 1, 'Il fait souffrir.'],
        ['Utiliser un mot de passe fort', 2, 'Il protège un compte.'], ['Mettre à jour l’antivirus', 2, 'Il bloque des menaces.'], ['Ne pas partager ses données personnelles', 2, 'Il protège la vie privée.'], ['Vérifier les sources avant de croire une information', 2, 'Il évite les fausses informations.'],
      ]),
      hot('Détecte le message suspect', 'Repérer les signes d’un message d’hameçonnage.', 'phish', [
        ['sender', 'Clique sur l’adresse d’expéditeur douteuse.', 'Une adresse inhabituelle imite une banque.'], ['urgent', 'Clique sur la phrase qui met la pression avec une menace.', 'L’urgence et la menace sont des signes d’arnaque.'], ['link', 'Clique sur le lien suspect.', 'Il peut mener à un faux site.'],
        ['ask', 'Clique sur la demande d’informations confidentielles.', 'Une vraie banque ne demande jamais un mot de passe par message.'], ['greet', 'Clique sur la salutation impersonnelle.', '« Cher client » montre que le message n’est pas personnalisé.'],
      ]),
      quiz('Choisis la bonne réaction', 'Choisir la réponse sûre dans des scénarios en ligne.', [
        ['Un message dit : « Tu as gagné un téléphone, donne ton mot de passe ! » Que fais‑tu ?', ['Je ne réponds pas, je ne donne rien et je signale ou supprime le message', 'Je donne mon mot de passe pour recevoir le prix', 'Je transfère le message à tous mes contacts', 'Je clique sur le lien pour voir'], 'Un mot de passe ne se partage jamais.'],
        ['Un inconnu te demande ton adresse et ta photo. Que fais‑tu ?', ['Je refuse et j’en parle à un adulte de confiance', 'Je lui envoie ma photo', 'Je lui donne mon adresse', 'Je lui demande plus de détails'], 'Il ne faut pas donner de données personnelles à un inconnu.'],
        ['Un camarade est moqué dans le groupe de classe. Que fais‑tu ?', ['Je ne participe pas, je soutiens mon camarade et je préviens un adulte', 'Je rigole avec les autres', 'Je partage le message', 'Je quitte le groupe sans rien dire'], 'Le respect et l’aide sont essentiels.'],
        ['Un site demande de télécharger un programme gratuit inconnu pour voir une vidéo. Que fais‑tu ?', ['Je ne télécharge pas et je demande à l’enseignant', 'Je télécharge tout de suite', 'J’envoie le lien à mes amis', 'Je désactive l’antivirus'], 'Un programme inconnu peut contenir un virus.'],
        ['Tu trouves une information choquante sans source. Que fais‑tu ?', ['Je vérifie avec des sources fiables avant de la partager', 'Je la partage immédiatement', 'Je la crois car elle est choquante', 'Je l’envoie à toute la classe'], 'Vérifier évite de propager de fausses informations.'],
      ]),
      order('Mission cybercitoyen', 'Résoudre un scénario de cyberharcèlement en respectant des comportements responsables.', ['Ne pas répondre sur le coup à la personne qui t’agresse.', 'Garder une preuve (capture d’écran).', 'Bloquer ou signaler le contact sur la plateforme.', 'En parler à un adulte de confiance (parent, enseignant).', 'Continuer à utiliser Internet avec prudence et respect.'], { explain: 'Rester calme, conserver des preuves, se protéger, demander de l’aide, puis poursuivre en sécurité.' }),
    ] },
  ],
};
