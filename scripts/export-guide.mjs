import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sandbox={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'site/assets/content.js'),'utf8'),sandbox);
const clean=s=>s.replace(/<br\s*\/?\s*>/gi,' ').replace(/<[^>]*>/g,'');
let out='# 阅读补充说明 / Reading notes\n\nGenerated from `site/assets/content.js`. Run `node scripts/export-guide.mjs` after editing.\n\n多乐器音乐转录：方法、文献与研究挑战。\n\nMulti-instrument music transcription: methods, literature and research challenges.\n\n';
for(const lang of ['zh','en']){
 const data=sandbox.window.buildContent(lang);out+=`## ${lang==='zh'?'中文版':'English'}\n\n`;
 for(const [i,s] of data.slides.entries()){
  out+=`### ${String(i+1).padStart(2,'0')}. ${clean(s.title)}\n\n${clean(s.lead)}\n\n${s.note}\n\n`;
  if(s.paperLinks?.length)out+=s.paperLinks.map(r=>`[${r.label}](${r.url})`).join(' · ')+'\n\n';
  if(s.sources.length)out+=s.sources.map(r=>`[${r.label}](${r.url})`).join(' · ')+'\n\n';
 }
}
fs.mkdirSync(path.join(root,'docs'),{recursive:true});fs.writeFileSync(path.join(root,'docs/PRESENTER_GUIDE.md'),out);
console.log('Generated docs/PRESENTER_GUIDE.md');
