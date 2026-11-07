// Écrans « Course en direct » et « Suivi des élèves » sur le réseau local.
// Ce n'est pas du jeu collaboratif : chacun joue seul, la classe voit la progression et le classement.
import { h, downloadText } from '../utils/dom.js';
import { CATALOG, ACTIVITIES, TOTAL_POINTS } from '../data/index.js';
import { moduleStats, fmt } from '../scoring/scoring.js';
import { lanManager } from './lan.js';

const ALL = { sessions: CATALOG.flatMap((m) => m.sessions) };
const AVATARS = ['🐪', '🦊', '🐢', '🦁', '🐬', '🦅', '🐎', '🐼', '🦉', '🐙', '🦋', '🐝', '🐧', '🦒', '🐞', '🐸', '🦔', '🐳'];
const MEDAL = ['🥇', '🥈', '🥉'];

export function avatarFor(name) {
  let x = 0; for (const ch of String(name || '?')) x = (x * 31 + ch.codePointAt(0)) >>> 0;
  return AVATARS[x % AVATARS.length];
}

/** Résumé de progression envoyé sur le réseau (aucune réponse d'activité, seulement des totaux). */
export function progressSnapshot(rec) {
  const t = moduleStats(ALL, rec);
  const perfect = ACTIVITIES.filter((a) => { const r = rec(a.id); return r?.attempts.length && Math.max(...r.attempts.map((x) => x.score)) === 5; }).length;
  return {
    points: t.best, done: t.done, total: t.n, pct: t.pct, sessionsDone: t.sessionsDone, perfect,
    modules: CATALOG.map((m) => { const s = moduleStats(m, rec); return { id: m.id, pct: s.pct, points: s.best }; }),
  };
}

const since = (ms) => { const s = Math.round(ms / 1000); if (s < 15) return 'à l’instant'; if (s < 60) return `il y a ${s} s`; const m = Math.round(s / 60); return m < 60 ? `il y a ${m} min` : `il y a ${Math.round(m / 60)} h`; };
const clock = (ms) => { const s = Math.ceil(ms / 1000); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };

/** Classement : points totaux, ou points gagnés depuis le départ quand une course est lancée. */
export function standings(st) {
  const race = st.race;
  let list = st.roster.filter((p) => p.role !== 'observer' && p.progress);
  if (race) list = list.filter((p) => p.peerId in (race.baseline || {}) || p.online);
  const rows = list.map((p) => {
    const pts = p.progress.points || 0; const base = race ? (race.baseline?.[p.peerId] ?? pts) : 0;
    return { p, value: Math.round((pts - base) * 10) / 10, points: pts };
  });
  rows.sort((a, b) => b.value - a.value || (b.p.progress.done - a.p.progress.done) || String(a.p.name).localeCompare(b.p.name));
  rows.forEach((r, i) => { r.rank = i + 1; });
  return rows;
}

// ---------- fil de la course (alimenté à chaque mise à jour, même hors de la page) ----------
const feed = [];
let prev = null; let prevRaceId = null;
export function trackRace(st, onOvertaken) {
  const rows = standings(st); const now = Date.now(); const raceId = st.race?.id || null;
  const cur = new Map(rows.map((r) => [r.p.peerId, { rank: r.rank, at: r.p.lastResult?.at || 0, name: r.p.name, online: r.p.online }]));
  const push = (icon, text, mine = false) => { feed.unshift({ icon, text, t: now, mine }); if (feed.length > 25) feed.pop(); };
  if (raceId !== prevRaceId) {
    if (raceId) push('🏁', `Départ de la course « ${st.race.label} » !`); else if (prevRaceId) push('🏳️', 'La course est terminée ou a été arrêtée.');
    prevRaceId = raceId; prev = cur; return;
  }
  if (!prev) { prev = cur; return; }
  for (const r of rows) {
    const id = r.p.peerId; const before = prev.get(id);
    if (!before) { if (r.p.online) push('👋', `${r.p.name} a rejoint la course.`); continue; }
    const lr = r.p.lastResult;
    if (lr && lr.at && lr.at !== before.at) push(lr.score === 5 ? '⭐' : '✅', `${r.p.name} : ${fmt(lr.score)}/5 à « ${lr.title} »`, r.p.isMe);
    if (r.rank < before.rank) {
      // Élèves qui étaient devant et qui sont maintenant derrière : on cite le plus proche.
      const passed = rows.filter((q) => q !== r && prev.has(q.p.peerId) && prev.get(q.p.peerId).rank < before.rank && q.rank > r.rank).sort((a, b) => a.rank - b.rank)[0];
      if (passed) {
        push('🚀', `${r.p.name} dépasse ${passed.p.name} et prend la ${r.rank === 1 ? '1re' : r.rank + 'e'} place !`, r.p.isMe || passed.p.isMe);
        if (passed.p.isMe && onOvertaken) onOvertaken(r.p.name);
      }
    }
  }
  prev = cur;
}

