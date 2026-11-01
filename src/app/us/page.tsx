import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "United States",
  description: "United States on Map the General: live 2026 midterm state results, in English. Unofficial information.",
  path: "/us/",
});

export default function UnitedStatesCountryPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "United States", path: "/us/" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "United States" }]} />
      <PageHeader
        eyebrow="United States"
        title="United States"
        lede="The pages in this release are in English, the language of the state and county election-office pages that were read."
      />
      <ContentTrust updated={SITE.lastUpdated} pagePath="/us/" officeHref="https://www.usa.gov/election-office" officeLabel="your state or county election office" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/us/en/">
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            A live, state-by-state results board for the 2026 midterm elections on Tuesday 3 November 2026.
          </p>
          <p className="mt-3 text-sm">
            <Link className="text-navy underline" href="/us/en/live/">
              Live results
            </Link>
          </p>
        </li>
      </ul>
    </div>
  );
}
