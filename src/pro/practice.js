import { h } from '../utils/dom.js';
import { cardsOf } from './engine.js';
import { quizGame, sortGame } from '../games/basic.js';
import { officeArt } from './visuals.js';
import { semanticIcon } from '../utils/semantic-icons.js';

export function practiceData(cards, mode, part) {
  const chosen = cards.slice(0, 4);
  if (mode === 'sort') return { visualPart: part, cats: ['Réponse correcte', 'Réponse incorrecte'],
    items: chosen.flatMap(c => [[`${c.q} → ${c.answer}`, 0, c.why], [`${c.q} → ${c.wrong[0]}`, 1, `Réponse attendue : ${c.answer}. ${c.why}`]]) };
  return { visualPart: part, qs: chosen.map((c, i) => {
    if (mode === 'tf') {
      const truth = i % 2 === 0;
      return [`${c.q}\nProposition : ${truth ? c.answer : c.wrong[0]}`, truth ? ['Vrai', 'Faux'] : ['Faux', 'Vrai'], `Réponse attendue : ${c.answer}. ${c.why}`];
    }
    if (mode === 'false') return [`Trouve la réponse fausse pour cette question : ${c.q}`, [c.wrong[0], c.answer], `Réponse correcte : ${c.answer}. ${c.why}`];
    return [c.q, [c.answer, ...c.wrong], c.why];
  }) };
}

export function visualPractice(act, session) {
  const cards = cardsOf(session).filter(c => c.actId === act.id);
  const panel = h('details', { class: 'card office-practice' },
    h('summary', null, 'Entraînement visuel · الصحيح والخطأ والتصنيف'),
    h('p', { class: 'muted' }, 'Entraîne-toi librement, puis réalise l’activité notée. Ces essais ne changent pas ton score.'),
    h('p', { class: 'muted' }, 'Les images sont des repères de concepts ; lis les propositions pour décider.'));
  if (!cards.length) return panel;
  const stage = h('div', { class: 'office-practice-stage' });
  const feedback = h('div', { 'aria-live': 'polite' });
  let engine;
  const modes = [['good', 'Choisir la bonne réponse'], ['false', 'Trouver la réponse fausse'], ['tf', 'Vrai ou faux'], ['sort', 'Classer · glisser-déposer']];
  const buttons = modes.map(([mode, label]) => h('button', { type: 'button', class: 'btn ghost small', 'aria-pressed': 'false', onclick: () => show(mode) }, semanticIcon('', { kind: { good: 'check', false: 'cross', tf: 'help', sort: 'sort' }[mode] }), label));
  const check = h('button', { type: 'button', class: 'btn primary small', onclick: () => {
    const result = engine.check();
    if (result.unanswered) { feedback.textContent = 'Complète toutes les réponses avant de corriger.'; return; }
    engine.reveal?.(result); stage.inert = true; check.disabled = true;
    feedback.replaceChildren(h('p', null, `${result.correct}/${result.total} réponses correctes`), h('ul', null, result.items.map(item => h('li', null, `${item.ok ? '✔' : '✖'} ${item.msg}`))));
  } }, 'Corriger cet entraînement');
  function show(mode) {
    stage.replaceChildren(); stage.inert = false; feedback.replaceChildren(); check.disabled = false;
    buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(modes[i][0] === mode)));
    engine = (mode === 'sort' ? sortGame : quizGame)(stage, practiceData(cards, mode, session.part));
  }
  panel.append(h('div', { class: 'row', role: 'group', 'aria-label': 'Mode d’entraînement' }, buttons), stage, check, feedback);
  // Defer rendering until the learner opens the optional panel.
  panel.addEventListener('toggle', () => { if (panel.open && !engine) show('good'); });
  return panel;
}

export function activityVisual(act, session) {
  return h('figure', { class: 'office-activity-visual' }, officeArt(act.title, session.part),
    h('figcaption', null, h('b', null, act.title), h('span', null, act.objective)));
}
