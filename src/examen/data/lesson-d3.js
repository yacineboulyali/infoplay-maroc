// Leçon ciblée de la partie D3 · Évaluation des apprentissages.
// Construite à partir d’un audit de couverture : chacune des 69 questions de D3 (QCM et annales
// 2021-2025) trouve sa réponse dans au moins une carte, le plus souvent dans « À retenir » (keys).
// Mêmes champs que lesson-d1.js : t, p, keys, v, fact, check, ids (notions couvertes par la carte).

export const LESSON_D3 = [
  { t: 'Évaluer, en trois temps', ids: ['remediation'],
    p: 'Évaluer n’est pas noter : c’est recueillir des informations, les juger par rapport à des critères, puis décider.',
    keys: [
      'Évaluer, c’est recueillir des informations, les juger par rapport à des critères et décider.',
      'Chaîne cohérente : évaluer → analyser → réguler ou remédier → réévaluer.',
      'Après une remédiation, on réévalue l’acquisition.',
      'Un critère réussi par seulement 25 % de la classe appelle une remédiation collective sur ce critère.',
      'Si presque tous les élèves échouent, on examine aussi l’épreuve : sa difficulté, sa consigne et son alignement avec l’objectif.',
    ],
    v: { type: 'flow', steps: [['Recueillir', 'Productions, observations, réponses.'], ['Juger', 'Comparer à des critères et indicateurs.'], ['Décider', 'Poursuivre, réguler, remédier, certifier.']] },
    fact: { t: 'Une note seule ne permet pas de choisir une remédiation : il faut analyser l’erreur.', src: 'Hadji (1989), L’évaluation, règles du jeu' },
    check: { q: 'Évaluer consiste essentiellement à :', o: ['Attribuer une note', 'Recueillir, juger selon des critères, décider', 'Classer les élèves'], a: 1, why: 'L’évaluation se termine par une décision, pas seulement par une note.' } },

  { t: 'Les fonctions dans le temps', ids: ['fonctions'],
    p: 'La fonction dépend du moment et de l’usage des résultats. Une évaluation formative peut être notée : c’est sa fonction de régulation qui compte.',
    keys: [
      'Diagnostique : avant un apprentissage, pour repérer les prérequis et les représentations.',
      'Formative : pendant l’apprentissage, pour réguler (un test suivi d’un soutien ciblé). Elle n’est pas forcément sans note.',
      'Formatrice : l’élève évalue lui-même son travail avec des critères explicites.',
      'Sommative : faire le bilan des acquis d’une période. Toute sommative n’est pas certificative.',
      'Certificative : elle conduit à une validation officielle (diplôme, passage).',
    ],
    v: { type: 'stages', items: [['Avant', 'Diagnostique', 'Repérer prérequis et représentations.'], ['Pendant', 'Formative / formatrice', 'Réguler ; l’élève s’évalue avec des critères.'], ['Après', 'Sommative', 'Faire le bilan des acquis.'], ['Fin de cycle', 'Certificative', 'Valider officiellement.']] },
    fact: { t: 'L’évaluation formatrice fait de l’élève l’acteur de son évaluation, à partir de critères explicites.', src: 'Scriven (1967) ; Nunziati (1990)' },
    check: { q: 'Un test en début de séquence pour repérer les prérequis est une évaluation :', o: ['Diagnostique', 'Sommative', 'Certificative'], a: 0, why: 'Avant l’apprentissage, l’évaluation est diagnostique.' } },

  { t: 'Évaluation normative ou critériée ?', ids: ['normcrit'],
    p: 'On peut situer un élève par rapport aux autres, ou par rapport à ce qui est attendu. L’approche par compétences choisit la seconde voie.',
    keys: [
      'Évaluation normative : elle compare la performance de l’élève à celle d’un groupe ou à une norme.',
      'Évaluation critériée : elle compare l’élève à des critères préétablis.',
      'L’approche par compétences privilégie l’évaluation critériée.',
      'Le seuil de réussite se définit avant l’évaluation, pas après avoir vu les résultats.',
    ],
    v: { type: 'versus', a: ['Normative', ['Comparer aux camarades', 'Classer les élèves', 'Moyenne de la classe comme repère']], b: ['Critériée', ['Comparer à des critères', 'Situer l’atteinte de l’objectif', 'Seuil fixé à l’avance']] },
    fact: { t: 'L’évaluation critériée interprète la performance par rapport à un domaine de tâches défini, et non par rapport aux autres élèves.', src: 'Glaser (1963), Instructional technology and the measurement of learning outcomes' },
    check: { q: 'Une évaluation critériée compare l’élève :', o: ['À des critères préétablis', 'À ses camarades', 'À la moyenne nationale'], a: 0, why: 'Le repère est ce qui est attendu, pas la performance des autres.' } },

  { t: 'Critère et indicateurs', ids: ['critere', 'regle23'],
    p: 'Le critère est la qualité attendue ; les indicateurs sont ce qu’on voit concrètement dans la production.',
    keys: [
      'Critère : une dimension générale de jugement (« respect de la mise en forme », « correction logique »).',
      'Indicateur : une manifestation observable d’un critère (« le titre est centré avec l’outil d’alignement », « aucune tranche d’âge ne se chevauche »).',
      'Un niveau « acquis » doit être accompagné d’un descripteur observable.',
      'Indépendance des critères : on ne pénalise pas la même erreur dans deux critères différents.',
      'Règle des 2/3 : un critère est maîtrisé si l’élève le réussit dans au moins 2 occasions sur 3. Règle des 3/4 : les critères minimaux reçoivent au moins 3/4 des points.',
    ],
    v: { type: 'tree', root: 'Critère : respect de la mise en forme', kids: [['Indicateur 1', 'Le titre est centré avec l’outil d’alignement.'], ['Indicateur 2', 'Le titre est en gras, taille 16.'], ['Indicateur 3', 'Les paragraphes sont justifiés.']] },
    fact: { t: 'Règle des 2/3 : un critère est maîtrisé s’il est réussi dans 2 occasions sur 3. Règle des 3/4 : les critères minimaux reçoivent au moins 3/4 des points.', src: 'De Ketele (1996) ; Roegiers (2004)' },
    check: { q: '« Le titre est centré et en gras » est :', o: ['Un critère', 'Un indicateur', 'Un objectif'], a: 1, why: 'C’est une manifestation observable : un indicateur.' } },

  { t: 'Grilles, barèmes et rubriques', ids: ['grille'],
    p: 'Une grille rassemble les critères, les indicateurs et les niveaux attendus. Elle rend le jugement explicite pour le correcteur comme pour l’élève.',
    keys: [
      'Une grille rend le jugement plus transparent et facilite le feedback.',
      'Une observation devient plus fiable quand elle s’appuie sur une grille et des critères.',
      'Critères, indicateurs et barème améliorent l’objectivité de la correction.',
      'La co-évaluation se fonde sur des critères explicites, connus des élèves.',
      'Rubrique analytique : elle évalue plusieurs critères séparément. Rubrique holistique : elle porte un jugement global sur la performance.',
      'Un niveau « acquis » sans descripteur précis est moins utile pour un jugement explicite.',
    ],
    v: { type: 'versus', a: ['Rubrique analytique', ['Un score par critère', 'Montre forces et faiblesses', 'Feedback précis']], b: ['Rubrique holistique', ['Un seul jugement global', 'Correction plus rapide', 'Moins de détails pour progresser']] },
    fact: { t: 'Une rubrique décrit, pour chaque critère, des niveaux de qualité ; partagée avec les élèves, elle soutient l’autoévaluation.', src: 'Brookhart (2013), How to Create and Use Rubrics' },
    check: { q: 'Une rubrique analytique :', o: ['Évalue plusieurs critères séparément', 'Donne un seul jugement global', 'Classe les élèves entre eux'], a: 0, why: 'Elle découpe la performance en critères notés chacun à part.' } },

  { t: 'Choisir l’outil d’évaluation', ids: ['outils'],
    p: 'Chaque outil mesure bien certaines choses et mal d’autres. On le choisit d’après ce que l’on veut observer.',
    keys: [
      'Le QCM est adapté pour mesurer certaines connaissances et compréhensions. Ses distracteurs doivent être plausibles ; une formulation négative complexe ajoute une difficulté inutile.',
      'Pour évaluer une justification approfondie : la question ouverte.',
      'Pour évaluer une démarche et l’autonomie : l’observation structurée.',
      'Le portfolio permet d’observer la progression au fil du temps.',
      'Un programme juste mais une démarche fragile : on évalue le produit et le processus.',
    ],
    v: { type: 'grid', items: [['☑️', 'QCM', 'Connaissances et compréhension ; distracteurs plausibles.'], ['✍️', 'Question ouverte', 'Explication et justification.'], ['👀', 'Observation structurée', 'Démarche et autonomie.'], ['📂', 'Portfolio', 'Progression au fil du temps.']] },
    fact: { t: 'Les distracteurs d’un QCM doivent être plausibles et refléter des erreurs fréquentes ; les formulations négatives sont à éviter.', src: 'Haladyna, Downing & Rodriguez (2002), A review of multiple-choice item-writing guidelines' },
    check: { q: 'Pour évaluer une démarche et l’autonomie, l’outil le plus adapté :', o: ['L’observation structurée', 'Un QCM', 'Une dictée'], a: 0, why: 'La démarche se voit pendant l’action : on l’observe avec une grille.' } },

  { t: 'Tâche complexe et évaluation authentique', ids: ['competence'],
    p: 'Pour évaluer une compétence, on place l’élève dans une situation nouvelle, proche d’un usage réel, où il doit choisir et combiner ses ressources.',
    keys: [
      'Une tâche complexe mobilise plusieurs ressources.',
      'L’évaluation authentique privilégie une situation proche d’un usage réel : envoyer à l’enseignant, avec un camarade en copie, un message avec objet, formule de politesse et pièce jointe.',
      'Situation nouvelle : convertir des nombres jamais vus dans les deux sens, dont un au-delà de 15 ; compléter une facture avec un taux de TVA unique et une remise par ligne.',
      'Objectif « créer une arborescence » : l’outil le plus valide est une tâche pratique de création et d’organisation.',
      'Pour tester un programme à seuils (200 et 500 DH), on choisit les valeurs limites : 199, 200, 499, 500.',
      'Triangulation : utiliser plusieurs sources de preuve pour juger une compétence complexe.',
    ],
    v: { type: 'flow', steps: [['Situation nouvelle', 'Données jamais vues pendant l’activité.'], ['Ressources', 'L’élève choisit lui-même ce qu’il mobilise.'], ['Production', 'Un résultat proche d’un usage réel.'], ['Grille', 'Critères connus, plusieurs sources de preuve.']] },
    fact: { t: 'Une évaluation authentique demande d’accomplir des tâches signifiantes qui reproduisent les défis réels de la discipline.', src: 'Wiggins (1990), The case for authentic assessment' },
    check: { q: 'Quelle évaluation est la plus valide pour l’objectif « créer une arborescence » ?', o: ['Une tâche pratique de création et d’organisation', 'Définir le mot « dossier »', 'Un QCM sur les extensions'], a: 0, why: 'L’évaluation fait réaliser la tâche visée par l’objectif.' } },

  { t: 'Validité et fiabilité', ids: ['validite'],
    p: 'Deux qualités distinctes d’une épreuve. Une épreuve peut être fiable sans être valide.',
    keys: [
      'Validité : l’épreuve mesure réellement ce qu’elle doit mesurer. Un QCM de définitions pour évaluer la création d’un tableau Excel pose un problème de validité.',
      'Fiabilité : la stabilité et la cohérence des résultats. 17/20 et 8/20 pour la même production, sans critères communs : problème de fiabilité inter-correcteurs.',
      'Un test peut être fiable mais peu valide.',
      'Effet plafond : l’épreuve est trop facile pour distinguer les niveaux.',
    ],
    v: { type: 'versus', a: ['Validité', ['Mesure ce qu’elle doit mesurer', 'Un QCM de définitions n’est pas valide pour évaluer la création d’un tableau', 'Se travaille par l’alignement objectif–épreuve']], b: ['Fiabilité', ['Résultats stables et cohérents', '17/20 et 8/20 pour la même copie = problème de fiabilité', 'Se travaille par critères, indicateurs, barème']] },
    fact: { t: 'Une épreuve peut donner des résultats très stables tout en mesurant autre chose que l’objectif visé : la fiabilité ne garantit pas la validité.', src: 'Laveault & Grégoire (2014), Introduction aux théories des tests' },
    check: { q: 'Deux correcteurs donnent 17/20 et 8/20 à la même copie. Problème de :', o: ['Validité', 'Fiabilité inter-correcteurs', 'Authenticité'], a: 1, why: 'Les résultats ne sont pas stables d’un correcteur à l’autre.' } },

  { t: 'Les biais de notation', ids: ['halo'],
    p: 'Le correcteur peut être influencé par autre chose que la production. Connaître ces biais aide à s’en protéger.',
    keys: [
      'Effet de halo : une impression générale positive influence le jugement (belle présentation, élève poli jugé « bon en tout »).',
      'Effet Horn : la version négative du halo. Juger un élève faible partout à cause de son comportement n’est donc pas l’effet de halo.',
      'Effet Pygmalion : les attentes de l’enseignant influencent les résultats de l’élève.',
      'Pour limiter ces biais : corriger critère par critère avec une grille, si possible sans regarder le nom.',
    ],
    v: { type: 'versus', a: ['Effet de halo', ['Impression positive', 'Belle présentation → meilleure note', 'Poli donc « bon en tout »']], b: ['Effet Horn', ['Impression négative', 'Copie brouillonne → note plus basse', 'Comportement → jugé faible partout']] },
    fact: { t: 'L’effet de halo : une belle présentation fait monter la note du raisonnement.', src: 'Thorndike (1920) ; Laveault & Grégoire (2014)' },
    check: { q: 'Juger un élève faible sur tous les plans à cause de son comportement, c’est :', o: ['L’effet Horn', 'L’effet de halo', 'L’effet Pygmalion'], a: 0, why: 'Le halo est la contamination positive ; sa version négative est l’effet Horn.' } },

  { t: 'Un feedback qui fait progresser', ids: ['feedback', 'autoeval'],
    p: 'Un bon retour est spécifique, fondé sur des faits, et dit quoi faire ensuite. Le feedforward vise la prochaine tâche.',
    keys: [
      'Un feedback efficace est spécifique, constructif et fondé sur des faits ; il est orienté vers l’amélioration.',
      'Feedforward : un conseil concret pour réussir la prochaine tâche ; il oriente la prochaine performance.',
      'L’auto-évaluation développe l’autorégulation : l’élève apprend à vérifier et corriger son travail.',
    ],
    v: { type: 'flow', steps: [['Où vais-je ?', 'Rappeler le but et les critères de réussite.'], ['Où en suis-je ?', 'Dire précisément ce qui est réussi et ce qui ne l’est pas.'], ['Et après ?', 'Donner une piste concrète : « teste la moyenne égale à 10 ».']] },
    fact: { t: 'Les feedbacks centrés sur la tâche et la démarche sont plus efficaces que les éloges centrés sur la personne.', src: 'Hattie & Timperley (2007)' },
    check: { q: 'Quel feedback est le plus utile ?', o: ['« Bien »', '« Vérifie ce qui se passe quand la moyenne vaut exactement 10 »', '« 12/20 »'], a: 1, why: 'Il est spécifique et oriente l’action suivante.' } },
];
