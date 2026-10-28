// Writes <outDir>/<id>/results.json for the same-origin /il-live feed.
// Before trackerOpensAt nothing is fetched and the file has no counts.
// After that, only an allowlisted official URL is read. A file is accepted
// only when it is already in this site's results schema. Native HTML is not
// turned into numbers. Polls are never read.
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { FEEDS, feedById, hostAllowed } from "./feeds.mjs";
import { publishFile } from "../publish-gate.mjs";

export const OPENS = {
  "bg-2026-11-01": "2026-11-01T21:00:00+02:00",
  "nz-2026-11-07": "2026-11-07T19:00:00+13:00",
  "ie-2026-seanad": "2026-11-06T11:00:00+00:00",
  "it-2026-chieti": "2026-11-16T15:00:00+01:00",
  "pl-2026-senat-20": "2026-11-22T21:00:00+01:00",
  "au-vic-2026": "2026-11-28T18:00:00+11:00",
  "es-2026-generales": "2026-11-29T21:00:00+01:00",
  "ch-2026-11-29": "2026-11-29T12:00:00+01:00",
  "tw-2026-local": "2026-11-29T00:00:00+08:00",
  "ee-2027-03-07": "2027-03-07T20:15:00+02:00",
  "nl-2027-03-17": "2027-03-17T21:00:00+01:00",
  "fi-2027-04-18": "2027-04-18T20:00:00+03:00",
};

function setOutput(key, value) {
  if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `${key}=${value}\n`);
  console.log(`${key}=${value}`);
}

function fingerprint(doc) {
  if (!doc) return "";
  return JSON.stringify([
    doc.stage,
    (doc.results ?? []).map((row) => [row.name, row.votes, row.share]),
  ]);
}

export function emptyDoc(id, stage, fetchedAt) {
  return {
    schema: 1,
    election: id,
    trackerOpensAt: OPENS[id],
    stage,
    fetchedAt,
    sourceUpdated: null,
    source: feedById(id)?.officialUrl ?? null,
    officialStatus: "none",
    results: [],
  };
}

export function acceptOfficial(id, data) {
  if (!data || data.schema !== 1 || data.election !== id) return null;
  if (data.stage !== "preliminary" && data.stage !== "final") return null;
  if (!Array.isArray(data.results)) return null;
  const results = [];
  for (const row of data.results) {
    if (!row || typeof row.name !== "string" || !row.name.trim()) return null;
    if (typeof row.votes !== "number" || !Number.isFinite(row.votes) || row.votes < 0) return null;
    const next = { name: row.name, votes: row.votes };
    if (row.share != null) {
      if (typeof row.share !== "number" || !Number.isFinite(row.share)) return null;
      next.share = row.share;
    }
    results.push(next);
  }
  return {
    schema: 1,
    election: id,
    trackerOpensAt: OPENS[id],
    stage: data.stage,
    fetchedAt: new Date().toISOString(),
    sourceUpdated: typeof data.sourceUpdated === "string" ? data.sourceUpdated : null,
    source: feedById(id)?.officialUrl ?? null,
    officialStatus: data.stage === "final" ? "official" : "partial",
    results,
  };
}

async function readOfficial(feed, now) {
  const override = (process.env.NIGHT_RESULTS_URL ?? "").trim();
  const url = override || feed.officialUrl;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  if (parsed.protocol !== "https:" || !hostAllowed(parsed.hostname, feed.hosts)) {
    console.warn(`refused ${url}`);
    return null;
  }
  const res = await fetch(`${url}${url.includes("?") ? "&" : "?"}t=${now.getTime()}`, {
    signal: AbortSignal.timeout(45_000),
    headers: {
      "user-agent": "mapthegeneral.com results page (+https://mapthegeneral.com/)",
      accept: "application/json,text/json",
    },
  });
  if (!res.ok) {
    const challenged = res.status === 403 || res.status === 429 || res.status === 503 || Boolean(res.headers.get("cf-mitigated"));
    throw new Error(challenged ? `challenged HTTP ${res.status}` : `HTTP ${res.status}`);
  }
  const type = res.headers.get("content-type") ?? "";
  if (!type.includes("json") && !parsed.pathname.endsWith(".json")) {
    console.warn(`${feed.id}: official response is not a JSON count file; awaiting, no count`);
    return null;
  }
  return acceptOfficial(feed.id, await res.json());
}

const CONFIRM = new Set(["bg-2026-11-01"]);

function publicationBlocked(id) {
  let all;
  try {
    all = JSON.parse(readFileSync(new URL("../../data/release-status.json", import.meta.url), "utf8"));
  } catch {
    return "release-status missing";
  }
  const row = all[id] ?? {};
  if (row.pollingExtended === true) return "polling extended";
  if (CONFIRM.has(id) && row.votingEnded !== true) return "no end-of-voting confirmation";
  return null;
}

export async function writeFeed(id, outRoot, now = new Date()) {
  const feed = feedById(id);
  const opens = OPENS[id];
  if (!feed || !opens) throw new Error(`unknown night feed ${id}`);
  const outDir = path.join(outRoot, id);
  mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "results.json");
  const prev = existsSync(outFile) ? JSON.parse(readFileSync(outFile, "utf8")) : null;
  let doc;
  const blocked = publicationBlocked(id);
  if (now < new Date(opens) || blocked) {
    doc = emptyDoc(id, "pre", null);
    console.log(blocked ? `${id}: closed (${blocked}), no fetch` : `${id}: polls still open, no fetch`);
  } else {
    try {
      doc = await readOfficial(feed, now);
    } catch (error) {
      console.warn(`${id}: ${error instanceof Error ? error.message : error}`);
      doc = null;
    }
    if (!doc) {
      doc = emptyDoc(id, "awaiting", now.toISOString());
      console.log(`${id}: feed failed; no count published`);
      if (prev && fingerprint(prev) === fingerprint(doc)) {
        setOutput("changed", "false");
        setOutput("stage", "awaiting");
        console.log(`${id}: still awaiting an official count file`);
        return false;
      }
    }
  }
  const changed = fingerprint(doc) !== fingerprint(prev);
  if (changed || !prev) publishFile(outFile, JSON.stringify(doc, null, 1) + "\n");
  setOutput("changed", changed ? "true" : "false");
  setOutput("stage", doc.stage);
  return changed;
}

const isMain = process.argv[1] && process.argv[1].endsWith("fetch.mjs");
if (isMain) {
  const id = process.argv[2];
  const outRoot = process.argv[3] ?? "election-night-out";
  const local = process.env.GITHUB_ACTIONS !== "true";
  const now = local && process.env.NIGHT_NOW ? new Date(process.env.NIGHT_NOW) : new Date();
  const ids = !id || id === "all" ? FEEDS.map((feed) => feed.id) : [id];
  const run = async () => {
    let changed = false;
    for (const feedId of ids) {
      if (await writeFeed(feedId, outRoot, now)) changed = true;
    }
    if (ids.length > 1) setOutput("changed", changed ? "true" : "false");
  };
  run();
}
