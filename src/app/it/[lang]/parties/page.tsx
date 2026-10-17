import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { ItalyFrame } from "@/app/it/frame";
import { italyChooser, italyHome, otherLang } from "@/data/italy/paths";
import { italyMetadata } from "@/data/italy/seo";
import { sourceById, sourcesById } from "@/data/italy/sources";
import type { ItLang } from "@/data/italy/types";
import { ui } from "@/data/italy/ui";

export function generateStaticParams() {
  return [{ lang: "it" }, { lang: "en" }];
}
export const dynamicParams = false;

function asLang(value: string): ItLang {
  if (value !== "it" && value !== "en") notFound();
  return value;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = `${italyHome(lang)}parties/`;
  return italyMetadata({
    title: lang === "it" ? "Partiti" : "Parties",
    description:
      lang === "it"
        ? "Questa consegna non elenca i partiti. Le candidature non sono riprodotte."
        : "This release does not list parties. Candidacies are not reprinted.",
    path,
    lang,
    alternatePath: `${italyHome(otherLang(lang))}parties/`,
  });
}

export default async function PartiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const it = lang === "it";
  const path = `${italyHome(lang)}parties/`;
  const dait = sourceById("dait");
  return (
    <ItalyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.italy, path: italyChooser() },
        { name: it ? "Italia" : "Italy", path: italyHome(lang) },
        { name: copy.parties, path },
      ]}
      title={it ? "Partiti e liste" : "Parties and lists"}
      lede={
        it
          ? "Un elenco di partiti esiste, per queste pagine, quando una fonte ufficiale letta lo stampa. Questa consegna non lo riproduce."
          : "For these pages, a party list exists when an official source that was read prints it. This release does not reprint one."
      }
      officeHref={dait.url}
      officeLabel="Dipartimento per gli Affari Interni e Territoriali"
      sources={sourcesById(["dait", "eligendo-home", "cost-titolo-i"])}
    >
      <GapNote label={copy.gap} text={copy.candidateGap} />
      <div className="prose-legal">
        <p>
          {it
            ? "La pagina non riassume i requisiti per presentare una lista e non spiega come si presenta una candidatura. Il registro dei partiti non è riprodotto."
            : "The page does not summarise the requirements for filing a list and does not explain how to file a candidacy. The register of parties is not reprinted."}
        </p>
      </div>
    </ItalyFrame>
  );
}
