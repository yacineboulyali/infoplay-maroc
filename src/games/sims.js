// Moteur de simulation guidée : une vue interactive + des étapes validées une à une.
import { h, norm, fmtNum } from '../utils/dom.js';
import { VIEWS2 } from './sims2.js';
import { ribbonView } from './ribbon.js';
import { officeArt, officeConcept } from '../pro/visuals.js';
import { m205StepArt } from '../data/pro/step-art.js';
import { generatedArt } from '../utils/generated-item-art.js';
import { itemVisual } from '../utils/item-visuals.js';
import { studentIllustration } from '../utils/student-illustrations.js';
import { arHint } from '../i18n/arhint.js';
import { arQuestion } from '../i18n/ar-questions.js';

const MODE = /^[~=^]/;
export function matchVal(exp, act) {
  if (typeof exp === 'string' && MODE.test(exp)) { const m = exp[0], s = exp.slice(1), a = String(act ?? ''); return m === '~' ? norm(a).includes(norm(s)) : m === '=' ? norm(a) === norm(s) : a.includes(s); }
  if (typeof exp === 'number') return Number(String(act ?? '').replace(',', '.')) === exp;
  return act === exp;
}
const strip = (e) => (typeof e === 'string' && MODE.test(e) ? e.slice(1) : e);
export function goalOk(goal, st, api) {
  if (typeof goal === 'function') return !!goal(st, api);
  if (goal && goal.c) return api.checkCell(goal);
  return Object.entries(goal).every(([k, e]) => matchVal(e, st[k]));
}

