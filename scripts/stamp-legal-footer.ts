/**
 * Adds the shared legal links and the informational note to static HTML
 * footers that were committed without them. Next.js pages already render
 * the links. Redirect stubs are left alone. AdSense tags are not edited.
 *
 * Also fails if a personal inbox address appears in HTML outside the
 * FormSubmit action URL.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { CONTACT_INBOX } from "../src/data/contact-inbox";
import { isRedirectStub } from "../src/lib/adsense";
import { INFORMATIONAL_NOTE, legalFooterSuffix } from "../src/lib/legal-footer";

const OUT = path.join(process.cwd(), "out");
const MARKER = 'href="/copyright/"';
const SUFFIX = ` ${legalFooterSuffix()}`;
const ALLOWED_ACTION = `https://formsubmit.co/${CONTACT_INBOX}`;

const errors: string[] = [];
let stamped = 0;
let already = 0;
let skipped = 0;

function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) {
      if (name !== "_next") walk(full);
      continue;
    }
    if (!name.endsWith(".html")) continue;
    const html = readFileSync(full, "utf8");
    if (isRedirectStub(html) || !html.includes("<head")) {
      skipped++;
      continue;
    }
    const rel = path.relative(OUT, full);
    let next = html;
    if (!html.includes(MARKER)) {
      if (html.includes("</footer>")) {
        next = html.replace("</footer>", `${SUFFIX}</footer>`);
      } else if (html.includes("</body>")) {
        next = html.replace("</body>", `<footer class="wrap">${SUFFIX.trim()}</footer></body>`);
      } else {
        errors.push(`${rel}: no footer to attach legal links to`);
        continue;
      }
      writeFileSync(full, next);
      stamped++;
    } else {
      already++;
    }
    if (!next.includes(MARKER)) errors.push(`${rel}: copyright link missing after stamp`);
    const leaked = next.split(ALLOWED_ACTION).join("");
    if (leaked.includes(CONTACT_INBOX) || leaked.includes("joshuaofisrael")) {
      errors.push(`${rel}: personal email appears outside the contact form action`);
    }
  }
}

if (!existsSync(OUT)) {
  console.error("legal-footer: out/ is missing. Run next build first.");
  process.exit(1);
}

walk(OUT);

if (!INFORMATIONAL_NOTE.startsWith("Informational, not advice.")) {
  errors.push("informational note text drifted");
}

if (errors.length) {
  console.error(`legal-footer: ${errors.length} problem(s)`);
  for (const line of errors.slice(0, 40)) console.error(`  - ${line}`);
  process.exit(1);
}

console.log(
  `legal-footer: stamped ${stamped} pages; ${already} already linked; ${skipped} redirects or non-documents skipped.`,
);
