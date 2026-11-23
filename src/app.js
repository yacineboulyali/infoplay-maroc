import { egtsiScreen } from './egtsi106/screen.js';
import { activityVisual, visualPractice } from './pro/practice.js';
import { officeArt } from './pro/visuals.js';
import { mechanicIcon } from './utils/semantic-icons.js';
import { STUDENT_ILLUSTRATIONS } from './data/student-illustrations.js';
import { ACTIVITY_CARDS } from './data/activity-cards.js';
import { h, downloadText, frDate, celebrate, svgFrom } from './utils/dom.js';
import { createStore, localAdapter, MAX_IMPORT_BYTES } from './storage/store.js';
import { CATALOG, ACTIVITIES, getActivity, getModule, getSession, isActivityId, TOTAL_POINTS } from './data/index.js';
import { engineOf } from './games/index.js';
import { activityScore, band, sessionStats, moduleStats, fmt, MAX } from './scoring/scoring.js';
import { audio, installInterfaceSounds } from './audio/audio.js';
import { arModule, arSession, arActivity, arInstruction } from './i18n/ar.js';
import { arHint } from './i18n/arhint.js';
import { lanManager } from './multiplayer/lan.js';
import { raceScreen, monitorScreen, progressSnapshot, trackRace, avatarFor } from './multiplayer/screens.js';
import { computeGame, bestTime, fmtTime, BADGES } from './fx/game.js';
import { gameHud } from './fx/popup.js';
import { presentResult, makeChrono } from './fx/flow.js';
import { installInteractions, revealIn } from './fx/interact.js';
import { fsButton, suggestFullscreen, autoHideHeader } from './fx/fullscreen.js';
import { PRO, PRO_ACTIVITIES, LEVELS, getLevel, collegeModule, levelActivities, COLLEGE_ACTIVITIES } from './data/index.js';
import { PRO_POINTS } from './data/pro/index.js';
import { proHub, reviewScreen, defiScreen } from './pro/screens.js';
import { proScope, MASTERY } from './pro/engine.js';

