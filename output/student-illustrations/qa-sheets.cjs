// Contact sheets for visual review only. The delivered images are not changed.
const fs = require('node:fs');
const path = require('node:path');
const { PNG } = require('pngjs');
const root = __dirname;
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json')));
const all = process.argv.includes('--all');
let items = manifest.questions.filter(q => q.asset && (all || !q.readyForIntegration));
if (process.argv.includes('--findings')) {
  const ids = JSON.parse(fs.readFileSync(path.join(root, 'review-findings.json'))).map(f => f.id);
  items = ids.map(id => manifest.questions.find(q => q.id === id)).filter(q => q.asset);
}
const idsAt = process.argv.indexOf('--ids');
if (idsAt >= 0) items = process.argv[idsAt + 1].split(',').map(id => manifest.questions.find(q => q.id === id));
const recentAt = process.argv.indexOf('--recent');
if (recentAt >= 0) {
  const log = JSON.parse(fs.readFileSync(path.join(root, 'generation-log.json')));
  const ids = Object.keys(log).slice(-Number(process.argv[recentAt + 1]));
  items = ids.map(id => manifest.questions.find(q => q.id === id));
}
const prefixAt = process.argv.indexOf('--prefix');
const prefix = prefixAt >= 0 ? process.argv[prefixAt + 1] : 'review';
if (!/^[a-z0-9-]+$/.test(prefix)) throw Error('Invalid prefix');
const folder = path.join(root, 'qa'); fs.mkdirSync(folder, { recursive: true });
const pages = [];
for (let start = 0; start < items.length; start += 16) {
  const batch = items.slice(start, start + 16);
  const sheet = new PNG({ width: 1024, height: Math.ceil(batch.length / 4) * 256 });
  sheet.data.fill(255);
  batch.forEach((q, i) => {
    const source = PNG.sync.read(fs.readFileSync(path.join(root, q.asset)));
    const scale = Math.min(248 / source.width, 248 / source.height);
    const width = Math.round(source.width * scale), height = Math.round(source.height * scale);
    const left = (i % 4) * 256 + Math.floor((256 - width) / 2);
    const top = Math.floor(i / 4) * 256 + Math.floor((256 - height) / 2);
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      const from = (Math.min(source.height - 1, Math.floor(y / scale)) * source.width + Math.min(source.width - 1, Math.floor(x / scale))) * 4;
      const to = ((top + y) * 1024 + left + x) * 4;
      source.data.copy(sheet.data, to, from, from + 4);
    }
  });
  const name = `${prefix}-${String(pages.length + 1).padStart(3, '0')}.png`;
  fs.writeFileSync(path.join(folder, name), PNG.sync.write(sheet));
  pages.push({ file: `qa/${name}`, items: batch.map((q, index) => ({ cell: index + 1, id: q.id, question: q.question, activity: q.activityTitle })) });
}
fs.writeFileSync(path.join(folder, `${prefix}-index.json`), JSON.stringify(pages, null, 2));
console.log(JSON.stringify(pages.map(page => ({ file: page.file, count: page.items.length }))));
