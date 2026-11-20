// Compile les traductions arabes scripts/tr-ar/<groupe>-*.tsv (clé<TAB>arabe) en src/examen/data/tr/ar-<groupe>.js
// et signale les textes français encore sans traduction.
// Usage : node scripts/tr-ar-build.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const srcDir = path.join(root, 'scripts/tr-ar');
const outDir = path.join(root, 'src/examen/data/tr');

// Textes attendus (re-extraits à chaque build pour suivre les changements de contenu).
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'tr-ar-'));
execFileSync(process.execPath, [path.join(root, 'scripts/tr-ar-extract.mjs'), tmp], { stdio: 'ignore' });
const expected = {};
for (const f of fs.readdirSync(tmp)) {
  const g = f.replace(/-\d+\.tsv$/, '');
  expected[g] ??= new Map();
  for (const line of fs.readFileSync(path.join(tmp, f), 'utf8').split('\n')) { const i = line.indexOf('\t'); if (i > 0) expected[g].set(line.slice(0, i), line.slice(i + 1)); }
}
fs.rmSync(tmp, { recursive: true, force: true });

const groups = {};
for (const f of fs.readdirSync(srcDir).filter((x) => x.endsWith('.tsv')).sort()) {
  const g = f.replace(/-\d+\.tsv$/, '');
  groups[g] ??= {};
  for (const raw of fs.readFileSync(path.join(srcDir, f), 'utf8').split(/\r?\n/)) {
    const line = raw.trim(); if (!line || line.startsWith('#')) continue;
    const i = line.search(/[\t|]/); if (i < 0) { console.warn(`ligne ignorée (${f}) : ${line.slice(0, 40)}`); continue; }
    groups[g][line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
}
let missingTotal = 0;
for (const g of Object.keys(expected)) {
  const dict = groups[g] || {};
  const want = expected[g];
  const kept = Object.fromEntries(Object.entries(dict).filter(([k]) => want.has(k)));
  const stale = Object.keys(dict).length - Object.keys(kept).length;
  const missing = [...want.keys()].filter((k) => !kept[k]);
  missingTotal += missing.length;
  fs.writeFileSync(path.join(outDir, `ar-${g}.js`), `// Traduction arabe (${g}), générée par scripts/tr-ar-build.mjs depuis scripts/tr-ar/${g}-*.tsv. Ne pas modifier à la main.\nexport default ${JSON.stringify(kept, null, 0).replace(/","/g, '",\n"')};\n`);
  console.log(`${g} : ${Object.keys(kept).length}/${want.size} traduits${stale ? ` · ${stale} clés obsolètes ignorées` : ''}${missing.length ? ` · ${missing.length} manquants (ex. ${want.get(missing[0]).slice(0, 50)})` : ''}`);
}
process.exitCode = missingTotal && process.argv.includes('--strict') ? 1 : 0;
