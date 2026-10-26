import AnchorLink from "@/components/AnchorLink";
import { HOME_FAQ_HEADING, HOME_FAQS, answerSegments, type HomeFaqItem } from "@/data/home-faq";

function Answer({ item }: { item: HomeFaqItem }) {
  const segments = answerSegments(item);
  return (
    <dd className="mt-2 text-sm leading-6 text-ink-muted">
      {segments.map((part, index) =>
        part.href ? (
          <AnchorLink
            key={`${item.question}-${index}`}
            className="font-medium text-navy underline underline-offset-2"
            href={part.href}
            rel={part.href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {part.text}
          </AnchorLink>
        ) : (
          <span key={`${item.question}-${index}`}>{part.text}</span>
        ),
      )}
    </dd>
  );
}

export function HomeFaq() {
  return (
    <section id="faq">
      <h2 className="font-serif text-2xl font-semibold">{HOME_FAQ_HEADING}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-ink-muted">Short answers about this site.</p>
      <dl className="mt-6 max-w-3xl space-y-6">
        {HOME_FAQS.map((item) => (
          <div key={item.question}>
            <dt className="font-serif text-xl font-semibold">{item.question}</dt>
            <Answer item={item} />
          </div>
        ))}
      </dl>
    </section>
  );
}
