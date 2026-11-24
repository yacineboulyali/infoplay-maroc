import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const sources = new URL('../output/module-icons-src/', import.meta.url);
const destination = new URL('../public/images/module-icons/', import.meta.url);
const pending = readdirSync(sources)
  .filter((file) => /^[a-z0-9-]+\.png$/.test(file))
  .map((file) => [new URL(file, sources), new URL(file.replace(/\.png$/, '.webp'), destination)])
  .filter(([, target]) => !existsSync(target));

if (pending.length) {
  mkdirSync(destination, { recursive: true });
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    for (const [source, target] of pending) {
      const webp = await page.evaluate(async (png) => {
        const image = new Image();
        image.src = 'data:image/png;base64,' + png;
        await image.decode();
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 256;
        const context = canvas.getContext('2d');
        context.fillStyle = '#fffaf0';
        context.fillRect(0, 0, 256, 256);
        const scale = 256 / Math.max(image.width, image.height);
        const width = image.width * scale;
        const height = image.height * scale;
        context.drawImage(image, (256 - width) / 2, (256 - height) / 2, width, height);
        return canvas.toDataURL('image/webp', 0.9).split(',')[1];
      }, readFileSync(source).toString('base64'));
      writeFileSync(target, Buffer.from(webp, 'base64'));
    }
  } finally {
    await browser.close();
  }
}

console.log(`${pending.length} icône(s) convertie(s)`);
