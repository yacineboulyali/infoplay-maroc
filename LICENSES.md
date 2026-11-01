# LICENSES

## Code de l'application
Écrit pour ce projet (InfoPlay Maroc). Aucune bibliothèque tierce n'est embarquée dans `dist/app.js` : le JavaScript est du code maison, regroupé avec esbuild.

## Police embarquée (dans `dist/fonts/`)
- **Nunito** (Vernon Adams, Cyreal, Jacques Le Bailly) — licence **SIL Open Font License 1.1**, fournie via le paquet npm `@fontsource/nunito`. Fichiers woff2 latin et latin-ext (400, 700, 800). Texte de licence : `fonts/LICENSE-Nunito-OFL.txt`.

## Outils de développement (non livrés dans `dist/`)
esbuild (MIT), jsdom (MIT), axe-core (MPL-2.0), Playwright/Chromium (Apache-2.0, préinstallé dans l'environnement de développement).

## Images, icônes, sons
Aucune image externe ni son. Les scènes sont des **dessins SVG originaux** générés par le code (`src/games/scenes.js`). Les pictogrammes sont des émojis Unicode rendus par la police système de l'ordinateur (leur apparence varie selon Windows). Les noms de produits (Windows, Android, Linux, macOS, Python…) apparaissent seulement comme texte nominatif ; aucun logo n'est reproduit.

## Modèles 3D
Aucun modèle GLB/glTF ni Three.js : voir IMPLEMENTATION_PLAN.md (écart par rapport au cahier des charges).
