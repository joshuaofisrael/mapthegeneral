import plurinominales from "./plurinominales.json";

export type Plurinominal = {
  id: string;
  name: string;
  entidadPrinted: string;
  circ: number;
  seatPrinted: string;
};

export type CircunscripcionEntity = {
  /** Name printed in acuerdo INE/CG130/2023, punto PRIMERO. */
  acuerdo: string;
  slug: string;
};

export type Circunscripcion = {
  number: 1 | 2 | 3 | 4 | 5;
  /** Phrase after "con sede en" in punto SEGUNDO of INE/CG130/2023. */
  sede: string;
  entities: CircunscripcionEntity[];
};

export const CIRCUNSCRIPCIONES: Circunscripcion[] = [
  {
    number: 1,
    sede: "la ciudad de Guadalajara, Jalisco",
    entities: [
      { acuerdo: "Baja California", slug: "baja-california" },
      { acuerdo: "Baja California Sur", slug: "baja-california-sur" },
      { acuerdo: "Chihuahua", slug: "chihuahua" },
      { acuerdo: "Durango", slug: "durango" },
      { acuerdo: "Jalisco", slug: "jalisco" },
      { acuerdo: "Nayarit", slug: "nayarit" },
      { acuerdo: "Sinaloa", slug: "sinaloa" },
      { acuerdo: "Sonora", slug: "sonora" },
    ],
  },
  {
    number: 2,
    sede: "la ciudad de Monterrey, Nuevo León",
    entities: [
      { acuerdo: "Aguascalientes", slug: "aguascalientes" },
      { acuerdo: "Coahuila", slug: "coahuila-de-zaragoza" },
      { acuerdo: "Guanajuato", slug: "guanajuato" },
      { acuerdo: "Nuevo León", slug: "nuevo-leon" },
      { acuerdo: "San Luis Potosí", slug: "san-luis-potosi" },
      { acuerdo: "Tamaulipas", slug: "tamaulipas" },
      { acuerdo: "Zacatecas", slug: "zacatecas" },
    ],
  },
  {
    number: 3,
    sede: "la ciudad de Xalapa-Enríquez, Veracruz de Ignacio de la Llave",
    entities: [
      { acuerdo: "Campeche", slug: "campeche" },
      { acuerdo: "Chiapas", slug: "chiapas" },
      { acuerdo: "Oaxaca", slug: "oaxaca" },
      { acuerdo: "Quintana Roo", slug: "quintana-roo" },
      { acuerdo: "Tabasco", slug: "tabasco" },
      { acuerdo: "Veracruz", slug: "veracruz-de-ignacio-de-la-llave" },
      { acuerdo: "Yucatán", slug: "yucatan" },
    ],
  },
  {
    number: 4,
    sede: "la Ciudad de México",
    entities: [
      { acuerdo: "Ciudad de México", slug: "ciudad-de-mexico" },
      { acuerdo: "Guerrero", slug: "guerrero" },
      { acuerdo: "Hidalgo", slug: "hidalgo" },
      { acuerdo: "Morelos", slug: "morelos" },
      { acuerdo: "Puebla", slug: "puebla" },
      { acuerdo: "Tlaxcala", slug: "tlaxcala" },
    ],
  },
  {
    number: 5,
    sede: "la ciudad de Toluca de Lerdo, Estado de México",
    entities: [
      { acuerdo: "Colima", slug: "colima" },
      { acuerdo: "México", slug: "mexico" },
      { acuerdo: "Michoacán", slug: "michoacan-de-ocampo" },
      { acuerdo: "Querétaro", slug: "queretaro" },
    ],
  },
];

export const PLURINOMINALES = plurinominales as Plurinominal[];

const counts = [1, 2, 3, 4, 5].map(
  (number) => PLURINOMINALES.filter((row) => row.circ === number).length,
);
if (PLURINOMINALES.length !== 200 || counts.some((count) => count !== 40)) {
  throw new Error("Mexico plurinominal directory checksum failed");
}

export function circunscripcionByNumber(number: number): Circunscripcion | undefined {
  return CIRCUNSCRIPCIONES.find((row) => row.number === number);
}

export function circunscripcionForEntity(slug: string): Circunscripcion | undefined {
  return CIRCUNSCRIPCIONES.find((row) => row.entities.some((entity) => entity.slug === slug));
}

export function plurinominalesByCirc(number: number): Plurinominal[] {
  return PLURINOMINALES.filter((row) => row.circ === number);
}
