import { hubGuides } from "./hubs";

/** Practical guides for national hubs. Facts are limited to official pages read for this release. */

export type Part = { text: string; href?: string };
export type Guide = {
  kicker: string;
  title: string;
  intro: string;
  blocks: { heading: string; paragraphs: Part[][] }[];
  electionsHeading: string;
  elections: { name: string; detail: string; href?: string }[];
  glossaryHeading: string;
  glossary: { term: string; text: string }[];
  faqHeading: string;
  faq: { q: string; a: string }[];
  sourcesHeading: string;
  sources: { label: string; href: string }[];
};

const AEC_HOW = "https://www.aec.gov.au/voting/how_to_vote/";
const AEC_COMPULSORY = "https://www.aec.gov.au/About_AEC/Publications/backgrounders/compulsory-voting.htm";
const AEC_HOR = "https://www.aec.gov.au/Voting/How_to_vote/Voting_HOR.htm";
const AEC_SENATE = "https://www.aec.gov.au/Voting/How_to_vote/Voting_Senate.htm";
const CEA_56 = "https://laws-lois.justice.gc.ca/eng/acts/e-2.01/section-56.1.html";
const GOVUK_VOTE = "https://www.gov.uk/how-to-vote";
const RPA_66A = "https://www.legislation.gov.uk/ukpga/1983/2/section/66A";
const LOREG = "https://www.boe.es/eli/es/lo/1985/06/19/5/con";
const CAMERA = "https://conoscere.camera.it/la-camera-dei-deputati/i-deputati/chi-elegge-i-deputati";
const LGIPE = "https://www.diputados.gob.mx/LeyesBiblio/pdf/LGIPE.pdf";
const INE = "https://www.ine.mx/";
const PKW = "https://wybory.gov.pl/";
const KODEKS = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20110210112";
const CH_ADMIN = "https://www.admin.ch/gov/en/start/documentation/votes.html";
const DAIT = "https://dait.interno.gov.it/elezioni/speciale-elezioni";

function t(text: string, href?: string): Part {
  return href ? { text, href } : { text };
}

const auEn: Guide = {
  kicker: "Practical guide",
  title: "How federal elections work",
  intro:
    "This section is drawn from Australian Electoral Commission pages read on 23 October 2026. It is a description of those pages, not a direction to vote in any way. State and territory elections use their own statutes.",
  blocks: [
    {
      heading: "Levels of government",
      paragraphs: [
        [
          t("The Commission’s "),
          t("how to vote", AEC_HOW),
          t(
            " page, updated 7 March 2025, says that Australian citizens aged 18 years or over who are enrolled elect people to the two houses of the Commonwealth Parliament: the Senate and the House of Representatives.",
          ),
        ],
        [
          t(
            "For the House, the same page says Australia is divided into electoral divisions and that voters in each division elect one member. For the Senate, it says each state elects 12 senators and that the Australian Capital Territory and the Northern Territory each elect two.",
          ),
        ],
        [
          t(
            "States and territories run their own parliamentary elections and their own local elections. This site’s state pages name the commission that printed each date. They are not Commonwealth elections.",
          ),
        ],
      ],
    },
    {
      heading: "Who can vote, and enrolment",
      paragraphs: [
        [
          t("The Commission’s "),
          t("compulsory-voting backgrounder", AEC_COMPULSORY),
          t(
            ", updated 3 March 2025, says the Commonwealth Electoral Act 1918 requires Australian citizens aged 18 and over to be enrolled. Citizens who have turned 16, but are under 18, may claim enrolment. An elector who has not turned 18 on polling day is not entitled to vote.",
          ),
        ],
        [
          t(
            "The same backgrounder says that a person with a cognitive impairment who cannot understand the nature and significance of enrolment and voting, and a person convicted of treason or treachery, is not entitled to enrol or to vote. A person serving a sentence of imprisonment of three years or longer is not entitled to vote. British subjects who were enrolled as at 25 January 1984 may remain on the Roll.",
          ),
        ],
        [
          t(
            "Voting at a federal election is compulsory. The backgrounder says failure to vote is an offence under subsection 245(15) of the Electoral Act unless the elector has a valid and sufficient reason. It also says Antarctic electors, eligible overseas electors and itinerant electors may vote, but voting is not compulsory for them.",
          ),
        ],
      ],
    },
    {
      heading: "How a vote is cast",
      paragraphs: [
        [
          t(
            "An ordinary vote, the backgrounder says, is cast at a polling place on polling day. Section 233 requires the elector to go alone to an unoccupied compartment, mark the ballot in private, and put it in the ballot box. Help is available for a voter who cannot vote without assistance because of visual impairment, physical incapacity or illiteracy.",
          ),
        ],
        [
          t(
            "Pre-poll and postal voting use the grounds in Schedule 2. The backgrounder lists, among others: disability, being outside the state, territory or division, being more than 8 kilometres from a polling place, travel, work, serious illness, hospital, religious beliefs, a prison sentence under three years, being a silent elector, or a reasonable fear for safety. A postal voter is sent the ballot papers and a reply-paid envelope. A pre-poll ordinary vote is taken at a pre-poll centre in the division.",
          ),
        ],
        [
          t("The Commission publishes separate instructions for "),
          t("numbering a House ballot", AEC_HOR),
          t(" and a "),
          t("Senate ballot", AEC_SENATE),
          t(
            ". Those numbering rules are not copied here. Read them on the Commission’s site before you vote.",
          ),
        ],
      ],
    },
  ],
  electionsHeading: "Elections named on this site",
  elections: [
    {
      name: "Next federal election",
      detail: "Due between August 2027 and May 2028. No polling day was named in the writs read for this site.",
      href: "/au/en/elections/federal-next/",
    },
    {
      name: "Victoria",
      detail: "Saturday 28 November 2026, on the Victorian Electoral Commission and Parliament of Victoria pages.",
      href: "/au/en/elections/victoria-2026/",
    },
    {
      name: "New South Wales state election, Saturday 13 March 2027",
      detail: "The NSW Electoral Commission page for the 59th Parliament. Nominations were not open on the page read on 27 October 2026.",
      href: "/au/en/elections/nsw-2027/",
    },
  ],
  glossaryHeading: "Glossary",
  glossary: [
    { term: "Division", text: "The area that elects one member of the House of Representatives." },
    { term: "Roll", text: "The list of electors. Enrolment on it is compulsory for Australian citizens aged 18 and over." },
    { term: "Ordinary vote", text: "A vote marked in a polling-place compartment on polling day and put straight into the ballot box." },
    { term: "Pre-poll vote", text: "A vote cast at a pre-poll centre before polling day, on a ground in Schedule 2." },
    { term: "Postal vote", text: "A ballot sent to an elector who has been accepted to vote by post, with a reply-paid envelope." },
  ],
  faqHeading: "Questions",
  faq: [
    {
      q: "Is voting compulsory?",
      a: "Yes for a federal election, for an elector, unless there is a valid and sufficient reason. The backgrounder names the groups for whom voting is not compulsory.",
    },
    {
      q: "When is the next federal election?",
      a: "The Commission’s release of 23 July 2026 says it is due between August 2027 and May 2028. No page read for this site names the Saturday.",
    },
    {
      q: "Is this an official page?",
      a: "No. Confirm the rules with the Australian Electoral Commission.",
    },
  ],
  sourcesHeading: "Official pages for this section",
  sources: [
    { label: "AEC, How to vote (updated 7 March 2025)", href: AEC_HOW },
    { label: "AEC, Electoral Backgrounder: Compulsory voting (updated 3 March 2025)", href: AEC_COMPULSORY },
    { label: "AEC, Voting in the House of Representatives", href: AEC_HOR },
    { label: "AEC, Voting in the Senate", href: AEC_SENATE },
  ],
};

