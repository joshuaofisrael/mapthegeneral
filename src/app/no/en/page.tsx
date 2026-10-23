import { HubNational } from "@/components/ModestHub";
import { hubMetadata } from "@/data/new-hubs";

export const metadata = hubMetadata("no", "national");

export default function Page() {
  return <HubNational code="no" />;
}
