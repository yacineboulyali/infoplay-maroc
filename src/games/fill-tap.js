// Texte à trous « à toucher » : chaque phrase a ses cases vides et, juste en dessous, ses propositions.
// Toucher une proposition l'envoie, avec une petite animation, dans la case vide choisie (ou la première libre) ;
// toucher une case remplie renvoie le mot à sa place dans la réserve. Même interface check / reveal / solve.
import { h, shuffle } from '../utils/dom.js';
import { arHint } from '../i18n/arhint.js';
import { arQuestion } from '../i18n/ar-questions.js';
import { audio } from '../audio/audio.js';
import { itemVisual } from '../utils/item-visuals.js';
import { studentIllustration } from '../utils/student-illustrations.js';

const still = () => typeof document === 'undefined' || document.body.classList.contains('reduced-motion')
  || (typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches);

/** Vol d'un mot d'un élément à un autre : copie flottante animée, puis `done()`. */
function fly(from, to, label, done) {
  if (still() || typeof from.animate !== 'function') { done(); return; }
  const a = from.getBoundingClientRect(); const z = to.getBoundingClientRect();
  if (!a.width || !z.width) { done(); return; }
  const ghost = h('span', { class: 'fill-chip fill-ghost', 'aria-hidden': 'true' }, label);
  Object.assign(ghost.style, { left: `${a.left}px`, top: `${a.top}px`, width: `${a.width}px`, height: `${a.height}px` });
  document.body.append(ghost);
  const dx = z.left + z.width / 2 - (a.left + a.width / 2);
  const dy = z.top + z.height / 2 - (a.top + a.height / 2);
  const anim = ghost.animate([
    { transform: 'translate(0, 0) scale(1)' },
    { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 26}px) scale(1.08)`, offset: 0.5 },
    { transform: `translate(${dx}px, ${dy}px) scale(1)` },
  ], { duration: 380, easing: 'cubic-bezier(.3,.7,.3,1)' });
  // Fin d'animation, ou au plus tard après 450 ms (onglet en arrière-plan : l'animation peut être suspendue).
  let ended = false;
  const end = () => { if (ended) return; ended = true; ghost.remove(); done(); };
  anim.onfinish = end;
  setTimeout(end, 450);
}

export function fillTapGame(root, d) {
  const blanks = [];
  const lines = d.lines.map((ln) => (Array.isArray(ln) ? ln : [ln, '']));
  let locked = false;

  const setSlot = (b, label) => {
    b.slot.querySelector('.fill-slot-t').textContent = label;
    b.slot.classList.toggle('filled', !!label);
    b.slot.setAttribute('aria-label', label ? `Case remplie : ${label} (toucher pour retirer)` : `Case ${b.n} : vide`);
  };
  const fill = (b, chip) => {
    audio.play('click');
    chip.classList.add('used'); chip.setAttribute('aria-hidden', 'true'); chip.tabIndex = -1;
    b.chip = chip; b.value = chip.textContent;
    b.slot.classList.remove('target');
    fly(chip, b.slot, b.value, () => {
      if (b.chip !== chip) return; // retiré entre-temps
      setSlot(b, b.value);
      b.slot.classList.add('pop'); setTimeout(() => b.slot.classList.remove('pop'), 320);
    });
  };
  const unfill = (b) => {
    const chip = b.chip; const label = b.value;
    b.chip = null; b.value = '';
    setSlot(b, '');
    b.slot.classList.remove('ok', 'ko'); b.fb.textContent = '';
    audio.play('click');
    fly(b.slot, chip, label, () => { chip.classList.remove('used'); chip.removeAttribute('aria-hidden'); chip.tabIndex = 0; });
  };

  lines.forEach(([text, why], index) => {
    const card = h('div', { class: 'fill-line fill-tap' });
    const art = studentIllustration(d, index) || itemVisual(text.replace(/\[\[.+?\]\]/g, '…'));
    if (art) card.append(art);
    const p = h('p', { class: 'fill-text' });
    const lineBlanks = []; const words = [];
    const re = /\[\[(.+?)\]\]/g;
    let last = 0, m;
    while ((m = re.exec(text))) {
      p.append(text.slice(last, m.index));
      const opts = m[1].split('|');
      const b = { n: blanks.length + 1, chip: null, value: '', ans: opts[0], why, fb: h('span', { class: 'fb' }),
        text: text.replace(/\[\[(.+?)\]\]/g, (_, x) => x.split('|')[0]) };
      b.slot = h('button', { type: 'button', class: 'fill-slot' }, h('span', { class: 'fill-slot-t' }));
      setSlot(b, '');
      b.slot.addEventListener('click', () => {
        if (locked) return;
        if (b.chip) { unfill(b); return; }
        lineBlanks.forEach((x) => x.slot.classList.toggle('target', x === b)); // case vide choisie
      });
      p.append(b.slot, b.fb);
      blanks.push(b); lineBlanks.push(b);
      opts.forEach((o) => { if (!words.includes(o)) words.push(o); });
      last = m.index + m[0].length;
    }
    p.append(text.slice(last), arHint(arQuestion(d.illustrationActivityId, index)));

    const bank = h('div', { class: 'fill-bank', role: 'group', 'aria-label': 'Propositions : touche un mot pour remplir la case' });
    shuffle(words).forEach((w) => {
      const chip = h('button', { type: 'button', class: 'fill-chip' }, w);
      chip.addEventListener('click', () => {
        if (locked || chip.classList.contains('used')) return;
        const target = lineBlanks.find((x) => x.slot.classList.contains('target') && !x.chip) || lineBlanks.find((x) => !x.chip);
        if (!target) { chip.classList.remove('nudge'); void chip.offsetWidth; chip.classList.add('nudge'); return; } // tout est rempli
        fill(target, chip);
      });
      bank.append(chip);
    });
    card.append(p, bank);
    root.append(card);
  });

  return {
    check() {
      const items = blanks.map((b) => ({ ok: b.value === b.ans, msg: `${b.text}` + (b.why ? ' — ' + b.why : '') }));
      return { correct: items.filter((x) => x.ok).length, total: blanks.length, items, unanswered: blanks.filter((b) => !b.value).length };
    },
    reveal(res) {
      locked = true;
      blanks.forEach((b, i) => {
        const ok = res.items[i].ok;
        b.slot.classList.add(ok ? 'ok' : 'ko');
        b.fb.textContent = ok ? ' ✔' : ' ✖ → ' + b.ans;
      });
    },
    solve() {
      blanks.forEach((b) => {
        if (b.chip) { b.chip.classList.remove('used'); b.chip = null; }
        const chip = [...b.slot.closest('.fill-line').querySelectorAll('.fill-chip')].find((c) => c.textContent === b.ans && !c.classList.contains('used'));
        if (chip) { chip.classList.add('used'); b.chip = chip; }
        b.value = b.ans; setSlot(b, b.ans);
      });
    },
  };
}
