import { MexicoFrame } from "@/app/mx/_components/Frame";
import { PARTIES } from "@/data/mx/parties";
import { mexicoHome } from "@/data/mx/paths";
import { sourceById } from "@/data/mx/sources";
import { ui } from "@/data/mx/ui";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${mexicoHome(lang)}parties/`;
  return pageMetadata({
    title: lang === "es" ? "Partidos políticos nacionales" : "National political parties",
    description:
      lang === "es"
        ? "Partidos que el directorio del INE lista con registro nacional, en la lectura del 17 de octubre de 2026. Información no oficial."
        : "Parties the INE directory lists with national registration, in the reading of 17 October 2026. Unofficial information.",
    path,
    lang,
    alternatePath: `${mexicoHome(lang === "es" ? "en" : "es")}parties/`,
  });
}

export default async function PartiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = `${mexicoHome(lang)}parties/`;
  const es = lang === "es";
  const ine = sourceById("ine-partidos");
  return (
    <MexicoFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.mexico, path: "/mx/" },
        { name: es ? "México" : "Mexico", path: mexicoHome(lang) },
        { name: copy.parties, path },
      ]}
      title={es ? "Partidos políticos nacionales" : "National political parties"}
      lede={
        es
          ? "El directorio del INE dice que estos partidos tienen registro ante el Instituto y pueden participar en elecciones federales de diputaciones, senadurías y Presidencia, y en elecciones locales. Esta página no es una lista de candidaturas de 2027."
          : "The INE directory says these parties are registered with the Institute and may take part in federal elections for deputies, the Senate, and the Presidency, and in local elections. This page is not a list of 2027 candidacies."
      }
      officeHref={ine.url}
      officeLabel="Instituto Nacional Electoral"
      sources={[ine]}
    >
      <div className="prose-legal">
        <p>
          {es
            ? `En la lectura del 17 de octubre de 2026 el directorio imprime ${PARTIES.length} bloques. Los nombres de los cargos se dejan como están escritos. El Partido del Trabajo lleva la nota de que sus órganos de representación son colegiados.`
            : `In the reading of 17 October 2026 the directory prints ${PARTIES.length} blocks. Post titles are left as written. Partido del Trabajo carries the note that its representative bodies are collegiate.`}
        </p>
      </div>
      <ul className="space-y-6">
        {PARTIES.map((party) => (
          <li key={party.name} className="rounded-xl border border-line bg-paper-card p-4">
            <h2 className="font-serif text-xl font-semibold">{party.name}</h2>
            <ul className="mt-2 space-y-1 text-sm leading-6">
              {party.posts.map((post) => (
                <li key={post}>{post}</li>
              ))}
              {party.registered && (
                <li>
                  {es ? "Fecha de registro impresa: " : "Registration date as printed: "}
                  {party.registered}
                </li>
              )}
            </ul>
            {(es ? party.noteEs : party.noteEn) && (
              <p className="mt-2 text-sm leading-6 text-ink-muted">{es ? party.noteEs : party.noteEn}</p>
            )}
          </li>
        ))}
      </ul>
    </MexicoFrame>
  );
}
