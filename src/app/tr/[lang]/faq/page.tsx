import { JsonLd } from "@/components/JsonLd";
import { TurkeyFrame } from "@/app/tr/turkey-frame";
import { asTrLang } from "@/data/tr/lang";
import { otherLang, turkeyHome, turkeyMetadata } from "@/data/tr/metadata";
import { sourceById, sourcesById } from "@/data/tr/sources";
import { ui } from "@/data/tr/ui";
import { faqJsonLd } from "@/lib/format";

const FAQ = {
  tr: [
    {
      question: "Bir sonraki Cumhurbaşkanı ve milletvekili seçimi ne zaman?",
      answer:
        "Anayasanın 77. maddesi ve 6271 sayılı Kanunun 3. maddesi, iki seçimin beş yılda bir aynı gün yapıldığını söyler. Birlikte yapılan önceki seçim 14 Mayıs 2023’tür. Beş yıl sonrası 2028’dir. Oy günü, görev sürelerinin dolmasından önceki son Pazar günüdür. 17 Ekim 2026’da okunan bir takvim o Pazarı basmaz.",
    },
    {
      question: "Kaç milletvekili seçilir?",
      answer: "Anayasanın 75. maddesi, Türkiye Büyük Millet Meclisinin altıyüz milletvekilinden oluştuğunu söyler.",
    },
    {
      question: "Son Cumhurbaşkanı seçiminin ilanı ne diyor?",
      answer:
        "Yüksek Seçim Kurulunun 2023/1269 sayılı kararı, 28 Mayıs 2023 ikinci oylamasında RECEP TAYYİP ERDOĞAN’ın Cumhurbaşkanı seçildiğinin tespitine karar vermiştir. Bu site o ilanı aktarır; yeni bir ilan yapmaz.",
    },
    {
      question: "2028 için aday var mı?",
      answer: "17 Ekim 2026’da okunan bir Yüksek Seçim Kurulu listesinde 2028 adayları yoktur.",
    },
    {
      question: "Bu site sonuç mu ilan eder?",
      answer: "Hayır. 2028 için tutanak yoktur. 2023 sayıları, Kurulun daha önce yayımladığı kararlardan aktarılır.",
    },
    {
      question: "Bu resmî bir site mi?",
      answer:
        "Hayır. Joshua Israel Ventures LLC’nin resmî olmayan bilgisidir. Yüksek Seçim Kurulu’ndan teyit edilmelidir.",
    },
  ],
  en: [
    {
      question: "When are the next presidential and parliamentary elections?",
      answer:
        "Article 77 of the Constitution and article 3 of Law 6271 say the two elections are held every five years on the same day. The previous joint election was 14 May 2023. Five years later is 2028. Polling day is the last Sunday before the terms expire. No calendar read on 17 October 2026 prints that Sunday.",
    },
    {
      question: "How many deputies are elected?",
      answer: "Article 75 of the Constitution says the Grand National Assembly consists of six hundred deputies.",
    },
    {
      question: "What does the last presidential proclamation say?",
      answer:
        "Supreme Election Council decision 2023/1269 determined that RECEP TAYYİP ERDOĞAN was elected President in the second ballot of 28 May 2023. This site copies that proclamation. It does not issue a new one.",
    },
    {
      question: "Are there candidates for 2028?",
      answer: "No Supreme Election Council list read on 17 October 2026 contains 2028 candidates.",
    },
    {
      question: "Does this site call results?",
      answer: "No. There is no return for 2028. The 2023 figures are copied from decisions the Council already published.",
    },
    {
      question: "Is this an official website?",
      answer:
        "No. It is unofficial information from Joshua Israel Ventures LLC. Confirm it with the Supreme Election Council.",
    },
  ],
} as const;

const ysk = sourceById("ysk-home");

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asTrLang((await params).lang);
  const path = `${turkeyHome(lang)}faq/`;
  return turkeyMetadata({
    title: lang === "tr" ? "Sık sorulanlar" : "FAQ",
    description:
      lang === "tr"
        ? "2028 seçimi, 600 milletvekili ve 2023 ilanı hakkında kısa yanıtlar."
        : "Short answers on the 2028 elections, the 600 deputies, and the 2023 proclamation.",
    path,
    lang,
    alternatePath: `${turkeyHome(otherLang(lang))}faq/`,
  });
}

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asTrLang((await params).lang);
  const copy = ui(lang);
  const path = `${turkeyHome(lang)}faq/`;
  const tr = lang === "tr";
  const items = FAQ[lang];
  return (
    <TurkeyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.turkey, path: "/tr/" },
        { name: tr ? "Türkiye" : "Turkey", path: turkeyHome(lang) },
        { name: copy.faq, path },
      ]}
      title={copy.faq}
      officeHref={ysk.url}
      officeLabel="Yüksek Seçim Kurulu"
      sources={sourcesById(["anayasa", "kanun-6271", "ysk-2023-1269", "ysk-2023-94"])}
    >
      <JsonLd data={faqJsonLd(items.map((item) => ({ question: item.question, answer: item.answer })))} />
      <div className="space-y-6">
        {items.map((item) => (
          <section key={item.question}>
            <h2 className="font-serif text-xl font-semibold">{item.question}</h2>
            <p className="mt-2 leading-7">{item.answer}</p>
          </section>
        ))}
      </div>
    </TurkeyFrame>
  );
}
