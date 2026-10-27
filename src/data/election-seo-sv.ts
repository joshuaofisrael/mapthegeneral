/**
 * El Salvador: presidential, legislative and municipal elections,
 * Sunday 28 February 2027. Hours are Electoral Code articles 190 and 198.
 * The candidate file stays empty: registration was still open on 27 October 2026.
 */
import type { ElectionSeoProfile } from "./election-seo";

const PRESS = "https://tse.gob.sv/publico/prensa/373";
const CAL = "https://tse.gob.sv/docs/calendarios/CALENDARIO-TSE-NACIONAL.pdf";
const CODE =
  "https://tse.gob.sv/storage/documentos/20250512115356-c9f0f895fb98ab9159f51fd0297e236d-XhNHWzttAO.pdf";
const TSE = "https://tse.gob.sv/";
const ES = "/sv/es/elections/generales-2027/";
const EN = "/sv/en/elections/general-2027/";
const OPEN = "2027-02-28T17:00:00-06:00";

const alternates = [
  { hreflang: "es", path: ES },
  { hreflang: "en", path: EN },
  { hreflang: "x-default", path: ES },
];

const pressEs = { label: "comunicado del 10 de diciembre de 2025", href: PRESS };
const calEs = { label: "calendario electoral nacional", href: CAL };
const codeEs = { label: "Código Electoral", href: CODE };
const pressEn = { label: "press note of 10 December 2025", href: PRESS };
const calEn = { label: "national electoral calendar", href: CAL };
const codeEn = { label: "Electoral Code", href: CODE };

const ES_BODY = `<h2>Qué se elige</h2>
<p>El <a href="${PRESS}">comunicado del Tribunal Supremo Electoral del 10 de diciembre de 2025</a> dice que las elecciones siguen siendo el 28 de febrero de 2027, en el país y en el exterior. Ese día incluye la elección presidencial, las diputaciones y los concejos municipales. El <a href="${CAL}">calendario electoral nacional</a> imprime la misma fecha.</p>
<p class="tools"><a href="${EN}">English</a> · <a href="/sv/es/">El Salvador</a></p>
<h2>Cómo se vota</h2>
<p>El <a href="${CODE}">Código Electoral</a> leído el 27 de octubre de 2026 dice, en el artículo 5, que para votar hay que estar inscrito en el registro electoral. El artículo 6 y el artículo 31 dicen que el Documento Único de Identidad vigente es el documento para emitir el voto. El artículo 190 dice que la votación comienza a las siete horas. El artículo 198 dice que la votación es continua y termina a las diecisiete horas. El artículo 189 dice que el paquete electoral debe estar a disposición a más tardar a las cinco horas. Esta página no añade una fila después de las 17:00. La edad para ser ciudadano no está en los artículos leídos, así que no se imprime aquí.</p>
<p>El artículo 197 describe la marca en cada papeleta. En la presidencial y en la municipal, la marca va sobre la bandera del partido o coalición, y también puede ir sobre la fotografía que el artículo nombra. La papeleta legislativa tiene reglas propias en ese artículo. Esta página no las reescribe.</p>
<h2>Candidaturas</h2>
<p>El comunicado fija la presentación de solicitudes de presidencia, vicepresidencia y diputaciones del 1 de octubre al 19 de noviembre de 2026, y la de concejos municipales del 9 al 19 de noviembre de 2026. El 27 de octubre de 2026 ese plazo seguía abierto. No se abrió una lista cerrada. Esta página no ordena nombres.</p>
<h2>Elección anterior</h2>
<p>No se copió un cuadro de resultados de una elección anterior. El enlace es el del <a href="${TSE}">Tribunal Supremo Electoral</a>.</p>
<h2>Encuestas y proyecciones</h2>
<p>El artículo 176 prohíbe publicar resultados de encuestas o proyecciones que indiquen una tendencia, desde quince días antes de la elección hasta que los resultados queden firmes. El calendario pone el último día de publicación el 12 de febrero de 2027 y la prohibición del 13 de febrero al 1 de abril de 2027. Este sitio no publica una encuesta ni una proyección ningún día, tampoco después de las 17:00.</p>
<p>La sección siguiente muestra una cuenta atrás y ningún voto hasta las 17:00 del 28 de febrero de 2027, hora de El Salvador. Un voto se lee solo de un archivo en este sitio. Si el archivo no se lee, queda el enlace al Tribunal. Una cifra de ese archivo, cuando exista, es una cifra del Tribunal. No es una proyección.</p>`;

