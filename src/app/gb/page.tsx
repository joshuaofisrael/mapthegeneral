import Link from "@/components/AnchorLink";
import { CountryHero } from "@/components/CountryHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/gb/sources";
import { gbMetadata } from "@/data/gb/seo";
import { breadcrumbJsonLd } from "@/lib/metadata";

export const metadata = gbMetadata({
  title: "United Kingdom — language",
  description:
    "United Kingdom on Map the General: the UK Parliament general election, no later than 15 August 2029, in English. Unofficial information.",
  path: "/gb/",
});

const commission = sourceById("ec-schedule");

export default function UnitedKingdomCountryPage() {
  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "United Kingdom", path: "/gb/" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "United Kingdom" }]} />
      <CountryHero code="gb" priority />
      <PageHeader
        eyebrow="United Kingdom"
        title="United Kingdom"
        lede="This release is in English. It covers the UK Parliament, England, Scotland, Wales and Northern Ireland."
      />
      <ContentTrust
        updated={SITE.lastUpdated}
        pagePath="/gb/"
        officeHref={commission.url}
        officeLabel="Electoral Commission"
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/gb/en/">
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            UK Parliament general election, no later than 15 August 2029, as listed by the Electoral Commission.
          </p>
        </li>
      </ul>
    </div>
  );
}
