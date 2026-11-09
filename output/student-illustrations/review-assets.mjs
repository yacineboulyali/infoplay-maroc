import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const path = join(dirname(fileURLToPath(import.meta.url)), 'generation-log.json');
const log = JSON.parse(readFileSync(path, 'utf8'));
for (const id of process.argv.slice(2)) {
  if (!log[id]) throw Error(`Missing image: ${id}`);
  if (log[id].needsRegeneration) throw Error(`Regenerate before approval: ${id}`);
  log[id].reviewed = true;
}
writeFileSync(path, JSON.stringify(log, null, 2) + '\n');
const findingsPath = join(dirname(path), 'review-findings.json');
if (existsSync(findingsPath)) {
  const findings = JSON.parse(readFileSync(findingsPath, 'utf8'));
  for (const finding of findings) if (process.argv.slice(2).includes(finding.id)) {
    finding.resolved = true;
    finding.acceptedAsset = log[finding.id].asset;
    delete finding.excludedFromIntegration;
  }
  writeFileSync(findingsPath, JSON.stringify(findings, null, 2) + '\n');
}
console.log(`${process.argv.length - 2} images reviewed`);
