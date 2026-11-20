// Liste les textes français du module Examen à traduire en arabe (clé = empreinte trKey).
// Usage : node scripts/tr-ar-extract.mjs <dossier>  →  <groupe>-NN.tsv (clé<TAB>texte)
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const base = pathToFileURL(process.cwd() + '/src/examen/').href;
const { trKey } = await import(base+'i18n.js');
const { QCM } = await import(base+'data/qcm.js');
const { PARTS, GROUPS } = await import(base+'data/parts.js');
const { CONCEPTS_FR } = await import(base+'data/concepts-fr.js');
const { NOTIONS_FR } = await import(base+'data/notions-fr.js');
const { DISTRACTORS_FR } = await import(base+'data/distractors.js');
const { EXAMPLES_FR } = await import(base+'data/examples-fr.js');
const { LESSON_EXAMPLES } = await import(base+'data/lesson-examples.js');
const { CONCEPT_TITLES } = await import(base+'data/concept-titles.js');
const { ANNALES } = await import(base+'data/annales.js');
const out = process.argv[2];
const groups = { lessons: new Map(), feedback: new Map(), qcm: new Map(), annales: new Map() };
const add = (g, s) => { if (typeof s !== 'string') return; s = s.trim(); if (!s || !/[a-zA-Zéèà]{2}/.test(s)) return; groups[g].set(trKey(s), s); };
const walk = (g, o, skip = []) => { if (typeof o === 'string') return add(g, o); if (Array.isArray(o)) return o.forEach((x) => walk(g, x, skip)); if (o && typeof o === 'object') for (const k in o) if (!skip.includes(k)) walk(g, o[k], skip); };
const fr = PARTS.filter((p) => p.lang === 'fr');
for (const g of GROUPS.filter((g) => g.lang === 'fr')) { add('lessons', g.title); add('lessons', g.sub); }
for (const p of fr) { add('lessons', p.title); add('lessons', p.short); add('lessons', p.weight); walk('lessons', p.lesson, ['src', 'type', 'ids']); (LESSON_EXAMPLES[p.id] || []).forEach((x) => add('lessons', x)); }
for (const c of CONCEPTS_FR) { add('feedback', c.hint); add('feedback', c.why); }
for (const n of Object.values(NOTIONS_FR)) { add('feedback', n.def); n.traits.forEach((t) => add('feedback', t)); }
for (const d of DISTRACTORS_FR) { add('feedback', d.msg); add('feedback', d.label); }
Object.values(EXAMPLES_FR).forEach((x) => add('feedback', x));
Object.entries(CONCEPT_TITLES).forEach(([k, v]) => { if (!k.endsWith('-ar')) add('feedback', typeof v === 'string' ? v : v.fr); });
for (const r of QCM.filter((r) => fr.some((p) => p.id === r[0]))) { add('qcm', r[3]); r[4].forEach((o) => add('qcm', o)); add('qcm', r[6]); }
// Annales officielles 2021-2025 (parties françaises) : énoncé, propositions, justification, libellés vrai/faux.
for (const a of ANNALES.filter((a) => fr.some((p) => p.id === a.p))) { add('annales', a.q); (a.o || []).forEach((o) => add('annales', o)); add('annales', a.j); }
add('annales', 'Vrai'); add('annales', 'Faux');
for (const [g, m] of Object.entries(groups)) {
  const rows = [...m].map(([k, s]) => `${k}\t${s}`);
  let chunk = [], size = 0, n = 0;
  const flush = () => { if (chunk.length) fs.writeFileSync(`${out}/${g}-${String(n++).padStart(2, '0')}.tsv`, chunk.join('\n')); chunk = []; size = 0; };
  for (const r of rows) { chunk.push(r); size += r.length; if (size > 9000) flush(); }
  flush();
  console.log(g, m.size, 'strings', n, 'chunks');
}
