// Offline test: total the official 2022 (25th Knesset) results by locality and
// check the Bader-Ofer allocation reproduces the official 120 seats.
import { readFileSync } from "node:fs";
import { totalCsv, allocate, buildDoc } from "./lib.mjs";
const file = process.argv[2] ?? "scripts/il-live/fixtures/k25-localities.csv";
const t = totalCsv(readFileSync(file, "utf8"));
const agreements = [["פה", "כן"], ["מחל", "ט"], ["שס", "ג"], ["אמת", "מרצ"]];
const { seats } = allocate(t.votes, { agreements });
const expect = { "מחל": 32, "פה": 24, "ט": 14, "כן": 12, "שס": 11, "ג": 7, "ל": 6, "עם": 5, "ום": 5, "אמת": 4 };
let ok = t.valid === 4764742 && t.voters === 4794593 && t.registered === 6788804;
for (const [k, v] of Object.entries(expect)) if (seats[k] !== v) { ok = false; console.error(`seat mismatch ${k}: ${seats[k]} != ${v}`); }
const sum = Object.values(seats).reduce((a, b) => a + b, 0);
if (sum !== 120) { ok = false; console.error(`total seats ${sum}`); }
const doc = buildDoc(t, { parties: {}, agreements, eligibleTotal: 6788804, ballotBoxesTotal: null, source: "test", sourceUpdated: null, fetchedAt: new Date().toISOString(), stage: "final" });
if (doc.results[0].letter !== "מחל") ok = false;
console.log(ok ? "il-live test: PASS (2022 official seats reproduced)" : "il-live test: FAIL");
process.exit(ok ? 0 : 1);
