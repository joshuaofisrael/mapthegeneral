import { HubFaq } from "@/components/ModestHub";
import { hubMetadata } from "@/data/new-hubs";

export const metadata = hubMetadata("tw", "faq");

export default function Page() {
  return <HubFaq code="tw" />;
}
