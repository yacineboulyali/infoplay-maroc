// Transforme l'inventaire des images manquantes (output/missing-images/inventory.json, produit par
// scripts/audit-missing-images.cjs) en un document de travail : une ligne par image à produire, avec un
// prompt écrit à partir du contexte de l'élément (niveau, module, séance, activité, question, catégories…).
// Lance : npm run build && node scripts/audit-missing-images.cjs && node scripts/gen-missing-image-prompts.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { ACTIVITIES, PRO_ACTIVITIES, COLLEGE_ACTIVITIES, getSession, collegeModule } from '../src/data/index.js';
import { labelKey } from '../src/utils/label-key.js';

const inv = JSON.parse(readFileSync('output/missing-images/inventory.json', 'utf8'));
const ALL = [...ACTIVITIES, ...PRO_ACTIVITIES, ...COLLEGE_ACTIVITIES];
const byId = new Map(ALL.map((a) => [a.id, a]));
const mask = (t) => String(t).replace(/\[\[(.+?)\]\]/g, '…').replace(/\s+/g, ' ').trim();
const clean = (t) => String(t).replace(/\s+/g, ' ').trim();
const q = (t) => `“${clean(t)}”`;

/** Retrouve l'élément d'une activité qui porte ce libellé, avec ce qui l'entoure. */
function locate(a, key) {
  const d = a.data;
  if (a.type === 'sort') {
    const ci = d.cats.findIndex((c) => labelKey(c) === key);
    if (ci >= 0) return { kind: 'cat', text: d.cats[ci], others: d.cats.filter((_, i) => i !== ci), examples: d.items.filter((i) => i[1] === ci).slice(0, 3).map((i) => i[0]) };
    const it = d.items.find((i) => labelKey(i[0]) === key);
    if (it) return { kind: 'item', text: it[0], cats: d.cats };
  }
  if (a.type === 'match') {
    const p = d.pairs.find((x) => labelKey(x[0]) === key || labelKey(x[1]) === key);
    if (p) return labelKey(p[0]) === key ? { kind: 'left', text: p[0], pair: p[1] } : { kind: 'right', text: p[1], pair: p[0] };
  }
  if (a.type === 'quiz') for (const x of d.qs) { const o = x[1].find((y) => labelKey(y) === key); if (o) return { kind: 'option', text: o, question: x[0], siblings: x[1].filter((y) => y !== o) }; }
  if (a.type === 'order') { const s = d.steps.find((y) => labelKey(y) === key); if (s) return { kind: 'step', text: s }; }
  if (a.type === 'fill') for (const l of d.lines) { const t = Array.isArray(l) ? l[0] : l; if (labelKey(t) === key || labelKey(mask(t)) === key) return { kind: 'sentence', text: mask(t) }; const m = [...t.matchAll(/\[\[(.+?)\]\]/g)].flatMap((x) => x[1].split('|')).find((o) => labelKey(o) === key); if (m) return { kind: 'blank-option', text: m, sentence: mask(t) }; }
  return null;
}