const EN_BODY = `<h2>What is being elected</h2>
<p>The Supreme Electoral Tribunal’s <a href="${PRESS}">press note of 10 December 2025</a> says the elections remain 28 February 2027, in the country and abroad. That day includes the presidential election, legislative seats and municipal councils. The <a href="${CAL}">national electoral calendar</a> prints the same date.</p>
<p class="tools"><a href="${ES}">Español</a> · <a href="/sv/en/">El Salvador</a></p>
<h2>How to vote</h2>
<p>The <a href="${CODE}">Electoral Code</a> read on 27 October 2026 says, in article 5, that a person must be on the electoral register to vote. Articles 6 and 31 say the current Documento Único de Identidad is the document for casting a vote. Article 190 says voting begins at 07:00. Article 198 says voting is continuous and ends at 17:00. Article 189 says the electoral package is to be on hand by 05:00. This page does not add a queue after 17:00. The age of citizenship was not in the articles read, so it is not printed here.</p>
<p>Article 197 describes the mark on each ballot. On the presidential and municipal ballots the mark is on the party or coalition flag, and it may also be on the photograph that article names. The legislative ballot has its own rules in that article. This page does not rewrite them.</p>
<h2>Candidates</h2>
<p>The press note sets requests for the presidency, vice presidency and legislative seats from 1 October to 19 November 2026, and municipal-council requests from 9 to 19 November 2026. On 27 October 2026 that window was still open. No closed list was opened. This page does not order names.</p>
<h2>The previous election</h2>
<p>No table from a previous election was copied. The link is the <a href="${TSE}">Supreme Electoral Tribunal</a>.</p>
<h2>Surveys and projections</h2>
<p>Article 176 forbids publishing survey results or projections that indicate a trend, from fifteen days before election day until the results are declared firm. The calendar sets the last publication day as 12 February 2027 and the prohibition from 13 February through 1 April 2027. This site publishes no survey and no projection on any day, including after 17:00.</p>
<p>The next section shows a countdown, and no votes, until 17:00 on 28 February 2027, El Salvador time. A vote is read only from a file on this site. If the file cannot be read, the section keeps the link to the Tribunal. A figure in that file, when one exists, is a Tribunal figure. It is not a projection.</p>`;

