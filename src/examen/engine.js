// Moteur du module « Examen professionnel » : banque de questions, feedbacks, progression ludique.
// Aucune dépendance au DOM : testable sous Node.
import { QCM } from './data/qcm.js';
import { ANNALES } from './data/annales.js';
import { PARTS, partById } from './data/parts.js';
import { CONCEPTS_FR, DEFAULT_FR } from './data/concepts-fr.js';
import { NOTIONS_FR, CONCEPT_OF } from './data/notions-fr.js';
import { conceptTitle } from './data/concept-titles.js';
import { CONCEPTS_AR, DEFAULT_AR } from './data/concepts-ar.js';
import { DISTRACTORS_FR, DISTRACTORS_AR } from './data/distractors.js';
import { EXAMPLES_FR } from './data/examples-fr.js';
import { EXAMPLES_AR } from './data/examples-ar.js';
import { trAr } from './i18n.js';

export const LEVEL_SIZE = 8;          // questions par niveau
export const HEARTS = 5;              // vies par niveau
export const DAILY_GOAL = 60;         // XP visés par jour
export const XP = { first: 10, second: 5, lessonCard: 5, lessonDone: 20, hint: 3, comboStep: 2, comboMax: 10 };

// ---------- Questions ----------
const LETTERS_FR = ['A', 'B', 'C', 'D', 'E'];
const LETTERS_AR = ['أ', 'ب', 'ج', 'د', 'هـ'];
// Série 2 = annales officielles 2021-2025 (QCM, vrai/faux, phrases à trous), voir data/annales.js.
export const ANNALES_SET = 2;
const VF = { fr: ['Vrai', 'Faux'], ar: ['صحيح', 'خطأ'] };
const annalesNum = {};
const ANNALES_Q = ANNALES.map(({ p, t, ex, q, o, a, j }, i) => {
  const lang = p[0] === 'A' ? 'ar' : 'fr'; const num = (annalesNum[p] = (annalesNum[p] || 0) + 1);
  return { id: `${p}-${ANNALES_SET}-${num}-a${i}`, part: p, set: ANNALES_SET, num, type: t, exam: ex, q,
    options: t === 'vf' ? VF[lang] : o, answer: t === 'vf' ? (a ? 0 : 1) : a, just: j || '', lang };
});
export const QUESTIONS = [...QCM.map(([part, set, num, q, options, answer, just], i) => ({
  id: `${part}-${set}-${num}-${i}`, part, set, num, type: 'qcm', q, options, answer, just, lang: part[0] === 'A' ? 'ar' : 'fr',
})), ...ANNALES_Q];
export const isAnnales = (q) => q.set === ANNALES_SET;
export const letters = (lang) => (lang === 'ar' ? LETTERS_AR : LETTERS_FR);
export const questionsOf = (partId) => QUESTIONS.filter((x) => x.part === partId);
const chunk = (qs) => {
  const out = [];
  for (let i = 0; i < qs.length; i += LEVEL_SIZE) out.push(qs.slice(i, i + LEVEL_SIZE));
  // Un dernier niveau trop court est fusionné avec le précédent.
  if (out.length > 1 && out[out.length - 1].length < 4) out[out.length - 2].push(...out.pop());
  return out;
};
const levelCache = new Map();
/** Niveaux d'une partie : banque d'entraînement d'abord, puis niveaux « Annales » (jamais mélangés). */
export const levelsOf = (partId) => {
  if (!levelCache.has(partId)) {
    const qs = questionsOf(partId);
    levelCache.set(partId, [...chunk(qs.filter((q) => !isAnnales(q))), ...chunk(qs.filter(isAnnales))]);
  }
  return levelCache.get(partId);
};
/** Indice du premier niveau « Annales » d'une partie (-1 s'il n'y en a pas). */
export const annalesStart = (partId) => levelsOf(partId).findIndex((lv) => lv.length && isAnnales(lv[0]));
export const byId = (id) => QUESTIONS.find((x) => x.id === id);

// ---------- Normalisation ----------
export const normFr = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’']/g, "'");
export const normAr = (s) => String(s || '').replace(/[ً-ْـ]/g, '').replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').toLowerCase();
const norm = (lang, s) => (lang === 'ar' ? normAr(s) : normFr(s));

