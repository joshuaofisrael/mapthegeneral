import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SourceList } from "@/components/SourceList";
import { SITE } from "@/data/site";
import type { SourceRef, KrLang } from "@/data/kr/types";
import { ui } from "@/data/kr/ui";
import { swapKrLang } from "@/data/kr/paths";
import { breadcrumbJsonLd } from "@/lib/metadata";
import type { ReactNode } from "react";

export function KoreaFrame({
  lang,
  path,
  crumbs,
  eyebrow,
  title,
  lede,
  officeHref,
  officeLabel,
  sources,
  children,
}: {
  lang: KrLang;
  path: string;
  crumbs: { name: string; path: string }[];
  eyebrow?: string;
  title: string;
  lede?: string;
  officeHref: string;
  officeLabel: string;
  sources: SourceRef[];
  children: ReactNode;
}) {
  const copy = ui(lang);
  const other = lang === "ko" ? "en" : "ko";
  return (
    <article lang={lang}>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((item) => ({ name: item.name, path: item.path })))} />
      <p className="mb-4 text-sm text-ink-muted">
        <Link className={lang === "ko" ? "font-semibold text-ink" : "text-navy underline"} href={swapKrLang(path, "ko")}>
          한국어
        </Link>
        <span aria-hidden="true"> · </span>
        <Link className={lang === "en" ? "font-semibold text-ink" : "text-navy underline"} href={swapKrLang(path, "en")}>
          English
        </Link>
        <span className="sr-only">{other}</span>
      </p>
      <Breadcrumbs
        items={crumbs.map((item, index) => ({
          href: index === crumbs.length - 1 ? undefined : item.path,
          label: item.name,
        }))}
      />
      <PageHeader eyebrow={eyebrow} title={title} lede={lede} />
      <ContentTrust updated={SITE.lastUpdated} pagePath={path} officeHref={officeHref} officeLabel={officeLabel} />
      <div className="mt-8 space-y-8">{children}</div>
      <SourceList sources={sources} heading={copy.sourcesHeading} />
    </article>
  );
}
