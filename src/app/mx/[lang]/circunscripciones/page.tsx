import Link from "@/components/AnchorLink";
import { MexicoFrame } from "@/app/mx/_components/Frame";
import {
  CIRCUNSCRIPCIONES,
  plurinominalesByCirc,
} from "@/data/mx/circunscripciones";
import { DIRECTORY_PRINTED_DATE } from "@/data/mx/distritos";
import { entityBySlug } from "@/data/mx/entities";
import { circunscripcionesPath, entityPath, mexicoHome } from "@/data/mx/paths";
import { sourcesById } from "@/data/mx/sources";
import { ui } from "@/data/mx/ui";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const path = circunscripcionesPath(lang);
  return pageMetadata({
    title: lang === "es" ? "Circunscripciones plurinominales" : "Plurinominal constituencies",
    description:
      lang === "es"
        ? "Las cinco circunscripciones electorales plurinominales federales del acuerdo INE/CG130/2023 y los nombres que el directorio de la Cámara imprime en cada una. Información no oficial."
        : "The five federal plurinominal constituencies in agreement INE/CG130/2023 and the names the Chamber directory prints in each one. Unofficial information.",
    path,
    lang,
    alternatePath: circunscripcionesPath(lang === "es" ? "en" : "es"),
  });
}

export default async function CircunscripcionesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const path = circunscripcionesPath(lang);
  const es = lang === "es";
  return (
    <MexicoFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.mexico, path: "/mx/" },
        { name: es ? "México" : "Mexico", path: mexicoHome(lang) },
        { name: copy.circunscripciones, path },
      ]}
      eyebrow={es ? "Representación proporcional" : "Proportional representation"}
      title={es ? "Circunscripciones plurinominales" : "Plurinominal constituencies"}
      lede={
        es
          ? "El acuerdo INE/CG130/2023, aprobado el 27 de febrero de 2023, fija cinco circunscripciones y la sede de cada una. El acuerdo INE/CG526/2026 incorpora ese ámbito para los procesos de 2026-2027."
          : "Agreement INE/CG130/2023, approved on 27 February 2023, sets five constituencies and the seat of each one. Agreement INE/CG526/2026 incorporates that territory for the 2026-2027 processes."
      }
      officeHref="https://www.dof.gob.mx/nota_detalle_popup.php?codigo=5684199"
      officeLabel="Diario Oficial de la Federación"
      sources={sourcesById(["ine-cg130-2023", "ine-cg526-2026", "lgipe", "camara-lxvi", "ine-2027", "ine-jornada-2024"])}
    >
      <div className="prose-legal">
        <p>
          {es
            ? "El artículo 214, párrafo 4, de la Ley General de Instituciones y Procedimientos Electorales, leído el 18 de octubre de 2026, dice que para la elección de los 200 diputados de representación proporcional el Consejo General aprueba la conformación de las cinco circunscripciones. La página del INE para 2027 imprime 200 cargos de representación proporcional y fija la jornada el 6 de junio de 2027. Una nota del INE del 5 de junio de 2024 dice que la jornada federal anterior fue el 2 de junio de 2024. Esta página no reproduce el escrutinio ni asigna escaños."
            : "Article 214, paragraph 4, of the General Law of Electoral Institutions and Procedures, read on 18 October 2026, says that for the election of the 200 proportional-representation deputies the General Council approves the make-up of the five constituencies. The INE page for 2027 prints 200 proportional-representation seats and sets polling day on 6 June 2027. An INE note of 5 June 2024 says the previous federal polling day was 2 June 2024. This page does not reprint the count and does not assign seats."}
        </p>
        <p>
          {es
            ? `El directorio de la Cámara imprime «${DIRECTORY_PRINTED_DATE}». La lectura es del 18 de octubre de 2026. Abajo están las personas cuya celda dice Circ. 1, Circ. 2, Circ. 3, Circ. 4 o Circ. 5, en el orden de esa lista. Hay 40 nombres en cada número. Esta página no dice que la ley fije 40 escaños por circunscripción: dice lo que el directorio imprime.`
            : `The Chamber directory prints “${DIRECTORY_PRINTED_DATE}”. It was read on 18 October 2026. Below are the people whose cell says Circ. 1, Circ. 2, Circ. 3, Circ. 4, or Circ. 5, in the order of that list. There are 40 names under each number. This page does not say the statute sets 40 seats per constituency: it says what the directory prints.`}
        </p>
        <p className="rounded-xl border border-line bg-paper-card p-4 text-sm">{copy.groupGap}</p>
      </div>

      {CIRCUNSCRIPCIONES.map((circ) => (
        <section key={circ.number} id={`circunscripcion-${circ.number}`}>
          <h2 className="font-serif text-2xl font-semibold">
            {es ? `Circunscripción ${circ.number}` : `Constituency ${circ.number}`}
          </h2>
          <p className="mt-3 text-sm leading-6">
            {es
              ? `El punto SEGUNDO del acuerdo dice: sede en ${circ.sede}.`
              : `Point SEGUNDO of the agreement says: seat in ${circ.sede}.`}
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {circ.entities.map((item) => {
              const entity = entityBySlug(item.slug);
              return (
                <li key={item.slug}>
                  <Link className="text-navy underline" href={entityPath(lang, item.slug)}>
                    {item.acuerdo}
                  </Link>
                  {entity && entity.name !== item.acuerdo
                    ? es
                      ? ` — el catálogo del INEGI imprime «${entity.name}».`
                      : ` — the INEGI catalog prints “${entity.name}”.`
                    : ""}
                </li>
              );
            })}
          </ul>
          <h3 className="mt-4 font-serif text-xl font-semibold">
            {es ? "Nombres en el directorio" : "Names in the directory"}
          </h3>
          <ul className="mt-2 space-y-1 text-sm">
            {plurinominalesByCirc(circ.number).map((person) => (
              <li key={person.id}>
                <a className="text-navy underline" href={`https://sitl.diputados.gob.mx/LXVI_leg/curricula.php?dipt=${person.id}`}>
                  {person.name}
                </a>
                {` — ${person.entidadPrinted} — ${person.seatPrinted}`}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </MexicoFrame>
  );
}
