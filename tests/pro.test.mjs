import test from 'node:test';
import assert from 'node:assert/strict';
import { CATALOG, ACTIVITIES, getActivity, getSession, isActivityId } from '../src/data/index.js';
import { PRO, PRO_ACTIVITIES, PRO_PARTS, PRO_POINTS } from '../src/data/pro/index.js';
import { RIBBONS, allPaths } from '../src/games/ribbon.js';
import { goalOk } from '../src/games/sims.js';
import { cardsOf, ALL_CARDS, proScope } from '../src/pro/engine.js';
import { computeGame } from '../src/fx/game.js';

const uniq = (a) => new Set(a).size === a.length;
const str = (s) => typeof s === 'string' && s.trim().length > 0;

test('M205 : 20 séances, 80 activités, 400 points, sans toucher au Tronc Commun', () => {
  assert.equal(PRO.sessions.length, 20);
  assert.equal(PRO_ACTIVITIES.length, 80);
  assert.equal(PRO_POINTS, 400);
  assert.equal(CATALOG.length, 4); assert.equal(ACTIVITIES.length, 120);
  assert.ok(uniq(PRO_ACTIVITIES.map((a) => a.id)));
  assert.ok(PRO_ACTIVITIES.every((a) => isActivityId(a.id) && getActivity(a.id) === a));
  assert.equal(getSession(205, 3).title, 'Styles, thèmes et modèles');
});
test('répartition des parties : Word 8 · Excel 8 · PowerPoint 2 · Outlook 2', () => {
  assert.deepEqual(PRO_PARTS.map((p) => p.sessions.length), [8, 8, 2, 2]);
  PRO.sessions.forEach((s) => assert.ok(PRO_PARTS.find((p) => p.key === s.part).sessions.includes(s), s.id));
});
test('chaque séance : 4 mécaniques différentes, une mission, un Simulator, une trace écrite', () => {
  for (const s of PRO.sessions) {
    assert.equal(s.acts.length, 4, s.id);
    assert.equal(new Set(s.acts.map((a) => a.mech)).size, 4, s.id);
    assert.ok(s.acts.some((a) => a.mech === 'sim:ribbon'), s.id + ' sans Simulator');
    assert.ok(str(s.situation?.text) && str(s.situation?.who) && str(s.retenir) && str(s.ar), s.id + ' métadonnées');
  }
});
for (const a of PRO_ACTIVITIES) {
  test('contenu ' + a.id + ' (' + a.mech + ') — ' + a.title, () => {
    const d = a.data;
    for (const k of ['title', 'objective', 'instructions', 'hint']) assert.ok(str(a[k]), k);
    switch (a.type) {
      case 'match': assert.ok(d.pairs.length >= 5); assert.ok(uniq(d.pairs.map((p) => p[0])) && uniq(d.pairs.map((p) => p[1]))); break;
      case 'sort': assert.ok(d.items.length >= 5); assert.ok(uniq(d.items.map((i) => i[0]))); d.cats.forEach((c, ci) => assert.ok(d.items.some((i) => i[1] === ci), 'catégorie vide ' + c)); break;
      case 'order': assert.ok(d.steps.length >= 5); assert.ok(uniq(d.steps)); break;
      case 'fill': { let n = 0; for (const l of d.lines) { const t = Array.isArray(l) ? l[0] : l; for (const m of t.matchAll(/\[\[(.+?)\]\]/g)) { n++; const o = m[1].split('|'); assert.ok(o.length >= 2 && uniq(o)); } } assert.ok(n >= 5); break; }
      case 'quiz': assert.ok(d.qs.length >= 5); d.qs.forEach((q) => { assert.ok(q[1].length >= 3 && uniq(q[1])); assert.ok(str(q[2])); }); break;
      case 'sim': {
        assert.equal(d.view, 'ribbon'); assert.ok(RIBBONS[d.cfg.app], 'application inconnue');
        assert.ok(d.tasks.length >= 5); const valid = allPaths(d.cfg.app);
        d.tasks.forEach((t) => {
          assert.ok(valid.has(t[4]), `chemin introuvable dans le ruban ${d.cfg.app} : ${t[4]}`);
          const st = {}; assert.equal(goalOk(t[1], st, {}), false); t[3](st); assert.equal(goalOk(t[1], st, {}), true);
        });
        break;
      }
      default: assert.fail('mécanique inattendue ' + a.type);
    }
  });
}
test('cartes tirées des activités : chaque séance en fournit, avec une bonne réponse distincte des distracteurs', () => {
  for (const s of PRO.sessions) {
    const cs = cardsOf(s, () => 0.3); assert.ok(cs.length >= 15, s.id + ' : ' + cs.length);
    cs.forEach((c) => { assert.ok(str(c.q) && str(c.answer)); assert.ok(!c.wrong.includes(c.answer), c.id); });
  }
  assert.ok(uniq(ALL_CARDS().map((c) => c.id)));
});
test('moteur XP : périmètre M205 indépendant', () => {
  const rec = (id) => (id === 'm205-s1-a1' ? { attempts: [{ score: 5, completedAt: '2026-11-08T10:00:00Z' }] } : undefined);
  const g = computeGame(rec, null, proScope());
  assert.equal(g.done, 1); assert.equal(g.rank, 'Stagiaire');
  assert.equal(g.badges.size, 0, 'le M205 ne débloque pas de badges'); assert.equal(g.badgesOn, false);
  assert.ok(computeGame(rec, null, { activities: PRO_ACTIVITIES, groups: PRO_PARTS }).badges.has('first'), 'les badges restent actifs ailleurs');
  assert.equal(computeGame(rec).done, 0, 'le Tronc Commun ne compte pas les activités M205');
});
