// Monte chaque activité dans jsdom, applique solve() puis vérifie : score maximum et aucune erreur.
import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
const dom = new JSDOM('<!doctype html><body></body>', { url: 'http://localhost/' });
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement, Node: dom.window.Node });
const { ACTIVITIES } = await import('../src/data/index.js');
const { engineOf } = await import('../src/games/index.js');
const { activityScore } = await import('../src/scoring/scoring.js');
const { mulberry, setRng } = await import('../src/utils/dom.js');

for (const a of ACTIVITIES) {
  test('moteur ' + a.id + ' : solution → 5/5', () => {
    setRng(mulberry(a.id.length * 7919 + a.index));
    const root = document.createElement('div'); document.body.append(root);
    const eng = engineOf(a.mech)(root, a.data);
    // 1) avant toute réponse : doit calculer sans erreur et ne pas donner la note maximale
    const r0 = eng.check();
    if (!r0.incomplete) assert.ok(activityScore(r0.correct, r0.total) < 5, 'une activité vide ne doit pas valoir 5');
    // 2) solution
    eng.solve();
    const r = eng.check(); assert.ok(!r.incomplete, 'incomplet : ' + r.incomplete);
    assert.equal(r.correct, r.total, 'attendu tout correct : ' + JSON.stringify(r.items.filter((i) => !i.ok)));
    assert.equal(activityScore(r.correct, r.total), 5);
    assert.ok(r.items.every((i) => typeof i.msg === 'string' && i.msg.length > 0));
    eng.reveal && eng.reveal(r);
    root.remove();
  });
}