// Libellés « techniques » : on dessine le support neutre, jamais la valeur (règle 4 du guide de style).
function support(text) {
  const t = clean(text);
  if (/^=|^[A-Z]{1,2}\d+(:[A-Z]{1,2}\d+)?$|\$[A-Z]|\b(SOMME|MOYENNE|MAX|MIN|NB)\b/.test(t)) return 'an empty spreadsheet grid with one highlighted cell or range and a small formula bar, no characters written';
  if (/^(AV|RE|TD|TG|LC|BC|NETTOIE|VE|CT|MT|REPETE|POUR|FIN|DONNE|ECRIS|CARRE|POLY|TRIANGLE|MAISON|VILLE|DEPLACE)\b|^:[a-z]/.test(t)) return 'a Logo programming window: a small turtle cursor on a white drawing area drawing the corresponding path, and an empty command line, no characters written';
  if (/^Ctrl \+|^F\d\b/.test(t)) return 'a computer keyboard with the relevant keys softly highlighted, no letters printed on the keys';
  if (/@/.test(t) && !/\s/.test(t)) return 'a blank envelope connected to a generic e-mail address card, no characters written';
  if (/^https?:|^www\.|^\.(ma|fr|es|sn|gov|edu|org|com)$/.test(t) || /^site:|^filetype:/.test(t)) return 'a generic browser window with an empty address bar or search bar highlighted, no characters written';
  if (/^\*?\.?[\w-]*\.(docx|xlsx|pptx|pdf|jpg|png|gif|bmp|mp3|wav|mp4|m4a|avi|zip|exe|txt)(\.exe)?$|^\.\w{2,4}$/.test(t)) { const ext = (t.match(/\.(\w+)$/) || [])[1]?.toLowerCase(); const kind = { jpg: 'a small landscape photo', png: 'a simple drawing', gif: 'a small picture', bmp: 'a painted picture', mp3: 'a music note and sound waves', wav: 'large sound waves', m4a: 'a microphone and sound waves', mp4: 'a film strip with a play button', avi: 'a film strip', docx: 'lines of text on a page', xlsx: 'a table grid', pptx: 'a presentation slide', pdf: 'a printed page with a folded corner', zip: 'a folder squeezed by a zipper', exe: 'gears and a warning-like neutral shape', txt: 'plain lines of text' }[ext] || 'its content type'; return `a generic file icon whose picture shows ${kind}, with a blank label, no characters written`; }
  if (/^\\\\|^C:\\/.test(t)) return 'a folder tree in a file explorer with network computers, no characters written';
  return null;
}

function prompt(u, a, loc, ctx) {
  const where = `Context: ${ctx.short}, lesson ${q(ctx.session)}.`;
  const tech = loc && support(loc.text);
  const draw = tech ? `Draw ${tech}.` : null;
  switch (loc?.kind) {
    case 'cat': return `Category header picture for ${q(loc.text)}. ${draw || 'Show one simple scene or symbol that sums up this category.'} It must look clearly different from the other categories of the same game: ${loc.others.map(q).join(', ')}. Items sorted into it: ${loc.examples.map(q).join('; ')}. ${where}`;
    case 'item': return `Card to sort: ${draw || `draw ${q(loc.text)} as one clear object or small scene.`} Do not hint which category it belongs to (${loc.cats.map(q).join(' / ')}). ${where}`;
    case 'left': case 'right': return `Matching card: ${draw || `illustrate ${q(loc.text)}.`} In the game it is matched with ${q(loc.pair)} — use that meaning to choose the scene, but draw only the concept, no text. ${where}`;
    case 'option': return `Multiple-choice answer for the question ${q(loc.question)}: ${draw || `draw literally what the answer says, ${q(loc.text)}.`} Same care as the other answers; no tick, cross, green or red that would reveal whether it is correct. ${where}`;
    case 'step': return `Step of a procedure: ${draw || `show the action ${q(loc.text)} as a single clear gesture (hand, mouse, screen or object).`} ${where}`;
    case 'sentence': return `Sentence to complete: show the situation described by ${q(loc.text)} without drawing the missing word (shown as “…”). ${where}`;
    case 'blank-option': return `Word choice inside the sentence ${q(loc.sentence)}: ${draw || `illustrate ${q(loc.text)}.`} Do not reveal whether it is the right word. ${where}`;
    default: return `Illustrate ${q(u.label)} as a simple, clear scene. ${where}`;
  }
}

