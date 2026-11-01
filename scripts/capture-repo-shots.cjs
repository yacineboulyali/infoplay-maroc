const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const out = path.resolve(__dirname, '../docs/screenshots');
  fs.mkdirSync(out, { recursive: true });
  const url = 'file://' + path.resolve(__dirname, '../dist/index.html') + '?showcase=1';
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1, offline: true });
  const page = await context.newPage();
  await page.goto(url);
  await page.screenshot({ path: path.join(out, '01-accueil.png'), fullPage: true });
  await page.click('.welcome-cta');
  await page.fill('#pname', 'Sara');
  await page.click('button[type=submit]');
  await page.waitForSelector('text=Bonjour Sara');
  await page.screenshot({ path: path.join(out, '02-tableau-de-bord.png'), fullPage: true });
  await page.evaluate(() => { location.hash = '#/m/1/s/2/a/1'; });
  await page.waitForSelector('#stage');
  await page.screenshot({ path: path.join(out, '03-activite-interactive.png'), fullPage: true });
  await page.evaluate(() => { location.hash = '#/m/3/s/1/a/4'; });
  await page.waitForSelector('.rgrid');
  await page.screenshot({ path: path.join(out, '04-robot.png'), fullPage: true });
  await browser.close();
  console.log(out);
})().catch((error) => { console.error(error); process.exit(1); });
