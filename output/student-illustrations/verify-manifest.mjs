import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { ACTIVITIES } from '../../src/data/index.js';

const root = new URL('./', import.meta.url);
const manifest = JSON.parse(readFileSync(new URL('manifest.json', root), 'utf8'));
const fields = { match: 'pairs', sort: 'items', order: 'steps', fill: 'lines', quiz: 'qs', hot: 'prompts', asm: 'parts', net: 'devices', robot: 'levels', prog: 'tasks', sim: 'tasks' };
const clean = text => String(text).replace(/\[\[[^\]]+\]\]/g, '[blank]');
const expected = ACTIVITIES.flatMap(a => (a.data[fields[a.type]] || []).map((item, index) => ({
  id: `${a.id}-q${String(index + 1).padStart(2, '0')}`,
  activityId: a.id,
  dataPath: `data.${fields[a.type]}[${index}]`,
  question: clean(typeof item === 'string' ? item : Array.isArray(item) ? item[a.type === 'hot' ? 1 : 0] : item.name || item.label || `Robot level ${index + 1}`),
})));
assert.equal(manifest.questions.length, expected.length);
const paths = new Set(), hashes = new Set();
let generated = 0, reviewed = 0;
for (const [index, q] of manifest.questions.entries()) {
  for (const field of ['id', 'activityId', 'dataPath', 'question']) assert.equal(q[field], expected[index][field], `${q.id}: ${field}`);
  if (!q.asset) continue;
  assert.ok(/^assets\/m[1-4]-s\d+-a\d+-q\d+(?:-v\d+)?\.png$/.test(q.asset), q.id);
  const bytes = readFileSync(new URL(q.asset, root));
  assert.deepEqual([...bytes.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], q.id);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  assert.equal(sha256, q.generation.sha256, q.id);
  assert.ok(bytes.readUInt32BE(16) >= 512 && bytes.readUInt32BE(20) >= 512, q.id);
  assert.ok(!paths.has(q.asset) && !hashes.has(sha256), `Repeated asset: ${q.id}`);
  paths.add(q.asset); hashes.add(sha256); generated++;
  assert.ok(q.generation.prompt && q.generation.tool === 'image_gen', q.id);
  if (q.readyForIntegration && q.generation.reviewed && !q.generation.needsRegeneration) reviewed++;
}
if (process.argv.includes('--complete')) {
  assert.equal(generated, expected.length, 'Missing generated images');
  assert.equal(reviewed, expected.length, 'Unresolved image reviews');
}
console.log(JSON.stringify({ questions: expected.length, generated, reviewed, uniqueAssets: paths.size, uniqueHashes: hashes.size }));
