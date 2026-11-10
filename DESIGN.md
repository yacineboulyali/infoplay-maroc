# DESIGN — système visuel InfoPlay Maroc

**Intention** : moderne, chaleureux, lisible ; enfantin sans être puéril. Fond crème « zellige » discret, cartes blanches à bordure franche et ombre pleine (style « sticker »), accents colorés par module.

## Couleurs (jetons CSS dans `src/styles/main.css`)
| Rôle | Valeur | Usage |
|---|---|---|
| Encre | `#1c2340` | texte, bordures fortes |
| Primaire | `#2b3fc4` | actions principales, module 1 |
| Module 2 / 3 / 4 | `#0a7467` / `#c8431a` / `#6d3aa8` | cartes de modules |
| Or | `#f2b418` | focus, mise en avant |
| Succès / erreur | `#15703f` sur `#e2f4e9` / `#a8231b` sur `#fdeae8` | retours |
Le résultat n'est **jamais** signalé par la couleur seule (icônes ✔ ✖ et texte). L'audit automatique axe-core (WCAG 2.0/2.1 A et AA) ne relève aucune violation sur 18 écrans représentatifs ; il ne remplace pas un test avec lecteur d'écran.

## Typographie
Nunito (OFL), embarquée en woff2, accents français inclus ; corps 17 px (20 px en « texte plus grand »), titres 800, interligne 1,5. Code : Consolas / Cascadia Mono.

## Espacement, formes
Pas de 4/8 px, rayon 12–14 px, cibles tactiles ≥ 44 px, ombre pleine `0 3px 0` sur les boutons.

## Composants
Boutons (primaire, fantôme, danger), cartes, pastilles de statut, barres et anneaux de progression, onglets de niveaux, cartes à associer, zones de tri, liste d'ordre avec boutons ▲▼, listes déroulantes dans les phrases, scènes SVG cliquables, fenêtres de simulation, boîte de confirmation modale, notifications.

## Mouvement
120–350 ms pour les transitions courantes ; animation du robot pas à pas ; célébrations absentes par défaut. `prefers-reduced-motion` et le réglage « Réduire les animations » suppriment toute animation.

## Adaptation
Prévu pour 1366×768 et 1024×768 (vérifié par captures dans Chromium), mise en page fluide jusqu'à ~700 px.

## 2,5D et 3D
Assemblage de l'ordinateur : boîtier en perspective CSS pivotant (curseur) ; scènes SVG isométriques simples. **Pas de 3D réelle** (voir IMPLEMENTATION_PLAN.md).

## Thème v3 « sobre » (`src/styles/clean.css`)
Chargé en dernier, il remplace l'habillage « jeu » : mise en page pleine largeur, barre latérale fixe à partir de 1100 px (barre du haut + menu repliable en dessous), surfaces blanches à bordure fine, une seule couleur d'action (`#1d4ed8`), police système (Segoe UI), rayons 8–12 px, ombres légères, aucune animation décorative (inclinaison 3D, halos, pulsations, ondes). La barre d'action des activités est ancrée en bas de page. Contrôle : `node scripts/scan-layout.cjs` parcourt toutes les routes en 1440, 1024 et 390 px (débordements, chevauchements, textes coupés, erreurs JS).