// ---------- Notion, indice, feedbacks ----------
const conceptCache = new Map();
/** Exemple concret de la notion d'une question (dans la langue de la question). */
export const exampleFor = (q) => (q.lang === 'ar' ? EXAMPLES_AR : EXAMPLES_FR)[conceptFor(q).id] || '';
export const exampleOf = (id, lang) => (lang === 'ar' ? EXAMPLES_AR : EXAMPLES_FR)[id] || '';

export function conceptFor(q) {
  if (conceptCache.has(q.id)) return conceptCache.get(q.id);
  const list = q.lang === 'ar' ? CONCEPTS_AR : CONCEPTS_FR;
  const text = norm(q.lang, q.q + ' ' + q.options[q.answer]);
  const forced = q.lang === 'fr' && CONCEPT_OF[q.id.split('-').slice(0, 3).join('-')];
  let c = forced ? list.find((k) => k.id === forced) : list.find((k) => k.re.test(text));
  if (!c) { const def = (q.lang === 'ar' ? DEFAULT_AR : DEFAULT_FR)[q.part]; c = list.find((k) => k.id === def) || list[list.length - 1]; }
  conceptCache.set(q.id, c);
  return c;
}
export function distractorOf(q, index) {
  const list = q.lang === 'ar' ? DISTRACTORS_AR : DISTRACTORS_FR;
  const t = norm(q.lang, q.options[index]).trim();
  return list.find((d) => d.re.test(t)) || null;
}
const isNone = (q, i) => (q.lang === 'ar' ? /^لا شيء مما سبق/.test(q.options[i]) : /^aucune de ces/i.test(q.options[i]));

// ---------- Ordre aléatoire à chaque tentative ----------
/** Copie mélangée d'une liste (Fisher-Yates). */
export function shuffleArr(a, rng = Math.random) {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; }
  return b;
}
/** Copie de la question avec ses propositions dans un ordre aléatoire, bonne réponse recalculée.
 *  « Aucune de ces réponses » reste en dernier et l'ordre Vrai / Faux ne change pas. */
export function shuffled(q, rng = Math.random) {
  if (q.type === 'vf') return q;
  const idx = q.options.map((_, i) => i);
  const order = [...shuffleArr(idx.filter((i) => !isNone(q, i)), rng), ...idx.filter((i) => isNone(q, i))];
  return { ...q, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer), order };
}

const T = {
  fr: {
    praise: ['Excellent !', 'Bien joué !', 'Parfait !', 'Exact !', 'Bravo !', 'Juste !'],
    praiseLate: ['C’est ça, au deuxième essai !', 'Bien rattrapé !'],
    wrong: ['Pas tout à fait…', 'Presque…', 'Ce n’est pas ça.'],
    reveal: 'La bonne réponse',
    retry: 'Relis l’énoncé et compare les options restantes. Tu peux demander un indice.',
    off: 'Cette option ne répond pas au cœur de la question : repère d’abord la notion en jeu dans l’énoncé.',
    none: 'Aucune proposition ne convient : la bonne réponse n’est pas parmi les options A à D.',
    elim: (l, o, lab) => `Élimine d’abord ${l} « ${o} » : ${lab}.`,
  },
  ar: {
    praise: ['ممتاز!', 'أحسنت!', 'جواب صحيح!', 'رائع!', 'بالضبط!'],
    praiseLate: ['صحيح في المحاولة الثانية!', 'استدراك موفق!'],
    wrong: ['ليس تماما…', 'قريب…', 'ليس هذا هو الجواب.'],
    reveal: 'الجواب الصحيح',
    retry: 'أعد قراءة السؤال وقارن الاقتراحات المتبقية. يمكنك طلب تلميح.',
    off: 'هذا الاقتراح لا يجيب عن جوهر السؤال: حدد أولا المفهوم المقصود في نص السؤال.',
    none: 'لا يوجد اقتراح صحيح بين أ و د، لذلك الجواب «لا شيء مما سبق».',
    elim: (l, o, lab) => `استبعد أولا ${l}) «${o}»: ${lab}.`,
  },
};
const pick = (arr, seed = 0) => arr[Math.abs(seed) % arr.length];
const cut = (s, n = 70) => (s.length > n ? s.slice(0, n - 1) + '…' : s);

