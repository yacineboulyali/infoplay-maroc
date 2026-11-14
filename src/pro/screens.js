import { officeArt } from './visuals.js';
import { semanticIcon } from '../utils/semantic-icons.js';
// Écrans du parcours M205 : tableau de bord carrière, révision espacée et Défi mixte.
import { h, shuffle, celebrate, reduced } from '../utils/dom.js';
import { arHint } from '../i18n/arhint.js';
import { audio } from '../audio/audio.js';
import { PRO, PRO_ACTIVITIES, PRO_PARTS, PRO_POINTS } from '../data/pro/index.js';
import { moduleStats, sessionStats, fmt } from '../scoring/scoring.js';
import { computeGame } from '../fx/game.js';
import { gameHud } from '../fx/popup.js';
import { dueCards, review, defiDeck, finishDefi, mastery, MASTERY, proScope, dayStreak, BOX_DAYS } from './engine.js';

const kids = (...k) => k.filter((x) => x != null && x !== false); // replaceChildren() écrirait « null »
const step = (icon, label, href) => h('li', { class: 'chev-step s1' + (href ? '' : ' cur'), 'aria-current': href ? null : 'page' }, h(href ? 'a' : 'span', href ? { href } : null, h('span', { class: 'chev-ico', 'aria-hidden': 'true' }, icon), h('span', { class: 'chev-txt' }, label)));
const crumbs = (...steps) => h('nav', { class: 'crumbs chev', 'aria-label': 'Fil d’Ariane' }, h('ol', null, step('🏠', 'Accueil', '#/profils'), ...steps.map(([icon, label, href], i) => { const li = step(icon, label, href); li.classList.add('s' + Math.min(i + 2, 4)); return li; })));

// ---------- TABLEAU DE BORD M205 ----------
export function proHub({ prof, rec }) {
  const scope = proScope(prof.id, rec);
  const game = computeGame(rec, prof.id, scope);
  const all = moduleStats(PRO, rec);
  const due = dueCards(prof.id, rec, { newMax: 8 });
  const streak = dayStreak(prof.id, rec);
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
        h('ol', { class: 'pp-nodes' }, p.sessions.map((s) => { const lv = mastery(s, rec, prof.id); const ss = sessionStats(s, rec);
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
          next ? h('a', { class: 'btn primary', href: `#/m/${PRO.id}/s/${next.sessionIndex}/a/${next.index}` }, `▶ Continuer : S${next.sessionIndex} · ${next.title}`) : h('span', { class: 'pill done' }, '👑 Parcours terminé'),
          h('a', { class: 'btn ghost', href: '#/pro/revision' }, `🧠 Réviser (${due.length})`))),
      h('div', { class: 'pro-kpis' },
        h('div', { class: 'kpi' }, h('b', null, fmt(all.best)), h('span', null, `pts / ${PRO_POINTS}`)),
        h('div', { class: 'kpi' }, h('b', null, `${all.done}/${all.n}`), h('span', null, 'activités')),
        h('div', { class: 'kpi' + (streak >= 3 ? ' hot' : '') }, h('b', null, `📅 ${streak}`), h('span', null, 'jour(s) d’affilée')),
        h('div', { class: 'kpi' }, h('b', null, `${all.sessionsDone}/20`), h('span', null, 'séances')))),
    map);
  return view;
}

// ---------- moteur de cartes partagé (révision et défi) ----------
function cardView(card, { onAnswer, confidence = true }) {
  let conf = 1, answered = false;
  const opts = shuffle([card.answer, ...card.wrong].slice(0, 4), false);
  const confBtns = [['🤔', 'Je devine', 0], ['🙂', 'Je pense', 1], ['💪', 'Je suis sûr(e)', 2]].map(([ico, label, v]) => h('button', { type: 'button', class: 'conf-btn' + (v === 1 ? ' on' : ''), 'aria-pressed': String(v === 1), onclick: (e) => { conf = v; e.currentTarget.parentElement.querySelectorAll('.conf-btn').forEach((b, i) => { b.classList.toggle('on', i === v); b.setAttribute('aria-pressed', String(i === v)); }); } }, h('span', { 'aria-hidden': 'true' }, ico), ' ', label));
  const fb = h('div', { class: 'card-fb', 'aria-live': 'polite' });
  const buttons = opts.map((o) => h('button', { type: 'button', class: 'card-opt', onclick: () => {
    if (answered) return; answered = true; const ok = o === card.answer;
    buttons.forEach((b) => { b.disabled = true; if (b.textContent === card.answer) b.classList.add('ok'); else if (b.textContent === o) b.classList.add('ko'); });
    onAnswer(ok, conf, fb);
  } }, semanticIcon(o), h('span', null, o)));
  return h('div', { class: 'flash' },
    h('p', { class: 'flash-meta' }, h('span', { class: 'pill' }, card.kind), ' ', h('small', { class: 'muted' }, `Séance ${card.sessionIndex} · ${card.actTitle}`), card.isNew ? h('span', { class: 'pill new' }, 'Nouvelle') : card.box != null ? h('span', { class: 'pill' }, `Boîte ${card.box}`) : null),
    h('h2', { class: 'flash-q' }, card.q),
    officeArt(card.q, PRO.sessions[card.sessionIndex - 1].part),
    confidence ? h('div', { class: 'conf', role: 'group', 'aria-label': 'Ta certitude avant de répondre' }, h('span', { class: 'muted' }, 'Avant de répondre, ta certitude :'), ...confBtns) : null,
    h('div', { class: 'card-opts' }, buttons), fb);
}

