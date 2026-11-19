// Module « Examen professionnel » : interface mobile first, ludique (XP, cœurs, combos, séries,
// badges), notifications et feedback en feuille glissant du bas. Routes : #/examen/…
import { h, celebrate } from '../utils/dom.js';
import { audio } from '../audio/audio.js';
import { GROUPS, PARTS, partById } from './data/parts.js';
import {
  QUESTIONS, levelsOf, letters, hintFor, correctFeedback, wrongFeedback, createExamStore, rankOf,
  BADGES, DAILY_GOAL, HEARTS, XP, blancSet, byId, conceptFor,
} from './engine.js';
import { visual } from './visuals.js';

const BASE = '#/examen';
const go = (p) => { location.hash = p; };
const L = {
  fr: { check: 'Vérifier', next: 'Continuer', retry: 'Réessayer', hint: 'Indice', got: 'J’ai compris', src: 'Source', cost: `−${XP.hint} XP sur cette question`, elim: 'Élimination' },
  ar: { check: 'تحقق', next: 'متابعة', retry: 'أعد المحاولة', hint: 'تلميح', got: 'فهمت', src: 'المرجع', cost: `−${XP.hint} XP على هذا السؤال`, elim: 'استبعاد' },
};
const vibrate = (p) => { try { navigator.vibrate?.(p); } catch {} };
const langAttrs = (lang) => (lang === 'ar' ? { dir: 'rtl', lang: 'ar' } : { dir: 'ltr', lang: 'fr' });

// ---------- Stockage et notifications ----------
const stores = new Map();
let greeted = false;
function storeFor(pid) {
  if (stores.has(pid)) return stores.get(pid);
  let ls = null; try { ls = window.localStorage; } catch {}
  const st = createExamStore(ls, pid);
  st.subscribe((n) => { pushToast(n); systemNotify(st, n); updateBell(st); });
  stores.set(pid, st);
  return st;
}
let toastHost = null;
function pushToast(n) {
  if (!toastHost || !toastHost.isConnected) { toastHost = h('div', { class: 'ex-toasts ex-layer', role: 'status', 'aria-live': 'polite' }); document.body.append(toastHost); }
  const t = h('div', { class: 'ex-toast ex-toast-' + n.kind }, h('span', { class: 'ex-toast-ico', 'aria-hidden': 'true' }, n.icon), h('div', null, h('b', null, n.title), h('small', null, n.text)));
  toastHost.append(t);
  if (n.kind === 'badge' || n.kind === 'rank') audio.play('star', { i: 2 });
  setTimeout(() => t.classList.add('out'), 3600);
  setTimeout(() => t.remove(), 4100);
}
function systemNotify(st, n) {
  try {
    if (!st.state.sysNotif || typeof Notification === 'undefined' || Notification.permission !== 'granted' || !document.hidden) return;
    new Notification(n.title, { body: n.text, icon: 'icon.svg', tag: 'examen-' + n.kind });
  } catch {}
}
function updateBell(st) {
  document.querySelectorAll('.ex-bell-n').forEach((b) => { b.textContent = st.state.unread > 9 ? '9+' : String(st.state.unread); b.hidden = !st.state.unread; });
}

// ---------- Feuille glissant du bas ----------
function openSheet(content, { tone = 'info', lang = 'fr', label = '' } = {}) {
  const sheet = h('div', { class: 'ex-sheet ex-sheet-' + tone, role: 'dialog', 'aria-modal': 'true', 'aria-label': label, ...langAttrs(lang) }, h('span', { class: 'ex-grab', 'aria-hidden': 'true' }), content);
  const bg = h('div', { class: 'ex-sheet-bg ex-layer' }, sheet);
  document.body.append(bg);
  requestAnimationFrame(() => bg.classList.add('open'));
  const close = () => { bg.classList.remove('open'); setTimeout(() => bg.remove(), 320); };
  bg.addEventListener('click', (e) => { if (e.target === bg && tone === 'info') close(); });
  setTimeout(() => sheet.querySelector('button')?.focus(), 60);
  return { close, sheet };
}

