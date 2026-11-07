import { h, downloadText, frDate, celebrate } from './utils/dom.js';
import { createStore, localAdapter, MAX_IMPORT_BYTES } from './storage/store.js';
import { CATALOG, ACTIVITIES, getActivity, getModule, getSession, isActivityId, TOTAL_POINTS } from './data/index.js';
import { engineOf } from './games/index.js';
import { activityScore, band, sessionStats, moduleStats, fmt, MAX } from './scoring/scoring.js';
import { audio, installInterfaceSounds } from './audio/audio.js';
import { arModule, arSession, arActivity, arInstruction } from './i18n/ar.js';
import { lanManager } from './multiplayer/lan.js';
import { raceScreen, monitorScreen, progressSnapshot, trackRace, avatarFor } from './multiplayer/screens.js';

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
    title: 'Accueil InfoPlay — ياسين بوجيالي',
  },
  h('span', { 'aria-hidden': 'true' }, '🏠'),
  h('span', { class: 'floating-home-label' }, 'Accueil')
  );
}

// ---------- ÉCRAN 1 : ACCUEIL INFOPLAY & CRÉATEUR YASSINE BOUDJIALI ----------
function homeScreen() {
  const name = h('input', {
    type: 'text',
    id: 'pname',
    maxlength: '24',
    required: true,
    autocomplete: 'off',
    placeholder: 'Ex : Amine, Fatima, Yassine...',
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
  h('label', { class: 'f', for: 'pname' }, 'Quel est ton prénom ou ton pseudo ?'),
  name,
  err,
  h('button', { class: 'btn primary', type: 'submit' }, 'Commencer l’aventure →')
  );

  const existingProfiles = store.profiles();
  const list = existingProfiles.length ? h('div', { class: 'card', style: 'margin-top:1rem' },
    h('h2', null, 'Profils enregistrés sur cet ordinateur :'),
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
      h('span', null, h('b', null, p.displayName), p.className ? ' · ' + p.className : ''),
      h('span', { class: 'pill' }, fmt(t.best) + ' / ' + TOTAL_POINTS + ' pts')
      );
    }))
  ) : null;

  const entrySection = h('section', {
    class: 'welcome-entry',
    id: 'entry-zone',
    hidden: true,
    'aria-label': 'Connexion à InfoPlay Maroc',
  },
  h('div', { class: 'card' },
    h('h2', null, '🎮 Choisis ton profil ou entre ton prénom'),
    h('p', { class: 'muted' }, 'Enregistrement direct sans mot de passe, conservé sur cet ordinateur.'),
    form
  ),
  list
  );

  const enterSoloBtn = h('button', {
    type: 'button',
    class: 'btn primary',
    onclick: () => {
      entrySection.hidden = false;
      entrySection.scrollIntoView({ block: 'start', behavior: 'smooth' });
      setTimeout(() => name.focus({ preventScroll: true }), 100);
    },
  }, '🎮 Entrer et Jouer (Solo) →');

  const enterLanBtn = h('button', {
    type: 'button',
    class: 'btn accent',
    onclick: () => go('#/multijoueur'),
  }, '🌐 Mode Multijoueur Réseau Local →');

  return h('main', { id: 'main', class: 'welcome-page' },
    h('section', { class: 'welcome-hero' },
      h('div', { class: 'welcome-copy' },
        // Nom du créateur de la plateforme
        h('div', { class: 'creator-pill' },
          h('span', { class: 'creator-ar', lang: 'ar', dir: 'rtl' }, 'منشئ اللعبة: ياسين بوجيالي'),
          h('span', null, '· Créateur du jeu : Yassine Boudjiali')
        ),
        h('h1', { tabindex: '-1' }, 'InfoPlay ', h('b', { style: 'color:var(--gold)' }, 'Maroc')),
        h('p', { class: 'welcome-lead', lang: 'ar', dir: 'rtl', style: 'font-family:Cairo,Tahoma,sans-serif;font-weight:700;line-height:1.7' },
          'المنصة التعليمية التفاعلية لتعلم المعلوميات والبرمجة والشبكات عبر 120 نشاطاً تفاعلياً شيقاً، مع إمكانية اللعب الجماعي داخل نفس الشبكة المحلية.'
        ),
        h('p', { class: 'welcome-lead', style: 'margin-top:.4rem' },
          'Apprends l’informatique en t’amusant : 30 séances, 120 activités immersives (cliquer-déposer, glisser-déposer, trouver la bonne ou la mauvaise réponse, vrai ou faux) et jeu multijoueur sur le réseau local.'
        ),
        // Deux fenêtres d'entrée : le projet classique et le monde immersif 3D (progression partagée).
        h('div', { class: 'mode-choice', role: 'group', 'aria-label': 'Choisis ta façon de jouer' },
          h('section', { class: 'mode-card mode-classic', 'aria-labelledby': 'mode-classic-h' },
            h('span', { class: 'mode-ico', 'aria-hidden': 'true' }, '📚'),
            h('h2', { id: 'mode-classic-h' }, 'InfoPlay Classique'),
            h('p', null, 'Toutes les activités dans une interface claire et rapide, en solo ou en multijoueur sur le réseau local.'),
            h('p', { class: 'mode-ar', lang: 'ar', dir: 'rtl' }, 'الواجهة الكلاسيكية: فردي أو جماعي'),
            h('div', { class: 'welcome-cta-group' }, enterSoloBtn, enterLanBtn, h('a', { class: 'btn ghost', href: '#/donnees' }, '📊 Données & Enseignant'))
          ),
          h('section', { class: 'mode-card mode-immersive', 'aria-labelledby': 'mode-3d-h' },
            h('span', { class: 'mode-badge' }, 'Nouveau · 3D'),
            h('span', { class: 'mode-ico', 'aria-hidden': 'true' }, '🏝️'),
            h('h2', { id: 'mode-3d-h' }, 'InfoPlay Immersif 3D'),
            h('p', null, 'Explore un monde en 3D : quatre îles, un portail pour chaque séance et un robot à programmer en volume. Même progression que le mode classique.'),
            h('p', { class: 'mode-ar', lang: 'ar', dir: 'rtl' }, 'عالم ثلاثي الأبعاد: جزر وبوابات وروبوت'),
            h('a', { class: 'btn accent mode-go', href: 'immersive.html' }, '🥽 Entrer dans le monde 3D →')
          )
        )
      ),
      h('figure', { class: 'portrait-frame' },
        h('img', {
          src: 'images/yacine-sebouali-profile.jpg',
          alt: 'Portrait de Yassine Boudjiali, créateur du jeu InfoPlay Maroc',
          width: '400',
          height: '400',
        }),
        h('figcaption', null,
          h('span', { lang: 'ar', dir: 'rtl' }, 'ياسين بوجيالي'),
          'Créateur du jeu InfoPlay Maroc'
        )
      )
    ),
    entrySection,
    h('p', { class: 'notice' },
      h('b', null, 'À savoir : '),
      'Ce profil sert à retrouver tes scores et étoiles. Aucune donnée n’est envoyée sur Internet : tout fonctionne à 100 % hors-ligne dans la salle informatique.'
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

  // Mise à jour de la présence LAN
  lanManager.setActivity('dash', 'Tableau de bord');
  lanManager.updateProfile({ score: t.best });

  return h('main', { id: 'main' },
    h('h1', { tabindex: '-1' }, `Bonjour ${p.displayName} 👋`),
    h('div', { class: 'card row', style: 'justify-content:space-between' },
      ring(pct, `Progression totale ${pct} %`),
      h('div', { class: 'stat' },
        h('div', null, h('b', null, fmt(t.best)), h('span', { class: 'muted' }, `points sur ${TOTAL_POINTS}`)),
        h('div', null, h('b', null, `${t.done}/${t.n}`), h('span', { class: 'muted' }, 'activités faites')),
        h('div', null, h('b', null, `${t.sessionsDone}/30`), h('span', { class: 'muted' }, 'séances terminées'))
      )
    ),
    h('div', { class: 'row', style: 'margin-top:1rem' },
      next ? h('a', { class: 'btn primary', href: `#/m/${next.moduleId}/s/${next.sessionIndex}/a/${next.index}` }, `▶ Continuer : ${next.title}`) : h('span', { class: 'pill done' }, '🏆 Tout est fait !'),
      h('a', { class: 'btn accent', href: '#/multijoueur' }, '🌐 Voir les joueurs sur le réseau local')
    ),
    h('h2', { style: 'margin-top:1.4rem' }, 'Les 4 modules'),
    h('div', { class: 'grid g4' }, CATALOG.map((m) => {
      const s = moduleStats(m, rec);
      return h('section', { class: 'card mod ' + m.color, 'aria-label': m.title },
        h('span', { class: 'em', 'aria-hidden': 'true' }, m.icon),
        h('h2', null, `Module ${m.id}`),
        h('p', { style: 'margin:0;font-weight:700' }, m.title, arSub(arModule(m.id))),
        bar(s.pct, `Module ${m.id} : ${s.pct} %`),
        h('small', null, `${s.done}/${s.n} activités · ${fmt(s.best)}/${s.max} points`),
        h('a', { class: 'btn', href: `#/m/${m.id}` }, 'Ouvrir le module')
      );
    }))
  );
}

function moduleScreen(mi) {
  const m = getModule(mi);
  if (!m) return notFound();
  const p = store.active();
  const rec = recOf(p.id);

  lanManager.setActivity('m' + mi, `Module ${mi} : ${m.title}`);

  const row = (s) => {
    const st = sessionStats(s, rec);
    return h('a', { class: 'card srow ' + st.status, href: `#/m/${m.id}/s/${s.index}` },
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
      return h('a', { class: 'card', href: `#/m/${mi}/s/${si}/a/${a.index}`, style: 'text-decoration:none;color:inherit' },
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

  // Annonce l'activité sur le réseau local
  lanManager.setActivity(act.id, act.title);

  const stage = h('div', { class: `stage-card activity-${act.id}`, id: 'stage' });
  const out = h('div', { 'aria-live': 'polite' });
  const hintBox = h('div', { class: 'hintbox', hidden: true }, '💡 ' + act.hint);
  let eng = null, submitted = false;

  const checkBtn = h('button', { type: 'button', class: 'btn primary', onclick: submit }, '✔ Vérifier mes réponses');
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
    class: 'btn accent small',
    onclick: async () => {
      await lanManager.createChallenge(act.id, act.title);
      toast('⚡ Défi réseau lancé ! Les autres élèves sur le réseau ont été notifiés.');
    },
  }, '⚡ Lancer un défi LAN');

  function mount() {
    stage.replaceChildren();
    stage.inert = false;
    out.replaceChildren();
    submitted = false;
    checkBtn.disabled = false;
    eng = engineOf(act.mech)(stage, act.data);
    if (window.__ip) window.__ip.eng = eng;
  }

  async function submit() {
    if (submitted || !eng) return;
    const res = eng.check();
    if (res.incomplete) { toast(res.incomplete); return; }
    if (res.unanswered > 0 && !(await confirmBox(`Il reste ${res.unanswered} réponse(s) vide(s). Vérifier quand même ?`, 'Vérifier'))) return;
    if (submitted) return;
    submitted = true;
    checkBtn.disabled = true;

    const score = activityScore(res.correct, res.total);
    const n = store.recordAttempt(prof.id, act.id, score, act.version);
    eng.reveal && eng.reveal(res);
    stage.inert = true;

    // Mise à jour de la progression sur le réseau local (suivi et course)
    const progress = progressSnapshot(recOf(prof.id));
    lanManager.updateProfile({ score: progress.points, progress, lastResult: { id: act.id, title: act.title, score, at: Date.now() } });

    showResult(score, res, n);
  }

  function showResult(score, res, n) {
    const r = rec(act.id).attempts;
    const first = r[0].score, best = Math.max(...r.map((x) => x.score));
    const ratio = score / MAX;

    // Son + animation synchronisés : une note par réponse, le jingle, puis une note par étoile.
    const tm = audio.feedback(res.items, ratio, score); let fbk = 0;
    if (ratio === 1) setTimeout(celebrate, tm.end * 1000);

    const msg = ratio === 1 ? 'Parfait ! 🎉' : ratio >= 0.8 ? 'Très bien !' : ratio >= 0.6 ? 'Bien, tu y es presque.' : ratio >= 0.4 ? 'Pas mal, relis les explications.' : 'Courage : lis les explications puis réessaie.';
    const arMsg = ratio === 1 ? 'ممتاز! إجابة كاملة ومتقنة 🎉' : ratio >= 0.8 ? 'أحسنت جداً! أداء متميز 👍' : ratio >= 0.6 ? 'جيد، اقتربت من الإجابة التامة ✨' : ratio >= 0.4 ? 'لا بأس، راجع الشروحات وأعد المحاولة 🔄' : 'اقرأ الشرح جيداً ثم حاول مجدداً 💪';
    const stars = Array.from({ length: 5 }, (_, i) => h('span', { class: 'star' + (i < Math.round(score) ? ' filled' : ''), 'aria-hidden': 'true', style: i < Math.round(score) ? `animation-delay:${tm.starAt + i * tm.starStep}s` : null }, '★'));
    const nextHref = ai < 4 ? `#/m/${mi}/s/${si}/a/${ai + 1}` : `#/m/${mi}/s/${si}/bilan`;

    out.replaceChildren(h('section', { class: 'result' + (ratio === 1 ? ' perfect' : ''), 'aria-label': 'Résultat' },
      h('div', { class: 'top' },
        h('div', { class: 'score-box' },
          h('div', { class: 'score' }, fmt(score), h('small', null, ' / 5')),
          h('div', { class: 'star-rating', role: 'img', 'aria-label': `${score} étoiles sur 5` }, ...stars)
        ),
        h('div', null,
          h('h2', { style: 'margin:0' }, msg),
          h('p', { class: 'result-ar-msg', lang: 'ar', dir: 'rtl' }, arMsg),
          h('p', { class: 'muted', style: 'margin:0' }, n === 1 ? 'Premier essai enregistré.' : `Essai n° ${n} · premier essai : ${fmt(first)}/5 · meilleur : ${fmt(best)}/5`)
        )
      ),
      h('ul', { class: 'fblist' }, res.items.map((it) => h('li', { class: it.info ? 'info' : it.ok ? 'ok' : 'ko', style: `animation-delay:${it.info ? 0 : (fbk++) * tm.step}s` },
        h('span', { class: 'ic', 'aria-hidden': 'true' }, it.info ? 'ℹ' : it.ok ? '✔' : '✖'),
        h('span', null, h('span', { class: 'vh' }, it.info ? 'Information : ' : it.ok ? 'Correct : ' : 'À revoir : '), it.msg)
      ))),
      h('div', { class: 'row' },
        h('button', { type: 'button', class: 'btn', onclick: () => { mount(); stage.scrollIntoView({ block: 'start' }); } }, '↻ Réessayer'),
        h('a', { class: 'btn primary', href: nextHref }, ai < 4 ? 'Activité suivante →' : 'Voir le bilan de la séance →')
      )
    ));
    out.firstChild.scrollIntoView({ block: 'nearest' });
  }

  const dots = h('nav', { class: 'dots', 'aria-label': 'Activités de la séance' }, s.acts.map((a) => h('a', {
    href: `#/m/${mi}/s/${si}/a/${a.index}`,
    class: (a.index === ai ? 'cur ' : '') + (rec(a.id)?.attempts.length ? 'done' : ''),
    'aria-label': `Activité ${a.index} : ${a.title}`,
    'aria-current': a.index === ai ? 'step' : null,
  }, a.index)));

  const progressPct = ai * 25;
  const view = h('main', { id: 'main', class: 'activity-page' },
    h('p', { class: 'crumbs' }, link('#/dash', 'Tableau de bord'), ' › ', link('#/m/' + mi, 'Module ' + mi), ' › ', link(`#/m/${mi}/s/${si}`, 'Séance ' + si), ' › Activité ', ai),
    h('section', { class: 'activity-progress', 'aria-label': `Progression dans la séance : activité ${ai} sur 4` },
      h('div', { class: 'activity-progress-head' }, h('b', null, `Activité ${ai} sur 4`), h('span', { class: 'muted' }, `${progressPct} %`)),
      bar(progressPct, `Activité ${ai} sur 4`),
      dots
    ),
    h('div', { class: 'row', style: 'justify-content:space-between;align-items:flex-start' },
      h('div', null,
        h('h1', { tabindex: '-1' }, act.title, arSub(arActivity(act.id))),
        h('p', { class: 'muted', style: 'margin:0' }, `${KIND[act.type]} · environ ${act.estimatedMinutes} min · note sur 5`),
        h('p', { style: 'margin:.4rem 0' }, h('b', null, 'Objectif : '), act.objective)
      ),
      challengeBtn
    ),
    h('div', { class: 'instr activity-brief' },
      h('b', null, 'Consigne : '), act.instructions,
      h('p', { class: 'activity-ar-instruction', lang: 'ar', dir: 'rtl' }, arInstruction(act.type))
    ),
    hintBox,
    stage,
    h('div', { class: 'row activity-actions' }, checkBtn, hintBtn),
    out
  );

  mount();
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
    h('p', { class: 'muted', style: 'margin-top:1rem' }, 'InfoPlay Maroc fonctionne hors ligne. Créateur du jeu : ياسين بوجيالي (Yassine Boudjiali).')
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
      // PAGE 1 OBLIGATOIRE : Accueil InfoPlay & Créateur Yassine Boudjiali uniquement !
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
