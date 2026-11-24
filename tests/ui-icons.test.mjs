import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { UI_ICONS } from '../src/data/ui-icons.js';

const lots = ['tools', 'badges', 'sims'];
const lists = new URL('../output/missing-images/', import.meta.url);
const publicDir = new URL('../public/', import.meta.url);

test('Les icônes d’interface correspondent aux listes et existent localement', () => {
  const keys = lots.flatMap((lot) => readFileSync(new URL(`ui-icons-${lot}.jsonl`, lists), 'utf8')
    .split(/\r?\n/).filter((line) => line.trim()).map((line) => JSON.parse(line).key));
  assert.deepEqual(Object.keys(UI_ICONS).sort(), keys.sort());
  for (const [key, path] of Object.entries(UI_ICONS)) {
    assert.ok(existsSync(new URL(path, publicDir)), `Fichier introuvable pour ${key} (${path})`);
  }
});
