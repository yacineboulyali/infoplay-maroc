import { h, norm } from '../utils/dom.js';
import { arHint } from '../i18n/arhint.js';
import { engineOf } from '../games/index.js';
import { activities, title, topics, ports, portPictures } from '../data/egtsi106/lesson.js';

import { partOneSessions } from '../data/egtsi106/part-one.js';

import { lessonPlans, organizeLessons } from '../data/egtsi106/lesson-plans.js';

import { conceptVisual } from './visuals.js';
import { STUDENT_ILLUSTRATIONS } from '../data/student-illustrations.js';

const courses = [
  organizeLessons(topics, activities, lessonPlans[0]),
  ...partOneSessions.map((session, i) => organizeLessons(session.topics, session.activities, lessonPlans[i + 1])),
];

const base = '#/egtsi106';
const sessionHref = (session) => session ? base + '/seance/' + session.id : base;
const href = (index, session) => sessionHref(session) + '/activite/' + (index + 1);
const button = (url, label, primary = false) => h('a', { class: 'btn' + (primary ? ' primary' : ''), href: url }, label);

function picture(source, label = '', className = '') {
  if (!source) return null;
  if (source.startsWith('sprite-')) {
    return h('span', { class: 'egtsi-picture ' + source + ' ' + className, role: label ? 'img' : null,
      'aria-label': label || null, 'aria-hidden': label ? null : 'true' });
  }
  return h('img', { class: 'egtsi-picture ' + className, src: source, alt: label, loading: 'lazy', decoding: 'async', draggable: 'false' });
}

const visual = (label, source, context) => conceptVisual(label, picture, source, context);

function heading(title, eyebrow, text) {
  return h('section', { class: 'egtsi-hero' },
    h('p', { class: 'eyebrow' }, eyebrow),
    h('h1', { tabindex: '-1' }, title),
    h('p', null, text));
}

function lesson() {
  return h('main', { id: 'main', class: 'egtsi-page' },
    h('p', { class: 'crumbs' }, button('#/profils', '← Accueil InfoPlay')),
    heading(title, 'OFPPT · EGTSI106 · Séance 01 · 2 h',
      'Reconnaître le matériel et les logiciels, expliquer le fonctionnement du poste et choisir les bons branchements.'),
    partOneNav(),
    arHint('تعرّف على مكوّنات الحاسوب، الدور ديال كل واحد وكيفاش تربط الأجهزة.'),
    h('section', { class: 'card egtsi-mission' },
      h('p', { class: 'eyebrow' }, 'Situation professionnelle'),
      h('h2', null, 'Préparer un poste pour le service administratif'),
      h('p', null, 'Dans une PME, tu dois préparer un poste de travail et expliquer à l’équipe comment le matériel, les logiciels et les périphériques fonctionnent ensemble.'),
      h('div', { class: 'row' }, button(href(courses[0].sequence[0]), 'Commencer la mise en pratique →', true),
        h('button', { type: 'button', class: 'btn', onclick: () => { const course = document.getElementById('egtsi-cours'); course.focus(); course.scrollIntoView(); } }, 'Consulter le cours'))),
    lessonBlocks(courses[0]),
    h('section', { class: 'card egtsi-section' },
      h('p', { class: 'eyebrow' }, 'TP guidé · 15 min · en binôme'),
      h('h2', null, 'Inventorier un poste de travail'),
      h('ol', null,
        h('li', null, 'Identifiez le poste et explorez ses composants avec le formateur.'),
        h('li', null, 'Relevez le matériel, les logiciels utilisés et les périphériques disponibles.'),
        h('li', null, 'Remplissez une fiche avec le nom, le rôle et une caractéristique de chaque élément observé.'),
        h('li', null, 'Présentez votre inventaire au groupe.')),
      h('details', null, h('summary', null, 'Voir un exemple de fiche'),
        h('p', null, 'Clavier — saisir du texte — connexion USB-A. RAM — conserver temporairement les données utilisées — 8 Go si cette capacité est affichée sur le poste. Windows — gérer le matériel et les programmes — système d’exploitation.'))),
    h('section', { class: 'card egtsi-section' },
      h('h2', null, 'À retenir'),
      h('ul', null,
        h('li', null, 'Un poste informatique associe du matériel et des logiciels.'),
        h('li', null, 'Le CPU traite les données, la RAM les conserve temporairement et le SSD ou HDD les conserve durablement.'),
        h('li', null, 'Les périphériques saisissent et restituent les données. Les connectiques les relient au poste.'),
        h('li', null, 'Le réseau facilite la communication et le partage de ressources.')),
      h('p', null, 'Pour préparer la séance 2, révise ces notions et identifie le matériel et les logiciels de ton poste si tu y as accès.'),
      button(sessionHref(partOneSessions[0]), 'Séance suivante →', true),
      h('p', { class: 'muted' }, 'Pour aller plus loin, consulte la partie 1 du guide OFPPT « Culture et techniques du numérique ».')));
}

