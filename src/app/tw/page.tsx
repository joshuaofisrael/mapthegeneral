import type { Metadata } from "next";
import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { countryAccent } from "@/data/heroes";
import { hubMetadata, TW_HUB_LANGUAGES } from "@/data/new-hubs";
import { absoluteUrl } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/metadata";

const base = hubMetadata("tw", "chooser");
const TITLE = "臺灣 — 2026年地方公職人員選舉";
const DESCRIPTION =
  "臺灣地方公職人員選舉於2026年11月28日星期六舉行。日期出自中央選舉委員會送立法院的專題報告。非官方資訊。";

export const metadata: Metadata = {
  ...base,
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/tw/"), languages: TW_HUB_LANGUAGES },
  openGraph: { ...base.openGraph, title: `${TITLE} · Map the General`, description: DESCRIPTION, locale: "zh_TW" },
};

export default function Page() {
  return (
    <div lang="zh-Hant-TW">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "首頁", path: "/" },
          { name: "臺灣", path: "/tw/" },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "首頁" }, { label: "臺灣" }]} />
      <PageHeader
        eyebrow="臺灣"
        title="臺灣"
        lede="地方公職人員選舉，2026年11月28日星期六。日期出自中央選舉委員會送立法院的專題報告。本站為非官方資訊，不設鄉鎮市區頁面。"
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li className="country-card rounded-xl border border-line bg-paper-card p-5" style={{ borderTopColor: countryAccent("tw") }}>
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/tw/zh/elections/difang-gongzhi-2026/">
              2026年地方公職人員選舉
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">選舉日期、候選人公告日期及官方資料來源。</p>
        </li>
        <li className="country-card rounded-xl border border-line bg-paper-card p-5" style={{ borderTopColor: countryAccent("tw") }} lang="en">
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href="/tw/en/" hrefLang="en">
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">Taiwan hub in English: local public-office elections on Saturday 28 November 2026.</p>
        </li>
      </ul>
    </div>
  );
}
