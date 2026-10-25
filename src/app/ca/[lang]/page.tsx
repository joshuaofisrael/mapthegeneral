import Link from "@/components/AnchorLink";
import { CountryGuide } from "@/components/CountryGuide";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { CanadaFrame } from "@/app/ca/_components/CanadaFrame";
import { formatNumber } from "@/data/ca/format";
import { asCaLang } from "@/data/ca/lang";
import { bcElectionPath, canadaHome, districtIndexPath, divisionIndexPath, electionPath, regionPath } from "@/data/ca/paths";
import {
  CANADA_POPULATION,
  COMMONS_SEATS,
  CURRENT_CANADA,
  HOUSE_ORDER,
  REGIONS,
  SENATE_SEATS,
  alphaRegions,
  regionBySlug,
  regionName,
} from "@/data/ca/places";
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
    title: lang === "fr" ? "Canada (français)" : "Canada",
    description:
      lang === "fr"
        ? "Élection générale fédérale fixée au 15 octobre 2029, Chambre des communes, Sénat, provinces et territoires. Information non officielle."
        : "Federal general election fixed for 15 October 2029, House of Commons, Senate, provinces, and territories. Unofficial information.",
    path: canadaHome(lang),
    lang,
  });
}

export default async function CanadaNationalPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asCaLang((await params).lang);
  const copy = ui(lang);
  const fr = lang === "fr";
  const path = canadaHome(lang);
  const electionsCanada = sourceById("ec-home");
  const rows = HOUSE_ORDER.map((slug) => {
    const region = regionBySlug(slug);
    if (!region) throw new Error(slug);
    return region;
  });

  return (
    <CanadaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.canada, path: "/ca/" },
        { name: "Canada", path },
      ]}
      eyebrow={fr ? "Élection générale fédérale · 15 octobre 2029" : "Federal general election · 15 October 2029"}
      title="Canada"
      lede={
        fr
          ? "La Loi électorale du Canada, article 56.1, fixe l’élection générale au troisième lundi d’octobre de la quatrième année civile qui suit le jour du scrutin de la dernière élection générale. Élections Canada écrit que la dernière a eu lieu le 28 avril 2025 et que la prochaine date fixe est le 15 octobre 2029. La même disposition préserve le pouvoir du gouverneur général de dissoudre le Parlement."
          : "Section 56.1 of the Canada Elections Act sets a general election on the third Monday of October in the fourth calendar year after polling day for the last general election. Elections Canada writes that the last general election took place on April 28, 2025, and that the next fixed date is October 15, 2029. The same section preserves the Governor General’s power to dissolve Parliament."
      }
      officeHref={electionsCanada.url}
      officeLabel="Elections Canada"
      sources={sourcesById([
        "cea-56-1",
        "ec-briefing",
        "ec-table7",
        "hoc-standings",
        "hoc-standings-fr",
        "statcan-daily",
        "statcan-17100009",
        "pm",
        "gg",
        "senate-about",
        "ec-parties",
        "ec-home",
      ])}
    >
      <CountryGuide code="ca" lang={lang} />
      <section className="prose-legal">
        <h2>{fr ? "Prochaine élection fédérale" : "Next federal election"}</h2>
        <p>
          {fr
            ? "Le texte anglais de l’article 56.1, lu le 17 octobre 2026, dit que rien dans cet article ne porte atteinte aux pouvoirs du gouverneur général, y compris le pouvoir de dissoudre le Parlement à sa discrétion. Sous réserve de cela, chaque élection générale doit avoir lieu le troisième lundi d’octobre de la quatrième année civile suivant le jour du scrutin de la dernière élection générale."
            : "The English text of section 56.1, read on 17 October 2026, says nothing in the section affects the powers of the Governor General, including the power to dissolve Parliament at the Governor General’s discretion. Subject to that, each general election must be held on the third Monday of October in the fourth calendar year following polling day for the last general election."}
        </p>
        <p>
          {fr
            ? "Le cahier d’information d’Élections Canada de mai 2025, lu le 17 octobre 2026, écrit : la dernière élection générale a eu lieu le 28 avril 2025, la prochaine date fixe est le 15 octobre 2029, et la Loi électorale du Canada n’empêche pas une élection générale à une autre date. Cette page ne dit pas que l’élection de 2029 est convoquée."
            : "Elections Canada’s May 2025 briefing book, read on 17 October 2026, says the last general election took place on April 28, 2025, the next fixed date is October 15, 2029, and the Canada Elections Act does not prevent a general election on another date. This page does not say the 2029 election has been called."}
        </p>
        <p>
          <Link className="text-navy underline" href={electionPath(lang)}>
            {fr ? "Page de cette date" : "Page for this date"}
          </Link>
        </p>
      </section>

      <section className="prose-legal">
        <h2>{fr ? "Élection provinciale de la Colombie-Britannique" : "British Columbia provincial election"}</h2>
        <p>
          {fr
            ? "La page d'Elections BC sur l'élection provinciale de 2026, lue le 25 octobre 2026, dit que le jour du scrutin final est le 24 octobre 2026. Le décompte final est prévu du 6 au 10 novembre 2026, et le Return Day est le 18 novembre 2026. Cette page ne publie aucun décompte."
            : "Elections BC's 2026 provincial election page, read on 25 October 2026, says Final Voting Day is 24 October 2026. Final count is planned for 6–10 November 2026, and Return Day is 18 November 2026. This page prints no count."}
        </p>
        <p>
          <Link className="text-navy underline" href={bcElectionPath(lang)}>
            {fr ? "Page de cette élection" : "Page for this election"}
          </Link>
        </p>
      </section>

      <section className="prose-legal">
        <h2>{fr ? "Population" : "Population"}</h2>
        <p>
          {fr
            ? `Le Quotidien de Statistique Canada, diffusé le 23 septembre 2026, imprime une estimation trimestrielle de ${formatNumber(CANADA_POPULATION, lang)} au 1er juillet 2026 pour le Canada (tableau 17-10-0009-01). Le texte dit que ces estimations du deuxième trimestre de 2026 sont provisoires et qu’il ne faut pas les confondre avec les chiffres du Recensement de 2026, qui seront diffusés le 10 février 2027. La somme des 13 estimations provinciales et territoriales imprimées dans ce communiqué est ${formatNumber(CANADA_POPULATION, lang)}.`
            : `Statistics Canada’s The Daily, released 23 September 2026, prints a quarterly population estimate of ${formatNumber(CANADA_POPULATION, lang)} for Canada on July 1, 2026 (table 17-10-0009-01). It says the second-quarter 2026 estimates are preliminary and are not to be confused with the 2026 Census counts, which will be released on February 10, 2027. The 13 provincial and territorial estimates printed in that release add up to ${formatNumber(CANADA_POPULATION, lang)}.`}
        </p>
      </section>

      <section className="prose-legal">
        <h2>{fr ? "Premier ministre et gouverneur général" : "Prime Minister and Governor General"}</h2>
        <p>
          {fr
            ? "La page du premier ministre du Canada, lue le 17 octobre 2026, a pour titre « Mark Carney - Prime Minister of Canada ». Le registre des partis d’Élections Canada, lu le même jour, nomme Mark Carney comme chef du Liberal Party of Canada."
            : "The Prime Minister of Canada page, read on 17 October 2026, is titled “Mark Carney - Prime Minister of Canada”. The Elections Canada party registry, read the same day, names Mark Carney as leader of the Liberal Party of Canada."}
        </p>
        <p>
          {fr
            ? "La page du gouverneur général, lue le 17 octobre 2026, nomme Son Excellence la très honorable Louise Arbour, assermentée le 8 juin 2026, 31e gouverneure générale du Canada. Elle dit que Sa Majesté le roi Charles III est roi du Canada et chef de l’État, et que le gouverneur général représente le Roi au Canada."
            : "The Governor General page, read on 17 October 2026, names Her Excellency the Right Honourable Louise Arbour, sworn in on June 8, 2026, the 31st governor general of Canada. It says His Majesty King Charles III is King of Canada and Head of State, and that the Governor General is the representative of The King in Canada."}
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.commons}</h2>
        <div className="prose-legal">
          <p>
            {fr
              ? `La page anglaise de la Chambre des communes, Position des partis, lue le 17 octobre 2026, imprime ${formatNumber(COMMONS_SEATS, lang)} sièges au total : Libéral ${CURRENT_CANADA.liberal}, Conservateur ${CURRENT_CANADA.conservative}, Bloc Québécois ${CURRENT_CANADA.bloc}, NPD ${CURRENT_CANADA.ndp}, Parti vert ${CURRENT_CANADA.green}, Vacant ${CURRENT_CANADA.vacant}. La page française imprime les mêmes totaux. Les deux pages disent que le NPD et le Parti vert comptent moins de 12 députés et ne sont pas des partis reconnus aux fins des délibérations parlementaires. Cette page ne déclare pas une majorité et n’explique pas les écarts avec le scrutin de 2025.`
              : `The English House of Commons party-standings page, read on 17 October 2026, prints ${formatNumber(COMMONS_SEATS, lang)} seats in total: Liberal ${CURRENT_CANADA.liberal}, Conservative ${CURRENT_CANADA.conservative}, Bloc Québécois ${CURRENT_CANADA.bloc}, NDP ${CURRENT_CANADA.ndp}, Green Party ${CURRENT_CANADA.green}, Vacant ${CURRENT_CANADA.vacant}. The French page prints the same totals. Both pages say the NDP and the Green Party have fewer than 12 members and are not recognized parties for parliamentary proceedings. This page does not declare a majority and does not explain differences from the 2025 count.`}
          </p>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="fact-table">
            <thead>
              <tr>
                <th scope="col">{fr ? "Nom sur la page de la Chambre" : "Name on the House page"}</th>
                <th scope="col">{fr ? "Libéral" : "Liberal"}</th>
                <th scope="col">{fr ? "Conservateur" : "Conservative"}</th>
                <th scope="col">Bloc Québécois</th>
                <th scope="col">{fr ? "NPD" : "NDP"}</th>
                <th scope="col">{fr ? "Parti vert" : "Green Party"}</th>
                <th scope="col">Vacant</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((region) => (
                <tr key={region.slug}>
                  <td>
                    <Link className="text-navy underline" href={regionPath(lang, region.slug)}>
                      {regionName(region, lang)}
                    </Link>
                  </td>
                  <td>{region.current.liberal}</td>
                  <td>{region.current.conservative}</td>
                  <td>{region.current.bloc}</td>
                  <td>{region.current.ndp}</td>
                  <td>{region.current.green}</td>
                  <td>{region.current.vacant}</td>
                  <td>{region.commonsSeats}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="prose-legal">
        <h2>{copy.senate}</h2>
        <p>
          {fr
            ? `La page « About the Senate » du gouvernement du Canada, lue le 17 octobre 2026, dit que la Constitution prévoit ${SENATE_SEATS} membres nommés : 6 pour l’Alberta, la Colombie-Britannique, le Manitoba et la Saskatchewan ; 24 pour l’Ontario ; 24 pour le Québec, répartis par division électorale ; 10 pour le Nouveau-Brunswick et la Nouvelle-Écosse ; 4 pour l’Île-du-Prince-Édouard ; 6 pour Terre-Neuve-et-Labrador ; 1 pour le Yukon, les Territoires du Nord-Ouest et le Nunavut. La somme de ces chiffres est ${SENATE_SEATS}. Le Sénat n’est pas élu lors de l’élection générale.`
            : `The Government of Canada page “About the Senate”, read on 17 October 2026, says the Constitution provides ${SENATE_SEATS} appointed members: 6 each for Alberta, British Columbia, Manitoba, and Saskatchewan; 24 for Ontario; 24 for Quebec, allocated by electoral division; 10 each for New Brunswick and Nova Scotia; 4 for Prince Edward Island; 6 for Newfoundland and Labrador; and 1 each for Yukon, the Northwest Territories, and Nunavut. Those figures add up to ${SENATE_SEATS}. The Senate is not elected at the general election.`}
        </p>
        <GapNote label={copy.gap} text={copy.senateGap} />
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">{fr ? "Candidatures et partis" : "Candidates and parties"}</h2>
        <GapNote label={copy.gap} text={copy.candidateGap} />
        <GapNote label={copy.gap} text={copy.municipalityGap} />
        <p className="text-sm">
          <Link className="text-navy underline" href={`${path}parties/`}>
            {copy.parties}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}results/`}>
            {copy.results}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}faq/`}>
            {copy.faq}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}sources/`}>
            {copy.sources}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={districtIndexPath(lang)}>
            {fr ? "Circonscriptions" : "Districts"}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={divisionIndexPath(lang)}>
            {fr ? "Divisions de recensement" : "Census divisions"}
          </Link>
        </p>
      </section>

      <LinkGrid
        heading={copy.regions}
        items={alphaRegions(lang).map((region) => ({
          href: regionPath(lang, region.slug),
          title: regionName(region, lang),
          detail: `${region.commonsSeats} ${fr ? "députés" : "members"} · ${formatNumber(region.population, lang)}`,
        }))}
      />
      <p className="text-sm text-ink-muted">
        {fr
          ? `${REGIONS.length} pages de provinces et de territoires. Les noms sont ceux de la page française de la Chambre. Les circonscriptions fédérales et les divisions de recensement sont liées depuis chaque province ou territoire.`
          : `${REGIONS.length} province and territory pages. The names are the ones on the English House page. Federal electoral districts and census divisions are linked from each province or territory.`}
      </p>
    </CanadaFrame>
  );
}
