import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { ACTIVITIES } from '../src/data/index.js';
import { STUDENT_ILLUSTRATIONS } from '../src/data/student-illustrations.js';
import { studentIllustration } from '../src/utils/student-illustrations.js';
import { engineOf } from '../src/games/index.js';

const dom = new JSDOM('<!doctype html><body></body>', { url: 'http://localhost/' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, Node: dom.window.Node });
const manifest = JSON.parse(readFileSync(new URL('../output/student-illustrations/manifest.json', import.meta.url)));
const approved = manifest.questions.filter(q => q.readyForIntegration && q.status === 'generated-reviewed' && !q.generation.needsRegeneration);
const mount = id => {
  const a = ACTIVITIES.find(a => a.id === id), root = document.createElement('div');
  const engine = engineOf(a.mech)(root, { ...a.data, illustrationActivityId: a.id });
  return { root, engine };
};
const ids = root => [...root.querySelectorAll('.student-illustration')].map(i => i.dataset.questionId);

test('only independently reviewed question assets are packaged locally', () => {
  assert.equal(Object.keys(STUDENT_ILLUSTRATIONS).length, approved.length);
  assert.equal(new Set(Object.values(STUDENT_ILLUSTRATIONS)).size, approved.length);
  for (const q of manifest.questions) {
    assert.equal(!!STUDENT_ILLUSTRATIONS[q.id], approved.includes(q), q.id);
    if (STUDENT_ILLUSTRATIONS[q.id]) assert.ok(existsSync(new URL('../public/' + STUDENT_ILLUSTRATIONS[q.id], import.meta.url)), q.id);
  }
  assert.equal(studentIllustration({}, 0), null);
  assert.equal(studentIllustration({ illustrationActivityId: 'm205-s1-a1' }, 0), null);
});

test('all available images render against their source item across game engines', () => {
  for (const a of ACTIVITIES) {
    const { root, engine } = mount(a.id);
    const expected = approved.filter(q => q.activityId === a.id && (!['sim', 'robot'].includes(a.type) || q.id.endsWith('q01'))).map(q => q.id).sort();
    assert.deepEqual(ids(root).sort(), expected, a.id);
    for (const img of root.querySelectorAll('.student-illustration')) {
      assert.equal(img.getAttribute('alt'), '');
      assert.equal(img.getAttribute('draggable'), 'false');
    }
    engine.solve();
    const result = engine.check();
    assert.equal(result.correct, result.total, a.id);
  }
});

test('matching images stay on the concept side and sorting preserves item identity', () => {
  const match = mount('m1-s1-a1');
  assert.equal(match.root.querySelectorAll('.match-droptarget .student-illustration').length, 0);
  assert.equal(match.root.querySelectorAll('.match-droptarget .item-art, .match-droptarget .office-art').length, 0);
  const a = ACTIVITIES.find(a => a.type === 'sort' && STUDENT_ILLUSTRATIONS[a.id + '-q01']);
  const { root, engine } = mount(a.id);
  const before = ids(root).sort();
  engine.solve();
  assert.deepEqual(ids(root).sort(), before);
  assert.equal(engine.check().correct, engine.check().total);
  for (const img of root.querySelectorAll('.student-illustration')) {
    const button = img.closest('[data-idx]');
    assert.equal(img.dataset.questionId, `${a.id}-q${String(Number(button.dataset.idx) + 1).padStart(2, '0')}`);
  }
});

test('ordering preserves images after reordering and assembly preserves source part identity', () => {
  for (const type of ['order', 'asm']) {
    const a = ACTIVITIES.find(a => a.type === type && STUDENT_ILLUSTRATIONS[a.id + '-q01']);
    const { root, engine } = mount(a.id);
    engine.solve();
    assert.equal(engine.check().correct, engine.check().total);
    if (type === 'order') assert.deepEqual(ids(root), approved.filter(q => q.activityId === a.id).map(q => q.id));
  }
});

test('simulation and robot images follow the current task without replacing interactive boards', () => {
  const sim = mount('m2-s2-a3');
  assert.deepEqual(ids(sim.root), ['m2-s2-a3-q01']);
  sim.root.querySelector('.taskbox button').click();
  assert.deepEqual(ids(sim.root), ['m2-s2-a3-q02']);
  sim.engine.solve();
  assert.deepEqual(ids(sim.root), []);
  const robot = mount('m3-s1-a4');
  assert.deepEqual(ids(robot.root), ['m3-s1-a4-q01']);
  robot.root.querySelectorAll('[role=tab]')[1].click();
  assert.deepEqual(ids(robot.root), ['m3-s1-a4-q02']);
  assert.ok(robot.root.querySelector('.rgrid .rcell'));
});
