"use client";

import { useEffect, useState } from "react";
import Link from "@/components/AnchorLink";
import { activeNight, countsVisible, nightOpensAt, otherNights } from "@/data/election-night";

function parts(left: number): number[] {
  return [Math.floor(left / 864e5), Math.floor(left / 36e5) % 24, Math.floor(left / 6e4) % 60, Math.floor(left / 1e3) % 60];
}

/** Homepage card for the election night now underway, or the next one to open. */
export function HomeElectionNight() {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(tick);
  }, []);
  if (now === null) {
    return <div className="mt-6 min-h-[8rem] rounded-xl border border-line bg-paper-card" aria-busy="true" />;
  }
  const item = activeNight(now);
  if (!item) return null;
  const opens = Date.parse(nightOpensAt(item.id));
  const open = countsVisible(item.id, now);
  const left = Math.max(0, opens - now);
  const units = ["days", "hours", "min", "sec"];
  const also = otherNights(now, item.id);
  return (
    <section id="election-night" className="mt-6 rounded-xl border-2 border-navy bg-paper-card p-5 shadow-sm" aria-labelledby="election-night-title">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Election night</p>
      <h2 id="election-night-title" className="mt-2 font-serif text-2xl font-semibold text-ink">
        {item.title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-ink-muted">{item.detail}</p>
      {open ? (
        <p className="mt-3 text-sm font-semibold text-navy-deep">
          The official count is on the linked page. This site shows no forecast.
        </p>
      ) : (
        <div className="mt-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-navy">Count starts in</p>
          <div className="mt-3 flex gap-3" dir="ltr">
            {parts(left).map((value, index) => (
              <div key={units[index]} className="min-w-[4.5rem] rounded-lg bg-navy-deep px-3 py-2 text-center text-white">
                <div className="text-3xl font-bold tabular-nums">{String(value).padStart(2, "0")}</div>
                <div className="text-xs opacity-80">{units[index]}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-ink-muted">No count is shown before the official tracker opens, or during a blackout.</p>
        </div>
      )}
      <div className="mt-3 flex flex-wrap gap-3">
        {item.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            hrefLang={link.lang}
            lang={link.lang}
            dir={link.lang === "he" ? "rtl" : undefined}
            className="rounded-full bg-navy-deep px-4 py-2 text-sm font-semibold text-white hover:bg-navy"
          >
            {link.label}
          </Link>
        ))}
      </div>
      {also.length > 0 ? (
        <p className="mt-3 text-sm text-ink-muted">
          Also in the count window:{" "}
          {also.map((other, index) => (
            <span key={other.id}>
              {index > 0 ? ", " : null}
              <Link className="font-medium text-navy underline" href={other.links[0]?.href ?? "/"}>
                {other.title}
              </Link>
            </span>
          ))}
        </p>
      ) : null}
    </section>
  );
}
