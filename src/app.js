import { h, downloadText, frDate } from './utils/dom.js';
import { createStore, localAdapter, MAX_IMPORT_BYTES } from './storage/store.js';
import { CATALOG, ACTIVITIES, getActivity, getModule, getSession, isActivityId, TOTAL_POINTS } from './data/index.js';
import { engineOf } from './games/index.js';
import { activityScore, band, sessionStats, moduleStats, fmt, MAX } from './scoring/scoring.js';
import { audio, installInterfaceSounds } from './audio/audio.js';
import { arModule, arSession, arActivity, arInstruction } from './i18n/ar.js';

const store = createStore(localAdapter(), isActivityId);
const app = document.getElementById('app');
const KIND = { match: 'Associer', sort: 'Classer', order: 'Ordonner', fill: 'Compléter', quiz: 'Questions', hot: 'Repérer', asm: 'Assembler', net: 'Relier', robot: 'Robot', prog: 'Algorithme', sim: 'Simulation' };
const recOf = (pid) => (id) => store.record(pid, id);
const go = (p) => { location.hash = p; };
const link = (href, ...kids) => h('a', { href }, ...kids);
const STATUS = { todo: 'Pas commencée', doing: 'En cours', done: 'Terminée' };
const arSub = (text) => text ? h('small', { class: 'ar-sub', lang: 'ar', dir: 'rtl' }, text) : null;


