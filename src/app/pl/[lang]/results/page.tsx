import Link from "next/link";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { PolandFrame } from "../../frame";
import { sourceById, sourcesById } from "../../../../../data/pl/sources";
import { ui } from "../../../../../data/pl/ui";
import { polandMetadata } from "../../../../../data/pl/seo";
import { polandHome } from "../../../../../data/pl/paths";
import type { Lang } from "../../../../../data/pl/types";

function asLang(value: string): Lang {
  if (value !== "pl" && value !== "en") notFound();
  return value;
}

export function generateStaticParams() {
  return [{ lang: "pl" }, { lang: "en" }];
}
export const dynamicParams = false;

const SEJM = [
  ["KOALICYJNY KOMITET WYBORCZY TRZECIA DROGA POLSKA 2050 SZYMONA HOŁOWNI - POLSKIE STRONNICTWO LUDOWE", "3 110 670", "14,40%", "65"],
  ["KOMITET WYBORCZY NOWA LEWICA", "1 859 018", "8,61%", "26"],
  ["KOMITET WYBORCZY PRAWO I SPRAWIEDLIWOŚĆ", "7 640 854", "35,38%", "194"],
  ["KOMITET WYBORCZY KONFEDERACJA WOLNOŚĆ I NIEPODLEGŁOŚĆ", "1 547 364", "7,16%", "18"],
  ["KOALICYJNY KOMITET WYBORCZY KOALICJA OBYWATELSKA PO .N IPL ZIELONI", "6 629 402", "30,70%", "157"],
  ["KOMITET WYBORCZY WYBORCÓW MNIEJSZOŚĆ NIEMIECKA", "25 778", "0,12%", "0"],
  ["KOMITET WYBORCZY BEZPARTYJNI SAMORZĄDOWCY", "401 054", "1,86%", "—"],
  ["KOMITET WYBORCZY POLSKA JEST JEDNA", "351 099", "1,63%", "—"],
  ["KOMITET WYBORCZY WYBORCÓW RUCHU DOBROBYTU I POKOJU", "24 850", "0,12%", "—"],
  ["KOMITET WYBORCZY NORMALNY KRAJ", "4 606", "0,02%", "—"],
  ["KOMITET WYBORCZY RUCH NAPRAWY POLSKI", "823", "0,004%", "—"],
  ["KOMITET WYBORCZY ANTYPARTIA", "1 156", "0,005%", "—"],
] as const;

