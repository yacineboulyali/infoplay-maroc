// Inventaire des éléments d'activité affichés SANS image illustrée (icône vectorielle, mot-repère ou texte seul).
// Rend chaque activité dans Chromium (dist/) et lit le DOM réel ; complète par un contrôle des étapes
// des simulations (affichées une à une). Lance : npm run build && node scripts/audit-missing-images.cjs
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

const inspect = () => {
  const stage = document.querySelector('#stage') || document.querySelector('#main');
  const clean = (s) => (s || '').replace(/\?\s*AR/g, '').replace(/\s+/g, ' ').trim();
  const role = (el) => {
    const c = el.closest('label.opt,.quiz-card,.pick,.chip,.ord-row,ol.prompts li,.fill-line,legend,.bucket-head,.node,.slot,button,li,p');
    if (!c) return 'autre';
    if (c.matches('label.opt,.quiz-card')) return 'option de QCM';
    if (c.matches('.pick')) return c.closest('[class*=right],.col-b,.answers') ? 'réponse à associer' : 'carte à associer';
    if (c.matches('.chip')) return 'étiquette à classer';
    if (c.matches('.ord-row')) return 'étape à ordonner';
    if (c.matches('.fill-line')) return 'phrase à compléter';
    if (c.matches('legend')) return 'question';
    if (c.matches('.bucket-head')) return 'titre de catégorie';
    if (c.matches('ol.prompts li')) return 'consigne à repérer';
    return c.tagName.toLowerCase() + (c.className && typeof c.className === 'string' ? '.' + c.className.split(' ')[0] : '');
  };
  const raster = (el) => el && (el.matches('img,.item-art,.office-art,.student-illustration,canvas') || el.querySelector?.('img,.item-art,.office-art'));
  const out = []; const seen = new Set();
  const push = (label, kind, el, key) => { label = clean(label).replace(/s*d*s*📥.*$/u, ''); if (el.closest('.rb-cmd,.slot,.rb-app')) return; if (!label) return; const k = kind + '|' + label; if (seen.has(k)) return; seen.add(k); out.push({ label, kind, role: role(el), key: key || null }); };
  stage.querySelectorAll('.visual-label').forEach((v) => {
    const text = v.querySelector('.visual-text')?.textContent; const vis = [...v.children].find((c) => !c.matches('.visual-text'));
    if (!vis) push(text, 'texte seul', v, v.dataset.labelKey);
    else if (!raster(vis)) push(text, vis.dataset?.symbol === 'mot-repere' ? 'mot-repère' : 'icône', v, v.dataset.labelKey);
  });
  stage.querySelectorAll('svg.item-visual-svg, svg.semantic-icon').forEach((s) => {
    if (s.closest('.visual-label')) return;
    const c = s.closest('.fill-line,legend,li,label,button,p,figure,div'); if (!c || raster(c)) return;
    if (s.dataset.labelKey) push(c.textContent, s.dataset?.symbol === 'mot-repere' ? 'mot-repère' : 'icône', s, s.dataset.labelKey);
  });
  return { items: out, rasters: stage.querySelectorAll('img,.item-art,.office-art').length };
};

