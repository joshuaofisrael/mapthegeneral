/**
 * Mediavine/AdSense quality pass: many place pages share a bare title such as
 * "Victoria · Map the General" (a BC municipality, a riding, a division...).
 * For indexable pages whose <title> or meta description is duplicated, add the
 * nearest breadcrumb parents (already on the page, already localized) until the
 * value is unique. Italy (Chieti hold) and NZ (sealed) are never touched.
 * Undo: remove this script from "postbuild".
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
const SKIP = ["/it/", "/nz/"];
const SUFFIX = " · Map the General";
const DESC_LIMIT = 160;
const titleRe = /<title>([^<]*)<\/title>/i;
const descRe = /<meta\s+name="description"\s+content="([^"]*)"/i;
const robotsRe = /<meta\s+name="robots"\s+content="([^"]*)"/i;

const pages = [];
function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) { if (name !== "_next") walk(full); continue; }
    if (name !== "index.html") continue;
    const route = "/" + path.relative(OUT, full).replace(/\\/g, "/").slice(0, -"index.html".length);
    if (SKIP.some((p) => route.startsWith(p))) continue;
    const html = readFileSync(full, "utf8");
    if (/http-equiv="refresh"/i.test(html)) continue;
    const robots = html.match(robotsRe)?.[1] ?? "";
    if (robots.includes("noindex")) continue;
    const title = html.match(titleRe)?.[1];
    if (!title) continue;
    const desc = html.match(descRe)?.[1] ?? "";
    const crumbs = [];
    const m = html.match(/"@type":"BreadcrumbList","itemListElement":(\[.*?\])\}/);
    if (m) { try { for (const i of JSON.parse(m[1])) crumbs.push(i.name); } catch {} }
    // drop Home, country, country-language hub and the page itself; nearest parent first
    const parents = crumbs.slice(3, -1).reverse().filter((n, i, a) => n && a.indexOf(n) === i);
    pages.push({ full, route, title, desc, parents, lang: route.split("/")[2] ?? "" });
  }
}
walk(OUT);

function group(key) {
  const g = new Map();
  for (const p of pages) { const k = key(p); if (!k) continue; (g.get(k) ?? g.set(k, []).get(k)).push(p); }
  return [...g.values()].filter((v) => v.length > 1);
}

const SECTION = { districts: "federal riding", legislature: "provincial riding", divisions: "census division", municipalities: "municipality", house: "House division", senate: "Senate", sejm: "Sejm", senat: "Senat", gminy: "gmina", powiaty: "powiat" };
/** Last-resort label: the route segment that differs inside the group, or the official code in the description. */
function fallback(p, groupPages) {
  const segs = p.route.split("/").filter(Boolean);
  for (let i = 0; i < segs.length; i++) {
    if (groupPages.every((q) => q.route.split("/").filter(Boolean)[i] === segs[i])) continue;
    if (SECTION[segs[i]]) return SECTION[segs[i]];
    break;
  }
  const code = unesc(p.desc).match(/\(([0-9A-Z]{4,})\)/)?.[1];
  return code ?? p.lang.toUpperCase();
}

function disambiguate(groupPages, make, field) {
  const maxK = Math.max(...groupPages.map((p) => p.parents.length));
  for (let k = 1; k <= maxK + 1; k++) {
    const vals = groupPages.map((p) => make(p, k));
    const counts = new Map();
    vals.forEach((v) => counts.set(v, (counts.get(v) ?? 0) + 1));
    groupPages.forEach((p, i) => { if (counts.get(vals[i]) === 1 && !p[field + "Done"]) { p[field + "New"] = vals[i]; p[field + "Done"] = true; } });
    if (groupPages.every((p) => p[field + "Done"])) return;
  }
  for (const p of groupPages) if (!p[field + "Done"]) p[field + "New"] = make(p, 99);
}

const unescHoist = null;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const unesc = (s) => s.replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");

for (const g of group((p) => p.title)) {
  disambiguate(g, (p, k) => {
    const base = unesc(p.title).replace(SUFFIX, "");
    const ctx = p.parents.slice(0, k);
    let t = ctx.length ? `${base}, ${ctx.join(", ")}` : base;
    if (k > p.parents.length) t += ` (${fallback(p, g)})`;
    return esc(t) + SUFFIX;
  }, "title");
}
for (const g of group((p) => p.desc)) {
  disambiguate(g, (p, k) => {
    const base = unesc(p.desc);
    const ctx = p.parents.slice(0, k);
    let extra = ctx.length ? ` (${ctx.join(", ")})` : "";
    if (k > p.parents.length) extra += ` [${fallback(p, g)}]`;
    let d = base.replace(/\.$/, "") + extra + ".";
    if (d.length > DESC_LIMIT) d = (base.slice(0, DESC_LIMIT - extra.length - 2).replace(/\s+\S*$/, "") + extra + ".").slice(0, DESC_LIMIT);
    return esc(d);
  }, "desc");
}

let t = 0, d = 0;
for (const p of pages) {
  if (!p.titleNew && !p.descNew) continue;
  let html = readFileSync(p.full, "utf8");
  if (p.titleNew && p.titleNew !== p.title) {
    html = html.replace(titleRe, `<title>${p.titleNew}</title>`);
    for (const attr of ['property="og:title"', 'name="twitter:title"'])
      html = html.replace(new RegExp(`(<meta\\s+${attr}\\s+content=")[^"]*(")`, "i"), `$1${p.titleNew}$2`);
    t++;
  }
  if (p.descNew && p.descNew !== p.desc) {
    html = html.replace(descRe, `<meta name="description" content="${p.descNew}"`);
    for (const attr of ['property="og:description"', 'name="twitter:description"'])
      html = html.replace(new RegExp(`(<meta\\s+${attr}\\s+content=")[^"]*(")`, "i"), `$1${p.descNew}$2`);
    d++;
  }
  writeFileSync(p.full, html);
}
console.log(`unique-meta: ${t} titles and ${d} descriptions disambiguated across ${pages.length} indexable pages (it/nz skipped).`);
