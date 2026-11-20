// Module « Examen professionnel » : banque de QCM, leçons, feedbacks et progression ludique.
import test from 'node:test';
import assert from 'node:assert/strict';
import { QUESTIONS, levelsOf, annalesStart, isAnnales, conceptFor, hintFor, correctFeedback, wrongFeedback, createExamStore, blancSet, XP, HEARTS } from '../src/examen/engine.js';
import { PARTS, GROUPS } from '../src/examen/data/parts.js';

const memory = () => { const m = {}; return { getItem: (k) => m[k] ?? null, setItem: (k, v) => { m[k] = v; } }; };

test('examen : banque complète, options valides et une bonne réponse par question', () => {
  assert.ok(QUESTIONS.length >= 650);
  for (const q of QUESTIONS) {
    const n = { qcm: [5, 5], vf: [2, 2], fill: [3, 4] }[q.type];
    assert.ok(n, 'type connu : ' + q.id);
    assert.ok(q.options.length >= n[0] && q.options.length <= n[1], q.id);
    assert.ok(q.answer >= 0 && q.answer < q.options.length, q.id);
    assert.ok(q.q.length > 5 && q.options.every((o) => o.length > 0), q.id);
    assert.equal(new Set(q.options).size, q.options.length, 'options distinctes : ' + q.id);
    if (q.type === 'fill') assert.equal(q.q.split('____').length, 2, 'un seul trou : ' + q.id);
  }
  assert.equal(new Set(QUESTIONS.map((q) => q.id)).size, QUESTIONS.length);
});

