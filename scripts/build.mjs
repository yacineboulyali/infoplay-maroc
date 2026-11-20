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
const dark = readFileSync(join(root, 'src/styles/dark.css'), 'utf8');
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
