// E2E Informatique Collège : Chromium hors ligne sur dist/ (file://). Chaque activité résolue doit valoir 5/5,
// sans erreur console ni requête externe ; axe-core sur les écrans du parcours. Lance : npm run build && node tests/e2e/college.cjs
const { chromium } = require('playwright');
const path = require('path'); const fs = require('fs'); const assert = require('assert');
const URL = 'file://' + path.resolve(__dirname, '../../dist/index.html') + '?test=1';
const axeSrc = fs.readFileSync(path.resolve(__dirname, '../../node_modules/axe-core/axe.min.js'), 'utf8');
(async () => {
  const browser = await chromium.launch(); const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 }, offline: true });
  const page = await ctx.newPage(); const errors = [], external = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message)); page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('request', (r) => { if (!/^(file|data|blob):/.test(r.url())) external.push(r.url()); });
  await page.goto(URL);
  await page.evaluate(() => window.__ip.store.createProfile('Collège'));
  const acts = await page.evaluate(() => window.__ip.COLLEGE_ACTIVITIES.map((a) => ({ id: a.id, m: a.moduleId, s: a.sessionIndex, i: a.index, mech: a.mech })));
  const results = [];
  for (const a of acts) {
    await page.evaluate((a) => { location.hash = `#/m/${a.m}/s/${a.s}/a/${a.i}`; }, a);
    await page.waitForFunction((id) => document.querySelector(`.activity-${id}`), a.id);
    await page.evaluate(() => window.__ip.eng.solve());
    await page.click('text=✔ Vérifier');
    await page.waitForSelector('.result .score');
    results.push([a.id, a.mech, (await page.textContent('.result .score')).trim()]);
  }
  const bad = results.filter((r) => !r[2].startsWith('5'));
  console.log('activités Collège à 5/5 :', results.length - bad.length, '/', results.length); if (bad.length) console.log('PROBLÈMES', bad);
  // Écrans du parcours : tableaux de bord, modules, séance, bilan, progrès.
  const routes = ['#/profils', '#/college/1', '#/college/2', '#/college/3', '#/m/11', '#/m/24', '#/m/35', '#/m/11/s/1', '#/m/24/s/6', '#/m/11/s/1/bilan', '#/m/23/s/1/a/1', '#/m/25/s/3/a/2', '#/progres'];
  let violations = 0;
  for (const r of routes) {
    await page.evaluate((r) => { location.hash = r; }, r); await page.waitForTimeout(250);
    const h1 = await page.evaluate(() => document.querySelector('h1')?.textContent || '');
    assert.ok(h1 && !/introuvable|erreur/i.test(h1), r + ' : ' + h1);
    const res = await page.evaluate(async (src) => { if (!window.axe) (0, eval)(src); return (await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'] })).violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, ex: v.nodes[0].html.slice(0, 110) })); }, axeSrc);
    violations += res.length; console.log(r.padEnd(20), res.length ? JSON.stringify(res) : 'OK');
  }
  // Téléphone : pas de défilement horizontal sur le tableau de bord d'un niveau.
  await page.setViewportSize({ width: 375, height: 812 }); await page.evaluate(() => { location.hash = '#/college/2'; }); await page.waitForTimeout(300);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log('débordement horizontal (375 px) :', overflow);
  console.log('erreurs :', errors.length ? errors : 0, '· requêtes externes :', external.length ? [...new Set(external)] : 0, '· violations axe :', violations);
  await browser.close();
  assert.equal(bad.length, 0); assert.equal(errors.length, 0); assert.equal(external.length, 0); assert.ok(overflow <= 1, 'débordement horizontal');
})().catch((e) => { console.error(e); process.exitCode = 1; });
