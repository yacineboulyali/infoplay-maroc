import { h, norm } from '../utils/dom.js';
import { arHint } from '../i18n/arhint.js';
import { engineOf } from '../games/index.js';
import { activities, title, topics, ports, portPictures } from '../data/egtsi106/lesson.js';

import { partOneSessions } from '../data/egtsi106/part-one.js';

import { lessonPlans, organizeLessons } from '../data/egtsi106/lesson-plans.js';

import { conceptVisual } from './visuals.js';
import { MASTERY } from '../pro/engine.js';
import { STUDENT_ILLUSTRATIONS } from '../data/student-illustrations.js';

const courses = [
  organizeLessons(topics, activities, lessonPlans[0]),
  ...partOneSessions.map((session, i) => organizeLessons(session.topics, session.activities, lessonPlans[i + 1])),
];

const base = '#/egtsi106';
// La séance 1 (sans entrée dans partOneSessions) vit désormais sous #/egtsi106/seance/1 ; #/egtsi106 est l'accueil du parcours.
const sessionHref = (session) => base + '/seance/' + (session ? session.id : '1');
const href = (index, session) => sessionHref(session) + '/activite/' + (index + 1);
const SESSIONS = [{ id: '1', title: 'Fondamentaux du digital', session: null }, ...partOneSessions.map((x) => ({ id: x.id, title: x.title, session: x }))];
const ICONS = ['💡', '🔌', '🪟'];
const button = (url, label, primary = false) => h('a', { class: 'btn' + (primary ? ' primary' : ''), href: url }, label);

function picture(source, label = '', className = '') {
  if (!source) return null;
  if (source.startsWith('sprite-')) {
    return h('span', { class: 'egtsi-picture ' + source + ' ' + className, role: label ? 'img' : null,
      'aria-label': label || null, 'aria-hidden': label ? null : 'true' });
  }
  return h('img', { class: 'egtsi-picture ' + className, src: source, alt: label, loading: 'lazy', decoding: 'async', draggable: 'false' });
}

const visual = (label, source) => conceptVisual(label, picture, source);

function heading(title, eyebrow, text) {
  return h('section', { class: 'egtsi-hero' },
    h('p', { class: 'eyebrow' }, eyebrow),
    h('h1', { tabindex: '-1' }, title),
    h('p', null, text));
}

// Fil d'Ariane en chevrons, identique à celui du M205.
function crumbs(...steps) {
  const all = [['🏠', 'Accueil', '#/profils'], ['🖥️', 'EGTSI106', base], ...steps];
  return h('nav', { class: 'crumbs chev', 'aria-label': 'Fil d’Ariane' }, h('ol', null, all.map(([icon, label, url], i) =>
    h('li', { class: 'chev-step s' + Math.min(i + 1, 4) + (url ? '' : ' cur'), 'aria-current': url ? null : 'page' },
      h(url ? 'a' : 'span', url ? { href: url } : null, h('span', { class: 'chev-ico', 'aria-hidden': 'true' }, icon), h('span', { class: 'chev-txt' }, label))))));
}

const KIND = { 'type-name': 'Écrire', match: 'Associer', sort: 'Classer', order: 'Ordonner', fill: 'Compléter', quiz: 'Questions', hot: 'Repérer', asm: 'Assembler', net: 'Relier', sim: 'Simulation', tf: 'Vrai ou faux' };
const lessonHref = (session, k) => sessionHref(session) + '/lecon/' + k;

// Carte d'activité, même format que les tuiles des séances du M205.
function activityTile(course, session, i, order) {
  const a = course.activities[i];
  return h('a', { class: 'card act-tile egtsi-tile', href: href(i, session), style: 'text-decoration:none;color:inherit' },
    h('span', { class: 'egtsi-tile-art' }, visual(a.title, null)),
    h('div', { class: 'row', style: 'justify-content:space-between' },
      h('span', { class: 'pill' }, (order + 1) + '. ' + (KIND[a.mech] || 'Activité')),
      h('span', { class: 'pill' }, '~5 min')),
    h('h3', { style: 'margin-top:.5rem' }, a.title),
    h('p', { class: 'muted', style: 'margin:0' }, a.objective));
}

const MISSION_1 = { who: 'Préparer un poste pour le service administratif', text: 'Dans une PME, tu dois préparer un poste de travail et expliquer à l’équipe comment le matériel, les logiciels et les périphériques fonctionnent ensemble.' };

