"use client";

import { useEffect, useState } from "react";
import {
  isUsLiveDoc,
  usChamberTotalsShown,
  usFeedStatusLabel,
  usLiveFresh,
  usLivePollPage,
  usLivePollUrl,
  usLiveStates,
  US_LIVE_FALLBACK_URL,
  US_LIVE_POLL_MS,
  US_LIVE_PRIMARY_URL,
  type UsChamberTotals,
  type UsLiveDoc,
  type UsRace,
} from "@/data/us-live";

const TIME_ZONE_LABEL = "UTC";

function fmtTime(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const ms = Date.parse(iso);
  if (!Number.isFinite(ms)) return null;
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(ms));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("day")} ${get("month")}, ${get("hour")}:${get("minute")} ${TIME_ZONE_LABEL}`;
}

/**
 * Polls the sibling project's aggregated state-results feed every 60
 * seconds while this page is open and visible. Never polls faster, never
 * shows a countdown, and never substitutes a poll, a projection, or an
 * exit poll for an official count. On a failed fetch, an empty response,
 * or a document older than the staleness window, the last good document
 * is kept and a stale notice is shown; the per-state official links keep
 * working either way because they are baked into the page at build time.
 */
export function useUsLiveResults(initial: UsLiveDoc) {
  const [doc, setDoc] = useState<UsLiveDoc>(initial);
  const [lastGoodAt, setLastGoodAt] = useState<number | null>(usLiveFresh(initial) ? Date.now() : null);
  const [stale, setStale] = useState(!usLiveFresh(initial));
  const [usingFallbackSource, setUsingFallbackSource] = useState(false);

  useEffect(() => {
    let stopped = false;
    let timer = 0;

    const pull = async (url: string): Promise<UsLiveDoc> => {
      const res = await fetch(usLivePollUrl(url), { signal: AbortSignal.timeout(20_000), cache: "default" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: unknown = await res.json();
      if (!isUsLiveDoc(json)) throw new Error("feed did not return a states map");
      return json;
    };

    const load = async () => {
      if (!usLivePollPage() || document.visibilityState === "hidden") return;
      try {
        const next = await pull(US_LIVE_PRIMARY_URL);
        if (stopped) return;
        setDoc(next);
        setUsingFallbackSource(false);
        setStale(!usLiveFresh(next));
        setLastGoodAt(Date.now());
        return;
      } catch {
        /* fall through to the mirror */
      }
      try {
        const next = await pull(US_LIVE_FALLBACK_URL);
        if (stopped) return;
        setDoc(next);
        setUsingFallbackSource(true);
        setStale(!usLiveFresh(next));
        setLastGoodAt(Date.now());
      } catch {
        if (!stopped) setStale(true);
      }
    };

    const arm = () => {
      window.clearTimeout(timer);
      if (stopped || !usLivePollPage() || document.visibilityState === "hidden") return;
      timer = window.setTimeout(async () => {
        await load();
        arm();
      }, US_LIVE_POLL_MS);
    };

    const onVisibility = () => {
      if (!usLivePollPage()) return;
      if (document.visibilityState === "hidden") {
        window.clearTimeout(timer);
        return;
      }
      void load().finally(arm);
    };

    if (usLivePollPage() && document.visibilityState !== "hidden") void load().finally(arm);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stopped = true;
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return { doc, stale, lastGoodAt, usingFallbackSource };
}

function RaceTable({ races }: { races: UsRace[] }) {
  if (!races.length) return null;
  return (
    <div className="mt-2 space-y-3">
      {races.map((race, index) => (
        <div key={race.office ?? index} className="rounded-lg border border-line bg-paper-tint p-2 text-xs">
          <p className="font-semibold text-ink">
            {race.office ?? "Race"}
            {race.called ? <span className="ms-2 rounded-full bg-navy-deep px-2 py-0.5 text-white">Called</span> : null}
          </p>
          {race.candidates && race.candidates.length > 0 ? (
            <ul className="mt-1 space-y-0.5">
              {race.candidates.map((candidate, candidateIndex) => (
                <li key={`${candidate.name ?? candidateIndex}`} className="flex items-center justify-between gap-2">
                  <span>
                    {candidate.name ?? "Candidate"}
                    {candidate.party ? ` (${candidate.party})` : ""}
                    {candidate.winner ? " — winner" : ""}
                  </span>
                  <span className="tabular-nums text-ink-muted">
                    {candidate.votes != null ? candidate.votes.toLocaleString("en-US") : "–"}
                    {candidate.pct != null ? ` · ${candidate.pct.toFixed(1)}%` : ""}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ChamberRow({ label, totals }: { label: string; totals: UsChamberTotals }) {
  return (
    <div className="rounded-lg border border-line bg-paper-card p-3">
      <dt className="text-xs text-ink-soft">{label}</dt>
      <dd className="mt-1 flex gap-4 text-lg font-bold tabular-nums text-ink">
        <span>D {totals.dem ?? "–"}</span>
        <span>R {totals.rep ?? "–"}</span>
        <span>Other {totals.other ?? "–"}</span>
      </dd>
    </div>
  );
}

export function UsLiveResults({ initial }: { initial: UsLiveDoc }) {
  const { doc, stale, lastGoodAt, usingFallbackSource } = useUsLiveResults(initial);
  const states = usLiveStates(doc);
  const house = doc.chambers?.house;
  const senate = doc.chambers?.senate;
  const showChambers = usChamberTotalsShown(house) || usChamberTotalsShown(senate);
  const generated = fmtTime(doc.generatedAt);

  return (
    <div className="space-y-6" aria-live="polite">
      <div className="rounded-xl border border-line bg-paper-card p-4 text-sm leading-6 text-ink">
        <p>
          <span className="font-semibold">Feed last generated: </span>
          {generated ?? "not yet reported"}.{" "}
          {doc.countsContinue ? "Counting in at least one state is expected to continue past election night." : null}
        </p>
        <p className="mt-1 text-ink-muted">
          This board reads one aggregated file built from official state and county election-office sources. It
          refreshes automatically about once a minute while this page is open; nothing here is a poll, a projection,
          an exit poll, or a prediction, and there is no countdown. Every state name below links straight to that
          state&rsquo;s own official results page, so the links keep working even if the aggregated file cannot be
          reached.
        </p>
      </div>

      {stale && (
        <div className="rounded-xl border border-notice-line bg-notice-wash p-4 text-sm leading-6 text-navy-deep" role="status">
          <p className="font-semibold">The live feed is stale or could not be reached.</p>
          <p className="mt-1">
            {lastGoodAt
              ? `The figures above are from the last successful check, at ${fmtTime(new Date(lastGoodAt).toISOString())}.`
              : "No successful check has completed yet in this browser."}{" "}
            The state links in the table below are not affected: each one opens that state&rsquo;s own official
            results site directly.
          </p>
        </div>
      )}
      {!stale && usingFallbackSource && (
        <p className="text-xs text-ink-soft">
          Reading the mirror feed; the primary feed did not answer on the last check.
        </p>
      )}

      {showChambers && (
        <dl className="grid gap-3 sm:grid-cols-2">
          {usChamberTotalsShown(house) ? <ChamberRow label="U.S. House, seats reported" totals={house!} /> : null}
          {usChamberTotalsShown(senate) ? <ChamberRow label="U.S. Senate, seats reported" totals={senate!} /> : null}
        </dl>
      )}

      <div className="overflow-x-auto rounded-xl border border-line bg-paper-card">
        <table className="w-full text-start text-sm">
          <caption className="p-3 text-start text-sm font-semibold text-ink">
            All 50 states and the District of Columbia, with each one&rsquo;s own election office
          </caption>
          <thead className="bg-paper-tint text-ink-muted">
            <tr>
              <th className="p-2 text-start">State</th>
              <th className="p-2 text-start">Status</th>
              <th className="p-2 text-start">Official source</th>
              <th className="p-2 text-start">As of</th>
            </tr>
          </thead>
          <tbody>
            {states.map((state) => {
              const asOf = fmtTime(state.sourceUpdatedAt ?? state.fetchedAt);
              return (
                <tr key={state.code} className="border-t border-line align-top">
                  <td className="p-2 font-semibold text-ink">{state.name}</td>
                  <td className="p-2">
                    <span className="inline-block rounded-full border border-line bg-paper-tint px-2 py-0.5 text-xs text-ink">
                      {usFeedStatusLabel(state.feedStatus)}
                    </span>
                    {state.feedNote ? <p className="mt-1 text-xs text-ink-muted">{state.feedNote}</p> : null}
                    <RaceTable races={state.races ?? []} />
                  </td>
                  <td className="p-2">
                    <a className="font-medium text-navy underline underline-offset-2" href={state.resultsUrl} rel="noopener noreferrer">
                      {state.resultsLabel}
                    </a>
                    <p className="mt-0.5 text-xs text-ink-soft">{state.office}</p>
                  </td>
                  <td className="p-2 text-xs text-ink-muted">{asOf ?? "–"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