function statusLine(st) {
  if (st.serverOnline) {
    const ips = st.serverInfo?.ips || []; const port = st.serverInfo?.port || location.port || 8765;
    const urls = ips.length ? ips.map((i) => `http://${i.address}:${port}/`) : [location.origin + '/'];
    return h('div', { class: 'lan-info-banner' }, h('span', { class: 'lan-pulse-dot' }), h('span', null, 'Serveur local actif. Les élèves de la salle ouvrent :'), ...urls.map((u) => h('code', null, u)));
  }
  return h('p', { class: 'notice' }, h('b', null, 'Serveur local non détecté. '), 'Seuls les onglets de cet ordinateur apparaissent. Pour réunir la classe : lancer « Lancer-InfoPlay.bat » (avec Node.js) sur un ordinateur hôte, puis ouvrir sur chaque poste l’adresse affichée par le serveur.');
}

// ---------- ÉCRAN : COURSE EN DIRECT ----------
export function raceScreen() {
  const banner = h('div', { class: 'race-banner' }); const status = h('div'); const podium = h('div', { class: 'race-podium' });
  const track = h('div', { class: 'race-track', role: 'list', 'aria-label': 'Classement de la course' });
  const feedBox = h('ol', { class: 'race-feed', 'aria-live': 'polite', 'aria-label': 'Fil de la course' });
  const empty = h('p', { class: 'muted', hidden: true }, 'Aucun élève connecté pour l’instant. Dès qu’un élève ouvre InfoPlay sur le réseau, il apparaît ici.');
  const lanes = new Map(); const LANE = 64;
  const view = h('main', { id: 'main', class: 'race-page' },
    h('h1', { tabindex: '-1' }, '🏁 Course en direct', h('small', { class: 'ar-sub', lang: 'ar', dir: 'rtl' }, 'سباق مباشر بين التلاميذ')),
    h('p', { class: 'muted' }, 'Chaque élève joue seul ; ici, tout le monde voit qui avance le plus vite. Les points viennent des activités réussies (meilleur essai).'),
    status, banner, podium,
    h('div', { class: 'race-layout' }, h('section', { class: 'card race-card', 'aria-label': 'Piste' }, track, empty), h('section', { class: 'card race-side' }, h('h2', null, '📣 Fil de la course'), feedBox)));
  let countdown = null;

  function update(st) {
    if (!view.isConnected && countdown) { clearInterval(countdown); countdown = null; return; }
    status.replaceChildren(statusLine(st));
    const rows = standings(st); const race = st.race;
    banner.className = 'race-banner' + (race ? (race.ended ? ' ended' : ' live') : '');
    const timeEl = h('b', { class: 'race-clock' }, race ? clock(race.remainingMs) : '');
    banner.replaceChildren(race
      ? h('div', null, h('span', { class: 'race-tag' }, race.ended ? 'Arrivée' : 'En course'), h('b', null, ' ', race.label), h('span', null, race.ended ? ' — classement final (points gagnés pendant la course)' : ' — points gagnés depuis le départ'))
      : h('div', null, h('span', { class: 'race-tag' }, 'Classement général'), h('span', null, ' Aucune course chronométrée en cours : classement sur les points totaux. L’enseignant peut lancer une course depuis « Suivi ».')),
      race ? timeEl : null);
    if (race && !race.ended && !countdown) countdown = setInterval(() => { const c = view.querySelector('.race-clock'); const r = lanManager.getState().race; if (!view.isConnected || !r) { clearInterval(countdown); countdown = null; return; } if (c) c.textContent = clock(r.remainingMs); }, 1000);

    podium.replaceChildren(...rows.slice(0, 3).map((r, i) => h('div', { class: `podium-step p${i + 1}` + (r.p.isMe ? ' me' : '') }, h('span', { class: 'medal' }, MEDAL[i]), h('span', { class: 'ava' }, avatarFor(r.p.name)), h('b', null, r.p.name), h('span', null, `${fmt(r.value)} pts`))));
    podium.hidden = rows.length === 0;

    const lead = Math.max(10, ...rows.map((r) => r.value)) * 1.12;
    const seen = new Set();
    rows.forEach((r) => {
      const id = r.p.peerId; seen.add(id); let lane = lanes.get(id);
      if (!lane) {
        lane = { el: h('div', { class: 'lane', role: 'listitem' }), runner: h('span', { class: 'runner', 'aria-hidden': 'true' }), info: h('div', { class: 'lane-info' }), fill: h('i') };
        lane.el.append(h('span', { class: 'lane-rank' }), lane.info, h('div', { class: 'lane-road' }, lane.fill, lane.runner, h('span', { class: 'finish', 'aria-hidden': 'true' }, '🏁')));
        lane.el.style.top = rows.length * LANE + 'px'; track.append(lane.el); lanes.set(id, lane);
      }
      const pct = Math.max(0, Math.min(100, (r.value / lead) * 100));
      lane.el.classList.toggle('me', !!r.p.isMe); lane.el.classList.toggle('offline', !r.p.online);
      lane.el.style.top = (r.rank - 1) * LANE + 'px';
      lane.el.querySelector('.lane-rank').textContent = MEDAL[r.rank - 1] || r.rank;
      lane.info.replaceChildren(h('b', null, r.p.name, r.p.isMe ? ' (moi)' : ''), h('small', null, `${fmt(r.value)} pts · ${r.p.progress.done}/${r.p.progress.total} act. · ${r.p.online ? '📍 ' + (r.p.activity || '') : 'hors ligne'}`));
      lane.runner.textContent = avatarFor(r.p.name); lane.runner.style.left = `calc(${pct}% - ${pct / 100 * 2}rem)`; lane.fill.style.width = pct + '%';
      lane.el.setAttribute('aria-label', `${r.rank}e : ${r.p.name}, ${fmt(r.value)} points${r.p.online ? '' : ', hors ligne'}`);
    });
    for (const [id, lane] of lanes) if (!seen.has(id)) { lane.el.remove(); lanes.delete(id); }
    track.style.height = rows.length * LANE + 'px'; empty.hidden = rows.length > 0;
    feedBox.replaceChildren(...(feed.length ? feed.map((e) => h('li', { class: e.mine ? 'mine' : '' }, h('span', { 'aria-hidden': 'true' }, e.icon), h('span', null, e.text), h('small', null, since(Date.now() - e.t)))) : [h('li', { class: 'muted' }, 'Les exploits des élèves s’afficheront ici.')]));
  }
  update(lanManager.getState());
  return { view, update };
}

