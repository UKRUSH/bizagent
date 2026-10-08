import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { pricingFaqs } from "@/content/faqs";
import { billingTermsToConfirm, packageTiers, shouldPreviewDraftPrices } from "@/content/plans";
import { PlanComparisonTable } from "@/components/pricing/PlanComparisonTable";
import { PlanFamilyTabs } from "@/components/pricing/PlanFamilyTabs";
import { packageTierIcons } from "@/components/pricing/packageTierIcons";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon, CheckIcon, LayersIcon, MessageIcon, PhoneIcon, ShieldIcon } from "@/components/ui/icons";
import pricing from "@/components/pricing/pricing.module.css";
import styles from "@/components/whatsapp/whatsapp.module.css";

export const metadata: Metadata = {
  title: "Pricing",
  description: `${siteConfig.whatsappOfferingName} Chat AI and Voice + Chat AI plans, plus quoted packages for larger teams and white-label.`,
  alternates: { canonical: "/pricing" },
};

/**
 * Plan comparison (spec 5 /pricing, 8.2–8.5). One typed plan source drives the cards and
 * the table. Monthly pricing only; no annual toggle, discounts or "Most Popular" label.
 * Amounts stay "Request current pricing" until approved (see content/plans.ts).
 */
export default function PricingPage() {
  const previewDrafts = shouldPreviewDraftPrices();

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
        eyebrow={`${siteConfig.whatsappOfferingName} plans`}
        title="Plans for WhatsApp AI chat and voice."
        actions={
          <>
            <Link href="/book-demo" className="button">
              Enquire About a Plan
            </Link>
            <a href="#compare-title" className="button button--secondary">
              Compare every plan
            </a>
          </>
        }
        aside={
          <nav className={pricing.families} aria-label="Plan types">
            <a href="#chat-plans">
              <span className={pricing.familyIcon} aria-hidden="true">
                <MessageIcon />
              </span>
              <span>
                <strong>Chat AI</strong>
                <span className={pricing.familyText}>Sized by AI-managed chats</span>
              </span>
              <ArrowRightIcon width="18" height="18" />
            </a>
            <a href="#voice-plans">
              <span className={pricing.familyIcon} aria-hidden="true">
                <PhoneIcon />
              </span>
              <span>
                <strong>Voice + Chat AI</strong>
                <span className={pricing.familyText}>Adds call minutes</span>
              </span>
              <ArrowRightIcon width="18" height="18" />
            </a>
            <p className={pricing.familiesNote}>Current prices and terms are confirmed when you enquire.</p>
          </nav>
        }
      >
        <p>
          Chat AI plans are sized by AI-managed chats. Voice + Chat AI plans add call minutes.
          Current prices and terms are confirmed when you enquire.
        </p>
      </PageHero>

      <section className="section" aria-labelledby="plans-title">
        <div className="container">
          <h2 id="plans-title" className="sr-only">
            Plans
          </h2>
          <span id="chat-plans" className={styles.anchor} aria-hidden="true" />
          <span id="voice-plans" className={styles.anchor} aria-hidden="true" />
          <PlanFamilyTabs previewDrafts={previewDrafts} />
          <div className={pricing.callout}>
            <MessageIcon width="20" height="20" />
            <p>
              WhatsApp platform charges for certain message types are separate from your plan&apos;s
              AI-managed chat allowance.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="compare-title">
        <div className="container">
          <SectionHeading id="compare-title" title="Compare every plan." />
          <PlanComparisonTable previewDrafts={previewDrafts} />
        </div>
      </section>

      <section className="section" aria-label="Quote details and larger teams">
        <div className={`container ${styles.split} ${pricing.panels}`}>
          <div className={`card ${pricing.panel}`}>
            <div className={pricing.panelHeader}>
              <span className={pricing.panelIcon} aria-hidden="true">
                <ShieldIcon />
              </span>
              <h2 id="quote-title">Confirmed in your quote</h2>
            </div>
            <p>These terms are set out in your quote before you start:</p>
            <ul className={`check-list ${pricing.termList}`} aria-labelledby="quote-title">
              {billingTermsToConfirm.map((term) => (
                <li key={term}>
                  <CheckIcon width="18" height="18" />
                  {term}
                </li>
              ))}
            </ul>
          </div>
          <div className={`card ${pricing.panel}`}>
            <div className={pricing.panelHeader}>
              <span className={pricing.panelIcon} aria-hidden="true">
                <LayersIcon />
              </span>
              <h2 id="packages-title">Larger teams and custom setups</h2>
            </div>
            <p>
              Inbound and outbound calling, call center operations, custom integrations and
              white-label are quoted for your requirements.
            </p>
            <ul className={pricing.tierRows} aria-labelledby="packages-title">
              {packageTiers.map((tier) => {
                const Icon = packageTierIcons[tier.slug];
                return (
                  <li key={tier.slug}>
                    {Icon && (
                      <span className={pricing.tierIcon} aria-hidden="true">
                        <Icon />
                      </span>
                    )}
                    <span>
                      <strong>{tier.name}</strong>
                      <span className={pricing.tierAudience}>{tier.audience}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="button-row">
              <Link href="/enterprise" className="button button--secondary">
                See enterprise options
              </Link>
              <Link href="/book-demo?plan=custom" className="button button--secondary">
                Request a quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="pricing-faq-title">
        <div className="container">
          <SectionHeading id="pricing-faq-title" title="Pricing questions" />
          <FaqList questions={pricingFaqs} />
        </div>
      </section>

      <CtaBand
        id="pricing-cta-title"
        title="Find the right plan for your volume."
        text="Tell us roughly how many chats, calls and numbers you expect. We’ll recommend a plan and confirm the terms with you."
        action={{ href: "/book-demo", label: "Enquire About a Plan" }}
      />
    </>
  );
}
