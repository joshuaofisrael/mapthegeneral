import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { notFound } from "next/navigation";
import { FranceFrame } from "../../_components/FranceFrame";
import { formatOptional } from "../../../../../data/fr/format";
import { asLang } from "../../../../../data/fr/lang";
import {
  alphaRegions,
  bodiesInRegion,
  departmentsIn,
  regionBySlug,
  regionNeighbors,
} from "../../../../../data/fr/places";
import { constituenciesForDepartment } from "../../../../../data/fr/level2";
import {
  circonscriptionsIndexPath,
  constituencyPath,
  departmentPath,
  electionsPath,
  franceHome,
  regionPath,
} from "../../../../../data/fr/paths";
import { franceMetadata } from "../../../../../data/fr/seo";
import { sourceById, sourcesById } from "../../../../../data/fr/sources";

export function generateStaticParams() {
  return ["fr", "en"].flatMap((lang) => alphaRegions().map((region) => ({ lang, region: region.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; region: string }>;
}) {
  const { lang: raw, region: slug } = await params;
  const lang = asLang(raw);
  const region = regionBySlug(slug);
  if (!region) return {};
  const fr = lang === "fr";
  return franceMetadata({
    title: region.officialName,
    description: fr
      ? `${region.officialName} : code ${region.code} du COG au 1er janvier 2026, chef-lieu ${region.chefLieu}. Information non officielle.`
      : `${region.officialName}: COG code ${region.code} at 1 January 2026, chef-lieu ${region.chefLieu}. Unofficial information.`,
    path: regionPath(lang, slug),
    lang,
    alternatePath: regionPath(fr ? "en" : "fr", slug),
  });
}

export default async function RegionPage({
  params,
}: {
  params: Promise<{ lang: string; region: string }>;
}) {
  const { lang: raw, region: slug } = await params;
  const lang = asLang(raw);
  const region = regionBySlug(slug);
  if (!region) notFound();
  const fr = lang === "fr";
  const path = regionPath(lang, slug);
  const departments = departmentsIn(region.code);
  const bodies = bodiesInRegion(region.code);
  const neighbors = regionNeighbors(slug);
  const office = sourceById("elections-interieur");

  return (
    <FranceFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: fr ? "Accueil" : "Home", path: "/" },
        { name: "France", path: "/fr/" },
        { name: "France", path: franceHome(lang) },
        { name: region.officialName, path },
      ]}
      eyebrow={fr ? `Région · code ${region.code}` : `Region · code ${region.code}`}
      title={region.officialName}
      lede={fr ? `Chef-lieu dans le COG : ${region.chefLieu}.` : `Chef-lieu in the COG: ${region.chefLieu}.`}
      officeHref={office.url}
      officeLabel="Ministère de l'Intérieur"
      sources={sourcesById([
        "insee-cog-2026",
        "insee-pop-2023",
        "insee-ensemble-2023",
        "sp-f1939",
        "elections-interieur",
      ])}
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {fr ? "Population municipale" : "Municipal population"}
          </dt>
          <dd className="mt-1 font-serif text-2xl">{formatOptional(region.populationMunicipale, lang)}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {region.populationInEnsemble
              ? fr
                ? "Fichier d’ensemble, France hors Mayotte. Référence au 1er janvier 2023, en vigueur au 1er janvier 2026."
                : "Ensemble file, France excluding Mayotte. Reference date 1 January 2023, in force on 1 January 2026."
              : fr
                ? "Mayotte n’est pas dans ce fichier."
                : "Mayotte is not in that file."}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {fr ? "Population totale" : "Total population"}
          </dt>
          <dd className="mt-1 font-serif text-2xl">{formatOptional(region.populationTotale, lang)}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {fr
              ? "Somme de la population municipale et de la population comptée à part, dans le même fichier lorsqu’il la donne."
              : "Municipal population plus the population counted separately, in the same file when it gives the figure."}
          </dd>
        </div>
      </dl>

      <p className="text-sm text-ink-muted">
        {fr ? "Code région" : "Region code"} {region.code}. {fr ? "Chef-lieu" : "Chef-lieu"} {region.chefLieu} (
        {region.chefLieuCode}). {fr ? "Arrondissements" : "Arrondissements"}{" "}
        {formatOptional(region.arrondissements, lang)}. {fr ? "Cantons" : "Cantons"}{" "}
        {formatOptional(region.cantons, lang)}. {fr ? "Communes" : "Communes"}{" "}
        {formatOptional(region.communes, lang)}.
      </p>

      {!region.populationInEnsemble && (
        <GapNote
          label={fr ? "Lacune" : "Gap"}
          text={
            fr
              ? `La page Insee des populations de référence 2023 dit que le cyclone Chido a reporté la collecte de 2025 à Mayotte et qu’un recensement exhaustif a été organisé du 27 novembre 2025 au 10 janvier 2026, avec authentification de nouvelles populations fin 2026. Cette page n’imprime pas un chiffre de population. Le nombre de communes, ${formatOptional(region.communes, lang)}, est le compte des lignes TYPECOM « COM » du COG 2026 pour le département 976. Le chef-lieu imprimé par le COG est ${region.chefLieu}.`
              : `The INSEE page for the 2023 reference populations says cyclone Chido postponed the 2025 collection in Mayotte and that a full census was organised from 27 November 2025 to 10 January 2026, with new populations to be authenticated at the end of 2026. This page does not print a population figure. The commune count, ${formatOptional(region.communes, lang)}, is the count of TYPECOM “COM” rows in COG 2026 for department 976. The chef-lieu printed by the COG is ${region.chefLieu}.`
          }
        />
      )}

      <section className="prose-legal">
        <h2>{fr ? "Élections de cette région" : "Elections for this region"}</h2>
        <p>
          {fr
            ? "La fiche F1939, vérifiée le 1er juillet 2026, place les prochaines élections régionales en mars 2028 et le précédent vote en juin 2021. Elle dit que la date précise est communiquée au moins six semaines à l’avance. Elle n’imprime pas un jour de mars 2028. La même fiche place les élections départementales au même horizon. L’élection présidentielle des 18 avril et 2 mai 2027 est nationale."
            : "Page F1939, verified on 1 July 2026, places the next regional elections in March 2028 and the previous vote in June 2021. It says the precise date is announced at least six weeks ahead. It does not print a day in March 2028. The same page places departmental elections on the same horizon. The presidential election of 18 April and 2 May 2027 is national."}
        </p>
        <p>
          <Link className="text-navy underline" href={electionsPath(lang)}>
            {fr ? "Index des élections" : "Elections index"}
          </Link>
        </p>
        <h2>{fr ? "Collectivité qui a les compétences départementales" : "Body with departmental powers"}</h2>
        <p>
          {fr
            ? "Le fichier COG des collectivités territoriales ayant les compétences départementales, joint aux communes de type COM, imprime les noms suivants pour cette région :"
            : "The COG file of territorial collectivities that hold departmental powers, joined to communes of type COM, prints these names for this region:"}
        </p>
        <ul>
          {bodies.map((body) => (
            <li key={body.code}>
              {body.officialName} ({body.code})
            </li>
          ))}
        </ul>
        <GapNote
          label={fr ? "Lacune" : "Gap"}
          text={
            fr
              ? "Le nom de la personne qui préside l’exécutif régional n’est pas copié ici. Les pages de communes ne sont pas publiées. Le nom, le président et les élections de chaque département sont sur la page liée."
              : "The name of the person who presides over the regional executive is not copied here. Commune pages are not published. Each department’s name, president and elections are on the linked page."
          }
        />
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{fr ? "Départements" : "Departments"}</h2>
        <table className="fact-table mt-3">
          <thead>
            <tr>
              <th scope="col">{fr ? "Code" : "Code"}</th>
              <th scope="col">{fr ? "Nom dans le COG" : "Name in the COG"}</th>
              <th scope="col">{fr ? "Chef-lieu" : "Chef-lieu"}</th>
              <th scope="col">{fr ? "Communes" : "Communes"}</th>
              <th scope="col">{fr ? "Population municipale" : "Municipal population"}</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((department) => (
              <tr key={department.code}>
                <td>{department.code}</td>
                <td>
                  <Link className="text-navy underline" href={departmentPath(lang, slug, department.slug)}>
                    {department.officialName}
                  </Link>
                </td>
                <td>{department.chefLieu}</td>
                <td>{formatOptional(department.communes, lang)}</td>
                <td>{formatOptional(department.populationMunicipale, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-sm text-ink-muted">
          {fr
            ? "Population : fichier d’ensemble France hors Mayotte lorsqu’il contient le département. Communes, nom et chef-lieu : COG au 1er janvier 2026. Pour les départements présents dans les deux fichiers, le nombre de communes du fichier de population est égal au nombre de lignes TYPECOM « COM » du COG."
            : "Population: the ensemble file for France excluding Mayotte, when it contains the department. Communes, name and chef-lieu: COG at 1 January 2026. For departments present in both files, the commune count in the population file equals the number of TYPECOM “COM” rows in the COG."}
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">
          {fr ? "Circonscriptions législatives" : "Legislative constituencies"}
        </h2>
        <ul className="mt-3 space-y-1 text-sm">
          {departments.flatMap((department) =>
            constituenciesForDepartment(department.code).map((constituency) => (
              <li key={constituency.uid}>
                <Link className="text-navy underline" href={constituencyPath(lang, constituency.slug)}>
                  {constituency.libelle}
                </Link>
              </li>
            )),
          )}
        </ul>
        <p className="mt-2 text-sm">
          <Link className="text-navy underline" href={circonscriptionsIndexPath(lang)}>
            {fr ? "Index des 577 circonscriptions" : "Index of the 577 constituencies"}
          </Link>
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">
          {fr ? "Nom précédent et suivant" : "Previous and next name"}
        </h2>
        <ul className="mt-3 space-y-2 text-sm">
          {neighbors.prev && (
            <li>
              <Link className="text-navy underline" href={regionPath(lang, neighbors.prev.slug)}>
                {neighbors.prev.officialName}
              </Link>
            </li>
          )}
          {neighbors.next && (
            <li>
              <Link className="text-navy underline" href={regionPath(lang, neighbors.next.slug)}>
                {neighbors.next.officialName}
              </Link>
            </li>
          )}
        </ul>
      </section>
    </FranceFrame>
  );
}
