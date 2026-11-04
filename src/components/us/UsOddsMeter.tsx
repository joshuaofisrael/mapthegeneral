/** Prediction-market odds for House and Senate control, read from Kalshi's public API at build time.
 * The page rebuilds whenever the live tracker writes new figures, so the odds refresh with it.
 * If Kalshi can't be reached, the meter is left out rather than showing stale or made-up numbers. */
const API = "https://api.elections.kalshi.com/trade-api/v2/markets?event_ticker=";

type Row = { label: string; url: string; d: number; r: number };

async function read(event: string, label: string, url: string): Promise<Row | null> {
  try {
    const res = await fetch(API + event);
    if (!res.ok) return null;
    const { markets } = (await res.json()) as { markets: { ticker: string; last_price_dollars?: string }[] };
    const p = (s: string) => Number(markets.find((m) => m.ticker.endsWith("-" + s))?.last_price_dollars);
    const d = p("D"), r = p("R");
    if (!Number.isFinite(d) || !Number.isFinite(r)) return null;
    return { label, url, d: Math.round(d * 100), r: Math.round(r * 100) };
  } catch {
    return null;
  }
}

export async function UsOddsMeter() {
  const rows = (
    await Promise.all([
      read("CONTROLH-2026", "House control", "https://kalshi.com/markets/controlh/house-winner"),
      read("CONTROLS-2026", "Senate control", "https://kalshi.com/markets/controls/senate-winner"),
    ])
  ).filter((x): x is Row => x !== null);
  if (!rows.length) return null;
  const at = new Date().toISOString();
  const shown = new Intl.DateTimeFormat("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(new Date(at));
  return (
    <section aria-labelledby="odds" className="mb-10 rounded-xl border border-line bg-paper-card p-5 text-sm" data-us-odds-meter>
      <h2 id="odds" className="font-serif text-xl font-semibold text-ink">Win probability meter: who will control Congress?</h2>
      <p className="mt-1 text-xs text-ink-soft">
        Prediction market odds (Kalshi), not a forecast or official result. Last price per contract, read <time dateTime={at}>{shown}</time> Eastern.
      </p>
      <div className="mt-4 space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex justify-between font-semibold text-ink">
              <span>Democrats {row.d}%</span>
              <span>{row.label}</span>
              <span>Republicans {row.r}%</span>
            </div>
            <div className="mt-1 flex h-4 overflow-hidden rounded-full bg-line" role="img" aria-label={`${row.label}: Democrats ${row.d}%, Republicans ${row.r}% on Kalshi`}>
              <div style={{ width: `${row.d}%`, background: "#2563eb" }} />
              <div style={{ flex: 1 }} />
              <div style={{ width: `${row.r}%`, background: "#dc2626" }} />
            </div>
            <a className="mt-1 inline-block text-xs text-navy underline" href={row.url} rel="noopener noreferrer">Source: Kalshi {row.label.toLowerCase()} market</a>
          </div>
        ))}
      </div>
    </section>
  );
}
