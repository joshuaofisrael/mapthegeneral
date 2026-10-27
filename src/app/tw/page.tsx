import { HubChooser } from "@/components/ModestHub";
import { hubMetadata } from "@/data/new-hubs";

export const metadata = hubMetadata("tw", "chooser");

export default function Page() {
  return <HubChooser code="tw" />;
}
