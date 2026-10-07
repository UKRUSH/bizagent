import Link from "next/link";
import { siteConfig } from "@/config/site";
import { getPlansByFamily, shouldPreviewDraftPrices } from "@/content/plans";
import { PlanCard, TrialBanner } from "@/components/pricing/PlanCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowRightIcon } from "@/components/ui/icons";
import styles from "./home.module.css";

/**
 * Pricing preview (spec 6.10): Chat plans first, with a link to Voice plans. Amounts follow
 * getPriceDisplay — "Request current pricing" until approved. No "Most Popular" label.
 */
export function PricingPreview() {
  const previewDrafts = shouldPreviewDraftPrices();
  const chatPlans = getPlansByFamily("chat");
  const trial = chatPlans.find((plan) => plan.isTrial);
  const paid = chatPlans.filter((plan) => !plan.isTrial);

  return (
    <section className="section" aria-labelledby="pricing-title">
      <div className="container">
        <SectionHeading
          id="pricing-title"
          eyebrow={`${siteConfig.whatsappOfferingName} plans`}
          title="Start with WhatsApp chat. Add voice when you need it."
        >
          <p>Monthly Chat AI plans are sized by AI-managed chats. Voice + Chat AI plans add call minutes.</p>
        </SectionHeading>
        {trial && <TrialBanner plan={trial} previewDrafts={previewDrafts} />}
        <div className="pricing-grid">
          {paid.map((plan) => (
            <PlanCard key={plan.slug} plan={plan} previewDrafts={previewDrafts} />
          ))}
        </div>
        <p className={styles.note}>
          WhatsApp platform charges are separate from your plan&apos;s AI-managed chat allowance.
          How chats are counted, taxes and other terms are confirmed in your quote.
        </p>
        <div className="button-row">
          <Link href="/pricing#voice-plans" className="button button--secondary">
            Compare Voice + Chat AI plans
            <ArrowRightIcon width="18" height="18" />
          </Link>
          <Link href="/enterprise" className={styles.cardLink}>
            Need a custom or enterprise setup?
          </Link>
        </div>
      </div>
    </section>
  );
}
