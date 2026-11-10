import { match, sort, order, fill, quiz, hot, robot, prog } from './dsl.js';

export default {
  id: 3, title: 'Algorithmique et programmation', short: 'Algorithmique', icon: '🤖', color: 'm3',
  groups: [{ label: 'Notion d’algorithme (4 h)', sessions: [1, 2] }, { label: 'Structures de contrôle de base (6 h)', sessions: [3, 4, 5] }, { label: 'Langages de programmation (6 h)', sessions: [6, 7, 8] }],
  languageNote: 'Langage cible des séances 7 et 8 : Python (valeur par défaut à confirmer avec le programme de l’établissement).',
  sessions: [
    { title: 'Notion d’algorithme, constantes, variables et types', topics: ['algorithme', 'instruction', 'donnée', 'constante', 'variable', 'type'], acts: [
      match('Associe les notions', 'Relier algorithme, instruction, donnée, variable et constante à leur définition.', [
        ['Algorithme', 'Suite ordonnée d’instructions qui résout un problème'], ['Instruction', 'Action élémentaire de l’algorithme'], ['Donnée', 'Valeur utilisée ou produite par l’algorithme'], ['Variable', 'Zone de mémoire nommée dont la valeur peut changer'], ['Constante', 'Valeur nommée qui ne change pas pendant l’exécution'],
      ]),
      sort('Constante ou variable ?', 'Distinguer ce qui reste fixe de ce qui change.', ['Constante', 'Variable'], [
        ['π (3,14)', 0, 'Sa valeur ne change pas.'], ['Le nombre de jours d’une semaine (7)', 0, 'Valeur fixe.'], ['La TVA fixée à 20 % dans le programme', 0, 'Valeur fixée une fois pour toutes.'], ['Le nombre d’heures dans un jour (24)', 0, 'Valeur fixe.'], ['Le nombre de lettres de l’alphabet latin (26)', 0, 'Valeur fixe.'],
        ['La note saisie par l’élève', 1, 'Elle change à chaque saisie.'], ['Le total qui augmente à chaque achat', 1, 'Il évolue.'], ['L’âge de l’utilisateur', 1, 'Il dépend de la personne.'], ['Le résultat d’une addition', 1, 'Il dépend des nombres.'], ['Le score d’un jeu', 1, 'Il change pendant la partie.'],
      ]),
      quiz('Quel type de donnée ?', 'Identifier entier, réel, chaîne de caractères et booléen.', [
        ['Quel est le type de la valeur 14 ?', ['Entier', 'Réel', 'Chaîne de caractères', 'Booléen'], '14 est un nombre sans partie décimale.'],
        ['Quel est le type de la valeur 3,75 ?', ['Réel', 'Entier', 'Chaîne de caractères', 'Booléen'], 'Elle a une partie décimale.'],
        ['Quel est le type de la valeur « Rabat » ?', ['Chaîne de caractères', 'Entier', 'Réel', 'Booléen'], 'C’est du texte.'],
        ['Quel est le type de la valeur Vrai ?', ['Booléen', 'Entier', 'Réel', 'Chaîne de caractères'], 'Un booléen vaut Vrai ou Faux.'],
        ['Quel est le type de la valeur « 2026 » écrite entre guillemets ?', ['Chaîne de caractères', 'Entier', 'Réel', 'Booléen'], 'Entre guillemets, c’est du texte, même si ce sont des chiffres.'],
      ]),
      robot('Mission robot', 'Ordonner des actions pour atteindre un objectif sur une grille.', [
        { grid: ['S..G'], max: 6 }, { grid: ['S..', '##.', '..G'], max: 9 }, { grid: ['S.#.', '#.#.', '#...', '###G'], max: 12 }, { grid: ['S...#', '###.#', 'G...#'], max: 14 }, { grid: ['S..#.', '##.#.', '.....', '.####', '....G'], max: 20 },
      ]),
    ] },
    { title: 'Instructions de base : lire, écrire, affecter', topics: ['lecture', 'écriture', 'affectation'], acts: [
      match('Lire, écrire, affecter', 'Associer chaque instruction à son effet.', [
        ['Lire(a)', 'Saisir une valeur au clavier et la ranger dans a'], ['Écrire(a)', 'Afficher la valeur de a à l’écran'], ['a ← 5', 'Ranger la valeur 5 dans a'], ['a ← a + 1', 'Augmenter a de 1'], ['Écrire("Bonjour")', 'Afficher le texte Bonjour tel quel'],
      ]),
      fill('Complète les instructions', 'Compléter des instructions de pseudo‑code.', [
        ['Pour demander l’âge à l’utilisateur on écrit : [[Lire|Écrire|Affecter]](age)', 'Lire attend une saisie.'],
        ['Pour afficher le résultat on écrit : [[Écrire|Lire|Fin]](resultat)', 'Écrire affiche une valeur.'],
        ['Pour mettre 10 dans n on écrit : n [[←|→|≠]] 10', 'La flèche vers la gauche est l’affectation.'],
        ['Pour doubler n on écrit : n ← [[n * 2|2n|n x 2 =]]', '* est le signe de multiplication.'],
        ['Dans Écrire("Total"), le mot Total est [[un texte affiché tel quel|une variable|une constante numérique]].', 'Entre guillemets, c’est du texte.'],
      ]),
      prog('Simule les variables', 'Suivre la valeur des variables après des affectations successives.', 'predict', [
        ['a ← 5\nb ← 3\na ← a + b\nÉcrire(a)', [], 'out', 'a reçoit 5 + 3.'], ['x ← 10\ny ← x\nx ← 4\nÉcrire(y)', [], 'out', 'y a copié la valeur de x avant que x change.'], ['n ← 2\nn ← n * n\nn ← n + 1', [], 'n', 'n passe de 2 à 4 puis à 5.'],
        ['a ← 7\nb ← 2\nt ← a\na ← b\nb ← t', [], 'b', 'On échange a et b grâce à t.'], ['Lire(x)\nx ← x + 3\nÉcrire(x)', [4], 'out', 'x reçoit 4 puis 4 + 3.'],
      ]),
      order('Mission calculatrice', 'Écrire dans l’ordre un algorithme qui lit deux nombres et affiche leur somme.', ['Début', 'Lire(a)', 'Lire(b)', 's ← a + b', 'Écrire(s)'], { eq: [[1, 2]], explain: 'On lit les deux nombres (dans un ordre indifférent), on calcule la somme, puis on l’affiche.' }),
    ] },
    { title: 'Structure séquentielle', topics: ['instructions exécutées l’une après l’autre'], acts: [
      order('Ordonne l’algorithme', 'Remettre dans l’ordre un algorithme séquentiel.', ['Début', 'Lire(rayon)', 'aire ← 3,14 * rayon * rayon', 'Écrire(aire)', 'Fin'], { explain: 'On ne peut calculer l’aire qu’après avoir lu le rayon, et l’afficher qu’après l’avoir calculée.' }),
      prog('Prédis le résultat', 'Déterminer ce qu’affiche un algorithme séquentiel.', 'predict', [
        ['Lire(a)\nLire(b)\nc ← a * b\nÉcrire(c)', [6, 7], 'out', 'c = 6 × 7.'], ['x ← 20\nx ← x - 5\nx ← x * 2\nÉcrire(x)', [], 'out', 'Les instructions se suivent : 20, 15, 30.'], ['Lire(n)\nd ← n * 2\nt ← d + n\nÉcrire(t)', [4], 'out', 'd = 8 puis t = 12.'],
        ['a ← 5\nb ← a + 2\na ← b * 2\nÉcrire(a)', [], 'out', 'b = 7 puis a = 14.'], ['Lire(p)\nr ← p * 20 / 100\nÉcrire(r)', [150], 'out', '20 % de 150 = 30.'],
      ]),
      fill('Complète et débogue', 'Réparer un algorithme séquentiel.', [
        ['Ligne 1 : [[Lire|Écrire|Fin]](note1)', 'On lit d’abord les données.'],
        ['Ligne 3 : moyenne ← (note1 + note2) [[/|*|-]] 2', 'La moyenne de deux notes se calcule en divisant la somme par 2.'],
        ['Ligne 4 : [[Écrire|Lire|Début]](moyenne)', 'Le résultat s’affiche à la fin.'],
        ['Dans un algorithme séquentiel, les instructions sont exécutées [[l’une après l’autre, dans l’ordre|toutes en même temps|dans un ordre aléatoire]].', 'L’ordre d’écriture est l’ordre d’exécution.'],
        ['Si on écrit Écrire(moyenne) avant de calculer moyenne, l’algorithme est [[faux|plus rapide|meilleur]].', 'moyenne n’a pas encore de valeur.'],
      ]),
      sim3('Mission distributeur', 'Calculer le total de plusieurs achats.'),
    ] },
    { title: 'Structure sélective simple', topics: ['condition', 'Si … Alors … FinSi'], acts: [
      sort('Vrai ou faux ?', 'Évaluer des comparaisons.', ['Vrai', 'Faux'], [
        ['7 > 3', 0, '7 est plus grand que 3.'], ['5 = 5', 0, 'Les deux valeurs sont égales.'], ['10 <= 10', 0, '≤ accepte l’égalité.'], ['3 * 3 = 9', 0, '3 × 3 vaut bien 9.'], ['8 <> 2', 0, '<> signifie « différent de ».'],
        ['2 + 2 = 5', 1, '2 + 2 = 4.'], ['4 <> 4', 1, '4 est égal à 4, donc pas différent.'], ['9 < 1', 1, '9 est plus grand que 1.'], ['15 >= 20', 1, '15 est plus petit que 20.'], ['6 - 1 = 4', 1, '6 − 1 = 5.'],
      ]),
      match('Condition et action', 'Associer une condition à l’action qui lui correspond.', [
        ['Si age < 18', 'Écrire("Mineur")'], ['Si temperature > 30', 'Écrire("Il fait chaud")'], ['Si solde = 0', 'Écrire("Compte vide")'], ['Si note >= 10', 'Écrire("Réussi")'], ['Si mdp = "ok"', 'Écrire("Accès autorisé")'],
      ]),
      fill('Si … Alors … FinSi', 'Compléter une structure sélective simple.', [
        ['La structure sélective simple commence par [[Si|Pour|Lire]] suivi d’une condition.', 'Si introduit la condition.'],
        ['Après la condition, on écrit le mot [[Alors|Sinon|Début]].', 'Alors annonce l’action.'],
        ['Le bloc se termine par [[FinSi|Fin|Écrire]].', 'FinSi ferme la structure.'],
        ['Les instructions entre Alors et FinSi ne sont exécutées que si la condition est [[vraie|fausse|écrite en minuscules]].', 'Une condition fausse saute le bloc.'],
        ['Si la condition est fausse, l’algorithme [[passe directement après FinSi|s’arrête avec une erreur|recommence au début]].', 'On continue après FinSi.'],
      ]),
      prog('Mission accès', 'Trouver les valeurs à saisir pour qu’une règle d’accès soit satisfaite.', 'run', [
        ['Lire(age)\nSi age >= 12 Alors\nÉcrire("Accès autorisé")\nFinSi', 'Accès autorisé', [14], 'Il faut un âge d’au moins 12.'], ['Lire(code)\nSi code = 1234 Alors\nÉcrire("Porte ouverte")\nFinSi', 'Porte ouverte', [1234], 'Le code doit être exactement 1234.'],
        ['Lire(note)\nSi note >= 10 Alors\nÉcrire("Réussi")\nFinSi', 'Réussi', [12], 'La note doit être au moins 10.'], ['Lire(t)\nSi t > 30 Alors\nÉcrire("Chaud")\nFinSi', 'Chaud', [35], 'La température doit dépasser 30.'], ['Lire(a)\nLire(b)\nSi a > b Alors\nÉcrire("a est plus grand")\nFinSi', 'a est plus grand', [9, 4], 'Saisis d’abord le plus grand nombre.'],
      ]),
    ] },
    { title: 'Structure sélective complète', topics: ['Si … Alors … Sinon … FinSi'], acts: [
      prog('Quelle branche est exécutée ?', 'Prédire le résultat d’une structure sélective complète.', 'predict', [
        ['Lire(n)\nSi n > 0 Alors\nÉcrire("positif")\nSinon\nÉcrire("négatif ou nul")\nFinSi', [5], 'out', '5 > 0 est vrai.'], ['Lire(n)\nSi n > 0 Alors\nÉcrire("positif")\nSinon\nÉcrire("négatif ou nul")\nFinSi', [0], 'out', '0 > 0 est faux : on passe au Sinon.'],
        ['Lire(note)\nSi note >= 10 Alors\nÉcrire("Admis")\nSinon\nÉcrire("Refusé")\nFinSi', [9], 'out', '9 est inférieur à 10.'], ['Lire(a)\nLire(b)\nSi a > b Alors\nm ← a\nSinon\nm ← b\nFinSi\nÉcrire(m)', [4, 9], 'out', 'a n’est pas plus grand que b : m reçoit b.'],
        ['Lire(age)\nSi age >= 18 Alors\nÉcrire("majeur")\nSinon\nÉcrire("mineur")\nFinSi', [18], 'out', '18 >= 18 est vrai.'],
      ]),
      fill('Si … Sinon … FinSi', 'Compléter des structures sélectives complètes.', [
        ['Si note >= 10 [[Alors|Sinon|FinSi]] Écrire("Admis")', 'Alors suit la condition.'],
        ['Pour exécuter autre chose quand la condition est fausse, on utilise [[Sinon|Alors|Lire]].', 'Sinon couvre le cas contraire.'],
        ['Dans Si … Alors … Sinon … FinSi, exactement [[un seul|les deux|aucun]] des deux blocs est exécuté.', 'Soit l’un, soit l’autre.'],
        ['Le contraire de la condition n > 0 est n [[<=|<|>=]] 0.', 'Si n n’est pas strictement positif, alors n ≤ 0.'],
        ['Un algorithme qui affiche « pair » ou « impair » utilise une structure sélective [[complète|simple sans Sinon|séquentielle]].', 'Il y a deux cas à traiter.'],
      ]),
      quiz('Corrige les erreurs de logique', 'Trouver et réparer des erreurs de logique.', [
        ['« Admis si la note est d’au moins 10. » Quel est le défaut ?\nSi note > 10 Alors\nÉcrire("Admis")\nSinon\nÉcrire("Refusé")\nFinSi', ['Une note égale à 10 est refusée : il faut >=', 'Il manque Lire', 'Sinon est interdit', 'Le mot Admis est mal écrit'], '> exclut 10 ; >= l’inclut.'],
        ['Pour tester « n est pair », que penser de cette condition ?\nSi n mod 2 = 1 Alors\nÉcrire("pair")\nFinSi', ['n mod 2 = 1 signifie impair : il faut = 0', 'mod n’existe pas', 'Il faut Sinon', 'Il faut écrire impair partout'], 'Un nombre pair a pour reste 0 dans la division par 2.'],
        ['Quel est le défaut ?\nSi age < 18 Alors\nÉcrire("majeur")\nFinSi', ['Le message ne correspond pas à la condition : age < 18 signifie mineur', 'Il manque Lire', 'FinSi est inutile', 'age ne peut pas être comparé'], 'Le message doit être cohérent avec la condition.'],
        ['Que se passe‑t‑il si a est plus petit que b ?\nSi a > b Alors\nm ← a\nFinSi\nÉcrire(m)', ['m n’a pas de valeur : il manque Sinon m ← b', 'm vaut a', 'Rien, tout va bien', 'L’algorithme affiche b'], 'Sans Sinon, m reste sans valeur.'],
        ['Où est l’erreur de structure ?\nSi x > 5 Alors\nÉcrire("grand")\nFinSi\nSinon\nÉcrire("petit")', ['Sinon doit se trouver avant FinSi', 'x > 5 est interdit', 'Alors est de trop', 'Écrire est interdit après Si'], 'FinSi ferme toute la structure, Sinon doit être à l’intérieur.'],
      ]),
      sort('Mission bulletin', 'Classer des élèves en Admis ou Non admis selon la moyenne.', ['Admis (moyenne ≥ 10)', 'Non admis (moyenne < 10)'], [
        ['Moyenne 12', 0, '12 ≥ 10.'], ['Moyenne 10', 0, '10 ≥ 10.'], ['Moyenne 15,25', 0, '15,25 ≥ 10.'], ['Moyenne 10,5', 0, '10,5 ≥ 10.'], ['Moyenne 13', 0, '13 ≥ 10.'],
        ['Moyenne 9,5', 1, '9,5 < 10.'], ['Moyenne 7', 1, '7 < 10.'], ['Moyenne 9,99', 1, '9,99 < 10.'], ['Moyenne 4', 1, '4 < 10.'], ['Moyenne 8', 1, '8 < 10.'],
      ]),
    ] },
    { title: 'Notion de programme', topics: ['code source', 'programme', 'exécution', 'résultat'], acts: [
      match('Le vocabulaire du programme', 'Associer les termes du cycle d’un programme.', [
        ['Code source', 'Texte des instructions écrit par le programmeur'], ['Programme', 'Ensemble d’instructions compréhensibles par l’ordinateur'], ['Exécution', 'Moment où l’ordinateur applique les instructions'], ['Résultat (sortie)', 'Ce que le programme affiche ou produit'], ['Interpréteur', 'Outil qui lit le code et le fait exécuter'],
      ]),
      order('Du problème au programme', 'Ordonner les étapes de la création d’un programme.', ['Analyser le problème', 'Écrire l’algorithme', 'Écrire le code du programme', 'Exécuter le programme', 'Tester et corriger les erreurs'], { explain: 'Concevoir (analyser, algorithme), coder, exécuter, puis tester et corriger.' }),
      hot('Lignes et instructions', 'Repérer le rôle de chaque ligne d’un programme.', 'lines', [
        ['l1', 'Clique sur la ligne qui demande une saisie à l’utilisateur.', 'Lire demande une valeur.'], ['l2', 'Clique sur la ligne qui range directement la valeur 3 dans une variable.', 'C’est une affectation.'], ['l3', 'Clique sur la ligne qui calcule le total.', 'Elle multiplie prix et quantité.'],
        ['l4', 'Clique sur la ligne qui affiche la variable total.', 'Écrire(total) montre le résultat.'], ['l5', 'Clique sur la ligne qui affiche un texte fixe.', 'Le texte entre guillemets est affiché tel quel.'],
      ], { lines: ['Lire(prix)', 'quantite ← 3', 'total ← prix * quantite', 'Écrire(total)', 'Écrire("Merci")'] }),
      prog('Mission exécution', 'Exécuter un programme éducatif sécurisé et trouver les bonnes valeurs.', 'run', [
        ['Lire(n)\nÉcrire(n * 2)', 18, [9], 'Il double la valeur lue.'], ['Lire(a)\nLire(b)\nÉcrire(a + b)', 25, [10, 15], 'Il additionne les deux valeurs.'], ['Lire(x)\nÉcrire(x * x)', 49, [7], 'Il calcule le carré.'],
        ['Lire(c)\nÉcrire(c * 9 / 5 + 32)', 212, [100], 'Conversion Celsius → Fahrenheit.'], ['Lire(p)\nÉcrire(p - p * 20 / 100)', 80, [100], 'Prix après une réduction de 20 %.'],
      ]),
    ] },
    { title: 'Langages de programmation', topics: ['langages', 'éditeur / IDE', 'syntaxe'], acts: [
      match('Reconnais les langages', 'Reconnaître des exemples de langages de programmation.', [
        ['Python', 'Langage très utilisé pour débuter, à la syntaxe lisible'], ['Scratch', 'Langage visuel qui assemble des blocs'], ['JavaScript', 'Langage qui rend les pages web interactives'], ['C', 'Langage proche de la machine, utilisé pour les systèmes'], ['Pascal', 'Langage historique créé pour enseigner la programmation'],
      ]),
      sort('Langage, IDE ou application ?', 'Distinguer un langage, un environnement de développement et une application ordinaire.', ['Langage de programmation', 'Environnement de développement (IDE)', 'Application ordinaire'], [
        ['Python', 0, 'On écrit du code dans ce langage.'], ['JavaScript', 0, 'C’est un langage.'], ['C', 0, 'C’est un langage.'],
        ['IDLE', 1, 'Éditeur fourni avec Python.'], ['Thonny', 1, 'Éditeur pour débutants.'], ['Visual Studio Code', 1, 'Éditeur de code.'],
        ['Microsoft Word', 2, 'Traitement de texte, pas un outil de programmation.'], ['Microsoft Excel', 2, 'Tableur.'], ['Lecteur de musique', 2, 'Application multimédia.'], ['Scratch', 0, 'Langage visuel.'],
      ]),
      fill('Complète le code Python', 'Compléter de courts extraits de code source.', [
        ['En Python, pour afficher un message on écrit [[print|Ecrire|show]]("Bonjour").', 'print affiche.'],
        ['Pour lire une valeur saisie on écrit nom = [[input|read|lire]]("Ton nom ? ").', 'input lit au clavier.'],
        ['En Python, l’affectation s’écrit avec le signe [[=|←|:=]], par exemple x = 5.', 'On utilise le signe =.'],
        ['Les commentaires commencent par le caractère [[#|//|--]].', 'En Python, # introduit un commentaire.'],
        ['Les fichiers Python ont l’extension [[.py|.exe|.docx]].', '.py désigne un programme Python.'],
      ]),
      quiz('Mission débogage', 'Réparer de simples erreurs de syntaxe.', [
        ['Quelle est l’erreur ?\nprint("Bonjour"', ['Il manque la parenthèse fermante )', 'print est interdit', 'Il manque un point‑virgule', 'Les guillemets sont inutiles'], 'Chaque parenthèse ouverte doit être fermée.'],
        ['Quelle est l’erreur ?\nPrint("Salut")', ['Python distingue majuscules et minuscules : il faut écrire print', 'Il manque des guillemets', 'Salut est interdit', 'Il manque un deux‑points'], 'Les noms de fonctions sont sensibles à la casse.'],
        ['Quelle est l’erreur ?\nx = 5\nprint(y)', ['La variable y n’a jamais reçu de valeur', 'x est mal écrit', 'print ne sait pas afficher', 'Il manque une parenthèse'], 'On ne peut utiliser que des variables définies.'],
        ['Quelle est l’erreur ?\nif x > 3\n    print("grand")', ['Il manque les deux‑points : après la condition', 'if est interdit', 'x > 3 est faux', 'print est mal écrit'], 'La ligne du if se termine par :'],
        ['Quelle est l’erreur ?\nnom = input("Nom ? ")\n print(nom)', ['La deuxième ligne commence par un espace (indentation inattendue)', 'input est interdit', 'nom est un mot réservé', 'Il manque un point'], 'En Python, l’indentation a un sens.'],
      ]),
    ] },
    { title: 'Transcription d’algorithme', topics: ['pseudo‑code vers programme', 'comparaison des résultats'], acts: [
      match('Pseudo‑code ↔ Python', 'Associer des instructions de pseudo‑code à leur transcription en Python.', [
        ['Écrire(x)', 'print(x)'], ['x ← 5', 'x = 5'], ['Lire(n) (nombre entier)', 'n = int(input())'], ['Si a > b Alors', 'if a > b:'], ['Sinon', 'else:'],
      ]),
      fill('Complète le programme', 'Compléter le code d’un programme traduit d’un algorithme.', [
        ['Ligne 1 : a = int([[input|print|lire]]("a ? "))', 'input lit une saisie.'],
        ['Ligne 3 : s = a [[+|-|and]] b', 'Une somme utilise +.'],
        ['Ligne 4 : [[print|input|Ecrire]](s)', 'print affiche le résultat.'],
        ['Pour tester l’égalité en Python on écrit if a [[==|=|:=]] b:', '== compare, = affecte.'],
        ['Après le if et sa condition, on termine la ligne par [[:|;|.]]', 'Les deux‑points ouvrent le bloc.'],
      ]),
      quiz('Compare avec le résultat attendu', 'Réparer un programme pour qu’il produise le résultat attendu.', [
        ['Le programme doit afficher 10 pour a = 4 et b = 6. Quelle correction ?\na = 4\nb = 6\nprint(a * b)', ['Remplacer * par +', 'Remplacer print par input', 'Supprimer la variable b', 'Ajouter un #'], '4 × 6 = 24 mais on attend 4 + 6 = 10.'],
        ['Le programme doit afficher « Admis » pour note = 12. Quelle correction ?\nnote = 12\nif note >= 10\n    print("Admis")', ['Ajouter : à la fin de la ligne du if', 'Remplacer >= par =', 'Supprimer print', 'Mettre note entre guillemets'], 'La ligne du if doit se terminer par :'],
        ['Le programme doit afficher la moyenne de 8 et 12, soit 10. Quelle correction ?\nm = 8 + 12 / 2\nprint(m)', ['Ajouter des parenthèses : (8 + 12) / 2', 'Remplacer / par *', 'Supprimer print', 'Écrire 8 + 12 + 2'], 'La division est prioritaire sur l’addition.'],
        ['Le programme doit afficher 25. Quelle correction ?\nx = 5\nprint(x x)', ['Écrire x * x', 'Écrire x + x', 'Supprimer x', 'Écrire print(5, 5)'], 'Le carré de 5 s’obtient avec *.'],
        ['Le programme doit afficher 7 pour a = 3 et b = 4. Quelle correction ?\na = 3\nb = 4\nprint(a + c)', ['Remplacer c par b : la variable c n’existe pas', 'Remplacer a par 7', 'Supprimer b', 'Ajouter print(7)'], 'On ne peut utiliser que des variables déjà définies.'],
      ]),
      order('Mission finale : la moyenne', 'Transcrire l’algorithme de calcul de moyenne en un petit programme Python.', ['# Programme : moyenne de deux notes', 'n1 = float(input("Note 1 : "))', 'n2 = float(input("Note 2 : "))', 'moyenne = (n1 + n2) / 2', 'print("Moyenne :", moyenne)'], { eq: [[1, 2]], explain: 'Commentaire, lecture des deux notes (ordre indifférent), calcul, affichage.' }),
    ] },
  ],
};

