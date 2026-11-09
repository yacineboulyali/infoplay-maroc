import { match, quiz } from '../dsl.js';
import { STUDENT_ILLUSTRATIONS } from '../student-illustrations.js';

// Each row supplies an illustration or a labelled diagram, a vocabulary set,
// and a scenario. The index list reuses activities at their original URLs.
export const lessonPlans = [
  [
    [[], 'm1-s1-a1-q01', [['Donnée','Une valeur brute, comme 24'],['Information','Une valeur interprétée, comme 24 postes prêts'],['Digitalisation','Le passage du registre papier au formulaire numérique']], ['Quel exemple illustre une digitalisation ?', 'Remplacer le registre papier par un formulaire partagé', 'Changer la couleur du registre', 'Compter les pages du registre']],
    [[4], 'm1-s1-a3-q04', [['Entrée','La saisie d’une donnée au clavier'],['Traitement','L’exécution des instructions par le processeur'],['Sortie','La restitution du résultat à l’écran']], ['Quel geste relève du stockage ?', 'Enregistrer le rapport sur le SSD', 'Taper une lettre', 'Afficher la lettre']],
    [[0,1], 'm1-s2-a1-q04', [['CPU','Exécute les instructions'],['RAM','Garde les données de travail temporairement'],['SSD','Conserve les fichiers en mémoire flash']], ['Quel composant garde le fichier après l’arrêt ?', 'SSD', 'RAM', 'CPU']],
    [[2,3], 'm1-s2-a1-q01', [['Clavier','Saisit le texte'],['Scanner','Transforme une fiche papier en fichier'],['HDMI','Transporte l’image et le son numériques']], ['À quel port brancher une fiche Ethernet RJ45 ?', 'RJ45', 'HDMI', 'Jack 3,5 mm']],
    [[6,5], null, [['Système d’exploitation','Gère le matériel et lance les programmes'],['Application','Réalise une tâche comme rédiger un rapport'],['Utilitaire','Protège ou entretient le poste']], ['Quel logiciel gère le matériel ?', 'Windows', 'Word', 'VLC']],
    [[], null, [['LAN','Réseau limité à une salle ou un bâtiment'],['WAN','Réseau qui relie des sites éloignés'],['Cloud','Service distant de stockage ou de partage']], ['Quel réseau relie les postes de la même salle ?', 'LAN', 'WAN', 'Aucun réseau']],
    [[], null, [['Fichier','Données enregistrées sous un nom'],['Dossier','Emplacement qui regroupe des fichiers'],['Extension','Suffixe comme .pdf qui indique le type du fichier']], ['Quel geste prépare une récupération après une panne ?', 'Sauvegarder les fichiers', 'Renommer les fichiers', 'Changer le fond d’écran']],
  ],
  [
    [[0], 'm1-s1-a1-q02', [['Donnée','Le nombre brut 24'],['Information','La phrase 24 postes ont été contrôlés'],['Digitalisation','Le remplacement du registre papier par un formulaire partagé']], ['Quel élément donne un sens au nombre 24 ?', 'Le contexte des postes contrôlés', 'La couleur du texte', 'La taille de la police']],
    [[1,2], null, [['Serveur','Fournit des ressources à d’autres postes'],['Superordinateur','Exécute des calculs massifs'],['Application','Permet de réaliser une tâche précise']], ['Quel équipement utiliser pour centraliser les fichiers du service ?', 'Serveur', 'Liseuse', 'Imprimante']],
    [[3], null, [['LAN','Relie les postes d’un bâtiment'],['Ethernet','Relie des équipements par câble réseau'],['Wi-Fi','Relie des équipements sans câble réseau']], ['Quel équipement peut être partagé sur le réseau local ?', 'Une imprimante réseau', 'Un câble débranché', 'Un carnet papier']],
    [[4], null, [['Synchronisation','Maintient les données cohérentes entre appareils'],['Sauvegarde','Conserve une copie récupérable'],['Autorisation','Donne à une application accès à une ressource']], ['Quel réglage limite l’accès aux données personnelles ?', 'Les autorisations des applications', 'La luminosité', 'Le volume']],
    [[5,6], 'm1-s2-a1-q03', [['Scanner','Transforme une page papier en fichier'],['Toner','Poudre utilisée par une imprimante laser'],['Résolution','Nombre de points par unité de longueur']], ['Quand vérifier le cadrage de la fiche ?', 'Dans l’aperçu avant la numérisation', 'Après avoir jeté la fiche', 'Avant de poser la fiche']],
  ],
  [
    [[0,1], 'm2-s2-a1-q01', [['Barre des tâches','Affiche les applications ouvertes'],['Zone de notification','Affiche l’heure, le son et le réseau'],['Confidentialité','Gère l’accès à la caméra et au microphone']], ['Où régler la taille du texte ?', 'Dans les réglages d’affichage', 'Dans la Corbeille', 'Dans la liste des imprimantes']],
    [[2,3,4], null, [['Raccourci','Pointe vers un fichier ou dossier'],['Archive ZIP','Regroupe des fichiers compressés'],['Chemin','Indique l’emplacement d’un élément']], ['Quelle action permet de retrouver un élément supprimé dans la Corbeille ?', 'Restaurer', 'Compresser', 'Renommer']],
    [[5], null, [['Ctrl+C','Copier la sélection'],['Ctrl+X','Couper la sélection'],['Ctrl+V','Coller le contenu du presse-papiers']], ['Quelle combinaison verrouille la session ?', 'Windows+L', 'Ctrl+P', 'Ctrl+A']],
    [[6,8], 'm1-s2-a1-q10', [['Octet','Unité composée de huit bits'],['Clé USB','Support amovible utilisable hors ligne'],['Sauvegarde','Copie que l’on peut restaurer']], ['Combien font 16 bits ?', '2 octets', '4 octets', '16 octets']],
    [[7], null, [['DIR','Liste les fichiers du dossier courant'],['MKDIR','Crée un dossier'],['CD ..','Remonte au dossier parent']], ['Quelle commande efface uniquement l’affichage ?', 'CLS', 'DEL', 'EXIT']],
  ],
];

export function organizeLessons(topics, existing, plans) {
  const activities = [...existing];
  const lessons = topics.map(([title, entries], index) => {
    const [reuse, imageId, terms, [question, answer, ...wrong]] = plans[index];
    const indices = [...reuse];
    const extras = [
      { mech: 'type-name', title: 'Écrire le nom ou la commande', objective: 'Écris le terme correspondant à chaque indice du cours.', data: { terms } },
      match('Relier les notions à leur rôle', 'Glisse chaque carte vers sa définition ou utilise le clavier.', terms),
      quiz('Appliquer la notion', 'Choisis la réponse adaptée à la situation.', [[question, [answer, ...wrong]]]),
    ];
    if (reuse.some((i) => existing[i].mech === 'match')) extras.splice(1, 1);
    while (indices.length < 3) {
      indices.push(activities.length);
      activities.push(extras.shift());
    }
    return { title, entries, indices, terms, image: STUDENT_ILLUSTRATIONS[imageId] };
  });
  return { activities, lessons, sequence: lessons.flatMap((lesson) => lesson.indices) };
}
