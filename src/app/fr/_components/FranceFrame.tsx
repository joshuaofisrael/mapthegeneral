import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SourceList } from "@/components/SourceList";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd } from "../../../../data/fr/seo";
import type { SourceRef, Lang } from "../../../../data/fr/types";
import type { ReactNode } from "react";

function otherLang(lang: Lang): Lang {
  return lang === "fr" ? "en" : "fr";
}

function swap(path: string, lang: Lang): string {
  return path.replace(/^\/fr\/(fr|en)\//, `/fr/${lang}/`);
}

export function FranceFrame({
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
  const other = otherLang(lang);
  return (
    <article lang={lang}>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <p className="mb-4 text-sm text-ink-muted">
        <Link className={lang === "fr" ? "font-semibold text-ink" : "text-navy underline"} href={swap(path, "fr")}>
          Français
        </Link>
        <span aria-hidden="true"> · </span>
        <Link className={lang === "en" ? "font-semibold text-ink" : "text-navy underline"} href={swap(path, "en")}>
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
      <ContentTrust
        updated={SITE.lastUpdated}
        pagePath={path}
        officeHref={officeHref}
        officeLabel={officeLabel}
      />
      <div className="mt-8 space-y-8">{children}</div>
      <SourceList sources={sources} heading={lang === "fr" ? "Sources" : "Sources"} />
    </article>
  );
}
