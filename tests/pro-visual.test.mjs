import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { PRO } from '../src/data/pro/index.js';
import { cardsOf } from '../src/pro/engine.js';
import { practiceData } from '../src/pro/practice.js';
import { quizGame, sortGame } from '../src/games/basic.js';

const dom = new JSDOM('<!doctype html><body></body>');
Object.assign(globalThis, { window: dom.window, document: dom.window.document });
test('80 activités : quatre entraînements visuels complets, corrigés et sans réponse précochée', () => {
  for (const session of PRO.sessions) for (const act of session.acts) {
    assert.equal(act.data.visualPart, session.part);
    const cards = cardsOf(session).filter(c => c.actId === act.id);
    assert.ok(cards.length, act.id);
    for (const mode of ['good', 'false', 'tf', 'sort']) {
      const root = document.createElement('div');
      const data = practiceData(cards, mode, session.part);
      const engine = (mode === 'sort' ? sortGame : quizGame)(root, data);
      const initial = engine.check();
      assert.equal(initial.correct, 0, `${act.id}/${mode}`);
      assert.ok(root.querySelector('.office-art, .semantic-icon'));
      engine.solve(); const result = engine.check();
      assert.ok(result.total > 0);
      assert.equal(result.correct, result.total, `${act.id}/${mode}`);
      engine.reveal(result);
    }
  }
});
