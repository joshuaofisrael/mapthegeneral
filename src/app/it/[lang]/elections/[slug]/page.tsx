import Link from "next/link";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { ItalyFrame } from "@/app/it/frame";
import { formatNumber } from "@/data/italy/format";
import { REGIONS } from "@/data/italy/places";
import { chietiByElectionPath, italyChooser, italyHome, otherLang, regionPath } from "@/data/italy/paths";
import { italyMetadata } from "@/data/italy/seo";
import { sourceById, sourcesById } from "@/data/italy/sources";
import type { ItLang } from "@/data/italy/types";
import { ui } from "@/data/italy/ui";

const SLUGS = ["politiche-2022", "prossime-politiche"] as const;

export function generateStaticParams() {
  return ["it", "en"].flatMap((lang) => SLUGS.map((slug) => ({ lang, slug })));
}
export const dynamicParams = false;

function asLang(value: string): ItLang {
  if (value !== "it" && value !== "en") notFound();
  return value;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = asLang(raw);
  if (slug !== "politiche-2022" && slug !== "prossime-politiche") return {};
  const it = lang === "it";
  const title =
    slug === "politiche-2022"
      ? it
        ? "Elezioni politiche del 25 settembre 2022"
        : "General election of 25 September 2022"
      : it
        ? "Prossime elezioni politiche"
        : "Next general election";
  const path = `${italyHome(lang)}elections/${slug}/`;
  return italyMetadata({
    title,
    description:
      slug === "politiche-2022"
        ? it
          ? "Convocazione del D.P.R. 21 luglio 2022, n. 97, e seggi assegnati nella Gazzetta Ufficiale n. 169. Informazione non ufficiale."
          : "Calling by Decree of the President of the Republic no. 97 of 21 July 2022, and seats assigned in Official Gazette no. 169. Unofficial information."
        : it
          ? "La prossima elezione della Camera e del Senato non ha un giorno di calendario nelle fonti lette il 17 ottobre 2026."
          : "The next election of the Chamber and the Senate has no calendar day in the sources read on 17 October 2026.",
    path,
    lang,
    alternatePath: `${italyHome(otherLang(lang))}elections/${slug}/`,
  });
}

export default async function ElectionPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = asLang(raw);
  if (slug !== "politiche-2022" && slug !== "prossime-politiche") notFound();
  const copy = ui(lang);
  const it = lang === "it";
  const path = `${italyHome(lang)}elections/${slug}/`;
  const dait = sourceById("dait");
  const past = slug === "politiche-2022";
  return (
    <ItalyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.italy, path: italyChooser() },
        { name: it ? "Italia" : "Italy", path: italyHome(lang) },
        { name: copy.elections, path: `${italyHome(lang)}elections/` },
        { name: past ? (it ? "25 settembre 2022" : "25 September 2022") : copy.nextElection, path },
      ]}
      eyebrow={past ? "22G00107" : it ? "Data non fissata" : "Date not set"}
      title={
        past
          ? it
            ? "Elezioni politiche del 25 settembre 2022"
            : "General election of 25 September 2022"
          : it
            ? "Prossime elezioni politiche"
            : "Next general election"
      }
      lede={
        past
          ? it
            ? "Decreto del Presidente della Repubblica 21 luglio 2022, n. 97."
            : "Decree of the President of the Republic no. 97 of 21 July 2022."
          : it
            ? "Articoli 60 e 61 della Costituzione. Nessun decreto di convocazione letto il 17 ottobre 2026."
            : "Articles 60 and 61 of the Constitution. No calling decree was read on 17 October 2026."
      }
      officeHref={dait.url}
      officeLabel="Dipartimento per gli Affari Interni e Territoriali"
      sources={sourcesById(past ? ["dpr-97-2022", "gu-169-2022", "cost-titolo-i", "camera-chi-elegge"] : ["cost-titolo-i", "dpr-97-2022", "gu-169-2022", "dait"])}
    >
      {past ? <PastElection lang={lang} /> : <NextElection lang={lang} />}
      <p className="text-sm">
        <Link className="text-navy underline" href={`${italyHome(lang)}results/`}>
          {copy.results}
        </Link>
      </p>
    </ItalyFrame>
  );
}

