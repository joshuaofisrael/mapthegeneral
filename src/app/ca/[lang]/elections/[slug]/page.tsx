import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { CanadaFrame } from "@/app/ca/_components/CanadaFrame";
import { asCaLang } from "@/data/ca/lang";
import { canadaHome, electionPath } from "@/data/ca/paths";
import { COMMONS_SEATS, SENATE_SEATS } from "@/data/ca/places";
import { caMetadata } from "@/data/ca/seo";
import { sourceById, sourcesById } from "@/data/ca/sources";
import { ui } from "@/data/ca/ui";

export function generateStaticParams() {
  return ["en", "fr"].map((lang) => ({ lang, slug: "federal-2029" }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  if (slug !== "federal-2029") return {};
  const lang = asCaLang(raw);
  return caMetadata({
    title: lang === "fr" ? "Élection générale fédérale du 15 octobre 2029" : "Federal general election of 15 October 2029",
    description:
      lang === "fr"
        ? "Date fixe du 15 octobre 2029 selon Élections Canada et l’article 56.1. L’élection n’est pas convoquée dans les sources lues. Information non officielle."
        : "Fixed date of 15 October 2029 from Elections Canada and section 56.1. The election is not called in the sources that were read. Unofficial information.",
    path: electionPath(lang),
    lang,
  });
}

export default async function FederalElectionPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  if (slug !== "federal-2029") notFound();
  const lang = asCaLang(raw);
  const copy = ui(lang);
  const fr = lang === "fr";
  const path = electionPath(lang);
  const office = sourceById("ec-home");
  return (
    <CanadaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.canada, path: "/ca/" },
        { name: "Canada", path: canadaHome(lang) },
        { name: copy.elections, path: `${canadaHome(lang)}elections/` },
        { name: fr ? "15 octobre 2029" : "15 October 2029", path },
      ]}
      eyebrow={fr ? "Date fixe · pas une convocation" : "Fixed date · not a call"}
      title={fr ? "Élection générale fédérale du 15 octobre 2029" : "Federal general election of 15 October 2029"}
      lede={
        fr
          ? "Élections Canada écrit que la prochaine date fixe est le 15 octobre 2029. L’article 56.1 laisse au gouverneur général le pouvoir de dissoudre le Parlement plus tôt. Aucun bref pour 2029 n’a été lu."
          : "Elections Canada writes that the next fixed date is October 15, 2029. Section 56.1 leaves the Governor General the power to dissolve Parliament sooner. No writ for 2029 was read."
      }
      officeHref={office.url}
      officeLabel="Elections Canada"
      sources={sourcesById(["cea-56-1", "ec-briefing", "ec-table7", "hoc-standings", "senate-about"])}
    >
      <section className="prose-legal">
        <h2>{fr ? "Ce que dit la loi" : "What the statute says"}</h2>
        <p>
          {fr
            ? "L’article 56.1(1), dans le texte anglais lu, dit que rien dans cet article ne porte atteinte aux pouvoirs du gouverneur général, y compris le pouvoir de dissoudre le Parlement à sa discrétion. L’article 56.1(2) dit que, sous réserve du paragraphe (1), chaque élection générale doit avoir lieu le troisième lundi d’octobre de la quatrième année civile suivant le jour du scrutin de la dernière élection générale."
            : "Section 56.1(1), in the English text that was read, says nothing in the section affects the powers of the Governor General, including the power to dissolve Parliament at the Governor General’s discretion. Section 56.1(2) says that, subject to subsection (1), each general election must be held on the third Monday of October in the fourth calendar year following polling day for the last general election."}
        </p>
        <p>
          {fr
            ? "Le cahier de mai 2025 d’Élections Canada applique cette règle : dernière élection générale le 28 avril 2025, prochaine date fixe le 15 octobre 2029, sans que la loi empêche une autre date. Le jour du 15 octobre 2029 est celui qu’Élections Canada imprime. Cette page ne le recalcule pas."
            : "Elections Canada’s May 2025 briefing applies that rule: last general election on April 28, 2025, next fixed date October 15, 2029, and the Act does not prevent another date. October 15, 2029 is the day Elections Canada prints. This page does not recalculate it."}
        </p>
        <h2>{fr ? "Ce que cette élection pourvoit" : "What this election fills"}</h2>
        <p>
          {fr
            ? `Les résultats officiels du scrutin du 28 avril 2025, tableau 7, impriment un total de ${COMMONS_SEATS} sièges. La page des positions de la Chambre, lue le 17 octobre 2026, imprime aussi ${COMMONS_SEATS} sièges. La page sur le Sénat dit que la Constitution prévoit ${SENATE_SEATS} membres nommés. Ces sièges ne sont pas pourvus par l’élection générale.`
            : `The official voting results of 28 April 2025, table 7, print a total of ${COMMONS_SEATS} seats. The House standings page, read on 17 October 2026, also prints ${COMMONS_SEATS} seats. The Senate page says the Constitution provides ${SENATE_SEATS} appointed members. Those seats are not filled by the general election.`}
        </p>
        <GapNote label={copy.gap} text={copy.candidateGap} />
        <p>
          <Link className="text-navy underline" href={`${canadaHome(lang)}results/`}>
            {fr ? "Résultats officiels du 28 avril 2025" : "Official voting results of 28 April 2025"}
          </Link>
        </p>
      </section>
    </CanadaFrame>
  );
}
