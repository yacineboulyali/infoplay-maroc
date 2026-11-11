// Moteurs hautement interactifs : association, classement (drag & drop et cliquer-déposer),
// ordonner, texte à trous, QCM (trouver la bonne réponse, trouver la réponse fausse, vrai ou faux).
import { h, shuffle, norm } from '../utils/dom.js';
import { arText } from '../i18n/ar.js';
import { arHint } from '../i18n/arhint.js';
import { arQuestion } from '../i18n/ar-questions.js';
import { officeArt } from '../pro/visuals.js';
import { semanticIcon } from '../utils/semantic-icons.js';
import { audio } from '../audio/audio.js';
import { itemVisual, labelIllustration } from '../utils/item-visuals.js';
import { labelKey } from '../utils/label-key.js';
import { studentIllustration } from '../utils/student-illustrations.js';

const letter = (i) => String.fromCharCode(65 + i);

// Illustrations locales hors-ligne
const ART = [
  [/preuve|capture d.écran/i, 'cyber-citizen', 1],
  [/ne pas répondre|ignorer/i, 'cyber-citizen', 0],
  [/bloquer|signaler/i, 'cyber-citizen', 2],
  [/adulte de confiance|enseignant|parent/i, 'cyber-citizen', 3],
  [/vérifier les sources/i, 'cyber-citizen', 4],
  [/prudence et respect|\brespect\b/i, 'cyber-citizen', 5],

  [/imprimante.*(multifonction|réseau|partag)/i, 'network', 5],
  [/imprimante(?!.*(multifonction|réseau|partag))/i, 'peripherals', 3],
  [/scanner/i, 'peripherals', 4],
  [/souris/i, 'peripherals', 2],
  [/clavier/i, 'peripherals', 1],
  [/clé usb/i, 'peripherals', 5],
  [/casque.*micro|microphone|haut-parleurs?|lecteur de musique/i, 'speakers', 0],
  [/écran tactile|vidéoprojecteur|écran|moniteur/i, 'peripherals', 0],

  [/carte mère/i, 'components', 0],
  [/processeur|\bcpu\b/i, 'components', 1],
  [/mémoire vive|\bram\b/i, 'components', 2],
  [/disque dur externe|disque dur|disque.*ssd|\bssd\b/i, 'components', 3],
  [/alimentation/i, 'components', 4],
  [/ventilateur|refroidissement/i, 'components', 5],

  [/routeur|wi[ -]?fi|liaison.*(câble|wi)/i, 'network', 0],
  [/commutateur|\bswitch\b/i, 'network', 1],
  [/modem/i, 'network', 2],
  [/ordinateur\s*\(poste\)|\bordinateur( de bureau)?\b|unité centrale/i, 'network', 3],
  [/serveur/i, 'network', 4],

  [/windows|linux|android|macos|ios|système d.exploitation/i, 'software', 0],
  [/writer|\btraitement de texte\b|\bword\b/i, 'software', 1],
  [/\bcalc\b|\btableur\b|\bexcel\b/i, 'software', 2],
  [/logiciel de présentation|diaporama|diapositive|\bpowerpoint\b/i, 'software', 3],
  [/navigateur( web)?/i, 'software', 4],
  [/logiciel de dessin|mise en page|retouche/i, 'software', 5],

  [/mot de passe/i, 'cyber', 0],
  [/mise à jour/i, 'cyber', 1],
  [/antivirus|\bvirus\b/i, 'cyber', 2],
  [/e-?mail.*suspect|hameçonnage|phishing|courriel suspect/i, 'cyber', 3],
  [/lien inconnu|lien suspect|lien dangereux/i, 'cyber', 4],
  [/données personnelles|information privée/i, 'cyber', 5],

  [/partager.*connexion|partage.*internet/i, 'network-scales', 0],
  [/communication rapide|messagerie instantanée/i, 'network-scales', 1],
  [/travailler à plusieurs|collaboration en ligne/i, 'network-scales', 2],
  [/sauvegarde automatique|sauvegarde sur serveur/i, 'network-scales', 3],
  [/accès à distance|accès aux dossiers/i, 'network-scales', 4],
  [/partager.*imprimante|imprimante partagée/i, 'network-scales', 5],

  [/définir le problème/i, 'algorithm-tools', 0],
  [/décomposer en étapes/i, 'algorithm-tools', 1],
  [/ordonner les actions/i, 'algorithm-tools', 2],
  [/écrire le code|coder/i, 'algorithm-tools', 3],
  [/tester et corriger/i, 'algorithm-tools', 4],
  [/exécuter et vérifier/i, 'algorithm-tools', 5],

  [/donnée|information brute/i, 'cs-concepts', 0],
  [/traitement|programme en cours/i, 'cs-concepts', 1],
  [/résultat|information utile/i, 'cs-concepts', 2],
  [/mémoire de travail|stockage temporaire/i, 'cs-concepts', 3],
  [/mémoire de masse|stockage permanent/i, 'cs-concepts', 4],
  [/périphérique d.entrée|périphérique de sortie/i, 'cs-concepts', 5],
];