const caEn: Guide = {
  kicker: "Practical guide",
  title: "How federal elections are timed",
  intro:
    "The fixed-date rule below is section 56.1 of the Canada Elections Act, as this site’s Canada page already records from the text read on 17 October 2026. On 23 October 2026 the Elections Canada overview of the voting system returned a technical error, so this section does not describe how a ballot is marked or who is eligible. Those rules stay on Elections Canada’s own site.",
  blocks: [
    {
      heading: "Levels",
      paragraphs: [
        [
          t(
            "A federal general election fills the House of Commons. The Senate is not elected at that election. The Government of Canada “About the Senate” page, as recorded on this site, says the Constitution provides for appointed members.",
          ),
        ],
        [
          t(
            "Provinces and territories run their own elections under their own statutes. This release also has municipality pages for Ontario, Quebec, British Columbia, Alberta, Manitoba, Saskatchewan, Nova Scotia, and New Brunswick. It does not name mayors.",
          ),
        ],
      ],
    },
    {
      heading: "The fixed date, and dissolution",
      paragraphs: [
        [
          t("Section 56.1", CEA_56),
          t(
            ", in the English text read on 17 October 2026, says nothing in the section affects the Governor General’s power to dissolve Parliament. Subject to that, each general election is held on the third Monday of October in the fourth calendar year after the polling day of the last general election.",
          ),
        ],
        [
          t(
            "Elections Canada’s May 2025 briefing, read the same day, says the last general election was on 28 April 2025 and that the next fixed date is 15 October 2029. It also says the Act does not prevent a general election on another date. This page does not say that the 2029 election has been called.",
          ),
        ],
      ],
    },
    {
      heading: "Registration and ways of voting",
      paragraphs: [
        [
          t("Eligibility, the register, advance polls and special ballots were not copied, because the "),
          t("Elections Canada", "https://www.elections.ca/"),
          t(
            " system page did not load on 23 October 2026. Use that site, or the returning officer named on an official notice, rather than this paragraph.",
          ),
        ],
      ],
    },
  ],
  electionsHeading: "Dates already printed by an official office",
  elections: [
    { name: "Federal fixed date", detail: "Monday 15 October 2029, unless Parliament is dissolved earlier.", href: "/ca/en/elections/federal-2029/" },
    { name: "British Columbia", detail: "Final Voting Day was 24 October 2026. Final count is planned for 6–10 November 2026. Elections BC says 93 members are to be elected. This site prints no count.", href: "/ca/en/elections/bc-2026/" },
    { name: "Alberta", detail: "Elections Alberta: 18 October 2027, without affecting the Lieutenant Governor’s power to dissolve.", href: "/ca/en/alberta/" },
    { name: "Manitoba", detail: "Next set-date election 5 October 2027. The law allows an earlier call.", href: "/ca/en/manitoba/" },
    { name: "Northwest Territories", detail: "Tuesday 5 October 2027.", href: "/ca/en/northwest-territories/" },
    { name: "Prince Edward Island", detail: "Monday 4 October 2027. Elections PEI says the first-past-the-post process is used, in 27 districts.", href: "/ca/en/prince-edward-island/" },
    { name: "Saskatchewan", detail: "Scheduled for 30 October 2028. The FAQ says the period cannot overlap a federal election period.", href: "/ca/en/saskatchewan/" },
  ],
  glossaryHeading: "Glossary",
  glossary: [
    { term: "Fixed date", text: "The Monday section 56.1 names. It is not a writ, and it yields to dissolution." },
    { term: "Writ", text: "The formal order that calls an election. This page does not say a writ for 2029 has been issued." },
    { term: "House of Commons", text: "The elected federal chamber." },
    { term: "Senate", text: "The appointed federal chamber. It is not filled by the general election." },
  ],
  faqHeading: "Questions",
  faq: [
    { q: "Can the 2029 date move?", a: "Section 56.1 leaves the Governor General’s power to dissolve Parliament in place. The briefing says the Act does not prevent an election on another date." },
    { q: "Does this site show polls?", a: "No. It prints no opinion-survey figures for any election." },
    { q: "Where are the rules for marking a ballot?", a: "On Elections Canada. They were not copied here." },
  ],
  sourcesHeading: "Official pages for this section",
  sources: [
    { label: "Canada Elections Act, section 56.1", href: CEA_56 },
    { label: "Elections Canada", href: "https://www.elections.ca/" },
  ],
};

