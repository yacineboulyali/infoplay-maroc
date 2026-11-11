# Prompt — générer et intégrer les images manquantes d'InfoPlay Maroc

À copier tel quel dans Codex (ou ChatGPT avec accès au dépôt). L'inventaire a été produit par
`node scripts/audit-missing-images.cjs` : il reste 1 136 libellés affichés sans image illustrée dans 142 activités
(Module 1 : 1 · Module 2 : 165 · Module 3 : 92 · Module 4 : 62 · EGTSI106 : 208 · M205 : 608). Les 53 images du module 1 sont déjà intégrées.
La liste de travail ne contient que ce qui reste à produire.

---

Tu travailles dans le dépôt `infoplay-maroc` (plateforme éducative d'informatique, hors ligne, interface en français,
élèves marocains de collège/tronc commun et stagiaires OFPPT). Ta mission : générer une image pour chaque élément
d'activité qui n'en a pas encore, puis l'intégrer. Le code d'intégration existe déjà : tu n'as **aucun fichier
JavaScript ou CSS à modifier**.

## 1. Liste de travail

Lis `output/missing-images/worklist.jsonl`. Chaque ligne décrit une image à produire :

```json
{"id":"lbl-d89072ee","file":"public/images/label-illustrations/lbl-d89072ee.webp","label":"Information brute, avant tout traitement, comme la note 14 ou le mot « Rabat ».","role":"carte à associer","context":"Module 1 · Associe les définitions","activities":["m1-s1-a1"]}
```

- `id` / `file` : nom exact du fichier à créer. Ne le change jamais, il est calculé à partir du libellé.
- `label` : texte affiché à l'élève, c'est le sujet de l'image.
- `role` : place de l'élément (option de QCM, carte à associer, étape à ordonner, étiquette à classer, phrase à compléter).
- `context` et `activities` : module et activité, pour comprendre le sens du libellé. Les données complètes de
  l'activité sont dans `src/data/module-1.js` … `module-4.js`, `src/data/pro/m205.js` et `src/data/egtsi106/` (cherche l'identifiant, ex. `m1-s1-a1`).

Traite les parcours dans cet ordre : modules 1, 2, 3, 4, puis EGTSI106, puis 205. Travaille par lots de 20 à 30 images.

## 2. Style (identique aux 678 images existantes)

Regarde d'abord 6 à 8 images de `public/images/student-illustrations/` et reproduis leur style :

- illustration dessinée à la main façon manuel scolaire, contours bleu marine épais, aplats pastel bleu et sarcelle,
  ombrage plat léger, fond crème uni (`#fffaf0`), composition centrée avec une marge généreuse ;
- clairement un dessin : jamais photoréaliste, jamais de rendu 3D ;
- carré, 512 × 512 px, format **WebP**, moins de 40 Ko par fichier si possible ;
- **aucun texte dans l'image** : pas de mots, pas de lettres, pas de chiffres, pas de filigrane. Le libellé reste
  affiché par la plateforme à côté de l'image.

## 3. Règles pédagogiques (obligatoires)

1. L'image illustre ce que dit le libellé, pas la bonne réponse. Pour une option de QCM, une bonne et une mauvaise
   option doivent avoir le même niveau de soin : aucune coche, flèche, couleur verte/rouge ou mise en valeur qui
   trahirait la réponse.
2. Libellé concret (objet, appareil, action) : dessine cet objet ou cette action en gros plan.
3. Libellé abstrait (définition, règle, conséquence) : dessine une scène ou une métaphore simple qui la représente.
4. Libellé qui est du code, une formule, une adresse de cellule, un nombre ou une extension
   (`=B2*C2`, `Lire(a)`, `A1:A5`, `.docx`, `57`) : dessine le support neutre correspondant (feuille de calcul vide,
   fiche d'algorithme, icône de fichier, étiquette vierge) **sans écrire la valeur**.
5. Logiciels : utilise des formes génériques (document, grille de tableur, diapositive, enveloppe). Ne reproduis
   aucun logo ni aucune marque déposée (Microsoft, Windows, Google, Android, etc.).
6. Contexte marocain quand c'est naturel (salle de classe, prénoms, villes), sans stéréotype ; personnages variés.
7. Deux libellés proches dans la même activité doivent donner deux images visuellement distinctes.

## 4. Intégration

1. Enregistre chaque image sous le chemin `file` indiqué (`public/images/label-illustrations/lbl-xxxxxxxx.webp`).
2. Après chaque lot :
   ```bash
   node scripts/sync-label-illustrations.mjs
   npm run build
   ```
   Le premier script régénère `src/data/label-illustrations.js` et affiche `restantes` (lignes de la liste dont l'image manque encore).
3. À la fin, vérifie :
   ```bash
   node scripts/audit-missing-images.cjs
   npm test
   node scripts/scan-layout.cjs
   ```
   L'audit doit annoncer `"elements": 0`. Les tests doivent tous passer et le scan ne doit signaler aucun débordement.
4. Ouvre trois activités dans le navigateur (`dist/index.html`), par exemple `#/m/1/s/1/a/4`, `#/m/2/s/3/a/1` et
   `#/m/205/s/1/a/1`, et contrôle que les images apparaissent à côté des bons libellés.

## 5. Contraintes

- Ne modifie pas les textes des activités, ni `src/data/student-illustrations.js`, ni les 678 images existantes.
- Aucun appel réseau à l'exécution : toutes les images sont des fichiers locaux du dépôt.
- Ne renomme pas les fichiers et n'en ajoute aucun qui ne figure pas dans `worklist.jsonl`.
- Si un libellé est ambigu, lis l'activité dans `src/data/` avant de dessiner ; note les cas douteux dans
  `output/missing-images/review-notes.md` au lieu d'inventer.
- Fais un commit par module (`Add label illustrations for module N`). Ne pousse pas sur `main` sans validation.
