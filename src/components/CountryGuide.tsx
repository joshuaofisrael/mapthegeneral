import Link from "@/components/AnchorLink";
import { EditorialPreview } from "@/components/EditorialPreview";
import { hubPreviewPath } from "@/data/editorial";
import { countryGuide, type Part } from "@/data/guides/copy";

function Rich({ parts }: { parts: Part[] }) {
  return (
    <p>
      {parts.map((part, index) => {
        if (!part.href) return <span key={index}>{part.text}</span>;
        if (part.href.startsWith("/")) {
          return (
            <Link key={index} href={part.href}>
              {part.text}
            </Link>
          );
        }
        return (
          <a key={index} href={part.href} rel="noopener noreferrer">
            {part.text}
          </a>
        );
      })}
    </p>
  );
}

/** Practical guide on a national hub. Municipality pages do not render this. */
export function CountryGuide({ code, lang }: { code: string; lang: string }) {
  const guide = countryGuide(code, lang);
  const preview = <EditorialPreview path={hubPreviewPath(code, lang)} />;
  if (!guide) return preview;
  return (
    <>
    {preview}
    <section className="guide-block prose-legal" id="how-elections-work" aria-labelledby="how-elections-work-title">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-navy">{guide.kicker}</p>
      <h2 id="how-elections-work-title">{guide.title}</h2>
      <p>{guide.intro}</p>
      {guide.blocks.map((block) => (
        <section key={block.heading}>
          <h3>{block.heading}</h3>
          {block.paragraphs.map((paragraph, index) => (
            <Rich key={`${block.heading}-${index}`} parts={paragraph} />
          ))}
        </section>
      ))}
      <h3>{guide.electionsHeading}</h3>
      <ul>
        {guide.elections.map((item) => (
          <li key={item.name}>
            {item.href ? <Link href={item.href}>{item.name}</Link> : item.name}
            {item.detail ? ` — ${item.detail}` : ""}
          </li>
        ))}
      </ul>
      <h3>{guide.glossaryHeading}</h3>
      <dl className="space-y-3">
        {guide.glossary.map((item) => (
          <div key={item.term}>
            <dt className="font-semibold">{item.term}</dt>
            <dd>{item.text}</dd>
          </div>
        ))}
      </dl>
      <h3>{guide.faqHeading}</h3>
      <dl className="space-y-4">
        {guide.faq.map((item) => (
          <div key={item.q}>
            <dt className="font-semibold">{item.q}</dt>
            <dd className="mt-1">{item.a}</dd>
          </div>
        ))}
      </dl>
      <h3>{guide.sourcesHeading}</h3>
      <ul>
        {guide.sources.map((item) => (
          <li key={item.href}>
            <a href={item.href} rel="noopener noreferrer">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
    </>
  );
}
