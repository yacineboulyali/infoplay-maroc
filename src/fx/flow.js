// Enchaînement de la correction, commun aux deux modes :
// 1) les pastilles ✔/✖ surgissent sur les réponses (une note par réponse),
// 2) la fenêtre de résultat s'ouvre (jingle, note animée, étoiles, XP, niveau),
// 3) les badges débloqués s'annoncent, 4) une barre récapitulative reste sous l'activité.
import { h, reduced } from '../utils/dom.js';
import { audio } from '../audio/audio.js';
import { fmt, MAX } from '../scoring/scoring.js';
import { computeGame, diffGame, saveTime, bestTime, fmtTime } from './game.js';
import { answerPins, resultPopup, badgePopup } from './popup.js';

export const MSG = (ratio) => ratio === 1 ? 'Parfait ! 🎉' : ratio >= 0.8 ? 'Très bien !' : ratio >= 0.6 ? 'Bien, tu y es presque.' : ratio >= 0.4 ? 'Pas mal, relis les explications.' : 'Courage : lis les corrections puis réessaie.';
export const AR_MSG = (ratio) => ratio === 1 ? 'ممتاز! إجابة كاملة ومتقنة 🎉' : ratio >= 0.8 ? 'أحسنت جداً! أداء متميز 👍' : ratio >= 0.6 ? 'جيد، اقتربت من الإجابة التامة ✨' : ratio >= 0.4 ? 'لا بأس، راجع الشروحات وأعد المحاولة 🔄' : 'اقرأ الشرح جيداً ثم حاول مجدداً 💪';

/**
 * @param {object} o { store, prof, act, res, score, n, before, elapsedMs, stage, next:{href,label}, onRetry, accent, onPeak }
 * @returns {HTMLElement} barre récapitulative à placer sous l'activité
 */
export function presentResult(o) {
  const rec = (id) => o.store.record(o.prof.id, id);
  const ratio = o.score / MAX;
  const prevBest = bestTime(o.prof.id, o.act.id);
  const record = saveTime(o.prof.id, o.act.id, o.elapsedMs, o.score);
  const after = computeGame(rec, o.prof.id); const d = diffGame(o.before, after);
  const attempts = rec(o.act.id).attempts; const first = attempts[0].score; const best = Math.max(...attempts.map((x) => x.score));
  const attemptLine = o.n === 1 ? 'Premier essai enregistré.' : `Essai n° ${o.n} · premier essai : ${fmt(first)}/5 · meilleur : ${fmt(best)}/5`;

  const tm = audio.feedback(o.res.items, ratio, o.score);
  answerPins(o.stage, tm.step);
  const openAt = reduced() ? 0 : tm.end * 1000;
  let popup = null;
  const open = () => {
    popup = resultPopup({
      score: o.score, ratio, items: o.res.items, msg: MSG(ratio), arMsg: AR_MSG(ratio), attemptLine, accent: o.accent,
      game: { before: o.before, after, ...d }, time: o.elapsedMs > 0 ? { ms: o.elapsedMs, record, best: prevBest } : null,
      starDelay: tm.starAt - tm.end, starStep: tm.starStep, onRetry: o.onRetry, next: o.next,
      onClose: () => { bar.classList.add('show'); },
    });
  };
  setTimeout(() => { open(); o.onPeak && o.onPeak(ratio); }, openAt);
  badgePopup(d.newBadges, openAt / 1000 + 1.4);

  const stars = '★'.repeat(Math.round(o.score)) + '☆'.repeat(5 - Math.round(o.score));
  const bar = h('section', { class: 'result-bar' + (ratio === 1 ? ' perfect' : ratio >= 0.6 ? ' good' : ' low'), 'aria-label': 'Résultat' },
    h('div', { class: 'rb-score' }, h('b', null, fmt(o.score)), h('small', null, '/5'), h('span', { class: 'rb-stars', 'aria-hidden': 'true' }, stars)),
    h('div', { class: 'rb-text' }, h('b', null, MSG(ratio)), h('small', null, `${o.res.items.filter((x) => !x.info && x.ok).length} juste(s) · ${o.res.items.filter((x) => !x.info && !x.ok).length} à revoir · +${d.xpGain} XP${o.elapsedMs > 0 ? ' · ⏱ ' + fmtTime(o.elapsedMs) : ''}`)),
    h('div', { class: 'row' },
      h('button', { type: 'button', class: 'btn small', onclick: () => open() }, '🔎 Revoir la correction'),
      h('button', { type: 'button', class: 'btn small', onclick: () => o.onRetry && o.onRetry() }, '↻ Réessayer'),
      o.next ? h('a', { class: 'btn primary small', href: o.next.href }, o.next.label) : null));
  return bar;
}

/** Chronomètre affiché pendant l'activité. */
export function makeChrono() {
  const el = h('span', { class: 'chrono', role: 'timer', 'aria-label': 'Temps passé' }, '⏱ 0:00');
  let t0 = performance.now(), stopped = null, id = null;
  const paint = () => { el.textContent = '⏱ ' + fmtTime((stopped ?? performance.now()) - t0); };
  const tick = () => { if (!el.isConnected && id) { clearInterval(id); id = null; return; } paint(); };
  return {
    el,
    start() { t0 = performance.now(); stopped = null; paint(); if (!id) id = setInterval(tick, 500); },
    stop() { stopped = performance.now(); paint(); return stopped - t0; },
  };
}
