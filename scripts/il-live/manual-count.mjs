#!/usr/bin/env node
// Update the hand-copied Israel partial count (src/data/il-2026-manual-count.json).
// Usage:
//   node scripts/il-live/manual-count.mjs --pct 63.1 --as-of 2026-10-28T09:40:00+02:00 \
//     --source https://... --seats "מחל=27,דרך=21,ודם=12,רק=11,אמת=9,ג=9,ל=8,שס=7,ב=6,ט=6,עם=4" \
//     [--below "The Reservists=2.6,People of Israel (Amcha Yisrael)=1.6,Charedi Public=0.2"] [--off]
// Seats must sum to 120. --off hides the block (e.g. once the live feed works).
import { readFileSync, writeFileSync } from "node:fs";
const file = new URL("../../src/data/il-2026-manual-count.json", import.meta.url);
const d = JSON.parse(readFileSync(file, "utf8"));
const a = Object.fromEntries(process.argv.slice(2).join(" ").split(/\s?--/).filter(Boolean).map((x) => { const i = x.indexOf(" "); return i < 0 ? [x, true] : [x.slice(0, i), x.slice(i + 1).trim()]; }));
if (a.off) d.active = false; else d.active = true;
if (a.pct) d.countedPct = Number(a.pct);
if (a["as-of"]) {
  d.asOf = a["as-of"];
  const dt = new Date(d.asOf);
  const hm = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jerusalem", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(dt);
  const day = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Jerusalem", day: "numeric", month: "short", year: "numeric" }).format(dt);
  const he = new Intl.DateTimeFormat("he-IL", { timeZone: "Asia/Jerusalem", day: "2-digit", month: "2-digit", year: "numeric" }).format(dt);
  d.asOfLabel = { he: `${hm} שעון ישראל, ${he}`, en: `${hm} Israel time, ${day}` };
}
if (a.source) d.source.url = a.source;
if (a.seats) {
  const m = Object.fromEntries(a.seats.split(",").map((x) => x.split("=").map((s) => s.trim())));
  for (const p of d.seats) if (m[p.id] != null) p.seats = Number(m[p.id]);
  d.seats.sort((x, y) => y.seats - x.seats);
}
if (a.below) {
  const m = Object.fromEntries(a.below.split(",").map((x) => x.split("=").map((s) => s.trim())));
  for (const p of d.belowThreshold) if (m[p.en] != null) p.pct = Number(m[p.en]);
}
const total = d.seats.reduce((s, p) => s + p.seats, 0);
if (d.active && total !== 120) { console.error(`seats sum to ${total}, not 120; not written`); process.exit(1); }
d.copiedAt = new Date().toISOString();
writeFileSync(file, JSON.stringify(d, null, 2) + "\n");
console.log(`written: ${d.countedPct}% as of ${d.asOf}, ${total} seats, active=${d.active}`);
