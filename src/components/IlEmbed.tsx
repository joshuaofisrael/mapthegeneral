"use client";

import { useEffect, useState } from "react";
import { useIlResults } from "@/components/IlLiveResults";
import { Hemicycle, colorMap, partyName } from "@/components/IlShared";
import { IL_PATHS, IL_TRACKER_OPENS_AT, IL_WINDOW_ID, type IlLang } from "@/data/il-results";

/** Compact live board for /il/embed/?lang=he|en, meant for iframes on other sites. */
export function IlEmbed() {
  const [lang, setLang] = useState<IlLang>("he");
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("lang") === "en") setLang("en");
  }, []);
  const { doc, now } = useIlResults(null);
  const open = now !== null && now >= Date.parse(IL_TRACKER_OPENS_AT);
  const rows = open && doc ? doc.results.filter((p) => p.aboveThreshold) : [];
  const colors = colorMap(rows);
  const he = lang === "he";
  const left = now === null ? 0 : Math.max(0, Date.parse(IL_TRACKER_OPENS_AT) - now);
  return (
    <div lang={lang} dir={he ? "rtl" : "ltr"} className="mx-auto max-w-xl p-3 text-ink">
      <a href={`https://mapthegeneral.com${IL_PATHS[lang]}`} target="_blank" rel="noopener" className="text-lg font-bold text-navy-deep underline">
        {he ? "תוצאות הבחירות לכנסת ה-26" : "Israel election results 2026"}
      </a>
      {!open ? (
        <p className="mt-2 text-sm">
          {he ? "הקלפיות נסגרות בעוד " : "Polls close in "}
          <strong dir="ltr">
            {Math.floor(left / 36e5)}:{String(Math.floor(left / 6e4) % 60).padStart(2, "0")}:{String(Math.floor(left / 1e3) % 60).padStart(2, "0")}
          </strong>
          . {he ? "התוצאות הרשמיות יוצגו כאן לאחר סגירת הקלפיות." : "Official results appear here after polls close."}
        </p>
      ) : rows.length === 0 ? (
        <p className="mt-2 text-sm">{he ? "ממתינים לנתוני ועדת הבחירות המרכזית." : "Waiting for the Central Elections Committee count."}</p>
      ) : (
        <div data-election-gate={IL_WINDOW_ID}>
          <p className="mt-1 text-xs font-bold text-[#b45309]">
            {doc?.stage === "final" ? (he ? "תוצאות סופיות" : "Final results") : he ? "ספירה רשמית ראשונית · המנדטים מחושבים מהקולות שנספרו עד כה" : "Preliminary official count · seats calculated from votes counted so far"}
          </p>
          <Hemicycle lang={lang} rows={rows} colors={colors} />
          <ul className="mt-2 grid grid-cols-2 gap-x-4 text-sm">
            {rows.map((p) => (
              <li key={p.letter} className="flex justify-between border-b border-line py-0.5">
                <span>
                  <span className="me-1 inline-block h-2.5 w-2.5 rounded-full" style={{ background: colors[p.letter] }} />
                  {partyName(lang, p)}
                </span>
                <strong>{p.seats}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
      <p className="mt-2 text-xs text-ink-soft">
        {he ? "מקור: ועדת הבחירות המרכזית · " : "Source: Central Elections Committee · "}
        <a href={`https://mapthegeneral.com${IL_PATHS[lang]}`} target="_blank" rel="noopener" className="underline">
          mapthegeneral.com
        </a>
      </p>
    </div>
  );
}