function partOneNav(active) {
  return h('nav', { class: 'card egtsi-section row', 'aria-label': 'Séances de la partie 1' },
    [null, ...partOneSessions].map((session, i) =>
      h('a', { class: 'btn' + (active === session ? ' primary' : ''), href: sessionHref(session),
        'aria-current': active === session ? 'page' : null },
      'Séance ' + (i + 1) + ' · ' + (session?.title || 'Fondamentaux du digital'))));
}

function additionalLesson(session) {
  const following = partOneSessions[partOneSessions.indexOf(session) + 1];
  return h('main', { id: 'main', class: 'egtsi-page' },
    h('p', { class: 'crumbs' }, button(base, '← EGTSI106')),
    heading(session.title, 'OFPPT · EGTSI106 · Partie 1 · Séance 0' + session.id, session.mission),
    partOneNav(session),
    lessonBlocks(courses[Number(session.id) - 1], session),
    following ? button(sessionHref(following), 'Séance suivante →', true) : null);
}

function lessonBlocks(course, session) {
  const requested = Number(new URLSearchParams(globalThis.location?.hash.split('?')[1]).get('lecon'));
  if (requested > 0 && requested <= course.lessons.length) requestAnimationFrame(() => {
    const target = document.getElementById('egtsi-lecon-' + requested);
    target?.focus();
    target?.scrollIntoView();
  });
  return h('section', { class: 'egtsi-section', 'aria-labelledby': 'egtsi-cours' },
    h('h2', { id: 'egtsi-cours', tabindex: '-1' }, 'Leçons et activités'),
    course.lessons.map((lesson, index) => h('article', { class: 'card egtsi-section egtsi-lesson' },
      h('h3', { id: 'egtsi-lecon-' + (index + 1), tabindex: '-1' }, h('span', { class: 'egtsi-number', 'aria-label': 'Leçon ' + (index + 1) }, index + 1), lesson.title),
      h('figure', { class: 'egtsi-lesson-visual' },
        picture(lesson.image),
        h('dl', { class: 'egtsi-visual-terms' }, lesson.terms.map(([term, clue]) =>
          h('div', null, visual(term), h('dt', null, term), h('dd', null, clue))))),
      h('details', { open: true },
        h('summary', null, 'Explications du cours'),
        h('dl', { class: 'egtsi-facts' }, lesson.entries.map(([term, text, source]) =>
          h('div', null, visual(term, source, lesson.title), h('dt', null, term), h('dd', null, text)))),
        !session && index === 3 ? h('div', { class: 'egtsi-ports' }, ports.map(([name], i) =>
          h('figure', null, picture(portPictures[i]), h('figcaption', null, name)))) : null),
      h('h4', null, 'Activités de la leçon'),
      h('ol', { class: 'egtsi-activities' }, lesson.indices.map((i, order) => {
        const activity = course.activities[i];
        return h('li', null, h('a', { href: href(i, session), class: 'card egtsi-activity-link' },
          h('span', { class: 'egtsi-number' }, order + 1),
          visual(activity.title, null, lesson.title),
          h('span', null, h('strong', null, activity.title), h('span', { class: 'muted' }, activity.objective))));
      })) )));
}