const caFr: Guide = {
  kicker: "Guide pratique",
  title: "Comment la date fédérale est fixée",
  intro:
    "La règle de date fixe est l’article 56.1 de la Loi électorale du Canada, déjà repris sur cette page d’après le texte lu le 17 octobre 2026. Le 23 octobre 2026, la page d’Élections Canada sur le mode de scrutin a renvoyé une erreur technique. Cette section ne décrit donc ni le bulletin ni les conditions d’électorat. Ces règles restent sur le site d’Élections Canada.",
  blocks: [
    {
      heading: "Niveaux",
      paragraphs: [
        [t("Une élection générale fédérale pourvoit la Chambre des communes. Le Sénat n’est pas élu à cette occasion. La page « About the Senate » du gouvernement du Canada, déjà citée ici, dit que la Constitution prévoit des membres nommés.")],
        [t("Les provinces et les territoires tiennent leurs propres élections. Cette livraison a aussi des pages de municipalités pour l’Ontario et le Québec. Elle ne nomme pas les maires.")],
      ],
    },
    {
      heading: "Date fixe et dissolution",
      paragraphs: [
        [
          t("L’article 56.1", CEA_56),
          t(", dans le texte anglais lu le 17 octobre 2026, dit que rien dans l’article ne porte atteinte au pouvoir du gouverneur général de dissoudre le Parlement. Sous cette réserve, chaque élection générale a lieu le troisième lundi d’octobre de la quatrième année civile qui suit le jour du scrutin de la dernière élection générale."),
        ],
        [t("Le cahier d’Élections Canada de mai 2025, lu le même jour, dit que la dernière élection générale a eu lieu le 28 avril 2025 et que la prochaine date fixe est le 15 octobre 2029. Il dit aussi que la Loi n’empêche pas une élection à une autre date. Cette page ne dit pas que l’élection de 2029 est convoquée.")],
      ],
    },
    {
      heading: "Inscription et façons de voter",
      paragraphs: [
        [
          t("L’admissibilité, le registre, le vote par anticipation et le bulletin spécial n’ont pas été copiés, parce que la page d’"),
          t("Élections Canada", "https://www.elections.ca/"),
          t(" sur le mode de scrutin ne s’est pas chargée le 23 octobre 2026."),
        ],
      ],
    },
  ],
  electionsHeading: "Dates déjà imprimées par un bureau officiel",
  elections: [
    { name: "Date fixe fédérale", detail: "Lundi 15 octobre 2029, sauf dissolution plus tôt.", href: "/ca/fr/elections/federal-2029/" },
    { name: "Colombie-Britannique", detail: "Le jour du scrutin final était le 24 octobre 2026. Le décompte final est prévu du 6 au 10 novembre 2026. Elections BC dit que 93 membres sont à élire. Ce site ne publie aucun décompte.", href: "/ca/fr/elections/bc-2026/" },
    { name: "Alberta", detail: "Élections Alberta : 18 octobre 2027, sans toucher au pouvoir du lieutenant-gouverneur.", href: "/ca/fr/alberta/" },
    { name: "Manitoba", detail: "Prochaine élection à date fixée le 5 octobre 2027. La loi permet une convocation plus tôt.", href: "/ca/fr/manitoba/" },
    { name: "Territoires du Nord-Ouest", detail: "Mardi 5 octobre 2027.", href: "/ca/fr/northwest-territories/" },
    { name: "Île-du-Prince-Édouard", detail: "Lundi 4 octobre 2027. Élections Î.-P.-É. dit que le mode uninominal majoritaire à un tour est utilisé, dans 27 circonscriptions.", href: "/ca/fr/prince-edward-island/" },
    { name: "Saskatchewan", detail: "Prévue le 30 octobre 2028. La FAQ dit que la période ne peut pas chevaucher une élection fédérale.", href: "/ca/fr/saskatchewan/" },
  ],
  glossaryHeading: "Glossaire",
  glossary: [
    { term: "Date fixe", text: "Le lundi que nomme l’article 56.1. Ce n’est pas un bref, et la dissolution peut l’écarter." },
    { term: "Bref", text: "L’ordre qui convoque une élection. Cette page ne dit pas qu’un bref pour 2029 a été émis." },
    { term: "Chambre des communes", text: "La chambre fédérale élue." },
    { term: "Sénat", text: "La chambre fédérale nommée. L’élection générale ne la renouvelle pas." },
  ],
  faqHeading: "Questions",
  faq: [
    { q: "La date de 2029 peut-elle bouger ?", a: "L’article 56.1 laisse intact le pouvoir du gouverneur général de dissoudre le Parlement. Le cahier dit que la Loi n’empêche pas une élection à une autre date." },
    { q: "Ce site montre-t-il des sondages ?", a: "Non. Il n’imprime aucun chiffre de sondage." },
    { q: "Où sont les règles du bulletin ?", a: "Sur Élections Canada. Elles ne sont pas copiées ici." },
  ],
  sourcesHeading: "Pages officielles de cette section",
  sources: [
    { label: "Loi électorale du Canada, article 56.1", href: CEA_56 },
    { label: "Élections Canada", href: "https://www.elections.ca/" },
  ],
};

const gbEn: Guide = {
  kicker: "Practical guide",
  title: "How to take part in a UK election",
  intro:
    "The steps below are the ones GOV.UK prints on its “How to vote” overview, read on 23 October 2026. Who may vote depends on the election. This page does not turn that overview into advice for a particular person.",
  blocks: [
    {
      heading: "Levels",
      paragraphs: [
        [
          t(
            "The UK Parliament is elected at a general election. Scotland, Wales and Northern Ireland also elect their own legislatures, and local councils are elected under their own cycles. Those dates, where the Electoral Commission has printed them, are on this country page and on the elections index.",
          ),
        ],
      ],
    },
    {
      heading: "Registration",
      paragraphs: [
        [
          t("GOV.UK says you need to be "),
          t("registered to vote", GOVUK_VOTE),
          t(
            " before you can vote in UK elections or referendums. Eligibility depends on age, nationality, where you live, and registration. Different elections have different rules, so not everyone can vote in every election. You register again if you change your name, address or nationality.",
          ),
        ],
      ],
    },
    {
      heading: "Ways of voting",
      paragraphs: [
        [
          t(
            "Once registered, GOV.UK says you can vote in person at a polling station, apply to vote by post, or apply for a proxy. You cannot vote online in any election.",
          ),
        ],
        [
          t(
            "For voting in person in some elections and referendums in England, Scotland and Wales, you need photo identification. Northern Ireland has different rules. If you do not have an accepted photo ID, you can apply for a Voter Authority Certificate, or for an Electoral Identity Card in Northern Ireland. The accepted documents are listed on GOV.UK, not restated here.",
          ),
        ],
      ],
    },
    {
      heading: "What this site does not publish",
      paragraphs: [
        [
          t("Section 66A of the Representation of the People Act 1983", RPA_66A),
          t(
            " prohibits publication of an exit poll before the close of the poll. This site publishes no exit poll and no opinion-survey figure, in any election.",
          ),
        ],
      ],
    },
  ],
  electionsHeading: "Elections named on this site",
  elections: [
    {
      name: "UK Parliament",
      detail: "No later than 15 August 2029 on the Electoral Commission schedule. No polling day has been fixed in the sources read.",
      href: "/gb/en/elections/general-election/",
    },
    {
      name: "The Commission’s other rows",
      detail: "The same schedule lists May 2026 elections, with polling day Thursday 7 May 2026 on a separate Commission page. Later rows that say only “May” are not turned into a calendar day.",
      href: "/gb/en/elections/",
    },
  ],
  glossaryHeading: "Glossary",
  glossary: [
    { term: "Polling station", text: "The place where you vote in person. The electoral registration office can say which one." },
    { term: "Postal vote", text: "A vote sent by post, after you apply. In Northern Ireland the application is by post only, on the GOV.UK page." },
    { term: "Proxy", text: "A person you apply to have vote for you." },
    { term: "Voter Authority Certificate", text: "Photo identification you can apply for if you do not have an accepted document, in England, Scotland or Wales." },
  ],
  faqHeading: "Questions",
  faq: [
    { q: "Can I vote online?", a: "GOV.UK says you cannot vote online in any election." },
    { q: "Do I need photo ID?", a: "For some elections in England, Scotland and Wales, yes, when you vote in person. Northern Ireland has different rules. Check the GOV.UK list for that election." },
    { q: "When is the next general election?", a: "The Commission’s schedule says no later than 15 August 2029. It does not name a polling day." },
  ],
  sourcesHeading: "Official pages for this section",
  sources: [
    { label: "GOV.UK, How to vote", href: GOVUK_VOTE },
    { label: "Representation of the People Act 1983, section 66A", href: RPA_66A },
  ],
};