export function artFor(label) {
  const hit = ART.find(([re]) => re.test(label));
  if (!hit) return null;
  const [, sheet, cell] = hit;
  return h('span', { class: `item-art sheet-${sheet} cell-${cell}`, role: 'img', 'aria-label': `Illustration : ${label}` });
}

export const visualLabel = (label, part, illustration = null, textOnly = false) => {
  const ar = arText(label);
  return h('span', { class: 'visual-label', 'data-label-key': labelKey(label) },
    illustration || labelIllustration(label) || (textOnly ? null : part ? officeArt(label, part) : (artFor(label) || itemVisual(label))),
    h('span', { class: 'visual-text' },
      label,
      arHint(ar)
    )
  );
};

// -----------------------------------------------------------------
// 1. ASSOCIER (matchGame) : CLIQUER-DÉPOSER & GLISSER-DÉPOSER
// -----------------------------------------------------------------
export function matchGame(root, d) {
  const n = d.pairs.length;
  const order = shuffle([...Array(n).keys()]);
  const map = Array(n).fill(null);
  let sel = null;
  const live = h('p', { class: 'hint-line', 'aria-live': 'polite' });
  const wires = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  wires.classList.add('match-wires');
  wires.setAttribute('aria-hidden', 'true');
  let justLinked = null;
  const lb = [], rb = [];

  const drawWires = () => {
    wires.replaceChildren();
    const frame = wires.parentElement;
    if (!frame) return;
    const box = frame.getBoundingClientRect();
    map.forEach((m, i) => {
      if (m == null) return;
      const k = order.indexOf(m);
      if (k < 0) return;
      const a = lb[i].getBoundingClientRect();
      const b = rb[k].getBoundingClientRect();
      const x1 = a.right - box.left, y1 = a.top + a.height / 2 - box.top;
      const x2 = b.left - box.left, y2 = b.top + b.height / 2 - box.top;
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const bend = Math.max(30, (x2 - x1) * 0.45);
      path.setAttribute('d', `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`);
      path.setAttribute('class', 'match-wire c' + (i % 6) + (justLinked === i ? ' new' : ''));
      wires.append(path);
    });
    justLinked = null;
  };

  const paint = () => {
    lb.forEach((b, i) => {
      const m = map[i];
      b.classList.toggle('sel', sel === i);
      b.dataset.c = m == null ? '' : String(i % 6);
      b.querySelector('.tag').textContent = m == null ? '' : letter(order.indexOf(m));
      b.setAttribute('aria-pressed', String(sel === i));
      b.setAttribute('aria-label', `${i + 1}. ${d.pairs[i][0]}${m == null ? '' : ', associé à la réponse ' + letter(order.indexOf(m))}`);
    });
    rb.forEach((b, k) => {
      const i = map.indexOf(order[k]);
      b.dataset.c = i < 0 ? '' : String(i % 6);
      b.querySelector('.tag').textContent = i < 0 ? '' : String(i + 1);
    });
    (globalThis.requestAnimationFrame || ((fn) => fn()))(drawWires);
  };

  function linkPair(leftIdx, rightItem) {
    const prev = map.indexOf(rightItem);
    if (prev >= 0) map[prev] = null;
    justLinked = leftIdx;
    map[leftIdx] = rightItem;
    sel = null;
    live.textContent = 'Association enregistrée. Clique sur Vérifier pour savoir si elle est correcte.';
    audio.play('snap');
    paint();
  }

  // Colonne de gauche (cliquer ou glisser)
  d.pairs.forEach((p, i) => {
    const btn = h('button', {
      type: 'button',
      class: 'card pick match-draggable',
      draggable: 'true',
      ondragstart: (e) => {
        sel = i;
        btn.classList.add('dragging');
        e.dataTransfer.setData('text/plain', String(i));
        paint();
      },
      ondragend: () => {
        btn.classList.remove('dragging');
      },
      onclick: () => {
        sel = sel === i ? null : i;
        if (sel != null) audio.play('select');
        live.textContent = sel == null ? '' : 'Clique maintenant sur la bonne réponse à droite (ou glisse-la).';
        paint();
      },
    },
    h('span', { class: 'grip-icon', 'aria-hidden': 'true' }, '⠿'),
    h('span', { class: 'num', 'aria-hidden': 'true' }, i + 1),
    h('span', { class: 'txt' }, visualLabel(p[0], d.visualPart, studentIllustration(d, i), d.textOnly)),
    h('span', { class: 'tag', 'aria-hidden': 'true' })
    );
    lb.push(btn);
  });

  // Colonne de droite (cliquer ou recevoir le dépôt)
  order.forEach((o, k) => {
    const btn = h('button', {
      type: 'button',
      class: 'card pick match-droptarget',
      ondragenter: (e) => { e.preventDefault(); btn.classList.add('drag-over'); },
      ondragleave: () => { btn.classList.remove('drag-over'); },
      ondragover: (e) => e.preventDefault(),
      ondrop: (e) => {
        e.preventDefault();
        btn.classList.remove('drag-over');
        const draggedIdx = Number(e.dataTransfer.getData('text/plain'));
        if (Number.isInteger(draggedIdx) && d.pairs[draggedIdx]) {
          linkPair(draggedIdx, o);
        }
      },
      onclick: () => {
        if (sel == null) {
          live.textContent = 'Clique d’abord sur un élément à gauche, ou fais-le glisser ici.';
          return;
        }
        linkPair(sel, o);
      },
    },
    h('span', { class: 'num', 'aria-hidden': 'true' }, letter(k)),
    h('span', { class: 'txt' }, visualLabel(d.pairs[o][1], d.visualPart, d.answerPicture?.(o) || itemVisual(d.pairs[o][1]), true)),
    h('span', { class: 'tag', 'aria-hidden': 'true' })
    );
    rb.push(btn);
  });

  const matchArea = h('div', { class: 'match-area' },
    wires,
    h('div', { class: 'two-col' },
      h('div', { class: 'col' }, lb),
      h('div', { class: 'col' }, rb)
    )
  );

  root.append(
    h('div', { class: 'match-intro-banner' },
      h('span', { class: 'banner-badge' }, '🔗 Cliquer-déposer ou Glisser-déposer', arHint('انقر أو اسحب من اليسار للربط مع الإجابة المناسبة على اليمين'))
    ),
    matchArea,
    live,
    h('div', { class: 'row', style: 'margin-top:.8rem' },
      h('button', {
        type: 'button',
        class: 'btn ghost small',
        onclick: () => { map.fill(null); sel = null; paint(); audio.play('pop'); },
      }, '↺ Réinitialiser les liaisons')
    )
  );
  paint();

  return {
    check() {
      const items = d.pairs.map((p, i) => {
        const ok = map[i] === i;
        const m = map[i];
        return {
          ok,
          msg: ok ? `${p[0]} → ${p[1]}` : `${p[0]} correspond à : ${p[1]}${m == null ? ' (non associé)' : ''}` + (p[2] ? ' — ' + p[2] : ''),
        };
      });
      return {
        correct: items.filter((x) => x.ok).length,
        total: n,
        items,
        unanswered: map.filter((x) => x == null).length,
      };
    },
    reveal(res) {
      res.items.forEach((it, i) => lb[i].classList.add(it.ok ? 'ok' : 'ko'));
    },
    solve() {
      for (let i = 0; i < n; i++) map[i] = i;
      paint();
    },
  };
}

