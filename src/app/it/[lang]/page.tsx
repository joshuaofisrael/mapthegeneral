import Link from "next/link";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { ItalyFrame } from "@/app/it/frame";
import { formatNumber } from "@/data/italy/format";
import { COMUNE_COUNT, POPULATION_2025, REGIONS, UNIT_COUNT, alphaRegions } from "@/data/italy/places";
import { italyChooser, italyHome, otherLang, regionPath } from "@/data/italy/paths";
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
  const path = italyHome(lang);
  return italyMetadata({
    title: lang === "it" ? "Italia" : "Italy",
    description:
      lang === "it"
        ? "Italia: Camera dei deputati, Senato della Repubblica, elezione del 25 settembre 2022 e 20 regioni. Nessun giorno stampato per la prossima elezione politica. Informazione non ufficiale."
        : "Italy: Chamber of Deputies, Senate, the election of 25 September 2022, and 20 regions. No polling day is printed for the next general election. Unofficial information.",
    path,
    lang,
    alternatePath: italyHome(otherLang(lang)),
  });
}

export default async function ItalyNationalPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const it = lang === "it";
  const path = italyHome(lang);
  const dait = sourceById("dait");
  return (
    <ItalyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.italy, path: italyChooser() },
        { name: it ? "Italia" : "Italy", path },
      ]}
      eyebrow={it ? "Repubblica Italiana" : "Italian Republic"}
      title={it ? "Italia" : "Italy"}
      lede={
        it
          ? "Il decreto del Presidente della Repubblica 21 luglio 2022, n. 97, convoca i comizi per la Camera e il Senato per domenica 25 settembre 2022. La prima riunione delle Camere è fissata al 13 ottobre 2022."
          : "Decree of the President of the Republic no. 97 of 21 July 2022 calls the elections for the Chamber and the Senate for Sunday, 25 September 2022. The first sitting of the chambers is set for 13 October 2022."
      }
      officeHref={dait.url}
      officeLabel="Dipartimento per gli Affari Interni e Territoriali"
      sources={sourcesById([
        "cost-titolo-i",
        "cost-senato-pdf",
        "dpr-97-2022",
        "gu-169-2022",
        "camera-chi-elegge",
        "istat-censimento",
        "demo-regioni",
        "istat-codici",
        "quirinale",
        "governo",
        "dait",
        "poste-cap",
      ])}
    >
      <section className="prose-legal">
        <h2>{copy.parliament}</h2>
        <p>
          {it
            ? "L'articolo 55, nel testo del Governo letto il 17 ottobre 2026, dice che il Parlamento si compone della Camera dei deputati e del Senato della Repubblica."
            : "Article 55, in the Government text read on 17 October 2026, says Parliament is composed of the Chamber of Deputies and the Senate of the Republic."}
        </p>
        <p>
          {it
            ? "L'articolo 56 dice che la Camera è eletta a suffragio universale e diretto e che il numero dei deputati è di quattrocento, otto dei quali eletti nella circoscrizione Estero. Sono eleggibili gli elettori che nel giorno dell'elezione hanno compiuto venticinque anni. La pagina «Chi elegge i deputati» della Camera, per la XIX legislatura, ripete che i deputati sono 400, che la Camera è rinnovata ogni 5 anni salvo scioglimento anticipato, e che 8 deputati sono eletti nella circoscrizione Estero."
            : "Article 56 says the Chamber is elected by universal and direct suffrage and that there are four hundred deputies, eight of them elected in the overseas constituency. Electors who have reached the age of twenty-five on election day are eligible. The Chamber’s page “Chi elegge i deputati”, for the 19th legislature, repeats that there are 400 deputies, that the Chamber is renewed every 5 years except in the case of early dissolution, and that 8 deputies are elected in the overseas constituency."}
        </p>
        <p>
          {it
            ? "L'articolo 57 dice che il Senato è eletto a base regionale, salvi i seggi della circoscrizione Estero, e che i senatori elettivi sono duecento, quattro dei quali eletti nella circoscrizione Estero. Nessuna Regione o Provincia autonoma può avere meno di tre senatori; il Molise ne ha due, la Valle d'Aosta uno."
            : "Article 57 says the Senate is elected on a regional basis, apart from the overseas seats, and that there are two hundred elective senators, four of them elected in the overseas constituency. No region or autonomous province may have fewer than three senators; Molise has two, and Valle d'Aosta has one."}
        </p>
        <p>
          {it
            ? "L'articolo 59 dice che è senatore di diritto e a vita, salvo rinunzia, chi è stato Presidente della Repubblica, e che il Presidente della Repubblica può nominare senatori a vita cittadini che hanno illustrato la Patria per altissimi meriti. Il numero complessivo dei senatori in carica nominati dal Presidente della Repubblica non può essere superiore a cinque. I nominativi in carica non sono copiati in questa pagina."
            : "Article 59 says that anyone who has been President of the Republic is a senator by right for life, unless they decline, and that the President of the Republic may appoint as life senators citizens who have brought honour to the country by outstanding achievement. The total number of senators in office appointed by the President may not exceed five. The names of those currently in office are not copied on this page."}
        </p>
      </section>

      <section className="prose-legal">
        <h2>{copy.lastElection}</h2>
        <p>
          {it
            ? "Il D.P.R. 21 luglio 2022, n. 97, visto il decreto dello stesso giorno che dispone lo scioglimento delle Camere, convoca i comizi per domenica 25 settembre 2022 e fissa la prima riunione al 13 ottobre 2022. È firmato Mattarella, su proposta del Presidente del Consiglio dei ministri Draghi e del Ministro dell'interno Lamorgese. Nella Gazzetta Ufficiale n. 169 del 21 luglio 2022 il decreto di scioglimento è il n. 96."
            : "Decree of the President of the Republic no. 97 of 21 July 2022, citing the decree of the same day that dissolves the chambers, calls the election for Sunday, 25 September 2022 and sets the first sitting for 13 October 2022. It is signed Mattarella, on the proposal of the President of the Council of Ministers Draghi and the Minister of the Interior Lamorgese. In Official Gazette no. 169 of 21 July 2022 the dissolution decree is no. 96."}
        </p>
        <p>
          <Link className="text-navy underline" href={`${path}elections/politiche-2022/`}>
            {it ? "Pagina di quell'elezione" : "Page for that election"}
          </Link>
        </p>
        <h2>{copy.nextElection}</h2>
        <GapNote label={copy.gap} text={copy.nextElectionGap} />
        <p>
          <Link className="text-navy underline" href={`${path}elections/prossime-politiche/`}>
            {it ? "Pagina della prossima elezione politica" : "Page for the next general election"}
          </Link>
        </p>
      </section>

      <section className="prose-legal">
        <h2>{it ? "Popolazione" : "Population"}</h2>
        <p>
          {it
            ? `La pagina ISTAT sulla popolazione censuaria, letta il 17 ottobre 2026, indica come dato ufficiale del censimento permanente al 31 dicembre 2024 ${formatNumber(POPULATION_2025, lang)} persone abitualmente dimoranti. La somma delle righe «età 999», colonna Totale, del file regionale DEMO al 1° gennaio 2025 è lo stesso numero. La stessa pagina ISTAT dice che, per i procedimenti elettorali e referendari, il dato ufficiale è nel D.P.R. n. 53 del 3 marzo 2023 e si riferisce al 31 dicembre 2021. Quel decreto non è stato letto per questa consegna, quindi la cifra elettorale non è stampata qui.`
            : `The ISTAT census-population page, read on 17 October 2026, gives ${formatNumber(POPULATION_2025, lang)} usually resident people as the official permanent-census figure at 31 December 2024. The età 999 rows, Totale column, of the DEMO regional file at 1 January 2025 add up to the same number. The same ISTAT page says that, for elections and referendums, the official figure is in Decree of the President of the Republic no. 53 of 3 March 2023 and refers to 31 December 2021. That decree was not read for this release, so the electoral figure is not printed here.`}
        </p>
        <p>
          {it
            ? `L'elenco ISTAT dei comuni, foglio «CODICI al 21_02_2026», ha ${formatNumber(COMUNE_COUNT, lang)} comuni e ${formatNumber(UNIT_COUNT, lang)} unità territoriali sovracomunali. La pagina ISTAT dice che dal 21 febbraio 2026 i comuni sono 7.894. Quell'elenco è successivo alla popolazione del 1° gennaio 2025: le due date non sono lo stesso conteggio.`
            : `The ISTAT list of municipalities, sheet “CODICI al 21_02_2026”, has ${formatNumber(COMUNE_COUNT, lang)} municipalities and ${formatNumber(UNIT_COUNT, lang)} supra-municipal territorial units. The ISTAT page says that from 21 February 2026 there are 7,894 municipalities. That list is later than the population at 1 January 2025: the two dates are not one count.`}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">{it ? "Cariche" : "Offices"}</h2>
        <p className="text-sm leading-6">
          {it
            ? "Il sito quirinale.it, letto il 17 ottobre 2026, chiama Sergio Mattarella Presidente della Repubblica. La data dell'elezione non è nel passo letto."
            : "The quirinale.it site, read on 17 October 2026, names Sergio Mattarella as President of the Republic. The date of the election is not in the passage that was read."}
        </p>
        <GapNote label={copy.gap} text={copy.councilGap} />
        <GapNote label={copy.gap} text={copy.candidateGap} />
        <GapNote label={copy.gap} text={copy.postcodeGap} />
        <p className="text-sm">
          <Link className="text-navy underline" href={`${path}parties/`}>{copy.parties}</Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}results/`}>{copy.results}</Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}faq/`}>{copy.faq}</Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}sources/`}>{copy.sources}</Link>
        </p>
      </section>

      <LinkGrid
        heading={copy.regions}
        items={alphaRegions().map((region) => ({
          href: regionPath(lang, region.slug),
          title: region.istatName,
          detail: `${formatNumber(region.population, lang)} · ${region.comuni} ${it ? "comuni" : "municipalities"}`,
        }))}
      />
      <p className="text-sm text-ink-muted">
        {it
          ? `${REGIONS.length} regioni. I nomi sono quelli del foglio ISTAT. L'articolo 131 della Costituzione ne elenca venti; dove la stringa differisce, la pagina regionale lo dice.`
          : `${REGIONS.length} regions. The names are the ones in the ISTAT sheet. Article 131 of the Constitution lists twenty; where the string differs, the regional page says so.`}
      </p>
    </ItalyFrame>
  );
}
