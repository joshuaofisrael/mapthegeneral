import Link from "next/link";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { ItalyFrame } from "@/app/it/frame";
import { regionChunkSentence } from "@/data/italy/comuni";
import { formatNumber } from "@/data/italy/format";
import { collegiInRegion, unitsInRegion } from "@/data/italy/level2";
import { regionBySlug, regionNeighbors, REGIONS } from "@/data/italy/places";
import { chietiByElectionPath, collegioPath, collegiIndexPath, italyChooser, italyHome, otherLang, regionPath, unitPath, unitsIndexPath } from "@/data/italy/paths";
import { italyMetadata } from "@/data/italy/seo";
import { fitDescription, fitMetaTitle } from "@/lib/snippet";
import { sourceById, sourcesById } from "@/data/italy/sources";
import type { ItLang } from "@/data/italy/types";
import { ui, unitLabel } from "@/data/italy/ui";

const RESERVED = new Set(["elections", "results", "parties", "faq", "sources", "unita", "collegi"]);

export function generateStaticParams() {
  return ["it", "en"].flatMap((lang) => REGIONS.map((region) => ({ lang, region: region.slug })));
}
export const dynamicParams = false;

function asLang(value: string): ItLang {
  if (value !== "it" && value !== "en") notFound();
  return value;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; region: string }> }) {
  const { lang: raw, region: slug } = await params;
  const lang = asLang(raw);
  const region = regionBySlug(slug);
  if (!region || RESERVED.has(slug)) return {};
  return italyMetadata({
    title: fitMetaTitle(region.istatName, lang === "it" ? "elezioni 2022" : "2022 election"),
    description: fitDescription(region.istatName, [
      lang === "it"
        ? `${region.istatName}: popolazione al 1° gennaio 2025 e seggi del 2022. Informazione non ufficiale.`
        : `${region.istatName}: population at 1 January 2025 and 2022 seats. Unofficial information.`,
    ]),
    path: regionPath(lang, slug),
    lang,
    alternatePath: regionPath(otherLang(lang), slug),
  });
}

