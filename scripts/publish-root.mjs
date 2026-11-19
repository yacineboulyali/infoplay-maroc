// Publie InfoPlay à la racine https://yacineboulyali.github.io/ : remplace le contenu du dépôt
// yacineboulyali.github.io (cloné à côté, ou chemin dans ROOT_SITE_DIR) par dist/, puis commit et push.
// Lance : npm run publish:root   (construit dist/ avant de copier)
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const site = resolve(process.env.ROOT_SITE_DIR || '../portfolio');
const git = (...a) => execFileSync('git', ['-C', site, ...a], { encoding: 'utf8' }).trim();
if (!existsSync(join(site, '.git'))) throw new Error(`Dépôt du site racine introuvable : ${site} (ROOT_SITE_DIR)`);
if (!/yacineboulyali\.github\.io(\.git)?$/.test(git('remote', 'get-url', 'origin'))) throw new Error('Ce dossier n’est pas le dépôt yacineboulyali.github.io.');
if (git('status', '--porcelain')) throw new Error('Le dépôt du site racine a des modifications non enregistrées : rien n’est écrasé.');

execFileSync(process.execPath, ['scripts/build.mjs'], { stdio: 'inherit' });
git('pull', '--ff-only', '-q');
for (const f of readdirSync(site)) if (f !== '.git') rmSync(join(site, f), { recursive: true, force: true });
cpSync('dist', site, { recursive: true });
writeFileSync(join(site, '.nojekyll'), ''); // fichiers servis tels quels, sans traitement Jekyll
writeFileSync(join(site, 'README.md'), `# yacineboulyali.github.io

Version publiée d'**InfoPlay Maroc** : https://yacineboulyali.github.io/

Ce dépôt est généré : ne pas le modifier à la main. Le code source est dans
https://github.com/yacineboulyali/infoplay-maroc et se publie ici avec \`npm run publish:root\`.
`);

git('add', '-A');
if (!git('status', '--porcelain')) { console.log('Site racine déjà à jour.'); process.exit(0); }
const rev = execFileSync('git', ['rev-parse', '--short', 'HEAD'], { encoding: 'utf8' }).trim();
git('commit', '-q', '-m', `Publie InfoPlay Maroc (${rev}) à la racine`);
git('push', '-q', 'origin', 'HEAD');
console.log(`Publié : https://yacineboulyali.github.io/ (InfoPlay ${rev})`);
