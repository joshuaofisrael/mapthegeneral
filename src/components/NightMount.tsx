import { feedPath, nightById, nightOpensAt, rawFeedUrl, snapshotPath } from "@/data/election-night";

/** Same-origin results mount for a Next.js election page. The script draws the countdown. */
export function NightMount({ id, lang }: { id: string; lang: string }) {
  const night = nightById(id);
  const copy = night?.pages[lang];
  if (!night || !copy) return null;
  return (
    <section
      id="results"
      className="rounded-xl border border-line bg-paper-card p-5"
      data-night-id={id}
      data-opens={nightOpensAt(id)}
      data-tz={night.timeZone}
      data-feed={feedPath(id)}
      data-raw={rawFeedUrl(id)}
      data-snapshot={snapshotPath(id)}
      data-source-href={night.sourceHref}
      data-source-label={copy.sourceLabel}
      data-countdown={copy.countdown}
      data-countdown-note={copy.countdownNote}
      data-awaiting={copy.awaiting}
      data-preliminary={copy.preliminary}
      data-final={copy.final}
      data-note={copy.note}
      data-updated={copy.updated}
      data-fetched={copy.fetched}
      data-tz-label={copy.tzLabel}
      data-stale={copy.stale}
      data-stale-empty={copy.staleEmpty}
      data-col-name={copy.colName}
      data-col-votes={copy.colVotes}
      data-col-share={copy.colShare}
      data-units={copy.units}
      data-locale={lang === "en" ? "en-GB" : lang}
    >
      <h2 className="font-serif text-2xl font-semibold">{copy.heading}</h2>
      <div data-night-root />
      <noscript>
        <p>
          {copy.noscript}{" "}
          <a href={night.sourceHref} rel="noopener noreferrer">
            {copy.sourceLabel}
          </a>
          .
        </p>
      </noscript>
      <script src="/election-night.js" defer />
    </section>
  );
}