/** Fiche de notion de l'indice : intitulé, définition, caractéristiques et carte de leçon qui la traite. */
export function notionOf(id, q) {
  const n = q.lang === 'fr' ? NOTIONS_FR[id] : null;
  if (!n) return null;
  const lesson = partById(q.part)?.lesson || [];
  const i = lesson.findIndex((c) => c.ids?.includes(id));
  return { title: conceptTitle(id, q.lang), def: n.def, traits: n.traits, card: i < 0 ? null : { n: i + 1, t: lesson[i].t } };
}

/** Indice : principe à mobiliser (notion) + une élimination argumentée quand c'est possible. */
export function hintFor(q) {
  const c = conceptFor(q); const t = T[q.lang];
  let elim = null; let elimAr = '';
  for (let i = 0; i < q.options.length; i++) {
    if (i === q.answer || isNone(q, i)) continue;
    const d = distractorOf(q, i);
    if (d && d.id !== 'aucune') {
      elim = t.elim(letters(q.lang)[i], cut(q.options[i], 60), d.label);
      if (q.lang === 'fr') elimAr = T.ar.elim(letters('fr')[i], cut(trAr(q.options[i]) || q.options[i], 60), trAr(d.label) || d.label);
      break;
    }
  }
  // Réponse attendue et sa justification : l'indice explique la notion puis montre la bonne réponse.
  const mark = q.type === 'vf' ? '' : letters(q.lang)[q.answer];
  const opt = q.options[q.answer];
  const why = [isNone(q, q.answer) ? t.none : null, q.just || c.why].filter(Boolean).join(' ');
  const answer = { mark, text: opt, why };
  if (q.lang === 'fr') {
    answer.textAr = trAr(opt) || (q.type === 'vf' ? (q.answer === 0 ? 'صحيح' : 'خطأ') : opt.replace(/(d) ?h/g, '$1 س'));
    answer.whyAr = [isNone(q, q.answer) ? T.ar.none : null, trAr(q.just || c.why)].filter(Boolean).join(' ');
  }
  return { text: c.hint, elim, src: c.src, textAr: q.lang === 'fr' ? trAr(c.hint) : '', elimAr, notion: notionOf(c.id, q), answer };
}

/** Feedback d'une bonne réponse. */
export function correctFeedback(q, attempt = 1) {
  const c = conceptFor(q); const t = T[q.lang]; const seed = q.num + attempt;
  const body = [];
  if (isNone(q, q.answer)) body.push(t.none);
  if (q.just) body.push(q.just);
  body.push(c.why);
  const fb = { ok: true, title: attempt > 1 ? pick(t.praiseLate, seed) : pick(t.praise, seed), body, ex: exampleFor(q), src: c.src };
  if (q.lang === 'fr') {
    fb.titleAr = attempt > 1 ? pick(T.ar.praiseLate, seed) : pick(T.ar.praise, seed);
    fb.bodyAr = [isNone(q, q.answer) ? T.ar.none : null, q.just ? trAr(q.just) : null, trAr(c.why)].filter(Boolean);
    fb.exAr = trAr(fb.ex);
  }
  return fb;
}

/** Feedback d'une mauvaise réponse : sans révéler au premier essai, avec la réponse ensuite. */
export function wrongFeedback(q, chosen, attempt = 1) {
  const c = conceptFor(q); const t = T[q.lang]; const d = distractorOf(q, chosen);
  const body = [];
  if (d) body.push(d.msg);
  else if (attempt < 2) body.push(t.off);
  if (attempt < 2) {
    body.push(t.retry);
    const fb = { ok: false, reveal: false, title: pick(t.wrong, q.num), body, src: d?.src || null };
    if (q.lang === 'fr') { fb.titleAr = pick(T.ar.wrong, q.num); fb.bodyAr = [d ? trAr(d.msg) : T.ar.off, T.ar.retry].filter(Boolean); }
    return fb;
  }
  // Vrai/faux : la lettre n'a pas de sens, on donne directement « Vrai » ou « Faux ».
  const L = q.type === 'vf' ? '' : letters(q.lang)[q.answer] + '. ';
  body.unshift(`${t.reveal} : ${L}${q.options[q.answer]}`);
  if (isNone(q, q.answer)) body.push(t.none);
  if (q.just) body.push(q.just);
  body.push(c.why);
  const fb = { ok: false, reveal: true, title: pick(t.wrong, q.num), body, ex: exampleFor(q), src: c.src };
  if (q.lang === 'fr') {
    fb.titleAr = pick(T.ar.wrong, q.num);
    fb.bodyAr = [`${T.ar.reveal} : ${L}${trAr(q.options[q.answer]) || q.options[q.answer]}`, d ? trAr(d.msg) : null,
      isNone(q, q.answer) ? T.ar.none : null, q.just ? trAr(q.just) : null, trAr(c.why)].filter(Boolean);
    fb.exAr = trAr(fb.ex);
  }
  return fb;
}

