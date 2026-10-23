import Link from "@/components/AnchorLink";
import { CanadaFrame } from "@/app/ca/_components/CanadaFrame";
import { asCaLang } from "@/data/ca/lang";
import { canadaHome, regionPath } from "@/data/ca/paths";
import {
  COMMONS_SEATS,
  CURRENT_CANADA,
  HOUSE_ORDER,
  RESULTS_2025_CANADA,
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
    title: lang === "fr" ? "Résultats au Canada" : "Canada results",
    description:
      lang === "fr"
        ? "Reproduction des résultats officiels du scrutin du 28 avril 2025 publiés par Élections Canada. Cette page ne déclare pas un vainqueur."
        : "Reprint of the official voting results of 28 April 2025 published by Elections Canada. This page does not declare a winner.",
    path: `${canadaHome(lang)}results/`,
    lang,
  });
}

export default async function ResultsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asCaLang((await params).lang);
  const copy = ui(lang);
  const fr = lang === "fr";
  const path = `${canadaHome(lang)}results/`;
  const office = sourceById("ec-home");
  const rows = HOUSE_ORDER.map((slug) => {
    const region = regionBySlug(slug);
    if (!region) throw new Error(slug);
    return region;
  });
  const canada = RESULTS_2025_CANADA;

  return (
    <CanadaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.canada, path: "/ca/" },
        { name: "Canada", path: canadaHome(lang) },
        { name: copy.results, path },
      ]}
      eyebrow={fr ? "Reproduction · sans proclamation" : "Reprint · no call"}
      title={fr ? "Résultats du 28 avril 2025" : "Results of 28 April 2025"}
      lede={
        fr
          ? "Cette page recopie des chiffres déjà publiés par Élections Canada. Elle n’attribue pas le gouvernement, ne déclare pas une majorité et ne chante pas l’élection."
          : "This page copies figures Elections Canada has already published. It does not assign the government, it does not declare a majority, and it does not call the election."
      }
      officeHref={office.url}
      officeLabel="Elections Canada"
      sources={sourcesById(["ec-table7", "ec-briefing", "hoc-standings", "hoc-standings-fr"])}
    >
      <section className="prose-legal">
        <h2>{fr ? "Ligne Canada du tableau 7" : "Canada row of table 7"}</h2>
        <p>
          {fr
            ? `Le tableau 7 des résultats officiels du scrutin de la 45e élection générale de 2025 imprime, pour le Canada : Liberal Party of Canada ${canada.liberal}, Conservative Party of Canada ${canada.conservative}, Bloc Québécois ${canada.bloc}, New Democratic Party ${canada.ndp}, Green Party of Canada ${canada.green}, Others 0, total ${COMMONS_SEATS}. Les pourcentages imprimés sur cette ligne sont 49,3, 42,0, 6,4, 2,0, 0,3, 0,0 et 100.`
            : `Table 7 of the official voting results of the forty-fifth general election of 2025 prints, for Canada: Liberal Party of Canada ${canada.liberal}, Conservative Party of Canada ${canada.conservative}, Bloc Québécois ${canada.bloc}, New Democratic Party ${canada.ndp}, Green Party of Canada ${canada.green}, Others 0, total ${COMMONS_SEATS}. The percentages printed on that row are 49.3, 42.0, 6.4, 2.0, 0.3, 0.0, and 100.`}
        </p>
        <p>
          {fr
            ? "Le tableau répartit aussi chaque parti en colonnes Male, Female, Another Gender et Unknown. Les chiffres provinciaux ci-dessous sont la somme de ces quatre colonnes. Leur total égale la ligne Canada imprimée. Cette page ne reproduit pas la répartition par genre."
            : "The table also splits each party into Male, Female, Another Gender, and Unknown columns. The provincial figures below are the sum of those four columns. Their total equals the printed Canada row. This page does not reprint the gender split."}
        </p>
      </section>
      <div className="overflow-x-auto">
        <table className="fact-table">
          <thead>
            <tr>
              <th scope="col">{fr ? "Province ou territoire" : "Province or territory"}</th>
              <th scope="col">Liberal Party of Canada</th>
              <th scope="col">Conservative Party of Canada</th>
              <th scope="col">Bloc Québécois</th>
              <th scope="col">New Democratic Party</th>
              <th scope="col">Green Party of Canada</th>
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
                <td>{region.results2025.liberal}</td>
                <td>{region.results2025.conservative}</td>
                <td>{region.results2025.bloc}</td>
                <td>{region.results2025.ndp}</td>
                <td>{region.results2025.green}</td>
                <td>{region.commonsSeats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className="prose-legal">
        <h2>{fr ? "Position actuelle de la Chambre" : "Current House standings"}</h2>
        <p>
          {fr
            ? `La page des positions de la Chambre, lue le 17 octobre 2026, imprime d’autres chiffres : Libéral ${CURRENT_CANADA.liberal}, Conservateur ${CURRENT_CANADA.conservative}, Bloc Québécois ${CURRENT_CANADA.bloc}, NPD ${CURRENT_CANADA.ndp}, Parti vert ${CURRENT_CANADA.green}, Vacant ${CURRENT_CANADA.vacant}. Cette page ne raconte pas ce qui a changé depuis le tableau 7.`
            : `The House standings page, read on 17 October 2026, prints different figures: Liberal ${CURRENT_CANADA.liberal}, Conservative ${CURRENT_CANADA.conservative}, Bloc Québécois ${CURRENT_CANADA.bloc}, NDP ${CURRENT_CANADA.ndp}, Green Party ${CURRENT_CANADA.green}, Vacant ${CURRENT_CANADA.vacant}. This page does not narrate what changed after table 7.`}
        </p>
        <p>
          <Link className="text-navy underline" href={canadaHome(lang)}>
            {fr ? "Page du Canada" : "Canada page"}
          </Link>
        </p>
      </section>
    </CanadaFrame>
  );
}
