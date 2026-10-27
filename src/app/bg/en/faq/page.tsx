import { HubFaq } from "@/components/ModestHub";
import { bgHubMetadata } from "@/components/BgHub";

export const metadata = bgHubMetadata("faq", "en");

export default function Page() {
  return <HubFaq code="bg" />;
}
