import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/de/sources";
import { breadcrumbJsonLd } from "@/lib/metadata";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Germany",
  description:
    "Germany on Map the General: the Bundestag election window for 2029 and the 16 Länder, in German and English. Unofficial information.",
  path: "/de",
});

const office = sourceById("bwl-home");

export default function GermanyCountryPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Germany", path: "/de" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Germany" }]} />
      <PageHeader
        eyebrow="Deutschland"
        title="Germany"
        lede="Choose a language. Both versions cover the same federal election window and the same 16 Länder."
      />
      <ContentTrust
        updated={SITE.lastUpdated}
        pagePath="/de/"
        officeHref={office.url}
        officeLabel="Die Bundeswahlleiterin"
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/de/de/">
              Deutsch
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Wahl zum 22. Deutschen Bundestag. Ein Wahltag ist noch nicht festgesetzt.
          </p>
        </li>
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/de/en/">
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Election of the 22nd German Bundestag. A polling day has not been set.
          </p>
        </li>
      </ul>
    </div>
  );
}
