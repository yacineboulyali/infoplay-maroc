import test from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { officeConcept, officeArt } from '../src/pro/visuals.js';
import { semanticIcon } from '../src/utils/semantic-icons.js';
import { categoryVisual, labelIllustration } from '../src/utils/item-visuals.js';
import { labelKey } from '../src/utils/label-key.js';
import { conceptVisual } from '../src/egtsi106/visuals.js';
import { ACTIVITIES, PRO_ACTIVITIES } from '../src/data/index.js';
import { existsSync } from 'node:fs';

globalThis.document = new JSDOM('<!doctype html><body></body>').window.document;

test('Category images reuse reviewed concepts and distinguish data input from the Enter key', () => {
  assert.match(categoryVisual('Entrée').getAttribute('src'), /lbl-251be805\.webp$/);
  assert.match(labelIllustration('Entrée').getAttribute('src'), /lbl-0891ea66\.webp$/);
  const entree = conceptVisual('Entrée', () => null); // image encadrée comme les autres images EGTSI
  assert.match((entree.querySelector('img') || entree).getAttribute('src'), /lbl-251be805\.webp$/);
  assert.match(categoryVisual('Modèle').getAttribute('src'), /lbl-64219efb\.webp$/);
  assert.match(categoryVisual('Information').getAttribute('src'), /m1-s1-a1-q01-/);
  assert.match(categoryVisual('Le LAN').getAttribute('src'), /m4-s2-a2-q01-/);
  assert.equal(categoryVisual('Catégorie sans illustration').dataset.labelKey, labelKey('Catégorie sans illustration'));
});

test('Every sorting category resolves to a packaged local illustration', () => {
  for (const activity of [...ACTIVITIES, ...PRO_ACTIVITIES].filter(a => a.type === 'sort')) {
    for (const label of activity.data.cats) {
      const image = categoryVisual(label);
      assert.equal(image.tagName, 'IMG', `${activity.id}: ${label}`);
      assert.ok(existsSync(new URL('../public/' + image.getAttribute('src'), import.meta.url)), `${activity.id}: ${label}`);
    }
  }
});
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
