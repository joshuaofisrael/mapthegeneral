"use client";
import { Hemicycle, colorMap, partyName, type IlDoc, type IlRow } from "@/components/IlShared";
export { Hemicycle, colorMap, partyName, type IlDoc, type IlRow };

import { useEffect, useMemo, useState } from "react";
import {
  IL_CEC_RESULTS,
  IL_ELIGIBLE,
  IL_LIVE_DATA_URL,
  IL_LIVE_RAW_URL,
  IL_PATHS,
  IL_SEAT_LABEL,
  IL_TRACKER_OPENS_AT,
  IL_WINDOW_ID,
  ilEstimatesAllowed,
  ilLivePollMs,
  ilLivePollUrl,
  type IlLang,
} from "@/data/il-results";


const T = {
  he: {
    countdown: "הקלפיות נסגרות בעוד",
    countdownNote: "הספירה הרשמית תוצג כאן מיד עם סגירת הקלפיות ב-22:00 (שעון ישראל). לפני כן לא יוצגו כאן סקרים, מדגמים או נתונים כלשהם.",
    units: ["ימים", "שעות", "דקות", "שניות"],
    awaiting: "הקלפיות נסגרו. ממתינים לנתוני הספירה הראשונים של ועדת הבחירות המרכזית. העמוד מתעדכן אוטומטית.",
    preliminary: "ספירה רשמית ראשונית",
    final: "ספירת קולות סופית של הוועדה",
    preliminaryNote: IL_SEAT_LABEL.he,
    seats: "מנדטים",
    votes: "קולות",
    pct: "אחוז",
    party: "רשימה",
    letter: "אותיות",
    majority: "61 לרוב",
    above: "רשימות מעל אחוז החסימה (3.25%)",
    below: "רשימות מתחת לאחוז החסימה",
    threshold: "אחוז החסימה",
    thresholdVotes: "קולות נדרשים כרגע",
    turnout: "אחוז הצבעה בקלפיות שנספרו",
    counted: "קלפיות שנספרו",
    countedVoters: "בעלי זכות בחירה בקלפיות שנספרו",
    validVotes: "קולות כשרים",
    invalidVotes: "קולות פסולים",
    source: "מקור: ועדת הבחירות המרכזית",
    coalition: "מחשבון קואליציה",
    coalitionNote: "סמנו רשימות כדי לחבר את המנדטים שלהן. כלי חשבוני בלבד – אינו מנבא ואינו ממליץ.",
    total: "סה\"כ",
    reach: "יש רוב של 61",
    short: "חסרים",
    clear: "נקה",
    share: "שיתוף",
    copy: "העתקת קישור",
    copied: "הקישור הועתק",
    embed: "הטמעת התוצאות באתר שלכם",
    embedNote: "העתיקו את הקוד הזה כדי להציג את לוח התוצאות החי באתר או בבלוג:",
    hemicycle: "חלוקת 120 המושבים בכנסת לפי הספירה עד כה",
    seatLabel: IL_SEAT_LABEL.he,
  },
  en: {
    countdown: "Polls close in",
    countdownNote: "The official count appears here as soon as polls close at 22:00 Israel time. Until then this page shows no polls, exit polls or numbers of any kind.",
    units: ["days", "hours", "min", "sec"],
    awaiting: "Polls have closed. Waiting for the first Central Elections Committee count. This page updates automatically.",
    preliminary: "Preliminary official count",
    final: "Final Committee count",
    preliminaryNote: IL_SEAT_LABEL.en,
    seats: "Seats",
    votes: "Votes",
    pct: "Share",
    party: "List",
    letter: "Letters",
    majority: "61 for a majority",
    above: "Lists above the 3.25% threshold",
    below: "Lists below the threshold",
    threshold: "Threshold",
    thresholdVotes: "votes needed so far",
    turnout: "Turnout in counted boxes",
    counted: "Ballot boxes counted",
    countedVoters: "Eligible voters in counted boxes",
    validVotes: "Valid votes",
    invalidVotes: "Invalid votes",
    source: "Source: Central Elections Committee",
    coalition: "Coalition calculator",
    coalitionNote: "Tick lists to add up their seats. Arithmetic only: it predicts and recommends nothing.",
    total: "Total",
    reach: "Reaches 61",
    short: "short",
    clear: "Clear",
    share: "Share",
    copy: "Copy link",
    copied: "Link copied",
    embed: "Embed these results",
    embedNote: "Copy this code to show the live results board on your site or blog:",
    hemicycle: "How the 120 Knesset seats divide on the count so far",
    seatLabel: IL_SEAT_LABEL.en,
  },
} as const;

