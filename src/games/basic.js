// Moteurs : association, tri, ordre, texte à trous, QCM. Chaque moteur retourne {check, reveal, solve}.
import { h, shuffle, norm } from '../utils/dom.js';
import { arText } from '../i18n/ar.js';
import { audio } from '../audio/audio.js';

const letter = (i) => String.fromCharCode(65 + i);
const mark = (ok) => (ok ? '✔ ' : '✖ ');

// Illustrations locales, utilisables hors ligne. Chaque planche contient 3 x 2 objets.
// Le texte reste toujours présent : l'image aide à reconnaître l'objet sans donner la réponse.
const ART = [
  // 1) Priorité aux expressions composées spécifiques pour éviter les faux positifs
  [/preuve|capture d.écran/i, 'cyber-citizen', 1],
  [/ne pas répondre|ignorer/i, 'cyber-citizen', 0],
  [/bloquer|signaler/i, 'cyber-citizen', 2],
  [/adulte de confiance|enseignant|parent/i, 'cyber-citizen', 3],
  [/vérifier les sources/i, 'cyber-citizen', 4],
  [/prudence et respect|\brespect\b/i, 'cyber-citizen', 5],

  // 2) Périphériques spécialisés et réseau (avant les génériques)
  [/imprimante.*(multifonction|réseau|partag)/i, 'network', 5],
  [/imprimante(?!.*(multifonction|réseau|partag))/i, 'peripherals', 3],
  [/scanner/i, 'peripherals', 4],
  [/souris/i, 'peripherals', 2],
  [/clavier/i, 'peripherals', 1],
  [/clé usb/i, 'peripherals', 5],
  [/casque.*micro|microphone|haut-parleurs?|lecteur de musique/i, 'speakers', 0],
  [/écran tactile|vidéoprojecteur|écran|moniteur/i, 'peripherals', 0],

  // 3) Composants internes
  [/carte mère/i, 'components', 0],
  [/processeur|\bcpu\b/i, 'components', 1],
  [/mémoire vive|\bram\b/i, 'components', 2],
  [/disque dur externe|disque dur|disque.*ssd|\bssd\b/i, 'components', 3],
  [/alimentation/i, 'components', 4],
  [/ventilateur|refroidissement/i, 'components', 5],

  // 4) Équipements réseau
  [/routeur|wi[ -]?fi|liaison.*(câble|wi)/i, 'network', 0],
  [/commutateur|\bswitch\b/i, 'network', 1],
  [/modem/i, 'network', 2],
  [/ordinateur\s*\(poste\)|\bordinateur( de bureau)?\b|unité centrale/i, 'network', 3],
  [/serveur/i, 'network', 4],

  // 5) Logiciels (avec délimiteurs de mots stricts pour ne pas matcher "calculer", "idée", etc.)
  [/windows|linux|android|macos|ios|système d.exploitation/i, 'software', 0],
  [/writer|\btraitement de texte\b|\bword\b/i, 'software', 1],
  [/\bcalc\b|\btableur\b|\bexcel\b/i, 'software', 2],
  [/logiciel de présentation|diaporama|diapositive|\bpowerpoint\b/i, 'software', 3],
  [/navigateur( web)?/i, 'software', 4],
  [/logiciel de dessin|mise en page|retouche/i, 'software', 5],

  // 6) Cybersécurité
  [/mot de passe/i, 'cyber', 0],
  [/mise à jour/i, 'cyber', 1],
  [/antivirus|\bvirus\b/i, 'cyber', 2],
  [/e-?mail.*suspect|hameçonnage|phishing|courriel suspect/i, 'cyber', 3],
  [/lien inconnu|lien suspect|lien dangereux/i, 'cyber', 4],
  [/données personnelles|information privée/i, 'cyber', 5],

  // 7) Échelles et types de réseau
  [/\bpan\b|bluetooth|quelques mètres/i, 'network-scales', 0],
  [/\blan\b|réseau local|réseau informatique|une salle|un bâtiment/i, 'network-scales', 1],
  [/collège|bâtiments voisins/i, 'network-scales', 2],
  [/\bman\b|métropolitain|même ville/i, 'network-scales', 3],
  [/\bwan\b|réseau étendu|pays et continents|pays.*continents|mondial|\binternet\b/i, 'network-scales', 4],
  [/partager.*imprimante|imprimante partagée/i, 'network-scales', 5],

  // 8) Outils algorithmiques (bornage strict pour éviter de matcher "rapide", "calculer", etc.)
  [/distributeur/i, 'algorithm-tools', 0],
  [/\bcalculatrice\b/i, 'algorithm-tools', 1],
  [/mémoire.*valeur|valeur.*change/i, 'algorithm-tools', 2],
  [/organigramme/i, 'algorithm-tools', 3],
  [/code source|programme python|\bide\b|visual studio code|\bthonny\b|\bidle\b|\bpython\b|\bscratch\b|\bjavascript\b|\bc\b/i, 'algorithm-tools', 4],
  [/console|sortie du programme/i, 'algorithm-tools', 5],

  // 9) Notions fondamentales (bornage strict par début/fin de chaîne ou terme exact)
  [/^\s*algorithme\s*$/i, 'cs-concepts', 0],
  [/^\s*instruction\s*$/i, 'cs-concepts', 1],
  [/^\s*donnée\s*$|^\s*données\s*$/i, 'cs-concepts', 2],
  [/^\s*variable\s*$|^\s*variables\s*$/i, 'cs-concepts', 3],
  [/^\s*constante\s*$|^\s*constantes\s*$/i, 'cs-concepts', 4],
  [/type de donnée|types de données/i, 'cs-concepts', 5],
];
export function artFor(label) {
  const hit = ART.find(([re]) => re.test(label));
  if (!hit) return null;
  const [, sheet, cell] = hit;
  return h('span', { class: `item-art sheet-${sheet} cell-${cell}`, role: 'img', 'aria-label': `Illustration : ${label}` });
}
export const visualLabel = (label) => { const ar = arText(label); return h('span', { class: 'visual-label' }, artFor(label), h('span', { class: 'visual-text' }, label, ar ? h('small', { class: 'ar-sub', lang: 'ar', dir: 'rtl' }, ar) : null)); };

