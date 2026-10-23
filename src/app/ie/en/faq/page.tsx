import { HubFaq } from "@/components/ModestHub";
import { hubMetadata } from "@/data/new-hubs";

export const metadata = hubMetadata("ie", "faq");

export default function Page() {
  return <HubFaq code="ie" />;
}
