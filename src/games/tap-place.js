// Ordonner et classer « au toucher », sur le modèle des phrases à trous :
// les éléments attendent dans une réserve en bas ; toucher un élément l'envoie (animé) à sa place,
// toucher un élément déjà placé le renvoie à son emplacement d'origine dans la réserve.
import { h, shuffle } from '../utils/dom.js';
import { arHint } from '../i18n/arhint.js';
import { audio } from '../audio/audio.js';
import { categoryVisual } from '../utils/item-visuals.js';
import { studentIllustration } from '../utils/student-illustrations.js';
import { visualLabel } from './basic.js';
import { fly } from './fill-tap.js';

const banner = (fr, ar) => h('div', { class: 'sort-instruction-bar' }, h('span', { class: 'banner-badge' }, fr, arHint(ar)));
const nudge = (el) => { el.classList.remove('nudge'); void el.offsetWidth; el.classList.add('nudge'); };
const pop = (el) => { el.classList.add('pop'); setTimeout(() => el.classList.remove('pop'), 320); };
// Emplacement d'origine d'un élément placé : vidé (une seule copie de l'élément dans la page) mais gardant sa taille.
function stash(el) {
  if (el.__kids) return;
  const r = el.getBoundingClientRect?.();
  if (r && r.width) { el.style.width = `${r.width}px`; el.style.height = `${r.height}px`; }
  el.__kids = [...el.childNodes]; el.replaceChildren();
  el.classList.add('used'); el.setAttribute('aria-hidden', 'true'); el.tabIndex = -1;
}
function unstash(el) {
  if (el.__kids) { el.replaceChildren(...el.__kids); el.__kids = null; }
  el.style.width = ''; el.style.height = '';
  el.classList.remove('used'); el.removeAttribute('aria-hidden'); el.tabIndex = 0;
}

// -----------------------------------------------------------------
// ORDONNER : des cases numérotées vides en haut, les étapes mélangées en bas.
// -----------------------------------------------------------------
export function orderTapGame(root, d) {
  const n = d.steps.length;
  const gid = d.steps.map((_, i) => i);
  (d.eq || []).forEach((g, k) => g.forEach((i) => { gid[i] = 1000 + k; }));
  const at = Array(n).fill(null); // at[position] = index de l'étape posée
  let target = null; let locked = false;
  const label = (i) => visualLabel(d.steps[i], d.visualPart, studentIllustration(d, i), d.textOnly);

  const slots = [...Array(n).keys()].map((pos) => {
    const body = h('span', { class: 'tap-slot-body' }, h('span', { class: 'tap-slot-empty' }, 'Touche une étape ci-dessous'));
    const el = h('button', { type: 'button', class: 'tap-slot ord-slot', 'aria-label': `Position ${pos + 1} : vide` },
      h('span', { class: 'num', 'aria-hidden': 'true' }, pos + 1), body);
    el.addEventListener('click', () => {
      if (locked) return;
      if (at[pos] != null) { back(pos); return; }
      target = target === pos ? null : pos; // choisir la case vide à remplir
      slots.forEach((s, j) => s.el.classList.toggle('target', j === target));
    });
    return { el, body };
  });
  const cards = shuffle([...Array(n).keys()]).map((i) => {
    const el = h('button', { type: 'button', class: 'tap-card ord-card', 'data-idx': String(i) }, label(i));
    el.addEventListener('click', () => {
      if (locked || el.classList.contains('used')) return;
      const pos = target != null && at[target] == null ? target : at.indexOf(null);
      if (pos < 0) { nudge(el); return; }
      put(i, pos, el);
    });
    return { i, el };
  });
  const cardOf = (i) => cards.find((c) => c.i === i).el;

  function put(i, pos, el) {
    audio.play('snap');
    at[pos] = i; target = null;
    slots.forEach((s) => s.el.classList.remove('target'));
    const s = slots[pos];
    fly(el, s.el, el, () => {
      if (at[pos] !== i) return;
      s.body.replaceChildren(label(i));
      s.el.classList.add('filled'); pop(s.el);
      s.el.setAttribute('aria-label', `Position ${pos + 1} : ${d.steps[i]} (toucher pour retirer)`);
    });
    stash(el);
  }
  function back(pos) {
    const i = at[pos]; const s = slots[pos]; const el = cardOf(i);
    at[pos] = null;
    audio.play('pop');
    // La copie volante part de la case encore remplie, puis la case se vide et l'étape réapparaît à sa place.
    fly(s.el, el, s.body, () => { el.style.visibility = ''; });
    s.body.replaceChildren(h('span', { class: 'tap-slot-empty' }, 'Touche une étape ci-dessous'));
    s.el.classList.remove('filled', 'ok', 'ko');
    s.el.setAttribute('aria-label', `Position ${pos + 1} : vide`);
    unstash(el); el.style.visibility = 'hidden';
  }

  root.append(
    banner('🔢 Ordonner : touche les étapes dans l’ordre, elles viennent se ranger dans les cases. Touche une case remplie pour reprendre l’étape.',
      'المس الخطوات بالترتيب فتأخذ مكانها في الخانات. المس خانة مملوءة لاسترجاع الخطوة.'),
    h('ol', { class: 'tap-slots order' }, slots.map((s) => h('li', null, s.el))),
    h('div', { class: 'tap-pool', role: 'group', 'aria-label': 'Étapes à placer' }, cards.map((c) => c.el)));

  return {
    check() {
      const items = at.map((idx, pos) => {
        const ok = idx != null && gid[idx] === gid[pos];
        return { ok, msg: `Étape ${pos + 1} : ${d.steps[pos]}` + (ok ? '' : idx == null ? ' (case vide)' : ` (tu avais mis : ${d.steps[idx]})`) };
      });
      if (d.explain) items.push({ ok: true, info: true, msg: d.explain });
      const sc = items.filter((x) => !x.info);
      return { correct: sc.filter((x) => x.ok).length, total: n, items, unanswered: at.filter((x) => x == null).length };
    },
    reveal(res) {
      locked = true;
      slots.forEach((s, pos) => s.el.classList.add(res.items[pos].ok ? 'ok' : 'ko'));
    },
    solve() {
      for (let pos = 0; pos < n; pos++) {
        at[pos] = pos;
        slots[pos].body.replaceChildren(label(pos)); slots[pos].el.classList.add('filled');
      }
      cards.forEach((c) => stash(c.el));
    },
  };
}

