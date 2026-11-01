import test from 'node:test';
import assert from 'node:assert/strict';
import { CATALOG, SESSIONS, ACTIVITIES, TOTAL_POINTS } from '../src/data/index.js';
import { SCENES, regionIds } from '../src/games/scenes.js';
import { parseLevel, shortest, runProgram } from '../src/games/robot.js';
import { interpret } from '../src/games/prog.js';

const uniq = (a) => new Set(a).size === a.length;
const str = (s) => typeof s === 'string' && s.trim().length > 0;

test('structure : 4 modules, 30 séances, 120 activités, 600 points', () => {
  assert.equal(CATALOG.length, 4);
  assert.deepEqual(CATALOG.map((m) => m.sessions.length), [4, 11, 8, 7]);
  assert.equal(SESSIONS.length, 30);
  assert.equal(ACTIVITIES.length, 120);
  assert.equal(TOTAL_POINTS, 600);
  assert.ok(uniq(ACTIVITIES.map((a) => a.id)), 'identifiants uniques');
  assert.deepEqual(CATALOG.map((m) => m.sessions.length * 20), [80, 220, 160, 140]);
});
test('chaque séance contient 4 activités de mécaniques différentes', () => {
  for (const s of SESSIONS) { assert.equal(s.acts.length, 4, s.id); assert.equal(new Set(s.acts.map((a) => a.mech)).size, 4, s.id + ' : ' + s.acts.map((a) => a.mech)); }
});
test('métadonnées de chaque activité', () => {
  for (const a of ACTIVITIES) for (const k of ['id', 'moduleId', 'sessionId', 'type', 'title', 'objective', 'instructions', 'estimatedMinutes', 'hint', 'accessibilityAlternative', 'version']) assert.ok(a[k] !== undefined && a[k] !== '', a.id + ' manque ' + k);
});
for (const a of ACTIVITIES) {
  test('contenu ' + a.id + ' (' + a.mech + ') — ' + a.title, () => {
    const d = a.data;
    switch (a.type) {
      case 'match': assert.ok(d.pairs.length >= 5); assert.ok(uniq(d.pairs.map((p) => p[1])), 'réponses uniques'); assert.ok(uniq(d.pairs.map((p) => p[0]))); d.pairs.forEach((p) => assert.ok(str(p[0]) && str(p[1]))); break;
      case 'sort': assert.ok(d.items.length >= 5); assert.ok(uniq(d.items.map((i) => i[0]))); d.items.forEach((i) => assert.ok(Number.isInteger(i[1]) && i[1] >= 0 && i[1] < d.cats.length)); d.cats.forEach((c, ci) => assert.ok(d.items.some((i) => i[1] === ci), 'catégorie vide : ' + c)); break;
      case 'order': assert.ok(d.steps.length >= 5); assert.ok(uniq(d.steps)); (d.eq || []).flat().forEach((i) => assert.ok(i >= 0 && i < d.steps.length)); break;
      case 'fill': { let n = 0; for (const l of d.lines) { const t = Array.isArray(l) ? l[0] : l; for (const m of t.matchAll(/\[\[(.+?)\]\]/g)) { n++; const o = m[1].split('|'); assert.ok(o.length >= 2 && uniq(o) && o.every(str), 'options : ' + m[1]); } } assert.ok(n >= 5, 'trous : ' + n); break; }
      case 'quiz': assert.ok(d.qs.length >= 5); d.qs.forEach((q) => { assert.ok(str(q[0])); assert.ok(q[1].length >= 3 && uniq(q[1]) && q[1].every(str)); assert.ok(str(q[2]), 'explication manquante'); }); break;
      case 'hot': { assert.ok(d.prompts.length >= 5); const ids = d.scene === 'lines' ? d.lines.map((_, i) => 'l' + (i + 1)) : regionIds(SCENES[d.scene]); if (d.scene !== 'lines') { assert.ok(SCENES[d.scene]); ids.forEach((id) => assert.ok(SCENES[d.scene].desc[id], 'description manquante : ' + id)); } d.prompts.forEach((p) => assert.ok(ids.includes(p[0]), 'zone inconnue ' + p[0])); assert.ok(uniq(d.prompts.map((p) => p[0]))); break; }
      case 'asm': assert.ok(d.slots.length >= 5); assert.ok(uniq(d.slots.map((s) => s.part))); d.slots.forEach((s) => assert.ok(d.parts[s.part] && str(s.hint) && str(s.why))); break;
      case 'net': { assert.ok(d.links.length >= 5); const ids = d.devices.map((x) => x.id); d.links.forEach((l) => assert.ok(ids.includes(l[0]) && ids.includes(l[1]))); break; }
      case 'robot': assert.equal(d.levels.length, 5); d.levels.forEach((l, i) => { const lv = parseLevel(l.grid); const p = shortest(lv); assert.ok(p, 'niveau ' + (i + 1) + ' sans solution'); assert.ok(p.length <= l.max, 'max trop petit'); assert.ok(runProgram(lv, p).ok); }); break;
      case 'prog': assert.ok(d.tasks.length >= 5); d.tasks.forEach((t) => { if (d.mode === 'run') { const r = interpret(t[0], t[2]); assert.ok(!r.error, r.error); assert.equal(String(r.out[0]), String(t[1])); } else { const r = interpret(t[0], t[1]); assert.ok(!r.error, r.error); assert.ok(t[2] === 'out' ? r.out.length > 0 : t[2] in r.vars); } }); break;
      case 'sim': assert.ok(d.tasks.length >= 5); d.tasks.forEach((t) => { assert.ok(str(t[0])); assert.ok(typeof t[1] === 'function' || (t[1] && typeof t[1] === 'object')); }); break;
      default: assert.fail('mécanique inconnue ' + a.type);
    }
  });
}
