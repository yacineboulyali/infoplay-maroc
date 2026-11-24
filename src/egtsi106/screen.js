import { uiIcon } from '../utils/ui-icon.js';
import { moduleIcon } from '../utils/module-icon.js';
import { h, norm } from '../utils/dom.js';
import { engineOf } from '../games/index.js';
import { activities, title, topics, ports, portPictures } from '../data/egtsi106/lesson.js';

import { partOneSessions } from '../data/egtsi106/part-one.js';

import { lessonPlans, organizeLessons } from '../data/egtsi106/lesson-plans.js';

import { conceptVisual, registerConceptImages } from './visuals.js';
import { mechanicIcon } from '../utils/semantic-icons.js';
import { MASTERY } from '../pro/engine.js';
import { STUDENT_ILLUSTRATIONS } from '../data/student-illustrations.js';

const courses = [
  organizeLessons(topics, activities, lessonPlans[0]),
  ...partOneSessions.map((session, i) => organizeLessons(session.topics, session.activities, lessonPlans[i + 1])),
];

// Une notion garde la même image partout dans le parcours (ex. « CPU » = image de « Processeur (CPU) »).
registerConceptImages(courses.flatMap((c) => c.lessons.flatMap((l) => l.entries.map(([term, , source]) => [term, source]))));

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
const MECH_ICON = { 'type-name': 'fill', tf: 'quiz' };
const lessonHref = (session, k) => sessionHref(session) + '/lecon/' + k;

// ---------- Progression locale (par profil) : scores des activités et notions comprises ----------
let PID = 'invite';
const storeKey = () => 'ip-egtsi106-' + PID;
function loadProgress() {
  try { const p = JSON.parse(localStorage.getItem(storeKey())); if (p && p.acts && p.read) return p; } catch { /* stockage indisponible */ }
  return { acts: {}, read: {} };
}
function saveProgress(p) { try { localStorage.setItem(storeKey(), JSON.stringify(p)); } catch { /* stockage indisponible */ } }
const sid = (session) => (session ? session.id : '1');
const actKey = (session, i) => 's' + sid(session) + '-a' + (i + 1);
const readKey = (session, k) => 's' + sid(session) + '-l' + k;
function recordResult(session, i, ratio) {
  const p = loadProgress(); const k = actKey(session, i);
  if (!(k in p.acts) || ratio > p.acts[k]) { p.acts[k] = ratio; saveProgress(p); }
}
// Niveau de maîtrise d'une leçon, mêmes repères que le M205 (0 à découvrir … 3 maîtrisée).
function lessonLevel(l, session, k, p = loadProgress()) {
  const scores = l.indices.map((i) => p.acts[actKey(session, i)]).filter((v) => v != null);
  if (!scores.length) return (p.read[readKey(session, k)] || []).length ? 1 : 0;
  if (scores.length < l.indices.length) return 1;
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  return avg >= 0.8 ? 3 : 2;
}

// ---------- Carte d'activité : clairement une activité, avec son type, son titre et son état ----------
function activityTile(course, session, i, order, p = loadProgress()) {
  const a = course.activities[i]; const score = p.acts[actKey(session, i)];
  const done = score != null; const pct = done ? Math.round(score * 100) : 0;
  return h('a', { class: 'egtsi-act' + (done ? ' done' : ''), href: href(i, session), 'aria-label': `Activité ${order + 1} : ${a.title}. ${KIND[a.mech] || 'Activité'}. ${done ? 'Réussie à ' + pct + ' %' : 'Pas encore faite'}` },
    h('span', { class: 'egtsi-act-top' },
      h('span', { class: 'egtsi-act-ico', 'aria-hidden': 'true' }, mechanicIcon(MECH_ICON[a.mech] || a.mech)),
      h('span', { class: 'egtsi-act-num' }, 'Activité ' + (order + 1)),
      h('span', { class: 'egtsi-act-kind' }, KIND[a.mech] || 'Activité')),
    h('span', { class: 'egtsi-act-title' }, a.title),
    h('span', { class: 'egtsi-act-goal' }, a.objective),
    h('span', { class: 'egtsi-act-foot' },
      h('span', { class: 'egtsi-act-state' }, done ? (pct >= 80 ? '✓ Réussie · ' : '◐ À consolider · ') + pct + ' %' : '○ À faire · ~5 min'),
      h('span', { class: 'egtsi-act-go', 'aria-hidden': 'true' }, done ? 'Refaire ↻' : 'Commencer ▶')));
}

