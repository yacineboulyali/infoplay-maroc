# Prompt Codex : remplacer les emoji restantes par des images cohérentes

Tu travailles dans le dépôt InfoPlay Maroc (application web hors ligne, JS sans framework, build esbuild avec `npm run build`).

## Contexte

Un relevé automatique a été fait sur 40 écrans de `dist/` (accueil, tableaux de bord, modules, séances, bilans, une activité de chaque mécanique, M205, révision, défi, EGTSI106, multijoueur, course, suivi, progrès, données). Il trouve encore environ 150 emoji affichées. Ce qui est déjà fait :
- vignettes des activités : `ACTIVITY_CARDS` ;
- icônes des 28 modules : `MODULE_ICONS` et `moduleIcon(key, emoji, className)` dans `src/utils/module-icon.js`.

Ce prompt traite **tout le reste** en lots indépendants. Fais un commit par lot, dans l'ordre. Si un lot échoue, continue avec le suivant et signale-le à la fin.

| Lot | Contenu | Images à générer | Liste de travail |
|---|---|---|---|
| A | Réutiliser les icônes existantes | 0 | (ce document) |
| B | Parcours de l'accueil | 7 | `parcours-icons.jsonl` + `CODEX_PROMPT_parcours-icons.md` |
| C | Logo et outils (révision, défi, quêtes, multijoueur, course, suivi, progrès, carte) | 10 | `ui-icons-tools.jsonl` |
| D | Badges | 13 | `ui-icons-badges.jsonl` |
| E | Objets des simulations | 15 | `ui-icons-sims.jsonl` |
| F | Avatars du multijoueur | 18 | `ui-icons-avatars.jsonl` |
| G | Personnages et lieux des « situations de départ » | 86 | `ui-icons-situations.jsonl` |
| H | Boutons et repères d'interface : SVG, pas d'image | 0 | (ce document) |

Toutes les listes sont dans `output/missing-images/`. Chaque ligne contient au minimum `key`, `style`, `emoji` (repli actuel), `where` (emplacements) et `icon` (objet à dessiner). Pour le lot G, elle contient `who`, `text`, `parcours`, `session` et `route` à la place de `icon`.

## Pipeline commun (à créer une fois, au début du lot C)

