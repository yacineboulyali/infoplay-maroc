# Prompt Codex : icônes illustrées des parcours de l'accueil

Tu travailles dans le dépôt InfoPlay Maroc (application web hors ligne, JS sans framework, build esbuild avec `npm run build`).

## Contexte

Les 28 modules ont déjà leurs icônes illustrées. Le pipeline est en place :
- `output/module-icons-src/*.png` → `scripts/png-to-module-icon-webp.mjs` → `public/images/module-icons/*.webp` ;
- `scripts/sync-module-icons.mjs` génère `src/data/module-icons.js` (`MODULE_ICONS`) ;
- `src/utils/module-icon.js` : `moduleIcon(key, emoji, className)` affiche l'image et garde l'emoji en repli ;
- le test se trouve dans `tests/module-icons.test.mjs` ;
- la liste de référence est `output/missing-images/module-icons.jsonl`.

Sur l'accueil, les cartes M205 et EGTSI106 utilisent déjà `moduleIcon`. Les autres cartes ont encore une emoji, ce qui casse l'unité de la page : 1AC 🌱, 2AC 🌿, 3AC 🌳, Tronc commun 📚, Immersif 3D 🏝️, ainsi que les en-têtes de groupe Collège 🏫 et Lycée 🎓.

La liste des **7 icônes à produire** est dans `output/missing-images/parcours-icons.jsonl`, avec les mêmes champs que `module-icons.jsonl` : `key`, `parcours`, `emoji`, `tile`, `where`, `icon`.

Emplacements dans `src/app.js` :

| Élément | Code actuel | Remplacement |
|---|---|---|
| Cartes 1AC, 2AC, 3AC (`homeScreen`) | `h('span', { class: 'mode-ico' }, L.icon)` | `moduleIcon('parcours-' + L.code.toLowerCase(), L.icon, 'mode-ico')` |
| Carte Tronc commun | `h('span', { class: 'mode-ico' }, '📚')` | `moduleIcon('parcours-tc', '📚', 'mode-ico')` |
| Carte Immersif 3D | `h('span', { class: 'mode-ico' }, '🏝️')` | `moduleIcon('parcours-3d', '🏝️', 'mode-ico')` |
| En-tête groupe Collège | `h('span', { class: 'track-ico' }, '🏫')` | `moduleIcon('groupe-college', '🏫', 'track-ico')` |
| En-tête groupe Lycée | `h('span', { class: 'track-ico' }, '🎓')` | `moduleIcon('groupe-lycee', '🎓', 'track-ico')` |
| Titre `#/college/<n>` | `` `${L.icon} Informatique — ${L.code}` `` | `h1.module-heading` + `moduleIcon('parcours-' + L.code.toLowerCase(), L.icon, 'module-heading-icon')` + `h('span', null, 'Informatique — ' + L.code)` |
| Titre `#/dash` | `'📚 Informatique — Tronc commun'` | même schéma avec `parcours-tc` |

Ne touche pas aux emoji du fil d'Ariane (`crumbs`, `homeStep`) ni au bouton `🏝️ Monde 3D` de la page d'atterrissage : elles font partie de textes courts.

## Tâche

### 1. Générer les 7 icônes

Reprends **exactement le même style** que les icônes de module : même prompt de base (ci-dessous), même tuile, même trait, même cadrage. Ouvre `public/images/module-icons/m24.webp`, `m205.webp` et `egtsi106.webp` pour comparer. Enregistre chaque image dans `output/module-icons-src/<key>.png` (au moins 1024×1024), en remplaçant `<tile>` par la couleur de la ligne :

