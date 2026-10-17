import Link from "next/link";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { ItalyFrame } from "@/app/it/frame";
import { italyChooser, italyHome, otherLang } from "@/data/italy/paths";
import { italyMetadata } from "@/data/italy/seo";
import { sourceById, sourcesById } from "@/data/italy/sources";
import type { ItLang } from "@/data/italy/types";
import { ui } from "@/data/italy/ui";

export function generateStaticParams() {
  return [{ lang: "it" }, { lang: "en" }];
}
export const dynamicParams = false;

function asLang(value: string): ItLang {
  if (value !== "it" && value !== "en") notFound();
  return value;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${italyHome(lang)}results/`;
  return italyMetadata({
    title: lang === "it" ? "Risultati" : "Results",
    description:
      lang === "it"
        ? "Cifre dell'archivio Eligendo per la Camera del 25 settembre 2022, area Italia esclusa la Valle d'Aosta. Questa pagina non proclama un vincitore."
        : "Figures from the Eligendo archive for the Chamber of 25 September 2022, Italy excluding Valle d'Aosta. This page does not declare a winner.",
    path,
    lang,
    alternatePath: `${italyHome(otherLang(lang))}results/`,
  });
}

export default async function ResultsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const it = lang === "it";
  const path = `${italyHome(lang)}results/`;
  const archive = sourceById("eligendo-camera-2022");
  return (
    <ItalyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.italy, path: italyChooser() },
        { name: it ? "Italia" : "Italy", path: italyHome(lang) },
        { name: copy.results, path },
      ]}
      eyebrow={it ? "Archivio, non una proclamazione" : "Archive, not a call"}
      title={it ? "Risultati" : "Results"}
      lede={
        it
          ? "La pagina Eligendo letta il 17 ottobre 2026 è intitolata «Camera 25/09/2022 Area ITALIA (escl. Valle d'Aosta)»."
          : "The Eligendo page read on 17 October 2026 is titled “Camera 25/09/2022 Area ITALIA (escl. Valle d'Aosta)”."
      }
      officeHref={archive.url}
      officeLabel="Eligendo, Ministero dell'Interno"
      sources={sourcesById(["eligendo-camera-2022", "eligendo-home", "dpr-97-2022"])}
    >
      <GapNote label={copy.gap} text={copy.resultsGap} />
      <table className="fact-table">
        <tbody>
          <tr>
            <th scope="row">{it ? "Elettori" : "Electors"}</th>
            <td>46.021.956</td>
          </tr>
          <tr>
            <th scope="row">{it ? "Votanti" : "Voters"}</th>
            <td>29.413.657 (63,91 %)</td>
          </tr>
          <tr>
            <th scope="row">{it ? "Schede bianche" : "Blank ballots"}</th>
            <td>493.282</td>
          </tr>
          <tr>
            <th scope="row">{it ? "Non valide (bianche incluse)" : "Invalid (blanks included)"}</th>
            <td>1.315.461</td>
          </tr>
          <tr>
            <th scope="row">{it ? "Totale candidati, seggi" : "Candidates total, seats"}</th>
            <td>28.098.196 · 146</td>
          </tr>
          <tr>
            <th scope="row">{it ? "Totale liste, seggi" : "Lists total, seats"}</th>
            <td>28.098.196 · 245</td>
          </tr>
        </tbody>
      </table>
      <div className="prose-legal">
        <p>
          {it
            ? "Le cifre sono copiate come la tabella le stampa, compresi i punti delle migliaia e la virgola della percentuale. Il titolo della pagina esclude la Valle d'Aosta. La circoscrizione Estero non è in quella tabella. Il Senato non è in quella tabella. L'elenco lista per lista resta sulla pagina d'archivio e non è ristampato qui."
            : "The figures are copied as the table prints them, including the thousands separators and the decimal comma. The page title excludes Valle d'Aosta. The overseas constituency is not in that table. The Senate is not in that table. The list-by-list table stays on the archive page and is not reprinted here."}
        </p>
        <p>
          {it
            ? "Per la prossima elezione politica non c'è uno scrutinio da copiare. Questa pagina non attribuisce quei seggi futuri e non dichiara una maggioranza."
            : "For the next general election there is no count to copy. This page does not assign those future seats and does not declare a majority."}
        </p>
        <p>
          <a href={archive.url} rel="noopener noreferrer">
            Eligendo
          </a>
          {" · "}
          <Link className="text-navy underline" href={`${italyHome(lang)}elections/prossime-politiche/`}>
            {copy.nextElection}
          </Link>
        </p>
      </div>
    </ItalyFrame>
  );
}
