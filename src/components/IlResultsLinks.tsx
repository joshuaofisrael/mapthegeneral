import Link from "@/components/AnchorLink";

/** Site-wide link to the Israel results pages, shown on every page until 5 November 2026. */
export const IL_PROMO_UNTIL = Date.parse("2026-11-06T00:00:00+02:00");

export function IlResultsBanner() {
  if (Date.now() >= IL_PROMO_UNTIL) return null;
  return (
    <div className="border-b border-line bg-navy-deep px-4 py-2 text-center text-sm text-white">
      <Link href="/il/he/results/" hrefLang="he" lang="he" dir="rtl" className="font-semibold underline">
        תוצאות הבחירות 2026 בזמן אמת
      </Link>
      <span aria-hidden="true" className="mx-2 opacity-60">·</span>
      <Link href="/il/en/results/" className="font-semibold underline">
        Israel election results 2026, live from the Central Elections Committee
      </Link>
    </div>
  );
}

/** Prominent card for the homepage hero and the Israel hub pages. */
export function IlResultsCard() {
  return (
    <div className="mt-6 rounded-xl border-2 border-navy bg-paper-card p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Israel · Knesset election · 27 October 2026</p>
      <p className="mt-2 font-serif text-2xl font-semibold text-ink">Live results: the 120 Knesset seats</p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        Official Central Elections Committee count from 22:00 Israel time, with seats by list, the 3.25% threshold, turnout and a
        coalition calculator. No polls.
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <Link href="/il/he/results/" hrefLang="he" lang="he" dir="rtl" className="rounded-full bg-navy-deep px-4 py-2 text-sm font-semibold text-white hover:bg-navy">
          תוצאות הבחירות 2026 בעברית
        </Link>
        <Link href="/il/en/results/" className="rounded-full border border-navy px-4 py-2 text-sm font-semibold text-navy hover:bg-navy-wash">
          Results in English
        </Link>
      </div>
    </div>
  );
}
