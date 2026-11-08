const fs=require('fs');
const path=require('path');
const {pathToFileURL}=require('url');
const {chromium}=require('playwright');
(async()=>{
  const folder='output/m205-image-review';
  const fragment=fs.readFileSync(folder+'/m205-image-comparison.html','utf8');
  const manifest=JSON.parse(fs.readFileSync(folder+'/manifest.json','utf8'));
  const html='<!doctype html><meta charset="utf-8"><style>:root{--font-size-base:16px;--foreground:#202b3a;--muted-foreground:#586375}body{font:16px Arial,sans-serif;margin:20px auto;padding:0 12px;max-width:760px}h3{font-weight:500;margin:0}.viz-controls{display:flex;gap:10px;flex-wrap:wrap;align-items:center}.form-label{display:grid;gap:6px}.btn,.form-select{font:inherit;padding:8px;min-height:44px}.form-check{display:inline-flex;align-items:center;gap:6px}input{width:18px;height:18px}button{cursor:pointer}</style>'+fragment;
  fs.writeFileSync(folder+'/preview.html',html);
  const browser=await chromium.launch();
  const page=await browser.newPage({viewport:{width:800,height:1000}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(pathToFileURL(path.resolve(folder+'/preview.html')).href);
  for(const c of manifest){
    await page.selectOption('#review-case',c.id);
    await page.waitForFunction(()=>[...document.querySelectorAll('#old-image,#new-image')].every(i=>i.complete&&i.naturalWidth>0));
    if(await page.textContent('#review-label')!==c.label)throw Error('Incorrect label '+c.id);
  }
  await page.selectOption('#review-case','18');
  await page.screenshot({path:folder+'/comparison-desktop.png',fullPage:true});
  await page.selectOption('#review-case','01');await page.check('#decision-accept');
  await page.click('#review-next');await page.check('#decision-revise');
  await page.click('#review-previous');
  if(!await page.isChecked('#decision-accept'))throw Error('Decision lost when changing case');
  await page.click('#send-review');
  const summary=await page.textContent('#review-state');
  if(!summary.includes('01 (Barre')||!summary.includes('02 (Ruban)'))throw Error('Incorrect selected-case summary');
  await page.selectOption('#review-case','29');
  await page.setViewportSize({width:390,height:844});
  await page.screenshot({path:folder+'/comparison-mobile.png',fullPage:true});
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
  const report={cases:manifest.length,images:manifest.length*2,errors,mobileOverflow:overflow,decisionsTested:true,fragmentBytes:Buffer.byteLength(fragment),productionChanged:false};
  fs.writeFileSync(folder+'/verification.json',JSON.stringify(report,null,2));
  console.log(JSON.stringify(report));await browser.close();
  if(errors.length||overflow||Buffer.byteLength(fragment)>1000000)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
