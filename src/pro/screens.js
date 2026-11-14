import { officeArt } from './visuals.js';
// Écran du parcours M205 : tableau de bord carrière et carte des compétences.
import { h } from '../utils/dom.js';
import { arHint } from '../i18n/arhint.js';
import { PRO, PRO_ACTIVITIES, PRO_PARTS, PRO_POINTS } from '../data/pro/index.js';
import { moduleStats, sessionStats, fmt } from '../scoring/scoring.js';
import { computeGame } from '../fx/game.js';
import { gameHud } from '../fx/popup.js';
import { mastery, MASTERY, proScope, dayStreak } from './engine.js';

const step = (icon, label, href) => h('li', { class: 'chev-step s1' + (href ? '' : ' cur'), 'aria-current': href ? null : 'page' }, h(href ? 'a' : 'span', href ? { href } : null, h('span', { class: 'chev-ico', 'aria-hidden': 'true' }, icon), h('span', { class: 'chev-txt' }, label)));
const crumbs = (...steps) => h('nav', { class: 'crumbs chev', 'aria-label': 'Fil d’Ariane' }, h('ol', null, step('🏠', 'Accueil', '#/profils'), ...steps.map(([icon, label, href], i) => { const li = step(icon, label, href); li.classList.add('s' + Math.min(i + 2, 4)); return li; })));

// ---------- TABLEAU DE BORD M205 ----------
export function proHub({ prof, rec }) {
  const game = computeGame(rec, prof.id, proScope());
  const all = moduleStats(PRO, rec);
  const streak = dayStreak(rec);
  const next = PRO_ACTIVITIES.find((a) => !rec(a.id)?.attempts.length);

  const map = h('section', { class: 'pro-map', 'data-reveal': '' },
    h('h2', { class: 'section-h' }, '🗺️ Carte des compétences'),
    h('p', { class: 'muted legend' }, MASTERY.map((m) => h('span', null, `${m.icon} ${m.label}`))),
    h('div', { class: 'pro-parts' }, PRO_PARTS.map((p) => {
      const ps = moduleStats(p, rec); const cert = ps.n && ps.sessionsDone === p.sessions.length && ps.best / ps.max >= 0.7;
      return h('section', { class: 'card pro-part part-' + p.key },
        officeArt(p.label, p.key),
        h('header', null, h('span', { class: 'pp-ico', 'aria-hidden': 'true' }, p.icon), h('div', null, h('h3', null, p.label), h('small', { class: 'muted' }, `${ps.done}/${ps.n} activités · ${fmt(ps.best)}/${ps.max} pts`)),
          h('span', { class: 'pill ' + (cert ? 'done' : '') , title: cert ? 'Toutes les séances terminées avec au moins 70 %' : 'Termine toutes les séances avec au moins 70 %' }, cert ? '🎓 ' + p.cert : '🔒 Certificat')),
        h('ol', { class: 'pp-nodes' }, p.sessions.map((s) => { const lv = mastery(s, rec); const ss = sessionStats(s, rec);
          return h('li', null, h('a', { class: 'pp-node lv' + lv, href: `#/m/${PRO.id}/s/${s.index}`, title: `${MASTERY[lv].label} · ${fmt(ss.best)}/20` },
            h('span', { class: 'pp-n' }, MASTERY[lv].icon), h('span', { class: 'pp-t' }, h('b', null, `S${s.index}`), ' ', s.title), h('small', null, `${fmt(ss.best)}/20`))); })));
    })));

  const view = h('main', { id: 'main', class: 'pro-page' },
    crumbs(['💼', 'M205 Bureautique avancée']),
    h('section', { class: 'pro-hero', 'data-reveal': '' },
      h('div', { class: 'pro-hero-main' },
        h('p', { class: 'eyebrow' }, 'OFPPT · M205 · 20 séances × 2 h · Formateur : ', PRO.trainer),
        h('h1', { tabindex: '-1' }, '💼 Bureautique avancée', arHint('المكتبيات المتقدمة: وورد، إكسل، باوربوينت، أوتلوك')),
        h('p', { class: 'pro-story' }, `Tu rejoins Atlas Services comme ${game.rank.toLowerCase()}. Chaque séance est une mission confiée par un collègue : réussis-les pour monter en grade jusqu’à « Légende Office ».`),
        gameHud(game),
        h('div', { class: 'row' },
          next ? h('a', { class: 'btn primary', href: `#/m/${PRO.id}/s/${next.sessionIndex}/a/${next.index}` }, `▶ Continuer : S${next.sessionIndex} · ${next.title}`) : h('span', { class: 'pill done' }, '👑 Parcours terminé'))),
      h('div', { class: 'pro-kpis' },
        h('div', { class: 'kpi' }, h('b', null, fmt(all.best)), h('span', null, `pts / ${PRO_POINTS}`)),
        h('div', { class: 'kpi' }, h('b', null, `${all.done}/${all.n}`), h('span', null, 'activités')),
        h('div', { class: 'kpi' + (streak >= 3 ? ' hot' : '') }, h('b', null, `📅 ${streak}`), h('span', null, 'jour(s) d’affilée')),
        h('div', { class: 'kpi' }, h('b', null, `${all.sessionsDone}/20`), h('span', null, 'séances')))),
    map);
  return view;
}
