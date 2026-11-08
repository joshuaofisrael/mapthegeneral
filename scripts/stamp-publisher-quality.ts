/**
 * Publisher-quality gate, 7 Nov 2026 owner-requested remediation.
 * Population and proximity to an election do not create original content.
 * Geographic templates need >=200 words of distinctive narrative in <p>
 * elements. Navigation, tables, source lists and repeated boilerplate do not
 * count. This is our conservative editorial threshold, NOT a Google word rule.
 * National/election/live/results/trust pages are preserved. Nothing is deleted.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { searchIndex } from "../src/lib/routes";
import { applyRobotsMeta } from "../src/lib/indexing-policy";

const OUT = path.join(process.cwd(), "out");
const MIN_DISTINCT_WORDS = 200;
const PROTECTED_KINDS = new Set(["home", "legal", "page", "country", "elections", "election", "parties", "candidates", "results", "faq", "sources"]);
const routeKinds = new Map(searchIndex().map(p => [p.path, p.kind]));
const frequencies = new Map<string, number>();
const rows: {file:string; route:string; kind:string; paragraphs:{key:string; words:number}[]; distinctWords?:number; excluded?:boolean}[] = [];
const text = (h:string) => h.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&#(?:x[0-9a-f]+|\d+);|&[a-z]+;/gi, " ").replace(/\s+/g," ").trim();
function walk(dir:string) {
  for (const name of readdirSync(dir)) {
    if (name === "_next") continue;
    const file = path.join(dir,name);
    if (statSync(file).isDirectory()) {walk(file); continue;}
    if (name !== "index.html") continue;
    const route = "/" + path.relative(OUT,file).replace(/\\/g,"/").slice(0,-"index.html".length);
    const html = readFileSync(file,"utf8");
    if (/http-equiv=["']refresh["']/i.test(html)) continue;
    const kind = routeKinds.get(route) ?? "unlisted";
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
    const paragraphs = [...main.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].flatMap(m => text(m[1]).split(/(?<=[.!?])\s+/)).map(t => {
      // Digits and the page name do not make a repeated template distinctive.
      const name = text(main.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "").toLowerCase();
      let key = t.toLowerCase();
      if (name.length >= 5) key = key.split(name).join("@place");
      key = route.split("/")[1] + ":" + route.split("/")[2] + ":" + key.replace(/\d[\d.,–/-]*/g,"#");
      return { key, words: t.split(/\s+/).filter(Boolean).length };
    });
    for (const key of new Set(paragraphs.map(p=>p.key))) frequencies.set(key,(frequencies.get(key)??0)+1);
    rows.push({file,route,kind,paragraphs});
  }
}
walk(OUT);
const excluded = new Set<string>();
const byCountry:Record<string,{noindex:number; kept:number}> = {};
for (const row of rows) {
  row.distinctWords = row.paragraphs.filter(p => p.words >= 12 && (frequencies.get(p.key)??0) <= 3).reduce((a,p)=>a+p.words,0);
  const protectedPage = PROTECTED_KINDS.has(row.kind) || /^\/[a-z]{2}\/[a-z]{2}\/(?:live|results|elections)(?:\/|$)/.test(row.route);
  const utility = row.kind === "search" || /^\/(?:404|contact\/thanks)\//.test(row.route);
  row.excluded = utility || (!protectedPage && (row.distinctWords < MIN_DISTINCT_WORDS));
  if (row.excluded) {
    excluded.add(row.route);
  }
  // Override legacy population/date-based meta tags in both directions. Only
  // content quality (not city size or an election window) controls this gate.
  const before = readFileSync(row.file,"utf8");
  const after = applyRobotsMeta(before,row.excluded ? "noindex,follow" : "index,follow");
  if (before!==after) writeFileSync(row.file,after);
  const country = /^[a-z]{2}$/.test(row.route.split("/")[1]) ? row.route.split("/")[1] : "global";
  byCountry[country] ??= {noindex:0,kept:0};
  byCountry[country][row.excluded?"noindex":"kept"]++;
}
// Hreflang must not recommend noindexed mirror URLs.
for (const row of rows) {
  const before = readFileSync(row.file,"utf8");
  const after = before.replace(/<link\b[^>]*hreflang=["'][^"']*["'][^>]*>/gi, tag => {
    const href = tag.match(/href=["']https:\/\/mapthegeneral\.com(\/[^"'#?]*)/)?.[1];
    return href && excluded.has(href) ? "" : tag;
  });
  if (before!==after) writeFileSync(row.file,after);
}
// Keep source and exported sitemaps/IndexNow lists aligned. Build-indexes runs
// earlier and can otherwise silently re-introduce low-value pages every deploy.
for (const root of ["public", "out"]) {
  const dir = path.join(root,"sitemaps");
  for (const name of readdirSync(dir)) {
    if (!name.endsWith(".xml")) continue;
    const file = path.join(dir,name), before=readFileSync(file,"utf8");
    const after = before.replace(/\s*<url>\s*<loc>https:\/\/mapthegeneral\.com([^<]*)<\/loc>[\s\S]*?<\/url>/g, (tag,route) => excluded.has(route||"/") ? "" : tag);
    if (before!==after) writeFileSync(file,after);
  }
  const listFile = path.join(root,"search/indexnow-urls.json");
  if (existsSync(listFile)) {
    const urls:string[] = JSON.parse(readFileSync(listFile,"utf8"));
    writeFileSync(listFile,JSON.stringify(urls.filter(u=>!excluded.has(new URL(u).pathname))));
  }
}
mkdirSync(".publisher-audit",{recursive:true});
const report = {threshold:MIN_DISTINCT_WORDS, scanned:rows.length, noindex:excluded.size, kept:rows.length-excluded.size, byCountry, pages:rows.map(({route,kind,distinctWords,excluded})=>({route,kind,distinctWords,excluded}))};
writeFileSync(".publisher-audit/report.json",JSON.stringify(report,null,2));
console.log(`publisher-quality: ${report.noindex} noindex,follow; ${report.kept} kept; ${report.scanned} documents. Threshold ${MIN_DISTINCT_WORDS} distinctive narrative words for programmatic profiles.`);
console.log(JSON.stringify(byCountry));
