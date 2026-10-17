const ES = new Intl.NumberFormat("es-ES");
const EN = new Intl.NumberFormat("en-US");

export function formatNumber(value: number, lang: "es" | "en"): string {
  return (lang === "es" ? ES : EN).format(value);
}

export function formatIsoDate(iso: string, lang: "es" | "en"): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