function contextOf(a) {
  const col = collegeModule(a.moduleId);
  const s = getSession(a.moduleId, a.sessionIndex);
  return {
    group: col ? `${col.levelCode} — ${col.levelCode === '1AC' ? '1re' : col.levelCode === '2AC' ? '2e' : '3e'} année du collège` : a.moduleId === 205 ? 'M205 — Bureautique avancée' : `Tronc commun — Module ${a.moduleId}`,
    level: col ? `Moroccan middle school, ${col.levelCode} (age ${{ 1: '12–13', 2: '13–14', 3: '14–15' }[col.level]})` : a.moduleId === 205 ? 'Moroccan vocational training (OFPPT), office software' : 'Moroccan high school, common core',
    module: col ? `module ${col.rank} ${q(col.title)} (${col.unit} · ${col.comp})` : '',
    moduleTitle: col ? `Module ${col.rank} · ${col.title}` : a.moduleId === 205 ? 'M205' : `Module ${a.moduleId}`,
    short: col ? `Moroccan ${col.levelCode} pupils (${{ 1: '12–13', 2: '13–14', 3: '14–15' }[col.level]}), ${col.title}` : a.moduleId === 205 ? 'OFPPT trainees, office software' : 'Moroccan high-school pupils', session: s?.title || '', sessionIndex: a.sessionIndex,
  };
}

const rows = [];
for (const u of inv.labels) {
  if (u.role === 'autre') continue; // texte de conteneur capté par l'audit, pas un élément
  const a = byId.get(u.activities[0]); if (!a) continue;
  const ctx = contextOf(a);
  if (!u.id) { // étape de simulation affichée une à une : image propre à l'activité
    const n = Number(/Étape (\d+)/.exec(u.label)?.[1] || 1); const text = u.label.replace(/^Étape \d+ : /, '');
    const key = `${a.illus || a.id}-q${String(n).padStart(2, '0')}`;
    rows.push({ ...ctx, act: a, key, file: `public/images/student-illustrations/${key}.webp`, label: text, role: 'étape de simulation', also: [], prompt: `Simulation step: ${support(text) ? 'draw ' + support(text) + '.' : `show the situation ${q(text)} on a simplified computer screen, no readable text.`} Context: ${ctx.short}, lesson ${q(ctx.session)}.` });
    continue;
  }
  const loc = locate(a, u.id);
  rows.push({ ...ctx, act: a, key: u.id, file: u.file, label: u.label, role: u.role, also: [...new Set(u.activities)].slice(1), prompt: prompt(u, a, loc, ctx) });
}

// Ordre du programme : parcours → module → séance → activité.
const order = (r) => [r.act.moduleId === 205 ? 900 : r.act.moduleId, r.act.sessionIndex, r.act.index];
rows.sort((x, y) => { const a = order(x), b = order(y); return a[0] - b[0] || a[1] - b[1] || a[2] - b[2]; });

const esc = (t) => clean(t).replace(/\|/g, '\\|');
const style = 'Hand-drawn school-textbook illustration, thick navy-blue outlines, flat pastel blue and teal fills, light flat shading, plain cream background (#fffaf0), centred composition with generous margins, square 512×512. Clearly a drawing: never photorealistic, never 3D. Absolutely no text, letters, digits or watermark. No brand logos (Microsoft, Windows, Google, Android…). Moroccan context when natural, diverse characters, no stereotypes.';
const byGroup = new Map();
for (const r of rows) { const g = byGroup.get(r.group) || new Map(); byGroup.set(r.group, g); const m = g.get(r.moduleTitle) || []; g.set(r.moduleTitle, m); m.push(r); }
const counts = {}; rows.forEach((r) => { counts[r.group] = (counts[r.group] || 0) + 1; });
const roles = {}; rows.forEach((r) => { roles[r.role] = (roles[r.role] || 0) + 1; });

