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

export function deliverySentence(lang: ItLang): string {
  const rows = chunkCoverage();
  const shipped = rows.reduce((sum, row) => sum + row.shipped, 0);
  const total = rows.reduce((sum, row) => sum + row.total, 0);
  const full = rows.filter((row) => row.shipped === row.total).map((row) => row.name);
  const partial = rows.filter((row) => row.shipped > 0 && row.shipped < row.total);
  const shippedLabel = formatNumber(shipped, lang);
  const totalLabel = formatNumber(total, lang);
  const fullLabel = full.join(", ");
  const partialLabel = partial
    .map((row) => `${row.name} (${formatNumber(row.shipped, lang)}/${formatNumber(row.total, lang)})`)
    .join(", ");
  if (lang === "it") {
    return `Questa consegna pubblica ${shippedLabel} dei ${totalLabel} comuni del foglio. Ogni capoluogo segnato nel foglio ha una pagina. Regioni complete: ${fullLabel}. Regioni pubblicate in parte: ${partialLabel}. Il 25 ottobre 2026 la pagina Speciale elezioni non pubblica un elenco dei comuni che votano nel 2027: nomina il turno straordinario del 15-16 novembre 2026. Lo stesso giorno è stato letto l'elenco del Dipartimento per le amministrative del primo semestre 2026, che non è un elenco del 2027. L'ordine dopo i capoluogo resta quindi Lombardia, Lazio, Campania, Sicilia e poi le regioni con più comuni.`;
  }
  return `This delivery publishes ${shippedLabel} of the ${totalLabel} municipalities in the sheet. Every capoluogo flagged in the sheet has a page. Complete regions: ${fullLabel}. Partly published regions: ${partialLabel}. On 25 October 2026 the Speciale elezioni page did not publish a list of municipalities voting in 2027: it names the extraordinary round of 15–16 November 2026. The Department's first-semester 2026 administrative list, read the same day, is not a 2027 list. The order after the capoluoghi therefore remains Lombardia, Lazio, Campania, Sicilia, then the regions with the most municipalities.`;
}
