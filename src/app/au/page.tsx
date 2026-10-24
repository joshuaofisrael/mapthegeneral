import Link from "@/components/AnchorLink";
import { CountryHero } from "@/components/CountryHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/au/sources";
import { breadcrumbJsonLd } from "@/lib/metadata";
import { auPageMetadata } from "@/data/au/meta";

export const metadata = auPageMetadata({
  title: "Australia — language",
  description:
    "Australia on Map the General: the federal election due between August 2027 and May 2028, in English. Unofficial information.",
  path: "/au",
});

const aec = sourceById("aec-entitlement-2026");

export default function AustraliaCountryPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Australia", path: "/au" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Australia" }]} />
      <CountryHero code="au" priority />
      <PageHeader
        eyebrow="Australia"
        title="Australia"
        lede="The pages in this release are in English, the language of the Commonwealth, electoral-commission and statistics pages that were read. No second-language edition was added."
      />
      <ContentTrust updated={SITE.lastUpdated} pagePath="/au/" officeHref={aec.url} officeLabel="Australian Electoral Commission" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/au/en/">
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            The Australian Electoral Commission says the next federal election is due between August 2027 and May 2028.
            It has not named a polling day.
          </p>
          <p className="mt-3 text-sm">
            <Link className="text-navy underline" href="/au/en/elections/victoria-2026/">
              Victorian state election, Saturday 28 November 2026
            </Link>
          </p>
        </li>
      </ul>
    </div>
  );
}
