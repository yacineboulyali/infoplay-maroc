import { h } from '../utils/dom.js';
import { arHint } from '../i18n/arhint.js';
import { engineOf } from '../games/index.js';
import { activities, activitySequence, title, topics, ports, portPictures } from '../data/egtsi106/lesson.js';

const base = '#/egtsi106';
const href = (index) => base + '/activite/' + (index + 1);
const button = (url, label, primary = false) => h('a', { class: 'btn' + (primary ? ' primary' : ''), href: url }, label);

function picture(source, label = '', className = '') {
  if (!source) return null;
  if (source.startsWith('sprite-')) {
    return h('span', { class: 'egtsi-picture ' + source + ' ' + className, role: label ? 'img' : null,
      'aria-label': label || null, 'aria-hidden': label ? null : 'true' });
  }
  return h('img', { class: 'egtsi-picture ' + className, src: source, alt: label, loading: 'lazy', decoding: 'async', draggable: 'false' });
}

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
    arHint('تعرّف على مكوّنات الحاسوب، الدور ديال كل واحد وكيفاش تربط الأجهزة.'),
    h('section', { class: 'card egtsi-mission' },
      h('p', { class: 'eyebrow' }, 'Situation professionnelle'),
      h('h2', null, 'Préparer un poste pour le service administratif'),
      h('p', null, 'Dans une PME, tu dois préparer un poste de travail et expliquer à l’équipe comment le matériel, les logiciels et les périphériques fonctionnent ensemble.'),
      h('div', { class: 'row' }, button(href(activitySequence[0]), 'Commencer la mise en pratique →', true),
        h('button', { type: 'button', class: 'btn', onclick: () => { const course = document.getElementById('egtsi-cours'); course.focus(); course.scrollIntoView(); } }, 'Consulter le cours'))),
    h('section', { class: 'egtsi-section', 'aria-labelledby': 'egtsi-cours' },
      h('h2', { id: 'egtsi-cours', tabindex: '-1' }, 'Cours complet'),
      topics.map(([name, entries], index) => h('details', { class: 'card egtsi-topic', open: index === 0 },
        h('summary', null, h('span', { class: 'egtsi-number' }, index + 1), name),
        h('dl', { class: 'egtsi-facts' }, entries.map(([term, text, source]) => h('div', null,
          picture(source), h('dt', null, term), h('dd', null, text)))),
        index === 3 ? h('div', { class: 'egtsi-ports' }, ports.map(([name], i) =>
          h('figure', null, picture(portPictures[i]), h('figcaption', null, name)))) : null))),
    h('section', { class: 'egtsi-section', 'aria-labelledby': 'egtsi-exercices' },
      h('h2', { id: 'egtsi-exercices' }, 'Exercices et applications'),
      h('ol', { class: 'egtsi-activities' }, activitySequence.map((i, position) =>
        h('li', null, h('a', { href: href(i), class: 'card egtsi-activity-link' },
          h('span', { class: 'egtsi-number' }, position + 1),
          h('span', null, h('strong', null, activities[i].title), h('span', { class: 'muted' }, activities[i].objective))))))),
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
      h('p', { class: 'muted' }, 'Pour aller plus loin, consulte la partie 1 du guide OFPPT « Culture et techniques du numérique ».')));
}

function practice(index) {
  const activity = activities[index];
  const position = activitySequence.indexOf(index);
  const next = activitySequence[position + 1];
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
    engine = engineOf(activity.mech)(stage, {
      ...activity.data,
      textOnly: true,
      itemPicture: (i) => picture(activity.pictures?.[i], '', 'student-illustration'),
      answerPicture: (i) => picture(activity.answers?.[i], '', 'student-illustration'),
    });
  }

  function verify() {
    const result = engine.check();
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
      button(next == null ? base : href(next),
        next == null ? 'Revenir au cours →' : 'Activité suivante →', true));
    score.focus();
  }

  const view = h('main', { id: 'main', class: 'egtsi-page egtsi-practice' },
    h('p', { class: 'crumbs' }, button(base, '← Cours et activités')),
    heading(activity.title, 'Séance 01 · Activité ' + (position + 1) + ' / ' + activities.length, activity.objective),
    h('nav', { class: 'dots', 'aria-label': 'Activités de la séance' }, activitySequence.map((i, order) =>
      h('a', { href: href(i), class: i === index ? 'cur' : '', 'aria-current': i === index ? 'step' : null, 'aria-label': activities[i].title }, order + 1))),
    stage,
    h('div', { class: 'row activity-actions' }, check, retry),
    feedback);
  reset();
  return view;
}

export function egtsiScreen(route) {
  if (route.length === 1) return lesson();
  const index = Number(route[2]) - 1;
  if (route.length === 3 && route[1] === 'activite' && /^[1-9]\d*$/.test(route[2]) && activities[index]) return practice(index);
  return null;
}
