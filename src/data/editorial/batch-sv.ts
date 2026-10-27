import type { EditorialPreview } from "./model";

const PRESS = "https://tse.gob.sv/publico/prensa/373";
const CAL = "https://tse.gob.sv/docs/calendarios/CALENDARIO-TSE-NACIONAL.pdf";
const CODE =
  "https://tse.gob.sv/storage/documentos/20250512115356-c9f0f895fb98ab9159f51fd0297e236d-XhNHWzttAO.pdf";

const EN_CITES = [
  { label: "Supreme Electoral Tribunal, press note of 10 December 2025", href: PRESS },
  { label: "Supreme Electoral Tribunal, national electoral calendar", href: CAL },
  { label: "Electoral Code, text on the Tribunal site", href: CODE },
];

const ES_CITES = [
  { label: "Tribunal Supremo Electoral, comunicado del 10 de diciembre de 2025", href: PRESS },
  { label: "Tribunal Supremo Electoral, calendario electoral nacional", href: CAL },
  { label: "Código Electoral, texto en el sitio del Tribunal", href: CODE },
];

export const BATCH_SV: EditorialPreview[] = [
  {
    path: "/sv/en/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: "Sources for this preview",
    paragraphs: [
      "This hub describes El Salvador’s elections on Sunday 28 February 2027. The Supreme Electoral Tribunal’s press note of 10 December 2025 says that day stayed in place, in the country and abroad, for the presidency, legislative seats and municipal councils. The national electoral calendar prints the same Sunday. This release has no municipality pages. It does not supply a polling day the Tribunal did not print.",
      "The Electoral Code read on 27 October 2026 sets the hours. Article 190 says the receiving boards are installed at 06:00 so that voting begins at 07:00. Article 198 says voting is continuous and ends at 17:00. Article 189 says the electoral package is to be on hand by 05:00. That earlier clock time is delivery of materials. It is not the hour voting opens. The calendar does not print these hours. They are taken from the Code. Times on this hub are El Salvador time, UTC−6.",
      "Article 5 says a person must be on the electoral register, prepared by the Tribunal, in order to vote. Article 6 treats obtaining the Documento Único de Identidad as a duty for exercising the vote. Article 31 says the current Documento Único de Identidad is the only document that accredits a person to cast a vote. Article 196 says the board requires that document and checks that the person appears on the electoral roll. This hub publishes no roll and no identity number.",
      "The December 2025 note sets requests for the presidency, the vice presidency and legislative seats from 1 October through 19 November 2026, and municipal-council requests from 9 through 19 November 2026. On 27 October 2026 that window was still open. No closed list in ballot order was opened, so this hub prints no names. A name belongs on the election page when the Tribunal publishes that closed list.",
      "Article 176 forbids publishing survey results or projections that indicate a trend, from fifteen days before election day until the results are declared firm. The calendar marks 12 February 2027 as the last publication day and a bar from 13 February 2027 through 1 April 2027. This site publishes no such figure and no projection on any day, including after 17:00. No count is shown before 17:00 on 28 February 2027. No table from an earlier election was copied. An earlier count stays on the Tribunal’s own site.",
    ],
    citations: EN_CITES,
  },
  {
    path: "/sv/es/",
    lang: "es",
    heading: "Vista editorial",
    updatedLocal: "Última actualización: 27 de octubre de 2026.",
    sourcesHeading: "Fuentes de esta vista",
    paragraphs: [
      "Esta guía describe las elecciones de El Salvador del domingo 28 de febrero de 2027. El comunicado del Tribunal Supremo Electoral del 10 de diciembre de 2025 dice que esa fecha se mantuvo, en el país y en el exterior, para la presidencia, las diputaciones y los concejos municipales. El calendario electoral nacional imprime el mismo domingo. Esta edición no tiene páginas de municipios. No añade un día que el Tribunal no haya impreso.",
      "El Código Electoral leído el 27 de octubre de 2026 fija el horario. El artículo 190 dice que las juntas receptoras se instalan a las 06:00 para que la votación comience a las 07:00. El artículo 198 dice que la votación es continua y termina a las 17:00. El artículo 189 pone el paquete electoral a disposición a más tardar a las 05:00. Esa hora es la entrega del material. No es la hora en que abre la votación. El calendario no imprime esas horas. Salen del Código. Aquí se usa la hora de El Salvador, UTC−6.",
      "El artículo 5 dice que para votar hay que estar inscrito en el registro electoral que elabora el Tribunal. El artículo 6 trata de obtener el Documento Único de Identidad como un deber para ejercer el voto. El artículo 31 dice que el Documento Único de Identidad vigente es el único que acredita para emitir el voto. El artículo 196 exige ese documento y la verificación en el padrón. Esta guía no publica padrón ni número de identidad.",
      "El comunicado de diciembre de 2025 fija las solicitudes de presidencia, vicepresidencia y diputaciones del 1 de octubre al 19 de noviembre de 2026, y las de concejos municipales del 9 al 19 de noviembre de 2026. El 27 de octubre de 2026 ese plazo seguía abierto. No había una lista cerrada en orden de papeleta, así que esta guía no imprime nombres. Un nombre entra en la página de la elección cuando el Tribunal publique esa lista cerrada.",
      "El artículo 176 prohíbe publicar resultados de estudios de opinión o proyecciones que indiquen una tendencia, desde quince días antes hasta que los resultados queden firmes. El calendario marca el 12 de febrero de 2027 como última fecha de publicación y una prohibición del 13 de febrero de 2027 al 1 de abril de 2027. Este sitio no publica esas cifras ni una proyección ningún día, tampoco después de las 17:00. No hay escrutinio aquí antes de las 17:00 del 28 de febrero de 2027. No se copió un cuadro de una elección anterior. Ese escrutinio queda en el sitio del Tribunal.",
    ],
    citations: ES_CITES,
  },
  {
    path: "/sv/en/elections/general-2027/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: "Sources for this preview",
    paragraphs: [
      "Sunday 28 February 2027 is the day the Supreme Electoral Tribunal kept for El Salvador’s elections of president and vice president, the Legislative Assembly, and the municipal councils. The press note is dated 10 December 2025. It says the day applies in the country and abroad. The national electoral calendar prints the same election-day row. This page follows those two texts. It does not move the Sunday.",
      "Voting hours are in the Electoral Code, not in the calendar. Article 190 installs the receiving boards at 06:00 so voting can begin at 07:00. Article 198 keeps voting continuous and ends it at 17:00. Article 189 requires the electoral package by 05:00, which is a delivery deadline. A reader who treats 05:00 as the opening of the poll is reading a different row. This page shows no count before 17:00, El Salvador time, on election day.",
      "Who may vote is also in the Code. Article 5 requires inscription on the Tribunal’s electoral register. Article 6 and article 31 tie the vote to the current Documento Único de Identidad. Article 196 has the board demand that document and confirm the person on the roll before a ballot is issued. None of those articles is reprinted in full here. The page is a reading of the sentences that set the condition and the document.",
      "Candidacy requests, on the December 2025 note, run from 1 October through 19 November 2026 for the presidency, the vice presidency and legislative seats, and from 9 through 19 November 2026 for municipal councils. The window was still open on 27 October 2026. There was no closed ballot-order list to copy, and this page does not invent an order. When the Tribunal publishes that list, the names can be copied from it, in the order it prints.",
      "Article 176 bars publication of survey results and of projections that indicate a trend, from fifteen days before election day until the results are declared firm. The calendar’s own rows put the last publication day on 12 February 2027 and the bar from 13 February through 1 April 2027. This site prints none of those figures, before 17:00 or after it. A Tribunal figure may be shown only once the close has passed, and only as a copy of the Tribunal’s count. No earlier election’s vote table is reprinted on this page.",
    ],
    citations: EN_CITES,
  },
  {
    path: "/sv/es/elections/generales-2027/",
    lang: "es",
    heading: "Vista editorial",
    updatedLocal: "Última actualización: 27 de octubre de 2026.",
    sourcesHeading: "Fuentes de esta vista",
    paragraphs: [
      "El domingo 28 de febrero de 2027 es el día que el Tribunal Supremo Electoral mantuvo para las elecciones de presidente y vicepresidente, la Asamblea Legislativa y los concejos municipales. El comunicado lleva fecha del 10 de diciembre de 2025. Dice que el día vale en el país y en el exterior. El calendario electoral nacional imprime la misma fila. Esta página sigue esos dos textos. No mueve el domingo.",
      "El horario está en el Código Electoral, no en el calendario. El artículo 190 instala las juntas receptoras a las 06:00 para que la votación pueda empezar a las 07:00. El artículo 198 mantiene la votación continua y la cierra a las 17:00. El artículo 189 exige el paquete electoral a las 05:00, y esa fila es un plazo de entrega. Quien lea las 05:00 como apertura de la votación está leyendo otra fila. Esta página no muestra un escrutinio antes de las 17:00, hora de El Salvador, el día de la elección.",
      "Quién puede votar también está en el Código. El artículo 5 exige la inscripción en el registro electoral del Tribunal. Los artículos 6 y 31 atan el voto al Documento Único de Identidad vigente. El artículo 196 pide ese documento y la comprobación en el padrón antes de entregar la papeleta. Esos artículos no se copian enteros. La página lee las frases que fijan la condición y el documento.",
      "Las solicitudes de candidatura, según el comunicado de diciembre de 2025, van del 1 de octubre al 19 de noviembre de 2026 para presidencia, vicepresidencia y diputaciones, y del 9 al 19 de noviembre de 2026 para concejos municipales. El 27 de octubre de 2026 el plazo seguía abierto. No había una lista cerrada en orden de papeleta que copiar, y esta página no inventa un orden. Cuando el Tribunal publique esa lista, los nombres podrán copiarse de ella, en el orden que imprima.",
      "El artículo 176 impide publicar resultados de estudios de opinión y proyecciones que indiquen una tendencia, desde quince días antes hasta que los resultados queden firmes. Las filas del calendario ponen la última fecha de publicación el 12 de febrero de 2027 y la prohibición del 13 de febrero al 1 de abril de 2027. Este sitio no imprime esas cifras, ni antes ni después de las 17:00. Una cifra del Tribunal puede mostrarse solo después del cierre, y solo como copia del escrutinio del Tribunal. No se reimprime aquí el cuadro de votos de una elección anterior.",
    ],
    citations: ES_CITES,
  },
];
