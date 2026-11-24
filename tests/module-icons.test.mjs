import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { CATALOG, COLLEGE_MODULES } from '../src/data/index.js';
import { MODULE_ICONS } from '../src/data/module-icons.js';

const publicDir = new URL('../public/', import.meta.url);
const worklist = new URL('../output/missing-images/module-icons.jsonl', import.meta.url);
const requiredKeys = [
  ...[...CATALOG, ...COLLEGE_MODULES].map(({ id }) => `m${id}`),
  'm205', 'm205-word', 'm205-excel', 'm205-ppt', 'm205-outlook',
  'egtsi106', 'egtsi106-s1', 'egtsi106-s2', 'egtsi106-s3',
];

test('Chaque module, partie M205 et séance EGTSI106 a une icône locale', () => {
  for (const key of requiredKeys) {
    assert.ok(Object.hasOwn(MODULE_ICONS, key), `Icône absente de l’index pour ${key}`);
  }
  for (const [key, path] of Object.entries(MODULE_ICONS)) {
    assert.ok(existsSync(new URL(path, publicDir)), `Fichier introuvable pour ${key} (${path})`);
  }
});

test('L’index des icônes correspond exactement aux clés de la liste de travail', () => {
  const keys = readFileSync(worklist, 'utf8').trim().split(/\r?\n/).map((line) => JSON.parse(line).key);
  assert.deepEqual(Object.keys(MODULE_ICONS).sort(), keys.sort());
  assert.deepEqual(keys, requiredKeys.toSorted());
});
