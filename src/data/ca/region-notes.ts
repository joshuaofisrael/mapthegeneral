import type { CaLang } from "./types";

const NOTES: Record<string, { en: string[]; fr: string[] }> = {
  alberta: {
    en: [
      "Elections Alberta says section 38.1 of the Election Act schedules the next provincial general election for October 18, 2027. The section it quotes says nothing in that section affects the Lieutenant Governor’s power to dissolve the Legislature. The same page carries the heading “October 19 is Referendum Election Day”. This page does not copy the referendum questions.",
    ],
    fr: [
      "Elections Alberta écrit que l’article 38.1 de l’Election Act fixe la prochaine élection générale provinciale au 18 octobre 2027. L’article cité dit que rien dans cet article ne porte atteinte au pouvoir du lieutenant-gouverneur de dissoudre la législature. La même page porte le titre « October 19 is Referendum Election Day ». Cette page ne copie pas les questions du référendum.",
    ],
  },
  "british-columbia": {
    en: [
      "Elections BC's 2026 provincial election page, read on 25 October 2026, says Final Voting Day is 24 October 2026. It says voters will elect 93 Members of the Legislative Assembly, and that each member represents an electoral district. Writ Day was 22 September 2026. Advance voting is 16–21 October 2026. Final count is planned for 6–10 November 2026, and Return Day is 18 November 2026. The writs of election page says a writ is issued for each of the province's 93 electoral districts. This page does not reprint candidates and does not report a count.",
    ],
    fr: [
      "La page d'Elections BC sur l'élection provinciale de 2026, lue le 25 octobre 2026, dit que le jour du scrutin final est le 24 octobre 2026. Elle dit que les électeurs éliront 93 membres de l'Assemblée législative, et que chaque membre représente une circonscription. Le jour du bref est le 22 septembre 2026. Le vote par anticipation a lieu du 16 au 21 octobre 2026. Le décompte final est prévu du 6 au 10 novembre 2026, et le Return Day est le 18 novembre 2026. La page des brefs dit qu'un bref est émis pour chacune des 93 circonscriptions de la province. Cette page ne reproduit pas les candidatures et ne rapporte pas un décompte.",
    ],
  },
  manitoba: {
    en: [
      "Elections Manitoba says Manitoba has a set date for general elections, although the law allows the election to be called before that date, and that the next set-date election will be October 5, 2027. This page does not print a last polling day. No page read for this release named the premier.",
    ],
    fr: [
      "Elections Manitoba écrit que le Manitoba a une date fixée pour les élections générales, même si la loi permet de convoquer l’élection avant cette date, et que la prochaine élection à date fixée aura lieu le 5 octobre 2027. Cette page n’imprime pas un dernier jour de scrutin. Aucune page lue pour cette livraison ne nomme le premier ministre.",
    ],
  },
  "new-brunswick": {
    en: [
      "No elections-office page for New Brunswick was read for this release, so this page does not print a last or a next provincial polling day and does not name a premier.",
    ],
    fr: [
      "Aucune page d’un bureau électoral du Nouveau-Brunswick n’a été lue pour cette livraison. Cette page n’imprime donc ni un dernier ni un prochain jour de scrutin provincial et ne nomme pas un premier ministre.",
    ],
  },
  "newfoundland-and-labrador": {
    en: [
      "A Government of Newfoundland and Labrador news release of 15 September 2025 says Mr. Travis Wooley, Chief Electoral Officer, issued election writs that day to all 40 district returning officers for the 52nd General Election, and that the election will take place on Tuesday, October 14, 2025. This page does not copy the results of that election. No later fixed date was read.",
    ],
    fr: [
      "Un communiqué du gouvernement de Terre-Neuve-et-Labrador du 15 septembre 2025 dit que M. Travis Wooley, directeur général des élections, a émis ce jour-là les brefs aux 40 directeurs du scrutin de district pour la 52e élection générale, et que l’élection aura lieu le mardi 14 octobre 2025. Cette page ne copie pas les résultats de cette élection. Aucune date fixée ultérieure n’a été lue.",
    ],
  },
  "northwest-territories": {
    en: [
      "Elections NWT says it is responsible to the Legislative Assembly of the Northwest Territories, that polling day is the first Tuesday in October four years after the last general election, and that the next territorial general election will be held on Tuesday, October 5, 2027. This page does not calculate the previous polling day from that sentence and does not name a premier.",
    ],
    fr: [
      "Elections NWT écrit qu’il relève de l’Assemblée législative des Territoires du Nord-Ouest, que le jour du scrutin est le premier mardi d’octobre quatre ans après la dernière élection générale, et que la prochaine élection générale territoriale aura lieu le mardi 5 octobre 2027. Cette page ne calcule pas le jour de scrutin précédent à partir de cette phrase et ne nomme pas un premier ministre.",
    ],
  },
  "nova-scotia": {
    en: [
      "No elections-office page for Nova Scotia was read for this release, so this page does not print a last or a next provincial polling day and does not name a premier.",
    ],
    fr: [
      "Aucune page d’un bureau électoral de la Nouvelle-Écosse n’a été lue pour cette livraison. Cette page n’imprime donc ni un dernier ni un prochain jour de scrutin provincial et ne nomme pas un premier ministre.",
    ],
  },
  nunavut: {
    en: [
      "No elections-office page for Nunavut was read for this release, so this page does not print a last or a next territorial polling day.",
    ],
    fr: [
      "Aucune page d’un bureau électoral du Nunavut n’a été lue pour cette livraison. Cette page n’imprime donc ni un dernier ni un prochain jour de scrutin territorial.",
    ],
  },
  ontario: {
    en: [
      "The consolidated Election Act on ontario.ca prints “9 Repealed: 2025, c. 15, Sched. 7, s. 1”, in force 27 November 2025. The text that was read does not print a fixed provincial polling day. Section 9.1(2) says that when an election is to be held, the Lieutenant Governor in Council may order the writs and appoint polling day. Section 9.1(5) says polling day shall be the fifth Thursday after the date of the writ. This page does not turn that rule into a calendar day.",
      "The ontario.ca ministers list, data last updated September 10, 2026, names The Honourable Doug Ford as Premier and President of the Council and Minister of Intergovernmental Affairs. This page does not copy the rest of that list.",
    ],
    fr: [
      "Le texte consolidé de l’Election Act sur ontario.ca imprime « 9 Repealed: 2025, c. 15, Sched. 7, s. 1 », en vigueur le 27 novembre 2025. Le texte lu n’imprime pas un jour de scrutin provincial fixe. L’article 9.1(2) dit que, lorsqu’une élection doit avoir lieu, le lieutenant-gouverneur en conseil peut ordonner les brefs et fixer le jour du scrutin. L’article 9.1(5) dit que le jour du scrutin est le cinquième jeudi après la date du bref. Cette page ne convertit pas cette règle en un jour du calendrier.",
      "La liste des ministres sur ontario.ca, données mises à jour le 10 septembre 2026, nomme The Honourable Doug Ford comme Premier and President of the Council et Minister of Intergovernmental Affairs. Cette page ne copie pas le reste de cette liste.",
    ],
  },
  "prince-edward-island": {
    en: [
      "Elections PEI says the fixed election date for the next provincial general election is Monday, October 4, 2027, that the first-past-the-post process is used, and that the Island is divided into 27 electoral districts. This page does not copy the seat description that follows those sentences and does not name a premier.",
    ],
    fr: [
      "Elections PEI écrit que la date fixée de la prochaine élection générale provinciale est le lundi 4 octobre 2027, que le mode uninominal majoritaire à un tour est utilisé, et que l’Île est divisée en 27 circonscriptions. Cette page ne copie pas la description des sièges qui suit ces phrases et ne nomme pas un premier ministre.",
    ],
  },
  quebec: {
    en: [
      "Élections Québec’s press release of 27 August 2026 says the provincial general election has been called and that polling day is Monday, October 5, 2026.",
      "The Assemblée nationale notice dated Wednesday, 14 October 2026 says that a candidate proclaimed elected becomes a member only when the secretary general receives the name from the Chief Electoral Officer. It says that, as of 16 October, the secretary general had received the names of 125 candidates proclaimed elected after the election of 5 October 2026. It then prints this composition since 5 October 2026: Parti québécois, 59; Parti libéral du Québec, 40; Parti conservateur du Québec, 19; Indépendants, with no figure in the text that was read; Québec solidaire, 9. It says a judicial recount is underway in Vachon and that a request for a judicial recount has been filed in Champlain. This page does not declare a government, a premier, or a winner.",
    ],
    fr: [
      "Le communiqué d’Élections Québec du 27 août 2026 dit que l’élection générale provinciale est convoquée et que le jour du scrutin est le lundi 5 octobre 2026.",
      "L’avis de l’Assemblée nationale daté du mercredi 14 octobre 2026 dit qu’une candidature proclamée élue ne devient membre que lorsque le secrétaire général reçoit le nom du directeur général des élections. Il dit qu’en date du 16 octobre, le secrétaire général avait reçu le nom de 125 candidates et candidats proclamés élus à la suite des élections du 5 octobre 2026. Il imprime ensuite cette composition depuis le 5 octobre 2026 : Parti québécois, 59 ; Parti libéral du Québec, 40 ; Parti conservateur du Québec, 19 ; Indépendants, sans chiffre dans le texte lu ; Québec solidaire, 9. Il dit qu’un dépouillement judiciaire est en cours dans Vachon et qu’une demande de dépouillement judiciaire a été déposée dans Champlain. Cette page ne déclare ni un gouvernement, ni un premier ministre, ni un vainqueur.",
    ],
  },
  saskatchewan: {
    en: [
      "Elections Saskatchewan’s FAQ says the Legislative Assembly Act, 2007 requires a provincial general election on the last Monday of October in the fourth calendar year after the previous general election, and that the next general election is scheduled for October 30, 2028. The same answer says the election period cannot overlap a federal election period. This page does not turn that overlap rule into a different day and does not name a premier.",
    ],
    fr: [
      "La FAQ d’Elections Saskatchewan dit que la Legislative Assembly Act, 2007 exige une élection générale provinciale le dernier lundi d’octobre de la quatrième année civile après l’élection générale précédente, et que la prochaine élection générale est prévue le 30 octobre 2028. La même réponse dit que la période électorale ne peut pas chevaucher celle d’une élection fédérale. Cette page ne transforme pas cette règle de chevauchement en un autre jour et ne nomme pas un premier ministre.",
    ],
  },
  yukon: {
    en: [
      "No elections-office page for Yukon was read for this release, so this page does not print a last or a next territorial polling day and does not name a premier.",
    ],
    fr: [
      "Aucune page d’un bureau électoral du Yukon n’a été lue pour cette livraison. Cette page n’imprime donc ni un dernier ni un prochain jour de scrutin territorial et ne nomme pas un premier ministre.",
    ],
  },
};

export function regionNotes(slug: string, lang: CaLang): string[] {
  const notes = NOTES[slug];
  if (!notes) throw new Error(`Missing notes for ${slug}`);
  return lang === "fr" ? notes.fr : notes.en;
}
