import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "United States",
  description: "United States hub on Map the General: live 2026 midterm state results, with the full guide on the sibling site Map the Midterms.",
  path: "/us/en/",
});

export default function Page() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "United States", path: "/us/" }, { name: "United States", path: "/us/en/" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/us/", label: "United States" }, { label: "English" }]} />
      <PageHeader
        eyebrow="United States"
        title="United States"
        lede="This release carries one page for the United States: a live, state-by-state results board for the 2026 midterm elections on Tuesday 3 November 2026. The full guide, with race and candidate detail for every state, is the sibling project linked below."
      />
      <ContentTrust updated={SITE.lastUpdated} pagePath="/us/en/" officeHref="https://www.usa.gov/election-office" officeLabel="your state or county election office" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/us/en/live/">
              Live state results, 3 November 2026
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            A table of all 50 states and the District of Columbia, each one linked to its own official election-office
            results page, refreshed about once a minute from an aggregated official feed. No polls, no projections,
            and no countdown.
          </p>
        </li>
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <a className="hover:text-navy" href={SITE.siblingUrl}>
              {SITE.siblingName}
            </a>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            The sibling site carries the full 2026 U.S. midterm guide: every state and race, candidates, and the same
            official-source live results, in more depth than this single page.
          </p>
        </li>
      </ul>
      <section className="mt-10 space-y-3 text-sm leading-6 text-ink-muted">
        <h2 className="font-serif text-xl font-semibold text-ink">About this page</h2>
        <p>
          {SITE.name} is an unofficial, independent guide. It is not affiliated with any government, election
          authority, or candidate, and it does not tell anyone how to vote. Election day for federal, state, and
          local races covered here is Tuesday 3 November 2026; some states continue counting and certifying votes
          for days or weeks afterward, and the live page above says so when it applies.
        </p>
      </section>
    </div>
  );
}
