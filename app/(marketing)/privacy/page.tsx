import { LegalPage, legalMetadata } from "@/components/trust/LegalPage";

export const metadata = legalMetadata("privacy");

/** Approved privacy notice (spec 5). Returns 404 until approved text is added to content/legal.ts. */
export default function PrivacyPage() {
  return <LegalPage slug="privacy" />;
}
