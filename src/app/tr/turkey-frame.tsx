import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SourceList } from "@/components/SourceList";
import { SITE } from "@/data/site";
import type { SourceRef, TrLang } from "@/data/tr/types";
import { ui } from "@/data/tr/ui";
import { breadcrumbJsonLd } from "@/lib/metadata";
import type { ReactNode } from "react";

function swap(path: string, lang: TrLang): string {
  return path.replace(/^\/tr\/(tr|en)\//, `/tr/${lang}/`);
}

export function TurkeyFrame({
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
  lang: TrLang;
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
  const crumbItems = crumbs.map((item, index) => ({
    href: index === crumbs.length - 1 ? undefined : item.path,
    label: item.name,
  }));
  return (
    <article lang={lang}>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((item) => ({ name: item.name, path: item.path })))} />
      <p className="mb-4 text-sm text-ink-muted">
        <a className={lang === "tr" ? "font-semibold text-ink" : "text-navy underline"} href={swap(path, "tr")}>
          Türkçe
        </a>
        <span aria-hidden="true"> · </span>
        <a className={lang === "en" ? "font-semibold text-ink" : "text-navy underline"} href={swap(path, "en")}>
          English
        </a>
      </p>
      <Breadcrumbs items={crumbItems} />
      <PageHeader eyebrow={eyebrow} title={title} lede={lede} />
      <ContentTrust
        updated={SITE.lastUpdated}
        pagePath={path}
        officeHref={officeHref}
        officeLabel={officeLabel}
      />
      <div className="mt-8 space-y-8">{children}</div>
      <SourceList sources={sources} heading={copy.sourcesHeading} />
    </article>
  );
}
