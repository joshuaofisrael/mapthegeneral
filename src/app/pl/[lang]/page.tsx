import Link from "next/link";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { PolandFrame } from "../frame";
import { alphaVoivodeships, SEJM_CONSTITUENCY_TOTAL, SEJM_SEAT_TOTAL } from "../../../../data/pl/places";
import { sourceById, sourcesById } from "../../../../data/pl/sources";
import { ui } from "../../../../data/pl/ui";
import { polandMetadata } from "../../../../data/pl/seo";
import { polandHome, voivodeshipPath } from "../../../../data/pl/paths";
import type { Lang } from "../../../../data/pl/types";

function asLang(value: string): Lang {
  if (value !== "pl" && value !== "en") notFound();
  return value;
}

export function generateStaticParams() {
  return [{ lang: "pl" }, { lang: "en" }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  return polandMetadata({
    title: lang === "pl" ? "Polska" : "Poland",
    description:
      lang === "pl"
        ? "Wybory do Sejmu i Senatu w oknie od 14 października do 12 listopada 2027 r., urząd Prezydenta, Rada Ministrów i 16 województw. Informacja nieoficjalna."
        : "Sejm and Senate election window of 14 October to 12 November 2027, the presidency, the Council of Ministers, and 16 voivodeships. Unofficial information.",
    path: polandHome(lang),
    lang,
    alternatePath: polandHome(lang === "pl" ? "en" : "pl"),
  });
}

const SEJM_MANDATES: { name: string; seats: number }[] = [
  { name: "KOALICYJNY KOMITET WYBORCZY TRZECIA DROGA POLSKA 2050 SZYMONA HOŁOWNI - POLSKIE STRONNICTWO LUDOWE", seats: 65 },
  { name: "KOMITET WYBORCZY NOWA LEWICA", seats: 26 },
  { name: "KOMITET WYBORCZY PRAWO I SPRAWIEDLIWOŚĆ", seats: 194 },
  { name: "KOMITET WYBORCZY KONFEDERACJA WOLNOŚĆ I NIEPODLEGŁOŚĆ", seats: 18 },
  { name: "KOALICYJNY KOMITET WYBORCZY KOALICJA OBYWATELSKA PO .N IPL ZIELONI", seats: 157 },
  { name: "KOMITET WYBORCZY WYBORCÓW MNIEJSZOŚĆ NIEMIECKA", seats: 0 },
];

export default async function PolandNationalPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = polandHome(lang);
  const pl = lang === "pl";
  const pkw = sourceById("pkw");
  return (
    <PolandFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.poland, path: "/pl/" },
        { name: pl ? "Polska" : "Poland", path },
      ]}
      eyebrow={pl ? "Sejm i Senat · 14 października–12 listopada 2027" : "Sejm and Senate · 14 October–12 November 2027"}
      title={pl ? "Polska" : "Poland"}
      lede={
        pl
          ? "Kadencja Sejmu i Senatu rozpoczęła się 13 listopada 2023 r. Artykuł 98 ust. 2 Konstytucji zostawia dzień głosowania Prezydentowi, w oknie od 14 października do 12 listopada 2027 r."
          : "The Sejm and Senate term began on 13 November 2023. Article 98(2) of the Constitution leaves the polling day to the President, inside the window from 14 October to 12 November 2027."
      }
      officeHref={pkw.url}
      officeLabel="Państwowa Komisja Wyborcza"
      sources={sourcesById([
        "constitution",
        "kodeks",
        "sejm-first-sitting",
        "sejm-senior",
        "sejm-marshal",
        "sejm-marshal-half-year",
        "senate-marshal",
        "pkw-sejm-2023",
        "pkw-senat-2023",
        "pkw-president-2025",
        "president-oath",
        "zn-oath",
        "prime-minister",
        "mswia-jst",
        "teryt",
        "samorzad-woj",
        "pkw-rady-2024",
        "poczta",
      ])}
    >
      <section className="prose-legal">
        <h2>{pl ? "Następne wybory do Sejmu i Senatu" : "The next Sejm and Senate election"}</h2>
        <p>
          {pl
            ? "Artykuł 98 ust. 1 Konstytucji, w tekście na sejm.gov.pl odczytanym 17 października 2026 r., mówi, że Sejm i Senat są wybierane na czteroletnie kadencje. Kadencje rozpoczynają się z dniem zebrania się Sejmu na pierwsze posiedzenie i trwają do dnia poprzedzającego dzień zebrania się Sejmu następnej kadencji."
            : "Article 98(1) of the Constitution, in the text on sejm.gov.pl read on 17 October 2026, says the Sejm and the Senate are elected for four-year terms. The terms begin on the day the Sejm assembles for its first sitting and last until the day before the Sejm of the next term assembles."}
        </p>
        <p>
          {pl
            ? "Sprawozdanie Sejmu z 1. dnia 1. posiedzenia X kadencji zapisuje, że 13 listopada 2023 r. marszałek senior Marek Sawicki otworzył to posiedzenie. Komunikat z 8 listopada 2023 r. podaje, że Prezydent zwołał pierwsze posiedzenie na 13 listopada 2023 r., na godzinę 12:00. Cztery lata od 13 listopada 2023 r. upływają 13 listopada 2027 r."
            : "The Sejm record of day 1 of the first sitting of the 10th term records that on 13 November 2023 Senior Marshal Marek Sawicki opened that sitting. A notice of 8 November 2023 says the President called the first sitting for 13 November 2023 at 12:00. Four years from 13 November 2023 run to 13 November 2027."}
        </p>
        <p>
          {pl
            ? "Artykuł 98 ust. 2 mówi, że wybory zarządza Prezydent nie później niż na 90 dni przed upływem 4 lat od rozpoczęcia kadencji i wyznacza je na dzień wolny od pracy przypadający w ciągu 30 dni przed tym upływem. Trzydzieści dni przed 13 listopada 2027 r. to okres od 14 października 2027 r. do 12 listopada 2027 r. Artykuł 194 § 1 Kodeksu wyborczego, w tekście jednolitym ogłoszonym 1 września 2026 r. (Dz. U. poz. 1261), powtarza tę regułę dla Sejmu i wymaga postanowienia ogłoszonego w Dzienniku Ustaw. Artykuł 257 mówi, że zarządzenie wyborów do Sejmu jest równoznaczne z zarządzeniem wyborów do Senatu. Artykuł 4 mówi, że wybory odbywają się w dniu wolnym od pracy."
            : "Article 98(2) says the President orders the elections no later than 90 days before the expiry of four years from the start of the term and sets them for a non-working day within the 30 days before that expiry. The 30 days before 13 November 2027 are 14 October 2027 through 12 November 2027. Article 194 § 1 of the electoral code, in the consolidated text promulgated on 1 September 2026 (Dziennik Ustaw item 1261), repeats that rule for the Sejm and requires an order published in the Dziennik Ustaw. Article 257 says an order of Sejm elections is also an order of Senate elections. Article 4 says elections are held on a non-working day."}
        </p>
        <p>
          {pl
            ? "17 października 2026 r. nie odczytano postanowienia Prezydenta wyznaczającego dzień tych wyborów. Ta strona nie wybiera niedzieli wewnątrz okna."
            : "On 17 October 2026 no presidential order setting the day of these elections had been read. This page does not pick a Sunday inside the window."}
        </p>
        <p>
          <Link className="text-navy underline" href={`${path}elections/sejm-senat-2027/`}>
            {pl ? "Strona tych wyborów" : "Page for this election"}
          </Link>
        </p>
      </section>

      <section className="prose-legal">
        <h2>{copy.sejm}</h2>
        <p>
          {pl
            ? `Artykuł 96 ust. 1 Konstytucji mówi, że Sejm składa się z 460 posłów. Artykuł 193 § 1 Kodeksu wyborczego mówi, że 460 posłów wybiera się z list kandydatów w wielomandatowych okręgach. Załącznik nr 1 do tekstu jednolitego wymienia 41 okręgów. Suma liczb posłów z tego załącznika, zgrupowanych według województwa nazwanego w każdym okręgu, wynosi ${SEJM_SEAT_TOTAL}. Liczba okręgów w tym zgrupowaniu wynosi ${SEJM_CONSTITUENCY_TOTAL}.`
            : `Article 96(1) of the Constitution says the Sejm consists of 460 deputies. Article 193 § 1 of the electoral code says the 460 deputies are elected from candidate lists in multi-member constituencies. Annex 1 of the consolidated text lists 41 constituencies. The deputy figures in that annex, grouped by the voivodeship named in each constituency, add up to ${SEJM_SEAT_TOTAL}. The number of constituencies in that grouping is ${SEJM_CONSTITUENCY_TOTAL}.`}
        </p>
        <p>
          {pl
            ? "Artykuł 196 § 1 mówi, że w podziale mandatów uwzględnia się listy komitetów, które otrzymały co najmniej 5% ważnie oddanych głosów w skali kraju. Paragraf 2 podnosi ten próg do 8% dla koalicyjnych komitetów wyborczych. Obwieszczenie PKW z 17 października 2023 r. o wyborach z 15 października 2023 r. powołuje przy listach dopuszczonych do podziału także art. 197 § 1. Ta strona nie streszcza art. 197 poza tym odesłaniem."
            : "Article 196 § 1 says the seat allocation includes lists of committees that received at least 5 percent of valid votes cast nationally. Paragraph 2 raises that threshold to 8 percent for coalition committees. The National Electoral Commission’s announcement of 17 October 2023, for the election of 15 October 2023, also cites article 197 § 1 for the lists admitted to the allocation. This page does not summarize article 197 beyond that citation."}
        </p>
      </section>

      <section className="prose-legal">
        <h2>{copy.senate}</h2>
        <p>
          {pl
            ? "Artykuł 97 ust. 1 Konstytucji mówi, że Senat składa się ze 100 senatorów. Artykuł 256 Kodeksu wyborczego mówi, że do Senatu wybiera się 100 senatorów według zasady większości. Załącznik nr 2 określa jednomandatowe okręgi. Ta strona nie rozpisuje granic tych okręgów."
            : "Article 97(1) of the Constitution says the Senate consists of 100 senators. Article 256 of the electoral code says 100 senators are elected by majority. Annex 2 sets the single-member constituencies. This page does not reprint those boundaries."}
        </p>
      </section>

      <section className="prose-legal">
        <h2>{pl ? "Urzędy ogólnokrajowe odczytane 17 października 2026 r." : "National offices read on 17 October 2026"}</h2>
        <p>
          {pl
            ? "Obwieszczenie PKW z 2 czerwca 2025 r. stwierdza, że w ponownym głosowaniu 1 czerwca 2025 r. więcej głosów otrzymał i na Prezydenta został wybrany NAWROCKI Karol Tadeusz: 10 606 877 głosów, to jest 50,89% głosów ważnych. Rafał Kazimierz Trzaskowski otrzymał 10 237 286 głosów, to jest 49,11%. Suma tych dwóch liczb w obwieszczeniu to 20 844 163 głosów ważnych oddanych łącznie na obu kandydatów. Sprawozdanie Zgromadzenia Narodowego z 6 sierpnia 2025 r. zapisuje, że Marszałek Sejmu stwierdził złożenie przez Karola Tadeusza Nawrockiego przysięgi z art. 130 Konstytucji. Strona prezydent.pl z tą samą datą opisuje to zaprzysiężenie."
            : "The National Electoral Commission’s announcement of 2 June 2025 states that in the second ballot on 1 June 2025 the candidate with more votes, and the person elected President, was Karol Tadeusz Nawrocki: 10,606,877 votes, 50.89 percent of valid votes. Rafał Kazimierz Trzaskowski received 10,237,286 votes, 49.11 percent. The announcement’s combined valid-vote total for the two candidates is 20,844,163. The National Assembly record of 6 August 2025 records that the Marshal of the Sejm stated that Karol Tadeusz Nawrocki had taken the oath in article 130 of the Constitution. The prezydent.pl page of the same date describes that oath."}
        </p>
        <p>
          {pl
            ? "Artykuł 288 Kodeksu wyborczego mówi, że Prezydenta wybiera się na pięcioletnią kadencję i ponownie tylko raz. Artykuł 289 § 1 mówi, że wybory zarządza Marszałek Sejmu nie wcześniej niż na 7 miesięcy i nie później niż na 6 miesięcy przed upływem kadencji, na dzień wolny od pracy nie wcześniej niż na 100 dni i nie później niż na 75 dni przed tym upływem. Ta strona nie zamienia daty przysięgi na dzień głosowania w 2030 r."
            : "Article 288 of the electoral code says the President is elected for a five-year term and may be elected again only once. Article 289 § 1 says the Marshal of the Sejm orders the election no earlier than seven months and no later than six months before the term ends, for a non-working day no earlier than 100 days and no later than 75 days before that end. This page does not turn the oath date into a 2030 polling day."}
        </p>
        <p>
          {pl
            ? "Strona Kancelarii Prezesa Rady Ministrów „Skład Rady Ministrów”, odczytana 17 października 2026 r., wymienia jako pierwszą osobę: Donald Tusk, Prezes Rady Ministrów. To odczyt składu rządu, nie wynik wyborów."
            : "The Chancellery of the Prime Minister page “Skład Rady Ministrów”, read on 17 October 2026, lists first: Donald Tusk, Prezes Rady Ministrów. That is a reading of the government’s composition, not an election result."}
        </p>
        <p>
          {pl
            ? "Komunikat Sejmu „Sejm wybrał Włodzimierza Czarzastego na funkcję Marszałka Sejmu RP” podaje, że za kandydaturą głosowało 236 posłów, przeciw było 209, a dwie osoby wstrzymały się od głosu. Komunikat z 18 maja 2026 r. mówi, że Izba powierzyła mu tę funkcję 18 listopada 2025 r. Strona aktualności Senatu „Marszałek i Prezydium”, odczytana 17 października 2026 r., w wiadomości z 15 października 2026 r. nazywa Małgorzatę Kidawę-Błońską Marszałkiem Senatu. Ta strona nie podaje dnia jej wyboru."
            : "The Sejm notice “Sejm wybrał Włodzimierza Czarzastego na funkcję Marszałka Sejmu RP” says 236 deputies voted for the candidacy, 209 voted against, and two abstained. The notice of 18 May 2026 says the chamber gave him the office on 18 November 2025. The Senate news page “Marszałek i Prezydium”, read on 17 October 2026, in an item of 15 October 2026 names Małgorzata Kidawa-Błońska as Marshal of the Senate. This page does not give the day she was elected."}
        </p>
        <GapNote label={copy.gap} text={copy.candidateGap} />
      </section>

      <section className="prose-legal">
        <h2>{pl ? "Wynik z 15 października 2023 r. przepisany z obwieszczenia" : "The 15 October 2023 count, copied from the announcement"}</h2>
        <p>
          {pl
            ? "Obwieszczenie PKW o Sejmie podaje 29 532 595 uprawnionych, frekwencję 74,38% i 21 596 674 głosów ważnych. W podziale mandatów listy uzyskały liczby poniżej. Nazwy komitetów są przepisane tak, jak je wydrukowano, łącznie z kropkami wewnątrz nazwy koalicji. Suma mandatów wynosi 460. Ta strona nie ogłasza większości ani rządu."
            : "The Commission’s Sejm announcement gives 29,532,595 people entitled to vote, turnout of 74.38 percent, and 21,596,674 valid votes. In the seat allocation the lists received the numbers below. Committee names are copied as printed, including the dots inside the coalition’s name. The seats add up to 460. This page does not declare a majority or a government."}
        </p>
        <ul>
          {SEJM_MANDATES.map((row) => (
            <li key={row.name}>
              {row.name}: {row.seats}
            </li>
          ))}
        </ul>
        <p>
          {pl
            ? "Obwieszczenie o Senacie z tego samego dnia podaje frekwencję 74,31%, 21 402 998 głosów ważnych i 100 wybranych senatorów. Rozpisanie tych mandatów według komitetów jest na stronie wyników."
            : "The Senate announcement of the same day gives turnout of 74.31 percent, 21,402,998 valid votes, and 100 senators elected. The committee breakdown of those seats is on the results page."}
        </p>
        <p>
          <Link className="text-navy underline" href={`${path}results/`}>
            {copy.results}
          </Link>
        </p>
      </section>

      <section className="prose-legal">
        <h2>{pl ? "Samorząd" : "Local and regional government"}</h2>
        <p>
          {pl
            ? "Artykuł 163 Konstytucji mówi, że samorząd terytorialny wykonuje zadania publiczne nie zastrzeżone dla innych organów. Artykuł 164 ust. 1 mówi, że podstawową jednostką jest gmina. Artykuł 152 ust. 1 mówi, że przedstawicielem Rady Ministrów w województwie jest wojewoda. Strona MSWiA „Baza JST”, odczytana 17 października 2026 r., podaje stan na 1 stycznia 2026 r.: 16 województw, 314 powiatów i 2 479 gmin (302 miejskie, w tym 66 miast na prawach powiatu, 724 miejsko-wiejskie i 1 453 wiejskie). Rejestr TERYT w nocie odczytanej tego samego dnia liczy od 1 stycznia 2026 r. 16 województw, 380 powiatów i 2 479 gmin. Liczba 380 obejmuje miasta na prawach powiatu, które MSWiA liczy osobno od 314 powiatów."
            : "Article 163 of the Constitution says territorial self-government performs public duties not reserved to other authorities. Article 164(1) says the basic unit is the gmina. Article 152(1) says the wojewoda is the representative of the Council of Ministers in the voivodeship. The Interior Ministry page “Baza JST”, read on 17 October 2026, gives the position at 1 January 2026: 16 voivodeships, 314 powiats and 2,479 gminas (302 urban, including 66 cities with powiat status, 724 urban-rural and 1,453 rural). The TERYT register’s note read the same day counts, from 1 January 2026, 16 voivodeships, 380 powiats and 2,479 gminas. The figure 380 includes the cities with powiat status, which the ministry counts apart from the 314 powiats."}
        </p>
        <p>
          {pl
            ? "Obwieszczenie PKW z 9 kwietnia 2024 r. podaje zbiorcze wyniki wyborów do rad przeprowadzonych 7 kwietnia 2024 r.: 16 sejmików województw i 552 radnych tych sejmików. Ustawa o samorządzie województwa, w tekście jednolitym Dz. U. 2026 poz. 720, w art. 16 ust. 2 mówi, że kadencja sejmiku trwa 5 lat, licząc od dnia wyborów. Ta strona nie wyznacza dnia następnych wyborów samorządowych."
            : "The Commission’s announcement of 9 April 2024 gives the aggregate results of the council elections held on 7 April 2024: 16 voivodeship sejmiki and 552 councillors of those sejmiki. The voivodeship self-government act, consolidated text Dziennik Ustaw 2026 item 720, says in article 16(2) that a sejmik’s term lasts five years, counting from election day. This page does not set the day of the next local elections."}
        </p>
        <GapNote label={copy.gap} text={copy.localGap} />
        <GapNote label={copy.gap} text={copy.populationGap} />
        <GapNote label={copy.gap} text={copy.postcodeGap} />
      </section>

      <LinkGrid
        heading={copy.voivodeships}
        items={alphaVoivodeships().map((item) => ({
          href: voivodeshipPath(lang, item.slug),
          title: item.name,
          detail: pl
            ? `${item.sejmSeats} posłów · ${item.sejmConstituencies} ${item.sejmConstituencies === 1 ? "okręg" : "okręgi"}`
            : `${item.sejmSeats} deputies · ${item.sejmConstituencies} ${item.sejmConstituencies === 1 ? "constituency" : "constituencies"}`,
        }))}
      />
    </PolandFrame>
  );
}
