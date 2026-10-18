import Link from "@/components/AnchorLink";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ReportedPageNote } from "@/components/ReportedPageNote";
import { ContactForm } from "@/components/ContactForm";
import { contactMailto, SITE } from "@/data/site";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: `Contact ${SITE.name}, a brand of ${SITE.legalName}, with the contact form or by email. Error reports are welcome.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Contact" }]} />
      <PageHeader
        eyebrow="Contact"
        title={`Contact ${SITE.name}`}
        lede={`${SITE.name} is owned and operated by ${SITE.legalName}.`}
      />
      <div className="prose-legal">
        <p>
          Use the form below, or email <a href={contactMailto()}>{SITE.email}</a>. Both reach{" "}
          {SITE.legalName}. We reply by email.
        </p>
        <h2>Contact form</h2>
        <ContactForm />
        <p>
          {SITE.legalName}
          <br />
          {SITE.location}
        </p>
        <h2>Error reports</h2>
        <p>
          Error reports are welcome. Use the form or email the page address and what should be corrected, with a
          source if you have one. Corrections are made promptly.
        </p>
        <Suspense fallback={null}>
          <ReportedPageNote />
        </Suspense>
        <h2>Election questions</h2>
        <p>
          We are not an election office. Confirm dates, lists, and results with the official office
          named on the page.
        </p>
        <p>
          See the <Link href="/terms">terms of use</Link>, <Link href="/privacy">privacy policy</Link>,
          and <Link href="/disclaimer">disclaimer</Link>.
        </p>
      </div>
    </div>
  );
}
