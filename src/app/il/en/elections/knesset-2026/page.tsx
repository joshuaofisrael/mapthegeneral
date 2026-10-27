import { IlKnessetGuide, ilKnessetMetadata } from "@/components/IlKnessetGuide";

export const metadata = ilKnessetMetadata("en");

export default function Page() {
  return <IlKnessetGuide lang="en" />;
}