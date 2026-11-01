# IMPLEMENTATION_PLAN — état réel, écarts, reprise

Dernière mise à jour : 31 octobre 2026.

## Ce qui est fait (vérifié)
| Phase | État | Preuve |
|---|---|---|
| 1 Socle (profils, stockage versionné, import/export, tableau de bord, navigation, réglages) | ✅ | tests unitaires + e2e |
| 2 Moteurs : association, tri, ordre, texte à trous, QCM, zones cliquables, assemblage, réseau, robot, interpréteur de pseudo-code, simulations (calcul, fenêtre, explorateur de fichiers, éditeur de texte/mise en forme/impression, tableur à formules, navigateur et moteur de recherche simulés, e-mail simulé, graphique, interrupteurs/diagnostic, distributeur) | ✅ | tests moteurs |
| 3–6 Contenu : 4 modules, 30 séances, 120 activités | ✅ implémentées | `CONTENT_MATRIX.md`, tests |
| 7 QA automatisée | ✅ partielle | `TEST_REPORT.md` |

## Écarts par rapport au cahier des charges (à lire)
1. **Pas de vraie 3D (Three.js / GLB).** L'« Explorateur d'ordinateur » libre (rotation, zoom, coupe, isolement de composant, mode guidé) du §7.1 **n'est pas réalisé**. Livré à la place : scène SVG à zones cliquables (séance 3, activité 1) et assemblage dans un boîtier en perspective CSS avec curseur de rotation (séance 3, activité 3), 100 % jouable au clavier. Le robot est en 2D. Aucun modèle 3D, donc aucun crédit d'actif 3D.
2. **Audit des « skills » Claude Code non réalisé** (§8) : aucun skill externe n'a été installé ni vérifié ; aucune affirmation sur leurs capacités. Le design a été fait directement (voir DESIGN.md).
3. **Prototype `InfoPlay_Maroc_Seance1.html` absent** du dossier fourni : non inspecté. La séance 1 du module 1 est refaite à partir de la spécification, avec stockage persistant.
4. **Relecture humaine des contenus : non faite.** Les contenus ont été rédigés puis validés **automatiquement** (structure, unicité des réponses, présence des explications, solvabilité des niveaux du robot et des programmes, solutions de chaque activité). Aucune relecture pédagogique ni linguistique par un enseignant : à faire avant usage (cases « Relecture humaine » de `CONTENT_MATRIX.md`).
5. **Découpage en séances** : repris de la spécification (proposition pédagogique à confronter à la progression de l'établissement).
6. **Langage du module 3 (séances 7–8)** : Python par défaut, configurable en modifiant `module-3.js`. Aucun code d'élève n'est exécuté : l'interpréteur de pseudo-code est une analyse syntaxique maison sans `eval`.
7. **Glisser-déposer** : disponible pour le tri uniquement ; ailleurs, interaction par clic/clavier (conforme à l'exigence d'alternative clavier).
8. **Navigateurs** : testé sur Chromium (Playwright) en mode hors ligne, ouvert en `file://`. **Non testé** sur Google Chrome/Edge sous Windows, ni le lanceur `.bat`/`serve.ps1`, ni la persistance après fermeture/réouverture complète du navigateur (seulement après rechargement de la page).
9. **Tests non faits** : régression visuelle, lecteur d'écran réel, mesure de performance sur PC modestes, tablette physique, tests d'utilisateurs.
10. **Sons ajoutés le 31 octobre 2026** : clic, survol facultatif, succès, erreur et activité parfaite, synthétisés localement avec Web Audio, avec bouton de coupure, volume et préférences par profil. Les badges restent à faire ; aucun classement public n'est prévu.
11. **Interactions enrichies le 31 octobre 2026** : animation de prise/dépôt des cartes, mise en valeur des zones de dépôt, traits animés entre associations, correction toujours différée jusqu’à « Vérifier », bouton Accueil flottant, et nouvel accueil portfolio en deux étapes. La vraie photo de Yacine reste à fournir ; un visuel local temporaire est installé.
11. Pas de validation « Étape précédente » dans les simulations ; chaque étape est évaluée une seule fois (un essai de l'activité entière se refait avec « Réessayer »).

## Plan de reprise
1. Tester `Lancer-InfoPlay.bat` et l'ouverture directe sur un poste Windows avec Chrome ; fermer/rouvrir Chrome et vérifier la persistance.
2. Faire relire les 120 activités (corrections, vocabulaire marocain, niveau de difficulté) ; cocher `CONTENT_MATRIX.md`.
3. Si la 3D est souhaitée : ajouter Three.js (copie locale) + modèles GLB libres de droits, écran « Explore ton ordinateur » (vue externe/interne, panneau latéral retiré, isolement, étiquettes FR), avec repli 2D existant. Prévoir licences dans `LICENSES.md`.
4. Ajouter, si besoin, glisser-déposer pour l'ordre et l'assemblage ; badges personnels ; sons sous-titrés.
5. Régression visuelle et audit avec lecteur d'écran (NVDA).
