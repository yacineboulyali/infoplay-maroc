import { ACTIVITIES, CATALOG } from '../../src/data/index.js';
import { SCENES } from '../../src/games/scenes.js';
import { mkdirSync, writeFileSync, readFileSync, existsSync, renameSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
mkdirSync(join(root, 'assets'), { recursive: true });
const logFile = join(root, 'generation-log.json');
const generated = existsSync(logFile) ? JSON.parse(readFileSync(logFile, 'utf8')) : {};
const integrationFile = join(root, 'integration-report.json');
const integration = existsSync(integrationFile) ? JSON.parse(readFileSync(integrationFile, 'utf8')) : null;
const generationStateFile = join(root, 'generation-state.json');
const generationState = existsSync(generationStateFile) ? JSON.parse(readFileSync(generationStateFile, 'utf8')) : null;
const directionsFile = join(root, 'visual-directions.json');
const findingsFile = join(root, 'review-findings.json');
const findings = existsSync(findingsFile) ? JSON.parse(readFileSync(findingsFile, 'utf8')) : [];
const directions = { ...(existsSync(directionsFile) ? JSON.parse(readFileSync(directionsFile, 'utf8')) : {}), ...Object.fromEntries(findings.map(f => [f.id, f.direction])) };
const sourceFields = { match: 'pairs', sort: 'items', order: 'steps', fill: 'lines', quiz: 'qs', hot: 'prompts', asm: 'parts', net: 'devices', robot: 'levels', prog: 'tasks', sim: 'tasks' };
const placements = {
  match: 'Beside the left-hand concept only; never repeat the same identifying picture beside its matching definition.',
  sort: 'Inside the movable item card; never display its correct category.',
  order: 'Inside the step card; never bake the step number or order into the image.',
  fill: 'Beside the sentence; never show the missing word or a visual solution.',
  quiz: 'Above the question, outside the answer buttons; illustrate the situation rather than the correct choice.',
  hot: 'Supporting thumbnail beside the instruction. Keep the existing clickable scene and region IDs; never replace it with an uncalibrated bitmap.',
  asm: 'Inside the component picker; retain the existing assembly slots and coordinates.',
  net: 'Inside the device node, retaining node ID, position and cable interactions.',
  robot: 'Beside the level heading; retain the grid, obstacles, start, goal and all movement rules.',
  prog: 'Beside the task heading; retain code as selectable HTML text and never show computed output.',
  sim: 'Beside the current task; retain every simulation control and validation rule.',
};
function clean(text) { return String(text).replace(/\[\[[^\]]+\]\]/g, '[blank]'); }
const questions = ACTIVITIES.flatMap(a => {
  const field = sourceFields[a.type];
  return (a.data[field] || []).map((item, index) => {
    const text = clean(typeof item === 'string' ? item : Array.isArray(item) ? item[a.type === 'hot' ? 1 : 0] : item.name || item.label || `Robot level ${index + 1}`);
    const key = `${a.id}-q${String(index + 1).padStart(2, '0')}`;
    const sceneText = a.type === 'hot' && a.data.scene === 'phish'
      ? SCENES.phish.shapes.find(shape => shape[1] === item[0])?.[7]
      : null;
    const itemConstraints = sceneText
      ? `This is a training thumbnail for one field of an existing fictional phishing-message simulation. Draw ONLY that individual message field close up. If readable text is necessary, copy this exact existing scene text: ${JSON.stringify(sceneText)}. Otherwise use neutral text strokes. Never invent a different email address, URL, greeting or message. Do not draw the whole email or add advice, answers, other fields or links.`
      : a.type === 'prog'
      ? 'Required composition: one close-up programming worksheet or code-editor card with an EMPTY output/trace area. Do not print input guesses, final variable values, branch choices, calculations or a solved/corrected version of the program. Any readable code must be copied literally from the supplied item; neutral short code strokes are safer.'
      : a.type === 'fill'
        ? 'CRITICAL FOR BLANKS: every [blank] must stay visibly EMPTY. Never print its completion anywhere else in the image, including another example line, caption, heading, label or footer. Do not expand an incomplete code line into a whole program. The activity title is context only: do not copy its keywords as answers. Prefer one incomplete line or a relevant neutral object without readable explanatory text.'
      : a.moduleId === 3 && a.type === 'quiz'
        ? 'Required composition: ONE close-up neutral code-editor card with short unreadable code strokes and a question mark. Do not typeset the program, repair its syntax, point to an error position, highlight the faulty token, print a correction or show a computed output. The original editable/readable code stays in the game outside this image.'
      : a.type === 'order'
        ? 'Required composition: depict ONLY the single supplied step or action. Never include earlier/later steps, a whole program, a complete procedure, a numbered list, a full flowchart or arrows that reveal the sequence. For a code item, typeset only the literal supplied line/comment, without surrounding instructions.'
      : a.moduleId === 3 && a.type === 'sort' && a.sessionIndex === 4
        ? `Required composition: a close-up expression card containing exactly "${text}". Preserve this expression even when mathematically false. Do not evaluate, correct, classify or mark it; no check marks, crosses, true/false labels or success/failure colors.`
        : a.moduleId === 3 && a.type === 'sort' && a.sessionIndex === 5
          ? `Required composition: a neutral close-up school grade card with the literal given value "${text}". No invented grades, class averages, pass/fail text, trophies, red/green grading, smiling/sad faces or outcome indicators.`
          : a.moduleId === 3 && a.sessionIndex === 7
            ? 'Technical disambiguation: Python, Scratch, JavaScript, C and Pascal are PROGRAMMING LANGUAGES; never draw a realistic snake, scratch marks or a portrait of Pascal. IDLE, Thonny and Visual Studio Code are code editors, not sleeping people or human names. Writer is a word processor; Calc is a SPREADSHEET application, never a handheld calculator; Lecteur de musique is a music player. Use a close-up recognizable badge or application element for the explicitly named item, without printing its sorting category.'
            : a.moduleId === 4 && a.sessionIndex === 5 && a.type === 'sim'
              ? 'Required composition: a close-up browser search field or navigation control reflecting only the stated starting action. Copy the supplied search words literally when useful. Do not invent search results, result rankings, place answers, page content or the correct destination.'
              : '';
    const context = a.moduleId === 2 && a.sessionIndex >= 4 && a.sessionIndex <= 8
      ? 'Technical meaning: this is a WORD-PROCESSING document activity. Image means an inserted photograph/picture, NOT a monitor. Tableau means a small data table with rows and columns, NOT a whiteboard and NOT an Excel application. Forme means an inserted circle/rectangle/arrow, NOT a folder. Numéro de page means a numeral in the document footer, NOT a printer. Titre and texte mean printed text regions on the paper document, NOT a monitor. Format du papier means a sheet with paper dimensions, NOT a printer. A font selector is a dropdown field, a title bar is the thin top strip of a software window, and a status bar is the thin bottom strip; show these strips close up when named.'
      : a.moduleId === 2 && a.sessionIndex >= 9
        ? 'Technical meaning: this is SPREADSHEET education. Cellule is a spreadsheet cell, NOT a biological cell. Ligne is a cell row, colonne is a cell column (not an architectural pillar), feuille is a spreadsheet worksheet (not a plant leaf), classeur is a digital workbook. Plage means a rectangular range of cells, NEVER a beach. Adresse means a cell reference such as A1, not a postal address. Barre de formule is the formula-entry field. Graphique means a statistical data chart, not an illustration. Secteur is a pie-chart wedge. Show the precise named element close up, not a whole unrelated computer.'
      : a.moduleId === 4
        ? 'Technical meaning: this is computer networking and Internet education. Switch is a network switch, serveur is a computer server (not a waiter), client is a network computer, routeur is a networking router, port is a network socket (not a harbor), moteur de recherche is a search interface (not an engine), Web means websites (not a spider web), sources means information sources (not water springs). LAN, MAN, WAN and PAN are network scales; MAN never means a human man and PAN never means a cooking pan. Bus, étoile and anneau refer to network topologies, not a vehicle, a celestial star or jewelry. Phishing and virus refer to digital security threats.'
        : a.moduleId === 3
          ? 'Technical meaning: this is algorithmic programming education. Variables and constants refer to computer memory/data, expression means a code expression (not a facial expression), instruction means a code instruction, boucle means an instruction loop (not hair), and langage means a programming language. Lire is program input and Écrire is program output. Never invent or display a computed result or corrected code when the learner must supply it.'
          : a.moduleId === 2 && a.sessionIndex === 3
            ? 'Technical meaning: filenames ending .png/.jpg are image files: draw a picture-file card containing the subject named by the filename, never a folder. .mp3/.wav are audio files, .docx is a text document, .xlsx is a spreadsheet. A folder is only for an item explicitly naming a dossier.'
            : 'Technical meaning: all subjects belong to computer science education; interpret technical words in this context.';
    return {
      id: key, moduleId: a.moduleId, sessionId: a.sessionId, activityId: a.id,
      activityTitle: a.title, type: a.type, source: `src/data/module-${a.moduleId}.js`,
      dataPath: `data.${field}[${index}]`, question: text,
      plannedAsset: generated[key]?.asset || `assets/${key}.png`, status: generated[key]?.needsRegeneration ? 'needs-regeneration' : generated[key]?.reviewed ? 'generated-reviewed' : generated[key] ? 'generated-awaiting-review' : 'pending-generation',
      readyForIntegration: !!generated[key]?.reviewed && !generated[key]?.needsRegeneration,
      ...(integration?.entries.find(e => e.id === key) ? { integratedAsset: integration.entries.find(e => e.id === key).src } : {}),
      ...(generated[key] ? { asset: generated[key].asset || `assets/${key}.png`, generation: generated[key] } : {}),
      placement: placements[a.type],
      prompt: `Use case: scientific-educational. Asset: a single square close-up cartoon illustration for a school computing game. Activity context: ${a.title}. Learner-facing item: ${text}. ${context} Focus on the precise object or situation stated in the learner-facing item. When one object or interface element is named, draw only that element large and fully visible against the empty background; avoid collections and complete computer setups. For questions asking which tool/component/command to choose, depict the starting problem situation, never the solution tool or highlighted correct choice. For abstract code tasks, use a neutral code worksheet without computed results. Clean hand-drawn textbook cartoon, bold navy outlines, gentle flat shading, plain cream background, centered composition with generous margin. Main palette pastel blue and teal; use any other color explicitly required by the item (red text must be red). Clearly a drawing, never a photograph or realistic 3D render. No watermark, category labels, explanatory captions, missing-word completions, computed answers, solution arrows, or highlighted correct choices. Literal text or numbers already given in the item may appear only when necessary and copied exactly; never invent meaningful text. Keep the question itself outside the bitmap as live game text. ${itemConstraints} ${directions[key] || ''}`.trim(),
    };
  });
});
const manifest = {
  scope: 'Tronc commun — modules 1 à 4 uniquement; M205 exclu',
  mode: generationState?.phase === 'generating' ? 'Generating remaining images and reviewing them; earlier reviewed images are integrated.' : integration ? 'Reviewed images integrated in the platform.' : 'Preparation only. No runtime game files modified.',
  generatedWith: 'Built-in image_gen tool',
  imagePolicy: 'One independently generated illustration per question or interactive item. No shared image references.',
  activities: ACTIVITIES.length, questionCount: questions.length,
  generatedAssets: questions.filter(q => q.asset).map(q => ({ id: q.id, path: q.asset, status: q.status, useIds: [q.id], prompt: q.generation.prompt || q.prompt })),
  modules: CATALOG.map(m => ({ id: m.id, title: m.title, activities: ACTIVITIES.filter(a => a.moduleId === m.id).length, questions: questions.filter(q => q.moduleId === m.id).length })),
  questions,
};
writeFileSync(join(root, 'manifest.json.tmp'), JSON.stringify(manifest, null, 2) + '\n');
renameSync(join(root, 'manifest.json.tmp'), join(root, 'manifest.json'));
writeFileSync(join(root, 'prompts.jsonl'), questions.filter(q => !q.asset).map(q => JSON.stringify({ id: q.id, out: q.plannedAsset, prompt: q.prompt })).join('\n') + '\n');
writeFileSync(join(root, 'generated-prompts.jsonl'), manifest.generatedAssets.map(a => JSON.stringify({ id: a.id, out: a.path, prompt: a.prompt })).join('\n') + '\n');
const cols = ['id', 'activityTitle', 'type', 'source', 'dataPath', 'question', 'status', 'asset', 'integratedAsset', 'plannedAsset', 'placement'];
const csv = value => `"${String(value ?? '').replaceAll('"', '""')}"`;
writeFileSync(join(root, 'question-map.csv'), '\ufeff' + [cols.join(','), ...questions.map(q => cols.map(c => csv(q[c])).join(','))].join('\r\n'));
const ready = questions.filter(q => q.readyForIntegration);
writeFileSync(join(root, 'README.md'), `# صور أنشطة التلاميذ — ملف التسليم

النطاق: الوحدات الأربع فقط، دون M205. وفق اختيار المستخدم، لكل سؤال أو عنصر تفاعلي صورة مستقلة باسمه؛ يمنع ربط الصورة نفسها بسؤالين، حتى عند تكرار الموضوع. لم تعدل ملفات تشغيل اللعبة.

## الحالة الحالية

- الأنشطة: ${manifest.activities}.
- الأسئلة والعناصر التفاعلية: ${questions.length}.
- الصور المستقلة المولدة: ${manifest.generatedAssets.length}.
- الصور المراجعة والجاهزة: ${ready.length}.
- المتبقي دون توليد: ${questions.filter(q => !q.asset).length}.

الأعداد تشمل بطاقات المطابقة والتصنيف والترتيب والجمل والأسئلة وتعليمات المحاكاة والمكونات وعقد الشبكة ومستويات الروبوت.

## الملفات

- manifest.json: نص السؤال ومعرفه الثابت والنشاط وموضعه في البيانات وموضع الصورة وحالة جاهزيتها.
- question-map.csv: خريطة الدمج بترميز UTF-8 للمراجعة.
- prompts.jsonl: أوصاف التوليد المتبقية؛ هذه أوصاف وليست صورًا.
- generated-prompts.jsonl: أوصاف التوليد المستخدمة للصور المحفوظة.
- generation-log.json: سجل كل صورة وأصلها وبصمتها وحالة مراجعتها.
- assets/m*-q*.png: صور مستقلة بأسماء معرفات الأسئلة.
- keyboard-v1.png وmouse-v1.png داخل assets: عينتا الأسلوب السابقتان؛ لا تستخدمان كصور مشتركة. خصصت كل منهما لسؤال واحد فقط باسم معرفه.

## تأكيد الدمج

${ready.length === questions.length ? 'الحزمة مكتملة ومراجعة، ويمكن دمج الصور في مواضعها المحددة بالخريطة.' : 'الحزمة لم تكتمل بعد. تأكيد الدمج يخص فقط الصفوف ذات readyForIntegration=true؛ لا تدمج الصور قيد الانتظار أو المراجعة.'}

انسخ الصور المراجعة إلى public/images/student-illustrations/ عند تنفيذ الدمج. اربطها بواسطة activityId وdataPath أو معرف العنصر، وليس عبر بحث عام بالكلمات. لا تستخدم plannedAsset قبل وجود الملف ومراجعته. المسارات الحالية تخص حزمة التسليم وليست روابط منشورة داخل اللعبة.

تعرض أسماء العناصر ونصوص الأسئلة بنص HTML خارج الصور للحفاظ على الترجمة والقراءة وإمكانية الوصول. الأسلوب: رسم تعليمي كرتوني مقرب، خطوط واضحة، ألوان هادئة وخلفية بسيطة؛ دون صور واقعية أو مجسمات واقعية. الحروف الصغيرة المولدة على لوحة المفاتيح ليست مرجعًا لتدريس تخطيط المفاتيح.

في أسئلة الاختيار والفراغات، تصور الصورة الوضعية دون كشف الحل. لا تضف التصنيف أو ترتيب الخطوات إلى الرسم. في المطابقة ضع الصورة بجانب المفهوم فقط، دون تكرارها عند التعريف المقابل.

في أسئلة النقر على المناطق تستعمل الصورة كمصغرة مساعدة؛ لا تستبدل مشهد SVG التفاعلي دون معايرة المناطق. حافظ على إحداثيات التركيب وعقد الشبكة وشبكة الروبوت والشيفرة الأصلية والنقاط والتحقق من الإجابات.

## الصور الجاهزة ومواضعها

| معرف السؤال / اسم الصورة | النشاط | الموضع في البيانات |
|---|---|---|
${ready.map(q => `| ${q.asset.split('/').at(-1)} | ${q.activityTitle.replaceAll('|', '/')} | ${q.dataPath} |`).join('\n')}

أوصاف التوليد مسجلة في manifest.json وgeneration-log.json. التوليد بأداة image_gen المدمجة، دون استعمال مسار CLI أو API خارجي. أعد استخراج الخريطة بواسطة node output/student-illustrations/prepare-manifest.mjs؛ السجل يحافظ على الصور المنجزة.
`);
if (integration) writeFileSync(join(root, 'README.md'), `# صور التلاميذ — حالة الدمج

${generationState?.phase === 'generating' ? 'استؤنف التوليد بعد نشر التحديث السابق على Git.' : 'حالة الحزمة الحالية.'} دُمجت ${integration.integrated} صورة مستقلة مراجعة في ${new Set(integration.entries.map(e => e.activityId)).size} نشاطًا. حُفظت ${manifest.generatedAssets.length} صورة؛ يوجد ${questions.filter(q => q.status === 'needs-regeneration').length} صورة تحتاج تصحيحًا و${questions.filter(q => q.status === 'generated-awaiting-review').length} صورة تنتظر المراجعة، ويتبقى ${questions.filter(q => !q.asset).length} عنصرًا دون صورة مولدة.

النطاق هو الوحدات الأربع فقط، دون M205. الصور المتاحة تغطي الوحدتين الأولى والثانية وبداية الثالثة. تستخدم المنصة نسخ WebP محلية بدقة 512×512؛ الأصول الأصلية محفوظة هنا. لا يوجد توليد تلقائي أثناء البناء.

- integration-report.json: المسارات الفعلية للصور المدمجة وأحجامها.
- question-map.csv وmanifest.json: معرّفات الأسئلة ومواضعها ومسارات الصور الأصلية والمدمجة (integratedAsset).
- review-findings.json: ملاحظات المراجعة؛ unresolved/needs-regeneration خارج المنصة.
- generation-log.json: أصول الصور وبصماتها وحالة المراجعة.
- generated-prompts.jsonl: أوصاف التوليد الفعلية بواسطة أداة image_gen المدمجة.
- prompts.jsonl: أوصاف العناصر المتبقية؛ ليست صورًا.

الربط في src/data/student-illustrations.js والعرض في src/utils/student-illustrations.js. السكربت scripts/sync-student-illustrations.mjs يُصدر الصور المعتمدة فقط إلى public/images/student-illustrations/. تعليمات الصيانة في docs/STUDENT_ILLUSTRATIONS.md.

## الصور المدمجة

| معرّف السؤال | الموضع في البيانات | مسار العرض |
|---|---|---|
${integration.entries.map(e => `| ${e.id} | ${e.dataPath} | ${e.src} |`).join('\n')}
`);
console.log(JSON.stringify({ activities: manifest.activities, questions: questions.length, generatedAssets: manifest.generatedAssets.length, readyItems: ready.length, pending: questions.filter(q => !q.asset).length }));
