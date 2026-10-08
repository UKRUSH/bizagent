import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { approvedProviderAttribution, siteConfig } from "@/config/site";
import { whatsappFaqs } from "@/content/faqs";
import { getIndustry } from "@/content/industries";
import { shouldPreviewDraftPrices } from "@/content/plans";
import {
  onboardingStages,
  pbxWorkflows,
  voiceNotesVersusCalls,
  whatsappBusinessTools,
  whatsappCapabilities,
  whatsappComplianceRules,
} from "@/content/whatsapp";
import { PlanFamilyTabs } from "@/components/pricing/PlanFamilyTabs";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  BarChartIcon,
  BookIcon,
  CheckIcon,
  ClockIcon,
  GlobeIcon,
  HeadsetIcon,
  ImageIcon,
  LayersIcon,
  MegaphoneIcon,
  MessageIcon,
  MicIcon,
  PhoneIcon,
  PlugIcon,
  RefreshIcon,
  SearchIcon,
  ShieldIcon,
  SlidersIcon,
  SparkIcon,
  TrendingUpIcon,
  UserCheckIcon,
  UsersIcon,
  WorkflowIcon,
} from "@/components/ui/icons";
import { WhatsAppPreview } from "@/components/whatsapp/WhatsAppPreview";
import styles from "@/components/whatsapp/whatsapp.module.css";

const offering = siteConfig.whatsappOfferingName;

export const metadata: Metadata = {
  title: `${offering} — WhatsApp AI`,
  description:
    "AI for your WhatsApp Business number: chat, voice notes, templates, several numbers, PBX handoff and live voice calls where supported.",
  alternates: { canonical: "/whatsapp-ai" },
};

/** Industries the source lists for the WhatsApp offering (source section 18.6). */
const whatsappIndustries = [
  "real-estate",
  "retail-ecommerce",
  "clinics-hospitals",
  "education",
  "restaurants",
  "finance-professional-services",
  "automotive",
  "insurance",
];

/** The intro sentence, restated as scannable chips under it. */
const heroHighlights = ["Chats", "Voice notes", "Approved templates", "Live calls where supported", "Team handoff"];

/** Decorative icons keyed by the content titles; a missing key simply shows no icon. */
const icons: Record<string, ReactNode> = {
  "No-code onboarding": <SlidersIcon />,
  "Your business knowledge": <BookIcon />,
  "Conversation memory": <ClockIcon />,
  "Multilingual conversations": <GlobeIcon />,
  "Intent detection": <SparkIcon />,
  "Responsive voice": <MicIcon />,
  "Long-call recovery": <RefreshIcon />,
  "Voice-note understanding": <MessageIcon />,
  "Lead scoring": <TrendingUpIcon />,
  "Template broadcasts": <MegaphoneIcon />,
  "Searchable message history": <SearchIcon />,
  "Multiple numbers": <LayersIcon />,
  "Knowledge per number": <BookIcon />,
  "CRM lead sync": <PlugIcon />,
  "Usage and AI cost analytics": <BarChartIcon />,
  "Multi-step nurture": <WorkflowIcon />,
  "Instant configuration updates": <SlidersIcon />,
  "Media and asset library": <ImageIcon />,
  "Desk phones and softphones": <HeadsetIcon width={26} height={26} />,
  "Straight to your team": <UsersIcon width={26} height={26} />,
  "Qualify, then transfer": <UserCheckIcon width={26} height={26} />,
};

function CardIcon({ name }: { name: string }) {
  return icons[name] ? <div className="card-icon">{icons[name]}</div> : null;
}

/**
 * Agent BIZ MASTER (spec 5 /whatsapp-ai, 8.1). The official platform and provider are not
 * named unless the attribution has been approved, and no partner badge is shown (spec 1.2).
 */