const store = createStore(localAdapter(), isActivityId);
const app = document.getElementById('app');
const KIND = { match: 'Associer', sort: 'Classer', order: 'Ordonner', fill: 'Compléter', quiz: 'Questions', hot: 'Repérer', asm: 'Assembler', net: 'Relier', robot: 'Robot', prog: 'Algorithme', sim: 'Simulation' };
const recOf = (pid) => (id) => store.record(pid, id);
const go = (p) => { location.hash = p; };
const link = (href, ...kids) => h('a', { href }, ...kids);
const STATUS = { todo: 'Pas commencée', doing: 'En cours', done: 'Terminée' };
const arSub = (text) => arHint(text);
// Parcours M205 : libellés et périmètre de jeu propres (le Tronc Commun garde les siens).
const isPro = (mi) => Number(mi) === PRO.id;
// Parcours Informatique Collège : chaque niveau (1AC, 2AC, 3AC) est un parcours à part.
const colMod = (mi) => collegeModule(mi);
const colScope = (L) => ({ activities: levelActivities(L), groups: L.modules.filter((m) => m.sessions.length) });
// Un seul parcours à la fois : 'tc' (Tronc commun), 'pro' (M205) ou 'egtsi'. On en change depuis l'accueil.
let currentTrack = null;
function trackOf(hash) {
  const q = hash.replace(/^#\/?/, '').replace(/\?.*$/, '').split('/').filter(Boolean);
  if (!q.length || q[0] === 'profils' || q[0] === 'accueil') return null;
  if (q[0] === 'pro' || (q[0] === 'm' && isPro(q[1]))) return 'pro';
  if (q[0] === 'egtsi106') return 'egtsi';
  if (q[0] === 'college' && getLevel(q[1])) return 'col' + q[1];
  if (q[0] === 'm' && colMod(q[1])) return 'col' + colMod(q[1]).level;
  if (q[0] === 'dash' || q[0] === 'progres' || q[0] === 'm') return 'tc';
  return currentTrack; // pages communes : on reste dans le parcours en cours
}
const homeStep = (mi) => (isPro(mi) ? ['🏠', 'Accueil', '#/profils'] : colMod(mi) ? ['🏫', colMod(mi).levelCode, '#/college/' + colMod(mi).level] : ['🏠', 'Tableau de bord', '#/dash']);
const modLabel = (mi) => (isPro(mi) ? 'M205' : colMod(mi) ? `${colMod(mi).levelCode} · Module ${colMod(mi).rank}` : 'Module ' + mi);
const modHref = (mi) => (isPro(mi) ? '#/pro' : '#/m/' + mi);
const scopeOf = (mi, pid) => (isPro(mi) ? proScope(pid, recOf(pid)) : colMod(mi) ? colScope(getLevel(colMod(mi).level)) : undefined);
const trackHref = (t) => (t === 'pro' ? '#/pro' : t === 'egtsi' ? '#/egtsi106' : t && t.startsWith('col') ? '#/college/' + t.slice(3) : '#/dash');
const arSess = (s) => s.ar || arSession(s.id);

// ---------- Petits composants & utilitaires ----------
function toast(msg) {
  const t = h('div', { class: 'toast', role: 'status' }, msg);
  document.body.append(t);
  setTimeout(() => t.remove(), 3200);
}

function confirmBox(message, ok = 'Continuer', danger = false) {
  return new Promise((res) => {
    const prev = document.activeElement;
    const done = (v) => { bg.remove(); prev && prev.focus && prev.focus(); res(v); };
    const yes = h('button', { type: 'button', class: 'btn ' + (danger ? 'danger' : 'primary'), onclick: () => done(true) }, ok);
    const bg = h('div', { class: 'modal-bg', onkeydown: (e) => { if (e.key === 'Escape') done(false); } },
      h('div', { class: 'modal', role: 'alertdialog', 'aria-modal': 'true', 'aria-label': message },
        h('p', null, message),
        h('div', { class: 'row' }, yes, h('button', { type: 'button', class: 'btn ghost', onclick: () => done(false) }, 'Annuler'))
      )
    );
    document.body.append(bg);
    (danger ? bg.querySelector('.ghost') : yes).focus();
  });
}

const ring = (pct, label) => h('div', { class: 'ring', role: 'img', 'aria-label': label, style: `--p:${pct}` }, h('span', null, pct + ' %'));
const bar = (pct, label) => h('div', { class: 'bar', role: 'progressbar', 'aria-valuenow': pct, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-label': label }, h('i', { style: `width:${pct}%` }));

function applyPrefs(p) {
  const pr = p?.preferences || {};
  document.body.classList.toggle('reduced-motion', !!pr.reducedMotion);
  document.body.classList.toggle('large-text', !!pr.largeText);
  document.body.classList.toggle('high-contrast', !!pr.highContrast);
  audio.configure(pr);
}

function soundButton(prof) {
  if (!prof) return null;
  const on = prof.preferences.soundEnabled;
  return h('button', {
    type: 'button',
    class: 'sound-toggle',
    'aria-pressed': String(on),
    title: on ? 'Couper tous les sons' : 'Activer les sons',
    onclick: () => {
      store.updateProfile(prof.id, { preferences: { soundEnabled: !on } });
      applyPrefs(store.active());
      render();
    },
  },
  h('span', { 'aria-hidden': 'true' }, on ? '🔊' : '🔇'),
  h('span', { class: 'sound-label' }, on ? 'Son activé' : 'Son coupé')
  );
}

// ---------- Fil d'Ariane : étapes en chevrons (icône, libellé, lien facultatif) ----------
export function crumbs(...steps) {
  return h('nav', { class: 'crumbs chev', 'aria-label': 'Fil d’Ariane' },
    h('ol', null, steps.map(([icon, label, href], i) => {
      const inner = [h('span', { class: 'chev-ico', 'aria-hidden': 'true' }, icon), h('span', { class: 'chev-txt' }, label)];
      return h('li', { class: 'chev-step s' + Math.min(i + 1, 4) + (href ? '' : ' cur'), 'aria-current': href ? null : 'page' }, href ? h('a', { href }, inner) : h('span', null, inner));
    })));
}

// ---------- En-tête principal ----------
function header(prof) {
  currentTrack = trackOf(location.hash);
  // En-tête épuré : logo, son, changement d'utilisateur et plein écran uniquement.
  return h('header', { class: 'top top-slim' },
    h('div', { class: 'in' },
      h('a', { class: 'brand', href: '#/profils' },
        h('span', { class: 'logo', 'aria-hidden': 'true' }, '🎮'),
        h('span', null, 'InfoPlay ', h('b', null, 'Maroc'))
      ),
      h('div', { class: 'top-tools' },
        soundButton(prof),
        prof ? h('button', { type: 'button', class: 'switch-user', title: `Connecté : ${prof.displayName}`, onclick: () => { store.logout(); go('#/profils'); } }, '👤 ', h('span', { class: 'switch-label' }, 'Changer l’utilisateur')) : null,
        fsButton('fs-btn'))
    )
  );
}

function floatingHome(prof) {
  return h('a', {
    class: 'floating-home noprint',
    href: '#/profils',
    'aria-label': 'Retour à l’accueil InfoPlay',
    title: 'Accueil InfoPlay — ياسين بوليالي (Yacine BOULYALI)',
  },
  h('span', { 'aria-hidden': 'true' }, '🏠'),
  h('span', { class: 'floating-home-label' }, 'Accueil')
  );
}

// Charge dist/hero3d.js (Three.js) une seule fois, puis anime le canvas de l'accueil.
function mountHero3D(canvas) {
  const run = () => requestAnimationFrame(() => window.InfoPlayHero3D?.mount(canvas));
  if (window.InfoPlayHero3D) return run();
  let s = document.querySelector('script[data-hero3d]');
  if (!s) { s = document.createElement('script'); s.src = 'hero3d.js'; s.dataset.hero3d = ''; s.onerror = () => canvas.classList.add('lp-nogl'); document.head.append(s); }
  s.addEventListener('load', run, { once: true });
}

// ---------- ÉCRAN 1 : ACCUEIL INFOPLAY & CRÉATEUR YACINE BOULYALI ----------
function homeScreen() {
  const name = h('input', {
    type: 'text',
    id: 'pname',
    maxlength: '24',
    required: true,
    autocomplete: 'off',
    placeholder: 'Ex : Amine, Fatima, Yassine, Sarah...',
  });
  const err = h('p', { class: 'hint-line', role: 'alert' });

  const form = h('form', {
    class: 'entry-form',
    onsubmit: (e) => {
      e.preventDefault();
      try {
        store.createProfile(name.value);
        const active = store.active();
        lanManager.updateProfile({ displayName: active.displayName, className: active.className });
        closeEntry(); go(entryTarget);
      } catch (x) {
        err.textContent = x.message;
      }
    },
  },
  h('label', { class: 'f', for: 'pname' }, 'Nouveau joueur ? Entre ton prénom ou ton pseudo :'),
  h('div', { class: 'entry-input-wrap' },
    name,
    h('button', { class: 'btn primary entry-submit-btn', type: 'submit' }, 'Commencer l’aventure 🚀')
  ),
  err
  );

  const existingProfiles = store.profiles();
  const list = existingProfiles.length ? h('div', { class: 'existing-profiles-card' },
    h('h3', { class: 'existing-title' }, '👥 Profils enregistrés sur cet ordinateur :'),
    h('div', { class: 'profiles' }, existingProfiles.map((p) => {
      const t = moduleStats({ sessions: CATALOG.flatMap((m) => m.sessions) }, recOf(p.id));
      return h('button', {
        type: 'button',
        class: 'profile-btn',
        onclick: () => {
          store.setActive(p.id);
          lanManager.updateProfile({ displayName: p.displayName, className: p.className });
          closeEntry(); go(entryTarget);
        },
      },
      h('span', { class: 'prof-ava', 'aria-hidden': 'true' }, avatarFor(p.displayName)),
      h('span', { class: 'prof-meta' },
        h('b', null, p.displayName),
        p.className ? h('small', { class: 'muted' }, ' · ' + p.className) : null
      ),
      h('span', { class: 'pill done' }, fmt(t.best) + ' / ' + TOTAL_POINTS + ' pts')
      );
    }))
  ) : null;

  const entrySection = h('section', {
    class: 'welcome-entry-box entry-modal',
    id: 'entry-zone',
    role: 'dialog',
    'aria-modal': 'true',
    'aria-label': 'Connexion à InfoPlay Maroc',
  },
  h('button', { type: 'button', class: 'rp-close', 'aria-label': 'Fermer', onclick: () => closeEntry() }, '✕'),
  h('div', { class: 'entry-inner' },
    h('div', { class: 'entry-header' },
      h('h2', null, 'Qui es-tu ?'),
      h('p', { class: 'muted' }, 'Aucun mot de passe requis. Tes scores, étoiles et progrès restent enregistrés en local sur cet ordinateur.')
    ),
    form,
    list
  )
  );

  // Fenêtre de connexion : ouverte seulement quand un parcours demande un profil.
  let entryTarget = '#/dash';
  const entryBg = h('div', { class: 'modal-bg', onclick: (e) => { if (e.target === entryBg) closeEntry(); }, onkeydown: (e) => { if (e.key === 'Escape') closeEntry(); } }, entrySection);
  function closeEntry() { entryBg.remove(); document.body.classList.remove('entry-open'); }
  const openPath = (target) => {
    if (store.active()) return go(target);
    entryTarget = target; document.body.classList.add('entry-open'); document.body.append(entryBg); setTimeout(() => name.focus(), 30);
  };

  // Fond Three.js (nappes floues + formes flottantes), chargé à la demande.
  const canvas = h('canvas', { class: 'lp-canvas', 'aria-hidden': 'true' });
  mountHero3D(canvas);
  const toPaths = (e) => { e.preventDefault(); const t = document.getElementById('parcours'); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); t.querySelector('h2')?.focus({ preventScroll: true }); };
  const portrait = h('figure', { class: 'lp-portrait' },
    h('div', { class: 'lp-portrait-card' },
      h('img', { src: 'images/yacine-sebouali-profile.jpg', alt: 'Portrait de Yacine BOULYALI, créateur d’InfoPlay Maroc', width: '400', height: '460' }),
      h('figcaption', { class: 'lp-glass' }, h('b', null, 'Yacine BOULYALI'), ' · Créateur d’InfoPlay Maroc')
    ),
    h('span', { class: 'lp-chip lp-chip-a', 'aria-hidden': 'true' }, '🎮 120 activités'),
    h('span', { class: 'lp-chip lp-chip-b', 'aria-hidden': 'true' }, '⚡ 100 % hors ligne')
  );
  // Inclinaison douce du portrait au survol.
  portrait.addEventListener('pointermove', (e) => {
    const r = portrait.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5;
    portrait.style.setProperty('--rx', (-y * 8).toFixed(2) + 'deg'); portrait.style.setProperty('--ry', (x * 10).toFixed(2) + 'deg');
  });
  portrait.addEventListener('pointerleave', () => { portrait.style.setProperty('--rx', '0deg'); portrait.style.setProperty('--ry', '0deg'); });

  // Logo officiel s'il a été déposé dans public/images (détecté au build), sinon sigle texte.
  const OFPPT_LOGO = typeof __OFPPT_LOGO__ === 'string' ? __OFPPT_LOGO__ : '';
  const ofpptLogo = () => (OFPPT_LOGO
    ? h('img', { class: 'ofppt-logo', src: OFPPT_LOGO, alt: 'Logo de l’OFPPT', width: '56', height: '56' })
    : h('span', { class: 'ofppt-word', role: 'img', 'aria-label': 'OFPPT' }, 'OFPPT'));
  return h('main', { id: 'main', class: 'welcome-page lp' },
    h('section', { class: 'lp-hero' },
      h('div', { class: 'lp-bg', 'aria-hidden': 'true' }, h('i', { class: 'lp-blob b1' }), h('i', { class: 'lp-blob b2' }), h('i', { class: 'lp-blob b3' }), canvas),
      h('div', { class: 'lp-hero-in' },
        h('div', { class: 'lp-copy' },
          h('p', { class: 'lp-eyebrow' }, 'Yacine BOULYALI · Portfolio éducatif'),
          h('h1', { tabindex: '-1', class: 'lp-title' }, 'Bienvenue ', h('span', null, 'dans mon'), ' ', h('em', null, 'univers')),
          h('p', { class: 'lp-lead' }, 'Apprends l’informatique en jouant : 30 séances, 120 activités, et une progression qui reste sur cet ordinateur.'),
          h('div', { class: 'lp-actions' },
            h('a', { class: 'btn primary lp-cta', href: '#parcours', onclick: toPaths }, 'Entrer dans InfoPlay Maroc →'),
            h('a', { class: 'btn lp-ghost', href: 'immersive.html' }, '🏝️ Monde 3D')
          ),
          h('ul', { class: 'lp-stats', 'aria-label': 'En bref' },
            h('li', null, h('b', null, '4'), h('span', null, 'parcours')),
            h('li', null, h('b', null, '200+'), h('span', null, 'activités')),
            h('li', null, h('b', null, '0'), h('span', null, 'mot de passe'))
          )
        ),
        portrait
      ),
      h('a', { class: 'lp-scroll', href: '#parcours', onclick: toPaths, 'aria-label': 'Voir les parcours' }, h('span', { 'aria-hidden': 'true' }))
    ),
    h('section', { class: 'lp-paths', id: 'parcours', 'aria-labelledby': 'parcours-h' },
      h('div', { class: 'lp-paths-head' },
        h('h2', { id: 'parcours-h', tabindex: '-1' }, 'Choisis ton parcours'),
        h('p', { class: 'muted' }, 'Chaque parcours garde tes scores, tes étoiles et ta progression.')
      ),
      h('div', { class: 'welcome-copy' },
        // Parcours regroupés par public : collège, lycée (tronc commun), formation professionnelle (OFPPT).
        h('div', { class: 'track-groups' },
          h('section', { class: 'track-group track-college', 'aria-labelledby': 'grp-college-h' },
            h('header', { class: 'track-head' },
              h('span', { class: 'track-ico', 'aria-hidden': 'true' }, '🏫'),
              h('div', null, h('h3', { id: 'grp-college-h' }, 'Collège · Informatique'), h('p', null, 'Secondaire collégial : 1re, 2e et 3e année (programme ANPI).'))),
            h('div', { class: 'mode-choice', role: 'group', 'aria-label': 'Parcours du collège' },
            ...LEVELS.map((L) => h('section', { class: 'mode-card mode-pro mode-college', 'aria-labelledby': `mode-col${L.level}-h` },
              h('span', { class: 'mode-ico', 'aria-hidden': 'true' }, L.icon),
              h('h3', { id: `mode-col${L.level}-h` }, `${L.code} · ${L.title}`),
              h('p', null, `${L.modules.length} modules : ${L.modules.map((m) => m.title).join(', ')}.`),
              h('button', { type: 'button', class: 'btn primary mode-go', onclick: () => openPath('#/college/' + L.level) }, 'Ouvrir le parcours →'))),
            )),
          h('hr', { class: 'track-sep' }),
          h('section', { class: 'track-group track-lycee', 'aria-labelledby': 'grp-lycee-h' },
            h('header', { class: 'track-head' },
              h('span', { class: 'track-ico', 'aria-hidden': 'true' }, '🎓'),
              h('div', null, h('h3', { id: 'grp-lycee-h' }, 'Lycée · Tronc commun'), h('p', null, 'Secondaire qualifiant : informatique du tronc commun, en classe ou en 3D.'))),
            h('div', { class: 'mode-choice', role: 'group', 'aria-label': 'Parcours du tronc commun' },
            h('section', { class: 'mode-card mode-classic', 'aria-labelledby': 'mode-classic-h' },
              h('span', { class: 'mode-ico', 'aria-hidden': 'true' }, '📚'),
              h('h3', { id: 'mode-classic-h' }, 'Tronc commun'),
              h('p', null, '4 modules, 30 séances, 120 activités.'),
              h('button', { type: 'button', class: 'btn primary mode-go welcome-cta', onclick: () => openPath('#/dash') }, 'Ouvrir le parcours →')
            ),
            h('section', { class: 'mode-card mode-immersive', 'aria-labelledby': 'mode-3d-h' },
              h('span', { class: 'mode-badge' }, 'Nouveau · 3D'),
              h('span', { class: 'mode-ico', 'aria-hidden': 'true' }, '🏝️'),
              h('h3', { id: 'mode-3d-h' }, 'InfoPlay Immersif 3D'),
              h('p', null, 'Les mêmes séances dans un monde en 3D.'),
              h('a', { class: 'btn primary mode-go', href: 'immersive.html' }, 'Ouvrir le parcours →')
            ),
            )),
          h('hr', { class: 'track-sep' }),
          h('section', { class: 'track-group track-ofppt', 'aria-labelledby': 'grp-ofppt-h' },
            h('header', { class: 'track-head' },
              ofpptLogo(),
              h('div', null, h('h3', { id: 'grp-ofppt-h' }, 'OFPPT · Formation professionnelle'), h('p', null, 'Modules des filières de l’Office de la formation professionnelle.'))),
            h('div', { class: 'mode-choice', role: 'group', 'aria-label': 'Parcours OFPPT' },
            h('section', { class: 'mode-card mode-pro mode-ofppt', 'aria-labelledby': 'mode-pro-h' },
              h('span', { class: 'mode-badge' }, 'Nouveau'),
              h('span', { class: 'mode-ico', 'aria-hidden': 'true' }, '💼'),
              h('h3', { id: 'mode-pro-h' }, 'M205 · Bureautique avancée'),
              h('p', null, '20 séances, 80 activités : Word, Excel, PowerPoint, Outlook.'),
              h('button', { type: 'button', class: 'btn primary mode-go', onclick: () => openPath('#/pro') }, 'Ouvrir le parcours →')
            ),
            h('section', { class: 'mode-card mode-pro mode-ofppt', 'aria-labelledby': 'mode-egtsi-h' },
              h('span', { class: 'mode-badge' }, 'Partie 1'),
              h('h3', { id: 'mode-egtsi-h' }, 'EGTSI106 · Culture et techniques du numérique'),
              h('span', { class: 'mode-ico', 'aria-hidden': 'true' }, '🖥️'),
              h('p', null, '3 séances : numérique, appareils et réseaux, Windows.'),
              h('a', { class: 'btn primary mode-go', href: '#/egtsi106' }, 'Ouvrir le parcours →')
            )
            ))
        )
      ),
      h('aside', { class: 'lp-notice lp-glass' },
        h('b', null, 'À savoir : '),
        'ce profil sert seulement à retrouver tes résultats sur cet ordinateur. Il n’y a pas de mot de passe et il n’est pas sécurisé. N’écris ni ton nom complet, ni ton adresse, ni ton numéro de téléphone. Sur un ordinateur partagé, tes résultats restent dans ce navigateur : pense à les sauvegarder dans « ',
        h('a', { href: '#/donnees' }, 'Profil et données'), ' ».'
      )
    ),
    h('footer', { class: 'welcome-footer' },
      h('div', { class: 'footer-main' },
        h('p', { class: 'footer-credit' },
          'InfoPlay Maroc © 2026 · Conçu et développé par ',
          h('b', null, 'Yacine BOULYALI'),
          ' (',
          h('span', { lang: 'ar', dir: 'rtl' }, 'ياسين بوليالي'),
          ').'
        ),
        h('p', { class: 'footer-sub' },
          'Plateforme éducative autonome · 100 % hors-ligne · Conçue pour les élèves et établissements scolaires du Royaume du Maroc 🇲🇦'
        )
      )
    ),
    store.recovered ? h('p', { class: 'notice' }, 'Les données enregistrées ont été récupérées avec succès.') : null
  );
}

// ---------- ÉCRAN 2 : SALON MULTIJOUEUR RÉSEAU LOCAL (LAN) ----------
function multiplayerScreen() {
  const prof = store.active();
  const lanState = lanManager.getState();
  const me = prof ? { displayName: prof.displayName, className: prof.className || '', score: 0 } : null;

  if (prof) {
    const all = { sessions: CATALOG.flatMap((m) => m.sessions) };
    const t = moduleStats(all, recOf(prof.id));
    me.score = t.best;
    lanManager.updateProfile(me);
  }

  const chatInput = h('input', {
    type: 'text',
    placeholder: 'Écris un message pour les joueurs du réseau local...',
    maxlength: '60',
  });

  const chatForm = h('form', {
    class: 'row',
    style: 'margin-top:.6rem',
    onsubmit: (e) => {
      e.preventDefault();
      if (chatInput.value.trim()) {
        lanManager.sendChat(chatInput.value);
        chatInput.value = '';
      }
    },
  },
  chatInput,
  h('button', { class: 'btn primary small', type: 'submit' }, 'Envoyer')
  );

  const reactions = ['👋 Salut !', '🎮 Prêt à jouer !', '🔥 Défi accepté !', '⭐ Bravo !', '🚀 En route pour le score max !'];
  const reactionBtns = reactions.map((r) => h('button', {
    type: 'button',
    class: 'reaction-btn',
    onclick: () => lanManager.sendChat(r),
  }, r));

  const feedList = h('div', { class: 'lan-feed' },
    lanState.messages.length ? lanState.messages.map((m) => h('div', { class: 'lan-feed-item' },
      h('span', null, h('b', null, m.author), ' : ', m.text),
      h('span', { class: 'time' }, m.time)
    )) : h('p', { class: 'muted', style: 'padding:.4rem' }, 'Aucun message pour l’instant. Envoie une réaction !')
  );

  const playersGrid = h('div', { class: 'grid g3' },
    lanState.players.filter((p) => p.role !== 'observer').map((p) => h('div', { class: 'peer-card' + (p.isMe ? ' is-me' : '') },
      h('span', { class: 'peer-avatar', 'aria-hidden': 'true' }, p.avatar || '🎮'),
      h('div', { class: 'peer-info' },
        h('b', null, p.name, p.isMe ? ' (Moi)' : ''),
        p.className ? h('small', { class: 'muted' }, 'Classe ' + p.className + ' · ') : null,
        h('span', { class: 'peer-online' }, 'En ligne'),
        h('div', { class: 'peer-activity' }, '📍 ' + (p.activity || 'Dans le salon')),
        h('span', { class: 'pill done', style: 'margin-top:.3rem' }, `${p.score || 0} pts`)
      ),
      p.activityId && !p.isMe ? h('a', {
        class: 'btn small ghost',
        href: '#/m/' + p.activityId.split('-')[0].replace('m', '') + '/s/' + p.activityId.split('-')[1].replace('s', '') + '/a/' + p.activityId.split('-')[2].replace('a', ''),
        title: 'Rejoindre cette activité',
      }, 'Rejoindre') : null
    ))
  );

  const challengeList = lanState.challenges.length ? h('div', { class: 'card', style: 'margin-top:1.2rem;border-color:var(--accent)' },
    h('h2', { style: 'color:var(--accent)' }, '⚡ Défis en direct sur le réseau local :'),
    h('div', { class: 'grid g2' }, lanState.challenges.map((c) => h('div', { class: 'row', style: 'justify-content:space-between;padding:.5rem;background:#fff5f2;border-radius:10px' },
      h('div', null,
        h('b', null, c.creatorName, ' vous défie !'),
        h('div', { class: 'muted' }, c.title)
      ),
      h('a', {
        class: 'btn accent small',
        href: '#/m/' + c.activityId.split('-')[0].replace('m', '') + '/s/' + c.activityId.split('-')[1].replace('s', '') + '/a/' + c.activityId.split('-')[2].replace('a', ''),
      }, '▶ Relever le défi !')
    )))
  ) : null;

  return h('main', { id: 'main' },
    h('section', { class: 'lan-salon-hero' },
      h('h1', { tabindex: '-1' }, '🌐 Salon Multijoueur Réseau Local'),
      h('p', { class: 'muted', style: 'color:#cbd5e1' },
        'Tous les joueurs connectés sur le même réseau (Wi-Fi ou câblé dans la salle informatique) apparaissent ici en direct !'
      ),
      h('div', { class: 'lan-info-banner' },
        h('span', null, '💡 Pour jouer ensemble sur d’autres ordinateurs de la salle, ouvrez :'),
        h('code', null, location.origin || 'http://localhost:8765'),
        h('span', { class: 'pill done' }, `${lanState.playerCount} joueur(s) actif(s) sur le réseau`)
      )
    ),
    h('h2', null, 'Joueurs en direct sur le réseau local :'),
    playersGrid,
    challengeList,
    h('div', { class: 'card lan-chat-box' },
      h('h2', null, '💬 Réactions et encouragements sur le réseau :'),
      h('div', { class: 'lan-reactions' }, reactionBtns),
      feedList,
      chatForm
    ),
    h('div', { class: 'row', style: 'margin-top:1.5rem' },
      prof ? h('a', { class: 'btn primary', href: trackHref(currentTrack) }, '← Retour à mon parcours') : h('a', { class: 'btn primary', href: '#/profils' }, '← Choisir mon pseudo')
    )
  );
}

// ---------- TABLEAU DE BORD ----------
function dashScreen() {
  const p = store.active();
  const rec = recOf(p.id);
  const all = { sessions: CATALOG.flatMap((m) => m.sessions) };
  const t = moduleStats(all, rec);
  const next = ACTIVITIES.find((a) => !(rec(a.id)?.attempts.length));
  const pct = Math.round((t.done / t.n) * 100);
  const game = computeGame(rec, p.id);

  // Mise à jour de la présence LAN
  lanManager.setActivity('dash', 'Tableau de bord');
  lanManager.updateProfile({ score: t.best });

  // Même présentation que le parcours M205 : héros + « Carte des compétences »,
  // une colonne par module avec ses séances rangées dessous.
  const parts = CATALOG.map((m) => {
    const ms = moduleStats(m, rec);
    const done = ms.n && ms.sessionsDone === m.sessions.length && ms.best / ms.max >= 0.7;
    return h('section', { class: 'card pro-part tc-part ' + m.color },
      h('header', null,
        h('span', { class: 'pp-ico', 'aria-hidden': 'true' }, m.icon),
        h('div', null, h('h3', null, h('a', { href: `#/m/${m.id}` }, `Module ${m.id} · ${m.short || m.title}`)), h('small', { class: 'muted' }, `${ms.done}/${ms.n} activités · ${fmt(ms.best)}/${ms.max} pts`)),
        h('span', { class: 'pill ' + (done ? 'done' : ''), title: 'Termine toutes les séances avec au moins 70 %' }, done ? '🎓 Validé' : '🔒 À valider')),
      h('ol', { class: 'pp-nodes' }, m.sessions.map((s) => {
        const lv = tcMastery(s, rec); const ss = sessionStats(s, rec);
        return h('li', null, h('a', { class: 'pp-node lv' + lv, href: `#/m/${m.id}/s/${s.index}`, title: `${MASTERY[lv].label} · ${STATUS[ss.status]} · ${fmt(ss.best)}/20` },
          h('span', { class: 'pp-n', 'aria-hidden': 'true' }, MASTERY[lv].icon),
          h('span', { class: 'pp-t' }, h('b', null, `S${s.index}`), ' ', s.title),
          h('small', null, `${fmt(ss.best)}/20`)));
      })));
  });

  const view = h('main', { id: 'main', class: 'pro-page tc-dash' },
    crumbs(['🏠', 'Accueil', '#/profils'], ['📚', 'Tronc commun']),
    h('section', { class: 'pro-hero', 'data-reveal': '' },
      h('div', { class: 'pro-hero-main' },
        h('p', { class: 'eyebrow' }, 'Lycée · Tronc commun · 4 modules · 30 séances'),
        h('h1', { tabindex: '-1' }, '📚 Informatique — Tronc commun'),
        h('p', { class: 'pro-story' }, `Bonjour ${p.displayName} ! Choisis un module, puis une séance : chaque séance contient 4 activités interactives.`),
        gameHud(game),
        h('div', { class: 'row' },
          next ? h('a', { class: 'btn primary', href: `#/m/${next.moduleId}/s/${next.sessionIndex}/a/${next.index}` }, `▶ Continuer : M${next.moduleId} · S${next.sessionIndex} · ${next.title}`) : h('span', { class: 'pill done' }, '🏆 Parcours terminé'),
          h('a', { class: 'btn ghost', href: '#/progres' }, '📊 Mon progrès'))),
      h('div', { class: 'pro-kpis' },
        h('div', { class: 'kpi' }, h('b', null, fmt(t.best)), h('span', null, `pts / ${TOTAL_POINTS}`)),
        h('div', { class: 'kpi' }, h('b', null, `${t.done}/${t.n}`), h('span', null, 'activités')),
        h('div', { class: 'kpi' }, h('b', null, `${pct} %`), h('span', null, 'progression')),
        h('div', { class: 'kpi' }, h('b', null, `${t.sessionsDone}/30`), h('span', null, 'séances')))),
    h('section', { class: 'pro-map', 'data-reveal': '' },
      h('h2', { class: 'section-h' }, '🗺️ Carte des compétences'),
      h('p', { class: 'muted legend' }, MASTERY.slice(0, 4).map((x) => h('span', null, `${x.icon} ${x.label}`))),
      h('div', { class: 'pro-parts' }, parts))
  );
  revealIn(view);
  return view;
}

// ---------- INFORMATIQUE COLLÈGE : tableau de bord d'un niveau ----------
function levelScreen(n) {
  const L = getLevel(n);
  const p = store.active();
  const rec = recOf(p.id);
  const acts = levelActivities(L);
  const t = moduleStats({ sessions: L.modules.flatMap((m) => m.sessions) }, rec);
  const next = acts.find((a) => !rec(a.id)?.attempts.length);
  const game = computeGame(rec, p.id, colScope(L));
  const nSessions = L.modules.reduce((k, m) => k + Math.max(m.sessions.length, m.plan.length), 0);
  lanManager.setActivity('college' + n, `Informatique Collège ${L.code}`);

  const parts = L.modules.map((m) => {
    const ms = moduleStats(m, rec);
    const done = ms.n && ms.sessionsDone === m.plan.length && ms.best / ms.max >= 0.7;
    return h('section', { class: 'card pro-part tc-part ' + m.color },
      h('header', null,
        h('span', { class: 'pp-ico', 'aria-hidden': 'true' }, m.icon),
        h('div', null, h('h3', null, h('a', { href: `#/m/${m.id}` }, `Module ${m.rank} · ${m.title}`), arSub(m.ar)),
          h('small', { class: 'muted' }, `${m.unit} · ${m.comp} · ${m.hours} h · ${m.sessions.length ? `${ms.done}/${ms.n} activités · ${fmt(ms.best)}/${ms.max} pts` : 'en préparation'}`)),
        h('span', { class: 'pill ' + (done ? 'done' : ''), title: 'Termine toutes les séances avec au moins 70 %' }, done ? '🎓 Validé' : '🔒 À valider')),
      h('ol', { class: 'pp-nodes' },
        m.sessions.map((s) => {
          const lv = tcMastery(s, rec); const ss = sessionStats(s, rec);
          return h('li', null, h('a', { class: 'pp-node lv' + lv, href: `#/m/${m.id}/s/${s.index}`, title: `${MASTERY[lv].label} · ${STATUS[ss.status]} · ${fmt(ss.best)}/20` },
            h('span', { class: 'pp-n', 'aria-hidden': 'true' }, MASTERY[lv].icon),
            h('span', { class: 'pp-t' }, h('b', null, `S${s.index}`), ' ', s.title),
            h('small', null, `${fmt(ss.best)}/20`)));
        }),
        m.plan.slice(m.sessions.length).map((title, i) => h('li', null, h('span', { class: 'pp-node lv0 planned', title: 'Séance en préparation' },
          h('span', { class: 'pp-n', 'aria-hidden': 'true' }, '🔒'),
          h('span', { class: 'pp-t' }, h('b', null, `S${m.sessions.length + i + 1}`), ' ', title),
          h('small', null, 'À venir'))))));
  });

  const view = h('main', { id: 'main', class: 'pro-page tc-dash college-dash' },
    crumbs(['🏠', 'Accueil', '#/profils'], ['🏫', `Informatique Collège · ${L.code}`]),
    h('section', { class: 'pro-hero', 'data-reveal': '' },
      h('div', { class: 'pro-hero-main' },
        h('p', { class: 'eyebrow' }, `Collège · ${L.title} · ${L.modules.length} modules · programme officiel (1 h par semaine)`),
        h('h1', { tabindex: '-1' }, `${L.icon} Informatique — ${L.code}`, arSub(L.ar)),
        h('p', { class: 'pro-story' }, `Bonjour ${p.displayName} ! Les modules suivent l’ordre du programme. Chaque séance contient 4 activités interactives ; les séances marquées 🔒 sont en préparation.`),
        gameHud(game),
        h('div', { class: 'row' },
          next ? h('a', { class: 'btn primary', href: `#/m/${next.moduleId}/s/${next.sessionIndex}/a/${next.index}` }, `▶ Continuer : ${modLabel(next.moduleId)} · S${next.sessionIndex} · ${next.title}`) : acts.length ? h('span', { class: 'pill done' }, '🏆 Séances disponibles terminées') : null,
          h('a', { class: 'btn ghost', href: '#/progres' }, '📊 Mon progrès'))),
      h('div', { class: 'pro-kpis' },
        h('div', { class: 'kpi' }, h('b', null, fmt(t.best)), h('span', null, `pts / ${acts.length * 5}`)),
        h('div', { class: 'kpi' }, h('b', null, `${t.done}/${t.n}`), h('span', null, 'activités')),
        h('div', { class: 'kpi' }, h('b', null, `${L.modules.reduce((k, m) => k + m.sessions.length, 0)}/${nSessions}`), h('span', null, 'séances disponibles')),
        h('div', { class: 'kpi' }, h('b', null, `${t.sessionsDone}`), h('span', null, 'séances terminées')))),
    h('section', { class: 'pro-map', 'data-reveal': '' },
      h('h2', { class: 'section-h' }, '🗺️ Carte des compétences'),
      h('p', { class: 'muted legend' }, MASTERY.slice(0, 4).map((x) => h('span', null, `${x.icon} ${x.label}`))),
      h('div', { class: 'pro-parts' }, parts))
  );
  revealIn(view);
  return view;
}

function moduleScreen(mi) {
  const m = getModule(mi);
  if (!m) return notFound();
  const p = store.active();
  const rec = recOf(p.id);

  lanManager.setActivity('m' + mi, `${modLabel(mi)} : ${m.title}`);

  // Même organisation que le parcours M205 : héros + « Carte des compétences » (parties → séances).
  const ms = moduleStats(m, rec);
  const next = m.sessions.flatMap((s) => s.acts).find((a) => !rec(a.id)?.attempts.length);
  const groups = m.groups
    ? m.groups.map((g) => ({ label: g.label, sessions: g.sessions.map((k) => m.sessions[k - 1]) }))
    : [{ label: m.title, sessions: m.sessions }];

  const node = (s) => {
    const lv = tcMastery(s, rec);
    const ss = sessionStats(s, rec);
    return h('li', null, h('a', { class: 'pp-node lv' + lv, href: `#/m/${m.id}/s/${s.index}`, title: `${MASTERY[lv].label} · ${STATUS[ss.status]} · ${fmt(ss.best)}/20` },
      h('span', { class: 'pp-n', 'aria-hidden': 'true' }, MASTERY[lv].icon),
      h('span', { class: 'pp-t' }, h('b', null, `S${s.index}`), ' ', s.title, h('small', { class: 'muted pp-topics' }, s.topics.join(' · '))),
      h('small', null, `${fmt(ss.best)}/20`)));
  };

  const col = colMod(mi);
  // Ressources du programme pas encore jouables : affichées dans l'ordre officiel, verrouillées.
  const planned = (m.plan || []).slice(m.sessions.length).map((t, i) => h('li', null, h('span', { class: 'pp-node lv0 planned', title: 'Séance en préparation' },
    h('span', { class: 'pp-n', 'aria-hidden': 'true' }, '🔒'),
    h('span', { class: 'pp-t' }, h('b', null, `S${m.sessions.length + i + 1}`), ' ', t, h('small', { class: 'muted pp-topics' }, 'À venir')),
    h('small', null, '—'))));
  const parts = groups.map((g, gi) => {
    const gs = moduleStats({ sessions: g.sessions }, rec);
    const done = gs.n && gs.sessionsDone === g.sessions.length && gs.best / gs.max >= 0.7;
    return h('section', { class: 'card pro-part tc-part ' + m.color },
      h('header', null,
        h('span', { class: 'pp-ico', 'aria-hidden': 'true' }, m.icon),
        h('div', null, h('h3', null, g.label), h('small', { class: 'muted' }, `${gs.done}/${gs.n} activités · ${fmt(gs.best)}/${gs.max} pts`)),
        h('span', { class: 'pill ' + (done ? 'done' : ''), title: 'Termine toutes les séances avec au moins 70 %' }, done ? '🎓 Validée' : '🔒 À valider')),
      h('ol', { class: 'pp-nodes' }, g.sessions.map(node), gi === groups.length - 1 ? planned : null));
  });
  const backHref = col ? '#/college/' + col.level : '#/dash';
  const nPlan = Math.max(m.sessions.length, (m.plan || []).length);

  return h('main', { id: 'main', class: 'pro-page tc-module' },
    col ? crumbs(['🏠', 'Accueil', '#/profils'], ['🏫', col.levelCode, backHref], ['📚', 'Module ' + col.rank]) : crumbs(['🏠', 'Tableau de bord', '#/dash'], ['📚', 'Module ' + m.id]),
    h('section', { class: 'pro-hero', 'data-reveal': '' },
      h('div', { class: 'pro-hero-main' },
        h('p', { class: 'eyebrow' }, col ? `Informatique Collège · ${col.levelCode} · Module ${col.rank} · ${m.unit} · ${m.comp} · ${m.hours} h` : `Tronc commun · Module ${m.id} · ${m.sessions.length} séances`),
        h('h1', { tabindex: '-1' }, `${m.icon} ${m.title}`, arSub(col ? m.ar : arModule(m.id))),
        m.languageNote ? h('p', { class: 'notice' }, m.languageNote) : null,
        h('div', { class: 'row' },
          next ? h('a', { class: 'btn primary', href: `#/m/${m.id}/s/${next.sessionIndex}/a/${next.index}` }, `▶ Continuer : S${next.sessionIndex} · ${next.title}`) : m.sessions.length ? h('span', { class: 'pill done' }, '🏆 Module terminé') : h('span', { class: 'pill' }, '🛠️ Séances en préparation'),
          h('a', { class: 'btn ghost', href: backHref }, col ? `← ${col.levelCode}` : '← Tableau de bord'))),
      h('div', { class: 'pro-kpis' },
        h('div', { class: 'kpi' }, h('b', null, fmt(ms.best)), h('span', null, `pts / ${ms.max}`)),
        h('div', { class: 'kpi' }, h('b', null, `${ms.done}/${ms.n}`), h('span', null, 'activités')),
        h('div', { class: 'kpi' }, h('b', null, `${ms.pct || 0} %`), h('span', null, 'progression')),
        h('div', { class: 'kpi' }, h('b', null, `${ms.sessionsDone}/${nPlan}`), h('span', null, 'séances')))),
    h('section', { class: 'pro-map', 'data-reveal': '' },
      h('h2', { class: 'section-h' }, '🗺️ Carte des compétences'),
      h('p', { class: 'muted legend' }, MASTERY.slice(0, 4).map((x) => h('span', null, `${x.icon} ${x.label}`))),
      h('div', { class: 'pro-parts' }, parts))
  );
}

// Première illustration de l'activité, puis vignette dédiée et icône de la mécanique.
function activityArt(a) {
  const key = a.pics?.find(Boolean) || Object.keys(STUDENT_ILLUSTRATIONS).find((k) => k.startsWith((a.illus || a.id) + '-q'));
  const src = key ? STUDENT_ILLUSTRATIONS[key] : ACTIVITY_CARDS[a.id];
  if (!key && !src) return mechanicIcon(a.type);
  return h('img', { class: 'office-art tc-art', src, alt: '', 'aria-hidden': 'true', width: 112, height: 112, loading: 'lazy', decoding: 'async', draggable: 'false',
    onerror: (e) => e.currentTarget.replaceWith(mechanicIcon(a.type)) });
}

// Niveau de maîtrise d'une séance du Tronc Commun (mêmes seuils que le M205, sans la révision espacée).
function tcMastery(s, rec) {
  const st = sessionStats(s, rec);
  if (!st.done) return 0;
  const ratio = st.best / st.max;
  if (st.status !== 'done' || ratio < 0.6) return st.status === 'done' ? 2 : 1;
  return ratio < 0.8 ? 2 : 3;
}

function sessionScreen(mi, si) {
  const s = getSession(mi, si);
  if (!s) return notFound();
  const p = store.active();
  const rec = recOf(p.id);
  const st = sessionStats(s, rec);
  const next = s.acts.find((a) => !rec(a.id)?.attempts.length) || s.acts[0];

  lanManager.setActivity(`m${mi}-s${si}`, `Séance ${si} : ${s.title}`);

  return h('main', { id: 'main' },
    crumbs(homeStep(mi), ['📚', modLabel(mi), modHref(mi)], ['📖', 'Séance ' + si]),
    h('h1', { tabindex: '-1' }, `Séance ${si} — ${s.title}`, arSub(arSess(s))),
    s.situation ? h('section', { class: 'mission-brief', 'data-reveal': '' },
      h('span', { class: 'mb-ava', 'aria-hidden': 'true' }, s.situation.ico),
      h('div', null, h('p', { class: 'eyebrow' }, colMod(mi) ? 'Situation de départ' : 'Mission · situation professionnelle'), h('b', null, s.situation.who), h('p', null, s.situation.text))) : null,
    h('p', null, h('b', null, 'Notions : '), s.topics.join(', '), '.'),
    h('p', { class: 'muted' }, `4 activités interactives · environ ${s.acts.reduce((a, b) => a + b.estimatedMinutes, 0)} minutes · /20 points`),
    h('div', { class: 'grid g2' }, s.acts.map((a) => {
      const r = rec(a.id);
      const best = r?.attempts.length ? Math.max(...r.attempts.map((x) => x.score)) : null;
      return h('a', { class: 'card act-tile', href: `#/m/${mi}/s/${si}/a/${a.index}`, style: 'text-decoration:none;color:inherit', 'data-tilt': '', 'data-reveal': '' },
        mi === 205 ? officeArt(a.title, s.part) : activityArt(a),
        h('div', { class: 'row', style: 'justify-content:space-between' },
          h('span', { class: 'pill' }, `${a.index}. ${KIND[a.type]}`),
          best != null ? h('span', { class: 'pill done' }, `${fmt(best)}/5 ★`) : h('span', { class: 'pill' }, `~${a.estimatedMinutes} min`)
        ),
        h('h3', { style: 'margin-top:.5rem' }, a.title, arSub(arActivity(a.illus || a.id))),
        h('p', { class: 'muted', style: 'margin:0' }, a.objective)
      );
    })),
    h('div', { class: 'row', style: 'margin-top:1.2rem' },
      h('a', { class: 'btn primary', href: `#/m/${mi}/s/${si}/a/${next.index}` }, st.done ? '▶ Continuer la séance' : '▶ Commencer la séance'),
      st.done ? h('a', { class: 'btn', href: `#/m/${mi}/s/${si}/bilan` }, 'Voir le bilan') : null
    ),
    s.retenir && st.status === 'done' ? h('div', { class: 'card retenir' }, h('h2', null, '📌 À retenir'), h('p', null, s.retenir)) : null
  );
}

// ---------- ACTIVITÉ INTERACTIVE ----------
function activityScreen(mi, si, ai) {
  const act = getActivity(`m${mi}-s${si}-a${ai}`);
  if (!act) return notFound();
  const prof = store.active();
  const rec = recOf(prof.id);
  const s = getSession(mi, si);
  const m = getModule(mi);

  // Annonce l'activité sur le réseau local
  lanManager.setActivity(act.id, act.title);

  const stage = h('div', { class: `stage-card activity-${act.id}`, id: 'stage' });
  const out = h('div', { class: 'result-slot' });
  const hintBox = h('div', { class: 'hintbox', hidden: true }, '💡 ' + act.hint);
  const chrono = makeChrono();
  let eng = null, submitted = false;

  const checkBtn = h('button', { type: 'button', class: 'btn primary check-btn', onclick: submit, 'aria-keyshortcuts': 'Control+Enter' }, h('span', null, '✔ Vérifier'), h('kbd', { 'aria-hidden': 'true' }, 'Ctrl+⏎'));
  const hintBtn = h('button', {
    type: 'button',
    class: 'btn ghost',
    'aria-expanded': 'false',
    onclick: () => {
      hintBox.hidden = !hintBox.hidden;
      if (!hintBox.hidden) audio.play('hint');
      hintBtn.setAttribute('aria-expanded', String(!hintBox.hidden));
    },
    'aria-label': 'Indice',
  }, h('span', { 'aria-hidden': 'true' }, '💡'), h('span', { class: 'lbl' }, ' Indice'));

  const challengeBtn = h('button', {
    type: 'button',
    class: 'btn ghost small',
    onclick: async () => {
      await lanManager.createChallenge(act.id, act.title);
      toast('⚡ Défi réseau lancé ! Les autres élèves sur le réseau ont été notifiés.');
    },
    'aria-label': 'Défier la classe',
  }, h('span', { 'aria-hidden': 'true' }, '⚡'), h('span', { class: 'lbl' }, ' Défier la classe'));

  function mount() {
    stage.replaceChildren();
    stage.inert = false;
    out.replaceChildren();
    submitted = false;
    checkBtn.disabled = false;
    view.classList.remove('graded');
    eng = engineOf(act.mech)(stage, { ...act.data, illustrationActivityId: act.illus || act.id });
    chrono.start();
    if (window.__ip) window.__ip.eng = eng;
  }

  async function submit() {
    if (submitted || !eng) return;
    const res = eng.check();
    if (res.incomplete) { toast(res.incomplete); stage.classList.remove('shake'); void stage.offsetWidth; stage.classList.add('shake'); audio.play('wrong'); return; }
    if (res.unanswered > 0 && !(await confirmBox(`Il reste ${res.unanswered} réponse(s) vide(s). Vérifier quand même ?`, 'Vérifier'))) return;
    if (submitted) return;
    submitted = true;
    checkBtn.disabled = true;
    const elapsed = chrono.stop();

    const before = computeGame(rec, prof.id, scopeOf(mi, prof.id));
    const score = activityScore(res.correct, res.total);
    const n = store.recordAttempt(prof.id, act.id, score, act.version);
    eng.reveal && eng.reveal(res);
    stage.inert = true;
    view.classList.add('graded');

    // Mise à jour de la progression sur le réseau local (suivi et course)
    const progress = progressSnapshot(recOf(prof.id));
    lanManager.updateProfile({ score: progress.points, progress, lastResult: { id: act.id, title: act.title, score, at: Date.now() } });

    const nextHref = ai < 4 ? `#/m/${mi}/s/${si}/a/${ai + 1}` : `#/m/${mi}/s/${si}/bilan`;
    out.replaceChildren(presentResult({
      scope: scopeOf(mi, prof.id), store, prof, act, res, score, n, before, elapsedMs: elapsed, stage,
      next: { href: nextHref, label: ai < 4 ? 'Activité suivante →' : 'Bilan de la séance →' },
      onRetry: () => { mount(); stage.scrollIntoView({ block: 'start', behavior: 'smooth' }); },
      onPeak: (ratio) => { if (ratio === 1) celebrate(); },
    }));
    hud.replaceWith(hud = gameHud(computeGame(rec, prof.id, scopeOf(mi, prof.id)), { compact: true }));
  }

  const dots = h('nav', { class: 'dots', 'aria-label': 'Activités de la séance' }, s.acts.map((a) => h('a', {
    href: `#/m/${mi}/s/${si}/a/${a.index}`,
    class: (a.index === ai ? 'cur ' : '') + (rec(a.id)?.attempts.length ? 'done' : ''),
    'aria-label': `Activité ${a.index} : ${a.title}`,
    'aria-current': a.index === ai ? 'step' : null,
  }, a.index)));

  let hud = gameHud(computeGame(rec, prof.id, scopeOf(mi, prof.id)), { compact: true });
  const bestT = bestTime(prof.id, act.id);
  const view = h('main', { id: 'main', class: `activity-page ${m.color}` },
    crumbs(homeStep(mi), ['📚', modLabel(mi), modHref(mi)], ['📖', 'Séance ' + si, `#/m/${mi}/s/${si}`], ['🎯', 'Activité ' + ai]),
    h('header', { class: 'act-hero', 'data-reveal': '' },
      h('div', { class: 'act-hero-main' },
        h('span', { class: 'act-kind' }, `${m.icon} ${act.mech === 'sim:ribbon' ? 'Simulateur' : KIND[act.type]} · ${modLabel(mi)} · Séance ${si}`),
        h('h1', { tabindex: '-1' }, act.title, arSub(arActivity(act.illus || act.id))),
        h('p', { class: 'act-obj' }, h('b', null, 'Objectif : '), act.objective)),
      h('div', { class: 'act-hero-side' }, dots, h('div', { class: 'act-meta' }, chrono.el, bestT != null ? h('span', { class: 'chrono best', title: 'Ton meilleur temps' }, '🏆 ' + fmtTime(bestT)) : null, h('span', { class: 'chip-meta' }, `~${act.estimatedMinutes} min · /5`)), hud)),
    h('div', { class: 'instr activity-brief', 'data-reveal': '' },
      h('b', null, 'Consigne : '), act.instructions,
      arHint(arInstruction(act.type))
    ),
    mi === 205 ? activityVisual(act, s) : null,
    hintBox,
    stage,
    h('div', { class: 'row activity-actions' }, checkBtn, hintBtn, challengeBtn),
    out,
    mi === 205 ? visualPractice(act, s) : null
  );
  view.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); submit(); } });

  mount();
  revealIn(view);
  return view;
}

