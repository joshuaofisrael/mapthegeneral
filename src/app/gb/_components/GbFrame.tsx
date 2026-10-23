import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SourceList } from "@/components/SourceList";
import { SITE } from "@/data/site";
import type { SourceRef } from "@/data/gb/sources";
import { RouteHero } from "@/components/CountryHero";
import { countryAccent } from "@/data/heroes";
import { breadcrumbJsonLd } from "@/lib/metadata";
import type { CSSProperties, ReactNode } from "react";

export function GbFrame({
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
  return (
    <article lang="en" className="country-article" data-country="gb" style={{ "--country-accent": countryAccent("gb") } as CSSProperties}>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs
        items={crumbs.map((item, index) => ({
          href: index === crumbs.length - 1 ? undefined : item.path,
          label: item.name,
        }))}
      />
      <RouteHero country="gb" path={path} />
      <PageHeader eyebrow={eyebrow} title={title} lede={lede} />
      <ContentTrust updated={SITE.lastUpdated} pagePath={path} officeHref={officeHref} officeLabel={officeLabel} />
      <div className="mt-8 space-y-8">{children}</div>
      <SourceList sources={sources} heading="Sources" />
    </article>
  );
}