// ---------- Éléments communs ----------
function topbar(st, { title = 'Examen pro', back = null } = {}) {
  const s = st.state;
  const bell = h('button', { type: 'button', class: 'ex-chip ex-bell', 'aria-label': 'Notifications', onclick: () => notifSheet(st) }, '🔔', h('span', { class: 'ex-bell-n', hidden: !s.unread }, s.unread > 9 ? '9+' : String(s.unread)));
  return h('header', { class: 'ex-top' },
    back ? h('a', { class: 'ex-back', href: back, 'aria-label': 'Retour' }, '←') : h('a', { class: 'ex-back ex-home', href: '#/profils', 'aria-label': 'Accueil InfoPlay' }, '🏠'),
    h('h1', { tabindex: '-1' }, title),
    h('div', { class: 'ex-chips' },
      h('span', { class: 'ex-chip ex-fire' + (s.lastDay === new Date().toISOString().slice(0, 10) ? ' lit' : ''), title: 'Série de jours' }, '🔥', h('b', null, String(s.streak))),
      h('span', { class: 'ex-chip ex-xp', title: 'Points d’expérience' }, '⚡', h('b', null, String(s.xp))),
      bell));
}
function bottomNav(active) {
  const it = (id, icon, label, href) => h('a', { class: 'ex-nav-i' + (active === id ? ' on' : ''), href, 'aria-current': active === id ? 'page' : null }, h('span', { 'aria-hidden': 'true' }, icon), h('small', null, label));
  return h('nav', { class: 'ex-nav', 'aria-label': 'Navigation du module' },
    it('hub', '🏠', 'Parcours', BASE), it('rev', '♻️', 'Révision', BASE + '/revision'), it('blanc', '📜', 'Examen blanc', BASE + '/blanc'), it('profil', '🏅', 'Profil', BASE + '/profil'));
}
function ring(ratio, size = 64, stroke = 7, label = '') {
  const r = (size - stroke) / 2; const c = 2 * Math.PI * r;
  const wrap = h('span', { class: 'ex-ring-g', style: `width:${size}px;height:${size}px` });
  wrap.innerHTML = `<svg viewBox="0 0 ${size} ${size}" aria-hidden="true"><circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="bg" stroke-width="${stroke}"/><circle cx="${size / 2}" cy="${size / 2}" r="${r}" class="fg" stroke-width="${stroke}" stroke-dasharray="${c}" stroke-dashoffset="${c}" style="--to:${c * (1 - Math.min(1, ratio))}"/></svg>`;
  wrap.append(h('span', { class: 'ex-ring-l' }, label));
  return wrap;
}
function floatXp(anchor, n) {
  if (!n) return;
  const f = h('span', { class: 'ex-float', 'aria-hidden': 'true' }, `+${n} XP`);
  anchor.append(f); setTimeout(() => f.remove(), 1300);
}
function notifSheet(st) {
  const s = st.state;
  const list = s.notifs.length ? h('ul', { class: 'ex-notifs' }, s.notifs.map((n, i) => h('li', { class: i < s.unread ? 'new' : '' },
    h('span', { class: 'ex-toast-ico', 'aria-hidden': 'true' }, n.icon), h('div', null, h('b', null, n.title), h('small', null, n.text), h('time', null, new Date(n.at).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }))))))
    : h('p', { class: 'ex-muted' }, 'Aucune notification pour l’instant. Termine une leçon pour débloquer ta première récompense.');
  const { close } = openSheet(h('div', null, h('h2', null, '🔔 Notifications'), list, h('div', { class: 'ex-actions' }, h('button', { type: 'button', class: 'ex-btn', onclick: () => close() }, 'Fermer'))), { label: 'Notifications' });
  st.markRead(); updateBell(st);
}

// ---------- Accueil du module ----------
function nextStep(st) {
  for (const p of PARTS) {
    const pr = st.partProgress(p.id);
    if (!pr.lesson) return { href: `${BASE}/p/${p.id}/lecon`, label: `Leçon · ${p.short}`, part: p };
    if (!pr.done) return { href: `${BASE}/p/${p.id}/n/${pr.count}`, label: `${p.short} · niveau ${pr.count + 1}`, part: p };
  }
  return { href: BASE + '/blanc', label: 'Examen blanc', part: null };
}
function hub(st) {
  const s = st.state; const r = rankOf(s.xp);
  const toNext = r.next ? (s.xp - r.xp) / (r.next.xp - r.xp) : 1;
  const nx = nextStep(st);
  const hero = h('section', { class: 'ex-hero' },
    h('div', { class: 'ex-rank' },
      h('span', { class: 'ex-rank-ico', 'aria-hidden': 'true' }, r.icon),
      h('div', null, h('small', null, 'Ton rang'), h('b', null, r.fr),
        h('span', { class: 'ex-prog', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(Math.round(toNext * 100)) }, h('i', { style: `--w:${toNext * 100}%` })),
        h('small', null, r.next ? `${r.next.xp - s.xp} XP avant « ${r.next.fr} »` : 'Rang maximal atteint'))),
    h('div', { class: 'ex-goal' }, ring(s.dayXp / DAILY_GOAL, 72, 8, `${Math.min(s.dayXp, DAILY_GOAL)}/${DAILY_GOAL}`), h('small', null, 'Objectif du jour')));
  const cta = h('a', { class: 'ex-cta', href: nx.href }, h('span', { 'aria-hidden': 'true' }, '▶'), h('span', null, h('small', null, 'Continuer'), h('b', null, nx.label)));
  const quick = h('div', { class: 'ex-quick' },
    h('a', { class: 'ex-q', href: BASE + '/revision' }, h('span', { 'aria-hidden': 'true' }, '♻️'), h('b', null, String(s.review.length)), h('small', null, 'à revoir')),
    h('a', { class: 'ex-q', href: BASE + '/blanc' }, h('span', { 'aria-hidden': 'true' }, '📜'), h('b', null, s.blanc[0] ? `${s.blanc[0].score}/20` : '—'), h('small', null, 'examen blanc')),
    h('a', { class: 'ex-q', href: BASE + '/profil' }, h('span', { 'aria-hidden': 'true' }, '🏅'), h('b', null, `${Object.keys(s.badges).length}/${BADGES.length}`), h('small', null, 'badges')));
  const groups = GROUPS.map((g) => h('section', { class: 'ex-group', ...langAttrs(g.lang) },
    h('header', null, h('span', { class: 'ex-gico', 'aria-hidden': 'true' }, g.icon), h('div', null, h('h2', null, g.title), h('p', null, g.sub))),
    h('ol', { class: 'ex-parts' }, PARTS.filter((p) => p.group === g.id).map((p, i) => {
      const pr = st.partProgress(p.id);
      return h('li', { style: `--i:${i}` }, h('a', { class: 'ex-part' + (pr.done ? ' done' : ''), href: `${BASE}/p/${p.id}`, style: `--c:${p.color}` },
        h('span', { class: 'ex-pico' }, ring(pr.ratio, 58, 6, p.icon)),
        h('span', { class: 'ex-pmeta' }, h('b', null, p.title), h('small', null, `${pr.lesson ? '📖 ✓' : '📖'} · ${pr.count}/${pr.levels} niveaux · ⭐ ${pr.stars}/${pr.maxStars}`)),
        h('span', { class: 'ex-chev', 'aria-hidden': 'true' }, g.lang === 'ar' ? '‹' : '›')));
    }))));
  return [topbar(st, { title: 'Examen professionnel' }), h('div', { class: 'ex-body' },
    h('p', { class: 'ex-intro' }, 'Prépare l’examen d’aptitude professionnelle d’informatique (secondaire qualifiant) : une leçon animée, puis des niveaux de QCM corrigés et expliqués.'),
    hero, cta, quick, ...groups), bottomNav('hub')];
}