const esEn: Guide = {
  kicker: "Practical guide",
  title: "How this general election is organised",
  intro:
    "The calling decree, the seat total and the local-election cycle below are already the sources of this Spain section. Articles of the electoral law that were not re-read on 23 October 2026 are not paraphrased. The consolidated law is linked so you can read them there.",
  blocks: [
    {
      heading: "Levels",
      paragraphs: [
        [
          t(
            "A general election fills the Congreso de los Diputados and the Senado. Autonomous communities, provinces and municipalities have their own elections. This release has a page for each community and city, each province, and each municipality with a 2025 Total in INE table 29005.",
          ),
        ],
        [
          t(
            "Article 162 of the electoral law sets 350 deputies. The annex of Royal Decree 806/2026 allocates that number by constituency. This site does not publish the names of mayors or councillors. The official list of current local offices is the ministry’s Consulta de Cargos Representativos Locales.",
          ),
        ],
      ],
    },
    {
      heading: "The statute, including who votes and postal voting",
      paragraphs: [
        [
          t("The consolidated "),
          t("Ley Orgánica 5/1985", LOREG),
          t(
            " on the BOE is the statute for the right to vote, the allocation of Congress and Senate seats, the electoral register, and voting by post. This guide does not restate an article that was not the one already used on these pages.",
          ),
        ],
        [
          t(
            "For this general election the site follows two rules already tied to that law: no publication of election polls in the five days before the vote, and no new campaign material after the day of reflection begins. The notice at the top of the site states the hours.",
          ),
        ],
      ],
    },
  ],
  electionsHeading: "Elections named on this site",
  elections: [
    {
      name: "Cortes Generales",
      detail: "Sunday 29 November 2026, called by Royal Decree 806/2026.",
      href: "/es/en/elections/cortes-generales-2026/",
    },
    {
      name: "Local elections",
      detail: "Article 42.3 places them on the fourth Sunday of May, for a four-year term. The year that follows the 2023 call is 2027. No 2027 calling decree was read, so no calendar day is printed.",
      href: "/es/en/elections/",
    },
  ],
  glossaryHeading: "Glossary",
  glossary: [
    { term: "Cortes Generales", text: "The two chambers: Congress and the Senate." },
    { term: "LOREG", text: "Organic Law 5/1985, the general electoral statute." },
    { term: "Day of reflection", text: "The day before polling day. Campaign propaganda stops. The site publishes no new content about this election during that period." },
    { term: "Padrón", text: "The municipal population register. Municipality population on this site is the 2025 Total of INE table 29005." },
  ],
  faqHeading: "Questions",
  faq: [
    { q: "How many deputies are elected?", a: "Article 162 sets 350. The annex of Royal Decree 806/2026 allocates them and adds up to 350." },
    { q: "Are candidacies published here?", a: "Not until the Central Electoral Board’s proclamation is in the BOE. The calendar read for this site places proclamation on 2 November 2026." },
    { q: "Who is the mayor?", a: "This site does not publish mayors or councillors. Use the ministry’s official query." },
  ],
  sourcesHeading: "Official pages for this section",
  sources: [
    { label: "LOREG, consolidated text", href: LOREG },
    { label: "Royal Decree 806/2026", href: "https://www.boe.es/eli/es/rd/2026/10/05/806" },
    { label: "Junta Electoral Central, 2026 general election", href: "https://www.juntaelectoralcentral.es/cs/jec/eleccionesEnCurso/Elecciones_generales_2026" },
    { label: "Consulta de Cargos Representativos Locales", href: "https://concejales.redsara.es/consulta/" },
  ],
};

const esEs: Guide = {
  kicker: "Guía práctica",
  title: "Cómo se organiza esta elección general",
  intro:
    "El decreto de convocatoria, el número de escaños y el ciclo local ya son las fuentes de esta sección. No se parafrasea un artículo de la ley electoral que no se haya releído el 23 de octubre de 2026. La ley consolidada está enlazada.",
  blocks: [
    {
      heading: "Niveles",
      paragraphs: [
        [t("Una elección general renueva el Congreso de los Diputados y el Senado. Las comunidades autónomas, las provincias y los municipios tienen sus propias elecciones. Esta edición tiene página para cada comunidad y ciudad, cada provincia y cada municipio con Total de 2025 en la tabla 29005 del INE.")],
        [t("El artículo 162 de la ley electoral fija 350 diputados. El anexo del Real Decreto 806/2026 reparte ese número por circunscripción. Este sitio no publica nombres de alcaldes ni concejales. La lista oficial de cargos locales es la Consulta de Cargos Representativos Locales.")],
      ],
    },
    {
      heading: "La ley, incluido el censo y el voto por correo",
      paragraphs: [
        [
          t("La "),
          t("Ley Orgánica 5/1985", LOREG),
          t(" consolidada en el BOE es la norma del derecho de sufragio, del reparto de escaños, del censo y del voto por correo. Esta guía no reescribe un artículo que no sea ya el usado en estas páginas."),
        ],
        [t("Para estas elecciones generales el sitio sigue dos reglas ya ligadas a esa ley: no publicar sondeos en los cinco días anteriores al voto, y no publicar propaganda nueva desde la jornada de reflexión. El aviso de la cabecera indica las horas.")],
      ],
    },
  ],
  electionsHeading: "Elecciones que este sitio nombra",
  elections: [
    { name: "Cortes Generales", detail: "Domingo 29 de noviembre de 2026, convocadas por el Real Decreto 806/2026.", href: "/es/es/elections/cortes-generales-2026/" },
    { name: "Elecciones locales", detail: "El artículo 42.3 las sitúa el cuarto domingo de mayo, con mandato de cuatro años. El año que sigue a la convocatoria de 2023 es 2027. No se leyó el decreto de 2027, así que no hay un día de calendario.", href: "/es/es/elections/" },
  ],
  glossaryHeading: "Glosario",
  glossary: [
    { term: "Cortes Generales", text: "Las dos cámaras: Congreso y Senado." },
    { term: "LOREG", text: "Ley Orgánica 5/1985, del régimen electoral general." },
    { term: "Jornada de reflexión", text: "El día anterior a la votación. Cesa la propaganda. El sitio no publica contenido nuevo sobre estas elecciones en ese periodo." },
    { term: "Padrón", text: "El registro de población. La cifra municipal de este sitio es el Total de 2025 de la tabla 29005 del INE." },
  ],
  faqHeading: "Preguntas",
  faq: [
    { q: "¿Cuántos diputados se eligen?", a: "El artículo 162 fija 350. El anexo del Real Decreto 806/2026 los reparte y suma 350." },
    { q: "¿Hay candidaturas aquí?", a: "No hasta la proclamación de la Junta Electoral Central en el BOE. El calendario leído sitúa la proclamación el 2 de noviembre de 2026." },
    { q: "¿Quién es el alcalde?", a: "Este sitio no publica alcaldes ni concejales. Use la consulta oficial del ministerio." },
  ],
  sourcesHeading: "Páginas oficiales de esta sección",
  sources: esEn.sources,
};