// ---------- Rangs et badges ----------
export const RANKS = [
  { xp: 0, fr: 'Candidat', icon: '🌱' }, { xp: 150, fr: 'Stagiaire', icon: '📗' }, { xp: 400, fr: 'Enseignant débutant', icon: '🧑‍🏫' },
  { xp: 900, fr: 'Enseignant confirmé', icon: '🎓' }, { xp: 1800, fr: 'Formateur', icon: '🏅' }, { xp: 3200, fr: 'Expert didacticien', icon: '🏆' },
  { xp: 5000, fr: 'Inspecteur pédagogique', icon: '👑' },
];
export const rankOf = (xp) => { let r = RANKS[0], next = null; for (let i = 0; i < RANKS.length; i++) { if (xp >= RANKS[i].xp) { r = RANKS[i]; next = RANKS[i + 1] || null; } } return { ...r, next }; };

export const BADGES = [
  { id: 'positioned', icon: '🧭', t: 'Je sais où j’en suis', d: 'Passer l’évaluation diagnostique des compétences.' },
  { id: 'first-lesson', icon: '📖', t: 'Première leçon', d: 'Terminer une leçon.' },
  { id: 'first-level', icon: '🚩', t: 'Premier niveau', d: 'Terminer un niveau.' },
  { id: 'perfect', icon: '💎', t: 'Sans faute', d: 'Terminer un niveau sans erreur ni indice.' },
  { id: 'combo10', icon: '⚡', t: 'Combo ×10', d: 'Enchaîner 10 bonnes réponses.' },
  { id: 'streak3', icon: '🔥', t: 'Trois jours de suite', d: 'Réviser trois jours consécutifs.' },
  { id: 'streak7', icon: '🌋', t: 'Une semaine de feu', d: 'Réviser sept jours consécutifs.' },
  { id: 'q100', icon: '💯', t: 'Cent questions', d: 'Répondre à 100 questions.' },
  { id: 'q400', icon: '🧠', t: 'Quatre cents questions', d: 'Répondre à 400 questions.' },
  { id: 'goal', icon: '🎯', t: 'Objectif du jour', d: `Gagner ${DAILY_GOAL} XP dans la journée.` },
  { id: 'review', icon: '♻️', t: 'Erreurs corrigées', d: 'Réussir 10 questions en révision.' },
  { id: 'group-D', icon: '🎯', t: 'Didacticien', d: 'Terminer toutes les parties de didactique.' },
  { id: 'group-M', icon: '💻', t: 'Maître du programme', d: 'Terminer les quatre modules du TC.' },
  { id: 'group-A', icon: '🧠', t: 'عالم التربية', d: 'إنهاء كل محاور علوم التربية.' },
  { id: 'blanc70', icon: '📜', t: 'Prêt pour le jour J', d: 'Obtenir au moins 14/20 à l’examen blanc.' },
];

// ---------- État du joueur ----------
const today = (d = new Date()) => d.toISOString().slice(0, 10);
const dayDiff = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / 86400000);
export function freshState() {
  return { v: 1, xp: 0, lessons: {}, levels: {}, seen: {}, review: [], answered: 0, reviewWins: 0,
    bestCombo: 0, badges: {}, day: today(), dayXp: 0, streak: 0, lastDay: null, notifs: [], unread: 0, blanc: [], sysNotif: false, position: [] };
}