// ---------- BILAN DE SÉANCE ----------
function summaryScreen(mi, si) {
  const s = getSession(mi, si);
  if (!s) return notFound();
  const p = store.active();
  const rec = recOf(p.id);
  const st = sessionStats(s, rec);
  const b = band(st.best);
  const bf = band(st.first);
  const weak = s.acts.filter((a) => {
    const r = rec(a.id);
    return !r?.attempts.length || Math.max(...r.attempts.map((x) => x.score)) < 3;
  });
  const nextS = getSession(mi, si + 1);

  return h('main', { id: 'main' },
    crumbs(homeStep(mi), ['📚', modLabel(mi), modHref(mi)], ['📊', 'Bilan de la séance ' + si]),
    h('h1', { tabindex: '-1' }, `Bilan — Séance ${si} : ${s.title}`),
    h('p', { class: 'muted' }, `Élève : ${p.displayName}${p.className ? ' · ' + p.className : ''} · ${frDate(new Date().toISOString())}`),
    h('div', { class: 'card row', style: 'justify-content:space-around' },
      h('div', { class: 'score' }, fmt(st.best), h('small', null, ' / 20'), h('div', { class: 'muted', style: 'font-size:1rem' }, 'Meilleurs résultats')),
      h('div', { class: 'score' }, fmt(st.first), h('small', null, ' / 20'), h('div', { class: 'muted', style: 'font-size:1rem' }, 'Premiers essais')),
      h('div', null,
        h('span', { class: 'pill ' + (b.tone === 'top' || b.tone === 'good' ? 'done' : 'doing'), style: 'font-size:1.1rem' }, b.label),
        h('p', { class: 'muted', style: 'margin:.3rem 0 0' }, `Au premier essai : ${bf.label}`)
      )
    ),
    h('div', { class: 'card', style: 'margin-top:1rem;overflow:auto' },
      h('table', { class: 't' },
        h('thead', null, h('tr', null, ['Activité', 'Premier essai', 'Meilleur', 'Essais'].map((x) => h('th', null, x)))),
        h('tbody', null, s.acts.map((a) => {
          const r = rec(a.id)?.attempts || [];
          return h('tr', null,
            h('td', null, link(`#/m/${mi}/s/${si}/a/${a.index}`, `${a.index}. ${a.title}`)),
            h('td', null, r.length ? fmt(r[0].score) + '/5' : '—'),
            h('td', null, r.length ? fmt(Math.max(...r.map((x) => x.score))) + '/5' : '—'),
            h('td', null, r.length || 0)
          );
        }))
      )
    ),
    h('div', { class: 'card', style: 'margin-top:1rem' },
      h('h2', null, weak.length ? 'À revoir' : 'Bravo !'),
      weak.length ? h('ul', null, weak.map((a) => h('li', null, h('b', null, a.title), ' — ', a.objective, ' ', link(`#/m/${mi}/s/${si}/a/${a.index}`, 'Refaire')))) : h('p', null, 'Toutes les activités de cette séance sont bien maîtrisées (au moins 3/5).')
    ),
    h('div', { class: 'row noprint', style: 'margin-top:1rem' },
      nextS ? h('a', { class: 'btn primary', href: `#/m/${mi}/s/${si + 1}` }, 'Séance suivante →') : h('a', { class: 'btn primary', href: `#/m/${mi}` }, 'Retour au module'),
      h('button', { type: 'button', class: 'btn', onclick: () => window.print() }, '🖨 Imprimer le bilan')
    )
  );
}