const itEn: Guide = {
  kicker: "Practical guide",
  title: "Who elects the Chamber, and what is coming next",
  intro:
    "The Chamber’s own page and the Constitution articles already quoted on this country page are the source for the numbers below. The ballot method in the electoral statute is not re-copied here. No name of a local officeholder is added.",
  blocks: [
    {
      heading: "Levels",
      paragraphs: [
        [
          t("The "),
          t("Chamber’s page “Chi elegge i deputati”", CAMERA),
          t(
            ", read on 23 October 2026, says the Chamber, like the Senate, is renewed every five years unless it is dissolved early. It says there are 400 deputies, elected by citizens who have turned 18, and that a person must have turned 25 to be elected. Eight deputies are elected by Italian citizens living abroad. It points to article 56 of the Constitution as amended by constitutional law no. 1 of 2020.",
          ),
        ],
        [
          t(
            "Article 57, already quoted on this page, says the elective senators number 200, four of them elected in the overseas constituency, on a regional basis, with a minimum for each region. Article 59 covers senators by right and senators for life appointed by the President. Sitting names are not copied.",
          ),
        ],
        [
          t(
            "Regions, provinces, metropolitan cities and municipalities have their own elections. This release has region pages and a first set of municipality pages. It does not name mayors or provincial presidents. The Interior Ministry’s anagrafe is the official list of local administrators.",
          ),
        ],
      ],
    },
    {
      heading: "Registration and how to vote",
      paragraphs: [
        [
          t(
            "The electoral roll and the ways of voting, including voting away from home, are administered by the Ministry of the Interior. They were not re-read as a voter manual on 23 October 2026, so they are not paraphrased. Start at the ",
          ),
          t("Department for Internal and Territorial Affairs", "https://dait.interno.gov.it/elezioni"),
          t("."),
        ],
      ],
    },
  ],
  electionsHeading: "What is on the calendar",
  elections: [
    {
      name: "Next general election",
      detail: "No later calling decree was read, so no polling day is printed.",
      href: "/it/en/elections/prossime-politiche/",
    },
    {
      name: "Chamber by-election, 01-Chieti",
      detail:
        "Sunday 15 and Monday 16 November 2026, in single-member constituency 01-Chieti. The calling decree is in Gazzetta Ufficiale no. 224 of 26 September 2026. This site prints no polls and no count.",
      href: "/it/en/elections/camera-chieti-2026/",
    },
  ],
  glossaryHeading: "Glossary",
  glossary: [
    { term: "Deputato", text: "A member of the Chamber. There are 400, of whom 8 are elected abroad." },
    { term: "Senatore elettivo", text: "An elected senator. Article 57 sets the number at 200, of whom 4 are elected abroad." },
    { term: "Circoscrizione Estero", text: "The overseas constituency for Italians living abroad." },
    { term: "Scioglimento anticipato", text: "An early dissolution. It ends the five-year term before it runs out." },
  ],
  faqHeading: "Questions",
  faq: [
    { q: "Who can vote for the Chamber?", a: "The Chamber’s page says deputies are elected by citizens who have turned 18." },
    { q: "When is the next general election?", a: "No calling decree was read. This site does not print a day." },
    { q: "Are local officeholders named?", a: "No. Use the Interior Ministry anagrafe." },
  ],
  sourcesHeading: "Official pages for this section",
  sources: [
    { label: "Camera dei deputati, Chi elegge i deputati", href: CAMERA },
    { label: "DAIT, Elezioni", href: "https://dait.interno.gov.it/elezioni" },
    { label: "DAIT, Speciale elezioni (15–16 November 2026)", href: DAIT },
    { label: "Anagrafe degli amministratori", href: "https://dait.interno.gov.it/elezioni/anagrafe-amministratori" },
  ],
};

const itIt: Guide = {
  kicker: "Guida pratica",
  title: "Chi elegge la Camera, e che cosa segue",
  intro:
    "I numeri qui sotto vengono dalla pagina della Camera e dagli articoli della Costituzione già citati in questa pagina paese. Il modo di espressione del voto nella legge elettorale non è ricopiato. Non si aggiunge il nome di un amministratore locale.",
  blocks: [
    {
      heading: "Livelli",
      paragraphs: [
        [
          t("La pagina della Camera "),
          t("«Chi elegge i deputati»", CAMERA),
          t(", letta il 23 ottobre 2026, dice che la Camera, come il Senato, si rinnova ogni cinque anni salvo scioglimento anticipato. Dice che i deputati sono 400, eletti dai cittadini che hanno compiuto 18 anni, e che per essere eletti bisogna aver compiuto 25 anni. Otto deputati sono eletti dai cittadini italiani residenti all’estero. Rinvia all’articolo 56 della Costituzione come modificato dalla legge costituzionale n. 1 del 2020."),
        ],
        [t("L’articolo 57, già citato in questa pagina, dice che i senatori elettivi sono 200, quattro dei quali eletti nella circoscrizione Estero, su base regionale, con un minimo per regione. L’articolo 59 riguarda i senatori di diritto e i senatori a vita nominati dal Presidente. I nominativi in carica non sono copiati.")],
        [t("Regioni, province, città metropolitane e comuni hanno elezioni proprie. Questa edizione ha le pagine delle regioni e un primo gruppo di comuni. Non nomina sindaci né presidenti di provincia. L’anagrafe del Ministero dell’Interno è l’elenco ufficiale.")],
      ],
    },
    {
      heading: "Iscrizione e voto",
      paragraphs: [
        [
          t("Le liste elettorali e i modi di voto, compreso il voto fuori sede, li tiene il Ministero dell’Interno. Il 23 ottobre 2026 non sono stati riletti come manuale per l’elettore, e qui non si parafrasano. Il punto di partenza è il "),
          t("Dipartimento per gli affari interni e territoriali", "https://dait.interno.gov.it/elezioni"),
          t("."),
        ],
      ],
    },
  ],
  electionsHeading: "Che cosa c’è in calendario",
  elections: [
    { name: "Prossime elezioni politiche", detail: "Non risulta letto un decreto di convocazione successivo, quindi non si stampa un giorno.", href: "/it/it/elections/prossime-politiche/" },
    {
      name: "Suppletiva della Camera, 01-Chieti",
      detail:
        "Domenica 15 e lunedì 16 novembre 2026, nel collegio uninominale 01-Chieti. Il decreto di convocazione è nella Gazzetta Ufficiale n. 224 del 26 settembre 2026. Questo sito non pubblica sondaggi né un conteggio.",
      href: "/it/it/elections/camera-chieti-2026/",
    },
  ],
  glossaryHeading: "Glossario",
  glossary: [
    { term: "Deputato", text: "Membro della Camera. Sono 400, di cui 8 eletti all’estero." },
    { term: "Senatore elettivo", text: "Senatore eletto. L’articolo 57 ne fissa 200, di cui 4 eletti all’estero." },
    { term: "Circoscrizione Estero", text: "La circoscrizione per i cittadini italiani residenti all’estero." },
    { term: "Scioglimento anticipato", text: "Chiude la legislatura prima dei cinque anni." },
  ],
  faqHeading: "Domande",
  faq: [
    { q: "Chi vota per la Camera?", a: "La pagina della Camera dice che i deputati sono eletti dai cittadini che hanno compiuto 18 anni." },
    { q: "Quando sono le prossime politiche?", a: "Non è stato letto un decreto di convocazione. Il sito non stampa un giorno." },
    { q: "Si pubblicano gli amministratori locali?", a: "No. Si usa l’anagrafe del Ministero dell’Interno." },
  ],
  sourcesHeading: "Pagine ufficiali di questa sezione",
  sources: itEn.sources,
};

