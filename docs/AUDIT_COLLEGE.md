# Audit complet — parcours Informatique Collège et plateforme

> **ملخص بالعربية :** تم نشر مسار «المعلوميات – الإعدادي» (1AC و2AC و3AC: 15 وحدة، 66 حصة، 264 نشاطًا). كشف الفحص الشامل خللًا حرجًا: كان نظام الحفظ يرفض نتائج أنشطة الإعدادي («Activité inconnue») فلا يُسجَّل تقدم التلميذ — تم إصلاحه وإضافة اختبار يمنع رجوعه. الصور الناقصة (1604 صورة) مع برومبت لكل صورة في `docs/IMAGES_MANQUANTES_COLLEGE.md`.

Date : 19/11/2026 · branche `label-illustrations-2` · publication GitHub Pages depuis `main`.

## 1. Contenu ajouté

| Niveau | Modules | Séances | Activités |
|---|---:|---:|---:|
| 1AC | 5 | 19 | 76 |
| 2AC | 5 | 23 | 92 |
| 3AC | 5 | 24 | 96 |
| **Total** | **15** | **66** | **264** |

Ordre des modules et des séances conforme au programme publié par l'ANPI. Chaque séance : situation, « à retenir », 4 activités de mécaniques distinctes.

## 2. Contrôles automatiques

| Contrôle | Résultat |
|---|---|
| Tests unitaires (`npm test`) | 626 / 626 verts (dont nouveau test de stockage Collège) |
| Structure : ordre ANPI, identifiants uniques, 4 mécaniques distinctes par séance | OK |
| Chaque activité est résoluble à 5/5 par son moteur (test unitaire) | 264 / 264 |
| Niveaux du robot / Logo résolubles | OK |
| Images référencées présentes sur le disque | OK |
| Tronc commun, M205, EGTSI106 : images manquantes | 0 |
| Typographie (espaces, guillemets, ponctuation) | OK |
| E2E Collège dans Chromium hors ligne : chaque activité résolue puis « Vérifier » | **264 / 264 à 5/5**, 0 erreur console, 0 requête externe |
| axe-core (WCAG 2.1 AA) sur 13 écrans Collège | 0 violation |
| Téléphone 375 px : défilement horizontal | 0 |
| E2E Tronc commun (`tests/e2e/smoke.cjs`) | 120 / 120 à 5/5, persistance, simulations manuelles OK |

## 3. Anomalies trouvées et corrigées

1. **Critique — progression Collège non enregistrée.** `src/storage/store.js` n'acceptait que les identifiants `m1–m4` et `m205` : chaque essai Collège levait « Activité inconnue », rien n'était sauvegardé, exporté ni affiché dans la progression. Expression régulière élargie à `m11–m15, m21–m25, m31–m35` ; test de non-régression (enregistrement, rechargement, export CSV, refus d'un id inexistant).
2. **Tests e2e obsolètes.** `tests/e2e/smoke.cjs` et `tests/e2e/college.cjs` lisaient le score dans `.result .score`, qui n'existe plus : sélecteur remplacé par `.rb-score b`.
3. **Fenêtre de résultat fantôme.** Le résultat s'ouvre avec un délai après « Vérifier » ; si l'élève changeait de page entre-temps (bouton Retour, menu), la fenêtre s'ouvrait sur la page suivante et bloquait les clics. Elle n'est plus ouverte si l'élève est parti, et se ferme à tout changement de page (`src/fx/flow.js`, `src/fx/popup.js`).
4. **Contraste insuffisant** du fil d'Ariane (étape courante, 4,2 : 1 au lieu de 4,5 : 1), visible sur toutes les activités : texte assombri (`src/styles/clean.css`).
5. **Smoke test Tronc commun obsolète** (compteur `.stat` et boutons « Valider » disparus avec la validation automatique des étapes) : réécrit sur le comportement actuel.
6. **Audit des images** : `scripts/audit-missing-images.cjs` couvre désormais le parcours Collège.

## 4. Points restant à traiter (non corrigés)

- **Biais de longueur des réponses QCM** : la bonne réponse est l'option la plus longue dans 100 / 235 questions Collège nouvelles (43 %), 45 / 80 au Tronc commun, 61 / 100 en M205. Un élève peut deviner « la plus longue ». Recommandation : rééquilibrer les distracteurs.
- **Mode LAN (enseignant)** : le suivi et la course (`src/multiplayer/screens.js`, `progressSnapshot`) ne comptent que le Tronc commun ; Collège et M205 n'y apparaissent pas.
- **Images** : 1604 images à générer pour le Collège (1AC 350, 2AC 575, 3AC 679). Les activités reprises du Tronc commun ont déjà les leurs ; ailleurs l'interface affiche un pictogramme de repli.

## 5. Images manquantes

Liste complète, classée niveau → module → séance, avec le fichier attendu, le rôle de l'élément et un prompt contextualisé : [`docs/IMAGES_MANQUANTES_COLLEGE.md`](IMAGES_MANQUANTES_COLLEGE.md). Version machine : `output/missing-images/prompts.jsonl`. Régénérer :

```bash
npm run build && node scripts/audit-missing-images.cjs && node scripts/gen-missing-image-prompts.mjs
```
