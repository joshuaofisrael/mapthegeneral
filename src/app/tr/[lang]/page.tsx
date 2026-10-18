import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { TurkeyFrame } from "@/app/tr/turkey-frame";
import { formatNumber } from "@/data/tr/format";
import { asTrLang } from "@/data/tr/lang";
import { otherLang, provincePath, turkeyHome, turkeyMetadata } from "@/data/tr/metadata";
import { alphaProvinces, DEPUTY_TOTAL, POPULATION_TOTAL } from "@/data/tr/provinces";
import { PARLIAMENT_2023_SEATS } from "@/data/tr/records";
import { sourceById, sourcesById } from "@/data/tr/sources";
import { ui } from "@/data/tr/ui";

const ysk = sourceById("ysk-home");

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asTrLang((await params).lang);
  return turkeyMetadata({
    title: lang === "tr" ? "Türkiye" : "Turkey",
    description:
      lang === "tr"
        ? "Türkiye: 600 milletvekili, 81 il, 14 Mayıs 2023 seçimi ve 2028’deki bir sonraki olağan seçim. Oy günü basılmamıştır. Resmî olmayan bilgi."
        : "Turkey: 600 deputies, 81 provinces, the 14 May 2023 election, and the next ordinary election in 2028. The polling day is not printed. Unofficial information.",
    path: turkeyHome(lang),
    lang,
    alternatePath: turkeyHome(otherLang(lang)),
  });
}