// ---------- ÉCRAN : SUIVI DES ÉLÈVES (ENSEIGNANT) ----------
export function monitorScreen() {
  const status = h('div'); const tiles = h('div', { class: 'monitor-tiles' }); const tbody = h('tbody'); const raceMsg = h('p', { class: 'hint-line', role: 'status' });
  const sortSel = h('select', { 'aria-label': 'Trier par' }, [['points', 'Points'], ['done', 'Activités faites'], ['name', 'Nom'], ['recent', 'Activité récente']].map(([v, l]) => h('option', { value: v }, l)));
  const showOff = h('input', { type: 'checkbox', checked: true });
  const label = h('input', { type: 'text', maxlength: '60', placeholder: 'Ex : Course du module 3', 'aria-label': 'Nom de la course' });
  const minutes = h('select', { 'aria-label': 'Durée' }, [5, 10, 15, 20, 30, 45].map((m) => h('option', { value: m, selected: m === 15 }, `${m} min`)));
  const startBtn = h('button', { type: 'button', class: 'btn accent small', onclick: async () => { raceMsg.textContent = (await lanManager.startRace(+minutes.value, label.value.trim())) ? 'Course lancée : les élèves voient le chrono dans « Course ».' : 'Impossible de lancer la course : serveur local introuvable.'; } }, '🏁 Lancer la course');
  const stopBtn = h('button', { type: 'button', class: 'btn danger small', onclick: async () => { raceMsg.textContent = (await lanManager.stopRace()) ? 'Course arrêtée.' : 'Serveur local introuvable.'; } }, 'Arrêter la course');
  const raceCard = h('section', { class: 'card', 'aria-label': 'Course chronométrée' }, h('h2', null, '🏁 Course chronométrée'),
    h('p', { class: 'muted' }, 'Au départ, les points de chaque élève sont mémorisés ; le classement compte ensuite les points gagnés pendant la course.'),
    h('div', { class: 'row' }, label, minutes, startBtn, stopBtn, h('a', { class: 'btn small', href: '#/course' }, 'Voir la piste →')), raceMsg);
  let last = null;
  const csvBtn = h('button', { type: 'button', class: 'btn small', onclick: () => {
    if (!last) return; const esc = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const head = ['Élève', 'Classe', 'État', 'En ce moment', 'Activités', 'Points', ...CATALOG.map((m) => `Module ${m.id} %`), 'Dernier résultat', 'Poste'];
    const lines = rowsOf(last).map((p) => [p.name, p.className, p.online ? 'en ligne' : 'inactif', p.activity, `${p.progress.done}/${p.progress.total}`, fmt(p.progress.points), ...CATALOG.map((m) => p.progress.modules.find((x) => x.id === m.id)?.pct ?? 0), p.lastResult ? `${p.lastResult.title} ${fmt(p.lastResult.score)}/5` : '', p.ip || ''].map(esc).join(';'));
    downloadText('infoplay-suivi-reseau.csv', '﻿' + [head.map(esc).join(';'), ...lines].join('\r\n'), 'text/csv');
  } }, '⬇ Exporter (CSV)');
  sortSel.onchange = () => last && update(last); showOff.onchange = () => last && update(last);

  const view = h('main', { id: 'main', class: 'monitor-page' },
    h('h1', { tabindex: '-1' }, '👀 Suivi des élèves en direct', h('small', { class: 'ar-sub', lang: 'ar', dir: 'rtl' }, 'تتبع تقدم التلاميذ مباشرة')),
    h('p', { class: 'muted' }, 'Les élèves connectés au même serveur local apparaissent automatiquement, avec leur progression mise à jour toutes les 2 à 3 secondes.'),
    status, tiles, raceCard,
    h('section', { class: 'card', style: 'margin-top:1rem' },
      h('div', { class: 'row', style: 'justify-content:space-between' }, h('h2', { style: 'margin:0' }, 'Élèves'), h('div', { class: 'row' }, h('label', { class: 'row' }, 'Trier : ', sortSel), h('label', { class: 'sw' }, showOff, h('span', null, 'Afficher les inactifs')), csvBtn)),
      h('div', { style: 'overflow:auto' }, h('table', { class: 't monitor-table' }, h('thead', null, h('tr', null, ['Élève', 'État', 'En ce moment', 'Activités', 'Points', 'Modules', 'Dernier résultat', 'Poste'].map((x) => h('th', { scope: 'col' }, x)))), tbody))),
    h('p', { class: 'notice' }, h('b', null, 'À savoir : '), 'pas d’authentification — toute personne connectée au réseau de la salle peut ouvrir cette page. Seuls le prénom/pseudo, la classe et les totaux de progression circulent, uniquement sur le réseau local. Les données de suivi disparaissent à l’arrêt du serveur.'));

  function rowsOf(st) {
    let list = st.roster.filter((p) => p.role !== 'observer' && p.progress);
    if (!showOff.checked) list = list.filter((p) => p.online);
    const k = sortSel.value;
    list.sort((a, b) => k === 'name' ? String(a.name).localeCompare(b.name) : k === 'done' ? b.progress.done - a.progress.done : k === 'recent' ? (b.lastResult?.at || 0) - (a.lastResult?.at || 0) : b.progress.points - a.progress.points);
    return list;
  }
  function update(st) {
    last = st;
    status.replaceChildren(statusLine(st));
    const students = st.roster.filter((p) => p.role !== 'observer' && p.progress); const on = students.filter((p) => p.online);
    const avg = students.length ? Math.round(students.reduce((s, p) => s + p.progress.pct, 0) / students.length) : 0;
    tiles.replaceChildren(...[[on.length, 'en ligne'], [students.length - on.length, 'inactifs'], [avg + ' %', 'progression moyenne'], [students.reduce((s, p) => s + p.progress.done, 0), 'activités faites (classe)']].map(([v, l]) => h('div', { class: 'card tile' }, h('b', null, v), h('span', { class: 'muted' }, l))));
    startBtn.disabled = !st.serverOnline; stopBtn.disabled = !st.serverOnline || !st.race;
    if (st.race) raceMsg.textContent = st.race.ended ? `Course « ${st.race.label} » terminée.` : `Course « ${st.race.label} » en cours — reste ${clock(st.race.remainingMs)}.`;
    const now = Date.now(); const rows = rowsOf(st);
    tbody.replaceChildren(...(rows.length ? rows.map((p) => h('tr', { class: p.online ? '' : 'offline' },
      h('td', null, h('span', { class: 'ava', 'aria-hidden': 'true' }, avatarFor(p.name)), ' ', h('b', null, p.name), p.isMe ? ' (moi)' : '', p.className ? h('small', { class: 'muted' }, ' · ' + p.className) : null),
      h('td', null, p.online ? h('span', { class: 'pill done' }, '● en ligne') : h('span', { class: 'pill' }, '○ ' + since(now - p.lastSeen))),
      h('td', null, p.activity || '—'),
      h('td', null, `${p.progress.done}/${p.progress.total}`, h('div', { class: 'bar', role: 'progressbar', 'aria-valuenow': p.progress.pct, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-label': `${p.name} : ${p.progress.pct} %` }, h('i', { style: `width:${p.progress.pct}%` }))),
      h('td', null, h('b', null, fmt(p.progress.points)), ` / ${TOTAL_POINTS}`, p.progress.perfect ? h('small', { class: 'muted' }, ` · ${p.progress.perfect} ⭐`) : null),
      h('td', null, h('div', { class: 'mini-mods' }, CATALOG.map((m) => { const x = p.progress.modules.find((y) => y.id === m.id) || { pct: 0 }; return h('span', { class: 'mini-mod ' + m.color, title: `Module ${m.id} : ${x.pct} %` }, h('i', { style: `height:${x.pct}%` }), h('small', null, m.id)); }))),
      h('td', null, p.lastResult ? [h('span', null, `${fmt(p.lastResult.score)}/5 `), h('small', { class: 'muted' }, `${p.lastResult.title} · ${since(now - p.lastResult.at)}`)] : '—'),
      h('td', null, h('small', { class: 'muted' }, p.isMe ? 'ce poste' : p.ip || '—'))))
      : [h('tr', null, h('td', { colspan: 8, class: 'muted' }, 'Aucun élève connecté pour l’instant.'))]));
  }
  update(lanManager.getState());
  return { view, update };
}
