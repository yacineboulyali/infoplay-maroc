import { h, norm, fmtNum, svgFrom } from '../utils/dom.js';
import { computeCell, colName } from './sheetcalc.js';

const COLORS = { noir: '#1d1d2b', rouge: '#c0392b', bleu: '#1f4fd8', vert: '#1b7f4b' };
const sel = (opts, cur, on, label) => h('select', { 'aria-label': label, onchange: (e) => on(e.target.value) }, opts.map((o) => h('option', { value: String(o), selected: String(o) === String(cur) }, String(o))));

function office(host, st, ctx) {
  const C = ctx.cfg; const show = new Set(C.show || []);
  const D = { name: '', folder: 'Bureau', text: '', saved: false, sel: 'title', img: false, table: false, shape: false, orient: 'portrait', margins: 'normales', paper: 'A4', copies: 1, color: 'couleur', printed: false };
  for (const [k, v] of Object.entries(D)) st[k] ??= v;
  for (const b of ['title', 'para']) { st[b + '.b'] ??= false; st[b + '.i'] ??= false; st[b + '.u'] ??= false; st[b + '.al'] ??= 'gauche'; st[b + '.sz'] ??= 12; st[b + '.col'] ??= 'noir'; }
  const blocks = show.has('fmt') || show.has('insert');
  const set = (k, v, dirty = true) => { st[k] = v; if (dirty) st.saved = false; st.printed = k === 'printed' ? v : st.printed; paint(); };
  const msg = h('p', { class: 'hint-line', 'aria-live': 'polite' }); const titleBar = h('div', { class: 'otitle' }); const page = h('div', { class: 'opage' });
  const tools = h('div', { class: 'otools' });
  let ta = null;
  if (show.has('type')) ta = h('textarea', { class: 'otext', rows: '8', 'aria-label': 'Page du document : zone de saisie', oninput: (e) => { st.text = e.target.value; st.saved = false; titleBar.textContent = tb(); } });
  const tb = () => `${st.saved && st.name ? st.name : st.name || 'Document1'}${st.saved ? '' : ' *'} — Traitement de texte`;
  const T = (key, label, aria) => h('button', { type: 'button', class: 'tb', 'aria-label': aria || label, 'aria-pressed': 'false', 'data-k': key, onclick: () => set(st.sel + '.' + key, !st[st.sel + '.' + key]) }, label);
  if (show.has('fmt')) tools.append(h('div', { class: 'tgrp' }, h('span', { class: 'lbl' }, 'Texte sélectionné :'),
    ...['title', 'para'].map((b) => h('button', { type: 'button', class: 'tb sel-' + b, 'aria-pressed': 'false', onclick: () => set('sel', b, false) }, b === 'title' ? 'Titre' : 'Paragraphe')),
    T('b', 'G', 'Gras'), T('i', 'I', 'Italique'), T('u', 'S', 'Souligné'),
    ...['gauche', 'centre', 'droite'].map((a) => h('button', { type: 'button', class: 'tb al-' + a, 'aria-label': 'Aligner : ' + a, 'aria-pressed': 'false', onclick: () => set(st.sel + '.al', a) }, a === 'gauche' ? '⇤' : a === 'centre' ? '↔' : '⇥')),
    h('label', null, 'Taille ', h('select', { 'aria-label': 'Taille de police', class: 'szsel', onchange: (e) => set(st.sel + '.sz', Number(e.target.value)) }, [10, 12, 14, 18, 24, 32].map((n) => h('option', { value: n }, n)))),
    h('label', null, 'Couleur ', h('select', { 'aria-label': 'Couleur du texte', class: 'colsel', onchange: (e) => set(st.sel + '.col', e.target.value) }, Object.keys(COLORS).map((n) => h('option', { value: n }, n))))));
  if (show.has('insert')) tools.append(h('div', { class: 'tgrp' }, h('span', { class: 'lbl' }, 'Insertion :'), [['img', '🖼 Image'], ['table', '▦ Tableau'], ['shape', '★ Forme']].map(([k, l]) => h('button', { type: 'button', class: 'tb wide', 'aria-pressed': 'false', 'data-ins': k, onclick: () => set(k, !st[k]) }, l))));
  let nameIn, folderSel;
  const saveBar = show.has('save') ? h('div', { class: 'tgrp' }, h('label', null, 'Nom du fichier ', nameIn = h('input', { type: 'text', maxlength: '30', autocomplete: 'off', oninput: (e) => { st.name = e.target.value.replace(/[^\w.\- ]/g, ''); st.saved = false; titleBar.textContent = tb(); } })),
    h('label', null, 'Dossier ', folderSel = h('select', { 'aria-label': 'Dossier d’enregistrement', onchange: (e) => { st.folder = e.target.value; st.saved = false; } }, ['Bureau', 'Mes documents', 'Téléchargements'].map((o) => h('option', { value: o }, o)))),
    h('button', { type: 'button', class: 'btn small', onclick: () => { if (!st.name.trim()) msg.textContent = 'Donne un nom au document avant de l’enregistrer.'; else { st.saved = true; msg.textContent = `Document « ${st.name} » enregistré dans ${st.folder}.`; } paint(); } }, '💾 Enregistrer')) : null;
  let printBox = null; const pvw = h('div', { class: 'pvw' });
  if (show.has('print')) printBox = h('div', { class: 'tgrp printp' },
    h('label', null, 'Orientation ', sel(['portrait', 'paysage'], st.orient, (v) => set('orient', v, false), 'Orientation')), h('label', null, 'Format ', sel(['A4', 'A5', 'Lettre'], st.paper, (v) => set('paper', v, false), 'Format du papier')),
    h('label', null, 'Marges ', sel(['normales', 'étroites', 'larges'], st.margins, (v) => set('margins', v, false), 'Marges')), h('label', null, 'Copies ', h('input', { type: 'number', min: '1', max: '99', value: st.copies, 'aria-label': 'Nombre de copies', oninput: (e) => { st.copies = Math.max(1, Math.min(99, Number(e.target.value) || 1)); } })),
    h('label', null, 'Couleur ', sel(['couleur', 'noir et blanc'], st.color, (v) => set('color', v, false), 'Couleur d’impression')),
    h('button', { type: 'button', class: 'btn small', onclick: () => { st.printed = true; msg.textContent = `Impression simulée : ${st.copies} copie(s), ${st.paper}, ${st.orient}, marges ${st.margins}.`; paint(); } }, '🖨 Imprimer'), pvw);
  function paint() {
    titleBar.textContent = tb();
    if (ta) { if (ta.value !== st.text) ta.value = st.text; }
    if (blocks || show.has('print')) {
      const mk = (b, tag, text) => { const e = h(tag, { class: 'blk ' + (st.sel === b && show.has('fmt') ? 'selected' : ''), tabindex: '0', onclick: () => set('sel', b, false) }, text);
        Object.assign(e.style, { fontWeight: st[b + '.b'] ? '800' : '400', fontStyle: st[b + '.i'] ? 'italic' : 'normal', textDecoration: st[b + '.u'] ? 'underline' : 'none', textAlign: st[b + '.al'] === 'gauche' ? 'left' : st[b + '.al'] === 'centre' ? 'center' : 'right', fontSize: st[b + '.sz'] * 1.3 + 'px', color: COLORS[st[b + '.col']] }); return e; };
      page.replaceChildren(mk('title', 'h3', C.title || 'Fête de l’école'), mk('para', 'p', C.para || 'Rendez-vous le samedi à 15 h dans la cour. Entrée libre pour toutes les familles.'),
        st.img ? h('div', { class: 'imgph' }, '🖼 Image') : null, st.table ? h('table', { class: 'mt' }, h('tbody', null, h('tr', null, h('td', null, 'Heure'), h('td', null, 'Activité')), h('tr', null, h('td', null, '15 h'), h('td', null, 'Jeux')))) : null, st.shape ? h('div', { class: 'shape' }, '★') : null);
    } else if (ta) page.replaceChildren(ta);
    tools.querySelectorAll('[data-k]').forEach((b) => b.setAttribute('aria-pressed', String(!!st[st.sel + '.' + b.dataset.k])));
    tools.querySelectorAll('[data-ins]').forEach((b) => b.setAttribute('aria-pressed', String(!!st[b.dataset.ins])));
    tools.querySelectorAll('.sel-title').forEach((b) => b.setAttribute('aria-pressed', String(st.sel === 'title'))); tools.querySelectorAll('.sel-para').forEach((b) => b.setAttribute('aria-pressed', String(st.sel === 'para')));
    ['gauche', 'centre', 'droite'].forEach((a) => tools.querySelectorAll('.al-' + a).forEach((b) => b.setAttribute('aria-pressed', String(st[st.sel + '.al'] === a))));
    const sz = tools.querySelector('.szsel'); if (sz) sz.value = String(st[st.sel + '.sz']); const cs = tools.querySelector('.colsel'); if (cs) cs.value = st[st.sel + '.col'];
    if (nameIn && nameIn !== document.activeElement) nameIn.value = st.name; if (folderSel) folderSel.value = st.folder;
    if (printBox) { printBox.querySelectorAll('select').forEach((s, i) => { s.value = [st.orient, st.paper, st.margins, st.color][i]; }); const ci = printBox.querySelector('input[type=number]'); if (ci) ci.value = st.copies;
      const land = st.orient === 'paysage'; const pad = st.margins === 'étroites' ? 4 : st.margins === 'larges' ? 22 : 12; const ratio = st.paper === 'A5' ? 0.82 : 1;
      pvw.replaceChildren(h('div', { class: 'sheetp ' + (land ? 'land' : 'port'), 'aria-label': `Aperçu ${st.paper} ${st.orient}` }, h('div', { class: 'inner' }, `${st.paper} · ${st.orient}`, h('br'), `marges ${st.margins}`))); const sp = pvw.firstChild; sp.style.padding = pad + 'px'; sp.style.transform = `scale(${ratio})`; }
  }
  host.append(h('div', { class: 'office' }, titleBar, show.has('fmt') || show.has('insert') ? tools : null, saveBar, printBox, page, msg));
  paint();
  return { refresh() { if (nameIn) nameIn.value = st.name; paint(); } };
}