// -----------------------------------------------------------------
// 2. CLASSEMENT (sortGame) : DRAG & DROP ET CLIQUER-DÉPOSER DANS CATÉGORIES
// -----------------------------------------------------------------
export function sortGame(root, d) {
  const items = d.items;
  const place = Array(items.length).fill(null);
  let sel = null;
  let lastMoved = null;
  let pulseBucket = null;

  const pool = h('div', { class: 'pool sort-pool', 'aria-label': 'Cartes à classer' });
  const live = h('p', { class: 'hint-line', 'aria-live': 'polite' });

  const buckets = d.cats.map((c, ci) => {
    const body = h('div', { class: 'bucket-body' });
    const countBadge = h('span', { class: 'bucket-count' }, '0');
    const head = h('button', {
      type: 'button',
      class: 'bucket-head',
      onclick: () => put(ci),
    },
    h('span', { class: 'bucket-title-box' }, semanticIcon(c), h('b', null, c), countBadge),
    h('small', { class: 'bucket-cta' }, '📥 Déposer ici')
    );

    const box = h('div', {
      class: 'bucket sort-bucket',
      'data-cat': ci,
      ondragenter: (e) => { e.preventDefault(); box.classList.add('drag-over'); },
      ondragleave: (e) => {
        if (!box.contains(e.relatedTarget)) box.classList.remove('drag-over');
      },
      ondragover: (e) => e.preventDefault(),
      ondrop: (e) => {
        e.preventDefault();
        box.classList.remove('drag-over');
        const i = Number(e.dataTransfer.getData('text/plain'));
        if (Number.isInteger(i) && items[i]) {
          place[i] = ci;
          lastMoved = i;
          pulseBucket = ci;
          sel = null;
          live.textContent = 'Carte déplacée dans : ' + c + '. Vérifie ensuite ta réponse.';
          audio.play('snap');
          draw();
        }
      },
    }, head, arHint('ضع هنا'), body);

    return { box, body, countBadge };
  });

  function put(ci) {
    if (sel == null) {
      live.textContent = 'Sélectionne d’abord une carte ci-dessus, puis clique ici.';
      return;
    }
    place[sel] = ci;
    lastMoved = sel;
    pulseBucket = ci;
    sel = null;
    live.textContent = 'Carte classée !';
    audio.play('snap');
    draw();
  }

  const card = (i) => h('button', {
    type: 'button',
    'data-idx': String(i),
    class: 'chip sort-chip' + (d.visualPart || artFor(items[i][0]) ? ' has-art' : '') + (sel === i ? ' sel' : '') + (lastMoved === i ? ' just-dropped' : ''),
    draggable: 'true',
    'aria-pressed': String(sel === i),
    ondragstart: (e) => {
      e.currentTarget.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(i));
    },
    ondragend: (e) => {
      e.currentTarget.classList.remove('dragging');
      root.querySelectorAll('.bucket').forEach((b) => b.classList.remove('drag-over'));
    },
    onclick: () => {
      if (place[i] != null) {
        // Retirer la carte du bucket et la remettre dans le pool
        place[i] = null;
        sel = i;
        audio.play('pop');
        live.textContent = 'Carte reprise. Tu peux la ranger ailleurs.';
      } else {
        sel = sel === i ? null : i;
        if (sel != null) audio.play('select');
        live.textContent = sel == null ? '' : 'Choisis la catégorie où ranger cette carte.';
      }
      draw();
    },
  },
  h('span', { class: 'grip-icon', 'aria-hidden': 'true' }, '⠿'),
  visualLabel(items[i][0], d.visualPart, studentIllustration(d, i), d.textOnly)
  );

  function draw() {
    pool.replaceChildren(...items.map((_, i) => i).filter((i) => place[i] == null).map(card));
    if (!pool.children.length) {
      pool.append(h('p', { class: 'pool-empty-msg' }, '✨ Toutes les cartes sont classées ! Clique sur « Vérifier ».'));
    }
    buckets.forEach((b, ci) => {
      const placed = items.map((_, i) => i).filter((i) => place[i] === ci);
      b.countBadge.textContent = String(placed.length);
      b.box.classList.toggle('drop-pulse', pulseBucket === ci);
      b.box.classList.toggle('ready-to-drop', sel != null);
      b.body.replaceChildren(...placed.map(card));
    });
    lastMoved = null;
    pulseBucket = null;
  }

  root.append(
    h('div', { class: 'sort-instruction-bar' },
      h('span', { class: 'banner-badge' }, '🗂️ Classement interactif : Glisse ou clique sur une carte puis sur sa catégorie', arHint('اسحب البطاقات أو انقر عليها ثم اختر التصنيف المناسب لها'))
    ),
    pool,
    h('div', { class: 'buckets', style: '' }, buckets.map((b) => b.box)),
    live
  );
  draw();

  return {
    check() {
      const res = items.map((it, i) => {
        const ok = place[i] === it[1];
        return {
          ok,
          msg: `${it[0]} → ${d.cats[it[1]]}` + (it[2] ? ' — ' + it[2] : '') + (place[i] == null ? ' (non classé)' : ''),
        };
      });
      return {
        correct: res.filter((x) => x.ok).length,
        total: items.length,
        items: res,
        unanswered: place.filter((x) => x == null).length,
      };
    },
    reveal(res) {
      root.querySelectorAll('.bucket .chip').forEach((c) => {
        const idx = c.dataset.idx != null ? Number(c.dataset.idx) : -1;
        if (idx >= 0 && res.items[idx]) {
          c.classList.add(res.items[idx].ok ? 'ok' : 'ko');
        }
      });
    },
    solve() {
      items.forEach((it, i) => { place[i] = it[1]; });
      sel = null;
      draw();
    },
  };
}

