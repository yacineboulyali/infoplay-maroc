// InfoPlay Maroc — mode immersif 3D. Même contenu, mêmes profils, même progression que le mode classique.
import { h, celebrate, reduced } from '../utils/dom.js';
import { createStore, localAdapter } from '../storage/store.js';
import { CATALOG, ACTIVITIES, getActivity, getModule, getSession, isActivityId, TOTAL_POINTS } from '../data/index.js';
import { engineOf } from '../games/index.js';
import { activityScore, band, sessionStats, moduleStats, fmt, MAX } from '../scoring/scoring.js';
import { audio, installInterfaceSounds } from '../audio/audio.js';
import { arModule, arSession, arActivity, arInstruction } from '../i18n/ar.js';
import { createWorld, webglAvailable, MODULE_COLORS } from './world.js';
import { robot3dGame } from './robot3d.js';
import { computeGame, bestTime, fmtTime, BADGES } from '../fx/game.js';
import { gameHud } from '../fx/popup.js';
import { presentResult, makeChrono } from '../fx/flow.js';
import { installInteractions } from '../fx/interact.js';
import { fsButton, suggestFullscreen } from '../fx/fullscreen.js';

const store = createStore(localAdapter(), isActivityId);
const KIND = { match: 'Associer', sort: 'Classer', order: 'Ordonner', fill: 'Compléter', quiz: 'Questions', hot: 'Repérer', asm: 'Assembler', net: 'Relier', robot: 'Robot 3D', prog: 'Algorithme', sim: 'Simulation' };
const KIND_ICON = { match: '🔗', sort: '🗃️', order: '🔢', fill: '✏️', quiz: '❓', hot: '🎯', asm: '🧩', net: '🕸️', robot: '🤖', prog: '🧠', sim: '🖱️' };
const STATUS = { todo: 'Pas commencée', doing: 'En cours', done: 'Terminée' };
const ALL = { sessions: CATALOG.flatMap((m) => m.sessions) };
const recOf = (pid) => (id) => store.record(pid, id);
const go = (p) => { location.hash = p; };
const arSub = (text) => (text ? h('small', { class: 'ar-sub', lang: 'ar', dir: 'rtl' }, text) : null);

const $ = {
  world: document.getElementById('world'), hud: document.getElementById('hud'), panel: document.getElementById('panel'),
  holo: document.getElementById('holo'), gate: document.getElementById('gate'), tip: document.getElementById('tip'), live: document.getElementById('live'),
};

