import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { sourceById } from "../../../data/fr/sources";
import { breadcrumbJsonLd, franceMetadata } from "../../../data/fr/seo";

export const metadata = franceMetadata({
  title: "France",
  description:
    "France on Map the General: the presidential election of 18 April 2027 and 2 May 2027, in French and English. Unofficial information.",
  path: "/fr",
});

const office = sourceById("elections-interieur");

export default function FranceCountryPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "France", path: "/fr" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "France" }]} />
      <PageHeader
        eyebrow="France"
        title="France"
        lede="Choose a language. Both versions cover the same presidential election and the same 18 regions."
      />
      <ContentTrust
        updated={SITE.lastUpdated}
        pagePath="/fr/"
        officeHref={office.url}
        officeLabel="Ministère de l'Intérieur"
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/fr/fr/">
              Français
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Élection présidentielle : dimanche 18 avril 2027, second tour le dimanche 2 mai 2027.
          </p>
        </li>
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/fr/en/">
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Presidential election: Sunday, 18 April 2027, with a runoff on Sunday, 2 May 2027.
          </p>
        </li>
      </ul>
    </div>
  );
}