// -----------------------------------------------------------------
// 3. ORDONNER (orderGame) : ORDONNER AVEC GLISSER-DÉPOSER & FLÈCHES
// -----------------------------------------------------------------
export function orderGame(root, d) {
  const n = d.steps.length;
  const gid = d.steps.map((_, i) => i);
  (d.eq || []).forEach((g, k) => g.forEach((i) => { gid[i] = 1000 + k; }));
  let list = shuffle([...Array(n).keys()].map((i) => i));
  if ((d.eq || []).length) {
    let t = 0;
    while (list.every((x, i) => gid[x] === gid[i]) && t++ < 20) list = shuffle(list);
  }

  const ol = h('ol', { class: 'order' });

  function draw(focus) {
    ol.replaceChildren(...list.map((idx, pos) => {
      const row = h('li', {
        class: 'ord-row order-draggable-row',
        draggable: 'true',
        ondragstart: (e) => {
          row.classList.add('dragging');
          e.dataTransfer.setData('text/plain', String(pos));
        },
        ondragend: () => row.classList.remove('dragging'),
        ondragenter: (e) => { e.preventDefault(); row.classList.add('drag-over'); },
        ondragleave: () => row.classList.remove('drag-over'),
        ondragover: (e) => e.preventDefault(),
        ondrop: (e) => {
          e.preventDefault();
          row.classList.remove('drag-over');
          const fromPos = Number(e.dataTransfer.getData('text/plain'));
          if (Number.isInteger(fromPos) && fromPos !== pos) {
            const item = list.splice(fromPos, 1)[0];
            list.splice(pos, 0, item);
            audio.play('move');
            draw();
          }
        },
      },
      h('span', { class: 'grip-icon', 'aria-hidden': 'true' }, '⠿'),
      h('span', { class: 'num', 'aria-hidden': 'true' }, pos + 1),
      h('span', { class: 'txt' }, visualLabel(d.steps[idx], d.visualPart, studentIllustration(d, idx), d.textOnly)),
      h('span', { class: 'ord-btns' },
        h('button', {
          type: 'button',
          class: 'icon-btn',
          'aria-label': `Monter l’étape ${pos + 1}`,
          disabled: pos === 0,
          'data-f': pos + ':u',
          onclick: () => mv(pos, -1),
        }, '▲'),
        h('button', {
          type: 'button',
          class: 'icon-btn',
          'aria-label': `Descendre l’étape ${pos + 1}`,
          disabled: pos === n - 1,
          'data-f': pos + ':d',
          onclick: () => mv(pos, 1),
        }, '▼')
      )
      );
      return row;
    }));
    if (focus) {
      const b = ol.querySelector(`[data-f="${focus}"]`) || ol.querySelector('button:not([disabled])');
      b && b.focus();
    }
  }

  function mv(pos, dlt) {
    const j = pos + dlt;
    [list[pos], list[j]] = [list[j], list[pos]];
    audio.play('move');
    draw(j + ':' + (dlt < 0 ? 'u' : 'd'));
  }

  root.append(
    h('div', { class: 'sort-instruction-bar' },
      h('span', { class: 'banner-badge' }, '🔢 Ordonner les étapes : Fais glisser les lignes ou utilise ▲ et ▼', arHint('رتب الخطوات بالسحب أو بالضغط على الأسهم'))
    ),
    ol
  );
  draw();

  return {
    check() {
      const items = list.map((idx, pos) => {
        const ok = gid[idx] === gid[pos];
        return {
          ok,
          msg: `Étape ${pos + 1} : ${d.steps[pos]}` + (ok ? '' : ` (tu avais mis : ${d.steps[idx]})`),
        };
      });
      if (d.explain) items.push({ ok: true, info: true, msg: d.explain });
      const sc = items.filter((x) => !x.info);
      return { correct: sc.filter((x) => x.ok).length, total: n, items, unanswered: 0 };
    },
    reveal(res) {
      [...ol.children].forEach((li, i) => li.classList.add(res.items[i].ok ? 'ok' : 'ko'));
    },
    solve() {
      list = [...Array(n).keys()];
      draw();
    },
  };
}

