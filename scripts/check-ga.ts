/**
 * Fails the build when an HTML page lacks the Google Analytics loader.
 * The loader is the measurement id plus /consent.js. gtag.js must not be in
 * the HTML: public/consent.js adds it only after Accept.
 * Noindex pages and redirect stubs are included. Files with no <head>
 * (the Google site-verification token) are not pages.
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { htmlHead } from "../src/lib/adsense";
import {
  CONSENT_STORAGE_KEY,
  GA_MEASUREMENT_ID,
  GA_WINDOW_ID,
  htmlHasGaLoader,
} from "../src/lib/google-analytics";

const OUT = path.join(process.cwd(), "out");
const GTAG_SRC = "googletagmanager.com/gtag/js";
const errors: string[] = [];

let pages = 0;
let noindex = 0;
let nonDocuments = 0;

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== "_next") walk(full);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    const html = readFileSync(full, "utf8");
    if (htmlHead(html) === null) {
      nonDocuments++;
      continue;
    }
    pages++;
    const rel = path.relative(OUT, full);
    const unindexed = /noindex/i.test(html);
    if (unindexed) noindex++;
    if (!htmlHasGaLoader(html)) {
      errors.push(`${rel}: missing GA loader (${GA_MEASUREMENT_ID} and /consent.js)`);
    }
    if (html.includes(GTAG_SRC)) {
      errors.push(`${rel}: gtag.js is in the HTML; it must load only after consent`);
    }
  }
}

if (!existsSync(OUT)) {
  console.error("ga: out/ is missing. Run next build first.");
  process.exit(1);
}

walk(OUT);

const consentPath = path.join(OUT, "consent.js");
if (!existsSync(consentPath)) {
  errors.push("consent.js is missing from out/");
} else {
  const js = readFileSync(consentPath, "utf8");
  if (!js.includes(CONSENT_STORAGE_KEY)) errors.push("consent.js does not use the consent storage key");
  if (!js.includes(GA_WINDOW_ID)) errors.push("consent.js does not read the measurement id from the page");
  if (!js.includes(GTAG_SRC)) errors.push("consent.js does not load gtag.js after consent");
  if (js.includes(GA_MEASUREMENT_ID)) {
    errors.push("consent.js hard-codes the measurement id; pages must supply it");
  }
  if (/joshua israel/i.test(js)) errors.push("consent.js names the owner");
}

if (errors.length) {
  console.error(`ga: ${errors.length} problem(s)`);
  for (const line of errors.slice(0, 40)) console.error(`  - ${line}`);
  process.exit(1);
}

console.log(
  `ga: ${pages} pages include the loader (${GA_MEASUREMENT_ID} and /consent.js), including ${noindex} noindex pages; ${nonDocuments} non-documents skipped; gtag.js is not in the HTML.`,
);
