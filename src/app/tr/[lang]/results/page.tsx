import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { TurkeyFrame } from "@/app/tr/turkey-frame";
import { formatNumber } from "@/data/tr/format";
import { asTrLang } from "@/data/tr/lang";
import { otherLang, turkeyHome, turkeyMetadata } from "@/data/tr/metadata";
import { PARLIAMENT_2023_DOMESTIC, PARLIAMENT_2023_SEATS, PRESIDENTIAL_2023 } from "@/data/tr/records";
import { sourceById, sourcesById } from "@/data/tr/sources";
import { ui } from "@/data/tr/ui";

const ysk = sourceById("ysk-home");

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asTrLang((await params).lang);
  const path = `${turkeyHome(lang)}results/`;
  return turkeyMetadata({
    title: lang === "tr" ? "Sonuçlar" : "Results",
    description:
      lang === "tr"
        ? "2028 için yayımlanmış bir sonuç yok. 2023 ilanı, Yüksek Seçim Kurulu kararlarından aktarılır. Bu sayfa seçim sonucu ilan etmez."
        : "There is no published result for 2028. The 2023 proclamation is copied from Supreme Election Council decisions. This page does not call an election.",
    path,
    lang,
    alternatePath: `${turkeyHome(otherLang(lang))}results/`,
  });
}

export default async function ResultsPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asTrLang((await params).lang);
  const copy = ui(lang);
  const path = `${turkeyHome(lang)}results/`;
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
        { name: copy.results, path },
      ]}
      eyebrow={tr ? "2028 için sonuç yok" : "No result for 2028"}
      title={tr ? "Sonuçlar" : "Results"}
      lede={
        tr
          ? "2028 seçiminin sandık sonucu yoktur. Aşağıdaki sayılar, Kurulu’nun daha önce ilan ettiği 2023 kararlarından aktarılmıştır. Bu site bir seçimi ilan etmez."
          : "There is no count for the 2028 election. The figures below are copied from the Council’s already proclaimed 2023 decisions. This site does not call an election."
      }
      officeHref={ysk.url}
      officeLabel="Yüksek Seçim Kurulu"
      sources={sourcesById(["ysk-2023-1269", "ysk-cb-cm5", "ysk-2023-1255", "ysk-2024-2367", "ysk-2024-liste2", "ysk-2024-liste3"])}
    >
      <GapNote
        label={copy.gap}
        text={
          tr
            ? "17 Ekim 2026’da 2028 oy günü için kopyalanacak bir tutanak yoktur. Bir tutanak yayımlandığında da bu sayfa onu resmî ilan gibi sunmaz ve kazanan ilan etmez."
            : "On 17 October 2026 there is no return to copy for a 2028 polling day. When a return exists, this page will still not present it as the official proclamation and will not declare a winner."
        }
      />

      <section>
        <h2 className="font-serif text-2xl font-semibold">
          {tr ? "28 Mayıs 2023, Cumhurbaşkanı, örnek CM/5" : "28 May 2023, presidency, form CM/5"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          {tr
            ? "Yurt içi, yurt dışı ve gümrük sandıkları dahil Türkiye geneli. 2023/1269 sayılı karar, RECEP TAYYİP ERDOĞAN’ın seçildiğinin tespitine karar vermiştir."
            : "Turkey-wide total, including domestic, overseas, and customs ballots. Decision 2023/1269 determined that RECEP TAYYİP ERDOĞAN was elected."}
        </p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-ink-muted">{tr ? "Kayıtlı seçmen" : "Registered voters"}</dt>
            <dd>{formatNumber(PRESIDENTIAL_2023.registered, lang)}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">{tr ? "Oy kullanan" : "Ballots cast"}</dt>
            <dd>{formatNumber(PRESIDENTIAL_2023.voted, lang)}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">{tr ? "Geçerli oy" : "Valid votes"}</dt>
            <dd>{formatNumber(PRESIDENTIAL_2023.valid, lang)}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">{tr ? "Geçersiz oy" : "Invalid votes"}</dt>
            <dd>{formatNumber(PRESIDENTIAL_2023.invalid, lang)}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">{tr ? "Katılma" : "Turnout"}</dt>
            <dd>% {PRESIDENTIAL_2023.turnout}</dd>
          </div>
        </dl>
        <div className="mt-4 overflow-x-auto">
          <table className="fact-table">
            <thead>
              <tr>
                <th scope="col">{tr ? "Aday, karardaki gibi" : "Candidate, as printed"}</th>
                <th scope="col">{tr ? "Türkiye geneli" : "Turkey-wide votes"}</th>
                <th scope="col">{tr ? "Oran" : "Share"}</th>
              </tr>
            </thead>
            <tbody>
              {PRESIDENTIAL_2023.candidates.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{formatNumber(row.votes, lang)}</td>
                  <td>% {row.share}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">
          {tr ? "14 Mayıs 2023, milletvekili" : "14 May 2023, parliament"}
        </h2>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          {tr
            ? "2023/1255 sayılı karardaki yurt içi birleştirme tutanağı. Yurt dışı ve gümrük oyları bu dört sayıda yoktur. Sandalye satırı, karardaki Türkiye toplamıdır."
            : "The domestic consolidation return in decision 2023/1255. Overseas and customs votes are not in these four figures. The seat row is the Turkey total in the decision."}
        </p>
        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-ink-muted">{tr ? "Kayıtlı seçmen, yurt içi" : "Registered voters, domestic"}</dt>
            <dd>{formatNumber(PARLIAMENT_2023_DOMESTIC.registered, lang)}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">{tr ? "Oy kullanan, yurt içi" : "Ballots cast, domestic"}</dt>
            <dd>{formatNumber(PARLIAMENT_2023_DOMESTIC.voted, lang)}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">{tr ? "Geçerli oy, yurt içi" : "Valid votes, domestic"}</dt>
            <dd>{formatNumber(PARLIAMENT_2023_DOMESTIC.valid, lang)}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">{tr ? "Katılma, yurt içi" : "Turnout, domestic"}</dt>
            <dd>% {PARLIAMENT_2023_DOMESTIC.turnout}</dd>
          </div>
        </dl>
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
        <p className="mt-3 text-sm text-ink-muted">
          {tr
            ? "Parti oy tablosunun tamamı kararda ve Kurulun yurt içi sonuç dosyasındadır. Bu sayfa her partinin oyunu yeniden yazmaz."
            : "The full party vote table is in the decision and in the Council’s domestic results file. This page does not retype every party’s votes."}
        </p>
      </section>

      <section className="prose-legal">
        <h2>{tr ? "31 Mart 2024" : "31 March 2024"}</h2>
        <p>
          {tr
            ? "2024/2367 sayılı karar, 31 Mart 2024 mahalli idareler genel seçiminin genel sonucunun ilanına karar verir. Liste 2, 30 büyükşehir belediye başkanlığı seçildiğini yazar. Liste 3, 1.356 belediye başkanlığı seçildiğini yazar ve yedi yarışın iptal edildiği için toplama girmediğini not eder. Seçilen kişilerin adları bu sürümde yok."
            : "Decision 2024/2367 proclaims the general result of the 31 March 2024 local elections. Liste 2 states that 30 metropolitan mayoralties were filled. Liste 3 states that 1,356 municipal mayoralties were filled and notes that seven contests were cancelled and left out of that total. The names of the people elected are not in this release."}
        </p>
        <p>
          <Link className="text-navy underline" href={`${home}elections/2028/`}>
            {tr ? "2028 sayfası" : "The 2028 page"}
          </Link>
        </p>
      </section>
    </TurkeyFrame>
  );
}
