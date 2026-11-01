// Évaluateur de formules de tableur (syntaxe française : SOMME, MOYENNE, MAX, MIN, NB ; arguments séparés par « ; »).
export const colName = (i) => String.fromCharCode(65 + i);
const RE = /\s*(?:(\d+(?:[.,]\d+)?)|"([^"]*)"|([A-Za-z]+\d+:[A-Za-z]+\d+)|([A-Za-z]+\d+)(?![A-Za-z(\d])|([A-Za-zÀ-ÿ.]+)(?=\s*\()|([-+*\/()^;]))/y;
const FN = { SOMME: 'sum', SUM: 'sum', MOYENNE: 'avg', AVERAGE: 'avg', MAX: 'max', MIN: 'min', NB: 'count', COUNT: 'count' };

export function computeCell(ref, raw, stack = []) {
  ref = ref.toUpperCase(); const r = raw[ref]; if (r == null || r === '') return '';
  const s = String(r).trim();
  if (s[0] !== '=') return /^-?\d+([.,]\d+)?$/.test(s) ? parseFloat(s.replace(',', '.')) : s;
  if (stack.includes(ref)) return '#REF!';
  try { return formula(s.slice(1), (x) => computeCell(x, raw, [...stack, ref])); } catch (e) { return String(e.message).startsWith('#') ? e.message : '#NOM?'; }
}
function rangeCells(a, b) {
  const pa = /^([A-Za-z])(\d+)$/.exec(a), pb = /^([A-Za-z])(\d+)$/.exec(b); if (!pa || !pb) throw new Error('#REF!');
  const c0 = Math.min(pa[1].toUpperCase().charCodeAt(0), pb[1].toUpperCase().charCodeAt(0)), c1 = Math.max(pa[1].toUpperCase().charCodeAt(0), pb[1].toUpperCase().charCodeAt(0));
  const r0 = Math.min(+pa[2], +pb[2]), r1 = Math.max(+pa[2], +pb[2]); const out = [];
  for (let c = c0; c <= c1; c++) for (let r = r0; r <= r1; r++) out.push(String.fromCharCode(c) + r); return out;
}
function formula(src, get) {
  const tk = []; RE.lastIndex = 0; let m;
  while (RE.lastIndex < src.length && (m = RE.exec(src))) {
    if (m[1] !== undefined) tk.push({ t: 'n', v: parseFloat(m[1].replace(',', '.')) }); else if (m[2] !== undefined) tk.push({ t: 's', v: m[2] });
    else if (m[3] !== undefined) tk.push({ t: 'r', v: m[3].toUpperCase() }); else if (m[4] !== undefined) tk.push({ t: 'c', v: m[4].toUpperCase() });
    else if (m[5] !== undefined) tk.push({ t: 'f', v: m[5].toUpperCase() }); else tk.push({ t: 'o', v: m[6] });
    if (!m[0]) break;
  }
  if (src.slice(RE.lastIndex).trim()) throw new Error('#NOM?');
  let p = 0; const isO = (v) => tk[p] && tk[p].t === 'o' && tk[p].v === v;
  const num = (v) => { if (v === '') return 0; if (typeof v !== 'number') { if (typeof v === 'string' && v.startsWith('#')) throw new Error(v); throw new Error('#VALEUR!'); } return v; };
  function expr() { let l = term(); while (isO('+') || isO('-')) { const o = tk[p++].v; const r = term(); l = o === '+' ? num(l) + num(r) : num(l) - num(r); } return l; }
  function term() { let l = pow(); while (isO('*') || isO('/')) { const o = tk[p++].v; const r = pow(); if (o === '*') l = num(l) * num(r); else { if (num(r) === 0) throw new Error('#DIV/0!'); l = num(l) / num(r); } } return l; }
  function pow() { let l = un(); while (isO('^')) { p++; l = Math.pow(num(l), num(un())); } return l; }
  function un() { if (isO('-')) { p++; return -num(un()); } return prim(); }
  function args() {
    const out = []; if (!isO('(')) throw new Error('#NOM?'); p++;
    if (isO(')')) { p++; return out; }
    for (;;) { if (tk[p] && tk[p].t === 'r') { const [a, b] = tk[p++].v.split(':'); out.push(...rangeCells(a, b).map(get)); } else out.push(expr());
      if (isO(';')) { p++; continue; } if (isO(')')) { p++; return out; } throw new Error('#NOM?'); }
  }
  function prim() {
    const t = tk[p++]; if (!t) throw new Error('#NOM?');
    if (t.t === 'n' || t.t === 's') return t.v; if (t.t === 'c') return get(t.v);
    if (t.t === 'f') { const f = FN[t.v]; if (!f) throw new Error('#NOM?'); const a = args(); const ns = a.filter((x) => typeof x === 'number');
      if (f === 'sum') return ns.reduce((x, y) => x + y, 0); if (f === 'count') return ns.length;
      if (f === 'avg') { if (!ns.length) throw new Error('#DIV/0!'); return ns.reduce((x, y) => x + y, 0) / ns.length; }
      if (!ns.length) return 0; return f === 'max' ? Math.max(...ns) : Math.min(...ns); }
    if (t.t === 'o' && t.v === '(') { const e = expr(); if (!isO(')')) throw new Error('#NOM?'); p++; return e; }
    throw new Error('#NOM?');
  }
  const v = expr(); if (p < tk.length) throw new Error('#NOM?'); return v;
}
