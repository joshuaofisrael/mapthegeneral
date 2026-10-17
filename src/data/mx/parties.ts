/** Lines copied from the INE national-party directory read on 17 October 2026. */
export type PartyRow = {
  name: string;
  posts: string[];
  registered?: string;
  noteEs?: string;
  noteEn?: string;
};

export const PARTIES: PartyRow[] = [
  {
    name: "Partido Acción Nacional",
    posts: ["Presidencia: C. Jorge Romero Herrera", "Secretaría: C. Karen Michel González Márquez"],
    registered: "30 de marzo de 1946",
  },
  {
    name: "Partido Revolucionario Institucional",
    posts: [
      "Presidencia: C. Rafael Alejandro Moreno Cárdenas",
      "Secretaría general: C. Alma Carolina Viggiano Austria",
    ],
    registered: "30 de marzo 1946",
  },
  {
    name: "Partido Verde Ecologista de México",
    posts: [
      "Secretaría Ejecutiva: C. Pilar Guerrero Rubio",
      "Secretaría Técnica: C. Gabriela Aguilar García",
    ],
    registered: "13 de enero de 1993",
  },
  {
    name: "Partido del Trabajo",
    posts: [
      "Comisión Coordinadora Nacional: CC. Alberto Anaya Gutiérrez, Ángel Benjamín Robles Montoya, Francisco Amadeo Espinosa Ramos, Geovanna del Carmen Bañuelos de la Torre",
      "Secretaría Técnica: C. Silvano Garay Ulloa",
    ],
    registered: "13 de enero 1993",
    noteEs:
      "El directorio imprime «ver más» después de esos nombres. Esta página no completa la comisión.",
    noteEn:
      "The directory prints “ver más” after those names. This page does not complete the commission.",
  },
  {
    name: "Movimiento Ciudadano",
    posts: ["Coordinación: C. Jorge Álvarez Máynez"],
    registered: "30 de junio de 1999",
    noteEs:
      "El directorio marca este partido con la nota de que, conforme a sus estatutos, los cargos de representación usan una figura distinta de la Presidencia y la Secretaría General.",
    noteEn:
      "The directory marks this party with the note that, under its statutes, the representative offices use a figure other than a presidency and a general secretariat.",
  },
  {
    name: "morena",
    posts: ["Presidencia: C. Ariadna Montiel Reyes", "Secretaría General: C. Carolina Rangel Gracida"],
    registered: "9 de julio de 2014",
  },
  {
    name: "Partido PAZ",
    posts: ["C. Ernesto Guerra Mota"],
    noteEs:
      "En el texto leído, el directorio imprime ese nombre y no imprime un cargo ni una fecha de registro en el bloque de Partido PAZ.",
    noteEn:
      "In the text that was read, the directory prints that name and does not print a post or a registration date in the Partido PAZ block.",
  },
  {
    name: "SOMOS",
    posts: [
      "Presidencia: C. Guadalupe Acosta Naranjo",
      "Secretaría General: C. Cecilia Guadalupe Soto González",
    ],
    registered: "25 de junio de 2026",
    noteEs:
      "El bloque también imprime los nombres de C. Emilio Álvarez Icaza Longoria y C. Marco Antonio Baños Martínez sin un cargo en el texto leído. Esta página no les asigna uno.",
    noteEn:
      "The block also prints C. Emilio Álvarez Icaza Longoria and C. Marco Antonio Baños Martínez without a post in the text that was read. This page does not assign them one.",
  },
];