// -----------------------------------------------------------------
// 4. TEXTE À TROUS (fillGame)
// -----------------------------------------------------------------
export function fillGame(root, d) {
  const blanks = [];
  const lines = d.lines.map((ln) => (Array.isArray(ln) ? ln : [ln, '']));

  lines.forEach(([text, why], index) => {
    const p = h('p', { class: 'fill-line' }, itemVisual(text.replace(/\[\[.+?\]\]/g, '…')));
    const illustration = studentIllustration(d, index);
    if (illustration) p.replaceChildren(illustration);
    const re = /\[\[(.+?)\]\]/g;
    let last = 0, m;
    while ((m = re.exec(text))) {
      p.append(text.slice(last, m.index));
      const opts = m[1].split('|');
      const k = blanks.length;
      const sel = h('select', {
        'aria-label': `Réponse ${k + 1}`,
        onchange: () => audio.play('click'),
      },
      h('option', { value: '' }, '— choisir —'),
      shuffle(opts).map((o) => h('option', { value: o }, o))
      );
      const fb = h('span', { class: 'fb' });
      p.append(sel, fb);
      blanks.push({
        sel,
        fb,
        ans: opts[0],
        why,
        text: text.replace(/\[\[(.+?)\]\]/g, (_, x) => x.split('|')[0]),
      });
      last = m.index + m[0].length;
    }
    p.append(text.slice(last), arHint(arQuestion(d.illustrationActivityId, index)));
    root.append(p);
  });

  return {
    check() {
      const items = blanks.map((b) => {
        const ok = b.sel.value === b.ans;
        return {
          ok,
          msg: `${b.text}` + (b.why ? ' — ' + b.why : ''),
        };
      });
      return {
        correct: items.filter((x) => x.ok).length,
        total: blanks.length,
        items,
        unanswered: blanks.filter((b) => !b.sel.value).length,
      };
    },
    reveal(res) {
      blanks.forEach((b, i) => {
        const ok = res.items[i].ok;
        b.sel.classList.add(ok ? 'ok' : 'ko');
        b.fb.textContent = ok ? ' ✔' : ' ✖ → ' + b.ans;
      });
    },
    solve() {
      blanks.forEach((b) => { b.sel.value = b.ans; });
    },
  };
}

