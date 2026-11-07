import updates from "@/data/nz-2026-live-updates.json";

/** Hand-written, attributed live updates for the NZ general election. Kept apart from the count table. */
type NzUpdate = (typeof updates)[number];
const NZ_UPDATES: NzUpdate[] = [...updates].sort((a, b) => +new Date(b.time) - +new Date(a.time));

function nzTime(iso: string, withDate = false) {
  return new Intl.DateTimeFormat("en-NZ", {
    timeZone: "Pacific/Auckland",
    hour: "numeric",
    minute: "2-digit",
    ...(withDate ? { day: "numeric", month: "short" } : {}),
  }).format(new Date(iso));
}

export function NzLiveUpdates() {
  if (!NZ_UPDATES.length) return null;
  const latest = NZ_UPDATES[0].time;
  return (
    <section aria-labelledby="updates" className="my-8" data-nz-live-updates>
      <h2 id="updates" className="mb-1 text-2xl font-bold text-ink">Live updates</h2>
      <p className="mb-1 text-sm font-semibold text-navy-deep" role="status">
        Updated <time dateTime={latest}>{nzTime(latest)}</time> New Zealand time
      </p>
      <p className="mb-3 text-xs text-ink-soft">Our summaries of reporting from the named sources. Preliminary, not official results.</p>
      <ol className="space-y-3">
        {NZ_UPDATES.map((u) => (
          <li key={u.time + u.headline} id={`u-${new Date(u.time).getTime()}`} className="rounded-xl border border-line bg-paper-card p-4">
            <time dateTime={u.time} className="text-sm font-bold text-navy">{nzTime(u.time, true)} NZ time</time>
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
