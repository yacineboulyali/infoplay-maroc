// Fiches de notion affichées par l’indice (💡) : une définition précise et 3 à 4 caractéristiques
// de niveau intermédiaire, pour que l’indice explique la notion visée par la question.
// L’indice ajoute ensuite la piste (hint) et une élimination argumentée (engine.js → hintFor).
// Les notions couvrent toutes les questions de D1 et D2 ; les autres parties gardent l’indice court.

export const NOTIONS_FR = {
  planification: {
    def: 'La planification est l’organisation anticipée de l’enseignement à plusieurs échelles (année, séquence, séance), du programme jusqu’aux activités des élèves.',
    traits: [
      'Annuelle : progression globale des modules sur l’année ; séquence : ensemble cohérent de séances ; séance : fiche ou scénario détaillé.',
      'La fiche précise les objectifs, la durée de chaque étape, les supports et les activités de l’enseignant et des élèves.',
      'La progression va du simple au complexe et du guidé à l’autonome.',
      'Elle est cohérente (chaque maillon sert l’objectif) et régulable (on l’ajuste si un obstacle apparaît).',
    ] },
  competence: {
    def: 'Une compétence est la capacité de mobiliser de façon intégrée des ressources (savoirs, savoir-faire, savoir-être) pour traiter une famille de situations.',
    traits: [
      'Elle se distingue d’une connaissance isolée : réciter ou définir ne suffit pas.',
      'L’approche par compétences privilégie la mobilisation des ressources en situation.',
      'On l’évalue par une tâche qui exige de mobiliser les ressources visées.',
      'Elle ouvre la chaîne de planification : compétence → objectifs → prérequis → situation → activités → évaluation → remédiation.',
    ] },
  transfert: {
    def: 'Le transfert (ou réinvestissement) est la réutilisation d’un acquis dans une situation différente de celle où il a été appris.',
    traits: [
      'La situation nouvelle n’est pas un simple exercice répété : son contexte ou ses données changent.',
      'Il montre que l’élève a compris le principe et pas seulement mémorisé un exemple.',
      'Il se distingue de l’intégration, qui réunit toutes les ressources d’un module dans une situation complexe.',
    ] },
  integration: {
    def: 'L’intégration est la phase où l’élève mobilise ensemble toutes les ressources d’un module pour traiter une situation complexe.',
    traits: [
      'Elle vient après les apprentissages ponctuels, en fin de module ou de séquence.',
      'La situation est complexe et proche des situations réelles.',
      'Elle diffère de l’application (une procédure connue) et du transfert (un acquis réutilisé ailleurs).',
    ] },
  objectif: {
    def: 'Un objectif opérationnel décrit ce que l’apprenant doit être capable de réaliser à la fin de l’apprentissage, sous une forme observable et vérifiable.',
    traits: [
      'Un comportement observable, exprimé par un verbe d’action : distinguer, convertir, compléter, construire.',
      'Des conditions de réalisation : « à partir de situations données », « avec le tableur ».',
      'Un critère de réussite : le seuil ou la qualité attendue.',
      'Les verbes connaître, savoir, comprendre ou aimer ne sont pas observables.',
    ] },
  bloom: {
    def: 'La taxonomie de Bloom révisée classe les tâches selon l’opération mentale qu’elles demandent, sur six niveaux de complexité croissante.',
    traits: [
      'Mémoriser, comprendre, appliquer, analyser, évaluer, créer.',
      'Analyser : décomposer, trouver la cause d’une erreur. Créer : concevoir une solution ou un programme nouveau.',
      'Le niveau dépend de la tâche cognitive réelle dans son contexte, pas du verbe seul.',
      'Dans la version de 2001, « créer » remplace « synthèse » et occupe le sommet.',
    ] },
  alignement: {
    def: 'L’alignement pédagogique est la cohérence entre les objectifs, les activités d’apprentissage et l’évaluation.',
    traits: [
      'Les activités font pratiquer ce que vise l’objectif.',
      'L’évaluation est valide quand elle demande la tâche décrite par l’objectif.',
      'Une activité intéressante reste inadéquate si elle ne sert pas l’objectif.',
      'Quand objectif, activité et résultat ne concordent pas, on cherche d’abord le défaut de cohérence.',
    ] },
  prerequis: {
    def: 'Un prérequis est un acquis indispensable pour aborder un nouvel apprentissage ; il doit être maîtrisé avant la séance.',
    traits: [
      'On le vérifie par une évaluation diagnostique en début de séance ou de séquence.',
      'S’il manque chez plusieurs élèves, on régule en le travaillant avant d’avancer.',
      'Exemple : adresse de cellule, formule simple et recopie avant les types de références.',
    ] },
  sp: {
    def: 'Une situation-problème est une tâche qui crée chez l’élève le besoin d’apprendre, par un obstacle à sa portée qu’il ne peut pas franchir avec ses seules connaissances actuelles.',
    traits: [
      'Trois composantes : une tâche, des ressources, des contraintes qui créent l’obstacle.',
      'Elle admet plusieurs solutions valables, à chercher, comparer et justifier.',
      'Trop facile ou impossible, elle ne joue plus son rôle.',
      'Elle part de situations proches du vécu des élèves.',
    ] },
  motivation: {
    def: 'La motivation est l’ensemble des forces qui déclenchent, orientent et maintiennent l’engagement de l’élève dans une tâche.',
    traits: [
      'Intrinsèque : agir par intérêt ou par plaisir (programmer un petit jeu). Extrinsèque : agir pour une note ou une récompense.',
      'Face à un élève passif, on cherche d’abord la cause (sens de la tâche, sentiment de compétence) avant de conclure.',
      'Une situation de motivation ouvre la séance en rendant la notion nouvelle nécessaire : une table 10 × 10 en une seule formule exige la référence mixte.',
    ] },
  tests: {
    def: 'Tester et déboguer, c’est vérifier un programme avec des jeux d’essai choisis, localiser l’erreur, formuler une hypothèse sur sa cause, corriger et tester à nouveau.',
    traits: [
      'Le débogage est un apprentissage si l’élève formule une hypothèse, teste et corrige lui-même.',
      'Si l’enseignant corrige chaque bug, l’élève devient dépendant de lui.',
      'On teste les cas typiques et les cas limites (par exemple une moyenne égale à 10).',
    ] },
  etayage: {
    def: 'L’étayage (Bruner) est une aide graduée et temporaire apportée par l’enseignant ou un pair, qui diminue à mesure que l’élève devient autonome.',
    traits: [
      'L’aide part de questions intermédiaires et d’indices, jamais de la réponse donnée.',
      'Elle s’efface progressivement : démonstration, pratique guidée, pratique assistée, autonomie.',
      'Un bon tuteur explique, questionne et donne des indices, sans faire à la place.',
    ] },
  zpd: {
    def: 'La zone proximale de développement (Vygotski) est l’écart entre ce que l’élève réussit seul et ce qu’il réussit avec l’aide d’un adulte ou d’un pair plus avancé.',
    traits: [
      'C’est la zone où l’enseignement est le plus efficace.',
      'Elle transforme l’hétérogénéité en ressource : le pair plus avancé devient médiateur.',
      'Elle justifie les groupes hétérogènes : mutualisation des compétences et tutorat entre pairs.',
    ] },
  questionnement: {
    def: 'Le questionnement est l’art de poser des questions qui font réfléchir toute la classe, puis de relancer pour approfondir les réponses.',
    traits: [
      'Après une question, on laisse un temps d’attente de 3 à 5 secondes.',
      'Le temps d’attente favorise l’activité cognitive de tous les élèves.',
      'Une question ouverte vise l’explication et la justification ; après une réponse partielle, on relance : « Peux-tu préciser ou justifier ? »',
    ] },
  contrat: {
    def: 'Le contrat didactique (Brousseau) est l’ensemble des attentes réciproques, souvent implicites, entre l’enseignant et les élèves à propos du savoir.',
    traits: [
      'Le contrat pédagogique, lui, est explicite : règles de vie, charte d’utilisation de la salle.',
      'Ses dérives ont des noms : effet Topaze, effet Jourdain, glissement métacognitif, usage abusif de l’analogie.',
      'La dévolution n’est pas un effet pervers : c’est le transfert voulu du problème à l’élève.',
    ] },
  topaze: {
    def: 'L’effet Topaze est une dérive du contrat didactique : pour que l’élève réussisse, l’enseignant multiplie les indices jusqu’à lui souffler la réponse.',
    traits: [
      'L’élève produit le bon résultat sans avoir construit le savoir.',
      'Exemple : dicter progressivement chaque instruction de l’algorithme jusqu’à la solution.',
      'À distinguer de l’effet Jourdain, où l’enseignant surestime une réponse banale.',
    ] },
  jourdain: {
    def: 'L’effet Jourdain est une dérive du contrat didactique : l’enseignant reconnaît un savoir savant dans une réponse ou un comportement banal de l’élève.',
    traits: [
      'Il évite le vrai travail d’apprentissage en le déclarant déjà fait.',
      'Le nom vient du personnage de Molière qui faisait de la prose sans le savoir.',
      'À distinguer de l’effet Topaze, où l’enseignant souffle la réponse.',
    ] },
  glissement: {
    def: 'Le glissement métacognitif est une dérive où l’outil ou la méthode devient l’objet d’étude à la place du savoir visé.',
    traits: [
      'Exemple : une séance sur les conditions devient une séance sur les menus de l’éditeur.',
      'L’attention des élèves se déplace vers des aspects secondaires.',
      'Il se distingue de l’usage abusif de l’analogie, où l’élève recopie une solution voisine sans comprendre.',
    ] },
  discipline: {
    def: 'La gestion de la discipline regroupe les moyens de créer et de maintenir un climat de travail favorable à l’apprentissage.',
    traits: [
      'Elle est d’abord préventive : des règles et une organisation claires.',
      'Face à une perturbation légère, on commence par un rappel calme de la règle et un recadrage.',
      'La sanction, si elle est nécessaire, est proportionnée et liée à la règle.',
    ] },
  panne: {
    def: 'Un incident technique est un problème matériel ou réseau ; la réponse pédagogique consiste à garder l’objectif d’apprentissage par une solution proportionnée.',
    traits: [
      'Un poste en panne : on réorganise localement le travail.',
      'Panne d’Internet ou du réseau : on bascule sur le plan B prévu, par exemple une activité papier, et on reporte les tests sur machine.',
      'On distingue le problème technique (panne de disque dur) de la difficulté d’apprentissage (ne pas savoir quand utiliser SI).',
    ] },
  numerique: {
    def: 'Les outils et ressources numériques (EDI, dossier partagé, simulations, plateformes en ligne) se choisissent d’après l’objectif d’apprentissage et le public.',
    traits: [
      'EDI pour débutants : une interface épurée et une prise en main facile (Dev-C++) ; sa limite est le manque de maintenance et de mises à jour.',
      'Dossier partagé : centraliser et mutualiser les productions. Simulation interactive : faire voir une structure algorithmique.',
      'Classe inversée : plateformes en ligne, vidéos éducatives, forums. LMS : Ganesha. MOOC : cours ouverts à un large public.',
    ] },
  debranche: {
    def: 'L’informatique débranchée enseigne une notion sans ordinateur ; les réseaux sociaux, eux, prolongent la classe en ligne. Dans les deux cas, l’enseignant organise et encadre.',
    traits: [
      'Une activité débranchée utilise cartes, objets ou élèves qui jouent les bits, sans machine.',
      'Pour qu’elle profite à tous : rôles tournants, cartes pour chaque élève, valeurs étendues (16, 32…).',
      'Réseau social : groupe privé administré par l’enseignant, charte d’usage obligatoire ; l’enseignant modère, relance et régule.',
    ] },
  methodes: {
    def: 'Approche, méthode et technique s’emboîtent : l’approche est le cadre général, la méthode organise la démarche d’enseignement, la technique est un procédé concret.',
    traits: [
      'Approches : par compétences, par projet, socioconstructiviste.',
      'Méthodes : expositive, démonstrative, interrogative, active.',
      'Techniques : brainstorming, travail en binôme, jeu de rôle, étude de cas.',
      'Une démonstration est utile si elle est suivie d’une mise en pratique par les élèves.',
    ] },
  cooperatif: {
    def: 'Le travail de groupe est une modalité où les élèves collaborent pour réaliser une tâche commune.',
    traits: [
      'Il est pertinent quand la tâche et la production attendue sont clairement définies.',
      'Interdépendance positive : chacun a besoin des autres pour réussir.',
      'Responsabilité individuelle et rôles définis, qui tournent.',
    ] },
  active: {
    def: 'Une pédagogie active place l’élève en situation de chercher, de choisir et de décider : c’est son activité cognitive qui compte, pas seulement la manipulation.',
    traits: [
      'Reproduire les clics de l’enseignant n’est pas une activité cognitive.',
      'Pendant l’exploration, l’enseignant guide, questionne et observe.',
      'L’élève compare, justifie et valide ses solutions.',
    ] },
  differenciation: {
    def: 'La différenciation pédagogique consiste à adapter les aides, les supports et les modalités de travail aux besoins des élèves, pour un même objectif.',
    traits: [
      'L’objectif reste commun ; ce sont les chemins qui varient.',
      'Exemples : fiche d’aide pas à pas, défi d’approfondissement, groupes de besoin.',
      'Elle s’appuie sur un diagnostic des besoins.',
    ] },
  consigne: {
    def: 'La consigne est l’énoncé qui indique à l’élève ce qu’il doit faire, avec quoi et ce qu’il doit produire.',
    traits: [
      'Elle précise la tâche, les données ou ressources et la production attendue.',
      'Elle utilise un verbe d’action clair et évite les formulations vagues.',
      'On vérifie qu’elle est comprise en la faisant reformuler.',
    ] },
  critere: {
    def: 'Un critère est une qualité attendue de la production ; un indicateur est un signe concret et observable qui permet de juger si le critère est respecté.',
    traits: [
      'Critère : « respect de la mise en forme », « exactitude des calculs ».',
      'Indicateur : « le titre est centré et en gras », « la moyenne de chaque ligne est juste ».',
      'Un critère se vérifie par plusieurs indicateurs.',
    ] },
  remediation: {
    def: 'La remédiation est une action pédagogique ciblée qui traite une difficulté diagnostiquée, suivie d’une nouvelle vérification de l’acquisition.',
    traits: [
      'Si la majorité échoue, on commence par analyser les erreurs.',
      'Elle cible la cause de la difficulté, pas seulement le symptôme.',
      'Après la remédiation, on vérifie à nouveau l’acquisition.',
    ] },
  triangle: {
    def: 'Le triangle pédagogique (Houssaye) représente toute situation d’enseignement par trois pôles reliés par trois processus.',
    traits: [
      'Les pôles : savoir, enseignant, élève.',
      'Enseigner (enseignant–savoir), former (enseignant–élève), apprendre (élève–savoir).',
      'Privilégier deux pôles laisse le troisième de côté : le choix doit être conscient.',
    ] },
  transposition: {
    def: 'La transposition didactique (Chevallard) désigne les transformations que subit un savoir entre la recherche et la classe.',
    traits: [
      'Savoir savant → savoir à enseigner → savoir enseigné → savoir appris.',
      'Transposition externe : programmes et manuels, réalisée par la noosphère.',
      'Transposition interne : réalisée par le professeur quand il prépare et conduit la séance.',
    ] },
  psr: {
    def: 'Les pratiques sociales de référence (Martinand) sont les activités réelles de la société qui servent de modèle au savoir enseigné.',
    traits: [
      'En informatique, le savoir enseigné vient aussi des usages : bureautique, Internet, programmation.',
      'Elles complètent la transposition à partir du savoir savant.',
      'Elles donnent du sens aux apprentissages en les reliant aux usages réels.',
    ] },
  devolution: {
    def: 'La dévolution (Brousseau) est le processus par lequel l’enseignant transfère à l’élève la responsabilité de résoudre le problème.',
    traits: [
      'L’élève accepte le problème comme le sien.',
      'Dans la phase adidactique (action, formulation, validation), l’enseignant ne donne pas la réponse.',
      'L’élève apprend surtout par l’interaction avec le milieu, par exemple un programme qui fonctionne ou non.',
    ] },
  institutionnalisation: {
    def: 'L’institutionnalisation (Brousseau) est la phase où l’enseignant formalise, nomme et généralise le savoir construit pour lui donner un statut officiel.',
    traits: [
      'Elle vient après la phase adidactique.',
      'Elle stabilise les acquis : le savoir devient une référence commune et réutilisable.',
      'Elle se traduit souvent par une synthèse écrite ou une trace.',
    ] },
  variable: {
    def: 'Une variable didactique est un élément de la situation que l’enseignant modifie pour simplifier ou complexifier la tâche, ou amener l’élève vers une autre procédure.',
    traits: [
      'Elle change les stratégies de l’élève, donc ce qu’il apprend (nombre de cas, cellule fixe, taille des nombres).',
      'Une variable de contexte est un paramètre que l’enseignant ne contrôle pas mais dont il tient compte (effectif, postes, logiciel, horaire).',
      'Changer l’habillage sans changer la structure (eau ou jus, TVA ou remise) ne change pas la stratégie.',
    ] },
  officiel: {
    def: 'Les orientations officielles fixent les finalités, les modules, les volumes horaires et les recommandations didactiques de l’informatique au tronc commun.',
    traits: [
      'Trois dimensions : scientifique, technique, sociétale ; finalité : une culture informatique de base.',
      'Module 3 « Algorithmique et programmation » : 16 h, structures séquentielle et sélective, sans les répétitives.',
      'Langage structuré proche de la pensée algorithmique, situations du vécu, programmes préparés hors classe.',
      'La souplesse horaire joue à l’intérieur d’un module, pas entre les modules.',
    ] },
};

