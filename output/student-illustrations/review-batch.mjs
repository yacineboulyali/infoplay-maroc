// Apply the human-reviewed contact-sheet decision; never run before visual review.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const root = new URL('./', import.meta.url);
const [prefix, notesName = `qa/${prefix}-notes.json`] = process.argv.slice(2);
if (!/^[a-z0-9-]+$/.test(prefix || '')) throw Error('Invalid sheet prefix');
const read = name => JSON.parse(readFileSync(new URL(name, root), 'utf8'));
const pages = read(`qa/${prefix}-index.json`);
const items = pages.flatMap(p => p.items);
const notes = existsSync(new URL(notesName, root)) ? read(notesName) : [];
const rejected = new Map(notes.map(n => [n.id, n]));
const log = read('generation-log.json');
const findings = read('review-findings.json');
for (const note of notes) if (!items.some(i => i.id === note.id)) throw Error(`Finding outside reviewed batch: ${note.id}`);
for (const item of items) {
  const record = log[item.id];
  if (!record || (item.asset && item.asset !== record.asset)) throw Error(`Review version mismatch: ${item.id}`);
  const note = rejected.get(item.id);
  if (note) {
    record.reviewed = false; record.needsRegeneration = true;
    const at = findings.findIndex(f => f.id === item.id);
    const finding = { ...note, resolved: false, excludedFromIntegration: true };
    if (at < 0) findings.push(finding); else findings[at] = finding;
  } else {
    if (record.needsRegeneration) throw Error(`Regenerate before approval: ${item.id}`);
    record.reviewed = true;
    const finding = findings.find(f => f.id === item.id);
    if (finding) { finding.resolved = true; finding.acceptedAsset = record.asset; delete finding.excludedFromIntegration; }
  }
}
writeFileSync(new URL('generation-log.json', root), JSON.stringify(log, null, 2) + '\n');
writeFileSync(new URL('review-findings.json', root), JSON.stringify(findings, null, 2) + '\n');
console.log(JSON.stringify({ approved: items.length - rejected.size, retry: [...rejected.keys()] }));
