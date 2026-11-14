// Fenêtres surgissantes de correction, partagées par le mode classique et le mode immersif.
import { h, reduced } from '../utils/dom.js';
import { arHint } from '../i18n/arhint.js';
import { audio } from '../audio/audio.js';
import { fmt } from '../scoring/scoring.js';
import { fmtTime, RANKS } from './game.js';

/**
 * Après « Vérifier » : une pastille ✔ / ✖ surgit sur chaque réponse corrigée de l'activité.
 * Fonctionne avec tous les moteurs, qui marquent leurs éléments avec .ok / .ko (ou .good / .bad pour les QCM).
 */
export function answerPins(stage, step = 0.11) {
  stage.querySelectorAll('.answer-pin').forEach((p) => p.remove());
  const els = [...stage.querySelectorAll('.ok, .ko, label.opt.good, label.opt.bad')].filter((el) => !(el instanceof SVGElement) && !el.closest('.answer-pin') && el.offsetParent !== null).slice(0, 40);
  els.forEach((el, i) => {
    const ok = el.classList.contains('ok') || el.classList.contains('good');
    const pin = h('span', { class: 'answer-pin ' + (ok ? 'ok' : 'ko'), 'aria-hidden': 'true', style: `animation-delay:${reduced() ? 0 : i * step}s` }, ok ? '✔' : '✖');
    if (el.matches('select,input,textarea')) { el.insertAdjacentElement('afterend', pin); pin.classList.add('inline'); }
    else { el.classList.add('has-pin'); el.append(pin); }
  });
  return els.length;
}