const VIEWS = {
  calc(host, st) {
    st.a ??= null; st.b ??= null;
    const ia = h('input', { type: 'number', step: 'any', 'aria-label': 'Premier nombre', oninput: (e) => edit('a', e.target.value) });
    const ib = h('input', { type: 'number', step: 'any', 'aria-label': 'Deuxième nombre', oninput: (e) => edit('b', e.target.value) });
    const msg = h('p', { class: 'hint-line', 'aria-live': 'polite' });
    const screen = h('output', { class: 'screen' }); const disk = h('output', { class: 'disk' });
    function edit(k, v) { st[k] = v === '' ? null : Number(v); st.calc = false; st.shown = false; st.saved = false; paint(); }
    function paint() { if (st.calc) st.res = st.a + st.b; screen.textContent = st.shown ? fmtNum(st.res) : '…'; disk.textContent = st.saved ? '💾 somme.txt enregistré' : '💾 (rien d’enregistré)'; }
    host.append(h('div', { class: 'flow' },
      h('div', { class: 'blk' }, h('h4', null, '⌨ Entrée'), h('label', null, 'Nombre 1 ', ia), h('label', null, 'Nombre 2 ', ib)),
      h('div', { class: 'arrow', 'aria-hidden': 'true' }, '→'),
      h('div', { class: 'blk' }, h('h4', null, '⚙ Traitement'), h('button', { type: 'button', class: 'btn small', onclick: () => { if (st.a == null || st.b == null) msg.textContent = 'Il faut d’abord saisir les deux nombres.'; else { st.calc = true; st.shown = false; st.saved = false; msg.textContent = 'Somme calculée dans le processeur.'; } paint(); } }, 'Additionner')),
      h('div', { class: 'arrow', 'aria-hidden': 'true' }, '→'),
      h('div', { class: 'blk' }, h('h4', null, '🖥 Sortie'), screen, h('button', { type: 'button', class: 'btn small', onclick: () => { if (!st.calc) msg.textContent = 'Rien à afficher : le traitement n’a pas encore été fait.'; else { st.shown = true; msg.textContent = ''; } paint(); } }, 'Afficher')),
      h('div', { class: 'blk' }, h('h4', null, '💽 Stockage'), disk, h('button', { type: 'button', class: 'btn small', onclick: () => { if (!st.calc) msg.textContent = 'Il n’y a pas encore de résultat à conserver.'; else { st.saved = true; msg.textContent = ''; } paint(); } }, 'Enregistrer'))), msg);
    paint();
    return { refresh() { ia.value = st.a ?? ''; ib.value = st.b ?? ''; paint(); } };
  },
  window(host, st) {
    st.state ??= 'normal';
    const area = h('div', { class: 'desk' }); const task = h('div', { class: 'tbar' });
    const set = (s) => { st.state = s; paint(); };
    function paint() {
      const s = st.state; const win = h('div', { class: 'mwin ' + s, role: 'group', 'aria-label': 'Fenêtre de démonstration' },
        h('div', { class: 'mtitle' }, h('span', null, '📄 Mon document'), h('span', { class: 'mbtns' },
          h('button', { type: 'button', 'aria-label': 'Réduire', onclick: () => set('min') }, '–'),
          h('button', { type: 'button', 'aria-label': s === 'max' ? 'Restaurer' : 'Agrandir', onclick: () => set(s === 'max' ? 'normal' : 'max') }, s === 'max' ? '❐' : '□'),
          h('button', { type: 'button', 'aria-label': 'Fermer', class: 'x', onclick: () => set('closed') }, '✕'))), h('div', { class: 'mbody' }, 'Contenu du document…'));
      area.replaceChildren(s === 'closed' ? h('div', { class: 'closedmsg' }, 'La fenêtre est fermée.', h('button', { type: 'button', class: 'btn small', onclick: () => set('normal') }, 'Rouvrir')) : s === 'min' ? h('div', { class: 'closedmsg' }, 'La fenêtre est réduite : le programme continue dans la barre des tâches.') : win);
      task.replaceChildren(h('span', { class: 'start' }, '⊞'), s === 'closed' ? null : h('button', { type: 'button', class: 'tbtn' + (s !== 'min' ? ' on' : ''), onclick: () => set(s === 'min' ? 'normal' : 'min') }, '📄 Mon document'), h('span', { class: 'clock' }, '14:30'));
    }
    host.append(area, task); paint(); return { refresh: paint };
  },
  vending(host, st, ctx) {
    const items = ctx.cfg.items; items.forEach(([k]) => { st[k] ??= 0; }); st.total ??= null;
    const out = {}; const tot = h('input', { type: 'number', step: 'any', 'aria-label': 'Total à payer en dirhams', oninput: (e) => { st.total = e.target.value === '' ? null : Number(e.target.value); } });
    const rows = items.map(([k, label, price, icon]) => { out[k] = h('output', { class: 'count' }, '0');
      return h('div', { class: 'vrow' }, h('span', { class: 'ico' }, icon), h('span', { class: 'lbl' }, `${label} — ${price} DH`),
        h('button', { type: 'button', class: 'icon-btn', 'aria-label': `Retirer un ${label}`, onclick: () => { st[k] = Math.max(0, st[k] - 1); paint(); } }, '−'), out[k],
        h('button', { type: 'button', class: 'icon-btn', 'aria-label': `Ajouter un ${label}`, onclick: () => { st[k]++; paint(); } }, '+')); });
    const paint = () => items.forEach(([k]) => { out[k].textContent = st[k]; });
    host.append(h('div', { class: 'vend' }, h('div', { class: 'activity-hero vending-hero', role: 'img', 'aria-label': 'Illustration d’un distributeur scolaire' }), rows, h('label', { class: 'vtot' }, 'Total à payer (DH) : ', tot))); paint();
    return { refresh() { paint(); tot.value = st.total ?? ''; } };
  },
  toggles(host, st, ctx) {
    const C = ctx.cfg; const boxes = {}; const stat = h('ul', { class: 'status', 'aria-live': 'polite' });
    const derive = () => { if (C.derive) C.derive(st); };
    const paint = () => { derive(); for (const [k] of C.items) boxes[k].checked = !!st[k];
      stat.replaceChildren(...C.status(st).map(([t, ok]) => h('li', { class: ok ? 'ok' : 'ko' }, (ok ? '✔ ' : '✖ ') + t))); };
    host.append(h('div', { class: 'tgl' }, C.items.map(([k, label, icon]) => { boxes[k] = h('input', { type: 'checkbox', onchange: (e) => { st[k] = e.target.checked; paint(); } });
      return h('label', { class: 'sw' }, boxes[k], h('span', { class: 'ico' }, icon), h('span', null, label)); })), h('h4', { class: 'small-h' }, 'État du réseau'), stat);
    paint(); return { refresh: paint };
  },
  mail(host, st) {
    st.to ??= ''; st.subject ??= ''; st.body ??= ''; st.att ??= false; st.sent ??= false;
    const fld = (k, label, el) => { el.setAttribute('aria-label', label); el.addEventListener('input', (e) => { st[k] = e.target.value; st.sent = false; paint(); }); return h('label', { class: 'mrow' }, h('span', null, label), el); };
    const to = h('input', { type: 'text', autocomplete: 'off', placeholder: 'adresse@ecole.exemple' }), sub = h('input', { type: 'text', autocomplete: 'off' }), body = h('textarea', { rows: '5' });
    const msg = h('p', { class: 'hint-line', 'aria-live': 'polite' }); const att = h('button', { type: 'button', class: 'btn ghost small', 'aria-pressed': 'false', onclick: () => { st.att = !st.att; st.sent = false; paint(); } });
    const send = h('button', { type: 'button', class: 'btn primary', onclick: () => { if (!st.to.trim()) msg.textContent = 'Il manque l’adresse du destinataire.'; else if (!st.subject.trim()) msg.textContent = 'Écris un objet pour que le destinataire comprenne le sujet.'; else { st.sent = true; msg.textContent = 'Message simulé « envoyé » : rien n’a quitté cet ordinateur.'; } paint(); } }, '✉ Envoyer');
    function paint() { att.textContent = st.att ? '📎 devoir.docx joint (retirer)' : '📎 Joindre devoir.docx'; att.setAttribute('aria-pressed', String(st.att)); }
    host.append(h('div', { class: 'mailbox' }, h('p', { class: 'muted' }, 'Simulation : aucun message réel n’est envoyé et aucune adresse réelle n’est utilisée.'), fld('to', 'À (destinataire)', to), fld('subject', 'Objet', sub), fld('body', 'Message', body), att, send, msg)); paint();
    return { refresh() { to.value = st.to; sub.value = st.subject; body.value = st.body; paint(); } };
  },
  ...VIEWS2,
  ribbon: ribbonView,
};