function applyPrefs(p) {
  const pr = p?.preferences || {};
  document.body.classList.toggle('reduced-motion', !!pr.reducedMotion);
  document.body.classList.toggle('large-text', !!pr.largeText);
  document.body.classList.toggle('high-contrast', !!pr.highContrast);
  audio.configure(pr);
}
function toast(msg) { const t = h('div', { class: 'toast', role: 'status' }, msg); document.body.append(t); setTimeout(() => t.remove(), 3200); }
function confirmBox(message, ok = 'Continuer') {
  return new Promise((res) => {
    const prev = document.activeElement; const done = (v) => { bg.remove(); prev && prev.focus && prev.focus(); res(v); };
    const yes = h('button', { type: 'button', class: 'btn primary', onclick: () => done(true) }, ok);
    const bg = h('div', { class: 'modal-bg', onkeydown: (e) => { if (e.key === 'Escape') { e.stopPropagation(); done(false); } } }, h('div', { class: 'modal', role: 'alertdialog', 'aria-modal': 'true', 'aria-label': message }, h('p', null, message), h('div', { class: 'row' }, yes, h('button', { type: 'button', class: 'btn ghost', onclick: () => done(false) }, 'Annuler'))));
    document.body.append(bg); yes.focus();
  });
}
const bar = (pct, label) => h('div', { class: 'bar', role: 'progressbar', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-label': label }, h('i', { style: `width:${pct}%` }));
const announce = (text) => { $.live.textContent = ''; setTimeout(() => { $.live.textContent = text; }, 30); };

// ---------- monde 3D ----------
let world = null; let lastHover = '';
// Ambiance sonore (nappe douce + vent), mémorisée sur ce navigateur ; activée par défaut.
const AMB_KEY = 'infoplay.ambient';
const ambientPref = () => { try { return localStorage.getItem(AMB_KEY) !== '0'; } catch { return true; } };
audio.ambient(ambientPref());
if (webglAvailable()) {
  try {
    world = createWorld($.world, {
      modules: CATALOG, reduced,
      onPick: (t) => { audio.play('snap'); go(t.type === 'module' ? `#/m/${t.mi}` : `#/m/${t.mi}/s/${t.si}`); },
      onHover: (t, e) => {
        const hk = t ? [t.type, t.mi, t.si].join('/') : '';
        if (hk && hk !== lastHover) audio.play(t.type === 'module' ? 'join' : 'portal'); lastHover = hk;
        if (!t) { $.tip.hidden = true; return; }
        if (e && !e.clientX) return;
        const prof = store.active(); const rec = prof ? recOf(prof.id) : () => null;
        if (t.type === 'module') { const m = getModule(t.mi); const s = moduleStats(m, rec); $.tip.replaceChildren(h('b', null, `${m.icon} Module ${m.id}`), h('span', null, m.title), h('small', null, `${s.pct} % · ${fmt(s.best)}/${s.max} pts`)); }
        else { const s = getSession(t.mi, t.si); const st = sessionStats(s, rec); $.tip.replaceChildren(h('b', null, `Séance ${s.index}`), h('span', null, s.title), h('small', null, `${STATUS[st.status]} · ${fmt(st.best)}/20`)); }
        if (e) { $.tip.style.left = e.clientX + 16 + 'px'; $.tip.style.top = e.clientY + 16 + 'px'; }
        $.tip.hidden = false;
      },
    });
  } catch (err) { console.error(err); world = null; }
}
if (!world) {
  $.world.replaceChildren(h('div', { class: 'no3d' }, h('h1', null, 'La 3D n’est pas disponible'), h('p', null, 'Ce navigateur ou cet ordinateur ne prend pas en charge WebGL. Tu peux utiliser toutes les activités dans le mode classique, ou continuer ici avec la carte.'), h('a', { class: 'btn primary', href: 'index.html#/dash' }, 'Ouvrir le mode classique')));
  document.body.classList.add('no-webgl');
}

function syncWorld() {
  const prof = store.active(); if (!world || !prof) return; const rec = recOf(prof.id); const stats = {};
  for (const m of CATALOG) { const s = moduleStats(m, rec); stats[m.id] = { pct: s.pct, sessions: Object.fromEntries(m.sessions.map((x) => [x.index, sessionStats(x, rec).status])) }; }
  world.setProgress(stats);
}

// ---------- HUD ----------
let hudOpen = false; let sheetOpen = false;
function renderHud(prof, q) {
  const crumbs = [h('a', { href: '#/' }, '🏝 Place centrale')];
  if (q.mi) crumbs.push(h('span', { 'aria-hidden': 'true' }, '›'), h('a', { href: `#/m/${q.mi}` }, `Module ${q.mi}`));
  if (q.si) crumbs.push(h('span', { 'aria-hidden': 'true' }, '›'), h('a', { href: `#/m/${q.mi}/s/${q.si}` }, `Séance ${q.si}`));
  if (q.ai) crumbs.push(h('span', { 'aria-hidden': 'true' }, '›'), h('span', { 'aria-current': 'page' }, `Activité ${q.ai}`));
  let pts = null;
  let ghud = null;
  if (prof) { const t = moduleStats(ALL, recOf(prof.id)); pts = h('span', { class: 'hud-chip', title: 'Points (meilleurs essais)' }, '⭐ ', h('b', null, fmt(t.best)), ` / ${TOTAL_POINTS}`); ghud = gameHud(computeGame(recOf(prof.id), prof.id), { compact: true }); }
  const sound = prof ? h('button', { type: 'button', class: 'hud-btn', 'aria-pressed': String(prof.preferences.soundEnabled), title: prof.preferences.soundEnabled ? 'Couper les sons' : 'Activer les sons', onclick: () => { store.updateProfile(prof.id, { preferences: { soundEnabled: !prof.preferences.soundEnabled } }); applyPrefs(store.active()); render(); } }, prof.preferences.soundEnabled ? '🔊' : '🔇') : null;
  const music = h('button', { type: 'button', class: 'hud-btn', 'aria-pressed': String(audio.ambientOn), title: audio.ambientOn ? 'Couper l’ambiance sonore' : 'Activer l’ambiance sonore', onclick: () => { const v = !audio.ambientOn; try { localStorage.setItem(AMB_KEY, v ? '1' : '0'); } catch {} audio.ambient(v); render(); } }, audio.ambientOn ? '🎵' : '🎶');
  const motion = prof ? h('button', { type: 'button', class: 'hud-btn', 'aria-pressed': String(!!prof.preferences.reducedMotion), title: 'Réduire les animations', onclick: () => { store.updateProfile(prof.id, { preferences: { reducedMotion: !prof.preferences.reducedMotion } }); applyPrefs(store.active()); render(); } }, prof.preferences.reducedMotion ? '⏸' : '✨') : null;
  // Téléphone : seuls la marque, « retour », le plein écran et ⋯ restent visibles ; le reste se replie.
  const up = q.ai || q.bilan ? `#/m/${q.mi}/s/${q.si}` : q.si ? `#/m/${q.mi}` : q.mi ? '#/' : null;
  const more = h('button', { type: 'button', class: 'hud-btn hud-more', 'aria-expanded': String(hudOpen), 'aria-controls': 'hud-right', 'aria-label': hudOpen ? 'Masquer les options' : 'Afficher les options', onclick: () => { hudOpen = !hudOpen; renderHud(store.active(), parse()); } }, hudOpen ? '✕' : '⋯');
  $.hud.replaceChildren(h('div', { class: 'hud-in' + (hudOpen ? ' open' : '') },
    h('a', { class: 'hud-brand', href: '#/' }, h('span', { class: 'logo', 'aria-hidden': 'true' }, '🎮'), h('span', { class: 'hud-name' }, 'InfoPlay ', h('b', null, 'Immersif'))),
    h('nav', { class: 'hud-crumbs', 'aria-label': 'Fil d’Ariane' }, crumbs),
    h('div', { class: 'hud-quick' }, up ? h('a', { class: 'hud-btn hud-up', href: up, 'aria-label': 'Revenir en arrière' }, '‹') : null, fsButton('hud-btn fs-btn'), more),
    h('div', { class: 'hud-right', id: 'hud-right' }, ghud, pts, sound, prof && prof.preferences.soundEnabled ? music : null, motion,
      prof ? h('button', { type: 'button', class: 'hud-chip as-btn', title: 'Changer d’élève', onclick: () => { store.logout(); render(); } }, '👤 ', prof.displayName) : null,
      h('a', { class: 'hud-btn wide', href: 'index.html', title: 'Revenir à la première page' }, '⇦ Accueil'))));
}

// ---------- porte d'entrée (profil) ----------
function renderGate() {
  const prof = store.active(); $.gate.hidden = !!prof; if (prof) { $.gate.replaceChildren(); return; }
  const name = h('input', { type: 'text', id: 'gname', maxlength: '24', required: true, autocomplete: 'off', placeholder: 'Ton prénom ou ton pseudo' });
  const err = h('p', { class: 'hint-line', role: 'alert' });
  const form = h('form', { onsubmit: (e) => { e.preventDefault(); try { store.createProfile(name.value); audio.play('success'); render(); } catch (x) { err.textContent = x.message; } } },
    h('label', { class: 'f', for: 'gname' }, 'Comment t’appelles-tu ?'), h('div', { class: 'row' }, name, h('button', { class: 'btn primary', type: 'submit' }, 'Entrer dans le monde →')), err);
  const profiles = store.profiles();
  $.gate.replaceChildren(h('div', { class: 'gate-card glass', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'gate-h' },
    h('p', { class: 'eyebrow' }, 'Mode immersif 3D'), h('h1', { id: 'gate-h', tabindex: '-1' }, 'Bienvenue dans le monde InfoPlay'),
    h('p', { class: 'muted' }, 'Explore les 4 îles de l’informatique, traverse les portails des séances et relève les défis. Ta progression est la même que dans le mode classique.'),
    h('p', { class: 'ar-lead', lang: 'ar', dir: 'rtl' }, 'استكشف جزر المعلوميات الأربع وادخل بوابات الحصص'),
    profiles.length ? h('div', null, h('h2', null, 'Qui joue ?'), h('div', { class: 'gate-profiles' }, profiles.map((p) => { const t = moduleStats(ALL, recOf(p.id));
      return h('button', { type: 'button', class: 'profile-btn', onclick: () => { store.setActive(p.id); audio.play('snap'); render(); } }, h('b', null, p.displayName), h('span', { class: 'pill' }, `${fmt(t.best)} / ${TOTAL_POINTS} pts`)); })), h('p', { class: 'or' }, 'ou crée un nouveau profil')) : null,
    form, h('p', { class: 'notice' }, 'Pas de mot de passe : n’écris ni ton nom complet, ni ton adresse, ni ton téléphone. Les résultats restent dans ce navigateur.')));
  setTimeout(() => (profiles.length ? $.gate.querySelector('.profile-btn') : name)?.focus(), 30);
}

// ---------- panneau latéral ----------
function hubPanel(prof) {
  const rec = recOf(prof.id); const t = moduleStats(ALL, rec); const next = ACTIVITIES.find((a) => !(rec(a.id)?.attempts.length));
  return [h('p', { class: 'eyebrow' }, 'Place centrale'), h('h1', { tabindex: '-1' }, `Salam ${prof.displayName} 👋`),
    h('p', { class: 'muted' }, 'Fais glisser pour tourner autour du monde, fais rouler la molette pour zoomer, clique sur une île pour y voyager.'),
    h('div', { class: 'panel-stats' }, h('div', null, h('b', null, `${t.pct} %`), h('span', null, 'progression')), h('div', null, h('b', null, `${t.done}/${t.n}`), h('span', null, 'activités')), h('div', null, h('b', null, `${t.sessionsDone}/30`), h('span', null, 'séances'))),
    next ? h('a', { class: 'btn primary block', href: `#/m/${next.moduleId}/s/${next.sessionIndex}/a/${next.index}` }, `▶ Continuer : ${next.title}`) : h('p', { class: 'pill done' }, '🏆 Tout est terminé !'),
    (() => { const g = computeGame(rec, prof.id); return h('div', { class: 'panel-game' },
      h('div', { class: 'pg-head' }, h('span', { class: 'pg-lvl' }, g.level), h('div', null, h('b', null, `Niveau ${g.level} · ${g.rank}`), h('small', null, `${g.into} / ${g.need} XP · 🔥 série ${g.streak} (record ${g.bestStreak})`), h('div', { class: 'xpbar' }, h('i', { style: `width:${g.pct}%` })))),
      h('div', { class: 'pg-badges', 'aria-label': `Badges : ${g.badges.size} sur ${BADGES.length}` }, BADGES.map((b) => h('span', { class: 'pg-badge' + (g.badges.has(b.id) ? ' got' : ''), title: `${b.title} — ${b.desc}` }, g.badges.has(b.id) ? b.icon : '🔒')))); })(),
    h('h2', null, 'Les 4 îles'),
    h('div', { class: 'island-list' }, CATALOG.map((m) => { const s = moduleStats(m, rec);
      return h('a', { class: 'island-btn', href: `#/m/${m.id}`, style: `--c:${MODULE_COLORS[m.id]}` }, h('span', { class: 'em', 'aria-hidden': 'true' }, m.icon), h('span', null, h('b', null, `Module ${m.id} — ${m.short || m.title}`), arSub(arModule(m.id)), bar(s.pct, `Module ${m.id} : ${s.pct} %`)), h('span', { class: 'pct' }, `${s.pct} %`)); }))];
}
function modulePanel(prof, mi) {
  const m = getModule(mi); const rec = recOf(prof.id); const ms = moduleStats(m, rec);
  const row = (s) => { const st = sessionStats(s, rec);
    return h('a', { class: 'portal-btn ' + st.status, href: `#/m/${mi}/s/${s.index}` }, h('span', { class: 'n' }, st.status === 'done' ? '✓' : s.index), h('span', null, h('b', null, s.title), arSub(arSession(s.id))), h('span', { class: 'sc' }, `${fmt(st.best)}/20`)); };
  const body = m.groups ? m.groups.flatMap((g) => [h('h3', { class: 'group-h' }, g.label), ...g.sessions.map((k) => row(m.sessions[k - 1]))]) : m.sessions.map(row);
  return [h('p', { class: 'eyebrow', style: `color:${MODULE_COLORS[mi]}` }, `Île ${m.id}`), h('h1', { tabindex: '-1' }, `${m.icon} ${m.title}`, arSub(arModule(m.id))),
    h('p', { class: 'muted' }, `${m.sessions.length} portails · ${fmt(ms.best)} / ${ms.max} points`), bar(ms.pct, `Module ${m.id} : ${ms.pct} %`),
    h('p', { class: 'muted small' }, 'Chaque portail est une séance. Couleur : bleu = à faire, or = en cours, vert = terminée.'),
    m.languageNote ? h('p', { class: 'notice' }, m.languageNote) : null, h('div', { class: 'portal-list' }, body)];
}
function sessionPanel(prof, mi, si) {
  const s = getSession(mi, si); const rec = recOf(prof.id); const st = sessionStats(s, rec);
  const next = s.acts.find((a) => !rec(a.id)?.attempts.length) || s.acts[0];
  return [h('p', { class: 'eyebrow', style: `color:${MODULE_COLORS[mi]}` }, `Module ${mi} · Portail ${si}`), h('h1', { tabindex: '-1' }, s.title, arSub(arSession(s.id))),
    h('p', { class: 'muted' }, h('b', null, 'Notions : '), s.topics.join(', '), '.'),
    h('div', { class: 'act-cards' }, s.acts.map((a) => { const r = rec(a.id); const best = r?.attempts.length ? Math.max(...r.attempts.map((x) => x.score)) : null;
      return h('a', { class: 'act-card' + (best != null ? ' done' : ''), href: `#/m/${mi}/s/${si}/a/${a.index}` }, h('span', { class: 'ico', 'aria-hidden': 'true' }, KIND_ICON[a.type]), h('span', null, h('small', null, `${a.index}. ${KIND[a.type]}`), h('b', null, a.title), arSub(arActivity(a.id))), h('span', { class: 'sc' }, best != null ? `${fmt(best)}/5` : `~${a.estimatedMinutes} min`)); })),
    h('div', { class: 'row' }, h('a', { class: 'btn primary', href: `#/m/${mi}/s/${si}/a/${next.index}` }, st.done ? '▶ Continuer' : '▶ Entrer dans le portail'), st.done ? h('a', { class: 'btn', href: `#/m/${mi}/s/${si}/bilan` }, 'Bilan') : null),
    h('p', null, h('a', { href: `#/m/${mi}` }, '← Retour à l’île'))];
}
function summaryPanel(prof, mi, si) {
  const s = getSession(mi, si); const rec = recOf(prof.id); const st = sessionStats(s, rec); const b = band(st.best);
  const weak = s.acts.filter((a) => { const r = rec(a.id); return !r?.attempts.length || Math.max(...r.attempts.map((x) => x.score)) < 3; });
  const nextS = getSession(mi, si + 1);
  return [h('p', { class: 'eyebrow' }, `Bilan · Séance ${si}`), h('h1', { tabindex: '-1' }, s.title),
    h('div', { class: 'panel-stats' }, h('div', null, h('b', null, `${fmt(st.best)}/20`), h('span', null, 'meilleurs')), h('div', null, h('b', null, `${fmt(st.first)}/20`), h('span', null, 'premiers essais')), h('div', null, h('b', null, b.label), h('span', null, 'niveau'))),
    h('div', { class: 'act-cards' }, s.acts.map((a) => { const r = rec(a.id)?.attempts || [];
      return h('a', { class: 'act-card' + (r.length ? ' done' : ''), href: `#/m/${mi}/s/${si}/a/${a.index}` }, h('span', { class: 'ico', 'aria-hidden': 'true' }, KIND_ICON[a.type]), h('span', null, h('b', null, a.title), h('small', null, `Essais : ${r.length}`)), h('span', { class: 'sc' }, r.length ? `${fmt(Math.max(...r.map((x) => x.score)))}/5` : '—')); })),
    h('h2', null, weak.length ? 'À revoir' : 'Bravo !'), weak.length ? h('ul', null, weak.map((a) => h('li', null, h('a', { href: `#/m/${mi}/s/${si}/a/${a.index}` }, a.title)))) : h('p', null, 'Toutes les activités sont maîtrisées (au moins 3/5).'),
    h('div', { class: 'row' }, nextS ? h('a', { class: 'btn primary', href: `#/m/${mi}/s/${si + 1}` }, 'Portail suivant →') : h('a', { class: 'btn primary', href: `#/m/${mi}` }, 'Retour à l’île'))];
}

// ---------- hologramme d'activité ----------
let eng = null;
function closeHolo() {
  if (eng && eng.dispose) eng.dispose(); eng = null;
  $.holo.hidden = true; $.holo.replaceChildren(); document.body.classList.remove('holo-open');
}
function openActivity(prof, mi, si, ai) {
  const act = getActivity(`m${mi}-s${si}-a${ai}`); if (!act) { go(`#/m/${mi}/s/${si}`); return; }
  closeHolo(); const rec = recOf(prof.id); const s = getSession(mi, si);
  const stage = h('div', { class: `stage-card activity-${act.id}` }); const out = h('div', { class: 'result-slot' });
  const hintBox = h('div', { class: 'hintbox', hidden: true }, '💡 ' + act.hint);
  const chrono = makeChrono();
  let submitted = false;
  const checkBtn = h('button', { type: 'button', class: 'btn primary check-btn', onclick: submit, 'aria-keyshortcuts': 'Control+Enter' }, h('span', null, '✔ Vérifier'), h('kbd', { 'aria-hidden': 'true' }, 'Ctrl+⏎'));
  const hintBtn = h('button', { type: 'button', class: 'btn ghost', 'aria-expanded': 'false', onclick: () => { hintBox.hidden = !hintBox.hidden; if (!hintBox.hidden) audio.play('hint'); hintBtn.setAttribute('aria-expanded', String(!hintBox.hidden)); }, 'aria-label': 'Indice' }, h('span', { 'aria-hidden': 'true' }, '💡'), h('span', { class: 'lbl' }, ' Indice'));
  const make = act.type === 'robot' ? robot3dGame : engineOf(act.mech);
  function mount() { if (eng && eng.dispose) eng.dispose(); stage.replaceChildren(); stage.inert = false; out.replaceChildren(); submitted = false; checkBtn.disabled = false; eng = make(stage, act.data); chrono.start(); if (window.__ip) window.__ip.eng = eng; }
  async function submit() {
    if (submitted || !eng) return;
    const res = eng.check(); if (res.incomplete) { toast(res.incomplete); stage.classList.remove('shake'); void stage.offsetWidth; stage.classList.add('shake'); audio.play('wrong'); return; }
    if (res.unanswered > 0 && !(await confirmBox(`Il reste ${res.unanswered} réponse(s) vide(s). Vérifier quand même ?`, 'Vérifier'))) return;
    if (submitted) return; submitted = true; checkBtn.disabled = true;
    const elapsed = chrono.stop(); const before = computeGame(rec, prof.id);
    const score = activityScore(res.correct, res.total); const n = store.recordAttempt(prof.id, act.id, score, act.version);
    eng.reveal && eng.reveal(res); stage.inert = true;
    const nextHref = ai < 4 ? `#/m/${mi}/s/${si}/a/${ai + 1}` : `#/m/${mi}/s/${si}/bilan`;
    out.replaceChildren(presentResult({
      store, prof, act, res, score, n, before, elapsedMs: elapsed, stage, accent: MODULE_COLORS[mi],
      next: { href: nextHref, label: ai < 4 ? 'Activité suivante →' : 'Voir le bilan →' },
      onRetry: () => { mount(); body.scrollTo({ top: 0, behavior: 'smooth' }); },
      onPeak: (ratio) => { if (ratio === 1) celebrate(); if (ratio >= 0.6 && world) world.burst(ratio === 1); },
    }));
    syncWorld(); renderHud(store.active(), { mi, si, ai });
  }
  const dots = h('nav', { class: 'dots', 'aria-label': 'Activités de la séance' }, s.acts.map((a) => h('a', { href: `#/m/${mi}/s/${si}/a/${a.index}`, class: (a.index === ai ? 'cur ' : '') + (rec(a.id)?.attempts.length ? 'done' : ''), 'aria-label': `Activité ${a.index} : ${a.title}`, 'aria-current': a.index === ai ? 'step' : null }, a.index)));
  const bestT = bestTime(prof.id, act.id);
  const body = h('div', { class: 'holo-body' },
    h('div', { class: 'holo-head' }, h('div', null, h('p', { class: 'eyebrow', style: `color:${MODULE_COLORS[mi]}` }, `${KIND_ICON[act.type]} ${KIND[act.type]} · Module ${mi} · Séance ${si}`), h('h1', { tabindex: '-1', id: 'holo-h' }, act.title, arSub(arActivity(act.id)))),
      h('div', { class: 'holo-side' }, dots, h('div', { class: 'holo-meta' }, chrono.el, bestT != null ? h('span', { class: 'chrono best', title: 'Ton meilleur temps' }, '🏆 ' + fmtTime(bestT)) : null))),
    h('p', { class: 'muted', style: 'margin:.2rem 0' }, h('b', null, 'Objectif : '), act.objective, ` · environ ${act.estimatedMinutes} min · note sur 5`),
    h('div', { class: 'instr activity-brief' }, h('b', null, 'Consigne : '), act.instructions, h('p', { class: 'activity-ar-instruction', lang: 'ar', dir: 'rtl' }, arInstruction(act.type))),
    hintBox, stage, h('div', { class: 'row activity-actions' }, checkBtn, hintBtn), out);
  body.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); submit(); } });
  const frame = h('div', { class: 'holo-frame', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'holo-h', style: `--c:${MODULE_COLORS[mi]}` },
    h('button', { type: 'button', class: 'holo-close', 'aria-label': 'Fermer l’activité et revenir au portail', onclick: () => go(`#/m/${mi}/s/${si}`) }, '✕'), body);
  $.holo.replaceChildren(frame); $.holo.hidden = false; document.body.classList.add('holo-open');
  mount();
}

