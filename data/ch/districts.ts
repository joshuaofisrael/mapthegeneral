import { CANTONS } from "./cantons";

export type District = {
  canton: string;
  slug: string;
  bfsNumber: string;
  officialName: string;
  shortName: string;
  municipalities: number;
  validFrom: string;
};

/** Parents of political communes (type 11) current on 1 January 2026, where the canton has two or more such names. */
export const DISTRICTS: District[] = [
  { canton: "AG", slug: "aarau", bfsNumber: "1901", officialName: "Bezirk Aarau", shortName: "Aarau", municipalities: 12, validFrom: "12.09.1848" },
  { canton: "AG", slug: "baden", bfsNumber: "1902", officialName: "Bezirk Baden", shortName: "Baden", municipalities: 25, validFrom: "12.09.1848" },
  { canton: "AG", slug: "bremgarten", bfsNumber: "1903", officialName: "Bezirk Bremgarten", shortName: "Bremgarten", municipalities: 22, validFrom: "12.09.1848" },
  { canton: "AG", slug: "brugg", bfsNumber: "1904", officialName: "Bezirk Brugg", shortName: "Brugg", municipalities: 19, validFrom: "12.09.1848" },
  { canton: "AG", slug: "kulm", bfsNumber: "1905", officialName: "Bezirk Kulm", shortName: "Kulm", municipalities: 16, validFrom: "12.09.1848" },
  { canton: "AG", slug: "laufenburg", bfsNumber: "1906", officialName: "Bezirk Laufenburg", shortName: "Laufenburg", municipalities: 17, validFrom: "12.09.1848" },
  { canton: "AG", slug: "lenzburg", bfsNumber: "1907", officialName: "Bezirk Lenzburg", shortName: "Lenzburg", municipalities: 20, validFrom: "12.09.1848" },
  { canton: "AG", slug: "muri", bfsNumber: "1908", officialName: "Bezirk Muri", shortName: "Muri", municipalities: 19, validFrom: "12.09.1848" },
  { canton: "AG", slug: "rheinfelden", bfsNumber: "1909", officialName: "Bezirk Rheinfelden", shortName: "Rheinfelden", municipalities: 14, validFrom: "12.09.1848" },
  { canton: "AG", slug: "zofingen", bfsNumber: "1910", officialName: "Bezirk Zofingen", shortName: "Zofingen", municipalities: 17, validFrom: "12.09.1848" },
  { canton: "AG", slug: "zurzach", bfsNumber: "1911", officialName: "Bezirk Zurzach", shortName: "Zurzach", municipalities: 15, validFrom: "12.09.1848" },
  { canton: "AR", slug: "hinterland", bfsNumber: "1501", officialName: "Bezirk Hinterland", shortName: "Hinterland", municipalities: 7, validFrom: "12.09.1848" },
  { canton: "AR", slug: "mittelland", bfsNumber: "1502", officialName: "Bezirk Mittelland", shortName: "Mittelland", municipalities: 5, validFrom: "12.09.1848" },
  { canton: "AR", slug: "vorderland", bfsNumber: "1503", officialName: "Bezirk Vorderland", shortName: "Vorderland", municipalities: 8, validFrom: "12.09.1848" },
  { canton: "BE", slug: "jura-bernois", bfsNumber: "241", officialName: "Arrondissement administratif Jura bernois", shortName: "Jura bernois", municipalities: 39, validFrom: "01.01.2010" },
  { canton: "BE", slug: "bern-mittelland", bfsNumber: "246", officialName: "Verwaltungskreis Bern-Mittelland", shortName: "Bern-Mittelland", municipalities: 74, validFrom: "01.01.2010" },
  { canton: "BE", slug: "biel-bienne", bfsNumber: "242", officialName: "Verwaltungskreis Biel/Bienne", shortName: "Biel/Bienne", municipalities: 19, validFrom: "01.01.2010" },
  { canton: "BE", slug: "emmental", bfsNumber: "245", officialName: "Verwaltungskreis Emmental", shortName: "Emmental", municipalities: 39, validFrom: "01.01.2010" },
  { canton: "BE", slug: "frutigen-niedersimmental", bfsNumber: "249", officialName: "Verwaltungskreis Frutigen-Niedersimmental", shortName: "Frutigen-Niedersimmental", municipalities: 13, validFrom: "01.01.2010" },
  { canton: "BE", slug: "interlaken-oberhasli", bfsNumber: "250", officialName: "Verwaltungskreis Interlaken-Oberhasli", shortName: "Interlaken-Oberhasli", municipalities: 28, validFrom: "01.01.2010" },
  { canton: "BE", slug: "oberaargau", bfsNumber: "244", officialName: "Verwaltungskreis Oberaargau", shortName: "Oberaargau", municipalities: 43, validFrom: "01.01.2010" },
  { canton: "BE", slug: "obersimmental-saanen", bfsNumber: "248", officialName: "Verwaltungskreis Obersimmental-Saanen", shortName: "Obersimmental-Saanen", municipalities: 7, validFrom: "01.01.2010" },
  { canton: "BE", slug: "seeland", bfsNumber: "243", officialName: "Verwaltungskreis Seeland", shortName: "Seeland", municipalities: 42, validFrom: "01.01.2010" },
  { canton: "BE", slug: "thun", bfsNumber: "247", officialName: "Verwaltungskreis Thun", shortName: "Thun", municipalities: 30, validFrom: "01.01.2010" },
  { canton: "BL", slug: "arlesheim", bfsNumber: "1301", officialName: "Bezirk Arlesheim", shortName: "Arlesheim", municipalities: 15, validFrom: "12.09.1848" },
  { canton: "BL", slug: "laufen", bfsNumber: "1302", officialName: "Bezirk Laufen", shortName: "Laufen", municipalities: 13, validFrom: "01.01.1994" },
  { canton: "BL", slug: "liestal", bfsNumber: "1303", officialName: "Bezirk Liestal", shortName: "Liestal", municipalities: 14, validFrom: "01.01.1994" },
  { canton: "BL", slug: "sissach", bfsNumber: "1304", officialName: "Bezirk Sissach", shortName: "Sissach", municipalities: 29, validFrom: "01.01.1994" },
  { canton: "BL", slug: "waldenburg", bfsNumber: "1305", officialName: "Bezirk Waldenburg", shortName: "Waldenburg", municipalities: 15, validFrom: "01.01.1994" },
  { canton: "FR", slug: "see-lac", bfsNumber: "1005", officialName: "Bezirk See / District du Lac", shortName: "See / Lac", municipalities: 14, validFrom: "12.09.1848" },
  { canton: "FR", slug: "sense", bfsNumber: "1006", officialName: "Bezirk Sense", shortName: "Sense", municipalities: 15, validFrom: "12.09.1848" },
  { canton: "FR", slug: "la-broye", bfsNumber: "1001", officialName: "District de la Broye", shortName: "La Broye", municipalities: 17, validFrom: "12.09.1848" },
  { canton: "FR", slug: "la-glane", bfsNumber: "1002", officialName: "District de la Glâne", shortName: "La Glâne", municipalities: 14, validFrom: "12.09.1848" },
  { canton: "FR", slug: "la-gruyere", bfsNumber: "1003", officialName: "District de la Gruyère", shortName: "La Gruyère", municipalities: 25, validFrom: "12.09.1848" },
  { canton: "FR", slug: "la-sarine", bfsNumber: "1004", officialName: "District de la Sarine", shortName: "La Sarine", municipalities: 25, validFrom: "12.09.1848" },
  { canton: "FR", slug: "la-veveyse", bfsNumber: "1007", officialName: "District de la Veveyse", shortName: "La Veveyse", municipalities: 9, validFrom: "12.09.1848" },
  { canton: "GR", slug: "albula", bfsNumber: "1841", officialName: "Region Albula", shortName: "Albula", municipalities: 6, validFrom: "01.01.2017" },
  { canton: "GR", slug: "bernina", bfsNumber: "1842", officialName: "Region Bernina", shortName: "Bernina", municipalities: 2, validFrom: "01.01.2017" },
  { canton: "GR", slug: "engiadina-b-val-muestair", bfsNumber: "1843", officialName: "Region Engiadina Bassa / Val Müstair", shortName: "Engiadina B./Val Müstair", municipalities: 5, validFrom: "01.01.2017" },
  { canton: "GR", slug: "imboden", bfsNumber: "1844", officialName: "Region Imboden", shortName: "Imboden", municipalities: 7, validFrom: "01.01.2017" },
  { canton: "GR", slug: "landquart", bfsNumber: "1845", officialName: "Region Landquart", shortName: "Landquart", municipalities: 8, validFrom: "01.01.2017" },
  { canton: "GR", slug: "maloja", bfsNumber: "1846", officialName: "Region Maloja", shortName: "Maloja", municipalities: 12, validFrom: "01.01.2017" },
  { canton: "GR", slug: "moesa", bfsNumber: "1847", officialName: "Region Moesa", shortName: "Moesa", municipalities: 12, validFrom: "01.01.2017" },
  { canton: "GR", slug: "plessur", bfsNumber: "1848", officialName: "Region Plessur", shortName: "Plessur", municipalities: 3, validFrom: "01.01.2017" },
  { canton: "GR", slug: "praettigau-davos", bfsNumber: "1849", officialName: "Region Prättigau / Davos", shortName: "Prättigau / Davos", municipalities: 11, validFrom: "01.01.2017" },
  { canton: "GR", slug: "surselva", bfsNumber: "1850", officialName: "Region Surselva", shortName: "Surselva", municipalities: 15, validFrom: "01.01.2017" },
  { canton: "GR", slug: "viamala", bfsNumber: "1851", officialName: "Region Viamala", shortName: "Viamala", municipalities: 19, validFrom: "01.01.2017" },
  { canton: "JU", slug: "delemont", bfsNumber: "2601", officialName: "District de Delémont", shortName: "Delémont", municipalities: 19, validFrom: "01.01.1979" },
  { canton: "JU", slug: "moutier", bfsNumber: "2604", officialName: "District de Moutier", shortName: "Moutier", municipalities: 1, validFrom: "01.01.2026" },
  { canton: "JU", slug: "porrentruy", bfsNumber: "2603", officialName: "District de Porrentruy", shortName: "Porrentruy", municipalities: 19, validFrom: "01.01.1979" },
  { canton: "JU", slug: "les-franches-montagnes", bfsNumber: "2602", officialName: "District des Franches-Montagnes", shortName: "Les Franches-Montagnes", municipalities: 12, validFrom: "01.01.1979" },
  { canton: "LU", slug: "entlebuch", bfsNumber: "316", officialName: "Wahlkreis Entlebuch", shortName: "Entlebuch", municipalities: 9, validFrom: "01.01.2013" },
  { canton: "LU", slug: "hochdorf", bfsNumber: "313", officialName: "Wahlkreis Hochdorf", shortName: "Hochdorf", municipalities: 13, validFrom: "01.01.2013" },
  { canton: "LU", slug: "luzern-land", bfsNumber: "312", officialName: "Wahlkreis Luzern-Land", shortName: "Luzern-Land", municipalities: 16, validFrom: "01.01.2013" },
  { canton: "LU", slug: "luzern-stadt", bfsNumber: "311", officialName: "Wahlkreis Luzern-Stadt", shortName: "Luzern-Stadt", municipalities: 1, validFrom: "01.01.2013" },
  { canton: "LU", slug: "sursee", bfsNumber: "314", officialName: "Wahlkreis Sursee", shortName: "Sursee", municipalities: 19, validFrom: "01.01.2013" },
  { canton: "LU", slug: "willisau", bfsNumber: "315", officialName: "Wahlkreis Willisau", shortName: "Willisau", municipalities: 21, validFrom: "01.01.2013" },
  { canton: "SG", slug: "rheintal", bfsNumber: "1723", officialName: "Wahlkreis Rheintal", shortName: "Rheintal", municipalities: 13, validFrom: "01.01.2003" },
  { canton: "SG", slug: "rorschach", bfsNumber: "1722", officialName: "Wahlkreis Rorschach", shortName: "Rorschach", municipalities: 9, validFrom: "01.01.2003" },
  { canton: "SG", slug: "sarganserland", bfsNumber: "1725", officialName: "Wahlkreis Sarganserland", shortName: "Sarganserland", municipalities: 8, validFrom: "01.01.2003" },
  { canton: "SG", slug: "see-gaster", bfsNumber: "1726", officialName: "Wahlkreis See-Gaster", shortName: "See-Gaster", municipalities: 10, validFrom: "01.01.2003" },
  { canton: "SG", slug: "st-gallen", bfsNumber: "1721", officialName: "Wahlkreis St. Gallen", shortName: "St. Gallen", municipalities: 9, validFrom: "01.01.2003" },
  { canton: "SG", slug: "toggenburg", bfsNumber: "1727", officialName: "Wahlkreis Toggenburg", shortName: "Toggenburg", municipalities: 10, validFrom: "01.01.2003" },
  { canton: "SG", slug: "werdenberg", bfsNumber: "1724", officialName: "Wahlkreis Werdenberg", shortName: "Werdenberg", municipalities: 6, validFrom: "01.01.2003" },
  { canton: "SG", slug: "wil", bfsNumber: "1728", officialName: "Wahlkreis Wil", shortName: "Wil", municipalities: 10, validFrom: "01.01.2003" },
  { canton: "SH", slug: "oberklettgau", bfsNumber: "1401", officialName: "Bezirk Oberklettgau", shortName: "Oberklettgau", municipalities: 3, validFrom: "12.09.1848" },
  { canton: "SH", slug: "reiat", bfsNumber: "1402", officialName: "Bezirk Reiat", shortName: "Reiat", municipalities: 5, validFrom: "12.09.1848" },
  { canton: "SH", slug: "schaffhausen", bfsNumber: "1403", officialName: "Bezirk Schaffhausen", shortName: "Schaffhausen", municipalities: 7, validFrom: "12.09.1848" },
  { canton: "SH", slug: "schleitheim", bfsNumber: "1404", officialName: "Bezirk Schleitheim", shortName: "Schleitheim", municipalities: 3, validFrom: "12.09.1848" },
  { canton: "SH", slug: "stein", bfsNumber: "1405", officialName: "Bezirk Stein", shortName: "Stein", municipalities: 4, validFrom: "12.09.1848" },
  { canton: "SH", slug: "unterklettgau", bfsNumber: "1406", officialName: "Bezirk Unterklettgau", shortName: "Unterklettgau", municipalities: 4, validFrom: "12.09.1848" },
  { canton: "SO", slug: "bucheggberg", bfsNumber: "1103", officialName: "Bezirk Bucheggberg", shortName: "Bucheggberg", municipalities: 7, validFrom: "12.09.1848" },
  { canton: "SO", slug: "dorneck", bfsNumber: "1104", officialName: "Bezirk Dorneck", shortName: "Dorneck", municipalities: 11, validFrom: "12.09.1848" },
  { canton: "SO", slug: "gaeu", bfsNumber: "1101", officialName: "Bezirk Gäu", shortName: "Gäu", municipalities: 8, validFrom: "01.01.1991" },
  { canton: "SO", slug: "goesgen", bfsNumber: "1105", officialName: "Bezirk Gösgen", shortName: "Gösgen", municipalities: 10, validFrom: "12.09.1848" },
  { canton: "SO", slug: "lebern", bfsNumber: "1107", officialName: "Bezirk Lebern", shortName: "Lebern", municipalities: 15, validFrom: "12.09.1848" },
  { canton: "SO", slug: "olten", bfsNumber: "1108", officialName: "Bezirk Olten", shortName: "Olten", municipalities: 15, validFrom: "12.09.1848" },
  { canton: "SO", slug: "solothurn", bfsNumber: "1109", officialName: "Bezirk Solothurn", shortName: "Solothurn", municipalities: 1, validFrom: "12.09.1848" },
  { canton: "SO", slug: "thal", bfsNumber: "1102", officialName: "Bezirk Thal", shortName: "Thal", municipalities: 8, validFrom: "01.01.1991" },
  { canton: "SO", slug: "thierstein", bfsNumber: "1110", officialName: "Bezirk Thierstein", shortName: "Thierstein", municipalities: 12, validFrom: "12.09.1848" },
  { canton: "SO", slug: "wasseramt", bfsNumber: "1106", officialName: "Bezirk Wasseramt", shortName: "Wasseramt", municipalities: 17, validFrom: "01.01.1991" },
  { canton: "SZ", slug: "einsiedeln", bfsNumber: "501", officialName: "Bezirk Einsiedeln", shortName: "Einsiedeln", municipalities: 1, validFrom: "12.09.1848" },
  { canton: "SZ", slug: "gersau", bfsNumber: "502", officialName: "Bezirk Gersau", shortName: "Gersau", municipalities: 1, validFrom: "12.09.1848" },
  { canton: "SZ", slug: "hoefe", bfsNumber: "503", officialName: "Bezirk Höfe", shortName: "Höfe", municipalities: 3, validFrom: "12.09.1848" },
  { canton: "SZ", slug: "kuessnacht-sz", bfsNumber: "504", officialName: "Bezirk Küssnacht (SZ)", shortName: "Küssnacht (SZ)", municipalities: 1, validFrom: "01.01.2004" },
  { canton: "SZ", slug: "march", bfsNumber: "505", officialName: "Bezirk March", shortName: "March", municipalities: 9, validFrom: "12.09.1848" },
  { canton: "SZ", slug: "schwyz", bfsNumber: "506", officialName: "Bezirk Schwyz", shortName: "Schwyz", municipalities: 15, validFrom: "12.09.1848" },
  { canton: "TG", slug: "arbon", bfsNumber: "2011", officialName: "Bezirk Arbon", shortName: "Arbon", municipalities: 12, validFrom: "01.01.2011" },
  { canton: "TG", slug: "frauenfeld", bfsNumber: "2012", officialName: "Bezirk Frauenfeld", shortName: "Frauenfeld", municipalities: 23, validFrom: "01.01.2011" },
  { canton: "TG", slug: "kreuzlingen", bfsNumber: "2013", officialName: "Bezirk Kreuzlingen", shortName: "Kreuzlingen", municipalities: 14, validFrom: "01.01.2011" },
  { canton: "TG", slug: "muenchwilen", bfsNumber: "2014", officialName: "Bezirk Münchwilen", shortName: "Münchwilen", municipalities: 13, validFrom: "01.01.2011" },
  { canton: "TG", slug: "weinfelden", bfsNumber: "2015", officialName: "Bezirk Weinfelden", shortName: "Weinfelden", municipalities: 18, validFrom: "01.01.2011" },
  { canton: "TI", slug: "bellinzona", bfsNumber: "2101", officialName: "Distretto di Bellinzona", shortName: "Bellinzona", municipalities: 6, validFrom: "12.09.1848" },
  { canton: "TI", slug: "blenio", bfsNumber: "2102", officialName: "Distretto di Blenio", shortName: "Blenio", municipalities: 3, validFrom: "12.09.1848" },
  { canton: "TI", slug: "leventina", bfsNumber: "2103", officialName: "Distretto di Leventina", shortName: "Leventina", municipalities: 8, validFrom: "12.09.1848" },
  { canton: "TI", slug: "locarno", bfsNumber: "2104", officialName: "Distretto di Locarno", shortName: "Locarno", municipalities: 19, validFrom: "12.09.1848" },
  { canton: "TI", slug: "lugano", bfsNumber: "2105", officialName: "Distretto di Lugano", shortName: "Lugano", municipalities: 43, validFrom: "12.09.1848" },
  { canton: "TI", slug: "mendrisio", bfsNumber: "2106", officialName: "Distretto di Mendrisio", shortName: "Mendrisio", municipalities: 11, validFrom: "12.09.1848" },
  { canton: "TI", slug: "riviera", bfsNumber: "2107", officialName: "Distretto di Riviera", shortName: "Riviera", municipalities: 2, validFrom: "12.09.1848" },
  { canton: "TI", slug: "vallemaggia", bfsNumber: "2108", officialName: "Distretto di Vallemaggia", shortName: "Vallemaggia", municipalities: 8, validFrom: "12.09.1848" },
  { canton: "VD", slug: "aigle", bfsNumber: "2221", officialName: "District d'Aigle", shortName: "Aigle", municipalities: 15, validFrom: "01.09.2006" },
  { canton: "VD", slug: "lausanne", bfsNumber: "2225", officialName: "District de Lausanne", shortName: "Lausanne", municipalities: 6, validFrom: "01.09.2006" },
  { canton: "VD", slug: "lavaux-oron", bfsNumber: "2226", officialName: "District de Lavaux-Oron", shortName: "Lavaux-Oron", municipalities: 16, validFrom: "01.09.2006" },
  { canton: "VD", slug: "morges", bfsNumber: "2227", officialName: "District de Morges", shortName: "Morges", municipalities: 56, validFrom: "01.09.2006" },
  { canton: "VD", slug: "nyon", bfsNumber: "2228", officialName: "District de Nyon", shortName: "Nyon", municipalities: 47, validFrom: "01.09.2006" },
  { canton: "VD", slug: "ouest-lausannois", bfsNumber: "2229", officialName: "District de l'Ouest lausannois", shortName: "Ouest lausannois", municipalities: 8, validFrom: "01.09.2006" },
  { canton: "VD", slug: "broye-vully", bfsNumber: "2222", officialName: "District de la Broye-Vully", shortName: "Broye-Vully", municipalities: 31, validFrom: "01.09.2006" },
  { canton: "VD", slug: "riviera-pays-denhaut", bfsNumber: "2230", officialName: "District de la Riviera-Pays-d'Enhaut", shortName: "Riviera-Pays-d'Enhaut", municipalities: 12, validFrom: "01.09.2006" },
  { canton: "VD", slug: "gros-de-vaud", bfsNumber: "2223", officialName: "District du Gros-de-Vaud", shortName: "Gros-de-Vaud", municipalities: 36, validFrom: "01.09.2006" },
  { canton: "VD", slug: "jura-nord-vaudois", bfsNumber: "2224", officialName: "District du Jura-Nord vaudois", shortName: "Jura-Nord vaudois", municipalities: 73, validFrom: "01.09.2006" },
  { canton: "VS", slug: "brig", bfsNumber: "2301", officialName: "Bezirk Brig", shortName: "Brig", municipalities: 7, validFrom: "12.09.1848" },
  { canton: "VS", slug: "goms", bfsNumber: "2304", officialName: "Bezirk Goms", shortName: "Goms", municipalities: 8, validFrom: "12.09.1848" },
  { canton: "VS", slug: "leuk", bfsNumber: "2306", officialName: "Bezirk Leuk", shortName: "Leuk", municipalities: 12, validFrom: "12.09.1848" },
  { canton: "VS", slug: "raron", bfsNumber: "2309", officialName: "Bezirk Raron", shortName: "Raron", municipalities: 17, validFrom: "12.09.1848" },
  { canton: "VS", slug: "visp", bfsNumber: "2313", officialName: "Bezirk Visp", shortName: "Visp", municipalities: 19, validFrom: "12.09.1848" },
  { canton: "VS", slug: "entremont", bfsNumber: "2303", officialName: "District d'Entremont", shortName: "Entremont", municipalities: 5, validFrom: "12.09.1848" },
  { canton: "VS", slug: "herens", bfsNumber: "2305", officialName: "District d'Hérens", shortName: "Hérens", municipalities: 6, validFrom: "12.09.1848" },
  { canton: "VS", slug: "conthey", bfsNumber: "2302", officialName: "District de Conthey", shortName: "Conthey", municipalities: 5, validFrom: "12.09.1848" },
  { canton: "VS", slug: "martigny", bfsNumber: "2307", officialName: "District de Martigny", shortName: "Martigny", municipalities: 10, validFrom: "12.09.1848" },
  { canton: "VS", slug: "monthey", bfsNumber: "2308", officialName: "District de Monthey", shortName: "Monthey", municipalities: 9, validFrom: "12.09.1848" },
  { canton: "VS", slug: "saint-maurice", bfsNumber: "2310", officialName: "District de Saint-Maurice", shortName: "Saint-Maurice", municipalities: 9, validFrom: "12.09.1848" },
  { canton: "VS", slug: "sierre", bfsNumber: "2311", officialName: "District de Sierre", shortName: "Sierre", municipalities: 10, validFrom: "12.09.1848" },
  { canton: "VS", slug: "sion", bfsNumber: "2312", officialName: "District de Sion", shortName: "Sion", municipalities: 5, validFrom: "12.09.1848" },
  { canton: "ZH", slug: "affoltern", bfsNumber: "101", officialName: "Bezirk Affoltern", shortName: "Affoltern", municipalities: 14, validFrom: "12.09.1848" },
  { canton: "ZH", slug: "andelfingen", bfsNumber: "102", officialName: "Bezirk Andelfingen", shortName: "Andelfingen", municipalities: 20, validFrom: "12.09.1848" },
  { canton: "ZH", slug: "buelach", bfsNumber: "103", officialName: "Bezirk Bülach", shortName: "Bülach", municipalities: 22, validFrom: "12.09.1848" },
  { canton: "ZH", slug: "dielsdorf", bfsNumber: "104", officialName: "Bezirk Dielsdorf", shortName: "Dielsdorf", municipalities: 22, validFrom: "12.09.1848" },
  { canton: "ZH", slug: "dietikon", bfsNumber: "111", officialName: "Bezirk Dietikon", shortName: "Dietikon", municipalities: 11, validFrom: "01.01.1990" },
  { canton: "ZH", slug: "hinwil", bfsNumber: "105", officialName: "Bezirk Hinwil", shortName: "Hinwil", municipalities: 11, validFrom: "12.09.1848" },
  { canton: "ZH", slug: "horgen", bfsNumber: "106", officialName: "Bezirk Horgen", shortName: "Horgen", municipalities: 9, validFrom: "12.09.1848" },
  { canton: "ZH", slug: "meilen", bfsNumber: "107", officialName: "Bezirk Meilen", shortName: "Meilen", municipalities: 11, validFrom: "12.09.1848" },
  { canton: "ZH", slug: "pfaeffikon", bfsNumber: "108", officialName: "Bezirk Pfäffikon", shortName: "Pfäffikon", municipalities: 10, validFrom: "12.09.1848" },
  { canton: "ZH", slug: "uster", bfsNumber: "109", officialName: "Bezirk Uster", shortName: "Uster", municipalities: 10, validFrom: "12.09.1848" },
  { canton: "ZH", slug: "winterthur", bfsNumber: "110", officialName: "Bezirk Winterthur", shortName: "Winterthur", municipalities: 19, validFrom: "12.09.1848" },
  { canton: "ZH", slug: "zuerich", bfsNumber: "112", officialName: "Bezirk Zürich", shortName: "Zürich", municipalities: 1, validFrom: "01.01.1990" },
];

