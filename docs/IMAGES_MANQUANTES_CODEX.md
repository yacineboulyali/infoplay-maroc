# Images manquantes : titres de catégorie des activités « Classer »

Inventaire du 2026-11-18, destiné à Codex pour poursuivre le travail. Le **§ 7** contient un prompt prêt à copier.

## 1. Constat

Un scan de toutes les activités (M1 à M4, EGTSI106, M205), rendues dans Chromium, ne trouve plus d'image manquante dans les éléments que l'audit couvre déjà : cartes, options, étapes, étiquettes, phrases à compléter. Il reste **une zone non couverte** : les **titres de catégorie** des activités « Classer ». Il y en a **71 libellés uniques** dans **27 activités**.

Cause, dans `src/games/basic.js` (fonction `sortGame`, vers la ligne 327) :

```js
h('span', { class: 'bucket-title-box' }, d.categoryPicture?.(c) || semanticIcon(c), h('b', null, c), countBadge)
```

Seul EGTSI106 fournit `categoryPicture`. Ailleurs, le titre reçoit toujours le pictogramme `semanticIcon`, même quand une image existe déjà pour ce libellé. Ce pictogramme ne porte pas de `data-label-key` : c'est pour cela que `scripts/audit-missing-images.cjs` ne le signale pas.

| Parcours | Titres sans image | À réutiliser (§ 3) | À générer (§ 4) |
|---|---|---|---|
| Module 1 | 8 | 4 | 4 |
| Module 2 | 8 | 2 | 6 |
| Module 3 | 9 | 2 | 7 |
| Module 4 | 10 | 4 | 6 |
| M205 | 36 | 6 | 30 |
| EGTSI106 | 0 (`categoryPicture` déjà en place ; seul « Entrée » garde son pictogramme, voir § 5) | 0 | 0 |
| **Total** | **71** | **18** | **53** |

