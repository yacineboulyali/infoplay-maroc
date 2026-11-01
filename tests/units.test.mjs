import test from 'node:test';
import assert from 'node:assert/strict';
import { activityScore, band, sessionStats, moduleStats } from '../src/scoring/scoring.js';
import { createStore, memoryAdapter, validateBackup, KEY } from '../src/storage/store.js';
import { computeCell } from '../src/games/sheetcalc.js';
import { interpret } from '../src/games/prog.js';
import { runProgram, parseLevel, shortest } from '../src/games/robot.js';
import { CATALOG, isActivityId } from '../src/data/index.js';

test('scoring 0–5', () => {
  assert.equal(activityScore(5, 5), 5); assert.equal(activityScore(0, 5), 0); assert.equal(activityScore(3, 5), 3); assert.equal(activityScore(7, 10), 3.5); assert.equal(activityScore(5, 6), 4.2);
  assert.equal(activityScore(9, 5), 5); assert.equal(activityScore(-1, 5), 0); assert.equal(activityScore(1, 0), 0);
});
test('bandes de feedback', () => { assert.equal(band(16).label, 'Très bien'); assert.equal(band(12).label, 'Bien'); assert.equal(band(10).label, 'En cours d’acquisition'); assert.equal(band(9.9).label, 'À renforcer'); });
test('statistiques de séance et de module', () => {
  const s = CATALOG[0].sessions[0]; const rec = {}; s.acts.forEach((a, i) => { rec[a.id] = { attempts: [{ score: 2 }, { score: 5 }] }; });
  const st = sessionStats(s, (id) => rec[id]); assert.equal(st.first, 8); assert.equal(st.best, 20); assert.equal(st.status, 'done'); assert.equal(st.max, 20);
  const none = sessionStats(s, () => undefined); assert.equal(none.status, 'todo'); assert.equal(moduleStats(CATALOG[0], () => undefined).max, 80);
});
test('profils : création, validation, pas d’injection', () => {
  const st = createStore(memoryAdapter(), isActivityId);
  assert.throws(() => st.createProfile('   '));
  const p = st.createProfile('<b>Sara</b>', '2AC-1'); assert.equal(p.displayName, 'bSara/b'); assert.ok(!/[<>]/.test(p.displayName));
  assert.equal(st.active().id, p.id);
});
test('préférences audio : valeurs par défaut, bornes et persistance', () => {
  const ad = memoryAdapter(); const st = createStore(ad, isActivityId); const p = st.createProfile('Nora');
  assert.equal(p.preferences.soundEnabled, true); assert.equal(p.preferences.hoverSound, false); assert.equal(p.preferences.volume, 0.45);
  st.updateProfile(p.id, { preferences: { soundEnabled: false, hoverSound: true, volume: 8 } });
  assert.equal(st.active().preferences.soundEnabled, false); assert.equal(st.active().preferences.hoverSound, true); assert.equal(st.active().preferences.volume, 1);
  const again = createStore(ad, isActivityId); assert.equal(again.active().preferences.soundEnabled, false); assert.equal(again.active().preferences.volume, 1);
});
test('premier essai immuable, meilleur essai, plusieurs essais', () => {
  const st = createStore(memoryAdapter(), isActivityId); const p = st.createProfile('Omar');
  st.recordAttempt(p.id, 'm1-s1-a1', 2); st.recordAttempt(p.id, 'm1-s1-a1', 5); st.recordAttempt(p.id, 'm1-s1-a1', 3);
  assert.equal(st.first(p.id, 'm1-s1-a1'), 2); assert.equal(st.best(p.id, 'm1-s1-a1'), 5); assert.equal(st.record(p.id, 'm1-s1-a1').attempts.length, 3);
  assert.throws(() => st.recordAttempt(p.id, 'zzz', 1)); assert.throws(() => st.recordAttempt('nope', 'm1-s1-a1', 1));
  st.recordAttempt(p.id, 'm1-s1-a2', 9.7); assert.equal(st.best(p.id, 'm1-s1-a2'), 5);
});
test('persistance : rechargement depuis le même stockage', () => {
  const ad = memoryAdapter(); const a = createStore(ad, isActivityId); const p = a.createProfile('Lina'); a.recordAttempt(p.id, 'm2-s3-a4', 4);
  const b = createStore(ad, isActivityId); assert.equal(b.profiles().length, 1); assert.equal(b.best(p.id, 'm2-s3-a4'), 4); assert.equal(b.active().id, p.id);
});
test('stockage corrompu : récupération sans plantage', () => {
  const ad = memoryAdapter(); ad.set(KEY, '{pas du json'); const st = createStore(ad, isActivityId); assert.equal(st.profiles().length, 0); assert.equal(st.recovered, true); assert.ok(ad.get(KEY + '.corrupt'));
});
test('export / import : fusion sans écrasement', () => {
  const A = createStore(memoryAdapter(), isActivityId); const p = A.createProfile('Sara', '2AC'); A.recordAttempt(p.id, 'm1-s1-a1', 3); A.recordAttempt(p.id, 'm1-s1-a1', 4);
  const json = A.exportJSON(); const B = createStore(memoryAdapter(), isActivityId);
  let r = B.importJSON(json); assert.equal(r.ok, true); assert.equal(r.profilesAdded, 1); assert.equal(r.attemptsAdded, 2); assert.equal(B.first(p.id, 'm1-s1-a1'), 3);
  r = B.importJSON(json); assert.equal(r.attemptsAdded, 0); assert.equal(r.profilesMerged, 1); assert.equal(B.record(p.id, 'm1-s1-a1').attempts.length, 2);
});
test('import : fichiers mal formés rejetés', () => {
  const st = createStore(memoryAdapter(), isActivityId);
  for (const bad of ['', 'not json', '[]', '{}', '{"schemaVersion":99,"profiles":[]}', '{"schemaVersion":1,"profiles":"x"}', '{"app":"Autre","schemaVersion":1,"profiles":[]}', 'x'.repeat(6 * 1024 * 1024)]) assert.equal(st.importJSON(bad).ok, false, bad.slice(0, 20));
  assert.equal(st.profiles().length, 0);
});
test('import : données hostiles nettoyées', () => {
  const evil = { schemaVersion: 1, profiles: [{ id: '../../x', displayName: 'a' }, { id: 'ok1', displayName: '<img src=x onerror=alert(1)>' + 'z'.repeat(80), className: 'c'.repeat(50) }], progressByProfile: { ok1: { 'm1-s1-a1': { attempts: [{ id: 'a1', score: 99, completedAt: 'bad' }, { id: 'a2', score: -4, completedAt: '2026-01-01' }, { id: 'a3', score: 'x' }] }, 'm9-s9-a9': { attempts: [] }, '__proto__': { attempts: [] } } } };
  const st = createStore(memoryAdapter(), isActivityId); const r = st.importJSON(JSON.stringify(evil)); assert.equal(r.ok, true);
  assert.equal(st.profiles().length, 1); const p = st.profiles()[0]; assert.ok(!/[<>]/.test(p.displayName) && p.displayName.length <= 24 && p.className.length <= 12);
  const at = st.record('ok1', 'm1-s1-a1').attempts; assert.equal(at.length, 2); assert.ok(at.every((a) => a.score >= 0 && a.score <= 5));
  assert.equal(st.record('ok1', 'm9-s9-a9'), undefined);
});
test('CSV : pas d’injection de formule', () => {
  const st = createStore(memoryAdapter(), isActivityId); const p = st.createProfile('=CMD()'); st.recordAttempt(p.id, 'm1-s1-a1', 3);
  const csv = st.csv([{ id: 'm1-s1-a1', moduleId: 1, sessionId: 'm1-s1', title: 'T' }]); assert.ok(csv.includes('"\'=CMD()"')); assert.ok(csv.startsWith('﻿'));
});
test('tableur : formules', () => {
  const raw = { A1: '5', B1: '7', C1: '=A1+B1', D1: '=SOMME(A1:B1)', E1: '=MOYENNE(A1;B1)', F1: '=A1/0', G1: '=MAX(A1:B1)*2', H1: '=SOMME(A1:B1', I1: '=J1', J1: '=I1', K1: '=(A1+B1)/2', L1: '3,5', M1: '=L1*2', N1: 'SOMME(A1:B1)' };
  const v = (k) => computeCell(k, raw); assert.equal(v('C1'), 12); assert.equal(v('D1'), 12); assert.equal(v('E1'), 6); assert.equal(v('F1'), '#DIV/0!'); assert.equal(v('G1'), 14); assert.equal(v('H1'), '#NOM?'); assert.equal(v('I1'), '#REF!'); assert.equal(v('K1'), 6); assert.equal(v('M1'), 7); assert.equal(v('N1'), 'SOMME(A1:B1)'); assert.equal(v('Z9'), '');
});
test('interpréteur : sécurité et sémantique', () => {
  assert.deepEqual(interpret('Lire(a)\nÉcrire(a * 2)', [4]).out, ['8']);
  assert.ok(interpret('Écrire(x)').error); assert.ok(interpret('Lire(a)', []).error); assert.ok(interpret('Écrire(1 / 0)').error);
  assert.ok(interpret('process.exit(1)').error); assert.ok(interpret('Écrire(constructor)').error); assert.ok(interpret('Si 1 = 1 Alors\nÉcrire(1)').error);
  assert.equal(interpret('Écrire(7 div 2)').out[0], '3'); assert.equal(interpret('Écrire(7 mod 2)').out[0], '1'); assert.equal(interpret('Écrire(3 / 2)').out[0], '1,5');
});
test('robot', () => {
  const lv = parseLevel(['S..G']); assert.equal(runProgram(lv, ['A', 'A', 'A']).ok, true); assert.equal(runProgram(lv, ['A', 'A']).ok, false); assert.equal(runProgram(lv, ['G', 'A']).ok, false); assert.deepEqual(shortest(lv), ['A', 'A', 'A']);
});
