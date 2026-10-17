import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SourceList } from "@/components/SourceList";
import { SITE } from "@/data/site";
import type { Lang } from "@/data/mx/paths";
import type { SourceRef } from "@/data/mx/sources";
import { ui } from "@/data/mx/ui";
import { breadcrumbJsonLd } from "@/lib/metadata";
import Link from "@/components/AnchorLink";

export function MexicoFrame({
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
  lang: Lang;
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
  const other: Lang = lang === "es" ? "en" : "es";
  const otherPath = path.replace(/^\/mx\/(es|en)\//, `/mx/${other}/`);
  return (
    <article lang={lang}>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <p className="mb-4 text-sm text-ink-muted">
        <Link className={lang === "es" ? "font-semibold text-ink" : "text-navy underline"} href={lang === "es" ? path : otherPath}>
          Español
        </Link>
        <span aria-hidden="true"> · </span>
        <Link className={lang === "en" ? "font-semibold text-ink" : "text-navy underline"} href={lang === "en" ? path : otherPath}>
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
