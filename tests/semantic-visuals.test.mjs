import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { officeConcept, officeArt } from '../src/pro/visuals.js';
import { semanticIcon } from '../src/utils/semantic-icons.js';

globalThis.document = new JSDOM('<!doctype html><body></body>').window.document;
test('Office imagery distinguishes specific topics and rejects accidental substring matches', () => {
  assert.equal(officeConcept('Transition entre diapositives', 'ppt'), 3);
  assert.equal(officeConcept('Tableau croisé dynamique et cellules', 'excel'), 4);
  assert.equal(officeConcept('Mise en page : colonnes', 'word'), 1);
  assert.equal(officeConcept('Dossier', 'excel'), -1);
  assert.equal(officeConcept('Contrainte', 'excel'), -1);
  assert.equal(officeConcept('Réunion dans la boîte de réception', 'outlook'), 1);
});
test('Unmapped Office concepts receive signs, never an unrelated atlas cell', () => {
  const art = officeArt('Signet', 'word');
  assert.equal(art.dataset.symbol, 'bookmark');
  assert.equal(art.getAttribute('aria-hidden'), 'true');
  assert.equal(art.classList.contains('office-art'), false);
  assert.equal(officeArt('Unknown', 'unsupported'), null);
});
test('Correct and incorrect labels have distinguishable signs without relying on color', () => {
  const correct = semanticIcon('Réponse correcte');
  const incorrect = semanticIcon('Réponse incorrecte');
  assert.equal(correct.dataset.symbol, 'check');
  assert.equal(incorrect.dataset.symbol, 'cross');
  assert.notEqual(correct.innerHTML, incorrect.innerHTML);
});
