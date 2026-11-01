const { chromium } = require('playwright');
const GIFEncoder = require('gif-encoder-2');
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve(__dirname, '../docs/gifs');
fs.mkdirSync(outDir, { recursive: true });

async function frame(page) {
  return PNG.sync.read(await page.screenshot({ type: 'png' }));
}
function saveGif(name, frames, delays) {
  const { width, height } = frames[0];
  const encoder = new GIFEncoder(width, height, 'neuquant', true);
  encoder.start(); encoder.setRepeat(0); encoder.setQuality(12);
  frames.forEach((f, i) => { encoder.setDelay(delays[i] || 650); encoder.addFrame(f.data); });
  encoder.finish();
  fs.writeFileSync(path.join(outDir, name), encoder.out.getData());
}
async function capture(page, name, steps) {
  const frames = [], delays = [];
  for (const step of steps) {
    if (step.action) await step.action();
    if (step.wait) await page.waitForTimeout(step.wait);
    frames.push(await frame(page)); delays.push(step.delay || 650);
  }
  saveGif(name, frames, delays);
}

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1000, height: 720 }, offline: true, reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  const url = 'file://' + path.resolve(__dirname, '../dist/index.html') + '?gif=1';
  await page.goto(url); await page.click('.welcome-cta'); await page.fill('#pname', 'Sara'); await page.click('button[type=submit]');
  const go = async (hash) => { await page.evaluate((h) => { location.hash = h; }, hash); await page.waitForSelector('#stage'); await page.evaluate(() => scrollTo(0, 0)); };

  await go('#/m/1/s/2/a/1');
  await capture(page, '01-classement-glisser-deposer.gif', [
    { delay: 900 },
    { action: () => page.locator('.pool .chip').first().click(), delay: 500 },
    { action: () => page.locator('.bucket-head').first().click(), wait: 250, delay: 850 },
    { action: () => page.locator('.pool .chip').first().click(), delay: 500 },
    { action: () => page.locator('.bucket-head').nth(1).click(), wait: 250, delay: 1100 },
  ]);

  await go('#/m/1/s/2/a/2');
  await capture(page, '02-association-avec-liens.gif', [
    { delay: 900 },
    { action: () => page.locator('.col').first().locator('.pick').first().click(), delay: 450 },
    { action: () => page.locator('.col').nth(1).locator('.pick').first().click(), wait: 300, delay: 800 },
    { action: () => page.locator('.col').first().locator('.pick').nth(1).click(), delay: 450 },
    { action: () => page.locator('.col').nth(1).locator('.pick').nth(1).click(), wait: 300, delay: 1100 },
  ]);

  await go('#/m/3/s/1/a/4');
  await capture(page, '03-programmation-robot.gif', [
    { delay: 900 },
    { action: () => page.getByRole('button', { name: 'Avancer' }).click(), delay: 450 },
    { action: () => page.getByRole('button', { name: 'Avancer' }).click(), delay: 450 },
    { action: () => page.getByRole('button', { name: 'Avancer' }).click(), delay: 650 },
    { action: () => page.getByRole('button', { name: 'Exécuter' }).click(), wait: 420, delay: 420 },
    { wait: 420, delay: 420 }, { wait: 420, delay: 420 }, { wait: 420, delay: 1200 },
  ]);

  await browser.close();
  console.log(outDir);
})().catch((error) => { console.error(error); process.exit(1); });
