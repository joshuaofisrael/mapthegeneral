"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { activeRules, ELECTION_WINDOWS } from "@/data/election-law";

const GATE_STYLE_ID = "election-gate-style";

/**
 * Shows a neutral notice on a country's pages while an election-law window
 * (poll ban, election silence, results embargo) is open, and hides any
 * element marked `data-election-gate="<window id>"` until the window closes.
 * The static export cannot change at a set minute, so this runs in the browser.
 */
export function ElectionLawNotice() {
  const pathname = usePathname() ?? "/";
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const segments = pathname.split("/").filter(Boolean);
  const country = segments[0] ?? "";
  const lang = segments[1] ?? "";
  const rules = now === null ? [] : activeRules(country, now);

  useEffect(() => {
    if (now === null) return;
    const closed = ELECTION_WINDOWS.filter((item) => {
      const ends = Math.max(Date.parse(item.trackerOpensAt), ...item.rules.map((rule) => Date.parse(rule.end)));
      const starts = Math.min(...item.rules.map((rule) => Date.parse(rule.start)), Date.parse(`${item.pollingDay}T00:00:00Z`));
      return now >= starts && now < ends;
    }).map((item) => item.id);
    let style = document.getElementById(GATE_STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = GATE_STYLE_ID;
      document.head.appendChild(style);
    }
    style.textContent = closed.map((id) => `[data-election-gate="${id}"]{display:none!important}`).join("\n");
  }, [now]);

  if (rules.length === 0) return null;

  return (
    <div role="note" className="border-b border-notice-line bg-notice-wash px-4 py-3 text-sm leading-6 text-navy-deep">
      <div className="mx-auto max-w-site space-y-2">
        {rules.map(({ window: item, rule }) => {
          const local = item.localLang && lang === item.localLang && rule.local;
          return (
            <p key={`${item.id}-${rule.kind}`} lang={local ? item.localLang : "en"}>
              <strong>{local ? item.election.local : item.election.en}.</strong> {local ? rule.local : rule.en}{" "}
              <a className="underline" href={rule.citation.url} rel="noopener noreferrer">
                {rule.citation.label}
              </a>
            </p>
          );
        })}
      </div>
    </div>
  );
}
