import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { sourceById } from "../../../data/pl/sources";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Poland",
  description:
    "Poland on Map the General: the Sejm and Senate election window of 14 October to 12 November 2027, in Polish and English. Unofficial information.",
  path: "/pl/",
});

const pkw = sourceById("pkw");

export default function PolandCountryPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Poland", path: "/pl/" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Poland" }]} />
      <PageHeader
        eyebrow="Polska"
        title="Poland"
        lede="Choose a language. Both versions cover the same election window, the same offices, and the same 16 voivodeships."
      />
      <ContentTrust updated={SITE.lastUpdated} pagePath="/pl/" officeHref={pkw.url} officeLabel="Państwowa Komisja Wyborcza" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/pl/pl/">
              Polski
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Wybory do Sejmu i Senatu: okno od 14 października do 12 listopada 2027 r. Dzień wyznacza Prezydent.
          </p>
        </li>
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/pl/en/">
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Sejm and Senate: 14 October to 12 November 2027. The President sets the day.
          </p>
        </li>
      </ul>
    </div>
  );
}