// ---------- petits composants ----------
function toast(msg) { const t = h('div', { class: 'toast', role: 'status' }, msg); document.body.append(t); setTimeout(() => t.remove(), 3200); }
function confirmBox(message, ok = 'Continuer', danger = false) {
  return new Promise((res) => {
    const prev = document.activeElement; const done = (v) => { bg.remove(); prev && prev.focus && prev.focus(); res(v); };
    const yes = h('button', { type: 'button', class: 'btn ' + (danger ? 'danger' : 'primary'), onclick: () => done(true) }, ok);
    const bg = h('div', { class: 'modal-bg', onkeydown: (e) => { if (e.key === 'Escape') done(false); } }, h('div', { class: 'modal', role: 'alertdialog', 'aria-modal': 'true', 'aria-label': message }, h('p', null, message), h('div', { class: 'row' }, yes, h('button', { type: 'button', class: 'btn ghost', onclick: () => done(false) }, 'Annuler'))));
    document.body.append(bg); (danger ? bg.querySelector('.ghost') : yes).focus();
  });
}
const ring = (pct, label) => h('div', { class: 'ring', role: 'img', 'aria-label': label, style: `--p:${pct}` }, h('span', null, pct + ' %'));
const bar = (pct, label) => h('div', { class: 'bar', role: 'progressbar', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-label': label }, h('i', { style: `width:${pct}%` }));
function applyPrefs(p) { const pr = p?.preferences || {}; document.body.classList.toggle('reduced-motion', !!pr.reducedMotion); document.body.classList.toggle('large-text', !!pr.largeText); document.body.classList.toggle('high-contrast', !!pr.highContrast); audio.configure(pr); }

function soundButton(prof) {
  if (!prof) return null;
  const on = prof.preferences.soundEnabled;
  return h('button', { type: 'button', class: 'sound-toggle', 'aria-pressed': String(on), title: on ? 'Couper tous les sons' : 'Activer les sons', onclick: () => {
    store.updateProfile(prof.id, { preferences: { soundEnabled: !on } }); applyPrefs(store.active()); render();
  } }, h('span', { 'aria-hidden': 'true' }, on ? '🔊' : '🔇'), h('span', { class: 'sound-label' }, on ? 'Son activé' : 'Son coupé'));
}

function header(prof) {
  const cur = location.hash.split('/')[1];
  const a = (href, label, key) => h('a', { href, 'aria-current': cur === key ? 'page' : null }, label);
  return h('header', { class: 'top' }, h('div', { class: 'in' },
    h('a', { class: 'brand', href: prof ? '#/dash' : '#/profils' }, h('span', { class: 'logo', 'aria-hidden': 'true' }, '🎮'), h('span', null, 'InfoPlay ', h('b', null, 'Maroc'))),
    prof ? h('nav', { class: 'main', 'aria-label': 'Navigation principale' }, a('#/dash', 'Tableau de bord', 'dash'), a('#/progres', 'Mon progrès', 'progres'), a('#/donnees', 'Profil et données', 'donnees'), soundButton(prof), h('span', { class: 'who' }, '👤 ' + prof.displayName), h('button', { type: 'button', onclick: () => { store.logout(); go('#/profils'); } }, 'Changer d’élève')) : h('nav', { class: 'main' }, a('#/donnees', 'Données', 'donnees'))));
}

// ---------- écrans ----------
function homeScreen() {
  const name = h('input', { type: 'text', id: 'pname', maxlength: '24', required: true, autocomplete: 'off', placeholder: 'Ton prénom ou ton pseudo' });
  const err = h('p', { class: 'hint-line', role: 'alert' });
  const form = h('form', { class: 'entry-form', onsubmit: (e) => { e.preventDefault(); try { store.createProfile(name.value); go('#/dash'); } catch (x) { err.textContent = x.message; } } },
    h('label', { class: 'f', for: 'pname' }, 'Comment t’appelles-tu ?'), name, err, h('button', { class: 'btn primary', type: 'submit' }, 'Entrer et jouer →'));
  const list = store.profiles().length ? h('div', { class: 'card' }, h('h2', null, 'Qui joue ?'), h('div', { class: 'profiles' }, store.profiles().map((p) => {
    const t = moduleStats({ sessions: CATALOG.flatMap((m) => m.sessions) }, recOf(p.id));
    return h('button', { type: 'button', class: 'profile-btn', onclick: () => { store.setActive(p.id); go('#/dash'); } }, h('span', null, h('b', null, p.displayName), p.className ? ' · ' + p.className : ''), h('span', { class: 'pill' }, fmt(t.best) + ' / ' + TOTAL_POINTS + ' pts'));
  }))) : null;
  const entry = h('section', { class: 'welcome-entry', hidden: true, 'aria-label': 'Entrer dans InfoPlay Maroc' }, h('div', { class: 'card' }, h('h2', null, 'Entre ton prénom'), h('p', { class: 'muted' }, 'Un seul champ, aucun mot de passe.'), form), list);
  const enter = h('button', { type: 'button', class: 'btn primary welcome-cta', 'aria-expanded': 'false', onclick: () => { entry.hidden = false; enter.hidden = true; enter.setAttribute('aria-expanded', 'true'); setTimeout(() => name.focus(), 0); } }, 'Entrer dans InfoPlay Maroc →');
  return h('main', { id: 'main', class: 'welcome-page' }, h('section', { class: 'welcome-hero' },
    h('div', { class: 'welcome-copy' }, h('p', { class: 'eyebrow' }, 'Yacine Boulyali · Portfolio éducatif'), h('h1', { tabindex: '-1' }, 'Bienvenue dans mon univers'), h('p', { class: 'welcome-lead' }, 'Apprends l’informatique en jouant : 30 séances, 120 activités, et une progression qui reste sur cet ordinateur.'), enter),
    h('figure', { class: 'portrait-frame' }, h('img', { src: 'images/yacine-sebouali-profile.jpg', alt: 'Portrait de Yacine Boulyali', width: '400', height: '400' }), h('figcaption', null, 'Yacine Boulyali'))), entry,
    h('p', { class: 'notice' }, h('b', null, 'À savoir : '), 'ce profil sert seulement à retrouver tes résultats sur cet ordinateur. Il n’y a pas de mot de passe et il n’est pas sécurisé. N’écris ni ton nom complet, ni ton adresse, ni ton numéro de téléphone. Sur un ordinateur partagé, tes résultats restent dans ce navigateur : pense à les sauvegarder dans « Profil et données ».'),
    store.recovered ? h('p', { class: 'notice' }, 'Les données enregistrées étaient illisibles : une copie de secours a été conservée et l’application a repris à zéro.') : null);
}

function floatingHome(prof) {
  return h('a', { class: 'floating-home noprint', href: prof ? '#/dash' : '#/profils', 'aria-label': 'Retour à la première page', title: 'Retour à la première page' }, h('span', { 'aria-hidden': 'true' }, '↖'), h('span', { class: 'floating-home-label' }, 'Accueil'));
}

function dashScreen() {
  const p = store.active(); const rec = recOf(p.id); const all = { sessions: CATALOG.flatMap((m) => m.sessions) }; const t = moduleStats(all, rec);
  const next = ACTIVITIES.find((a) => !(rec(a.id)?.attempts.length));
  const pct = Math.round((t.done / t.n) * 100);
  return h('main', { id: 'main' }, h('h1', { tabindex: '-1' }, `Bonjour ${p.displayName} 👋`),
    h('div', { class: 'card row', style: 'justify-content:space-between' }, ring(pct, `Progression totale ${pct} %`), h('div', { class: 'stat' }, h('div', null, h('b', null, fmt(t.best)), h('span', { class: 'muted' }, `points sur ${TOTAL_POINTS}`)), h('div', null, h('b', null, `${t.done}/${t.n}`), h('span', { class: 'muted' }, 'activités faites')), h('div', null, h('b', null, `${t.sessionsDone}/30`), h('span', { class: 'muted' }, 'séances terminées'))),
      next ? h('a', { class: 'btn primary', href: `#/m/${next.moduleId}/s/${next.sessionIndex}/a/${next.index}`, style: 'text-decoration:none' }, `▶ Continuer : ${next.title}`) : h('span', { class: 'pill done' }, '🏆 Tout est fait !')),
    h('h2', { style: 'margin-top:1.2rem' }, 'Les 4 modules'),
    h('div', { class: 'grid g4' }, CATALOG.map((m) => { const s = moduleStats(m, rec);
      return h('section', { class: 'card mod ' + m.color, 'aria-label': m.title }, h('span', { class: 'em', 'aria-hidden': 'true' }, m.icon), h('h2', null, `Module ${m.id}`), h('p', { style: 'margin:0;font-weight:700' }, m.title, arSub(arModule(m.id))), bar(s.pct, `Module ${m.id} : ${s.pct} %`),
        h('small', null, `${s.done}/${s.n} activités · ${fmt(s.best)}/${s.max} points`), h('a', { class: 'btn', href: `#/m/${m.id}` }, 'Ouvrir le module')); })));
}

function moduleScreen(mi) {
  const m = getModule(mi); if (!m) return notFound(); const p = store.active(); const rec = recOf(p.id);
  const row = (s) => { const st = sessionStats(s, rec);
    return h('a', { class: 'card srow ' + st.status, href: `#/m/${m.id}/s/${s.index}` }, h('span', { class: 'n' }, st.status === 'done' ? '✓' : s.index), h('span', null, h('b', null, `Séance ${s.index} — ${s.title}`), arSub(arSession(s.id)), h('small', { class: 'muted' }, s.topics.join(' · '))), h('span', { style: 'text-align:right' }, h('span', { class: 'pill ' + st.status }, STATUS[st.status]), h('br'), h('small', null, `${fmt(st.best)}/20`))); };
  const body = m.groups ? m.groups.flatMap((g) => [h('h3', { class: 'group-h' }, g.label), h('div', { class: 'sessions' }, g.sessions.map((k) => row(m.sessions[k - 1])))]) : [h('div', { class: 'sessions' }, m.sessions.map(row))];
  const ms = moduleStats(m, rec);
  return h('main', { id: 'main' }, h('p', { class: 'crumbs' }, link('#/dash', 'Tableau de bord'), ' › Module ', m.id), h('h1', { tabindex: '-1' }, `${m.icon} Module ${m.id} — ${m.title}`, arSub(arModule(m.id))), h('p', { class: 'muted' }, `${m.sessions.length} séances · ${m.sessions.length * 4} activités · ${fmt(ms.best)} / ${ms.max} points`), m.languageNote ? h('p', { class: 'notice' }, m.languageNote) : null, ...body);
}

function sessionScreen(mi, si) {
  const s = getSession(mi, si); if (!s) return notFound(); const p = store.active(); const rec = recOf(p.id); const st = sessionStats(s, rec);
  const next = s.acts.find((a) => !rec(a.id)?.attempts.length) || s.acts[0];
  return h('main', { id: 'main' }, h('p', { class: 'crumbs' }, link('#/dash', 'Tableau de bord'), ' › ', link('#/m/' + mi, 'Module ' + mi), ' › Séance ', si), h('h1', { tabindex: '-1' }, `Séance ${si} — ${s.title}`, arSub(arSession(s.id))),
    h('p', null, h('b', null, 'Notions : '), s.topics.join(', '), '.'), h('p', { class: 'muted' }, `4 activités · environ ${s.acts.reduce((a, b) => a + b.estimatedMinutes, 0)} minutes · /20 points`),
    h('div', { class: 'grid g2' }, s.acts.map((a) => { const r = rec(a.id); const best = r?.attempts.length ? Math.max(...r.attempts.map((x) => x.score)) : null;
      return h('a', { class: 'card', href: `#/m/${mi}/s/${si}/a/${a.index}`, style: 'text-decoration:none;color:inherit' }, h('div', { class: 'row', style: 'justify-content:space-between' }, h('span', { class: 'pill' }, `${a.index}. ${KIND[a.type]}`), best != null ? h('span', { class: 'pill done' }, `${fmt(best)}/5`) : h('span', { class: 'pill' }, `~${a.estimatedMinutes} min`)), h('h3', { style: 'margin-top:.5rem' }, a.title, arSub(arActivity(a.id))), h('p', { class: 'muted', style: 'margin:0' }, a.objective)); })),
    h('div', { class: 'row', style: 'margin-top:1.2rem' }, h('a', { class: 'btn primary', href: `#/m/${mi}/s/${si}/a/${next.index}`, style: 'text-decoration:none;display:inline-flex;align-items:center' }, st.done ? '▶ Continuer la séance' : '▶ Commencer la séance'), st.done ? h('a', { class: 'btn', href: `#/m/${mi}/s/${si}/bilan`, style: 'text-decoration:none;display:inline-flex;align-items:center' }, 'Voir le bilan') : null));
}

function activityScreen(mi, si, ai) {
  const act = getActivity(`m${mi}-s${si}-a${ai}`); if (!act) return notFound(); const prof = store.active(); const rec = recOf(prof.id); const s = getSession(mi, si);
  const stage = h('div', { class: `stage-card activity-${act.id}`, id: 'stage' }); const out = h('div', { 'aria-live': 'polite' }); const hintBox = h('div', { class: 'hintbox', hidden: true }, '💡 ' + act.hint);
  let eng = null, submitted = false;
  const checkBtn = h('button', { type: 'button', class: 'btn primary', onclick: submit }, '✔ Vérifier');
  const hintBtn = h('button', { type: 'button', class: 'btn ghost', 'aria-expanded': 'false', onclick: () => { hintBox.hidden = !hintBox.hidden; hintBtn.setAttribute('aria-expanded', String(!hintBox.hidden)); } }, '💡 Indice');
  function mount() { stage.replaceChildren(); stage.inert = false; out.replaceChildren(); submitted = false; checkBtn.disabled = false; eng = engineOf(act.mech)(stage, act.data); if (window.__ip) window.__ip.eng = eng; }
  async function submit() {
    if (submitted || !eng) return;
    const res = eng.check(); if (res.incomplete) { toast(res.incomplete); return; }
    if (res.unanswered > 0 && !(await confirmBox(`Il reste ${res.unanswered} réponse(s) vide(s). Vérifier quand même ?`, 'Vérifier'))) return;
    if (submitted) return; submitted = true; checkBtn.disabled = true;
    const score = activityScore(res.correct, res.total); const n = store.recordAttempt(prof.id, act.id, score, act.version);
    eng.reveal && eng.reveal(res); stage.inert = true; showResult(score, res, n);
  }
  function showResult(score, res, n) {
    const r = rec(act.id).attempts; const first = r[0].score, best = Math.max(...r.map((x) => x.score)); const ratio = score / MAX;
    audio.play(ratio >= 0.6 ? (ratio === 1 ? 'complete' : 'success') : 'error');
    const msg = ratio === 1 ? 'Parfait ! 🎉' : ratio >= 0.8 ? 'Très bien !' : ratio >= 0.6 ? 'Bien, tu y es presque.' : ratio >= 0.4 ? 'Pas mal, relis les explications.' : 'Courage : lis les explications puis réessaie.';
    const nextHref = ai < 4 ? `#/m/${mi}/s/${si}/a/${ai + 1}` : `#/m/${mi}/s/${si}/bilan`;
    out.replaceChildren(h('section', { class: 'result', 'aria-label': 'Résultat' }, h('div', { class: 'top' }, h('div', { class: 'score' }, fmt(score), h('small', null, ' / 5')), h('div', null, h('h2', { style: 'margin:0' }, msg), h('p', { class: 'muted', style: 'margin:0' }, n === 1 ? 'Premier essai enregistré.' : `Essai n° ${n} · premier essai : ${fmt(first)}/5 · meilleur : ${fmt(best)}/5`))),
      h('ul', { class: 'fblist' }, res.items.map((it) => h('li', { class: it.info ? 'info' : it.ok ? 'ok' : 'ko' }, h('span', { class: 'ic', 'aria-hidden': 'true' }, it.info ? 'ℹ' : it.ok ? '✔' : '✖'), h('span', null, h('span', { class: 'vh' }, it.info ? 'Information : ' : it.ok ? 'Correct : ' : 'À revoir : '), it.msg)))),
      h('div', { class: 'row' }, h('button', { type: 'button', class: 'btn', onclick: () => { mount(); stage.scrollIntoView({ block: 'start' }); } }, '↻ Réessayer'), h('a', { class: 'btn primary', href: nextHref, style: 'text-decoration:none;display:inline-flex;align-items:center' }, ai < 4 ? 'Activité suivante →' : 'Voir le bilan de la séance →'))));
    out.firstChild.scrollIntoView({ block: 'nearest' });
  }
  const dots = h('nav', { class: 'dots', 'aria-label': 'Activités de la séance' }, s.acts.map((a) => h('a', { href: `#/m/${mi}/s/${si}/a/${a.index}`, class: (a.index === ai ? 'cur ' : '') + (rec(a.id)?.attempts.length ? 'done' : ''), 'aria-label': `Activité ${a.index} : ${a.title}`, 'aria-current': a.index === ai ? 'step' : null }, a.index)));
  const progressPct = ai * 25;
  const view = h('main', { id: 'main', class: 'activity-page' }, h('p', { class: 'crumbs' }, link('#/dash', 'Tableau de bord'), ' › ', link('#/m/' + mi, 'Module ' + mi), ' › ', link(`#/m/${mi}/s/${si}`, 'Séance ' + si), ' › Activité ', ai),
    h('section', { class: 'activity-progress', 'aria-label': `Progression dans la séance : activité ${ai} sur 4` }, h('div', { class: 'activity-progress-head' }, h('b', null, `Activité ${ai} sur 4`), h('span', { class: 'muted' }, `${progressPct} %`)), bar(progressPct, `Activité ${ai} sur 4`), dots),
    h('h1', { tabindex: '-1' }, act.title, arSub(arActivity(act.id))), h('p', { class: 'muted', style: 'margin:0' }, `${KIND[act.type]} · environ ${act.estimatedMinutes} min · note sur 5`), h('p', { style: 'margin:.4rem 0' }, h('b', null, 'Objectif : '), act.objective),
    h('div', { class: 'instr activity-brief' }, h('b', null, 'Consigne : '), act.instructions, h('p', { class: 'activity-ar-instruction', lang: 'ar', dir: 'rtl' }, arInstruction(act.type))), hintBox, stage, h('div', { class: 'row activity-actions' }, checkBtn, hintBtn), out);
  mount(); return view;
}

function summaryScreen(mi, si) {
  const s = getSession(mi, si); if (!s) return notFound(); const p = store.active(); const rec = recOf(p.id); const st = sessionStats(s, rec); const b = band(st.best); const bf = band(st.first);
  const weak = s.acts.filter((a) => { const r = rec(a.id); return !r?.attempts.length || Math.max(...r.attempts.map((x) => x.score)) < 3; });
  const nextS = getSession(mi, si + 1);
  return h('main', { id: 'main' }, h('p', { class: 'crumbs' }, link('#/dash', 'Tableau de bord'), ' › ', link('#/m/' + mi, 'Module ' + mi), ' › Bilan de la séance ', si), h('h1', { tabindex: '-1' }, `Bilan — Séance ${si} : ${s.title}`),
    h('p', { class: 'muted' }, `Élève : ${p.displayName}${p.className ? ' · ' + p.className : ''} · ${frDate(new Date().toISOString())}`),
    h('div', { class: 'card row', style: 'justify-content:space-around' }, h('div', { class: 'score' }, fmt(st.best), h('small', null, ' / 20'), h('div', { class: 'muted', style: 'font-size:1rem' }, 'Meilleurs résultats')), h('div', { class: 'score' }, fmt(st.first), h('small', null, ' / 20'), h('div', { class: 'muted', style: 'font-size:1rem' }, 'Premiers essais')), h('div', null, h('span', { class: 'pill ' + (b.tone === 'top' || b.tone === 'good' ? 'done' : 'doing'), style: 'font-size:1.1rem' }, b.label), h('p', { class: 'muted', style: 'margin:.3rem 0 0' }, `Au premier essai : ${bf.label}`))),
    h('div', { class: 'card', style: 'margin-top:1rem;overflow:auto' }, h('table', { class: 't' }, h('thead', null, h('tr', null, ['Activité', 'Premier essai', 'Meilleur', 'Essais'].map((x) => h('th', null, x)))), h('tbody', null, s.acts.map((a) => { const r = rec(a.id)?.attempts || [];
      return h('tr', null, h('td', null, link(`#/m/${mi}/s/${si}/a/${a.index}`, `${a.index}. ${a.title}`)), h('td', null, r.length ? fmt(r[0].score) + '/5' : '—'), h('td', null, r.length ? fmt(Math.max(...r.map((x) => x.score))) + '/5' : '—'), h('td', null, r.length || 0)); })))),
    h('div', { class: 'card', style: 'margin-top:1rem' }, h('h2', null, weak.length ? 'À revoir' : 'Bravo !'), weak.length ? h('ul', null, weak.map((a) => h('li', null, h('b', null, a.title), ' — ', a.objective, ' ', link(`#/m/${mi}/s/${si}/a/${a.index}`, 'Refaire')))) : h('p', null, 'Toutes les activités de cette séance sont bien maîtrisées (au moins 3/5).')),
    h('div', { class: 'row noprint', style: 'margin-top:1rem' }, nextS ? h('a', { class: 'btn primary', href: `#/m/${mi}/s/${si + 1}`, style: 'text-decoration:none;display:inline-flex;align-items:center' }, 'Séance suivante →') : h('a', { class: 'btn primary', href: `#/m/${mi}`, style: 'text-decoration:none;display:inline-flex;align-items:center' }, 'Retour au module'), h('button', { type: 'button', class: 'btn', onclick: () => window.print() }, '🖨 Imprimer le bilan')));
}

function progressScreen() {
  const p = store.active(); const rec = recOf(p.id);
  return h('main', { id: 'main' }, h('h1', { tabindex: '-1' }, 'Mon progrès'), h('p', { class: 'muted' }, 'Les points d’une séance sont sur 20 : « Premier » = premiers essais, « Meilleur » = meilleurs essais.'),
    CATALOG.map((m) => { const ms = moduleStats(m, rec);
      return h('section', { class: 'card', style: 'margin-bottom:1rem;overflow:auto' }, h('h2', null, `${m.icon} Module ${m.id} — ${m.title}`), h('p', { class: 'muted' }, `${fmt(ms.best)} / ${ms.max} points · ${ms.done}/${ms.n} activités`), bar(ms.pct, `Module ${m.id}`),
        h('table', { class: 't' }, h('thead', null, h('tr', null, ['Séance', 'Statut', 'Premier', 'Meilleur', 'Essais', 'Dernier essai'].map((x) => h('th', null, x)))), h('tbody', null, m.sessions.map((s) => { const st = sessionStats(s, rec); const last = s.acts.flatMap((a) => rec(a.id)?.attempts || []).map((x) => x.completedAt).sort().pop();
          return h('tr', null, h('td', null, link(`#/m/${m.id}/s/${s.index}`, `${s.index}. ${s.title}`)), h('td', null, h('span', { class: 'pill ' + st.status }, STATUS[st.status])), h('td', null, fmt(st.first) + '/20'), h('td', null, fmt(st.best) + '/20'), h('td', null, st.tries), h('td', null, last ? frDate(last) : '—')); })))); }));
}

function dataScreen() {
  const p = store.active(); const msg = h('p', { class: 'hint-line', role: 'status', 'aria-live': 'polite' });
  let nm, cl;
  const exp = (ids, name) => downloadText(name, store.exportJSON(ids));
  const file = h('input', { type: 'file', accept: '.json,application/json', multiple: true, id: 'imp', 'aria-label': 'Choisir des fichiers de sauvegarde', onchange: async (e) => {
    const out = []; for (const f of e.target.files) { if (f.size > MAX_IMPORT_BYTES) { out.push(`${f.name} : fichier trop volumineux.`); continue; } const r = store.importJSON(await f.text());
      out.push(r.ok ? `${f.name} : ${r.profilesAdded} profil(s) ajouté(s), ${r.profilesMerged} fusionné(s), ${r.attemptsAdded} essai(s) ajouté(s)${r.ignored ? `, ${r.ignored} élément(s) ignoré(s)` : ''}.` : `${f.name} : ${r.error}`); }
    msg.textContent = out.join(' '); e.target.value = ''; setTimeout(render, 50); } });
  const prefs = p ? h('div', { class: 'card' }, h('h2', null, 'Mon profil'), h('form', { onsubmit: (e) => { e.preventDefault(); try { store.updateProfile(p.id, { displayName: nm.value, className: cl.value }); toast('Profil enregistré.'); render(); } catch (x) { msg.textContent = x.message; } } },
    h('label', { class: 'f' }, 'Prénom ou pseudo ', nm = h('input', { type: 'text', maxlength: '24', value: p.displayName })), h('label', { class: 'f' }, 'Classe ', cl = h('input', { type: 'text', maxlength: '12', value: p.className })), h('button', { class: 'btn small', type: 'submit' }, 'Enregistrer')),
    h('h3', { style: 'margin-top:1rem' }, 'Confort de lecture'), ...[['reducedMotion', 'Réduire les animations'], ['largeText', 'Texte plus grand'], ['highContrast', 'Contraste renforcé']].map(([k, l]) => h('label', { class: 'sw' }, h('input', { type: 'checkbox', checked: !!p.preferences[k], onchange: (e) => { store.updateProfile(p.id, { preferences: { [k]: e.target.checked } }); applyPrefs(store.active()); } }), h('span', null, l))),
    h('h3', { style: 'margin-top:1rem' }, 'Sons'),
    h('label', { class: 'sw' }, h('input', { type: 'checkbox', checked: !!p.preferences.soundEnabled, onchange: (e) => { store.updateProfile(p.id, { preferences: { soundEnabled: e.target.checked } }); applyPrefs(store.active()); render(); } }), h('span', null, 'Activer les sons de l’interface et des résultats')),
    h('label', { class: 'sw' }, h('input', { type: 'checkbox', checked: !!p.preferences.hoverSound, disabled: !p.preferences.soundEnabled, onchange: (e) => { store.updateProfile(p.id, { preferences: { hoverSound: e.target.checked } }); applyPrefs(store.active()); } }), h('span', null, 'Son discret au survol (facultatif)')),
    h('label', { class: 'volume-row', for: 'sound-volume' }, h('span', null, 'Volume'), h('input', { id: 'sound-volume', type: 'range', min: '0', max: '1', step: '0.05', value: String(p.preferences.volume ?? 0.45), disabled: !p.preferences.soundEnabled, oninput: (e) => { store.updateProfile(p.id, { preferences: { volume: Number(e.target.value) } }); applyPrefs(store.active()); } }))) : null;
  const all = { sessions: CATALOG.flatMap((m) => m.sessions) };
  const teacher = h('details', { class: 'card', style: 'margin-top:1rem' }, h('summary', null, h('b', null, 'Espace enseignant (local)')),
    h('p', { class: 'muted' }, 'Les résultats ne remontent pas automatiquement : chaque élève exporte son fichier de sauvegarde, puis l’enseignant l’importe ici (bouton « Importer »). Les profils importés sont ajoutés à cet ordinateur sans rien écraser.'),
    store.profiles().length ? h('div', { style: 'overflow:auto' }, h('table', { class: 't' }, h('thead', null, h('tr', null, ['Élève', 'Classe', 'Module 1', 'Module 2', 'Module 3', 'Module 4', 'Total'].map((x) => h('th', null, x)))), h('tbody', null, store.profiles().map((q) => { const r = recOf(q.id);
      return h('tr', null, h('td', null, q.displayName), h('td', null, q.className || '—'), CATALOG.map((m) => h('td', null, fmt(moduleStats(m, r).best) + '/' + m.sessions.length * 20)), h('td', null, h('b', null, fmt(moduleStats(all, r).best) + '/' + TOTAL_POINTS))); })))) : h('p', null, 'Aucun profil sur cet ordinateur.'),
    h('div', { class: 'row', style: 'margin-top:.6rem' }, h('button', { type: 'button', class: 'btn small', onclick: () => downloadText('infoplay-resultats.csv', store.csv(ACTIVITIES), 'text/csv') }, '⬇ Exporter les résultats (CSV)'), h('button', { type: 'button', class: 'btn small', onclick: () => exp(null, 'infoplay-classe.json') }, '⬇ Exporter tous les profils (JSON)')));
  return h('main', { id: 'main' }, h('h1', { tabindex: '-1' }, 'Profil et données'),
    !store.persistent ? h('p', { class: 'notice', role: 'alert' }, '⚠ Le navigateur n’autorise pas l’enregistrement durable : tes résultats seront perdus à la fermeture. Utilise Google Chrome avec le lanceur fourni (voir le guide) et fais une sauvegarde.') : null,
    h('div', { class: 'grid g2' }, prefs, h('div', { class: 'card' }, h('h2', null, 'Sauvegarde'), h('p', { class: 'muted' }, 'Vider les données du navigateur efface la progression : exporte régulièrement ton fichier.'),
      h('div', { class: 'row' }, p ? h('button', { type: 'button', class: 'btn primary', onclick: () => exp([p.id], `infoplay-${p.displayName.replace(/[^\w-]+/g, '_')}.json`) }, '⬇ Exporter mon profil') : null, h('button', { type: 'button', class: 'btn', onclick: () => exp(null, 'infoplay-sauvegarde.json') }, '⬇ Tout exporter')),
      h('label', { class: 'f', for: 'imp' }, '⬆ Importer une sauvegarde (.json)'), file, msg,
      h('hr'), h('h3', null, 'Zone dangereuse'), p ? h('button', { type: 'button', class: 'btn danger small', onclick: async () => { if (await confirmBox(`Supprimer le profil « ${p.displayName} » et tous ses résultats sur cet ordinateur ?`, 'Supprimer', true)) { store.deleteProfile(p.id); go('#/profils'); } } }, 'Supprimer mon profil') : null,
      h('button', { type: 'button', class: 'btn danger small', style: 'margin-left:.5rem', onclick: async () => { if (await confirmBox('Effacer TOUS les profils et résultats de cet ordinateur ? Cette action est définitive.', 'Tout effacer', true)) { store.resetAll(); go('#/profils'); render(); } } }, 'Tout effacer'))), teacher,
    h('p', { class: 'muted', style: 'margin-top:1rem' }, 'InfoPlay Maroc fonctionne hors ligne et n’envoie aucune donnée : tout reste dans ce navigateur. Le profil n’est pas une authentification sécurisée.'));
}
function notFound() { return h('main', { id: 'main' }, h('h1', { tabindex: '-1' }, 'Page introuvable'), h('p', null, 'Cette page n’existe pas.'), link('#/dash', 'Retour au tableau de bord')); }
function errorScreen(e) {
  console.error(e);
  return h('main', { id: 'main' }, h('div', { class: 'card errbox' }, h('h1', { tabindex: '-1' }, 'Oups, un problème est survenu'), h('p', null, 'Tes résultats déjà enregistrés ne sont pas perdus. Essaie de recharger la page.'), h('div', { class: 'row' }, h('button', { class: 'btn primary', onclick: () => location.reload() }, 'Recharger'), h('a', { class: 'btn', href: '#/profils', style: 'text-decoration:none;display:inline-flex;align-items:center' }, 'Accueil'),
    h('button', { class: 'btn danger small', onclick: async () => { if (await confirmBox('Réinitialiser toutes les données de l’application ?', 'Réinitialiser', true)) { store.resetAll(); location.hash = '#/profils'; location.reload(); } } }, 'Réinitialiser les données')), h('pre', { class: 'code' }, String(e && e.message))));
}

// ---------- routeur ----------
function render() {
  let view;
  try {
    const prof = store.active(); applyPrefs(prof);
    const q = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    if (q[0] === 'donnees') view = dataScreen();
    else if (!prof || q[0] === 'profils') view = homeScreen();
    else if (!q.length || q[0] === 'dash') view = dashScreen();
    else if (q[0] === 'progres') view = progressScreen();
    else if (q[0] === 'm' && /^[1-4]$/.test(q[1] || '')) {
      if (!q[2]) view = moduleScreen(+q[1]); else if (q[2] === 's' && /^\d+$/.test(q[3] || '')) {
        if (!q[4]) view = sessionScreen(+q[1], +q[3]); else if (q[4] === 'bilan') view = summaryScreen(+q[1], +q[3]); else if (q[4] === 'a' && /^[1-4]$/.test(q[5] || '')) view = activityScreen(+q[1], +q[3], +q[5]); }
    }
    view = view || notFound();
    app.replaceChildren(header(prof), view, floatingHome(prof));
  } catch (e) { app.replaceChildren(header(null), errorScreen(e)); }
  window.scrollTo(0, 0); const t = app.querySelector('h1'); if (t) t.focus({ preventScroll: true });
}
window.addEventListener('hashchange', render);
installInterfaceSounds(document);
window.addEventListener('error', () => toast('Une erreur est survenue. Recharge la page si besoin.'));
if (/[?&]test=1/.test(location.search)) window.__ip = { store, CATALOG, ACTIVITIES, engineOf };
render();
