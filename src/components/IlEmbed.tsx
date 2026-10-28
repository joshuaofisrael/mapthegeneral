"use client";

import { useEffect, useState } from "react";
import { IlUpdatedStamp, ilStaleNotice, useIlResults } from "@/components/IlLiveResults";
import { Hemicycle, colorMap, partyName } from "@/components/IlShared";
import { IL_PATHS, IL_SEAT_LABEL, IL_TRACKER_OPENS_AT, IL_WINDOW_ID, ilEstimatesAllowed, type IlLang } from "@/data/il-results";

/** Compact live board for /il/embed/?lang=he|en, meant for iframes on other sites. */
export function IlEmbed() {
  const [lang, setLang] = useState<IlLang>("he");
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("lang") === "en") setLang("en");
  }, []);
  const { doc, now, stale, receivedAt } = useIlResults(null);
  const open = now !== null && now >= Date.parse(IL_TRACKER_OPENS_AT);
  const estimates = open && ilEstimatesAllowed(doc, now, stale);
  const rows = estimates && doc ? doc.results.filter((p) => p.aboveThreshold) : [];
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
          . {he ? "תוצאות חלקיות ולא רשמיות, עם מקור ושעת עדכון, בעמוד התוצאות. האתר אינו מחשב מנדטים." : "Partial, unofficial results, each with a source and as-of time, are on the results page. This site does not calculate seats."}
        </p>
      ) : rows.length === 0 ? (
        <div className="mt-2 space-y-2">
          <IlUpdatedStamp lang={lang} doc={doc} receivedAt={receivedAt} />
          <p className="text-sm">{he ? "ממתינים לנתוני ועדת הבחירות המרכזית." : "Waiting for the Central Elections Committee count."}</p>
          {stale && (
            <p className="rounded-lg border border-notice-line bg-notice-wash p-2 text-sm text-navy-deep" role="status">
              {ilStaleNotice(lang, false)}
            </p>
          )}
        </div>
      ) : (
        <div data-election-gate={IL_WINDOW_ID} className="mt-2 space-y-2">
          <IlUpdatedStamp lang={lang} doc={doc} receivedAt={receivedAt} />
          {stale && (
            <p className="rounded-lg border border-notice-line bg-notice-wash p-2 text-sm text-navy-deep" role="status">
              {ilStaleNotice(lang, true)}
            </p>
          )}
          <p className="text-xs font-bold text-[#b45309]">
            {doc?.stage === "final" ? (he ? "ספירת קולות סופית של הוועדה" : "Final Committee count") : he ? "ספירה רשמית ראשונית" : "Preliminary official count"}
          </p>
          <p className="text-xs font-semibold text-ink" data-il-seat-label>{IL_SEAT_LABEL[lang]}</p>
          <Hemicycle lang={lang} rows={rows} colors={colors} seatLabel={IL_SEAT_LABEL[lang]} />
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
      <p className="mt-2 text-xs font-semibold text-ink" data-il-seat-label>{IL_SEAT_LABEL[lang]}</p>
      <p className="mt-2 text-xs text-ink-soft">
        {he ? "מקור: ועדת הבחירות המרכזית · " : "Source: Central Elections Committee · "}
        <a href={`https://mapthegeneral.com${IL_PATHS[lang]}`} target="_blank" rel="noopener" className="underline">
          mapthegeneral.com
        </a>
      </p>
    </div>
  );
}
