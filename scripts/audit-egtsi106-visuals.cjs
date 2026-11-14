// Audit des visuels du parcours EGTSI106 : liste chaque notion, carte ou élément d'activité affiché
// avec une icône (pictogramme, icône générique, mot-repère) au lieu d'une image illustrée.
// Lance : npm run build && node scripts/audit-egtsi106-visuals.cjs
// Sorties : output/missing-images/egtsi106-a-generer.md (pour Codex) et egtsi106-worklist.jsonl.
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

// Lu dans la page : tous les visuels non illustrés de la zone principale, avec leur libellé et leur rôle.
const inspect = () => {
  const main = document.querySelector('#main');
  const clean = (s) => (s || '').replace(/\?\s*AR/g, '').replace(/Retourner ↻/g, '').replace(/\s+/g, ' ').trim();
  const raster = (el) => !!(el && (el.matches('img,.egtsi-picture') || el.querySelector('img,.egtsi-picture')));
  const kindOf = (el) => {
    if (el.querySelector('.egtsi-pictogram') || el.matches('.egtsi-pictogram')) return 'pictogramme';
    if (el.querySelector('[data-symbol="mot-repere"]')) return 'mot-repère';
    return 'icône générique';
  };
  const where = (el) => {
    if (el.closest('.egtsi-flip')) return 'carte mot clé';
    if (el.closest('.egtsi-fact')) return 'notion du cours';
    if (el.closest('.egtsi-lesson-thumb')) return 'vignette de leçon';
    if (el.closest('.pick')) return 'carte à associer';
    if (el.closest('.chip')) return 'étiquette à classer';
    if (el.closest('label.opt,.quiz-card')) return 'option de QCM';
    if (el.closest('.egtsi-name-field')) return 'indice à nommer';
    if (el.closest('.ord-row')) return 'étape à ordonner';
    return 'élément d’activité';
  };
  const tidy = (s) => clean(s).replace(/\d*\s*📥.*$/u, '').replace(/^\d+\s*🎯\s*Trouver la bonne réponse\s*/u, '').replace(/^\d+\.\s*/, '').replace(/^[A-Z]{3,}(?=[A-Z][a-zà-ÿ])/, '').trim();
  const labelOf = (el) => {
    const box = el.closest('.egtsi-flip-face,.egtsi-fact,.egtsi-lesson-block,fieldset.q,.bucket-head,.egtsi-name-field,.pick,.chip,label.opt,.ord-row,li,div');
    if (box?.matches('.egtsi-fact')) return clean(box.querySelector('h4')?.textContent);
    if (box?.matches('.egtsi-flip-face')) return clean(box.querySelector('b')?.textContent);
    if (box?.matches('.egtsi-lesson-block')) return clean(box.querySelector('h2')?.textContent);
    if (box?.matches('fieldset.q')) return tidy(box.querySelector('legend')?.textContent); // QCM : la question seule
    if (box?.matches('.bucket-head')) return tidy(box.querySelector('.bucket-title-box')?.textContent || box.textContent).replace(/\d+$/, '').trim();
    if (box?.matches('.egtsi-name-field')) return tidy(box.querySelector('span:not(.egtsi-concept-visual)')?.textContent);
    return tidy(box?.textContent);
  };
  const out = []; const seen = new Set();
  main.querySelectorAll('.egtsi-concept-visual, svg.item-visual-svg, svg.semantic-icon').forEach((v) => {
    if (v.closest('.egtsi-act-ico,.chev-ico,.crumbs,.egtsi-overview,.pro-hero,.egtsi-steps')) return; // icônes d'interface, pas des notions
    if (v.matches('svg') && v.closest('.egtsi-concept-visual')) return;
    if (raster(v)) return;
    const label = labelOf(v); if (!label) return;
    const k = where(v) + '|' + label; if (seen.has(k)) return; seen.add(k);
    out.push({ label, kind: kindOf(v), role: where(v), key: v.querySelector('[data-label-key]')?.dataset.labelKey || v.dataset?.labelKey || null });
  });
  return out;
};

