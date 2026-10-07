/**
 * Enterprise and white-label page content (spec 5 /enterprise, 8.5, 10, 11).
 *
 * Dedicated VPC, private connectivity, customer cloud and on-premises hosting are only
 * named as requirements to assess; they are not described as available architectures
 * until confirmed (spec 10). No SLA figures, certifications or response times.
 */

export const whiteLabelPoints = [
  { title: "Your brand", description: "Greetings, voices and messages presented under your own or your client's brand." },
  { title: "Separate clients", description: "Each client's conversations and data kept separate, with tenant isolation." },
  { title: "Central administration", description: "Manage several brands, sites and teams from one place." },
  { title: "Multi-site queues", description: "Queues by location, language and skill across your operation." },
];

/** Requirements discussed case by case; none is promised before assessment. */
export const enterpriseRequirements = [
  "Dedicated or isolated environments",
  "Private network connectivity",
  "Hosting in your own cloud account or on premises",
  "Data residency and retention rules",
  "Single sign-on, roles and access reviews",
  "Custom integrations with ERP, CRM and internal systems",
];

export const engagementSteps = [
  { title: "Discovery", description: "We learn how your customers reach you, your volumes and the systems involved." },
  { title: "Requirements and security review", description: "Your security, data-handling and compliance requirements are reviewed with your team." },
  { title: "Architecture and integration scope", description: "Deployment approach, integrations and handoff rules are agreed in writing." },
  { title: "Pilot", description: "A limited rollout on selected channels, teams or sites, reviewed together." },
  { title: "Rollout", description: "Expansion to further teams and channels on an agreed plan." },
];

export const serviceLevelStatement =
  "Service levels, support hours and escalation contacts are agreed in your contract, based on your requirements.";
