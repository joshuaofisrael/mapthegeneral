import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { ChFrame } from "../../frame";
import { asChLang } from "../../lang";
import { chMetadata } from "../../meta";
import { CANTONS, cantonBySlug, cantonNeighbors } from "../../../../../data/ch/cantons";
import { districtsForCanton, SOLE_DISTRICT_NAME } from "../../../../../data/ch/districts";
import { membersFor } from "../../../../../data/ch/members";
import { cantonPath, chHome, districtPath, districtsIndexPath, electionPath } from "../../../../../data/ch/search";
import { sourceById, sourcesById } from "../../../../../data/ch/sources";
import type { ChLang } from "../../../../../data/ch/types";
import { formatNumber, ui } from "../../../../../data/ch/ui";

const OFFICE = sourceById("bk-nationalrat");

export function generateStaticParams() {
  return ["de", "fr", "it", "en"].flatMap((lang) => CANTONS.map((canton) => ({ lang, canton: canton.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; canton: string }> }) {
  const { lang: raw, canton: slug } = await params;
  const lang = asChLang(raw);
  const canton = cantonBySlug(slug);
  if (!canton) return {};
  const description =
    lang === "en"
      ? `${canton.officialName}: permanent resident population at the end of 2024, National Council seats for 2027, and Council of States seats. Unofficial information.`
      : lang === "de"
        ? `${canton.officialName}: ständige Wohnbevölkerung Ende 2024, Nationalratssitze 2027 und Ständeratssitze. Inoffizielle Information.`
        : lang === "fr"
          ? `${canton.officialName} : population résidante permanente fin 2024, sièges au Conseil national pour 2027 et sièges au Conseil des États. Information non officielle.`
          : `${canton.officialName}: popolazione residente permanente fine 2024, seggi al Consiglio nazionale per il 2027 e seggi al Consiglio degli Stati. Informazione non ufficiale.`;
  return chMetadata({
    title: canton.officialName,
    description,
    path: cantonPath(lang, slug),
    lang,
  });
}

export default async function CantonPage({ params }: { params: Promise<{ lang: string; canton: string }> }) {
  const { lang: raw, canton: slug } = await params;
  const lang = asChLang(raw);
  const canton = cantonBySlug(slug);
  if (!canton) notFound();
  const copy = ui(lang);
  const path = cantonPath(lang, slug);
  const neighbors = cantonNeighbors(slug);
  const names =
    lang === "de"
      ? `BFS-Kantonsverzeichnis: «${canton.officialName}». Artikel 1 der Bundesverfassung: «${canton.article1Name}». Artikel 1 der Sitzverordnung: «${canton.ordinanceName}».`
      : lang === "fr"
        ? `Fichier cantonal de l’OFS : «${canton.officialName}». Article 1 de la Constitution fédérale : «${canton.article1Name}». Article 1 de l’ordonnance sur les sièges : «${canton.ordinanceName}».`
        : lang === "it"
          ? `File cantonale dell’UST: «${canton.officialName}». Articolo 1 della Costituzione federale: «${canton.article1Name}». Articolo 1 dell’ordinanza sui seggi: «${canton.ordinanceName}».`
          : `BFS canton file: “${canton.officialName}”. Article 1 of the Federal Constitution: “${canton.article1Name}”. Article 1 of the seat ordinance: “${canton.ordinanceName}”.`;

  return (
    <ChFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.switzerland, path: "/ch/" },
        { name: copy.switzerland, path: chHome(lang) },
        { name: canton.officialName, path },
      ]}
      eyebrow={copy.cantons}
      title={canton.officialName}
      lede={canton.abbr}
      officeHref={OFFICE.url}
      sources={sourcesById(["bv-1999", "bbl-2025-2545", "sr-161-12", "admin-20250827", "agvch", "agvch-hist", "opendata-hgv", "bk-nationalrat", "parlament-2023", "parlament-members", "parlament-opendata"])}
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.population}</dt>
          <dd className="mt-1 font-serif text-2xl">{formatNumber(canton.population2024, lang)}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {lang === "de"
              ? "Ständige Wohnbevölkerung Ende 2024. BBl 2025 2545."
              : lang === "fr"
                ? "Population résidante permanente, fin 2024. BBl 2025 2545."
                : lang === "it"
                  ? "Popolazione residente permanente, fine 2024. Testo tedesco BBl 2025 2545."
                  : "Permanent resident population at the end of 2024. BBl 2025 2545."}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.nationalCouncil}</dt>
          <dd className="mt-1 font-serif text-2xl">{canton.nationalCouncil2027}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {lang === "de"
              ? `Verordnung vom 27. August 2025, Artikel 1, «${canton.ordinanceName}».`
              : lang === "fr"
                ? `Ordonnance du 27 août 2025, article 1, «${canton.ordinanceName}».`
                : lang === "it"
                  ? `Ordinanza del 27 agosto 2025, articolo 1, «${canton.ordinanceName}».`
                  : `Ordinance of 27 August 2025, article 1, “${canton.ordinanceName}”.`}
            {canton.previousNationalCouncil
              ? lang === "de"
                ? ` Die Mitteilung vom selben Tag nennt für diesen Kanton bisher ${canton.previousNationalCouncil} Sitze.`
                : lang === "fr"
                  ? ` Le communiqué du même jour indique ${canton.previousNationalCouncil} sièges auparavant pour ce canton.`
                  : lang === "it"
                    ? ` Il comunicato dello stesso giorno indica ${canton.previousNationalCouncil} seggi in precedenza per questo cantone.`
                    : ` The release of the same day states ${canton.previousNationalCouncil} seats previously for this canton.`
              : ""}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.councilOfStates}</dt>
          <dd className="mt-1 font-serif text-2xl">{canton.councilOfStates}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {lang === "de"
              ? "Artikel 150 der Bundesverfassung, Stand 1. Januar 2024."
              : lang === "fr"
                ? "Article 150 de la Constitution fédérale, état au 1er janvier 2024."
                : lang === "it"
                  ? "Articolo 150 della Costituzione federale, stato al 1° gennaio 2024."
                  : "Article 150 of the Federal Constitution, status on 1 January 2024."}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {lang === "de" ? "Gemeinden im Verzeichnis" : lang === "fr" ? "Communes dans le répertoire" : lang === "it" ? "Comuni nel repertorio" : "Municipalities in the register"}
          </dt>
          <dd className="mt-1 font-serif text-2xl">{formatNumber(canton.municipalities, lang)}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {lang === "de"
              ? `${canton.districtNames} Bezirksnamen im historisierten Gemeindeverzeichnis, Stand 1. Januar 2026.`
              : lang === "fr"
                ? `${canton.districtNames} noms de district dans le répertoire historisé, état au 1er janvier 2026.`
                : lang === "it"
                  ? `${canton.districtNames} nomi di distretto nel repertorio storicizzato, stato al 1° gennaio 2026.`
                  : `${canton.districtNames} district names in the historized commune register, state at 1 January 2026.`}
          </dd>
        </div>
      </dl>

      <section className="prose-legal">
        <h2>{lang === "de" ? "Namen" : lang === "fr" ? "Noms" : lang === "it" ? "Nomi" : "Names"}</h2>
        <p>{names}</p>
        <p>
          {lang === "de"
            ? "Die nächste Nationalratswahl, die der Bundesrat für den 24. Oktober 2027 nennt, ist eine eidgenössische Wahl. Der Kanton ist der Wahlkreis (Artikel 149 Absatz 3)."
            : lang === "fr"
              ? "La prochaine élection du Conseil national, que le Conseil fédéral date du 24 octobre 2027, est une élection fédérale. Le canton est la circonscription (article 149, alinéa 3)."
              : lang === "it"
                ? "La prossima elezione del Consiglio nazionale, che il Consiglio federale data al 24 ottobre 2027, è un’elezione federale. Il cantone è il circondario (articolo 149 capoverso 3)."
                : "The next National Council election, which the Federal Council dates at 24 October 2027, is a federal election. The canton is the constituency (article 149 paragraph 3)."}
        </p>
        <p>
          <Link className="text-navy underline" href={electionPath(lang)}>
            {copy.nextElection}
          </Link>
        </p>
        <h2>{copy.government}</h2>
        <GapNote label={copy.gap} text={copy.governmentGap} />
        <MemberLists lang={lang} abbr={canton.abbr} />
        <h2>{copy.nextElection}</h2>
        <GapNote label={copy.gap} text={copy.cantonalElectionGap} />
        <GapNote label={copy.gap} text={copy.districtGap} />
        {slug === "ai" && (
          <p>
            {lang === "de"
              ? "Die Seite des Parlaments zu den Wahlen 2023 schreibt, dass in Appenzell Innerrhoden die Landsgemeinde die Ständevertretung jeweils im April vor den Nationalratswahlen wählt. Ein Tag im April 2027 steht dort nicht."
              : lang === "fr"
                ? "La page du Parlement sur les élections de 2023 écrit qu’à Appenzell Innerrhoden la Landsgemeinde élit la députation au Conseil des États en avril avant les élections du Conseil national. Elle n’y donne pas de jour d’avril 2027."
                : lang === "it"
                  ? "La pagina del Parlamento sulle elezioni 2023 scrive che in Appenzell Innerrhoden la Landsgemeinde elegge la deputazione al Consiglio degli Stati in aprile prima delle elezioni del Consiglio nazionale. Non vi indica un giorno di aprile 2027."
                  : "The parliament page on the 2023 elections writes that in Appenzell Innerrhoden the Landsgemeinde elects the Council of States deputy each April before the National Council elections. It does not give an April 2027 day."}
          </p>
        )}
      </section>

      <DistrictLinks lang={lang} abbr={canton.abbr} />

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.alphaNearby}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {neighbors.prev && (
            <li>
              <Link className="text-navy underline" href={cantonPath(lang, neighbors.prev.slug)}>
                {neighbors.prev.officialName}
              </Link>
            </li>
          )}
          {neighbors.next && (
            <li>
              <Link className="text-navy underline" href={cantonPath(lang, neighbors.next.slug)}>
                {neighbors.next.officialName}
              </Link>
            </li>
          )}
        </ul>
      </section>
    </ChFrame>
  );
}

