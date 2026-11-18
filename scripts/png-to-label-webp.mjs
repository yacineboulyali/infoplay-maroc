import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { chromium } from 'playwright';

const sources = new URL('../output/label-illustrations-src/', import.meta.url);
const destination = new URL('../public/images/label-illustrations/', import.meta.url);
const pending = readdirSync(sources)
  .filter((file) => /^lbl-[a-f0-9]{8}\.png$/.test(file))
  .map((file) => [new URL(file, sources), new URL(file.replace(/\.png$/, '.webp'), destination)])
  .filter(([, target]) => !existsSync(target));

if (pending.length) {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();
    for (const [source, target] of pending) {
      const webp = await page.evaluate(async (png) => {
        const image = new Image();
        image.src = 'data:image/png;base64,' + png;
        await image.decode();
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 512;
        const context = canvas.getContext('2d');
        context.fillStyle = '#fffaf0';
        context.fillRect(0, 0, 512, 512);
        const scale = 512 / Math.max(image.width, image.height);
        const width = image.width * scale;
        const height = image.height * scale;
        context.drawImage(image, (512 - width) / 2, (512 - height) / 2, width, height);
        return canvas.toDataURL('image/webp', 0.88).split(',')[1];
      }, readFileSync(source).toString('base64'));
      writeFileSync(target, Buffer.from(webp, 'base64'));
    }
  } finally {
    await browser.close();
  }
}
console.log(`${pending.length} illustration(s) convertie(s)`);
