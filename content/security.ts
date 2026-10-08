import type { SecurityControl } from "./types";

/**
 * Security and data protection (spec 11.2–11.3; source section 21).
 *
 * Every control is "under-review": the source lists them as requirements, not verified
 * facts. Pages must not present a control as implemented until its status is "approved"
 * and the evidence exists. The source's full customer assurance paragraph is intentionally
 * not reproduced for public use.
 */
export const securityControls: SecurityControl[] = [
  {
    control: "Transport encryption",
    sourceRequirement: "TLS 1.2/1.3",
    evidenceRequired: "Actual endpoint and provider configuration",
    status: "under-review",
  },
  {
    control: "Stored data encryption",
    sourceRequirement: "AES-256 with AWS KMS",
    evidenceRequired: "Storage and key architecture, and verification",
    status: "under-review",
  },
  {
    control: "Customer-managed keys",
    sourceRequirement: "AWS KMS options",
    evidenceRequired: "Supported deployment configuration",
    status: "under-review",
  },
  {
    control: "Tenant separation",
    sourceRequirement: "Logical isolation per customer",
    evidenceRequired: "Tenant enforcement and isolation review",
    status: "under-review",
  },
  {
    control: "Access control",
    sourceRequirement: "Role-based access, MFA and least privilege",
    evidenceRequired: "Implemented permissions and tested authentication",
    status: "under-review",
  },
  {
    control: "Audit logging",
    sourceRequirement: "CloudTrail and Security Hub, plus product audit logs",
    evidenceRequired: "Coverage, access, retention and monitoring",
    status: "under-review",
  },
  {
    control: "AI safeguards",
    sourceRequirement: "Bedrock guardrails and prompt-injection defence",
    evidenceRequired: "Actual provider configuration and adversarial evaluation",
    status: "under-review",
  },
  {
    control: "Model training",
    sourceRequirement: "No public-model training on customer data",
    evidenceRequired: "End-to-end contractual and provider settings",
    status: "under-review",
  },
  {
    control: "Support access",
    sourceRequirement: "Only with explicit customer authorisation",
    evidenceRequired: "Support access workflow and audit records",
    status: "under-review",
  },
  {
    control: "Data ownership",
    sourceRequirement: "Customer owns business data",
    evidenceRequired: "Approved contract and export/deletion process",
    status: "under-review",
  },
  {
    control: "Data residency",
    sourceRequirement: "Region choice",
    evidenceRequired: "Locations of all processors and backups",
    status: "under-review",
  },
  {
    control: "Backup and recovery",
    sourceRequirement: "Encrypted backups and disaster recovery",
    evidenceRequired: "Restore testing and agreed recovery objectives",
    status: "under-review",
  },
  {
    control: "Enterprise deployment",
    sourceRequirement: "Dedicated VPC, private connectivity, own cloud or on-premises",
    evidenceRequired: "Feasibility and scoped architecture",
    status: "under-review",
  },
];

/**
 * Topics covered in a security review (spec 11.2). Phrased as questions we answer for your
 * deployment, not as implemented controls; confirmed controls are listed separately once
 * approved.
 */
export const securityReviewTopics = [
  { title: "Access and roles", description: "Who on your team and ours can see conversations, recordings and settings." },
  { title: "Retention and deletion", description: "How long conversations and recordings are kept, and how they are deleted." },
  { title: "Where data is stored", description: "Hosting regions for your data and for the services involved." },
  { title: "Support access", description: "When our support team may access your account, and how that is authorised and recorded." },
  { title: "Encryption", description: "How data is protected in transit and at rest for your deployment." },
  { title: "AI data use", description: "How your business data is used by the AI services, and what it is not used for." },
  { title: "Audit records", description: "What is logged, who can review it and for how long." },
  { title: "Backup and recovery", description: "Backup approach and recovery arrangements for your setup." },
];

/** Interim public wording until controls are approved (spec 11.2). */
export const securityInterimStatement =
  "Discuss your access, retention, deployment, and data-handling requirements with our team.";

/**
 * Proof pack documents (spec 11.3). None are published yet; sensitive reports will use
 * an access-controlled request process. Do not link to documents that do not exist.
 */
export const proofPackDocuments = [
  "Security whitepaper",
  "Architecture diagram",
  "Data-flow diagram",
  "Subprocessor list",
  "Data processing agreement (DPA) template",
  "Non-disclosure agreement (NDA) template",
  "Incident response plan",
  "Business continuity and disaster recovery plan",
  "Penetration test summary",
  "Vulnerability management process",
  "Access control policy",
  "Data retention and deletion policy",
  "AI data-use policy",
  "Call recording consent policy",
  "WhatsApp Business Platform compliance policy",
];

/** Compliance responsibilities shared with customers (source section 21.1). */
export const complianceResponsibilities = [
  "WhatsApp Business Platform rules: opt-in, template messages and quality rating",
  "Call recording consent and AI disclosure",
  "Do-not-call compliance for outbound calls",
  "Data protection and data residency",
  "Security and audit logs for CRM and ERP integrations",
  "Regional telephony regulations",
  "WhatsApp Business Messaging Policy and terms",
];

export function getApprovedSecurityControls(): SecurityControl[] {
  return securityControls.filter((control) => control.status === "approved");
}