const mxEn: Guide = {
  kicker: "Practical guide",
  title: "The federal election of 6 June 2027",
  intro:
    "The seat split below is what the INE page, read on 17 October 2026, prints. Credential rules and the detail of voting from abroad were not re-read as a voter manual on 23 October 2026, so they are not paraphrased. Sitting municipal presidents are not named.",
  blocks: [
    {
      heading: "Levels",
      paragraphs: [
        [
          t(
            "The federal election renews the Chamber of Deputies: 300 seats by relative majority, one for each federal single-member district, and 200 by proportional representation in five constituencies. The INE page for 2027 prints those two figures and sets polling day on Sunday 6 June 2027. The same page does not list Senate seats among the federal offices to be renewed.",
          ),
        ],
        [
          t(
            "Each of the 32 entidades federativas runs local elections on its own calendar, coordinated with the federal process. This release has a page for each entidad, each federal district, and each row of the INEGI municipality catalogue, including the 16 alcaldías of Mexico City.",
          ),
        ],
      ],
    },
    {
      heading: "The statute",
      paragraphs: [
        [
          t("The "),
          t("Ley General de Instituciones y Procedimientos Electorales", LGIPE),
          t(
            " is the statute for the federal electoral bodies, the vote, and the publication of polls. Article 251, as used in this site’s election-law table, is why no poll figures are printed in the three days before polling day. The ",
          ),
          t("Instituto Nacional Electoral", INE),
          t(" runs the federal process."),
        ],
      ],
    },
  ],
  electionsHeading: "What is dated",
  elections: [
    {
      name: "Federal deputies",
      detail: "Sunday 6 June 2027. The INE page says the process began on 10 September 2026.",
      href: "/mx/en/elections/diputaciones-federales-2027/",
    },
    {
      name: "Local elections",
      detail: "The INE page includes local elections in the 32 entidades, and names 17 gubernaturas. This guide does not add a gubernatura that the INE page did not list.",
      href: "/mx/en/elections/",
    },
  ],
  glossaryHeading: "Glossary",
  glossary: [
    { term: "Mayoría relativa", text: "The candidate with the most votes in a single-member federal district. There are 300 such seats." },
    { term: "Representación proporcional", text: "200 Chamber seats filled from five plurinominal constituencies." },
    { term: "Entidad federativa", text: "One of the 31 states or Mexico City." },
    { term: "Alcaldía", text: "One of the 16 local areas of Mexico City in the INEGI catalogue. This site does not name the person in office." },
  ],
  faqHeading: "Questions",
  faq: [
    { q: "Are senators elected in 2027?", a: "The INE page read on 17 October 2026 does not list Senate seats among the federal offices to be renewed." },
    { q: "Does this site name municipal presidents?", a: "No." },
    { q: "Are there poll numbers?", a: "No. The site prints none." },
  ],
  sourcesHeading: "Official pages for this section",
  sources: [
    { label: "Instituto Nacional Electoral", href: INE },
    { label: "LGIPE (PDF, Cámara de Diputados)", href: LGIPE },
  ],
};

const mxEs: Guide = {
  kicker: "Guía práctica",
  title: "La elección federal del 6 de junio de 2027",
  intro:
    "El reparto de escaños es el que imprime la página del INE leída el 17 de octubre de 2026. Las reglas de la credencial y el detalle del voto desde el extranjero no se releyeron como manual el 23 de octubre de 2026, y no se parafrasean. No se nombran presidentes municipales en funciones.",
  blocks: [
    {
      heading: "Niveles",
      paragraphs: [
        [t("La elección federal renueva la Cámara de Diputados: 300 cargos de mayoría relativa, uno por distrito uninominal, y 200 de representación proporcional en cinco circunscripciones. La página del INE para 2027 imprime esas dos cifras y fija la jornada el domingo 6 de junio de 2027. La misma página no lista senadurías entre los cargos federales a renovar.")],
        [t("Cada una de las 32 entidades federativas tiene su calendario local, coordinado con el proceso federal. Esta edición tiene página por entidad, por distrito federal y por cada fila del catálogo de municipios del INEGI, incluidas las 16 alcaldías de la Ciudad de México.")],
      ],
    },
    {
      heading: "La ley",
      paragraphs: [
        [
          t("La "),
          t("Ley General de Instituciones y Procedimientos Electorales", LGIPE),
          t(" es la norma de las autoridades electorales federales, del voto y de la publicación de encuestas. El artículo 251, tal como lo usa la tabla de este sitio, es la razón de no imprimir cifras de encuestas en los tres días anteriores a la jornada. El "),
          t("Instituto Nacional Electoral", INE),
          t(" conduce el proceso federal."),
        ],
      ],
    },
  ],
  electionsHeading: "Lo que tiene fecha",
  elections: [
    { name: "Diputaciones federales", detail: "Domingo 6 de junio de 2027. La página del INE dice que el proceso inició el 10 de septiembre de 2026.", href: "/mx/es/elections/diputaciones-federales-2027/" },
    { name: "Elecciones locales", detail: "La página del INE incluye elecciones locales en las 32 entidades y nombra 17 gubernaturas. Esta guía no añade una gubernatura que esa página no liste.", href: "/mx/es/elections/" },
  ],
  glossaryHeading: "Glosario",
  glossary: [
    { term: "Mayoría relativa", text: "La candidatura con más votos en un distrito federal uninominal. Son 300 cargos." },
    { term: "Representación proporcional", text: "200 diputaciones que se cubren en cinco circunscripciones plurinominales." },
    { term: "Entidad federativa", text: "Uno de los 31 estados o la Ciudad de México." },
    { term: "Alcaldía", text: "Una de las 16 demarcaciones de la Ciudad de México en el catálogo del INEGI. Este sitio no nombra a quien ocupa el cargo." },
  ],
  faqHeading: "Preguntas",
  faq: [
    { q: "¿En 2027 se eligen senadurías?", a: "La página del INE leída el 17 de octubre de 2026 no las lista entre los cargos federales a renovar." },
    { q: "¿Se nombran presidentes municipales?", a: "No." },
    { q: "¿Hay cifras de encuestas?", a: "No." },
  ],
  sourcesHeading: "Páginas oficiales de esta sección",
  sources: mxEn.sources,
};

const plEn: Guide = {
  kicker: "Practical guide",
  title: "Sejm, Senate, and the silence rules",
  intro:
    "The seat numbers below are the ones already tied, on this country page, to the Constitution and the Electoral Code. Who may vote, and the steps at a polling station, were not re-read as a voter manual on 23 October 2026, so they are not paraphrased. No local officeholder is named.",
  blocks: [
    {
      heading: "Levels",
      paragraphs: [
        [
          t(
            "The Sejm has 460 deputies, elected in the multi-member constituencies of annex 1 to the Electoral Code. The Senate has 100 senators. Article 97 of the Constitution says so, and article 256 of the Code says they are elected by majority in the single-member constituencies of annex 2.",
          ),
        ],
        [
          t(
            "Voivodeships, powiats and gminas have their own bodies. This release has a page for each. It does not name the person who holds a local office. The National Electoral Commission is the official source for results and for the electoral calendar.",
          ),
        ],
      ],
    },
    {
      heading: "What may not be published",
      paragraphs: [
        [
          t("Articles 107 and 115 of the "),
          t("Electoral Code", KODEKS),
          t(
            " are why this site prints no campaign material, no poll result and no exit-poll figure during election silence. For the Senate by-election in constituency 20, that window is already in the notice at the top of the site. The ",
          ),
          t("National Electoral Commission", PKW),
          t(" is the body that publishes the official count."),
        ],
      ],
    },
  ],
  electionsHeading: "What is dated",
  elections: [
    {
      name: "Senate by-election, constituency 20",
      detail: "22 November 2026. No count is shown until voting has ended and the Commission publishes it.",
      href: "/pl/en/elections/",
    },
    {
      name: "Sejm and Senate",
      detail: "The constitutional window is 14 October to 12 November 2027. The President sets the day. This page does not invent one.",
      href: "/pl/en/elections/sejm-senat-2027/",
    },
  ],
  glossaryHeading: "Glossary",
  glossary: [
    { term: "Sejm", text: "The lower chamber. 460 deputies, multi-member constituencies." },
    { term: "Senat", text: "The upper chamber. 100 senators, elected by majority in single-member constituencies." },
    { term: "Cisza wyborcza", text: "Election silence. It limits campaigning and the publication of poll results." },
    { term: "Gmina", text: "The basic unit of local government. This site has a page for each and names no officeholder." },
  ],
  faqHeading: "Questions",
  faq: [
    { q: "When is the next parliamentary election?", a: "Inside the window of 14 October to 12 November 2027. The President sets the day. It is not printed here as a single date." },
    { q: "Does the site name wójts, burmistrzowie or prezydenci miast?", a: "No." },
    { q: "Are there poll figures?", a: "No." },
  ],
  sourcesHeading: "Official pages for this section",
  sources: [
    { label: "Kodeks wyborczy", href: KODEKS },
    { label: "Państwowa Komisja Wyborcza", href: PKW },
  ],
};

