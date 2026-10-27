import type { IlLang } from "@/data/il-results";

export type IlRow = {
  letter: string;
  he: string | null;
  en: string | null;
  votes: number;
  pct: number;
  seats: number;
  aboveThreshold: boolean;
};
export type IlDoc = {
  stage: "pre" | "awaiting" | "preliminary" | "final";
  fetchedAt: string | null;
  sourceUpdated?: string | null;
  units?: number;
  ballotBoxesTotal?: number;
  registeredInCounted?: number;
  eligibleTotal?: number;
  voters?: number;
  valid?: number;
  invalid?: number;
  turnoutInCounted?: number | null;
  thresholdVotes?: number;
  results: IlRow[];
};

/** Neutral palette assigned by vote rank, never by party identity. */

const PALETTE = ["#1e4a73", "#c2410c", "#0f766e", "#7c3aed", "#b45309", "#be185d", "#4d7c0f", "#0369a1", "#9f1239", "#475569", "#a16207", "#0e7490", "#6d28d9", "#15803d"];

export const partyName = (lang: IlLang, p: IlRow) => (lang === "he" ? p.he : p.en) ?? p.letter;

function seatLayout(rows = 8, total = 120) {
  const r0 = 70, r1 = 190;
  const radii = Array.from({ length: rows }, (_, i) => r0 + ((r1 - r0) * i) / (rows - 1));
  const sum = radii.reduce((a, b) => a + b, 0);
  const counts = radii.map((r) => Math.floor((total * r) / sum));
  let rest = total - counts.reduce((a, b) => a + b, 0);
  for (let i = rows - 1; rest > 0; i = (i - 1 + rows) % rows, rest--) counts[i]++;
  const pts: { x: number; y: number; a: number }[] = [];
  radii.forEach((r, i) => {
    const n = counts[i];
    for (let j = 0; j < n; j++) {
      const a = Math.PI - (Math.PI * j) / (n - 1);
      pts.push({ x: 200 + r * Math.cos(a), y: 205 - r * Math.sin(a), a });
    }
  });
  return pts.sort((p, q) => q.a - p.a);
}
const SEATS = seatLayout();

export function Hemicycle({ lang, rows, colors, seatLabel }: { lang: IlLang; rows: IlRow[]; colors: Record<string, string>; seatLabel?: string }) {
  const seq: string[] = [];
  for (const p of rows) for (let i = 0; i < p.seats; i++) seq.push(p.letter);
  const t = { hemicycle: lang === "he" ? "חלוקת 120 המושבים בכנסת לפי הספירה עד כה" : "How the 120 Knesset seats divide on the count so far", majority: lang === "he" ? "61 לרוב" : "61 for a majority" };
  const label = seatLabel ? `${t.hemicycle}. ${seatLabel}` : t.hemicycle;
  return (
    <figure className="m-0">
      <svg viewBox="0 0 400 215" role="img" aria-label={label} className="h-auto w-full">
        {SEATS.map((s, i) => {
          // In Hebrew the chart reads right to left, like the page.
          const letter = seq[lang === "he" ? i : i] ?? null;
          const x = lang === "he" ? 400 - s.x : s.x;
          return <circle key={i} cx={x} cy={s.y} r={6.2} fill={letter ? colors[letter] : "#d5dde6"} />;
        })}
        <line x1="200" y1="10" x2="200" y2="210" stroke="#143251" strokeDasharray="3 3" strokeWidth="1" />
        <text x="200" y="208" textAnchor="middle" fontSize="15" fontWeight="700" fill="#143251">
          {seq.length ? `${seq.length}/120` : "120"}
        </text>
      </svg>
      <figcaption className="mt-1 text-center text-xs text-ink-soft">
        {t.hemicycle} · {t.majority}
        {seatLabel ? <span className="mt-1 block font-semibold text-ink" data-il-seat-label>{seatLabel}</span> : null}
      </figcaption>
    </figure>
  );
}

export function colorMap(rows: IlRow[]) {
  return Object.fromEntries(rows.map((p, i) => [p.letter, p.aboveThreshold ? PALETTE[i % PALETTE.length] : "#94a3b8"]));
}

