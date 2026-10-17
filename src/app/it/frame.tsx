import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SourceList } from "@/components/SourceList";
import { SITE } from "@/data/site";
import type { ItLang, SourceRef } from "@/data/italy/types";
import { ui } from "@/data/italy/ui";
import { italyHome } from "@/data/italy/paths";
import { breadcrumbJsonLd } from "@/lib/metadata";
import type { ReactNode } from "react";

export function ItalyFrame({
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
  lang: ItLang;
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
  const swapped = (target: ItLang) =>
    path.startsWith("/it/it/") || path.startsWith("/it/en/")
      ? path.replace(/^\/it\/(it|en)\//, `/it/${target}/`)
      : italyHome(target);
  return (
    <article lang={lang}>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <p className="mb-4 text-sm text-ink-muted">
        <Link className={lang === "it" ? "font-semibold text-ink" : "text-navy underline"} href={swapped("it")}>
          Italiano
        </Link>
        <span aria-hidden="true"> · </span>
        <Link className={lang === "en" ? "font-semibold text-ink" : "text-navy underline"} href={swapped("en")}>
          English
        </Link>
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
