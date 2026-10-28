import Link from "@/components/AnchorLink";
import { CanadaFrame } from "@/app/ca/_components/CanadaFrame";
import { asCaLang } from "@/data/ca/lang";
import { bcElectionPath, canadaHome, electionPath } from "@/data/ca/paths";
import { caMetadata } from "@/data/ca/seo";
import { sourceById, sourcesById } from "@/data/ca/sources";
import { ui } from "@/data/ca/ui";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asCaLang((await params).lang);
  return caMetadata({
    title: lang === "fr" ? "Élections au Canada" : "Elections in Canada",
    description:
      lang === "fr"
        ? "Élections au Canada. Date fédérale fixe : 15 octobre 2029. Scrutin final en Colombie-Britannique : 24 octobre 2026."
        : "Elections on the Canada pages. Federal fixed date 15 October 2029. British Columbia final voting day was 24 October 2026.",
    path: `${canadaHome(lang)}elections/`,
    lang,
  });
}

export default async function ElectionsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asCaLang((await params).lang);
  const copy = ui(lang);
  const fr = lang === "fr";
  const path = `${canadaHome(lang)}elections/`;
  const office = sourceById("ec-home");
  return (
    <CanadaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.canada, path: "/ca/" },
        { name: "Canada", path: canadaHome(lang) },
        { name: copy.elections, path },
      ]}
      title={copy.elections}
      lede={
        fr
          ? "Cette livraison publie la date fédérale fixe du 15 octobre 2029 et l'élection générale provinciale de la Colombie-Britannique du 24 octobre 2026. Les autres dates provinciales et territoriales lues sont sur la page de chaque province ou territoire. Ce n'est pas un calendrier de toutes les élections futures."
          : "This release publishes the federal fixed date of 15 October 2029 and the British Columbia provincial general election of 24 October 2026. Other provincial and territorial dates that were read are on each province or territory page. It is not a calendar of every future election."
      }
      officeHref={office.url}
      officeLabel="Elections Canada"
      sources={sourcesById(["ec-briefing", "cea-56-1"])}
    >
      <ul className="space-y-3">
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={electionPath(lang)}>
            {fr ? "Élection générale fédérale, 15 octobre 2029" : "Federal general election, 15 October 2029"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            {fr ? "Article 56.1 de la Loi électorale du Canada. Pas encore convoquée dans les sources lues." : "Canada Elections Act, section 56.1. Not called in the sources that were read."}
          </p>
        </li>
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={bcElectionPath(lang)}>
            {fr
              ? "Élection générale provinciale de la Colombie-Britannique, 24 octobre 2026"
              : "British Columbia provincial general election, 24 October 2026"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            {fr
              ? "Jour du scrutin final le 24 octobre 2026. Le décompte final est prévu du 6 au 10 novembre 2026. Cette page ne publie aucun décompte."
              : "Final Voting Day was 24 October 2026. Final count is planned for 6–10 November 2026. This page prints no count."}
          </p>
        </li>
      </ul>
    </CanadaFrame>
  );
}
