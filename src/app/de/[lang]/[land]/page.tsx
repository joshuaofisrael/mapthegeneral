import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { GermanyFrame } from "@/app/de/frame";
import { alphaLands, landBySlug, landNeighbors } from "@/data/de/lands";
import { sourceById, sourcesById } from "@/data/de/sources";
import { ui } from "@/data/de/ui";
import { dePageMetadata } from "@/data/de/seo";
import {
  DE_LANGS,
  germanyChooser,
  germanyHome,
  landPath,
  otherLang,
} from "@/data/de/paths";
import type { ChamberKind, DeLang } from "@/data/de/types";
import { notFound } from "next/navigation";

function asDeLang(value: string): DeLang {
  if (value !== "de" && value !== "en") notFound();
  return value;
}

function chamberLabel(kind: ChamberKind, lang: DeLang): string {
  if (kind === "abgeordnetenhaus") return "Abgeordnetenhaus";
  if (kind === "buergerschaft") return "Bürgerschaft";
  return lang === "de" ? "Landtag" : "Landtag";
}

export function generateStaticParams() {
  return DE_LANGS.flatMap((lang) => alphaLands().map((land) => ({ lang, land: land.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; land: string }>;
}) {
  const { lang: raw, land: slug } = await params;
  const lang = asDeLang(raw);
  const land = landBySlug(slug);
  if (!land) return {};
  return dePageMetadata({
    title: land.name,
    description:
      lang === "de"
        ? `${land.name}: nächste Landtagswahl in der Bundesratstabelle vom 21. September 2026. Keine amtliche Information.`
        : `${land.name}: next parliamentary election in the Bundesrat table of 21 September 2026. Unofficial information.`,
    path: landPath(lang, slug),
    lang,
    alternatePath: landPath(otherLang(lang), slug),
  });
}

export default async function LandPage({
  params,
}: {
  params: Promise<{ lang: string; land: string }>;
}) {
  const { lang: raw, land: slug } = await params;
  const lang = asDeLang(raw);
  const land = landBySlug(slug);
  if (!land) notFound();
  const copy = ui(lang);
  const de = lang === "de";
  const path = landPath(lang, slug);
  const neighbors = landNeighbors(slug);
  const office = sourceById("bundesrat-landtag");
  const chamber = chamberLabel(land.chamber, lang);

  return (
    <GermanyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.germany, path: germanyChooser() },
        { name: de ? "Deutschland" : "Germany", path: germanyHome(lang) },
        { name: land.name, path },
      ]}
      eyebrow={de ? "Land" : "Land"}
      title={land.name}
      lede={
        de
          ? `Der Bundesrat nennt die Volksvertretung der Länder Landtag, in Berlin Abgeordnetenhaus und in Hamburg und Bremen Bürgerschaft. Hier: ${chamber}.`
          : `The Bundesrat calls the Land parliament a Landtag, the Abgeordnetenhaus in Berlin, and the Bürgerschaft in Hamburg and Bremen. Here: ${chamber}.`
      }
      officeHref={land.parliamentUrl}
      officeLabel={chamber}
      sources={sourcesById(["bundesrat-landtag", "bwl-2029"])}
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.nextElection}</dt>
          <dd className="mt-1 font-serif text-2xl">{land.nextLabel}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {de
              ? "Tabelle „Termine der Landtagswahlen“, Stand 21.09.2026."
              : "Table “Termine der Landtagswahlen”, as of 21 September 2026."}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.turnus}</dt>
          <dd className="mt-1 font-serif text-2xl">{land.turnus}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {de ? "Dieselbe Tabelle." : "The same table."}
          </dd>
        </div>
      </dl>

      <section className="prose-legal">
        <h2>{copy.parliament}</h2>
        <p>
          <a href={land.parliamentUrl} rel="noopener noreferrer">
            {chamber} {land.name}
          </a>
        </p>
        <h2>{copy.nextElection}</h2>
        {land.nextIsDate ? (
          <p>
            {de
              ? `Die Zelle lautet „${land.nextLabel}“. Der Hinweis unter der Tabelle sagt, dass Termine erst nach ihrer amtlichen Bekanntgabe in der Übersicht erscheinen.`
              : `The cell reads “${land.nextLabel}”. The note under the table says dates are published in the overview only after they have been officially announced.`}
          </p>
        ) : (
          <p>
            {de
              ? `Die Zelle lautet „${land.nextLabel}“. Das Wort „voraussichtlich“ bleibt stehen. Diese Seite setzt keinen Kalendertag.`
              : `The cell reads “${land.nextLabel}”. The word “voraussichtlich” is left as printed. This page does not set a calendar day.`}
          </p>
        )}
        <p>
          {de
            ? "Ein Wahlergebnis einer bereits zurückliegenden Landtagswahl wird hier nicht abgeschrieben. Diese Seite sagt nicht, wer eine Wahl gewonnen hat."
            : "A result of a Land election already held is not copied here. This page does not say who won an election."}
        </p>
        <h2>{copy.government}</h2>
        <p>
          <a href={land.governmentUrl} rel="noopener noreferrer">
            {land.governmentUrl}
          </a>
        </p>
        <GapNote label={copy.gap} text={copy.officeholderGap} />
        <GapNote label={copy.gap} text={copy.localGap} />
        <p>
          <Link className="text-navy underline" href={germanyHome(lang)}>
            {de ? "Bundesebene" : "Federal page"}
          </Link>
          {" · "}
          <a className="text-navy underline" href={office.url} rel="noopener noreferrer">
            {de ? "Bundesratstabelle" : "Bundesrat table"}
          </a>
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.alphaNearby}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {neighbors.prev && (
            <li>
              <Link className="text-navy underline" href={landPath(lang, neighbors.prev.slug)}>
                {neighbors.prev.name}
              </Link>
            </li>
          )}
          {neighbors.next && (
            <li>
              <Link className="text-navy underline" href={landPath(lang, neighbors.next.slug)}>
                {neighbors.next.name}
              </Link>
            </li>
          )}
        </ul>
      </section>
    </GermanyFrame>
  );
}