function MemberLists({ lang, abbr }: { lang: ChLang; abbr: string }) {
  const copy = ui(lang);
  const national = membersFor(abbr, "N");
  const states = membersFor(abbr, "S");
  const note =
    lang === "de"
      ? "Parlamentsdienste, Webservice councillors/basicdetails, heruntergeladen am 18. Oktober 2026. Die Funktionsbezeichnung ist die Zeichenfolge des Dienstes und wird hier nicht in Ratspräsidium und Fraktionspräsidium aufgeteilt. Keine amtliche Veröffentlichung der Parlamentsdienste. Keine privaten Kontaktdaten."
      : lang === "fr"
        ? "Services du Parlement, service web councillors/basicdetails, téléchargé le 18 octobre 2026. La fonction est la chaîne du service et n’est pas séparée ici entre présidence du conseil et présidence de groupe. Ceci n’est pas une publication officielle des Services du Parlement. Aucune donnée de contact privée."
        : lang === "it"
          ? "Servizi del Parlamento, servizio web councillors/basicdetails, scaricato il 18 ottobre 2026. La funzione è la stringa del servizio e qui non è divisa tra presidenza del consiglio e presidenza di gruppo. Non è una pubblicazione ufficiale dei Servizi del Parlamento. Nessun dato di contatto privato."
          : "Parliamentary Services, web service councillors/basicdetails, downloaded on 18 October 2026. Party and function strings below are the German response. The same service with lang=en returned the French strings, which are on the French page. The function string is not split here into chamber office and group office. This is not an official publication of the Parliamentary Services. No private contact details.";
  return (
    <section>
      <h2 className="font-serif text-2xl font-semibold">{copy.nationalCouncil}</h2>
      <p className="text-sm text-ink-muted">{note}</p>
      <MemberList lang={lang} members={national} />
      <h2 className="mt-6 font-serif text-2xl font-semibold">{copy.councilOfStates}</h2>
      <MemberList lang={lang} members={states} />
    </section>
  );
}

