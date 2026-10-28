import manual from "@/data/il-2026-manual-count.json";
import type { IlLang } from "@/data/il-results";

/**
 * Hand-copied partial count, used when the Central Elections Committee feed is
 * blocked or awaiting. Static (committed) data: the live poller never writes it.
 * Update with scripts/il-live/manual-count.mjs (see scripts/il-live/MANUAL.md).
 */
const T = {
  he: {
    h: "ספירה חלקית (הועתקה ידנית)",
    label: (pct: string, time: string) => `ספירה חלקית, ${pct}% נספרו, נכון ל-${time}. מקור:`,
    notFinal: "אינה תוצאה סופית. הנתונים ישתנו עם המשך הספירה, כולל המעטפות הכפולות. הועתקו ידנית כי קובץ התוצאות של הוועדה חסום לגישה מחוץ לישראל. אינם מספרי הטלוויזיה שבמדור הנפרד למטה.",
    official: "אתר התוצאות של ועדת הבחירות המרכזית",
    party: "רשימה",
    seats: "מנדטים (חלקי)",
    below: "מתחת לאחוז החסימה (3.25%)",
  },
  en: {
    h: "Partial count (copied by hand)",
    label: (pct: string, time: string) => `Partial count, ${pct}% counted, as of ${time}. Source:`,
    notFinal: "Not final. Figures will change as counting continues, including double-envelope votes. Copied by hand because the Committee's results file is blocked outside Israel. Not the TV seat samples shown in the separate section below.",
    official: "Central Elections Committee results site",
    party: "List",
    seats: "Seats (partial)",
    below: "Below the 3.25% threshold",
  },
} as const;

export function IlManualCount({ lang }: { lang: IlLang }) {
  if (!manual.active) return null;
  const t = T[lang];
  const pct = manual.countedPct.toLocaleString(lang === "he" ? "he-IL" : "en-GB", { maximumFractionDigits: 1 });
  return (
    <div className="mb-4 rounded-xl border border-notice-line bg-paper-card p-4" data-il-manual data-il-manual-as-of={manual.asOf}>
      <h3 className="text-lg font-bold text-ink">{t.h}</h3>
      <p className="mt-1 text-sm font-semibold text-navy-deep" role="status">
        {t.label(pct, manual.asOfLabel[lang])}{" "}
        <a className="underline" href={manual.source.url} rel="noopener noreferrer">{manual.source.name[lang]}</a>
      </p>
      <p className="mt-1 text-sm text-ink-muted">
        {t.notFinal}{" "}
        <a className="underline" href={manual.officialSite} rel="noopener noreferrer">{t.official}</a>
      </p>
      <table className="mt-3 w-full text-sm">
        <thead className="bg-paper-tint text-ink-muted">
          <tr><th className="p-2 text-start">{t.party}</th><th className="p-2 text-end">{t.seats}</th></tr>
        </thead>
        <tbody>
          {manual.seats.map((p) => (
            <tr key={p.id} className="border-t border-line">
              <td className="p-2">{p[lang]}</td>
              <td className="p-2 text-end font-bold tabular-nums">{p.seats}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {manual.belowThreshold.length > 0 && (
        <p className="mt-2 text-sm text-ink-muted">
          {t.below}: {manual.belowThreshold.map((p) => `${p[lang]} ${p.pct}%`).join(" · ")}
        </p>
      )}
    </div>
  );
}
