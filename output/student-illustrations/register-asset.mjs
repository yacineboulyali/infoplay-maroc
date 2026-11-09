import { readFileSync, writeFileSync, existsSync, copyFileSync, renameSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const [id, source, reviewed = 'false'] = process.argv.slice(2);
if (!/^m[1-4]-s\d+-a\d+-q\d+$/.test(id || '')) throw Error('Invalid item ID');
const manifest = JSON.parse(readFileSync(join(root, 'manifest.json'), 'utf8'));
if (!manifest.questions.some(q => q.id === id)) throw Error('Unknown item ID');
let asset = `assets/${id}.png`;
let version = 1;
while (existsSync(join(root, asset))) { version++; asset = `assets/${id}-v${version}.png`; }
const destination = join(root, asset);
const bytes = readFileSync(source);
if (bytes.subarray(1, 4).toString() !== 'PNG') throw Error('Expected PNG image');
const hash = createHash('sha256').update(bytes).digest('hex');
const file = join(root, 'generation-log.json');
const log = existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {};
if (Object.values(log).some(entry => entry.sha256 === hash)) throw Error('Duplicate image bytes: separate illustration required');
copyFileSync(source, destination);
log[id] = { source, asset, sha256: hash, reviewed: reviewed === 'true', prompt: manifest.questions.find(q => q.id === id).prompt, tool: 'image_gen', width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20), ...(log[id] ? { previous: log[id] } : {}) };
writeFileSync(file + '.tmp', JSON.stringify(log, null, 2) + '\n');
renameSync(file + '.tmp', file);
console.log(JSON.stringify({ id, asset, count: Object.keys(log).length }));