function browser(host, st, ctx) {
  const C = ctx.cfg; st.urlInput ??= ''; st.page ??= C.start ?? null; st.q ??= ''; const hist = []; const log = [];
  const nu = (u) => norm(u).replace(/^https?:\/\//, '').replace(/\/$/, '');
  const find = (u) => Object.keys(C.pages).find((id) => nu(C.pages[id].url) === nu(u)) || null;
  const url = h('input', { type: 'text', class: 'urlin', 'aria-label': 'Barre d’adresse', autocomplete: 'off', placeholder: 'Tape une adresse', oninput: (e) => { st.urlInput = e.target.value; }, onkeydown: (e) => { if (e.key === 'Enter') visit(); } });
  const content = h('div', { class: 'bpage' }); const logEl = h('ul', { class: 'blog', 'aria-live': 'polite' });
  const navTo = (id, push = true) => { if (push && st.page && st.page !== id) hist.push(st.page); st.page = id; if (id && C.pages[id]) st.urlInput = C.pages[id].url; paint(); };
  function visit() { const id = find(st.urlInput); const u = st.urlInput.trim() || '(vide)';
    log.push(`Le navigateur (client) envoie une requête à ${u}.`); log.push(id ? 'Le serveur répond : 200 OK et envoie la page.' : 'Le serveur répond : 404 – page introuvable.'); navTo(id || '404'); }
  function search() { const toks = norm(st.q).split(/\s+/).filter((w) => w.length > 2);
    st.results = Object.keys(C.pages).filter((id) => C.pages[id].kw).map((id) => ({ id, s: toks.filter((w) => norm(C.pages[id].kw + ' ' + C.pages[id].title).includes(w)).length })).filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, 4);
    log.push('Requête envoyée au moteur de recherche : « ' + st.q + ' ».'); navTo('results'); st.urlInput = 'recherche.exemple/?q=' + encodeURIComponent(st.q); url.value = st.urlInput; }
  function paint() {
    url.value = st.urlInput; const p = st.page; let body;
    if (!p) body = [h('p', { class: 'muted' }, 'Page vide : tape une adresse puis clique sur « Aller ».')];
    else if (p === '404') body = [h('h3', null, 'Erreur 404'), h('p', null, 'Le serveur n’a pas trouvé la page demandée. Vérifie l’adresse.')];
    else if (p === 'results') body = [h('h3', null, 'Résultats'), ...(st.results?.length ? st.results.map((r) => h('p', null, h('button', { type: 'button', class: 'link', onclick: () => navTo(r.id) }, C.pages[r.id].title), h('br'), h('small', { class: 'muted' }, C.pages[r.id].url))) : [h('p', null, 'Aucun résultat.')]), h('p', null, h('button', { type: 'button', class: 'link', onclick: () => navTo(C.start) }, '← Nouvelle recherche'))];
    else { const pg = C.pages[p]; body = [h('h3', null, pg.title), (pg.body || []).map((t) => h('p', null, t)), pg.search ? h('div', { class: 'prow' }, h('input', { type: 'text', 'aria-label': 'Mots à rechercher', value: st.q, oninput: (e) => { st.q = e.target.value; }, onkeydown: (e) => { if (e.key === 'Enter') search(); } }), h('button', { type: 'button', class: 'btn small', onclick: search }, '🔍 Rechercher')) : null, (pg.links || []).map(([l, to]) => h('p', null, h('button', { type: 'button', class: 'link', onclick: () => navTo(to) }, l)))]; }
    content.replaceChildren(...body); logEl.replaceChildren(...log.slice(-4).map((l) => h('li', null, l)));
  }
  host.append(h('div', { class: 'browser' }, h('div', { class: 'bbar' }, h('button', { type: 'button', class: 'icon-btn', 'aria-label': 'Retour', onclick: () => { const b = hist.pop(); if (b) { st.page = b; if (C.pages[b]) st.urlInput = C.pages[b].url; paint(); } } }, '◀'), url, h('button', { type: 'button', class: 'btn small', onclick: visit }, 'Aller')), content, h('p', { class: 'small-h' }, 'Échanges client ↔ serveur'), logEl));
  paint(); return { refresh: paint };
}