// ---------- Page d'une partie ----------
function partPage(st, p) {
  const pr = st.partProgress(p.id); const lv = levelsOf(p.id); const T = L[p.lang];
  const lesson = h('a', { class: 'ex-lesson-tile' + (pr.lesson ? ' done' : ''), href: `${BASE}/p/${p.id}/lecon` },
    h('span', { class: 'ex-lt-ico', 'aria-hidden': 'true' }, pr.lesson ? '✅' : '📖'),
    h('span', null, h('b', null, p.lang === 'ar' ? 'الدرس المختصر' : 'Leçon express'), h('small', null, `${p.lesson.length} ${p.lang === 'ar' ? 'بطاقات متحركة · +' : 'cartes animées · +'}${XP.lessonDone + p.lesson.length * XP.lessonCard} XP`)),
    h('span', { class: 'ex-chev', 'aria-hidden': 'true' }, p.lang === 'ar' ? '‹' : '›'));
  const path = h('ol', { class: 'ex-path' }, lv.map((qs, k) => {
    const done = st.state.levels[p.id + ':' + k]; const open = st.isLevelOpen(p.id, k);
    const stars = done ? '★'.repeat(done.stars) + '☆'.repeat(3 - done.stars) : '';
    const inner = [h('span', { class: 'ex-node-c', 'aria-hidden': 'true' }, done ? '✓' : open ? String(k + 1) : '🔒'), h('span', { class: 'ex-node-t' }, h('b', null, `${p.lang === 'ar' ? 'المستوى' : 'Niveau'} ${k + 1}`), h('small', null, done ? stars : `${qs.length} questions`))];
    return h('li', { style: `--i:${k}`, class: k % 2 ? 'r' : 'l' }, open
      ? h('a', { class: 'ex-lnode' + (done ? ' done' : ' open'), href: `${BASE}/p/${p.id}/n/${k}` }, ...inner)
      : h('span', { class: 'ex-lnode locked', 'aria-disabled': 'true', title: 'Termine le niveau précédent' }, ...inner));
  }));
  return [topbar(st, { title: p.short, back: BASE }), h('div', { class: 'ex-body', style: `--c:${p.color}`, ...langAttrs(p.lang) },
    h('section', { class: 'ex-phead' }, h('span', { class: 'ex-phead-ico', 'aria-hidden': 'true' }, p.icon), h('div', null, h('h2', null, p.title), h('p', null, p.weight)),
      h('div', { class: 'ex-phead-stats' }, h('span', null, `⭐ ${pr.stars}/${pr.maxStars}`), h('span', null, `🎯 ${pr.count}/${pr.levels}`))),
    lesson,
    !pr.lesson ? h('p', { class: 'ex-tip' }, p.lang === 'ar' ? '💡 ابدأ بالدرس: يمنحك نقاطا ويهيئك للأسئلة.' : '💡 Commence par la leçon : elle rapporte des XP et prépare aux questions.') : null,
    path), bottomNav('hub')];
}

