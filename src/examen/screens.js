// Module « Examen professionnel » : interface mobile first, ludique (XP, cœurs, combos, séries,
// badges), notifications et feedback en feuille glissant du bas. Routes : #/examen/…
import { h, celebrate } from '../utils/dom.js';
import { audio } from '../audio/audio.js';
import { GROUPS, PARTS, partById } from './data/parts.js';
import {
  QUESTIONS, levelsOf, annalesStart, letters, hintFor, correctFeedback, wrongFeedback, createExamStore, rankOf,
  BADGES, DAILY_GOAL, HEARTS, XP, blancSet, byId, conceptFor,
  positionSet, analyzePosition, shuffleArr, shuffled, bandOf, levelOfScore, MASTERY_BANDS, POSITION_PLAN, exampleFor,
} from './engine.js';
import { conceptTitle } from './data/concept-titles.js';
import { LESSON_EXAMPLES } from './data/lesson-examples.js';
import { trBtn, trLine, trBlock } from './tr-ui.js';
import { sfx, sfxOn, setSfx } from './sfx.js';

// Encadré « Exemple » : un cas concret qui accompagne chaque explication.
function exampleBox(text, lang, label, ar) {
  if (!text) return null;
  return h('div', { class: 'ex-example' }, h('b', null, label || (lang === 'ar' ? '🧪 مثال' : '🧪 Exemple')), h('p', null, text), trLine(text, lang, ar));
}
import { visual } from './visuals.js';
import { themeButton, themePicker } from '../utils/theme.js';

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
    topMenu(),
    h('div', { class: 'ex-chips' },
      h('span', { class: 'ex-chip ex-fire' + (s.lastDay === new Date().toISOString().slice(0, 10) ? ' lit' : ''), title: 'Série de jours' }, '🔥', h('b', null, String(s.streak))),
      h('span', { class: 'ex-chip ex-xp', title: 'Points d’expérience' }, '⚡', h('b', null, String(s.xp))),
      bell, themeButton()),
    h('a', { class: 'ex-avatar' + (activeTab() === 'profil' ? ' on' : ''), href: BASE + '/profil', title: `Profil · ${rankOf(s.xp).fr}`, 'aria-label': 'Mon profil' }, h('span', { 'aria-hidden': 'true' }, rankOf(s.xp).icon)));
}
// Onglet actif, déduit de l'adresse.
function activeTab() {
  const hs = location.hash;
  if (hs.includes('/revision')) return 'rev';
  if (hs.includes('/blanc')) return 'blanc';
  if (hs.includes('/profil')) return 'profil';
  if (hs.includes('/diagnostic') || hs.includes('/positionnement')) return 'diag';
  return 'hub';
}
// Menu horizontal de l'en-tête (ordinateur) : remplace la barre latérale.
function topMenu() {
  const on = activeTab();
  const it = (id, icon, label, href) => h('a', { class: 'ex-tnav-i' + (on === id ? ' on' : ''), href, title: label, 'aria-current': on === id ? 'page' : null }, navIcon(icon), h('span', null, label));
  return h('nav', { class: 'ex-tnav', 'aria-label': 'Menu du module' },
    it('hub', 'hub', 'Parcours', BASE), it('diag', 'diag', 'Diagnostic', BASE + '/diagnostic'),
    it('rev', 'rev', 'Révision', BASE + '/revision'), it('blanc', 'blanc', 'Examen blanc', BASE + '/blanc'));
}
// Icônes plates monochromes (trait = couleur du texte), dessinées dans le code.
const NAV_ICONS = {
  hub: '<path d="M3 6.5 9 3.5l6 3 6-3v14l-6 3-6-3-6 3z"/><path d="M9 3.5v14M15 6.5v14"/>',
  rev: '<path d="M20 12a8 8 0 1 1-2.4-5.7L20 8.5"/><path d="M20 3.5v5h-5"/>',
  blanc: '<path d="M14 3H6.5A1.5 1.5 0 0 0 5 4.5v15A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5V8z"/><path d="M14 3v5h5M8.5 13h7M8.5 16.5h4.5"/>',
  diag: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  profil: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>',
};
function navIcon(id) {
  const span = h('span', { class: 'ex-nav-ico', 'aria-hidden': 'true' });
  span.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${NAV_ICONS[id]}</svg>`;
  return span;
}
function bottomNav(active) {
  const it = (id, label, href) => h('a', { class: 'ex-nav-i' + (active === id ? ' on' : ''), href, 'aria-current': active === id ? 'page' : null }, navIcon(id), h('small', null, label));
  return h('nav', { class: 'ex-nav', 'aria-label': 'Navigation du module' },
    it('hub', 'Parcours', BASE), it('rev', 'Révision', BASE + '/revision'), it('blanc', 'Examen blanc', BASE + '/blanc'), it('profil', 'Profil', BASE + '/profil'));
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
  const pos = st.lastPosition;
  if (!pos) return { href: BASE + '/diagnostic', label: 'Diagnostic des compétences', part: null };
  // Le parcours conseillé par le test passe en premier, puis l'ordre normal des parties.
  const ordered = [...pos.path.map(partById).filter(Boolean), ...PARTS.filter((p) => !pos.path.includes(p.id))];
  for (const p of ordered) {
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
    h('a', { class: 'ex-qk', href: BASE + '/revision' }, h('span', { 'aria-hidden': 'true' }, '♻️'), h('b', null, String(s.review.length)), h('small', null, 'à revoir')),
    h('a', { class: 'ex-qk', href: BASE + '/blanc' }, h('span', { 'aria-hidden': 'true' }, '📜'), h('b', null, s.blanc[0] ? `${s.blanc[0].score}/20` : '—'), h('small', null, 'examen blanc')),
    h('a', { class: 'ex-qk', href: BASE + '/profil' }, h('span', { 'aria-hidden': 'true' }, '🏅'), h('b', null, `${Object.keys(s.badges).length}/${BADGES.length}`), h('small', null, 'badges')));
  const groups = GROUPS.map((g) => h('section', { class: 'ex-group', ...langAttrs(g.lang) },
    h('header', null, h('span', { class: 'ex-gico', 'aria-hidden': 'true' }, g.icon), h('div', null, h('h2', null, g.title, trLine(g.title, g.lang)), h('p', null, g.sub, trLine(g.sub, g.lang))), trBtn(g.lang)),
    h('ol', { class: 'ex-parts' }, PARTS.filter((p) => p.group === g.id).map((p, i) => {
      const pr = st.partProgress(p.id);
      return h('li', { style: `--i:${i}` }, h('a', { class: 'ex-part' + (pr.done ? ' done' : ''), href: `${BASE}/p/${p.id}`, style: `--c:${p.color}` },
        h('span', { class: 'ex-pico' }, ring(pr.ratio, 58, 6, p.icon)),
        h('span', { class: 'ex-pmeta' }, h('b', null, p.title, trLine(p.title, p.lang)), h('small', null, `${pr.lesson ? '📖 ✓' : '📖'} · ${pr.count}/${pr.levels} niveaux · ⭐ ${pr.stars}/${pr.maxStars}`), bandChip(st, p.id)),
        h('span', { class: 'ex-chev', 'aria-hidden': 'true' }, g.lang === 'ar' ? '‹' : '›')));
    }))));
  // Mobile : une seule colonne. Ordinateur et grande tablette : tableau de bord à gauche, parcours à droite.
  // Mobile : une colonne. Ordinateur : bandeau « candidat » + diagnostic en haut, leçons en grille dessous.
  return [topbar(st, { title: 'Examen professionnel' }), h('div', { class: 'ex-body ex-dash' },
    h('div', { class: 'ex-hubtop' },
      h('section', { class: 'ex-cand', 'aria-label': 'Candidat' },
        h('p', { class: 'ex-intro' }, 'Prépare l’examen d’aptitude professionnelle d’informatique (secondaire qualifiant) : une leçon animée, puis des niveaux de QCM corrigés et expliqués.'),
        hero, h('div', { class: 'ex-cand-row' }, cta, quick)),
      h('section', { class: 'ex-diag', 'aria-label': 'Diagnostic' }, positionCard(st))),
    h('div', { class: 'ex-lessons' }, ...groups)), bottomNav('hub')];
}

// ---------- Page d'une partie ----------
function partPage(st, p) {
  const pr = st.partProgress(p.id); const lv = levelsOf(p.id); const T = L[p.lang];
  const lesson = h('a', { class: 'ex-lesson-tile' + (pr.lesson ? ' done' : ''), href: `${BASE}/p/${p.id}/lecon` },
    h('span', { class: 'ex-lt-ico', 'aria-hidden': 'true' }, pr.lesson ? '✅' : '📖'),
    h('span', null, h('b', null, p.lang === 'ar' ? 'الدرس المختصر' : p.lesson.some((c) => c.keys) ? 'Leçon ciblée' : 'Leçon express'), h('small', null, `${p.lesson.length} ${p.lang === 'ar' ? 'بطاقات متحركة · +' : 'cartes animées · +'}${XP.lessonDone + p.lesson.length * XP.lessonCard} XP`)),
    h('span', { class: 'ex-chev', 'aria-hidden': 'true' }, p.lang === 'ar' ? '‹' : '›'));
  const a0 = annalesStart(p.id); const ar = p.lang === 'ar';
  const path = h('ol', { class: 'ex-path' }, lv.flatMap((qs, k) => {
    const done = st.state.levels[p.id + ':' + k]; const next = st.isLevelNext(p.id, k);
    const ann = a0 >= 0 && k >= a0;
    const stars = done ? '★'.repeat(done.stars) + '☆'.repeat(3 - done.stars) : '';
    const name = ann ? `${ar ? 'حوليات' : 'Annales'} ${k - a0 + 1}` : `${ar ? 'المستوى' : 'Niveau'} ${k + 1}`;
    const inner = [h('span', { class: 'ex-node-c', 'aria-hidden': 'true' }, done ? '✓' : ann ? '📝' : String(k + 1)), h('span', { class: 'ex-node-t' }, h('b', null, name), h('small', null, done ? stars : `${qs.length} questions`))];
    // Tous les niveaux s'ouvrent ; ceux qui ne sont ni faits ni conseillés restent pâles.
    const state = done ? 'done' : next ? 'open' : 'pending';
    const tip = done ? null : next ? (ar ? 'المستوى الموصى به' : 'Niveau conseillé') : (ar ? 'لم يحن دوره بعد، لكنه متاح' : 'Pas encore à ton programme, mais accessible');
    const node = h('li', { style: `--i:${k}`, class: (k % 2 ? 'r' : 'l') + (ann ? ' ann' : '') },
      h('a', { class: 'ex-lnode ' + state, href: `${BASE}/p/${p.id}/n/${k}`, title: tip }, ...inner));
    if (k !== a0) return [node];
    const sep = h('li', { class: 'ex-path-sep' }, h('b', null, ar ? '📝 حوليات الامتحان المهني 2021-2025' : '📝 Annales officielles 2021-2025'),
      h('small', null, ar ? 'أسئلة مستخرجة من مواضيع الامتحان: اختيار من متعدد، صحيح أو خطأ، ملء الفراغ. مفتوحة مباشرة.' : 'Questions tirées des sujets du concours : QCM, vrai/faux et phrases à compléter. Accessibles tout de suite.'));
    return [sep, node];
  }));
  return [topbar(st, { title: p.short, back: BASE }), h('div', { class: 'ex-body ex-split', style: `--c:${p.color}`, ...langAttrs(p.lang) },
    h('aside', { class: 'ex-side' },
      h('section', { class: 'ex-phead' }, h('span', { class: 'ex-phead-ico', 'aria-hidden': 'true' }, p.icon), h('div', null, h('h2', null, p.title, trLine(p.title, p.lang)), h('p', null, p.weight, trLine(p.weight, p.lang))),
        h('div', { class: 'ex-phead-stats' }, trBtn(p.lang), h('span', null, `⭐ ${pr.stars}/${pr.maxStars}`), h('span', null, `🎯 ${pr.count}/${pr.levels}`), bandChip(st, p.id, true))),
      lesson,
      !pr.lesson ? h('p', { class: 'ex-tip' }, p.lang === 'ar' ? '💡 ابدأ بالدرس: يمنحك نقاطا ويهيئك للأسئلة.' : '💡 Commence par la leçon : elle rapporte des XP et prépare aux questions.') : null),
    h('div', { class: 'ex-main' }, path)), bottomNav('hub')];
}

// ---------- Lecteur de leçon ----------
function lessonPlayer(st, p) {
  const T = L[p.lang]; let i = 0;
  const root = h('div', { class: 'ex-player', style: `--c:${p.color}`, ...langAttrs(p.lang) });
  const render = () => {
    const card = p.lesson[i]; let answered = false;
    const nextBtn = h('button', { type: 'button', class: 'ex-btn ex-primary', disabled: true }, i < p.lesson.length - 1 ? T.next : (p.lang === 'ar' ? 'إنهاء الدرس' : 'Terminer la leçon'));
    // Choix du mini-défi dans un ordre aléatoire à chaque passage.
    const ord = shuffleArr(card.check.o.map((_, k) => k)); const ansPos = ord.indexOf(card.check.a);
    const choices = h('div', { class: 'ex-choices' }, ord.map((k, pos) => [k, card.check.o[k], pos]).map(([k, o, pos]) => h('button', { type: 'button', class: 'ex-choice', onclick: (e) => {
      if (answered) return; answered = true;
      const ok = k === card.check.a; const btn = e.currentTarget;
      btn.classList.add(ok ? 'ok' : 'ko');
      choices.children[ansPos].classList.add('ok');
      [...choices.children].forEach((c) => c.setAttribute('aria-disabled', 'true'));
      why.hidden = false; why.className = 'ex-why ' + (ok ? 'ok' : 'ko');
      if (ok) { sfx('correct'); vibrate(25); st.lessonCard(p.id); floatXp(btn, XP.lessonCard); } else { sfx('wrong'); vibrate([50, 30, 50]); }
      nextBtn.disabled = false; nextBtn.focus();
    } }, h('span', { class: 'ex-letter' }, letters(p.lang)[pos]), h('span', null, o, trLine(o, p.lang)))));
    const why = h('p', { class: 'ex-why', hidden: true }, card.check.why, trLine(card.check.why, p.lang));
    nextBtn.addEventListener('click', () => { if (i < p.lesson.length - 1) { i++; render(); window.scrollTo(0, 0); } else done(); });
    root.replaceChildren(
      playerTop(`${BASE}/p/${p.id}`, (i + 1) / p.lesson.length, null),
      h('article', { class: 'ex-card ex-lcard', key: i },
        h('div', { class: 'ex-eyebrow-row' }, h('small', { class: 'ex-eyebrow' }, `${p.icon} ${p.short} · ${i + 1}/${p.lesson.length}`), trBtn(p.lang)),
        h('h2', { tabindex: '-1' }, card.t, trLine(card.t, p.lang)),
        h('p', { class: 'ex-lead' }, card.p, trLine(card.p, p.lang)),
        keysBox(card.keys, p.lang),
        visual(card.v, { color: p.color, lang: p.lang }),
        exampleBox(LESSON_EXAMPLES[p.id]?.[i], p.lang, p.lang === 'ar' ? '🧪 مثال من القسم' : '🧪 Exemple en classe'),
        h('aside', { class: 'ex-fact' }, h('span', { 'aria-hidden': 'true' }, '📚'), h('div', null, h('p', null, card.fact.t, trLine(card.fact.t, p.lang)), h('small', null, card.fact.src))),
        h('section', { class: 'ex-check' }, h('h3', null, p.lang === 'ar' ? '⚡ تحدٍّ سريع' : '⚡ Mini-défi'), h('p', null, card.check.q, trLine(card.check.q, p.lang)), choices, why)),
      h('footer', { class: 'ex-foot' }, nextBtn));
    root.querySelector('h2')?.focus({ preventScroll: true });
  };
  const done = () => {
    st.lessonDone(p.id); audio.play('complete'); celebrate();
    root.replaceChildren(h('section', { class: 'ex-end' },
      h('div', { class: 'ex-end-badge', 'aria-hidden': 'true' }, '📖'),
      h('h2', { tabindex: '-1' }, p.lang === 'ar' ? 'انتهى الدرس!' : 'Leçon terminée !'),
      h('p', null, p.lang === 'ar' ? 'المستوى 1 في انتظارك.' : 'Le niveau 1 t’attend.'),
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

// ---------- Types de questions des annales : QCM, vrai/faux, phrase à trous ----------
const GAP = '____';
/** Repère d'option : lettre pour un QCM ou une phrase à trous, ✓ / ✗ pour un vrai/faux. */
const optMark = (q, i) => (q.type === 'vf' ? (i === 0 ? '✓' : '✗') : letters(q.lang)[i]);
/** Énoncé ; pour une phrase à trous, le trou devient une case remplie par le mot choisi. */
function questionText(q, gap) {
  if (!gap || !q.q.includes(GAP)) return [q.q];
  const [a, b] = q.q.split(GAP);
  return [a, gap, b];
}
const examChip = (q) => (q.exam ? h('span', { class: 'ex-exam-chip', title: q.lang === 'ar' ? 'مستخرج من موضوع الامتحان' : 'Tiré du sujet officiel' }, `📝 ${q.exam}`) : null);
/** Fiche de notion dans l'indice : définition, caractéristiques, renvoi à la carte de leçon. */
/** Bonne réponse dans l'indice : option attendue et pourquoi elle est juste. */
function answerBox(a, lang) {
  if (!a) return null;
  const ar = lang === 'ar';
  return h('section', { class: 'ex-hans' },
    h('p', { class: 'ex-hans-k' }, ar ? '✅ الجواب الصحيح' : '✅ Bonne réponse'),
    h('p', { class: 'ex-hans-a' }, a.mark ? h('span', { class: 'ex-letter' }, a.mark) : null, h('b', null, a.text)),
    a.why ? h('p', { class: 'ex-hans-why' }, h('b', null, ar ? 'لماذا؟ ' : 'Pourquoi ? '), a.why) : null,
    ar ? null : trBlock([(a.mark ? a.mark + '. ' : '') + a.textAr, a.whyAr ? 'لماذا؟ ' + a.whyAr : ''], lang, 'الجواب الصحيح'));
}
function notionBox(n, lang) {
  return h('section', { class: 'ex-notion' },
    h('h3', null, '📘 ', n.title, trLine(n.title, lang)),
    h('p', { class: 'ex-notion-def' }, h('b', null, 'Définition. '), n.def, trLine(n.def, lang)),
    h('p', { class: 'ex-notion-k' }, 'Caractéristiques'),
    h('ul', null, n.traits.map((t) => h('li', null, t, trLine(t, lang)))),
    n.card ? h('p', { class: 'ex-notion-card' }, `📖 Leçon, carte ${n.card.n} : « ${n.card.t} »`) : null);
}

/** Bloc « À retenir » d'une carte de leçon. */
function keysBox(keys, lang) {
  if (!keys?.length) return null;
  return h('section', { class: 'ex-keys' },
    h('h3', null, lang === 'ar' ? '🎯 أحفظ' : '🎯 À retenir'),
    h('ul', null, keys.map((k) => h('li', null, k, trLine(k, lang)))));
}

function typeHint(q) {
  if (q.type !== 'vf' && q.type !== 'fill') return null;
  const ar = q.lang === 'ar';
  const t = q.type === 'vf' ? (ar ? 'صحيح أم خطأ؟' : 'Vrai ou faux ?') : (ar ? 'املأ الفراغ بالكلمة المناسبة' : 'Complète la phrase avec le mot qui convient');
  return h('p', { class: 'ex-qtype' }, q.type === 'vf' ? '⚖️ ' : '✍️ ', t);
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
  // Questions et propositions dans un ordre aléatoire à chaque tentative.
  list = shuffleArr(list).map((q) => shuffled(q));
  const R = { idx: 0, hearts: HEARTS, combo: 0, maxCombo: 0, firstTry: 0, hints: 0, mistakes: 0, xp: 0 };
  const root = h('div', { class: 'ex-player' + (mode === 'review' ? ' review' : '') });

  const render = () => {
    const q = list[R.idx]; const T = L[q.lang]; const p = partById(q.part);
    let selected = null; let attempt = 1; let hinted = false; const off = new Set();
    root.style.setProperty('--c', p.color);
    const heart = mode === 'level' ? h('span', { class: 'ex-hearts', 'aria-label': `${R.hearts} cœurs` }, '❤️', h('b', null, String(R.hearts))) : h('span', { class: 'ex-chip' }, '♻️');
    const combo = h('span', { class: 'ex-combo' + (R.combo >= 2 ? ' on' : ''), 'aria-live': 'polite' }, `🔥 ×${R.combo}`);
    const checkBtn = h('button', { type: 'button', class: 'ex-btn ex-primary', disabled: true }, T.check);
    const gap = q.type === 'fill' ? h('span', { class: 'ex-gap', 'aria-live': 'polite' }, '   ') : null;
    const opts = h('div', { class: 'ex-opts' + (q.type === 'vf' ? ' ex-vf' : q.type === 'fill' ? ' ex-fill' : ''), role: 'radiogroup', 'aria-label': 'Réponses' }, q.options.map((o, i) => {
      const b = h('button', { type: 'button', class: 'ex-opt', role: 'radio', 'aria-checked': 'false', style: `--i:${i}` }, h('span', { class: 'ex-letter' }, optMark(q, i)), h('span', null, o, trLine(o, q.lang)));
      b.addEventListener('click', () => {
        if (off.has(i)) return; selected = i;
        [...opts.children].forEach((c, j) => { c.classList.toggle('sel', j === i); c.setAttribute('aria-checked', String(j === i)); });
        if (gap) { gap.textContent = o; gap.classList.add('on'); }
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
        h('div', { class: 'ex-sheet-head' }, h('h2', null, '💡 ', T.hint), trBtn(q.lang)),
        hi.notion ? notionBox(hi.notion, q.lang) : null,
        h('p', { class: 'ex-sheet-lead' }, hi.notion ? h('b', null, 'Piste : ') : null, hi.text),
        hi.elim ? h('p', { class: 'ex-elim' }, h('b', null, T.elim + ' : '), hi.elim) : null,
        trBlock([hi.textAr, hi.elimAr ? 'استبعاد : ' + hi.elimAr : ''], q.lang),
        answerBox(hi.answer, q.lang),
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
        h('div', { class: 'ex-fb-head' }, h('span', { class: 'ex-fb-ico', 'aria-hidden': 'true' }, fb.ok ? '✓' : '✗'), h('h2', null, fb.title), xpTag, trBtn(q.lang)),
        h('div', { class: 'ex-fb-body' }, fb.body.map((t, i) => h('p', { class: i === 0 && fb.reveal ? 'ex-reveal' : '' }, t))),
        trBlock(fb.bodyAr, q.lang, fb.titleAr),
        exampleBox(fb.ex, q.lang, null, fb.exAr),
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
        sfx('correct'); vibrate(30); floatXp(opts.children[selected], xp);
        combo.textContent = `🔥 ×${R.combo}`; combo.classList.toggle('on', R.combo >= 2);
        if (R.combo > 0 && R.combo % 5 === 0) st.notify('combo', `Combo ×${R.combo} !`, 'Tes réponses s’enchaînent : continue sur ta lancée.', '⚡');
        feedbackSheet({ ...correctFeedback(q, attempt), xp }, () => next());
        return;
      }
      R.combo = 0; R.mistakes++; combo.classList.remove('on');
      if (attempt === 1) st.answer(q, { ok: false, attempt: 1, combo: 0, hinted, review: mode === 'review' });
      if (mode === 'level') { R.hearts--; heart.querySelector('b').textContent = String(R.hearts); heart.classList.remove('hit'); void heart.offsetWidth; heart.classList.add('hit'); }
      opts.children[selected].classList.add('ko');
      sfx('wrong'); vibrate([60, 40, 60]);
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
        h('div', { class: 'ex-qmeta' }, h('span', { class: 'ex-tagp' }, `${p.icon} ${p.short}`), examChip(q), h('small', null, `${R.idx + 1}/${list.length}`), trBtn(q.lang)),
        typeHint(q),
        h('h2', { class: 'ex-q', tabindex: '-1' }, ...questionText(q, gap), trLine(q.q, q.lang)),
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
    const set = blancSet().map((q) => shuffled(q)); const ans = new Array(set.length).fill(null); let i = 0; let left = 25 * 60;
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
        ans[i] = k; [...opts.children].forEach((c, j) => c.classList.toggle('sel', j === k)); nextBtn.disabled = false;
      } }, h('span', { class: 'ex-letter' }, letters(q.lang)[k]), h('span', null, o, trLine(o, q.lang)))));
      root.replaceChildren(h('div', { class: 'ex-player', style: `--c:${p.color}` },
        h('div', { class: 'ex-ptop' }, h('a', { class: 'ex-x', href: BASE, 'aria-label': 'Abandonner' }, '✕'),
          h('span', { class: 'ex-prog big' }, h('i', { style: `--w:${(i / set.length) * 100}%` })), clock),
        h('article', { class: 'ex-card ex-qcard', ...langAttrs(q.lang) },
          h('div', { class: 'ex-qmeta' }, h('span', { class: 'ex-tagp' }, `${p.icon} ${p.short}`), h('small', null, `${i + 1}/${set.length}`), trBtn(q.lang)),
          h('h2', { class: 'ex-q', tabindex: '-1' }, q.q, trLine(q.q, q.lang)), opts),
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
        h('div', { class: 'ex-tr-row' }, trBtn('fr')),
        h('ol', { class: 'ex-correction' }, set.map((q, k) => {
          const ok = ans[k] === q.answer;
          if (!ok && !st.state.review.includes(q.id)) st.state.review.push(q.id);
          return h('li', { class: ok ? 'ok' : 'ko', ...langAttrs(q.lang) },
            h('details', null, h('summary', null, h('span', { 'aria-hidden': 'true' }, ok ? '✓ ' : '✗ '), q.q, trLine(q.q, q.lang)),
              ans[k] != null && !ok ? h('p', { class: 'ex-yours' }, `${q.lang === 'ar' ? 'جوابك' : 'Ta réponse'} : ${letters(q.lang)[ans[k]]}. ${q.options[ans[k]]}`) : null,
              h('p', { class: 'ex-reveal' }, `${q.lang === 'ar' ? 'الجواب الصحيح' : 'Bonne réponse'} : ${letters(q.lang)[q.answer]}. ${q.options[q.answer]}`, trLine(q.options[q.answer], q.lang)),
              q.just ? h('p', null, q.just, trLine(q.just, q.lang)) : null,
              h('p', null, conceptFor(q).why, trLine(conceptFor(q).why, q.lang)),
              exampleBox(exampleFor(q), q.lang),
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
    h('section', { class: 'ex-card' }, themePicker()),
    h('div', { class: 'ex-actions col' }, soundBtn(), notifBtn, resetBtn),
    h('p', { class: 'ex-muted' }, 'Ta progression reste dans ce navigateur, liée à ton pseudo InfoPlay. Sources des questions : dossiers unifiés de préparation à l’examen d’aptitude professionnelle (informatique, secondaire qualifiant).')), bottomNav('profil')];
}

function soundBtn() {
  const label = () => (sfxOn() ? '🔊 Effets sonores activés' : '🔇 Activer les effets sonores');
  const b = h('button', { type: 'button', class: 'ex-btn' + (sfxOn() ? ' ex-on' : ''), onclick: () => { setSfx(!sfxOn()); b.textContent = label(); b.classList.toggle('ex-on', sfxOn()); sfx('correct'); } }, label());
  return b;
}

// ---------- Évaluation diagnostique des compétences (test de positionnement) ----------
const BAND_LABEL = { fr: { ok: 'Maîtrisé', mid: 'À consolider', low: 'Prioritaire' }, ar: { ok: 'متمكن', mid: 'يحتاج تثبيتا', low: 'أولوية' } };
function bandChip(st, partId, big = false) {
  const pos = st.lastPosition; const r = pos?.parts?.[partId];
  if (!r) return null;
  const lang = partById(partId)?.lang || 'fr';
  return h('span', { class: `ex-band ex-band-${r.band}` + (big ? ' big' : ''), title: `Diagnostic des compétences : ${r.ok}/${r.n}` }, BAND_LABEL[lang][r.band]);
}
function positionCard(st) {
  const pos = st.lastPosition;
  if (!pos) return h('a', { class: 'ex-poscard todo', href: BASE + '/diagnostic' },
    h('span', { class: 'ex-pos-ico', 'aria-hidden': 'true' }, '🧭'),
    h('span', null, h('small', null, 'À faire en premier'), h('b', null, 'Évaluation diagnostique des compétences'), h('small', null, '30 questions de type examen · environ 20 min · repère tes lacunes avant les leçons')),
    h('span', { class: 'ex-chev', 'aria-hidden': 'true' }, '›'));
  const lv = levelOfScore(pos.ratio);
  return h('a', { class: 'ex-poscard', href: BASE + '/diagnostic/bilan' },
    h('span', { class: 'ex-pos-ico', 'aria-hidden': 'true' }, lv.icon),
    h('span', null, h('small', null, 'Mon diagnostic des compétences'), h('b', null, `${pos.score}/20 · ${lv.fr}`), h('small', null, pos.priorities.length ? `${pos.priorities.length} partie(s) prioritaire(s) · voir le bilan` : 'Aucune partie prioritaire · voir le bilan')),
    h('span', { class: 'ex-chev', 'aria-hidden': 'true' }, '›'));
}

function positionScreen(st, showReport) {
  const root = h('div', { class: 'ex-body ex-pos' });
  const groupName = { D: 'Didactique', M: 'Programme du TC', A: 'Sciences de l’éducation' };

  const intro = () => {
    const prev = st.lastPosition;
    root.replaceChildren(h('section', { class: 'ex-card ex-pos-intro' },
      h('div', { class: 'ex-end-badge', 'aria-hidden': 'true' }, '🧭'),
      h('h2', { tabindex: '-1' }, 'Évaluation diagnostique des compétences'),
      h('p', { class: 'ex-lead' }, 'Avant de commencer les leçons, mesure ton niveau sur l’ensemble de l’épreuve. Le bilan te montre tes lacunes, notion par notion, et réordonne ton parcours.'),
      h('ul', { class: 'ex-plan' },
        h('li', null, h('b', null, '12'), h('span', null, 'questions de didactique (3 par axe : planifier, gérer, évaluer, remédier)')),
        h('li', null, h('b', null, '8'), h('span', null, 'questions sur les 4 modules du tronc commun')),
        h('li', null, h('b', null, '10'), h('span', null, 'questions de sciences de l’éducation, en arabe')),
      ),
      h('ul', { class: 'ex-rules' },
        h('li', null, 'Questions de type examen, tirées en priorité des QCM « niveau examen 2025 » du qualifiant.'),
        h('li', null, 'Choisis une réponse puis touche « Question suivante ». Pas de correction pendant l’évaluation, pas d’indice, pas de cœurs.'),
        h('li', null, 'Si tu ne sais pas, touche « Je ne sais pas » plutôt que de deviner : le diagnostic sera plus juste.')),
      h('div', { class: 'ex-actions col' },
        h('button', { type: 'button', class: 'ex-btn ex-primary', onclick: run }, prev ? 'Refaire l’évaluation' : 'Commencer l’évaluation'),
        prev ? h('a', { class: 'ex-btn', href: BASE + '/diagnostic/bilan' }, `Voir mon dernier bilan (${prev.score}/20)`) : null)));
  };

  function run() {
    const set = shuffleArr(positionSet()).map((q) => shuffled(q)); const ans = new Array(set.length).fill(undefined); let i = 0; const t0 = Date.now();
    const show = () => {
      const q = set[i]; const p = partById(q.part);
      const go = (val) => { ans[i] = val; if (i < set.length - 1) { i++; show(); window.scrollTo(0, 0); } else finish(); };
      const nextBtn = h('button', { type: 'button', class: 'ex-btn ex-primary', disabled: ans[i] == null, onclick: () => go(ans[i]) }, i < set.length - 1 ? (q.lang === 'ar' ? 'السؤال التالي' : 'Question suivante') : (q.lang === 'ar' ? 'عرض الحصيلة' : 'Voir mon bilan'));
      const opts = h('div', { class: 'ex-opts' }, q.options.map((o, k) => h('button', { type: 'button', class: 'ex-opt' + (ans[i] === k ? ' sel' : ''), style: `--i:${k}`, onclick: () => {
        ans[i] = k; [...opts.children].forEach((c, j) => c.classList.toggle('sel', j === k)); nextBtn.disabled = false;
      } }, h('span', { class: 'ex-letter' }, letters(q.lang)[k]), h('span', null, o, trLine(o, q.lang)))));
      const dunno = h('button', { type: 'button', class: 'ex-hint-btn ex-dunno', onclick: () => go(null) }, q.lang === 'ar' ? '🤷 لا أعرف' : '🤷 Je ne sais pas');
      root.replaceChildren(h('div', { class: 'ex-player', style: `--c:${p.color}` },
        h('div', { class: 'ex-ptop' }, h('a', { class: 'ex-x', href: BASE, 'aria-label': 'Abandonner l’évaluation' }, '✕'),
          h('span', { class: 'ex-prog big', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(set.length), 'aria-valuenow': String(i) }, h('i', { style: `--w:${(i / set.length) * 100}%` })),
          h('span', { class: 'ex-chip' }, `${i + 1}/${set.length}`)),
        h('article', { class: 'ex-card ex-qcard', ...langAttrs(q.lang) },
          h('div', { class: 'ex-qmeta' }, h('span', { class: 'ex-tagp' }, `${p.icon} ${groupName[q.part[0]]} · ${p.short}`), h('small', null, q.set === 1 ? (q.lang === 'ar' ? 'نموذج امتحان' : 'type examen 2025') : ''), trBtn(q.lang)),
          h('h2', { class: 'ex-q', tabindex: '-1' }, q.q, trLine(q.q, q.lang)), opts, dunno),
        h('footer', { class: 'ex-foot' }, nextBtn)));
      root.querySelector('.ex-q')?.focus({ preventScroll: true });
    };
    const finish = () => {
      const answers = ans.map((a) => (a === undefined ? null : a));
      const res = analyzePosition(set, answers);
      res.minutes = Math.max(1, Math.round((Date.now() - t0) / 60000));
      st.positionDone(res, res.missed);
      audio.play(res.ratio >= 0.6 ? 'complete' : 'success');
      if (res.ratio >= 0.6) celebrate();
      report(res, set, answers);
    };
    show();
  }

  function report(res, set = null, answers = null) {
    const lv = levelOfScore(res.ratio);
    const bar = (ratio, band) => h('span', { class: 'ex-mbar ex-band-' + band }, h('i', { style: `--w:${Math.round(ratio * 100)}%` }));
    const groupsEl = h('div', { class: 'ex-pos-groups' }, ['D', 'M', 'A'].map((g) => {
      const v = res.groups[g]; if (!v) return null; const b = bandOf(v.ratio);
      return h('div', { class: 'ex-pos-g' }, h('b', null, groupName[g]), bar(v.ratio, b.id), h('small', null, `${v.ok}/${v.n} · ${b.fr}`));
    }));
    const partsEl = h('ol', { class: 'ex-pos-parts' }, PARTS.map((p) => {
      const r = res.parts[p.id]; if (!r) return null;
      return h('li', { style: `--c:${p.color}` }, h('a', { href: `${BASE}/p/${p.id}`, ...langAttrs(p.lang) },
        h('span', { class: 'ex-pos-pi', 'aria-hidden': 'true' }, p.icon),
        h('span', { class: 'ex-pos-pt' }, h('b', null, p.title), bar(r.ok / r.n, r.band)),
        h('span', { class: `ex-band ex-band-${r.band}` }, `${r.ok}/${r.n} · ${BAND_LABEL[p.lang][r.band]}`)));
    }));
    const gapsEl = res.gaps.length ? h('ul', { class: 'ex-gaps' }, res.gaps.map((g) => {
      const p = partById(g.part);
      return h('li', { ...langAttrs(g.lang), style: `--c:${p.color}` }, h('details', null,
        h('summary', null, h('span', { class: 'ex-tagp' }, `${p.icon} ${p.short}`), h('b', null, conceptTitle(g.id, g.lang), trLine(conceptTitle(g.id, g.lang), g.lang)), g.unknown ? h('small', { class: 'ex-muted' }, g.lang === 'ar' ? ' · لا أعرف' : ' · « je ne sais pas »') : null),
        h('p', null, g.why, trLine(g.why, g.lang)), exampleBox(g.ex, g.lang), h('p', { class: 'ex-src' }, '📚 ', g.src),
        h('a', { class: 'ex-btn', href: `${BASE}/p/${g.part}/lecon` }, g.lang === 'ar' ? 'مراجعة الدرس' : 'Revoir la leçon')));
    })) : h('p', { class: 'ex-muted' }, 'Aucune notion ratée : bravo !');
    const pathEl = res.path.length ? h('ol', { class: 'ex-reco' }, res.path.map((id, k) => {
      const p = partById(id); const r = res.parts[id];
      return h('li', { style: `--c:${p.color};--i:${k}` }, h('span', { class: 'ex-reco-n' }, String(k + 1)),
        h('span', { class: 'ex-reco-t', ...langAttrs(p.lang) }, h('b', null, p.title), h('small', null, BAND_LABEL[p.lang][r.band])),
        h('a', { class: 'ex-btn ex-primary', href: `${BASE}/p/${id}/lecon` }, p.lang === 'ar' ? 'ابدأ' : 'Commencer'));
    })) : h('p', { class: 'ex-muted' }, 'Toutes les parties sont maîtrisées : entraîne-toi avec les niveaux et l’examen blanc.');
    const correction = set ? h('details', { class: 'ex-card ex-pos-corr' }, h('summary', null, h('b', null, `Correction des ${set.length} questions`)), h('div', { class: 'ex-tr-row' }, trBtn('fr')),
      h('ol', { class: 'ex-correction' }, set.map((q, k) => {
        const ok = answers[k] === q.answer;
        return h('li', { class: ok ? 'ok' : 'ko', ...langAttrs(q.lang) }, h('details', null,
          h('summary', null, h('span', { 'aria-hidden': 'true' }, ok ? '✓ ' : answers[k] == null ? '? ' : '✗ '), q.q, trLine(q.q, q.lang)),
          answers[k] != null && !ok ? h('p', { class: 'ex-yours' }, `${q.lang === 'ar' ? 'جوابك' : 'Ta réponse'} : ${letters(q.lang)[answers[k]]}. ${q.options[answers[k]]}`) : null,
          h('p', { class: 'ex-reveal' }, `${q.lang === 'ar' ? 'الجواب الصحيح' : 'Bonne réponse'} : ${letters(q.lang)[q.answer]}. ${q.options[q.answer]}`, trLine(q.options[q.answer], q.lang)),
          h('p', null, conceptFor(q).why, trLine(conceptFor(q).why, q.lang)), exampleBox(exampleFor(q), q.lang)));
      }))) : null;
    const first = res.path[0];
    root.replaceChildren(
      h('section', { class: 'ex-pos-hero' },
        h('span', { class: 'ex-end-badge', 'aria-hidden': 'true' }, lv.icon),
        h('div', null, h('small', null, 'Ton niveau'), h('h2', { tabindex: '-1' }, lv.fr),
          h('p', { class: 'ex-pos-score' }, h('b', null, `${res.score}/20`), ` · ${res.ok}/${res.total} bonnes réponses` + (res.unknown ? ` · ${res.unknown} « je ne sais pas »` : '') + (res.minutes ? ` · ${res.minutes} min` : '')),
          h('p', null, lv.text))),
      h('div', { class: 'ex-pos-grid' },
        h('section', { class: 'ex-card' }, h('h3', { class: 'ex-h2' }, 'Par composante'), groupsEl, h('h3', { class: 'ex-h2' }, 'Par partie'), partsEl,
          h('p', { class: 'ex-legend' }, MASTERY_BANDS.map((b) => h('span', { class: 'ex-band ex-band-' + b.id }, `${b.fr} ${b.id === 'ok' ? '≥ 75 %' : b.id === 'mid' ? '40–74 %' : '< 40 %'}`)))),
        h('div', { class: 'ex-pos-col' },
          h('section', { class: 'ex-card' }, h('h3', { class: 'ex-h2' }, '🗺️ Ton parcours recommandé'), h('p', { class: 'ex-muted' }, 'Commence par les parties prioritaires ; à égalité, la didactique passe d’abord (80 % de l’épreuve).'), pathEl),
          h('section', { class: 'ex-card' }, h('h3', { class: 'ex-h2' }, `🔍 Tes lacunes · ${res.gaps.length} notion(s)`), h('p', { class: 'ex-muted' }, 'Touche une notion pour lire l’essentiel et sa référence.'), h('div', { class: 'ex-tr-row' }, trBtn('fr')), gapsEl))),
      correction || '',
      h('div', { class: 'ex-actions col ex-pos-actions' },
        first ? h('a', { class: 'ex-btn ex-primary', href: `${BASE}/p/${first}/lecon` }, `Commencer le parcours : ${partById(first).short}`) : h('a', { class: 'ex-btn ex-primary', href: BASE + '/blanc' }, 'Passer l’examen blanc'),
        res.missed.length ? h('a', { class: 'ex-btn', href: BASE + '/revision' }, `Revoir les ${res.missed.length} questions ratées`) : null,
        h('button', { type: 'button', class: 'ex-btn', onclick: intro }, 'Refaire l’évaluation'),
        h('a', { class: 'ex-btn ex-ghost', href: BASE }, 'Retour au parcours')));
    root.querySelector('h2')?.focus();
  }

  if (showReport && st.lastPosition) report(st.lastPosition); else intro();
  return [topbar(st, { title: 'Diagnostic des compétences', back: BASE }), root, bottomNav('hub')];
}

// ---------- Accès par mot de passe ----------
// Simple verrou d'accès côté navigateur (pas une protection de sécurité : le code est lisible dans le source).
const ACCESS_CODE = '8888';
const ACCESS_KEY = 'infoplay.examen.access';
export const hasAccess = () => { try { return sessionStorage.getItem(ACCESS_KEY) === 'ok'; } catch { return false; } };
function lockScreen(onOpen) {
  const input = h('input', { id: 'ex-code', type: 'password', inputmode: 'numeric', autocomplete: 'off', maxlength: '12', required: true, 'aria-describedby': 'ex-code-msg', placeholder: '••••' });
  // Écran volontairement neutre : rien n'indique le contenu protégé.
  const msg = h('p', { id: 'ex-code-msg', class: 'ex-lock-msg', 'aria-live': 'polite' });
  const card = h('form', { class: 'ex-card ex-lock', onsubmit: (e) => {
    e.preventDefault();
    if (input.value.trim() === ACCESS_CODE) {
      try { sessionStorage.setItem(ACCESS_KEY, 'ok'); } catch {}
      audio.play('complete'); onOpen();
    } else {
      sfx('wrong'); vibrate([60, 40, 60]);
      msg.textContent = 'Mot de passe incorrect. Réessaie.'; msg.classList.add('ko');
      card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
      input.select();
    }
  } },
    h('div', { class: 'ex-end-badge', 'aria-hidden': 'true' }, '🔒'),
    h('h2', { tabindex: '-1' }, 'Mot de passe'),
    h('label', { for: 'ex-code', class: 'ex-sr' }, 'Mot de passe'),
    input, msg,
    h('button', { type: 'submit', class: 'ex-btn ex-primary' }, 'Entrer'),
    h('a', { class: 'ex-btn', href: '#/profils' }, 'Retour à l’accueil'));
  setTimeout(() => input.focus(), 60);
  return h('div', { class: 'ex-body ex-lock-wrap' }, card);
}

// Clic sonore sur tout bouton ou lien du module ; les feuilles et fenêtres ajoutées au <body> ont le leur.
function moduleClick(e) { if (e.target.closest('button:not([disabled]),a,summary') && !e.target.closest('.ex-trbtn')) sfx('click'); }
if (typeof document !== 'undefined') document.addEventListener('click', (e) => { if (e.target.closest('.ex-layer') && e.target.closest('button:not(.ex-trbtn)')) sfx('click'); });

// ---------- Point d'entrée ----------
export function examenScreen(q, pid) {
  if (!hasAccess()) {
    const main = h('main', { id: 'main', class: 'ex-app ex-locked', 'data-own-sound': '', onclick: moduleClick });
    main.append(lockScreen(() => main.replaceWith(examenScreen(q, pid))));
    return main;
  }
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
  else if (sub[0] === 'diagnostic' || sub[0] === 'positionnement') view = positionScreen(st, sub[1] === 'bilan');
  else if (sub[0] === 'profil') view = profileScreen(st);
  else view = hub(st);
  return h('main', { id: 'main', class: 'ex-app', 'data-own-sound': '', onclick: moduleClick }, view);
}
