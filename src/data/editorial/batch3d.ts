import type { EditorialPreview } from "./model";

const S = "Sources for this preview";
const DATE = "https://www.gov.il/en/pages/knesset26-date";
const ABOUT = "https://www.gov.il/en/pages/election-about-info";
const LISTS = "https://www.gov.il/he/pages/candidates-lists-26";
const LAW = "https://www.nevo.co.il/law_html/law00/90696.htm";
const GOV = "https://www.srbija.gov.rs/vest/en/288494";
const RTS = "https://www.rts.rs/lat/vesti/politika/6049890.html";
const RIK = "https://www.rik.parlament.gov.rs/";
const RTS_RIK = "https://www.rts.rs/lat/vesti/izbori-2026/6049980/dimitrijevic-za-rts-sve-tece-po-planu-do-25-oktobra-bice-sve-spremno-za-izbore.html";

export const BATCH3D: EditorialPreview[] = [
  {
    path: "/il/en/elections/knesset-2026/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: S,
    paragraphs: [
      "What is being elected on Tuesday 27 October 2026 is the 26th Knesset. The Central Elections Committee set that day, 16 Heshvan 5787, as election day. The Knesset has 120 seats. The whole country is one constituency. Voters choose a list, and lists that clear the legal line share the seats in proportion to their votes. The government that follows is a matter for the Knesset after the official count. This page does not predict a coalition, does not call a winner, and does not describe a list’s programme. A programme is the text the list publishes.",
      "How the day is organised, on the Committee’s pages read for this election, is a single polling day. Stations open at 07:00. Most stay open until 22:00. Some small stations close at 20:00. This site does not copy the identification steps used inside a station, and it does not copy the order of actions at the ballot box. Vote totals, when this site is allowed to show them, start from the Committee’s file after 22:00 Israel time. The legal deadline for publishing the official results in the Reshumot gazette is 4 November 2026. Until the Committee publishes a count, this page shows none. A seat allocation calculated from partial official totals is labelled unofficial, not final, and not an official seat allocation.",
      "The line a list must clear, on the Committee’s page about elections in Israel, is 3.25 percent of the votes cast. A list below that line is not represented. Lists above it share the 120 seats in proportion to their votes. That is the system the Committee describes. This preview does not restate a formula the page did not print, and it does not apply the line to a set of figures, because no count is being published in this text. History, as far as the Committee’s title for this day goes, is that the election chooses the 26th Knesset. Earlier Knesset totals were not copied onto this page, so they are not repeated here as if they had been.",
      "Candidate lists are the Committee’s lists. The Hebrew lists page for the 26th Knesset is the official list. The names on that page were not copied into this preview. Naming a list here without the Committee’s wording would add a label the preview did not take from that page, so it is not done. Readers who want the lists should open the Committee’s page. Readers who want a list’s own statement of its aims should open that list’s publication. This site does not rank the lists and does not say how a voter should choose among them.",
      "The Elections (Modes of Propaganda) Law, as this site’s election-law table records it, bars publishing new election-survey results from the end of the Friday before polling day until the polls close. On 27 October 2026 that bar is in force until the close. This site prints no survey figure at any time, including before that Friday and after the close, and it prints no sample of voters leaving stations. The about page states that method. A correction of the date, the hours, or the 3.25 percent line should be checked against the Committee, which is the office named on this page.",
    ],
    citations: [
      { label: "Central Elections Committee, date of the 26th Knesset election", href: DATE },
      { label: "Central Elections Committee, elections in Israel", href: ABOUT },
      { label: "Central Elections Committee, candidate lists for the 26th Knesset", href: LISTS },
      { label: "Elections (Modes of Propaganda) Law 5719-1959", href: LAW },
    ],
  },
  {
    path: "/il/he/elections/knesset-2026/",
    lang: "he",
    dir: "rtl",
    heading: "סקירה עריכתית",
    updatedLocal: "עודכן: 27 באוקטובר 2026.",
    sourcesHeading: "מקורות לסקירה זו",
    paragraphs: [
      "מה שנבחר ביום שלישי 27 באוקטובר 2026 הוא הכנסת העשרים ושש. ועדת הבחירות המרכזית קבעה את היום הזה, ט״ז בחשוון תשפ״ז, כיום הבחירות. לכנסת 120 מושבים. כל הארץ היא אזור בחירה אחד. הבוחרים בוחרים רשימה, והרשימות שעוברות את הרף הקבוע בחוק חולקות את המושבים ביחס לקולותיהן. הממשלה שתבוא אחר כך היא עניין לכנסת אחרי הספירה הרשמית. עמוד זה אינו חוזה קואליציה, אינו מכריז על מנצח, ואינו מתאר מצע של רשימה. מצע הוא הטקסט שהרשימה עצמה מפרסמת.",
      "איך היום מאורגן, לפי עמודי הוועדה שנקראו לבחירות אלה, הוא יום הצבעה אחד. הקלפיות נפתחות ב-07:00. רובן פתוחות עד 22:00. קלפיות קטנות נסגרות ב-20:00. אתר זה אינו מעתיק את שלבי הזיהוי בתוך הקלפי, ואינו מעתיק את סדר הפעולות ליד תיבת הקלפי. הספירה, כשהאתר רשאי להציג אותה, מתחילה מקובץ הוועדה אחרי 22:00 לפי שעון ישראל. המועד האחרון בחוק לפרסום התוצאות הרשמיות ברשומות הוא 4 בנובמבר 2026. עד שהוועדה מפרסמת ספירה, עמוד זה אינו מציג ספירה, וספירה שמוצגת מסומנת כספירה של הוועדה.",
      "הרף שרשימה צריכה לעבור, לפי עמוד הוועדה על הבחירות בישראל, הוא 3.25 אחוזים מן הקולות. רשימה מתחת לרף זה אינה מיוצגת. רשימות מעליו חולקות את 120 המושבים ביחס לקולותיהן. זו השיטה שהוועדה מתארת. סקירה זו אינה חוזרת על נוסחה שהעמוד לא הדפיס, ואינה מחילה את הרף על סדרת מספרים, מפני שאין ספירה בטקסט הזה. ההיסטוריה, ככל שכותרת הוועדה ליום זה קובעת, היא שהבחירות בוחרות את הכנסת העשרים ושש. סיכומי כנסות קודמות לא הועתקו לעמוד זה, ולכן הם אינם נשנים כאן כאילו הועתקו.",
      "רשימות המועמדים הן הרשימות של הוועדה. עמוד הרשימות בעברית לכנסת העשרים ושש הוא הרשימה הרשמית. השמות שבאותו עמוד לא הועתקו לסקירה זו. לנקוב כאן בשם רשימה בלי ניסוח הוועדה היה מוסיף תווית שהסקירה לא לקחה מאותו עמוד, ולכן הדבר לא נעשה. מי שרוצה את הרשימות יפתח את עמוד הוועדה. מי שרוצה את הניסוח של רשימה על מטרותיה יפתח את הפרסום של אותה רשימה. אתר זה אינו מדרג את הרשימות ואינו אומר כיצד בוחר צריך לבחור ביניהן.",
      "חוק הבחירות (דרכי תעמולה), כפי שטבלת דיני הבחירות של אתר זה רושמת אותו, אוסר לפרסם תוצאות חדשות של סקרי בחירות מסוף יום שישי שלפני יום ההצבעה ועד סגירת הקלפיות. ב-27 באוקטובר 2026 האיסור עומד בתוקף עד הסגירה. אתר זה אינו מדפיס נתון של סקר בשום עת, גם לא לפני אותו יום שישי וגם לא אחרי הסגירה, ואינו מדפיס מדגם של בוחרים היוצאים מן הקלפי. עמוד האודות מציין את השיטה הזו. תיקון של התאריך, של השעות, או של רף 3.25 האחוזים צריך להיבדק מול הוועדה, שהיא המשרד הנקוב בעמוד זה.",
    ],
    citations: [
      { label: "ועדת הבחירות המרכזית, מועד הבחירות לכנסת ה-26", href: DATE },
      { label: "ועדת הבחירות המרכזית, הבחירות בישראל", href: ABOUT },
      { label: "ועדת הבחירות המרכזית, רשימות המועמדים לכנסת ה-26", href: LISTS },
      { label: "חוק הבחירות (דרכי תעמולה), תשי״ט-1959", href: LAW },
    ],
  },
  {
    path: "/rs/en/elections/president-2026/",
    lang: "en",
    heading: "Editorial preview",
    sourcesHeading: S,
    paragraphs: [
      "What is at stake is the office of President of the Republic, and no polling day has been called. On 28 September 2026 the Government of Serbia reported that Aleksandar Vučić had resigned the night before and that day handed the duty to Ana Brnabić, Speaker of the National Assembly. She serves as acting president until a new president is elected. The same notice says that, under the Law on the President, the Speaker performs the duties of president for not more than three months and must call the election so that voting takes place no later than three months from the day the term ends. Under article 14 of that law, the term ends when the resignation is received by the National Assembly. This page does not treat the handover as a called election.",
      "How the election is timed, on the account RTS published on 27 September 2026, is article 10 of the Law on the Election of the President of the Republic. If the term ends early, the election is called so that voting is held no later than three months after the term ends, and from the day of the call to polling day not fewer than 30 days and not more than 60 days may pass. The same text says the latest date is 27 December 2026. That is a deadline, not a day this site has chosen and not a day the Republic Electoral Commission had published when these pages were read on 27 October 2026. Republic Electoral Commission chair Vladimir Dimitrijević told RTS on 28 September 2026 that voting must be held by 27 December 2026 at the latest. This page does not repeat another date from that interview.",
      "How a winner is decided, in the same law as RTS reported it, is a vote of the citizens. If no candidate wins more than half of the valid votes, the law provides a second round within 15 days. This preview does not apply that rule to any name, because no candidacy had been published by the Commission on the day of reading. The polling stations, the hours, and the candidate list are published by the Commission once the election is called. None of those three was on the Commission’s site as a presidential notice when it was read. This page therefore lists no candidate and prints no station.",
      "The history this preview can state is the resignation and the statute, not a copied count of an earlier presidential election. Earlier presidential totals were not the file being read, so they are not reprinted and not estimated. The National Assembly election of 25 October 2026 is a different office. Its preliminary figures stay on the Commission’s results page for that election. They are not repeated here, and they are not a guide to the presidential contest. Seats in the Assembly, when the Commission assigns them, are Assembly seats. They do not fill the presidency.",
      "Parties and lists have public names when the Commission prints a candidacy. No such presidential candidacy was printed on the day these pages were read, so this preview does not name a party for the presidency and does not summarise a programme. A programme is the text a candidate or a list publishes. Inventing one would go past the record. This site prints no survey figure for the presidential election and no sample of voters leaving stations. No Event date is attached to this page until a day is in the Official Gazette. Readers who need the call, the day, or the list should open the Republic Electoral Commission.",
    ],
    citations: [
      { label: "Government of Serbia, 28 September 2026", href: GOV },
      { label: "RTS, the resignation and the statutory deadlines, 27 September 2026", href: RTS },
      { label: "RTS, the Commission chair on the latest day, 28 September 2026", href: RTS_RIK },
      { label: "Republic Electoral Commission", href: RIK },
    ],
  },
  {
    path: "/rs/sr/elections/predsednicki-2026/",
    lang: "sr",
    heading: "Urednički pregled",
    updatedLocal: "Ažurirano: 27. oktobar 2026.",
    sourcesHeading: "Izvori ovog pregleda",
    paragraphs: [
      "U pitanju je funkcija predsednika Republike, a dan glasanja nije raspisan. Vlada Srbije je 28. septembra 2026. objavila da je Aleksandar Vučić prethodne noći podneo ostavku i da je tog dana dužnost predao predsednici Narodne skupštine Ani Brnabić. Ona obavlja dužnost vršioca predsednika dok se ne izabere novi predsednik. Ista vest kaže da, po Zakonu o predsedniku, predsednik Narodne skupštine vrši dužnost predsednika najduže tri meseca i da je dužan da raspiše izbore tako da se glasa najkasnije tri meseca od dana kada mandat prestane. Po članu 14. tog zakona mandat prestaje kada ostavka stigne u Narodnu skupštinu. Ova stranica ne tretira predaju dužnosti kao raspisane izbore.",
      "Kako se određuje rok, prema tekstu koji je RTS objavio 27. septembra 2026, jeste član 10. Zakona o izboru predsednika Republike. Ako mandat prestane pre vremena, izbori se raspisuju tako da se glasa najkasnije tri meseca od prestanka mandata, a od dana raspisivanja do dana glasanja ne može proći manje od 30 ni više od 60 dana. Isti tekst navodi da je najkasniji datum 27. decembar 2026. To je rok, a ne dan koji je ovaj sajt izabrao i ne dan koji je Republička izborna komisija objavila kada su ove stranice čitane 27. oktobra 2026. Predsednik Republičke izborne komisije Vladimir Dimitrijević rekao je RTS-u 28. septembra 2026. da glasanje mora da se održi najkasnije do 27. decembra 2026. Ova stranica ne ponavlja drugi datum iz tog intervjua.",
      "Kako se određuje izabrani kandidat, u istom zakonu kako ga je RTS preneo, jeste glasanje građana. Ako nijedan kandidat ne dobije više od polovine važećih glasova, zakon predviđa drugi krug u roku od 15 dana. Ovaj pregled ne primenjuje to pravilo ni na jedno ime, jer Komisija na dan čitanja nije objavila kandidaturu. Biračka mesta, vreme i spisak kandidata objavljuje Komisija kada izbori budu raspisani. Nijedna od te tri stvari nije bila na sajtu Komisije kao predsedničko obaveštenje kada je čitan. Zato ova stranica ne navodi kandidata i ne štampa biračko mesto.",
      "Istorija koju ovaj pregled može da navede jeste ostavka i zakon, a ne prepisani zbir nekog ranijeg predsedničkog izbora. Raniji predsednički zbirovi nisu bili fajl koji se čitao, pa se ne preštampavaju i ne procenjuju. Izbori za Narodnu skupštinu 25. oktobra 2026. druga su funkcija. Njihove preliminarne brojke ostaju na stranici rezultata Komisije za te izbore. Ovde se ne ponavljaju i nisu vodič za predsedničku utakmicu. Mandati u Skupštini, kada ih Komisija dodeli, jesu skupštinski mandati. Oni ne popunjavaju predsedničku funkciju.",
      "Stranke i liste imaju javna imena kada Komisija odštampa kandidaturu. Takva predsednička kandidatura nije bila odštampana na dan kada su ove stranice čitane, pa ovaj pregled ne imenuje stranku za predsednika i ne sažima program. Program je tekst koji kandidat ili lista objavi. Izmisliti ga značilo bi izaći iz zapisa. Ovaj sajt ne štampa broj o nameri glasanja za predsedničke izbore, kad god budu raspisani, ni uzorak birača koji izlaze sa biračkog mesta. Datum događaja ne stoji uz ovu stranicu dok dan ne bude u Službenom glasniku. Ko traži raspis, dan ili listu, otvara Republičku izbornu komisiju.",
    ],
    citations: [
      { label: "Vlada Srbije, 28. septembar 2026.", href: GOV },
      { label: "RTS, ostavka i zakonski rokovi, 27. septembar 2026.", href: RTS },
      { label: "RTS, predsednik Komisije o krajnjem danu, 28. septembar 2026.", href: RTS_RIK },
      { label: "Republička izborna komisija", href: RIK },
    ],
  },
];
