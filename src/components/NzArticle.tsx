import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { breadcrumbJsonLd } from "@/lib/metadata";
import { EDITORIAL_BYLINE } from "@/data/editorial/model";
import type { ReactNode } from "react";

export type Cite = { label: string; href: string };

export function NzArticle(props: {
  path: string;
  crumb: string;
  eyebrow: string;
  title: string;
  lede: string;
  updated: string;
  children: ReactNode;
  cites: Cite[];
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "New Zealand", path: "/nz/en/" },
          { name: props.crumb, path: props.path },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/nz/en/", label: "New Zealand" }, { label: props.crumb }]} />
      <PageHeader eyebrow={props.eyebrow} title={props.title} lede={props.lede} />
      <p className="mt-2 text-sm text-ink-muted">
        {EDITORIAL_BYLINE} · Last updated: {props.updated}
      </p>
      <div className="prose-legal mt-6">{props.children}</div>
      <nav className="prose-legal mt-8" aria-label="New Zealand pages">
        <h2>More on the 2026 New Zealand election</h2>
        <ul>
          <li><Link href="/nz/en/elections/general-election/">General election guide</Link></li>
          <li><Link href="/nz/en/results/">Results page</Link></li>
          <li><Link href="/nz/en/electorates/">Electorates and candidates</Link></li>
          <li><Link href="/nz/en/parties/">Parties on the party vote</Link></li>
          <li><Link href="/nz/en/results-night/">How results night works</Link></li>
          <li><Link href="/nz/en/preview/">Election preview</Link></li>
        </ul>
      </nav>
      <section className="prose-legal mt-8">
        <h2>Sources</h2>
        <ul>
          {props.cites.map((c) => (
            <li key={c.href}>
              <a href={c.href} rel="noopener">{c.label}</a>
            </li>
          ))}
        </ul>
        <p>Map the General is unofficial and not affiliated with the Electoral Commission. It does not tell anyone how to vote.</p>
      </section>
    </div>
  );
}
