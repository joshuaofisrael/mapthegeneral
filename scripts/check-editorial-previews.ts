/**
 * Fails the build when an editorial preview is missing, the wrong length,
 * or carries a survey figure, a percent sign, or the owner’s name.
 * The body is 300 to 600 words. The byline and the Last updated line sit
 * outside that count and must still be visible.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { EDITORIAL_PREVIEWS, previewByPath } from "../src/data/editorial";
import { editorialPreviewHtml } from "../src/data/editorial/html";
import { EDITORIAL_BYLINE, EDITORIAL_UPDATED, editorialPlain, editorialWords } from "../src/data/editorial/model";

const REQUIRED = [
  "/",
  "/au/en/",
  "/br/en/",
  "/gb/en/",
  "/ie/en/",
  "/il/en/",
  "/no/en/",
  "/rs/en/",
  "/se/en/",
  "/ca/en/",
  "/ca/fr/",
  "/es/en/",
  "/es/es/",
  "/it/en/",
  "/it/it/",
  "/pl/en/",
  "/pl/pl/",
  "/mx/en/",
  "/mx/es/",
  "/ch/en/",
  "/ch/de/",
  "/ch/fr/",
  "/ch/it/",
] as const;

const KW =
  /opinion poll|voting intention|exit poll|sondage|sondaggi|sondaggio|encuesta|sondeo|sondaż|umfrage|wählerbefragung|hochrechnung|anket|世論調査|出口調査|prognos|seat projection|meningsmåling|meningsmaling|opinionsundersökning|opinionsundersokning|pobalbhreith/i;
const OWNER = /joshua israel|ventures llc|ji ventures/i;
const PLACEHOLDER = /\b(TBD|TBA|TODO|FIXME|lorem ipsum|coming soon|to be announced)\b/i;

const errors: string[] = [];

for (const path of REQUIRED) {
  if (!previewByPath(path)) errors.push(`missing preview: ${path}`);
}

for (const item of EDITORIAL_PREVIEWS) {
  const words = editorialWords(item);
  if (words < 300 || words > 600) errors.push(`${item.path}: ${words} words, need 300–600`);
  if (item.citations.length < 2) errors.push(`${item.path}: needs at least two sources`);
  const plain = editorialPlain(item);
  if (KW.test(plain)) errors.push(`${item.path}: survey wording`);
  if (item.paragraphs.join(" ").includes("%")) errors.push(`${item.path}: percent sign`);
  if (OWNER.test(plain)) errors.push(`${item.path}: owner or company name`);
  if (PLACEHOLDER.test(plain)) errors.push(`${item.path}: placeholder wording`);
  for (const cite of item.citations) {
    if (!cite.href.startsWith("https://")) errors.push(`${item.path}: citation is not https: ${cite.href}`);
    if (!cite.label.trim()) errors.push(`${item.path}: empty citation label`);
  }
  const html = editorialPreviewHtml(item);
  if (!html.includes('id="editorial-preview"')) errors.push(`${item.path}: section id missing`);
  if (!html.includes(EDITORIAL_BYLINE)) errors.push(`${item.path}: byline missing`);
  if (!html.includes(EDITORIAL_UPDATED)) errors.push(`${item.path}: Last updated line missing`);
  if (item.lang !== "en" && !item.updatedLocal) errors.push(`${item.path}: native date line missing`);
}

const about = readFileSync(join(process.cwd(), "src/app/about/page.tsx"), "utf8");
if (!about.includes("Editorial methods and sources")) errors.push("about page is missing Editorial methods and sources");
if (OWNER.test(about)) errors.push("about page names the owner or the company");

if (errors.length) {
  console.error(`editorial-previews: ${errors.length} problem(s)`);
  for (const line of errors) console.error(`  - ${line}`);
  process.exit(1);
}

console.log(`editorial-previews: ${EDITORIAL_PREVIEWS.length} previews, ${REQUIRED.length} required paths, about page has methods.`);
