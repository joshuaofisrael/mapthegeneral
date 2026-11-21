/**
 * Fails the build when exported HTML still carries a Google AdSense marker,
 * when ads.txt is missing, when ads.txt contains a google.com line for the
 * withdrawn publisher, or when the exported site is 1 GB or larger.
 *
 * Ezoic seller records that begin with google.com for a different publisher
 * id are part of the managed seller list and are not this site's AdSense
 * account. Those lines are allowed. A google.com line that names publisher
 * pub-5681559774142917 is not.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const OUT = path.join(process.cwd(), "out");
const GIGABYTE = 1024 * 1024 * 1024;
const WITHDRAWN_PUBLISHER = "5681559774142917";
const HTML_MARKERS = [
  "adsbygoogle",
  "pagead2.googlesyndication.com",
  "ca-pub-5681559774142917",
  "google-adsense-account",
] as const;

const errors: string[] = [];

let pages = 0;
let bytes = 0;

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const info = statSync(full);
    if (info.isDirectory()) {
      if (name !== "_next") walk(full);
      else bytes += dirSize(full);
      continue;
    }
    bytes += info.size;
    if (!name.endsWith(".html")) continue;
    pages++;
    const html = readFileSync(full, "utf8");
    const rel = path.relative(OUT, full);
    const lower = html.toLowerCase();
    for (const marker of HTML_MARKERS) {
      if (lower.includes(marker)) errors.push(`${rel}: contains ${marker}`);
    }
  }
}

function dirSize(dir: string): number {
  let total = 0;
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    const info = statSync(full);
    total += info.isDirectory() ? dirSize(full) : info.size;
  }
  return total;
}

/** A google.com ads.txt record for the withdrawn AdSense publisher. */
function isWithdrawnGoogleLine(line: string): boolean {
  const trimmed = line.trim();
  if (!/^google\.com\s*,/i.test(trimmed)) return false;
  return trimmed.toLowerCase().includes(WITHDRAWN_PUBLISHER);
}

if (!existsSync(OUT)) {
  console.error("adsense: out/ is missing. Run next build first.");
  process.exit(1);
}

walk(OUT);

const adsPath = path.join(OUT, "ads.txt");
if (!existsSync(adsPath)) {
  errors.push("ads.txt is missing from out/");
} else {
  const body = readFileSync(adsPath, "utf8").replace(/\r\n/g, "\n");
  if (body.toLowerCase().includes(WITHDRAWN_PUBLISHER)) {
    errors.push("ads.txt contains withdrawn publisher pub-5681559774142917");
  }
  const googleLines = body.split("\n").filter((line) => isWithdrawnGoogleLine(line));
  if (googleLines.length > 0) {
    errors.push(`ads.txt contains a google.com line for pub-${WITHDRAWN_PUBLISHER}`);
  }
}

if (bytes >= GIGABYTE) {
  errors.push(`out/ is ${bytes} bytes, which is not under 1 GB`);
}

if (errors.length) {
  console.error(`adsense: ${errors.length} problem(s)`);
  for (const line of errors.slice(0, 40)) console.error(`  - ${line}`);
  process.exit(1);
}

const mb = (bytes / (1024 * 1024)).toFixed(1);
console.log(
  `adsense: ${pages} html files scanned, no AdSense markers; ads.txt has no google.com line for pub-${WITHDRAWN_PUBLISHER}; out/ is ${mb} MB.`,
);