function sim3(title, obj) {
  return {
    mech: 'sim:vending', title, objective: obj, data: {
      view: 'vending', cfg: { items: [['jus', 'Jus', 5, '🧃'], ['gateau', 'Gâteau', 3, '🍰'], ['eau', 'Eau', 2, '💧']] }, tasks: [
        ['Achète 2 jus (5 DH l’un), puis saisis le total à payer.', { jus: 2, gateau: 0, eau: 0, total: 10 }, 'total ← 5 × 2 = 10 DH.'],
        ['Achète 1 jus et 1 gâteau, puis saisis le total.', { jus: 1, gateau: 1, eau: 0, total: 8 }, 'total ← 5 + 3 = 8 DH.'],
        ['Achète 2 gâteaux et 3 eaux, puis saisis le total.', { jus: 0, gateau: 2, eau: 3, total: 12 }, 'total ← 2 × 3 + 3 × 2 = 12 DH.'],
        ['Achète 3 jus, 1 gâteau et 2 eaux, puis saisis le total.', { jus: 3, gateau: 1, eau: 2, total: 22 }, 'total ← 15 + 3 + 4 = 22 DH.'],
        ['Achète 1 jus, 2 gâteaux et 4 eaux, puis saisis le total.', { jus: 1, gateau: 2, eau: 4, total: 19 }, 'total ← 5 + 6 + 8 = 19 DH.'],
      ],
    },
  };
}
