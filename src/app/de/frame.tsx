import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SourceList } from "@/components/SourceList";
import { SITE } from "@/data/site";
import type { DeLang, SourceRef } from "@/data/de/types";
import { ui } from "@/data/de/ui";
import { otherLang } from "@/data/de/paths";
import { breadcrumbJsonLd } from "@/lib/metadata";
import type { ReactNode } from "react";

function swapDeLang(path: string, lang: DeLang): string {
  if (path.startsWith("/de/de/") || path.startsWith("/de/en/")) {
    return path.replace(/^\/de\/(de|en)\//, `/de/${lang}/`);
  }
  return path;
}

export function GermanyFrame({
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
  lang: DeLang;
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
  const other = otherLang(lang);
  const crumbItems = crumbs.map((item, index) => ({
    href: index === crumbs.length - 1 ? undefined : item.path,
    label: item.name,
  }));
  return (
    <article lang={lang}>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((item) => ({ name: item.name, path: item.path })))} />
      <p className="mb-4 text-sm text-ink-muted">
        <a className={lang === "de" ? "font-semibold text-ink" : "text-navy underline"} href={swapDeLang(path, "de")}>
          Deutsch
        </a>
        <span aria-hidden="true"> · </span>
        <a className={lang === "en" ? "font-semibold text-ink" : "text-navy underline"} href={swapDeLang(path, "en")}>
          English
        </a>
        <span className="sr-only">{other}</span>
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