// ---------- PROGRESSION ----------
function progressScreen() {
  const p = store.active();
  const rec = recOf(p.id);

  return h('main', { id: 'main' },
    h('h1', { tabindex: '-1' }, 'Mon progrès'),
    h('p', { class: 'muted' }, 'Les points d’une séance sont sur 20 : « Premier » = premiers essais, « Meilleur » = meilleurs essais.'),
    [...CATALOG, PRO, ...LEVELS.flatMap((L) => L.modules.filter((x) => x.sessions.length))].map((m) => {
      const ms = moduleStats(m, rec);
      return h('section', { class: 'card', style: 'margin-bottom:1rem;overflow:auto' },
        h('h2', null, `${m.icon} ${colMod(m.id) ? modLabel(m.id) : 'Module ' + m.id} — ${m.title}`),
        h('p', { class: 'muted' }, `${fmt(ms.best)} / ${ms.max} points · ${ms.done}/${ms.n} activités`),
        bar(ms.pct, `Module ${m.id}`),
        h('table', { class: 't' },
          h('thead', null, h('tr', null, ['Séance', 'Statut', 'Premier', 'Meilleur', 'Essais', 'Dernier essai'].map((x) => h('th', null, x)))),
          h('tbody', null, m.sessions.map((s) => {
            const st = sessionStats(s, rec);
            const last = s.acts.flatMap((a) => rec(a.id)?.attempts || []).map((x) => x.completedAt).sort().pop();
            return h('tr', null,
              h('td', null, link(`#/m/${m.id}/s/${s.index}`, `${s.index}. ${s.title}`)),
              h('td', null, h('span', { class: 'pill ' + st.status }, STATUS[st.status])),
              h('td', null, fmt(st.first) + '/20'),
              h('td', null, fmt(st.best) + '/20'),
              h('td', null, st.tries),
              h('td', null, last ? frDate(last) : '—')
            );
          }))
        )
      );
    })
  );
}