export default async function TurkeyNationalPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asTrLang((await params).lang);
  const copy = ui(lang);
  const path = turkeyHome(lang);
  const tr = lang === "tr";
  const provinces = alphaProvinces();

  return (
    <TurkeyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.turkey, path: "/tr/" },
        { name: tr ? "Türkiye" : "Turkey", path },
      ]}
      eyebrow={tr ? "Cumhurbaşkanı ve milletvekili seçimleri" : "Presidential and parliamentary elections"}
      title={tr ? "Türkiye" : "Turkey"}
      lede={
        tr
          ? "Anayasanın 1. maddesi «Türkiye Devleti bir Cumhuriyettir» der. Anayasanın başlığı Türkiye Cumhuriyeti Anayasasıdır. Bir sonraki olağan Cumhurbaşkanı ve milletvekili seçimi 2028’dedir; bu sayfa oy gününü yazmaz."
          : "Article 1 of the Constitution says “Türkiye Devleti bir Cumhuriyettir.” The Constitution’s title is Türkiye Cumhuriyeti Anayasası. The next ordinary presidential and parliamentary elections fall in 2028; this page does not print the polling day."
      }
      officeHref={ysk.url}
      officeLabel="Yüksek Seçim Kurulu"
      sources={sourcesById([
        "anayasa",
        "kanun-6271",
        "kanun-2839",
        "kanun-2972",
        "kanun-6360",
        "ysk-2023-94",
        "ysk-2023-1255",
        "ysk-2023-1269",
        "ysk-cb-cm5",
        "ysk-istatistik",
        "ysk-2023-1565",
        "ysk-2024-2367",
        "tuik-2025",
        "tuik-duyuru",
        "tbmm",
        "tccb",
      ])}
    >
      <section className="prose-legal">
        <h2>{tr ? "Cumhurbaşkanı" : "President"}</h2>
        <p>
          {tr
            ? "Anayasanın 101. maddesi, Cumhurbaşkanının halk tarafından seçildiğini ve görev süresinin beş yıl olduğunu söyler. 2023/1269 sayılı Yüksek Seçim Kurulu kararı, 28 Mayıs 2023 Pazar günü yapılan ikinci oylamada geçerli oyların salt çoğunluğunu alan RECEP TAYYİP ERDOĞAN’ın Cumhurbaşkanı seçildiğinin tespitine karar vermiştir. Oy dökümü sonuçlar sayfasındadır."
            : "Article 101 of the Constitution says the President is elected by the people and that the term is five years. Supreme Election Council decision 2023/1269 determined that RECEP TAYYİP ERDOĞAN, having received an absolute majority of the valid votes in the second ballot on Sunday, 28 May 2023, was elected President. The vote figures are on the results page."}
        </p>
        <p>
          {tr
            ? "Anayasanın 104. maddesi, Cumhurbaşkanının Devletin başı olduğunu ve yürütme yetkisinin Cumhurbaşkanına ait olduğunu söyler. Bu sayfa bakanlık listesini kopyalamaz."
            : "Article 104 says the President is the head of the State and that executive power belongs to the President. This page does not copy the list of ministries."}
        </p>
        <h2>{tr ? "Türkiye Büyük Millet Meclisi" : "Grand National Assembly"}</h2>
        <p>
          {tr
            ? `Anayasanın 75. maddesi, Türkiye Büyük Millet Meclisinin genel oyla seçilen altıyüz milletvekilinden oluştuğunu söyler. 2023/1255 sayılı karar, 14 Mayıs 2023’te yapılan 28. Dönem Milletvekili Genel Seçiminin kesin sonuçlarını ilan eder. Karardaki Türkiye toplamı ${formatNumber(DEPUTY_TOTAL, lang)} milletvekilidir.`
            : `Article 75 says the Grand National Assembly of Turkey consists of six hundred deputies elected by universal suffrage. Decision 2023/1255 proclaims the final results of the 28th-term parliamentary general election held on 14 May 2023. The Turkey total in that decision is ${formatNumber(DEPUTY_TOTAL, lang)} deputies.`}
        </p>
        <p>
          {tr
            ? "2839 sayılı Kanunun 2. maddesi, milletvekili seçiminin tek dereceli olduğunu ve nispi temsil sistemine göre yapıldığını söyler. 33. madde, genel seçimlerde ülke genelinde geçerli oyların yüzde yedisini geçmeyen partilerin milletvekili çıkaramayacağını söyler; seçim ittifakında, ittifakın geçerli oylarının toplamı esas alınır. 34. madde, barajı aşan partiler ile bağımsız adaylar için oy sayılarının bire, ikiye, üçe, çevre milletvekili sayısına kadar bölünmesini ve payların büyüklük sırasıyla tahsis edilmesini anlatır. Bu sayfa bu hesabın sayısal örneğini vermez."
            : "Article 2 of Law 2839 says parliamentary election is direct and uses proportional representation. Article 33 says that, in a general election, parties that do not pass seven percent of the valid votes nationwide do not win deputies; for an electoral alliance, the alliance’s combined valid votes are used. Article 34 describes dividing those votes by one, by two, by three, and so on up to the number of deputies in the constituency, then assigning seats in order of the quotients. This page does not print a worked example."}
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">
          {tr ? "2023 ilanındaki sandalye sayıları" : "Seats in the 2023 proclamation"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          {tr
            ? "2023/1255 sayılı karardaki sıra ve adlar. Bu tablo bir sonraki seçimin listesi değildir."
            : "Order and names as printed in decision 2023/1255. This table is not a list for the next election."}
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="fact-table">
            <thead>
              <tr>
                <th scope="col">{tr ? "Kararda yazıldığı gibi" : "As printed in the decision"}</th>
                <th scope="col">{tr ? "Milletvekili" : "Deputies"}</th>
              </tr>
            </thead>
            <tbody>
              {PARLIAMENT_2023_SEATS.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{formatNumber(row.seats, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="prose-legal">
        <h2>{tr ? "Bir sonraki seçim" : "The next election"}</h2>
        <p>
          {tr
            ? "Anayasanın 77. maddesi ile 6271 sayılı Kanunun 3. maddesinin birinci fıkrası, Türkiye Büyük Millet Meclisi ve Cumhurbaşkanlığı seçimlerinin beş yılda bir aynı gün yapıldığını söyler. Birlikte yapılan önceki seçim, Kurulun 2023/94 sayılı kararının aktardığı 2023/90 sayılı kararla 14 Mayıs 2023 Pazar günüdür. Beş yıl sonrası 2028’dir. Oy gününün hangi Pazar olduğu bu sayfada hesaplanmaz."
            : "Article 77 of the Constitution and article 3(1) of Law 6271 say elections for the Grand National Assembly and the presidency are held every five years and on the same day. The previous joint election, as decision 2023/94 records from decision 2023/90, was Sunday, 14 May 2023. Five years after that date is 2028. This page does not calculate which Sunday is polling day."}
        </p>
        <p>
          <Link className="text-navy underline" href={`${path}elections/2028/`}>
            {tr ? "2028 seçim sayfası" : "Page for the 2028 elections"}
          </Link>
        </p>
        <GapNote label={copy.gap} text={copy.nextDayGap} />
      </section>

      <section className="prose-legal">
        <h2>{tr ? "Nüfus ve iller" : "Population and provinces"}</h2>
        <p>
          {tr
            ? `Anayasanın 126. maddesi, Türkiye’nin merkezî idare bakımından illere ayrıldığını ve il idaresinin yetki genişliğine dayandığını söyler. Aynı madde, birden çok ili içine alan merkezî idare teşkilatı kurulabileceğini, bunun görev ve yetkilerinin kanunla düzenleneceğini söyler. Bu sürüm, illerin üstünde seçilmiş bir bölge meclisi sayfası açmaz.`
            : "Article 126 says that, for central administration, Turkey is divided into provinces, and that provincial administration is based on deconcentration. The same article says a central-administration organisation covering more than one province may be established, with its duties set by law. This release does not open a page for an elected regional assembly above the provinces."}
        </p>
        <p>
          {tr
            ? `TÜİK, İstatistiklerle Türkiye 2025, tablo 1.4, 81 ilin nüfusunu basar. Tablonun kaynak satırı ADNKS 2025’tir. İllerin toplamı ${formatNumber(POPULATION_TOTAL, lang)}’dir. TÜİK duyurusu, «Adrese Dayalı Nüfus Kayıt Sistemi Sonuçları, 2025» haber bülteninin 9 Şubat 2026’da yayımlanacağını söyler.`
            : `TÜİK, İstatistiklerle Türkiye 2025, table 1.4, prints the population of 81 provinces. The table’s source line is ADNKS 2025. The provinces sum to ${formatNumber(POPULATION_TOTAL, lang)}. The TÜİK announcement says the news bulletin “Adrese Dayalı Nüfus Kayıt Sistemi Sonuçları, 2025” would be published on 9 February 2026.`}
        </p>
        <p>
          {tr
            ? "6360 sayılı Kanunun konsolide 1. maddesi, 30 ili büyükşehir belediyesi olarak adlandırır: 1. fıkrada 14 il, 2. fıkrada 14 il, 4. fıkrada İstanbul ve Kocaeli. 5. fıkra, bu illerde il özel idaresinin tüzel kişiliğinin kaldırıldığını söyler. Listede olmayan 51 ilde bu kaldırma hükmü yoktur."
            : "Article 1 of the consolidated text of Law 6360 names 30 provinces as metropolitan municipalities: 14 in paragraph 1, 14 in paragraph 2, and İstanbul and Kocaeli in paragraph 4. Paragraph 5 says the special provincial administration’s legal personality is removed in those provinces. The other 51 provinces are not in that list, and that removal clause does not name them."}
        </p>
        <GapNote label={copy.gap} text={copy.lowerTierGap} />
        <p>
          {tr
            ? "Mahalli idareler için Anayasanın 127. maddesi il, belediye veya köy halkının seçilmiş karar organlarını söyler ve seçimlerin beş yılda bir yapıldığını belirtir. 2972 sayılı Kanunun 8. maddesi, oy gününü seçim döneminin beşinci yılındaki Mart ayının son Pazar günü olarak koyar. 2023/1565 sayılı karar, bu hükme dayanarak mahalli idareler genel seçiminin 31 Mart 2024 Pazar günü yapılacağını söyler."
            : "For local administrations, article 127 names the elected decision-making bodies of the province, the municipality, or the village, and says those elections are held every five years. Article 8 of Law 2972 puts polling day on the last Sunday of March of the fifth year of the election period. Decision 2023/1565 says, under that provision, the local general election would be held on Sunday, 31 March 2024."}
        </p>
        <GapNote label={copy.gap} text={copy.localNextGap} />
        <GapNote label={copy.gap} text={copy.mayorGap} />
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">{tr ? "Diğer sayfalar" : "Other pages"}</h2>
        <p className="text-sm">
          <Link className="text-navy underline" href={`${path}elections/`}>
            {copy.elections}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}parties/`}>
            {copy.parties}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}candidates/`}>
            {copy.candidates}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}results/`}>
            {copy.results}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}faq/`}>
            {copy.faq}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}sources/`}>
            {copy.sources}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}ilce/`}>
            {tr ? "İlçeler" : "Districts"}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}secim-cevresi/`}>
            {tr ? "Seçim çevreleri" : "Constituencies"}
          </Link>
        </p>
        <GapNote label={copy.gap} text={copy.candidateGap} />
        <GapNote label={copy.gap} text={copy.postcodeGap} />
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">
          {tr ? "2023 milletvekili sayıları" : "Deputies in 2023"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          {tr
            ? "Yüksek Seçim Kurulu seçim istatistikleri, tablo 2.6, 2023 sütunu. 2028 için yeni bir dağıtım kararı bu sayfada yok."
            : "Supreme Election Council election statistics, table 2.6, 2023 column. No new allocation decision for 2028 is on this page."}
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="fact-table">
            <thead>
              <tr>
                <th scope="col">{tr ? "İl" : "Province"}</th>
                <th scope="col">{tr ? "Milletvekili, 2023" : "Deputies, 2023"}</th>
              </tr>
            </thead>
            <tbody>
              {provinces.map((province) => (
                <tr key={province.slug}>
                  <td>
                    <Link className="text-navy underline" href={provincePath(lang, province.slug)}>
                      {province.name}
                    </Link>
                  </td>
                  <td>{province.deputies2023}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <LinkGrid
        heading={copy.provinces}
        items={provinces.map((province) => ({
          href: provincePath(lang, province.slug),
          title: province.name,
          detail: `${formatNumber(province.population, lang)} · ${province.deputies2023} ${tr ? "milletvekili" : "deputies"}`,
        }))}
      />
    </TurkeyFrame>
  );
}
