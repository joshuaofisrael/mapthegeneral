import type { ReactNode } from "react";
import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SourceList } from "@/components/SourceList";
import { otherLangPath } from "@/data/ca/paths";
import type { SourceRef, CaLang } from "@/data/ca/types";
import { ui } from "@/data/ca/ui";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/metadata";

export function CanadaFrame({
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
  lang: CaLang;
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
        <Link className={lang === "en" ? "font-semibold text-ink" : "text-navy underline"} href={otherLangPath(path, "en")}>
          English
        </Link>
        <span aria-hidden="true"> · </span>
        <Link className={lang === "fr" ? "font-semibold text-ink" : "text-navy underline"} href={otherLangPath(path, "fr")}>
          Français
        </Link>
      </p>
      <Breadcrumbs items={crumbItems} />
      <PageHeader eyebrow={eyebrow} title={title} lede={lede} />
      <ContentTrust updated={SITE.lastUpdated} pagePath={path} officeHref={officeHref} officeLabel={officeLabel} />
      <div className="mt-8 space-y-8">{children}</div>
      <SourceList sources={sources} heading={copy.sourcesHeading} />
    </article>
  );
}
