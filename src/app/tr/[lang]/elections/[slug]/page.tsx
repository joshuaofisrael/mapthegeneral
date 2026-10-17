import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { TurkeyFrame } from "@/app/tr/turkey-frame";
import { asTrLang } from "@/data/tr/lang";
import { otherLang, turkeyHome, turkeyMetadata } from "@/data/tr/metadata";
import { sourceById, sourcesById } from "@/data/tr/sources";
import { ui } from "@/data/tr/ui";
import { notFound } from "next/navigation";

const SLUG = "2028";
const ysk = sourceById("ysk-home");

export function generateStaticParams() {
  return [
    { lang: "tr", slug: SLUG },
    { lang: "en", slug: SLUG },
  ];
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang = asTrLang(raw);
  if (slug !== SLUG) return {};
  const path = `${turkeyHome(lang)}elections/${SLUG}/`;
  return turkeyMetadata({
    title: lang === "tr" ? "2028 Cumhurbaşkanı ve milletvekili seçimi" : "2028 presidential and parliamentary elections",
    description:
      lang === "tr"
        ? "Bir sonraki olağan Cumhurbaşkanı ve milletvekili seçimi 2028’dedir. 17 Ekim 2026’da okunan bir karar oy gününü basmaz."
        : "The next ordinary presidential and parliamentary elections fall in 2028. No decision read on 17 October 2026 prints the polling day.",
    path,
    lang,
    alternatePath: `${turkeyHome(otherLang(lang))}elections/${SLUG}/`,
  });
}

