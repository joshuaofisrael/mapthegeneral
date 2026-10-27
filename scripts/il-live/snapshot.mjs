// Prebuild: bake the latest CEC-derived results into the static export and
// draw the 1200x630 share image. Before polls close nothing is fetched and the
// snapshot carries no counts (docs/live-tracker-legal-spec.md).
import { mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { publishFile } from "../publish-gate.mjs";

const OPENS = Date.parse("2026-10-27T22:00:00+02:00");
const RAW = "https://raw.githubusercontent.com/joshuaofisrael/mapthegeneral/il-live-data/il-2026-knesset/results.json";
const root = process.cwd();
const liveFile = path.join(root, "public", "live", "il-2026-knesset.json");
const ogFile = path.join(root, "public", "og", "il-results-2026.png");
mkdirSync(path.dirname(liveFile), { recursive: true });
mkdirSync(path.dirname(ogFile), { recursive: true });

let doc = { schema: 1, election: "il-2026-knesset", stage: "pre", fetchedAt: null, results: [] };
const now = process.env.IL_LIVE_NOW && process.env.GITHUB_ACTIONS !== "true" ? Date.parse(process.env.IL_LIVE_NOW) : Date.now();
if (now >= OPENS) {
  try {
    const local = process.env.GITHUB_ACTIONS !== "true" ? process.env.IL_SNAPSHOT_FILE : undefined;
    const next = local
      ? JSON.parse(readFileSync(local, "utf8"))
      : await (await fetch(`${RAW}?t=${Date.now()}`, { signal: AbortSignal.timeout(20000) })).json();
    if (next && Array.isArray(next.results)) doc = next;
  } catch (e) {
    console.warn(`il snapshot: no live data (${e.message})`);
    doc.stage = "awaiting";
  }
}
publishFile(liveFile, JSON.stringify(doc));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const PALETTE = ["#1e4a73", "#c2410c", "#0f766e", "#7c3aed", "#b45309", "#be185d", "#4d7c0f", "#0369a1", "#9f1239", "#475569", "#a16207", "#0e7490", "#6d28d9", "#15803d"];
function seats(rows = 8, total = 120) {
  const radii = Array.from({ length: rows }, (_, i) => 110 + (190 * i) / (rows - 1));
  const sum = radii.reduce((a, b) => a + b, 0);
  const counts = radii.map((r) => Math.floor((total * r) / sum));
  let rest = total - counts.reduce((a, b) => a + b, 0);
  for (let i = rows - 1; rest > 0; i = (i - 1 + rows) % rows, rest--) counts[i]++;
  const pts = [];
  radii.forEach((r, i) => {
    for (let j = 0; j < counts[i]; j++) {
      const a = Math.PI - (Math.PI * j) / (counts[i] - 1);
      pts.push({ x: 330 + r * Math.cos(a), y: 520 - r * Math.sin(a), a });
    }
  });
  return pts.sort((p, q) => q.a - p.a);
}
const above = doc.results.filter((p) => p.aboveThreshold);
const seq = [];
above.forEach((p, i) => { for (let k = 0; k < p.seats; k++) seq.push(PALETTE[i % PALETTE.length]); });
const dots = seats().map((s, i) => `<circle cx="${s.x.toFixed(1)}" cy="${s.y.toFixed(1)}" r="10" fill="${seq[i] ?? "#d5dde6"}"/>`).join("");
const counted = doc.results.length > 0;
const stamp = doc.fetchedAt
  ? new Date(doc.fetchedAt).toLocaleString("en-GB", { timeZone: "Asia/Jerusalem", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) + " Israel time"
  : "";
const seatLabel = "Unofficial seat allocation calculated from partial official vote totals; not final and not an official seat allocation.";
const legend = counted
  ? above.slice(0, 8).map((p, i) => `<g transform="translate(700 ${140 + i * 36})"><circle cx="10" cy="-8" r="10" fill="${PALETTE[i % PALETTE.length]}"/><text x="32" y="0" font-size="24" fill="#1a2332">${esc(((n) => (n.length > 22 ? n.slice(0, 21) + "…" : n))(p.en ?? p.letter))}</text><text x="440" y="0" font-size="26" font-weight="700" text-anchor="end" fill="#1a2332">${p.seats}</text></g>`).join("")
    + `<text x="700" y="450" font-size="16" fill="#1a2332">Unofficial seat allocation calculated from</text><text x="700" y="472" font-size="16" fill="#1a2332">partial official vote totals; not final and</text><text x="700" y="494" font-size="16" fill="#1a2332">not an official seat allocation.</text>`
  : `<text x="700" y="180" font-size="28" font-weight="700" fill="#143251">Vote totals from 22:00 Israel time</text><text x="700" y="230" font-size="20" fill="#1a2332">Unofficial seat allocation calculated from</text><text x="700" y="258" font-size="20" fill="#1a2332">partial official vote totals; not final and</text><text x="700" y="286" font-size="20" fill="#1a2332">not an official seat allocation.</text><text x="700" y="330" font-size="18" fill="#4a5568">No polls. 61 seats for a majority.</text>`;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" font-family="DejaVu Sans, Arial, sans-serif">
<rect width="1200" height="630" fill="#f6f7f9"/><rect width="1200" height="96" fill="#143251"/>
<text x="40" y="62" font-size="40" font-weight="700" fill="#fff">Israel election results 2026 · 26th Knesset</text>
${dots}<line x1="330" y1="200" x2="330" y2="525" stroke="#143251" stroke-dasharray="6 6" stroke-width="2"/>
<text x="330" y="580" font-size="26" font-weight="700" text-anchor="middle" fill="#143251">${counted ? `${seq.length}/120 seats · 61 for a majority` : "120 seats · 61 for a majority"}</text>
${legend}
<text x="40" y="600" font-size="15" fill="#1a2332">${esc(seatLabel)}</text>
<text x="40" y="622" font-size="16" fill="#4a5568">${counted ? esc(`${stamp}`) : "mapthegeneral.com/il/en/results/"}</text>
</svg>`;
try {
  const sharp = (await import("sharp")).default;
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(ogFile);
  console.log(`il snapshot: stage=${doc.stage} rows=${doc.results.length}; OG image written`);
} catch (e) {
  console.warn(`il snapshot: OG image not rendered (${e.message})`);
}
