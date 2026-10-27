/**
 * Fails the Pages build when rendered HTML shows placeholder copy.
 * Matches whole words, case-insensitive, in visible text only. Script,
 * style, comments, and attributes such as placeholder="" are ignored.
 * “not yet” is not banned: published pages use it for a real gap.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const PATTERNS: { label: string; re: RegExp }[] = [
  { label: "not retrieved", re: /\bnot retrieved\b/i },
  { label: "TBD", re: /\bTBD\b/i },
  { label: "TBA", re: /\bTBA\b/i },
  { label: "TODO", re: /\bTODO\b/i },
  { label: "FIXME", re: /\bFIXME\b/i },
  { label: "lorem ipsum", re: /\blorem ipsum\b/i },
  { label: "placeholder", re: /\bplaceholder\b/i },
  { label: "coming soon", re: /\bcoming soon\b/i },
  { label: "to be announced", re: /\bto be announced\b/i },
  { label: "do uzupełnienia", re: /\bdo uzupełnienia\b/i },
  { label: "wkrótce", re: /\bwkrótce\b/i },
  { label: "brak danych", re: /\bbrak danych\b/i },
  { label: "nie ogłoszono", re: /\bnie ogłoszono\b/i },
];

/** Path substrings whose visible text may contain a banned phrase for a real reason. Empty until one exists. */
const ALLOWLIST: { pathIncludes: string; label: string }[] = [];

export function visibleText(html: string): string {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'");
}

export function placeholderLabels(text: string): string[] {
  return PATTERNS.filter((pattern) => pattern.re.test(text)).map((pattern) => pattern.label);
}

function selfCheck(): string[] {
  const problems: string[] = [];
  if (!placeholderLabels("Names to be announced").includes("to be announced")) {
    problems.push("self-check: “to be announced” was accepted");
  }
  if (placeholderLabels("RIK has not yet published the final report").length) {
    problems.push("self-check: “not yet” was banned");
  }
  if (placeholderLabels(visibleText('<input placeholder="Country">')).length) {
    problems.push("self-check: an input placeholder attribute was treated as page text");
  }
  if (!placeholderLabels("The table was not retrieved.").includes("not retrieved")) {
    problems.push("self-check: “not retrieved” was accepted");
  }
  if (placeholderLabels("A direct request returned HTTP 403 that day.").length) {
    problems.push("self-check: an HTTP 403 sentence was banned");
  }
  return problems;
}

function htmlFiles(dir: string): string[] {
  const found: string[] = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    const stat = statSync(path);
    if (stat.isDirectory()) found.push(...htmlFiles(path));
    else if (name.endsWith(".html")) found.push(path);
  }
  return found;
}

const errors = selfCheck();
const root = process.cwd();
const outDir = join(root, "out");
let files: string[] = [];
try {
  files = htmlFiles(outDir);
} catch {
  errors.push("out/ is missing; this check runs after the static export");
}

let hits = 0;
for (const file of files) {
  const relative = file.slice(root.length + 1);
  const text = visibleText(readFileSync(file, "utf8"));
  for (const label of placeholderLabels(text)) {
    if (ALLOWLIST.some((item) => item.label === label && relative.includes(item.pathIncludes))) continue;
    hits += 1;
    if (hits <= 25) errors.push(`${relative}: visible text contains “${label}”`);
  }
}
if (hits > 25) errors.push(`and ${hits - 25} more placeholder hit(s)`);

if (errors.length) {
  console.error(`placeholder-text: ${errors.length} problem(s)`);
  for (const line of errors) console.error(`  - ${line}`);
  process.exit(1);
}
console.log(`placeholder-text: ${files.length} rendered pages have no placeholder copy.`);
