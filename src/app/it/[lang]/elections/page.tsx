import Link from "next/link";
import { notFound } from "next/navigation";
import { ItalyFrame } from "@/app/it/frame";
import { chietiByElectionPath, italyChooser, italyHome, otherLang } from "@/data/italy/paths";
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
  const path = `${italyHome(lang)}elections/`;
  return italyMetadata({
    title: lang === "it" ? "Elezioni in Italia" : "Elections in Italy",
    description:
      lang === "it"
        ? "Indice delle elezioni nelle pagine italiane: la suppletiva della Camera nel collegio 01-Chieti del 15-16 novembre 2026, le politiche del 25 settembre 2022 e la prossima, senza un giorno di calendario."
        : "Index of elections on the Italy pages: the Chamber by-election in constituency 01-Chieti on 15–16 November 2026, the general election of 25 September 2022, and the next one, with no calendar day.",
    path,
    lang,
    alternatePath: `${italyHome(otherLang(lang))}elections/`,
  });
}

export default async function ElectionsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const it = lang === "it";
  const path = `${italyHome(lang)}elections/`;
  const dait = sourceById("dait");
  return (
    <ItalyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.italy, path: italyChooser() },
        { name: it ? "Italia" : "Italy", path: italyHome(lang) },
        { name: copy.elections, path },
      ]}
      title={copy.elections}
      lede={
        it
          ? "Questa consegna pubblica l'elezione suppletiva della Camera nel collegio 01-Chieti, l'elezione politica del 25 settembre 2022 e la pagina della successiva elezione politica, senza un giorno per quella. Non è il calendario di ogni elezione regionale."
          : "This release publishes the Chamber by-election in constituency 01-Chieti, the general election of 25 September 2022, and the page for the next general election, without a day for that one. It is not the calendar of every regional election."
      }
      officeHref={dait.url}
      officeLabel="Dipartimento per gli Affari Interni e Territoriali"
      sources={sourcesById(["dpr-97-2022", "cost-titolo-i", "dait"])}
    >
      <ul className="space-y-4">
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={chietiByElectionPath(lang)}>
            {it
              ? "Elezione suppletiva della Camera, collegio 01-Chieti, 15-16 novembre 2026"
              : "Chamber by-election, constituency 01-Chieti, 15–16 November 2026"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            {it
              ? "Domenica 15 novembre, ore 7-23, e lunedì 16 novembre, ore 7-15. Decreto del 25 settembre 2026. Nessun sondaggio e nessun conteggio."
              : "Sunday 15 November, 7:00–23:00, and Monday 16 November, 7:00–15:00. Decree of 25 September 2026. No polls and no count."}
          </p>
        </li>
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={`${path}politiche-2022/`}>
            {it ? "Elezioni politiche del 25 settembre 2022" : "General election of 25 September 2022"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">D.P.R. 21 luglio 2022, n. 97.</p>
        </li>
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={`${path}prossime-politiche/`}>
            {it ? "Prossime elezioni politiche" : "Next general election"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            {it ? "Nessun giorno di calendario in questa consegna." : "No calendar day in this release."}
          </p>
        </li>
      </ul>
    </ItalyFrame>
  );
}