export const SV_ELECTION_SEO_PROFILES: ElectionSeoProfile[] = [
  {
    id: "sv-2027-02-28",
    pollingDay: "2027-02-28",
    startDate: "2027-02-28T07:00:00-06:00",
    endDate: OPEN,
    organizerName: "Tribunal Supremo Electoral",
    organizerUrl: TSE,
    lastmod: "2026-10-27",
    candidateListId: "sv-2027-02-28",
    homeLinks: [
      {
        href: ES,
        label: "Elecciones en El Salvador, 28 de febrero de 2027",
        detail: "Domingo. Presidencia, diputaciones y concejos municipales. Fecha del Tribunal Supremo Electoral.",
      },
      {
        href: EN,
        label: "El Salvador elections, 28 February 2027",
        detail: "Sunday. Presidency, legislative seats and municipal councils. The date is from the Supreme Electoral Tribunal.",
      },
    ],
    pages: [
      {
        lang: "es",
        htmlLang: "es",
        readWord: "leído",
        path: ES,
        title: "Elecciones del 28 de febrero de 2027",
        description:
          "Elecciones presidenciales, legislativas y municipales del domingo 28 de febrero de 2027 en El Salvador. Horario, registro y la prohibición de encuestas, desde el Tribunal Supremo Electoral. Información no oficial.",
        ogDescription:
          "Elecciones del 28 de febrero de 2027. La votación termina a las 17:00. Sin encuesta y sin proyección. Información no oficial.",
        ogLocale: "es_SV",
        alternates,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "El Salvador", path: "/sv/" },
          { name: "Elecciones del 28 de febrero de 2027", path: ES },
        ],
        eyebrow: "Domingo 28 de febrero de 2027",
        h1: "Elecciones del 28 de febrero de 2027",
        lede: "Presidencia, diputaciones y concejos municipales. La votación termina a las 17:00, hora de El Salvador.",
        updated: "Última actualización: 27 de octubre de 2026.",
        reportLabel: "Informar de un error",
        officeHref: TSE,
        bannerBefore: "Información no oficial. Confirme con el ",
        bannerAfter: "Tribunal Supremo Electoral",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/sv/es/", label: "El Salvador" },
          { href: EN, label: "English" },
          { href: "/search/", label: "Search" },
        ],
        eventName: "Elecciones presidenciales, legislativas y municipales, 28 de febrero de 2027",
        locationName: "El Salvador",
        addressRegion: "El Salvador",
        addressCountry: "SV",
        keyDatesHeading: "Cómo votar, fechas y fuentes oficiales",
        keyDatesIntro: "Cada fecha de abajo está en el comunicado o en el calendario. El horario está en el Código Electoral.",
        keyDates: [
          {
            label: "Inscripción",
            text: "El comunicado del 10 de diciembre de 2025 fija las solicitudes de presidencia, vicepresidencia y diputaciones del 1 de octubre al 19 de noviembre de 2026, y las de concejos municipales del 9 al 19 de noviembre de 2026.",
            links: [pressEs],
          },
          {
            label: "Encuestas",
            text: "El calendario electoral nacional pone el último día para publicar encuestas o proyecciones el 12 de febrero de 2027, y la prohibición del 13 de febrero al 1 de abril de 2027.",
            links: [calEs],
          },
          {
            label: "Votación",
            text: "El Código Electoral dice que la votación comienza a las siete horas y termina a las diecisiete horas. El calendario electoral nacional fija el día en el 28 de febrero de 2027.",
            links: [codeEs, calEs],
          },
          {
            label: "Preliminares",
            text: "El calendario electoral nacional coloca la transmisión de resultados preliminares el 28 de febrero de 2027. Esta página no muestra un voto antes de las 17:00.",
            links: [calEs],
          },
          {
            label: "Declaratoria",
            text: "El calendario electoral nacional abre la fase de declaratoria de resultados y entrega de credenciales el 28 de febrero de 2027 y la cierra el 14 de abril de 2027.",
            links: [calEs],
          },
        ],
        faqHeading: "Preguntas frecuentes",
        faqs: [
          {
            question: "¿Qué día son las elecciones?",
            text: "El comunicado del 10 de diciembre de 2025 dice que las elecciones son el 28 de febrero de 2027, en el país y en el exterior.",
            links: [pressEs],
          },
          {
            question: "¿Qué cargos se eligen?",
            text: "El comunicado del 10 de diciembre de 2025 incluye la presidencia, las diputaciones a la Asamblea Legislativa y los concejos municipales en el mismo evento.",
            links: [pressEs],
          },
          {
            question: "¿A qué hora se vota?",
            text: "El Código Electoral dice que la votación comienza a las siete horas y termina a las diecisiete horas.",
            links: [codeEs],
          },
          {
            question: "¿El sitio publica encuestas?",
            text: "No. El Código Electoral prohíbe publicar encuestas y proyecciones desde quince días antes hasta que los resultados queden firmes. El calendario electoral nacional lleva esa prohibición hasta el 1 de abril de 2027. Este sitio no publica ninguna.",
            links: [codeEs, calEs],
          },
          {
            question: "¿Cuándo aparecen los votos aquí?",
            text: "No antes de las 17:00 del 28 de febrero de 2027, hora de El Salvador. Después, una cifra solo se copia del Tribunal Supremo Electoral. No es una proyección.",
            links: [{ label: "Tribunal Supremo Electoral", href: TSE }],
          },
        ],
        relatedHeading: "Páginas relacionadas",
        related: [
          { href: "/", label: "Home" },
          { href: "/sv/es/", label: "El Salvador" },
          { href: EN, label: "English" },
        ],
        bodyHtml: ES_BODY,
        sourcesHeading: "Fuentes",
        sources: [
          { href: PRESS, label: "Tribunal Supremo Electoral, comunicado del 10 de diciembre de 2025", readOn: "2026-10-27" },
          { href: CAL, label: "Tribunal Supremo Electoral, calendario electoral nacional", readOn: "2026-10-27" },
          { href: CODE, label: "Código Electoral, texto en el sitio del Tribunal", readOn: "2026-10-27" },
          { href: TSE, label: "Tribunal Supremo Electoral", readOn: "2026-10-27" },
        ],
      },
      {
        lang: "en",
        htmlLang: "en",
        path: EN,
        title: "El Salvador elections, 28 February 2027",
        description:
          "Presidential, legislative and municipal elections in El Salvador on Sunday 28 February 2027. Hours, registration and the survey ban, from the Supreme Electoral Tribunal. Unofficial information.",
        ogDescription:
          "El Salvador elections, 28 February 2027. Voting ends at 17:00. No survey and no projection. Unofficial information.",
        ogLocale: "en_US",
        alternates,
        crumbs: [
          { name: "Home", path: "/" },
          { name: "El Salvador", path: "/sv/" },
          { name: "Elections, 28 February 2027", path: EN },
        ],
        eyebrow: "Sunday 28 February 2027",
        h1: "El Salvador elections, 28 February 2027",
        lede: "Presidency, legislative seats and municipal councils. Voting ends at 17:00, El Salvador time.",
        updated: "Last updated: 27 October 2026.",
        reportLabel: "Report an error",
        officeHref: TSE,
        bannerBefore: "Unofficial information. Confirm with the ",
        bannerAfter: "Supreme Electoral Tribunal",
        nav: [
          { href: "/", label: "Map the General" },
          { href: "/sv/en/", label: "El Salvador" },
          { href: ES, label: "Español" },
          { href: "/search/", label: "Search" },
        ],
        eventName: "El Salvador presidential, legislative and municipal elections, 28 February 2027",
        locationName: "El Salvador",
        addressRegion: "El Salvador",
        addressCountry: "SV",
        keyDatesHeading: "How to vote, key dates and official sources",
        keyDatesIntro: "Each date below is in the press note or the calendar. The hours are in the Electoral Code.",
        keyDates: [
          {
            label: "Registration",
            text: "The press note of 10 December 2025 sets requests for the presidency, vice presidency and legislative seats from 1 October to 19 November 2026, and municipal-council requests from 9 to 19 November 2026.",
            links: [pressEn],
          },
          {
            label: "Surveys",
            text: "The national electoral calendar sets 12 February 2027 as the last day to publish surveys or projections, and a prohibition from 13 February through 1 April 2027.",
            links: [calEn],
          },
          {
            label: "Voting",
            text: "The Electoral Code says voting begins at 07:00 and ends at 17:00. The national electoral calendar sets the day as 28 February 2027.",
            links: [codeEn, calEn],
          },
          {
            label: "Preliminary count",
            text: "The national electoral calendar places transmission of preliminary results on 28 February 2027. This page shows no vote before 17:00.",
            links: [calEn],
          },
          {
            label: "Declaration",
            text: "The national electoral calendar opens the declaration of results and the delivery of credentials on 28 February 2027 and closes that phase on 14 April 2027.",
            links: [calEn],
          },
        ],
        faqHeading: "Frequently asked questions",
        faqs: [
          {
            question: "When are the elections?",
            text: "The press note of 10 December 2025 says the elections are on 28 February 2027, in the country and abroad.",
            links: [pressEn],
          },
          {
            question: "Which offices are elected?",
            text: "The press note of 10 December 2025 puts the presidency, legislative seats and municipal councils in the same event.",
            links: [pressEn],
          },
          {
            question: "What are the voting hours?",
            text: "The Electoral Code says voting begins at 07:00 and ends at 17:00.",
            links: [codeEn],
          },
          {
            question: "Does this site publish surveys?",
            text: "No. The Electoral Code forbids publishing surveys and projections from fifteen days before election day until the results are declared firm. The national electoral calendar carries that prohibition through 1 April 2027. This site publishes none.",
            links: [codeEn, calEn],
          },
          {
            question: "When will votes appear here?",
            text: "Not before 17:00 on 28 February 2027, El Salvador time. After that, a figure is copied only from the Supreme Electoral Tribunal. It is not a projection.",
            links: [{ label: "Supreme Electoral Tribunal", href: TSE }],
          },
        ],
        relatedHeading: "Related pages",
        related: [
          { href: "/", label: "Home" },
          { href: "/sv/en/", label: "El Salvador" },
          { href: ES, label: "Español" },
        ],
        bodyHtml: EN_BODY,
        sourcesHeading: "Sources",
        sources: [
          { href: PRESS, label: "Supreme Electoral Tribunal, press note of 10 December 2025", readOn: "2026-10-27" },
          { href: CAL, label: "Supreme Electoral Tribunal, national electoral calendar", readOn: "2026-10-27" },
          { href: CODE, label: "Electoral Code, text on the Tribunal’s site", readOn: "2026-10-27" },
          { href: TSE, label: "Supreme Electoral Tribunal", readOn: "2026-10-27" },
        ],
      },
    ],
  },
];