const plPl: Guide = {
  kicker: "Przewodnik",
  title: "Sejm, Senat i cisza wyborcza",
  intro:
    "Liczby mandatów poniżej są tymi, które ta strona krajowa już wiąże z Konstytucją i Kodeksem wyborczym. Tego, kto ma prawo głosu, i przebiegu głosowania w lokalu nie czytano 23 października 2026 r. jako instrukcji dla wyborcy, więc tego nie parafrazujemy. Nie podajemy nazwisk osób na urzędach lokalnych.",
  blocks: [
    {
      heading: "Poziomy",
      paragraphs: [
        [t("Sejm liczy 460 posłów, wybieranych w okręgach wielomandatowych z załącznika nr 1 do Kodeksu wyborczego. Senat liczy 100 senatorów. Tak stanowi art. 97 Konstytucji, a art. 256 Kodeksu mówi, że są wybierani większością głosów w jednomandatowych okręgach z załącznika nr 2.")],
        [t("Województwa, powiaty i gminy mają własne organy. Ta edycja ma stronę każdego z nich. Nie podaje osoby sprawującej urząd. Państwowa Komisja Wyborcza jest oficjalnym źródłem wyników i kalendarza.")],
      ],
    },
    {
      heading: "Czego nie wolno publikować",
      paragraphs: [
        [
          t("Art. 107 i 115 "),
          t("Kodeksu wyborczego", KODEKS),
          t(" są powodem, dla którego w ciszy wyborczej ten serwis nie publikuje agitacji, wyników sondaży ani sondażu z dnia głosowania. Dla wyborów uzupełniających do Senatu w okręgu 20 ten okres jest już w komunikacie u góry strony. "),
          t("Państwowa Komisja Wyborcza", PKW),
          t(" ogłasza oficjalne wyniki."),
        ],
      ],
    },
  ],
  electionsHeading: "Co ma datę",
  elections: [
    { name: "Wybory uzupełniające do Senatu, okręg 20", detail: "22 listopada 2026 r. Wyników nie ma, dopóki głosowanie się nie skończy i Komisja ich nie poda.", href: "/pl/pl/elections/" },
    { name: "Sejm i Senat", detail: "Okno konstytucyjne to 14 października – 12 listopada 2027 r. Dzień wyznacza Prezydent. Ta strona go nie wymyśla.", href: "/pl/pl/elections/sejm-senat-2027/" },
  ],
  glossaryHeading: "Słownik",
  glossary: [
    { term: "Sejm", text: "Izba niższa. 460 posłów, okręgi wielomandatowe." },
    { term: "Senat", text: "Izba wyższa. 100 senatorów, większość w okręgach jednomandatowych." },
    { term: "Cisza wyborcza", text: "Ogranicza agitację i podawanie wyników sondaży." },
    { term: "Gmina", text: "Podstawowa jednostka samorządu. Jest strona każdej gminy i nie ma na niej nazwiska." },
  ],
  faqHeading: "Pytania",
  faq: [
    { q: "Kiedy są następne wybory parlamentarne?", a: "W oknie od 14 października do 12 listopada 2027 r. Dzień wyznacza Prezydent. Nie jest tu podany jako jedna data." },
    { q: "Czy serwis podaje wójtów, burmistrzów i prezydentów miast?", a: "Nie." },
    { q: "Czy są liczby z sondaży?", a: "Nie." },
  ],
  sourcesHeading: "Strony urzędowe tej sekcji",
  sources: plEn.sources,
};