// ---------- Lecteur de leçon ----------
function lessonPlayer(st, p) {
  const T = L[p.lang]; let i = 0;
  const root = h('div', { class: 'ex-player', style: `--c:${p.color}`, ...langAttrs(p.lang) });
  const render = () => {
    const card = p.lesson[i]; let answered = false;
    const nextBtn = h('button', { type: 'button', class: 'ex-btn ex-primary', disabled: true }, i < p.lesson.length - 1 ? T.next : (p.lang === 'ar' ? 'إنهاء الدرس' : 'Terminer la leçon'));
    const choices = h('div', { class: 'ex-choices' }, card.check.o.map((o, k) => h('button', { type: 'button', class: 'ex-choice', onclick: (e) => {
      if (answered) return; answered = true;
      const ok = k === card.check.a; const btn = e.currentTarget;
      btn.classList.add(ok ? 'ok' : 'ko');
      choices.children[card.check.a].classList.add('ok');
      [...choices.children].forEach((c) => c.setAttribute('aria-disabled', 'true'));
      why.hidden = false; why.className = 'ex-why ' + (ok ? 'ok' : 'ko');
      if (ok) { audio.play('correct', { i }); vibrate(25); st.lessonCard(p.id); floatXp(btn, XP.lessonCard); } else { audio.play('wrong'); vibrate([50, 30, 50]); }
      nextBtn.disabled = false; nextBtn.focus();
    } }, h('span', { class: 'ex-letter' }, letters(p.lang)[k]), h('span', null, o))));
    const why = h('p', { class: 'ex-why', hidden: true }, card.check.why);
    nextBtn.addEventListener('click', () => { if (i < p.lesson.length - 1) { i++; render(); window.scrollTo(0, 0); } else done(); });
    root.replaceChildren(
      playerTop(`${BASE}/p/${p.id}`, (i + 1) / p.lesson.length, null),
      h('article', { class: 'ex-card ex-lcard', key: i },
        h('small', { class: 'ex-eyebrow' }, `${p.icon} ${p.short} · ${i + 1}/${p.lesson.length}`),
        h('h2', { tabindex: '-1' }, card.t),
        h('p', { class: 'ex-lead' }, card.p),
        visual(card.v, { color: p.color, lang: p.lang }),
        h('aside', { class: 'ex-fact' }, h('span', { 'aria-hidden': 'true' }, '📚'), h('div', null, h('p', null, card.fact.t), h('small', null, card.fact.src))),
        h('section', { class: 'ex-check' }, h('h3', null, p.lang === 'ar' ? '⚡ تحدٍّ سريع' : '⚡ Mini-défi'), h('p', null, card.check.q), choices, why)),
      h('footer', { class: 'ex-foot' }, nextBtn));
    root.querySelector('h2')?.focus({ preventScroll: true });
  };
  const done = () => {
    st.lessonDone(p.id); audio.play('complete'); celebrate();
    root.replaceChildren(h('section', { class: 'ex-end' },
      h('div', { class: 'ex-end-badge', 'aria-hidden': 'true' }, '📖'),
      h('h2', { tabindex: '-1' }, p.lang === 'ar' ? 'انتهى الدرس!' : 'Leçon terminée !'),
      h('p', null, p.lang === 'ar' ? 'المستوى 1 مفتوح الآن.' : 'Le niveau 1 est débloqué.'),
      h('div', { class: 'ex-end-stats' }, h('span', null, h('b', null, `+${XP.lessonDone}`), h('small', null, 'XP'))),
      h('div', { class: 'ex-actions col' },
        h('a', { class: 'ex-btn ex-primary', href: `${BASE}/p/${p.id}/n/0` }, p.lang === 'ar' ? 'ابدأ المستوى 1' : 'Commencer le niveau 1'),
        h('a', { class: 'ex-btn', href: `${BASE}/p/${p.id}` }, p.lang === 'ar' ? 'العودة' : 'Retour à la partie'))));
  };
  render();
  return root;
}

