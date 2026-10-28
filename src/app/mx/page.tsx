import Link from "@/components/AnchorLink";
import { CountryHero } from "@/components/CountryHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/mx/sources";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Mexico federal election 2027",
  description:
    "Mexico on Map the General: the federal election of 6 June 2027, in Spanish and English. Unofficial information.",
  path: "/mx/",
});

const ine = sourceById("ine-2027");

export default function MexicoCountryPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Mexico", path: "/mx/" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Mexico" }]} />
      <CountryHero code="mx" priority />
      <PageHeader
        eyebrow="México"
        title="Mexico"
        lede="Choose a language. Both versions cover the same federal election and the same 32 entidades federativas."
      />
      <ContentTrust updated={SITE.lastUpdated} pagePath="/mx/" officeHref={ine.url} officeLabel="Instituto Nacional Electoral" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/mx/es/">
              Español
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Elección federal de diputaciones del domingo 6 de junio de 2027, y elecciones locales en las 32 entidades.
          </p>
        </li>
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/mx/en/">
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Federal election of deputies on Sunday, 6 June 2027, and local elections in the 32 entidades.
          </p>
        </li>
      </ul>
    </div>
  );
}