export default async function RegionPage({ params }: { params: Promise<{ lang: string; region: string }> }) {
  const { lang: raw, region: slug } = await params;
  const lang = asLang(raw);
  const region = regionBySlug(slug);
  if (!region || RESERVED.has(slug)) notFound();
  const copy = ui(lang);
  const it = lang === "it";
  const path = regionPath(lang, slug);
  const neighbors = regionNeighbors(slug);
  const dait = sourceById("dait");
  const units = unitsInRegion(slug);
  const collegi = collegiInRegion(slug);
  const nameNote =
    region.article131Name !== region.istatName || (region.article116Name && region.article116Name !== region.istatName);
  return (
    <ItalyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.italy, path: italyChooser() },
        { name: it ? "Italia" : "Italy", path: italyHome(lang) },
        { name: region.istatName, path },
      ]}
      eyebrow={
        region.statute === "special"
          ? it
            ? "Regione a statuto speciale"
            : "Region with a special statute"
          : it
            ? "Regione"
            : "Region"
      }
      title={region.istatName}
      lede={it ? `Codice regione ISTAT ${region.code}.` : `ISTAT region code ${region.code}.`}
      officeHref={dait.url}
      officeLabel="Dipartimento per gli Affari Interni e Territoriali"
      sources={sourcesById(["istat-elenco-xlsx", "istat-codici", "demo-regioni", "cost-senato-pdf", "gu-169-2022", "dait", "anagrafe", "eligendo-home"])}
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.population}</dt>
          <dd className="mt-1 font-serif text-2xl">{formatNumber(region.population, lang)}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {it
              ? "1° gennaio 2025. Riga età 999 del file regionale DEMO."
              : "1 January 2025. Età 999 row of the DEMO regional file."}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{it ? "Comuni" : "Municipalities"}</dt>
          <dd className="mt-1 font-serif text-2xl">{formatNumber(region.comuni, lang)}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {it ? "Foglio ISTAT «CODICI al 21_02_2026»." : "ISTAT sheet “CODICI al 21_02_2026”."}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.senate}</dt>
          <dd className="mt-1 font-serif text-2xl">{region.senateSeats2022}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {it
              ? "Seggi assegnati dal decreto del 21 luglio 2022. Non è l'assegnazione di un'elezione successiva."
              : "Seats assigned by the decree of 21 July 2022. Not the allocation for a later election."}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.chamber}</dt>
          <dd className="mt-1 font-serif text-2xl">{region.chamberSeats2022}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {it
              ? "Somma dei seggi delle circoscrizioni di questa regione nello stesso decreto."
              : "Sum of the constituency seats for this region in the same decree."}
          </dd>
        </div>
      </dl>

      <section className="prose-legal">
        <h2>{it ? "Nome" : "Name"}</h2>
        {nameNote ? (
          <p>
            {it
              ? `Il foglio ISTAT stampa «${region.istatName}». L'articolo 131 stampa «${region.article131Name}».${region.article116Name ? ` L'articolo 116 stampa «${region.article116Name}».` : ""} Le stringhe sono riportate come nei testi letti.`
              : `The ISTAT sheet prints “${region.istatName}”. Article 131 prints “${region.article131Name}”.${region.article116Name ? ` Article 116 prints “${region.article116Name}”.` : ""} The strings are given as the texts that were read print them.`}
          </p>
        ) : (
          <p>
            {it
              ? `Il foglio ISTAT e l'articolo 131 stampano «${region.istatName}».`
              : `The ISTAT sheet and article 131 print “${region.istatName}”.`}
          </p>
        )}
        <p>
          {region.statute === "special"
            ? it
              ? "L'articolo 116, nel PDF del Senato letto il 17 ottobre 2026, include questa regione tra quelle con forme e condizioni particolari di autonomia, secondo lo statuto speciale adottato con legge costituzionale."
              : "Article 116, in the Senate PDF read on 17 October 2026, includes this region among those with particular forms and conditions of autonomy, under the special statute adopted by constitutional law."
            : it
              ? "L'articolo 116, nel passo letto, non nomina questa regione tra le cinque con statuto speciale."
              : "Article 116, in the passage that was read, does not name this region among the five with a special statute."}
        </p>
        <h2>{it ? "Unità sovracomunali" : "Supra-municipal units"}</h2>
        <p>
          {it
            ? "Nel foglio ISTAT la tipologia è: 1 Provincia, 2 Provincia autonoma, 3 Città metropolitana, 4 Libero consorzio di comuni, 5 Unità non amministrativa."
            : "In the ISTAT sheet the type codes are: 1 province, 2 autonomous province, 3 metropolitan city, 4 free consortium of municipalities, 5 non-administrative unit."}
        </p>
        <ul>
          {region.units.map((unit) => (
            <li key={unit.type}>
              {unitLabel(unit.type, lang)}: {unit.count}
            </li>
          ))}
        </ul>
        <p>
          <Link className="text-navy underline" href={unitsIndexPath(lang)}>
            {it ? "Indice delle unità" : "Unit index"}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={collegiIndexPath(lang)}>
            {it ? "Indice dei collegi" : "Constituency index"}
          </Link>
        </p>
        <p>{regionChunkSentence(lang, region.slug, region.comuni)}</p>
        <h2>{it ? "Elezione regionale" : "Regional election"}</h2>
        <GapNote label={copy.gap} text={copy.regionalElectionGap} />
        <h2>{it ? "Presidenza" : "Presidency"}</h2>
        <GapNote label={copy.gap} text={copy.presidentGap} />
        <p>
          <a href={sourceById("anagrafe").url} rel="noopener noreferrer">
            {it ? "Anagrafe degli amministratori locali e regionali" : "Register of local and regional office-holders"}
          </a>
        </p>
      </section>

      <p className="text-sm">
        <Link className="text-navy underline" href={`${italyHome(lang)}elections/politiche-2022/`}>
          {it ? "Seggi del 2022" : "2022 seats"}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={`${italyHome(lang)}elections/prossime-politiche/`}>
          {copy.nextElection}
        </Link>
        {region.slug === "abruzzo" ? (
          <>
            {" · "}
            <Link className="text-navy underline" href={chietiByElectionPath(lang)}>
              {it ? "Suppletiva Camera, 01-Chieti, 15-16 novembre 2026" : "Chamber by-election, 01-Chieti, 15–16 November 2026"}
            </Link>
          </>
        ) : null}
        {" · "}
        <Link className="text-navy underline" href={`${italyHome(lang)}results/`}>
          {copy.results}
        </Link>
      </p>

      <LinkGrid
        heading={it ? "Unità territoriali" : "Territorial units"}
        items={units.map((unit) => ({
          href: unitPath(lang, region.slug, unit.slug),
          title: unit.name,
          detail: `${unitLabel(unit.type, lang)} · ${unit.code}`,
        }))}
      />
      <LinkGrid
        heading={it ? "Collegi Camera e Senato" : "Chamber and Senate constituencies"}
        items={collegi.map((item) => ({
          href: collegioPath(lang, item.house, item.slug),
          title: item.name,
          detail: item.house === "camera" ? (it ? "Camera" : "Chamber") : it ? "Senato" : "Senate",
        }))}
      />

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.alphaNearby}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {neighbors.prev && (
            <li>
              <Link className="text-navy underline" href={regionPath(lang, neighbors.prev.slug)}>
                {neighbors.prev.istatName}
              </Link>
            </li>
          )}
          {neighbors.next && (
            <li>
              <Link className="text-navy underline" href={regionPath(lang, neighbors.next.slug)}>
                {neighbors.next.istatName}
              </Link>
            </li>
          )}
        </ul>
      </section>
    </ItalyFrame>
  );
}
