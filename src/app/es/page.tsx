import Link from "@/components/AnchorLink";
import { CountryHero } from "@/components/CountryHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/spain/sources";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Spain — languages",
  description:
    "Spain on Map the General: the general election of 29 November 2026, in Spanish and English. Unofficial information.",
  path: "/es",
});

const jec = sourceById("jec-generales-2026");

export default function SpainCountryPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Spain", path: "/es" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Spain" }]} />
      <CountryHero code="es" priority />
      <PageHeader
        eyebrow="España"
        title="Spain"
        lede="Choose a language. Both versions cover the same election, the same communities, and the same provinces."
      />
      <ContentTrust
        updated={SITE.lastUpdated}
        pagePath="/es/"
        officeHref={jec.url}
        officeLabel="Junta Electoral Central"
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/es/es/">
              Español
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Elecciones a Cortes Generales del domingo 29 de noviembre de 2026.
          </p>
        </li>
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/es/en/">
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            General election for both chambers, Sunday, 29 November 2026.
          </p>
        </li>
      </ul>
    </div>
  );
}
