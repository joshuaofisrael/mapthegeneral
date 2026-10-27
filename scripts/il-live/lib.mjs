// Israel Knesset live results: parse the Central Elections Committee (CEC)
// results CSV (expc.csv format: one row per ballot box or locality, party
// columns keyed by ballot letters), total it, and allocate 120 seats with the
// Bader-Ofer (D'Hondt) method and the surplus-vote agreements filed with the CEC.
// No dependencies, so it runs in a GitHub Action and in tests.

export const NON_PARTY = new Set([
  "סמל ועדה", "ברזל", "שם ישוב", "סמל ישוב", "קלפי", "ריכוז", "שופט",
  "בזב", "מצביעים", "פסולים", "כשרים", "סמל קלפי", "ת. עדכון", "שם ועדה", "_id",
]);

export function decode(buf) {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes).replace(/^\uFEFF/, "");
  } catch {
    return new TextDecoder("windows-1255").decode(bytes).replace(/^\uFEFF/, "");
  }
}

export function parseCsv(text) {
  const rows = [];
  let row = [], field = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { field += '"'; i++; } else q = false; }
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.some((v) => v.trim() !== "")) rows.push(row);
      row = [];
    } else field += c;
  }
  row.push(field);
  if (row.some((v) => v.trim() !== "")) rows.push(row);
  return rows;
}

const num = (v) => {
  const s = String(v ?? "").trim().replace(/,/g, "");
  if (s === "") return 0;
  const n = Number(s);
  if (!Number.isFinite(n) || n < 0) throw new Error(`bad number "${v}"`);
  return Math.round(n);
};

/** Total a CEC results CSV. Throws on anything that does not look like one. */
export function totalCsv(text) {
  if (/^\s*</.test(text)) throw new Error("source returned HTML, not CSV");
  const rows = parseCsv(text);
  const header = rows.shift()?.map((h) => h.trim());
  if (!header || !rows.length) throw new Error("empty CSV");
  for (const need of ["בזב", "מצביעים", "פסולים", "כשרים"]) {
    if (!header.includes(need)) throw new Error(`CSV missing column ${need}`);
  }
  const idx = (k) => header.indexOf(k);
  const partyCols = header.map((k, i) => ({ k, i })).filter(({ k }) => k && !NON_PARTY.has(k));
  if (partyCols.length < 5) throw new Error("CSV has too few party columns");
  const votes = Object.fromEntries(partyCols.map(({ k }) => [k, 0]));
  let registered = 0, voters = 0, invalid = 0, valid = 0, units = 0;
  for (const r of rows) {
    units++;
    registered += num(r[idx("בזב")]);
    voters += num(r[idx("מצביעים")]);
    invalid += num(r[idx("פסולים")]);
    valid += num(r[idx("כשרים")]);
    for (const { k, i } of partyCols) votes[k] += num(r[i]);
  }
  const partySum = Object.values(votes).reduce((a, b) => a + b, 0);
  if (partySum !== valid) throw new Error(`party votes ${partySum} != valid ${valid}`);
  return { units, registered, voters, invalid, valid, votes };
}

/**
 * Bader-Ofer allocation (Knesset Elections Law s. 81). `agreements` is a list
 * of letter pairs; an agreement counts only when both lists pass the threshold.
 */
export function allocate(votes, { seats = 120, threshold = 0.0325, agreements = [] } = {}) {
  const valid = Object.values(votes).reduce((a, b) => a + b, 0);
  const passing = Object.keys(votes).filter((k) => votes[k] >= threshold * valid);
  const pVotes = passing.reduce((a, k) => a + votes[k], 0);
  const quota = pVotes / seats;
  const out = Object.fromEntries(Object.keys(votes).map((k) => [k, 0]));
  if (!passing.length) return { seats: out, passing, quota: 0, thresholdVotes: threshold * valid };
  for (const k of passing) out[k] = Math.floor(votes[k] / quota);
  // Units: agreement pairs where both pass, otherwise single lists.
  const used = new Set();
  const units = [];
  for (const [a, b] of agreements) {
    if (passing.includes(a) && passing.includes(b) && !used.has(a) && !used.has(b)) {
      units.push([a, b]); used.add(a); used.add(b);
    }
  }
  for (const k of passing) if (!used.has(k)) units.push([k]);
  const uVotes = (u) => u.reduce((s, k) => s + votes[k], 0);
  const uSeats = (u) => u.reduce((s, k) => s + out[k], 0);
  let left = seats - passing.reduce((s, k) => s + out[k], 0);
  const unitExtra = new Map(units.map((u) => [u, 0]));
  while (left > 0) {
    let best = null, bestQ = -1;
    for (const u of units) {
      const q = uVotes(u) / (uSeats(u) + unitExtra.get(u) + 1);
      if (q > bestQ) { bestQ = q; best = u; }
    }
    unitExtra.set(best, unitExtra.get(best) + 1);
    left--;
  }
  // Split each pair's seats between its two lists with the same method.
  for (const u of units) {
    const total = uSeats(u) + unitExtra.get(u);
    if (u.length === 1) { out[u[0]] = total; continue; }
    const [a, b] = u;
    const q2 = (votes[a] + votes[b]) / total;
    const s = { [a]: Math.floor(votes[a] / q2), [b]: Math.floor(votes[b] / q2) };
    let rem = total - s[a] - s[b];
    while (rem > 0) {
      const k = votes[a] / (s[a] + 1) >= votes[b] / (s[b] + 1) ? a : b;
      s[k]++; rem--;
    }
    out[a] = s[a]; out[b] = s[b];
  }
  return { seats: out, passing, quota, thresholdVotes: threshold * valid };
}

/** Build the public JSON document the results page reads. */
export function buildDoc(total, { parties, agreements, eligibleTotal, ballotBoxesTotal, source, sourceUpdated, fetchedAt, stage }) {
  const alloc = allocate(total.votes, { agreements });
  const list = Object.entries(total.votes)
    .map(([letter, v]) => {
      const meta = parties[letter] ?? {};
      return {
        letter,
        he: meta.he ?? null,
        en: meta.en ?? null,
        votes: v,
        pct: total.valid ? +(100 * v / total.valid).toFixed(2) : 0,
        seats: alloc.seats[letter] ?? 0,
        aboveThreshold: alloc.passing.includes(letter),
      };
    })
    .filter((p) => p.votes > 0 || parties[p.letter])
    .sort((a, b) => b.votes - a.votes || a.letter.localeCompare(b.letter, "he"));
  return {
    schema: 1,
    election: "il-2026-knesset",
    stage, // "pre" | "preliminary" | "final"
    // partial = a count still coming in; official = the authority's final result.
    // stage remains what the results page branches on.
    officialStatus: stage === "final" ? "official" : stage === "preliminary" ? "partial" : "none",
    source,
    sourceUpdated,
    fetchedAt,
    units: total.units,
    ballotBoxesTotal,
    registeredInCounted: total.registered,
    eligibleTotal,
    voters: total.voters,
    valid: total.valid,
    invalid: total.invalid,
    turnoutInCounted: total.registered ? +(100 * total.voters / total.registered).toFixed(2) : null,
    thresholdVotes: Math.ceil(alloc.thresholdVotes),
    seatQuota: Math.round(alloc.quota),
    agreements,
    results: list,
  };
}
