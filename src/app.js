import { h, downloadText, frDate, celebrate } from './utils/dom.js';
import { createStore, localAdapter, MAX_IMPORT_BYTES } from './storage/store.js';
import { CATALOG, ACTIVITIES, getActivity, getModule, getSession, isActivityId, TOTAL_POINTS } from './data/index.js';
import { engineOf } from './games/index.js';
import { activityScore, band, sessionStats, moduleStats, fmt, MAX } from './scoring/scoring.js';
import { audio, installInterfaceSounds } from './audio/audio.js';
import { arModule, arSession, arActivity, arInstruction } from './i18n/ar.js';
import { lanManager } from './multiplayer/lan.js';
import { raceScreen, monitorScreen, progressSnapshot, trackRace, avatarFor } from './multiplayer/screens.js';
import { computeGame, bestTime, fmtTime, BADGES } from './fx/game.js';
import { gameHud } from './fx/popup.js';
import { presentResult, makeChrono } from './fx/flow.js';
import { installInteractions, revealIn } from './fx/interact.js';

const store = createStore(localAdapter(), isActivityId);
const app = document.getElementById('app');
const KIND = { match: 'Associer', sort: 'Classer', order: 'Ordonner', fill: 'Compléter', quiz: 'Questions', hot: 'Repérer', asm: 'Assembler', net: 'Relier', robot: 'Robot', prog: 'Algorithme', sim: 'Simulation' };
const recOf = (pid) => (id) => store.record(pid, id);
const go = (p) => { location.hash = p; };
const link = (href, ...kids) => h('a', { href }, ...kids);
const STATUS = { todo: 'Pas commencée', doing: 'En cours', done: 'Terminée' };
const arSub = (text) => text ? h('small', { class: 'ar-sub', lang: 'ar', dir: 'rtl' }, text) : null;

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

