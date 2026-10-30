/**
 * Sets robots to noindex,follow on thin municipality pages that are outside
 * the election window. Rewrites only that meta tag. Pages stay in place.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { applyRobotsMeta, indexingAsOf, thinMunicipalityExcluded } from "../src/lib/indexing-policy";

const OUT = path.join(process.cwd(), "out");
const AS_OF = indexingAsOf();

function routeOf(file: string): string | null {
  const rel = path.relative(OUT, file).replace(/\\/g, "/");
  if (rel === "index.html") return "/";
  if (!rel.endsWith("/index.html")) return null;
  return `/${rel.slice(0, -"index.html".length)}`;
}

let scanned = 0;
let updated = 0;

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== "_next") walk(full);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    scanned++;
    const route = routeOf(full);
    if (!route) continue;
    const before = readFileSync(full, "utf8");
    // Drop hreflang alternates that point at excluded pages.
    let after = before.replace(/<link[^>]*hreflang=["'][^"']*["'][^>]*>/gi, (tag) => {
      const href = tag.match(/href=["']https:\/\/mapthegeneral\.com(\/[^"'#?]*)/)?.[1];
      return href && href !== route && thinMunicipalityExcluded(href, AS_OF) ? "" : tag;
    });
    if (thinMunicipalityExcluded(route, AS_OF)) after = applyRobotsMeta(after, "noindex,follow");
    if (after === before) continue;
    writeFileSync(full, after);
    updated++;
  }
}

walk(OUT);
console.log(`thin-index stamp: ${updated} pages set to noindex,follow on ${AS_OF}; ${scanned} html files scanned.`);
