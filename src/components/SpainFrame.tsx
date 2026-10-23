import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { PageHeader } from "@/components/PageHeader";
import { SourceList } from "@/components/SourceList";
import { SITE } from "@/data/site";
import type { SourceRef, Lang } from "@/data/spain/types";
import { ui } from "@/data/spain/ui";
import { RouteHero } from "@/components/CountryHero";
import { countryAccent } from "@/data/heroes";
import { breadcrumbJsonLd } from "@/lib/metadata";
import type { CSSProperties, ReactNode } from "react";

export function SpainFrame({
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
  crumbs: { name: string; path: string; href?: string }[];
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
    href: index === crumbs.length - 1 ? undefined : item.href ?? item.path,
    label: item.name,
  }));
  return (
    <article lang={lang} className="country-article" data-country="es" style={{ "--country-accent": countryAccent("es") } as CSSProperties}>
      <JsonLd data={breadcrumbJsonLd(crumbs.map((item) => ({ name: item.name, path: item.path })))} />
      <LanguageSwitch lang={lang} path={path} />
      <Breadcrumbs items={crumbItems} />
      <RouteHero country="es" path={path} />
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