export function createExamStore(storage, pid = 'invite') {
  const KEY = 'infoplay.examen.v1.' + pid;
  let s;
  try { s = { ...freshState(), ...JSON.parse(storage?.getItem(KEY) || 'null') }; } catch { s = freshState(); }
  const listeners = new Set();
  const save = () => { try { storage?.setItem(KEY, JSON.stringify(s)); } catch {} };
  const notify = (kind, title, text, icon = '🔔') => {
    const n = { id: Date.now() + Math.random(), kind, title, text, icon, at: new Date().toISOString() };
    s.notifs.unshift(n); s.notifs = s.notifs.slice(0, 40); s.unread++;
    listeners.forEach((f) => f(n));
    return n;
  };
  const award = (id) => {
    if (s.badges[id]) return;
    const b = BADGES.find((x) => x.id === id); if (!b) return;
    s.badges[id] = new Date().toISOString();
    notify('badge', 'Nouveau badge : ' + b.t, b.d, b.icon);
  };
  // Passage à un nouveau jour : série de jours et objectif quotidien.
  const rollDay = () => {
    const d = today();
    if (s.day !== d) { s.day = d; s.dayXp = 0; }
  };
  const touchStreak = () => {
    const d = today();
    if (s.lastDay === d) return;
    s.streak = s.lastDay && dayDiff(s.lastDay, d) === 1 ? s.streak + 1 : 1;
    s.lastDay = d;
    if (s.streak > 1) notify('streak', `Série de ${s.streak} jours 🔥`, 'Continue chaque jour pour garder ta flamme allumée.', '🔥');
    if (s.streak >= 3) award('streak3');
    if (s.streak >= 7) award('streak7');
  };
  const gain = (n) => {
    if (n <= 0) return;
    rollDay(); touchStreak();
    const before = rankOf(s.xp).fr;
    const hadGoal = s.dayXp >= DAILY_GOAL;
    s.xp += n; s.dayXp += n;
    if (!hadGoal && s.dayXp >= DAILY_GOAL) { notify('goal', 'Objectif du jour atteint 🎯', `${DAILY_GOAL} XP gagnés aujourd’hui. Bravo !`, '🎯'); award('goal'); }
    const r = rankOf(s.xp);
    if (r.fr !== before) notify('rank', `Nouveau rang : ${r.fr}`, `Tu as atteint ${r.xp} XP.`, r.icon);
  };
  const groupDone = (g) => PARTS.filter((p) => p.group === g).every((p) => partProgress(p.id).done);
  function partProgress(id) {
    const lv = levelsOf(id); const done = lv.filter((_, k) => s.levels[id + ':' + k]).length;
    const stars = lv.reduce((a, _, k) => a + (s.levels[id + ':' + k]?.stars || 0), 0);
    return { levels: lv.length, count: done, stars, maxStars: lv.length * 3, lesson: !!s.lessons[id], ratio: lv.length ? done / lv.length : 0, done: done === lv.length && lv.length > 0 };
  }
  const api = {
    get state() { return s; },
    subscribe(f) { listeners.add(f); return () => listeners.delete(f); },
    save,
    notify(kind, title, text, icon) { const n = notify(kind, title, text, icon); save(); return n; },
    markRead() { s.unread = 0; save(); },
    setSysNotif(v) { s.sysNotif = !!v; save(); },
    partProgress,
    // Les annales forment une piste à part : leur premier niveau est ouvert d'emblée.
    // Tous les niveaux sont accessibles ; « conseillé » marque seulement le prochain niveau du parcours.
    isLevelOpen(id, k) { return k >= 0 && k < levelsOf(id).length; },
    isLevelNext(id, k) { return !s.levels[id + ':' + k] && (k === 0 || k === annalesStart(id) || !!s.levels[id + ':' + (k - 1)]); },
    lessonCard(id) { gain(XP.lessonCard); save(); },
    lessonDone(id) {
      const first = !s.lessons[id];
      s.lessons[id] = new Date().toISOString();
      if (first) { gain(XP.lessonDone); award('first-lesson'); notify('unlock', 'Niveau 1 conseillé', `${partById(id)?.title || id} : les questions t’attendent.`, '➡️'); }
      save();
    },
    /** Enregistre une réponse. Retourne les XP gagnés. */
    answer(q, { ok, attempt, combo, hinted, review }) {
      rollDay();
      s.answered++;
      let xp = 0;
      if (ok) {
        xp = attempt === 1 ? XP.first : XP.second;
        xp += Math.min(XP.comboMax, Math.max(0, combo - 1) * XP.comboStep);
        if (hinted) xp = Math.max(1, xp - XP.hint);
        if (review) { s.reviewWins++; s.review = s.review.filter((x) => x !== q.id); if (s.reviewWins >= 10) award('review'); }
      } else if (attempt === 1 && !s.review.includes(q.id)) {
        s.review.push(q.id);
      }
      s.seen[q.id] = (s.seen[q.id] || 0) + 1;
      if (combo > s.bestCombo) s.bestCombo = combo;
      if (combo >= 10) award('combo10');
      if (s.answered >= 100) award('q100');
      if (s.answered >= 400) award('q400');
      gain(xp); save();
      return xp;
    },
    levelDone(id, k, { firstTry, total, hints, mistakes }) {
      const ratio = total ? firstTry / total : 0;
      const stars = ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : 1;
      const prev = s.levels[id + ':' + k];
      s.levels[id + ':' + k] = { stars: Math.max(stars, prev?.stars || 0), at: new Date().toISOString() };
      award('first-level');
      if (!mistakes && !hints) award('perfect');
      const lv = levelsOf(id);
      if (!prev && k + 1 < lv.length) notify('unlock', `Niveau ${k + 2} conseillé`, partById(id)?.title || id, '➡️');
      const g = id[0];
      if (groupDone(g)) award('group-' + g);
      save();
      return stars;
    },
    /** Enregistre une évaluation diagnostique des compétences ; les questions ratées rejoignent la révision. */
    positionDone(result, missedIds = []) {
      const first = !s.position?.length;
      s.position = [result, ...(s.position || [])].slice(0, 5);
      for (const id of missedIds) if (!s.review.includes(id)) s.review.push(id);
      gain(first ? 30 : 10);
      award('positioned');
      const prio = result.priorities.length;
      notify('position', 'Bilan diagnostique prêt', prio ? `${prio} partie(s) prioritaire(s) : ton parcours est réordonné.` : 'Aucune lacune majeure : passe aux niveaux et à l’examen blanc.', '🧭');
      save();
    },
    get lastPosition() { return s.position?.[0] || null; },
    blancDone(score) {
      s.blanc.unshift({ score, at: new Date().toISOString() }); s.blanc = s.blanc.slice(0, 10);
      gain(Math.round(score * 3));
      if (score >= 14) award('blanc70');
      save();
    },
    reset() { s = freshState(); save(); },
    // Rappel à l'ouverture : objectif non atteint ou erreurs à revoir.
    greet() {
      rollDay();
      const d = today();
      if (s.lastDay && s.lastDay !== d && dayDiff(s.lastDay, d) > 1 && s.streak > 1) {
        notify('streak', 'Ta série s’est arrêtée', 'Réponds à quelques questions aujourd’hui pour relancer ta flamme.', '🧯');
        s.streak = 0;
      }
      if (s.review.length >= 5 && s._greetReview !== d) { s._greetReview = d; notify('review', `${s.review.length} questions à revoir`, 'La révision espacée fixe durablement ce que tu as raté.', '♻️'); }
      save();
    },
  };
  return api;
}

