import type { DeploymentOption } from "./types";

/** Deployment options and channel embedding (spec 10; source sections 20.2–20.3). */

export const deploymentOptions: DeploymentOption[] = [
  {
    slug: "standalone-saas",
    title: "Standalone cloud service",
    description: "A hosted AI agent that runs alongside your existing tools, with no system changes needed to start.",
    bestFor: "Businesses trying AI-assisted calls and messaging for the first time",
    availability: "needs-assessment",
  },
  {
    slug: "crm-erp-layer",
    title: "AI added to your CRM or ERP",
    description: "The assistant connects to your existing CRM or ERP through APIs, so conversations update the systems you already use.",
    bestFor: "Established businesses with existing systems",
    availability: "needs-assessment",
  },
  {
    slug: "whatsapp-onboarding",
    title: "Agent BIZ MASTER WhatsApp onboarding",
    description: "A guided setup for eligible WhatsApp Business numbers: connect the number, add your business knowledge and configure handoff.",
    bestFor: "Businesses in Sri Lanka and the region that want WhatsApp AI first",
    availability: "needs-assessment",
    note: "Provider attribution for the underlying WhatsApp platform is shown only once approved.",
  },
  {
    slug: "custom-deployment",
    title: "Custom AI-native deployment",
    description: "A deployment designed around unusual workflows, built on established frameworks with human architecture oversight.",
    bestFor: "Businesses with unique workflows",
    availability: "custom",
  },
];

/**
 * Enterprise architectures from the source. They are described publicly only once the
 * required services are confirmed to support them (spec 10).
 */
export const enterpriseArchitectures: DeploymentOption[] = [
  {
    slug: "dedicated-vpc",
    title: "Dedicated virtual private cloud",
    description: "An isolated cloud environment for one organisation.",
    bestFor: "Organisations with strict isolation requirements",
    availability: "needs-assessment",
  },
  {
    slug: "private-connectivity",
    title: "Private connectivity",
    description: "Private network links between your systems and the platform.",
    bestFor: "Organisations that cannot route integration traffic over the public internet",
    availability: "needs-assessment",
  },
  {
    slug: "customer-cloud",
    title: "Your own cloud account",
    description: "Deployment into a cloud account your organisation controls.",
    bestFor: "Organisations with cloud governance requirements",
    availability: "needs-assessment",
  },
  {
    slug: "on-premises",
    title: "On-premises",
    description: "Deployment inside your own data centre.",
    bestFor: "Organisations that must keep systems on site",
    availability: "needs-assessment",
  },
];

/** Website and mobile integration scope (source section 20.3). */
export const channelEmbedding = {
  website: [
    "Customer support chat backed by your business knowledge",
    "Content tailored to the type of visitor",
    "Lead capture and qualification",
    "Relevant content suggestions",
  ],
  mobile: [
    "An assistant embedded through a secured WebView and JavaScript bridge",
    "In-app chat and voice interactions",
    "Native integration with Flutter, React Native, iOS or Android",
  ],
  requirements: [
    "Authentication for every embedded session",
    "An allowlist of permitted origins",
    "A defined bridge contract between the app and the assistant",
  ],
};
