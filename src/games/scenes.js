// Scènes SVG originales (aucune marque, aucun logo). Données pures : pas de DOM ici.
const R = (id, x, y, w, h, cls, text, fs) => ['r', id, x, y, w, h, cls, text, fs];
const L = (id, x1, y1, x2, y2, cls) => ['l', id, x1, y1, x2, y2, cls || 'ln'];
const C = (id, x, y, r, cls, text, fs) => ['c', id, x, y, r, cls, text, fs];
const T = (x, y, text, fs, cls) => ['t', x, y, text, fs || 14, cls || ''];
const P = (id, d, cls) => ['p', id, d, cls];
const arc = (cx, cy, r, a0, a1) => { const p = (a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)]; const [x0, y0] = p(a0), [x1, y1] = p(a1); return `M${cx} ${cy} L${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z`; };

export const SCENES = {
  pc: { w: 600, h: 360, alt: 'Vue intérieure simplifiée d’un ordinateur de bureau (tour ouverte)',
    shapes: [R(null, 10, 10, 580, 340, 'c0'), R('mobo', 30, 30, 380, 300, 'c3'), R('cpu', 190, 100, 70, 70, 'c5', '▦', 30), C('fan', 225, 66, 32, 'c8', '✣', 26),
      R('ram', 300, 60, 14, 130, 'c6'), R('ram', 322, 60, 14, 130, 'c6'), R('ram', 344, 60, 14, 130, 'c6'),
      R('ssd', 440, 50, 120, 30, 'c7', '▤▤▤', 16), R('psu', 440, 250, 140, 80, 'c2', '⚡', 34), L(null, 500, 80, 500, 250, 'ln'), R(null, 60, 230, 200, 70, 'c8', '· · · ·', 14)],
    desc: { mobo: 'Grande plaque verte du fond, sur laquelle tout se branche', cpu: 'Petit carré violet au centre de la plaque', fan: 'Disque gris juste au-dessus du petit carré', ram: 'Trois barrettes longues et fines à droite du carré', ssd: 'Petit rectangle en haut à droite, hors de la plaque', psu: 'Bloc jaune en bas à droite avec un éclair' } },
  desktop: { w: 600, h: 360, alt: 'Bureau d’un ordinateur avec une fenêtre ouverte et une barre en bas',
    shapes: [R('desk', 0, 0, 600, 320, 'c1'), R('icon', 24, 24, 54, 54, 'c4', '📄', 28), R('bin', 524, 252, 54, 54, 'c8', '🗑', 28), R('win', 150, 40, 300, 200, 'c0'), R('win', 150, 40, 300, 28, 'c3'), T(166, 59, 'Document', 14),
      R('taskbar', 0, 320, 600, 40, 'c9'), R('start', 8, 326, 56, 28, 'c2', '⊞', 18), R('tray', 498, 326, 94, 28, 'c7', '14:30', 14)],
    desc: { desk: 'Grand fond bleu clair derrière tout', icon: 'Petit carré orange en haut à gauche', bin: 'Carré gris en bas à droite du fond', win: 'Grand rectangle blanc au centre avec une barre colorée en haut', taskbar: 'Longue bande foncée tout en bas', start: 'Petit bouton vert à l’extrémité gauche de la bande du bas', tray: 'Petit rectangle à l’extrémité droite de la bande du bas' } },
  word: { w: 600, h: 360, alt: 'Fenêtre d’un traitement de texte',
    shapes: [R('title', 0, 0, 600, 26, 'c3', 'Document1 – Traitement de texte', 13), R('tabs', 0, 26, 600, 26, 'c5', 'Fichier   Accueil   Insertion   Mise en page', 13), R('ribbon', 0, 52, 600, 58, 'c8', 'G  I  S   ≡   ▾ 12 ▾   🖼   ▦', 18),
      R('ruler', 0, 110, 600, 14, 'c2'), R('page', 120, 130, 360, 200, 'c0', '', 14), L(null, 140, 160, 440, 160, 'ln'), L(null, 140, 180, 420, 180, 'ln'), L(null, 140, 200, 430, 200, 'ln'), R('status', 0, 336, 600, 24, 'c3', 'Page 1 sur 1     Mots : 0', 13)],
    desc: { title: 'Bande foncée tout en haut', tabs: 'Deuxième bande, avec des mots côte à côte', ribbon: 'Large zone grise avec des boutons et des icônes', ruler: 'Fine bande graduée sous les outils', page: 'Grande feuille blanche au centre', status: 'Fine bande tout en bas' } },
  toolbar: { w: 600, h: 120, alt: 'Barre d’outils de mise en forme du texte',
    shapes: [R('font', 14, 30, 130, 36, 'c0', 'Police ▾', 14), R('size', 152, 30, 56, 36, 'c0', '12 ▾', 14), R('bold', 224, 30, 36, 36, 'c5', 'G', 18), R('italic', 266, 30, 36, 36, 'c5', 'I', 18), R('underline', 308, 30, 36, 36, 'c5', 'S', 18),
      R('color', 358, 30, 44, 36, 'c4', 'A', 20),
      R('alignL', 420, 30, 36, 36, 'c6'), L('alignL', 428, 40, 448, 40), L('alignL', 428, 48, 440, 48), L('alignL', 428, 56, 448, 56),
      R('alignC', 462, 30, 36, 36, 'c6'), L('alignC', 470, 40, 490, 40), L('alignC', 474, 48, 486, 48), L('alignC', 470, 56, 490, 56),
      R('alignR', 504, 30, 36, 36, 'c6'), L('alignR', 512, 40, 532, 40), L('alignR', 520, 48, 532, 48), L('alignR', 512, 56, 532, 56)],
    desc: { font: 'Grande case à gauche', size: 'Petite case avec un nombre', bold: 'Premier bouton bleu, lettre G', italic: 'Deuxième bouton bleu, lettre I', underline: 'Troisième bouton bleu, lettre S', color: 'Bouton orange avec un A', alignL: 'Premier bouton vert : traits collés à gauche', alignC: 'Deuxième bouton vert : traits au milieu', alignR: 'Troisième bouton vert : traits collés à droite' } },
  printdlg: { w: 600, h: 360, alt: 'Boîte de dialogue d’impression',
    shapes: [R(null, 60, 10, 480, 340, 'c0'), R(null, 60, 10, 480, 28, 'c3'), R('printer', 80, 52, 440, 30, 'c8', 'Classe-01', 14), R('range', 80, 92, 210, 36, 'c8', 'Tout', 14), R('copies', 310, 92, 210, 36, 'c8', '1', 16),
      R('orient', 80, 138, 210, 30, 'c8', 'Portrait', 14), R('paper', 310, 138, 210, 30, 'c8', 'A4', 14), R('preview', 80, 184, 200, 156, 'c2'), R(null, 120, 200, 110, 124, 'c0'), R('printbtn', 380, 302, 140, 38, 'c5', 'Imprimer', 16)],
    desc: { printer: 'Longue case en haut', range: 'Case à gauche sous la longue case', copies: 'Case à droite sous la longue case, avec un nombre', orient: 'Case à gauche, deuxième rangée', paper: 'Case à droite, deuxième rangée', preview: 'Grand cadre gris à gauche avec une petite feuille', printbtn: 'Gros bouton bleu en bas à droite' } },
  sheet: { w: 600, h: 360, alt: 'Fenêtre d’un tableur',
    get shapes() {
      const s = [R('namebox', 0, 0, 70, 26, 'c8', 'B3', 14), R('fbar', 76, 0, 524, 26, 'c8', '=SOMME(B2:B6)', 14)];
      'ABCDE'.split('').forEach((l, i) => s.push(R('colhead', 70 + i * 106, 32, 106, 24, 'c3', l, 14)));
      for (let j = 0; j < 7; j++) { s.push(R('rowhead', 0, 56 + j * 38, 70, 38, 'c3', String(j + 1), 14)); for (let i = 0; i < 5; i++) s.push(R('cell', 70 + i * 106, 56 + j * 38, 106, 38, i === 1 && j === 2 ? 'c4' : 'c0')); }
      s.push(R('tabs', 0, 336, 300, 24, 'c5', 'Feuille1    Feuille2', 13)); return s;
    },
    desc: { namebox: 'Petite case en haut à gauche', fbar: 'Longue case en haut à droite', colhead: 'Bande du haut avec des lettres', rowhead: 'Bande de gauche avec des numéros', cell: 'Une case du quadrillage', tabs: 'Petits onglets en bas à gauche' } },
  charts: { w: 600, h: 360, alt: 'Trois graphiques : barres, courbe et secteurs',
    get shapes() {
      const s = [R(null, 8, 8, 584, 344, 'c0')];
      [50, 110, 80, 140].forEach((v, i) => s.push(R('bar', 30 + i * 36, 300 - v, 26, v, ['c5', 'c4', 'c2', 'c6'][i])));
      s.push(L('axis', 22, 300, 180, 300, 'ln'), L(null, 22, 300, 22, 140, 'ln'), R('legend', 40, 316, 130, 24, 'c8', '■ Série 1', 13));
      const pts = [[230, 260], [275, 190], [320, 230], [365, 150]]; for (let i = 0; i < 3; i++) s.push(L('line', ...pts[i], ...pts[i + 1], 'ln thick'));
      pts.forEach((p) => s.push(C(null, p[0], p[1], 5, 'c4'))); s.push(L(null, 215, 300, 390, 300, 'ln'));
      const a = [0, 2.2, 4.2, 2 * Math.PI]; ['c5', 'c4', 'c2'].forEach((c, i) => s.push(P('pie', arc(490, 190, 80, a[i], a[i + 1]), c)));
      return s;
    },
    desc: { bar: 'Rectangles de hauteurs différentes à gauche', axis: 'Ligne horizontale sous les rectangles', legend: 'Petite étiquette sous le graphique de gauche', line: 'Segments reliant des points au centre', pie: 'Disque coupé en parts à droite' } },
  lan: { w: 600, h: 360, alt: 'Schéma d’un réseau local : quatre postes, une imprimante et un serveur reliés à un commutateur',
    shapes: [L('link', 300, 180, 110, 70), L('link', 300, 180, 110, 290), L('link', 300, 180, 490, 70), L('link', 300, 180, 490, 290), L('link', 300, 180, 300, 40), L('link', 300, 180, 300, 320),
      R('switch', 245, 160, 110, 40, 'c5', '⇄', 22), R('pc', 70, 40, 80, 60, 'c8', '🖥', 28), R('pc', 70, 260, 80, 60, 'c8', '🖥', 28), R('pc', 450, 40, 80, 60, 'c8', '🖥', 28), R('printer', 450, 260, 80, 60, 'c7', '🖨', 28), R('server', 265, 4, 70, 40, 'c2', '▦▦', 18), R('pc', 260, 300, 80, 50, 'c8', '🖥', 26)],
    desc: { switch: 'Boîte bleue au centre où arrivent tous les traits', pc: 'Écran gris relié au centre par un trait', printer: 'Appareil orange en bas à droite', server: 'Bloc vert en haut au centre', link: 'Un trait épais qui relie un équipement au centre' } },
  router: { w: 600, h: 360, alt: 'Arrière d’un routeur Wi-Fi',
    shapes: [R('wifi', 90, 20, 16, 100, 'c6'), R('wifi', 494, 20, 16, 100, 'c6'), R(null, 40, 110, 520, 190, 'c9'),
      R('wan', 70, 220, 60, 50, 'c4', '', 14), R('lan', 150, 220, 46, 50, 'c5'), R('lan', 202, 220, 46, 50, 'c5'), R('lan', 254, 220, 46, 50, 'c5'), R('lan', 306, 220, 46, 50, 'c5'), R('power', 470, 214, 60, 62, 'c3', '⏻', 28),
      C('leds', 90, 150, 8, 'c2'), C('leds', 120, 150, 8, 'c2'), C('leds', 150, 150, 8, 'c4'), C('leds', 180, 150, 8, 'c6')],
    desc: { wifi: 'Deux tiges verticales en haut', wan: 'Une prise jaune isolée à gauche', lan: 'Quatre prises bleues alignées au centre', power: 'Bouton rond à droite avec un symbole', leds: 'Quatre petits ronds lumineux en haut à gauche' } },
  browser: { w: 600, h: 360, alt: 'Fenêtre d’un navigateur web',
    shapes: [R(null, 0, 0, 600, 360, 'c0'), R(null, 0, 0, 600, 38, 'c9'), R('tab', 10, 6, 150, 32, 'c0', 'Accueil  ✕', 13), R('back', 10, 46, 34, 30, 'c8', '◀', 14), R('reload', 50, 46, 34, 30, 'c8', '⟳', 16),
      R('urlbar', 92, 46, 440, 30, 'c8', '🔒 https://www.ecole.exemple', 14), R('pagezone', 10, 88, 580, 262, 'c1'), R(null, 40, 110, 300, 24, 'c8'), R(null, 40, 148, 480, 14, 'c8'), R(null, 40, 172, 420, 14, 'c8')],
    desc: { tab: 'Petit onglet en haut à gauche', back: 'Premier bouton, flèche vers la gauche', reload: 'Deuxième bouton, flèche en cercle', urlbar: 'Longue case avec un cadenas', pagezone: 'Grande zone bleu clair en dessous' } },
  mail: { w: 600, h: 360, alt: 'Fenêtre de rédaction d’un e-mail',
    shapes: [R(null, 0, 0, 600, 360, 'c0'), R('to', 20, 20, 560, 30, 'c8', 'prof.info@ecole.exemple', 14), R('subject', 20, 58, 560, 30, 'c8', 'Devoir d’informatique', 14), R('body', 20, 96, 560, 150, 'c1', 'Bonjour Madame, voici mon devoir.', 14),
      R('attach', 20, 256, 220, 34, 'c7', '📎 devoir.docx', 14), R('send', 450, 304, 130, 40, 'c5', 'Envoyer', 16)],
    desc: { to: 'Première longue case, avec une adresse', subject: 'Deuxième longue case, avec un titre court', body: 'Grande zone bleu clair avec le texte du message', attach: 'Étiquette orange avec un trombone', send: 'Gros bouton bleu en bas à droite' } },
  phish: { w: 600, h: 360, alt: 'Faux message d’alerte à analyser',
    shapes: [R(null, 0, 0, 600, 360, 'c0'), R('sender', 20, 14, 560, 28, 'c8', 'securite@banque-maroc-verif.exemple', 14), R('subject', 20, 48, 560, 28, 'c8', 'Information importante', 14), R('greet', 20, 90, 300, 28, 'c1', 'Cher client,', 15),
      R('urgent', 20, 128, 560, 34, 'c4', 'Sans réponse sous 24 h, votre compte sera bloqué !', 14), R('ask', 20, 172, 560, 34, 'c1', 'Envoyez-nous votre mot de passe et votre code secret.', 14), R('link', 20, 230, 260, 40, 'c3', 'Cliquez ici maintenant', 15), T(20, 310, 'Merci de votre confiance.', 13, 'muted')],
    desc: { sender: 'Première ligne, adresse de l’expéditeur', subject: 'Deuxième ligne, objet du message', greet: 'Première ligne du texte, courte, à gauche', urgent: 'Phrase sur fond orange', ask: 'Phrase qui demande quelque chose', link: 'Bouton rouge' } },
};
export const regionIds = (scene) => [...new Set((scene.shapes || []).filter((s) => s[0] !== 't' && s[1]).map((s) => s[1]))];
