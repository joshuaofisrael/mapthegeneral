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
      <p className="mt-3 text-xs leading-5 text-ink-muted">
        {lang === "fr"
          ? "Informations publiques de l’INSEE, de Service-Public, de Légifrance et de data.gouv.fr réutilisées sous la "
          : "Public information from INSEE, Service-Public, Légifrance and data.gouv.fr reused under the "}
        <a className="underline" href="https://www.etalab.gouv.fr/licence-ouverte-open-licence/">
          {lang === "fr" ? "Licence Ouverte / Open Licence 2.0 (Etalab)" : "Licence Ouverte / Open Licence 2.0 (Etalab)"}
        </a>
        {lang === "fr"
          ? ". Source et date de lecture indiquées pour chaque fiche ci-dessus. Aucune image ni aucun logo n’est reproduit."
          : ". The source and the date read are given for each item above. No images or logos are reproduced."}
      </p>
    </article>
  );
}
