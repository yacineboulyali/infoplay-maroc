// Construit dist/ : index.html + app.js (IIFE) + app.css + polices. Aucun appel réseau à l'exécution.
import { build } from 'esbuild';
import { cpSync, mkdirSync, rmSync, copyFileSync, writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const root = join(dirname(fileURLToPath(import.meta.url)), '..'); const dist = join(root, 'dist');
rmSync(dist, { recursive: true, force: true }); mkdirSync(dist, { recursive: true });
await build({ entryPoints: [join(root, 'src/app.js')], bundle: true, minify: true, format: 'iife', target: 'chrome100', outfile: join(dist, 'app.js'), legalComments: 'none' });
await build({ entryPoints: [join(root, 'src/styles/main.css')], bundle: false, minify: true, outfile: join(dist, 'app.css') });
copyFileSync(join(root, 'index.html'), join(dist, 'index.html'));
cpSync(join(root, 'public/fonts'), join(dist, 'fonts'), { recursive: true });
cpSync(join(root, 'public/images'), join(dist, 'images'), { recursive: true });
for (const f of ['README.md', 'LICENSES.md']) { try { copyFileSync(join(root, f), join(dist, f)); } catch {} }
copyFileSync(join(root, 'scripts/Lancer-InfoPlay.bat'), join(dist, 'Lancer-InfoPlay.bat'));
copyFileSync(join(root, 'scripts/serve.ps1'), join(dist, 'serve.ps1'));
console.log('dist/ prêt');
