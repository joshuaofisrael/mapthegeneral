import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/site";
import { sourceById } from "../../../data/jp/sources";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Japan",
  description:
    "Japan on Map the General: the House of Representatives and the House of Councillors, in Japanese and English. Unofficial information.",
  path: "/jp",
});

const office = sourceById("soumu-senkyo");

export default function JapanCountryPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Japan", path: "/jp" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Japan" }]} />
      <PageHeader
        eyebrow="日本"
        title="Japan"
        lede="Choose a language. Both versions cover the same elections and the same 47 prefectures."
      />
      <ContentTrust updated={SITE.lastUpdated} pagePath="/jp/" officeHref={office.url} officeLabel="総務省" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/jp/ja/">
              日本語
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            第51回衆議院議員総選挙は2026年2月8日。次の投票日の公示は、2026年10月17日に読んだ資料にはありません。
          </p>
        </li>
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/jp/en/">
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">
            The 51st House of Representatives election was on 8 February 2026. No proclamation of the next polling day was in the sources read on 17 October 2026.
          </p>
        </li>
      </ul>
    </div>
  );
}