// ---------- Examen blanc ----------
// 20 questions, réparties comme l'épreuve : la didactique pèse le plus lourd.
export function blancSet(rng = Math.random) {
  const shuffle = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  // Format de l'épreuve : QCM à cinq propositions uniquement (pas de vrai/faux ni de phrases à trous).
  const from = (g, n) => shuffle(QUESTIONS.filter((x) => x.part[0] === g && x.type === 'qcm')).slice(0, n);
  return shuffle([...from('D', 12), ...from('M', 4), ...from('A', 4)]);
}

// ---------- Évaluation diagnostique des compétences (test de positionnement) ----------
// 30 questions de type examen, pondérées comme l'épreuve : 3 par axe de didactique, 2 par module du TC,
// 2 pour les axes principaux de sciences de l'éducation (A1, A2, A7) et 1 pour les axes complémentaires.
export const POSITION_PLAN = { D1: 3, D2: 3, D3: 3, D4: 3, M1: 2, M2: 2, M3: 2, M4: 2, A1: 2, A2: 2, A3: 1, A4: 1, A5: 1, A6: 1, A7: 2 };
export const MASTERY_BANDS = [
  { min: 0.75, id: 'ok', fr: 'Maîtrisé', icon: '✅' },
  { min: 0.4, id: 'mid', fr: 'À consolider', icon: '🟠' },
  { min: 0, id: 'low', fr: 'Prioritaire', icon: '🔴' },
];
export const bandOf = (ratio) => MASTERY_BANDS.find((b) => ratio >= b.min);
export const LEVELS_POS = [
  { min: 0.8, fr: 'Prêt pour l’examen', icon: '🏆', text: 'Tu maîtrises l’essentiel. Entraîne-toi surtout avec les niveaux avancés et l’examen blanc.' },
  { min: 0.6, fr: 'Avancé', icon: '🎓', text: 'Bonne base. Consolide les parties orange, puis passe à l’examen blanc.' },
  { min: 0.4, fr: 'Intermédiaire', icon: '📗', text: 'Des acquis réels mais des lacunes à combler. Suis le parcours recommandé, en commençant par les parties prioritaires.' },
  { min: 0, fr: 'Débutant', icon: '🌱', text: 'Reprends les leçons dans l’ordre recommandé : elles posent les notions que l’examen interroge.' },
];
export const levelOfScore = (ratio) => LEVELS_POS.find((l) => ratio >= l.min);

