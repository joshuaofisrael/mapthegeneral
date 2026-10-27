/** Official CIK distribution, 15:00 on 26 October 2026, 100.00% of section protocols processed in the district commissions. */
export const BG_READ = "2026-10-27";
export const BG_CIK = "https://www.cik.bg/";
export const BG_RESULTS_URL = "https://results.cik.bg/pvr202610/rezultati/index.html";
export const BG_ARCHIVE = "https://results.cik.bg/index.html";
export const BG_REGISTER = "https://www.cik.bg/bg/pvr2026/registers/per_candidates";
export const BG_PARLIAMENT = "https://www.parliament.bg/en/news/ID/6600";
export const BG_CODE = "https://www.ciela.net/svobodna-zona-normativi/view/2136112596/izboren-kodeks";
export const BG_ART_205 = "https://magistrat.bg/laws/00af9385cb23:205";
export const BG_DECISION = "https://www.cik.bg/bg/decisions/30/2026-08-13";
export const BG_FAQ = "https://www.cik.bg/bg/pvr2026/faq/voters/q02";

export type BgRow = { order: number | null; name: string; committee: string; votes: string; share: string };

export const BG_FIRST_ROUND: BgRow[] = [
  { order: 1, name: "Георги Николов Димов и Димитър Атанасов Шивиков", committee: "ИК за Георги Димов и Димитър Шивиков", votes: "14 843", share: "0.975%" },
  { order: 2, name: "Росен Пламенов Миленов и Иван Стефанов Иванов", committee: "ИК за Росен Миленов и Иван Иванов", votes: "8 367", share: "0.550%" },
  { order: 3, name: "Иванка Великова Цветанова-Петкова и Панайот Александров Кючуков", committee: "ИК за Иванка Цветанова-Петкова и Панайот Кючуков", votes: "4 533", share: "0.298%" },
  { order: 4, name: "Андрей Атанасов Гюров и Георги Димитров Кандев", committee: "ИК за Андрей Гюров и Георги Кандев", votes: "486 214", share: "31.952%" },
  { order: 5, name: "Йордан Иванов Малджански и Валентин Асенов Христов", committee: "ИК за Йордан Малджански и Валентин Христов", votes: "2 510", share: "0.165%" },
  { order: 6, name: "Камен Захариев Тасков и Галя Димитрова Иванова", committee: "ИК за Камен Тасков и Галя Иванова", votes: "1 758", share: "0.116%" },
  { order: 7, name: "Нако Райнов Стефанов и Нина Петкова Ламбова", committee: "ИК за Нако Стефанов и Нина Ламбова", votes: "2 460", share: "0.162%" },
  { order: 8, name: "Методи Веселинов Бъчваров и Ленин Велинов Станоев", committee: "ИК за Методи Бъчваров и Ленин Станоев", votes: "1 563", share: "0.103%" },
  { order: 9, name: "Ивайло Петров Симеонов и Косьо Христов Стойчев", committee: "ИК за Ивайло Симеонов и Косьо Стойчев", votes: "14 218", share: "0.934%" },
  { order: 10, name: "Мария Петрова Колева и Валери Йорданов Велковски", committee: "ПРАВОТО", votes: "3 818", share: "0.251%" },
  { order: 11, name: "Костадин Тодоров Костадинов и Петър Петров Волгин", committee: "ВЪЗРАЖДАНЕ", votes: "190 894", share: "12.545%" },
  { order: 12, name: "Александър Трифонов Томов и Александър Цветанов Гарибов", committee: "БЪЛГАРСКА СОЦИАЛДЕМОКРАЦИЯ – ЕВРОЛЕВИЦА", votes: "2 512", share: "0.165%" },
  { order: 13, name: "Борис Кирилов Анзов и Бранимир Мичев Мичев", committee: "ИК за Борис Анзов и Бранимир Мичев", votes: "1 141", share: "0.075%" },
  { order: 14, name: "Румяна Методиева Ченалова и Георги Минчев Георгиев", committee: "ИК за Румяна Ченалова и Георги Георгиев", votes: "3 687", share: "0.242%" },
  { order: 15, name: "Лъчезар Аспарухов Аврамов и Ивайло Дражев Атанасов", committee: "ИК за Лъчезар Аврамов и Ивайло Атанасов", votes: "1 165", share: "0.077%" },
  { order: 16, name: "Иво Иванов Лулчев и Стефан Димитров Попов", committee: "ИК за Иво Лулчев и Стефан Попов", votes: "1 132", share: "0.074%" },
  { order: 17, name: "Радостин Петев Василев и Красимир Цветков Манов", committee: "ПП МЕЧ", votes: "70 118", share: "4.608%" },
  { order: 18, name: "Иван Маркос Христанов и Стоянка Гинева Черкезова", committee: "ИК за Иван Христанов и Стоянка Черкезова", votes: "36 414", share: "2.393%" },
  { order: 19, name: "Ивелин Людмилов Михайлов и Юлиана Младенова Матеева", committee: "ПП ВЕЛИЧИЕ", votes: "57 633", share: "3.787%" },
  { order: 20, name: "Величка Неделчова Георгиева и Росен Игнатов Иванов", committee: "ИК за Величка Георгиева и Росен Иванов", votes: "1 397", share: "0.092%" },
  { order: 21, name: "Волен Николов Сидеров и Славчо Георгиев Велков", committee: "ИК за Волен Сидеров и Славчо Велков", votes: "4 046", share: "0.266%" },
  { order: 22, name: "Николай Нанков Ненчев и Цвета Кирилова Кирилова", committee: "БЗНС", votes: "5 784", share: "0.380%" },
  { order: 23, name: "Искра Йорданова Недева и Стоян Руменов Георгиев", committee: "ИК за Искра Недева и Стоян Георгиев", votes: "1 214", share: "0.080%" },
  { order: 24, name: "Пламен Панайотов Пасков и Светозар Стоянов Съев", committee: "ИК за Пламен Пасков и Светозар Съев", votes: "2 831", share: "0.186%" },
  { order: 25, name: "Илияна Малинова Йотова и Кирил Александров Вълчев", committee: "ИК за Илияна Йотова и Кирил Вълчев", votes: "528 929", share: "34.759%" },
  { order: 26, name: "Боян Боянов Станков Расате и Йордан Стоянов Манасиев", committee: "ИК за Боян Расате и Йордан Манасиев", votes: "2 321", share: "0.153%" },
  { order: 27, name: "Венцислав Атанасов Ангелов и Атанас Иванов Стефанов", committee: "ПП НАРОДНА ПАРТИЯ ИСТИНАТА И САМО ИСТИНАТА", votes: "2 856", share: "0.188%" },
  { order: null, name: "Не подкрепям никого", committee: "", votes: "67 353", share: "4.426%" },
];

