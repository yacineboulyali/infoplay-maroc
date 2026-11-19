// Contrôle de la banque du module « Examen professionnel » : notion rattachée à chaque question,
// éliminations argumentées disponibles, niveaux par partie. Usage : node scripts/examen-check.mjs [D1]
import { QUESTIONS, conceptFor, hintFor, levelsOf } from '../src/examen/engine.js';

const by = {};
for (const q of QUESTIONS) { const c = conceptFor(q).id; (by[q.part] ||= {})[c] = (by[q.part][c] || 0) + 1; }
for (const p in by) console.log(p, levelsOf(p).length + ' niveaux', JSON.stringify(by[p]));
console.log('éliminations argumentées :', QUESTIONS.filter((q) => hintFor(q).elim).length, '/', QUESTIONS.length);
const part = process.argv[2];
if (part) for (const q of QUESTIONS.filter((x) => x.part === part)) console.log(q.set + '.' + q.num, conceptFor(q).id, '|', q.q.slice(0, 70), '=>', q.options[q.answer].slice(0, 40));
