import { alphaRegions } from "./places";
import { italyChooser, italyHome, regionPath } from "./paths";
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
  return [chooser, ...fixed("en"), ...fixed("it"), ...regions];
}
