// Couverture de la traduction arabe à la demande : questions, propositions et indice des quiz.
import test from 'node:test';
import assert from 'node:assert/strict';
import { ACTIVITIES } from '../src/data/index.js';
import { COLLEGE_ACTIVITIES } from '../src/data/college/index.js';
import { PRO_ACTIVITIES } from '../src/data/pro/index.js';
import { arText } from '../src/i18n/ar.js';
import { arQuestion } from '../src/i18n/ar-questions.js';
import { QUESTIONS, hintFor } from '../src/examen/engine.js';

const ALL = [...new Map([...ACTIVITIES, ...COLLEGE_ACTIVITIES, ...PRO_ACTIVITIES].map((a) => [a.id, a])).values()];
const itemsOf = (d) => d.qs ? d.qs.map((q) => q[0]) : d.lines ? d.lines.map((l) => (Array.isArray(l) ? l[0] : l)) : d.tasks ? d.tasks.map((t) => t[0]) : [];

test('chaque question, phrase à trous et étape de simulation a sa traduction arabe', () => {
  const missing = [];
  for (const a of ALL) {
    if (a.mech?.startsWith('prog')) continue; // énoncé en code : consigne générique traduite
    itemsOf(a.data || {}).forEach((t, i) => {
      const first = String(t).split('\n')[0];
      if (!((a.data.qs && arText(first)) || arQuestion(a.illus || a.id, i))) missing.push(`${a.id} #${i}`);
    });
  }
  assert.deepEqual(missing, []);
});

test('les phrases à trous traduites gardent un « … » par trou (la réponse n’est jamais donnée)', () => {
  for (const a of ALL) (a.data?.lines || []).forEach((l, i) => {
    const t = Array.isArray(l) ? l[0] : l; const ar = arQuestion(a.illus || a.id, i);
    if (!ar) return;
    const dots = (x) => (x.match(/…/g) || []).length;
    assert.equal(dots(ar), dots(t.replace(/\[\[.*?\]\]/g, '')) + (t.match(/\[\[/g) || []).length, `${a.id} #${i}`);
  });
});

test('chaque proposition de réponse rédigée en français a sa traduction arabe', () => {
  // Les codes, formules, extensions, adresses et noms de logiciels restent tels quels.
  const words = (s) => (s.match(/[a-zéèêàâçùûôî]{3,}/g) || []).length;
  const missing = new Set();
  for (const a of ALL) for (const q of a.data?.qs || []) for (const o of q[1]) {
    if (arText(o) || /[@=]|\.\w/.test(o) || o === 'LibreOffice Calc' || /^[\w-]+$/.test(o) || words(o) < 2) continue;
    missing.add(o);
  }
  assert.deepEqual([...missing], []);
});

test('Examen : l’indice donne la bonne réponse, sa justification et leur traduction', () => {
  for (const q of QUESTIONS) {
    const a = hintFor(q).answer;
    assert.equal(a.text, q.options[q.answer], q.id);
    assert.ok(a.why.length > 20, q.id);
    if (q.lang === 'fr') { assert.ok(a.textAr, q.id); assert.ok(a.whyAr, q.id); }
  }
});