function chart(host, st, ctx) {
  const C = ctx.cfg; const D = C.data; st.type ??= 'barres'; st.title ??= ''; st.axes ??= false; st.legend ??= false; st.answer ??= '';
  const fig = h('div', { class: 'chartfig' }); const ttl = h('h4', { class: 'ctitle' });
  const max = Math.max(...D.map((x) => x[1])); const cls = ['c5', 'c4', 'c2', 'c6', 'c3'];
  function draw() {
    ttl.textContent = st.title || '(sans titre)'; let m = '';
    if (st.type === 'barres') D.forEach(([l, v], i) => { const bh = (v / max) * 150; m += `<rect class="sv ${cls[i % 5]}" x="${60 + i * 62}" y="${190 - bh}" width="44" height="${bh}"/><text class="svt" x="${82 + i * 62}" y="${184 - bh}" font-size="12" text-anchor="middle">${v}</text>`; });
    else if (st.type === 'courbe') { const pts = D.map(([, v], i) => [70 + i * 62, 190 - (v / max) * 150]); m += `<polyline class="svl thick" fill="none" points="${pts.map((p) => p.join(',')).join(' ')}"/>` + pts.map((p) => `<circle class="sv c4" cx="${p[0]}" cy="${p[1]}" r="5"/>`).join(''); }
    else { const tot = D.reduce((a, b) => a + b[1], 0); let a0 = -Math.PI / 2; D.forEach(([, v], i) => { const a1 = a0 + (v / tot) * 2 * Math.PI; const p = (a) => [190 + 85 * Math.cos(a), 105 + 85 * Math.sin(a)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); m += `<path class="sv ${cls[i % 5]}" d="M190 105 L${x0.toFixed(1)} ${y0.toFixed(1)} A85 85 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z"/>`; a0 = a1; }); }
    if (st.type !== 'circulaire') { m += `<line class="svl" x1="48" y1="190" x2="${60 + D.length * 62}" y2="190"/><line class="svl" x1="48" y1="190" x2="48" y2="30"/>`; D.forEach(([l], i) => { m += `<text class="svt" x="${(st.type === 'barres' ? 82 : 70) + i * 62}" y="206" font-size="11" text-anchor="middle">${l}</text>`; }); if (st.axes) m += `<text class="svt" x="${60 + D.length * 31}" y="226" font-size="12" text-anchor="middle">Matières</text><text class="svt" transform="translate(14 110) rotate(-90)" font-size="12" text-anchor="middle">Moyenne /20</text>`; }
    else if (st.legend) { /* la légende de secteurs est dessinée ci‑dessous */ }
    if (st.legend) m += D.map(([l], i) => `<rect class="sv ${cls[i % 5]}" x="${st.type === 'circulaire' ? 300 : 340}" y="${40 + i * 20}" width="12" height="12"/><text class="svt" x="${(st.type === 'circulaire' ? 300 : 340) + 18}" y="${50 + i * 20}" font-size="12">${l}</text>`).join('');
    fig.replaceChildren(svgFrom(`<svg viewBox="0 0 440 240" class="chart" role="img" aria-label="Graphique de type ${st.type} avec les moyennes par matière">${m}</svg>`));
  }
  const tin = h('input', { type: 'text', maxlength: '60', 'aria-label': 'Titre du graphique', placeholder: 'Titre du graphique', oninput: (e) => { st.title = e.target.value; draw(); } });
  const tsel = sel(['barres', 'courbe', 'circulaire'], st.type, (v) => { st.type = v; draw(); }, 'Type de graphique'); const asel = h('select', { 'aria-label': 'Interprétation', onchange: (e) => { st.answer = e.target.value; } }, h('option', { value: '' }, '— choisir —'), D.map(([l]) => h('option', { value: l }, l)));
  const ax = h('input', { type: 'checkbox', onchange: (e) => { st.axes = e.target.checked; draw(); } }), lg = h('input', { type: 'checkbox', onchange: (e) => { st.legend = e.target.checked; draw(); } });
  host.append(h('div', { class: 'chartbox' }, h('table', { class: 'mt' }, h('thead', null, h('tr', null, h('th', null, 'Matière'), h('th', null, 'Moyenne'))), h('tbody', null, D.map(([l, v]) => h('tr', null, h('td', null, l), h('td', null, v))))),
    h('div', { class: 'ctl' }, h('label', null, 'Type : ', tsel), h('label', null, 'Titre : ', tin), h('label', { class: 'chk' }, ax, ' Titres des axes'), h('label', { class: 'chk' }, lg, ' Légende'), h('label', null, 'La meilleure moyenne est en : ', asel)), ttl, fig)); draw();
  return { refresh() { tsel.value = st.type; tin.value = st.title; ax.checked = st.axes; lg.checked = st.legend; asel.value = st.answer; draw(); } };
}