(async () => {
  const { labelKey } = await import('../src/utils/label-key.js');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 }, offline: true });
  await page.goto(pathToFileURL(path.resolve('dist/index.html')).href + '?test=1');
  await page.evaluate(() => window.__ip.store.createProfile('Audit'));
  const seen = new Set(); const queue = ['#/egtsi106']; const rows = [];
  while (queue.length) {
    const route = queue.shift(); if (seen.has(route)) continue; seen.add(route);
    await page.evaluate((r) => { location.hash = r; }, route); await page.waitForTimeout(300);
    const links = await page.evaluate(() => [...document.querySelectorAll('#main a[href^="#/egtsi106"]')].map((a) => a.getAttribute('href').split('?')[0]));
    links.forEach((l) => { if (!seen.has(l)) queue.push(l); });
    if (!/\/(lecon|activite)\/\d+$/.test(route)) continue;
    const title = await page.evaluate(() => document.querySelector('#main h1')?.textContent.replace(/\?\s*AR/g, '').trim() || '');
    const m = route.match(/seance\/(\d+)/); const session = m ? Number(m[1]) : 1;
    for (const it of await page.evaluate(inspect)) rows.push({ ...it, session, route, page: title, pageKind: route.includes('/lecon/') ? 'cours' : 'activité' });
  }
  await browser.close();

  // Regroupe par libellé : une image à produire peut servir à plusieurs pages.
  const byLabel = new Map();
  for (const r of rows) {
    const id = r.key || labelKey(r.label);
    if (!byLabel.has(id)) byLabel.set(id, { id, file: 'public/images/label-illustrations/' + id + '.webp', label: r.label, kind: r.kind, roles: new Set(), sessions: new Set(), pages: [] });
    const u = byLabel.get(id); u.roles.add(r.role); u.sessions.add(r.session); u.pages.push(`${r.pageKind} · ${r.page} (${r.route})`);
  }
  // « Entrée » (lbl-0891ea66) a déjà une image : la touche du clavier du module 2. EGTSI106 l'écarte volontairement
  // (sens « saisie de données ») ; régénérer cette clé écraserait l'image du module 2, donc elle est traitée à part.
  const AMBIGUOUS = new Set(['lbl-0891ea66']);
  const list = [...byLabel.values()].filter((u) => !AMBIGUOUS.has(u.id)).map((u) => ({ ...u, roles: [...u.roles], sessions: [...u.sessions].sort(), pages: [...new Set(u.pages)] }));
  const priority = (u) => (u.roles.some((x) => /mot clé|notion|vignette/.test(x)) ? 0 : 1);
  list.sort((a, b) => priority(a) - priority(b) || a.sessions[0] - b.sessions[0] || a.label.localeCompare(b.label, 'fr'));

  fs.mkdirSync('output/missing-images', { recursive: true });
  fs.writeFileSync('output/missing-images/egtsi106-worklist.jsonl', list.map((u) => JSON.stringify({ id: u.id, file: u.file, label: u.label, current: u.kind, roles: u.roles, sessions: u.sessions, pages: u.pages })).join('\n') + '\n');

  const cours = list.filter((u) => priority(u) === 0); const acts = list.filter((u) => priority(u) === 1);
  const row = (u) => `| \`${u.id}\` | ${u.label.replace(/\|/g, '/')} | ${u.roles.join(', ')} | ${u.kind} | S${u.sessions.join(', S')} |`;
  const md = [
    '# EGTSI106 · images à générer',
    '',
    `Généré le ${new Date().toISOString().slice(0, 10)} par \`node scripts/audit-egtsi106-visuals.cjs\`. ${list.length} images à produire (${cours.length} pour le cours, ${acts.length} pour les activités).`,
    '',
    '## Consignes pour Codex',
    '',
    '- Une image par ligne, au format **WebP 512 × 512**, enregistrée exactement au chemin `public/images/label-illustrations/<id>.webp` (colonne « id »).',
    '- Style identique aux illustrations existantes du dossier : objet unique, dessin plat aux contours foncés, couleurs franches, fond crème uni, sans texte ni logo de marque.',
    '- Représenter l’objet ou l’action décrits par le libellé, compréhensibles par un élève de 15 ans.',
    '- Après génération : `node scripts/sync-label-illustrations.mjs` puis `npm run build`. Dès que l’image existe, elle remplace automatiquement l’icône (une seule représentation par notion).',
    '- La liste complète, avec les pages où chaque libellé apparaît, est dans `output/missing-images/egtsi106-worklist.jsonl`.',
    '- Hors liste : « Entrée » (`lbl-0891ea66`) garde son pictogramme dans EGTSI106, car l’image existante représente la touche du clavier du module 2. Ne pas régénérer cette clé.',
    '',
    `## 1. Cours : mots clés, notions et vignettes de leçon (${cours.length})`,
    '',
    '| id | Libellé | Où | Affiché aujourd’hui | Séance |',
    '|---|---|---|---|---|',
    ...cours.map(row),
    '',
    `## 2. Activités (${acts.length})`,
    '',
    '| id | Libellé | Où | Affiché aujourd’hui | Séance |',
    '|---|---|---|---|---|',
    ...acts.map(row),
    '',
  ].join('\n');
  fs.writeFileSync('output/missing-images/egtsi106-a-generer.md', md);
  console.log(JSON.stringify({ pages: seen.size, elements: rows.length, aGenerer: list.length, cours: cours.length, activites: acts.length }));
})().catch((e) => { console.error(e); process.exitCode = 1; });
