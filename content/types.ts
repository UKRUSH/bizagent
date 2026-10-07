/**
 * Content contracts for typed repository content (specification section 14.3).
 *
 * Public content must follow the publication rules in spec 1.2: no unsupported market,
 * capacity, latency, security, partner, staff-replacement or ROI claims. Source statements
 * that still need confirmation live in fields or exports marked "internal".
 */

/** Availability label shown wherever a module, connector or capability is listed (spec 7, 10). */
export type Availability = "available" | "custom" | "planned" | "needs-assessment";

/** Publication state for claims, prices and pages (spec 16). */
export type PublicationStatus = "draft" | "under-review" | "approved" | "archived";

export interface Question {
  question: string;
  answer: string;
}

export interface UseCase {
  title: string;
  description: string;
}

export interface FeatureGroup {
  heading: string;
  items: string[];
}

/* ------------------------------------------------------------------ Modules */

export const moduleSlugs = [
  "inbound-calls",
  "outbound-calls",
  "whatsapp-messaging",
  "whatsapp-voice",
  "follow-ups",
  "reminders-scheduling",
  "call-filtering",
  "customer-segmentation",
  "recording-transcription",
  "promotions-campaigns",
  "sales-agent",
  "call-center",
  "personal-assistant",
] as const;

export type ModuleSlug = (typeof moduleSlugs)[number];

export type ModuleCategory = "respond" | "follow-through" | "understand" | "grow" | "manage";

export interface ProductModule {
  slug: ModuleSlug;
  /** 1–13, the order used in the source document. */
  number: number;
  /** Section of the source DOCX the content comes from, for traceability. */
  sourceSection: string;
  title: string;
  shortTitle: string;
  /** One sentence for cards and the module explorer. */
  summary: string;
  /** 80–140 words for the module page introduction (spec 7.1). */
  introduction: string;
  category: ModuleCategory;
  featureGroups: FeatureGroup[];
  /** Ordered steps for the module page workflow. */
  workflow: string[];
  /** Exactly three practical use cases (spec 7.1). */
  useCases: UseCase[];
  /** Benefits without numerical promises. */
  benefits: string[];
  humanControls: string[];
  integrations: IntegrationCategoryId[];
  /** Operational systems the real feature depends on (spec 7). */
  dependencies: string;
  /** What the website's illustration shows (spec 7). */
  demonstration: string;
  relatedModules: ModuleSlug[];
  faqs: Question[];
  availability: Availability;
}

/* -------------------------------------------------------------------- Roles */

export type RoleSlug = "call-center" | "sales-agent" | "personal-assistant";

export interface OperatingRole {
  slug: RoleSlug;
  title: string;
  /** Short card copy (spec 6.3). */
  summary: string;
  description: string;
  /** What the assistant does in this role (source section 2). */
  responsibilities: string[];
  /** Work that stays with people. */
  teamResponsibilities: string[];
  modules: ModuleSlug[];
  href: string;
  ctaLabel: string;
}

/* --------------------------------------------------------------- Industries */

export type ConversationChannel = "phone" | "whatsapp" | "whatsapp-voice";

export interface ScenarioMessage {
  speaker: "customer" | "assistant" | "team";
  text: string;
}

/** A fictional illustration. Uses initials only and identifies the AI as an AI assistant. */
export interface FictionalScenario {
  title: string;
  channel: ConversationChannel;
  messages: ScenarioMessage[];
  outcome: string;
}

export interface Industry {
  slug: string;
  name: string;
  /** Title for the six homepage launch cards (spec 6.7). */
  homepageTitle?: string;
  summary: string;
  problem: string;
  workflows: string[];
  modules: ModuleSlug[];
  scenario: FictionalScenario;
  /** Operational and regulatory boundaries (spec 9). */
  boundaries: string[];
  integrations: IntegrationCategoryId[];
}

/* ------------------------------------------------------------- Integrations */

export const integrationCategoryIds = [
  "telephony",
  "whatsapp",
  "pbx",
  "crm",
  "erp",
  "calendar",
  "email",
  "accounting",
  "payments",
  "hr",
  "commerce",
  "logistics",
  "government",
  "productivity",
] as const;

export type IntegrationCategoryId = (typeof integrationCategoryIds)[number];

/** Homepage integration groups (spec 6.9). */
export type IntegrationGroup = "crm" | "calendar" | "commerce" | "telephony" | "back-office";

export interface IntegrationSystem {
  name: string;
  status: Availability;
}

export interface IntegrationCategory {
  id: IntegrationCategoryId;
  name: string;
  group: IntegrationGroup;
  description: string;
  systems: IntegrationSystem[];
  /** Conditions such as merchant eligibility or permitted access. */
  note?: string;
}

/* ------------------------------------------------------------------ Pricing */

export type PlanFamily = "chat" | "voice";

export interface Plan {
  slug: string;
  name: string;
  family: PlanFamily;
  currency: "LKR";
  price: number;
  period: "month" | "two-weeks";
  chatAllowance: number;
  voiceMinutes?: number;
  features: string[];
  isTrial?: boolean;
  ctaLabel: string;
  publicationStatus: "draft" | "approved";
}

export interface PackageTier {
  slug: string;
  name: string;
  audience: string;
  scope: string;
}

/* ------------------------------------------------------- Deployment & trust */

export interface DeploymentOption {
  slug: string;
  title: string;
  description: string;
  bestFor: string;
  availability: Availability;
  note?: string;
}

export interface HandoffType {
  name: string;
  description: string;
}

export interface SecurityControl {
  control: string;
  sourceRequirement: string;
  evidenceRequired: string;
  status: PublicationStatus;
}
