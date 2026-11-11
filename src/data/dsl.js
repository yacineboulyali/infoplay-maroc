// Petit langage de description des activités : données seulement, aucun DOM.
const A = (mech, title, obj, data, x = {}) => ({ mech, title, objective: obj, data, ...x });
export const match = (title, obj, pairs, x) => A('match', title, obj, { pairs }, x);
export const sort = (title, obj, cats, items, x) => A('sort', title, obj, { cats, items }, x);
export const order = (title, obj, steps, x = {}) => A('order', title, obj, { steps, eq: x.eq, explain: x.explain }, x);
export const fill = (title, obj, lines, x) => A('fill', title, obj, { lines }, x);
export const quiz = (title, obj, qs, x) => A('quiz', title, obj, { qs }, x);
export const hot = (title, obj, scene, prompts, x = {}) => A('hot', title, obj, { scene, prompts, lines: x.lines }, x);
export const asm = (title, obj, parts, slots, x) => A('asm', title, obj, { parts, slots }, x);
export const net = (title, obj, devices, links, x) => A('net', title, obj, { devices, links }, x);
export const robot = (title, obj, levels, x) => A('robot', title, obj, { levels }, x);
export const prog = (title, obj, mode, tasks, x) => A('prog:' + mode, title, obj, { mode, tasks }, x);
export const sim = (title, obj, view, cfg, tasks, x) => A('sim:' + view, title, obj, { view, cfg, tasks }, x);

export const INSTR = {
  match: 'Clique sur un élément de la colonne de gauche, puis sur la réponse qui lui correspond à droite. Pour changer, recommence avec le même élément.',
  sort: 'Clique sur une carte, puis sur la catégorie où la ranger (tu peux aussi la faire glisser). Clique sur une carte rangée pour la reprendre.',
  order: 'Remets les éléments dans le bon ordre avec les boutons ▲ et ▼, puis clique sur « Vérifier ».',
  fill: 'Dans chaque phrase, choisis dans la liste le mot ou l’expression qui convient.',
  quiz: 'Lis chaque question et choisis une seule réponse.',
  hot: 'Choisis une consigne dans la liste, puis clique sur la zone correspondante de l’image (ou choisis-la dans la liste de zones).',
  asm: 'Choisis un composant, puis clique sur l’emplacement qui lui correspond dans le boîtier.',
  net: 'Relie les équipements deux par deux en cliquant dessus. Ne branche que les câbles nécessaires.',
  robot: 'Programme le robot niveau par niveau : ajoute des commandes, exécute, corrige. Clique sur « Vérifier » quand tu as fini.',
  prog: 'Réponds en suivant l’algorithme pas à pas, comme le ferait l’ordinateur.',
  sim: 'Fais l’action demandée dans la simulation : chaque étape se valide automatiquement dès qu’elle est réussie. Rien de réel n’est modifié sur ton ordinateur.',
};
export const HINT = {
  match: 'Commence par les associations dont tu es sûr(e), les autres deviennent plus faciles.',
  sort: 'Demande-toi ce que fait chaque élément : il reçoit, transforme, affiche ou conserve ?',
  order: 'Repère d’abord la première et la dernière étape.',
  fill: 'Relis la phrase à voix basse avec chaque proposition.',
  quiz: 'Élimine d’abord les réponses qui n’ont aucun rapport avec la question.',
  hot: 'Regarde la forme, la position et le texte de chaque zone avant de cliquer.',
  asm: 'Les indices décrivent la forme et la place de chaque emplacement.',
  net: 'Chaque poste doit être relié au commutateur, pas directement aux autres.',
  robot: 'Dessine le chemin sur une feuille puis traduis-le en commandes.',
  prog: 'Note la valeur de chaque variable après chaque ligne.',
  sim: 'Relis l’étape : elle décrit exactement l’état attendu à la fin.',
};
