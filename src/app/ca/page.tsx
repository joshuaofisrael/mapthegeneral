import Link from "@/components/AnchorLink";
import { CountryHero } from "@/components/CountryHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/ca/sources";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Canada federal election 2029",
  description:
    "Canada on Map the General: the federal general election fixed for 15 October 2029, in English and French. Unofficial information.",
  path: "/ca",
});

const electionsCanada = sourceById("ec-home");

export default function CanadaCountryPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Canada", path: "/ca" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Canada" }]} />
      <CountryHero code="ca" priority />
      <PageHeader
        eyebrow="Canada"
        title="Canada"
        lede="Choose a language. Both versions cover the same federal election, the same provinces, and the same territories."
      />
      <ContentTrust
        updated={SITE.lastUpdated}
        pagePath="/ca/"
        officeHref={electionsCanada.url}
        officeLabel="Elections Canada"
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/ca/en/">
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Federal general election fixed for Monday, 15 October 2029, unless Parliament is dissolved earlier.
          </p>
          <p className="mt-3 text-sm">
            <Link className="text-navy underline" href="/ca/en/elections/bc-2026/">
              British Columbia provincial election, 24 October 2026
            </Link>
          </p>
        </li>
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/ca/fr/">
              Français
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Élection générale fédérale fixée au lundi 15 octobre 2029, sauf dissolution antérieure du Parlement.
          </p>
          <p className="mt-3 text-sm">
            <Link className="text-navy underline" href="/ca/fr/elections/bc-2026/">
              Élection provinciale de la Colombie-Britannique, 24 octobre 2026
            </Link>
          </p>
        </li>
      </ul>
    </div>
  );
}
