import type { Prefecture, ProportionalBlock } from "./types";

/** Block names and seat numbers are the Ministry table on the “選挙の種類” page. */
export const BLOCKS: ProportionalBlock[] = [
  { id: "hokkaido", nameJa: "北海道", seats: 8 },
  { id: "tohoku", nameJa: "東北", seats: 12 },
  { id: "kita-kanto", nameJa: "北関東", seats: 19 },
  { id: "minami-kanto", nameJa: "南関東", seats: 23 },
  { id: "tokyo", nameJa: "東京都", seats: 19 },
  { id: "hokuriku-shinetsu", nameJa: "北陸信越", seats: 10 },
  { id: "tokai", nameJa: "東海", seats: 21 },
  { id: "kinki", nameJa: "近畿", seats: 28 },
  { id: "chugoku", nameJa: "中国", seats: 10 },
  { id: "shikoku", nameJa: "四国", seats: 6 },
  { id: "kyushu", nameJa: "九州", seats: 20 },
];

export const PREFECTURES: Prefecture[] = [
  { slug: "hokkaido", officialName: "北海道", englishName: "Hokkaido", kind: "do", population: 4985419, blockId: "hokkaido" },
  { slug: "aomori", officialName: "青森県", englishName: "Aomori Prefecture", kind: "ken", population: 1140395, blockId: "tohoku" },
  { slug: "iwate", officialName: "岩手県", englishName: "Iwate Prefecture", kind: "ken", population: 1125502, blockId: "tohoku" },
  { slug: "miyagi", officialName: "宮城県", englishName: "Miyagi Prefecture", kind: "ken", population: 2227240, blockId: "tohoku" },
  { slug: "akita", officialName: "秋田県", englishName: "Akita Prefecture", kind: "ken", population: 882100, blockId: "tohoku" },
  { slug: "yamagata", officialName: "山形県", englishName: "Yamagata Prefecture", kind: "ken", population: 993127, blockId: "tohoku" },
  { slug: "fukushima", officialName: "福島県", englishName: "Fukushima Prefecture", kind: "ken", population: 1711937, blockId: "tohoku" },
  { slug: "ibaraki", officialName: "茨城県", englishName: "Ibaraki Prefecture", kind: "ken", population: 2791207, blockId: "kita-kanto" },
  { slug: "tochigi", officialName: "栃木県", englishName: "Tochigi Prefecture", kind: "ken", population: 1864833, blockId: "kita-kanto" },
  { slug: "gunma", officialName: "群馬県", englishName: "Gunma Prefecture", kind: "ken", population: 1867582, blockId: "kita-kanto" },
  { slug: "saitama", officialName: "埼玉県", englishName: "Saitama Prefecture", kind: "ken", population: 7287169, blockId: "kita-kanto" },
  { slug: "chiba", officialName: "千葉県", englishName: "Chiba Prefecture", kind: "ken", population: 6258512, blockId: "minami-kanto" },
  { slug: "tokyo", officialName: "東京都", englishName: "Tokyo Metropolis", kind: "to", population: 14246219, blockId: "tokyo" },
  { slug: "kanagawa", officialName: "神奈川県", englishName: "Kanagawa Prefecture", kind: "ken", population: 9193657, blockId: "minami-kanto" },
  { slug: "niigata", officialName: "新潟県", englishName: "Niigata Prefecture", kind: "ken", population: 2068476, blockId: "hokuriku-shinetsu" },
  { slug: "toyama", officialName: "富山県", englishName: "Toyama Prefecture", kind: "ken", population: 985675, blockId: "hokuriku-shinetsu" },
  { slug: "ishikawa", officialName: "石川県", englishName: "Ishikawa Prefecture", kind: "ken", population: 1088221, blockId: "hokuriku-shinetsu" },
  { slug: "fukui", officialName: "福井県", englishName: "Fukui Prefecture", kind: "ken", population: 729386, blockId: "hokuriku-shinetsu" },
  { slug: "yamanashi", officialName: "山梨県", englishName: "Yamanashi Prefecture", kind: "ken", population: 779912, blockId: "minami-kanto" },
  { slug: "nagano", officialName: "長野県", englishName: "Nagano Prefecture", kind: "ken", population: 1954950, blockId: "hokuriku-shinetsu" },
  { slug: "gifu", officialName: "岐阜県", englishName: "Gifu Prefecture", kind: "ken", population: 1891489, blockId: "tokai" },
  { slug: "shizuoka", officialName: "静岡県", englishName: "Shizuoka Prefecture", kind: "ken", population: 3468845, blockId: "tokai" },
  { slug: "aichi", officialName: "愛知県", englishName: "Aichi Prefecture", kind: "ken", population: 7449403, blockId: "tokai" },
  { slug: "mie", officialName: "三重県", englishName: "Mie Prefecture", kind: "ken", population: 1694896, blockId: "tokai" },
  { slug: "shiga", officialName: "滋賀県", englishName: "Shiga Prefecture", kind: "ken", population: 1392439, blockId: "kinki" },
  { slug: "kyoto", officialName: "京都府", englishName: "Kyoto Prefecture", kind: "fu", population: 2502747, blockId: "kinki" },
  { slug: "osaka", officialName: "大阪府", englishName: "Osaka Prefecture", kind: "fu", population: 8764578, blockId: "kinki" },
  { slug: "hyogo", officialName: "兵庫県", englishName: "Hyogo Prefecture", kind: "ken", population: 5323825, blockId: "kinki" },
  { slug: "nara", officialName: "奈良県", englishName: "Nara Prefecture", kind: "ken", population: 1269180, blockId: "kinki" },
  { slug: "wakayama", officialName: "和歌山県", englishName: "Wakayama Prefecture", kind: "ken", population: 864262, blockId: "kinki" },
  { slug: "tottori", officialName: "鳥取県", englishName: "Tottori Prefecture", kind: "ken", population: 523732, blockId: "chugoku", councillorsWith: "shimane" },
  { slug: "shimane", officialName: "島根県", englishName: "Shimane Prefecture", kind: "ken", population: 629460, blockId: "chugoku", councillorsWith: "tottori" },
  { slug: "okayama", officialName: "岡山県", englishName: "Okayama Prefecture", kind: "ken", population: 1808664, blockId: "chugoku" },
  { slug: "hiroshima", officialName: "広島県", englishName: "Hiroshima Prefecture", kind: "ken", population: 2683399, blockId: "chugoku" },
  { slug: "yamaguchi", officialName: "山口県", englishName: "Yamaguchi Prefecture", kind: "ken", population: 1264006, blockId: "chugoku" },
  { slug: "tokushima", officialName: "徳島県", englishName: "Tokushima Prefecture", kind: "ken", population: 675489, blockId: "shikoku", councillorsWith: "kochi" },
  { slug: "kagawa", officialName: "香川県", englishName: "Kagawa Prefecture", kind: "ken", population: 907725, blockId: "shikoku" },
  { slug: "ehime", officialName: "愛媛県", englishName: "Ehime Prefecture", kind: "ken", population: 1260088, blockId: "shikoku" },
  { slug: "kochi", officialName: "高知県", englishName: "Kochi Prefecture", kind: "ken", population: 643437, blockId: "shikoku", councillorsWith: "tokushima" },
  { slug: "fukuoka", officialName: "福岡県", englishName: "Fukuoka Prefecture", kind: "ken", population: 5081879, blockId: "kyushu" },
  { slug: "saga", officialName: "佐賀県", englishName: "Saga Prefecture", kind: "ken", population: 781214, blockId: "kyushu" },
  { slug: "nagasaki", officialName: "長崎県", englishName: "Nagasaki Prefecture", kind: "ken", population: 1232190, blockId: "kyushu" },
  { slug: "kumamoto", officialName: "熊本県", englishName: "Kumamoto Prefecture", kind: "ken", population: 1678090, blockId: "kyushu" },
  { slug: "oita", officialName: "大分県", englishName: "Oita Prefecture", kind: "ken", population: 1076875, blockId: "kyushu" },
  { slug: "miyazaki", officialName: "宮崎県", englishName: "Miyazaki Prefecture", kind: "ken", population: 1018904, blockId: "kyushu" },
  { slug: "kagoshima", officialName: "鹿児島県", englishName: "Kagoshima Prefecture", kind: "ken", population: 1512969, blockId: "kyushu" },
  { slug: "okinawa", officialName: "沖縄県", englishName: "Okinawa Prefecture", kind: "ken", population: 1468220, blockId: "kyushu" },
];

export const CENSUS_NATIONAL_POPULATION = 123_049_524;

export const POPULATION_SUM = PREFECTURES.reduce((sum, item) => sum + item.population, 0);

if (POPULATION_SUM !== CENSUS_NATIONAL_POPULATION) {
  throw new Error(`Prefecture populations sum to ${POPULATION_SUM}, not ${CENSUS_NATIONAL_POPULATION}`);
}

if (BLOCKS.reduce((sum, block) => sum + block.seats, 0) !== 176) {
  throw new Error("Proportional block seats must sum to 176");
}

export function prefectureBySlug(slug: string): Prefecture | undefined {
  return PREFECTURES.find((item) => item.slug === slug);
}

export function blockById(id: string): ProportionalBlock {
  const found = BLOCKS.find((item) => item.id === id);
  if (!found) throw new Error(`Missing block ${id}`);
  return found;
}

export function censusNeighbors(slug: string): { prev?: Prefecture; next?: Prefecture } {
  const index = PREFECTURES.findIndex((item) => item.slug === slug);
  return {
    prev: index > 0 ? PREFECTURES[index - 1] : undefined,
    next: index >= 0 && index < PREFECTURES.length - 1 ? PREFECTURES[index + 1] : undefined,
  };
}
