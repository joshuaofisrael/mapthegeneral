import Link from "@/components/AnchorLink";
import { FranceFrame } from "../../_components/FranceFrame";
import { asLang } from "../../../../../data/fr/lang";
import {
  circonscriptionsIndexPath,
  departementsIndexPath,
  electionsPath,
  franceHome,
  presidentialPath,
  sourcesPath,
} from "../../../../../data/fr/paths";
import { franceMetadata } from "../../../../../data/fr/seo";
import { sourceById, sourcesById } from "../../../../../data/fr/sources";

export function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const fr = lang === "fr";
  return franceMetadata({
    title: fr ? "Élections en France" : "Elections in France",
    description: fr
      ? "Échéances lues sur Service-Public le 18 octobre 2026. L’élection nationale détaillée est la présidentielle de 2027."
      : "Dates read on Service-Public on 18 October 2026. The national election published in detail is the 2027 presidential election.",
    path: electionsPath(lang),
    lang,
    alternatePath: electionsPath(fr ? "en" : "fr"),
  });
}

const ROWS = {
  fr: [
    ["Élection présidentielle", "18 avril et 2 mai 2027", "Avril 2022"],
    ["Élections départementales", "Mars 2028", "Juin 2021"],
    ["Élections régionales", "Mars 2028", "Juin 2021"],
    ["Élections européennes", "2029", "Juin 2024"],
    ["Élections législatives", "2029", "Juin et juillet 2024"],
    ["Élections municipales", "2032", "Mars 2026"],
  ],
  en: [
    ["Presidential election", "18 April and 2 May 2027", "April 2022"],
    ["Departmental elections", "March 2028", "June 2021"],
    ["Regional elections", "March 2028", "June 2021"],
    ["European elections", "2029", "June 2024"],
    ["Legislative elections", "2029", "June and July 2024"],
    ["Municipal elections", "2032", "March 2026"],
  ],
} as const;

export default async function ElectionsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const fr = lang === "fr";
  const path = electionsPath(lang);
  const office = sourceById("sp-f1939");
  return (
    <FranceFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: fr ? "Accueil" : "Home", path: "/" },
        { name: "France", path: "/fr/" },
        { name: "France", path: franceHome(lang) },
        { name: fr ? "Élections" : "Elections", path },
      ]}
      title={fr ? "Élections" : "Elections"}
      lede={
        fr
          ? "Le tableau reprend la fiche F1939 pour la métropole. Il n’ajoute pas de jour qui n’y est pas imprimé."
          : "The table repeats page F1939 for metropolitan France. It does not add a day the page does not print."
      }
      officeHref={office.url}
      officeLabel="Service-Public"
      sources={sourcesById(["sp-f1939", "sp-a15053", "sp-f1940"])}
    >
      <table className="fact-table">
        <thead>
          <tr>
            <th scope="col">{fr ? "Élection" : "Election"}</th>
            <th scope="col">{fr ? "Prochain vote" : "Next vote"}</th>
            <th scope="col">{fr ? "Précédent vote" : "Previous vote"}</th>
          </tr>
        </thead>
        <tbody>
          {ROWS[lang].map((row) => (
            <tr key={row[0]}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <section className="prose-legal">
        <p>
          {fr
            ? "La fiche, vérifiée le 1er juillet 2026, dit aussi que la dernière élection sénatoriale qu’elle mentionne a eu lieu en septembre 2023. Pour la présidentielle, en Guadeloupe, en Guyane, en Martinique, en Polynésie française, à Saint-Barthélemy, à Saint-Martin et à Saint-Pierre-et-Miquelon, elle imprime les samedis 17 avril 2027 et 1er mai 2027."
            : "The page, verified on 1 July 2026, also says the last senatorial election it mentions was in September 2023. For the presidential election, in Guadeloupe, Guyane, Martinique, French Polynesia, Saint-Barthélemy, Saint-Martin and Saint-Pierre-et-Miquelon, it prints Saturday, 17 April 2027 and Saturday, 1 May 2027."}
        </p>
        <p>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={presidentialPath(lang)}>
            {fr ? "Élection présidentielle de 2027" : "Presidential election of 2027"}
          </Link>
        </p>
        <p>
          <Link className="text-navy underline" href={departementsIndexPath(lang)}>
            {fr ? "Départements" : "Departments"}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={circonscriptionsIndexPath(lang)}>
            {fr ? "Circonscriptions législatives" : "Legislative constituencies"}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={sourcesPath(lang)}>
            {fr ? "Sources, lois et licences" : "Sources, laws and licences"}
          </Link>
        </p>
      </section>
    </FranceFrame>
  );
}
