import type { EditorialPreview } from "./model";

const S = "Sources for this preview";
const PARL = "https://www.parliament.bg/en/news/ID/6600";
const RES = "https://results.cik.bg/pvr202610/rezultati/index.html";
const CODE = "https://www.ciela.net/svobodna-zona-normativi/view/2136112596/izboren-kodeks";
const ART = "https://magistrat.bg/laws/00af9385cb23:205";
const REG = "https://www.cik.bg/bg/pvr2026/registers/per_candidates";
const ARC = "https://results.cik.bg/index.html";

export const BATCH4: EditorialPreview[] = [
  {
    path: "/bg/en/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: S,
    paragraphs: [
      "What is at stake in Bulgaria is the presidency of the Republic and the vice presidency, which are filled together. On 31 July 2026 the National Assembly decided that the election would be held on 25 October 2026 and that a new election, if one were required, would be held on 1 November. This hub treats those two dates as the Assembly’s dates. It does not invent a third day, and it does not describe a government’s programme. A programme is the text a pair or a committee publishes. The page that carries the pairs is the election page, in Bulgarian by default, with an English switch.",
      "How a winner is decided, in Annex 2 of the Election Code as read for this hub, is a pair with more than half of the valid votes, and only if more than half of the voters took part. If no list is elected, the Central Election Commission schedules a new election within seven days between the two lists with the most votes. At that new election the pair with the most votes is elected. The Commission’s results table for 25 October, timed 15:00 on 26 October 2026, says every section protocol had been processed in the district commissions. No pair on that table has more than half of the printed distribution. The activity page showed midday and afternoon snapshots and said the evening figure is calculated later from protocols. This hub therefore does not say whether the turnout condition was met.",
      "How the day runs, in articles 220 and 229 of the same code, is a room that opens at 7:00 when more than half the section commission is present, and voting from 7:00 to 20:00. Abroad those hours are local time. People still outside the room at 20:00 may vote, and not later than 21:00. The Commission may allow some sections to start at 5:00. This preview does not copy the identity papers a voter must show and does not describe the actions inside the room. The results legend distinguishes paper voting and machine voting. Readers who need the local instruction should open the Commission.",
      "The history this hub will state as a list, and not as a copied count, is on the Commission’s results index: a presidential election on 14 November 2021 held with a National Assembly election, one on 6 November 2016, and one on 23 October 2011. Those archive totals were not opened row by row for this release, so they are not reprinted and not estimated. The ballot order for 2026 is the order of the October table. The public register is the Commission’s register. Naming a pair here without that table would add a label the preview did not take from the table, so the names stay on the election page.",
      "Article 205, paragraph 5, says results of public-opinion inquiries about the elections may not be made public in any form from 24 hours before election day until the end of election day is declared in the country. This site prints no such figure on any day, including outside that span, and it prints no forecast of the November vote. A November count will be added only from the Commission, after the close. A correction of a date, an hour, or a name should be checked against the Commission and the Assembly, which are the offices named on this page.",
    ],
    citations: [
      { label: "National Assembly, 31 July 2026", href: PARL },
      { label: "Central Election Commission, 25 October 2026 results", href: RES },
      { label: "Election Code, consolidated text", href: CODE },
      { label: "Election Code, article 205", href: ART },
    ],
  },
  {
    path: "/bg/bg/",
    lang: "bg",
    heading: "Редакционен преглед",
    updatedLocal: "Обновено: 27 октомври 2026.",
    sourcesHeading: "Източници за този преглед",
    paragraphs: [
      "На карта е президентството на републиката заедно с вицепрезидентството. На 31 юли 2026 г. Народното събрание реши изборите да са на 25 октомври 2026 г., а нов избор, ако е нужен, да е на 1 ноември. Този хъб приема тези две дати като дати на събранието. Не измисля трети ден и не описва програма на управление. Програма е текстът, който двойка или комитет сам публикува. Страницата с двойките е страницата на избора, на български по подразбиране, с превключвател към английски.",
      "Как се решава победител, в приложение № 2 към Изборния кодекс, както е прочетен за този хъб, е двойка с повече от половината действителни гласове, и само ако са гласували повече от половината избиратели. Ако няма избрана листа, Централната избирателна комисия насрочва нов избор в седемдневен срок между двете листи с най-много гласове. На новия избор е избрана двойката с най-много гласове. Таблицата на комисията за 25 октомври, към 15:00 на 26 октомври 2026 г., казва, че всички секционни протоколи са обработени в районните комисии. Нито една двойка в таблицата няма повече от половината от отпечатаното разпределение. Страницата за активност показа обедни и следобедни снимки и каза, че вечерната цифра се смята по-късно от протоколите. Затова този хъб не казва дали условието за активност е изпълнено.",
      "Как тече денят, в членове 220 и 229 от същия кодекс, е помещение, което се открива в 7:00, ако присъстват повече от половината членове на секционната комисия, и гласуване от 7:00 до 20:00. В чужбина часовете са местни. Който е пред помещението в 20:00, може да гласува, но не по-късно от 21:00. Комисията може да разреши на някои секции да започнат в 5:00. Този преглед не преписва документите за самоличност и не описва действията в помещението. Легендата на резултатите различава хартиено и машинно гласуване. Който търси местното указание, отваря комисията.",
      "Историята, която този хъб ще посочи като списък, а не като преписан сбор, е в указателя на резултатите: президентски избори на 14 ноември 2021 г. заедно с избори за народни представители, на 6 ноември 2016 г. и на 23 октомври 2011 г. Архивните сборове не са отворени ред по ред за това издание, затова не са препечатани и не са пресмятани. Редът в бюлетината за 2026 г. е редът в октомврийската таблица. Публичният регистър е регистърът на комисията. Да се назове тук двойка без тази таблица би добавило етикет, който прегледът не е взел от таблицата, затова имената остават на страницата на избора.",
      "Член 205, алинея 5, казва, че резултати от допитвания до общественото мнение по повод на изборите не може да се огласяват под каквато и да е форма от 24 часа преди изборния ден до обявяване края на изборния ден на територията на страната. Този сайт не печата такава цифра в нито един ден, включително извън този срок, и не печата прогноза за ноемврийския вот. Ноемврийски резултат ще се добави само от комисията, след края на деня. Поправка на дата, час или име се сверява с комисията и със събранието, които са службите, посочени на тази страница.",
    ],
    citations: [
      { label: "Народно събрание, 31 юли 2026 г.", href: PARL },
      { label: "Централна избирателна комисия, резултати от 25 октомври 2026 г.", href: RES },
      { label: "Изборен кодекс, консолидиран текст", href: CODE },
      { label: "Изборен кодекс, чл. 205", href: ART },
    ],
  },
  {
    path: "/bg/en/elections/president-2026/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: S,
    paragraphs: [
      "What is being voted on Sunday 1 November 2026 is a new election for president and vice president, on the date the National Assembly set on 31 July 2026 for the case in which the 25 October vote elected no pair. The first vote is not erased by that sentence. The Central Election Commission’s table for 25 October was read on 27 October 2026. It is timed 15:00 on 26 October and says 100 percent of section protocols had been processed in the district commissions. The distribution column does not give any pair more than half. Annex 2 also requires that more than half of the voters took part. The activity page did not print a final turnout, only snapshots at 11:00 and at 16:00, and a note that the 20:00 figure comes later from the protocols. This page does not fill that gap with a guess.",
      "The two largest shares on that table are pair number 25, Илияна Малинова Йотова and Кирил Александров Вълчев, and pair number 4, Андрей Атанасов Гюров and Георги Димитров Кандев. Those are the spellings the Commission printed. This preview does not translate them into a campaign label and does not say which of them should win on 1 November. The code says that if no list was elected, the new election is between the two lists with the most votes, and the pair with the most votes at that election is elected. Decision 415 of 26 October, listed on the Commission’s election page, amends the paper-ballot specification for a possible new election on 1 November. The title read here does not declare a winner.",
      "Ballot order on the election page is the order of that table, numbers 1 to 27, and then the line „Не подкрепям никого“, which is not a pair. Each pair links to the public register of candidates. The register is one official list, not a set of private biographies. A reader who wants a pair’s own statement of aims should open what that pair publishes. This site does not rank the pairs and does not tell a voter which number to mark. The hours, again from the code, are 7:00 to 20:00, with the room opened at 7:00 when a quorum of the section commission is there, and with voting after 20:00 only for people already outside, and not after 21:00.",
      "Earlier presidential elections stay on the results index as dates: 14 November 2021, 6 November 2016 and 23 October 2011. Their totals are not on this page because the archive rows were not the file being read figure by figure. A past share is not a guide to November. Parties and initiative committees appear under the names the October table printed. A programme remains their text, not a paraphrase written here. The about page states that method for every country on the site.",
      "The blackout in article 205, paragraph 5, runs from 24 hours before election day until the Commission declares the end of election day in the country. For a vote on 1 November that span is the day before and the election day itself, until the declaration. This site’s rule is stricter: it prints no survey figure before that span either, and none after it. The November results section on this page is empty of counts until an official Commission table exists and the day has ended. The October rows already shown are the Commission’s own distribution, not a forecast and not a sample of people leaving stations.",
    ],
    citations: [
      { label: "National Assembly, 31 July 2026", href: PARL },
      { label: "Central Election Commission, 25 October 2026 results", href: RES },
      { label: "Central Election Commission, public register of pairs", href: REG },
      { label: "Central Election Commission, results index", href: ARC },
      { label: "Election Code, article 205", href: ART },
    ],
  },
  {
    path: "/bg/bg/elections/prezident-2026/",
    lang: "bg",
    heading: "Редакционен преглед",
    updatedLocal: "Обновено: 27 октомври 2026.",
    sourcesHeading: "Източници за този преглед",
    paragraphs: [
      "На 1 ноември 2026 г., неделя, се гласува на нов избор за президент и вицепрезидент, на датата, която Народното събрание определи на 31 юли 2026 г. за случая, в който вотът на 25 октомври не е избрал двойка. Първият вот не се заличава от това изречение. Таблицата на Централната избирателна комисия за 25 октомври е прочетена на 27 октомври 2026 г. Тя е към 15:00 на 26 октомври и казва, че сто процента от секционните протоколи са обработени в районните комисии. Колоната с разпределението не дава на никоя двойка повече от половината. Приложение № 2 иска и повече от половината избиратели да са гласували. Страницата за активност не отпечата крайна активност, а снимки в 11:00 и в 16:00 и бележка, че цифрата за 20:00 идва по-късно от протоколите. Тази страница не запълва празнината с догадка.",
      "Двете най-големи дялове в таблицата са двойка номер 25, Илияна Малинова Йотова и Кирил Александров Вълчев, и двойка номер 4, Андрей Атанасов Гюров и Георги Димитров Кандев. Това е официалният правопис. Този преглед не ги превръща в кампаниен етикет и не казва коя от тях трябва да спечели на 1 ноември. Кодексът казва, че ако няма избрана листа, новият избор е между двете листи с най-много гласове, а на него е избрана двойката с най-много гласове. Решение № 415 от 26 октомври, обявено на страницата на изборите, изменя характеристиката на хартиената бюлетина за евентуален нов избор на 1 ноември. Заглавието, прочетено тук, не обявява победител.",
      "Редът на бюлетината на страницата на избора е редът в тази таблица, номера от 1 до 27, и след това редът „Не подкрепям никого“, който не е двойка. Всяка двойка води към публичния регистър на кандидатите. Регистърът е един официален списък, не набор от частни биографии. Който търси собствения текст на двойка за целите ѝ, отваря това, което двойката публикува. Този сайт не подрежда двойките по заслуга и не казва на избирателя кой номер да отбележи. Часовете, пак от кодекса, са от 7:00 до 20:00, с откриване в 7:00 при кворум на секционната комисия, и с гласуване след 20:00 само за хората, които вече са отпред, и не след 21:00.",
      "По-ранните президентски избори остават в указателя като дати: 14 ноември 2021 г., 6 ноември 2016 г. и 23 октомври 2011 г. Техните сборове не са на тази страница, защото архивните редове не бяха файлът, четен цифра по цифра. Минал дял не е ориентир за ноември. Партиите и инициативните комитети стоят под имената, които октомврийската таблица отпечата. Програмата си остава техен текст, не преразказ, написан тук. Страницата „За сайта“ описва този метод за всяка държава.",
      "Забраната в член 205, алинея 5, тече от 24 часа преди изборния ден до обявяване края на изборния ден на територията на страната. За вот на 1 ноември този срок е предишният ден и самият изборен ден, до обявяването. Правилото на този сайт е по-строго: той не печата цифра от допитване и преди този срок, и след него. Разделът за ноемврийските резултати на тази страница е без сборове, докато няма официална таблица на комисията и денят не е приключил. Октомврийските редове, които вече се виждат, са собственото разпределение на комисията, не прогноза и не извадка от хора, излизащи от секциите.",
    ],
    citations: [
      { label: "Народно събрание, 31 юли 2026 г.", href: PARL },
      { label: "Централна избирателна комисия, резултати от 25 октомври 2026 г.", href: RES },
      { label: "Централна избирателна комисия, публичен регистър", href: REG },
      { label: "Централна избирателна комисия, указател на резултатите", href: ARC },
      { label: "Изборен кодекс, чл. 205", href: ART },
    ],
  },
];