function countUp(el, to, ms, fmtFn = (v) => String(Math.round(v))) {
  if (reduced() || ms <= 0) { el.textContent = fmtFn(to); return; }
  const t0 = performance.now();
  const tick = (t) => { const k = Math.min(1, (t - t0) / ms); el.textContent = fmtFn(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(tick); };
  requestAnimationFrame(tick);
}

/**
 * Fenêtre de résultat en deux temps : le score animé, puis chaque réponse en carte (carrousel).
 * opts : { score, ratio, items, attemptLine, msg, arMsg, game: {before, after, xpGain, levelUp, newBadges}, time: {ms, record, best},
 *          starDelay, starStep, onRetry, next: {href, label}, onClose, accent }
 */
export function resultPopup(opts) {
  const items = opts.items || []; const graded = items.filter((it) => !it.info);
  const okN = graded.filter((it) => it.ok).length; const koN = graded.length - okN;
  const prev = document.activeElement; let idx = 0;
  const pct = Math.round(opts.ratio * 100);

  // ---------- onglet Résultat ----------
  const num = h('span', { class: 'rp-num' }, '0');
  const ring = h('div', { class: 'rp-ring' + (opts.ratio === 1 ? ' perfect' : opts.ratio >= 0.6 ? ' good' : ' low'), style: '--p:0', role: 'img', 'aria-label': `Note : ${fmt(opts.score)} sur 5` }, h('div', { class: 'rp-ring-in' }, num, h('small', null, '/ 5')));
  const stars = h('div', { class: 'rp-stars', 'aria-hidden': 'true' }, Array.from({ length: 5 }, (_, i) => h('span', { class: 'rp-star' + (i < Math.round(opts.score) ? ' on' : ''), style: i < Math.round(opts.score) ? `animation-delay:${reduced() ? 0 : (opts.starDelay ?? 0.6) + i * (opts.starStep ?? 0.17)}s` : null }, '★')));
  const g = opts.game; const chips = h('div', { class: 'rp-chips' });
  if (g) {
    const xp = h('b', null, '+0'); chips.append(h('span', { class: 'rp-chip xp' }, '✨ ', xp, ' XP'));
    countUp(xp, g.xpGain, 1200, (v) => '+' + Math.round(v));
    if (g.after.streak >= 2) chips.append(h('span', { class: 'rp-chip streak' }, `🔥 Série de ${g.after.streak}`));
  }
  if (opts.time) chips.append(h('span', { class: 'rp-chip time' + (opts.time.record ? ' record' : '') }, `⏱ ${fmtTime(opts.time.ms)}`, opts.time.record ? ' · Record !' : opts.time.best != null ? ` · record ${fmtTime(opts.time.best)}` : ''));
  let levelBox = null;
  if (g) {
    const fill = h('i', { style: `width:${g.levelUp ? 0 : g.before.pct}%` });
    levelBox = h('div', { class: 'rp-level' + (g.levelUp ? ' up' : '') },
      g.levelUp ? h('div', { class: 'rp-levelup' }, `⬆ Niveau ${g.after.level} atteint ! · ${g.after.rank}`) : null,
      h('div', { class: 'rp-level-head' }, h('b', null, `Niveau ${g.after.level}`), h('span', null, g.after.rank), h('small', null, `${g.after.into} / ${g.after.need} XP`)),
      h('div', { class: 'rp-level-bar' }, fill));
    setTimeout(() => { fill.style.width = g.after.pct + '%'; }, reduced() ? 0 : 500);
  }
  const badges = g && g.newBadges.length ? h('div', { class: 'rp-badges' }, h('b', null, 'Nouveau badge !'), g.newBadges.map((b) => h('span', { class: 'rp-badge', title: b.desc }, h('span', { class: 'ico' }, b.icon), b.title))) : null;
  const scoreTab = h('section', { class: 'rp-pane rp-score' },
    h('div', { class: 'rp-hero' }, ring, h('div', null, h('h2', { id: 'rp-title', tabindex: '-1' }, opts.msg, arHint(opts.arMsg)), stars, h('p', { class: 'rp-sub' }, opts.attemptLine))),
    h('div', { class: 'rp-tally' }, h('span', { class: 'ok' }, `✔ ${okN} juste${okN > 1 ? 's' : ''}`), h('span', { class: 'ko' }, `✖ ${koN} à revoir`)),
    chips, levelBox, badges);

  // ---------- onglet Réponses : une carte par réponse ----------
  const card = h('div', { class: 'rp-card', 'aria-live': 'polite' });
  const counter = h('span', { class: 'rp-count' });
  const dots = h('div', { class: 'rp-dots', role: 'tablist', 'aria-label': 'Réponses' });
  const list = h('ul', { class: 'rp-list', hidden: true }, items.map((it) => h('li', { class: it.info ? 'info' : it.ok ? 'ok' : 'ko' }, h('span', { class: 'ic', 'aria-hidden': 'true' }, it.info ? 'ℹ' : it.ok ? '✔' : '✖'), h('span', null, h('span', { class: 'vh' }, it.info ? 'Information : ' : it.ok ? 'Correct : ' : 'À revoir : '), it.msg))));
  const prevBtn = h('button', { type: 'button', class: 'rp-nav', 'aria-label': 'Réponse précédente', onclick: () => show(idx - 1) }, '‹');
  const nextBtn = h('button', { type: 'button', class: 'rp-nav', 'aria-label': 'Réponse suivante', onclick: () => show(idx + 1) }, '›');
  const listToggle = h('button', { type: 'button', class: 'btn ghost small', 'aria-pressed': 'false', onclick: () => { const on = list.hidden; list.hidden = !on; carousel.hidden = on; listToggle.setAttribute('aria-pressed', String(on)); listToggle.textContent = on ? '🃏 Une par une' : '☰ Toutes les réponses'; } }, '☰ Toutes les réponses');
  const carousel = h('div', { class: 'rp-carousel' }, prevBtn, card, nextBtn);
  function show(i, silent = false) {
    if (!items.length) return; idx = (i + items.length) % items.length; const it = items[idx];
    const kind = it.info ? 'info' : it.ok ? 'ok' : 'ko';
    card.className = 'rp-card ' + kind; card.replaceChildren(
      h('div', { class: 'rp-card-ic', 'aria-hidden': 'true' }, it.info ? 'ℹ' : it.ok ? '✔' : '✖'),
      h('p', { class: 'rp-card-kind' }, it.info ? 'Information' : it.ok ? 'Bonne réponse' : 'À revoir'),
      h('p', { class: 'rp-card-msg' }, it.msg));
    void card.offsetWidth; card.classList.add('in');
    counter.textContent = `${idx + 1} / ${items.length}`;
    [...dots.children].forEach((d, k) => { d.setAttribute('aria-selected', String(k === idx)); d.classList.toggle('cur', k === idx); });
    if (!silent && !it.info) audio.play(it.ok ? 'correct' : 'wrong', { i: Math.min(9, idx) });
  }
  items.forEach((it, k) => dots.append(h('button', { type: 'button', role: 'tab', class: 'rp-dot ' + (it.info ? 'info' : it.ok ? 'ok' : 'ko'), 'aria-label': `Réponse ${k + 1} : ${it.info ? 'information' : it.ok ? 'juste' : 'à revoir'}`, onclick: () => show(k) })));
  const answersTab = h('section', { class: 'rp-pane rp-answers', hidden: true }, h('div', { class: 'rp-answers-head' }, h('h2', null, 'Correction détaillée'), counter, listToggle), carousel, dots, list);

  // ---------- onglets + actions ----------
  const tabScore = h('button', { type: 'button', role: 'tab', class: 'rp-tab on', 'aria-selected': 'true', onclick: () => tab('score') }, '🏆 Résultat');
  const tabAns = h('button', { type: 'button', role: 'tab', class: 'rp-tab', 'aria-selected': 'false', onclick: () => tab('answers') }, `🔎 Réponses (${okN} ✔ · ${koN} ✖)`);
  const switchBtn = h('button', { type: 'button', class: 'btn', onclick: () => tab(answersTab.hidden ? 'answers' : 'score') }, 'Voir les réponses →');
  function tab(which) {
    const ans = which === 'answers'; answersTab.hidden = !ans; scoreTab.hidden = ans;
    tabScore.classList.toggle('on', !ans); tabAns.classList.toggle('on', ans); tabScore.setAttribute('aria-selected', String(!ans)); tabAns.setAttribute('aria-selected', String(ans));
    switchBtn.textContent = ans ? '← Résultat' : 'Voir les réponses →';
    if (ans) { show(idx, false); setTimeout(() => nextBtn.focus(), 0); }
  }
  const retry = h('button', { type: 'button', class: 'btn', onclick: () => { close(); opts.onRetry && opts.onRetry(); } }, '↻ Réessayer');
  const next = opts.next ? h('a', { class: 'btn primary', href: opts.next.href, onclick: () => close(true) }, opts.next.label) : null;
  const closeBtn = h('button', { type: 'button', class: 'rp-close', 'aria-label': 'Fermer et revoir l’activité corrigée', onclick: () => close() }, '✕');
  const dlg = h('div', { class: 'rp', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'rp-title', style: opts.accent ? `--rp-accent:${opts.accent}` : null },
    closeBtn, h('div', { class: 'rp-tabs', role: 'tablist' }, tabScore, tabAns), scoreTab, answersTab,
    h('div', { class: 'rp-foot' }, retry, switchBtn, next));
  const bg = h('div', { class: 'rp-bg' + (opts.ratio === 1 ? ' perfect' : ''), onclick: (e) => { if (e.target === bg) close(); } }, dlg);
  bg.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { e.stopPropagation(); close(); }
    else if (!answersTab.hidden && (e.key === 'ArrowRight' || e.key === 'ArrowLeft') && !e.target.matches('input,textarea')) { e.preventDefault(); show(idx + (e.key === 'ArrowRight' ? 1 : -1)); }
    else if (e.key === 'Tab') { // garde le focus dans la fenêtre
      const f = [...dlg.querySelectorAll('button,a[href]')].filter((x) => !x.closest('[hidden]') && x.offsetParent !== null);
      if (!f.length) return; const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); } else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  let open = false;
  function openIt() {
    if (open) return; open = true; document.body.append(bg); document.body.classList.add('rp-open');
    requestAnimationFrame(() => bg.classList.add('show'));
    setTimeout(() => (next || retry).focus({ preventScroll: true }), 30);
  }
  function close(leaving = false) {
    if (!open) return; open = false; bg.classList.remove('show'); document.body.classList.remove('rp-open');
    setTimeout(() => bg.remove(), reduced() ? 0 : 220);
    if (!leaving) { opts.onClose && opts.onClose(); prev && prev.focus && document.contains(prev) && prev.focus({ preventScroll: true }); }
  }
  openIt();
  // Animations d'entrée : la jauge se remplit et la note défile.
  requestAnimationFrame(() => { if (reduced()) ring.style.setProperty('--p', pct); else setTimeout(() => ring.style.setProperty('--p', pct), 120); });
  countUp(num, opts.score, 900, (v) => fmt(Math.round(v * 10) / 10));
  show(0, true);
  return { open: openIt, close };
}