const SENATE = [
  ["KOALICYJNY KOMITET WYBORCZY KOALICJA OBYWATELSKA PO .N IPL ZIELONI", "41"],
  ["KOMITET WYBORCZY PRAWO I SPRAWIEDLIWOŚĆ", "34"],
  ["KOALICYJNY KOMITET WYBORCZY TRZECIA DROGA POLSKA 2050 SZYMONA HOŁOWNI - POLSKIE STRONNICTWO LUDOWE", "11"],
  ["KOMITET WYBORCZY NOWA LEWICA", "9"],
  ["KOMITET WYBORCZY WYBORCÓW ANDRZEJ DZIUBA - PAKT SENACKI", "1"],
  ["KOMITET WYBORCZY WYBORCÓW WADIM TYSZKIEWICZ - PAKT SENACKI", "1"],
  ["KOMITET WYBORCZY WYBORCÓW ZYGMUNT FRANKIEWICZ - PAKT SENACKI", "1"],
  ["KOMITET WYBORCZY WYBORCÓW JÓZEFA ZAJĄCA", "1"],
  ["KOMITET WYBORCZY WYBORCÓW KRZYSZTOF KWIATKOWSKI - PAKT SENACKI", "1"],
] as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${polandHome(lang)}results/`;
  return polandMetadata({
    title: lang === "pl" ? "Wyniki" : "Results",
    description:
      lang === "pl"
        ? "Przedruk obwieszczeń PKW o Sejmie i Senacie z 2023 r. oraz o Prezydencie z 2025 r. Strona nie ogłasza zwycięzcy wyborów z 2027 r."
        : "Reprint of the 2023 Sejm and Senate announcements and the 2025 presidential announcement. This page does not call the 2027 election.",
    path,
    lang,
    alternatePath: `${polandHome(lang === "pl" ? "en" : "pl")}results/`,
  });
}

export default async function ResultsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = `${polandHome(lang)}results/`;
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
        { name: copy.results, path },
      ]}
      eyebrow={pl ? "Przedruk obwieszczeń. Bez ogłaszania wyniku 2027." : "Announcement reprint. No 2027 call."}
      title={pl ? "Wyniki" : "Results"}
      lede={
        pl
          ? "Liczby poniżej są przepisane z obwieszczeń Państwowej Komisji Wyborczej. Ta strona nie rozstrzyga, kto tworzy rząd, i nie ogłasza wyborów, które się nie odbyły."
          : "The figures below are copied from National Electoral Commission announcements. This page does not decide who forms a government, and it does not call an election that has not been held."
      }
      officeHref={pkw.url}
      officeLabel="Państwowa Komisja Wyborcza"
      sources={sourcesById(["pkw-sejm-2023", "pkw-senat-2023", "pkw-president-2025", "constitution", "kodeks"])}
    >
      <GapNote
        label={copy.gap}
        text={
          pl
            ? "17 października 2026 r. nie ma wyników głosowania z okna 14 października–12 listopada 2027 r. Nie ma czego przepisywać i nie ma czego ogłaszać."
            : "On 17 October 2026 there is no count from the 14 October–12 November 2027 window. There is nothing to copy and nothing to call."
        }
      />
      <section>
        <h2 className="font-serif text-2xl font-semibold">{pl ? "Sejm, 15 października 2023 r." : "Sejm, 15 October 2023"}</h2>
        <p className="mt-3 text-sm leading-6">
          {pl
            ? "Obwieszczenie z 17 października 2023 r. Uprawnieni: 29 532 595. Frekwencja: 74,38%. Głosy ważne: 21 596 674. Wybierano 460 posłów spośród 6 333 kandydatów na 303 listach 12 komitetów. Kreska w kolumnie mandatów oznacza listę, której obwieszczenie nie wymienia wśród list uczestniczących w podziale. Suma sześciu liczb mandatów w tym obwieszczeniu wynosi 460, w tym 0 dla listy mniejszości niemieckiej."
            : "Announcement of 17 October 2023. Entitled to vote: 29,532,595. Turnout: 74.38 percent. Valid votes: 21,596,674. The election was for 460 deputies, from 6,333 candidates on 303 lists of 12 committees. A dash in the seats column means the announcement does not list that committee among the lists taking part in the allocation. The six seat figures in the announcement add up to 460, including 0 for the German-minority list."}
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-line text-left">
                <th className="py-2 pr-3 font-semibold">{pl ? "Komitet, jak w obwieszczeniu" : "Committee, as printed"}</th>
                <th className="py-2 pr-3 font-semibold">{pl ? "Głosy ważne" : "Valid votes"}</th>
                <th className="py-2 pr-3 font-semibold">{pl ? "Udział" : "Share"}</th>
                <th className="py-2 font-semibold">{pl ? "Mandaty" : "Seats"}</th>
              </tr>
            </thead>
            <tbody>
              {SEJM.map((row) => (
                <tr key={row[0]} className="border-b border-line align-top">
                  <td className="py-2 pr-3">{row[0]}</td>
                  <td className="py-2 pr-3 tabular-nums">{row[1]}</td>
                  <td className="py-2 pr-3 tabular-nums">{row[2]}</td>
                  <td className="py-2 tabular-nums">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-semibold">{pl ? "Senat, 15 października 2023 r." : "Senate, 15 October 2023"}</h2>
        <p className="mt-3 text-sm leading-6">
          {pl
            ? "Obwieszczenie z 17 października 2023 r. Uprawnieni: 29 532 595. Frekwencja: 74,31%. Głosy ważne: 21 402 998. Wybierano 100 senatorów spośród 360 kandydatów zgłoszonych przez 49 komitetów. Wybrano 100. Suma poniższych liczb wynosi 100."
            : "Announcement of 17 October 2023. Entitled to vote: 29,532,595. Turnout: 74.31 percent. Valid votes: 21,402,998. The election was for 100 senators, from 360 candidates nominated by 49 committees. 100 were elected. The figures below add up to 100."}
        </p>
        <ul className="mt-3 space-y-2 text-sm leading-6">
          {SENATE.map((row) => (
            <li key={row[0]}>
              {row[0]}: {row[1]}
            </li>
          ))}
        </ul>
      </section>
      <section className="prose-legal">
        <h2>{pl ? "Prezydent, ponowne głosowanie 1 czerwca 2025 r." : "President, second ballot of 1 June 2025"}</h2>
        <p>
          {pl
            ? "Obwieszczenie z 2 czerwca 2025 r. dotyczy wyborów zarządzonych na 18 maja 2025 r. i ponownego głosowania z 1 czerwca 2025 r. Uprawnieni w chwili zakończenia głosowania: 29 363 722. Frekwencja: 71,63%. Głosy ważne oddane łącznie na obu kandydatów: 20 844 163. NAWROCKI Karol Tadeusz: 10 606 877 głosów, 50,89%. TRZASKOWSKI Rafał Kazimierz: 10 237 286 głosów, 49,11%. Komisja stwierdziła, powołując art. 127 ust. 6 Konstytucji i art. 292 § 4 Kodeksu wyborczego, że wybrany został NAWROCKI Karol Tadeusz. To jest przedruk tego zdania, nie osobne ogłoszenie tej strony."
            : "The announcement of 2 June 2025 covers the election ordered for 18 May 2025 and the second ballot of 1 June 2025. Entitled to vote when polling closed: 29,363,722. Turnout: 71.63 percent. Valid votes cast for the two candidates together: 20,844,163. Karol Tadeusz Nawrocki: 10,606,877 votes, 50.89 percent. Rafał Kazimierz Trzaskowski: 10,237,286 votes, 49.11 percent. The Commission stated, citing article 127(6) of the Constitution and article 292 § 4 of the electoral code, that Karol Tadeusz Nawrocki was elected. This is a reprint of that sentence, not a separate call by this site."}
        </p>
        <p>
          <Link className="text-navy underline" href={`${polandHome(lang)}elections/sejm-senat-2027/`}>
            {pl ? "Okno wyborów do Sejmu i Senatu" : "Sejm and Senate window"}
          </Link>
        </p>
      </section>
    </PolandFrame>
  );
}
