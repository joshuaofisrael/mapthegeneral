import { GapNote } from "@/components/GapNote";
import { ChFrame } from "../../frame";
import { asChLang } from "../../lang";
import { chMetadata } from "../../meta";
import { alphaCantons } from "../../../../../data/ch/cantons";
import { cantonPath, chHome } from "../../../../../data/ch/search";
import Link from "@/components/AnchorLink";
import { sourceById, sourcesById } from "../../../../../data/ch/sources";
import { ui } from "../../../../../data/ch/ui";

export function generateStaticParams() {
  return [{ lang: "de" }, { lang: "fr" }, { lang: "it" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asChLang((await params).lang);
  const copy = ui(lang);
  return chMetadata({
    title: lang === "en" ? "Switzerland candidates" : copy.candidates,
    description:
      lang === "de"
        ? "Keine Kandidaturenliste für den 24. Oktober 2027 war am 17. Oktober 2026 gelesen. Diese Seite nennt keine Namen."
        : lang === "fr"
          ? "Aucune liste de candidatures pour le 24 octobre 2027 n’avait été lue le 17 octobre 2026. Cette page ne donne aucun nom."
          : lang === "it"
            ? "Il 17 ottobre 2026 non era stata letta una lista di candidature per il 24 ottobre 2027. Questa pagina non indica nomi."
            : "No candidacy list for 24 October 2027 had been read on 17 October 2026. This page names no one.",
    path: `${chHome(lang)}candidates/`,
    lang,
  });
}

export default async function CandidatesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asChLang((await params).lang);
  const copy = ui(lang);
  const path = `${chHome(lang)}candidates/`;
  const office = sourceById("bk-nationalrat");
  return (
    <ChFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.switzerland, path: "/ch/" },
        { name: copy.switzerland, path: chHome(lang) },
        { name: copy.candidates, path },
      ]}
      title={copy.candidates}
      lede={
        lang === "de"
          ? "Einzelne Kandidaturen folgen erst, wenn eine amtliche Liste gelesen ist. Diese Ausgabe druckt keine Namen."
          : lang === "fr"
            ? "Les candidatures individuelles viendront lorsqu’une liste officielle aura été lue. Cette édition n’imprime aucun nom."
            : lang === "it"
              ? "Le candidature singole arriveranno quando sarà stata letta una lista ufficiale. Questa edizione non stampa nomi."
              : "Individual candidacies will follow once an official list has been read. This release prints no names."
      }
      officeHref={office.url}
      sources={sourcesById(["bk-nationalrat", "admin-20250827"])}
    >
      <GapNote label={copy.gap} text={copy.candidateGap} />
      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.cantons}</h2>
        <ul className="mt-4 columns-1 gap-x-8 text-sm sm:columns-2 lg:columns-3">
          {alphaCantons().map((canton) => (
            <li key={canton.slug} className="mb-1">
              <Link className="text-navy underline" href={cantonPath(lang, canton.slug)}>
                {canton.officialName}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </ChFrame>
  );
}
