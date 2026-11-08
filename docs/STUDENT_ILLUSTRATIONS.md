# صور أنشطة التلاميذ

أوقف توليد الصور بناءً على طلب المستخدم. حُفظت 372 صورة مستقلة، ودُمجت 355 صورة مراجعة في المنصة. أُجّلت 17 صورة تحتاج تصحيحًا، وتبقى 306 عناصر دون صور مولدة. يشمل الربط الوحدات الأربع فقط؛ الصور المتاحة حاليًا تخص الوحدات 1 و2 وبداية الوحدة 3، ولا توجد صور مولدة للوحدة 4 بعد.

الصورة مرتبطة بمعرّف السؤال الأصلي مثل `m1-s1-a1-q01`، وتبقى معه عند خلط البطاقات أو نقلها. تظهر صور المطابقة بجانب المفهوم فقط، وصور الاختيار خارج أزرار الإجابة. تعرض المحاكاة والروبوت صورة المهمة أو المستوى الحالي. تبقى المشاهد القابلة للنقر ومناطقها والشيفرة وشبكات اللعب وآليات التصحيح الأصلية فعالة.

ملفات العرض محلية بصيغة WebP بدقة 512×512، وتعمل دون الإنترنت. النسخ الأصلية وأوصاف التوليد وسجل المراجعة محفوظة في `output/student-illustrations/`، بما فيها النسخ المستبعدة؛ لا تُنسخ هذه النسخ إلى المنصة.

- `src/data/student-illustrations.js`: ربط معرّفات الأسئلة بالصور المعتمدة.
- `src/utils/student-illustrations.js`: إنشاء عنصر الصورة من معرّف النشاط وترتيب العنصر الأصلي.
- `public/images/student-illustrations/`: صور العرض المعتمدة فقط.
- `output/student-illustrations/integration-report.json`: الصور المدمجة ومساراتها وأحجامها.
- `output/student-illustrations/question-map.csv`: خريطة كل الأسئلة، مع مسار الصورة الأصلية ومسارها داخل المنصة.
- `output/student-illustrations/review-findings.json`: ملاحظات الصور المؤجلة.

لا يستدعي البناء أي توليد صور. عند استكمال التوليد لاحقًا، تُراجع الصور أولًا، ثم تُحدَّث الملفات بالأوامر التالية:

```powershell
node output/student-illustrations/prepare-manifest.mjs
node scripts/sync-student-illustrations.mjs
node output/student-illustrations/prepare-manifest.mjs
npm run build
```

التوليد السابق استعمل أداة `image_gen` المدمجة؛ أوصافه الفعلية في `output/student-illustrations/generated-prompts.jsonl`.