function bar(value, max, label) {
  const pct = max ? Math.round((value / max) * 100) : 0;
  return h('span', { class: 'egtsi-bar', role: 'progressbar', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-label': label }, h('i', { style: `width:${pct}%` }));
}

const MISSION_1 = { who: 'Préparer un poste pour le service administratif', text: 'Dans une PME, tu dois préparer un poste de travail et expliquer à l’équipe comment le matériel, les logiciels et les périphériques fonctionnent ensemble.' };

// ---------- Page d'une séance : sommaire des leçons, puis chaque leçon (cours) suivie de ses activités ----------
function sessionPage(i) {
  const x = SESSIONS[i]; const course = courses[i]; const session = x.session; const p = loadProgress();
  const mission = session ? { who: 'Mission du service', text: session.mission } : MISSION_1;
  const following = SESSIONS[i + 1];
  const doneActs = course.activities.filter((_, ai) => p.acts[actKey(session, ai)] != null).length;
  const firstTodo = course.lessons.flatMap((l) => l.indices).find((ai) => p.acts[actKey(session, ai)] == null) ?? course.lessons[0].indices[0];
  return h('main', { id: 'main', class: 'egtsi-page egtsi-session' },
    crumbs(['📖', 'Séance ' + x.id]),
    h('h1', { tabindex: '-1' }, 'Séance ' + x.id + ' — ' + x.title),
    h('section', { class: 'mission-brief' },
      moduleIcon('egtsi106-s' + (i + 1), ICONS[i] || '📘', 'mb-ava'),
      h('div', null, h('p', { class: 'eyebrow' }, 'Mission · situation professionnelle'), h('b', null, mission.who), h('p', null, mission.text))),
    h('section', { class: 'egtsi-overview card' },
      h('div', { class: 'egtsi-overview-head' },
        h('div', null, h('b', null, `${doneActs} / ${course.activities.length} activités faites`), h('small', { class: 'muted' }, ` · ${course.lessons.length} leçons · 2 h`)),
        button(href(firstTodo, session), doneActs ? '▶ Reprendre' : '▶ Commencer la séance', true)),
      bar(doneActs, course.activities.length, 'Progression de la séance'),
      h('nav', { class: 'egtsi-toc', 'aria-label': 'Sommaire des leçons' }, h('ol', null, course.lessons.map((l, k) => {
        const lv = lessonLevel(l, session, k + 1, p);
        return h('li', null, h('a', { href: '#egtsi-l' + (k + 1), class: 'lv' + lv, onclick: (e) => { e.preventDefault(); const t = document.getElementById('egtsi-l' + (k + 1)); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); t.focus({ preventScroll: true }); } },
          h('span', { class: 'egtsi-toc-n', 'aria-hidden': 'true' }, lv === 3 ? '✓' : k + 1), h('span', null, l.title)));
      })))),
    course.lessons.map((l, k) => {
      const lv = lessonLevel(l, session, k + 1, p);
      const done = l.indices.filter((ai) => p.acts[actKey(session, ai)] != null).length;
      return h('section', { class: 'egtsi-lesson-block lv' + lv, id: 'egtsi-l' + (k + 1), tabindex: '-1', 'aria-labelledby': 'egtsi-l' + (k + 1) + '-t' },
        h('header', { class: 'egtsi-lesson-head' },
          h('span', { class: 'egtsi-lesson-thumb' }, picture(l.image) || visual(l.title)),
          h('div', { class: 'egtsi-lesson-meta' },
            h('p', { class: 'egtsi-kicker' }, '📘 Leçon ' + (k + 1) + ' · Cours'),
            h('h2', { id: 'egtsi-l' + (k + 1) + '-t' }, l.title),
            h('p', { class: 'egtsi-lesson-sub' }, `${l.entries.length} notions · ${l.indices.length} activités · ${MASTERY[lv].icon} ${MASTERY[lv].label}`),
            bar(done, l.indices.length, 'Activités faites dans la leçon ' + (k + 1))),
          h('a', { class: 'btn egtsi-read', href: lessonHref(session, k + 1) }, 'Lire le cours →')),
        h('ul', { class: 'egtsi-notions', 'aria-label': 'Mots clés de la leçon' }, l.terms.map(([term]) => h('li', null, term))),
        h('p', { class: 'egtsi-acts-label' }, '🎯 Activités de la leçon'),
        h('div', { class: 'egtsi-acts' }, l.indices.map((ai, order) => activityTile(course, session, ai, order, p))));
    }),
    !session ? practicalWork() : null,
    h('div', { class: 'row', style: 'margin-top:1.4rem' },
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

// ---------- Page d'une leçon : 1) mots clés à retourner, 2) cours détaillé à cocher, 3) activités ----------
function lessonPage(i, k) {
  const x = SESSIONS[i]; const course = courses[i]; const session = x.session; const l = course.lessons[k - 1];
  const p = loadProgress(); const rk = readKey(session, k);
  const read = new Set(p.read[rk] || []);
  const total = l.entries.length;
  const count = h('b', null, `${read.size} / ${total}`);
  const meter = bar(read.size, total, 'Notions comprises');
  const refresh = () => {
    count.textContent = `${read.size} / ${total}`;
    const pct = Math.round((read.size / total) * 100); meter.setAttribute('aria-valuenow', pct); meter.firstChild.style.width = pct + '%';
    const q = loadProgress(); q.read[rk] = [...read]; saveProgress(q);
    cheer.hidden = read.size !== total;
  };
  const cheer = h('p', { class: 'egtsi-cheer', role: 'status', hidden: read.size !== total }, '🎉 Toutes les notions sont comprises : passe aux activités !');

  const flip = ([term, clue]) => {
    const card = h('button', { type: 'button', class: 'egtsi-flip', 'aria-pressed': 'false', 'aria-label': `${term} : retourner la carte pour voir la définition`,
      onclick: () => { const on = card.getAttribute('aria-pressed') !== 'true'; card.setAttribute('aria-pressed', String(on)); } },
    h('span', { class: 'egtsi-flip-in' },
      h('span', { class: 'egtsi-flip-face front' }, visual(term), h('b', null, term), h('small', null, 'Retourner ↻')),
      h('span', { class: 'egtsi-flip-face back' }, h('b', null, term), h('span', null, clue))));
    return card;
  };

  const fact = ([term, text, source], n) => {
    const toggle = h('button', { type: 'button', class: 'egtsi-got', 'aria-pressed': String(read.has(n)),
      onclick: () => { if (read.has(n)) read.delete(n); else read.add(n); const on = read.has(n); toggle.setAttribute('aria-pressed', String(on)); item.classList.toggle('got', on); toggle.lastChild.textContent = on ? 'Compris' : 'J’ai compris'; refresh(); } },
    h('span', { 'aria-hidden': 'true' }, '✓'), h('span', null, read.has(n) ? 'Compris' : 'J’ai compris'));
    const item = h('li', { class: 'egtsi-fact' + (read.has(n) ? ' got' : '') },
      h('span', { class: 'egtsi-fact-visual' }, visual(term, source)),
      h('div', { class: 'egtsi-fact-body' }, h('h4', null, term), h('p', null, text)),
      toggle);
    return item;
  };

  return h('main', { id: 'main', class: 'egtsi-page egtsi-lesson-page' },
    crumbs(['📖', 'Séance ' + x.id, sessionHref(session)], ['📘', 'Leçon ' + k]),
    h('header', { class: 'egtsi-lesson-hero card' },
      h('div', { class: 'egtsi-lesson-hero-text' },
        h('p', { class: 'egtsi-kicker' }, `📘 Cours · Leçon ${k} sur ${course.lessons.length} · Séance ${x.id}`),
        h('h1', { tabindex: '-1' }, l.title),
        h('p', { class: 'muted' }, `≈ ${Math.max(5, Math.round(total * 1.2))} min de lecture · ${total} notions · ${l.indices.length} activités`),
        h('div', { class: 'egtsi-read-meter' }, h('span', null, 'Notions comprises : ', count), meter)),
      picture(l.image, '', 'egtsi-lesson-cover'),
      h('nav', { class: 'egtsi-steps', 'aria-label': 'Leçons de la séance' }, course.lessons.map((ll, n) => {
        const lv = lessonLevel(ll, session, n + 1, p);
        return h('a', { href: lessonHref(session, n + 1), class: 'lv' + lv + (n + 1 === k ? ' cur' : ''), 'aria-current': n + 1 === k ? 'page' : null, title: ll.title, 'aria-label': `Leçon ${n + 1} : ${ll.title}` }, lv === 3 ? '✓' : String(n + 1));
      }))),
    h('section', { class: 'egtsi-course', 'aria-labelledby': 'egtsi-keys' },
      h('h2', { id: 'egtsi-keys' }, h('span', { class: 'egtsi-step-n' }, '1'), 'Les mots clés'),
      h('p', { class: 'muted' }, 'Clique sur une carte pour voir sa définition, puis essaie de la retrouver de mémoire.'),
      h('div', { class: 'egtsi-flips' }, l.terms.map(flip))),
    h('section', { class: 'egtsi-course', 'aria-labelledby': 'egtsi-detail' },
      h('h2', { id: 'egtsi-detail' }, h('span', { class: 'egtsi-step-n' }, '2'), 'Le cours en détail'),
      h('p', { class: 'muted' }, 'Lis chaque notion et coche « J’ai compris » quand tu sais l’expliquer avec tes mots.'),
      h('ol', { class: 'egtsi-facts-list' }, l.entries.map(fact)),
      i === 0 && k === 4 ? h('div', { class: 'egtsi-ports' }, ports.map(([name], n) =>
        h('figure', null, picture(portPictures[n]), h('figcaption', null, name)))) : null,
      cheer),
    h('section', { class: 'egtsi-practice-zone', 'aria-labelledby': 'egtsi-acts' },
      h('h2', { id: 'egtsi-acts' }, h('span', { class: 'egtsi-step-n' }, '3'), 'À toi de jouer : les activités'),
      h('div', { class: 'egtsi-acts' }, l.indices.map((ai, order) => activityTile(course, session, ai, order, p)))),
    h('nav', { class: 'egtsi-pager', 'aria-label': 'Leçon précédente ou suivante' },
      k > 1 ? button(lessonHref(session, k - 1), '← Leçon ' + (k - 1)) : button(sessionHref(session), '← Séance ' + x.id),
      k < course.lessons.length ? button(lessonHref(session, k + 1), 'Leçon ' + (k + 1) + ' →', true) : button(sessionHref(session), 'Terminer la séance ✓', true)));
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
      categoryPicture: (category) => visual(category),
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
    if (result.total) recordResult(session, index, result.correct / result.total);
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
  const p = loadProgress();
  const nLessons = courses.reduce((n, c) => n + c.lessons.length, 0);
  const nActs = courses.reduce((n, c) => n + c.activities.length, 0);
  return h('main', { id: 'main', class: 'pro-page egtsi-hub' },
    h('nav', { class: 'crumbs chev', 'aria-label': 'Fil d’Ariane' }, h('ol', null,
      h('li', { class: 'chev-step s1' }, h('a', { href: '#/profils' }, h('span', { class: 'chev-ico', 'aria-hidden': 'true' }, '🏠'), h('span', { class: 'chev-txt' }, 'Accueil'))),
      h('li', { class: 'chev-step s2 cur', 'aria-current': 'page' }, h('span', null, h('span', { class: 'chev-ico', 'aria-hidden': 'true' }, '🖥️'), h('span', { class: 'chev-txt' }, 'EGTSI106 Culture et techniques du numérique'))))),
    h('section', { class: 'pro-hero' },
      h('div', { class: 'pro-hero-main' },
        h('p', { class: 'eyebrow' }, 'OFPPT · EGTSI106 · Partie 1 · ' + SESSIONS.length + ' séances × 2 h'),
        h('h1', { tabindex: '-1', class: 'module-heading' }, moduleIcon('egtsi106', '🖥️', 'module-heading-icon'), h('span', null, 'Culture et techniques du numérique')),
        h('p', { class: 'pro-story' }, 'Choisis une séance, puis une leçon : chaque leçon contient son cours illustré et ses activités de mise en pratique.'),
        h('div', { class: 'row' }, button(sessionHref(null), '▶ Commencer : Séance 1', true))),
      h('div', { class: 'pro-kpis' },
        h('div', { class: 'kpi' }, h('b', null, SESSIONS.length), h('span', null, 'séances')),
        h('div', { class: 'kpi' }, h('b', null, nLessons), h('span', null, 'leçons')),
        h('div', { class: 'kpi' }, h('b', null, nActs), h('span', null, 'activités')),
        h('div', { class: 'kpi' }, h('b', null, '6 h'), h('span', null, 'de formation')))),
    h('section', { class: 'pro-map' },
      h('h2', { class: 'section-h module-heading' }, uiIcon('tool-carte', '🗺️', { size: 28 }), h('span', null, 'Carte des compétences')),
      h('p', { class: 'muted legend' }, MASTERY.slice(0, 4).map((m) => h('span', null, m.icon + ' ' + m.label))),
      h('div', { class: 'pro-parts' }, SESSIONS.map((x, i) => {
        const course = courses[i];
        return h('section', { class: 'card pro-part egtsi-part' },
          picture(course.lessons[0].image, '', 'egtsi-part-art'),
          h('header', null,
            moduleIcon('egtsi106-s' + (i + 1), ICONS[i] || '📘'),
            h('div', null, h('h3', null, h('a', { href: sessionHref(x.session) }, 'Séance 0' + x.id + ' · ' + x.title)), h('small', { class: 'muted' }, course.lessons.length + ' leçons · ' + course.activities.length + ' activités')),
            (() => { const cert = course.lessons.every((l, k) => lessonLevel(l, x.session, k + 1, p) === 3); return h('span', { class: 'pill' + (cert ? ' done' : ''), title: 'Réussis toutes les activités de la séance avec au moins 80 %' }, cert ? '🎓 Certificat' : '🔒 Certificat'); })()),
          h('ol', { class: 'pp-nodes' }, course.lessons.map((l, k) => { const lv = lessonLevel(l, x.session, k + 1, p); return h('li', null,
            h('a', { class: 'pp-node lv' + lv, href: lessonHref(x.session, k + 1), title: MASTERY[lv].label },
              h('span', { class: 'pp-n', 'aria-hidden': 'true' }, MASTERY[lv].icon),
              h('span', { class: 'pp-t' }, h('b', null, 'L' + (k + 1)), ' ', l.title),
              h('small', null, l.indices.length + ' act.'))); })));
      }))));
}

export function egtsiScreen(route, profileId) {
  PID = profileId || 'invite';
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
