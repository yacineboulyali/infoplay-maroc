import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const path = join(dirname(fileURLToPath(import.meta.url)), 'generation-log.json');
const log = JSON.parse(readFileSync(path, 'utf8'));
for (const id of process.argv.slice(2)) {
  if (!log[id]) throw Error(`Missing image: ${id}`);
  log[id].reviewed = true;
}
writeFileSync(path, JSON.stringify(log, null, 2) + '\n');
console.log(`${process.argv.length - 2} images reviewed`);
