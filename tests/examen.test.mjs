// Module « Examen professionnel » : banque de QCM, leçons, feedbacks et progression ludique.
import test from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS, levelsOf, conceptFor, hintFor, correctFeedback, wrongFeedback, createExamStore, blancSet, XP, HEARTS } from '../src/examen/engine.js';
import { PARTS, GROUPS } from '../src/examen/data/parts.js';

const memory = () => { const m = {}; return { getItem: (k) => m[k] ?? null, setItem: (k, v) => { m[k] = v; } }; };

test('examen : banque complète, cinq options et une bonne réponse par question', () => {
  assert.ok(QUESTIONS.length >= 650);
  for (const q of QUESTIONS) {
    assert.equal(q.options.length, 5, q.id);
    assert.ok(q.answer >= 0 && q.answer < 5, q.id);
    assert.ok(q.q.length > 5 && q.options.every((o) => o.length > 0), q.id);
  }
  assert.equal(new Set(QUESTIONS.map((q) => q.id)).size, QUESTIONS.length);
});

test('examen : 15 parties, chacune avec leçon, mini-défis valides et niveaux', () => {
  assert.equal(PARTS.length, 15);
  assert.deepEqual(GROUPS.map((g) => g.id), ['D', 'M', 'A']);
  for (const p of PARTS) {
    assert.ok(p.lesson.length >= 2, p.id);
    for (const c of p.lesson) {
      assert.ok(c.t && c.p && c.v?.type && c.fact?.src, p.id + ' ' + c.t);
      assert.ok(c.check.a >= 0 && c.check.a < c.check.o.length, p.id + ' ' + c.t);
    }
    const lv = levelsOf(p.id);
    assert.ok(lv.length >= 1, p.id);
    assert.equal(lv.flat().length, QUESTIONS.filter((q) => q.part === p.id).length);
  }
});

test('examen : chaque question a une notion, un indice et des feedbacks sourcés', () => {
  for (const q of QUESTIONS) {
    const c = conceptFor(q);
    assert.ok(c.hint && c.why && c.src, q.id);
    assert.ok(hintFor(q).text, q.id);
    const ok = correctFeedback(q);
    assert.ok(ok.ok && ok.body.length && ok.src, q.id);
    const wrongIndex = (q.answer + 1) % 5;
    const first = wrongFeedback(q, wrongIndex, 1);
    assert.equal(first.reveal, false);
    assert.ok(!first.body.join(' ').includes(q.options[q.answer]) || q.options[q.answer].length < 4, 'le 1er essai ne révèle pas la réponse : ' + q.id);
    assert.ok(wrongFeedback(q, wrongIndex, 2).body[0].includes(q.options[q.answer]), q.id);
  }
});

test('examen : XP, combo, révision, niveaux et badges', () => {
  const st = createExamStore(memory(), 't');
  const q = QUESTIONS[0];
  assert.equal(st.answer(q, { ok: true, attempt: 1, combo: 1 }), XP.first);
  assert.equal(st.answer(q, { ok: true, attempt: 1, combo: 3 }), XP.first + 2 * XP.comboStep);
  assert.equal(st.answer(q, { ok: true, attempt: 2, combo: 1, hinted: true }), XP.second - XP.hint);
  st.answer(QUESTIONS[1], { ok: false, attempt: 1, combo: 0 });
  assert.deepEqual(st.state.review, [QUESTIONS[1].id]);
  st.answer(QUESTIONS[1], { ok: true, attempt: 1, combo: 1, review: true });
  assert.deepEqual(st.state.review, []);
  assert.equal(st.isLevelOpen('D1', 1), false);
  assert.equal(st.levelDone('D1', 0, { firstTry: 8, total: 8, hints: 0, mistakes: 0 }), 3);
  assert.equal(st.isLevelOpen('D1', 1), true);
  assert.ok(st.state.badges['first-level'] && st.state.badges.perfect);
  assert.ok(st.state.notifs.length > 0);
  assert.equal(HEARTS, 5);
});

test('examen : l’examen blanc respecte la répartition 12 D / 4 M / 4 A', () => {
  const set = blancSet();
  assert.equal(set.length, 20);
  const n = (g) => set.filter((q) => q.part[0] === g).length;
  assert.deepEqual([n('D'), n('M'), n('A')], [12, 4, 4]);
});

test('positionnement : 30 questions pondérées, notions variées, série examen privilégiée', async () => {
  const { positionSet, POSITION_PLAN, conceptFor: cf } = await import('../src/examen/engine.js');
  const set = positionSet();
  assert.equal(set.length, 30);
  for (const [part, n] of Object.entries(POSITION_PLAN)) assert.equal(set.filter((q) => q.part === part).length, n, part);
  assert.ok(set.filter((q) => q.set === 1).length >= 20, 'majorité de questions « niveau examen 2025 »');
  for (const part of Object.keys(POSITION_PLAN)) {
    const qs = set.filter((q) => q.part === part); const ids = qs.map((q) => cf(q).id);
    assert.ok(new Set(ids).size >= Math.min(qs.length, 2) || qs.length === 1, 'notions distinctes : ' + part);
  }
});

test('positionnement : bilan, bandes de maîtrise, parcours et lacunes', async () => {
  const { positionSet, analyzePosition, createExamStore: ces } = await import('../src/examen/engine.js');
  const set = positionSet();
  // Tout juste sauf la didactique D4 (prioritaire) et une question de M2 « je ne sais pas ».
  const answers = set.map((q) => (q.part === 'D4' ? (q.answer + 1) % 5 : q.answer));
  const iM2 = set.findIndex((q) => q.part === 'M2'); answers[iM2] = null;
  const r = analyzePosition(set, answers);
  assert.equal(r.total, 30);
  assert.equal(r.ok, 26);
  assert.equal(r.unknown, 1);
  assert.equal(r.parts.D4.band, 'low');
  assert.equal(r.parts.M2.band, 'mid');
  assert.equal(r.parts.D1.band, 'ok');
  assert.deepEqual(r.priorities, ['D4']);
  assert.equal(r.path[0], 'D4');
  assert.ok(r.path.includes('M2') && !r.path.includes('D1'));
  assert.ok(r.gaps.length >= 2 && r.gaps.every((g) => g.why && g.src));
  const st = ces(memory(), 'pos');
  st.positionDone(r, r.missed);
  assert.equal(st.lastPosition.score, r.score);
  assert.equal(st.state.review.length, r.missed.length);
  assert.ok(st.state.badges.positioned);
});
