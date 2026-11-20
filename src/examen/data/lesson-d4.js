// Leçon ciblée de la partie D4 · Remédiation des apprentissages.
// Construite à partir d’un audit de couverture : chacune des 86 questions de D4 (QCM et annales
// 2021-2025) trouve sa réponse dans au moins une carte, le plus souvent dans « À retenir » (keys).
// Mêmes champs que lesson-d1.js : t, p, keys, v, fact, check, ids (notions couvertes par la carte).

export const LESSON_D4 = [
  { t: 'La boucle de remédiation', ids: ['remediation'],
    p: 'On remédie à une difficulté identifiée, pas à une note faible. Et la boucle se referme toujours par une réévaluation.',
    keys: [
      'Remédier, c’est traiter une difficulté identifiée par une intervention ciblée, fondée sur un diagnostic. Règle d’or : on remédie à une difficulté identifiée, pas à une note faible.',
      'Chaîne : évaluer → identifier → diagnostiquer → remédier → réévaluer.',
      'Une note faible seule ne permet pas de choisir une remédiation précise : il faut analyser l’erreur.',
      'Le soutien est une aide plutôt générale ; la remédiation est ciblée sur une difficulté diagnostiquée.',
      'Réévaluer sur une situation nouvelle vérifie l’effet de l’intervention. Sans réévaluation, son efficacité n’est pas vérifiée.',
      'Erreur pédagogique à éviter face aux obstacles : ignorer les difficultés récurrentes.',
    ],
    v: { type: 'cycle', steps: [['Évaluer', 'Recueillir des traces.'], ['Identifier', 'Repérer l’erreur précise.'], ['Diagnostiquer', 'Trouver sa cause.'], ['Remédier', 'Agir avec une autre entrée que le cours initial.'], ['Réévaluer', 'Vérifier sur une situation nouvelle.']] },
    fact: { t: 'Soutien = aide générale. Remédiation = intervention ciblée sur une difficulté diagnostiquée.', src: 'Allal (1979) ; Perrenoud (1998)' },
    check: { q: 'Après la remédiation, l’étape indispensable est :', o: ['Passer au chapitre suivant', 'Vérifier l’acquisition sur une situation nouvelle', 'Mettre une note'], a: 1, why: 'Sans réévaluation, l’efficacité de la remédiation n’est pas vérifiée.' } },

  { t: 'L’erreur, un outil pour enseigner', ids: ['erreur'],
    p: 'L’erreur n’est pas une faute à sanctionner : elle montre comment l’élève raisonne. C’est elle qui oriente la remédiation.',
    keys: [
      'L’erreur est le symptôme ; l’obstacle est la cause profonde possible.',
      'Pour Astolfi, l’erreur est un outil pour enseigner : un symptôme du raisonnement, ni une faute, ni un manque de travail, ni un hasard.',
      'Erreur productive : une erreur exploitée comme support d’apprentissage. Les erreurs des élèves sont des occasions d’apprentissage.',
      'Le point de départ de la remédiation est l’erreur qui témoigne d’un mécanisme de réflexion.',
      'Erreur de procédure : l’élève applique mal les étapes d’une méthode.',
    ],
    v: { type: 'flow', steps: [['Erreur', 'Ce qu’on observe dans la production.'], ['Raisonnement', 'La logique que l’élève a suivie.'], ['Obstacle', 'La cause profonde qui résiste.'], ['Remédiation', 'Une activité qui fait évoluer ce raisonnement.']] },
    fact: { t: 'L’erreur est un outil pour enseigner : elle témoigne d’un raisonnement.', src: 'Astolfi (1997), L’erreur, un outil pour enseigner' },
    check: { q: 'Pour Astolfi, l’erreur est d’abord :', o: ['Un outil pour enseigner', 'Une faute à sanctionner', 'Un manque de travail'], a: 0, why: 'L’erreur renseigne sur le raisonnement de l’élève : on s’en sert pour enseigner.' } },

  { t: 'Quatre familles d’obstacles', ids: ['obstacles'],
    p: 'L’erreur est le symptôme ; l’obstacle est la cause qui résiste. Identifie la famille pour choisir la bonne remédiation.',
    keys: [
      'Épistémologique : il tient au savoir lui-même. x ← x + 1 est lu comme une équation fausse ; la variable « case mémoire » contredit l’inconnue des mathématiques.',
      'Didactique : il vient d’un choix d’enseignement. L’analogie choisie par l’enseignant ; le temps passé sur les menus de l’EDI (Dev-C++) au lieu de l’algorithmique.',
      'Ontogénétique : il tient au stade de développement et à la capacité d’abstraction.',
      'Psychologique : il est affectif. Peur de l’erreur, manque de confiance, « je suis nul en maths, donc je ne saurai jamais programmer ».',
      'Glissement métacognitif : l’attention se déplace de l’objectif vers des aspects secondaires.',
    ],
    v: { type: 'grid', items: [['🧩', 'Épistémologique', 'Tient au savoir : x ← x + 1 heurte l’égalité mathématique.'], ['👩‍🏫', 'Didactique', 'Vient de l’enseignement : l’analogie des verres fait croire que A se vide après B ← A.'], ['🌱', 'Ontogénétique', 'Tient au développement : abstraction encore difficile.'], ['💭', 'Psychologique', 'Peur de l’erreur, « je suis nul en maths ».']] },
    fact: { t: 'On connaît contre une connaissance antérieure : c’est en termes d’obstacles qu’il faut poser le problème de la connaissance.', src: 'Bachelard (1938), La formation de l’esprit scientifique' },
    check: { q: '« Je suis nul en maths, je ne saurai jamais programmer » révèle un obstacle :', o: ['Épistémologique', 'Didactique', 'Psychologique'], a: 2, why: 'C’est le rapport affectif à la tâche : obstacle psychologique.' } },

  { t: 'Choisir le bon niveau d’intervention', ids: ['modalites', 'consigne'],
    p: 'L’étendue de la difficulté décide de la forme, et la nature de l’erreur décide du moment.',
    keys: [
      'Erreur largement partagée (80 % des élèves) : remédiation ou régulation collective.',
      'Difficulté d’une partie de la classe : groupe de besoin, temporaire et fondé sur la difficulté du moment.',
      'Difficulté de deux élèves seulement : aide ciblée.',
      'Immédiate : pendant la séance. Différée : quand les erreurs sont variées et demandent une analyse. Proactive : prévenir une difficulté attendue.',
      'Échec massif dû à une consigne ambiguë : le problème est l’outil ou la consigne d’évaluation ; on clarifie d’abord la tâche.',
    ],
    v: { type: 'versus', a: ['Qui est concerné ?', ['Erreur partagée par la majorité → remédiation collective', 'Une partie de la classe → groupe de besoin temporaire', 'Deux élèves → aide ciblée']], b: ['Quand intervenir ?', ['Blocage pendant la tâche → remédiation immédiate', 'Erreurs variées à analyser → remédiation différée', 'Difficulté attendue → remédiation proactive']] },
    fact: { t: 'Les groupes de besoin sont temporaires et fondés sur la difficulté du moment.', src: 'Przesmycki (1991)' },
    check: { q: 'Une difficulté chez deux élèves seulement appelle :', o: ['Une régulation collective', 'Une aide ciblée', 'Une évaluation certificative'], a: 1, why: 'Deux élèves : on cible l’aide sur eux.' } },

  { t: 'Des aides qui rendent autonome', ids: ['etayage', 'autoeval'],
    p: 'Une remédiation réussie ne refait pas le même cours et ne fait pas à la place de l’élève : elle change d’entrée et l’amène à se corriger seul.',
    keys: [
      'Une bonne remédiation utilise une méthode différente de l’enseignement initial : répéter exactement le même cours est souvent insuffisant.',
      'Étapes graduées : utiles quand une tâche complexe bloque les élèves. Dans une tâche complexe, on analyse quelle composante bloque.',
      'Fiche méthode : guider les étapes sans supprimer la compréhension. Checklist : aider l’auto-vérification.',
      'En tutorat entre pairs, le tuteur donne des indices et fait réfléchir.',
      'Une remédiation qui rend l’élève dépendant nuit à son autonomie. Dicter chaque instruction jusqu’à la solution, c’est l’effet Topaze.',
      'Autorégulation : l’élève apprend à vérifier et corriger son travail. La remédiation est présentée comme une étape normale ; trop facile ou punitive, elle démotive.',
      'En APC, la remédiation porte aussi sur la mobilisation des ressources en situation.',
    ],
    v: { type: 'bars', unit: '%', items: [['Étapes graduées', 80, 'La tâche est découpée, l’aide est forte.'], ['Fiche méthode', 55, 'Les étapes guident sans donner la réponse.'], ['Checklist', 30, 'L’élève vérifie lui-même son travail.'], ['Autorégulation', 10, 'Il repère et corrige seul ses erreurs.']] },
    fact: { t: 'Six fonctions de la tutelle : enrôler, réduire la difficulté, maintenir l’orientation, signaler l’essentiel, contrôler la frustration, montrer.', src: 'Wood, Bruner & Ross (1976)' },
    check: { q: 'Pourquoi répéter exactement le même cours est-il souvent insuffisant ?', o: ['Il faut changer d’entrée pédagogique', 'Les élèves s’ennuient', 'Le temps manque'], a: 0, why: 'Si la première explication n’a pas suffi, la même ne suffira pas : on change d’approche.' } },

  { t: 'Les stratégies de remédiation', ids: ['strategies'],
    p: 'Chaque stratégie répond à un type de difficulté. On la choisit d’après le diagnostic.',
    keys: [
      'Comparaison : confronter une solution correcte et une solution erronée.',
      'Contre-exemple : révéler la limite d’une solution.',
      'Verbalisation : faire expliquer sa démarche, par exemple commenter son algorithme ligne par ligne.',
      'Difficultés syntaxiques : exercices de correction de code erroné. En C, l’erreur typique des débutants est de comparer deux chaînes avec == au lieu de strcmp().',
      'Conditions imbriquées : décomposer en sous-problèmes. Chevauchement des conditions : faire dessiner des diagrammes de décision.',
      'En programmation, le debugging guidé est une remédiation. En algorithmique, tester 8, 10 et 12 autour du seuil 10 fait identifier les cas limites.',
    ],
    v: { type: 'grid', items: [['⚖️', 'Comparaison', 'Solution correcte face à solution erronée.'], ['🚫', 'Contre-exemple', 'Montrer la limite d’une solution.'], ['🗣️', 'Verbalisation', 'Commenter son algorithme ligne par ligne.'], ['🧩', 'Décomposition', 'Découper en sous-problèmes, diagrammes de décision.']] },
    fact: { t: 'Un contre-exemple révèle la limite d’une solution ; la comparaison correcte / erronée fait verbaliser la règle.', src: 'Astolfi (1997)' },
    check: { q: 'Pour des élèves en difficulté avec les conditions imbriquées, l’approche la plus efficace :', o: ['La décomposition en sous-problèmes', 'Recopier la correction', 'Apprendre la syntaxe par cœur'], a: 0, why: 'Découper le problème rend chaque condition traitable séparément.' } },

  { t: 'Le cas =B2+C2+D2/3', ids: ['tableur'],
    p: 'Suis la démarche sur une erreur réelle du tableur. Touche chaque étape.',
    keys: [
      'Avec =B2+C2+D2/3, seul D2 est divisé par 3 : la cause probable est la priorité des opérations non maîtrisée.',
      'Remédiation : faire tester et comparer avec des parenthèses, =(B2+C2+D2)/3, plutôt que dire seulement « c’est faux ».',
      'Faire changer une donnée pour voir si le résultat se met à jour fait comprendre l’intérêt de la formule.',
    ],
    v: { type: 'flow', steps: [['Constat', 'La moyenne affichée est fausse.'], ['Analyse', 'Seul D2 est divisé par 3.'], ['Origine', 'Priorité des opérations non maîtrisée.'], ['Remédiation', 'Faire tester et comparer avec des parenthèses : =(B2+C2+D2)/3.'], ['Vérification', 'Nouvelle moyenne pondérée à construire.']] },
    fact: { t: 'Un contre-exemple révèle la limite d’une solution ; la comparaison correcte / erronée fait verbaliser la règle.', src: 'Astolfi (1997)' },
    check: { q: 'La remédiation la plus pertinente pour =B2+C2+D2/3 :', o: ['Recopier la règle 10 fois', 'Faire tester et comparer avec des parenthèses', 'Refaire le même cours'], a: 1, why: 'L’élève constate lui-même l’effet des parenthèses.' } },

  { t: 'Représentations erronées : trois cas', ids: ['representations'],
    p: 'Les élèves arrivent avec leurs propres idées sur le numérique. Une représentation erronée se fait émerger, puis on la met en conflit.',
    keys: [
      '1313 codé « 1101 1101 » : l’élève découpe 1313 en « 13 » et « 13 » et code chaque morceau ; il ignore la valeur positionnelle du nombre entier.',
      'Remédiation : faire reconvertir le résultat en décimal (contre-exemple : 1101 1101 vaut 221, pas 1313), puis travailler les puissances de 2 au-delà de 8.',
      'Centrer avec des espaces : comparer espaces et alignement centré traite une représentation erronée.',
      'Confusion Internet / Web : faire classer les services et l’infrastructure.',
      'Représentation métaphorique : un langage de programmation sert « à parler aux ordinateurs ». Défi majeur de l’algorithmique : la complexité des concepts et les représentations des apprenants.',
    ],
    v: { type: 'flow', steps: [['Erreur', '1313 → « 1101 1101 ».'], ['Raisonnement', '« 13 » et « 13 » codés séparément.'], ['Contre-exemple', '1101 1101 se reconvertit en 221.'], ['Nouvelle méthode', 'Puissances de 2 ou divisions successives.']] },
    fact: { t: 'Une conception erronée ne disparaît pas quand on donne la bonne réponse : il faut la faire émerger, puis la confronter à une situation qui la met en défaut.', src: 'Giordan & De Vecchi (1987), Les origines du savoir' },
    check: { q: 'Pour remédier à « 1313 → 1101 1101 », on commence par :', o: ['Faire reconvertir le résultat en décimal', 'Mettre une mauvaise note', 'Refaire l’activité à l’identique'], a: 0, why: 'Le contre-exemple (221 ≠ 1313) crée le conflit qui amène la bonne méthode.' } },
];