export function matchGame(root, d) {
  const n = d.pairs.length;
  const order = shuffle([...Array(n).keys()]);
  const map = Array(n).fill(null);
  let sel = null;
  const live = h('p', { class: 'hint-line', 'aria-live': 'polite' });
  const wires = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  wires.classList.add('match-wires'); wires.setAttribute('aria-hidden', 'true');
  let justLinked = null;
  const lb = [], rb = [];
  const drawWires = () => {
    wires.replaceChildren(); const frame = wires.parentElement; if (!frame) return;
    const box = frame.getBoundingClientRect();
    map.forEach((m, i) => { if (m == null) return; const k = order.indexOf(m); if (k < 0) return;
      const a = lb[i].getBoundingClientRect(); const b = rb[k].getBoundingClientRect();
      const x1 = a.right - box.left, y1 = a.top + a.height / 2 - box.top;
      const x2 = b.left - box.left, y2 = b.top + b.height / 2 - box.top;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); const bend = Math.max(30, (x2 - x1) * 0.45);
      path.setAttribute('d', `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`);
      path.setAttribute('class', 'match-wire c' + (i % 6) + (justLinked === i ? ' new' : '')); wires.append(path);
    });
    justLinked = null;
  };
  const paint = () => {
    lb.forEach((b, i) => {
      const m = map[i];
      b.classList.toggle('sel', sel === i); b.dataset.c = m == null ? '' : String(i % 6);
      b.querySelector('.tag').textContent = m == null ? '' : letter(order.indexOf(m));
      b.setAttribute('aria-pressed', String(sel === i));
      b.setAttribute('aria-label', `${i + 1}. ${d.pairs[i][0]}${m == null ? '' : ', associé à la réponse ' + letter(order.indexOf(m))}`);
    });
    rb.forEach((b, k) => {
      const i = map.indexOf(order[k]);
      b.dataset.c = i < 0 ? '' : String(i % 6); b.querySelector('.tag').textContent = i < 0 ? '' : String(i + 1);
    });
    (globalThis.requestAnimationFrame || ((fn) => fn()))(drawWires);
  };
  d.pairs.forEach((p, i) => lb.push(h('button', { type: 'button', class: 'card pick', onclick: () => { sel = sel === i ? null : i; live.textContent = sel == null ? '' : 'Choisis maintenant la réponse à droite.'; paint(); } },
    h('span', { class: 'num', 'aria-hidden': 'true' }, i + 1), h('span', { class: 'txt' }, visualLabel(p[0])), h('span', { class: 'tag', 'aria-hidden': 'true' }))));
  order.forEach((o, k) => rb.push(h('button', { type: 'button', class: 'card pick', onclick: () => {
    if (sel == null) { live.textContent = 'Clique d’abord sur un élément de la colonne de gauche.'; return; }
    const prev = map.indexOf(o); if (prev >= 0) map[prev] = null;
    justLinked = sel; map[sel] = o; sel = null; live.textContent = 'Association créée. Elle sera corrigée après « Vérifier ».'; audio.play('snap'); paint();
  } }, h('span', { class: 'num', 'aria-hidden': 'true' }, letter(k)), h('span', { class: 'txt' }, visualLabel(d.pairs[o][1])), h('span', { class: 'tag', 'aria-hidden': 'true' }))));
  const matchArea = h('div', { class: 'match-area' }, wires, h('div', { class: 'two-col' }, h('div', { class: 'col' }, lb), h('div', { class: 'col' }, rb)));
  root.append(matchArea, live,
    h('button', { type: 'button', class: 'btn ghost small', onclick: () => { map.fill(null); sel = null; paint(); } }, 'Tout effacer'));
  paint();
  return {
    check() {
      const items = d.pairs.map((p, i) => { const ok = map[i] === i; const m = map[i];
        return { ok, msg: ok ? `${p[0]} → ${p[1]}` : `${p[0]} correspond à : ${p[1]}${m == null ? ' (pas de réponse)' : ''}` + (p[2] ? ' — ' + p[2] : '') }; });
      return { correct: items.filter((x) => x.ok).length, total: n, items, unanswered: map.filter((x) => x == null).length };
    },
    reveal(res) { res.items.forEach((it, i) => lb[i].classList.add(it.ok ? 'ok' : 'ko')); },
    solve() { for (let i = 0; i < n; i++) map[i] = i; paint(); },
  };
}