const fmt = (lang: IlLang, n: number | undefined | null, digits = 0) =>
  n == null ? "–" : n.toLocaleString(lang === "he" ? "he-IL" : "en-GB", { maximumFractionDigits: digits, minimumFractionDigits: digits });

const JERUSALEM = "Asia/Jerusalem";

function parsedTime(value: string | null | undefined): number | null {
  if (!value) return null;
  const ms = Date.parse(value);
  return Number.isFinite(ms) ? ms : null;
}

/** HH:MM in Asia/Jerusalem from lastCheckedAt (when the feed was last checked). */
export function ilUpdatedStamp(
  lang: IlLang,
  doc: IlDoc | null,
  receivedAt?: number | null,
): { text: string; cadence: string; kind: "checked" } | null {
  const ms = parsedTime(doc?.lastCheckedAt) ?? parsedTime(doc?.fetchedAt) ?? (receivedAt != null && Number.isFinite(receivedAt) ? receivedAt : null);
  if (ms == null) return null;
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: JERUSALEM,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    numberingSystem: "latn",
  }).formatToParts(new Date(ms));
  const hour = parts.find((p) => p.type === "hour")?.value ?? "";
  const minute = parts.find((p) => p.type === "minute")?.value ?? "";
  const hm = `${hour}:${minute}`;
  const text = lang === "he" ? `נבדק לאחרונה ${hm} שעון ישראל` : `Last checked ${hm} Israel time`;
  const cadence = lang === "he" ? "הנתונים נבדקים בכל דקה; העמוד מתרענן כל 2–5 דקות" : "Data checked every minute; page refreshes every 2–5 minutes";
  return { text, cadence, kind: "checked" };
}

export function ilStaleNotice(lang: IlLang, _hasResults?: boolean): string {
  if (lang === "he") return "העדכון האחרון לא נטען. לא מוצגת חלוקת מנדטים.";
  return "The latest update could not be loaded. No seat allocation is shown.";
}

export function IlUpdatedStamp({ lang, doc, receivedAt }: { lang: IlLang; doc: IlDoc | null; receivedAt?: number | null }) {
  const stamp = ilUpdatedStamp(lang, doc, receivedAt);
  if (!stamp) return null;
  return (
    <p className="rounded-lg border border-navy-soft bg-navy-wash px-3 py-2 text-base font-bold text-navy-deep" data-il-stamp={stamp.kind}>
      {stamp.text} <span className="font-semibold">{stamp.cadence}</span>
    </p>
  );
}

function preferDoc(prev: IlDoc | null, next: IlDoc): IlDoc {
  if (next.results.length === 0) return next;
  if (!prev || prev.results.length === 0) return next;
  const a = prev.fetchedAt ? Date.parse(prev.fetchedAt) : 0;
  const b = next.fetchedAt ? Date.parse(next.fetchedAt) : 0;
  return b >= a ? next : prev;
}

/** Network refresh runs only on the two Israel results pages. */
export function ilResultsPollPage(): boolean {
  if (typeof window === "undefined") return false;
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  return path === "/il/en/results" || path === "/il/he/results";
}