function chGuide(lang: "en" | "de" | "fr" | "it"): Guide {
  const home = `/ch/${lang}/`;
  const election = `${home}elections/nationalrat-2027/`;
  const copy = {
    en: {
      kicker: "Practical guide",
      title: "Federal elections, in short",
      intro:
        "Articles 148 to 150 are already set out on this page. This note adds only the practical points and the dates an official release has printed. The ch.ch elections page did not return its election text when it was requested on 23 October 2026, so postal voting is not described.",
      levels:
        "The Federal Assembly is the National Council and the Council of States, with equal standing. Article 149: 200 National Council seats, direct election under proportional representation, a full renewal every four years, each canton a constituency, seats by population, at least one seat per canton. Article 150: 46 Council of States seats. Six cantons elect one member; the others elect two. The canton regulates that election. Cantons and communes have their own elections. This release does not name communal executives.",
      vote: "Who may vote in a federal election, and how a postal vote works, are not paraphrased here. The Federal Council’s votes and elections pages are the place to confirm them.",
      coming: "National Council election of 24 October 2027, from the Federal Council release of 27 August 2025. A federal popular vote is set for 29 November 2026. This site prints no result and no poll for that vote.",
      gap: "No candidacy list for 24 October 2027 had been read. No name is added.",
    },
    de: {
      kicker: "Kurz gefasst",
      title: "Eidgenössische Wahlen",
      intro:
        "Die Artikel 148 bis 150 stehen bereits auf dieser Seite. Hier nur der praktische Hinweis und die Daten, die eine amtliche Mitteilung nennt. Die Seite ch.ch zu den Wahlen lieferte am 23. Oktober 2026 keinen Wahltext, deshalb wird die brieflichen Stimmabgabe nicht beschrieben.",
      levels:
        "Die Bundesversammlung besteht aus Nationalrat und Ständerat, gleichgestellt. Artikel 149: 200 Sitze im Nationalrat, direkte Wahl nach Proporz, Gesamterneuerung alle vier Jahre, jeder Kanton ein Wahlkreis, Sitze nach Bevölkerung, mindestens ein Sitz. Artikel 150: 46 Sitze im Ständerat. Sechs Kantone wählen eine Person, die übrigen zwei. Der Kanton regelt diese Wahl. Kantone und Gemeinden haben eigene Wahlen. Diese Ausgabe nennt keine Gemeindeexekutiven.",
      vote: "Wer an einer eidgenössischen Wahl teilnehmen darf und wie die briefliche Stimmabgabe geht, wird hier nicht nacherzählt. Maßgebend sind die Seiten des Bundesrates.",
      coming:
        "Nationalratswahl vom 24. Oktober 2027, nach der Medienmitteilung des Bundesrates vom 27. August 2025. Eine eidgenössische Volksabstimmung ist auf den 29. November 2026 angesetzt. Diese Website druckt dazu weder ein Ergebnis noch eine Umfrage.",
      gap: "Eine Kandidatenliste für den 24. Oktober 2027 lag nicht vor. Es wird kein Name ergänzt.",
    },
    fr: {
      kicker: "En bref",
      title: "Élections fédérales",
      intro:
        "Les articles 148 à 150 sont déjà sur cette page. Ici, seulement le rappel pratique et les dates qu’un communiqué officiel a imprimées. La page ch.ch sur les élections n’a pas renvoyé son texte le 23 octobre 2026, donc le vote par correspondance n’est pas décrit.",
      levels:
        "L’Assemblée fédérale, ce sont le Conseil national et le Conseil des États, à égalité. Article 149 : 200 sièges au Conseil national, élection directe à la proportionnelle, renouvellement intégral tous les quatre ans, chaque canton est une circonscription, sièges selon la population, au moins un siège. Article 150 : 46 sièges au Conseil des États. Six cantons en élisent un, les autres deux. Le canton règle cette élection. Cantons et communes ont leurs élections. Cette édition ne nomme pas les exécutifs communaux.",
      vote: "Qui peut voter à une élection fédérale, et comment voter par correspondance, n’est pas repris ici. Les pages du Conseil fédéral font foi.",
      coming:
        "Élection du Conseil national du 24 octobre 2027, d’après le communiqué du Conseil fédéral du 27 août 2025. Une votation populaire fédérale est fixée au 29 novembre 2026. Ce site n’en publie ni résultat ni sondage.",
      gap: "Aucune liste de candidatures pour le 24 octobre 2027 n’avait été lue. Aucun nom n’est ajouté.",
    },
    it: {
      kicker: "In breve",
      title: "Elezioni federali",
      intro:
        "Gli articoli 148–150 sono già in questa pagina. Qui solo il richiamo pratico e le date che un comunicato ufficiale ha stampato. La pagina ch.ch sulle elezioni non ha restituito il testo il 23 ottobre 2026, quindi il voto per corrispondenza non è descritto.",
      levels:
        "L’Assemblea federale è il Consiglio nazionale e il Consiglio degli Stati, sullo stesso piano. Articolo 149: 200 seggi al Consiglio nazionale, elezione diretta secondo il principio proporzionale, rinnovo integrale ogni quattro anni, ogni cantone è un circondario, seggi secondo la popolazione, almeno un seggio. Articolo 150: 46 seggi al Consiglio degli Stati. Sei cantoni ne eleggono uno, gli altri due. Il cantone disciplina l’elezione. Cantoni e comuni hanno elezioni proprie. Questa edizione non nomina gli esecutivi comunali.",
      vote: "Chi può votare a un’elezione federale, e come funziona il voto per corrispondenza, non è parafrasato. Fanno fede le pagine del Consiglio federale.",
      coming:
        "Elezione del Consiglio nazionale del 24 ottobre 2027, dal comunicato del Consiglio federale del 27 agosto 2025. Una votazione popolare federale è fissata al 29 novembre 2026. Questo sito non ne pubblica né un risultato né un sondaggio.",
      gap: "Nessun elenco di candidature per il 24 ottobre 2027 era stato letto. Non si aggiunge alcun nome.",
    },
  }[lang];
  const headings = {
    en: ["Chambers", "Taking part", "Dated votes", "Glossary", "Questions", "Official pages"],
    de: ["Räte", "Teilnahme", "Termine", "Begriffe", "Fragen", "Amtliche Seiten"],
    fr: ["Chambres", "Participation", "Échéances", "Glossaire", "Questions", "Pages officielles"],
    it: ["Camere", "Partecipazione", "Scadenze", "Glossario", "Domande", "Pagine ufficiali"],
  }[lang];
  const gloss = {
    en: [
      { term: "National Council", text: "200 seats. Direct proportional election. Full renewal every four years." },
      { term: "Council of States", text: "46 seats. The canton sets the election rules." },
      { term: "Canton", text: "A constituency for the National Council, and a state with its own elections." },
    ],
    de: [
      { term: "Nationalrat", text: "200 Sitze. Direkte Proporzwahl. Gesamterneuerung alle vier Jahre." },
      { term: "Ständerat", text: "46 Sitze. Der Kanton regelt die Wahl." },
      { term: "Kanton", text: "Wahlkreis für den Nationalrat und Staat mit eigenen Wahlen." },
    ],
    fr: [
      { term: "Conseil national", text: "200 sièges. Élection directe à la proportionnelle. Renouvellement tous les quatre ans." },
      { term: "Conseil des États", text: "46 sièges. Le canton fixe les règles." },
      { term: "Canton", text: "Circonscription pour le Conseil national, et État avec ses propres élections." },
    ],
    it: [
      { term: "Consiglio nazionale", text: "200 seggi. Elezione diretta proporzionale. Rinnovo ogni quattro anni." },
      { term: "Consiglio degli Stati", text: "46 seggi. Il cantone fissa le regole." },
      { term: "Cantone", text: "Circondario per il Consiglio nazionale, e Stato con elezioni proprie." },
    ],
  }[lang];
  return {
    kicker: copy.kicker,
    title: copy.title,
    intro: copy.intro,
    blocks: [
      { heading: headings[0], paragraphs: [[t(copy.levels)]] },
      {
        heading: headings[1],
        paragraphs: [[t(copy.vote + " "), t(lang === "de" ? "Abstimmungen" : lang === "fr" ? "Votations" : lang === "it" ? "Votazioni" : "Votes and elections", CH_ADMIN), t(".")]],
      },
    ],
    electionsHeading: headings[2],
    elections: [
      { name: lang === "de" ? "Nationalrat" : lang === "fr" ? "Conseil national" : lang === "it" ? "Consiglio nazionale" : "National Council", detail: copy.coming, href: election },
    ],
    glossaryHeading: headings[3],
    glossary: gloss,
    faqHeading: headings[4],
    faq: [
      {
        q: lang === "de" ? "Gibt es eine Kandidatenliste?" : lang === "fr" ? "Y a-t-il une liste de candidatures ?" : lang === "it" ? "C’è una lista di candidature?" : "Is there a candidacy list?",
        a: copy.gap,
      },
      {
        q: lang === "de" ? "Stehen Umfragezahlen auf der Seite?" : lang === "fr" ? "La page donne-t-elle des sondages ?" : lang === "it" ? "La pagina riporta sondaggi?" : "Are poll figures on the page?",
        a: lang === "de" ? "Nein." : lang === "fr" ? "Non." : lang === "it" ? "No." : "No.",
      },
    ],
    sourcesHeading: headings[5],
    sources: [
      { label: lang === "de" ? "Bundesrat, Abstimmungen" : lang === "fr" ? "Conseil fédéral, votations" : lang === "it" ? "Consiglio federale, votazioni" : "Federal Council, votes and elections", href: CH_ADMIN },
      { label: "Bundesamt für Statistik", href: "https://www.bfs.admin.ch/bfs/de/home/statistiken/politik/abstimmungen.html" },
    ],
  };
}

const GUIDES: Record<string, Record<string, Guide>> = {
  au: { en: auEn },
  ca: { en: caEn, fr: caFr },
  gb: { en: gbEn },
  es: { en: esEn, es: esEs },
  it: { en: itEn, it: itIt },
  mx: { en: mxEn, es: mxEs },
  pl: { en: plEn, pl: plPl },
  ch: { en: chGuide("en"), de: chGuide("de"), fr: chGuide("fr"), it: chGuide("it") },
  ...hubGuides,
};

export function countryGuide(code: string, lang: string): Guide | null {
  const pack = GUIDES[code];
  if (!pack) return null;
  return pack[lang] ?? null;
}
