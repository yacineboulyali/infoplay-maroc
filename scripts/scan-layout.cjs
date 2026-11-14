// Scan de mise en page : parcourt toutes les routes de dist/ à plusieurs largeurs et signale
// les débordements horizontaux, les éléments qui se chevauchent, les textes coupés et les erreurs JS.
// Lance : node scripts/scan-layout.cjs [dossier-captures]
const { chromium } = require('playwright');
const { pathToFileURL } = require('url');
const path = require('path');
const fs = require('fs');

const shotsDir = process.argv[2] || 'shots/scan';
const WIDTHS = [1440, 1024, 390];
const SHOTS = ['#/profils', '#/dash', '#/m/1', '#/m/1/s/1', '#/m/1/s/1/a/1', '#/m/2/s/3/a/4', '#/m/3/s/1/a/4', '#/pro', '#/m/205/s/1/a/1', '#/egtsi106', '#/multijoueur', '#/course', '#/suivi', '#/progres', '#/donnees'];

const inspect = () => {
  const vis = (el) => { if (el.closest('details:not([open])') && !el.matches('summary')) return false; const r = el.getBoundingClientRect(); const s = getComputedStyle(el); return r.width > 2 && r.height > 2 && s.visibility !== 'hidden' && s.display !== 'none' && +s.opacity > 0.05; };
  const floating = (el) => { for (let n = el; n && n !== document.body; n = n.parentElement) { const p = getComputedStyle(n).position; if (p === 'fixed' || p === 'sticky') return n; } return null; };
  const sig = (el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.') : '');
  const out = { overflowX: document.documentElement.scrollWidth > innerWidth + 1, overlaps: [], clipped: [], offscreen: [] };
  const els = [...document.querySelectorAll('a,button,input,select,textarea,label.opt,.chip,.pick,.kpi,.pill,.card,h1,h2,h3,.bucket,.act-meta,.dots,.ghud')].filter(vis);
  const rects = els.map((el) => ({ el, r: el.getBoundingClientRect(), f: floating(el) }));
  for (let i = 0; i < rects.length; i++) for (let j = i + 1; j < rects.length; j++) {
    const a = rects[i], b = rects[j];
    if (a.el.contains(b.el) || b.el.contains(a.el) || a.f !== b.f) continue;
    const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left); const h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
    if (w < 5 || h < 5) continue;
    const small = Math.min(a.r.width * a.r.height, b.r.width * b.r.height);
    if ((w * h) / small > 0.15) out.overlaps.push(sig(a.el) + ' × ' + sig(b.el));
  }
  for (const { el, r, f } of rects) {
    if (!f && (r.right > document.documentElement.clientWidth + 2 || r.left < -2) && !el.closest('.tablewrap,.rb-tabs,.rb-panel,.crumbs,[style*="overflow"]')) out.offscreen.push(sig(el));
    if (/^(BUTTON|A|H1|H2|H3)$/.test(el.tagName) || el.matches('.pill,.kpi')) { const s = getComputedStyle(el); if (s.overflow !== 'visible' && el.scrollWidth > el.clientWidth + 3 && s.textOverflow !== 'ellipsis' && !el.matches('.vh,.skip')) out.clipped.push(sig(el)); }
  }
  // La barre d'action ancrée ne doit pas dépasser une hauteur raisonnable.
  const bar = document.querySelector('.activity-actions'); if (bar && vis(bar) && bar.getBoundingClientRect().height > innerHeight * 0.3) out.overlaps.push('activity-actions trop haute');
  return out;
};

(async () => {
  const { CATALOG, PRO, ACTIVITIES, PRO_ACTIVITIES } = await import('../src/data/index.js');
  fs.mkdirSync(shotsDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, offline: true });
  const report = { errors: [], overflow: [], overlaps: {}, clipped: {}, offscreen: {}, routes: 0 };
  page.on('pageerror', (e) => report.errors.push({ route: page.url().split('#')[1], error: e.message }));
  page.on('console', (m) => { if (m.type() === 'error') report.errors.push({ route: page.url().split('#')[1], error: m.text().slice(0, 200) }); });
  await page.goto(pathToFileURL(path.resolve('dist/index.html')).href + '?test=1');
  await page.evaluate(() => { window.__ip.store.createProfile('Scan'); try { localStorage.setItem('infoplay_fs_dismissed', '1'); } catch {} });
  const mods = [...CATALOG, PRO];
  const routes = ['#/profils', '#/dash', '#/progres', '#/donnees', '#/pro', '#/egtsi106', '#/multijoueur', '#/course', '#/suivi',
    ...mods.map((m) => (m.id === PRO.id ? '#/pro' : `#/m/${m.id}`)),
    ...mods.flatMap((m) => m.sessions.flatMap((s) => [`#/m/${m.id}/s/${s.index}`, `#/m/${m.id}/s/${s.index}/bilan`])),
    ...[...ACTIVITIES, ...PRO_ACTIVITIES].map((a) => `#/m/${a.moduleId}/s/${a.sessionIndex}/a/${a.index}`)];
  const add = (bucket, key, route, width) => { const k = `${width}px  ${key}`; (bucket[k] = bucket[k] || []).push(route); };
  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [...new Set(routes)]) {
      await page.evaluate((r) => { document.querySelector('#main')?.setAttribute('data-inspected', 'old'); if (location.hash === r) location.hash = '#/x'; location.hash = r; }, route);
      await page.waitForFunction(() => document.querySelector('#main') && !document.querySelector('#main').hasAttribute('data-inspected'), null, { timeout: 5000 }).catch(() => report.errors.push({ route, error: 'vue non rendue' }));
      await page.waitForTimeout(120);
      await page.evaluate(() => document.querySelectorAll('.fs-suggest').forEach((n) => n.remove()));
      const r = await page.evaluate(inspect); report.routes++;
      if (r.overflowX) report.overflow.push(`${width}px ${route}`);
      r.overlaps.forEach((k) => add(report.overlaps, k, route, width)); r.clipped.forEach((k) => add(report.clipped, k, route, width)); r.offscreen.forEach((k) => add(report.offscreen, k, route, width));
      if (SHOTS.includes(route)) await page.screenshot({ path: path.join(shotsDir, `${width}-${route.replace(/[#/]+/g, '_')}.png`) });
    }
  }
  const brief = (b) => Object.fromEntries(Object.entries(b).map(([k, v]) => [k, `${v.length} route(s), ex. ${[...new Set(v)].slice(0, 3).join(' ')}`]));
  fs.writeFileSync(path.join(shotsDir, 'report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ visites: report.routes, erreurs: report.errors.slice(0, 15), debordements: report.overflow.slice(0, 40), chevauchements: brief(report.overlaps), textesCoupes: brief(report.clipped), horsEcran: brief(report.offscreen) }, null, 1));
  await browser.close();
})().catch((e) => { console.error(e); process.exitCode = 1; });