// ---------- RÉVISION ESPACÉE ----------
export function reviewScreen({ prof, rec }) {
  const deck = dueCards(prof.id, rec, { newMax: 8 }).slice(0, 20);
  const stage = h('div', { class: 'stage-card flash-stage' });
  const prog = h('div', { class: 'bar', role: 'progressbar', 'aria-label': 'Progression de la révision', 'aria-valuemin': 0, 'aria-valuemax': 100 }, h('i', { style: 'width:0%' }));
  let i = 0, okN = 0, xp = 0, hyper = 0;
  function show() {
    prog.firstChild.style.width = `${Math.round((i / Math.max(1, deck.length)) * 100)}%`; prog.setAttribute('aria-valuenow', Math.round((i / Math.max(1, deck.length)) * 100));
    if (i >= deck.length) return end();
    const c = deck[i];
    stage.replaceChildren(cardView(c, { onAnswer: (ok, conf, fb) => {
      const r = review(prof.id, c, ok, conf); if (ok) okN++; xp += r.xp; if (r.hypercorrection) hyper++;
      audio.play(ok ? 'correct' : 'wrong');
      fb.replaceChildren(...kids(
        h('p', { class: ok ? 'good' : 'bad' }, ok ? `✔ Juste ! La carte passe en boîte ${r.box} : elle reviendra dans ${r.days} jour(s).` : '✖ Pas encore : la carte revient en boîte 0 et sera reproposée bientôt.'),
        r.hypercorrection ? h('p', { class: 'hyper' }, '⚡ Tu étais sûr(e) de toi : c’est justement le type d’erreur qu’on retient le mieux une fois corrigée. Lis bien l’explication.') : null,
        r.calibrated ? h('p', { class: 'muted' }, '🎯 Certitude bien évaluée : +2 XP de métacognition.') : null,
        c.why ? h('p', { class: 'why' }, '💡 ', c.why) : null,
        h('p', { class: 'muted' }, `Bonne réponse : ${c.answer}`),
        h('button', { type: 'button', class: 'btn primary', onclick: () => { i++; show(); } }, i + 1 < deck.length ? 'Carte suivante →' : 'Terminer')));
      fb.querySelector('.btn').focus();
    } }));
    stage.querySelector('.card-opt')?.focus({ preventScroll: true });
  }
  function end() {
    if (okN === deck.length && deck.length >= 5) celebrate();
    audio.play('complete');
    stage.replaceChildren(h('div', { class: 'flash-end' },
      h('h2', null, deck.length ? '🧠 Révision terminée !' : '🧠 Aucune carte pour l’instant'),
      deck.length ? h('p', null, `${okN}/${deck.length} réponses justes · +${xp} XP${hyper ? ` · ${hyper} erreur(s) « sûre(s) » corrigée(s)` : ''}.`) : h('p', null, 'Les cartes viennent des séances que tu as commencées. Fais une activité, puis reviens.'),
      h('p', { class: 'muted' }, `Intervalles de Leitner : ${BOX_DAYS.map((d, k) => `boîte ${k} = ${d} j`).join(' · ')}.`),
      h('div', { class: 'row' }, h('a', { class: 'btn primary', href: '#/pro' }, '← Retour au M205'), h('a', { class: 'btn', href: '#/pro/defi' }, '⚡ Défi mixte'))));
  }
  show();
  return h('main', { id: 'main', class: 'pro-page' },
    crumbs(['💼', 'M205', '#/pro'], ['🧠', 'Révision espacée']),
    h('h1', { tabindex: '-1' }, '🧠 Révision espacée', arHint('المراجعة المتباعدة')),
    h('p', { class: 'muted' }, `${deck.length} carte(s) aujourd’hui. Indique ta certitude, réponds, puis lis la correction : c’est le geste qui fixe la mémoire.`),
    prog, stage);
}