function PastElection({ lang }: { lang: ItLang }) {
  const it = lang === "it";
  return (
    <>
      <section className="prose-legal">
        <h2>{it ? "Che cosa dice il decreto" : "What the decree says"}</h2>
        <ul>
          <li>
            {it
              ? "I comizi per la Camera e il Senato sono convocati per domenica 25 settembre 2022."
              : "The election for the Chamber and the Senate is called for Sunday, 25 September 2022."}
          </li>
          <li>
            {it
              ? "La prima riunione delle Camere avrà luogo il 13 ottobre 2022."
              : "The first sitting of the chambers will take place on 13 October 2022."}
          </li>
          <li>
            {it
              ? "Il decreto di scioglimento, nello stesso numero della Gazzetta, è il D.P.R. 21 luglio 2022, n. 96. Dice che il Senato e la Camera sono sciolti. È firmato Mattarella. Il visto del Guardasigilli è Cartabia."
              : "The dissolution decree, in the same issue of the Gazette, is Decree of the President of the Republic no. 96 of 21 July 2022. It says the Senate and the Chamber are dissolved. It is signed Mattarella. The seal of the Keeper of the Seals is Cartabia."}
          </li>
        </ul>
        <p>
          {it
            ? "I decreti di assegnazione dei seggi nello stesso numero usano la popolazione del censimento al 9 ottobre 2011. Non sono l'assegnazione di un'elezione successiva. La nota della tabella della Camera dice che i deputati da eleggere sono 400, detratti 8 della circoscrizione Estero, e che il quoziente è 151.616. La riga ITALIA della tabella stampa 59.433.744 abitanti e 392 seggi sul territorio nazionale. La somma delle circoscrizioni in questa pagina è 392."
            : "The seat-assignment decrees in the same issue use the census population at 9 October 2011. They are not the allocation for a later election. The Chamber table’s note says 400 deputies are to be elected, minus 8 for the overseas constituency, and that the quotient is 151,616. The ITALIA row of the table prints 59,433,744 inhabitants and 392 seats on the national territory. The constituencies on this page add up to 392."}
        </p>
        <p>
          {it
            ? "La nota della tabella del Senato dice che i senatori da eleggere sono 200, detratti 12 seggi del terzo comma dell'articolo 57 e 4 della circoscrizione Estero, e che il quoziente è 311.879. La somma dei seggi regionali in questa pagina è 196. Con i 4 seggi dell'estero indicati dall'articolo 57 si arriva a 200. Questa pagina non ristampa la tabella dell'estero."
            : "The Senate table’s note says 200 senators are to be elected, minus 12 seats under the third paragraph of article 57 and 4 for the overseas constituency, and that the quotient is 311,879. The regional seats on this page add up to 196. With the 4 overseas seats stated in article 57 that is 200. This page does not reprint the overseas table."}
        </p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-semibold">{it ? "Seggi del 2022 per regione" : "2022 seats by region"}</h2>
        <table className="fact-table mt-3">
          <thead>
            <tr>
              <th scope="col">{it ? "Regione nel foglio ISTAT" : "Region in the ISTAT sheet"}</th>
              <th scope="col">{it ? "Senato" : "Senate"}</th>
              <th scope="col">{it ? "Camera" : "Chamber"}</th>
            </tr>
          </thead>
          <tbody>
            {REGIONS.map((region) => (
              <tr key={region.code}>
                <td>
                  <Link className="text-navy underline" href={regionPath(lang, region.slug)}>
                    {region.istatName}
                  </Link>
                </td>
                <td>{region.senateSeats2022}</td>
                <td>{formatNumber(region.chamberSeats2022, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-sm text-ink-muted">
          {it
            ? "Senato: seggio finale stampato per la regione nel decreto del 21 luglio 2022. Camera: somma delle circoscrizioni di quella regione nello stesso numero della Gazzetta. Dove la Gazzetta divide una regione in più circoscrizioni, la cifra della Camera è una somma."
            : "Senate: the final seat figure printed for the region in the decree of 21 July 2022. Chamber: the sum of that region’s constituencies in the same issue of the Gazette. Where the Gazette splits a region into more than one constituency, the Chamber figure is a sum."}
        </p>
      </section>
    </>
  );
}

function NextElection({ lang }: { lang: ItLang }) {
  const copy = ui(lang);
  const it = lang === "it";
  return (
    <section className="prose-legal space-y-3">
      <p>
        {it
          ? "L'articolo 60 dice che la Camera e il Senato sono eletti per cinque anni e che la durata non può essere prorogata se non per legge e soltanto in caso di guerra. L'articolo 61 dice che le elezioni delle nuove Camere hanno luogo entro settanta giorni dalla fine delle precedenti e che la prima riunione ha luogo non oltre il ventesimo giorno dalle elezioni."
          : "Article 60 says the Chamber and the Senate are elected for five years and that the term cannot be extended except by law and only in the case of war. Article 61 says elections of the new chambers take place within seventy days of the end of the previous ones, and that the first sitting takes place no later than the twentieth day after the election."}
      </p>
      <p>
        {it
          ? "Le Camere di cui parla il D.P.R. n. 97 del 2022 si sono riunite la prima volta il 13 ottobre 2022. Il 17 ottobre 2026 non è stato letto un decreto di scioglimento o di convocazione successivo. Questa pagina non calcola un giorno di votazione e non scrive «autunno 2027» come data."
          : "The chambers in Decree no. 97 of 2022 first met on 13 October 2022. On 17 October 2026 no later dissolution or calling decree had been read. This page does not calculate a polling day and does not print “autumn 2027” as a date."}
      </p>
      <GapNote label={copy.gap} text={copy.nextElectionGap} />
      <p>
        {it
          ? "Un'elezione suppletiva della Camera, nel collegio uninominale 01-Chieti, è convocata per il 15 e 16 novembre 2026. Non è l'elezione politica dell'intera Camera."
          : "A Chamber by-election, in single-member constituency 01-Chieti, is called for 15 and 16 November 2026. It is not a general election of the whole Chamber."}{" "}
        <Link className="text-navy underline" href={chietiByElectionPath(lang)}>
          {it ? "Pagina di quella suppletiva" : "Page for that by-election"}
        </Link>
      </p>
      <GapNote label={copy.gap} text={copy.candidateGap} />
    </section>
  );
}
