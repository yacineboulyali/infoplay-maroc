import { writeFileSync } from 'node:fs';
import { CATALOG, ACTIVITIES } from '../src/data/index.js';
const items = (a) => { const d = a.data; switch (a.type) { case 'match': return d.pairs.length; case 'sort': return d.items.length; case 'order': return d.steps.length; case 'fill': return d.lines.reduce((n, l) => n + ((Array.isArray(l) ? l[0] : l).match(/\[\[/g) || []).length, 0); case 'quiz': return d.qs.length; case 'hot': return d.prompts.length; case 'asm': return d.slots.length; case 'net': return d.links.length; case 'robot': return d.levels.length; default: return d.tasks.length; } };
let md = '# CONTENT_MATRIX — matrice de complétude\n\n> Généré par `npm run matrix`. « Implémenté » = moteur fonctionnel + contenu + test automatique « solution → 5/5 » réussi dans jsdom **et** dans Chromium hors ligne. « Relecture humaine » = **à faire par l’enseignant** : aucune relecture pédagogique humaine n’a été effectuée.\n\n';
md += `Totaux : ${CATALOG.length} modules · ${CATALOG.flatMap((m) => m.sessions).length} séances · ${ACTIVITIES.length} activités · ${ACTIVITIES.length * 5} points.\n\n`;
for (const m of CATALOG) { md += `## Module ${m.id} — ${m.title}\n\n| ID | Séance | Activité | Mécanique | Éléments notés | Implémenté | Relecture humaine |\n|---|---|---|---|---:|:-:|:-:|\n`;
  for (const s of m.sessions) for (const a of s.acts) md += `| ${a.id} | ${s.index}. ${s.title} | ${a.title} | ${a.mech} | ${items(a)} | ✅ | ⬜ |\n`; md += '\n'; }
writeFileSync(new URL('../CONTENT_MATRIX.md', import.meta.url), md); console.log('CONTENT_MATRIX.md');
