// Scènes SVG haute-définition et réalistes pour InfoPlay Maroc.
// Respecte les identifiants de zones tout en offrant un rendu immersif et fidèle au matériel/logiciel réel.

const R = (id, x, y, w, h, cls, text, fs) => ['r', id, x, y, w, h, cls, text, fs];
const L = (id, x1, y1, x2, y2, cls) => ['l', id, x1, y1, x2, y2, cls || 'ln'];
const C = (id, x, y, r, cls, text, fs) => ['c', id, x, y, r, cls, text, fs];
const T = (x, y, text, fs, cls) => ['t', x, y, text, fs || 14, cls || ''];
const P = (id, d, cls) => ['p', id, d, cls];
const RAW = (id, markup) => ['raw', id, markup];
const DEFS = (markup) => ['defs', markup];

const arc = (cx, cy, r, a0, a1) => {
  const p = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const [x0, y0] = p(a0), [x1, y1] = p(a1);
  return `M${cx} ${cy} L${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z`;
};

export const SCENES = {
  // -------------------------------------------------------------
  // DESKTOP : SURFACE DE TRAVAIL WINDOWS ULTRA-RÉALISTE
  // -------------------------------------------------------------
  desktop: {
    w: 600,
    h: 360,
    alt: 'Véritable bureau d’ordinateur avec fond d’écran, icônes, corbeille, fenêtre ouverte et barre des tâches complète',
    shapes: [
      DEFS(`
        <linearGradient id="d-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0a192f"/>
          <stop offset="40%" stop-color="#1e3a8a"/>
          <stop offset="75%" stop-color="#2563eb"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <radialGradient id="d-bloom" cx="65%" cy="40%" r="55%">
          <stop offset="0%" stop-color="#93c5fd" stop-opacity="0.85"/>
          <stop offset="50%" stop-color="#3b82f6" stop-opacity="0.45"/>
          <stop offset="100%" stop-color="#1d4ed8" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="d-bloom2" cx="35%" cy="30%" r="45%">
          <stop offset="0%" stop-color="#c084fc" stop-opacity="0.5"/>
          <stop offset="70%" stop-color="#7c3aed" stop-opacity="0.15"/>
          <stop offset="100%" stop-color="#1e1b4b" stop-opacity="0"/>
        </radialGradient>
        <filter id="d-shadow" x="-5%" y="-5%" width="115%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#000" flood-opacity="0.4"/>
        </filter>
        <filter id="icon-sh" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000" flood-opacity="0.5"/>
        </filter>
      `),
      // 1. Fond du bureau réaliste
      RAW('desk', `
        <rect x="0" y="0" width="600" height="320" fill="url(#d-bg)"/>
        <rect x="0" y="0" width="600" height="320" fill="url(#d-bloom)"/>
        <rect x="0" y="0" width="600" height="320" fill="url(#d-bloom2)"/>
        <!-- Ondulations graphiques de fond d'écran moderne -->
        <path d="M0,180 Q150,80 300,160 T600,120 L600,320 L0,320 Z" fill="rgba(255,255,255,0.06)"/>
        <path d="M0,220 Q200,120 400,200 T600,160 L600,320 L0,320 Z" fill="rgba(37,99,235,0.15)"/>
      `),
      // 2. Icônes de bureau détaillées
      RAW('icon', `
        <g filter="url(#icon-sh)">
          <!-- Ce PC -->
          <g transform="translate(18, 16)">
            <rect x="2" y="2" width="28" height="20" rx="3" fill="#3b82f6" stroke="#fff" stroke-width="1.5"/>
            <rect x="6" y="5" width="20" height="13" rx="1" fill="#1e293b"/>
            <rect x="13" y="22" width="6" height="4" fill="#94a3b8"/>
            <rect x="8" y="26" width="16" height="2" rx="1" fill="#cbd5e1"/>
            <text x="16" y="38" font-size="9" fill="#fff" font-weight="700" text-anchor="middle">Ce PC</text>
          </g>
          <!-- Dossier Documents -->
          <g transform="translate(18, 70)">
            <path d="M4,4 L12,4 L16,8 L28,8 L28,26 L4,26 Z" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
            <rect x="7" y="10" width="18" height="13" rx="1" fill="#fbbf24"/>
            <text x="16" y="38" font-size="9" fill="#fff" font-weight="700" text-anchor="middle">Documents</text>
          </g>
          <!-- Raccourci Navigateur Web -->
          <g transform="translate(18, 126)">
            <circle cx="16" cy="15" r="13" fill="#fff"/>
            <circle cx="16" cy="15" r="11" fill="#0284c7"/>
            <circle cx="16" cy="15" r="5" fill="#f8fafc"/>
            <text x="16" y="38" font-size="9" fill="#fff" font-weight="700" text-anchor="middle">Internet</text>
          </g>
          <!-- InfoPlay Raccourci -->
          <g transform="translate(18, 182)">
            <rect x="2" y="3" width="28" height="24" rx="6" fill="#6366f1" stroke="#fff" stroke-width="1.2"/>
            <text x="16" y="20" font-size="14" text-anchor="middle">🎮</text>
            <text x="16" y="38" font-size="9" fill="#fef08a" font-weight="700" text-anchor="middle">InfoPlay</text>
          </g>
        </g>
      `),
      // 3. Corbeille réaliste sur le bureau
      RAW('bin', `
        <g transform="translate(528, 240)" filter="url(#icon-sh)">
          <rect x="-6" y="-6" width="56" height="66" rx="8" fill="rgba(255,255,255,0.08)"/>
          <!-- Récipient corbeille 3D avec papiers -->
          <path d="M8,14 L32,14 L29,42 L11,42 Z" fill="#94a3b8" stroke="#475569" stroke-width="1.5"/>
          <ellipse cx="20" cy="14" rx="12" ry="3" fill="#cbd5e1" stroke="#475569" stroke-width="1"/>
          <!-- Papiers froissés qui débordent -->
          <path d="M14,12 L19,5 L23,13 L17,14 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="0.8"/>
          <path d="M22,11 L27,7 L28,14 Z" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="0.8"/>
          <!-- Symbole recyclage -->
          <text x="20" y="32" font-size="14" text-anchor="middle" fill="#1e293b" opacity="0.75">♻</text>
          <text x="20" y="52" font-size="9" fill="#ffffff" font-weight="700" text-anchor="middle">Corbeille</text>
        </g>
      `),
      // 4. Fenêtre ouverte réaliste (Explorateur de fichiers)
      RAW('win', `
        <g transform="translate(130, 36)" filter="url(#d-shadow)">
          <!-- Cadre extérieur fenêtre -->
          <rect x="0" y="0" width="340" height="216" rx="8" fill="#ffffff" stroke="#334155" stroke-width="1.5"/>
          <!-- Barre de titre moderne -->
          <path d="M0,8 Q0,0 8,0 L332,0 Q340,0 340,8 L340,32 L0,32 Z" fill="#1e293b"/>
          <!-- Icône dossier & Titre -->
          <text x="12" y="21" font-size="14">📁</text>
          <text x="32" y="20" font-size="12" fill="#f8fafc" font-family="Nunito,sans-serif" font-weight="700">Explorateur — Mes Documents</text>
          <!-- Boutons Réduire, Agrandir, Fermer -->
          <rect x="252" y="6" width="24" height="20" rx="3" fill="rgba(255,255,255,0.1)"/>
          <text x="264" y="19" font-size="12" fill="#e2e8f0" text-anchor="middle" font-weight="800">—</text>
          <rect x="280" y="6" width="24" height="20" rx="3" fill="rgba(255,255,255,0.1)"/>
          <text x="292" y="19" font-size="12" fill="#e2e8f0" text-anchor="middle">▢</text>
          <rect x="308" y="6" width="26" height="20" rx="3" fill="#dc2626"/>
          <text x="321" y="20" font-size="12" fill="#ffffff" text-anchor="middle" font-weight="800">✕</text>
          <!-- Barre d'outils / chemin d'accès -->
          <rect x="0" y="32" width="340" height="28" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
          <text x="10" y="50" font-size="12" fill="#64748b">◀  ▶  ↑</text>
          <rect x="62" y="36" width="190" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
          <text x="70" y="50" font-size="10.5" fill="#334155">📁 Ce PC &gt; Documents &gt; Devoirs</text>
          <rect x="258" y="36" width="74" height="20" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
          <text x="264" y="50" font-size="10" fill="#94a3b8">🔍 Chercher</text>
          <!-- Volet latéral gauche -->
          <rect x="0" y="60" width="85" height="156" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
          <text x="10" y="80" font-size="9.5" fill="#64748b" font-weight="700">Accès rapide</text>
          <text x="12" y="100" font-size="10" fill="#334155">🖥 Bureau</text>
          <text x="12" y="122" font-size="10" fill="#2563eb" font-weight="700">📁 Documents</text>
          <text x="12" y="144" font-size="10" fill="#334155">⬇ Télécharg.</text>
          <text x="12" y="166" font-size="10" fill="#334155">🖼 Images</text>
          <!-- Zone de contenu / fichiers -->
          <!-- Fichier 1 : Devoir.docx -->
          <g transform="translate(100, 75)">
            <rect x="4" y="2" width="28" height="34" rx="3" fill="#2563eb"/>
            <text x="18" y="24" font-size="15" fill="#fff" font-weight="800" text-anchor="middle">W</text>
            <text x="18" y="47" font-size="9" fill="#1e293b" text-anchor="middle" font-weight="700">Devoir.docx</text>
          </g>
          <!-- Fichier 2 : Tableau.xlsx -->
          <g transform="translate(175, 75)">
            <rect x="4" y="2" width="28" height="34" rx="3" fill="#16a34a"/>
            <text x="18" y="24" font-size="15" fill="#fff" font-weight="800" text-anchor="middle">X</text>
            <text x="18" y="47" font-size="9" fill="#1e293b" text-anchor="middle" font-weight="700">Notes.xlsx</text>
          </g>
          <!-- Fichier 3 : Photo.jpg -->
          <g transform="translate(250, 75)">
            <rect x="4" y="2" width="28" height="34" rx="3" fill="#ea580c"/>
            <text x="18" y="24" font-size="15" fill="#fff" text-anchor="middle">🖼</text>
            <text x="18" y="47" font-size="9" fill="#1e293b" text-anchor="middle" font-weight="700">Photo.jpg</text>
          </g>
          <!-- Fichier 4 : Projet.py -->
          <g transform="translate(100, 140)">
            <rect x="4" y="2" width="28" height="34" rx="3" fill="#4f46e5"/>
            <text x="18" y="24" font-size="14" fill="#fff" text-anchor="middle">&lt;/&gt;</text>
            <text x="18" y="47" font-size="9" fill="#1e293b" text-anchor="middle" font-weight="700">Robot.py</text>
          </g>
          <!-- Barre d'état fenêtre -->
          <rect x="85" y="196" width="255" height="20" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
          <text x="95" y="210" font-size="9" fill="#64748b">4 éléments  ·  1 élément sélectionné (24 Ko)</text>
        </g>
      `),
      // 5. Barre des tâches complète en bas
      RAW('taskbar', `
        <rect x="0" y="320" width="600" height="40" fill="#0f172a" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
        <!-- Barre de recherche -->
        <rect x="58" y="326" width="130" height="28" rx="14" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
        <text x="70" y="344" font-size="12" fill="#94a3b8">🔍</text>
        <text x="88" y="344" font-size="11" fill="#cbd5e1" font-family="Nunito,sans-serif">Rechercher...</text>
        <!-- Icônes d'applications épinglées -->
        <!-- Explorateur actif avec barre bleue sous l'icône -->
        <g transform="translate(200, 324)">
          <rect x="2" y="2" width="28" height="28" rx="5" fill="rgba(255,255,255,0.15)"/>
          <text x="16" y="21" font-size="16" text-anchor="middle">📁</text>
          <rect x="8" y="31" width="16" height="3" rx="1.5" fill="#38bdf8"/>
        </g>
        <!-- Navigateur Edge / Chrome -->
        <g transform="translate(236, 324)">
          <text x="16" y="22" font-size="17" text-anchor="middle">🌐</text>
        </g>
        <!-- Traitement de texte Word -->
        <g transform="translate(270, 324)">
          <rect x="4" y="4" width="22" height="24" rx="3" fill="#2563eb"/>
          <text x="15" y="21" font-size="14" fill="#fff" font-weight="800" text-anchor="middle">W</text>
        </g>
        <!-- Paramètres -->
        <g transform="translate(304, 324)">
          <text x="15" y="22" font-size="16" text-anchor="middle">⚙️</text>
        </g>
      `),
      // 6. Bouton Démarrer (Logo Windows 4 carreaux)
      RAW('start', `
        <g transform="translate(8, 324)">
          <rect x="0" y="0" width="44" height="32" rx="6" fill="#1e293b" stroke="#3b82f6" stroke-width="1.5"/>
          <!-- Logo 4 carrés bleu vif -->
          <g transform="translate(14, 8)">
            <rect x="0" y="0" width="7" height="7" rx="1" fill="#38bdf8"/>
            <rect x="9" y="0" width="7" height="7" rx="1" fill="#38bdf8"/>
            <rect x="0" y="9" width="7" height="7" rx="1" fill="#38bdf8"/>
            <rect x="9" y="9" width="7" height="7" rx="1" fill="#38bdf8"/>
          </g>
        </g>
      `),
      // 7. Zone de notification (Heure, Wi-Fi, Son, Batterie)
      RAW('tray', `
        <g transform="translate(460, 323)">
          <rect x="0" y="0" width="134" height="34" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
          <!-- Chevron -->
          <text x="10" y="22" font-size="11" fill="#94a3b8">^</text>
          <!-- Wi-Fi -->
          <text x="24" y="22" font-size="13" fill="#38bdf8">📶</text>
          <!-- Haut-parleur son -->
          <text x="44" y="22" font-size="13" fill="#f8fafc">🔊</text>
          <!-- Batterie -->
          <text x="63" y="22" font-size="12" fill="#4ade80">🔋</text>
          <!-- Horloge numérique et date -->
          <text x="96" y="16" font-size="11" fill="#ffffff" font-weight="800" font-family="Consolas,monospace">14:30</text>
          <text x="83" y="28" font-size="8.5" fill="#94a3b8" font-family="sans-serif">07/11/2026</text>
        </g>
      `),
    ],
    desc: {
      desk: 'Fond du bureau (papier peint et surface de travail)',
      icon: 'Icônes du bureau (raccourcis Ce PC, Documents, Navigateur)',
      bin: 'Corbeille (récipient pour récupérer ou supprimer définitivement les fichiers)',
      win: 'Fenêtre active (Explorateur de fichiers affichant le contenu du dossier)',
      taskbar: 'Barre des tâches (longue barre inférieure contenant les programmes ouverts)',
      start: 'Bouton Démarrer (icône Windows ⊞ en bas à gauche pour ouvrir le menu)',
      tray: 'Zone de notification (affiche l’horloge 14:30, le volume sonore et le Wi-Fi)',
    },
  },

  // -------------------------------------------------------------
  // PC : COMPOSANTS INTERNES D’UNE TOUR D’ORDINATEUR OUVERTE
  // -------------------------------------------------------------
  pc: {
    w: 600,
    h: 360,
    alt: 'Vue intérieure réaliste d’une tour d’ordinateur ouverte : carte mère, processeur, ventilateur, barrettes de RAM, SSD et bloc d’alimentation',
    shapes: [
      DEFS(`
        <linearGradient id="mobo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#064e3b"/>
          <stop offset="100%" stop-color="#022c22"/>
        </linearGradient>
        <linearGradient id="psu-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#334155"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
      `),
      // Boîtier extérieur ouvert
      R(null, 10, 10, 580, 340, 'c9'),
      // Carte mère
      RAW('mobo', `
        <rect x="30" y="24" width="390" height="312" rx="8" fill="url(#mobo-grad)" stroke="#10b981" stroke-width="2"/>
        <!-- Pistes de circuit imprimé dorées -->
        <path d="M50,40 L180,40 L180,90 M80,260 L80,180 L180,180 M280,220 L350,220 L350,300" stroke="#f59e0b" stroke-width="1.2" fill="none" opacity="0.6"/>
        <text x="45" y="50" font-size="11" fill="#6ee7b7" font-weight="800">CARTE MÈRE (Motherboard)</text>
      `),
      // Processeur (CPU)
      RAW('cpu', `
        <g transform="translate(170, 95)">
          <rect x="0" y="0" width="80" height="80" rx="6" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
          <rect x="8" y="8" width="64" height="64" rx="4" fill="#334155"/>
          <text x="40" y="38" font-size="11" fill="#38bdf8" font-weight="800" text-anchor="middle">CPU</text>
          <text x="40" y="52" font-size="9" fill="#f8fafc" text-anchor="middle">Intel / AMD</text>
          <text x="40" y="65" font-size="8" fill="#94a3b8" text-anchor="middle">Processeur</text>
        </g>
      `),
      // Ventilateur de refroidissement (Fan)
      RAW('fan', `
        <g transform="translate(210, 58)">
          <circle cx="0" cy="0" r="32" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
          <path d="M-22,-8 Q0,0 -8,-22 M8,-22 Q0,0 22,-8 M22,8 Q0,0 8,22 M-8,22 Q0,0 -22,8" stroke="#94a3b8" stroke-width="4" fill="none"/>
          <circle cx="0" cy="0" r="10" fill="#38bdf8"/>
          <text x="0" y="4" font-size="10" fill="#0f172a" font-weight="800" text-anchor="middle">❄</text>
        </g>
      `),
      // Barrettes de mémoire vive (RAM)
      RAW('ram', `
        <g transform="translate(280, 50)">
          <!-- Slot 1 -->
          <rect x="0" y="0" width="16" height="140" rx="3" fill="#1e40af" stroke="#60a5fa" stroke-width="1.5"/>
          <rect x="2" y="10" width="12" height="120" rx="2" fill="#1d4ed8"/>
          <!-- Slot 2 -->
          <rect x="22" y="0" width="16" height="140" rx="3" fill="#1e40af" stroke="#60a5fa" stroke-width="1.5"/>
          <rect x="24" y="10" width="12" height="120" rx="2" fill="#1d4ed8"/>
          <!-- Slot 3 -->
          <rect x="44" y="0" width="16" height="140" rx="3" fill="#1e40af" stroke="#60a5fa" stroke-width="1.5"/>
          <rect x="46" y="10" width="12" height="120" rx="2" fill="#1d4ed8"/>
          <text x="30" y="156" font-size="10" fill="#60a5fa" font-weight="800" text-anchor="middle">RAM (Mémoire vive)</text>
        </g>
      `),
      // Disque dur / SSD M.2
      RAW('ssd', `
        <g transform="translate(440, 50)">
          <rect x="0" y="0" width="128" height="42" rx="4" fill="#0f172a" stroke="#a855f7" stroke-width="1.5"/>
          <rect x="10" y="8" width="24" height="26" fill="#1e293b" stroke="#64748b" stroke-width="1"/>
          <rect x="42" y="8" width="24" height="26" fill="#1e293b" stroke="#64748b" stroke-width="1"/>
          <rect x="74" y="8" width="24" height="26" fill="#1e293b" stroke="#64748b" stroke-width="1"/>
          <text x="112" y="26" font-size="9" fill="#c084fc" font-weight="800">SSD</text>
          <text x="64" y="54" font-size="10" fill="#c084fc" font-weight="700" text-anchor="middle">Stockage SSD NVMe</text>
        </g>
      `),
      // Bloc d'alimentation (PSU)
      RAW('psu', `
        <g transform="translate(440, 220)">
          <rect x="0" y="0" width="130" height="106" rx="8" fill="url(#psu-grad)" stroke="#f59e0b" stroke-width="2"/>
          <circle cx="65" cy="46" r="32" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
          <!-- Grille alim -->
          <path d="M45,46 L85,46 M65,26 L65,66 M51,32 L79,60 M51,60 L79,32" stroke="#64748b" stroke-width="2"/>
          <text x="65" y="94" font-size="11" fill="#f59e0b" font-weight="800" text-anchor="middle">⚡ ALIMENTATION (PSU)</text>
        </g>
      `),
    ],
    desc: {
      mobo: 'Grande plaque verte du fond (carte mère), sur laquelle tout se branche',
      cpu: 'Processeur central (CPU), le cerveau qui effectue tous les calculs',
      fan: 'Ventilateur de refroidissement situé juste au-dessus du processeur',
      ram: 'Barrettes bleues de mémoire vive (RAM) pour le stockage temporaire',
      ssd: 'Disque SSD de stockage rapide pour conserver le système et les fichiers',
      psu: 'Bloc d’alimentation jaune en bas à droite fournissant le courant électrique',
    },
  },

  // -------------------------------------------------------------
  // WORD : TRAITEMENT DE TEXTE MODERNE
  // -------------------------------------------------------------
  word: {
    w: 600,
    h: 360,
    alt: 'Fenêtre complète de traitement de texte avec barre de titre, onglets, ruban d’outils, règle, feuille blanche et barre d’état',
    shapes: [
      // Titre
      RAW('title', `
        <rect x="0" y="0" width="600" height="28" fill="#1d4ed8"/>
        <text x="12" y="19" font-size="13" fill="#fff" font-weight="700">📄 Document1 — Traitement de texte</text>
        <text x="540" y="19" font-size="13" fill="#fff">—  ▢  ✕</text>
      `),
      // Onglets
      RAW('tabs', `
        <rect x="0" y="28" width="600" height="26" fill="#2563eb"/>
        <text x="16" y="45" font-size="12" fill="#ffffff" font-weight="700">Fichier   Accueil   Insertion   Mise en page   Affichage</text>
      `),
      // Ruban d'outils
      RAW('ribbon', `
        <rect x="0" y="54" width="600" height="56" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
        <!-- Outils police -->
        <rect x="12" y="62" width="70" height="24" rx="4" fill="#fff" stroke="#94a3b8"/>
        <text x="18" y="78" font-size="11" fill="#1e293b">Calibri ▾</text>
        <rect x="88" y="62" width="40" height="24" rx="4" fill="#fff" stroke="#94a3b8"/>
        <text x="96" y="78" font-size="11" fill="#1e293b">12 ▾</text>
        <!-- Boutons format -->
        <rect x="134" y="62" width="24" height="24" rx="4" fill="#fff" stroke="#94a3b8"/>
        <text x="141" y="78" font-size="12" font-weight="900" fill="#1e293b">G</text>
        <rect x="162" y="62" width="24" height="24" rx="4" fill="#fff" stroke="#94a3b8"/>
        <text x="170" y="78" font-size="12" font-style="italic" font-weight="700" fill="#1e293b">I</text>
        <rect x="190" y="62" width="24" height="24" rx="4" fill="#fff" stroke="#94a3b8"/>
        <text x="198" y="78" font-size="12" text-decoration="underline" font-weight="700" fill="#1e293b">S</text>
        <!-- Alignements -->
        <text x="226" y="78" font-size="16">≡  ☷  🖼  ▦  🎨</text>
      `),
      // Règle graduée
      RAW('ruler', `
        <rect x="0" y="110" width="600" height="16" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1"/>
        <text x="120" y="122" font-size="9" fill="#64748b" font-family="monospace">|···1···|···2···|···3···|···4···|···5···|···6···|···7···|···8···|</text>
      `),
      // Page blanche A4 au centre
      RAW('page', `
        <g transform="translate(110, 132)">
          <rect x="0" y="0" width="380" height="200" rx="2" fill="#ffffff" stroke="#94a3b8" stroke-width="1" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.15))"/>
          <!-- Lignes de texte simulées -->
          <rect x="25" y="25" width="240" height="12" fill="#1e3a8a" rx="2"/>
          <line x1="25" y1="55" x2="355" y2="55" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="25" y1="75" x2="330" y2="75" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="25" y1="95" x2="345" y2="95" stroke="#cbd5e1" stroke-width="2"/>
          <line x1="25" y1="115" x2="280" y2="115" stroke="#cbd5e1" stroke-width="2"/>
        </g>
      `),
      // Barre d'état en bas
      RAW('status', `
        <rect x="0" y="338" width="600" height="22" fill="#1d4ed8"/>
        <text x="14" y="353" font-size="11" fill="#ffffff">Page 1 sur 1     Mots : 142     Français (Maroc)     100 %</text>
      `),
    ],
    desc: {
      title: 'Bande bleue tout en haut avec le nom du document et les boutons de contrôle',
      tabs: 'Deuxième bande supérieure avec les onglets (Fichier, Accueil, Insertion...)',
      ribbon: 'Large bandeau d’outils contenant les polices, tailles et styles de texte',
      ruler: 'Fine règle graduée horizontale sous le ruban pour mesurer les marges',
      page: 'Grande feuille blanche A4 au centre où l’on rédige le document',
      status: 'Fine bande bleue tout en bas affichant le nombre de pages et de mots',
    },
  },

  // -------------------------------------------------------------
  // TOOLBAR : BARRE DE MISE EN FORME
  // -------------------------------------------------------------
  toolbar: {
    w: 600,
    h: 120,
    alt: 'Barre d’outils détaillée de mise en forme du texte avec polices, gras, italique, alignements',
    shapes: [
      R(null, 0, 0, 600, 120, 'c8'),
      R('font', 14, 30, 130, 36, 'c0', 'Arial ▾', 14),
      R('size', 152, 30, 56, 36, 'c0', '14 ▾', 14),
      R('bold', 224, 30, 36, 36, 'c5', 'G', 18),
      R('italic', 266, 30, 36, 36, 'c5', 'I', 18),
      R('underline', 308, 30, 36, 36, 'c5', 'S', 18),
      R('color', 358, 30, 44, 36, 'c4', 'A', 20),
      R('alignL', 420, 30, 36, 36, 'c6'),
      L('alignL', 428, 40, 448, 40),
      L('alignL', 428, 48, 440, 48),
      L('alignL', 428, 56, 448, 56),
      R('alignC', 462, 30, 36, 36, 'c6'),
      L('alignC', 470, 40, 490, 40),
      L('alignC', 474, 48, 486, 48),
      L('alignC', 470, 56, 490, 56),
      R('alignR', 504, 30, 36, 36, 'c6'),
      L('alignR', 512, 40, 532, 40),
      L('alignR', 520, 48, 532, 48),
      L('alignR', 512, 56, 532, 56),
    ],
    desc: {
      font: 'Menu déroulant pour choisir la police de caractères',
      size: 'Menu pour modifier la taille du texte (en points)',
      bold: 'Bouton Gras (lettre G) pour épaissir le texte',
      italic: 'Bouton Italique (lettre I) pour incliner le texte',
      underline: 'Bouton Souligné (lettre S) pour souligner les mots',
      color: 'Bouton Couleur de police (lettre A avec barre colorée)',
      alignL: 'Bouton Aligner à gauche (traits alignés à gauche)',
      alignC: 'Bouton Centrer (traits centrés au milieu)',
      alignR: 'Bouton Aligner à droite (traits alignés à droite)',
    },
  },

  // -------------------------------------------------------------
  // PRINTDLG : BOÎTE DE DIALOGUE D’IMPRESSION
  // -------------------------------------------------------------
  printdlg: {
    w: 600,
    h: 360,
    alt: 'Boîte de dialogue complète d’impression avec sélection de l’imprimante, nombre de copies, format et aperçu',
    shapes: [
      R(null, 50, 10, 500, 340, 'c0'),
      R(null, 50, 10, 500, 32, 'c3', '🖨 Imprimer le document', 14),
      R('printer', 70, 54, 460, 32, 'c8', 'Imprimante : HP-LaserJet-Salle-Informatique', 13),
      R('range', 70, 96, 220, 36, 'c8', 'Pages : Toutes', 14),
      R('copies', 310, 96, 220, 36, 'c8', 'Nombre de copies : 1', 14),
      R('orient', 70, 142, 220, 32, 'c8', 'Orientation : Portrait', 13),
      R('paper', 310, 142, 220, 32, 'c8', 'Format papier : A4 (21 x 29,7 cm)', 13),
      R('preview', 70, 186, 220, 150, 'c2'),
      R(null, 120, 200, 120, 122, 'c0'),
      R('printbtn', 350, 290, 180, 44, 'c5', '✔ Lancer l’impression', 15),
    ],
    desc: {
      printer: 'Menu supérieur pour sélectionner l’imprimante de destination',
      range: 'Option d’étendue des pages (Toutes, Page actuelle ou sélection)',
      copies: 'Champ pour régler le nombre de copies à imprimer',
      orient: 'Réglage de l’orientation de la page (Portrait ou Paysage)',
      paper: 'Choix du format de papier (A4, A3, Lettre...)',
      preview: 'Cadre d’aperçu avant impression affichant la feuille simulée',
      printbtn: 'Bouton principal bleu en bas à droite pour valider et imprimer',
    },
  },

  // -------------------------------------------------------------
  // SHEET : TABLEUR COMPLET (STYLE EXCEL)
  // -------------------------------------------------------------
  sheet: {
    w: 600,
    h: 360,
    alt: 'Fenêtre de tableur avec zone d’adresse, barre de formule, en-têtes colonnes A-E et lignes 1-7',
    shapes: [
      RAW('namebox', `
        <rect x="0" y="0" width="75" height="28" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
        <text x="37" y="19" font-size="13" fill="#16a34a" font-weight="800" text-anchor="middle">B3</text>
      `),
      RAW('fbar', `
        <rect x="80" y="0" width="520" height="28" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>
        <text x="92" y="19" font-size="12" fill="#16a34a" font-weight="700">fx</text>
        <line x1="110" y1="4" x2="110" y2="24" stroke="#cbd5e1"/>
        <text x="120" y="19" font-size="12" fill="#1e293b" font-family="Consolas,monospace">=SOMME(B2:B6)</text>
      `),
      RAW('colhead', `
        <g transform="translate(0, 32)">
          <rect x="70" y="0" width="530" height="24" fill="#dcfce7" stroke="#86efac"/>
          <text x="123" y="16" font-size="13" font-weight="800" text-anchor="middle" fill="#166534">A</text>
          <text x="229" y="16" font-size="13" font-weight="800" text-anchor="middle" fill="#166534">B</text>
          <text x="335" y="16" font-size="13" font-weight="800" text-anchor="middle" fill="#166534">C</text>
          <text x="441" y="16" font-size="13" font-weight="800" text-anchor="middle" fill="#166534">D</text>
          <text x="547" y="16" font-size="13" font-weight="800" text-anchor="middle" fill="#166534">E</text>
        </g>
      `),
      RAW('rowhead', `
        <g transform="translate(0, 56)">
          ${[1, 2, 3, 4, 5, 6, 7].map((n, i) => `
            <rect x="0" y="${i * 38}" width="70" height="38" fill="#dcfce7" stroke="#86efac"/>
            <text x="35" y="${i * 38 + 24}" font-size="13" font-weight="800" text-anchor="middle" fill="#166534">${n}</text>
          `).join('')}
        </g>
      `),
      RAW('cell', `
        <g transform="translate(70, 56)">
          ${[0, 1, 2, 3, 4, 5, 6].map((r) => [0, 1, 2, 3, 4].map((c) => `
            <rect x="${c * 106}" y="${r * 38}" width="106" height="38" fill="${c === 1 && r === 2 ? '#fef3c7' : '#ffffff'}" stroke="${c === 1 && r === 2 ? '#f59e0b' : '#e2e8f0'}" stroke-width="${c === 1 && r === 2 ? 2.5 : 1}"/>
          `).join('')).join('')}
          <text x="159" y="100" font-size="12" fill="#b45309" font-weight="800" text-anchor="middle">14.5</text>
        </g>
      `),
      RAW('tabs', `
        <rect x="0" y="336" width="320" height="24" fill="#f1f5f9" stroke="#cbd5e1"/>
        <text x="14" y="352" font-size="11" fill="#16a34a" font-weight="700">Feuille1    Feuille2    + Nouvelle</text>
      `),
    ],
    desc: {
      namebox: 'Zone d’adresse (en haut à gauche) affichant la référence de la cellule active (B3)',
      fbar: 'Barre de formule (longue case supérieure) pour saisir du texte ou une formule de calcul',
      colhead: 'En-têtes de colonnes désignées par des lettres majuscules (A, B, C, D, E)',
      rowhead: 'En-têtes de lignes identifiées par des numéros (1, 2, 3, 4, 5, 6, 7)',
      cell: 'Cellule individuelle du quadrillage à l’intersection d’une colonne et d’une ligne',
      tabs: 'Onglets de classeur situés en bas à gauche pour naviguer entre les feuilles',
    },
  },

  // -------------------------------------------------------------
  // CHARTS : GRAPHISME STATISTIQUE (BARRES, COURBE, SECTEURS)
  // -------------------------------------------------------------
  charts: {
    w: 600,
    h: 360,
    alt: 'Trois types de graphiques statistiques : histogramme à barres colorées, courbe d’évolution et diagramme en secteurs',
    shapes: [
      R(null, 8, 8, 584, 344, 'c0'),
      // Histogramme à barres
      RAW('bar', `
        <g transform="translate(30, 160)">
          <rect x="0" y="90" width="28" height="50" rx="3" fill="#3b82f6"/>
          <rect x="36" y="30" width="28" height="110" rx="3" fill="#10b981"/>
          <rect x="72" y="60" width="28" height="80" rx="3" fill="#f59e0b"/>
          <rect x="108" y="0" width="28" height="140" rx="3" fill="#8b5cf6"/>
        </g>
      `),
      L('axis', 22, 300, 180, 300, 'ln'),
      L(null, 22, 300, 22, 140, 'ln'),
      R('legend', 40, 316, 130, 24, 'c8', '■ Données 1', 13),
      // Courbe
      RAW('line', `
        <g>
          <polyline points="230,260 275,190 320,230 365,150" fill="none" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
          <circle cx="230" cy="260" r="5" fill="#b91c1c"/>
          <circle cx="275" cy="190" r="5" fill="#b91c1c"/>
          <circle cx="320" cy="230" r="5" fill="#b91c1c"/>
          <circle cx="365" cy="150" r="5" fill="#b91c1c"/>
        </g>
      `),
      L(null, 215, 300, 390, 300, 'ln'),
      // Secteurs / Camembert
      RAW('pie', `
        <g transform="translate(0, 0)">
          <path d="${arc(490, 190, 75, 0, 2.2)}" fill="#3b82f6" stroke="#fff" stroke-width="2"/>
          <path d="${arc(490, 190, 75, 2.2, 4.2)}" fill="#10b981" stroke="#fff" stroke-width="2"/>
          <path d="${arc(490, 190, 75, 4.2, 2 * Math.PI)}" fill="#f59e0b" stroke="#fff" stroke-width="2"/>
        </g>
      `),
    ],
    desc: {
      bar: 'Histogramme en colonnes/barres verticales pour comparer des grandeurs',
      axis: 'Axe horizontal et vertical servant de repère pour les valeurs',
      legend: 'Légende explicative décrivant les séries de données représentées',
      line: 'Graphique en courbe reliant des points pour montrer une évolution dans le temps',
      pie: 'Diagramme circulaire en secteurs (camembert) montrant la répartition d’un tout',
    },
  },

  // -------------------------------------------------------------
  // LAN : SCHÉMA RÉSEAU LOCAL PROFESSIONNEL
  // -------------------------------------------------------------
  lan: {
    w: 600,
    h: 360,
    alt: 'Topologie d’un réseau local en étoile avec commutateur switch central, postes clients, serveur et imprimante partagée',
    shapes: [
      L('link', 300, 180, 110, 70),
      L('link', 300, 180, 110, 290),
      L('link', 300, 180, 490, 70),
      L('link', 300, 180, 490, 290),
      L('link', 300, 180, 300, 40),
      L('link', 300, 180, 300, 320),
      RAW('switch', `
        <g transform="translate(230, 155)">
          <rect x="0" y="0" width="140" height="50" rx="8" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
          <!-- Voyants verts clignotants du commutateur -->
          <circle cx="20" cy="16" r="3" fill="#22c55e"/>
          <circle cx="34" cy="16" r="3" fill="#22c55e"/>
          <circle cx="48" cy="16" r="3" fill="#22c55e"/>
          <circle cx="62" cy="16" r="3" fill="#22c55e"/>
          <circle cx="76" cy="16" r="3" fill="#22c55e"/>
          <circle cx="90" cy="16" r="3" fill="#22c55e"/>
          <text x="70" y="38" font-size="11" fill="#f8fafc" font-weight="800" text-anchor="middle">COMMUTATEUR (Switch)</text>
        </g>
      `),
      R('pc', 70, 40, 80, 60, 'c8', '🖥 Poste 1', 12),
      R('pc', 70, 260, 80, 60, 'c8', '🖥 Poste 2', 12),
      R('pc', 450, 40, 80, 60, 'c8', '🖥 Poste 3', 12),
      R('printer', 450, 260, 80, 60, 'c7', '🖨 Imprimante', 11),
      R('server', 255, 4, 90, 46, 'c2', '▦ SERVEUR', 12),
      R('pc', 260, 300, 80, 50, 'c8', '🖥 Poste 4', 12),
    ],
    desc: {
      switch: 'Commutateur central (Switch) où convergent tous les câbles réseau RJ45',
      pc: 'Ordinateur de travail connecté au réseau local pour partager des ressources',
      printer: 'Imprimante réseau partagée accessible par tous les ordinateurs du LAN',
      server: 'Serveur central hébergeant les données et services partagés de l’établissement',
      link: 'Câble réseau Ethernet reliant chaque appareil directement au commutateur',
    },
  },

  // -------------------------------------------------------------
  // ROUTER : ROUTEUR WI-FI MODERNE
  // -------------------------------------------------------------
  router: {
    w: 600,
    h: 360,
    alt: 'Panneau arrière réaliste d’un routeur Wi-Fi avec antennes, port WAN Internet jaune, ports LAN bleus et boutons',
    shapes: [
      R('wifi', 80, 20, 20, 100, 'c6'),
      R('wifi', 500, 20, 20, 100, 'c6'),
      R(null, 40, 110, 520, 190, 'c9'),
      R('wan', 70, 220, 60, 50, 'c4', 'WAN', 12),
      R('lan', 150, 220, 46, 50, 'c5', 'LAN 1', 10),
      R('lan', 202, 220, 46, 50, 'c5', 'LAN 2', 10),
      R('lan', 254, 220, 46, 50, 'c5', 'LAN 3', 10),
      R('lan', 306, 220, 46, 50, 'c5', 'LAN 4', 10),
      R('power', 470, 214, 60, 62, 'c3', '⏻', 28),
      C('leds', 90, 150, 8, 'c2'),
      C('leds', 120, 150, 8, 'c2'),
      C('leds', 150, 150, 8, 'c4'),
      C('leds', 180, 150, 8, 'c6'),
    ],
    desc: {
      wifi: 'Antennes sans-fil pour émettre et recevoir le signal Wi-Fi dans la pièce',
      wan: 'Prise jaune WAN (Internet) reliant le routeur au modem ou à la fibre optique',
      lan: 'Prises bleues LAN pour brancher les ordinateurs et switchs par câble réseau',
      power: 'Bouton marche/arrêt et prise d’alimentation électrique',
      leds: 'Voyants lumineux indiquant l’état de l’alimentation, d’Internet et du Wi-Fi',
    },
  },

  // -------------------------------------------------------------
  // BROWSER : NAVIGATEUR INTERNET MODERNE
  // -------------------------------------------------------------
  browser: {
    w: 600,
    h: 360,
    alt: 'Fenêtre de navigateur web avec onglets, boutons de navigation, barre d’adresse sécurisée HTTPS et page web',
    shapes: [
      R(null, 0, 0, 600, 360, 'c0'),
      R(null, 0, 0, 600, 38, 'c9'),
      R('tab', 10, 6, 160, 32, 'c0', '🌐 InfoPlay Maroc  ✕', 12),
      R('back', 10, 46, 34, 30, 'c8', '◀', 14),
      R('reload', 50, 46, 34, 30, 'c8', '⟳', 16),
      R('urlbar', 92, 46, 490, 30, 'c8', '🔒 https://www.infoplay.ma/cours', 13),
      R('pagezone', 10, 88, 580, 262, 'c1'),
      R(null, 40, 110, 300, 24, 'c8'),
      R(null, 40, 148, 480, 14, 'c8'),
      R(null, 40, 172, 420, 14, 'c8'),
    ],
    desc: {
      tab: 'Onglet du haut permettant de basculer entre plusieurs sites web ouverts',
      back: 'Bouton Précédent (flèche vers la gauche) pour revenir à la page visitée avant',
      reload: 'Bouton Actualiser (flèche circulaire) pour recharger le contenu de la page',
      urlbar: 'Barre d’adresse avec cadenas de sécurité HTTPS indiquant l’URL du site',
      pagezone: 'Zone principale d’affichage où apparaît le contenu du site internet',
    },
  },

  // -------------------------------------------------------------
  // MAIL : MESSAGERIE ÉLECTRONIQUE (E-MAIL)
  // -------------------------------------------------------------
  mail: {
    w: 600,
    h: 360,
    alt: 'Fenêtre de rédaction d’un message électronique avec destinataire, objet, corps du texte et pièce jointe',
    shapes: [
      R(null, 0, 0, 600, 360, 'c0'),
      R('to', 20, 20, 560, 30, 'c8', 'À : professeur.informatique@ecole.ma', 13),
      R('subject', 20, 58, 560, 30, 'c8', 'Objet : Devoir Séance 4 — InfoPlay', 13),
      R('body', 20, 96, 560, 150, 'c1', 'Bonjour Monsieur, voici mon travail sur les réseaux informatiques.', 13),
      R('attach', 20, 256, 220, 34, 'c7', '📎 expose_reseaux.docx (180 Ko)', 12),
      R('send', 430, 304, 150, 42, 'c5', '✉ Envoyer le message', 14),
    ],
    desc: {
      to: 'Champ destinataire (À) contenant l’adresse e-mail de la personne qui recevra le message',
      subject: 'Champ Objet résumant en quelques mots le sujet du message',
      body: 'Corps du message : grande zone de saisie pour rédiger le texte complet',
      attach: 'Pièce jointe : fichier joint au message (document, photo, devoir)',
      send: 'Bouton Envoyer pour expédier le message électronique au destinataire',
    },
  },

  // -------------------------------------------------------------
  // PHISH : ALERTE DE SÉCURITÉ / PHISHING
  // -------------------------------------------------------------
  phish: {
    w: 600,
    h: 360,
    alt: 'Simulation d’un faux message d’alerte (hameçonnage / phishing) pour apprendre à détecter les pièges numériques',
    shapes: [
      R(null, 0, 0, 600, 360, 'c0'),
      R('sender', 20, 14, 560, 28, 'c8', 'Expéditeur : securite@banque-maroc-urgence.xyz', 13),
      R('subject', 20, 48, 560, 28, 'c8', 'Objet : URGENCE : Votre compte sera suspendu sous 24h !', 13),
      R('greet', 20, 90, 300, 28, 'c1', 'Cher client / Chère cliente,', 14),
      R('urgent', 20, 128, 560, 34, 'c4', '⚠ Attention : votre compte est bloqué suite à une activité suspecte.', 13),
      R('ask', 20, 172, 560, 34, 'c1', 'Veuillez saisir immédiatement votre mot de passe et votre code secret.', 13),
      R('link', 20, 230, 280, 40, 'c3', '🔗 Cliquer ici pour débloquer votre compte', 13),
      T(20, 310, 'Ne communiquez jamais vos mots de passe par message électronique.', 12, 'muted'),
    ],
    desc: {
      sender: 'Adresse d’expéditeur suspecte imitant une entreprise connue',
      subject: 'Objet alarmiste utilisant l’urgence et la panique pour piéger la victime',
      greet: 'Formule de politesse générique (« Cher client ») montrant l’absence de personnalisation',
      urgent: 'Message de pression menaçant de bloquer le compte rapidement',
      ask: 'Demande illégitime d’informations confidentielles et secrètes',
      link: 'Bouton ou lien trompeur menant vers un faux site pirate destiné à voler les identifiants',
    },
  },
};

export const regionIds = (scene) =>
  [...new Set((scene.shapes || []).filter((s) => s[0] !== 't' && s[0] !== 'defs' && s[1]).map((s) => s[1]))];
