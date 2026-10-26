import { HubElections } from "@/components/ModestHub";
import { hubMetadata } from "@/data/new-hubs";

export const metadata = hubMetadata("il", "elections");

export default function Page() {
  return <HubElections code="il" />;
}
