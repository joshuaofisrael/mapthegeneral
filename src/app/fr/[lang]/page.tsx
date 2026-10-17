import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { FranceFrame } from "../_components/FranceFrame";
import { formatNumber } from "../../../../data/fr/format";
import { asLang } from "../../../../data/fr/lang";
import {
  COMERS,
  POPULATION_MUNICIPALE_SUM,
  POPULATION_TOTALE_SUM,
  REGIONS,
  alphaRegions,
} from "../../../../data/fr/places";
import { franceMetadata } from "../../../../data/fr/seo";
import { sourceById, sourcesById } from "../../../../data/fr/sources";
import { electionsPath, franceHome, presidentialPath, regionPath } from "../../../../data/fr/paths";

export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const fr = lang === "fr";
  return franceMetadata({
    title: "France",
    description: fr
      ? "Élection présidentielle des 18 avril et 2 mai 2027, régions du Code officiel géographique, populations de référence 2023. Information non officielle."
      : "Presidential election of 18 April and 2 May 2027, regions from the official geographic code, and 2023 reference populations. Unofficial information.",
    path: franceHome(lang),
    lang,
    alternatePath: franceHome(fr ? "en" : "fr"),
  });
}

export default async function FranceNationalPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const fr = lang === "fr";
  const path = franceHome(lang);
  const office = sourceById("elections-interieur");
  return (
    <FranceFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: fr ? "Accueil" : "Home", path: "/" },
        { name: "France", path: "/fr/" },
        { name: "France", path },
      ]}
      eyebrow={fr ? "Élection présidentielle · 18 avril et 2 mai 2027" : "Presidential election · 18 April and 2 May 2027"}
      title="France"
      lede={
        fr
          ? "Service-Public indique que le premier tour a lieu le dimanche 18 avril 2027 et le second tour le dimanche 2 mai 2027."
          : "Service-Public states that the first round is on Sunday, 18 April 2027, and the second round is on Sunday, 2 May 2027."
      }
      officeHref={office.url}
      officeLabel="Ministère de l'Intérieur"
      sources={sourcesById([
        "sp-f1939",
        "sp-f1940",
        "sp-a15053",
        "insee-cog-2026",
        "insee-pop-2023",
        "insee-ensemble-2023",
        "info-gouv-gouvernement",
        "jorf-gouvernement-20260222",
        "elections-interieur",
        "laposte-postcodes",
      ])}
    >
      <section className="prose-legal">
        <h2>{fr ? "Prochaine élection nationale" : "Next national election"}</h2>
        <p>
          {fr
            ? "La fiche F1939, vérifiée le 1er juillet 2026, dit que la prochaine élection nationale est l’élection présidentielle, le 18 avril et le 2 mai 2027. L’actualité A15053, publiée le 2 juillet 2026, écrit que le Conseil des ministres du 1er juillet 2026 a statué sur ces dates. En Guadeloupe, en Martinique, en Guyane, à Saint-Pierre-et-Miquelon, à Saint-Barthélemy, à Saint-Martin et en Polynésie française, les électeurs votent les samedis 17 avril et 1er mai 2027."
            : "Page F1939, verified on 1 July 2026, says the next national election is the presidential election, on 18 April and 2 May 2027. News item A15053, published on 2 July 2026, says the Council of Ministers of 1 July 2026 settled those dates. In Guadeloupe, Martinique, Guyane, Saint-Pierre-et-Miquelon, Saint-Barthélemy, Saint-Martin and French Polynesia, voters vote on Saturday, 17 April and Saturday, 1 May 2027."}
        </p>
        <p>
          <Link className="text-navy underline" href={presidentialPath(lang)}>
            {fr ? "Page de cette élection" : "Page for this election"}
          </Link>
        </p>
        <h2>{fr ? "Règle lue sur Service-Public" : "Rule read on Service-Public"}</h2>
        <p>
          {fr
            ? "La fiche F1940, vérifiée le 1er juillet 2026, dit que le président de la République est élu au suffrage universel direct, que le mandat dure cinq ans et qu’il est renouvelable une fois consécutivement. Elle dit aussi que l’élection requiert plus de la moitié des suffrages exprimés et que, sinon, les deux candidats arrivés en tête se présentent à un second tour deux semaines après. La fiche cite la Constitution du 4 octobre 1958, articles 5 à 19. Cette page ne recopie pas le texte de ces articles."
            : "Page F1940, verified on 1 July 2026, says the President of the Republic is elected by direct universal suffrage, that the term lasts five years, and that it can be renewed once consecutively. It also says election requires more than half of the votes cast and that, otherwise, the two leading candidates go to a runoff two weeks later. The page cites the Constitution of 4 October 1958, articles 5 to 19. This page does not reprint those articles."}
        </p>
      </section>

      <section className="prose-legal">
        <h2>{fr ? "Fonctions lues le 17 octobre 2026" : "Offices read on 17 October 2026"}</h2>
        <p>
          {fr
            ? "Le décret du 22 février 2026 relatif à la composition du Gouvernement, lu sur Légifrance comme en vigueur au 17 octobre 2026, est signé Emmanuel Macron, président de la République, et Sébastien Lecornu, Premier ministre. La page info.gouv.fr « Composition du Gouvernement », annoncée le 26/02/2026, nomme Sébastien Lecornu comme Premier ministre et Laurent Nunez comme ministre de l’Intérieur. Cette page ne recopie pas le reste de la liste."
            : "The decree of 22 February 2026 on the composition of the Government, read on Légifrance as in force on 17 October 2026, is signed Emmanuel Macron, President of the Republic, and Sébastien Lecornu, Prime Minister. The info.gouv.fr page “Composition du Gouvernement”, announced on 26/02/2026, names Sébastien Lecornu as Prime Minister and Laurent Nunez as Minister of the Interior. This page does not copy the rest of that list."}
        </p>
        <GapNote
          label={fr ? "Lagune" : "Gap"}
          text={
            fr
              ? "Les noms des présidents de région et des maires ne sont pas sur cette page. Les pages de départements et de communes ne sont pas dans cette livraison."
              : "Names of regional presidents and mayors are not on this page. Department and commune pages are not in this release."
          }
        />
      </section>

      <section className="prose-legal">
        <h2>{fr ? "Autres échéances imprimées par la fiche F1939" : "Other dates printed on page F1939"}</h2>
        <p>
          {fr
            ? "Pour la métropole, la fiche vérifiée le 1er juillet 2026 imprime : départementales et régionales, mars 2028 (précédent vote juin 2021) ; européennes, 2029 (juin 2024) ; législatives, 2029 (juin et juillet 2024) ; municipales, 2032 (mars 2026). Elle n’imprime pas un jour du mois pour ces scrutins. Elle écrit que la dernière élection sénatoriale qu’elle mentionne a eu lieu en septembre 2023. Cette fiche a été vérifiée avant le 17 octobre 2026. Cette page ne recopie pas un résultat sénatorial postérieur."
            : "For metropolitan France, the page verified on 1 July 2026 prints: departmental and regional elections, March 2028 (previous vote June 2021); European elections, 2029 (June 2024); legislative elections, 2029 (June and July 2024); municipal elections, 2032 (March 2026). It does not print a day of the month for those polls. It says the last senatorial election it mentions was in September 2023. That page was verified before 17 October 2026. This page does not copy a later senatorial result."}
        </p>
        <p>
          <Link className="text-navy underline" href={electionsPath(lang)}>
            {fr ? "Index des élections" : "Elections index"}
          </Link>
        </p>
        <GapNote
          label={fr ? "Lagune" : "Gap"}
          text={
            fr
              ? "Aucun décret de convocation des électeurs pour le 18 avril 2027 n’a été lu pour cette page. La fiche F1939 rappelle que, hors vacance ou empêchement, les électeurs sont convoqués au moins dix semaines avant le premier tour."
              : "No decree summoning voters for 18 April 2027 was read for this page. Page F1939 recalls that, apart from a vacancy or an incapacity, voters are summoned at least ten weeks before the first round."
          }
        />
      </section>

      <section className="prose-legal">
        <h2>{fr ? "Population et géographie" : "Population and geography"}</h2>
        <p>
          {fr
            ? `Le fichier d’ensemble Insee « France hors Mayotte », lu le 17 octobre 2026, donne une population municipale et une population totale pour 17 régions. Leur somme est ${formatNumber(POPULATION_MUNICIPALE_SUM, lang)} (population municipale) et ${formatNumber(POPULATION_TOTALE_SUM, lang)} (population totale). La page Insee des populations de référence 2023 dit que ces chiffres, au 1er janvier 2023 dans les limites communales au 1er janvier 2025, sont authentifiés par le décret n° 2025-1362 du 26 décembre 2025 et entrent en vigueur au 1er janvier 2026. Mayotte n’est pas dans ce fichier.`
            : `The INSEE ensemble file “France excluding Mayotte”, read on 17 October 2026, gives a municipal population and a total population for 17 regions. They add up to ${formatNumber(POPULATION_MUNICIPALE_SUM, lang)} (municipal population) and ${formatNumber(POPULATION_TOTALE_SUM, lang)} (total population). The INSEE page for the 2023 reference populations says these figures, at 1 January 2023 in the communal boundaries of 1 January 2025, are authenticated by Decree No. 2025-1362 of 26 December 2025 and take effect on 1 January 2026. Mayotte is not in that file.`}
        </p>
        <p>
          {fr
            ? `Le Code officiel géographique au 1er janvier 2026 compte ${formatNumber(REGIONS.length, lang)} régions, dont Mayotte. La page Insee de ce millésime écrit qu’aucune commune nouvelle n’a été créée entre le 2 janvier 2025 et le 1er janvier 2026, à cause des élections municipales de mars 2026, et que la collectivité territoriale de Mayotte prend le nom de Département-Région de Mayotte et le code 976R au 1er janvier 2026. Le même fichier compte 101 départements.`
            : `The official geographic code at 1 January 2026 has ${formatNumber(REGIONS.length, lang)} regions, including Mayotte. The INSEE page for that vintage says no new commune was created between 2 January 2025 and 1 January 2026, because of the March 2026 municipal elections, and that the territorial collectivity of Mayotte takes the name Département-Région de Mayotte and the code 976R on 1 January 2026. The same file has 101 departments.`}
        </p>
        <p>
          {fr
            ? `Collectivités et territoires d’outre-mer imprimés dans le fichier COG, sans page dans cette livraison : ${COMERS.map((item) => item.officialName).join(", ")}.`
            : `Overseas collectivities and territories printed in the COG file, with no page in this release: ${COMERS.map((item) => item.officialName).join(", ")}.`}
        </p>
        <GapNote
          label={fr ? "Lagune" : "Gap"}
          text={
            fr
              ? "La Base officielle des codes postaux est publiée par La Poste sur data.gouv.fr. Cette livraison ne relie pas un code postal à une commune, parce que les pages de communes ne sont pas publiées."
              : "La Poste publishes the Base officielle des codes postaux on data.gouv.fr. This release does not link a postcode to a commune, because commune pages are not published."
          }
        />
      </section>

      <LinkGrid
        heading={fr ? "Régions" : "Regions"}
        items={alphaRegions().map((region) => ({
          href: regionPath(lang, region.slug),
          title: region.officialName,
          detail: region.populationMunicipale
            ? formatNumber(region.populationMunicipale, lang)
            : fr
              ? "Population non imprimée dans le fichier hors Mayotte"
              : "Population not printed in the file that excludes Mayotte",
        }))}
      />
    </FranceFrame>
  );
}
