// Mini‑interpréteur d'algorithmes en pseudo‑code français. Aucun eval : analyse syntaxique maison.
import { h, norm, fmtNum } from '../utils/dom.js';
import { studentIllustration } from '../utils/student-illustrations.js';

const TOK = /\s*(?:(\d+(?:[.,]\d+)?)|("[^"]*"|«[^»]*»)|([A-Za-zÀ-ÿ_][\wÀ-ÿ]*)|(<=|>=|<>|[-+*\/()<>=]))/y;
function tokenize(src) {
  const out = []; TOK.lastIndex = 0; let m;
  while (TOK.lastIndex < src.length && (m = TOK.exec(src))) {
    if (m[1] !== undefined) out.push({ t: 'num', v: parseFloat(m[1].replace(',', '.')) });
    else if (m[2] !== undefined) out.push({ t: 'str', v: m[2].slice(1, -1) });
    else if (m[3] !== undefined) { const lw = m[3].toLowerCase(); out.push(['mod', 'div', 'et', 'ou', 'non', 'vrai', 'faux'].includes(lw) ? { t: 'kw', v: lw } : { t: 'id', v: m[3] }); }
    else out.push({ t: 'op', v: m[4] });
  }
  if (TOK.lastIndex < src.trim().length && src.slice(TOK.lastIndex).trim()) throw new Error('Expression illisible : ' + src);
  return out;
}
function parseExpr(src) {
  const tk = tokenize(src); let p = 0; const peek = () => tk[p]; const isOp = (v) => peek() && peek().t === 'op' && peek().v === v; const isKw = (v) => peek() && peek().t === 'kw' && peek().v === v;
  function or() { let l = and(); while (isKw('ou')) { p++; const r = and(); const a = l; l = (env) => a(env) || r(env); } return l; }
  function and() { let l = not(); while (isKw('et')) { p++; const r = not(); const a = l; l = (env) => a(env) && r(env); } return l; }
  function not() { if (isKw('non')) { p++; const x = not(); return (env) => !x(env); } return cmp(); }
  function cmp() { const l = add(); const t = peek(); if (t && t.t === 'op' && ['=', '<>', '<', '>', '<=', '>='].includes(t.v)) { p++; const r = add(); const o = t.v;
      return (env) => { const a = l(env), b = r(env); switch (o) { case '=': return a === b; case '<>': return a !== b; case '<': return a < b; case '>': return a > b; case '<=': return a <= b; default: return a >= b; } }; } return l; }
  function add() { let l = mul(); while (isOp('+') || isOp('-')) { const o = tk[p++].v; const r = mul(); const a = l;
      l = (env) => { const x = a(env), y = r(env); if (o === '+') return typeof x === 'string' || typeof y === 'string' ? fmtV(x) + fmtV(y) : x + y; return x - y; }; } return l; }
  function mul() { let l = un(); for (;;) { const t = peek(); let o = null; if (t && t.t === 'op' && (t.v === '*' || t.v === '/')) o = t.v; else if (t && t.t === 'kw' && (t.v === 'mod' || t.v === 'div')) o = t.v; else break;
      p++; const r = un(); const a = l;
      l = (env) => { const x = a(env), y = r(env); if ((o === '/' || o === 'mod' || o === 'div') && y === 0) throw new Error('Division par zéro'); return o === '*' ? x * y : o === '/' ? x / y : o === 'mod' ? x % y : Math.trunc(x / y); }; } return l; }
  function un() { if (isOp('-')) { p++; const x = un(); return (env) => -x(env); } return prim(); }
  function prim() { const t = tk[p++]; if (!t) throw new Error('Expression incomplète');
    if (t.t === 'num' || t.t === 'str') return () => t.v; if (t.t === 'kw' && t.v === 'vrai') return () => true; if (t.t === 'kw' && t.v === 'faux') return () => false;
    if (t.t === 'id') return (env) => { if (!(t.v in env)) throw new Error('La variable « ' + t.v + ' » n’a pas de valeur'); return env[t.v]; };
    if (t.t === 'op' && t.v === '(') { const e = or(); if (!isOp(')')) throw new Error('Parenthèse fermante manquante'); p++; return e; }
    throw new Error('Symbole inattendu : ' + t.v); }
  const f = or(); if (p < tk.length) throw new Error('Expression mal formée : ' + src); return f;
}
const fmtV = (v) => (typeof v === 'number' ? fmtNum(v) : v === true ? 'Vrai' : v === false ? 'Faux' : String(v));
const SKIP = /^(algorithme\b.*|variables?\b.*|constantes?\b.*|d[ée]but|fin)$/i;

function parseProgram(code) {
  const lines = code.split('\n').map((l) => l.trim()).filter((l) => l && !SKIP.test(l)); let i = 0;
  function block(stop) {
    const out = [];
    while (i < lines.length) { const l = lines[i];
      if (stop.some((s) => s.test(l))) return out;
      let m;
      if ((m = /^lire\s*\((.*)\)$/i.exec(l))) { out.push({ t: 'read', vars: m[1].split(/[,;]/).map((x) => x.trim()) }); i++; }
      else if ((m = /^[ée]crire\s*\((.*)\)$/i.exec(l))) { out.push({ t: 'write', e: parseExpr(m[1]) }); i++; }
      else if ((m = /^si\s+(.+?)\s+alors$/i.exec(l))) { i++; const yes = block([/^sinon$/i, /^finsi$/i]); let no = [];
        if (lines[i] && /^sinon$/i.test(lines[i])) { i++; no = block([/^finsi$/i]); }
        if (!lines[i] || !/^finsi$/i.test(lines[i])) throw new Error('FinSi manquant'); i++; out.push({ t: 'if', c: parseExpr(m[1]), yes, no }); }
      else if ((m = /^([A-Za-zÀ-ÿ_][\wÀ-ÿ]*)\s*(?:←|<-)\s*(.+)$/.exec(l))) { out.push({ t: 'set', v: m[1], e: parseExpr(m[2]) }); i++; }
      else throw new Error('Instruction inconnue : ' + l); }
    return out;
  }
  const prog = block([]); if (i < lines.length) throw new Error('Instruction inattendue : ' + lines[i]); return prog;
}
export function interpret(code, inputs = []) {
  const env = Object.create(null); const out = []; let k = 0; let steps = 0;
  try {
    const prog = parseProgram(code);
    const run = (b) => { for (const s of b) { if (++steps > 5000) throw new Error('Trop d’instructions');
      if (s.t === 'read') for (const v of s.vars) { if (k >= inputs.length) throw new Error('Pas assez de valeurs saisies pour Lire(' + v + ')'); const raw = inputs[k++]; const num = typeof raw === 'number' ? raw : /^-?\d+([.,]\d+)?$/.test(String(raw).trim()) ? parseFloat(String(raw).replace(',', '.')) : String(raw); env[v] = num; }
      else if (s.t === 'write') out.push(fmtV(s.e(env)));
      else if (s.t === 'set') env[s.v] = s.e(env);
      else if (s.t === 'if') run(s.c(env) ? s.yes : s.no); } };
    run(prog);
  } catch (e) { return { out, vars: env, error: e.message }; }
  return { out, vars: env };
}
export function pretty(code) {
  let d = 0; return code.split('\n').map((l) => { const t = l.trim(); if (/^(sinon|finsi)$/i.test(t)) d = Math.max(0, d - 1); const s = '  '.repeat(d) + t; if (/^si\s.+\salors$/i.test(t) || /^sinon$/i.test(t)) d++; return s; }).join('\n');
}
const parseInputs = (s) => String(s).split(/[;\s]+/).filter((x) => x !== '');
const same = (a, b) => norm(String(a).replace(/["«»]/g, '')).replace(',', '.') === norm(String(b).replace(/["«»]/g, '')).replace(',', '.');

export function progGame(root, d) {
  const run = d.mode === 'run';
  const rows = d.tasks.map((t, i) => {
    const code = t[0]; const body = h('div', { class: 'ptask' });
    const input = h('input', { type: 'text', class: 'ans', autocomplete: 'off', 'aria-label': run ? `Valeurs à saisir pour le programme ${i + 1}` : `Réponse ${i + 1}`, placeholder: run ? 'ex. 12 ou 4 7' : 'Ta réponse' });
    const out = h('output', { class: 'pout', 'aria-live': 'polite' });
    let ask, inputs, target, sol;
    if (run) { target = t[1]; sol = t[2]; body.append(h('p', null, h('b', null, `${i + 1}. `), 'Trouve les valeurs à saisir pour que le programme affiche ', h('code', null, String(target)), '.'), h('pre', { class: 'code' }, pretty(code)),
      h('div', { class: 'prow' }, input, h('button', { type: 'button', class: 'btn small', onclick: () => { const r = interpret(code, parseInputs(input.value).map((x) => x)); out.textContent = r.error ? '⚠ ' + r.error : 'Affiche : ' + (r.out.join(' ; ') || '(rien)'); } }, '▶ Tester'), out)); }
    else { inputs = t[1]; ask = t[2]; body.append(h('p', null, h('b', null, `${i + 1}. `), ask === 'out' ? 'Qu’affiche cet algorithme ?' : `Quelle est la valeur de ${ask} à la fin ?`, inputs.length ? h('span', null, ' Valeurs saisies au clavier : ', h('code', null, inputs.map(fmtNum).join(' ; ')), '.') : null), h('pre', { class: 'code' }, pretty(code)), h('div', { class: 'prow' }, input)); }
    const illustration = studentIllustration(d, i, 'student-illustration-question');
    if (illustration) body.prepend(illustration);
    root.append(body);
    return { code, input, body, ask, inputs, target, sol, why: t[3] };
  });
  const expected = (r) => { const x = interpret(r.code, r.inputs || []); if (x.error) return null; return r.ask === 'out' ? x.out[0] : fmtV(x.vars[r.ask]); };
  return {
    check() {
      const items = rows.map((r) => {
        if (run) { const x = interpret(r.code, parseInputs(r.input.value)); const ok = !x.error && x.out.length > 0 && same(x.out[0], r.target);
          return { ok, msg: ok ? `Programme : affiche ${r.target} avec « ${r.input.value} ».` : `Il fallait obtenir ${r.target}` + (r.input.value ? ` (tes valeurs « ${r.input.value} » donnent : ${x.error ? x.error : x.out[0] ?? 'rien'})` : '') + `. Exemple : ${r.sol.join(' ; ')}.` + (r.why ? ' ' + r.why : '') }; }
        const e = expected(r); const ok = e != null && r.input.value.trim() !== '' && same(r.input.value, e);
        const x = interpret(r.code, r.inputs); const vars = Object.entries(x.vars).map(([k, v]) => `${k} = ${fmtV(v)}`).join(', ');
        return { ok, msg: `Résultat : ${e}. Variables à la fin : ${vars}.` + (r.why ? ' ' + r.why : '') };
      });
      return { correct: items.filter((x) => x.ok).length, total: rows.length, items, unanswered: rows.filter((r) => !r.input.value.trim()).length };
    },
    reveal(res) { rows.forEach((r, i) => r.body.classList.add(res.items[i].ok ? 'ok' : 'ko')); },
    solve() { rows.forEach((r) => { r.input.value = run ? r.sol.join(' ') : expected(r); }); },
  };
}
