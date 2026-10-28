#!/usr/bin/env node
// Add one entry to the Israel "Live updates" feed (src/data/il-2026-live-updates.json), newest first.
// Usage:
//   node scripts/add-il-live-update.mjs --time 2026-10-28T09:15:00+02:00 \
//     --he-headline "..." --he-body "..." --en-headline "..." --en-body "..." \
//     --source "The Times of Israel|https://..." [--source "Name|URL" ...]
//   --time defaults to now. At least one --source is required. Run the legal check before pushing.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const file = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "il-2026-live-updates.json");
const args = process.argv.slice(2);
const opt = { sources: [] };
for (let i = 0; i < args.length; i += 2) {
  const k = args[i], v = args[i + 1];
  if (v === undefined) throw new Error(`missing value for ${k}`);
  if (k === "--source") {
    const [name, url] = v.split("|");
    if (!name || !/^https?:\/\//.test(url ?? "")) throw new Error(`--source must be "Name|https://url": ${v}`);
    opt.sources.push({ name: name.trim(), url: url.trim() });
  } else opt[k.replace(/^--/, "")] = v;
}
const need = ["en-headline", "en-body", "he-headline", "he-body"];
for (const k of need) if (!opt[k]) throw new Error(`--${k} is required`);
if (!opt.sources.length) throw new Error("at least one --source is required");
const time = opt.time ? new Date(opt.time) : new Date();
if (Number.isNaN(time.getTime())) throw new Error(`bad --time ${opt.time}`);
const entry = {
  time: opt.time ?? time.toISOString(),
  headline_en: opt["en-headline"], body_en: opt["en-body"],
  headline_he: opt["he-headline"], body_he: opt["he-body"],
  sources: opt.sources,
};
const list = JSON.parse(readFileSync(file, "utf8"));
list.push(entry);
list.sort((a, b) => new Date(b.time) - new Date(a.time));
writeFileSync(file, JSON.stringify(list, null, 2) + "\n");
console.log(`added "${entry.headline_en}" (${entry.time}); ${list.length} entries`);
