import { GapNote } from "@/components/GapNote";
import { TurkeyFrame } from "@/app/tr/turkey-frame";
import { formatNumber } from "@/data/tr/format";
import { asTrLang } from "@/data/tr/lang";
import { otherLang, turkeyHome, turkeyMetadata } from "@/data/tr/metadata";
import { PARLIAMENT_2023_SEATS } from "@/data/tr/records";
import { sourceById, sourcesById } from "@/data/tr/sources";
import { ui } from "@/data/tr/ui";

const ysk = sourceById("ysk-home");

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asTrLang((await params).lang);
  const path = `${turkeyHome(lang)}parties/`;
  return turkeyMetadata({
    title: lang === "tr" ? "Partiler" : "Parties",
    description:
      lang === "tr"
        ? "2028 için ilan edilmiş bir aday listesi yok. 2023/1255 sayılı karardaki sandalye satırı aktarılır."
        : "There is no proclaimed candidate list for 2028. The seat line from decision 2023/1255 is copied.",
    path,
    lang,
    alternatePath: `${turkeyHome(otherLang(lang))}parties/`,
  });
}

export default async function PartiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asTrLang((await params).lang);
  const copy = ui(lang);
  const path = `${turkeyHome(lang)}parties/`;
  const tr = lang === "tr";
  return (
    <TurkeyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.turkey, path: "/tr/" },
        { name: tr ? "Türkiye" : "Turkey", path: turkeyHome(lang) },
        { name: copy.parties, path },
      ]}
      title={tr ? "Siyasi partiler" : "Political parties"}
      lede={
        tr
          ? "2028 seçimi için bu sayfada parti listesi yoktur. Aşağıdaki adlar, 14 Mayıs 2023 milletvekili seçiminin ilanındaki sandalye satırıdır."
          : "This page has no party list for the 2028 election. The names below are the seat line in the proclamation of the 14 May 2023 parliamentary election."
      }
      officeHref={ysk.url}
      officeLabel="Yüksek Seçim Kurulu"
      sources={sourcesById(["ysk-2023-1255", "kanun-2839", "ysk-home"])}
    >
      <GapNote label={copy.gap} text={copy.candidateGap} />
      <div className="prose-legal">
        <p>
          {tr
            ? "Siyasi partilerin sicili bu sayfada yoktur. 2839 sayılı Kanun, adaylığı ve barajı düzenler. Bu sayfa başvuru şartlarını özetlemez."
            : "The register of political parties is not on this page. Law 2839 regulates candidacy and the threshold. This page does not summarise the filing requirements."}
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="fact-table">
          <thead>
            <tr>
              <th scope="col">{tr ? "2023/1255 sayılı kararda" : "In decision 2023/1255"}</th>
              <th scope="col">{tr ? "Milletvekili" : "Deputies"}</th>
            </tr>
          </thead>
          <tbody>
            {PARLIAMENT_2023_SEATS.map((row) => (
              <tr key={row.name}>
                <td>{row.name}</td>
                <td>{formatNumber(row.seats, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TurkeyFrame>
  );
}
