import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { HandoffSection } from "@/components/home/HandoffSection";
import { Hero } from "@/components/home/Hero";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { IntegrationsSection } from "@/components/home/IntegrationsSection";
import { ModulesSection } from "@/components/home/ModulesSection";
import { PricingPreview } from "@/components/home/PricingPreview";
import { ProblemSection } from "@/components/home/ProblemSection";
import { RolesSection } from "@/components/home/RolesSection";
import { TrustSection } from "@/components/home/TrustSection";
import { WhatsAppSpotlight } from "@/components/home/WhatsAppSpotlight";
import { WorkflowSection } from "@/components/home/WorkflowSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { homepageFaqs } from "@/content/faqs";
import { homepageStructuredData } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: { absolute: "BizMaster AI Agent | Calls, WhatsApp and Follow-Ups" },
  description:
    "An AI assistant for calls, WhatsApp, bookings and follow-ups, with human handoff built in. From BizMaster Solutions Tech Hub Division.",
  alternates: { canonical: "/" },
};

/** Homepage (spec 6.1–6.12), in the order the specification lists the sections. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <RolesSection />
      <ModulesSection />
      <WhatsAppSpotlight />
      <WorkflowSection />
      <IndustriesSection />
      <HandoffSection />
      <IntegrationsSection />
      <PricingPreview />
      <TrustSection />
      <FinalCta />
      <JsonLd data={homepageStructuredData(homepageFaqs)} />
    </>
  );
}