let md = `# Images manquantes à générer — inventaire complet avec prompts

> **ملخص بالعربية :** هذا الملف يضم كل الصور الناقصة في المنصة بعد الفحص الآلي لكل الأنشطة في متصفح Chromium (${inv.activities} نشاطًا). لكل صورة: اسم الملف الذي يجب حفظها به، والعنصر الذي توضّحه، ودوره في النشاط، وبرومبت مكتوب حسب سياقه (المستوى، الوحدة، الحصة، النشاط، السؤال). أضف «أسلوب الرسم المشترك» في بداية كل برومبت.

Inventaire du ${new Date().toISOString().slice(0, 10)}, produit par \`scripts/audit-missing-images.cjs\` (rendu réel de chaque activité dans Chromium, \`dist/\`) puis \`scripts/gen-missing-image-prompts.mjs\`.

## 1. Bilan

- Activités inspectées : **${inv.activities}** (Tronc commun, M205, EGTSI106, Informatique Collège).
- Le Tronc commun, M205 et EGTSI106 n'ont **plus aucune image manquante** dans les éléments couverts par l'audit.
- **${rows.length} images à générer**, toutes dans le parcours Informatique Collège (activités nouvelles ; les activités reprises du Tronc commun ont déjà leurs images) :

| Parcours | Images |
|---|---:|
${Object.entries(counts).map(([g, n]) => `| ${g} | ${n} |`).join('\n')}

| Rôle de l'élément | Images |
|---|---:|
${Object.entries(roles).sort((a, b) => b[1] - a[1]).map(([r, n]) => `| ${r} | ${n} |`).join('\n')}

## 2. Style commun (à placer au début de chaque prompt)

\`\`\`text
${style}
\`\`\`

Règles pédagogiques (voir \`docs/PROMPT_IMAGES_MANQUANTES.md\` § 3) : l'image illustre le libellé, **jamais la bonne réponse** ; une option juste et une option fausse reçoivent le même soin ; pour du code, une formule, une adresse ou une extension, on dessine le support neutre **sans écrire la valeur** ; deux libellés d'une même activité doivent donner deux images distinctes.

## 3. Intégration

1. **Libellés (\`lbl-xxxxxxxx\`)** : enregistrer chaque image en WebP 512 × 512 (moins de 40 Ko si possible) sous le chemin exact de la colonne « Fichier ». La clé vaut \`labelKey(libellé)\` (\`src/utils/label-key.js\`) : ne jamais la renommer. Puis \`node scripts/sync-label-illustrations.mjs && npm run build\` : l'image apparaît automatiquement sur la carte, l'option, l'étape ou le titre de catégorie.
2. **Étapes de simulation (\`mXX-sY-aZ-qNN\`)** : enregistrer sous \`public/images/student-illustrations/<clé>.webp\` puis ajouter l'entrée correspondante dans \`src/data/student-illustrations.js\` (même format que les autres lignes).
3. Vérifier : \`npm run build && node scripts/audit-missing-images.cjs\` doit faire baisser le total, et \`npm test\` rester vert.

La même liste existe au format machine (\`output/missing-images/prompts.jsonl\`, une ligne JSON par image : \`key\`, \`file\`, \`label\`, \`role\`, \`context\`, \`prompt\`) pour une génération par lot.

## 4. Liste détaillée
`;
for (const [g, mods] of byGroup) {
  md += `\n### ${g}\n`;
  for (const [mt, list] of mods) {
    md += `\n#### ${mt} (${list.length})\n`;
    let lastS = null;
    for (const r of list) {
      if (r.sessionIndex !== lastS) { lastS = r.sessionIndex; md += `\n**Séance ${r.sessionIndex} — ${r.session}**\n\n| Fichier | Élément | Rôle · activité | Prompt |\n|---|---|---|---|\n`; }
      md += `| \`${r.file}\` | ${esc(r.label)} | ${r.role} · \`${r.act.id}\` ${esc(r.act.title)}${r.also.length ? ` (aussi : ${r.also.join(', ')})` : ''} | ${esc(r.prompt)} |\n`;
    }
  }
}
writeFileSync('docs/IMAGES_MANQUANTES_COLLEGE.md', md);
writeFileSync('output/missing-images/prompts.jsonl', rows.map((r) => JSON.stringify({ key: r.key, file: r.file, label: r.label, role: r.role, context: `${r.group} · ${r.moduleTitle} · S${r.sessionIndex} ${r.session} · ${r.act.title}`, prompt: `${style} ${r.prompt}` })).join('\n') + '\n');
console.log(JSON.stringify({ images: rows.length, parGroupe: counts, parRole: roles }));