// ---------- DONNÉES & ESPACE ENSEIGNANT ----------
function dataScreen() {
  const p = store.active();
  const msg = h('p', { class: 'hint-line', role: 'status', 'aria-live': 'polite' });
  let nm, cl;
  const exp = (ids, name) => downloadText(name, store.exportJSON(ids));
  const file = h('input', {
    type: 'file',
    accept: '.json,application/json',
    multiple: true,
    id: 'imp',
    'aria-label': 'Choisir des fichiers de sauvegarde',
    onchange: async (e) => {
      const out = [];
      for (const f of e.target.files) {
        if (f.size > MAX_IMPORT_BYTES) { out.push(`${f.name} : fichier trop volumineux.`); continue; }
        const r = store.importJSON(await f.text());
        out.push(r.ok ? `${f.name} : ${r.profilesAdded} profil(s) ajouté(s), ${r.profilesMerged} fusionné(s).` : `${f.name} : ${r.error}`);
      }
      msg.textContent = out.join(' ');
      e.target.value = '';
      setTimeout(render, 50);
    },
  });

  const prefs = p ? h('div', { class: 'card' },
    h('h2', null, 'Mon profil'),
    h('form', {
      onsubmit: (e) => {
        e.preventDefault();
        try {
          store.updateProfile(p.id, { displayName: nm.value, className: cl.value });
          lanManager.updateProfile({ displayName: nm.value, className: cl.value });
          toast('Profil enregistré.');
          render();
        } catch (x) {
          msg.textContent = x.message;
        }
      },
    },
    h('label', { class: 'f' }, 'Prénom ou pseudo ', nm = h('input', { type: 'text', maxlength: '24', value: p.displayName })),
    h('label', { class: 'f' }, 'Classe ', cl = h('input', { type: 'text', maxlength: '12', value: p.className })),
    h('button', { class: 'btn small', type: 'submit' }, 'Enregistrer')
    ),
    h('h3', { style: 'margin-top:1rem' }, 'Confort de lecture'),
    ...[['reducedMotion', 'Réduire les animations'], ['largeText', 'Texte plus grand'], ['highContrast', 'Contraste renforcé']].map(([k, l]) =>
      h('label', { class: 'sw' },
        h('input', {
          type: 'checkbox',
          checked: !!p.preferences[k],
          onchange: (e) => {
            store.updateProfile(p.id, { preferences: { [k]: e.target.checked } });
            applyPrefs(store.active());
          },
        }),
        h('span', null, l)
      )
    ),
    h('h3', { style: 'margin-top:1rem' }, 'Sons'),
    h('label', { class: 'sw' },
      h('input', {
        type: 'checkbox',
        checked: !!p.preferences.soundEnabled,
        onchange: (e) => {
          store.updateProfile(p.id, { preferences: { soundEnabled: e.target.checked } });
          applyPrefs(store.active());
          render();
        },
      }),
      h('span', null, 'Activer les sons de l’interface et des résultats')
    )
  ) : null;

  const all = { sessions: CATALOG.flatMap((m) => m.sessions) };
  const teacher = h('details', { class: 'card', style: 'margin-top:1rem' },
    h('summary', null, h('b', null, 'Espace enseignant (local)')),
    h('p', { class: 'muted' }, 'Les résultats restent sur cet ordinateur : l’enseignant peut exporter ou importer des sauvegardes de classe.'),
    store.profiles().length ? h('div', { style: 'overflow:auto' },
      h('table', { class: 't' },
        h('thead', null, h('tr', null, ['Élève', 'Classe', 'Module 1', 'Module 2', 'Module 3', 'Module 4', 'Total'].map((x) => h('th', null, x)))),
        h('tbody', null, store.profiles().map((q) => {
          const r = recOf(q.id);
          return h('tr', null,
            h('td', null, q.displayName),
            h('td', null, q.className || '—'),
            CATALOG.map((m) => h('td', null, fmt(moduleStats(m, r).best) + '/' + m.sessions.length * 20)),
            h('td', null, h('b', null, fmt(moduleStats(all, r).best) + '/' + TOTAL_POINTS))
          );
        }))
      )
    ) : h('p', null, 'Aucun profil sur cet ordinateur.'),
    h('div', { class: 'row', style: 'margin-top:.6rem' },
      h('button', { type: 'button', class: 'btn small', onclick: () => downloadText('infoplay-resultats.csv', store.csv([...ACTIVITIES, ...PRO_ACTIVITIES, ...COLLEGE_ACTIVITIES]), 'text/csv') }, '⬇ Exporter les résultats (CSV)'),
      h('button', { type: 'button', class: 'btn small', onclick: () => exp(null, 'infoplay-classe.json') }, '⬇ Exporter tous les profils (JSON)')
    )
  );

  return h('main', { id: 'main' },
    h('h1', { tabindex: '-1' }, 'Profil et données'),
    h('div', { class: 'grid g2' },
      prefs,
      h('div', { class: 'card' },
        h('h2', null, 'Sauvegarde'),
        h('p', { class: 'muted' }, 'Exporte ton profil pour le réutiliser sur un autre ordinateur de la classe.'),
        h('div', { class: 'row' },
          p ? h('button', { type: 'button', class: 'btn primary', onclick: () => exp([p.id], `infoplay-${p.displayName.replace(/[^\w-]+/g, '_')}.json`) }, '⬇ Exporter mon profil') : null,
          h('button', { type: 'button', class: 'btn', onclick: () => exp(null, 'infoplay-sauvegarde.json') }, '⬇ Tout exporter')
        ),
        h('label', { class: 'f', for: 'imp' }, '⬆ Importer une sauvegarde (.json)'),
        file,
        msg,
        h('hr'),
        h('h3', null, 'Zone dangereuse'),
        p ? h('button', {
          type: 'button',
          class: 'btn danger small',
          onclick: async () => {
            if (await confirmBox(`Supprimer le profil « ${p.displayName} » ?`, 'Supprimer', true)) {
              store.deleteProfile(p.id);
              go('#/profils');
            }
          },
        }, 'Supprimer mon profil') : null
      )
    ),
    teacher,
    h('p', { class: 'muted', style: 'margin-top:1rem' }, 'InfoPlay Maroc fonctionne hors ligne. Créateur de la plateforme : ياسين بوليالي (Yacine BOULYALI).')
  );
}

