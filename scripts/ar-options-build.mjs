// Compile scripts/ar-options/ar-*.tsv (numéro de ligne de fr.txt|arabe) en src/i18n/ar-options.js.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const dir = join(dirname(fileURLToPath(import.meta.url)), 'ar-options');
const fr = readFileSync(join(dir, 'fr.txt'), 'utf8').split(/\r?\n/);
const out = {}; let n = 0;
for (const f of readdirSync(dir).filter((x) => /^ar-\d+\.tsv$/.test(x)).sort()) {
  for (const line of readFileSync(join(dir, f), 'utf8').split(/\r?\n/)) {
    if (!line.trim() || line.startsWith('#')) continue;
    const i = line.indexOf('|'); const k = +line.slice(0, i); const ar = line.slice(i + 1).trim();
    if (!Number.isInteger(k) || !fr[k] || !ar) throw new Error(`${f} : ligne invalide « ${line} »`);
    if (out[fr[k]]) throw new Error(`${f} : ligne ${k} traduite deux fois`);
    out[fr[k]] = ar; n++;
  }
}
const body = Object.entries(out).map(([k, v]) => `${JSON.stringify(k)}:${JSON.stringify(v)}`).join(',\n');
writeFileSync(join(dir, '..', '..', 'src/i18n/ar-options.js'), `// Généré par scripts/ar-options-build.mjs : ne pas modifier à la main.\n// Traduction arabe des propositions de réponse des activités (Tronc commun, Collège, M205).\nexport const AR_OPTIONS = {\n${body}\n};\n`);
console.log(`${n} propositions traduites sur ${fr.filter(Boolean).length}`);
