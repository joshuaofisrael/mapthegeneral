import Link from "@/components/AnchorLink";

/** Shown with the homepage election-night module until the recent-results window closes. */
export const BG_PROMO_UNTIL = Date.parse("2026-11-15T00:00:00+02:00");

export function BgElectionBanner() {
  if (Date.now() >= BG_PROMO_UNTIL) return null;
  return (
    <div className="border-b border-line bg-paper-card px-4 py-2 text-center text-sm text-ink">
      <Link href="/bg/bg/elections/prezident-2026/" hrefLang="bg" lang="bg" className="font-semibold text-navy underline">
        България: президент и вицепрезидент, 1 ноември 2026
      </Link>
      <span aria-hidden="true" className="mx-2 opacity-60">
        ·
      </span>
      <Link href="/bg/en/elections/president-2026/" className="font-semibold text-navy underline">
        Bulgaria presidential election, 1 November 2026
      </Link>
    </div>
  );
}

export function BgElectionCard() {
  if (Date.now() >= BG_PROMO_UNTIL) return null;
  return (
    <div className="mt-6 rounded-xl border-2 border-navy bg-paper-card p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy">Bulgaria · President and vice president · 1 November 2026</p>
      <p className="mt-2 font-serif text-2xl font-semibold text-ink">New election on Sunday 1 November 2026</p>
      <p className="mt-2 text-sm leading-6 text-ink-muted">
        The National Assembly dated a new election for 1 November 2026 if the 25 October vote elected no pair. The Central
        Election Commission’s distribution of 26 October, with 100 percent of section protocols processed, gives no pair more
        than half. No surveys and no forecast. A count for 1 November appears here only after the Commission publishes it.
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        <Link
          href="/bg/bg/elections/prezident-2026/"
          hrefLang="bg"
          lang="bg"
          className="rounded-full bg-navy-deep px-4 py-2 text-sm font-semibold text-white hover:bg-navy"
        >
          На български
        </Link>
        <Link
          href="/bg/en/elections/president-2026/"
          className="rounded-full border border-navy px-4 py-2 text-sm font-semibold text-navy hover:bg-navy-wash"
        >
          In English
        </Link>
      </div>
    </div>
  );
}