/**
 * On /il/en/results/ and /il/he/results/ only, re-read the feed every 2 minutes
 * once the stage has results, and every 5 minutes while the stage is awaiting.
 * A hidden tab does not poll. Other pages keep the baked snapshot and the clock.
 * On 404/5xx, a network error, an empty file, or a stale file, clear the
 * document so no seat estimate stays on screen.
 */
export function useIlResults(initial: IlDoc | null) {
  const seeded = ilEstimatesAllowed(initial, Date.now(), false) ? initial : initial && initial.results.length === 0 ? initial : null;
  const [doc, setDoc] = useState<IlDoc | null>(seeded);
  const [now, setNow] = useState<number | null>(null);
  const [stale, setStale] = useState(false);
  const [receivedAt, setReceivedAt] = useState<number | null>(null);
  useEffect(() => {
    let stop = false;
    let latest: IlDoc | null = seeded;
    let timer = 0;
    const accept = (next: unknown, nowMs: number): boolean => {
      if (stop || !next || typeof next !== "object" || !Array.isArray((next as IlDoc).results)) return false;
      const incoming = next as IlDoc;
      if (incoming.results.length > 0 && !ilEstimatesAllowed(incoming, nowMs, false)) return false;
      latest = preferDoc(latest, incoming);
      setDoc(latest);
      setReceivedAt(nowMs);
      return true;
    };
    const pull = async (url: string, nowMs: number): Promise<unknown> => {
      // Default cache (not no-store) so the 60s edge cache on /il-live can answer.
      const res = await fetch(ilLivePollUrl(url, nowMs, ilLivePollMs(latest)), { signal: AbortSignal.timeout(20_000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    };
    const load = async () => {
      if (!ilResultsPollPage() || document.visibilityState === "hidden") return;
      if (Date.now() < Date.parse(IL_TRACKER_OPENS_AT)) return;
      const nowMs = Date.now();
      let fresh = false;
      try {
        fresh = accept(await pull(IL_LIVE_DATA_URL, nowMs), nowMs);
      } catch {
        fresh = false;
      }
      if (!fresh) {
        try {
          fresh = accept(await pull(IL_LIVE_RAW_URL, nowMs), nowMs);
        } catch {
          fresh = false;
        }
      }
      if (fresh) {
        if (!stop) setStale(false);
        return;
      }
      if (!stop) {
        latest = null;
        setDoc(null);
        setStale(true);
      }
    };
    const arm = () => {
      window.clearTimeout(timer);
      timer = 0;
      if (stop || !ilResultsPollPage() || document.visibilityState === "hidden") return;
      timer = window.setTimeout(async () => {
        await load();
        arm();
      }, ilLivePollMs(latest));
    };
    const onVisibility = () => {
      if (!ilResultsPollPage()) return;
      if (document.visibilityState === "hidden") {
        window.clearTimeout(timer);
        timer = 0;
        return;
      }
      void load().finally(arm);
    };
    setNow(Date.now());
    const tick = window.setInterval(() => setNow(Date.now()), 1000);
    if (ilResultsPollPage() && document.visibilityState !== "hidden") void load().finally(arm);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop = true;
      window.clearInterval(tick);
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  return { doc, now, stale, receivedAt };
}

function Countdown({ lang, now }: { lang: IlLang; now: number }) {
  const t = T[lang];
  const left = Math.max(0, Date.parse(IL_TRACKER_OPENS_AT) - now);
  const parts = [Math.floor(left / 864e5), Math.floor(left / 36e5) % 24, Math.floor(left / 6e4) % 60, Math.floor(left / 1e3) % 60];
  return (
    <div className="rounded-xl border border-line bg-paper-card p-5 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-navy">{t.countdown}</p>
      <div className="mt-3 flex justify-center gap-3" dir="ltr">
        {parts.map((v, i) => (
          <div key={i} className="min-w-[4.5rem] rounded-lg bg-navy-deep px-3 py-2 text-white">
            <div className="text-3xl font-bold tabular-nums">{String(v).padStart(2, "0")}</div>
            <div className="text-xs opacity-80">{t.units[i]}</div>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-4 max-w-xl text-sm text-ink-muted">{t.countdownNote}</p>
    </div>
  );
}

function ShareBar({ lang, text }: { lang: IlLang; text: string }) {
  const t = T[lang];
  const [copied, setCopied] = useState(false);
  const url = `https://mapthegeneral.com${IL_PATHS[lang]}`;
  const u = encodeURIComponent(url);
  const m = encodeURIComponent(text);
  const links = [
    ["WhatsApp", `https://wa.me/?text=${m}%20${u}`],
    ["X", `https://x.com/intent/post?text=${m}&url=${u}`],
    ["Facebook", `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    ["Telegram", `https://t.me/share/url?url=${u}&text=${m}`],
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-ink">{t.share}:</span>
      {links.map(([name, href]) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line bg-paper-card px-3 py-1 text-sm text-navy hover:bg-navy-wash">
          {name}
        </a>
      ))}
      <button
        type="button"
        className="rounded-full border border-line bg-paper-card px-3 py-1 text-sm text-navy hover:bg-navy-wash"
        onClick={async () => {
          try {
            if (navigator.share) await navigator.share({ url, text });
            else await navigator.clipboard.writeText(url);
            setCopied(true);
          } catch {
            /* user cancelled */
          }
        }}
      >
        {copied ? t.copied : t.copy}
      </button>
    </div>
  );
}

export function IlLiveResults({ lang, initial }: { lang: IlLang; initial: IlDoc | null }) {
  const t = T[lang];
  const { doc, now, stale, receivedAt } = useIlResults(initial);
  const [picked, setPicked] = useState<string[]>([]);
  const open = now !== null && now >= Date.parse(IL_TRACKER_OPENS_AT);
  const estimates = open && ilEstimatesAllowed(doc, now, stale);
  const rows = useMemo(() => (estimates && doc ? doc.results : []), [estimates, doc]);
  const colors = useMemo(() => colorMap(rows), [rows]);
  const above = rows.filter((p) => p.aboveThreshold);
  const below = rows.filter((p) => !p.aboveThreshold && p.votes > 0);
  const coalitionSeats = above.filter((p) => picked.includes(p.letter)).reduce((a, p) => a + p.seats, 0);

  useEffect(() => {
    // A live Committee count supersedes the hand-copied partial count.
    document.querySelectorAll<HTMLElement>("[data-il-manual]").forEach((el) => {
      el.hidden = rows.length > 0;
    });
  }, [rows.length]);

  useEffect(() => {
    // Keep structured data in step with the live count.
    if (!doc?.fetchedAt || !open) return;
    document.querySelectorAll('script[type="application/ld+json"]').forEach((el) => {
      try {
        const data = JSON.parse(el.textContent ?? "");
        if (data && data.dateModified) {
          data.dateModified = doc.fetchedAt;
          el.textContent = JSON.stringify(data);
        }
      } catch {
        /* not ours */
      }
    });
  }, [doc?.fetchedAt, open]);

  if (now === null) {
    return <div className="min-h-[22rem] rounded-xl border border-line bg-paper-card" aria-busy="true" />;
  }

  const shareText = `${lang === "he" ? "תוצאות הבחירות 2026" : "Israel election results 2026"}. ${IL_SEAT_LABEL[lang]}`;
  const embedCode = `<iframe src="https://mapthegeneral.com/il/embed/?lang=${lang}" title="${lang === "he" ? "תוצאות הבחירות 2026" : "Israel election results 2026"}" width="100%" height="520" style="border:0;max-width:640px" loading="lazy"></iframe>`;

  if (!open) {
    return (
      <div className="space-y-4">
        <Countdown lang={lang} now={now} />
        <ShareBar lang={lang} text={shareText} />
      </div>
    );
  }

  if (!rows.length) {
    return (
      <div className="space-y-4">
        <IlUpdatedStamp lang={lang} doc={doc} receivedAt={receivedAt} />
        <div className="rounded-xl border border-notice-line bg-notice-wash p-5 text-navy-deep" role="status" aria-live="polite">
          {t.awaiting}
        </div>
        {stale && (
          <div className="rounded-xl border border-notice-line bg-notice-wash p-4 text-navy-deep" role="status">
            {ilStaleNotice(lang, false)}
          </div>
        )}
        <ShareBar lang={lang} text={shareText} />
      </div>
    );
  }

  const final = doc?.stage === "final";
  const boxesPct = doc?.ballotBoxesTotal && doc.units ? Math.min(100, (100 * doc.units) / doc.ballotBoxesTotal) : null;
  const votersPct = doc?.registeredInCounted ? Math.min(100, (100 * doc.registeredInCounted) / (doc.eligibleTotal ?? IL_ELIGIBLE)) : null;

  return (
    <div className="space-y-6" data-election-gate={IL_WINDOW_ID}>
      <div className="space-y-3" aria-live="polite">
        <IlUpdatedStamp lang={lang} doc={doc} receivedAt={receivedAt} />
        {stale && (
          <div className="rounded-xl border border-notice-line bg-notice-wash p-4 text-navy-deep" role="status">
            {ilStaleNotice(lang, true)}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-sm font-bold text-white ${final ? "bg-navy-deep" : "bg-[#b45309]"}`}>
            {final ? t.final : t.preliminary}
          </span>
          <a className="text-sm text-ink-muted underline" href={IL_CEC_RESULTS} rel="noopener noreferrer">
            {t.source}
          </a>
        </div>
      </div>
      <p className="text-sm font-semibold text-ink" data-il-seat-label>{t.seatLabel}</p>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-xl border border-line bg-paper-card p-4 shadow-sm">
          <Hemicycle lang={lang} rows={above} colors={colors} seatLabel={t.seatLabel} />
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {above.map((p) => (
              <li key={p.letter} className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 rounded-full" style={{ background: colors[p.letter] }} />
                {partyName(lang, p)} <strong className="tabular-nums">{p.seats}</strong>
              </li>
            ))}
          </ul>
        </div>
        <dl className="grid grid-cols-2 gap-3 self-start">
          {[
            [t.counted, boxesPct == null ? fmt(lang, doc?.units) : `${fmt(lang, boxesPct, 1)}%`],
            [t.countedVoters, votersPct == null ? "–" : `${fmt(lang, votersPct, 1)}%`],
            [t.turnout, doc?.turnoutInCounted == null ? "–" : `${fmt(lang, doc.turnoutInCounted, 2)}%`],
            [t.validVotes, fmt(lang, doc?.valid)],
            [t.invalidVotes, fmt(lang, doc?.invalid)],
            [`${t.threshold} 3.25%`, `${fmt(lang, doc?.thresholdVotes)} ${t.thresholdVotes}`],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-line bg-paper-card p-3">
              <dt className="text-xs text-ink-soft">{k}</dt>
              <dd className="mt-1 text-lg font-bold tabular-nums text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <section>
        <h3 className="mb-2 text-lg font-bold text-ink">{t.above}</h3>
        <div className="overflow-x-auto rounded-xl border border-line bg-paper-card">
          <table className="w-full text-sm">
            <caption className="p-3 text-start text-sm font-semibold text-ink" data-il-seat-label>
              {t.seatLabel}
            </caption>
            <thead className="bg-paper-tint text-ink-muted">
              <tr>
                <th className="p-2 text-start">{t.party}</th>
                <th className="p-2 text-start">{t.letter}</th>
                <th className="p-2 text-end">{t.votes}</th>
                <th className="p-2 text-end">{t.pct}</th>
                <th className="p-2 text-end">{t.seats}</th>
              </tr>
            </thead>
            <tbody>
              {above.map((p) => (
                <tr key={p.letter} className="border-t border-line">
                  <td className="p-2">
                    <span className="me-2 inline-block h-3 w-3 rounded-full align-middle" style={{ background: colors[p.letter] }} />
                    {partyName(lang, p)}
                  </td>
                  <td className="p-2 font-mono" lang="he">{p.letter}</td>
                  <td className="p-2 text-end tabular-nums">{fmt(lang, p.votes)}</td>
                  <td className="p-2 text-end tabular-nums">
                    <span className="inline-flex items-center gap-2">
                      <span className="hidden h-2 w-20 overflow-hidden rounded bg-paper-tint sm:inline-block">
                        <span className="block h-2" style={{ width: `${Math.min(100, p.pct * 2.5)}%`, background: colors[p.letter] }} />
                      </span>
                      {fmt(lang, p.pct, 2)}%
                    </span>
                  </td>
                  <td className="p-2 text-end text-base font-bold tabular-nums">{p.seats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {below.length > 0 && (
          <details className="mt-3 rounded-xl border border-line bg-paper-card p-3">
            <summary className="cursor-pointer font-semibold text-ink">
              {t.below} ({below.length})
            </summary>
            <table className="mt-2 w-full text-sm">
              <tbody>
                {below.map((p) => (
                  <tr key={p.letter} className="border-t border-line">
                    <td className="p-2">{partyName(lang, p)}</td>
                    <td className="p-2 font-mono" lang="he">{p.letter}</td>
                    <td className="p-2 text-end tabular-nums">{fmt(lang, p.votes)}</td>
                    <td className="p-2 text-end tabular-nums">{fmt(lang, p.pct, 2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        )}
      </section>

      <section className="rounded-xl border border-line bg-paper-card p-4">
        <h3 className="text-lg font-bold text-ink">{t.coalition}</h3>
        <p className="text-sm text-ink-muted">{t.coalitionNote}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {above.map((p) => {
            const on = picked.includes(p.letter);
            return (
              <button
                key={p.letter}
                type="button"
                aria-pressed={on}
                onClick={() => setPicked((cur) => (on ? cur.filter((x) => x !== p.letter) : [...cur, p.letter]))}
                className={`rounded-full border px-3 py-1 text-sm ${on ? "border-navy-deep bg-navy-deep text-white" : "border-line bg-paper text-ink"}`}
              >
                {partyName(lang, p)} · {p.seats}
              </button>
            );
          })}
        </div>
        <div className="mt-4">
          <div className="relative h-5 overflow-hidden rounded-full bg-paper-tint" dir="ltr">
            <div className="h-5 bg-navy" style={{ width: `${(coalitionSeats / 120) * 100}%` }} />
            <div className="absolute inset-y-0 border-s-2 border-ink" style={{ left: `${(61 / 120) * 100}%` }} title={t.majority} />
          </div>
          <p className="mt-2 text-sm font-semibold text-ink" aria-live="polite">
            {t.total}: {coalitionSeats}/120 · {coalitionSeats >= 61 ? t.reach : `${61 - coalitionSeats} ${t.short}`}
            {picked.length > 0 && (
              <button type="button" className="ms-3 text-navy underline" onClick={() => setPicked([])}>
                {t.clear}
              </button>
            )}
          </p>
        </div>
      </section>

      <ShareBar lang={lang} text={shareText} />
      <details className="rounded-xl border border-line bg-paper-card p-3 text-sm">
        <summary className="cursor-pointer font-semibold text-ink">{t.embed}</summary>
        <p className="mt-2 text-ink-muted">{t.embedNote}</p>
        <textarea readOnly dir="ltr" className="mt-2 h-24 w-full rounded border border-line p-2 font-mono text-xs" value={embedCode} onFocus={(e) => e.currentTarget.select()} />
      </details>
    </div>
  );
}
