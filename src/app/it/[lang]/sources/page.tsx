import { notFound } from "next/navigation";
import { ItalyFrame } from "@/app/it/frame";
import { italyChooser, italyHome, otherLang } from "@/data/italy/paths";
import { italyMetadata } from "@/data/italy/seo";
import { SOURCES, sourceById } from "@/data/italy/sources";
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
  const path = `${italyHome(lang)}sources/`;
  return italyMetadata({
    title: lang === "it" ? "Fonti" : "Sources",
    description:
      lang === "it"
        ? "Fonti ufficiali lette per le pagine italiane il 17 ottobre 2026: Costituzione, Gazzetta Ufficiale, ISTAT, Camera, Quirinale, Ministero dell'interno."
        : "Official sources read for the Italy pages on 17 October 2026: Constitution, Official Gazette, ISTAT, Chamber, Quirinale, Interior Ministry.",
    path,
    lang,
    alternatePath: `${italyHome(otherLang(lang))}sources/`,
  });
}

export default async function SourcesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const it = lang === "it";
  const path = `${italyHome(lang)}sources/`;
  const dait = sourceById("dait");
  return (
    <ItalyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.italy, path: italyChooser() },
        { name: it ? "Italia" : "Italy", path: italyHome(lang) },
        { name: copy.sources, path },
      ]}
      title={it ? "Fonti delle pagine italiane" : "Sources for the Italy pages"}
      lede={
        it
          ? "Le schede del livello nazionale portano la data 17 ottobre 2026. Le schede del livello province e collegi portano la data 18 ottobre 2026. Stampa e Wikipedia non sono usate come fonte di un fatto."
          : "National-level items are dated 17 October 2026. Province and constituency items are dated 18 October 2026. News reports and Wikipedia are not used as the source of a fact."
      }
      officeHref={dait.url}
      officeLabel="Dipartimento per gli Affari Interni e Territoriali"
      sources={SOURCES}
    >
      <div className="prose-legal">
        <p>
          {it
            ? "Ciò che non è in queste fonti non è inventato. Restano aperte, tra le altre, la presidenza del Consiglio in carica, i presidenti regionali, il senatore in carica per ciascun collegio, le liste dei candidati, i comuni, la circoscrizione Estero, il giorno della prossima elezione politica e il CAP."
            : "What is not in these sources is not invented. Still open, among other gaps, are the sitting President of the Council, the regional presidents, the sitting senator for each constituency, candidate lists, municipalities, the overseas constituency, the day of the next general election, and postcodes."}
        </p>
        <h2>{it ? "Licenze e attribuzione" : "Licences and attribution"}</h2>
        <p>
          {it ? "Dati ISTAT: fonte ISTAT, rilasciati con licenza " : "ISTAT data: source ISTAT, released under the "}
          <a href="https://creativecommons.org/licenses/by/4.0/deed.it">
            {it ? "Creative Commons Attribuzione 4.0" : "Creative Commons Attribution 4.0 licence"}
          </a>{" "}
          (<a href="https://www.istat.it/note-legali/">{it ? "note legali ISTAT" : "ISTAT legal notes"}</a>).{" "}
          {it
            ? "I testi della Costituzione, delle leggi e dei decreti sono atti ufficiali esclusi dal diritto d'autore (art. 5 della legge 22 aprile 1941, n. 633). I fatti delle altre fonti ufficiali sono riassunti con parole nostre e con la citazione di ogni pagina. Non sono riprodotti immagini, loghi o emblemi. I nomi dei deputati vengono dall'endpoint SPARQL della Camera, con attribuzione. La pagina di catalogo del dataset il 18 ottobre 2026 ha restituito un errore, quindi da quella pagina non è stata copiata una licenza. I file degli amministratori del Ministero dell'interno non stampano una riga di licenza: sono copiati solo nome, carica e date dell'ufficio pubblico, con attribuzione, e non i dati di nascita."
            : "The texts of the Constitution, laws and decrees are official acts excluded from copyright (article 5 of Law no. 633 of 22 April 1941). Facts from the other official sources are summarised in our own words with a citation to each page. No images, logos or emblems are reproduced. Deputy names come from the Chamber SPARQL endpoint, with attribution. The dataset catalogue page returned an error on 18 October 2026, so no licence line was copied from that page. The Interior Ministry administrator files did not print a licence line; only the public-office name, role and dates are copied, with attribution, and birth data are not."}
        </p>
      </div>
    </ItalyFrame>
  );
}
