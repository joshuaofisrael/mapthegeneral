import raw from "./comuni-public.json";
import { formatNumber } from "./format";
import { REGIONS } from "./places";
import type { ItLang } from "./types";

export type ComuneRecord = {
  code: string;
  name: string;
  cap: boolean;
  regionSlug: string;
  unitSlug: string;
  unitName: string;
  slug: string;
};

const chunk = raw as { comuni: ComuneRecord[] };

export const COMUNI: ComuneRecord[] = chunk.comuni;

if (COMUNI.length < 100) throw new Error("Comune chunk is unexpectedly small");

const byRegion = new Map<string, number>();
for (const comune of COMUNI) byRegion.set(comune.regionSlug, (byRegion.get(comune.regionSlug) ?? 0) + 1);

export function shippedInRegion(regionSlug: string): number {
  return byRegion.get(regionSlug) ?? 0;
}

export function regionChunkSentence(lang: ItLang, regionSlug: string, total: number): string {
  const shipped = shippedInRegion(regionSlug);
  const shippedLabel = formatNumber(shipped, lang);
  const totalLabel = formatNumber(total, lang);
  if (lang === "it") {
    return shipped === total
      ? `Questa consegna ha una pagina per ciascuno dei ${totalLabel} comuni del foglio ISTAT in questa regione. L'indice è collegato da ogni unità territoriale.`
      : `Questa consegna ha una pagina per ${shippedLabel} dei ${totalLabel} comuni del foglio ISTAT in questa regione. Gli altri non sono in questo blocco. L'indice dei comuni pubblicati è collegato da ogni unità territoriale.`;
  }
  return shipped === total
    ? `This chunk has a page for each of the ${totalLabel} municipalities in the ISTAT sheet for this region. The index is linked from every territorial unit.`
    : `This chunk has a page for ${shippedLabel} of the ${totalLabel} municipalities in the ISTAT sheet for this region. The others are not in this chunk. The index of published municipalities is linked from every territorial unit.`;
}

export function chunkCoverage(): { slug: string; name: string; shipped: number; total: number }[] {
  return REGIONS.map((region) => ({
    slug: region.slug,
    name: region.istatName,
    shipped: shippedInRegion(region.slug),
    total: region.comuni,
  }));
}