// Page d'une séance : mission, notions, puis les activités en tuiles, rangées par leçon.
function sessionPage(i) {
  const x = SESSIONS[i]; const course = courses[i]; const session = x.session;
  const mission = session ? { who: 'Mission du service', text: session.mission } : MISSION_1;
  const following = SESSIONS[i + 1];
  return h('main', { id: 'main', class: 'egtsi-page egtsi-session' },
    crumbs(['📖', 'Séance ' + x.id]),
    h('h1', { tabindex: '-1' }, 'Séance ' + x.id + ' — ' + x.title),
    h('section', { class: 'mission-brief' },
      h('span', { class: 'mb-ava', 'aria-hidden': 'true' }, ICONS[i] || '📘'),
      h('div', null, h('p', { class: 'eyebrow' }, 'Mission · situation professionnelle'), h('b', null, mission.who), h('p', null, mission.text))),
    h('p', null, h('b', null, 'Notions : '), course.lessons.map((l) => l.title).join(', '), '.'),
    h('p', { class: 'muted' }, course.lessons.length + ' leçons · ' + course.activities.length + ' activités interactives · 2 h'),
    course.lessons.map((l, k) => h('section', { class: 'egtsi-group' },
      h('div', { class: 'egtsi-group-head' },
        h('h2', { class: 'section-h' }, 'Leçon ' + (k + 1) + ' · ' + l.title),
        h('a', { class: 'btn small', href: lessonHref(session, k + 1) }, '📖 Voir le cours')),
      h('div', { class: 'grid g2' }, l.indices.map((ai, order) => activityTile(course, session, ai, order))))),
    !session ? practicalWork() : null,
    h('div', { class: 'row', style: 'margin-top:1.2rem' },
      button(href(course.lessons[0].indices[0], session), '▶ Commencer la séance', true),
      following ? button(sessionHref(following.session), 'Séance suivante →') : button(base, '← Retour au parcours')));
}

// TP guidé et points clés de la séance 1.
function practicalWork() {
  return [
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
    h('section', { class: 'card retenir' },
      h('h2', null, '📌 À retenir'),
      h('ul', null,
        h('li', null, 'Un poste informatique associe du matériel et des logiciels.'),
        h('li', null, 'Le CPU traite les données, la RAM les conserve temporairement et le SSD ou HDD les conserve durablement.'),
        h('li', null, 'Les périphériques saisissent et restituent les données. Les connectiques les relient au poste.'),
        h('li', null, 'Le réseau facilite la communication et le partage de ressources.')),
      h('p', { class: 'muted' }, 'Pour aller plus loin, consulte la partie 1 du guide OFPPT « Culture et techniques du numérique ».')),
  ];
}

