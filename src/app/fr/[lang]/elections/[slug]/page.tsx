import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { FranceFrame } from "../../../_components/FranceFrame";
import { asLang } from "../../../../../../data/fr/lang";
import { PRESIDENTIAL_SLUG, electionsPath, franceHome, presidentialPath } from "../../../../../../data/fr/paths";
import { franceMetadata } from "../../../../../../data/fr/seo";
import { sourceById, sourcesById } from "../../../../../../data/fr/sources";

export function generateStaticParams() {
  return [
    { lang: "fr", slug: PRESIDENTIAL_SLUG },
    { lang: "en", slug: PRESIDENTIAL_SLUG },
  ];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = asLang(raw);
  if (slug !== PRESIDENTIAL_SLUG) return {};
  const fr = lang === "fr";
  return franceMetadata({
    title: fr ? "Présidentielle, 18 avril et 2 mai 2027" : "Presidential election, 18 April and 2 May 2027",
    description: fr
      ? "Dates lues sur Service-Public. Cette page ne proclame pas de résultat et ne publie pas de candidature."
      : "Dates read on Service-Public. This page does not declare a result and does not publish a candidacy.",
    path: presidentialPath(lang),
    lang,
    alternatePath: presidentialPath(fr ? "en" : "fr"),
  });
}

export default async function PresidentialPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang = asLang(raw);
  if (slug !== PRESIDENTIAL_SLUG) notFound();
  const fr = lang === "fr";
  const path = presidentialPath(lang);
  const office = sourceById("sp-f1940");
  return (
    <FranceFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: fr ? "Accueil" : "Home", path: "/" },
        { name: "France", path: "/fr/" },
        { name: "France", path: franceHome(lang) },
        { name: fr ? "Élections" : "Elections", path: electionsPath(lang) },
        { name: fr ? "18 avril et 2 mai 2027" : "18 April and 2 May 2027", path },
      ]}
      eyebrow="Service-Public F1939 · F1940 · A15053"
      title={fr ? "Élection présidentielle de 2027" : "Presidential election of 2027"}
      lede={
        fr
          ? "Premier tour le dimanche 18 avril 2027. Second tour le dimanche 2 mai 2027."
          : "First round on Sunday, 18 April 2027. Second round on Sunday, 2 May 2027."
      }
      officeHref={office.url}
      officeLabel="Service-Public"
      sources={sourcesById(["sp-f1939", "sp-f1940", "sp-a15053", "elections-interieur"])}
    >
      <section className="prose-legal">
        <h2>{fr ? "Ce qui est imprimé" : "What is printed"}</h2>
        <ul>
          <li>
            {fr
              ? "F1939, vérifiée le 1er juillet 2026 : prochain vote les 18 avril et 2 mai 2027 ; précédent vote en avril 2022."
              : "F1939, verified on 1 July 2026: next vote on 18 April and 2 May 2027; previous vote in April 2022."}
          </li>
          <li>
            {fr
              ? "A15053, publiée le 2 juillet 2026 : le Conseil des ministres du 1er juillet 2026 a statué sur ces dates. Le premier tour est le dimanche 18 avril 2027 et le second tour le dimanche 2 mai 2027."
              : "A15053, published on 2 July 2026: the Council of Ministers of 1 July 2026 settled these dates. The first round is Sunday, 18 April 2027, and the second round is Sunday, 2 May 2027."}
          </li>
          <li>
            {fr
              ? "Les deux pages écrivent qu’en Guadeloupe, en Martinique, en Guyane, à Saint-Pierre-et-Miquelon, à Saint-Barthélemy, à Saint-Martin et en Polynésie française, le vote a lieu les samedis 17 avril et 1er mai 2027."
              : "Both pages say that in Guadeloupe, Martinique, Guyane, Saint-Pierre-et-Miquelon, Saint-Barthélemy, Saint-Martin and French Polynesia, voting is on Saturday, 17 April and Saturday, 1 May 2027."}
          </li>
          <li>
            {fr
              ? "F1940 : suffrage universel direct, mandat de cinq ans renouvelable une fois consécutivement, plus de la moitié des suffrages exprimés, sinon second tour des deux candidats arrivés en tête deux semaines après. La fiche cite le décret n° 2022-66 du 26 janvier 2022 portant convocation des électeurs pour l’élection du président de la République. Cette page n’a pas lu le dispositif de ce décret et n’en tire pas les jours d’avril 2022."
              : "F1940: direct universal suffrage, a five-year term renewable once consecutively, more than half of the votes cast, otherwise a runoff of the two leading candidates two weeks later. The page cites Decree No. 2022-66 of 26 January 2022 summoning voters for the election of the President of the Republic. This page has not read the operative part of that decree and does not take April 2022 dates from it."}
          </li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">{fr ? "Candidatures" : "Candidacies"}</h2>
        <GapNote
          label={fr ? "Lacune" : "Gap"}
          text={
            fr
              ? "Aucune liste de candidats n’est copiée ici. Les pages lues le 17 octobre 2026 donnent des dates et une règle d’élection. Elles n’impriment pas les candidats de 2027."
              : "No list of candidates is copied here. The pages read on 17 October 2026 give dates and a rule of election. They do not print the 2027 candidates."
          }
        />
      </section>
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">{fr ? "Résultats" : "Results"}</h2>
        <GapNote
          label={fr ? "Lacune" : "Gap"}
          text={
            fr
              ? "Il n’y a pas de décompte du scrutin de 2027 à reproduire. Cette page ne proclame pas un élu, n’attribue pas de voix et ne commente pas une tendance."
              : "There is no count of the 2027 poll to reprint. This page does not declare a winner, does not assign votes, and does not describe a trend."
          }
        />
        <GapNote
          label={fr ? "Lacune" : "Gap"}
          text={
            fr
              ? "Aucun décret de convocation pour le 18 avril 2027 n’a été lu. F1939 écrit que, hors vacance de la présidence ou empêchement, les électeurs sont convoqués au moins dix semaines avant le premier tour."
              : "No summoning decree for 18 April 2027 was read. F1939 says that, apart from a vacancy or an incapacity of the presidency, voters are summoned at least ten weeks before the first round."
          }
        />
      </section>
    </FranceFrame>
  );
}
