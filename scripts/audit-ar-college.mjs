// Audit de la traduction arabe des activités Collège : titres, questions et réponses.
// Usage : node scripts/audit-ar-college.mjs [--json fichier]  → liste ce qui n'a pas encore de traduction.
import { writeFileSync } from 'node:fs';
import { COLLEGE_ACTIVITIES } from '../src/data/college/index.js';
import { arText, arActivity } from '../src/i18n/ar.js';
import { arQuestion } from '../src/i18n/ar-questions.js';
import { AR_COLLEGE_SKIP } from '../src/i18n/ar-college.js';

const SKIP = new Set(AR_COLLEGE_SKIP);

const missing = { titles: {}, terms: new Set(), questions: {} };
let total = 0, ok = 0;
const need = (cond) => { total++; if (cond) ok++; return !cond; };
for (const a of COLLEGE_ACTIVITIES) {
  const qid = a.illus || a.id; const d = a.data; const t = a.type;
  if (need(arActivity(qid))) missing.titles[a.id] = a.title;
  const term = (s) => { if (s && !SKIP.has(String(s).trim()) && need(arText(s))) missing.terms.add(String(s).trim()); };
  const q = (arr) => arr.forEach((txt, i) => { if (need(arQuestion(qid, i))) (missing.questions[a.id] ||= { illus: qid, list: [] }).list[i] = txt; });
  if (t === 'match') d.pairs.forEach((p) => { term(p[0]); term(p[1]); });
  if (t === 'sort') d.items.forEach((it) => term(it[0]));
  if (t === 'order') d.steps.forEach(term);
  if (t === 'quiz') d.qs.forEach((x, i) => {
    const title = x[0].split('\n')[0];
    total++; if (arText(title) || arQuestion(qid, i)) ok++; else (missing.questions[a.id] ||= { illus: qid, list: [] }).list[i] = title;
    x[1].forEach(term);
  });
  if (t === 'fill') q(d.lines.map((l) => (Array.isArray(l) ? l[0] : l)));
  if (t === 'hot') q(d.prompts.map((p) => (Array.isArray(p) ? p[0] : p.label || p.text || p)));
  if (t === 'sim') q(d.tasks.map((x) => x[0]));
  if (t === 'asm') d.parts.forEach((p) => term(p.name));
}
const out = { ...missing, terms: [...missing.terms] };
console.log(`Couverture arabe Collège : ${ok}/${total} (${(100 * ok / total).toFixed(1)} %)`);
console.log(`Titres manquants : ${Object.keys(out.titles).length} · termes : ${out.terms.length} · activités avec questions manquantes : ${Object.keys(out.questions).length}`);
process.exitCode = ok === total ? 0 : 1;
const i = process.argv.indexOf('--json'); if (i > 0) writeFileSync(process.argv[i + 1], JSON.stringify(out, null, 1));
