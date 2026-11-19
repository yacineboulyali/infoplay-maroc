// Intitulés lisibles des notions, affichés dans le bilan de l’évaluation diagnostique des compétences.
export const CONCEPT_TITLES = {
  // Didactique et programme du TC (fr)
  topaze: 'Effet Topaze', jourdain: 'Effet Jourdain', glissement: 'Glissement métacognitif', contrat: 'Contrat didactique',
  devolution: 'Dévolution et situation adidactique', institutionnalisation: 'Institutionnalisation', transposition: 'Transposition didactique',
  psr: 'Pratiques sociales de référence', triangle: 'Triangle pédagogique', variable: 'Variable didactique / de contexte',
  integration: 'Situation d’intégration', sp: 'Situation-problème', transfert: 'Transfert des apprentissages', bloom: 'Taxonomie de Bloom',
  objectif: 'Objectif opérationnel', alignement: 'Alignement pédagogique', competence: 'Compétence et APC', regle23: 'Règles des 2/3 et des 3/4',
  critere: 'Critères et indicateurs', halo: 'Biais de notation (halo)', validite: 'Validité et fiabilité', feedback: 'Feedback et feedforward',
  autoeval: 'Autoévaluation et autorégulation', normcrit: 'Évaluation normative / critériée', outils: 'Outils d’évaluation',
  fonctions: 'Fonctions de l’évaluation', obstacles: 'Types d’obstacles', erreur: 'Statut de l’erreur', representations: 'Représentations des élèves',
  strategies: 'Stratégies de remédiation', remediation: 'Démarche de remédiation', etayage: 'Étayage', zpd: 'Zone proximale de développement',
  methodes: 'Approches, méthodes et techniques', cooperatif: 'Travail coopératif', differenciation: 'Différenciation pédagogique',
  consigne: 'Consigne', questionnement: 'Questionnement et temps d’attente', motivation: 'Motivation', discipline: 'Gestion de classe',
  panne: 'Incidents techniques en salle', active: 'Pédagogie active', prerequis: 'Prérequis', planification: 'Planification et progression',
  tests: 'Test et débogage d’algorithmes', affectation: 'Variable et affectation', pensee: 'Pensée informatique', strcmp: 'Chaînes en langage C',
  structures: 'Structures séquentielle et sélective', programme: 'Algorithme et programme', officiel: 'Orientations officielles du TC',
  ram: 'Mémoires (RAM, disque)', peripheriques: 'Composants et périphériques', ipo: 'Traitement de l’information', logiciels: 'Système et fichiers',
  texte: 'Traitement de texte', tableur: 'Tableur et formules', reseaux: 'Réseaux informatiques', internet: 'Internet et ses services',
  esprit: 'Esprit critique et usages responsables',
  // Sciences de l'éducation (ar)
  taaziz: 'السلوكية والتعزيز', piaget: 'البنائية ومراحل بياجي', vygotsky: 'السوسيوبنائية والسقالة', cognitive: 'المعرفية والحمل المعرفي',
  meta: 'ما وراء المعرفة', bandura: 'التعلم الاجتماعي والفعالية الذاتية', erikson: 'المراهقة والهوية', weiner: 'العزو السببي',
  motiv: 'الدافعية', gardner: 'الذكاءات المتعددة', 'erreur-ar': 'الخطأ وصورة الذات', multi: 'تحليل الوضعية المهنية',
  durkheim: 'دوركايم والتنشئة', bourdieu: 'بورديو وإعادة الإنتاج', boudon: 'بودون والقرار الأسري', parsons: 'بارسونز والوظيفية',
  lewin: 'دينامية الجماعة والقيادة', moreno: 'السوسيوغرام', tuckman: 'مراحل تكون الجماعة', communication: 'التواصل',
  pygmalion: 'أثر بيغماليون', equite: 'المساواة والإنصاف', loi: 'المرجعيات القانونية', secret: 'السر المهني والمعطيات',
  securite: 'السلامة والتأطير', sanction: 'التقويم والسلوك', decision: 'تسلسل القرار المهني', conseils: 'مجالس المؤسسة',
  projet: 'مشروع المؤسسة ومؤشراته', vie: 'الحياة المدرسية', orientation: 'التوجيه والمشروع الشخصي', udl: 'التصميم الشامل للتعلم',
  inclusion: 'التربية الدامجة والتكييف', 'differenciation-ar': 'البيداغوجيا الفارقية', bloomAR: 'صنافة بلوم', mastery: 'التعلم من أجل التمكن',
  qualite: 'صدق الأداة وثباتها', regle: 'قاعدة الثلثين', soutien: 'مراحل الدعم', typesEval: 'أنواع التقويم ووظائفه',
};
// Certains identifiants existent dans les deux langues : on choisit l'intitulé selon la langue de la partie.
export const conceptTitle = (id, lang) => (lang === 'ar' && CONCEPT_TITLES[id + '-ar']) || CONCEPT_TITLES[id] || id;