test('examen : annales 2021-2025 rangées par partie, sourcées et dans une piste ouverte', () => {
  const ann = QUESTIONS.filter(isAnnales);
  assert.ok(ann.length >= 100);
  for (const y of ['2021', '2022', '2023', '2024', '2025']) assert.ok(ann.some((q) => q.exam.startsWith(y)), 'session ' + y);
  for (const t of ['qcm', 'vf', 'fill']) assert.ok(ann.some((q) => q.type === t), 'type ' + t);
  for (const q of ann) {
    assert.ok(PARTS.some((p) => p.id === q.part), q.id);
    assert.ok(q.just, 'justification : ' + q.id);
    assert.equal(q.lang, q.part[0] === 'A' ? 'ar' : 'fr', q.id);
  }
  // Les 46 QCM retenus de 2025 (Q21-Q70 sauf Q50, Q55, Q57, Q61), chacun une seule fois.
  const q25 = ann.filter((q) => /^2025 · Q\d+$/.test(q.exam)).map((q) => +q.exam.split('Q')[1]);
  assert.equal(new Set(q25).size, q25.length);
  assert.equal(q25.length, 46);
  const st = createExamStore(memory(), 'ann');
  for (const p of PARTS) {
    const a0 = annalesStart(p.id); const lv = levelsOf(p.id);
    if (a0 < 0) continue;
    assert.ok(lv.slice(0, a0).flat().every((q) => !isAnnales(q)) && lv.slice(a0).flat().every(isAnnales), p.id);
    assert.equal(st.isLevelOpen(p.id, a0), true, p.id);
  }
  // L'examen blanc garde le format de l'épreuve : QCM uniquement.
  assert.ok(blancSet().every((q) => q.type === 'qcm'));
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
    const wrongIndex = (q.answer + 1) % q.options.length;
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

test('exemples : chaque notion et chaque carte de leçon a son exemple concret', async () => {
  const { CONCEPTS_FR } = await import('../src/examen/data/concepts-fr.js');
  const { CONCEPTS_AR } = await import('../src/examen/data/concepts-ar.js');
  const { EXAMPLES_FR } = await import('../src/examen/data/examples-fr.js');
  const { EXAMPLES_AR } = await import('../src/examen/data/examples-ar.js');
  const { LESSON_EXAMPLES } = await import('../src/examen/data/lesson-examples.js');
  const { exampleFor } = await import('../src/examen/engine.js');
  for (const c of CONCEPTS_FR) assert.ok(EXAMPLES_FR[c.id]?.length > 30, 'exemple FR : ' + c.id);
  for (const c of CONCEPTS_AR) assert.ok(EXAMPLES_AR[c.id]?.length > 30, 'exemple AR : ' + c.id);
  for (const p of PARTS) assert.equal(LESSON_EXAMPLES[p.id]?.length, p.lesson.length, 'exemples de leçon : ' + p.id);
  for (const q of QUESTIONS) assert.ok(exampleFor(q), q.id);
  const q = QUESTIONS[0];
  assert.ok(correctFeedback(q).ex && wrongFeedback(q, (q.answer + 1) % 5, 2).ex);
  assert.equal(wrongFeedback(q, (q.answer + 1) % 5, 1).ex, undefined, 'pas d’exemple au 1er essai faux (il pourrait orienter la réponse)');
});

test('traduction arabe : chaque texte français du module a sa traduction', async () => {
  const { trAr } = await import('../src/examen/i18n.js');
  const { CONCEPTS_FR } = await import('../src/examen/data/concepts-fr.js');
  const { EXAMPLES_FR } = await import('../src/examen/data/examples-fr.js');
  const fr = QUESTIONS.filter((q) => q.lang === 'fr');
  // Même règle que scripts/tr-ar-extract.mjs : un texte sans lettres (« 1001 », « $B$1 ») n'a pas à être traduit.
  const hasWords = (s) => /[a-zA-Zéèà]{2}/.test(s);
  assert.ok(fr.length > 400);
  for (const q of fr) {
    assert.ok(trAr(q.q), 'énoncé : ' + q.id);
    // Les options sans mots (« 22 h », « a == b », « 199, 200 ») n'ont pas besoin de traduction.
    q.options.forEach((o, i) => assert.ok(!/[a-zA-Zéèà]{2}/.test(o) || trAr(o), `option ${i} : ${q.id}`));
  }
  for (const p of PARTS.filter((x) => x.lang === 'fr')) for (const c of p.lesson) {
    for (const s of [c.t, c.p, c.fact.t, c.check.q, c.check.why, ...c.check.o]) assert.ok(!/[a-zA-Zéèà]{2}/.test(s) || trAr(s), `leçon ${p.id} : ${s.slice(0, 40)}`);
  }
  for (const c of CONCEPTS_FR) assert.ok(trAr(c.hint) && trAr(c.why), 'notion : ' + c.id);
  for (const [k, v] of Object.entries(EXAMPLES_FR)) assert.ok(trAr(v), 'exemple : ' + k);
  // Le feedback et l'indice d'une question française portent leur version arabe.
  const q = fr[0];
  const ok = correctFeedback(q); assert.ok(ok.titleAr && ok.bodyAr.length && ok.exAr);
  const ko = wrongFeedback(q, (q.answer + 1) % 5, 2); assert.ok(ko.bodyAr[0].startsWith('الجواب الصحيح'));
  assert.ok(hintFor(q).textAr);
  assert.equal(correctFeedback(QUESTIONS.find((x) => x.lang === 'ar')).bodyAr, undefined, 'pas de traduction pour une question déjà en arabe');
});

test('traduction arabe de l’interface : rangs, badges, niveaux et textes avec nombres', async () => {
  globalThis.document ??= undefined;
  const { uiAr } = await import('../src/examen/tr-ui.js');
  const { RANKS, BADGES, LEVELS_POS, MASTERY_BANDS } = await import('../src/examen/engine.js');
  for (const r of RANKS) assert.ok(uiAr(r.fr), 'rang : ' + r.fr);
  for (const b of BADGES.filter((x) => !/[؀-ۿ]/.test(x.t))) assert.ok(uiAr(b.t) && uiAr(b.d), 'badge : ' + b.id);
  for (const l of LEVELS_POS) assert.ok(uiAr(l.fr) && uiAr(l.text), 'niveau : ' + l.fr);
  for (const m of MASTERY_BANDS) assert.ok(uiAr(m.fr), 'bande : ' + m.fr);
  for (const s of ['Vérifier', 'Continuer', '💡 Indice', '100 XP avant « Stagiaire »', '📖 · 0/11 niveaux · ⭐ 0/33', 'Leçon · Planifier',
    '4.7/20 · Débutant', '10 partie(s) prioritaire(s) · voir le bilan', 'Niveau 3', '8 questions', '6 cartes animées · +50 XP', 'Annales 2',
    '−3 XP sur cette question', 'Correction des 30 questions', 'Revoir les 23 questions ratées', 'Commencer le parcours : Planifier']) {
    assert.ok(uiAr(s), 'interface : ' + s);
  }
  assert.equal(uiAr('Texte inconnu du dictionnaire'), '');
  assert.equal(uiAr('12/20'), '', 'pas de traduction pour un texte sans mots');
});

test('ordre aléatoire : propositions mélangées, bonne réponse conservée, « aucune » en dernier', async () => {
  const { shuffled, shuffleArr } = await import('../src/examen/engine.js');
  let seed = 7; const rng = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  let moved = 0;
  for (const q of QUESTIONS) {
    const s = shuffled(q, rng);
    assert.equal(s.id, q.id);
    assert.equal(s.options[s.answer], q.options[q.answer], 'bonne réponse : ' + q.id);
    assert.deepEqual([...s.options].sort(), [...q.options].sort(), 'mêmes propositions : ' + q.id);
    const none = q.options.findIndex((o) => /^aucune de ces|^لا شيء مما سبق/i.test(o));
    if (none >= 0) assert.match(s.options[s.options.length - 1], /^aucune de ces|^لا شيء مما سبق/i, '« aucune » en dernier : ' + q.id);
    if (q.type === 'vf') assert.deepEqual(s.options, q.options, 'vrai/faux inchangé');
    if (s.options.join() !== q.options.join()) moved++;
    // Le feedback et l'indice s'appuient sur la version mélangée : la lettre annoncée est la bonne.
    const fb = wrongFeedback(s, (s.answer + 1) % s.options.length, 2);
    assert.ok(fb.body[0].includes(s.options[s.answer]));
  }
  assert.ok(moved > QUESTIONS.length * 0.8, 'la plupart des questions changent d’ordre');
  const a = [1, 2, 3, 4, 5, 6, 7, 8];
  assert.deepEqual(shuffleArr(a, rng).sort(), a);
});
