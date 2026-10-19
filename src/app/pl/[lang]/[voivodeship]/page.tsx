import Link from "next/link";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { PolandFrame } from "../../frame";
import {
  powiatHeading,
  powiatIndexPath,
  powiatPath,
  powiatsIn,
  sejmIndexPath,
  sejmIn,
  sejmOkregPath,
  senatIndexPath,
  senatIn,
  senatOkregPath,
  TERC_STATS,
} from "../../../../../data/pl/level2";
import { alphaNeighbors, alphaVoivodeships, voivodeshipBySlug } from "../../../../../data/pl/places";
import { sourceById, sourcesById } from "../../../../../data/pl/sources";
import { ui } from "../../../../../data/pl/ui";
import { polandMetadata } from "../../../../../data/pl/seo";
import { gminaIndexPath } from "../../../../../data/pl/gminy";
import { polandHome, voivodeshipPath } from "../../../../../data/pl/paths";
import type { Lang } from "../../../../../data/pl/types";

function asLang(value: string): Lang {
  if (value !== "pl" && value !== "en") notFound();
  return value;
}

export function generateStaticParams() {
  return ["pl", "en"].flatMap((lang) => alphaVoivodeships().map((item) => ({ lang, voivodeship: item.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; voivodeship: string }> }) {
  const { lang: raw, voivodeship: slug } = await params;
  const lang = asLang(raw);
  const item = voivodeshipBySlug(slug);
  if (!item) return {};
  const path = voivodeshipPath(lang, slug);
  return polandMetadata({
    title: item.name,
    description:
      lang === "pl"
        ? `${item.name}: sejmik, wojewoda, posłowie z załącznika nr 1 do Kodeksu wyborczego. Informacja nieoficjalna.`
        : `${item.name}: sejmik, wojewoda, and deputies from annex 1 of the electoral code. Unofficial information.`,
    path,
    lang,
    alternatePath: voivodeshipPath(lang === "pl" ? "en" : "pl", slug),
  });
}

export default async function VoivodeshipPage({ params }: { params: Promise<{ lang: string; voivodeship: string }> }) {
  const { lang: raw, voivodeship: slug } = await params;
  const lang = asLang(raw);
  const item = voivodeshipBySlug(slug);
  if (!item) notFound();
  const copy = ui(lang);
  const pl = lang === "pl";
  const path = voivodeshipPath(lang, slug);
  const neighbors = alphaNeighbors(slug);
  const pkw = sourceById("pkw");
  const stat = TERC_STATS[slug];
  const powiats = powiatsIn(slug);
  const sejmHere = sejmIn(slug);
  const senatHere = senatIn(slug);
  if (!stat) notFound();
  const seatNoun = item.sejmConstituencies === 1 ? (pl ? "okręg" : "constituency") : pl ? "okręgi" : "constituencies";
  return (
    <PolandFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.poland, path: "/pl/" },
        { name: pl ? "Polska" : "Poland", path: polandHome(lang) },
        { name: item.name, path },
      ]}
      eyebrow={pl ? "Województwo" : "Voivodeship"}
      title={item.name}
      lede={
        pl
          ? "Samorząd województwa ma sejmik i zarząd. Wojewoda jest przedstawicielem Rady Ministrów. To są różne urzędy."
          : "The voivodeship’s self-government has a sejmik and an executive board. The wojewoda represents the Council of Ministers. They are different offices."
      }
      officeHref={pkw.url}
      officeLabel="Państwowa Komisja Wyborcza"
      sources={sourcesById(["constitution", "kodeks", "samorzad-woj", "pkw-rady-2024", "mswia-jst", "teryt", "teryt-terc"])}
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.deputies}</dt>
          <dd className="mt-1 font-serif text-2xl">{item.sejmSeats}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {pl
              ? "Suma liczb z załącznika nr 1 do Kodeksu wyborczego (Dz. U. 2026 poz. 1261) dla okręgów, które nazywają to województwo."
              : "Sum of the figures in annex 1 of the electoral code (Dziennik Ustaw 2026 item 1261) for constituencies that name this voivodeship."}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.constituencies}</dt>
          <dd className="mt-1 font-serif text-2xl">
            {item.sejmConstituencies} {seatNoun}
          </dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {pl
              ? "Granic okręgów ta strona nie rozpisuje."
              : "This page does not reprint constituency boundaries."}
          </dd>
        </div>
      </dl>

      <section className="prose-legal">
        <h2>{copy.government}</h2>
        <p>
          {pl
            ? "Artykuł 15 ustawy o samorządzie województwa, w tekście jednolitym Dz. U. 2026 poz. 720, mówi, że organami samorządu województwa są sejmik województwa i zarząd województwa. Artykuł 16 ust. 1 nazywa sejmik organem stanowiącym i kontrolnym. Artykuł 31 ust. 1 i 2 nazywa zarząd organem wykonawczym i mówi, że w pięcioosobowym zarządzie marszałek województwa jest przewodniczącym. Artykuł 32 ust. 1 i 2 mówi, że sejmik wybiera zarząd, w tym marszałka, i że marszałka wybiera bezwzględną większością głosów ustawowego składu, w głosowaniu tajnym."
            : "Article 15 of the voivodeship self-government act, consolidated text Dziennik Ustaw 2026 item 720, says the organs of voivodeship self-government are the sejmik województwa and the zarząd województwa. Article 16(1) calls the sejmik the constitutive and supervisory body. Article 31(1) and (2) calls the zarząd the executive and says that, on a five-member board, the marszałek województwa is the chair. Article 32(1) and (2) says the sejmik elects the board, including the marshal, and elects the marshal by an absolute majority of the statutory membership, in a secret ballot."}
        </p>
        <p>
          {pl
            ? "Artykuł 152 ust. 1 Konstytucji mówi, że przedstawicielem Rady Ministrów w województwie jest wojewoda. Wojewoda nie jest marszałkiem i nie jest wybierany w wyborach do sejmiku."
            : "Article 152(1) of the Constitution says the wojewoda is the representative of the Council of Ministers in the voivodeship. The wojewoda is not the marshal and is not chosen in the sejmik election."}
        </p>
        <p>
          {pl
            ? "Odpowiedniki ogólnokrajowe, w tym samym tekście Konstytucji: władzę ustawodawczą sprawują Sejm i Senat (art. 95 ust. 1); Sejm liczy 460 posłów (art. 96 ust. 1); Senat liczy 100 senatorów (art. 97 ust. 1). Prezes Rady Ministrów jest wymieniony na stronie krajowej według składu opublikowanego przez Kancelarię Prezesa Rady Ministrów. Ta strona nie ustawia sejmiku, marszałka i wojewody w jednym szeregu."
            : "National counterparts, in the same constitutional text: legislative power is exercised by the Sejm and the Senate (article 95(1)); the Sejm has 460 deputies (article 96(1)); the Senate has 100 senators (article 97(1)). The Prime Minister is named on the national page from the composition published by the Chancellery of the Prime Minister. This page does not line the sejmik, the marshal and the wojewoda up as one office."}
        </p>
        <GapNote label={copy.gap} text={copy.officeholderGap} />
      </section>

      <section className="prose-legal">
        <h2>{copy.lastElection}</h2>
        <p>
          {pl
            ? "Obwieszczenie PKW z 9 kwietnia 2024 r. podaje zbiorcze wyniki wyborów do rad z 7 kwietnia 2024 r., w tym do 16 sejmików, i 552 wybranych radnych sejmików w skali kraju. Nie rozbija tej liczby na to województwo w akapicie odczytanym na tę stronę. Artykuł 16 ust. 3 ustawy określa liczbę radnych wzorem od liczby mieszkańców. Tej liczby ta strona nie podstawia."
            : "The Commission’s announcement of 9 April 2024 gives the aggregate results of the council elections of 7 April 2024, including elections to 16 sejmiki, and 552 sejmik councillors elected nationally. The passage read for this page does not split that figure for this voivodeship. Article 16(3) of the act sets the number of councillors from the number of inhabitants. This page does not plug a population figure into that rule."}
        </p>
        <GapNote label={copy.gap} text={copy.populationGap} />
        <h2>{copy.nextElection}</h2>
        <p>
          {pl
            ? "Artykuł 16 ust. 2 mówi, że kadencja sejmiku trwa 5 lat, licząc od dnia wyborów. Artykuł 371 § 1 Kodeksu wyborczego mówi, że wybory do rad zarządza się nie wcześniej niż na 4 miesiące i nie później niż na 3 miesiące przed upływem kadencji, a datę wyznacza się na dzień wolny od pracy nie wcześniej niż na 30 dni i nie później niż na 7 dni przed tym upływem. Ostatnie wybory w cytowanym obwieszczeniu odbyły się 7 kwietnia 2024 r."
            : "Article 16(2) says a sejmik’s term lasts five years, counting from election day. Article 371 § 1 of the electoral code says elections to councils are ordered no earlier than four months and no later than three months before the term ends, and the date is a non-working day no earlier than 30 days and no later than seven days before that end. The last election in the announcement cited here was held on 7 April 2024."}
        </p>
        <GapNote label={copy.gap} text={copy.nextLocalGap} />
        <h2>{pl ? "Powiaty i gminy" : "Powiats and gminas"}</h2>
        <p>
          {pl
            ? `Plik TERC_Urzedowy_2026-10-18, katalog z datą 2026-01-01, odczytany 18 października 2026 r., ma w tym województwie ${stat.land} wierszy z NAZWA_DOD „powiat” i ${stat.city} wierszy miasta na prawach powiatu. Wierszy, których NAZWA_DOD zaczyna się od „gmina”, jest ${stat.gmina}. Artykuł 164 ust. 1 Konstytucji nazywa gminę podstawową jednostką samorządu.`
            : `The file TERC_Urzedowy_2026-10-18, catalog date 2026-01-01, read on 18 October 2026, has ${stat.land} rows in this voivodeship with NAZWA_DOD “powiat” and ${stat.city} rows for a city with powiat status. Rows whose NAZWA_DOD starts with “gmina” number ${stat.gmina}. Article 164(1) of the Constitution calls the gmina the basic unit of self-government.`}
        </p>
        <p>
          {copy.gminaGap}{" "}
          <Link className="text-navy underline" href={gminaIndexPath(lang)}>
            {pl ? "Indeks gmin" : "Gmina index"}
          </Link>
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{pl ? "Powiaty w tym województwie" : "Powiats in this voivodeship"}</h2>
        <ul className="mt-3 columns-1 gap-x-6 text-sm sm:columns-2">
          {powiats.map((powiat) => (
            <li key={powiat.code} className="mb-1">
              <a className="text-navy underline" href={powiatPath(lang, slug, powiat.slug)}>
                {powiatHeading(powiat)}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm">
          <a className="text-navy underline" href={powiatIndexPath(lang)}>
            {pl ? "Indeks powiatów" : "Powiat index"}
          </a>
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-2xl font-semibold">{pl ? "Okręgi do Sejmu" : "Sejm constituencies"}</h2>
        <ul className="mt-3 space-y-1 text-sm">
          {sejmHere.map((okreg) => (
            <li key={okreg.num}>
              <a className="text-navy underline" href={sejmOkregPath(lang, okreg.num)}>
                {pl ? `Okręg nr ${okreg.num}` : `Constituency ${okreg.num}`}
              </a>
              {` — ${okreg.districtName}, ${okreg.seats}`}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm">
          <a className="text-navy underline" href={sejmIndexPath(lang)}>
            {pl ? "Indeks okręgów do Sejmu" : "Sejm constituency index"}
          </a>
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-2xl font-semibold">{pl ? "Okręgi do Senatu" : "Senate constituencies"}</h2>
        <ul className="mt-3 space-y-1 text-sm">
          {senatHere.map((okreg) => (
            <li key={okreg.num}>
              <a className="text-navy underline" href={senatOkregPath(lang, okreg.num)}>
                {pl ? `Okręg nr ${okreg.num}` : `Constituency ${okreg.num}`}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm">
          <a className="text-navy underline" href={senatIndexPath(lang)}>
            {pl ? "Indeks okręgów do Senatu" : "Senate constituency index"}
          </a>
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.alphaNearby}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {neighbors.prev && (
            <li>
              <Link className="text-navy underline" href={voivodeshipPath(lang, neighbors.prev.slug)}>
                {neighbors.prev.name}
              </Link>
            </li>
          )}
          {neighbors.next && (
            <li>
              <Link className="text-navy underline" href={voivodeshipPath(lang, neighbors.next.slug)}>
                {neighbors.next.name}
              </Link>
            </li>
          )}
        </ul>
        <p className="mt-4 text-sm">
          {copy.parent}:{" "}
          <Link className="text-navy underline" href={polandHome(lang)}>
            {pl ? "Polska" : "Poland"}
          </Link>
        </p>
      </section>
    </PolandFrame>
  );
}