// -----------------------------------------------------------------
// CLASSER : on choisit une catégorie (en haut), puis on touche les cartes qui lui appartiennent.
// -----------------------------------------------------------------
export function sortTapGame(root, d) {
  const items = d.items;
  const place = Array(items.length).fill(null);
  let active = 0; let locked = false;
  const label = (i) => visualLabel(items[i][0], d.visualPart, studentIllustration(d, i), d.textOnly);
  const status = h('p', { class: 'tap-status', 'aria-live': 'polite' });

  const buckets = d.cats.map((c, ci) => {
    const count = h('span', { class: 'bucket-count' }, '0');
    const head = h('button', { type: 'button', class: 'bucket-head', 'aria-pressed': 'false' },
      h('span', { class: 'bucket-title-box' }, d.categoryPicture?.(c) || categoryVisual(c), h('b', null, c), count),
      h('small', { class: 'bucket-cta' }, '👆 Ranger ici'));
    const body = h('div', { class: 'bucket-body' });
    const box = h('div', { class: 'bucket sort-bucket tap-bucket', 'data-cat': ci }, head, body);
    head.addEventListener('click', () => { if (!locked) setActive(ci); });
    return { box, head, body, count, name: c };
  });
  function setActive(ci) {
    active = ci;
    buckets.forEach((b, j) => { b.box.classList.toggle('active', j === ci); b.head.setAttribute('aria-pressed', String(j === ci)); });
    status.textContent = `Catégorie choisie : « ${d.cats[ci]} ». Touche les cartes qui en font partie.`;
  }

  const cards = shuffle(items.map((_, i) => i)).map((i) => {
    const el = h('button', { type: 'button', class: 'tap-card chip sort-chip', 'data-idx': String(i) }, label(i));
    el.addEventListener('click', () => {
      if (locked || el.classList.contains('used')) return;
      put(i, active, el);
    });
    return { i, el };
  });
  const cardOf = (i) => cards.find((c) => c.i === i).el;
  const recount = () => buckets.forEach((b, ci) => { b.count.textContent = String(place.filter((p) => p === ci).length); });

  function put(i, ci, el) {
    audio.play('snap');
    place[i] = ci;
    const b = buckets[ci];
    const placed = h('button', { type: 'button', class: 'chip sort-chip placed', 'data-idx': String(i), 'aria-label': `${items[i][0]} (dans ${b.name}, toucher pour retirer)` }, label(i));
    placed.style.visibility = 'hidden';
    placed.addEventListener('click', () => { if (!locked) back(i, placed); });
    b.body.append(placed);
    recount();
    fly(el, placed, el, () => { placed.style.visibility = ''; pop(placed); });
    stash(el);
    if (place.every((p) => p != null)) status.textContent = '✨ Toutes les cartes sont classées : clique sur « Vérifier ».';
  }
  function back(i, placed) {
    const el = cardOf(i);
    place[i] = null; recount();
    audio.play('pop');
    fly(placed, el, placed, () => { el.style.visibility = ''; });
    placed.remove();
    unstash(el); el.style.visibility = 'hidden';
    status.textContent = 'Carte reprise : choisis une catégorie puis touche-la de nouveau.';
  }

  root.append(
    banner('🗂️ Classer : touche une catégorie, puis les cartes qui en font partie. Touche une carte rangée pour la reprendre.',
      'المس تصنيفا، ثم البطاقات التي تنتمي إليه. المس بطاقة مرتبة لاسترجاعها.'),
    h('div', { class: 'buckets' }, buckets.map((b) => b.box)),
    status,
    h('div', { class: 'tap-pool sort-pool', role: 'group', 'aria-label': 'Cartes à classer' }, cards.map((c) => c.el)));
  setActive(0);

  return {
    check() {
      const res = items.map((it, i) => ({
        ok: place[i] === it[1],
        msg: `${it[0]} → ${d.cats[it[1]]}` + (it[2] ? ' — ' + it[2] : '') + (place[i] == null ? ' (non classé)' : ''),
      }));
      return { correct: res.filter((x) => x.ok).length, total: items.length, items: res, unanswered: place.filter((x) => x == null).length };
    },
    reveal(res) {
      locked = true;
      root.querySelectorAll('.bucket .chip').forEach((c) => { const r = res.items[Number(c.dataset.idx)]; if (r) c.classList.add(r.ok ? 'ok' : 'ko'); });
    },
    solve() {
      buckets.forEach((b) => b.body.replaceChildren());
      items.forEach((it, i) => {
        place[i] = it[1];
        buckets[it[1]].body.append(h('span', { class: 'chip sort-chip placed', 'data-idx': String(i) }, label(i)));
      });
      cards.forEach((c) => stash(c.el));
      recount();
    },
  };
}
