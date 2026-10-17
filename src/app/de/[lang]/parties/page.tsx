import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { GermanyFrame } from "@/app/de/frame";
import { BUNDESTAG_2025_SEATS } from "@/data/de/result";
import { formatNumber } from "@/data/de/format";
import { sourceById, sourcesById } from "@/data/de/sources";
import { ui } from "@/data/de/ui";
import { dePageMetadata } from "@/data/de/seo";
import {
  DE_LANGS,
  germanyChooser,
  germanyHome,
  otherLang,
  partiesPath,
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
  const path = partiesPath(lang);
  return dePageMetadata({
    title: lang === "de" ? "Parteien" : "Parties",
    description:
      lang === "de"
        ? "Parteien mit Sitzen im 21. Deutschen Bundestag nach dem endgültigen Ergebnis vom 14. März 2025. Keine Wahlempfehlung."
        : "Parties with seats in the 21st German Bundestag in the final result of 14 March 2025. Not a voting recommendation.",
    path,
    lang,
    alternatePath: partiesPath(otherLang(lang)),
  });
}

export default async function PartiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asDeLang((await params).lang);
  const copy = ui(lang);
  const de = lang === "de";
  const path = partiesPath(lang);
  const office = sourceById("bwl-2025-result");
  return (
    <GermanyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.germany, path: germanyChooser() },
        { name: de ? "Deutschland" : "Germany", path: germanyHome(lang) },
        { name: copy.parties, path },
      ]}
      title={de ? "Parteien mit Sitzen" : "Parties with seats"}
      lede={
        de
          ? "Nur die Parteien, die in der Sitztafel der Pressemitteilung Nr. 29/25 stehen. Die Reihenfolge ist die der Sitztafel. Das ist keine Empfehlung."
          : "Only the parties in the seat table of press release 29/25. The order is the order of that table. This is not a recommendation."
      }
      officeHref={office.url}
      officeLabel="Die Bundeswahlleiterin"
      sources={sourcesById(["bwl-2025-result", "bwl-2029"])}
    >
      <ul className="space-y-4">
        {BUNDESTAG_2025_SEATS.map((row) => (
          <li key={row.shortName} className="rounded-xl border border-line bg-paper-card p-4">
            <h2 className="font-serif text-xl font-semibold">{row.fullName}</h2>
            <p className="mt-1 text-sm text-ink-muted">
              {row.shortName} · {formatNumber(row.seats, lang)} {de ? "Sitze" : "seats"} · {row.secondVoteShare}
            </p>
          </li>
        ))}
      </ul>
      <GapNote label={copy.gap} text={copy.candidateGap} />
      <p className="text-sm">
        <Link className="text-navy underline" href={resultsPath(lang)}>
          {de ? "Sitztafel" : "Seat table"}
        </Link>
      </p>
    </GermanyFrame>
  );
}