function playerTop(closeHref, ratio, extra) {
  return h('div', { class: 'ex-ptop' },
    h('a', { class: 'ex-x', href: closeHref, 'aria-label': 'Quitter' }, '✕'),
    h('span', { class: 'ex-prog big', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': '100', 'aria-valuenow': String(Math.round(ratio * 100)) }, h('i', { style: `--w:${ratio * 100}%` })),
    extra);
}

// ---------- Lecteur de QCM (niveaux et révision) ----------
function quizPlayer(st, { mode, part, k }) {
  let list; let closeHref;
  if (mode === 'level') {
    const lv = levelsOf(part.id);
    if (!lv[k] || !st.isLevelOpen(part.id, k)) { go(`${BASE}/p/${part.id}`); return h('div'); }
    list = lv[k]; closeHref = `${BASE}/p/${part.id}`;
  } else {
    list = st.state.review.map(byId).filter(Boolean).slice(0, 10); closeHref = BASE;
    if (!list.length) return [topbar(st, { title: 'Révision', back: BASE }), h('div', { class: 'ex-body' }, h('section', { class: 'ex-empty' },
      h('div', { class: 'ex-end-badge', 'aria-hidden': 'true' }, '♻️'), h('h2', null, 'Rien à revoir'),
      h('p', null, 'Les questions ratées au premier essai arrivent ici. Les revoir plus tard (révision espacée) les fixe durablement en mémoire.'),
      h('a', { class: 'ex-btn ex-primary', href: BASE }, 'Retour au parcours'))), bottomNav('rev')];
  }
  const R = { idx: 0, hearts: HEARTS, combo: 0, maxCombo: 0, firstTry: 0, hints: 0, mistakes: 0, xp: 0 };
  const root = h('div', { class: 'ex-player' + (mode === 'review' ? ' review' : '') });

  const render = () => {
    const q = list[R.idx]; const T = L[q.lang]; const p = partById(q.part);
    let selected = null; let attempt = 1; let hinted = false; const off = new Set();
    root.style.setProperty('--c', p.color);
    const heart = mode === 'level' ? h('span', { class: 'ex-hearts', 'aria-label': `${R.hearts} cœurs` }, '❤️', h('b', null, String(R.hearts))) : h('span', { class: 'ex-chip' }, '♻️');
    const combo = h('span', { class: 'ex-combo' + (R.combo >= 2 ? ' on' : ''), 'aria-live': 'polite' }, `🔥 ×${R.combo}`);
    const checkBtn = h('button', { type: 'button', class: 'ex-btn ex-primary', disabled: true }, T.check);
    const opts = h('div', { class: 'ex-opts', role: 'radiogroup', 'aria-label': 'Réponses' }, q.options.map((o, i) => {
      const b = h('button', { type: 'button', class: 'ex-opt', role: 'radio', 'aria-checked': 'false', style: `--i:${i}` }, h('span', { class: 'ex-letter' }, letters(q.lang)[i]), h('span', null, o));
      b.addEventListener('click', () => {
        if (off.has(i)) return; selected = i; audio.play('click');
        [...opts.children].forEach((c, j) => { c.classList.toggle('sel', j === i); c.setAttribute('aria-checked', String(j === i)); });
        checkBtn.disabled = false;
      });
      return b;
    }));
    const hintBtn = h('button', { type: 'button', class: 'ex-hint-btn' }, '💡 ', T.hint);
    const showHint = () => {
      const hi = hintFor(q);
      if (!hinted) { hinted = true; R.hints++; }
      hintBtn.classList.add('used');
      const { close } = openSheet(h('div', null,
        h('h2', null, '💡 ', T.hint),
        h('p', { class: 'ex-sheet-lead' }, hi.text),
        hi.elim ? h('p', { class: 'ex-elim' }, h('b', null, T.elim + ' : '), hi.elim) : null,
        h('p', { class: 'ex-src' }, '📚 ', hi.src),
        h('p', { class: 'ex-cost' }, T.cost),
        h('div', { class: 'ex-actions' }, h('button', { type: 'button', class: 'ex-btn ex-primary', onclick: () => close() }, T.got))), { tone: 'info', lang: q.lang, label: T.hint });
    };
    hintBtn.addEventListener('click', showHint);

    const feedbackSheet = (fb, after) => {
      const tone = fb.ok ? 'ok' : 'ko';
      const xpTag = fb.xp ? h('span', { class: 'ex-xptag' }, `+${fb.xp} XP`) : null;
      const btns = [];
      if (fb.ok || fb.reveal) btns.push(h('button', { type: 'button', class: 'ex-btn ex-primary', 'data-act': 'next' }, T.next));
      else {
        btns.push(h('button', { type: 'button', class: 'ex-btn ex-ghost', 'data-act': 'retry' }, '↺ ', T.retry));
        btns.push(h('button', { type: 'button', class: 'ex-btn ex-primary', 'data-act': 'skip' }, T.next));
      }
      const hintLink = !fb.ok && !fb.reveal ? h('button', { type: 'button', class: 'ex-hint-btn in-sheet', 'data-act': 'hint' }, '💡 ', T.hint) : null;
      const { close, sheet } = openSheet(h('div', null,
        h('div', { class: 'ex-fb-head' }, h('span', { class: 'ex-fb-ico', 'aria-hidden': 'true' }, fb.ok ? '✓' : '✗'), h('h2', null, fb.title), xpTag),
        h('div', { class: 'ex-fb-body' }, fb.body.map((t, i) => h('p', { class: i === 0 && fb.reveal ? 'ex-reveal' : '' }, t))),
        fb.src ? h('p', { class: 'ex-src' }, '📚 ', fb.src) : null,
        hintLink,
        h('div', { class: 'ex-actions' }, ...btns)), { tone, lang: q.lang, label: fb.title });
      sheet.addEventListener('click', (e) => {
        const act = e.target.closest('[data-act]')?.dataset.act; if (!act) return;
        if (act === 'hint') { showHint(); return; }
        close(); after(act);
      });
    };

    const check = () => {
      if (selected == null) return;
      const ok = selected === q.answer;
      checkBtn.disabled = true;
      if (ok) {
        R.combo++; R.maxCombo = Math.max(R.maxCombo, R.combo); if (attempt === 1) R.firstTry++;
        const xp = st.answer(q, { ok: true, attempt, combo: R.combo, hinted, review: mode === 'review' }); R.xp += xp;
        opts.children[selected].classList.add('ok');
        audio.play('correct', { i: Math.min(R.combo, 9) }); vibrate(30); floatXp(opts.children[selected], xp);
        combo.textContent = `🔥 ×${R.combo}`; combo.classList.toggle('on', R.combo >= 2);
        if (R.combo > 0 && R.combo % 5 === 0) st.notify('combo', `Combo ×${R.combo} !`, 'Tes réponses s’enchaînent : continue sur ta lancée.', '⚡');
        feedbackSheet({ ...correctFeedback(q, attempt), xp }, () => next());
        return;
      }
      R.combo = 0; R.mistakes++; combo.classList.remove('on');
      if (attempt === 1) st.answer(q, { ok: false, attempt: 1, combo: 0, hinted, review: mode === 'review' });
      if (mode === 'level') { R.hearts--; heart.querySelector('b').textContent = String(R.hearts); heart.classList.remove('hit'); void heart.offsetWidth; heart.classList.add('hit'); }
      opts.children[selected].classList.add('ko');
      audio.play('wrong'); vibrate([60, 40, 60]);
      const outOfHearts = mode === 'level' && R.hearts <= 0;
      const fb = wrongFeedback(q, selected, outOfHearts ? 2 : attempt);
      const revealAll = () => { opts.children[q.answer].classList.add('ok', 'reveal'); };
      if (fb.reveal) revealAll();
      feedbackSheet(fb, (act) => {
        if (act === 'retry') {
          off.add(selected); opts.children[selected].classList.add('off'); opts.children[selected].setAttribute('aria-disabled', 'true');
          opts.children[selected].classList.remove('sel', 'ko'); selected = null; attempt++;
          return;
        }
        if (act === 'skip') { revealAll(); feedbackSheet(wrongFeedback(q, selected, 2), () => (outOfHearts ? fail() : next())); return; }
        outOfHearts ? fail() : next();
      });
    };
    checkBtn.addEventListener('click', check);

    root.replaceChildren(
      playerTop(closeHref, R.idx / list.length, h('span', { class: 'ex-ptop-r' }, combo, heart)),
      h('article', { class: 'ex-card ex-qcard', ...langAttrs(q.lang) },
        h('div', { class: 'ex-qmeta' }, h('span', { class: 'ex-tagp' }, `${p.icon} ${p.short}`), h('small', null, `${R.idx + 1}/${list.length}`)),
        h('h2', { class: 'ex-q', tabindex: '-1' }, q.q),
        opts,
        hintBtn),
      h('footer', { class: 'ex-foot' }, checkBtn));
    root.querySelector('.ex-q')?.focus({ preventScroll: true });
  };

  const next = () => { R.idx++; if (R.idx >= list.length) end(); else { render(); window.scrollTo(0, 0); } };
  const fail = () => {
    audio.play('error');
    root.replaceChildren(h('section', { class: 'ex-end fail' },
      h('div', { class: 'ex-end-badge', 'aria-hidden': 'true' }, '💔'),
      h('h2', { tabindex: '-1' }, 'Plus de cœurs !'),
      h('p', null, 'Ce n’est pas un échec : les questions ratées t’attendent dans la révision. Relis la leçon, puis retente le niveau.'),
      h('div', { class: 'ex-actions col' },
        h('button', { type: 'button', class: 'ex-btn ex-primary', onclick: () => { Object.assign(R, { idx: 0, hearts: HEARTS, combo: 0, maxCombo: 0, firstTry: 0, hints: 0, mistakes: 0, xp: 0 }); render(); } }, 'Recommencer le niveau'),
        h('a', { class: 'ex-btn', href: `${BASE}/p/${part.id}/lecon` }, 'Revoir la leçon'))));
  };
  const end = () => {
    const ratio = R.firstTry / list.length;
    let stars = 0;
    if (mode === 'level') stars = st.levelDone(part.id, k, { firstTry: R.firstTry, total: list.length, hints: R.hints, mistakes: R.mistakes });
    audio.play(ratio >= 0.7 ? 'complete' : 'success');
    if (ratio >= 0.7) celebrate();
    const starRow = mode === 'level' ? h('div', { class: 'ex-stars', 'aria-label': `${stars} étoiles sur 3` }, [0, 1, 2].map((j) => h('span', { class: j < stars ? 'on' : '', style: `--i:${j}` }, '★'))) : null;
    if (mode === 'level') [0, 1, 2].slice(0, stars).forEach((j) => audio.play('star', { i: j, delay: 0.5 + j * 0.2 }));
    const lv = mode === 'level' ? levelsOf(part.id) : [];
    root.replaceChildren(h('section', { class: 'ex-end' },
      h('div', { class: 'ex-end-badge', 'aria-hidden': 'true' }, mode === 'level' ? '🏁' : '♻️'),
      h('h2', { tabindex: '-1' }, mode === 'level' ? `Niveau ${k + 1} terminé !` : 'Révision terminée !'),
      starRow,
      h('div', { class: 'ex-end-stats' },
        h('span', null, h('b', null, `+${R.xp}`), h('small', null, 'XP')),
        h('span', null, h('b', null, `${Math.round(ratio * 100)} %`), h('small', null, 'du 1er coup')),
        h('span', null, h('b', null, `×${R.maxCombo}`), h('small', null, 'combo max'))),
      h('div', { class: 'ex-actions col' },
        mode === 'level' && k + 1 < lv.length ? h('a', { class: 'ex-btn ex-primary', href: `${BASE}/p/${part.id}/n/${k + 1}` }, `Niveau ${k + 2} →`) : null,
        mode === 'review' && st.state.review.length ? h('button', { type: 'button', class: 'ex-btn ex-primary', onclick: () => { const v = quizPlayer(st, { mode: 'review' }); root.replaceWith(...[].concat(v)); } }, `Encore ${Math.min(10, st.state.review.length)} questions`) : null,
        h('a', { class: 'ex-btn', href: mode === 'level' ? `${BASE}/p/${part.id}` : BASE }, 'Retour'))));
    root.querySelector('h2')?.focus();
  };
  render();
  return root;
}

// ---------- Examen blanc ----------
function blancScreen(st) {
  const s = st.state;
  const root = h('div', { class: 'ex-body' });
  const intro = () => root.replaceChildren(
    h('section', { class: 'ex-card ex-blanc-intro' },
      h('div', { class: 'ex-end-badge', 'aria-hidden': 'true' }, '📜'),
      h('h2', { tabindex: '-1' }, 'Examen blanc'),
      h('ul', { class: 'ex-rules' },
        h('li', null, '20 questions tirées au hasard : 12 de didactique, 4 du programme du TC, 4 de sciences de l’éducation.'),
        h('li', null, '25 minutes. Pas d’indice, pas de correction avant la fin, comme le jour J.'),
        h('li', null, 'À la fin : ta note sur 20 et la correction expliquée de chaque question.')),
      h('button', { type: 'button', class: 'ex-btn ex-primary', onclick: run }, 'Lancer l’examen'),
      s.blanc.length ? h('div', { class: 'ex-history' }, h('h3', null, 'Tes derniers résultats'), h('ol', null, s.blanc.map((b) => h('li', null, h('b', null, `${b.score}/20`), ' · ', new Date(b.at).toLocaleDateString('fr-FR'))))) : null));
  function run() {
    const set = blancSet(); const ans = new Array(set.length).fill(null); let i = 0; let left = 25 * 60;
    const clock = h('span', { class: 'ex-clock', role: 'timer' }, '25:00');
    const tick = setInterval(() => {
      if (!clock.isConnected) { clearInterval(tick); return; }
      left--; clock.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
      clock.classList.toggle('warn', left <= 120);
      if (left <= 0) { clearInterval(tick); finish(); }
    }, 1000);
    const show = () => {
      const q = set[i]; const p = partById(q.part);
      const nextBtn = h('button', { type: 'button', class: 'ex-btn ex-primary', disabled: ans[i] == null, onclick: () => { if (i < set.length - 1) { i++; show(); window.scrollTo(0, 0); } else { clearInterval(tick); finish(); } } }, i < set.length - 1 ? 'Question suivante' : 'Rendre ma copie');
      const opts = h('div', { class: 'ex-opts' }, q.options.map((o, k) => h('button', { type: 'button', class: 'ex-opt' + (ans[i] === k ? ' sel' : ''), onclick: (e) => {
        ans[i] = k; [...opts.children].forEach((c, j) => c.classList.toggle('sel', j === k)); nextBtn.disabled = false; audio.play('click');
      } }, h('span', { class: 'ex-letter' }, letters(q.lang)[k]), h('span', null, o))));
      root.replaceChildren(h('div', { class: 'ex-player', style: `--c:${p.color}` },
        h('div', { class: 'ex-ptop' }, h('a', { class: 'ex-x', href: BASE, 'aria-label': 'Abandonner' }, '✕'),
          h('span', { class: 'ex-prog big' }, h('i', { style: `--w:${(i / set.length) * 100}%` })), clock),
        h('article', { class: 'ex-card ex-qcard', ...langAttrs(q.lang) },
          h('div', { class: 'ex-qmeta' }, h('span', { class: 'ex-tagp' }, `${p.icon} ${p.short}`), h('small', null, `${i + 1}/${set.length}`)),
          h('h2', { class: 'ex-q', tabindex: '-1' }, q.q), opts),
        h('footer', { class: 'ex-foot' }, nextBtn)));
    };
    const finish = () => {
      const good = set.filter((q, k) => ans[k] === q.answer).length;
      const score = Math.round((good / set.length) * 20 * 2) / 2;
      st.blancDone(score);
      audio.play(score >= 14 ? 'complete' : score >= 10 ? 'success' : 'error');
      if (score >= 14) celebrate();
      root.replaceChildren(
        h('section', { class: 'ex-end' },
          h('div', { class: 'ex-end-badge', 'aria-hidden': 'true' }, score >= 14 ? '🏆' : score >= 10 ? '👍' : '📚'),
          h('h2', { tabindex: '-1' }, `${score}/20`),
          h('p', null, score >= 14 ? 'Excellent niveau : tu es prêt pour le jour J.' : score >= 10 ? 'La moyenne est là. Revois les questions ratées ci-dessous.' : 'Continue l’entraînement : les questions ratées sont ajoutées à ta révision.'),
          h('div', { class: 'ex-end-stats' }, h('span', null, h('b', null, `${good}/${set.length}`), h('small', null, 'bonnes réponses')), h('span', null, h('b', null, `+${Math.round(score * 3)}`), h('small', null, 'XP')))),
        h('ol', { class: 'ex-correction' }, set.map((q, k) => {
          const ok = ans[k] === q.answer;
          if (!ok && !st.state.review.includes(q.id)) st.state.review.push(q.id);
          return h('li', { class: ok ? 'ok' : 'ko', ...langAttrs(q.lang) },
            h('details', null, h('summary', null, h('span', { 'aria-hidden': 'true' }, ok ? '✓ ' : '✗ '), q.q),
              ans[k] != null && !ok ? h('p', { class: 'ex-yours' }, `${q.lang === 'ar' ? 'جوابك' : 'Ta réponse'} : ${letters(q.lang)[ans[k]]}. ${q.options[ans[k]]}`) : null,
              h('p', { class: 'ex-reveal' }, `${q.lang === 'ar' ? 'الجواب الصحيح' : 'Bonne réponse'} : ${letters(q.lang)[q.answer]}. ${q.options[q.answer]}`),
              q.just ? h('p', null, q.just) : null,
              h('p', null, conceptFor(q).why),
              h('p', { class: 'ex-src' }, '📚 ', conceptFor(q).src)));
        })),
        h('div', { class: 'ex-actions col' }, h('button', { type: 'button', class: 'ex-btn ex-primary', onclick: run }, 'Nouvel examen blanc'), h('a', { class: 'ex-btn', href: BASE }, 'Retour au parcours')));
      st.save();
    };
    show();
  }
  intro();
  return [topbar(st, { title: 'Examen blanc', back: BASE }), root, bottomNav('blanc')];
}

// ---------- Profil ----------
function profileScreen(st) {
  const s = st.state; const r = rankOf(s.xp);
  const badges = h('ul', { class: 'ex-badges' }, BADGES.map((b, i) => h('li', { class: s.badges[b.id] ? 'got' : '', style: `--i:${i}`, title: b.d },
    h('span', { class: 'ex-bico', 'aria-hidden': 'true' }, b.icon), h('b', null, b.t), h('small', null, s.badges[b.id] ? new Date(s.badges[b.id]).toLocaleDateString('fr-FR') : b.d))));
  const notifBtn = h('button', { type: 'button', class: 'ex-btn' + (s.sysNotif ? ' ex-on' : '') }, s.sysNotif ? '🔔 Notifications système activées' : '🔕 Activer les notifications système');
  notifBtn.addEventListener('click', async () => {
    if (s.sysNotif) { st.setSysNotif(false); notifBtn.textContent = '🔕 Activer les notifications système'; notifBtn.classList.remove('ex-on'); return; }
    let perm = 'denied';
    try { perm = typeof Notification !== 'undefined' ? await Notification.requestPermission() : 'denied'; } catch {}
    if (perm === 'granted') { st.setSysNotif(true); notifBtn.textContent = '🔔 Notifications système activées'; notifBtn.classList.add('ex-on'); st.notify('info', 'Notifications activées', 'Tu seras prévenu de tes badges et de tes objectifs, même dans un autre onglet.', '🔔'); }
    else st.notify('info', 'Notifications système indisponibles', 'Ton navigateur les refuse. Les notifications restent visibles dans la cloche 🔔.', '🔕');
  });
  let armed = false;
  const resetBtn = h('button', { type: 'button', class: 'ex-btn ex-danger', onclick: () => {
    if (!armed) { armed = true; resetBtn.textContent = 'Confirmer : tout effacer'; setTimeout(() => { armed = false; resetBtn.textContent = 'Réinitialiser ma progression'; }, 4000); return; }
    st.reset(); go(BASE);
  } }, 'Réinitialiser ma progression');
  const totalSeen = Object.keys(s.seen).length;
  return [topbar(st, { title: 'Profil', back: BASE }), h('div', { class: 'ex-body' },
    h('section', { class: 'ex-hero' }, h('div', { class: 'ex-rank' }, h('span', { class: 'ex-rank-ico', 'aria-hidden': 'true' }, r.icon), h('div', null, h('small', null, 'Rang'), h('b', null, r.fr), h('small', null, `${s.xp} XP au total`)))),
    h('div', { class: 'ex-statgrid' },
      h('div', null, h('b', null, String(s.answered)), h('small', null, 'réponses')),
      h('div', null, h('b', null, `${totalSeen}/${QUESTIONS.length}`), h('small', null, 'questions vues')),
      h('div', null, h('b', null, `🔥 ${s.streak}`), h('small', null, 'jours de suite')),
      h('div', null, h('b', null, `×${s.bestCombo}`), h('small', null, 'meilleur combo'))),
    h('h2', { class: 'ex-h2' }, `Badges · ${Object.keys(s.badges).length}/${BADGES.length}`), badges,
    h('h2', { class: 'ex-h2' }, 'Réglages'),
    h('div', { class: 'ex-actions col' }, notifBtn, resetBtn),
    h('p', { class: 'ex-muted' }, 'Ta progression reste dans ce navigateur, liée à ton pseudo InfoPlay. Sources des questions : dossiers unifiés de préparation à l’examen d’aptitude professionnelle (informatique, secondaire qualifiant).')), bottomNav('profil')];
}

// ---------- Point d'entrée ----------
export function examenScreen(q, pid) {
  const st = storeFor(pid || 'invite');
  if (!greeted) { greeted = true; st.greet(); }
  const sub = q.slice(1);
  let view;
  const p = sub[0] === 'p' ? partById(sub[1]) : null;
  if (p && sub[2] === 'lecon') view = lessonPlayer(st, p);
  else if (p && sub[2] === 'n' && /^\d+$/.test(sub[3] || '')) view = quizPlayer(st, { mode: 'level', part: p, k: +sub[3] });
  else if (p) view = partPage(st, p);
  else if (sub[0] === 'revision') view = quizPlayer(st, { mode: 'review' });
  else if (sub[0] === 'blanc') view = blancScreen(st);
  else if (sub[0] === 'profil') view = profileScreen(st);
  else view = hub(st);
  return h('main', { id: 'main', class: 'ex-app' }, view);
}
