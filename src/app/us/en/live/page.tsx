import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { UsLiveResults } from "@/components/UsLiveResults";
import { SITE } from "@/data/site";
import { US_LIVE_PATH, type UsLiveDoc } from "@/data/us-live";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

/** Snapshot written at build time by scripts/us-live/snapshot.mjs. */
function snapshot(): UsLiveDoc {
  const file = path.join(process.cwd(), "public", "live", "us-2026-results.json");
  const empty: UsLiveDoc = {
    generatedAt: null,
    electionDay: "2026-11-03",
    chambers: { house: { dem: null, rep: null, other: null }, senate: { dem: null, rep: null, other: null } },
    countsContinue: false,
    states: {},
  };
  if (!existsSync(file)) return empty;
  try {
    const parsed = JSON.parse(readFileSync(file, "utf8")) as UsLiveDoc;
    return parsed && typeof parsed === "object" && parsed.states ? parsed : empty;
  } catch {
    return empty;
  }
}

export const metadata: Metadata = pageMetadata({
  title: "US midterms 2026: live state results",
  description: "Live, state-by-state links to official 2026 U.S. midterm results, refreshed about once a minute. No polls or projections.",
  path: US_LIVE_PATH,
});

export default function Page() {
  const doc = snapshot();
  const updated = doc.generatedAt
    ? new Date(doc.generatedAt).toLocaleString("en-GB", { timeZone: "UTC", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) + " UTC"
    : SITE.lastUpdated;
  return (
    <div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "US midterms 2026: live state results",
          url: `${SITE.url}${US_LIVE_PATH}`,
          dateModified: doc.generatedAt ?? undefined,
          isPartOf: { "@type": "WebSite", name: SITE.name, url: `${SITE.url}/` },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "United States", path: "/us/" },
          { name: "United States", path: "/us/en/" },
          { name: "Live results", path: US_LIVE_PATH },
        ])}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/us/en/", label: "United States" },
          { label: "Live results" },
        ]}
      />
      <PageHeader
        eyebrow="United States · 2026 midterms · 3 November 2026"
        title="US midterms 2026: live state results"
        lede="State-by-state links to official results, read from one feed built from official state and county election-office sources. No polls, no projections, no exit polls, and no countdown: each state card links straight to that state's own results page."
      />
      <ContentTrust
        updated={updated}
        pagePath={US_LIVE_PATH}
        officeHref="https://www.usa.gov/election-office"
        officeLabel="your state or county election office"
      />
      <div className="mt-8">
        <UsLiveResults initial={doc} />
      </div>
      <section className="mt-10 space-y-3 text-sm leading-6 text-ink-muted">
        <h2 className="font-serif text-xl font-semibold text-ink">Where this comes from</h2>
        <p>
          The feed behind this page is published by the sibling project that covers the 2026 U.S. midterms in full,{" "}
          <a className="font-medium text-navy underline" href={SITE.siblingUrl}>
            {SITE.siblingUrl}
          </a>
          , from a workflow that reads each state&rsquo;s own official election-office results service. This page
          reads that one published file and adds nothing of its own: no seat forecasts, no exit polls, and no called
          race that the linked state office has not itself published. If a figure ever looks wrong, the fix is to
          check the state link in the same row, since that official page is the source of record.
        </p>
        <p>
          For full race-by-race detail, candidate pages, and county-level results as they are added state by state,
          see{" "}
          <a className="font-medium text-navy underline" href={SITE.siblingUrl}>
            {SITE.siblingName}
          </a>
          . This page is one state-by-state status board, built to the same unofficial, nonpartisan standard as the
          rest of {SITE.name}.
        </p>
        <p>
          <Link className="font-medium text-navy underline" href="/us/en/">
            Back to the United States hub
          </Link>
        </p>
      </section>
    </div>
  );
}