// ---------- routeur ----------
function parse() {
  const q = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean); const r = {};
  if (q[0] === 'm' && getModule(q[1])) { r.mi = +q[1];
    if (q[2] === 's' && getSession(r.mi, q[3])) { r.si = +q[3];
      if (q[4] === 'a' && /^[1-4]$/.test(q[5] || '')) r.ai = +q[5]; else if (q[4] === 'bilan') r.bilan = true; } }
  return r;
}
let lastKey = '';
function render() {
  const prof = store.active(); applyPrefs(prof); const q = parse();
  renderHud(prof, q); renderGate();
  document.body.classList.toggle('gated', !prof);
  const key = [q.mi, q.si, q.ai, q.bilan].join('/');
  if (world && key !== lastKey) {
    if (lastKey !== '' || location.hash.length > 2) audio.play(q.ai ? 'open' : 'whoosh');
    if (q.ai) world.focusActivity(q.mi, q.si); else if (q.si) world.focusSession(q.mi, q.si); else if (q.mi) world.focusModule(q.mi); else world.focusHub();
  }
  lastKey = key;
  syncWorld();
  if (!prof) { closeHolo(); $.panel.hidden = true; updateInset(); return; }
  $.panel.hidden = false;
  const content = q.si ? (q.bilan ? summaryPanel(prof, q.mi, q.si) : sessionPanel(prof, q.mi, q.si)) : q.mi ? modulePanel(prof, q.mi) : hubPanel(prof);
  const handle = h('button', { type: 'button', class: 'sheet-handle', 'aria-expanded': String(sheetOpen), 'aria-label': sheetOpen ? 'Réduire le panneau' : 'Agrandir le panneau', onclick: () => { sheetOpen = !sheetOpen; document.body.classList.toggle('sheet-open', sheetOpen); handle.setAttribute('aria-expanded', String(sheetOpen)); handle.setAttribute('aria-label', sheetOpen ? 'Réduire le panneau' : 'Agrandir le panneau'); setTimeout(updateInset, 320); } }, h('span', { 'aria-hidden': 'true' }));
  $.panel.replaceChildren(h('div', { class: 'panel-in glass' }, handle, content));
  $.panel.scrollTop = 0;
  if (q.ai) { openActivity(prof, q.mi, q.si, q.ai); setTimeout(() => $.holo.querySelector('h1')?.focus({ preventScroll: true }), 50); }
  else { closeHolo(); const t = $.panel.querySelector('h1'); if (t) t.focus({ preventScroll: true }); }
  updateInset();
  const label = q.ai ? `Activité ${q.ai} de la séance ${q.si}` : q.si ? `Portail de la séance ${q.si}, module ${q.mi}` : q.mi ? `Île du module ${q.mi}` : 'Place centrale';
  announce(label);
}

