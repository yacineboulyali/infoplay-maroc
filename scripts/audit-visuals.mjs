import { mkdirSync, writeFileSync, existsSync, readFileSync, readdirSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { ACTIVITIES, PRO_ACTIVITIES, CATALOG, PRO } from '../src/data/index.js';
import { engineOf } from '../src/games/index.js';
import { artFor } from '../src/games/basic.js';
import { semanticKind } from '../src/utils/semantic-icons.js';
import { officeConcept } from '../src/pro/visuals.js';

const dom = new JSDOM('<!doctype html><body></body>', { url: 'http://localhost/' });
Object.assign(globalThis, { document: dom.window.document, window: dom.window });
const labels = a => a.data.pairs?.flat() || a.data.items?.map(x => x[0]) || a.data.steps || a.data.qs?.flatMap(x => x[1]) || [];
const rows = [];
for (const a of [...ACTIVITIES, ...PRO_ACTIVITIES]) {
  const root = document.createElement('div'); document.body.append(root);
  let error = null;
  try { engineOf(a.mech)(root, a.data); } catch (e) { error = e.message; }
  const ls = labels(a);
  rows.push({ id: a.id, title: a.title, type: a.type, part: a.data.visualPart || null,
    labels: ls.length, missingRasterLabels: ls.filter(l => !artFor(l)),
    genericSymbolLabels: ls.filter(l => !artFor(l) && semanticKind(l) === 'text' && (!a.data.visualPart || officeConcept(l, a.data.visualPart) < 0)),
    renderedVisuals: root.querySelectorAll('svg,img,[role="img"],canvas,.item-art,.office-art').length,
    iconOnlyControlsWithoutName: [...root.querySelectorAll('button')].filter(b => !b.textContent.trim() && !b.getAttribute('aria-label') && !b.getAttribute('aria-labelledby')).length,
    error });
  root.remove();
}
const css = readdirSync('src/styles').filter(f => f.endsWith('.css')).map(f => readFileSync(`src/styles/${f}`, 'utf8')).join('\n');
const urls = [...css.matchAll(/url\(['"]?(images\/[^)'"\s]+)['"]?\)/g)].map(m => m[1]);
const missingFiles = [...new Set(urls)].filter(p => !existsSync(`public/${p}`));
const general = rows.filter(r => !r.part);
const report = { generatedAt: new Date().toISOString(), scope: { modules: CATALOG.length + 1, sessions: [...CATALOG, PRO].reduce((n, m) => n + m.sessions.length, 0), activities: rows.length },
  generalRasterCoverage: { labels: general.reduce((n,r) => n+r.labels,0), withoutRaster: general.reduce((n,r)=>n+r.missingRasterLabels.length,0) },
  activitiesWithoutEngineVisual: rows.filter(r => r.renderedVisuals === 0).map(r => r.id), missingFiles, errors: rows.filter(r => r.error), rows,
  limits: ['Raster absence does not by itself imply a design defect: icons, diagrams and simulations can be appropriate.', 'Counts describe mounted activity engines, not surrounding screen imagery.', 'Semantic accuracy and image clipping require human visual review.'] };
mkdirSync('output/visual-audit', { recursive: true });
const target = process.argv[2] || 'current';
writeFileSync(`output/visual-audit/${target}.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify({ ...report, rows: undefined, limits: undefined, activitiesWithoutEngineVisual: report.activitiesWithoutEngineVisual.length }));
