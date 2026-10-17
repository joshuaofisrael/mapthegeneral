import { GapNote } from "@/components/GapNote";
import { ChFrame } from "../../frame";
import { asChLang } from "../../lang";
import { chMetadata } from "../../meta";
import { chHome } from "../../../../../data/ch/search";
import { sourceById, sourcesById } from "../../../../../data/ch/sources";
import { ui } from "../../../../../data/ch/ui";

export function generateStaticParams() {
  return [{ lang: "de" }, { lang: "fr" }, { lang: "it" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asChLang((await params).lang);
  const copy = ui(lang);
  return chMetadata({
    title: copy.parties,
    description:
      lang === "de"
        ? "Das Parteienregister der Bundeskanzlei wird hier nicht abgedruckt. Die Nationalratswahl 2027 hat noch keine gelesene Kandidaturenliste."
        : lang === "fr"
          ? "Le registre des partis de la Chancellerie fédérale n’est pas reproduit ici. L’élection du Conseil national de 2027 n’a pas encore de liste de candidatures lue."
          : lang === "it"
            ? "Il registro dei partiti della Cancelleria federale non è riprodotto qui. L’elezione del Consiglio nazionale del 2027 non ha ancora una lista di candidature letta."
            : "The Federal Chancellery’s party register is not reprinted here. The 2027 National Council election does not yet have a candidacy list that was read.",
    path: `${chHome(lang)}parties/`,
    lang,
  });
}

export default async function PartiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asChLang((await params).lang);
  const copy = ui(lang);
  const path = `${chHome(lang)}parties/`;
  const office = sourceById("bk-nationalrat");
  return (
    <ChFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.switzerland, path: "/ch/" },
        { name: copy.switzerland, path: chHome(lang) },
        { name: copy.parties, path },
      ]}
      title={copy.parties}
      lede={
        lang === "de"
          ? "Die Bundeskanzlei führt das Parteienregister und schreibt, dass die Daten veraltet sein können und nur auf Antrag der Parteien aktualisiert werden."
          : lang === "fr"
            ? "La Chancellerie fédérale tient le registre des partis et écrit que les données peuvent être obsolètes et ne sont mises à jour que sur demande des partis."
            : lang === "it"
              ? "La Cancelleria federale tiene il registro dei partiti e scrive che i dati possono essere superati e sono aggiornati solo su domanda dei partiti."
              : "The Federal Chancellery keeps the party register and writes that the data can be out of date and are updated only at a party’s request."
      }
      officeHref={office.url}
      sources={sourcesById(["bk-nationalrat", "wahlen-nr-2023"])}
    >
      <GapNote label={copy.gap} text={copy.candidateGap} />
      <div className="prose-legal">
        <p>
          {lang === "de"
            ? "Die Parteinamen der Nationalratswahl 2023 stehen auf der Ergebnisseite, so wie das BFS sie druckt. Diese Seite wiederholt das Register nicht und erklärt nicht, wie eine Liste eingereicht wird."
            : lang === "fr"
              ? "Les noms de parti de l’élection du Conseil national de 2023 figurent sur la page des résultats, tels que l’OFS les imprime. Cette page ne reprend pas le registre et n’explique pas comment déposer une liste."
              : lang === "it"
                ? "I nomi di partito dell’elezione del Consiglio nazionale del 2023 stanno nella pagina dei risultati, come li stampa l’UST. Questa pagina non ripete il registro e non spiega come depositare una lista."
                : "Party names from the 2023 National Council election are on the results page, as the BFS prints them. This page does not reprint the register and does not explain how to file a list."}
        </p>
      </div>
    </ChFrame>
  );
}