function fsView(host, st, ctx) {
  let nid = 0; const mk = (sp, parent) => { const n = { id: ++nid, name: sp.n, dir: !!sp.k, kids: [], parent }; if (sp.k) n.kids = sp.k.map((k) => mk(k, n)); return n; };
  const root = mk(ctx.cfg.tree, null); const bin = []; let cur = root; let curBin = null; let clip = null;
  const find = (p) => { let n = root; if (!p) return n; for (const s of p.split('/')) { n = n.kids.find((k) => norm(k.name) === norm(s)); if (!n) return null; } return n; };
  const uniq = (par, name) => { let nm = name, i = 1; while (par.kids.some((k) => norm(k.name) === norm(nm))) nm = name + ' (' + ++i + ')'; return nm; };
  const clone = (n, par) => { const c = { id: ++nid, name: uniq(par, n.name), dir: n.dir, kids: [], parent: par }; c.kids = n.kids.map((k) => clone(k, c)); return c; };
  const A = {
    find, inBin: (name) => bin.some((b) => norm(b.n.name) === norm(name)),
    mkdir(parent, name) { const p = find(parent); if (!p || !p.dir || !name.trim()) return false; p.kids.push({ id: ++nid, name: uniq(p, name.trim()), dir: true, kids: [], parent: p }); paint(); return true; },
    rename(path, nn) { const n = find(path); if (!n || !n.parent || !nn.trim()) return false; n.name = uniq({ kids: n.parent.kids.filter((k) => k !== n) }, nn.trim()); paint(); return true; },
    copy(path, dest) { const n = find(path), d = find(dest); if (!n || !d || !d.dir) return false; d.kids.push(clone(n, d)); paint(); return true; },
    move(path, dest) { const n = find(path), d = find(dest); if (!n || !d || !d.dir || !n.parent || d === n) return false; n.parent.kids = n.parent.kids.filter((k) => k !== n); n.name = uniq(d, n.name); n.parent = d; d.kids.push(n); paint(); return true; },
    remove(path) { const n = find(path); if (!n || !n.parent) return false; n.parent.kids = n.parent.kids.filter((k) => k !== n); bin.push({ n, from: n.parent }); paint(); return true; },
    restore(name) { const i = bin.findIndex((b) => norm(b.n.name) === norm(name)); if (i < 0) return false; const [b] = bin.splice(i, 1); b.n.name = uniq(b.from, b.n.name); b.from.kids.push(b.n); b.n.parent = b.from; paint(); return true; },
  };
  const pathOf = (n) => { const a = []; while (n && n.parent) { a.unshift(n.name); n = n.parent; } return a.join('/'); };
  const list = h('div', { class: 'fslist', role: 'tree', 'aria-label': 'Explorateur de fichiers (simulation)' }); const nameIn = h('input', { type: 'text', maxlength: '30', 'aria-label': 'Nom du dossier ou du fichier', placeholder: 'Nom…' }); const msg = h('p', { class: 'hint-line', 'aria-live': 'polite' });
  const row = (n, depth, inBin) => h('button', { type: 'button', role: 'treeitem', class: 'fsrow' + ((inBin ? curBin === n : cur === n && !curBin) ? ' on' : ''), style: `padding-left:${10 + depth * 20}px`, onclick: () => { if (inBin) { curBin = n; } else { cur = n; curBin = null; } msg.textContent = ''; paint(); } }, (n.dir ? '📁 ' : '📄 ') + n.name);
  function walk(n, d, out) { out.push(row(n, d, false)); n.kids.forEach((k) => walk(k, d + 1, out)); }
  function paint() { const out = []; walk(root, 0, out); out.push(h('div', { class: 'fsbin' }, '🗑 Corbeille', bin.length ? '' : ' (vide)')); bin.forEach((b) => out.push(row(b.n, 1, true))); list.replaceChildren(...out); }
  const need = () => { if (curBin || !cur.parent) { msg.textContent = 'Sélectionne d’abord un fichier ou un dossier (pas le dossier racine).'; return false; } return true; };
  const btn = (l, f) => h('button', { type: 'button', class: 'btn small', onclick: f }, l);
  const destDir = () => (cur.dir ? cur : cur.parent);
  host.append(h('div', { class: 'fsbox' }, h('div', { class: 'fsbar' }, nameIn,
    btn('📁 Nouveau dossier', () => { if (!nameIn.value.trim()) { msg.textContent = 'Écris un nom dans la case.'; return; } if (curBin) return; const p = destDir(); p.kids.push({ id: ++nid, name: uniq(p, nameIn.value.trim()), dir: true, kids: [], parent: p }); nameIn.value = ''; paint(); }),
    btn('✏ Renommer', () => { if (!need() || !nameIn.value.trim()) { if (!nameIn.value.trim()) msg.textContent = 'Écris le nouveau nom dans la case.'; return; } A.rename(pathOf(cur), nameIn.value); nameIn.value = ''; }),
    btn('⧉ Copier', () => { if (need()) { clip = { n: cur, cut: false }; msg.textContent = `« ${cur.name} » copié.`; } }), btn('✂ Couper', () => { if (need()) { clip = { n: cur, cut: true }; msg.textContent = `« ${cur.name} » coupé.`; } }),
    btn('📋 Coller', () => { if (!clip) { msg.textContent = 'Rien à coller : copie ou coupe d’abord un élément.'; return; } const d = destDir(); if (clip.cut) { if (clip.n.parent && d !== clip.n) A.move(pathOf(clip.n), pathOf(d)); clip = null; } else d.kids.push(clone(clip.n, d)); paint(); }),
    btn('🗑 Supprimer', () => { if (need()) { A.remove(pathOf(cur)); cur = root; } }), btn('↩ Restaurer', () => { if (!curBin) { msg.textContent = 'Sélectionne un élément dans la corbeille.'; return; } A.restore(curBin.name); curBin = null; })), list, msg));
  paint(); return { ...A, refresh: paint };
}

