import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SourceList } from "@/components/SourceList";
import { SITE } from "@/data/site";
import { ui } from "../../../data/pl/ui";
import type { Lang, SourceRef } from "../../../data/pl/types";
import { RouteHero } from "@/components/CountryHero";
import { countryAccent } from "@/data/heroes";
import { breadcrumbJsonLd } from "@/lib/metadata";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

function swapLang(path: string, lang: Lang): string {
  return path.replace(/^\/pl\/(pl|en)\//, `/pl/${lang}/`);
}

export function PolandFrame({
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
  const crumbItems = crumbs.map((item, index) => ({
    href: index === crumbs.length - 1 ? undefined : item.path,
    label: item.name,
  }));
  return (
    <article lang={lang} className="country-article" data-country="pl" style={{ "--country-accent": countryAccent("pl") } as CSSProperties}>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((item) => ({ name: item.name, path: item.path })))} />
      <p className="mb-4 text-sm text-ink-muted">
        <Link className={lang === "pl" ? "font-semibold text-ink" : "text-navy underline"} href={swapLang(path, "pl")}>
          Polski
        </Link>
        <span aria-hidden="true"> · </span>
        <Link className={lang === "en" ? "font-semibold text-ink" : "text-navy underline"} href={swapLang(path, "en")}>
          English
        </Link>
      </p>
      <Breadcrumbs items={crumbItems} />
      <RouteHero country="pl" path={path} />
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