function typeName(root, { terms, itemPicture }) {
  const fields = terms.map(([, clue], i) => {
    const input = h('input', { type: 'text', autocomplete: 'off', spellcheck: 'false' });
    root.append(h('label', { class: 'egtsi-name-field' }, itemPicture(i), h('span', null, (i + 1) + '. ' + clue), input));
    return input;
  });
  const key = (value) => norm(value).replace(/\s*([+.]|’|')\s*/g, '$1');
  return {
    check() {
      const items = terms.map(([name, clue], i) => ({
        ok: key(fields[i].value) === key(name),
        msg: clue + ' → ' + name,
      }));
      return { items, correct: items.filter((item) => item.ok).length,
        total: items.length, unanswered: fields.filter((input) => !input.value.trim()).length };
    },
  };
}

function practice(index, session, course) {
  const available = course.activities;
  const lessonNumber = course.lessons.findIndex((lesson) => lesson.indices.includes(index));
  const lesson = course.lessons[lessonNumber];
  const sequence = lesson.indices;
  const activity = available[index];
  const position = sequence.indexOf(index);
  const next = sequence[position + 1];
  const followingLesson = lessonNumber + 1 < course.lessons.length;
  const courseUrl = sessionHref(session);
  const stage = h('div', { class: 'stage-card' });
  const feedback = h('div', { class: 'egtsi-feedback', 'aria-live': 'polite' });
  const check = h('button', { class: 'btn primary', type: 'button', onclick: verify }, 'Vérifier');
  const retry = h('button', { class: 'btn', type: 'button', onclick: reset }, 'Recommencer');
  let engine;

  function reset() {
    stage.replaceChildren();
    stage.inert = false;
    check.disabled = false;
    feedback.replaceChildren();
    const data = activity.data;
    const items = data.pairs || data.items || data.steps || data.qs || data.lines || data.prompts || data.terms || [];
    const label = (item) => Array.isArray(item) ? item[0] : item;
    engine = (activity.mech === 'type-name' ? typeName : engineOf(activity.mech))(stage, {
      ...data,
      textOnly: true,
      illustrationActivityId: activity.id,
      itemPicture: (i) => {
        const item = items[i];
        if (item == null) return null;
        const original = activity.id && STUDENT_ILLUSTRATIONS[activity.id + '-q' + String(i + 1).padStart(2, '0')];
        const text = activity.mech === 'type-name' || activity.mech === 'hot' ? item[1] : label(item);
        const safeText = String(text).replace(/\[\[.+?\]\]/g, '…');
        return visual(safeText, activity.pictures?.[i] || original, lesson.title);
      },
      answerPicture: (i) => data.pairs && visual(data.pairs[i][1], activity.answers?.[i], lesson.title),
      optionPicture: (i, k) => visual(data.qs[i][1][k], null, lesson.title),
    });
  }

  function verify() {
    const result = engine.check();
    if (result.incomplete) {
      feedback.textContent = result.incomplete;
      return;
    }
    if (result.unanswered) {
      feedback.textContent = 'Complète les ' + result.unanswered + ' réponses restantes avant de vérifier.';
      return;
    }
    engine.reveal?.(result);
    stage.inert = true;
    check.disabled = true;
    const score = h('h2', { tabindex: '-1' }, result.correct + ' / ' + result.total + ' réponses correctes');
    feedback.replaceChildren(score,
      h('details', null, h('summary', null, 'Voir le corrigé expliqué'),
        h('ol', null, result.items.map((item) => h('li', null, (item.ok ? '✓ ' : 'À revoir · ') + item.msg)))),
      button(next != null ? href(next, session) : followingLesson ? courseUrl + '?lecon=' + (lessonNumber + 2) : courseUrl,
        next != null ? 'Activité suivante →' : followingLesson ? 'Leçon suivante →' : 'Revenir au cours →', true));
    score.focus();
  }

  const view = h('main', { id: 'main', class: 'egtsi-page egtsi-practice' },
    h('p', { class: 'crumbs' }, button(courseUrl + '?lecon=' + (lessonNumber + 1), '← Retour à la leçon')),
    heading(activity.title, 'Séance 0' + (session?.id || '1') + ' · Leçon ' + (lessonNumber + 1) + ' · Activité ' + (position + 1) + ' / ' + sequence.length, activity.instructions || activity.objective),
    h('nav', { class: 'dots', 'aria-label': 'Activités de la séance' }, sequence.map((i, order) =>
      h('a', { href: href(i, session), class: i === index ? 'cur' : '', 'aria-current': i === index ? 'step' : null, 'aria-label': available[i].title }, order + 1))),
    h('div', { class: 'egtsi-activity-visual' },
      visual(lesson.title, lesson.image), h('span', null, lesson.title)),
    stage,
    h('div', { class: 'row activity-actions' }, check, retry),
    feedback);
  reset();
  return view;
}

export function egtsiScreen(route) {
  if (route.length === 1) return lesson();
  const session = route[1] === 'seance' ? partOneSessions.find((entry) => entry.id === route[2]) : null;
  if (route[1] === 'seance' && !session) return null;
  if (session && route.length === 3) return additionalLesson(session);
  const course = courses[session ? Number(session.id) - 1 : 0];
  const offset = session ? 3 : 1;
  const number = route[offset + 1];
  const index = Number(number) - 1;
  if (route.length === offset + 2 && route[offset] === 'activite' && /^[1-9]\d*$/.test(number)
    && course.activities[index]) return practice(index, session, course);
  return null;
}