// Le panneau de droite masque une partie de la scène : on recentre la caméra sur la zone libre.
function updateInset() {
  if (!world) return;
  const open = !$.panel.hidden && !document.body.classList.contains('holo-open') && !document.body.classList.contains('gated');
  // Ordinateur : panneau à droite → décalage horizontal. Téléphone : feuille du bas → décalage vertical.
  if (window.innerWidth > 760) world.setInset(open ? Math.round($.panel.getBoundingClientRect().width + 16) : 0, 0);
  else world.setInset(0, open ? Math.round(window.innerHeight - $.panel.getBoundingClientRect().top) : 0);
}
window.addEventListener('resize', updateInset);
window.addEventListener('hashchange', render);
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' || document.querySelector('.modal-bg')) return; const q = parse();
  if (q.ai || q.bilan) go(`#/m/${q.mi}/s/${q.si}`); else if (q.si) go(`#/m/${q.mi}`); else if (q.mi) go('#/');
});
installInterfaceSounds(document);
installInteractions(document);
window.addEventListener('hashchange', () => { if (hudOpen) { hudOpen = false; } });
suggestFullscreen({ delay: 1600 });
document.body.classList.toggle('sheet-open', sheetOpen);
if (/[?&]test=1/.test(location.search)) window.__ip = { store, CATALOG, ACTIVITIES, engineOf, world };
render();
requestAnimationFrame(() => { const l = document.querySelector('.loader'); if (l) { l.classList.add('gone'); setTimeout(() => l.remove(), 700); } });