export function sortGame(root, d) {
  const items = d.items; const place = Array(items.length).fill(null); let sel = null; let lastMoved = null; let pulseBucket = null;
  const pool = h('div', { class: 'pool', 'aria-label': 'Cartes à ranger' });
  const buckets = d.cats.map((c, ci) => {
    const body = h('div', { class: 'bucket-body' });
    const head = h('button', { type: 'button', class: 'bucket-head', onclick: () => put(ci) }, h('span', null, c), h('small', null, 'Placer ici'));
    const box = h('div', { class: 'bucket', 'data-cat': ci, ondragenter: (e) => { e.preventDefault(); box.classList.add('drag-over'); }, ondragleave: (e) => { if (!box.contains(e.relatedTarget)) box.classList.remove('drag-over'); }, ondragover: (e) => e.preventDefault(), ondrop: (e) => { e.preventDefault(); box.classList.remove('drag-over'); const i = Number(e.dataTransfer.getData('text/plain')); if (Number.isInteger(i) && items[i]) { place[i] = ci; lastMoved = i; pulseBucket = ci; sel = null; live.textContent = 'Carte déposée. La réponse reste cachée jusqu’à « Vérifier ».'; audio.play('snap'); draw(); } } }, head, body);
    return { box, body };
  });
  const live = h('p', { class: 'hint-line', 'aria-live': 'polite' });
  function put(ci) { if (sel == null) { live.textContent = 'Choisis d’abord une carte, puis la catégorie.'; return; } place[sel] = ci; lastMoved = sel; pulseBucket = ci; sel = null; live.textContent = 'Carte placée. La réponse reste cachée jusqu’à « Vérifier ».'; audio.play('snap'); draw(); }
  const card = (i) => h('button', { type: 'button', 'data-idx': String(i), class: 'chip' + (artFor(items[i][0]) ? ' has-art' : '') + (sel === i ? ' sel' : '') + (lastMoved === i ? ' just-dropped' : ''), draggable: 'true', 'aria-pressed': String(sel === i),
    ondragstart: (e) => { e.currentTarget.classList.add('dragging'); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', String(i)); }, ondragend: (e) => { e.currentTarget.classList.remove('dragging'); root.querySelectorAll('.bucket').forEach((b) => b.classList.remove('drag-over')); }, onclick: () => { if (place[i] != null) { place[i] = null; sel = i; } else sel = sel === i ? null : i; live.textContent = ''; draw(); } }, visualLabel(items[i][0]));
  function draw() {
    pool.replaceChildren(...items.map((_, i) => i).filter((i) => place[i] == null).map(card));
    if (!pool.children.length) pool.append(h('em', { class: 'muted' }, 'Toutes les cartes sont rangées.'));
    buckets.forEach((b, ci) => { b.box.classList.toggle('drop-pulse', pulseBucket === ci); b.body.replaceChildren(...items.map((_, i) => i).filter((i) => place[i] === ci).map(card)); });
    lastMoved = null; pulseBucket = null;
  }
  root.append(pool, h('div', { class: 'buckets', style: '' }, buckets.map((b) => b.box)), live);
  draw();
  return {
    check() {
      const res = items.map((it, i) => { const ok = place[i] === it[1];
        return { ok, msg: `${it[0]} → ${d.cats[it[1]]}` + (it[2] ? ' — ' + it[2] : '') + (place[i] == null ? ' (non rangé)' : '') }; });
      return { correct: res.filter((x) => x.ok).length, total: items.length, items: res, unanswered: place.filter((x) => x == null).length };
    },
    reveal(res) {
      root.querySelectorAll('.bucket .chip').forEach((c) => {
        const idx = c.dataset.idx != null ? Number(c.dataset.idx) : -1;
        if (idx >= 0 && res.items[idx]) {
          c.classList.add(res.items[idx].ok ? 'ok' : 'ko');
        }
      });
    },
    solve() { items.forEach((it, i) => { place[i] = it[1]; }); sel = null; draw(); },
  };
}

export function orderGame(root, d) {
  const n = d.steps.length;
  const gid = d.steps.map((_, i) => i);
  (d.eq || []).forEach((g, k) => g.forEach((i) => { gid[i] = 1000 + k; }));
  let list = shuffle([...Array(n).keys()].map((i) => i));
  if ((d.eq || []).length) { let t = 0; while (list.every((x, i) => gid[x] === gid[i]) && t++ < 20) list = shuffle(list); }
  const ol = h('ol', { class: 'order' });
  function draw(focus) {
    ol.replaceChildren(...list.map((idx, pos) => h('li', { class: 'ord-row' },
      h('span', { class: 'num', 'aria-hidden': 'true' }, pos + 1),
      h('span', { class: 'txt' }, visualLabel(d.steps[idx])),
      h('span', { class: 'ord-btns' },
        h('button', { type: 'button', class: 'icon-btn', 'aria-label': `Monter l’étape ${pos + 1}`, disabled: pos === 0, 'data-f': pos + ':u', onclick: () => mv(pos, -1) }, '▲'),
        h('button', { type: 'button', class: 'icon-btn', 'aria-label': `Descendre l’étape ${pos + 1}`, disabled: pos === n - 1, 'data-f': pos + ':d', onclick: () => mv(pos, 1) }, '▼')))));
    if (focus) { const b = ol.querySelector(`[data-f="${focus}"]`) || ol.querySelector('button:not([disabled])'); b && b.focus(); }
  }
  function mv(pos, dlt) {
    const j = pos + dlt;
    [list[pos], list[j]] = [list[j], list[pos]];
    audio.play('move');
    draw(j + ':' + (dlt < 0 ? 'u' : 'd'));
  }
  root.append(ol); draw();
  return {
    check() {
      const items = list.map((idx, pos) => { const ok = gid[idx] === gid[pos];
        return { ok, msg: `Étape ${pos + 1} : ${d.steps[pos]}` + (ok ? '' : ` (tu avais mis : ${d.steps[idx]})`) }; });
      if (d.explain) items.push({ ok: true, info: true, msg: d.explain });
      const sc = items.filter((x) => !x.info);
      return { correct: sc.filter((x) => x.ok).length, total: n, items, unanswered: 0 };
    },
    reveal(res) { [...ol.children].forEach((li, i) => li.classList.add(res.items[i].ok ? 'ok' : 'ko')); },
    solve() { list = [...Array(n).keys()]; draw(); },
  };
}

export function fillGame(root, d) {
  const blanks = [];
  const lines = d.lines.map((ln) => (Array.isArray(ln) ? ln : [ln, '']));
  lines.forEach(([text, why]) => {
    const p = h('p', { class: 'fill-line' }); const re = /\[\[(.+?)\]\]/g; let last = 0, m;
    while ((m = re.exec(text))) {
      p.append(text.slice(last, m.index));
      const opts = m[1].split('|'); const k = blanks.length;
      const sel = h('select', { 'aria-label': `Réponse ${k + 1}` }, h('option', { value: '' }, '— choisir —'), shuffle(opts).map((o) => h('option', { value: o }, o)));
      const fb = h('span', { class: 'fb' }); p.append(sel, fb);
      blanks.push({ sel, fb, ans: opts[0], why, text: text.replace(/\[\[(.+?)\]\]/g, (_, x) => x.split('|')[0]) });
      last = m.index + m[0].length;
    }
    p.append(text.slice(last)); root.append(p);
  });
  return {
    check() {
      const items = blanks.map((b, i) => { const ok = b.sel.value === b.ans;
        return { ok, msg: `${b.text}` + (b.why ? ' — ' + b.why : ''), };
      });
      return { correct: items.filter((x) => x.ok).length, total: blanks.length, items, unanswered: blanks.filter((b) => !b.sel.value).length };
    },
    reveal(res) { blanks.forEach((b, i) => { const ok = res.items[i].ok; b.sel.classList.add(ok ? 'ok' : 'ko'); b.fb.textContent = ok ? ' ✔' : ' ✖ → ' + b.ans; }); },
    solve() { blanks.forEach((b) => { b.sel.value = b.ans; }); },
  };
}

let qid = 0;
export function quizGame(root, d) {
  const qs = d.qs.map((q, i) => {
    const [text, opts, why] = q; const lines = text.split('\n'); const name = 'q' + (++qid);
    const order = shuffle(opts.map((o, k) => k));
    const inputs = order.map((k) => h('input', { type: 'radio', name, value: String(k) }));
    const labels = order.map((k, j) => h('label', { class: 'opt' }, inputs[j], visualLabel(opts[k])));
    const qar = arText(lines[0]);
    root.append(h('fieldset', { class: 'q' }, h('legend', null, h('b', null, (i + 1) + '. '), lines[0], qar ? h('small', { class: 'ar-sub', lang: 'ar', dir: 'rtl' }, qar) : null), lines.length > 1 ? h('pre', { class: 'code' }, lines.slice(1).join('\n')) : null, labels));
    return { inputs, labels, order, opts, why, text: lines[0] };
  });
  return {
    check() {
      const items = qs.map((q) => { const c = q.inputs.find((x) => x.checked); const ok = !!c && c.value === '0';
        return { ok, msg: `${q.text} → ${q.opts[0]}.` + (q.why ? ' ' + q.why : '') }; });
      return { correct: items.filter((x) => x.ok).length, total: qs.length, items, unanswered: qs.filter((q) => !q.inputs.some((x) => x.checked)).length };
    },
    reveal(res) { qs.forEach((q, i) => { q.labels.forEach((l, j) => { if (q.order[j] === 0) l.classList.add('good'); else if (q.inputs[j].checked) l.classList.add('bad'); }); }); },
    solve() { qs.forEach((q) => { q.inputs[q.order.indexOf(0)].checked = true; }); },
  };
}
export { norm };
