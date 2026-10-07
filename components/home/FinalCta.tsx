import { CtaBand } from "@/components/ui/CtaBand";

/** Final conversion band (spec 6.12). */
export function FinalCta() {
  return (
    <CtaBand
      id="final-cta-title"
      title="See how the agent fits your business."
      text="Tell us how customers contact you and what your team handles most often. We’ll use that workflow to shape your demo."
      action={{ href: "/book-demo", label: "Book a Demo" }}
      showWhatsApp
    />
  );
}
