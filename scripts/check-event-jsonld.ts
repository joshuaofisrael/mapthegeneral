/**
 * Fails the build when an Event JSON-LD node has no organizer, endDate, or image.
 * Image must be an absolute https URL. Nested Events, including one inside
 * LiveBlogPosting.about, are checked. Scans out/ after export, or public/ before it.
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

function walk(dir: string, files: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) walk(full, files);
    else if (name.endsWith(".html")) files.push(full);
  }
  return files;
}

function hasOrganizer(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  if (!value || typeof value !== "object") return false;
  const name = (value as { name?: unknown }).name;
  return typeof name === "string" && name.trim().length > 0;
}

function hasImage(value: unknown): boolean {
  if (typeof value === "string") return value.startsWith("https://");
  if (Array.isArray(value)) return value.length > 0 && value.every((item) => hasImage(item));
  if (value && typeof value === "object") {
    const url = (value as { url?: unknown }).url;
    return typeof url === "string" && url.startsWith("https://");
  }
  return false;
}

export function eventJsonLdProblems(value: unknown, where = "$"): string[] {
  const problems: string[] = [];
  walkNode(value, problems, where);
  return problems;
}

function walkNode(value: unknown, problems: string[], where: string): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkNode(item, problems, `${where}[${index}]`));
    return;
  }
  if (!value || typeof value !== "object") return;
  const node = value as Record<string, unknown>;
  const type = node["@type"];
  const types = Array.isArray(type) ? type : typeof type === "string" ? [type] : [];
  if (types.includes("Event")) {
    if (!hasOrganizer(node.organizer)) problems.push(`${where}: Event has no organizer`);
    if (typeof node.endDate !== "string" || !node.endDate.trim()) problems.push(`${where}: Event has no endDate`);
    if (!hasImage(node.image)) problems.push(`${where}: Event has no image`);
  }
  for (const [key, child] of Object.entries(node)) {
    if (child && typeof child === "object") walkNode(child, problems, `${where}.${key}`);
  }
}

function selfTest(): string[] {
  const errors: string[] = [];
  const missingImage = eventJsonLdProblems({
    "@type": "Event",
    organizer: { "@type": "Organization", name: "Централна избирателна комисия" },
    endDate: "2026-11-01T21:00:00+02:00",
  });
  if (!missingImage.some((line) => line.includes("image"))) errors.push("self-test did not flag a missing image");
  const missingOrganizer = eventJsonLdProblems({
    "@type": "Event",
    endDate: "2026-11-01T21:00:00+02:00",
    image: "https://mapthegeneral.com/og.png",
  });
  if (!missingOrganizer.some((line) => line.includes("organizer"))) errors.push("self-test did not flag a missing organizer");
  const missingEnd = eventJsonLdProblems({
    "@type": "Event",
    organizer: { name: "Централна избирателна комисия" },
    image: ["https://mapthegeneral.com/og.png"],
  });
  if (!missingEnd.some((line) => line.includes("endDate"))) errors.push("self-test did not flag a missing endDate");
  const nested = eventJsonLdProblems({
    "@type": "LiveBlogPosting",
    about: {
      "@type": "Event",
      organizer: { "@type": "Organization", name: "Централна избирателна комисия" },
      endDate: "2026-11-01T21:00:00+02:00",
      image: ["https://mapthegeneral.com/og.png"],
    },
  });
  if (nested.length) errors.push(`self-test rejected a complete nested Event: ${nested.join("; ")}`);
  return errors;
}

const root = process.cwd();
const outDir = path.join(root, "out");
const scan = existsSync(outDir) ? outDir : path.join(root, "public");
const errors = selfTest();
let eventScripts = 0;

if (!existsSync(scan)) {
  errors.push(`no HTML directory at ${scan}`);
} else {
  for (const file of walk(scan)) {
    const html = readFileSync(file, "utf8");
    if (!html.includes('"@type":"Event"') && !html.includes('"@type": "Event"')) continue;
    const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    for (const match of html.matchAll(re)) {
      if (!match[1].includes("Event")) continue;
      eventScripts += 1;
      let data: unknown;
      try {
        data = JSON.parse(match[1]);
      } catch (error) {
        errors.push(`${path.relative(root, file)}: JSON-LD did not parse (${error instanceof Error ? error.message : String(error)})`);
        continue;
      }
      errors.push(...eventJsonLdProblems(data, path.relative(root, file)));
    }
  }
}

if (errors.length) {
  console.error(`event-jsonld: ${errors.length} problem(s)`);
  for (const line of errors.slice(0, 40)) console.error(`  - ${line}`);
  process.exit(1);
}
console.log(`event-jsonld: ${eventScripts} Event script(s) in ${path.relative(root, scan) || scan} have organizer, endDate, and image.`);