/** The register's single district name, where a canton has only one. No separate page. */
export const SOLE_DISTRICT_NAME: Record<string, string> = {
  AI: "Kanton Appenzell Innerrhoden",
  BS: "Kanton Basel-Stadt",
  GE: "Canton de Genève",
  GL: "Kanton Glarus",
  NE: "Canton de Neuchâtel",
  NW: "Kanton Nidwalden",
  OW: "Kanton Obwalden",
  UR: "Kanton Uri",
  ZG: "Kanton Zug",
};

export function districtsForCanton(abbr: string): District[] {
  return DISTRICTS.filter((district) => district.canton === abbr).sort((a, b) =>
    a.officialName.localeCompare(b.officialName, "de"),
  );
}

export function districtNeighbors(canton: string, slug: string): { prev?: District; next?: District } {
  const list = districtsForCanton(canton);
  const index = list.findIndex((district) => district.slug === slug);
  return {
    prev: index > 0 ? list[index - 1] : undefined,
    next: index >= 0 && index < list.length - 1 ? list[index + 1] : undefined,
  };
}

function assertDistricts(): void {
  if (DISTRICTS.length !== 135) throw new Error(`Expected 135 district pages, got ${DISTRICTS.length}`);
  const by = new Map<string, number>();
  for (const district of DISTRICTS) by.set(district.canton, (by.get(district.canton) ?? 0) + district.municipalities);
  for (const [abbr, name] of Object.entries(SOLE_DISTRICT_NAME)) {
    if (by.has(abbr)) throw new Error(`${abbr} has both pages and a sole name`);
    if (!name) throw new Error(abbr);
  }
  let munis = 0;
  for (const canton of CANTONS) {
    const pages = by.get(canton.abbr) ?? 0;
    const sole = SOLE_DISTRICT_NAME[canton.abbr];
    if (sole) {
      if (pages !== 0) throw new Error(canton.abbr);
    } else if (pages !== canton.municipalities) {
      throw new Error(`${canton.abbr} district communes ${pages} != ${canton.municipalities}`);
    }
    munis += canton.municipalities;
  }
  if (munis !== 2110) throw new Error(String(munis));
  if (Object.keys(SOLE_DISTRICT_NAME).length !== 9) throw new Error("sole count");
}

assertDistricts();
