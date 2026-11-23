# Prompt Codex : régénérer 13 vignettes d'activités Collège

Tu travailles dans le dépôt InfoPlay Maroc. Les 129 vignettes d'activités (`public/images/activity-cards/*.webp`, sources dans `output/activity-cards-src/*.png`) sont intégrées et `npm test` passe. Une relecture a trouvé 13 vignettes à refaire. Elles sont listées dans `output/missing-images/activity-cards-regen.jsonl`, une ligne par image, avec :
- `id` : l'activité ;
- `priority` : `fuite de réponse`, `contraste manquant`, `notion invisible` ou `détail` ;
- `problem` : ce qui ne va pas dans l'image actuelle ;
- `visual` : la nouvelle scène à dessiner.

## Tâche

1. **Avant de commencer**, commite le travail 2AC encore en attente : 15 WebP 2AC non suivis, 10 WebP 2AC modifiés, leurs PNG dans `output/activity-cards-src/`, `src/data/activity-cards.js`, `tests/activity-cards.test.mjs`, `output/missing-images/activity-cards-2ac.jsonl`. Message : « Ajoute les vignettes des 53 activités 2AC sans image ». Ne commite pas `debug.log` ni `.claude/launch.json`.

2. **Pour chaque ligne du JSONL**, regarde d'abord l'image actuelle (`output/activity-cards-src/<id>.png`). Puis régénère-la en écrasant ce PNG, avec le style commun suivi du champ `visual` :

> Hand-drawn school-textbook illustration for a middle-school computing game, thick navy-blue outlines, flat pastel blue and teal fills, light flat shading, plain cream background (#fffaf0), one clear subject centred with generous margins, square format, readable at 112 px. Clearly a drawing: never photorealistic, never 3D. Absolutely no text, letters, digits, code, URLs or watermark. No brand logos. Moroccan context when natural, diverse characters, no stereotypes, no fez/tarbouche. Scene: `<visual>`

   Règles :
   - Pour les activités de classement (« bonne ou mauvaise », « fiable ou douteuse », « fort ou faible »…), **montre bien les deux côtés**, avec un repère vert (coche) d'un côté et rouge (croix) de l'autre. Ce contraste illustre la notion, il ne donne la réponse d'aucun élément précis.
   - Ne dessine jamais le résultat d'une question précise. Exemple : pas de cercle ni de carré pour `m25-s4-a3`.
   - Contrôle chaque image à 112 px : l'idée doit se lire d'un coup d'œil.
   - Si une image contient du texte lisible, un logo ou ne corrige pas le `problem`, régénère-la.

3. Supprime les 13 WebP correspondants dans `public/images/activity-cards/`, puis relance la conversion et l'index :

```bash
node scripts/png-to-card-webp.mjs
node scripts/sync-activity-cards.mjs
npm run build
npm test
```

4. Vérifie dans l'application (`node scripts/lan-server.mjs`, port 8765, `?test=1`) les séances `#/m/22/s/2`, `#/m/24/s/3`, `#/m/25/s/4`, `#/m/32/s/1`, `#/m/34/s/6`, `#/m/34/s/8`, `#/m/35/s/1`, `#/m/35/s/3`, `#/m/35/s/5`. Fais une capture d'écran de `#/m/35/s/1` et de `#/m/25/s/4`.

5. Commite : « Corrige 13 vignettes d'activités Collège (contraste, fuite de réponse) ».

Résume à la fin : pour chaque `id`, une phrase sur ce que montre la nouvelle image, le nombre de régénérations nécessaires, et le résultat de `npm test`.
