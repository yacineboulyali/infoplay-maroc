// E2E : Chrome (Chromium) en mode hors ligne sur dist/index.html (file://). Lance : node tests/e2e/smoke.cjs
const { chromium } = require('playwright');
const path = require('path'); const assert = require('assert');
const URL = 'file://' + path.resolve(__dirname, '../../dist/index.html') + '?test=1';
(async () => {
  const browser = await chromium.launch(); const ctx = await browser.newContext({ viewport: { width: 1366, height: 768 }, offline: true, acceptDownloads: true });
  const page = await ctx.newPage(); const errors = [], external = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message)); page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  page.on('request', (r) => { if (!r.url().startsWith('file:') && !r.url().startsWith('data:')) external.push(r.url()); });
  await page.goto(URL);
  // profil
  await page.click('.welcome-cta'); await page.fill('#pname', 'Sara'); await page.click('button[type=submit]');
  await page.waitForSelector('text=Bonjour Sara');
  await page.screenshot({ path: 'shots/dash.png' });
  const acts = await page.evaluate(() => window.__ip.ACTIVITIES.map((a) => ({ id: a.id, m: a.moduleId, s: a.sessionIndex, i: a.index, mech: a.mech })));
  assert.equal(acts.length, 120);
  const results = [];
  for (const a of acts) {
    await page.evaluate((a) => { location.hash = `#/m/${a.m}/s/${a.s}/a/${a.i}`; }, a);
    await page.waitForSelector('#stage');
    await page.evaluate(() => window.__ip.eng.solve());
    await page.click('text=✔ Vérifier');
    await page.waitForSelector('.result .score');
    const sc = await page.textContent('.result .score'); results.push([a.id, a.mech, sc.trim()]);
    if (['m1-s3-a3', 'm2-s2-a1', 'm2-s9-a3', 'm3-s1-a4', 'm4-s1-a3', 'm2-s3-a4', 'm2-s11-a4'].includes(a.id)) await page.screenshot({ path: `shots/${a.id}.png`, fullPage: true });
  }
  const bad = results.filter((r) => !r[2].startsWith('5')); console.log('activités à 5/5 :', results.length - bad.length, '/', results.length); if (bad.length) console.log('PROBLÈMES', bad);
  assert.equal(bad.length, 0);
  // persistance après rechargement
  await page.reload(); await page.evaluate(() => { location.hash = '#/dash'; }); await page.waitForSelector('text=Bonjour Sara');
  const pts = await page.textContent('.stat b'); console.log('points après rechargement :', pts); assert.equal(pts.trim(), '600');
  // export / import
  await page.goto(URL.replace('index.html', 'index.html') + '#/donnees'); await page.waitForSelector('text=Sauvegarde');
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('text=⬇ Exporter mon profil')]); const f = await dl.path(); const json = require('fs').readFileSync(f, 'utf8'); assert.ok(JSON.parse(json).profiles.length === 1);
  // interactions manuelles : fenêtre simulée
  await page.evaluate(() => { location.hash = '#/m/2/s/2/a/3'; }); await page.waitForSelector('#stage');
  await page.click('[aria-label=Réduire]'); await page.click('button.btn.primary:has-text("Valider")'); await page.click('.tbtn'); await page.click('button.btn.primary:has-text("Valider")');
  await page.click('[aria-label=Agrandir]'); await page.click('button.btn.primary:has-text("Valider")'); await page.click('[aria-label=Restaurer]'); await page.click('button.btn.primary:has-text("Valider")'); await page.click('[aria-label=Fermer]'); await page.click('button.btn.primary:has-text("Valider")');
  await page.click('text=✔ Vérifier'); await page.waitForSelector('.result .score'); const w = await page.textContent('.result .score'); console.log('fenêtre (clics réels) :', w.trim()); assert.ok(w.startsWith('5'));
  // interactions manuelles : tableur
  await page.evaluate(() => { location.hash = '#/m/2/s/10/a/4'; }); await page.waitForSelector('#stage');
  const cell = async (ref, v) => { await page.click(`[aria-label="Cellule ${ref}"]`); await page.keyboard.type(v); await page.keyboard.press('Enter'); };
  await cell('D2', '=MOYENNE(B2;C2)'); await page.click('button.btn.primary:has-text("Valider")'); await cell('D3', '=MOYENNE(B3:C3)'); await page.click('button.btn.primary:has-text("Valider")');
  await cell('D4', '14'); await page.click('button.btn.primary:has-text("Valider")');
  const logs = await page.$$eval('.steplog li', (l) => l.map((x) => x.className)); console.log('tableur (saisie réelle) :', logs.join(',')); assert.deepEqual(logs, ['ko', 'ok', 'ko'].map((x) => x).slice(0, 3).map((x, i) => (i === 0 ? 'ok' : i === 1 ? 'ok' : 'ko')));
  // clavier : association
  await page.evaluate(() => { location.hash = '#/m/1/s/2/a/2'; }); await page.waitForSelector('#stage'); await page.keyboard.press('Tab');
  console.log('erreurs console :', errors.length, errors.slice(0, 3)); console.log('requêtes externes :', external.length);
  assert.equal(errors.length, 0); assert.equal(external.length, 0);
  // 1024x768
  await page.setViewportSize({ width: 1024, height: 768 }); await page.evaluate(() => { location.hash = '#/m/3/s/1/a/4'; }); await page.waitForSelector('#stage'); await page.screenshot({ path: 'shots/robot-1024.png', fullPage: true });
  await browser.close(); console.log('E2E OK');
})().catch((e) => { console.error(e); process.exit(1); });