// -----------------------------------------------------------------
// 5. QCM INTERACTIF : BONNE RÉPONSE, RÉPONSE FAUSSE & VRAI OU FAUX
// -----------------------------------------------------------------
let qid = 0;
export function quizGame(root, d) {
  const qs = d.qs.map((q, i) => {
    const [text, opts, why] = q;
    const lines = text.split('\n');
    const name = 'q' + (++qid);
    const order = shuffle(opts.map((_, k) => k));

    // Détection du mode de question
    const isTrueFalse = opts.length === 2 && opts.some((o) => /vrai|صحيح/i.test(o)) && opts.some((o) => /faux|خطأ/i.test(o));
    const isFindFalse = /fausse|faux|intrus|erreur|mauvaise|n'est pas|ne doit pas|interdit/i.test(text);

    let modeBanner = null;
    if (isTrueFalse) {
      modeBanner = h('span', { class: 'q-mode-badge tf' }, '⚖️ VRAI OU FAUX', arHint('صحيح أم خطأ'));
    } else if (isFindFalse) {
      modeBanner = h('span', { class: 'q-mode-badge false-mode' }, '🚨 Trouver la réponse fausse / l’intrus', arHint('ابحث عن الإجابة الخاطئة'));
    } else {
      modeBanner = h('span', { class: 'q-mode-badge good-mode' }, '🎯 Trouver la bonne réponse', arHint('اختر الإجابة الصحيحة'));
    }

    const inputs = order.map((k) => h('input', {
      type: 'radio',
      name,
      value: String(k),
      onchange: () => audio.play('click'),
    }));

    const labels = order.map((k, j) => {
      const optText = opts[k];
      const isVrai = /vrai|صحيح/i.test(optText);
      const isFaux = /faux|خطأ/i.test(optText);

      return h('label', {
        class: 'opt quiz-card' + (isTrueFalse ? (isVrai ? ' tf-vrai' : isFaux ? ' tf-faux' : '') : ''),
        onclick: () => {
          inputs[j].checked = true;
          audio.play('click');
        },
      },
      inputs[j],
      h('span', { class: 'opt-letter', 'aria-hidden': 'true' }, isTrueFalse ? (isVrai ? '✔' : '✖') : letter(j)),
      visualLabel(optText, d.visualPart, d.optionPicture?.(i, k) || itemVisual(optText), true)
      );
    });

    const qar = arText(lines[0]) || arQuestion(d.illustrationActivityId, i);
    root.append(
      h('fieldset', { class: 'q quiz-fieldset' + (isTrueFalse ? ' is-tf' : isFindFalse ? ' is-find-false' : '') },
        h('legend', null,
          h('span', { class: 'q-num' }, i + 1),
          modeBanner,
          h('span', { class: 'q-title-text' }, lines[0], arHint(qar))
        ),
        studentIllustration(d, i, 'student-illustration-question') || itemVisual(lines[0]),
        lines.length > 1 ? h('pre', { class: 'code' }, lines.slice(1).join('\n')) : null,
        h('div', { class: 'quiz-options-grid' + (isTrueFalse ? ' tf-grid' : '') }, labels)
      )
    );

    return { inputs, labels, order, opts, why, text: lines[0] };
  });

  return {
    check() {
      const items = qs.map((q) => {
        const c = q.inputs.find((x) => x.checked);
        const ok = !!c && c.value === '0';
        return {
          ok,
          msg: `${q.text} → ${q.opts[0]}.` + (q.why ? ' ' + q.why : ''),
        };
      });
      return {
        correct: items.filter((x) => x.ok).length,
        total: qs.length,
        items,
        unanswered: qs.filter((q) => !q.inputs.some((x) => x.checked)).length,
      };
    },
    reveal(res) {
      qs.forEach((q) => {
        q.labels.forEach((l, j) => {
          if (q.order[j] === 0) l.classList.add('good');
          else if (q.inputs[j].checked) l.classList.add('bad');
        });
      });
    },
    solve() {
      qs.forEach((q) => {
        q.inputs[q.order.indexOf(0)].checked = true;
      });
    },
  };
}

export { norm };