function sheet(host, st, ctx) {
  const C = ctx.cfg; const rows = C.rows || 6, cols = C.cols || 5; const raw = { ...(C.init || {}) }; const inputs = {};
  const disp = (ref) => { const v = computeCell(ref, raw); return typeof v === 'number' ? fmtNum(Math.round(v * 1e6) / 1e6) : String(v); };
  const bar = h('output', { class: 'fbarv', 'aria-live': 'off' }, ''); const nb = h('output', { class: 'namebox' }, 'A1');
  const paint = () => { for (const ref in inputs) if (document.activeElement !== inputs[ref]) inputs[ref].value = disp(ref); };
  const head = h('tr', null, h('th', null), ...Array.from({ length: cols }, (_, c) => h('th', null, colName(c))));
  const body = Array.from({ length: rows }, (_, r) => h('tr', null, h('th', null, r + 1), ...Array.from({ length: cols }, (_, c) => { const ref = colName(c) + (r + 1);
    const inp = h('input', { type: 'text', autocomplete: 'off', 'aria-label': 'Cellule ' + ref, spellcheck: 'false' }); inputs[ref] = inp;
    inp.addEventListener('focus', () => { inp.value = raw[ref] ?? ''; nb.textContent = ref; bar.textContent = raw[ref] ?? ''; });
    inp.addEventListener('input', () => { bar.textContent = inp.value; });
    inp.addEventListener('blur', () => { raw[ref] = inp.value; paint(); });
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { raw[ref] = inp.value; paint(); const nx = inputs[colName(c) + (r + 2)]; if (nx) nx.focus(); else inp.blur(); } });
    return h('td', null, inp); })));
  host.append(h('div', { class: 'sheetbox' }, h('p', { class: 'muted' }, 'Tableur simplifié : commence une formule par =, écris les fonctions en français (SOMME, MOYENNE, MAX, MIN) et sépare les arguments par un point‑virgule ; (ex. =SOMME(B2:B4)). Valide avec Entrée.'), h('div', { class: 'fx' }, nb, h('span', { 'aria-hidden': 'true' }, 'ƒx'), bar), h('div', { class: 'tablewrap' }, h('table', { class: 'grid' }, h('thead', null, head), h('tbody', null, body)))));
  paint();
  const norm2 = (x) => (typeof x === 'string' ? norm(x) : x);
  return {
    refresh: paint,
    checkCell(g) { const ref = g.c.toUpperCase(); if (document.activeElement === inputs[ref]) raw[ref] = inputs[ref].value; const v = computeCell(ref, raw); const r = String(raw[ref] ?? '').trim();
      const ok = typeof g.v === 'number' ? typeof v === 'number' && Math.abs(v - g.v) < 1e-9 : norm2(v) === norm2(g.v); return ok && (!g.f || r.startsWith('=')); },
    solveCell(g) { raw[g.c.toUpperCase()] = g.f ? g.f : String(g.v); paint(); },
  };
}
export const VIEWS2 = { office, browser, chart, fs: fsView, sheet };
