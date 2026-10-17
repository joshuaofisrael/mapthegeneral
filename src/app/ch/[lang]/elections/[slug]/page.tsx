import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { ChFrame } from "../../../frame";
import { asChLang } from "../../../lang";
import { chMetadata } from "../../../meta";
import { CantonSeatTable } from "../../../SeatTable";
import { ELECTION_SLUG, chHome } from "../../../../../../data/ch/search";
import { sourceById, sourcesById } from "../../../../../../data/ch/sources";
import { ui } from "../../../../../../data/ch/ui";

export function generateStaticParams() {
  return ["de", "fr", "it", "en"].map((lang) => ({ lang, slug: ELECTION_SLUG }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = asChLang(raw);
  if (slug !== ELECTION_SLUG) return {};
  const title =
    lang === "de"
      ? "Nationalratswahlen vom 24. Oktober 2027"
      : lang === "fr"
        ? "Élection du Conseil national du 24 octobre 2027"
        : lang === "it"
          ? "Elezione del Consiglio nazionale del 24 ottobre 2027"
          : "National Council election of 24 October 2027";
  return chMetadata({
    title,
    description:
      lang === "de"
        ? "Datum aus der Medienmitteilung des Bundesrates vom 27. August 2025 und Sitzverteilung der Verordnung vom selben Tag. Inoffizielle Information."
        : lang === "fr"
          ? "Date tirée du communiqué du Conseil fédéral du 27 août 2025 et répartition des sièges de l’ordonnance du même jour. Information non officielle."
          : lang === "it"
            ? "Data dal comunicato del Consiglio federale del 27 agosto 2025 e ripartizione dei seggi dell’ordinanza dello stesso giorno. Informazione non ufficiale."
            : "Date from the Federal Council release of 27 August 2025 and the seat allocation in the ordinance of the same day. Unofficial information.",
    path: `${chHome(lang)}elections/${ELECTION_SLUG}/`,
    lang,
  });
}

export default async function ElectionPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = asChLang(raw);
  if (slug !== ELECTION_SLUG) notFound();
  const copy = ui(lang);
  const path = `${chHome(lang)}elections/${ELECTION_SLUG}/`;
  const office = sourceById("bk-nationalrat");
  return (
    <ChFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.switzerland, path: "/ch/" },
        { name: copy.switzerland, path: chHome(lang) },
        { name: copy.elections, path: `${chHome(lang)}elections/` },
        { name: lang === "de" ? "24. Oktober 2027" : lang === "fr" ? "24 octobre 2027" : lang === "it" ? "24 ottobre 2027" : "24 October 2027", path },
      ]}
      eyebrow="SR 161.12"
      title={
        lang === "de"
          ? "Nationalratswahlen vom 24. Oktober 2027"
          : lang === "fr"
            ? "Élection du Conseil national du 24 octobre 2027"
            : lang === "it"
              ? "Elezione del Consiglio nazionale del 24 ottobre 2027"
              : "National Council election of 24 October 2027"
      }
      lede={
        lang === "de"
          ? "Verordnung vom 27. August 2025 über die Sitzverteilung bei der Gesamterneuerung des Nationalrates."
          : lang === "fr"
            ? "Ordonnance du 27 août 2025 sur la répartition des sièges lors du renouvellement intégral du Conseil national."
            : lang === "it"
              ? "Ordinanza del 27 agosto 2025 sulla ripartizione dei seggi in occasione del rinnovo integrale del Consiglio nazionale."
              : "Ordinance of 27 August 2025 on the allocation of seats for the full renewal of the National Council."
      }
      officeHref={office.url}
      sources={sourcesById(["sr-161-12", "admin-20250827", "bv-1999", "bbl-2025-2545", "bk-nationalrat", "bbl-2022-2547"])}
    >
      <section className="prose-legal">
        <h2>{lang === "de" ? "Was die gelesenen Texte sagen" : lang === "fr" ? "Ce que disent les textes lus" : lang === "it" ? "Che cosa dicono i testi letti" : "What the texts that were read say"}</h2>
        <ul>
          <li>
            {lang === "de"
              ? "Die Medienmitteilung des Bundesrates vom 27. August 2025 beginnt mit den Nationalratswahlen vom 24. Oktober 2027."
              : lang === "fr"
                ? "Le communiqué du Conseil fédéral du 27 août 2025 commence par les élections au Conseil national du 24 octobre 2027."
                : lang === "it"
                  ? "Il comunicato del Consiglio federale del 27 agosto 2025 inizia con le elezioni del Consiglio nazionale del 24 ottobre 2027."
                  : "The Federal Council release of 27 August 2025 opens with the National Council elections of 24 October 2027."}
          </li>
          <li>
            {lang === "de"
              ? "Artikel 1 der Verordnung vom selben Tag legt die 26 Sitzzahlen für die 53. Legislaturperiode fest. Sie stehen in der Tabelle. Die Verordnung stützt sich auf Artikel 16 Absatz 2 des Bundesgesetzes über die politischen Rechte und auf die Erwahrung der Wohnbevölkerungszahlen per 31. Dezember 2024."
              : lang === "fr"
                ? "L’article 1 de l’ordonnance du même jour fixe les 26 nombres de sièges pour la 53e législature. Ils sont dans le tableau. L’ordonnance se fonde sur l’article 16, alinéa 2, de la loi fédérale sur les droits politiques et sur l’arrêté constatant les chiffres de la population au 31 décembre 2024."
                : lang === "it"
                  ? "L’articolo 1 dell’ordinanza dello stesso giorno fissa le 26 cifre di seggi per la 53ª legislatura. Stanno nella tabella. L’ordinanza poggia sull’articolo 16 capoverso 2 della legge federale sui diritti politici e sull’accertamento delle cifre della popolazione al 31 dicembre 2024."
                  : "Article 1 of the ordinance of the same day sets the 26 seat counts for the 53rd legislative period. They are in the table. The ordinance rests on article 16 paragraph 2 of the Federal Act on Political Rights and on the ascertainment of the population figures at 31 December 2024."}
          </li>
          <li>
            {lang === "de"
              ? "Artikel 2 hebt die Verordnung vom 1. September 2021 auf das Ende der 52. Legislaturperiode (5. Dezember 2027) auf. Artikel 3: Die Verordnung vom 27. August 2025 tritt am 1. Januar 2026 in Kraft und gilt bis zum Ende der 53. Legislaturperiode (30. November 2031)."
              : lang === "fr"
                ? "L’article 2 abroge l’ordonnance du 1er septembre 2021 à la fin de la 52e législature (5 décembre 2027). Article 3 : l’ordonnance du 27 août 2025 entre en vigueur le 1er janvier 2026 et vaut jusqu’à la fin de la 53e législature (30 novembre 2031)."
                : lang === "it"
                  ? "L’articolo 2 abroga l’ordinanza del 1° settembre 2021 alla fine della 52ª legislatura (5 dicembre 2027). Articolo 3: l’ordinanza del 27 agosto 2025 entra in vigore il 1° gennaio 2026 e vale fino alla fine della 53ª legislatura (30 novembre 2031)."
                  : "Article 2 repeals the ordinance of 1 September 2021 at the end of the 52nd legislative period (5 December 2027). Article 3: the ordinance of 27 August 2025 enters into force on 1 January 2026 and applies until the end of the 53rd legislative period (30 November 2031)."}
          </li>
          <li>
            {lang === "de"
              ? "Die Mitteilung sagt, dass in Wahlkreisen mit nur einem Nationalratssitz die Wahl im Majorzverfahren stattfindet, und verweist für das Verteilungsverfahren auf Artikel 17 des Bundesgesetzes über die politischen Rechte. Den Wortlaut von Artikel 17 hat diese Ausgabe nicht aus der Systematischen Rechtssammlung abgeschrieben."
              : lang === "fr"
                ? "Le communiqué dit que, dans les circonscriptions à un seul siège, l’élection a lieu au système majoritaire, et renvoie pour la procédure de répartition à l’article 17 de la loi fédérale sur les droits politiques. Cette édition n’a pas recopié le texte de l’article 17 depuis le recueil systématique."
                : lang === "it"
                  ? "Il comunicato dice che nei circondari con un solo seggio l’elezione si svolge con il sistema maggioritario e rinvia per il procedimento di ripartizione all’articolo 17 della legge federale sui diritti politici. Questa edizione non ha ricopiato il testo dell’articolo 17 dal diritto sistematico."
                  : "The release says that in constituencies with only one National Council seat the election is by majority, and it points to article 17 of the Federal Act on Political Rights for the allocation method. This release did not copy the wording of article 17 from the classified compilation."}
          </li>
        </ul>
        <p>
          <a href="https://www.admin.ch/de/newnsb/vSue6NEwJdNUFXHNhHUUs" rel="noopener noreferrer">
            {lang === "de" ? "Mitteilung des Bundesrates" : lang === "fr" ? "Communiqué du Conseil fédéral" : lang === "it" ? "Comunicato del Consiglio federale" : "Federal Council release"}
          </a>
        </p>
      </section>
      <section>
        <h2 className="font-serif text-2xl font-semibold">
          {lang === "de" ? "Sitze nach Artikel 1" : lang === "fr" ? "Sièges selon l’article 1" : lang === "it" ? "Seggi secondo l’articolo 1" : "Seats under article 1"}
        </h2>
        <div className="mt-4">
          <CantonSeatTable lang={lang} />
        </div>
      </section>
      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">{copy.candidates}</h2>
        <GapNote label={copy.gap} text={copy.candidateGap} />
        <p className="text-sm">
          <Link className="text-navy underline" href={`${chHome(lang)}candidates/`}>
            {copy.candidates}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${chHome(lang)}results/`}>
            {copy.results}
          </Link>
        </p>
      </section>
    </ChFrame>
  );
}
