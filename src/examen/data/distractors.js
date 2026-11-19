// Types de distracteurs : quand l'élève choisit une mauvaise option, on reconnaît sa « famille »
// pour lui expliquer pourquoi elle ne convient pas, sans révéler la bonne réponse au premier essai.
// Les mêmes familles servent à l'indice d'élimination (« écarte l'option … »).
// `re` est testé sur le texte de l'option, en minuscules et sans accents (FR) ou sans tachkil (AR).

export const DISTRACTORS_FR = [
  { id: 'aucune', re: /^aucune de ces reponses/, label: 'option « aucune »',
    msg: 'Tu as choisi « aucune de ces réponses ». Or l’une des propositions convient : relis chacune en la confrontant à la notion clé.' },
  { id: 'restitution', re: /copi|dict|recit|memoris|recopier|liste a memoriser|par coeur|definition (seule|isolee)|le resume|le titre|lire le manuel|faire lire|expose sur l.histoire|projeter un film/, label: 'pure restitution',
    msg: 'Cette option reste au niveau « mémoriser » : l’élève restitue sans mobiliser ses ressources. L’examen valorise une activité cognitive réelle (classer, analyser, justifier, produire).',
    src: 'Anderson & Krathwohl (2001), taxonomie de Bloom révisée.' },
  { id: 'punitif', re: /sanction|retir|puni|humili|exclu|lui retirer|des points|faire recopier dix|mettre une mauvaise|donner une note|noter|une note|controle note/, label: 'réponse punitive ou notation seule',
    msg: 'Sanctionner ou noter ne dit rien de la cause de l’erreur et n’aide pas à apprendre. L’erreur se diagnostique et s’exploite avant toute décision.',
    src: 'Astolfi (1997), L’erreur, un outil pour enseigner.' },
  { id: 'passif', re: /^ignorer|^continuer|passer (au|a la)|changer de (chapitre|manuel)|abandonn|nouveau module|module suivant|attendre|ne rien faire|supprimer/, label: 'laisser la difficulté de côté',
    msg: 'Passer à la suite laisse la difficulté s’installer. Toute régulation suit un constat : observer, diagnostiquer, intervenir, puis vérifier l’effet.',
    src: 'Allal (1979), régulation et évaluation formative.' },
  { id: 'reponse', re: /donner (directement )?la (reponse|correction|solution)|corriger (lui|a sa place)|faire a sa place|donner les reponses|donner directement le cours/, label: 'donner la réponse',
    msg: 'Donner la réponse retire le problème à l’élève : il n’a plus rien à chercher (effet Topaze). On préfère une question intermédiaire ou un indice.',
    src: 'Brousseau (1998), Théorie des situations didactiques.' },
  { id: 'repeter', re: /repeter|a l.identique|meme cours|refaire le meme|reexpliquer de la meme/, label: 'répéter à l’identique',
    msg: 'Si la première explication n’a pas suffi, la répéter telle quelle a peu de chances de réussir : il faut changer d’entrée (autre exemple, autre représentation, autre modalité).',
    src: 'Astolfi (1997) ; Perrenoud (1998).' },
  { id: 'bilan', re: /sommativ|certificativ|examen final|administrative|evaluation finale|controle de fin/, label: 'évaluation de bilan',
    msg: 'Une évaluation sommative ou certificative fait un bilan après l’apprentissage. Elle ne sert pas à réguler pendant la séance.',
    src: 'Scriven (1967) ; Bloom, Hastings & Madaus (1971).' },
  { id: 'vague', re: /^(comprendre|connaitre|savoir|sensibiliser|apprendre)\b/, label: 'verbe non observable',
    msg: '« Comprendre », « connaître » ou « savoir » ne s’observent pas directement. Un objectif opérationnel utilise un verbe d’action vérifiable.',
    src: 'Mager (1962), Preparing Instructional Objectives.' },
  { id: 'hasard', re: /au hasard|la plus longue|seulement un mot-cle|seulement la difficulte|augmenter (seulement )?la difficulte|plus difficile/, label: 'choix sans fondement',
    msg: 'Ce choix ne repose sur aucun diagnostic. Une décision professionnelle part de l’objectif et de ce que fait réellement l’élève.' },
];

export const DISTRACTORS_AR = [
  { id: 'aucune', re: /^لا شيء مما سبق/, label: 'خيار «لا شيء مما سبق»',
    msg: 'اخترت «لا شيء مما سبق»، لكن أحد الاقتراحات صحيح. أعد قراءة كل اقتراح وقارنه بالمفهوم المحوري.' },
  { id: 'punitif', re: /عقاب|سخريه|التشهير|المقارنه المحرجه|الطرد|خفض النقطه|التوبيخ|الاقصاء/, label: 'جواب عقابي',
    msg: 'العقاب أو السخرية لا يعالجان سبب الصعوبة، ويمسان كرامة المتعلم ودافعيته. الموقف المهني: تشخيص ثم دعم.',
    src: 'Astolfi (1997) ؛ Deci & Ryan (1985).' },
  { id: 'passif', re: /^تجاهل|الانتظار|لا شيء يفعل|تاجيل|ترك/, label: 'ترك الصعوبة',
    msg: 'تجاهل الصعوبة يتركها تتفاقم. كل تدخل يبدأ برصد ثم تشخيص ثم معالجة ثم تتبع.' },
  { id: 'humeur', re: /المزاج|عشوائي|بالصدفه|حسب الرغبه/, label: 'قرار بلا معايير',
    msg: 'قرار لا يقوم على معايير واضحة لا يمكن تبريره مهنيا.' },
  { id: 'restitution', re: /الحفظ|الاستظهار|النقل|نسخ/, label: 'حفظ واسترجاع فقط',
    msg: 'هذا الاقتراح يقف عند الحفظ والاسترجاع، بينما الامتحان المهني يقيس القدرة على التحليل وربط المؤشرات بالنظرية.' },
];
