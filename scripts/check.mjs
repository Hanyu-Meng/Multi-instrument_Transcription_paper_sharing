import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=fs.readFileSync(path.join(root,'site/assets/content.js'),'utf8');
const sandbox={window:{}};vm.runInNewContext(source,sandbox);
const both=['zh','en'].map(lang=>sandbox.window.buildContent(lang));
for(const [i,data] of both.entries()){
 const lang=['zh','en'][i];
 assert.equal(data.slides.length,18,`${lang}: 18 review sections`);
 assert.equal(data.papers.length,12,`${lang}: bibliography size`);
 const ids=new Set(data.slides.map(s=>s.id));assert.equal(ids.size,data.slides.length,'Unique section IDs');
 for(const s of data.slides){
  for(const field of ['id','chapter','title','lead','html','note']) assert.ok(s[field],`${s.id}: missing ${field}`);
  assert.ok(data.chapters.some(c=>c.id===s.chapter),`${s.id}: valid chapter`);
  for(const m of s.html.matchAll(/(?:src|href)="([^"#]+)"/g)) if(!/^https?:/.test(m[1])) assert.ok(fs.existsSync(path.join(root,'site',m[1])),`Missing asset ${m[1]}`);
  for(const ref of s.sources) assert.ok(/^https:\/\//.test(ref.url),`${s.id}: source URL`);
 }
 for(const c of data.chapters)assert.ok(ids.has(c.first),`${c.id}: valid first slide`);
 for(const p of data.papers)for(const f of ['id','year','title','authors','venue','kind','summary','insight','limit','url'])assert.ok(p[f],`${p.id}: missing ${f}`);
}
assert.deepEqual(Array.from(both[0].slides,s=>s.id),Array.from(both[1].slides,s=>s.id),'Bilingual section parity');
assert.deepEqual(Array.from(both[0].papers,p=>p.id),Array.from(both[1].papers,p=>p.id),'Bilingual reference parity');
console.log('Passed: bilingual content, 18 sections, 12 references, citations and local assets.');
