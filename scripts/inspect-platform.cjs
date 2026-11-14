const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

(async () => {
  const { CATALOG, PRO, ACTIVITIES, PRO_ACTIVITIES } = await import('../src/data/index.js');
  const browser = await chromium.launch();
  // Test harness only: permit axe injection without changing the application's CSP.
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 }, offline: true, bypassCSP: true });
  const report = { errors: [], brokenImages: [], routes: [], overflow: [], accessibility: [] };
  page.on('pageerror', e => report.errors.push({ route: page.url().split('#')[1], error: e.message }));
  page.on('requestfailed', r => { if (/\.(png|jpg|svg|webp)(?:$|\?)/i.test(r.url())) report.brokenImages.push(r.url()); });
  await page.goto(pathToFileURL(path.resolve('dist/index.html')).href + '?test=1');
  await page.evaluate(() => window.__ip.store.createProfile('Inspection'));
  const activities = [...ACTIVITIES, ...PRO_ACTIVITIES];
  const routes = ['#/dash', '#/pro', '#/progres', '#/donnees',
    ...[...CATALOG, PRO].flatMap(m => m.sessions.map(s => `#/m/${m.id}/s/${s.index}`)),
    ...activities.map(a => `#/m/${a.moduleId}/s/${a.sessionIndex}/a/${a.index}`)];
  for (const route of routes) {
    await page.evaluate(route => { document.querySelector('#main')?.setAttribute('data-inspected', 'old'); location.hash = route; }, route);
    await page.waitForFunction(() => document.querySelector('#main') && !document.querySelector('#main').hasAttribute('data-inspected'));
    const state = await page.evaluate(() => ({
      title: document.querySelector('#main h1')?.textContent,
      signs: document.querySelectorAll('#main svg, #main img, #main .office-art, #main .item-art').length,
      error: document.querySelector('.error-screen')?.textContent,
    }));
    report.routes.push({ route, ...state });
  }
  const samples = ['#/m/1/s/1/a/2', '#/m/205/s/1', '#/m/205/s/1/a/1', '#/m/205/s/3/a/2', '#/m/205/s/9/a/3'];
  const axe = fs.readFileSync('node_modules/axe-core/axe.min.js', 'utf8');
  for (const width of [1366, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [index, route] of samples.entries()) {
      await page.evaluate(route => { document.querySelector('#main')?.setAttribute('data-inspected', 'old'); location.hash = route; }, route);
      await page.waitForFunction(() => document.querySelector('#main') && !document.querySelector('#main').hasAttribute('data-inspected'));
      await page.waitForTimeout(120);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      if (overflow) report.overflow.push({ route, width });
      if (width === 390 || index === 3) await page.screenshot({ path: `output/visual-audit/screen-${width}-${index}.png`, fullPage: true });
      if (width === 1366) {
        await page.addScriptTag({ content: axe });
        const violations = await page.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa'] })).violations.map(v => ({ id: v.id, impact: v.impact, count: v.nodes.length, sample: v.nodes[0].html.slice(0, 250) })));
        if (violations.length) report.accessibility.push({ route, violations });
      }
    }
  }
  fs.writeFileSync('output/visual-audit/browser.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ routes: report.routes.length, errors: report.errors, brokenImages: report.brokenImages, overflow: report.overflow, accessibility: report.accessibility }));
  await browser.close();
  if (report.errors.length || report.brokenImages.length) process.exitCode = 1;
})().catch(e => { console.error(e); process.exitCode = 1; });