// ---------- DÉFI MIXTE ----------
export function defiScreen({ prof, rec }) {
  const deck = defiDeck(rec, 12);
  const stage = h('div', { class: 'stage-card flash-stage' });
  const hud = h('div', { class: 'defi-hud', 'aria-live': 'polite' });
  let i = 0, lives = 3, combo = 1, score = 0, best = 0, t0 = performance.now();
  const paintHud = () => hud.replaceChildren(
    h('span', { class: 'dh lives', 'aria-label': `${lives} vie(s)` }, '❤️'.repeat(lives) + '🖤'.repeat(3 - lives)),
    h('span', { class: 'dh' }, `Question ${Math.min(i + 1, deck.length)}/${deck.length}`),
    h('span', { class: 'dh combo' + (combo >= 3 ? ' hot' : '') }, `Combo ×${combo}`),
    h('span', { class: 'dh score' }, `${score} pts`));
  function show() {
    paintHud();
    if (i >= deck.length || lives <= 0) return end();
    const c = deck[i]; const q0 = performance.now();
    stage.replaceChildren(cardView(c, { confidence: false, onAnswer: (ok, _c, fb) => {
      const fast = performance.now() - q0 < 8000;
      if (ok) { const gain = 10 * combo + (fast ? 5 : 0); score += gain; combo = Math.min(4, combo + 1); best = Math.max(best, combo); audio.play('correct', { i: combo }); fb.replaceChildren(...kids(h('p', { class: 'good' }, `✔ +${gain} pts${fast ? ' (rapide !)' : ''}`))); }
      else { lives--; combo = 1; audio.play('wrong'); fb.replaceChildren(...kids(h('p', { class: 'bad' }, `✖ Réponse : ${c.answer}`), c.why ? h('p', { class: 'why' }, '💡 ', c.why) : null)); }
      paintHud();
      fb.append(h('button', { type: 'button', class: 'btn primary', onclick: () => { i++; show(); } }, lives > 0 && i + 1 < deck.length ? 'Suivante →' : 'Voir le score'));
      fb.querySelector('.btn').focus();
    } }));
    stage.querySelector('.card-opt')?.focus({ preventScroll: true });
  }
  function end() {
    const r = finishDefi(prof.id, score); const secs = Math.round((performance.now() - t0) / 1000);
    if (r.record && score > 0) celebrate(); audio.play(lives > 0 ? 'complete' : 'error');
    stage.replaceChildren(h('div', { class: 'flash-end' },
      h('h2', null, lives > 0 ? '🏁 Défi terminé !' : '💥 Plus de vies !'),
      h('p', { class: 'defi-score' }, h('b', null, score), ' points', r.record && score > 0 ? h('span', { class: 'pill done' }, ' 🏆 Nouveau record !') : h('span', { class: 'muted' }, ` · record ${r.best}`)),
      h('p', { class: 'muted' }, `Meilleur combo ×${best} · ${secs} s · ${i} question(s) jouée(s).`),
      h('div', { class: 'row' }, h('button', { type: 'button', class: 'btn accent', onclick: () => { location.hash = '#/pro/defi?' + Date.now(); } }, '↻ Rejouer'), h('a', { class: 'btn primary', href: '#/pro/revision' }, '🧠 Réviser mes erreurs'), h('a', { class: 'btn', href: '#/pro' }, '← M205'))));
  }
  if (!reduced()) stage.classList.add('defi-go');
  show();
  return h('main', { id: 'main', class: 'pro-page' },
    crumbs(['💼', 'M205', '#/pro'], ['⚡', 'Défi mixte']),
    h('h1', { tabindex: '-1' }, '⚡ Défi mixte', arHint('تحدٍّ مختلط')),
    h('p', { class: 'muted' }, 'Questions entrelacées de plusieurs séances. Chaque bonne réponse augmente le combo (jusqu’à ×4) ; une réponse rapide (< 8 s) rapporte +5. Trois erreurs et la partie s’arrête.'),
    hud, stage);
}
