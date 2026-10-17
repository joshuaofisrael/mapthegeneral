import raw from "./mayors.json";
import { pageMunicipalities } from "./municipalities";
import type { Lang } from "./types";

export type Mayor = {
  code5: string;
  /** Six-digit Código INE as printed in the mayors file. */
  code6: string;
  given: string;
  surname1: string;
  surname2: string;
  role: string;
  since: string;
  list: string;
};

type Row = [string, string, string, string, string, string, string];

const data = raw as unknown as Record<string, Row>;

function toMayor(code5: string, row: Row): Mayor {
  return {
    code5,
    code6: row[0],
    given: row[1],
    surname1: row[2],
    surname2: row[3],
    role: row[4],
    since: row[5],
    list: row[6],
  };
}

const byCode = new Map<string, Mayor>();
for (const [code5, row] of Object.entries(data)) {
  if (!/^\d{5}$/.test(code5) || row[0] !== `${code5}${row[0].slice(5)}` || row[0].length !== 6) {
    throw new Error(`Bad mayor row ${code5}`);
  }
  byCode.set(code5, toMayor(code5, row));
}

const required = new Set(pageMunicipalities().map((item) => item.code));
required.add("51001");
required.add("52001");
for (const code of required) {
  if (!byCode.has(code)) throw new Error(`Mayors file has no row for ${code}`);
}
if (byCode.size !== 8132) throw new Error(`Expected 8132 mayor rows, got ${byCode.size}`);

const madrid = byCode.get("28079");
if (
  !madrid ||
  madrid.code6 !== "280796" ||
  madrid.given !== "José Luis" ||
  madrid.surname1 !== "Martínez-Almeida" ||
  madrid.surname2 !== "Navasqües" ||
  madrid.role !== "Alcalde" ||
  madrid.since !== "17/06/2023" ||
  madrid.list !== "PP"
) {
  throw new Error("Madrid mayor row failed the fixed check");
}

export function mayorByCode(code5: string): Mayor | undefined {
  return byCode.get(code5);
}

/** Prints the cells with the column labels from the workbook. Does not restyle the name. */
export function mayorSentence(mayor: Mayor, lang: Lang): string {
  const surname2 =
    mayor.surname2.trim().length > 0
      ? `«${mayor.surname2}»`
      : lang === "es"
        ? "en blanco"
        : "blank";
  const cells = `Código INE ${mayor.code6}, Nombre «${mayor.given}», 1er Apellido «${mayor.surname1}», 2º Apellido ${surname2}, Cargo «${mayor.role}», Fecha de Posesión ${mayor.since}, Partido «${mayor.list}»`;
  return lang === "es"
    ? `La Ficha de Alcaldes de la Legislatura 2023 imprime ${cells}.`
    : `The Ficha de Alcaldes de la Legislatura 2023 prints ${cells}.`;
}
