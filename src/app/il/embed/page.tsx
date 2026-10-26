import type { Metadata } from "next";
import { IlEmbed } from "@/components/IlEmbed";

export const metadata: Metadata = {
  title: { absolute: "תוצאות הבחירות 2026 · Israel election results 2026 – widget" },
  robots: { index: false, follow: true },
  alternates: { canonical: "https://mapthegeneral.com/il/he/results/" },
};

export default function Page() {
  return (
    <div data-il-embed="">
      {/* Inside an iframe the widget shows on its own, without the site header and footer. */}
      <style>{`body:has([data-il-embed]) #main ~ *, body:has([data-il-embed]) .skip-link ~ :not(#main){display:none!important}body:has([data-il-embed]) #main{padding:0;max-width:none}body:has([data-il-embed]) .min-h-screen{min-height:0}`}</style>
      <IlEmbed />
    </div>
  );
}
