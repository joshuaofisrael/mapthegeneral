// Fails the build when a page renders a candidate list but a candidate whose
// data has a verified profile link appears on that page without the link.
// A page renders a list when its visible text names two or more of its candidates;
// every <li> or table row there that begins with a linked candidate must carry the link.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const out = join(root, "out");
const dataDir = join(root, "src/data/candidates");

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path, files);
    else if (name.endsWith(".html")) files.push(path);
  }
  return files;
}
const decode = (s) =>
  s.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, "&");

const lists = readdirSync(dataDir)
  .filter((f) => f.endsWith(".json"))
  .map((f) => JSON.parse(readFileSync(join(dataDir, f), "utf8")));
const linked = lists.flatMap((list) =>
  list.candidates
    .map((row) => ({ list: list.id, name: row.name, href: row.links?.find((l) => l.kind === "profile")?.href }))
    .filter((row) => row.href),
);

const problems = [];
const seen = new Map(linked.map((row) => [`${row.list}\t${row.name}`, 0]));
for (const file of walk(out)) {
  const raw = readFileSync(file, "utf8");
  if (raw.includes('http-equiv="refresh"')) continue;
  const html = decode(raw);
  const body = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<head[\s\S]*?<\/head>/, "");
  const text = body.replace(/<[^>]+>/g, " ");
  for (const list of lists) {
    const sourceUrl = list.source?.url;
    if (!sourceUrl || !html.includes(sourceUrl)) continue;
    const named = list.candidates.filter((row) => text.includes(row.name));
    if (named.length < 2) continue;
    const rows = body.match(/<(li|tr)[\s>][\s\S]*?<\/\1>/g) ?? [];
    for (const row of linked.filter((r) => r.list === list.id)) {
      const key = `${row.list}\t${row.name}`;
      for (const item of rows.filter((el) => el.replace(/<[^>]+>/g, " ").trim().startsWith(row.name))) {
        if (item.includes(`href="${row.href}"`)) seen.set(key, seen.get(key) + 1);
        else problems.push(`${relative(out, file)}: ${row.name} (${row.list}) is listed without its profile link`);
      }
    }
  }
}
for (const [key, count] of seen) if (!count) problems.push(`${key.replace("\t", ": ")} has a profile link in the data but no page renders it as a link`);
if (problems.length) {
  console.error(`rendered-profile-links: ${problems.length} problems\n  ${problems.slice(0, 20).join("\n  ")}`);
  process.exit(1);
}
console.log(`rendered-profile-links: ${linked.length} linked candidates render as links on every page that lists them.`);
