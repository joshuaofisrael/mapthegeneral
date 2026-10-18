import { COLLEGI, UNITS } from "./level2";
import { alphaRegions } from "./places";
import { collegioPath, collegiIndexPath, italyChooser, italyHome, regionPath, unitPath, unitsIndexPath } from "./paths";
import type { ItLang } from "./types";

export type ItalyIndexEntry = {
  path: string;
  lang: ItLang | "en-only";
  title: string;
  kind: string;
  text: string;
};

function fixed(lang: ItLang): ItalyIndexEntry[] {
  const home = italyHome(lang);
  const it = lang === "it";
  return [
    { path: home, lang, title: it ? "Italia" : "Italy", kind: "country", text: "Italia Italy Repubblica" },
    { path: `${home}elections/`, lang, title: it ? "Elezioni" : "Elections", kind: "elections", text: "elezioni politiche camera senato" },
    {
      path: `${home}elections/politiche-2022/`,
      lang,
      title: it ? "Elezioni politiche del 25 settembre 2022" : "General election of 25 September 2022",
      kind: "election",
      text: "25 settembre 2022 DPR 97/2022 Camera Senato",
    },
    {
      path: `${home}elections/prossime-politiche/`,
      lang,
      title: it ? "Prossime elezioni politiche" : "Next general election",
      kind: "election",
      text: "articolo 60 articolo 61 cinque anni data non fissata",
    },
    { path: `${home}results/`, lang, title: it ? "Risultati" : "Results", kind: "results", text: "Eligendo 25 settembre 2022" },
    { path: `${home}parties/`, lang, title: it ? "Partiti" : "Parties", kind: "parties", text: "partiti liste" },
    { path: `${home}faq/`, lang, title: it ? "Domande frequenti" : "FAQ", kind: "faq", text: "faq" },
    { path: `${home}sources/`, lang, title: it ? "Fonti" : "Sources", kind: "sources", text: "fonti ISTAT Gazzetta Ufficiale" },
  ];
}

export function italySearchEntries(): ItalyIndexEntry[] {
  const chooser: ItalyIndexEntry = {
    path: italyChooser(),
    lang: "en-only",
    title: "Italy",
    kind: "country",
    text: "Italia Italy elezioni politiche",
  };
  const regions = (["en", "it"] as const).flatMap((lang) =>
    alphaRegions().map((region) => ({
      path: regionPath(lang, region.slug),
      lang,
      title: region.istatName,
      kind: "region",
      text: `${region.istatName} ${region.article131Name} ${region.code}`,
    })),
  );
  const indexes = (["en", "it"] as const).flatMap((lang) => [
    {
      path: unitsIndexPath(lang),
      lang,
      title: lang === "it" ? "Unità territoriali" : "Territorial units",
      kind: "index",
      text: "province città metropolitane liberi consorzi ISTAT",
    },
    {
      path: collegiIndexPath(lang),
      lang,
      title: lang === "it" ? "Collegi elettorali" : "Electoral constituencies",
      kind: "index",
      text: "collegi uninominali plurinominali camera senato",
    },
  ]);
  const units = (["en", "it"] as const).flatMap((lang) =>
    UNITS.map((unit) => ({
      path: unitPath(lang, unit.regionSlug, unit.slug),
      lang,
      title: unit.name,
      kind: "unit",
      text: `${unit.name} ${unit.code} ${unit.regionSlug}`,
    })),
  );
  const collegi = (["en", "it"] as const).flatMap((lang) =>
    COLLEGI.map((item) => ({
      path: collegioPath(lang, item.house, item.slug),
      lang,
      title: item.name,
      kind: item.kind,
      text: `${item.name} ${item.house} ${item.circoscrizione} ${item.regionName}`,
    })),
  );
  return [chooser, ...fixed("en"), ...fixed("it"), ...regions, ...indexes, ...units, ...collegi];
}