// Page d'une leçon : le cours illustré, puis ses activités en tuiles.
function lessonPage(i, k) {
  const x = SESSIONS[i]; const course = courses[i]; const session = x.session; const l = course.lessons[k - 1];
  return h('main', { id: 'main', class: 'egtsi-page egtsi-lesson-page' },
    crumbs(['📖', 'Séance ' + x.id, sessionHref(session)], ['📘', 'Leçon ' + k]),
    h('h1', { tabindex: '-1' }, 'Leçon ' + k + ' — ' + l.title),
    i === 0 && k === 1 ? arHint('تعرّف على مكوّنات الحاسوب، الدور ديال كل واحد وكيفاش تربط الأجهزة.') : null,
    h('article', { class: 'card egtsi-section egtsi-lesson' },
      h('figure', { class: 'egtsi-lesson-visual' },
        picture(l.image),
        h('dl', { class: 'egtsi-visual-terms' }, l.terms.map(([term, clue]) =>
          h('div', null, visual(term), h('dt', null, term), h('dd', null, clue))))),
      h('details', { open: true },
        h('summary', null, 'Explications du cours'),
        h('dl', { class: 'egtsi-facts' }, l.entries.map(([term, text, source]) =>
          h('div', null, visual(term, source), h('dt', null, term), h('dd', null, text)))),
        i === 0 && k === 4 ? h('div', { class: 'egtsi-ports' }, ports.map(([name], p) =>
          h('figure', null, picture(portPictures[p]), h('figcaption', null, name)))) : null)),
    h('h2', { class: 'section-h' }, 'Activités de la leçon'),
    h('div', { class: 'grid g2' }, l.indices.map((ai, order) => activityTile(course, session, ai, order))),
    h('div', { class: 'row', style: 'margin-top:1.2rem' },
      button(href(l.indices[0], session), '▶ Commencer les activités', true),
      k > 1 ? button(lessonHref(session, k - 1), '← Leçon précédente') : null,
      k < course.lessons.length ? button(lessonHref(session, k + 1), 'Leçon suivante →') : button(sessionHref(session), '← Retour à la séance')));
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
    const items = data.pairs || data.items || data.steps || data.qs || data.lines || data.tasks || data.prompts || data.terms || [];
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
        return visual(safeText, activity.pictures?.[i] || original);
      },
      answerPicture: (i) => data.pairs && visual(data.pairs[i][1], activity.answers?.[i]),
      optionPicture: (i, k) => visual(data.qs[i][1][k], null),
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
      button(next != null ? href(next, session) : followingLesson ? lessonHref(session, lessonNumber + 2) : courseUrl,
        next != null ? 'Activité suivante →' : followingLesson ? 'Leçon suivante →' : 'Revenir à la séance →', true));
    score.focus();
  }

  const view = h('main', { id: 'main', class: 'egtsi-page egtsi-practice' },
    crumbs(['📖', 'Séance ' + (session?.id || '1'), courseUrl], ['📘', 'Leçon ' + (lessonNumber + 1), lessonHref(session, lessonNumber + 1)], ['🎯', 'Activité ' + (position + 1)]),
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

// Accueil du parcours, même présentation que le M205 : héros + une colonne par séance, leçons dessous.
function hub() {
  const nLessons = courses.reduce((n, c) => n + c.lessons.length, 0);
  const nActs = courses.reduce((n, c) => n + c.activities.length, 0);
  return h('main', { id: 'main', class: 'pro-page egtsi-hub' },
    h('nav', { class: 'crumbs chev', 'aria-label': 'Fil d’Ariane' }, h('ol', null,
      h('li', { class: 'chev-step s1' }, h('a', { href: '#/profils' }, h('span', { class: 'chev-ico', 'aria-hidden': 'true' }, '🏠'), h('span', { class: 'chev-txt' }, 'Accueil'))),
      h('li', { class: 'chev-step s2 cur', 'aria-current': 'page' }, h('span', null, h('span', { class: 'chev-ico', 'aria-hidden': 'true' }, '🖥️'), h('span', { class: 'chev-txt' }, 'EGTSI106 Culture et techniques du numérique'))))),
    h('section', { class: 'pro-hero' },
      h('div', { class: 'pro-hero-main' },
        h('p', { class: 'eyebrow' }, 'OFPPT · EGTSI106 · Partie 1 · ' + SESSIONS.length + ' séances × 2 h'),
        h('h1', { tabindex: '-1' }, '🖥️ Culture et techniques du numérique'),
        h('p', { class: 'pro-story' }, 'Choisis une séance, puis une leçon : chaque leçon contient son cours illustré et ses activités de mise en pratique.'),
        h('div', { class: 'row' }, button(sessionHref(null), '▶ Commencer : Séance 1', true))),
      h('div', { class: 'pro-kpis' },
        h('div', { class: 'kpi' }, h('b', null, SESSIONS.length), h('span', null, 'séances')),
        h('div', { class: 'kpi' }, h('b', null, nLessons), h('span', null, 'leçons')),
        h('div', { class: 'kpi' }, h('b', null, nActs), h('span', null, 'activités')),
        h('div', { class: 'kpi' }, h('b', null, '6 h'), h('span', null, 'de formation')))),
    h('section', { class: 'pro-map' },
      h('h2', { class: 'section-h' }, '🗺️ Carte des compétences'),
      h('p', { class: 'muted legend' }, MASTERY.slice(0, 4).map((m) => h('span', null, m.icon + ' ' + m.label))),
      h('div', { class: 'pro-parts' }, SESSIONS.map((x, i) => {
        const course = courses[i];
        return h('section', { class: 'card pro-part egtsi-part' },
          picture(course.lessons[0].image, '', 'egtsi-part-art'),
          h('header', null,
            h('span', { class: 'pp-ico', 'aria-hidden': 'true' }, ICONS[i] || '📘'),
            h('div', null, h('h3', null, h('a', { href: sessionHref(x.session) }, 'Séance 0' + x.id + ' · ' + x.title)), h('small', { class: 'muted' }, course.lessons.length + ' leçons · ' + course.activities.length + ' activités')),
            h('span', { class: 'pill', title: 'Termine toutes les leçons de la séance' }, '🔒 Certificat')),
          h('ol', { class: 'pp-nodes' }, course.lessons.map((l, k) => h('li', null,
            h('a', { class: 'pp-node lv0', href: lessonHref(x.session, k + 1), title: MASTERY[0].label },
              h('span', { class: 'pp-n', 'aria-hidden': 'true' }, MASTERY[0].icon),
              h('span', { class: 'pp-t' }, h('b', null, 'L' + (k + 1)), ' ', l.title),
              h('small', null, l.indices.length + ' act.'))))));
      }))));
}

export function egtsiScreen(route) {
  if (route.length === 1) return hub();
  const first = route[1] === 'seance' && route[2] === '1';
  const session = route[1] === 'seance' && !first ? partOneSessions.find((entry) => entry.id === route[2]) : null;
  if (route[1] === 'seance' && !first && !session) return null;
  if (route[1] === 'seance') {
    const i = first ? 0 : SESSIONS.findIndex((x) => x.session === session);
    // Anciens liens « ?lecon=k » : on ouvre directement la page de la leçon.
    const legacy = Number(new URLSearchParams(globalThis.location?.hash.split('?')[1]).get('lecon'));
    if (route.length === 3) return legacy > 0 && legacy <= courses[i].lessons.length ? lessonPage(i, legacy) : sessionPage(i);
    if (route.length === 5 && route[3] === 'lecon' && /^[1-9]d*$/.test(route[4]) && Number(route[4]) <= courses[i].lessons.length) return lessonPage(i, Number(route[4]));
  }
  const course = courses[session ? Number(session.id) - 1 : 0];
  const offset = route[1] === 'seance' ? 3 : 1;
  const number = route[offset + 1];
  const index = Number(number) - 1;
  if (route.length === offset + 2 && route[offset] === 'activite' && /^[1-9]\d*$/.test(number)
    && course.activities[index]) return practice(index, session, course);
  return null;
}
