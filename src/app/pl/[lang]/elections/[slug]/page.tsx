import Link from "next/link";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { PolandFrame } from "../../../frame";
import { SEJM_CONSTITUENCY_TOTAL, SEJM_SEAT_TOTAL } from "../../../../../../data/pl/places";
import { sourceById, sourcesById } from "../../../../../../data/pl/sources";
import { ui } from "../../../../../../data/pl/ui";
import { polandMetadata } from "../../../../../../data/pl/seo";
import { senatOkregPath } from "../../../../../../data/pl/level2";
import { polandHome } from "../../../../../../data/pl/paths";
import type { Lang } from "../../../../../../data/pl/types";

function asLang(value: string): Lang {
  if (value !== "pl" && value !== "en") notFound();
  return value;
}

export function generateStaticParams() {
  return ["pl", "en"].map((lang) => ({ lang, slug: "sejm-senat-2027" }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = asLang(raw);
  if (slug !== "sejm-senat-2027") return {};
  const path = `${polandHome(lang)}elections/sejm-senat-2027/`;
  return polandMetadata({
    title: lang === "pl" ? "Wybory do Sejmu i Senatu, 2027" : "Sejm and Senate election, 2027",
    description:
      lang === "pl"
        ? "Okno wyborów do Sejmu i Senatu od 14 października do 12 listopada 2027 r. Prezydent wyznacza dzień wolny od pracy. Informacja nieoficjalna."
        : "Sejm and Senate election window from 14 October to 12 November 2027. The President sets a non-working day. Unofficial information.",
    path,
    lang,
    alternatePath: `${polandHome(lang === "pl" ? "en" : "pl")}elections/sejm-senat-2027/`,
  });
}

export default async function ElectionPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = asLang(raw);
  if (slug !== "sejm-senat-2027") notFound();
  const copy = ui(lang);
  const path = `${polandHome(lang)}elections/sejm-senat-2027/`;
  const pl = lang === "pl";
  const pkw = sourceById("pkw");
  return (
    <PolandFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.poland, path: "/pl/" },
        { name: pl ? "Polska" : "Poland", path: polandHome(lang) },
        { name: copy.elections, path: `${polandHome(lang)}elections/` },
        { name: pl ? "Sejm i Senat 2027" : "Sejm and Senate 2027", path },
      ]}
      eyebrow={pl ? "Dzień wyznacza Prezydent" : "The President sets the day"}
      title={pl ? "Wybory do Sejmu i Senatu" : "Election of the Sejm and the Senate"}
      lede={
        pl
          ? "Okno kalendarzowe: od 14 października 2027 r. do 12 listopada 2027 r. Głosowanie przypada na dzień wolny od pracy wewnątrz tego okna."
          : "Calendar window: 14 October 2027 through 12 November 2027. Polling falls on a non-working day inside that window."
      }
      officeHref={pkw.url}
      officeLabel="Państwowa Komisja Wyborcza"
      sources={sourcesById(["constitution", "kodeks", "sejm-first-sitting", "sejm-senior", "pkw-sejm-2023", "pkw-senat-20-2026"])}
    >
      <section className="prose-legal">
        <h2>{pl ? "Skąd jest to okno" : "Where the window comes from"}</h2>
        <p>
          {pl
            ? "Pierwsze posiedzenie Sejmu X kadencji otwarto 13 listopada 2023 r. Artykuł 98 ust. 1 Konstytucji liczy kadencję od tego dnia. Cztery lata później jest 13 listopada 2027 r. Ustęp 2 każe wyznaczyć wybory na dzień wolny od pracy w ciągu 30 dni przed upływem tych czterech lat, czyli od 14 października 2027 r. do 12 listopada 2027 r. włącznie."
            : "The first sitting of the 10th-term Sejm was opened on 13 November 2023. Article 98(1) of the Constitution counts the term from that day. Four years later is 13 November 2027. Paragraph 2 requires the election to be set for a non-working day within the 30 days before those four years expire, that is from 14 October 2027 through 12 November 2027 inclusive."}
        </p>
        <p>
          {pl
            ? "Artykuł 194 § 1 Kodeksu wyborczego (Dz. U. 2026 poz. 1261) mówi to samo o Sejmie i dodaje, że postanowienie podaje się w Biuletynie Informacji Publicznej i ogłasza w Dzienniku Ustaw najpóźniej piątego dnia od zarządzenia. Artykuł 257 rozciąga zarządzenie na Senat. 17 października 2026 r. takiego postanowienia nie odczytano. Termin z art. 98 ust. 2, „nie później niż na 90 dni” przed 13 listopada 2027 r., jeszcze wtedy nie zapadał."
            : "Article 194 § 1 of the electoral code (Dziennik Ustaw 2026 item 1261) says the same for the Sejm and adds that the order is posted in the Public Information Bulletin and published in the Dziennik Ustaw no later than the fifth day after it is made. Article 257 extends the order to the Senate. No such order was read on 17 October 2026. The article 98(2) deadline, “no later than 90 days” before 13 November 2027, had not arrived then."}
        </p>
      </section>
      <section className="prose-legal">
        <h2>{pl ? "Co się wybiera" : "What is elected"}</h2>
        <p>
          {pl
            ? `Sejm: 460 posłów w ${SEJM_CONSTITUENCY_TOTAL} wielomandatowych okręgach z załącznika nr 1. Suma posłów w województwach na tej stronie wynosi ${SEJM_SEAT_TOTAL}. Senat: 100 senatorów według zasady większości, w okręgach z załącznika nr 2. Strony okręgów są podlinkowane z województw.`
            : `Sejm: 460 deputies in ${SEJM_CONSTITUENCY_TOTAL} multi-member constituencies in annex 1. The voivodeship deputy figures on this site add up to ${SEJM_SEAT_TOTAL}. Senate: 100 senators by majority, in the constituencies of annex 2. Constituency pages are linked from the voivodeships.`}
        </p>
        <p>
          {pl
            ? "Do podziału mandatów w Sejmie art. 196 wpuszcza listy z co najmniej 5% ważnych głosów w kraju, a listy koalicyjne z co najmniej 8%. Obwieszczenie z 2023 r. przy dopuszczeniu list powołuje także art. 197 § 1. Ta strona nie podaje przykładu liczbowego."
            : "For the Sejm seat allocation, article 196 admits lists with at least 5 percent of valid votes nationally, and coalition lists with at least 8 percent. The 2023 announcement also cites article 197 § 1 when it admits lists. This page does not print a worked example."}
        </p>
        <p>
          {pl
            ? "Osobno serwis PKW odczytany 18 października 2026 r. podaje wybory uzupełniające do Senatu w okręgu nr 20 na 22 listopada 2026 r. To nie jest dzień z okna 2027 r. Ta strona nie podaje sondaży ani prognoz."
            : "Separately, the Commission service read on 18 October 2026 gives a Senate by-election in constituency 20 on 22 November 2026. That is not a day inside the 2027 window. This page prints no polls or projections."}
        </p>
        <p>
          <Link className="text-navy underline" href={senatOkregPath(lang, 20)}>
            {pl ? "Okręg senacki nr 20" : "Senate constituency 20"}
          </Link>
        </p>
        <GapNote label={copy.gap} text={copy.candidateGap} />
        <p>
          <Link className="text-navy underline" href={`${polandHome(lang)}results/`}>
            {pl ? "Strona wyników. Wyborów z 2027 r. jeszcze nie ma w żadnym obwieszczeniu." : "Results page. There is no 2027 count in any announcement read for this release."}
          </Link>
        </p>
      </section>
    </PolandFrame>
  );
}