export default async function Election2028Page({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang = asTrLang(raw);
  if (slug !== SLUG) notFound();
  const copy = ui(lang);
  const path = `${turkeyHome(lang)}elections/${SLUG}/`;
  const tr = lang === "tr";
  const home = turkeyHome(lang);

  return (
    <TurkeyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.turkey, path: "/tr/" },
        { name: tr ? "Türkiye" : "Turkey", path: home },
        { name: copy.elections, path: `${home}elections/` },
        { name: "2028", path },
      ]}
      eyebrow={tr ? "Oy günü basılmadı" : "Polling day not printed"}
      title={tr ? "2028 Cumhurbaşkanı ve milletvekili seçimi" : "2028 presidential and parliamentary elections"}
      lede={
        tr
          ? "Beş yıllık süre, birlikte yapılan önceki seçim olan 14 Mayıs 2023’ten sayılır. Bu sayfa, görev süresinin dolmasından önceki son Pazar gününü hesaplamaz."
          : "The five-year term is counted from the previous joint election, 14 May 2023. This page does not calculate the last Sunday before the terms expire."
      }
      officeHref={ysk.url}
      officeLabel="Yüksek Seçim Kurulu"
      sources={sourcesById(["anayasa", "kanun-6271", "kanun-2839", "ysk-2023-94", "ysk-2023-1269", "ysk-home"])}
    >
      <section className="prose-legal">
        <h2>{tr ? "Kanunun koyduğu gün" : "The day the statute describes"}</h2>
        <p>
          {tr
            ? "Anayasanın 77. maddesi, Türkiye Büyük Millet Meclisi ve Cumhurbaşkanlığı seçimlerinin beş yılda bir aynı gün yapıldığını söyler. 6271 sayılı Kanunun 3. maddesinin birinci fıkrası aynı cümleyi tekrarlar. Üçüncü fıkra, oy gününün, görev sürelerinin dolmasından önceki son Pazar günü olduğunu ve görev süresinin birlikte yapılan bir önceki seçim tarihi esas alınarak belirlendiğini söyler."
            : "Article 77 of the Constitution says elections for the Grand National Assembly and the presidency are held every five years and on the same day. Article 3(1) of Law 6271 repeats that sentence. Article 3(3) says polling day is the last Sunday before the terms expire, and that the term is determined from the date of the previous joint election."}
        </p>
        <p>
          {tr
            ? "Yüksek Seçim Kurulunun 2023/94 sayılı kararı, Cumhurbaşkanının 10.03.2023 tarihli ve 2023/121 sayılı kararıyla seçimlerin yenilendiğini ve Kurulun 10.03.2023 tarihli ve 2023/90 sayılı kararıyla birlikte yapılacak seçimin 14 Mayıs 2023 Pazar günü, ikinci oylama olursa 28 Mayıs 2023 Pazar günü yapılmasına karar verildiğini aktarır. 14 Mayıs 2023, birlikte yapılan seçim tarihidir. 28 Mayıs 2023, yalnızca Cumhurbaşkanlığı ikinci oylamasıdır."
            : "Supreme Election Council decision 2023/94 records that the President’s decision 2023/121 of 10 March 2023 renewed the elections, and that the Council’s decision 2023/90 of 10 March 2023 set the joint election for Sunday, 14 May 2023, and for Sunday, 28 May 2023 if there was a second ballot. 14 May 2023 is the joint election date. 28 May 2023 is only the presidential second ballot."}
        </p>
        <p>
          {tr
            ? "14 Mayıs 2023’ten beş yıl sonrası 2028’dir. 17 Ekim 2026’da okunan bir Yüksek Seçim Kurulu takvimi, bu olağan seçimin oy gününü basmaz. Bu sayfa o Pazarı çıkarmaz."
            : "Five years after 14 May 2023 is 2028. No Supreme Election Council calendar read on 17 October 2026 prints the polling day of this ordinary election. This page does not derive that Sunday."}
        </p>
        <GapNote label={copy.gap} text={copy.nextDayGap} />
        <h2>{tr ? "Erken yenileme" : "Early renewal"}</h2>
        <p>
          {tr
            ? "Anayasanın 116. maddesi, Meclisin üye tamsayısının beşte üç çoğunluğuyla ya da Cumhurbaşkanının kararıyla her iki seçimin birlikte yenilenebileceğini söyler. Bu şekilde seçilen Meclisin ve Cumhurbaşkanının görev süresi de beş yıldır. 14 Mayıs 2023’ü doğuran 10 Mart 2023 yenilemesinden sonra, 17 Ekim 2026’da okunan bir yenileme kararı yoktur."
            : "Article 116 says the Assembly, by a three-fifths majority of its full membership, or the President, may renew both elections together. The Assembly and the President elected that way also serve five years. No renewal decision after the 10 March 2023 renewal, which produced 14 May 2023, was read on 17 October 2026."}
        </p>
        <h2>{tr ? "Ne seçilir" : "What is elected"}</h2>
        <p>
          {tr
            ? "Aynı gün bir Cumhurbaşkanı ve 600 milletvekili seçilir. Anayasanın 75. maddesi milletvekili sayısını altıyüz olarak koyar. 101. madde ve 6271 sayılı Kanunun 4. maddesi, ilk oylamada salt çoğunluk yoksa izleyen ikinci Pazar günü ikinci oylama yapılacağını söyler. İkinci oylamaya, ilk oylamada en çok oy alan iki aday katılır."
            : "The same day elects one President and 600 deputies. Article 75 sets the number of deputies at six hundred. Article 101 and article 4 of Law 6271 say that if the first ballot does not produce an absolute majority, a second ballot is held on the following second Sunday. The two candidates with the most votes in the first ballot take part."}
        </p>
        <p>
          {tr
            ? "2839 sayılı Kanunun 5. maddesi, seçim çevreleri ve her çevrenin çıkaracağı milletvekili sayısının, genel nüfus sayımı sonuçlarının açıklanmasından itibaren en geç altı ay içinde Kurulca ilan edileceğini söyler. 2028 için böyle bir ilan bu sayfada yok. İllerin 2023 sayıları, istatistik tablosundan il sayfalarına aktarılmıştır."
            : "Article 5 of Law 2839 says the Council announces the constituencies and the deputies each will elect within six months of the publication of the general population results. No such announcement for 2028 is on this page. The 2023 counts are carried from the statistics table onto the province pages."}
        </p>
        <h2>{tr ? "Adaylar" : "Candidates"}</h2>
        <GapNote label={copy.gap} text={copy.candidateGap} />
        <p>
          <Link className="text-navy underline" href={`${home}results/`}>
            {tr ? "Sonuç sayfası, 2028 için boş" : "Results page, empty for 2028"}
          </Link>
        </p>
      </section>
    </TurkeyFrame>
  );
}
