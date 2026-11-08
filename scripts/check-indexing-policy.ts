/** Assert the content-quality decision, robots tags and sitemap agree on every export. */
import {existsSync,readFileSync,readdirSync} from 'node:fs';
import path from 'node:path';
const report=JSON.parse(readFileSync('.publisher-audit/report.json','utf8'));
const listed=new Set<string>();
for(const f of readdirSync('out/sitemaps')) if(f.endsWith('.xml')) for(const m of readFileSync(`out/sitemaps/${f}`,'utf8').matchAll(/<loc>https:\/\/mapthegeneral\.com([^<]*)<\/loc>/g)) listed.add(m[1]||'/');
const errors:string[]=[];
for(const p of report.pages){
 const file=path.join('out',p.route,'index.html');
 if(!existsSync(file)){errors.push(`${p.route}: missing export`);continue;}
 const h=readFileSync(file,'utf8');
 const noindex=/<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(h);
 if(p.excluded&&!noindex)errors.push(`${p.route}: missing noindex`);
 if(p.excluded&&listed.has(p.route))errors.push(`${p.route}: excluded page in sitemap`);
 if(!p.excluded&&!listed.has(p.route))errors.push(`${p.route}: substantive page missing from sitemap`);
 if(!p.excluded&&noindex)errors.push(`${p.route}: substantive page unexpectedly noindexed`);
}
for(const route of ['/','/us/en/live/','/il/en/results/','/nz/en/results/']){
 if(!listed.has(route))errors.push(`${route}: core page missing from sitemap`);
 const row=report.pages.find((p:{route:string})=>p.route===route);
 if(!row||row.excluded)errors.push(`${route}: core page not preserved`);
}
if(errors.length){console.error(errors.slice(0,30).join('\n'));process.exit(1);}
console.log(`indexing-policy: ${report.noindex} excluded and ${report.kept} kept documents verified; core election pages preserved.`);
