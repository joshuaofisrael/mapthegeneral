import updates from "@/data/il-2026-live-updates.json";
import type { IlLang } from "@/data/il-results";

/** Journalist-style live updates (hand-written, attributed, sourced). Kept apart from the count and TV seat-sample sections. */
export type IlUpdate = (typeof updates)[number];
export const IL_UPDATES: IlUpdate[] = [...updates].sort((a, b) => +new Date(b.time) - +new Date(a.time));

const T = {
  he: {
    h: "עדכונים שוטפים",
    note: "סיכומים שלנו של דיווחים ממקורות שצוינו. אינם תוצאות רשמיות; הספירה החלקית ומספרי הטלוויזיה מוצגים במדורים נפרדים.",
    updated: "עודכן",
    tz: "שעון ישראל",
    src: "מקורות",
  },
  en: {
    h: "Live updates",
    note: "Our summaries of reporting from the named sources. Not official results; the partial count and TV seat samples are in their own sections.",
    updated: "Updated",
    tz: "Israel time",
    src: "Sources",
  },
} as const;

export function ilTime(iso: string, lang: IlLang, withDate = false) {
  return new Intl.DateTimeFormat(lang === "he" ? "he-IL" : "en-GB", {
    timeZone: "Asia/Jerusalem",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    ...(withDate ? { day: "numeric", month: "short" } : {}),
  }).format(new Date(iso));
}

export function IlLiveUpdates({ lang }: { lang: IlLang }) {
  if (!IL_UPDATES.length) return null;
  const t = T[lang];
  const latest = IL_UPDATES[0].time;
  return (
    <section aria-labelledby="updates" className="mb-10" data-il-live-updates>
      <h2 id="updates" className="mb-1 text-2xl font-bold text-ink">{t.h}</h2>
      <p className="mb-1 text-sm font-semibold text-navy-deep" role="status">
        {t.updated} <time dateTime={latest}>{ilTime(latest, lang)}</time> {t.tz}
      </p>
      <p className="mb-3 text-xs text-ink-soft">{t.note}</p>
      <ol className="space-y-3">
        {IL_UPDATES.map((u) => (
          <li key={u.time + u.headline_en} id={`u-${new Date(u.time).getTime()}`} className="rounded-xl border border-line bg-paper-card p-4">
            <time dateTime={u.time} className="text-sm font-bold text-navy">{ilTime(u.time, lang, true)} {t.tz}</time>
            <h3 className="mt-1 font-bold text-ink">{lang === "he" ? u.headline_he : u.headline_en}</h3>
            <p className="mt-1 text-sm leading-6 text-ink-muted">{lang === "he" ? u.body_he : u.body_en}</p>
            <p className="mt-2 text-xs text-ink-soft">
              {t.src}:{" "}
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
