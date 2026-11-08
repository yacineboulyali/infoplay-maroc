// Construit dist/ : index.html + app.js (IIFE) + app.css + polices. Aucun appel réseau à l'exécution.
import { build, transform } from 'esbuild';
import { cpSync, mkdirSync, rmSync, copyFileSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const root = join(dirname(fileURLToPath(import.meta.url)), '..'); const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true }); mkdirSync(dist, { recursive: true });
await build({ entryPoints: [join(root, 'src/app.js')], bundle: true, minify: true, format: 'iife', target: 'chrome100', outfile: join(dist, 'app.js'), legalComments: 'none' });
// Feuille principale + thème v2 (le thème surcharge main.css, il doit donc venir après).
const css = ['main.css', 'theme.css', 'pro.css'].map((f) => readFileSync(join(root, 'src/styles', f), 'utf8')).join('\n');
writeFileSync(join(dist, 'app.css'), (await transform(css, { loader: 'css', minify: true })).code);
// Mode immersif 3D (Three.js embarqué dans le paquet : aucun CDN).
await build({ entryPoints: [join(root, 'src/immersive/main.js')], bundle: true, minify: true, format: 'iife', target: 'chrome100', outfile: join(dist, 'immersive.js'), legalComments: 'none' });
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
