import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'site/assets/content.js'),'utf8'),sandbox);
const clean=s=>s.replace(/<br\s*\/?\s*>/gi,' ').replace(/<[^>]*>/g,'');
let out='# Presenter guide / 分享讲稿\n\nGenerated from `site/assets/content.js`. Run `node scripts/export-guide.mjs` after editing.\n\n38 minutes of guided content + 2 minutes of open discussion. MuScriptor receives 14 minutes.\n\n';
for(const lang of ['zh','en']){
 const data=sandbox.window.buildContent(lang);out+=`## ${lang==='zh'?'中文版':'English'}\n\n`;let start=0;
 for(const [i,s] of data.slides.entries()){
  out+=`### ${String(i+1).padStart(2,'0')}. ${clean(s.title)} · ${start}–${start+s.minutes} min\n\n${clean(s.lead)}\n\n${s.note}\n\n`;
  if(s.sources.length)out+=s.sources.map(r=>`[${r.label}](${r.url})`).join(' · ')+'\n\n';start+=s.minutes;
 }
 out+=`### ${lang==='zh'?'自由讨论':'Open discussion'} · 38–40 min\n\n${lang==='zh'?'从最后一页挑一个问题讨论。若时间紧，精简前沿页，不省略结果的评测条件。':'Choose one question from the final page. If behind schedule, compress the outlook rather than omitting evaluation caveats.'}\n\n`;
}
fs.mkdirSync(path.join(root,'docs'),{recursive:true});fs.writeFileSync(path.join(root,'docs/PRESENTER_GUIDE.md'),out);
console.log('Generated docs/PRESENTER_GUIDE.md');
