// Prebuild: bake the latest US 2026 midterms state-results feed into the
// static export, so /us/en/live/ renders a usable board even with no
// client-side JavaScript. The page itself polls the same feed every 60
// seconds once in the browser (src/components/UsLiveResults.tsx).
//
// This never fetches a poll, a projection, or an exit poll: the feed is the
// sibling project's aggregation of official state and county sources, one
// line per state plus the District of Columbia, each with its own official
// results link. There is no countdown gate here; the board is useful before,
// during and after polls close because every state links to its own office.
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { publishFile } from "../publish-gate.mjs";

const PRIMARY = "https://mapthemidterms.com/live/results.json";
const FALLBACK = "https://raw.githubusercontent.com/joshuaofisrael/midterm-map/live-results/results.json";

const root = process.cwd();
const outFile = path.join(root, "public", "live", "us-2026-results.json");
mkdirSync(path.dirname(outFile), { recursive: true });

function emptyDoc(note) {
  return {
    generatedAt: null,
    electionDay: "2026-11-03",
    chambers: { house: { dem: null, rep: null, other: null }, senate: { dem: null, rep: null, other: null } },
    countsContinue: false,
    states: {},
    feedNote: note,
  };
}

async function fetchDoc(url) {
  const res = await fetch(`${url}${url.includes("?") ? "&" : "?"}t=${Date.now()}`, {
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  const json = await res.json();
  if (!json || typeof json !== "object" || !json.states || typeof json.states !== "object") {
    throw new Error(`${url} did not return a states map`);
  }
  return json;
}

let doc = null;
let source = null;
const local = process.env.GITHUB_ACTIONS !== "true" ? process.env.US_LIVE_SNAPSHOT_FILE : undefined;
if (local) {
  doc = JSON.parse(readFileSync(local, "utf8"));
  source = local;
} else {
  for (const url of [PRIMARY, FALLBACK]) {
    try {
      doc = await fetchDoc(url);
      source = url;
      break;
    } catch (error) {
      console.warn(`us-live snapshot: ${url} failed (${error.message})`);
    }
  }
}

if (!doc) {
  doc = emptyDoc(
    "The aggregated state-results feed could not be read at build time. Each state below links straight to its own official results site.",
  );
  console.warn("us-live snapshot: no feed reachable; wrote an empty baseline with state links only");
}

publishFile(outFile, `${JSON.stringify(doc)}\n`);
const rows = Object.keys(doc.states).length;
console.log(`us-live snapshot: ${rows} state row(s) from ${source ?? "fallback baseline"}`);
