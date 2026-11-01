export const MAX = 5;
/** Score d'une activité (0–5, un chiffre après la virgule) à partir de correct/total pondérés. */
export function activityScore(correct, total) {
  if (!total || total <= 0) return 0;
  const s = Math.round((Math.max(0, correct) / total) * MAX * 10) / 10;
  return Math.min(MAX, Math.max(0, s));
}
export function band(total20) {
  if (total20 >= 16) return { label: 'Très bien', tone: 'top' };
  if (total20 >= 12) return { label: 'Bien', tone: 'good' };
  if (total20 >= 10) return { label: 'En cours d’acquisition', tone: 'mid' };
  return { label: 'À renforcer', tone: 'low' };
}
export const r1 = (x) => Math.round(x * 10) / 10;
export const fmt = (x) => String(r1(x)).replace('.', ',');
/** Statistiques d'une séance. get(actId) -> {attempts:[{score}]} | undefined */
export function sessionStats(session, get) {
  let first = 0, best = 0, done = 0, tries = 0;
  for (const a of session.acts) {
    const at = (get(a.id)?.attempts) || [];
    if (at.length) { done++; first += at[0].score; best += Math.max(...at.map((x) => x.score)); tries += at.length; }
  }
  const n = session.acts.length;
  return { first: r1(first), best: r1(best), done, n, tries, status: done === 0 ? 'todo' : done === n ? 'done' : 'doing', max: n * MAX };
}
export function moduleStats(mod, get) {
  let best = 0, first = 0, done = 0, n = 0, sessionsDone = 0;
  for (const s of mod.sessions) { const st = sessionStats(s, get); best += st.best; first += st.first; done += st.done; n += st.n; if (st.status === 'done') sessionsDone++; }
  return { best: r1(best), first: r1(first), done, n, max: n * MAX, pct: n ? Math.round((done / n) * 100) : 0, sessionsDone };
}
