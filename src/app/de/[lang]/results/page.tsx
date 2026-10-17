import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { GermanyFrame } from "@/app/de/frame";
import { BUNDESTAG_2025_SEATS, BUNDESTAG_SEAT_TOTAL } from "@/data/de/result";
import { formatNumber } from "@/data/de/format";
import { sourceById, sourcesById } from "@/data/de/sources";
import { ui } from "@/data/de/ui";
import { dePageMetadata } from "@/data/de/seo";
import {
  DE_LANGS,
  bundestag2029Path,
  germanyChooser,
  germanyHome,
  otherLang,
  resultsPath,
} from "@/data/de/paths";
import type { DeLang } from "@/data/de/types";
import { notFound } from "next/navigation";

function asDeLang(value: string): DeLang {
  if (value !== "de" && value !== "en") notFound();
  return value;
}

export function generateStaticParams() {
  return DE_LANGS.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asDeLang((await params).lang);
  const path = resultsPath(lang);
  return dePageMetadata({
    title: lang === "de" ? "Endgültiges Ergebnis 2025" : "Final result of 2025",
    description:
      lang === "de"
        ? "Endgültiges Ergebnis der Wahl zum 21. Deutschen Bundestag, festgestellt am 14. März 2025. Diese Seite ruft keine Wahl aus."
        : "Final result of the election of the 21st German Bundestag, established on 14 March 2025. This page does not call an election.",
    path,
    lang,
    alternatePath: resultsPath(otherLang(lang)),
  });
}

export default async function ResultsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asDeLang((await params).lang);
  const copy = ui(lang);
  const de = lang === "de";
  const path = resultsPath(lang);
  const office = sourceById("bwl-2025-result");

  return (
    <GermanyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.germany, path: germanyChooser() },
        { name: de ? "Deutschland" : "Germany", path: germanyHome(lang) },
        { name: copy.results, path },
      ]}
      eyebrow={de ? "Festgestellt am 14. März 2025" : "Established on 14 March 2025"}
      title={de ? "Endgültiges Ergebnis der Bundestagswahl 2025" : "Final result of the 2025 Bundestag election"}
      lede={copy.resultNote}
      officeHref={office.url}
      officeLabel="Die Bundeswahlleiterin"
      sources={sourcesById(["bwl-2025-result", "bwahlg-1", "bwl-2029"])}
    >
      <section className="prose-legal">
        <p>
          {de
            ? "Pressemitteilung Nr. 29/25: Der Bundeswahlausschuss hat am 14. März 2025 das endgültige Ergebnis der Wahl zum 21. Deutschen Bundestag festgestellt. Bundeswahlleiterin Ruth Brand hat es bekannt gegeben. Die Wahl war die vorgezogene Neuwahl am 23. Februar 2025. Die Wahlbeteiligung betrug 82,5 Prozent. Der Anteil der ungültigen Zweitstimmen betrug 0,6 Prozent, der Anteil der ungültigen Erststimmen 0,8 Prozent. Der Anteil der Briefwahl betrug 37,0 Prozent."
            : "Press release 29/25: on 14 March 2025 the Federal Electoral Committee established the final result of the election of the 21st German Bundestag. Federal Returning Officer Ruth Brand announced it. The election was the early election of 23 February 2025. Turnout was 82.5 percent. Invalid second votes were 0.6 percent; invalid first votes were 0.8 percent. Postal ballots were 37.0 percent."}
        </p>
        <p>
          {de
            ? "Die Anteile der Zweitstimmen in der ersten Tabelle der Mitteilung sind auf eine Dezimalstelle gerundet. Gegenüber dem vorläufigen Ergebnis änderte sich die Sitzverteilung nicht. Der Südschleswigsche Wählerverband nimmt als Partei einer nationalen Minderheit teil, auf die die Sperrklausel keine Anwendung findet."
            : "The second-vote shares in the release’s first table are rounded to one decimal place. The seat distribution did not change from the provisional result. The Südschleswigscher Wählerverband takes part as a party of a national minority, to which the threshold does not apply."}
        </p>
      </section>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <caption className="mb-3 text-left font-serif text-2xl font-semibold text-ink">
            {de ? "Sitze und Zweitstimmenanteil" : "Seats and second-vote share"}
          </caption>
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-muted">
              <th className="py-2 pr-4 font-semibold">{de ? "Partei" : "Party"}</th>
              <th className="py-2 pr-4 font-semibold">{de ? "Sitze" : "Seats"}</th>
              <th className="py-2 pr-4 font-semibold">{de ? "darunter Wahlkreissitze" : "Of which constituency seats"}</th>
              <th className="py-2 font-semibold">{de ? "Zweitstimmen" : "Second votes"}</th>
            </tr>
          </thead>
          <tbody>
            {BUNDESTAG_2025_SEATS.map((row) => (
              <tr key={row.shortName} className="border-b border-line">
                <th className="py-2 pr-4 font-semibold" scope="row">
                  {row.shortName}
                  <span className="mt-0.5 block font-normal text-ink-muted">{row.fullName}</span>
                </th>
                <td className="py-2 pr-4">{formatNumber(row.seats, lang)}</td>
                <td className="py-2 pr-4">
                  {row.constituencySeats === null ? "–" : formatNumber(row.constituencySeats, lang)}
                </td>
                <td className="py-2">{row.secondVoteShare}</td>
              </tr>
            ))}
            <tr>
              <th className="py-2 pr-4 font-semibold" scope="row">
                {de ? "Summe der Sitzzeilen" : "Sum of the seat rows"}
              </th>
              <td className="py-2 pr-4">{formatNumber(BUNDESTAG_SEAT_TOTAL, lang)}</td>
              <td className="py-2 pr-4" />
              <td className="py-2" />
            </tr>
          </tbody>
        </table>
      </div>
      <GapNote
        label={copy.gap}
        text={
          de
            ? "Die Mitteilung druckt weitere Zweitstimmenanteile unter „Sonstige“, darunter Bündnis Sahra Wagenknecht mit 4,981 Prozent und die Freie Demokratische Partei mit 4,3 Prozent. In der Sitztafel steht bei der FDP „keine“. Diese lange Liste wird hier nicht wiederholt. Für 2029 gibt es kein Ergebnis."
            : "The release prints further second-vote shares under “Sonstige”, including Bündnis Sahra Wagenknecht at 4.981 percent and the Free Democratic Party at 4.3 percent. The seat table prints “keine” for the FDP. That long list is not repeated here. There is no result for 2029."
        }
      />
      <p className="text-sm">
        <Link className="text-navy underline" href={bundestag2029Path(lang)}>
          {de ? "Wahl 2029" : "2029 election"}
        </Link>
      </p>
    </GermanyFrame>
  );
}
