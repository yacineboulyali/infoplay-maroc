const { chromium } = require('playwright');
const { pathToFileURL } = require('node:url');
const { resolve } = require('node:path');
const { readFileSync, existsSync, mkdirSync } = require('node:fs');
const assert = require('node:assert/strict');

(async () => {
  const report = JSON.parse(readFileSync('output/student-illustrations/integration-report.json', 'utf8'));
  for (const entry of report.entries) assert.ok(existsSync(resolve('dist', entry.src)), entry.id);
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ offline: true, viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();
    const errors = [], external = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('request', r => { if (!/^(file|data|blob):/.test(r.url())) external.push(r.url()); });
    await page.goto(pathToFileURL(resolve('dist/index.html')).href + '?test=1');
    await page.evaluate(() => window.__ip.store.createProfile('Illustrations'));
    const activities = await page.evaluate(() => window.__ip.ACTIVITIES.map(a => ({ id: a.id, module: a.moduleId, session: a.sessionIndex, index: a.index, type: a.type })));
    const seen = new Set();
    const visit = async a => {
      await page.evaluate(a => location.hash = `#/m/${a.module}/s/${a.session}/a/${a.index}`, a);
      await page.waitForSelector('#stage');
      await page.waitForFunction(id => document.querySelector(`.activity-${id}`), a.id);
      await page.locator('.student-illustration').evaluateAll(async images => {
        for (const image of images) { image.loading = 'eager'; await image.decode(); }
      });
      for (const id of await page.locator('.student-illustration').evaluateAll(images => images.map(i => i.dataset.questionId))) seen.add(id);
    };
    for (const a of activities) {
      await visit(a);
      const expected = report.entries.filter(e => e.activityId === a.id && (!['sim', 'robot'].includes(a.type) || e.id.endsWith('q01'))).map(e => e.id).sort();
      const actual = await page.locator('.student-illustration').evaluateAll(images => images.map(i => i.dataset.questionId).sort());
      assert.deepEqual(actual, expected, a.id);
      if (a.type === 'robot') {
        for (let i = 1; i < await page.locator('[role=tab]').count(); i++) {
          await page.locator('[role=tab]').nth(i).click();
          await page.locator('.student-illustration').evaluateAll(async images => { for (const image of images) { image.loading = 'eager'; await image.decode(); } });
          for (const id of await page.locator('.student-illustration').evaluateAll(images => images.map(i => i.dataset.questionId))) seen.add(id);
        }
      }
      if (a.type === 'sim') {
        while (await page.locator('.taskbox button').count()) {
          await page.locator('.student-illustration').evaluateAll(async images => { for (const image of images) { image.loading = 'eager'; await image.decode(); } });
          for (const id of await page.locator('.student-illustration').evaluateAll(images => images.map(i => i.dataset.questionId))) seen.add(id);
          await page.locator('.taskbox button').click();
        }
      }
      // Simulations were advanced manually above; other engines can solve in place.
      await page.evaluate(() => window.__ip.eng.solve());
      const result = await page.evaluate(() => window.__ip.eng.check());
      if (a.type !== 'sim') assert.equal(result.correct, result.total, a.id);
    }
    assert.equal(seen.size, report.integrated);
    const shots = 'output/student-illustrations/platform'; mkdirSync(shots, { recursive: true });
    const sample = ['m1-s2-a2', 'm1-s3-a2', 'm1-s1-a4', 'm2-s2-a1', 'm2-s2-a3', 'm3-s1-a4'];
    for (const width of [1280, 390]) {
      await page.setViewportSize({ width, height: 900 });
      for (const id of sample) {
        await visit(activities.find(a => a.id === id));
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
        assert.equal(overflow, false, `${id} at ${width}px`);
        await page.screenshot({ path: `${shots}/${id}-${width}.png`, fullPage: true });
      }
    }
    assert.deepEqual(errors, []); assert.deepEqual(external, []);
    console.log(JSON.stringify({ loadedImages: seen.size, activitiesChecked: activities.length, errors, external, screenshots: sample.length * 2 }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