/** Tire les questions du test : série « niveau examen 2025 » d'abord, une notion différente par question. */
export function positionSet(rng = Math.random) {
  const shuffle = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const out = [];
  for (const [part, n] of Object.entries(POSITION_PLAN)) {
    const pool = questionsOf(part);
    const ordered = [...shuffle(pool.filter((q) => q.set === 1)), ...shuffle(pool.filter((q) => q.set === 0))];
    const picked = []; const seen = new Set();
    for (const q of ordered) { const c = conceptFor(q).id; if (seen.has(c)) continue; seen.add(c); picked.push(q); if (picked.length === n) break; }
    for (const q of ordered) { if (picked.length === n) break; if (!picked.includes(q)) picked.push(q); }
    out.push(...picked);
  }
  return out;
}

/**
 * Analyse les réponses (index choisi, ou null pour « je ne sais pas »).
 * Retourne le score global, le détail par groupe et par partie, les notions à revoir et le parcours conseillé.
 */
export function analyzePosition(set, answers) {
  const parts = {}; const groups = {}; const missed = []; const concepts = new Map();
  set.forEach((q, i) => {
    const ok = answers[i] === q.answer;
    (parts[q.part] ||= { ok: 0, n: 0 }); parts[q.part].n++; if (ok) parts[q.part].ok++;
    const g = q.part[0]; (groups[g] ||= { ok: 0, n: 0 }); groups[g].n++; if (ok) groups[g].ok++;
    if (!ok) {
      missed.push(q.id);
      const c = conceptFor(q);
      const k = q.lang + ':' + c.id;
      if (!concepts.has(k)) concepts.set(k, { id: c.id, lang: q.lang, part: q.part, why: c.why, ex: exampleOf(c.id, q.lang), src: c.src, unknown: answers[i] == null });
    }
  });
  const ok = set.filter((q, i) => answers[i] === q.answer).length;
  const unknown = answers.filter((a) => a == null).length;
  const ratio = set.length ? ok / set.length : 0;
  const partList = Object.entries(parts).map(([id, v]) => ({ id, ...v, ratio: v.n ? v.ok / v.n : 0, band: bandOf(v.n ? v.ok / v.n : 0).id }));
  const order = { low: 0, mid: 1, ok: 2 };
  // Parcours conseillé : parties prioritaires, puis à consolider ; la didactique (80 % de l'épreuve) passe d'abord à égalité.
  const weight = (id) => (id[0] === 'D' ? 0 : id[0] === 'M' ? 1 : 2);
  const path = partList.filter((p) => p.band !== 'ok').sort((a, b) => order[a.band] - order[b.band] || a.ratio - b.ratio || weight(a.id) - weight(b.id)).map((p) => p.id);
  return {
    at: new Date().toISOString(), ok, total: set.length, unknown, score: Math.round(ratio * 200) / 10, ratio,
    level: levelOfScore(ratio).fr,
    groups: Object.fromEntries(Object.entries(groups).map(([g, v]) => [g, { ...v, ratio: v.ok / v.n }])),
    parts: Object.fromEntries(partList.map((p) => [p.id, { ok: p.ok, n: p.n, band: p.band }])),
    priorities: partList.filter((p) => p.band === 'low').map((p) => p.id),
    path, gaps: [...concepts.values()], missed,
  };
}
