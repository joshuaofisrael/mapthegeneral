import Link from "next/link";
import { CountryHero } from "@/components/CountryHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/italy/sources";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Italy — languages",
  description:
    "Italy on Map the General: the Chamber and the Senate elected on 25 September 2022, and the 20 regions, in Italian and English. The next general election has no printed polling day. Unofficial information.",
  path: "/it",
});

const dait = sourceById("dait");

export default function ItalyCountryPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Italy", path: "/it" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Italy" }]} />
      <CountryHero code="it" priority />
      <PageHeader
        eyebrow="Italia"
        title="Italy"
        lede="Choose a language. Both versions cover the same chambers, the same regions, and the same gaps."
      />
      <ContentTrust updated={SITE.lastUpdated} pagePath="/it/" officeHref={dait.url} officeLabel="Dipartimento per gli Affari Interni e Territoriali" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/it/it/">
              Italiano
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Camera e Senato eletti il 25 settembre 2022. Nessun giorno di calendario per la prossima elezione politica.{" "}
            <Link className="text-navy underline" href="/it/it/elections/camera-chieti-2026/">
              Elezione suppletiva, collegio 01-Chieti, 15-16 novembre 2026
            </Link>
            .
          </p>
        </li>
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/it/en/">
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Chamber and Senate elected on 25 September 2022. No calendar day for the next general election.{" "}
            <Link className="text-navy underline" href="/it/en/elections/camera-chieti-2026/">
              Chamber by-election, constituency 01-Chieti, 15–16 November 2026
            </Link>
            .
          </p>
        </li>
      </ul>
    </div>
  );
}