export default function WhatsAppAiPage() {
  const attribution = approvedProviderAttribution();

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Features", href: "/features" }, { label: offering }]}
        eyebrow={`${offering} · WhatsApp AI`}
        title="AI for your WhatsApp Business number."
        actions={
          <>
            <Link href="/pricing" className="button">
              Explore WhatsApp Plans
            </Link>
            <Link href="/book-demo?role=whatsapp" className="button button--secondary">
              Book a Demo
            </Link>
          </>
        }
        aside={<WhatsAppPreview />}
      >
        <p>
          Reply to chats, understand voice notes, send approved templates and take live voice
          calls where supported, all from the same business knowledge, with your team one handoff
          away.
        </p>
        <ul className={styles.heroChips} aria-label="Highlights">
          {heroHighlights.map((item) => (
            <li key={item}>
              <CheckIcon width="16" height="16" />
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="section" aria-labelledby="capabilities-title">
        <div className="container">
          <SectionHeading id="capabilities-title" title="What it does on WhatsApp." />
          <div className={styles.fourGrid}>
            {whatsappCapabilities.map((capability) => (
              <article key={capability.title} className={`card ${styles.iconCard}`} aria-label={capability.title}>
                <CardIcon name={capability.title} />
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="voice-title">
        <div className="container">
          <SectionHeading id="voice-title" title="Voice notes and voice calls are different.">
            <p>Both are supported, but they work differently and have different requirements.</p>
          </SectionHeading>
          <div className={styles.compare}>
            <article className="card" aria-labelledby="voice-notes-title">
              <div className={styles.discIcon}>
                <MicIcon width={26} height={26} />
              </div>
              <h3 id="voice-notes-title">Voice notes</h3>
              <p>{voiceNotesVersusCalls.voiceNotes}</p>
            </article>
            <span className={styles.vs} aria-hidden="true">
              vs
            </span>
            <article className="card" aria-labelledby="voice-calls-title">
              <div className={styles.discIcon}>
                <PhoneIcon width={26} height={26} />
              </div>
              <h3 id="voice-calls-title">Live voice calls</h3>
              <p>{voiceNotesVersusCalls.liveCalls}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="tools-title">
        <div className="container">
          <SectionHeading id="tools-title" title="Business tools built in." />
          <div className={styles.toolGrid}>
            {whatsappBusinessTools.map((tool) => (
              <article key={tool.title} className={`card ${styles.tool}`} aria-label={tool.title}>
                <CardIcon name={tool.title} />
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="pbx-title">
        <div className="container">
          <SectionHeading id="pbx-title" title="Connect WhatsApp calls to your team's phones.">
            <p>Provider support and transfer behaviour are confirmed for each deployment.</p>
          </SectionHeading>
          <div className="grid-3">
            {pbxWorkflows.map((workflow) => (
              <article key={workflow.title} className={`card ${styles.featureCard}`} aria-label={workflow.title}>
                {icons[workflow.title] && <div className={styles.discIcon}>{icons[workflow.title]}</div>}
                <h3>{workflow.title}</h3>
                <p>{workflow.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="onboarding-title">
        <div className="container">
          <SectionHeading id="onboarding-title" title="How onboarding works." />
          <ol className={styles.steps}>
            {onboardingStages.map((stage) => (
              <li key={stage.title}>
                <strong>{stage.title}</strong>
                <p>{stage.description}</p>
              </li>
            ))}
          </ol>
          <div className={styles.assurance}>
            <ShieldIcon width="20" height="20" />
            <p>
              We never ask for your WhatsApp or Meta account passwords. Timing depends on number
              eligibility, verification and the integrations you need.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="plans-title">
        <div className="container">
          <SectionHeading id="plans-title" eyebrow={`${offering} plans`} title="Chat plans, or voice and chat together.">
            <p>
              <Link href="/pricing">Compare every plan</Link> and see what is confirmed in your quote.
            </p>
          </SectionHeading>
          <PlanFamilyTabs previewDrafts={shouldPreviewDraftPrices()} idBase="whatsapp-plans" />
        </div>
      </section>

      <section className="section" aria-label="Platform rules and industries">
        <div className={`container ${styles.split} ${styles.panels}`}>
          <div className={`card ${styles.panel}`}>
            <h2 id="rules-title">Rules every business follows</h2>
            <h3>
              <MessageIcon width="18" height="18" />
              Messaging
            </h3>
            <ul className="check-list">
              {whatsappComplianceRules.messaging.map((rule) => (
                <li key={rule}>
                  <CheckIcon width="18" height="18" />
                  {rule}
                </li>
              ))}
            </ul>
            <h3>
              <PhoneIcon width="18" height="18" />
              Voice calls
            </h3>
            <ul className="check-list">
              {whatsappComplianceRules.voice.map((rule) => (
                <li key={rule}>
                  <CheckIcon width="18" height="18" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
          <div className={`card ${styles.panel}`}>
            <h2 id="who-title">Who it&apos;s for</h2>
            <p>Any business that sells or supports customers on WhatsApp, from solo operators to larger teams.</p>
            <ul className={styles.chips} aria-labelledby="who-title">
              {whatsappIndustries.flatMap((slug) => {
                const industry = getIndustry(slug);
                return industry
                  ? [
                      <li key={slug}>
                        <Link href={`/industries/${slug}`}>{industry.name}</Link>
                      </li>,
                    ]
                  : [];
              })}
            </ul>
            {attribution && <p className={styles.attribution}>{attribution}</p>}
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="faq-title">
        <div className="container">
          <SectionHeading id="faq-title" title={`Questions about ${offering}`} />
          <FaqList questions={whatsappFaqs} />
        </div>
      </section>

      <CtaBand
        id="whatsapp-cta-title"
        title="Put AI on your WhatsApp number."
        text="Tell us about your number, your customers and what your team answers most often. We’ll check eligibility and shape the demo around it."
        action={{ href: "/pricing", label: "Explore WhatsApp Plans" }}
        showWhatsApp
      />
    </>
  );
}
