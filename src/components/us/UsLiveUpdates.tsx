import updates from "@/data/us-2026-live-updates.json";

/** Journalist-style live updates (hand-written, attributed, sourced). Kept apart from the official-file results below. */
const US_UPDATES = [...updates].sort((a, b) => +new Date(b.time) - +new Date(a.time));

function usTime(iso: string, withDate = false) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "numeric",
    minute: "2-digit",
    ...(withDate ? { month: "short", day: "numeric" } : {}),
  }).format(new Date(iso));
}

export function UsLiveUpdates() {
  if (!US_UPDATES.length) return null;
  const latest = US_UPDATES[0].time;
  return (
    <section aria-labelledby="updates" className="mb-10" data-us-live-updates>
      <h2 id="updates" className="mb-1 font-serif text-xl font-semibold text-ink">Live updates: race calls and key results</h2>
      <p className="mb-1 text-sm font-semibold text-navy-deep" role="status">
        Updated <time dateTime={latest}>{usTime(latest)}</time> Eastern
      </p>
      <p className="mb-3 text-xs text-ink-soft">
        Our summaries of reporting from the named sources. Race calls are media projections, not official results; official figures from state files are in the results section below.
      </p>
      <ol className="space-y-3">
        {US_UPDATES.map((u) => (
          <li key={u.time + u.headline} id={`u-${new Date(u.time).getTime()}`} className="rounded-xl border border-line bg-paper-card p-4">
            <time dateTime={u.time} className="text-sm font-bold text-navy">{usTime(u.time, true)} Eastern</time>
            <h3 className="mt-1 font-bold text-ink">{u.headline}</h3>
            <p className="mt-1 text-sm leading-6 text-ink-muted">{u.body}</p>
            <p className="mt-2 text-xs text-ink-soft">
              Sources:{" "}
              {u.sources.map((s, i) => (
                <span key={s.url}>
                  {i > 0 && " · "}
                  <a className="underline" href={s.url} rel="noopener noreferrer">{s.name}</a>
                </span>
              ))}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
