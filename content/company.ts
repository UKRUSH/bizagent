/**
 * About and contact content (spec 5 /about, /contact; source sections 1–2).
 * No invented founding dates, team sizes, addresses, clients or registration details.
 */

export const companyPurpose =
  "BizMaster AI Agent is built by the BizMaster Solutions Tech Hub Division to help businesses keep every customer conversation moving, across phone calls, WhatsApp and follow-ups, without losing the human relationships that matter.";

/** Positioning guidance from source section 2. */
export const positioning = {
  principle:
    "The assistant handles the repetitive calls and messages. People handle the relationships, the negotiations and the exceptions.",
  explanation:
    "We design the product to support your team, not to replace it. Routine questions, first responses and scheduled follow-ups are handled consistently, while sensitive decisions, complex issues and commitments stay with the people responsible for them.",
};

export const operatingApproach = [
  {
    title: "Honest about what is live",
    description:
      "Every module, integration and plan shows its availability. Anything not yet confirmed for your setup is described as something we assess, not something we promise.",
  },
  {
    title: "Transparent AI",
    description:
      "The assistant identifies itself as an AI assistant, and customers can ask for a person at any time.",
  },
  {
    title: "Consent first",
    description:
      "Recording is announced, marketing goes only to people who opted in, and opt-outs are respected on every channel.",
  },
  {
    title: "People approve what matters",
    description:
      "Payments, contracts, discounts and sensitive matters wait for a person's approval, with a record of who approved what.",
  },
  {
    title: "Built around your workflow",
    description:
      "We start from how your customers contact you and what your team handles most, then configure the modules that fit.",
  },
  {
    title: "No regulated advice",
    description:
      "The assistant does not give legal, medical, financial or tax advice. Those conversations go to qualified people.",
  },
];

export interface ContactRoute {
  title: string;
  description: string;
  href: string;
  label: string;
}

/** Where each kind of enquiry goes. General enquiries use the form on /contact itself. */
export const contactRoutes: ContactRoute[] = [
  {
    title: "See a demo",
    description: "Tell us how customers contact you and we'll shape a demo around your workflow.",
    href: "/book-demo",
    label: "Book a Demo",
  },
  {
    title: "Plans and pricing",
    description: "Ask about current pricing, the trial, or which plan fits your volume.",
    href: "/book-demo?plan=custom",
    label: "Enquire About a Plan",
  },
  {
    title: "Enterprise and white-label",
    description: "Custom deployments, several teams or brands, and integration scoping.",
    href: "/book-demo?plan=enterprise",
    label: "Talk to Sales",
  },
  {
    title: "Security documentation",
    description: "Ask about access, retention, deployment and data-handling requirements.",
    href: "/security#request-form",
    label: "Ask About Security",
  },
];