// Rattachements explicites (partie-série-numéro → notion) quand la détection par mots-clés
// de concepts-fr.js tombe sur une notion voisine. Établis par l’audit de couverture de D1.
export const CONCEPT_OF = {
  'D1-0-9': 'active', 'D1-0-25': 'alignement', 'D1-0-26': 'alignement', 'D1-0-28': 'differenciation',
  'D1-0-40': 'planification', 'D1-1-17': 'psr','D1-1-22': 'officiel', 'D1-1-23': 'officiel', 'D1-1-27': 'officiel',
  'D1-1-28': 'officiel', 'D1-2-4': 'officiel', 'D1-2-7': 'objectif', 'D1-2-8': 'planification',
  'D1-2-11': 'variable', 'D1-2-14': 'variable', 'D1-2-15': 'sp', 'D1-2-18': 'objectif',
  // D2 · Gestion des apprentissages
  'D2-0-7': 'remediation', 'D2-0-8': 'active', 'D2-0-9': 'cooperatif', 'D2-0-14': 'differenciation',
  'D2-0-22': 'questionnement', 'D2-0-25': 'remediation', 'D2-0-29': 'panne', 'D2-0-31': 'methodes',
  'D2-0-32': 'methodes', 'D2-0-33': 'cooperatif', 'D2-0-34': 'cooperatif', 'D2-0-35': 'cooperatif',
  'D2-0-38': 'active', 'D2-1-12': 'motivation', 'D2-1-21': 'zpd', 'D2-2-1': 'methodes', 'D2-2-4': 'zpd',
  'D2-2-8': 'contrat', 'D2-2-17': 'cooperatif',
  'D2-1-19': 'numerique', 'D2-1-20': 'numerique', 'D2-1-22': 'numerique', 'D2-1-28': 'numerique',
  'D2-2-2': 'numerique', 'D2-2-3': 'numerique', 'D2-2-5': 'numerique', 'D2-2-12': 'numerique',
  'D2-2-13': 'numerique', 'D2-2-14': 'numerique', 'D2-2-15': 'numerique', 'D2-2-16': 'numerique',
  'D2-2-18': 'debranche', 'D2-2-19': 'debranche', 'D2-2-20': 'debranche', 'D2-2-21': 'debranche',
  'D2-2-22': 'debranche', 'D2-2-23': 'debranche', 'D2-2-24': 'debranche',
};
