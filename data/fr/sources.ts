import type { SourceRef } from "./types";

const READ = "2026-10-17";

export const SOURCES: SourceRef[] = [
  {
    id: "sp-f1939",
    name: "Service-Public, « Quelles sont les dates des prochaines élections ? » (F1939), vérifié le 1er juillet 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1939",
    readOn: READ,
  },
  {
    id: "sp-f1940",
    name: "Service-Public, « Élection présidentielle » (F1940), vérifié le 1er juillet 2026",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1940",
    readOn: READ,
  },
  {
    id: "sp-a15053",
    name: "Service-Public, « Les dates de l'élection présidentielle de 2027 sont annoncées » (A15053), publié le 2 juillet 2026",
    url: "https://www.service-public.gouv.fr/particuliers/actualites/A15053",
    readOn: READ,
  },
  {
    id: "insee-cog-2026",
    name: "Insee, Code officiel géographique au 1er janvier 2026",
    url: "https://www.insee.fr/fr/information/8740222",
    readOn: READ,
  },
  {
    id: "insee-pop-2023",
    name: "Insee, Populations de référence 2023, authentifiées par le décret n° 2025-1362 du 26 décembre 2025",
    url: "https://www.insee.fr/fr/statistiques/8681011",
    readOn: READ,
  },
  {
    id: "insee-ensemble-2023",
    name: "Insee, fichier d'ensemble des populations en 2023, France hors Mayotte",
    url: "https://www.insee.fr/fr/statistiques/8680726?sommaire=8681011",
    readOn: READ,
  },
  {
    id: "info-gouv-gouvernement",
    name: "info.gouv.fr, Composition du Gouvernement, annoncé le 26/02/2026",
    url: "https://www.info.gouv.fr/composition-du-gouvernement",
    readOn: READ,
  },
  {
    id: "jorf-gouvernement-20260222",
    name: "Décret du 22 février 2026 relatif à la composition du Gouvernement, en vigueur au 17 octobre 2026 (JORFTEXT000053525953)",
    url: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000053525953",
    readOn: READ,
  },
  {
    id: "elections-interieur",
    name: "Ministère de l'Intérieur, Les élections en France",
    url: "https://www.elections.interieur.gouv.fr/",
    readOn: READ,
  },
  {
    id: "laposte-postcodes",
    name: "La Poste, Base officielle des codes postaux, jeu référencé sur data.gouv.fr",
    url: "https://www.data.gouv.fr/datasets/base-officielle-des-codes-postaux",
    readOn: READ,
  },
];

const BY_ID = new Map(SOURCES.map((source) => [source.id, source]));

export function sourceById(id: string): SourceRef {
  const source = BY_ID.get(id);
  if (!source) throw new Error(`Unknown France source ${id}`);
  return source;
}

export function sourcesById(ids: string[]): SourceRef[] {
  return ids.map((id) => sourceById(id));
}