> Flat illustrated app-style icon for a school computing game. A rounded-square tile filled with a soft tint of <tile>, with a thin darker <tile> border, centred on a plain cream background (#fffaf0). Inside the tile, ONE bold, simple object drawn with thick navy-blue outlines and flat pastel fills (blue, teal, plus the tile colour as accent), light flat shading. Large shapes, very few details, perfectly readable at 40 px. Hand-drawn textbook style matching a cartoon illustration set, never photorealistic, never 3D, no gradients-heavy glossy effect. Absolutely no text, letters, digits or watermark. No brand logos. Object: `<icon>`

Règles :
- **Série 1AC → 2AC → 3AC** : les trois icônes gardent l'idée actuelle d'une plante qui grandit (pousse, jeune plante, arbre). Mets-les côte à côte : la progression doit se voir au premier coup d'œil, et les trois doivent rester distinctes à 40 px.
- **Pas de confusion avec les modules** : `parcours-tc` doit se distinguer de `m1` à `m4`, et `groupe-lycee` de `parcours-tc` (chapeau sur laptop d'un côté, pile de livres de l'autre).
- `parcours-3d` reste un dessin plat avec une légère profondeur, jamais un rendu 3D.
- Si une icône contient du texte, un logo ou un rendu 3D, ou si elle est illisible à 40 px, régénère-la.

### 2. Convertir et indexer

- Lance `node scripts/png-to-module-icon-webp.mjs` : il produit les 7 WebP 256×256 dans `public/images/module-icons/`.
- Modifie `scripts/sync-module-icons.mjs` pour qu'il lise `module-icons.jsonl` **et** `parcours-icons.jsonl`, puis relance-le : `MODULE_ICONS` doit compter 35 entrées.
- Mets à jour `tests/module-icons.test.mjs` : il doit lire les deux JSONL et vérifier les 7 nouvelles clés, en plus de ce qu'il vérifie déjà.

### 3. Brancher et ajuster le CSS

- Fais les remplacements du tableau ci-dessus (importe `moduleIcon` dans `src/app.js` si besoin ; il y est déjà).
- `.mode-ico.module-icon img` existe déjà (56 px) : vérifie que les 5 cartes Collège/Lycée ont la même taille que M205 et EGTSI106.
- Ajoute `.track-ico.module-icon` : la boîte `.track-ico` fait 48×48 avec un fond blanc et une bordure (`src/styles/home.css`). Avec une image, retire le fond, la bordure et le padding pour que la tuile illustrée la remplace (`img` en 48×48, `border-radius:14px`).
- Carte Immersif 3D : `.mode-immersive .mode-ico` a une animation `mode-bob` et une ombre (`src/styles/main.css`). Garde l'animation sur l'icône, mais vérifie que l'ombre ne salit pas l'image. Retire le `filter` si nécessaire. `clean.css` désactive l'animation : ne change pas ce comportement.

### 4. Vérifier

```bash
node scripts/png-to-module-icon-webp.mjs
node scripts/sync-module-icons.mjs
npm run build
npm test
```

Ouvre l'application (`node scripts/lan-server.mjs`, port 8765, `?test=1`) :
- **accueil** en largeur bureau puis mobile (375 px) : plus aucune emoji dans `.mode-ico` ni `.track-ico` (le groupe OFPPT garde son logo), et les 7 cartes de parcours ont des icônes de même taille et de même style ;
- **titres** de `#/college/1`, `#/college/2`, `#/college/3` et `#/dash` : icône 40 px alignée avec le texte ;
- **débordement** : aucun débordement horizontal en mobile.

Fais une capture de l'accueil (sections Collège et Lycée) en bureau et en mobile. Fais aussi une planche des 7 nouvelles icônes à côté de `m24`, `m205` et `egtsi106` à 48 px, que tu enregistres dans `output/parcours-icons-review.png`.

## Livrables

- 7 PNG dans `output/module-icons-src/` et 7 WebP dans `public/images/module-icons/`
- `src/data/module-icons.js` régénéré (35 entrées), `scripts/sync-module-icons.mjs` et `tests/module-icons.test.mjs` mis à jour
- les remplacements dans `src/app.js` et le CSS
- `dist/` reconstruit
- un commit en français : « Ajoute les icônes illustrées des parcours de l'accueil »

Résume à la fin : les icônes générées, celles régénérées et pourquoi, le résultat de `npm test`, et les emoji de parcours qui restent volontairement (fil d'Ariane, bouton Monde 3D).
