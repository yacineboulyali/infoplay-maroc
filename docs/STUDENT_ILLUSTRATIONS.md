# صور أنشطة التلاميذ

دُمجت 678 صورة مستقلة مراجعة في 120 نشاطًا من الوحدات الأربع. لكل سؤال أو عنصر تفاعلي صورته ومعرّفه ومساره المحدد في خريطة الدمج.

ترتبط الصورة بمعرّف السؤال الأصلي مثل `m1-s1-a1-q01` أثناء خلط البطاقات أو نقلها. تظهر صور المطابقة بجانب المفهوم، وصور الاختيار فوق الإجابات. تعرض المحاكاة والروبوت صورة المهمة أو المستوى الحالي. تعمل مناطق النقر وشبكات اللعب مع الصور المدمجة.

ملفات العرض محلية بصيغة WebP بدقة 512×512، وحجمها الإجمالي نحو 11.1 ميغابايت. النسخ الأصلية وأوصاف التوليد وسجل المراجعة محفوظة في `output/student-illustrations/`. تحدد حقول `asset` و`integratedAsset` النسخة المعتمدة لكل معرّف.

- `src/data/student-illustrations.js` يربط معرّفات الأسئلة بالصور المعتمدة.
- `src/utils/student-illustrations.js` ينشئ عنصر الصورة من معرّف النشاط وترتيب العنصر الأصلي.
- `public/images/student-illustrations/` يحتوي صور العرض المعتمدة.
- `output/student-illustrations/integration-report.json` يسجل الصور المدمجة ومساراتها وأحجامها.
- `output/student-illustrations/question-map.csv` يربط كل سؤال بموضعه في البيانات وصورته الأصلية وصورته داخل المنصة.
- `output/student-illustrations/review-findings.json` يوثق الملاحظات التي عولجت أثناء المراجعة.

لتحديث الحزمة وبناء المنصة بعد اعتماد صور جديدة، تُستخدم الأوامر التالية.

```powershell
node output/student-illustrations/prepare-manifest.mjs
node scripts/sync-student-illustrations.mjs
node output/student-illustrations/prepare-manifest.mjs
node output/student-illustrations/verify-manifest.mjs --complete
npm run build
```

استُعملت أداة `image_gen` المدمجة. أوصاف التوليد الفعلية محفوظة في `output/student-illustrations/generated-prompts.jsonl`.