export function simGame(root, d) {
  const st = JSON.parse(JSON.stringify(d.cfg?.init || {}));
  const host = h('div', { class: 'sim sim-' + d.view }); const n = d.tasks.length; let step = 0; const results = [];
  const api = VIEWS[d.view](host, st, { cfg: d.cfg || {} });
  const taskBox = h('div', { class: 'taskbox', 'aria-live': 'polite' }); const log = h('ul', { class: 'steplog' });
  const btn = h('button', { type: 'button', class: 'btn primary', onclick: validate }, 'Valider l’étape');
  function stepVisual() {
    const reviewed = studentIllustration(d, step, 'student-illustration-task');
    if (reviewed) return reviewed;
    const artwork = m205StepArt(d.illustrationActivityId, step);
    if (artwork) return generatedArt(...artwork);
    const label = d.tasks[step][0];
    const visual = itemVisual(label);
    if (visual.matches('svg') && officeConcept(label, d.visualPart) >= 0) return officeArt(label, d.visualPart);
    return visual;
  }
  function drawTask() {
    taskBox.replaceChildren(h('p', { class: 'step-h' }, step < n ? `Étape ${step + 1} sur ${n}` : 'Terminé'), h('p', { class: 'step-t' }, step < n ? d.tasks[step][0] : 'Toutes les étapes sont faites : clique sur « Vérifier ».', step < n ? arHint(arQuestion(d.illustrationActivityId, step)) : null), ...(step < n ? [btn] : []));
    const illustration = step < n ? stepVisual() : null;
    if (illustration) taskBox.prepend(illustration);
  }
  function validate() {
    if (step >= n) return; const t = d.tasks[step]; const ok = goalOk(t[1], st, api);
    results.push({ ok, msg: t[0] + (t[2] ? ' — ' + t[2] : '') });
    log.append(h('li', { class: ok ? 'ok' : 'ko' }, (ok ? '✔ Réussi. ' : '✖ Pas encore tout à fait. ') + (t[2] || ''))); step++; drawTask();
  }
  root.append(taskBox, host, log); drawTask();
  return {
    check() {
      if (step < n) return { incomplete: `Valide d’abord les ${n - step} étape(s) restante(s) de la simulation.` };
      return { correct: results.filter((r) => r.ok).length, total: n, items: results, unanswered: 0 };
    },
    reveal() { btn.disabled = true; },
    solve() {
      while (step < n) { const t = d.tasks[step]; const sol = t[3];
        if (typeof sol === 'function') sol(st, api); else if (sol && typeof sol === 'object') Object.assign(st, sol); else if (typeof t[1] !== 'function') { if (t[1].c) api.solveCell(t[1]); else for (const [k, e] of Object.entries(t[1])) st[k] = strip(e); }
        api.refresh && api.refresh(); validate(); }
    },
  };
}
