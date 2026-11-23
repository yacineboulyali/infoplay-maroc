// Parcours Informatique Collège : ordre officiel des modules, séances complètes, solution → 5/5.
import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><body></body>', { url: 'http://localhost/' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, Node: dom.window.Node });
const { LEVELS, COLLEGE_ACTIVITIES, ACTIVITIES, PRO_ACTIVITIES, getModule, getActivity } = await import('../src/data/index.js');
const { STUDENT_ILLUSTRATIONS } = await import('../src/data/student-illustrations.js');
const { engineOf } = await import('../src/games/index.js');
const { activityScore } = await import('../src/scoring/scoring.js');
const { mulberry, setRng } = await import('../src/utils/dom.js');

test('trois niveaux, modules dans l’ordre du programme (ANPI)', () => {
  assert.deepEqual(LEVELS.map((L) => L.code), ['1AC', '2AC', '3AC']);
  assert.deepEqual(LEVELS[0].modules.map((m) => m.title), ['Système informatique', 'Système d’exploitation', 'Utilitaires et fichiers', 'Traitement de textes', 'Recherches documentaires']);
  assert.deepEqual(LEVELS[1].modules.map((m) => m.unit), ['U1', 'U1', 'U2', 'U3', 'U4']);
  assert.deepEqual(LEVELS[2].modules.map((m) => m.unit), ['U1', 'U2', 'U3', 'U4', 'U5']);
  assert.deepEqual(LEVELS.map((L) => L.modules.reduce((k, m) => k + m.hours, 0)), [30, 30, 30]);
});
test('identifiants uniques et distincts des autres parcours', () => {
  const ids = [...ACTIVITIES, ...PRO_ACTIVITIES, ...COLLEGE_ACTIVITIES].map((a) => a.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const L of LEVELS) for (const m of L.modules) assert.equal(getModule(m.id), m);
  assert.equal(getActivity('m11-s1-a1').moduleId, 11);
});
test('chaque séance : titre du programme, 4 activités de mécaniques différentes', () => {
  for (const L of LEVELS) for (const m of L.modules) {
    assert.ok(m.sessions.length <= m.plan.length, m.title);
    m.sessions.forEach((s, i) => {
      assert.equal(s.title, m.plan[i], `${m.id} : ordre du programme`);
      assert.equal(s.acts.length, 4, s.id);
      assert.equal(new Set(s.acts.map((a) => a.mech)).size, 4, s.id);
      assert.ok(s.ar && s.retenir && s.situation, s.id + ' : ar / retenir / situation');
    });
  }
  assert.equal(LEVELS[0].modules[0].sessions.length + LEVELS[0].modules[1].sessions.length, 8);
});
test('les activités reprises pointent vers des images existantes', () => {
  for (const a of COLLEGE_ACTIVITIES.filter((x) => x.illus)) {
    assert.ok(Object.keys(STUDENT_ILLUSTRATIONS).some((k) => k.startsWith(a.illus + '-q')) || getActivity(a.illus), a.id + ' → ' + a.illus);
    assert.equal(getActivity(a.illus).title, a.title, a.id + ' : même contenu que la source');
  }
});
for (const a of COLLEGE_ACTIVITIES) {
  test('moteur ' + a.id + ' : solution → 5/5', () => {
    setRng(mulberry(a.id.length * 7919 + a.index));
    const root = document.createElement('div'); document.body.append(root);
    const eng = engineOf(a.mech)(root, { ...a.data, illustrationActivityId: a.illus || a.id });
    const r0 = eng.check();
    if (!r0.incomplete) assert.ok(activityScore(r0.correct, r0.total) < 5);
    eng.solve();
    const r = eng.check(); assert.ok(!r.incomplete, 'incomplet : ' + r.incomplete);
    assert.equal(r.correct, r.total, JSON.stringify(r.items.filter((i) => !i.ok)));
    root.remove();
  });
}
test('images des activités nouvelles : clés existantes, une par élément', () => {
  const size = (a) => ({ sort: a.data.items, match: a.data.pairs, quiz: a.data.qs, order: a.data.steps, fill: a.data.lines }[a.type] || []).length;
  for (const a of COLLEGE_ACTIVITIES.filter((x) => x.pics)) {
    assert.equal(a.pics.length, size(a), a.id + ' : nombre d’images');
    a.pics.filter(Boolean).forEach((k) => assert.ok(STUDENT_ILLUSTRATIONS[k], a.id + ' : image inconnue ' + k));
  }
});
const { SCENES, regionIds } = await import('../src/games/scenes.js');
const { parseLevel, shortest } = await import('../src/games/robot.js');
test('programme complet : chaque module a toutes ses séances', () => {
  for (const L of LEVELS) for (const m of L.modules) assert.equal(m.sessions.length, m.plan.length, `${L.code} · ${m.title}`);
  assert.deepEqual(LEVELS.map((L) => L.modules.reduce((k, m) => k + m.sessions.length, 0)), [19, 23, 24]);
});
test('contenu des activités nouvelles (mêmes règles que le Tronc Commun)', () => {
  const uniq = (a) => new Set(a).size === a.length; const str = (s) => typeof s === 'string' && s.trim().length > 0;
  for (const a of COLLEGE_ACTIVITIES) {
    const d = a.data;
    if (a.type === 'match') { assert.ok(d.pairs.length >= 5, a.id); assert.ok(uniq(d.pairs.map((p) => p[0])) && uniq(d.pairs.map((p) => p[1])), a.id); }
    if (a.type === 'sort') { assert.ok(d.items.length >= 5, a.id); assert.ok(uniq(d.items.map((i) => i[0])), a.id); d.cats.forEach((c, ci) => assert.ok(d.items.some((i) => i[1] === ci), a.id + ' catégorie vide ' + c)); }
    if (a.type === 'order') { assert.ok(d.steps.length >= 5, a.id); assert.ok(uniq(d.steps), a.id); }
    if (a.type === 'quiz') d.qs.forEach((q) => { assert.ok(str(q[0]) && str(q[2]), a.id); assert.ok(q[1].length >= 3 && uniq(q[1]), a.id + ' : ' + q[0]); });
    if (a.type === 'fill') { let n = 0; for (const l of d.lines) { const t = Array.isArray(l) ? l[0] : l; for (const mm of t.matchAll(/\[\[(.+?)\]\]/g)) { n++; assert.ok(uniq(mm[1].split('|')), a.id + ' : ' + mm[1]); } } assert.ok(n >= 5, a.id); }
    if (a.type === 'hot') d.prompts.forEach((p) => assert.ok(regionIds(SCENES[d.scene]).includes(p[0]), a.id));
    if (a.type === 'robot') d.levels.forEach((l, i) => { const p = shortest(parseLevel(l.grid)); assert.ok(p && p.length <= l.max, `${a.id} niveau ${i + 1}`); });
    if (a.type === 'sim') assert.ok(d.tasks.length >= 5, a.id);
  }
});
test('stockage : un essai Collège est enregistré, rechargé et exporté', async () => {
  const { createStore, memoryAdapter } = await import('../src/storage/store.js');
  const { isActivityId } = await import('../src/data/index.js');
  const ad = memoryAdapter(); const st = createStore(ad, isActivityId); const p = st.createProfile('Salma');
  for (const id of ['m11-s1-a1', 'm24-s10-a4', 'm35-s6-a4']) st.recordAttempt(p.id, id, 5, 1);
  const again = createStore(ad, isActivityId);
  for (const id of ['m11-s1-a1', 'm24-s10-a4', 'm35-s6-a4']) assert.equal(again.record(p.id, id)?.attempts.length, 1, id + ' perdu au rechargement');
  assert.throws(() => st.recordAttempt(p.id, 'm16-s1-a1', 5, 1));
  assert.match(st.csv(COLLEGE_ACTIVITIES), /m35-s6-a4/);
});

