// « Exemple en classe » pour chaque carte de leçon, dans l'ordre des cartes de parts.js.
// Chaque exemple applique la notion de la carte à une situation simple d'un cours d'informatique
// du tronc commun (ou de la vie de l'établissement pour les sciences de l'éducation).

export const LESSON_EXAMPLES = {
  D1: [
    'Compétence : « résoudre un problème simple par un algorithme ». Objectif de la séance : « écrire un algorithme qui affiche admis/non admis ». Prérequis : lecture, écriture, affectation. Situation : le calcul des résultats du conseil de classe.',
    'Même thème, trois niveaux : « citer les structures de contrôle » (mémoriser), « choisir la structure pour la remise de 10 % » (appliquer), « trouver pourquoi l’algorithme se trompe pour 200 DH » (analyser).',
    'Pendant un projet de site Web en groupes, l’enseignant circule et questionne : l’axe élève–savoir est privilégié ; la synthèse finale au tableau rééquilibre vers l’axe enseignant–savoir.',
    'Le routage IP est étudié à l’université (savoir savant) ; le programme du TC retient « distinguer LAN et WAN » (savoir à enseigner) ; l’enseignant le fait classer à partir de la salle et de la banque (savoir enseigné).',
    'Dévolution : « Trouvez comment le tableur peut calculer seul la remise ». Action : essais. Formulation : chaque binôme explique sa formule. Validation : on teste avec 199 et 200. Institutionnalisation : la règle est écrite au tableau.',
    'Récipients de 5 L et 3 L pour obtenir 4 L : ajouter un récipient de 1 L rend le problème trivial (variable didactique) ; dire « jus » au lieu d’« eau » ne change rien (variable de contexte).',
  ],
  D2: [
    'Séance 1 : l’enseignant montre la recopie d’une formule. Séance 2 : fiche avec étapes. Séance 3 : aide sur demande. Séance 4 : l’élève recopie seul et vérifie ses résultats.',
    'Inès réussit seule une somme ; avec la question « que doit-il se passer pour le taux quand tu recopies ? », elle trouve $B$1 : la question l’a aidée à franchir sa ZPD.',
    'Topaze : « Tu mets un point-virgule… à la fin… de la ligne ? » L’élève tape ce qu’on lui souffle. À éviter : laisser le compilateur signaler l’erreur et faire lire le message.',
    'Projet tableur à trois : un secrétaire saisit, un vérificateur teste les formules, un rapporteur présente ; les rôles tournent à chaque séance et chacun est interrogé sur l’ensemble.',
    '20 élèves sur 28 écrivent la moyenne sans parenthèses : arrêt de l’activité, mise en commun de deux formules au tableau. Deux élèves oublient le $ : aide individuelle pendant que les autres avancent.',
  ],
  D3: [
    'Recueillir : les tableaux produits. Juger : la formule est-elle juste, recopiable, la présentation lisible ? Décider : la majorité bloque sur la recopie, on y revient demain.',
    'Lundi : 5 questions sur les adresses de cellules (diagnostique). Mercredi : l’enseignant observe les recopies (formative). Fin du module : contrôle noté (sommative).',
    'Critère « exactitude des calculs ». Indicateurs : la moyenne de chaque ligne est juste ; la formule se met à jour quand on change une note ; aucune valeur n’est tapée à la main.',
    'Pour « créer un graphique adapté », un QCM sur les types de graphiques manque de validité ; une tâche « produire le graphique des notes et justifier son type » est valide. Une grille commune rend la correction fiable.',
    '✘ « Pas mal. » ✔ « Ton graphique a un titre et une légende ; les axes ne sont pas nommés. Ajoute "Élèves" et "Moyenne" avant de rendre. »',
  ],
  D4: [
    'Évaluer : contrôle sur la conversion binaire. Identifier : 1313 devient 1101 1101. Diagnostiquer : l’élève convertit chiffre par chiffre. Remédier : reconversion et divisions par 2. Réévaluer : convertir 2026.',
    'Épistémologique : la variable « case mémoire » contredit l’inconnue des mathématiques. Didactique : l’analogie des verres. Ontogénétique : l’abstraction encore difficile à 15 ans. Psychologique : la peur de se tromper devant les autres.',
    'Conversion binaire ratée par toute la classe : remédiation collective le jour même. Confusion copier/déplacer chez six élèves : groupe de besoin de 20 minutes. Un élève oublie l’enregistrement : rappel individuel.',
    'Variante : un élève écrit =B2*C2+D2 pour « B2 fois la somme de C2 et D2 ». Même démarche : constat, test avec des valeurs simples (2, 3, 4), règle des priorités, nouvelle formule à construire.',
  ],
  M1: [
    'Distributeur de billets : entrée = carte et code ; traitement = vérification du solde par l’ordinateur de la banque ; résultat = billets et reçu.',
    'On montre un lecteur d’empreintes jamais vu en classe : les élèves doivent le classer (entrée) et justifier (« il fait entrer une information dans l’ordinateur »).',
    'L’enseignant tape un texte, éteint sans enregistrer, rallume : le texte a disparu. Puis il recommence en enregistrant : le fichier est retrouvé sur le disque.',
    'Sur 68 h : 8 h pour M1, 22 h pour M2, 16 h pour M3, 14 h pour M4, et 8 h d’évaluation. Le module 1 installe le schéma entrée → traitement → résultat réutilisé partout.',
  ],
  M2: [
    'Partie système (6 h) : créer l’arborescence « Classe / Matières / Devoirs ». Traitement de texte (10 h) : l’affiche du club. Tableur (6 h) : le tableau des notes.',
    'Deux affiches identiques à l’écran : on active « Afficher les marques » ; l’une montre ········ avant le titre (espaces), l’autre un titre centré par l’outil.',
    'Exercice : copier « devoir.docx » sur la clé, puis le déplacer vers « Archives ». Les élèves comptent les exemplaires après chaque opération et formulent la différence.',
    'Tableau de facture : prix en C2, quantité en D2, TVA en B1. =C2*D2*(1+$B$1) recopié vers le bas reste juste ; sans $, les lignes suivantes visent B2, B3… (vides) et la TVA disparaît du calcul.',
  ],
  M3: [
    'Séances 1-2 : « calculer le prix à payer ». Séances 3-5 : « remise si le montant dépasse 200 DH ». Séances 6-8 : traduire ces algorithmes dans un langage et les exécuter.',
    'Trace de « a ← 5 ; b ← a ; a ← a + 2 » : après la ligne 2, a = 5 et b = 5 ; après la ligne 3, a = 7 et b reste 5.',
    'Tarif d’entrée : SI âge < 12 ALORS prix ← 10 SINON prix ← 20. On teste 11, 12 et 30, en prévoyant chaque résultat avant l’exécution.',
    'Pour « livraison gratuite à partir de 300 DH », le jeu de tests pertinent est 299 (payante) et 300 (gratuite), plus une valeur ordinaire comme 150.',
    'Calculer la moyenne de la classe : décomposer (lire les notes, additionner, diviser), repérer le motif (même opération pour chaque élève), abstraire (seules les notes changent).',
  ],
  M4: [
    'La salle informatique : LAN. Le réseau d’une commune reliant ses bâtiments dans la ville : MAN. Internet : WAN. Les écouteurs Bluetooth du téléphone : PAN.',
    'Dans la salle, le commutateur s’éteint : plus aucun poste n’imprime ni n’accède au serveur, même si les ordinateurs fonctionnent.',
    'Cartes à trier : « câble sous-marin », « routeur », « page Wikipédia », « e-mail ». Les deux premières vont dans « infrastructure (Internet) », les deux dernières dans « services ».',
    'Besoin : poser une question urgente au professeur pendant le TP → chat. Rendre un exposé avec pièce jointe → messagerie. Chercher une définition → moteur de recherche, puis lecture sur le Web.',
  ],
  A1: [
    'وضعية: الأستاذ يقدم مشكلا، ثم يعمل التلاميذ في مجموعات ويتبادلون التفسيرات، وهو يتدخل كوسيط. المؤشرات: تفاعل ووساطة ← النظرية: السوسيوبنائية.',
    'قبل تعريف «المتغير» تعريفا مجردا، يبدأ الأستاذ بعلبة مكتوب عليها «النقطة» يضع فيها 12 ثم يستبدلها بـ15: من المحسوس إلى المجرد.',
    'تلميذ لا يعرف كيف يرتب ملفاته؛ زميله يسأله: «لو كانت هذه أدراج مكتبك، كيف ترتبها؟» فينجح. ثم يُسحب هذا الدعم تدريجيا.',
    'تعزيز إيجابي: «أحسنت» ونقطة إضافية لمن أنهى التمرين. تعزيز سلبي: إعفاء من تمرين ممل لمن أنهى. عقاب: حرمان من الحاسوب (لإضعاف سلوك).',
    'تلميذ يرفض المشاركة خوفا من سخرية الزملاء: يبدأ الأستاذ بأسئلة سهلة ينجح فيها، ويمنع السخرية، ويثمّن محاولته أمام القسم.',
  ],
  A2: [
    'دوركايم: المدرسة تعلّم قواعد العيش المشترك. بارسونز: الشهادة توزع الأدوار. بورديو: تلميذ «مرتاح» مع الحاسوب لأن أسرته تملكه. بودون: أسرة تفضل مسارا قصيرا خوفا من الكلفة.',
    'مجموعة مشروع العرض التقديمي: تتعارف في الحصة الأولى، تختلف في الثانية حول المهام، تتفق على قواعد في الثالثة، وتنجز العرض في الرابعة.',
    'ديمقراطي: الأستاذ يحدد الهدف ويترك للتلاميذ اختيار طريقة الإنجاز معا، فيواصلون العمل حين يخرج لدقائق.',
    'المساواة: ورقة التمارين نفسها للجميع. الإنصاف: نسخة مكبرة لتلميذ ضعيف البصر، وشرح إضافي لمن تعثر، والهدف واحد.',
  ],
  A3: [
    'في جواب امتحاني عن حق التلميذ في التعلم: الدستور (الحق في التعليم)، ثم القانون الإطار 51.17 (الإنصاف والجودة)، ثم النظام الأساسي لتحديد واجبات الأستاذ.',
    'السر المهني: لا يُعرض جدول نقط التلاميذ على شاشة القسم بأسمائهم. السلامة: لا تُترك الأسلاك ممددة في ممرات قاعة المعلوميات.',
    'تلميذ ينشر صورة زميله دون إذن: تشخيص (مساس بالكرامة والمعطيات)، إجراء عاجل (حذف الصورة)، إجراء تربوي (حوار حول الحق في الصورة)، تنسيق (الإدارة إن تكرر)، تتبع.',
  ],
  A4: [
    'المجلس التعليمي للمعلوميات يتفق على شبكة واحدة لتقويم المشاريع؛ مجلس القسم يناقش نتائج كل تلميذ في آخر الدورة.',
    'تشخيص: كثرة حوادث نشر الصور. تخطيط: ورشات حول المواطنة الرقمية. تنفيذ: 6 ورشات. تقويم: هل انخفضت الحوادث؟',
    'مؤشر إنجاز: 40 تلميذا حضروا ورشة السلامة الرقمية. مؤشر أثر: انخفاض الشكايات من نشر الصور من 12 إلى 3 خلال السنة.',
  ],
  A5: [
    'تلميذ يحب الألعاب: يكتشف عبر نادي البرمجة أنه يحب حل المشكلات، فيبحث عن مسارات المعلوميات، ويطلع على شروطها الرسمية، ثم يحدد خطوات للسنة المقبلة.',
    '✘ «البرمجة ليست للبنات». ✔ «هذه مسارات المعلوميات وشروطها، وهذه أعمالك التي تُظهر ميلك للبرمجة؛ القرار لك بعد الحوار مع أسرتك».',
  ],
  A6: [
    'إدماج شكلي: تلميذ على كرسي متحرك في قاعة لا يصل إلى أي حاسوب. تربية دامجة: تهيئة مكان بطاولة مناسبة ليشارك في النشاط نفسه.',
    'درس الشبكات: خطاطة وفيديو ونص (العرض)، والتلميذ يجيب بخطاطة أو بكتابة أو شفهيا (التعبير)، مع اختيار مثال من اهتماماته (الانخراط).',
    'تلميذ يجد صعوبة في استعمال الفأرة: يُسمح له باختصارات لوحة المفاتيح ويُوضع قرب مصدر الضوء، والهدف (إنشاء الجدول) لم يتغير.',
  ],
  A7: [
    'القياس: «حصلت على 12/20». التقويم: «المعيار 2 (الصيغ) غير متحقق، لذلك ستعمل غدا على تمرين في المراجع المطلقة».',
    'المعرفة: «اذكر ثلاثة أجهزة إخراج». الفهم: «اشرح لماذا تُفقد البيانات عند انقطاع الكهرباء». التركيب: «صمم جدولا لتسيير مكتبة القسم».',
    'الصدق: لتقويم «إنشاء جدول» نطلب إنشاء جدول، لا تعريفه. الثبات: مصححان يستعملان نفس الشبكة فيمنحان نقطتين متقاربتين.',
    'الرصد: أخطاء في نسخ الصيغ. التشخيص: الخلط بين المرجع النسبي والمطلق. المعالجة: تمرين مقارنة داخل الحصة. التقويم: جدول جديد بخلية ثابتة.',
  ],
};