Généralise le pipeline des icônes de module :
1. Les sources vont dans `output/ui-icons-src/<key>.png` (au moins 1024×1024).
2. `scripts/png-to-ui-icon-webp.mjs` les convertit en `public/images/ui-icons/<key>.webp` en 256×256, fond `#fffaf0` (transparent pour les styles `AVATAR` et `SITUATION` si l'image a un détourage propre ; sinon fond crème), qualité 0.9. Prends `scripts/png-to-module-icon-webp.mjs` comme modèle.
3. `scripts/sync-ui-icons.mjs` génère `src/data/ui-icons.js` (`export const UI_ICONS = {...}`). Il lit tous les fichiers `output/missing-images/ui-icons-*.jsonl` et affiche, lot par lot, les clés dont le WebP manque.
4. Dans `src/utils/ui-icon.js`, crée `uiIcon(key, emoji, { className, size, alt })`. Elle fonctionne comme `moduleIcon` : un `span` avec une `img` (`alt=""` et `aria-hidden` par défaut), et un `onerror` qui remet l'emoji. Le `size` pose `width` et `height`.
5. Crée `tests/ui-icons.test.mjs` : chaque clé de chaque JSONL est indexée, chaque chemin existe, aucune clé inconnue.

## Styles de génération

Tous les styles commencent par la même base, qu'il faut toujours garder :

> Hand-drawn textbook illustration style matching a cartoon set for a school computing game: thick navy-blue outlines, flat pastel fills (blue, teal and one accent colour), light flat shading. Never photorealistic, never 3D. Absolutely no text, letters, digits or watermark. No brand logos. Moroccan context when natural, diverse characters, no stereotypes, no fez/tarbouche.

Puis ajoute la phrase du style de la ligne, et termine par `Object: <icon>` :

- **TILE** (logo, outils) : `Flat app-style icon: a rounded-square tile filled with a soft tint of <tile>, thin darker border, centred on a plain cream background (#fffaf0); ONE bold simple object inside, readable at 32 px.` C'est exactement le style des icônes de module : compare avec `public/images/module-icons/m24.webp`.
- **BADGE** (badges) : `Round medallion badge: a circular gold-rimmed medal with a soft coloured centre and a small ribbon at the bottom, ONE bold simple symbol in the centre, readable at 40 px, plain cream background.` Les 13 badges doivent former une collection homogène (même médaillon, même ruban) et différer seulement par le symbole et la couleur du centre.
- **OBJECT** (objets des simulations) : `Single object sticker: ONE object, no tile, no background scene, thin cream outline around the object, on a plain cream background (#fffaf0), readable at 28 px.`
- **AVATAR** (multijoueur) : `Round avatar: a circular badge with a soft pastel background, the character head centred and filling 80 % of the circle, readable at 32 px.` Les 18 avatars : même cadrage, chaque animal avec sa propre couleur de fond.
- **SITUATION** (lot G) : `Round portrait avatar for a story card: a circular frame with a soft pastel background, ONE main subject centred, readable at 56 px.` La scène est décrite ci-dessous, au lot G.

Règles communes :
- Si une image contient du texte, un logo, un rendu 3D, ou si elle est illisible à sa taille d'affichage, régénère-la.
- Le travail peut être repris : ne régénère pas un PNG existant et conforme.
- Après chaque lot, fais une planche de toutes ses images à leur taille réelle d'affichage et enregistre-la dans `output/ui-icons-review-<lot>.png`.

---

## Lot A : réutiliser les icônes existantes (aucune génération)

| Emplacement | Code actuel | Remplacement |
|---|---|---|
| `#/progres`, titres `h2` de chaque module (`src/app.js`, `progressScreen`, vers la ligne 901) | `` `${m.icon} ${...} — ${m.title}` `` | `moduleIcon('m' + m.id, m.icon, 'progress-mod-icon')` en 32 px + texte sans emoji. Pour M205, utilise la clé `m205`. |
| Page activité, pastille `span.act-kind` (`src/app.js`, vers la ligne 817) | `` `${m.icon} ${KIND} · Module · Séance` `` | icône du module en 20 px (`moduleIcon('m' + mi, m.icon, 'act-kind-icon')`, ou `m205` si `isPro(mi)`) + texte sans emoji |
| EGTSI106, avatar de mission `span.mb-ava` (`src/egtsi106/screen.js:119`) | `ICONS[i]` | `moduleIcon('egtsi106-s' + (i + 1), ICONS[i], 'mb-ava')` |

CSS : `.progress-mod-icon img{width:32px;height:32px}`, `.act-kind-icon img{width:20px;height:20px;border-radius:6px}` aligné sur le texte, et `.mb-ava.module-icon` sans fond blanc avec `img` en 54 px arrondie. Commit : « Réutilise les icônes de module dans le progrès, les activités et EGTSI106 ».

## Lot B : parcours de l'accueil (7 images)

Exécute `output/missing-images/CODEX_PROMPT_parcours-icons.md` tel quel s'il n'a pas encore été fait : vérifie si `public/images/module-icons/parcours-1ac.webp` existe. Ce lot reste dans `MODULE_ICONS` et non dans `UI_ICONS`.

## Lot C : logo et outils (10 images, style TILE)

Liste : `ui-icons-tools.jsonl`. Branchement avec `uiIcon` :

| Clé | Emplacements (champ `where`) | Taille |
|---|---|---|
| `logo-infoplay` | `span.logo` de l'en-tête (`src/app.js:125`) | 30 px, en gardant le fond et l'arrondi de `.brand .logo`, ou en les remplaçant par l'image si elle est plus nette. Vérifie les 3 thèmes CSS (`main.css`, `theme.css`, `clean.css`). |
| `tool-revision`, `tool-defi` | `span.pt-ico` des cartes outils, `h1` de `#/pro/revision` et `#/pro/defi`, `q-ico` des quêtes `rev` et `defi`, boutons qui commencent par 🧠 ou ⚡ | `pt-ico` 44 px, `h1` 40 px (classe `module-heading`), `q-ico` 28 px, boutons 20 px |
| `tool-quetes` | `h2` « Quêtes du jour » (`src/pro/screens.js:30`) | 28 px |
| `tool-objectif` | `q-ico` de la quête `act` | 28 px |
| `tool-multijoueur`, `tool-course`, `tool-suivi` | `h1` de `#/multijoueur`, `#/course`, `#/suivi` ; `h2` « Course chronométrée » ; bouton « Lancer la course » ; `span.finish` | `h1` 40 px, `h2` 28 px, bouton 20 px |
| `tool-progres` | boutons « 📊 Mon progrès » (`src/app.js:524` et `584`), `h1` de `#/progres` | bouton 20 px, `h1` 40 px |
| `tool-carte` | tous les `h2.section-h` « 🗺️ Carte des compétences » (`src/app.js`, `src/pro/screens.js`, `src/egtsi106/screen.js`) | 28 px |

Les quêtes affichent ✅ quand elles sont faites : garde ce comportement, ou remplace-le par `semanticIcon` `check`. Commit : « Remplace les emoji du logo et des outils par des icônes illustrées ».

## Lot D : badges (13 images, style BADGE)

Liste : `ui-icons-badges.jsonl`. `BADGES` (`src/fx/game.js`) et `PRO_BADGES` (`src/pro/engine.js`) partagent les mêmes `id`, sauf `module`, qui est un trophée 🏆 au collège/lycée et un certificat 🎓 en M205 : pour M205, utilise la clé `badge-module-pro`.
- Ajoute un champ `art: 'badge-<id>'` à chaque badge, en gardant `icon` comme repli.
- Repère tous les endroits qui affichent `b.icon` ou `badge.icon` (`grep -rn "\.icon" src/fx src/app.js src/pro`), au minimum `src/fx/popup.js:144` (`span.ach-ic`), et utilise `uiIcon(b.art, b.icon, ...)` : 48 px dans la fenêtre « Badge débloqué », 40 px dans les grilles de badges.
- Un badge verrouillé, s'il est affiché, garde l'image en niveaux de gris (`filter:grayscale(1);opacity:.5`).
- Pastille de série `span.ghud-chip` 🔥 : utilise `badge-streak3` en 18 px.

Commit : « Remplace les emoji des badges par des médailles illustrées ».

## Lot E : objets des simulations (15 images, style OBJECT)

Liste : `ui-icons-sims.jsonl`.
- **Schéma fonctionnel** (`src/games/sims.js`, vers les lignes 37 à 45) : les titres `h4` « ⌨ Entrée », « ⚙ Traitement », « 💽 Stockage », « 🖥 Sortie » prennent `sim-entree`, `sim-traitement`, `sim-stockage` et `sim-sortie` en 28 px, sans emoji dans le texte. L'affichage `output.disk` « 💾 » prend `sim-stockage`.
- **Distributeur** (`vending`) et **interrupteurs réseau** (`toggles`) : les éléments sont définis dans les données (`ctx.cfg.items`, quatrième ou troisième champ = emoji). Ajoute un champ `art` dans les données des activités concernées (`m3-s3-a4`, `m4-s1-a4`, `m4-s4-a4`, `m21-s2-a3` ; trouve leur source avec `grep -rn "Mission distributeur\|Mission diagnostic\|le réseau de la classe" src/data`). Fais ensuite afficher `uiIcon(art, emoji)` à `span.ico`, en 32 px. Les trois « Câble du PC » utilisent la même clé `sim-cable-pc`.
- Ne change ni le texte, ni la logique, ni la notation des simulations.

Commit : « Remplace les emoji des simulations par des objets illustrés ».

## Lot F : avatars du multijoueur (18 images, style AVATAR)

Liste : `ui-icons-avatars.jsonl`. `AVATARS` (`src/multiplayer/screens.js:9`) contient 18 emoji, et l'index de l'emoji sert à attribuer l'avatar. Garde le tableau, l'ordre et la fonction d'attribution ; ajoute seulement une table `avatar-01` à `avatar-18`, à l'index correspondant. Remplace l'affichage dans `span.peer-avatar` (48 px), `span.ava` (#/suivi et #/course, 32 px) et `span.runner` de la course (32 px, garde l'animation `left` et l'ombre). L'avatar circule sur le réseau local sous forme d'emoji : **ne change pas le protocole**. Convertis l'emoji en image au moment de l'affichage seulement ; une emoji inconnue reste une emoji.

Commit : « Remplace les avatars emoji du multijoueur par des avatars illustrés ».

## Lot G : situations de départ (86 images, style SITUATION)

Liste : `ui-icons-situations.jsonl`, une ligne par séance qui a une situation de départ (Collège 1AC, 2AC, 3AC et M205). Elle s'affiche dans `span.mb-ava` (`src/app.js:696`, 54 px) à gauche du texte de la situation. **L'image doit illustrer le `who` dans le contexte du `text`.** Écris toi-même le champ `Object:` à partir de ces deux champs en suivant ces règles :

1. **`who` est une personne** (élève, professeur, directeur, technicien, cousin, assistante, responsable…) : portrait en buste de cette personne, avec **un objet du `text`** qui dit sa situation. Exemples : le technicien tient un câble réseau ; Nadia, assistante administrative, est devant un document Word ; le professeur de SVT tient une feuille d'arganier.
2. **`who` est un lieu, un groupe ou un objet** (« La salle d'informatique », « Le club environnement », « La facture de l'épicerie », « La tortue Logo », « Le zellige du collège »…) : dessine ce lieu ou cet objet, cadré serré, avec le détail clé du `text`.
3. **Personnages récurrents** : Salma, Amine, Hamza et Nadia doivent garder la même apparence partout où ils reviennent, y compris dans les vignettes d'activités existantes (`public/images/activity-cards/`) quand ils y figurent. Génère d'abord leur portrait de référence, puis réutilise-le comme référence.
4. **Ne donne jamais la réponse** d'une activité de la séance. Exemple : pour « La grille des notes », pas de moyenne écrite.
5. **Variété** : deux séances qui partageaient la même emoji (🗂️, 🎨, 🏫, 🔐…) doivent avoir des images différentes, chacune fidèle à son propre `text`.
6. **Contexte** : Maroc (collège public, coopérative, souk, médina, administration, entreprise) quand c'est naturel ; tenues ordinaires et variées ; pas de fez.

Branchement : `uiIcon('sit-m' + mi + '-s' + si, s.situation.ico, { className: 'mb-ava' })`. CSS : `.mb-ava.ui-icon` sans fond ni ombre, `img` ronde de 54 px (44 px sous 480 px). Contrôle au moins 12 séances réparties sur les 4 parcours (`route` dans la liste). Pour ce lot, fais **une planche par parcours** (1AC, 2AC, 3AC, M205), chaque image accompagnée de son `who`.

Commit : « Illustre les situations de départ des séances ».

## Lot H : boutons et repères d'interface, en SVG et non en image

Ces emoji sont des symboles d'action ou d'état de petite taille (14 à 20 px). Une image générée y serait floue et incohérente. Remplace-les par les icônes SVG de `src/utils/semantic-icons.js` (`semanticIcon(name)`), qui suivent `currentColor`. Ajoute les symboles manquants (`user`, `sound`, `play`, `timer`, `bolt`, `pencil`, `target`, `pin`, `bulb`) dans le même format : trait de 24×24, sans remplissage.

| Emoji | Où | SVG |
|---|---|---|
| 👤 « Changer l'utilisateur », 🔊 son | en-tête, toutes les pages | `user`, `sound` |
| ▶ Continuer / Exécuter / Tester / Commencer | boutons | `play` |
| ⬇ ⬆ Exporter / Importer, 🖨 Imprimer, 💾 Enregistrer, ✉ Envoyer, 📎 Joindre | boutons | `download`, `upload`, `print`, `save`, `mail`, `link` |
| 📁 📄 🗑 📋 ✂ ✏ ↩ dans le simulateur de fichiers (`fsrow`, `fsbin`, boutons) | m2 s3 a4 et activités du même type | `folder`, `document`, `trash`, `copy`, `scissors`, `pencil`, `history` |
| 🔗 🔢 🗂️ dans `span.banner-badge`, 🎯 dans `q-mode-badge` | bandeau des activités | `match`, `order`, `sort`, `target` |
| 💡 indice, ⏱ `span.chrono`, ⚡ du HUD, ✔ Vérifier | activités | `bulb`, `timer`, `bolt`, `check` |
| 📘 📌 🎯 libellés EGTSI (`egtsi-kicker`, `À retenir`, `egtsi-acts-label`) | `src/egtsi106/screen.js` | `document`, `pin`, `target` |
| 🔒 « À valider » / « Certificat » | pastilles | `lock` |

Commit : « Remplace les emoji des boutons et repères par des icônes SVG ».

## À garder tel quel (ne pas modifier)

- **Fil d'Ariane** (`span.chev-ico` : 🏠 📚 🏫 📖 🎯 💼 🖥️ 🧠 📊 📘) : ce sont de courts repères de texte. Tu peux les remplacer par `moduleIcon`/`uiIcon` en 16 px seulement si le rendu reste net et aligné ; sinon, laisse-les.
- **Niveaux de maîtrise** ⚪ 🟡 🟠 🟢 (`pp-n`, légendes) : c'est un code couleur doublé d'un libellé, à garder.
- **Réactions du multijoueur** 👋 ⭐ 🎮 🔥 🚀 : l'emoji est le message lui-même.
- **Contenu pédagogique** : la direction ▶ du robot, ❄ ⚡ dans le schéma de la carte mère, ↔ client/serveur, ✔/✖ de l'état du réseau, médailles 🥇 et vies ❤️ du défi et de la course.
- **Simulateur Office du M205** (icônes du ruban 💾 ↶ ↷ 📁 📐 🎨…) : il imite volontairement l'interface réelle.
- La page d'atterrissage (pastilles, bouton « 🏝️ Monde 3D »), le pied de page ©, et `immersive.html` (hors périmètre).

## Vérification finale

```bash
node scripts/png-to-ui-icon-webp.mjs
node scripts/sync-ui-icons.mjs
npm run build
npm test
```

Ensuite :
1. Refais un relevé des emoji visibles sur les mêmes 40 écrans, en bureau et en mobile (375 px). Pars de cette méthode : parcourir `#/profils`, `#/dash`, `#/college/1..3`, `#/m/1`, `#/m/24`, des séances, des bilans, une activité par mécanique, `#/pro`, `#/pro/revision`, `#/pro/defi`, `#/egtsi106` et une séance et une leçon, `#/multijoueur`, `#/course`, `#/suivi`, `#/progres`, `#/donnees`, puis lister les nœuds texte qui contiennent `\p{Extended_Pictographic}`.
2. Le relevé ne doit plus contenir que les emoji de la section « À garder tel quel ».
3. Vérifie qu'aucune image n'est cassée (`naturalWidth > 0`) et qu'il n'y a aucun débordement horizontal en mobile.
4. Fais des captures de `#/pro`, d'une séance 2AC avec sa situation, de `#/multijoueur` et de la fenêtre « Badge débloqué ».

## Résumé attendu

Pour chaque lot : le nombre d'images générées et régénérées (avec la raison), le commit, et ce qui n'a pas pu être fait. Donne ensuite le résultat de `npm test`, la liste des emoji qui restent, avec leur justification, et les 4 portraits de référence des personnages récurrents.
