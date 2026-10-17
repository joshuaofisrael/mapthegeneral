import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { SpainFrame } from "@/components/SpainFrame";
import { PROVINCES, CITIES } from "@/data/spain/places";
import { sourceById, sourcesById } from "@/data/spain/sources";
import { ui } from "@/data/spain/ui";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";
import { communityPath, provincePath, spainHome } from "@/lib/routes";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${spainHome(lang)}candidates/`;
  return pageMetadata({
    title: lang === "es" ? "Candidaturas" : "Candidates",
    description:
      lang === "es"
        ? "Índice de candidaturas por circunscripción. Las listas proclamadas del 29 de noviembre de 2026 aún no están en el BOE en la lectura del 17 de octubre de 2026."
        : "Constituency index for candidacies. Proclaimed lists for 29 November 2026 were not in the BOE in the reading of 17 October 2026.",
    path,
    lang,
    alternatePath: `${spainHome(lang === "es" ? "en" : "es")}candidates/`,
  });
}

export default async function CandidatesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = `${spainHome(lang)}candidates/`;
  const es = lang === "es";
  const jec = sourceById("jec-candidaturas");
  const rows = [
    ...PROVINCES.map((province) => ({
      name: province.decreeName,
      href: provincePath(lang, province.communitySlug, province.slug),
    })),
    ...CITIES.map((city) => ({ name: city.decreeName, href: communityPath(lang, city.slug) })),
  ].sort((a, b) => a.name.localeCompare(b.name, "es"));

  return (
    <SpainFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.spain, path: "/es/" },
        { name: es ? "España" : "Spain", path: spainHome(lang) },
        { name: copy.candidates, path },
      ]}
      title={es ? "Candidaturas proclamadas" : "Proclaimed candidacies"}
      lede={
        es
          ? "No hay fichas de candidatos en esta entrega. Cuando el BOE publique las listas proclamadas, irán en /candidates/ y en la página de cada circunscripción."
          : "There are no candidate profiles in this release. When the BOE publishes the proclaimed lists, they will be linked from /candidates/ and from each constituency page."
      }
      officeHref={jec.url}
      officeLabel="Junta Electoral Central"
      sources={sourcesById(["jec-candidaturas", "jec-calendario", "rd-806-2026"])}
    >
      <GapNote label={copy.gap} text={copy.candidateGap} />
      <p className="text-sm">
        <Link className="text-navy underline" href={`${path}awaiting-proclamation/`}>
          {es ? "Ficha de espera, sin nombres" : "Holding page, with no names"}
        </Link>
      </p>
      <section>
        <h2 className="font-serif text-2xl font-semibold">{es ? "Circunscripciones" : "Constituencies"}</h2>
        <ul className="mt-4 columns-1 gap-x-8 text-sm sm:columns-2 lg:columns-3">
          {rows.map((row) => (
            <li key={row.href} className="mb-1">
              <Link className="text-navy underline" href={row.href}>
                {row.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </SpainFrame>
  );
}