function notFound() {
  return h('main', { id: 'main' },
    h('h1', { tabindex: '-1' }, 'Page introuvable'),
    h('p', null, 'Cette page n’existe pas.'),
    link('#/profils', 'Retour à l’accueil')
  );
}

function errorScreen(e) {
  console.error(e);
  return h('main', { id: 'main' },
    h('div', { class: 'card errbox' },
      h('h1', { tabindex: '-1' }, 'Oups, un problème est survenu'),
      h('p', null, 'Tes résultats enregistrés ne sont pas perdus.'),
      h('div', { class: 'row' },
        h('button', { class: 'btn primary', onclick: () => location.reload() }, 'Recharger'),
        h('a', { class: 'btn', href: '#/profils' }, 'Accueil')
      ),
      h('pre', { class: 'code' }, String(e && e.message))
    )
  );
}

// ---------- ROUTEUR ----------
let live = null; // page réseau mise à jour en direct (course ou suivi)
function render() {
  let view;
  try {
    const prof = store.active();
    applyPrefs(prof);
    const q = location.hash.replace(/^#\/?/, '').replace(/\?.*$/, '').split('/').filter(Boolean);

    // Présence sur le réseau local : un élève (avec sa progression) ou un simple observateur (ex. l'enseignant).
    live = null;
    lanManager.setIdentity(prof ? prof.id : null);
    if (prof) {
      const progress = progressSnapshot(recOf(prof.id));
      lanManager.start({ role: 'student', displayName: prof.displayName, className: prof.className, avatar: avatarFor(prof.displayName), score: progress.points, progress });
    } else {
      lanManager.start({ role: 'observer', displayName: 'Observateur', className: '', score: 0, progress: null, lastResult: null, currentActivityTitle: 'Observe la classe' });
    }

    if (!q.length || q[0] === 'profils' || q[0] === 'accueil') {
      // PAGE 1 OBLIGATOIRE : Accueil InfoPlay & Créateur Yacine BOULYALI uniquement !
      view = homeScreen();
    } else if (q[0] === 'multijoueur' || q[0] === 'salon') {
      view = multiplayerScreen();
    } else if (q[0] === 'course' || q[0] === 'suivi') {
      if (prof) lanManager.setActivity(q[0], q[0] === 'course' ? 'Regarde la course' : 'Suivi de la classe');
      live = q[0] === 'course' ? raceScreen() : monitorScreen();
      view = live.view;
    } else if (q[0] === 'donnees') {
      view = dataScreen();
    } else if (q[0] === 'dash') {
      view = prof ? dashScreen() : homeScreen();
    } else if (q[0] === 'progres') {
      view = prof ? progressScreen() : homeScreen();
    } else if (q[0] === 'egtsi106') {
      view = egtsiScreen(q, prof?.id);
    } else if (q[0] === 'college' && getLevel(q[1])) {
      view = prof ? levelScreen(+q[1]) : homeScreen();
    } else if (q[0] === 'pro') {
      const ctx = prof ? { prof, rec: recOf(prof.id) } : null;
      if (prof) lanManager.setActivity('pro', 'M205 Bureautique avancée');
      view = !prof ? homeScreen() : q[1] === 'revision' ? reviewScreen(ctx) : q[1] === 'defi' ? defiScreen(ctx) : proHub(ctx);
    } else if (q[0] === 'm' && isPro(q[1]) && !q[2]) {
      view = prof ? proHub({ prof, rec: recOf(prof.id) }) : homeScreen();
    } else if (q[0] === 'm' && (/^[1-4]$/.test(q[1] || '') || isPro(q[1]) || colMod(q[1]))) {
      if (!prof) view = homeScreen();
      else if (!q[2]) view = moduleScreen(+q[1]);
      else if (q[2] === 's' && /^\d+$/.test(q[3] || '')) {
        if (!q[4]) view = sessionScreen(+q[1], +q[3]);
        else if (q[4] === 'bilan') view = summaryScreen(+q[1], +q[3]);
        else if (q[4] === 'a' && /^[1-4]$/.test(q[5] || '')) view = activityScreen(+q[1], +q[3], +q[5]);
      }
    }

    view = view || notFound();
    revealIn(view);
    app.replaceChildren(header(prof), view, floatingHome(prof));
  } catch (e) {
    app.replaceChildren(header(null), errorScreen(e));
  }

  window.scrollTo(0, 0);
  const t = app.querySelector('h1');
  if (t) t.focus({ preventScroll: true });
}

window.addEventListener('hashchange', render);
installInterfaceSounds(document);
installInteractions(document);
autoHideHeader();
window.addEventListener('hashchange', () => document.body.classList.remove('nav-open', 'hdr-hidden'));
// Le menu « Plus » se referme au clic ailleurs ou avec Échap.
const closeMore = () => document.querySelectorAll('.nav-more.open').forEach((n) => { n.classList.remove('open'); n.querySelector('.nav-more-btn')?.setAttribute('aria-expanded', 'false'); });
document.addEventListener('click', (e) => { if (!e.target.closest?.('.nav-more-btn')) closeMore(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMore(); });
suggestFullscreen();
window.addEventListener('error', () => toast('Une erreur est survenue. Recharge la page si besoin.'));

// Rafraîchit les pages réseau en direct quand les élèves changent.
// La course et le suivi se mettent à jour sur place (animations conservées) ; le salon n'est
// redessiné que si son contenu change réellement et jamais pendant la saisie d'un message.
let salonSig = '';
lanManager.subscribe((st) => {
  trackRace(st, (who) => { if (st.race && !st.race.ended) { audio.play('overtaken'); toast(`🏁 ${who} vient de te dépasser ! À toi de jouer.`); } },
    (kind) => { if (kind === 'race-start' || kind === 'overtake' || (kind === 'join' && live)) audio.play(kind); });
  const cur = location.hash.split('/')[1] || '';
  if (live && (cur === 'course' || cur === 'suivi')) { live.update(st); return; }
  if (cur === 'multijoueur' || cur === 'salon') {
    const sig = JSON.stringify([st.players.map((p) => [p.peerId, p.score, p.activity]), st.messages.length, st.challenges.length]);
    if (sig === salonSig) return; salonSig = sig;
    const typing = document.activeElement && document.activeElement.matches('input,textarea,select');
    if (!typing) { const y = window.scrollY; render(); window.scrollTo(0, y); }
  }
});

if (/[?&]test=1/.test(location.search)) window.__ip = { store, CATALOG, ACTIVITIES, COLLEGE_ACTIVITIES, engineOf, lanManager };
render();
