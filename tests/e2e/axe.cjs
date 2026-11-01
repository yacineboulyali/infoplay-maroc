// Audit d'accessibilité automatique (axe-core) sur des écrans représentatifs. Lance : node tests/e2e/axe.cjs
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const axeSrc = fs.readFileSync(path.resolve(__dirname, '../../node_modules/axe-core/axe.min.js'), 'utf8');
const URL = 'file://' + path.resolve(__dirname, '../../dist/index.html') + '?test=1';
(async () => {
  const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1366, height: 768 } })).newPage();
  await p.goto(URL); await p.click('.welcome-cta'); await p.fill('#pname', 'Axe'); await p.click('button[type=submit]'); await p.waitForSelector('text=Bonjour');
  const routes = ['#/dash', '#/m/2', '#/m/1/s/1', '#/m/1/s/1/a/1', '#/m/1/s/1/a/2', '#/m/1/s/1/a/3', '#/m/1/s/3/a/1', '#/m/1/s/3/a/3', '#/m/2/s/3/a/4', '#/m/2/s/4/a/4', '#/m/2/s/9/a/3', '#/m/3/s/1/a/4', '#/m/3/s/3/a/2', '#/m/4/s/1/a/3', '#/m/4/s/5/a/4', '#/progres', '#/donnees', '#/profils'];
  let total = 0;
  for (const r of routes) {
    await p.evaluate((r) => { location.hash = r; }, r); await p.waitForTimeout(150);
    const res = await p.evaluate(async (src) => { if (!window.axe) (0, eval)(src); return (await window.axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'] })).violations.map((v) => ({ id: v.id, impact: v.impact, n: v.nodes.length, ex: v.nodes[0].html.slice(0, 110) })); }, axeSrc);
    total += res.length; console.log(r.padEnd(18), res.length ? JSON.stringify(res) : 'OK');
  }
  console.log('violations :', total); await b.close();
})();