function MemberList({ lang, members }: { lang: ChLang; members: ReturnType<typeof membersFor> }) {
  const text = lang === "en" ? "de" : lang;
  return (
    <ul className="mt-3 space-y-1 text-sm">
      {members.map((member) => {
        const label = member[text];
        return (
          <li key={member.id}>
            <a className="text-navy underline" href={member.biographyUrl} rel="noopener noreferrer">
              {member.lastName} {member.firstName}
            </a>
            {` — ${label.party} · ${label.partyName} · ${label.functionLabel}`}
          </li>
        );
      })}
    </ul>
  );
}

function DistrictLinks({ lang, abbr }: { lang: ChLang; abbr: string }) {
  const copy = ui(lang);
  const districts = districtsForCanton(abbr);
  if (districts.length === 0) {
    const name = SOLE_DISTRICT_NAME[abbr];
    return (
      <p className="text-sm">
        {lang === "de"
          ? `Das historisierte Verzeichnis führt für diesen Kanton einen einzigen Bezirkseintrag: «${name}». Dafür gibt es keine eigene Seite.`
          : lang === "fr"
            ? `Le répertoire historisé ne contient pour ce canton qu’une entrée de district : «${name}». Elle n’a pas de page propre.`
            : lang === "it"
              ? `Il repertorio storicizzato ha per questo cantone una sola voce di distretto: «${name}». Non ha una pagina propria.`
              : `The historized register has one district entry for this canton: “${name}”. It does not have a page of its own.`}
        {" "}
        <Link className="text-navy underline" href={districtsIndexPath(lang)}>
          {copy.districts}
        </Link>
      </p>
    );
  }
  const canton = CANTONS.find((item) => item.abbr === abbr);
  return (
    <div>
      <LinkGrid
        heading={copy.districts}
        items={districts.map((district) => ({
          href: districtPath(lang, canton?.slug ?? abbr.toLowerCase(), district.slug),
          title: district.officialName,
          detail: district.bfsNumber,
        }))}
      />
      <p className="text-sm">
        <Link className="text-navy underline" href={districtsIndexPath(lang)}>
          {copy.districts}
        </Link>
      </p>
    </div>
  );
}
