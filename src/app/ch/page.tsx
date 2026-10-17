import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";
import { sourceById } from "../../../data/ch/sources";

export const metadata = pageMetadata({
  title: "Switzerland",
  description:
    "Switzerland on Map the General: the National Council election of 24 October 2027, in German, French, Italian, and English. Unofficial information.",
  path: "/ch",
});

const office = sourceById("bk-nationalrat");

export default function SwitzerlandCountryPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Switzerland", path: "/ch" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Switzerland" }]} />
      <PageHeader
        eyebrow="Schweiz · Suisse · Svizzera"
        title="Switzerland"
        lede="Choose a language. The four versions cover the same federal election and the same 26 cantons."
      />
      <ContentTrust updated={SITE.lastUpdated} pagePath="/ch/" officeHref={office.url} officeLabel="Bundeskanzlei" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/ch/de/">
              Deutsch
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">Nationalratswahlen vom 24. Oktober 2027.</p>
        </li>
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/ch/fr/">
              Français
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">Élection du Conseil national du 24 octobre 2027.</p>
        </li>
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/ch/it/">
              Italiano
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">Elezione del Consiglio nazionale del 24 ottobre 2027.</p>
        </li>
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/ch/en/">
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">National Council election of 24 October 2027.</p>
        </li>
      </ul>
    </div>
  );
}
