import Link from "@/components/AnchorLink";
import { FranceFrame } from "../../_components/FranceFrame";
import { asLang } from "../../../../../data/fr/lang";
import { electionsPath, franceHome, sourcesPath } from "../../../../../data/fr/paths";
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
    title: fr ? "Sources, lois et licences" : "Sources, laws and licences",
    description: fr
      ? "Lois électorales, protection des données et Licence Ouverte 2.0 lues pour les pages France. Information non officielle."
      : "Electoral statutes, data-protection law and Open Licence 2.0 read for the France pages. Unofficial information.",
    path: sourcesPath(lang),
    lang,
    alternatePath: sourcesPath(fr ? "en" : "fr"),
  });
}

export default async function FranceSourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const fr = lang === "fr";
  const path = sourcesPath(lang);
  const office = sourceById("elections-interieur");
  return (
    <FranceFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: fr ? "Accueil" : "Home", path: "/" },
        { name: "France", path: "/fr/" },
        { name: "France", path: franceHome(lang) },
        { name: fr ? "Sources" : "Sources", path },
      ]}
      eyebrow={fr ? "Lu le 18 octobre 2026" : "Read on 18 October 2026"}
      title={fr ? "Sources, lois et licences" : "Sources, laws and licences"}
      lede={
        fr
          ? "Cette page liste les textes lus pour les départements et les circonscriptions. Elle ne donne aucun conseil."
          : "This page lists the texts read for the departments and the constituencies. It gives no advice."
      }
      officeHref={office.url}
      officeLabel="Ministère de l'Intérieur"
      sources={sourcesById([
        "code-l49",
        "loi-77-808",
        "rgpd",
        "loi-78-17",
        "lo-2",
        "an-licence",
        "an-deputes",
        "rne",
        "insee-cog-2026",
        "sp-f1939",
        "decret-2021-483",
        "decret-2024-527",
        "decret-2025-848",
      ])}
    >
      <section className="prose-legal">
        <h2>{fr ? "Silence électoral et sondages" : "Election silence and polls"}</h2>
        <p>
          {fr
            ? "L’article L49 du code électoral, en vigueur depuis le 30 juin 2020, interdit à partir de la veille du scrutin à zéro heure la distribution de bulletins et circulaires, la diffusion électronique d’un message de propagande, l’appel téléphonique en série et la réunion électorale. L’article 11 de la loi n° 77-808 du 19 juillet 1977 interdit la publication, la diffusion et le commentaire d’un sondage électoral la veille et le jour du scrutin. Pour l’élection présidentielle, l’élection des députés, l’élection européenne et un référendum national, l’interdiction court à compter du samedi précédant le scrutin à zéro heure. Pour une élection partielle, elle ne vise que les sondages qui portent sur ce scrutin."
            : "Article L49 of the Electoral Code, in force since 30 June 2020, prohibits from midnight on the day before the poll the distribution of ballots and circulars, the electronic distribution of a campaign message, serial telephone calls, and an election meeting. Article 11 of Law No. 77-808 of 19 July 1977 prohibits publication, distribution and comment on an election poll on the day before the poll and on election day. For the presidential election, the election of deputies, the European election and a national referendum, the ban runs from midnight on the Saturday before the poll. For a partial election, it covers only polls about that poll."}
        </p>
        <p>
          {fr
            ? "La fiche F1939, relue le 18 octobre 2026, place la prochaine élection nationale le 18 avril 2027. Elle ne place ni élection départementale ni élection législative dans les semaines qui suivent le 18 octobre 2026. Cette livraison n’imprime aucun sondage, aucune projection et aucun résultat, y compris pour une municipale partielle qui ne figure pas sur cette fiche."
            : "Page F1939, re-read on 18 October 2026, places the next national election on 18 April 2027. It places neither a departmental nor a legislative election in the weeks after 18 October 2026. This release prints no poll, no projection and no result, including for a municipal partial election that is not on that page."}
        </p>
        <p>
          <Link className="text-navy underline" href={electionsPath(lang)}>
            {fr ? "Index des élections" : "Elections index"}
          </Link>
        </p>
        <h2>{fr ? "Données des titulaires d’un mandat" : "Data about mandate-holders"}</h2>
        <p>
          {fr
            ? "Le règlement (UE) 2016/679 et la loi n° 78-17 du 6 janvier 1978 encadrent les données personnelles. Les pages ne recopient que ce que le Répertoire national des élus et l’Assemblée nationale publient déjà pour la fonction publique : nom, prénom, fonction lorsqu’elle est une colonne, dates de mandat, circonscription. Elles ne recopient ni date de naissance, ni adresse, ni téléphone, ni courriel, ni profession déclarative. Aucun traceur n’est ajouté."
            : "Regulation (EU) 2016/679 and Law No. 78-17 of 6 January 1978 govern personal data. The pages copy only what the National directory of elected officials and the National Assembly already publish for the public role: family name, given name, function when it is a column, mandate dates, and constituency. They do not copy a date of birth, an address, a telephone number, an email address, or a self-reported occupation. No tracker is added."}
        </p>
        <h2>{fr ? "Licence Ouverte 2.0" : "Open Licence 2.0"}</h2>
        <p>
          {fr
            ? "La page Etalab de la Licence Ouverte 2.0, lue le 18 octobre 2026, permet de reproduire et d’adapter l’information à condition de mentionner la source, au minimum le nom du producteur, et la date de dernière mise à jour. Cette mention ne doit pas suggérer une caution officielle. Le jeu « Répertoire national des élus » est marqué lov2 sur data.gouv.fr, mis à jour le 11 août 2026. L’Assemblée nationale publie les députés en exercice sous Licence Ouverte ; le catalogue du fichier lu est daté du 17 octobre 2026. L’INSEE est cité pour le COG et les populations, lus le 17 octobre 2026."
            : "The Etalab page for Open Licence 2.0, read on 18 October 2026, allows reproduction and adaptation if the source is named, at least the producer, together with the date of the last update. That credit must not suggest an official endorsement. The “Répertoire national des élus” dataset is marked lov2 on data.gouv.fr and was updated on 11 August 2026. The National Assembly publishes deputies in office under the Open Licence; the catalogue date of the file that was read is 17 October 2026. INSEE is credited for the COG and the populations, read on 17 October 2026."}
        </p>
        <p>
          {fr
            ? "L’éditeur est Joshua Israel Ventures LLC, société de Floride. Les pages restent factuelles : pas de consigne de vote, pas de qualificatif sur une personne, pas d’image."
            : "The publisher is Joshua Israel Ventures LLC, a Florida company. The pages stay factual: no voting instruction, no characterisation of a person, and no image."}
        </p>
      </section>
    </FranceFrame>
  );
}