// ---------- En-tête principal ----------
function header(prof) {
  const cur = location.hash.split('/')[1] || '';
  const a = (href, label, key) => h('a', { href, 'aria-current': cur === key ? 'page' : null }, label);
  const lanState = lanManager.getState();
  const lanPill = h('a', {
    href: '#/multijoueur',
    class: 'lan-badge',
    title: 'Salon multijoueur sur réseau local',
  },
  h('span', { class: 'lan-pulse-dot' }),
  h('span', null, `Réseau local (${lanState.playerCount})`)
  );

  return h('header', { class: 'top' },
    h('div', { class: 'in' },
      h('a', { class: 'brand', href: '#/profils' },
        h('span', { class: 'logo', 'aria-hidden': 'true' }, '🎮'),
        h('span', null, 'InfoPlay ', h('b', null, 'Maroc'))
      ),
      lanPill,
      prof ? h('nav', { class: 'main', 'aria-label': 'Navigation principale' },
        a('#/dash', 'Tableau de bord', 'dash'),
        a('#/progres', 'Mon progrès', 'progres'),
        a('#/multijoueur', 'Multijoueur LAN', 'multijoueur'),
        a('#/course', '🏁 Course', 'course'),
        a('#/suivi', '👀 Suivi', 'suivi'),
        a('#/donnees', 'Profil et données', 'donnees'),
        soundButton(prof),
        h('span', { class: 'who' }, '👤 ' + prof.displayName),
        h('button', { type: 'button', onclick: () => { store.logout(); go('#/profils'); } }, 'Changer')
      ) : h('nav', { class: 'main' },
        a('#/multijoueur', 'Salon Multijoueur', 'multijoueur'),
        a('#/course', '🏁 Course', 'course'),
        a('#/suivi', '👀 Suivi enseignant', 'suivi'),
        a('#/donnees', 'Données', 'donnees')
      )
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
        go('#/dash');
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
          go('#/dash');
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
    class: 'welcome-entry-box',
    id: 'entry-zone',
    'aria-label': 'Connexion à InfoPlay Maroc',
  },
  h('div', { class: 'entry-inner' },
    h('div', { class: 'entry-header' },
      h('span', { class: 'entry-badge' }, '🎮 Accès Direct & Autonome'),
      h('h2', null, 'Espace Joueur · Connexion'),
      h('p', { class: 'muted' }, 'Aucun mot de passe requis. Tes scores, étoiles et progrès restent enregistrés en local sur cet ordinateur.')
    ),
    form,
    list
  )
  );

  const enterSoloBtn = h('button', {
    type: 'button',
    class: 'btn primary',
    onclick: () => {
      const el = document.getElementById('entry-zone');
      if (el) {
        el.scrollIntoView({ block: 'start', behavior: 'smooth' });
        setTimeout(() => name.focus({ preventScroll: true }), 250);
      }
    },
  }, '🎮 Entrer et Jouer (Solo) →');

  const enterLanBtn = h('button', {
    type: 'button',
    class: 'btn accent',
    onclick: () => go('#/multijoueur'),
  }, '🌐 Salon Multijoueur LAN →');

  const enterRaceBtn = h('a', {
    class: 'btn ghost',
    href: '#/course',
  }, '🏁 Course en Direct');

  const enterDataBtn = h('a', {
    class: 'btn ghost',
    href: '#/donnees',
  }, '📊 Données & Enseignant');

  // Métriques Clés
  const metricsRibbon = h('div', { class: 'metrics-ribbon' },
    h('div', { class: 'metric-card' },
      h('span', { class: 'metric-icon', 'aria-hidden': 'true' }, '📚'),
      h('div', { class: 'metric-val' }, '4 Modules'),
      h('div', { class: 'metric-desc' }, 'Système, Bureau, Réseaux, Code')
    ),
    h('div', { class: 'metric-card' },
      h('span', { class: 'metric-icon', 'aria-hidden': 'true' }, '🎯'),
      h('div', { class: 'metric-val' }, '120 Activités'),
      h('div', { class: 'metric-desc' }, '100% interactives & immersives')
    ),
    h('div', { class: 'metric-card' },
      h('span', { class: 'metric-icon', 'aria-hidden': 'true' }, '🌐'),
      h('div', { class: 'metric-val' }, 'Multijoueur LAN'),
      h('div', { class: 'metric-desc' }, 'Course et défis sans Internet')
    ),
    h('div', { class: 'metric-card' },
      h('span', { class: 'metric-icon', 'aria-hidden': 'true' }, '⭐'),
      h('div', { class: 'metric-val' }, '600 Points'),
      h('div', { class: 'metric-desc' }, 'Étoiles d’excellence & médailles')
    )
  );

  // 4 Mécaniques Interactives mises en avant
  const mechanicsSection = h('section', { class: 'mechanics-section', 'aria-label': 'Mécaniques interactives' },
    h('div', { class: 'section-heading' },
      h('span', { class: 'section-tag' }, '🕹️ Interactions Riches'),
      h('h2', null, 'Des activités immersives pour apprendre par l’action'),
      h('p', { class: 'muted' }, 'Conçues selon les principes de la pédagogie active : manipuler, expérimenter et déduire.')
    ),
    h('div', { class: 'mechanics-grid' },
      h('div', { class: 'mech-card' },
        h('div', { class: 'mech-icon-box' }, '🎯'),
        h('h3', null, 'Cliquer-Déposer & Drag and Drop'),
        h('p', null, 'Classe les éléments dans les bons bacs, associe les notions par paires et ordonne les étapes chronologiques d’un simple glissement ou clic.'),
        h('div', { class: 'mech-badge' }, 'Tactile & Souris')
      ),
      h('div', { class: 'mech-card' },
        h('div', { class: 'mech-icon-box' }, '🖥️'),
        h('h3', null, 'Simulations Réalistes & Bureau'),
        h('p', null, 'Explore une interface fidèle du bureau Windows avec ses icônes, fenêtres actives, menu Démarrer, composants matériels et câbles réseau.'),
        h('div', { class: 'mech-badge' }, 'Haute Fidélité')
      ),
      h('div', { class: 'mech-card' },
        h('div', { class: 'mech-icon-box' }, '❓'),
        h('h3', null, 'Bonne Réponse, L’Intrus & Vrai/Faux'),
        h('p', null, 'Trouve la réponse exacte, détecte la fausse réponse (l’intrus) ou relève le défi Vrai ou Faux (صحيح أم خطأ) avec validation sonore instantanée.'),
        h('div', { class: 'mech-badge' }, 'صحيح أم خطأ')
      ),
      h('div', { class: 'mech-card' },
        h('div', { class: 'mech-icon-box' }, '🌐'),
        h('h3', null, 'Jeu Collectif en Réseau Local (LAN)'),
        h('p', null, 'Découvre automatiquement les camarades connectés sur le même réseau dans la salle d’informatique, dispute des courses en direct sans Internet !'),
        h('div', { class: 'mech-badge' }, 'Zéro Internet requis')
      )
    )
  );

  // Aperçu du Programme en 4 Modules
  const modulesPreview = h('section', { class: 'curriculum-preview', 'aria-label': 'Programme des modules' },
    h('div', { class: 'section-heading' },
      h('span', { class: 'section-tag' }, '📚 Parcours Pédagogique'),
      h('h2', null, '30 Séances réparties en 4 Grands Modules'),
      h('p', { class: 'muted' }, 'Un programme complet et progressif de l’ordinateur jusqu’au code.')
    ),
    h('div', { class: 'modules-grid' },
      h('div', { class: 'module-preview-card mod-c1' },
        h('div', { class: 'mod-head' },
          h('span', { class: 'mod-num' }, 'Module 1'),
          h('span', { class: 'mod-count' }, '6 séances · 24 activités')
        ),
        h('h3', null, '🖥️ Ordinateur & Système d’exploitation'),
        h('p', null, 'Périphériques, unité centrale, composants internes, fonctions du système et gestion des fenêtres.')
      ),
      h('div', { class: 'module-preview-card mod-c2' },
        h('div', { class: 'mod-head' },
          h('span', { class: 'mod-num' }, 'Module 2'),
          h('span', { class: 'mod-count' }, '11 séances · 44 activités')
        ),
        h('h3', null, '📝 Bureautique & Documents Numériques'),
        h('p', null, 'Traitement de texte, mise en page, insertion d’images, tableur, formules de calcul et graphiques statistiques.')
      ),
      h('div', { class: 'module-preview-card mod-c3' },
        h('div', { class: 'mod-head' },
          h('span', { class: 'mod-num' }, 'Module 3'),
          h('span', { class: 'mod-count' }, '8 séances · 32 activités')
        ),
        h('h3', null, '🌐 Réseaux Informatiques & Internet'),
        h('p', null, 'Architecture d’un réseau local (LAN), équipements, navigation web sécurisée, courrier électronique et cybercitoyenneté.')
      ),
      h('div', { class: 'module-preview-card mod-c4' },
        h('div', { class: 'mod-head' },
          h('span', { class: 'mod-num' }, 'Module 4'),
          h('span', { class: 'mod-count' }, '7 séances · 28 activités')
        ),
        h('h3', null, '🤖 Algorithmique & Programmation'),
        h('p', null, 'Notion d’algorithme, variables, tests conditionnels, boucles, programmation par blocs et pilotage de robot.')
      )
    )
  );

  return h('main', { id: 'main', class: 'welcome-page' },
    h('section', { class: 'welcome-hero' },
      h('div', { class: 'welcome-copy' },
        // Badge officiel Créateur Yacine BOULYALI
        h('div', { class: 'creator-pill' },
          h('span', { class: 'creator-star', 'aria-hidden': 'true' }, '✨'),
          h('span', { class: 'creator-latin' }, 'Conçu et développé par ', h('b', null, 'Yacine BOULYALI')),
          h('span', { class: 'creator-sep' }, '·'),
          h('span', { class: 'creator-ar', lang: 'ar', dir: 'rtl' }, 'منشئ ومطور المنصة: ', h('b', null, 'ياسين بوليالي'))
        ),
        // Titre principal
        h('h1', { tabindex: '-1' },
          h('span', { class: 'hero-title-top' }, 'Plateforme Éducative d’Informatique'),
          'InfoPlay ', h('b', { class: 'hero-brand-gold' }, 'Maroc')
        ),
        // Description bilingue
        h('p', { class: 'welcome-lead-ar', lang: 'ar', dir: 'rtl' },
          'المنصة التعليمية التفاعلية الأولى بالمغرب لتعلم المعلوميات والبرمجة والشبكات عبر 120 نشاطاً تفاعلياً غامراً، مع إمكانية اللعب الجماعي داخل نفس الشبكة المحلية.'
        ),
        h('p', { class: 'welcome-lead-fr' },
          'Apprends l’informatique en t’amusant : 30 séances, 120 activités immersives (cliquer-déposer, glisser-déposer, simulations réelles, trouver la bonne ou la fausse réponse, vrai ou faux) et jeu multijoueur sur réseau local.'
        ),
        // Choix de mode de jeu
        h('div', { class: 'mode-choice', role: 'group', 'aria-label': 'Choisis ta façon de jouer' },
          h('section', { class: 'mode-card mode-classic', 'aria-labelledby': 'mode-classic-h' },
            h('span', { class: 'mode-ico', 'aria-hidden': 'true' }, '📚'),
            h('h2', { id: 'mode-classic-h' }, 'InfoPlay Classique'),
            h('p', null, 'Toutes les activités dans une interface claire et rapide, en solo ou en multijoueur sur le réseau local de la classe.'),
            h('p', { class: 'mode-ar', lang: 'ar', dir: 'rtl' }, 'الواجهة الكلاسيكية: تدريب فردي أو تحدي جماعي'),
            h('div', { class: 'welcome-cta-group' }, enterSoloBtn, enterLanBtn, enterRaceBtn, enterDataBtn)
          ),
          h('section', { class: 'mode-card mode-immersive', 'aria-labelledby': 'mode-3d-h' },
            h('span', { class: 'mode-badge' }, 'Nouveau · 3D'),
            h('span', { class: 'mode-ico', 'aria-hidden': 'true' }, '🏝️'),
            h('h2', { id: 'mode-3d-h' }, 'InfoPlay Immersif 3D'),
            h('p', null, 'Explore un monde en 3D : quatre îles thématiques, un portail pour chaque séance et un robot à programmer en volume.'),
            h('p', { class: 'mode-ar', lang: 'ar', dir: 'rtl' }, 'عالم ثلاثي الأبعاد: جزر وبوابات وروبوت تفاعلي'),
            h('a', { class: 'btn accent mode-go', href: 'immersive.html' }, '🥽 Entrer dans le monde 3D →')
          )
        )
      ),
      // Carte Portrait de Yacine BOULYALI
      h('figure', { class: 'portrait-frame' },
        h('div', { class: 'portrait-img-wrap' },
          h('img', {
            src: 'images/yacine-sebouali-profile.jpg',
            alt: 'Portrait de Yacine BOULYALI, créateur et développeur de la plateforme InfoPlay Maroc',
            width: '400',
            height: '400',
          }),
          h('div', { class: 'portrait-badge' }, '⭐ Concepteur & Développeur')
        ),
        h('figcaption', null,
          h('div', { class: 'creator-name-block' },
            h('span', { class: 'cap-name-latin' }, 'Yacine BOULYALI'),
            h('span', { class: 'cap-name-ar', lang: 'ar', dir: 'rtl' }, 'ياسين بوليالي')
          ),
          h('span', { class: 'cap-role' }, 'Créateur de la plateforme InfoPlay Maroc'),
          h('span', { class: 'cap-role-ar', lang: 'ar', dir: 'rtl' }, 'منشئ ومطور منصة InfoPlay Maroc')
        )
      )
    ),
    metricsRibbon,
    entrySection,
    mechanicsSection,
    modulesPreview,
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
      prof ? h('a', { class: 'btn primary', href: '#/dash' }, '← Mon Tableau de bord') : h('a', { class: 'btn primary', href: '#/profils' }, '← Choisir mon pseudo')
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

  const view = h('main', { id: 'main', class: 'dash-page' },
    h('section', { class: 'dash-hero', 'data-reveal': '' },
      h('div', { class: 'dash-hero-id' },
        h('span', { class: 'dash-ava', 'aria-hidden': 'true' }, avatarFor(p.displayName)),
        h('div', null,
          h('p', { class: 'eyebrow' }, `Niveau ${game.level} · ${game.rank}`),
          h('h1', { tabindex: '-1' }, `Bonjour ${p.displayName} 👋`),
          h('div', { class: 'xpbar', role: 'progressbar', 'aria-valuenow': game.pct, 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-label': `Niveau ${game.level} : ${game.into} XP sur ${game.need}` }, h('i', { style: `width:${game.pct}%` })),
          h('small', { class: 'muted' }, `${game.into} / ${game.need} XP avant le niveau ${game.level + 1} · ${game.xp} XP au total`))),
      h('div', { class: 'dash-kpis' },
        ring(pct, `Progression totale ${pct} %`),
        h('div', { class: 'kpi' }, h('b', null, fmt(t.best)), h('span', null, `points / ${TOTAL_POINTS}`)),
        h('div', { class: 'kpi' }, h('b', null, `${t.done}/${t.n}`), h('span', null, 'activités')),
        h('div', { class: 'kpi' + (game.streak >= 3 ? ' hot' : '') }, h('b', null, `🔥 ${game.streak}`), h('span', null, `série (record ${game.bestStreak})`)),
        h('div', { class: 'kpi' }, h('b', null, `${t.sessionsDone}/30`), h('span', null, 'séances')))),
    h('div', { class: 'dash-cta', 'data-reveal': '' },
      next ? h('a', { class: 'cta-card', href: `#/m/${next.moduleId}/s/${next.sessionIndex}/a/${next.index}`, 'data-tilt': '' },
        h('span', { class: 'cta-play', 'aria-hidden': 'true' }, '▶'),
        h('span', null, h('small', null, `Module ${next.moduleId} · Séance ${next.sessionIndex} · Activité ${next.index}`), h('b', null, `Continuer : ${next.title}`)))
        : h('span', { class: 'pill done' }, '🏆 Tout est fait !'),
      h('a', { class: 'btn ghost', href: '#/course' }, '🏁 Course de la classe'),
      h('a', { class: 'btn ghost', href: '#/multijoueur' }, '🌐 Joueurs du réseau')),
    h('h2', { class: 'section-h', 'data-reveal': '' }, 'Les 4 modules'),
    h('div', { class: 'grid g4' }, CATALOG.map((m) => {
      const s = moduleStats(m, rec);
      return h('a', { class: 'card mod ' + m.color, href: `#/m/${m.id}`, 'aria-label': `Module ${m.id} : ${m.title}, ${s.pct} %`, 'data-tilt': '', 'data-reveal': '' },
        h('span', { class: 'mod-glare', 'aria-hidden': 'true' }),
        h('span', { class: 'em', 'aria-hidden': 'true' }, m.icon),
        h('h2', null, `Module ${m.id}`),
        h('p', { style: 'margin:0;font-weight:700' }, m.title, arSub(arModule(m.id))),
        bar(s.pct, `Module ${m.id} : ${s.pct} %`),
        h('small', null, `${s.done}/${s.n} activités · ${fmt(s.best)}/${s.max} points`),
        h('span', { class: 'btn' }, 'Ouvrir le module →')
      );
    })),
    h('h2', { class: 'section-h', 'data-reveal': '' }, `Mes badges · ${game.badges.size}/${BADGES.length}`),
    h('div', { class: 'badge-shelf', 'data-reveal': '' }, BADGES.map((b) => {
      const got = game.badges.has(b.id);
      return h('div', { class: 'badge-tile' + (got ? ' got' : ''), title: b.desc, tabindex: '0', 'aria-label': `${b.title} : ${got ? 'débloqué' : 'à débloquer'}. ${b.desc}` },
        h('span', { class: 'ico', 'aria-hidden': 'true' }, got ? b.icon : '🔒'), h('b', null, b.title), h('small', null, b.desc));
    }))
  );
  revealIn(view);
  return view;
}

function moduleScreen(mi) {
  const m = getModule(mi);
  if (!m) return notFound();
  const p = store.active();
  const rec = recOf(p.id);

  lanManager.setActivity('m' + mi, `Module ${mi} : ${m.title}`);

  const row = (s) => {
    const st = sessionStats(s, rec);
    return h('a', { class: 'card srow ' + st.status, href: `#/m/${m.id}/s/${s.index}`, 'data-reveal': '' },
      h('span', { class: 'n' }, st.status === 'done' ? '✓' : s.index),
      h('span', null,
        h('b', null, `Séance ${s.index} — ${s.title}`),
        arSub(arSession(s.id)),
        h('small', { class: 'muted' }, s.topics.join(' · '))
      ),
      h('span', { style: 'text-align:right' },
        h('span', { class: 'pill ' + st.status }, STATUS[st.status]),
        h('br'),
        h('small', null, `${fmt(st.best)}/20`)
      )
    );
  };

  const body = m.groups ? m.groups.flatMap((g) => [
    h('h3', { class: 'group-h' }, g.label),
    h('div', { class: 'sessions' }, g.sessions.map((k) => row(m.sessions[k - 1])))
  ]) : [h('div', { class: 'sessions' }, m.sessions.map(row))];
  const ms = moduleStats(m, rec);

  return h('main', { id: 'main' },
    h('p', { class: 'crumbs' }, link('#/dash', 'Tableau de bord'), ' › Module ', m.id),
    h('h1', { tabindex: '-1' }, `${m.icon} Module ${m.id} — ${m.title}`, arSub(arModule(m.id))),
    h('p', { class: 'muted' }, `${m.sessions.length} séances · ${m.sessions.length * 4} activités · ${fmt(ms.best)} / ${ms.max} points`),
    m.languageNote ? h('p', { class: 'notice' }, m.languageNote) : null,
    ...body
  );
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
    h('p', { class: 'crumbs' }, link('#/dash', 'Tableau de bord'), ' › ', link('#/m/' + mi, 'Module ' + mi), ' › Séance ', si),
    h('h1', { tabindex: '-1' }, `Séance ${si} — ${s.title}`, arSub(arSession(s.id))),
    h('p', null, h('b', null, 'Notions : '), s.topics.join(', '), '.'),
    h('p', { class: 'muted' }, `4 activités interactives · environ ${s.acts.reduce((a, b) => a + b.estimatedMinutes, 0)} minutes · /20 points`),
    h('div', { class: 'grid g2' }, s.acts.map((a) => {
      const r = rec(a.id);
      const best = r?.attempts.length ? Math.max(...r.attempts.map((x) => x.score)) : null;
      return h('a', { class: 'card act-tile', href: `#/m/${mi}/s/${si}/a/${a.index}`, style: 'text-decoration:none;color:inherit', 'data-tilt': '', 'data-reveal': '' },
        h('div', { class: 'row', style: 'justify-content:space-between' },
          h('span', { class: 'pill' }, `${a.index}. ${KIND[a.type]}`),
          best != null ? h('span', { class: 'pill done' }, `${fmt(best)}/5 ★`) : h('span', { class: 'pill' }, `~${a.estimatedMinutes} min`)
        ),
        h('h3', { style: 'margin-top:.5rem' }, a.title, arSub(arActivity(a.id))),
        h('p', { class: 'muted', style: 'margin:0' }, a.objective)
      );
    })),
    h('div', { class: 'row', style: 'margin-top:1.2rem' },
      h('a', { class: 'btn primary', href: `#/m/${mi}/s/${si}/a/${next.index}` }, st.done ? '▶ Continuer la séance' : '▶ Commencer la séance'),
      st.done ? h('a', { class: 'btn', href: `#/m/${mi}/s/${si}/bilan` }, 'Voir le bilan') : null
    )
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
  }, '💡 Indice');

  const challengeBtn = h('button', {
    type: 'button',
    class: 'btn ghost small',
    onclick: async () => {
      await lanManager.createChallenge(act.id, act.title);
      toast('⚡ Défi réseau lancé ! Les autres élèves sur le réseau ont été notifiés.');
    },
  }, '⚡ Défier la classe');

  function mount() {
    stage.replaceChildren();
    stage.inert = false;
    out.replaceChildren();
    submitted = false;
    checkBtn.disabled = false;
    view.classList.remove('graded');
    eng = engineOf(act.mech)(stage, act.data);
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

    const before = computeGame(rec, prof.id);
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
      store, prof, act, res, score, n, before, elapsedMs: elapsed, stage,
      next: { href: nextHref, label: ai < 4 ? 'Activité suivante →' : 'Bilan de la séance →' },
      onRetry: () => { mount(); stage.scrollIntoView({ block: 'start', behavior: 'smooth' }); },
      onPeak: (ratio) => { if (ratio === 1) celebrate(); },
    }));
    hud.replaceWith(hud = gameHud(computeGame(rec, prof.id), { compact: true }));
  }

  const dots = h('nav', { class: 'dots', 'aria-label': 'Activités de la séance' }, s.acts.map((a) => h('a', {
    href: `#/m/${mi}/s/${si}/a/${a.index}`,
    class: (a.index === ai ? 'cur ' : '') + (rec(a.id)?.attempts.length ? 'done' : ''),
    'aria-label': `Activité ${a.index} : ${a.title}`,
    'aria-current': a.index === ai ? 'step' : null,
  }, a.index)));

  let hud = gameHud(computeGame(rec, prof.id), { compact: true });
  const bestT = bestTime(prof.id, act.id);
  const view = h('main', { id: 'main', class: `activity-page ${m.color}` },
    h('p', { class: 'crumbs' }, link('#/dash', 'Tableau de bord'), ' › ', link('#/m/' + mi, 'Module ' + mi), ' › ', link(`#/m/${mi}/s/${si}`, 'Séance ' + si), ' › Activité ', ai),
    h('header', { class: 'act-hero', 'data-reveal': '' },
      h('div', { class: 'act-hero-main' },
        h('span', { class: 'act-kind' }, `${m.icon} ${KIND[act.type]} · Module ${mi} · Séance ${si}`),
        h('h1', { tabindex: '-1' }, act.title, arSub(arActivity(act.id))),
        h('p', { class: 'act-obj' }, h('b', null, 'Objectif : '), act.objective)),
      h('div', { class: 'act-hero-side' }, dots, h('div', { class: 'act-meta' }, chrono.el, bestT != null ? h('span', { class: 'chrono best', title: 'Ton meilleur temps' }, '🏆 ' + fmtTime(bestT)) : null, h('span', { class: 'chip-meta' }, `~${act.estimatedMinutes} min · /5`)), hud)),
    h('div', { class: 'instr activity-brief', 'data-reveal': '' },
      h('b', null, 'Consigne : '), act.instructions,
      h('p', { class: 'activity-ar-instruction', lang: 'ar', dir: 'rtl' }, arInstruction(act.type))
    ),
    hintBox,
    stage,
    h('div', { class: 'row activity-actions' }, checkBtn, hintBtn, challengeBtn),
    out
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
    h('p', { class: 'crumbs' }, link('#/dash', 'Tableau de bord'), ' › ', link('#/m/' + mi, 'Module ' + mi), ' › Bilan de la séance ', si),
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
    CATALOG.map((m) => {
      const ms = moduleStats(m, rec);
      return h('section', { class: 'card', style: 'margin-bottom:1rem;overflow:auto' },
        h('h2', null, `${m.icon} Module ${m.id} — ${m.title}`),
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
      h('button', { type: 'button', class: 'btn small', onclick: () => downloadText('infoplay-resultats.csv', store.csv(ACTIVITIES), 'text/csv') }, '⬇ Exporter les résultats (CSV)'),
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
    const q = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);

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
    } else if (q[0] === 'm' && /^[1-4]$/.test(q[1] || '')) {
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
window.addEventListener('error', () => toast('Une erreur est survenue. Recharge la page si besoin.'));

// Rafraîchit les pages réseau en direct quand les élèves changent.
// La course et le suivi se mettent à jour sur place (animations conservées) ; le salon n'est
// redessiné que si son contenu change réellement et jamais pendant la saisie d'un message.
let salonSig = '';
lanManager.subscribe((st) => {
  trackRace(st, (who) => { if (st.race && !st.race.ended) { audio.play('overtaken'); toast(`🏁 ${who} vient de te dépasser ! À toi de jouer.`); } },
    (kind) => { if (kind === 'race-start' || kind === 'overtake' || (kind === 'join' && live)) audio.play(kind); });
  const badge = document.querySelector('.lan-badge span:last-child');
  if (badge) badge.textContent = `Réseau local (${st.playerCount})`;
  const cur = location.hash.split('/')[1] || '';
  if (live && (cur === 'course' || cur === 'suivi')) { live.update(st); return; }
  if (cur === 'multijoueur' || cur === 'salon') {
    const sig = JSON.stringify([st.players.map((p) => [p.peerId, p.score, p.activity]), st.messages.length, st.challenges.length]);
    if (sig === salonSig) return; salonSig = sig;
    const typing = document.activeElement && document.activeElement.matches('input,textarea,select');
    if (!typing) { const y = window.scrollY; render(); window.scrollTo(0, y); }
  }
});

if (/[?&]test=1/.test(location.search)) window.__ip = { store, CATALOG, ACTIVITIES, engineOf, lanManager };
render();
