import { HubElection } from "@/components/ModestHub";
import { hubMetadata } from "@/data/new-hubs";

export const metadata = hubMetadata("il", "election");

export default function Page() {
  return <HubElection code="il" />;
}
