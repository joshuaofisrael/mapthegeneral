// Prebuild snapshots for election-night feeds. Before trackerOpensAt the file
// has no counts and nothing is fetched. Israel is written by scripts/il-live.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { FEEDS } from "./feeds.mjs";
import { emptyDoc, writeFeed } from "./fetch.mjs";

const root = process.cwd();
const liveDir = path.join(root, "public", "live");
mkdirSync(liveDir, { recursive: true });
const local = process.env.GITHUB_ACTIONS !== "true";
const now = local && process.env.NIGHT_NOW ? new Date(process.env.NIGHT_NOW) : new Date();
const scratch = path.join(tmpdir(), "election-night-snapshot");

for (const feed of FEEDS) {
  if (feed.preserveSnapshot) {
    console.log(`election-night snapshot: ${feed.id} kept`);
    continue;
  }
  const file = path.join(liveDir, `${feed.id}.json`);
  const opens = new Date(emptyDoc(feed.id, "pre", null).trackerOpensAt);
  if (now < opens) {
    writeFileSync(file, JSON.stringify(emptyDoc(feed.id, "pre", null)) + "\n");
    console.log(`election-night snapshot: ${feed.id} pre`);
    continue;
  }
  try {
    await writeFeed(feed.id, scratch, now);
  } catch (error) {
    console.warn(`election-night snapshot: ${feed.id} ${error instanceof Error ? error.message : error}`);
  }
  const written = path.join(scratch, feed.id, "results.json");
  if (existsSync(written)) writeFileSync(file, readFileSync(written));
  else writeFileSync(file, JSON.stringify(emptyDoc(feed.id, "awaiting", now.toISOString())) + "\n");
  const baked = JSON.parse(readFileSync(file, "utf8"));
  console.log(`election-night snapshot: ${feed.id} ${baked.stage} rows=${baked.results.length}`);
}
