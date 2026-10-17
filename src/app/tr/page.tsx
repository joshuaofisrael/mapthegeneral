import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { sourceById } from "@/data/tr/sources";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Türkiye",
  description:
    "Turkey on Map the General: the next presidential and parliamentary elections, in 2028, with the polling day unconfirmed, in Turkish and English. Unofficial information.",
  path: "/tr",
});

const ysk = sourceById("ysk-home");

export default function TurkeyCountryPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Türkiye", path: "/tr" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Türkiye" }]} />
      <PageHeader
        eyebrow="Türkiye Cumhuriyeti"
        title="Türkiye"
        lede="Choose a language. Both versions cover the same elections, the same provinces, and the same gaps."
      />
      <ContentTrust updated={SITE.lastUpdated} pagePath="/tr/" officeHref={ysk.url} officeLabel="Yüksek Seçim Kurulu" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/tr/tr/">
              Türkçe
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Cumhurbaşkanı ve milletvekili seçimleri. Bir sonraki olağan seçim 2028’dedir; oy günü bu sayfada yok.
          </p>
        </li>
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/tr/en/">
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            Presidential and parliamentary elections. The next ordinary election falls in 2028; the polling day is not printed here.
          </p>
        </li>
      </ul>
    </div>
  );
}