Éléments écartés volontairement :
- les questions de QCM (seules les options portent une image) ;
- le verso des cartes mots clés d'EGTSI106 (le recto a l'image) ;
- les légendes des zones à repérer (le schéma est l'image).

## 2. Intégration (code, à faire une seule fois)

1. Dans `src/utils/item-visuals.js`, ajouter et exporter `categoryVisual(label)`. Elle essaie, dans cet ordre :
   1. `CATEGORY_IMAGES` : une table explicite `libellé normalisé → chemin d'image`, remplie avec les correspondances « proches » du § 3, plus l'entrée « Entrée » du § 5 ;
   2. `labelIllustration(label)`, sauf pour la clé ambiguë `lbl-0891ea66` (« Entrée ») ;
   3. la table `images` déjà présente dans ce fichier (images d'élèves du même libellé, avec la règle « sans article ») ;
   4. sinon, `semanticIcon(label)` en lui ajoutant `dataset.labelKey = labelKey(label)`, pour que l'audit voie le manque.
2. Dans `src/games/basic.js`, remplacer `d.categoryPicture?.(c) || semanticIcon(c)` par `d.categoryPicture?.(c) || categoryVisual(c)`.
3. Dans `scripts/audit-missing-images.cjs`, ajouter `.bucket-head` au relevé : le titre de catégorie doit contenir une image.
4. Vérifier l'affichage : `npm run build`, ouvrir par exemple `#/m/4/s/2/a/1` et `#/m/205/s/11/a/1`, contrôler que les titres sont lisibles et que l'image tient dans `.bucket-title-box` (ajuster la taille en CSS si besoin). Lancer ensuite `npm test`.

## 3. Images déjà présentes dans le projet, à réutiliser (18)

Ne rien générer pour ces titres.
- **Identique (même clé lbl)** : `labelIllustration` trouvera l'image dès que l'étape 2.1 sera en place.
- **Identique (même libellé…)** : la table `images` la trouvera.
- **Proche** : ajouter l'entrée dans `CATEGORY_IMAGES`.

Chaque image a été vérifiée à l'œil pour le sens.

| Parcours | Titre | Image à utiliser | Type de correspondance | Activité |
|---|---|---|---|---|
| 1 | Information | `images/student-illustrations/m1-s1-a1-q01-881dbb0d8a.webp` | identique (même libellé dans une autre activité) | `m1-s1-a2` Information ou traitement ? |
| 1 | Traitement | `images/student-illustrations/m1-s1-a1-q02-6eb1d8dc12.webp` | identique (même libellé dans une autre activité) | `m1-s1-a2` Information ou traitement ?<br>`m1-s2-a1` Construis le schéma |
| 1 | Sortie | `images/label-illustrations/lbl-9a0d3db7.webp` | identique (même clé lbl) | `m1-s2-a1` Construis le schéma<br>`m1-s3-a2` Classe les périphériques |
| 1 | Entrée et sortie | `images/label-illustrations/lbl-29df28d3.webp` | identique (même clé lbl) | `m1-s3-a2` Classe les périphériques |
| 2 | Édition | `images/label-illustrations/lbl-53685671.webp` | identique (même clé lbl) | `m2-s4-a3` Édition, mise en forme ou insertion ? |
| 2 | Insertion | `images/label-illustrations/lbl-8c28eaee.webp` | identique (même clé lbl) | `m2-s4-a3` Édition, mise en forme ou insertion ? |
| 3 | Constante | `images/student-illustrations/m3-s1-a1-q05-7ed450fc1a.webp` | identique (même libellé dans une autre activité) | `m3-s1-a2` Constante ou variable ? |
| 3 | Variable | `images/student-illustrations/m3-s1-a1-q04-c60cb11f75.webp` | identique (même libellé dans une autre activité) | `m3-s1-a2` Constante ou variable ? |
| 4 | LAN | `images/student-illustrations/m4-s2-a2-q01-17eae0beab.webp` | identique (même libellé dans une autre activité) | `m4-s2-a1` LAN, MAN ou WAN ? |
| 4 | MAN | `images/student-illustrations/m4-s2-a2-q02-09f45feb16.webp` | identique (même libellé dans une autre activité) | `m4-s2-a1` LAN, MAN ou WAN ? |
| 4 | WAN | `images/student-illustrations/m4-s2-a2-q03-453148c8f6.webp` | identique (même libellé dans une autre activité) | `m4-s2-a1` LAN, MAN ou WAN ? |
| 4 | Protection | `images/label-illustrations/lbl-1b8805fa.webp` | identique (même clé lbl) | `m4-s7-a1` Avantage, risque ou protection ? |
| 205 | Modèle | `images/label-illustrations/lbl-64219efb.webp` | proche, validé visuellement : « Modèle (.potx) » : un gabarit qui se décline en plusieurs documents | `m205-s3-a2` Range les besoins |
| 205 | Lien | `images/student-illustrations/m4-s5-a2-q03-1cf4537301.webp` | proche, validé visuellement : « Lien hypertexte » (M4) | `m205-s10-a1` Lien, objet ou macro ? |
| 205 | Courbe (évolution) | `images/label-illustrations/lbl-d5cd3a9d.webp` | identique sans parenthèses/article | `m205-s11-a1` Quel graphique pour quelle question ? |
| 205 | Trier | `images/student-illustrations/m1-s1-a2-q07-e8a21789df.webp` | proche, validé visuellement : « Trier des noms par ordre alphabétique » (M1) | `m205-s12-a1` Trier, filtrer ou transposer ? |
| 205 | Filtrer | `images/label-illustrations/lbl-3cb33f81.webp` | identique (même clé lbl) | `m205-s12-a1` Trier, filtrer ou transposer ? |
| 205 | Transposer | `images/label-illustrations/lbl-3ff25136.webp` | identique (même clé lbl) | `m205-s12-a1` Trier, filtrer ou transposer ? |

Rapprochements examinés **et rejetés** (à générer) :
- « Présenter » → `lbl-65b304f5` : simple grille de formes ;
- « Protéger » → `lbl-c248b900` : feuille Excel, alors qu'en M205 s8 on protège un document Word ;
- « Source de données (variable) » → image « Variable » du M3 : variable de programmation, pas une source de publipostage ;
- « Entrée » → `lbl-0891ea66` : touche du clavier, pas l'entrée de données (voir § 5) ;
- « Mise en forme », « Style », « Colonnes », « Valeurs », « Animation », « Service d'Internet » : seules les images de libellés plus longs et d'un autre sens existent.

## 4. Images à générer avec imagegen (53)

Une image par ligne, enregistrée exactement sous `public/images/label-illustrations/<clé>.webp`. La clé vaut `labelKey(libellé)` (`src/utils/label-key.js`) : ne jamais la modifier.
Les catégories d'une même activité doivent rester **visuellement distinctes entre elles**. La colonne « Classée face à » donne les autres catégories de l'activité.

### Module 1 (4)

| Clé / fichier | Titre | Activité | Classée face à | Exemples d'éléments classés dedans | Prompt imagegen |
|---|---|---|---|---|---|
| `lbl-251be805` | Entrée | `m1-s2-a1` Construis le schéma<br>`m1-s3-a2` Classe les périphériques | Traitement · Sortie · Stockage | Clavier ; Souris ; Scanner | A hand typing on a keyboard and a mouse, with a bold arrow flowing INTO a computer tower: data entering the computer (input), not a single keyboard key. |
| `lbl-7d11e88c` | Stockage | `m1-s2-a1` Construis le schéma<br>`m1-s3-a2` Classe les périphériques | Entrée · Traitement · Sortie | Disque dur / SSD ; Clé USB ; Clé USB | A hard drive, an SSD and a USB stick placed together on a shelf-like base, with a folder going into them: keeping data for later. |
| `lbl-398d17d5` | Logiciel de base | `m1-s4-a2` Classe les logiciels | Logiciel d’application | Windows ; Linux ; Android | A computer screen showing a generic operating-system desktop (taskbar, window frames, no logo), with gears underneath as the foundation layer. |
| `lbl-20ac9a8c` | Logiciel d’application | `m1-s4-a2` Classe les logiciels | Logiciel de base | Microsoft Word ; Microsoft Excel ; Navigateur web | Three generic app windows (document page, spreadsheet grid, web browser frame) floating above a laptop, each a tool for a task. |

### Module 2 (6)

| Clé / fichier | Titre | Activité | Classée face à | Exemples d'éléments classés dedans | Prompt imagegen |
|---|---|---|---|---|---|
| `lbl-267b6d41` | Rôle du système d’exploitation | `m2-s1-a3` Classe les responsabilités | Rôle d’une application | Gérer la mémoire vive ; Lancer et arrêter les programmes ; Gérer les fichiers et dossiers | A friendly conductor figure inside a computer coordinating memory chips, folders and program windows with arrows: the system managing resources. |
| `lbl-87a1ae56` | Rôle d’une application | `m2-s1-a3` Classe les responsabilités | Rôle du système d’exploitation | Rédiger une lettre ; Calculer une moyenne ; Naviguer sur un site web | A student at a desk using a computer to write a letter: a single document window open, focused on a user task. |
| `lbl-bcf84ed5` | Dossier Maths | `m2-s3-a3` Organise tes fichiers | Dossier Photos · Dossier Musique | cours_geometrie.docx ; fractions.xlsx ; theoreme_Pythagore.pdf | A yellow file folder with a ruler, a compass and a triangle sticking out of it. |
| `lbl-393bd14f` | Dossier Photos | `m2-s3-a3` Organise tes fichiers | Dossier Maths · Dossier Musique | voyage_Marrakech.jpg ; classe_2AC.png ; portrait_Atlas.jpg | A yellow file folder with three small landscape photo prints sticking out of it. |
| `lbl-af3970b1` | Dossier Musique | `m2-s3-a3` Organise tes fichiers | Dossier Maths · Dossier Photos | chanson_ecole.mp3 ; concert.mp3 ; rythme.wav | A yellow file folder with musical notes and a small pair of headphones coming out of it. |
| `lbl-0778c31f` | Mise en forme | `m2-s4-a3` Édition, mise en forme ou insertion ? | Édition · Insertion | Gras ; Centrer ; Souligné | A text document page where some lines are bold, centred and underlined, with a paint brush applying style (no readable letters). |

### Module 3 (7)

| Clé / fichier | Titre | Activité | Classée face à | Exemples d'éléments classés dedans | Prompt imagegen |
|---|---|---|---|---|---|
| `lbl-39ebfb4b` | Vrai | `m3-s4-a1` Vrai ou faux ? | Faux | 7 > 3 ; 5 = 5 ; 10 <= 10 | A balance scale perfectly level with two identical blocks, and a large green circle badge: a statement that holds (no letters). |
| `lbl-1298990d` | Faux | `m3-s4-a1` Vrai ou faux ? | Vrai | 2 + 2 = 5 ; 4 <> 4 ; 9 < 1 | A balance scale clearly tipped with unequal blocks, and a large red cross badge: a statement that does not hold (no letters). |
| `lbl-94308e67` | Admis (moyenne ≥ 10) | `m3-s5-a4` Mission bulletin | Non admis (moyenne < 10) | Moyenne 12 ; Moyenne 10 ; Moyenne 15,25 | A happy Moroccan student holding a report card with a star sticker, a green upward step behind them (no numbers or text). |
| `lbl-6ffa73f1` | Non admis (moyenne < 10) | `m3-s5-a4` Mission bulletin | Admis (moyenne ≥ 10) | Moyenne 9,5 ; Moyenne 7 ; Moyenne 9,99 | A thoughtful student holding a report card, a small orange downward step behind them, encouraging not sad (no numbers or text). |
| `lbl-00f3b6fb` | Langage de programmation | `m3-s7-a2` Langage, IDE ou application ? | Environnement de développement (IDE) · Application ordinaire | Python ; JavaScript ; C | Floating blocks of abstract code lines (coloured bars and brackets, no readable words) forming a speech bubble between a person and a computer. |
| `lbl-b1f41c23` | Environnement de développement (IDE) | `m3-s7-a2` Langage, IDE ou application ? | Langage de programmation · Application ordinaire | IDLE ; Thonny ; Visual Studio Code | A code editor window with a file tree on the left, coloured abstract code lines, a green play (run) button, and a small bug under a magnifier. |
| `lbl-98b4db32` | Application ordinaire | `m3-s7-a2` Langage, IDE ou application ? | Langage de programmation · Environnement de développement (IDE) | Microsoft Word ; Microsoft Excel ; Lecteur de musique | A laptop showing a music player window with headphones beside it: everyday software for users. |

### Module 4 (6)

| Clé / fichier | Titre | Activité | Classée face à | Exemples d'éléments classés dedans | Prompt imagegen |
|---|---|---|---|---|---|
| `lbl-036edb94` | Service d’Internet | `m4-s3-a2` Service ou infrastructure ? | Infrastructure / matériel | Le Web ; La messagerie électronique ; La visioconférence | A globe surrounded by service icons in bubbles: an envelope, a web page, a video call camera. |
| `lbl-6740bf1c` | Infrastructure / matériel | `m4-s3-a2` Service ou infrastructure ? | Service d’Internet | Le câble de fibre optique ; Le routeur ; Un serveur (la machine) | Physical network hardware: a router, a server rack and a coil of fibre-optic cable connected together. |
| `lbl-ab0a4c2c` | E‑mail | `m4-s6-a2` E‑mail ou chat ? | Chat pédagogique | Envoyer un document officiel à un professeur ; Écrire une lettre avec objet et formule de politesse ; Joindre un devoir en pièce jointe | A sealed envelope with a paperclip attachment flying from a laptop toward another: formal and planned. |
| `lbl-815e3864` | Chat pédagogique | `m4-s6-a2` E‑mail ou chat ? | E‑mail | Discuter en direct avec un camarade pendant un exercice ; Poser une question rapide en temps réel ; Envoyer un petit message « ok » | Two laptops exchanging quick chat bubbles in real time, a small clock showing instant replies, school context. |
| `lbl-4ccd297e` | Avantage | `m4-s7-a1` Avantage, risque ou protection ? | Risque · Protection | Trouver rapidement des informations ; Communiquer avec des personnes éloignées ; Étudier avec des ressources en ligne | A student smiling while video-calling a distant teacher and browsing an online library, with a thumbs-up: benefits of the internet. |
| `lbl-b68ad6aa` | Risque | `m4-s7-a1` Avantage, risque ou protection ? | Avantage · Protection | Les messages d’hameçonnage (phishing) ; Un virus téléchargé par erreur ; Le harcèlement en ligne | A laptop with a fishing hook pulling a password card out of the screen and a small virus bug, warning triangle (no text). |

### M205 (30)

| Clé / fichier | Titre | Activité | Classée face à | Exemples d'éléments classés dedans | Prompt imagegen |
|---|---|---|---|---|---|
| `lbl-af8a3942` | Saut de page | `m205-s2-a1` Quel saut choisir ? | Saut de section · Saut de colonne | Commencer un nouveau chapitre en haut de la page suivante, avec la même mise en page ; Placer un grand tableau seul sur la page suivante | Two document pages side by side; a chapter heading block jumps from the bottom of the first page to the top of the second, with a dashed break line. |
| `lbl-96894400` | Saut de section | `m205-s2-a1` Quel saut choisir ? | Saut de page · Saut de colonne | Passer uniquement l’annexe en Paysage ; Mettre seulement le corps du texte sur deux colonnes ; Redémarrer la numérotation des pages à l’annexe | Two consecutive document pages with different layouts: the first portrait, the second landscape with two columns, joined by a dashed section mark. |
| `lbl-4ab9618d` | Saut de colonne | `m205-s2-a1` Quel saut choisir ? | Saut de page · Saut de section | Faire démarrer un titre en haut de la deuxième colonne ; Équilibrer une brochure en déplaçant un paragraphe dans la colonne suivante | One document page in two columns; a paragraph block moves with an arrow from the bottom of the left column to the top of the right column. |
| `lbl-ac307ed6` | Style | `m205-s3-a2` Range les besoins | Thème · Modèle | Appliquer Calibri 14 gras à tous les titres de niveau 1 ; Mettre une citation en « Emphase intense » ; TxtCorps : Calibri 11, justifié, espacement 6/6 | A document page where all headings share the same colour and size, with a style swatch card applied from a palette. |
| `lbl-a8f277f2` | Thème | `m205-s3-a2` Range les besoins | Style · Modèle | Changer d’un coup les couleurs et les polices de tout le rapport ; Choisir le jeu de couleurs Ardoise | Three miniature documents changing together to a new colour palette and font set, a palette wheel at the centre. |
| `lbl-acdfe547` | Table des matières | `m205-s5-a1` À quelle table appartient-il ? | Table des illustrations · Index | Se construit à partir des styles Titre 1, Titre 2, Titre 3 ; Se place en général au début du rapport | A document page at the start of a report with indented heading bars and dotted leaders to page-number bars (no digits). |
| `lbl-96ebd0cc` | Table des illustrations | `m205-s5-a1` À quelle table appartient-il ? | Table des matières · Index | Liste « Figure 1 – Organigramme », « Figure 2 – Chiffres » ; Se construit à partir des légendes insérées sous les figures | A list page where each line has a tiny picture thumbnail and a dotted leader, next to a figure with a caption bar. |
| `lbl-090aa9ab` | Index | `m205-s5-a1` À quelle table appartient-il ? | Table des matières · Table des illustrations | Liste alphabétique de mots-clés avec leurs numéros de page ; Se construit à partir des entrées marquées ; Se place en général à la fin du document | The last page of a book with an alphabetical list in two columns (drawn as tabs and bars, not words), a magnifier on it. |
| `lbl-a6d7cbe1` | Document principal (texte fixe) | `m205-s6-a1` Fixe ou variable ? | Source de données (variable) | Le logo et l’adresse de l’établissement ; La phrase « Vous êtes convoqué(e) à l’examen de fin de module » ; La signature du directeur | A letter template with a logo shape, fixed paragraph bars and a signature, with empty highlighted slots where names will go. |
| `lbl-ab18f522` | Source de données (variable) | `m205-s6-a1` Fixe ou variable ? | Document principal (texte fixe) | Le nom et le prénom du stagiaire ; La filière ; La date et l’heure de passage | A table of rows (small person cards) feeding with arrows into several copies of the same letter, each one personalised. |
| `lbl-77b36e70` | Automatiser (macro) | `m205-s8-a1` Automatiser, réviser ou protéger ? | Réviser · Protéger | Enregistrer la mise en forme d’un titre pour la rejouer en un clic ; Associer une action enregistrée à un raccourci clavier | A record button and a film strip of formatting steps, then a single click replays them on a document. |
| `lbl-a71af4e1` | Réviser | `m205-s8-a1` Automatiser, réviser ou protéger ? | Automatiser (macro) · Protéger | Voir qui a supprimé une phrase ; Ajouter une remarque dans la marge ; Accepter ou refuser une correction | A document with coloured strike-through and inserted lines, comment bubbles in the margin and accept/reject buttons. |
| `lbl-32298b0b` | Protéger | `m205-s8-a1` Automatiser, réviser ou protéger ? | Automatiser (macro) · Réviser | Supprimer le nom de l’auteur et les propriétés cachées ; Autoriser seulement les commentaires | A word-processor document page (text lines, not a spreadsheet) with a padlock, and a hidden author card being removed. |
| `lbl-fef70f27` | Objet graphique | `m205-s10-a1` Lien, objet ou macro ? | Lien · Macro | Organigramme de l’équipe ; Logo de l’entreprise ; Flèche et rectangles alignés | An organisation chart made of rectangles and arrows next to a logo shape, inserted on a page. |
| `lbl-36a3cad3` | Macro | `m205-s10-a1` Lien, objet ou macro ? | Lien · Objet graphique | Mise en forme automatique d’un rapport en un clic ; Bouton qui exécute une suite d’actions enregistrées | A spreadsheet with a big round button that triggers a chain of gear-shaped actions in one click. |
| `lbl-e330b387` | Histogramme / barres (comparer) | `m205-s11-a1` Quel graphique pour quelle question ? | Courbe (évolution) · Secteurs (composition) | Comparer les ventes de 5 commerciaux ; Comparer le chiffre d’affaires de 4 agences | A vertical bar chart with five bars of different heights side by side, made for comparing. |
| `lbl-1be77bfa` | Secteurs (composition) | `m205-s11-a1` Quel graphique pour quelle question ? | Histogramme / barres (comparer) · Courbe (évolution) | Part de chaque produit dans le chiffre d’affaires total ; Répartition du budget entre les services | A pie chart split into coloured slices, one slice pulled out: parts of a whole. |
| `lbl-e246dc8f` | Lignes | `m205-s14-a1` Place les champs du TCD | Colonnes · Valeurs · Filtres | Ville ; Produit (sous la ville) | A pivot table frame where the left row-header area is highlighted, with field cards stacked vertically into it. |
| `lbl-77a7df0e` | Colonnes | `m205-s14-a1` Place les champs du TCD | Lignes · Valeurs · Filtres | Année | A pivot table frame where the top column-header area is highlighted, with a field card placed horizontally across. |
| `lbl-2e47c161` | Valeurs | `m205-s14-a1` Place les champs du TCD | Lignes · Colonnes · Filtres | Montant ; Quantité vendue | A pivot table frame where the central values area is highlighted, with a sigma (sum) symbol and coins. |
| `lbl-3bb33dee` | Filtres | `m205-s14-a1` Place les champs du TCD | Lignes · Colonnes · Valeurs | Commercial | A pivot table frame with a funnel above it and a dropdown filter card selecting one person. |
| `lbl-d32fb7b4` | Analyser | `m205-s16-a1` Quel outil pour quel besoin ? | Présenter · Contrôler · Automatiser | Obtenir les ventes par produit et par mois ; Calculer un total par client | A magnifying glass over a summary table with totals grouped by category. |
| `lbl-4d37469b` | Présenter | `m205-s16-a1` Quel outil pour quel besoin ? | Analyser · Contrôler · Automatiser | Montrer l’évolution du chiffre d’affaires ; Faire ressortir les montants élevés | A presentation board showing a rising chart with highlighted high values, and a pointer stick. |
| `lbl-d7c76ea9` | Contrôler | `m205-s16-a1` Quel outil pour quel besoin ? | Analyser · Présenter · Automatiser | Empêcher la saisie d’une ville inexistante ; Protéger la feuille finale | A spreadsheet cell with a shield and a dropdown list that blocks a wrong entry (stop sign on an invalid card). |
| `lbl-d198df43` | Automatiser | `m205-s16-a1` Quel outil pour quel besoin ? | Analyser · Présenter · Contrôler | Appliquer la mise en forme du rapport en un clic | A robot arm pressing a single button that formats a whole spreadsheet report at once. |
| `lbl-9c5d16bd` | Dans le masque (toutes les diapositives) | `m205-s17-a2` Dans le masque ou sur une diapositive ? | Sur une seule diapositive | Placer le logo de l’organisation sur toutes les diapositives ; Mettre la police officielle dans tous les titres ; Ajouter le pied de page « OFPPT – Rapport 2026 » partout | A master slide at the top with a logo shape, arrows copying it down onto a stack of many slides. |
| `lbl-a2c4a74e` | Sur une seule diapositive | `m205-s17-a2` Dans le masque ou sur une diapositive ? | Dans le masque (toutes les diapositives) | Insérer la photo de l’équipe sur la diapositive 4 ; Taper le texte de la conclusion | A row of slides where only one slide is highlighted and receives a team photo. |
| `lbl-a62782e2` | Transition | `m205-s18-a1` Transition, animation ou interactivité ? | Animation · Interactivité | Effet « Fondu » au passage d’une diapositive à la suivante ; Même effet de passage appliqué à toutes les diapositives | Two slides with one fading into the next, a smooth gradient sweep between them. |
| `lbl-e145ee5d` | Animation | `m205-s18-a1` Transition, animation ou interactivité ? | Transition · Interactivité | Faire apparaître les puces une par une ; Déplacer une flèche le long d’une trajectoire | A single slide where bullet points appear one by one and an arrow moves along a dotted path. |
| `lbl-aeb0497c` | Interactivité | `m205-s18-a1` Transition, animation ou interactivité ? | Transition · Animation | Bouton « Retour au menu » qui renvoie à la diapositive 2 ; Image cliquable qui ouvre la diapositive « Contacts » | A slide with a clickable button and a hand cursor, an arrow jumping to another slide of a menu. |

## 5. Cas particulier : « Entrée »

La clé `lbl-0891ea66` (« Entrée ») montre déjà la **touche Entrée du clavier** (module 2). **Ne pas l'écraser.**
- Générer l'image « entrée de données » sous la clé `lbl-251be805`, qui vaut `labelKey('Entrée de données')`.
- La relier explicitement au titre « Entrée » du M1 dans `CATEGORY_IMAGES`.
- La même image peut remplacer le pictogramme d'« Entrée » dans EGTSI106. Pour cela, faire pointer `conceptVisual` (`src/egtsi106/visuals.js`) sur ce fichier pour la clé ambiguë, au lieu du pictogramme.
- Retirer ensuite l'exception « Entrée » des deux scripts d'audit.

## 6. Optionnel : phrases à compléter avec une image générique (M205)

Ces 5 phrases affichent une case de planche partagée (`generated-item-art`). Ce sont de vraies images, mais génériques : les deux premières reçoivent la même case `word-actions-3`. Leurs voisines ont une image dédiée. Une image dédiée sous la clé indiquée prendrait automatiquement le dessus (`labelIllustration` passe en premier).

| Clé / fichier | Activité | Phrase |
|---|---|---|
| `lbl-199b3b90` | `m205-s2-a2` | Pour mettre un texte sur deux colonnes : Mise en page › [Colonnes] |
| `lbl-5645f44c` | `m205-s2-a2` | Pour régler un espacement de 0,8 cm entre les colonnes, on utilise [Plus de colonnes…] |
| `lbl-1423d6df` | `m205-s7-a2` | Pour que la page de garde n'ait pas d'en-tête, on coche [Première page différente] |
| `lbl-5e7d6496` | `m205-s7-a2` | Pour un en-tête différent dans l'annexe, on désactive [Lier au précédent] |
| `lbl-e0a7cb31` | `m205-s9-a2` | Pour colorer les ventes supérieures à 10 000 DH, on utilise Mise en forme conditionnelle › … |

## 7. Prompt à copier dans Codex

> Tu travailles dans le dépôt `infoplay-maroc`. Lis `docs/IMAGES_MANQUANTES_CODEX.md` en entier.
>
> 1. **Intégration** : fais les étapes du § 2. Une image existante doit toujours passer avant le pictogramme. Ajoute les correspondances « proches » du § 3 dans `CATEGORY_IMAGES`.
> 2. **Génération** : pour chaque ligne du § 4, module par module (M1, M2, M3, M4, puis M205), par lots d'environ 15 :
>    - génère l'image avec **imagegen** à partir du prompt de la ligne ;
>    - ajoute le préfixe de style : *"Flat hand-drawn school-textbook illustration, thick navy outlines, pastel blue and teal fills, light flat shading, plain cream background #fffaf0, centred single subject with generous margin, square, no text, no letters, no numbers, no logos."* ;
>    - respecte aussi les §§ 2 et 3 de `docs/PROMPT_IMAGES_MANQUANTES.md` (style, règles pédagogiques, aucune marque).
>    - Avant de générer une image, **vérifie qu'aucune image identique n'existe déjà** : cherche le libellé avec `labelKey()` dans `src/data/label-illustrations.js`, puis dans `src/data/student-illustrations.js` par le libellé de l'activité. Si une image existe, réutilise-la au lieu d'en générer une.
> 3. **Conversion** : convertis chaque PNG en WebP 512 × 512 sur fond `#fffaf0`, qualité 0,88, avec Playwright et un canvas comme dans `scripts/sync-student-illustrations.mjs`. Garde les PNG sources dans `output/label-illustrations-src/`. Enregistre le WebP sous `public/images/label-illustrations/<clé>.webp`.
> 4. **Après chaque lot** : `node scripts/sync-label-illustrations.mjs`, puis `npm run build`, puis `node scripts/audit-missing-images.cjs`. Ouvre une activité du lot dans le navigateur et contrôle l'affichage.
> 5. **À la fin** : traite le § 5 (« Entrée »), puis, si le temps le permet, le § 6. Lance `npm test`. Commite par module avec un message en français.
