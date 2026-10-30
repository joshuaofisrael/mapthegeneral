import type { Metadata } from "next";
import { HubNational } from "@/components/ModestHub";
import { hubMetadata, TW_HUB_LANGUAGES } from "@/data/new-hubs";

const base = hubMetadata("tw", "national");
export const metadata: Metadata = { ...base, alternates: { ...base.alternates, languages: TW_HUB_LANGUAGES } };

export default function Page() {
  return <HubNational code="tw" />;
}