(async () => {
  const { ACTIVITIES, PRO_ACTIVITIES } = await import('../src/data/index.js');
  const { STUDENT_ILLUSTRATIONS } = await import('../src/data/student-illustrations.js');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 }, offline: true });
  await page.goto(pathToFileURL(path.resolve('dist/index.html')).href + '?test=1');
  await page.evaluate(() => window.__ip.store.createProfile('Audit'));
  const rows = [];
  for (const a of [...ACTIVITIES, ...PRO_ACTIVITIES]) {
    await page.evaluate((r) => { document.querySelector('#main')?.setAttribute('data-inspected', 'old'); location.hash = r; }, `#/m/${a.moduleId}/s/${a.sessionIndex}/a/${a.index}`);
    await page.waitForFunction(() => document.querySelector('#main') && !document.querySelector('#main').hasAttribute('data-inspected'));
    await page.waitForTimeout(150);
    const r = await page.evaluate(inspect);
    // Étapes affichées une à une (simulations, programmes, robot) : une image par étape est attendue.
    const steps = a.data.tasks || a.data.levels || null; const missingSteps = [];
    if (steps && a.moduleId <= 4) steps.forEach((t, i) => { if (!STUDENT_ILLUSTRATIONS[`${a.id}-q${String(i + 1).padStart(2, '0')}`]) missingSteps.push({ label: `Étape ${i + 1} : ${Array.isArray(t) ? t[0] : t.goal || t.title || t.q || ''}`.slice(0, 160), kind: 'étape sans image', role: 'étape de simulation' }); });
    rows.push({ id: a.id, module: a.moduleId, session: a.sessionIndex, index: a.index, title: a.title, mech: a.mech, route: `#/m/${a.moduleId}/s/${a.sessionIndex}/a/${a.index}`, rasters: r.rasters, missing: [...r.items, ...missingSteps] });
  }
  // Parcours EGTSI106 : ses pages ne sont pas dans ACTIVITIES, on les découvre en suivant les liens.
  const seen = new Set(); const queue = ['#/egtsi106'];
  while (queue.length) {
    const route = queue.shift(); if (seen.has(route)) continue; seen.add(route);
    await page.evaluate((r) => { location.hash = r; }, route); await page.waitForTimeout(350);
    const links = await page.evaluate(() => [...document.querySelectorAll('#main a[href^="#/egtsi106"]')].map((a) => a.getAttribute('href').split('?')[0]));
    links.forEach((l) => { if (!seen.has(l)) queue.push(l); });
    if (!/\/activite\/\d+$/.test(route)) continue;
    const r = await page.evaluate(inspect); const title = await page.evaluate(() => document.querySelector('#main h1')?.textContent.replace(/\?\s*AR/g, '').trim() || '');
    const m = route.match(/seance\/(\d+)/); const session = m ? Number(m[1]) : 1; const index = Number(route.split('/').pop());
    rows.push({ id: `egtsi106-s${session}-a${index}`, module: 106, session, index, title, mech: 'egtsi', route, rasters: r.rasters, missing: r.items });
  }
  await browser.close();
  const withMissing = rows.filter((r) => r.missing.length);
  const total = withMissing.reduce((n, r) => n + r.missing.length, 0);
  const unique = new Map();
  for (const r of withMissing) for (const m of r.missing) { const k = m.key || m.label.toLowerCase(); if (!unique.has(k)) unique.set(k, { id: m.key, label: m.label, kind: m.kind, role: m.role, file: m.key ? 'public/images/label-illustrations/' + m.key + '.webp' : null, activities: [] }); const u = unique.get(k); u.activities.push(r.id); u.context = u.context || ((r.module === 106 ? 'EGTSI106' : 'Module ' + r.module) + ' · ' + r.title); }
  const byKind = {}; for (const r of withMissing) for (const m of r.missing) byKind[m.kind] = (byKind[m.kind] || 0) + 1;
  const byModule = {}; for (const r of rows) { const b = (byModule[r.module] = byModule[r.module] || { activites: 0, incompletes: 0, elements: 0 }); b.activites++; if (r.missing.length) { b.incompletes++; b.elements += r.missing.length; } }
  fs.mkdirSync('output/missing-images', { recursive: true });
  fs.writeFileSync('output/missing-images/inventory.json', JSON.stringify({ generatedAt: new Date().toISOString(), activities: rows.length, activitiesWithMissing: withMissing.length, missingElements: total, uniqueLabels: unique.size, byKind, byModule, rows: withMissing, labels: [...unique.values()] }, null, 2));
  // Liste de travail pour la génération : une ligne JSON par image à produire.
  fs.writeFileSync('output/missing-images/worklist.jsonl', [...unique.values()].filter((u) => u.id).map((u) => JSON.stringify({ id: u.id, file: u.file, label: u.label, role: u.role, context: u.context, activities: [...new Set(u.activities)] })).join(String.fromCharCode(10)) + String.fromCharCode(10));
  console.log(JSON.stringify({ activites: rows.length, incompletes: withMissing.length, elements: total, libellesUniques: unique.size, byKind, byModule }, null, 1));
})().catch((e) => { console.error(e); process.exitCode = 1; });