/** Notifications de badges débloqués (empilées en haut à droite). */
export function badgePopup(badges, delay = 0) {
  if (!badges || !badges.length) return;
  let stack = document.querySelector('.ach-stack');
  if (!stack) { stack = h('div', { class: 'ach-stack', role: 'status', 'aria-live': 'polite' }); document.body.append(stack); }
  badges.forEach((b, i) => setTimeout(() => {
    const t = h('div', { class: 'ach' }, h('span', { class: 'ach-ic', 'aria-hidden': 'true' }, b.icon), h('div', null, h('small', null, 'Badge débloqué !'), h('b', null, b.title), h('span', null, b.desc)));
    stack.append(t); audio.play('star', { i: Math.min(4, i + 2) });
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 400); }, 5200);
  }, (delay + i * 0.6) * 1000));
}

/** Barre de jeu compacte : niveau, XP, série, badges. */
export function gameHud(game, { compact = false } = {}) {
  return h('div', { class: 'ghud' + (compact ? ' compact' : ''), role: 'group', 'aria-label': `Niveau ${game.level}, ${game.into} XP sur ${game.need}, série ${game.streak}` },
    h('span', { class: 'ghud-lvl', title: game.rank }, h('b', null, game.level), h('small', null, 'niv.')),
    h('span', { class: 'ghud-xp' }, h('span', { class: 'ghud-xp-top' }, h('b', null, game.rank), h('small', null, `${game.into}/${game.need} XP`)), h('span', { class: 'ghud-bar' }, h('i', { style: `width:${game.pct}%` }))),
    h('span', { class: 'ghud-chip' + (game.streak >= 3 ? ' hot' : ''), title: `Meilleure série : ${game.bestStreak}` }, '🔥 ', game.streak),
    game.badgesOn === false ? null : h('span', { class: 'ghud-chip', title: 'Badges débloqués' }, '🏅 ', game.badges.size));
}
export { RANKS };