test('traduction arabe : titres, questions et réponses de toutes les activités Collège', async () => {
  const { arText, arActivity } = await import('../src/i18n/ar.js');
  const { arQuestion } = await import('../src/i18n/ar-questions.js');
  const { AR_COLLEGE_SKIP } = await import('../src/i18n/ar-college.js');
  const skip = new Set(AR_COLLEGE_SKIP);
  const missing = [];
  const term = (a, s) => { const k = String(s).trim(); if (!skip.has(k) && !arText(k)) missing.push(`${a.id} : ${k}`); };
  for (const a of COLLEGE_ACTIVITIES) {
    const qid = a.illus || a.id; const d = a.data;
    if (!arActivity(qid)) missing.push(`${a.id} : titre`);
    const qs = (arr) => arr.forEach((_, i) => { if (!arQuestion(qid, i)) missing.push(`${a.id} : question ${i + 1}`); });
    if (a.type === 'match') d.pairs.forEach((p) => { term(a, p[0]); term(a, p[1]); });
    if (a.type === 'sort') d.items.forEach((it) => term(a, it[0]));
    if (a.type === 'order') d.steps.forEach((s) => term(a, s));
    if (a.type === 'quiz') d.qs.forEach((x, i) => { if (!arText(x[0].split('\n')[0]) && !arQuestion(qid, i)) missing.push(`${a.id} : question ${i + 1}`); x[1].forEach((o) => term(a, o)); });
    if (a.type === 'fill') {
      qs(d.lines);
      // Comme au Tronc Commun : le blanc reste un blanc (« … ») dans la traduction.
      if (!a.illus) d.lines.forEach((_, i) => assert.match(arQuestion(qid, i), /…/, `${a.id} : blanc absent de la question ${i + 1}`));
    }
    if (a.type === 'hot') qs(d.prompts);
    if (a.type === 'sim') qs(d.tasks);
  }
  assert.deepEqual(missing, []);
});
