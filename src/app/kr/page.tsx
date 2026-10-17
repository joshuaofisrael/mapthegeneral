import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SITE, absoluteUrl } from "@/data/site";
import { sourceById } from "@/data/kr/sources";
import { breadcrumbJsonLd } from "@/lib/metadata";
import type { Metadata } from "next";

const nec = sourceById("nec-home");

export const metadata: Metadata = {
  title: "South Korea",
  description:
    "South Korea on Map the General: the National Assembly election of 12 April 2028, in Korean and English. Unofficial information.",
  alternates: { canonical: absoluteUrl("/kr") },
  robots: { index: true, follow: true },
};

export default function KoreaCountryPage() {
  return (
    <div>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "South Korea", path: "/kr" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "South Korea" }]} />
      <PageHeader
        eyebrow="대한민국"
        title="South Korea"
        lede="Choose a language. Both versions cover the same election and the same upper-level local governments."
      />
      <ContentTrust updated={SITE.lastUpdated} pagePath="/kr/" officeHref={nec.url} officeLabel="중앙선거관리위원회" />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/kr/ko/">
              한국어
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">국회의원선거, 2028년 4월 12일.</p>
        </li>
        <li className="rounded-xl border border-line bg-paper-card p-5">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/kr/en/">
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">National Assembly election, 12 April 2028.</p>
        </li>
      </ul>
    </div>
  );
}
