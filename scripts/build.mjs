// Construit dist/ : index.html + app.js (IIFE) + app.css + polices. Aucun appel réseau à l'exécution.
import { build, transform } from 'esbuild';
import { cpSync, existsSync, mkdirSync, rmSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const root = join(dirname(fileURLToPath(import.meta.url)), '..'); const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true }); mkdirSync(dist, { recursive: true });
// Logo officiel de l'OFPPT : utilisé seulement s'il a été déposé dans public/images (sinon sigle texte, aucune requête vers un fichier absent).
const ofpptLogo = ['svg', 'png', 'webp'].map((x) => `images/ofppt-logo.${x}`).find((f) => existsSync(join(root, 'public', f))) || '';
await build({ entryPoints: [join(root, 'src/app.js')], bundle: true, minify: true, format: 'iife', target: 'chrome100', outfile: join(dist, 'app.js'), legalComments: 'none', charset: 'utf8', define: { __OFPPT_LOGO__: JSON.stringify(ofpptLogo) } });
// Feuille principale + thème v2 (le thème surcharge main.css, il doit donc venir après).
let css = ['main.css', 'theme.css', 'pro.css', 'clean.css', 'home.css', 'examen.css'].map((f) => readFileSync(join(root, 'src/styles', f), 'utf8')).join('\n');
// Mode sombre : règles écrites pour html[data-theme=dark], recopiées pour le mode automatique (réglage du système).
let dark = readFileSync(join(root, 'src/styles/dark.css'), 'utf8');
// Survols : en mode sombre, un fond de survol clair (blanc, gris très pâle…) devient un gris moyen,
// pour que le texte (clair) reste lisible. Les simulateurs de logiciels gardent leurs couleurs claires.
{
  const light = (v) => {
    if (/\bwhite\b/i.test(v)) return true;
    for (const m of v.matchAll(/rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)(?:[ ,/]+([\d.]+))?/g)) if (+m[1] > 200 && +m[2] > 200 && +m[3] > 200 && (m[4] == null || +m[4] >= 0.5)) return true;
    for (const m of v.matchAll(/#([0-9a-f]{3}|[0-9a-f]{6})\b/gi)) {
      const x = m[1].length === 3 ? m[1].split('').map((c) => c + c).join('') : m[1];
      const [r, g, b] = [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16));
      if (0.2126 * r + 0.7152 * g + 0.0722 * b > 200) return true;
    }
    return false;
  };
  const keep = /\.(rb-|desk|mwin|browser|sheetp|opage|sim|fs-|case3d|office|netboard|bbar|tb\b|otools|lp-)/;
  const sels = new Set();
  for (const m of css.matchAll(/([^{}@]+)\{([^{}]*)\}/g)) {
    const decl = m[2].match(/background(?:-color)?\s*:([^;]+)/);
    if (!decl || !light(decl[1])) continue;
    m[1].split(',').map((s) => s.trim()).filter((s) => s.includes(':hover') && !keep.test(s) && !s.startsWith('html')).forEach((s) => sels.add(s));
  }
  if (sels.size) dark += `\n/* Généré par build.mjs : ${sels.size} survols clairs remplacés par un gris moyen. */\n` +
    [...sels].map((s) => `html[data-theme=dark] ${s}{background:#323c58!important;background-image:none!important;color:var(--ink)!important}`).join('\n');
}
css += '\n' + dark + '\n@media (prefers-color-scheme:dark){' + dark.split('html[data-theme=dark]').join('html:not([data-theme=light])') + '}';
writeFileSync(join(dist, 'app.css'), (await transform(css, { loader: 'css', minify: true })).code);
// Mode immersif 3D (Three.js embarqué dans le paquet : aucun CDN).
await build({ entryPoints: [join(root, 'src/immersive/main.js')], bundle: true, minify: true, format: 'iife', target: 'chrome100', outfile: join(dist, 'immersive.js'), legalComments: 'none' });
// Fond animé de l'accueil (Three.js), chargé à la demande par app.js.
await build({ entryPoints: [join(root, 'src/fx/hero3d.js')], bundle: true, minify: true, format: 'iife', target: 'chrome100', outfile: join(dist, 'hero3d.js'), legalComments: 'none' });
await build({ entryPoints: [join(root, 'src/styles/immersive.css')], bundle: false, minify: true, outfile: join(dist, 'immersive.css') });
copyFileSync(join(root, 'index.html'), join(dist, 'index.html'));
copyFileSync(join(root, 'immersive.html'), join(dist, 'immersive.html'));
cpSync(join(root, 'public/fonts'), join(dist, 'fonts'), { recursive: true });
cpSync(join(root, 'public/images'), join(dist, 'images'), { recursive: true });
for (const f of ['manifest.webmanifest', 'icon.svg']) copyFileSync(join(root, 'public', f), join(dist, f));
for (const f of ['README.md', 'LICENSES.md']) { try { copyFileSync(join(root, f), join(dist, f)); } catch {} }
copyFileSync(join(root, 'scripts/Lancer-InfoPlay.bat'), join(dist, 'Lancer-InfoPlay.bat'));
copyFileSync(join(root, 'scripts/serve.ps1'), join(dist, 'serve.ps1'));
copyFileSync(join(root, 'scripts/lan-server.mjs'), join(dist, 'lan-server.mjs'));
console.log('dist/ prêt');
