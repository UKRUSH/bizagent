import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { getIndustry } from "@/content/industries";
import { moduleAvailabilityLabels } from "@/content/modules";
import { previewDisclosure } from "@/content/previews";
import type { Product, ProductIcon } from "@/content/types";
import { CtaBand } from "@/components/ui/CtaBand";
import { FaqList } from "@/components/ui/FaqList";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  ArrowRightIcon,
  BarChartIcon,
  BoxIcon,
  CheckIcon,
  GlobeIcon,
  MessageIcon,
  PlugIcon,
  RefreshIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingBagIcon,
  SlidersIcon,
  SparkIcon,
  TrendingUpIcon,
  UserCheckIcon,
  UsersIcon,
  WorkflowIcon,
} from "@/components/ui/icons";
import roleStyles from "@/components/solutions/solutions.module.css";
import styles from "./products.module.css";

const icons: Record<ProductIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  message: MessageIcon,
  box: BoxIcon,
  bag: ShoppingBagIcon,
  trending: TrendingUpIcon,
  refresh: RefreshIcon,
  chart: BarChartIcon,
  plug: PlugIcon,
  users: UsersIcon,
  workflow: WorkflowIcon,
  shield: ShieldIcon,
  search: SearchIcon,
  sliders: SlidersIcon,
  globe: GlobeIcon,
  spark: SparkIcon,
};

/** Static, labelled fictional exchange for the product hero (spec 4.2, 13). */
function ProductConversation({ preview }: { preview: Product["preview"] }) {
  return (
    <figure className={`conversation-preview ${roleStyles.preview}`} aria-labelledby="product-preview-caption">
      <div className="preview-toolbar">
        <span className={roleStyles.context}>
          <span className={roleStyles.contextIcon} aria-hidden="true">
            <MessageIcon width="16" height="16" />
          </span>
          {preview.context}
        </span>
        <span className={roleStyles.demoBadge}>Illustrative demo</span>
      </div>
      <div className="preview-body">
        <ol className={roleStyles.transcript} aria-label="Fictional conversation">
          {preview.messages.map((message, index) => (
            <li key={index} className={`message ${message.side === "right" ? "message--ai" : ""}`}>
              <span className={styles.speaker}>{preview.speakers[message.side]}</span>
              <p>{message.text}</p>
            </li>
          ))}
        </ol>
        <div className={`handoff-summary ${styles.outcome}`}>
          <span className={roleStyles.handoffIcon} aria-hidden="true">
            <UserCheckIcon width="18" height="18" />
          </span>
          <div>
            <strong>{preview.outcome.title}</strong>
            <p className={roleStyles.handoffReason}>{preview.outcome.details}</p>
          </div>
        </div>
      </div>
      <figcaption id="product-preview-caption" className={`preview-disclosure ${roleStyles.caption}`}>
        {previewDisclosure}. Names and details are fictional.
      </figcaption>
    </figure>
  );
}

/** Shared layout for the standalone product pages (/whatsapp-orders, /ai-to-ai-hub). */
export function ProductPage({ product }: { product: Product }) {
  const demoHref = `/book-demo?role=${product.formRole}`;
  const relatedIndustries = product.relatedIndustries.flatMap((slug) => getIndustry(slug) ?? []);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: product.title }]}
        eyebrow={product.title}
        title={product.headline}
        actions={
          <>
            <Link href={demoHref} className="button">
              Book a Demo
            </Link>
            <a href="#how-it-works" className="button button--secondary">
              See how it works
            </a>
          </>
        }
        aside={<ProductConversation preview={product.preview} />}
      >
        <p>{product.description}</p>
        <ul className={styles.heroChips} aria-label="Highlights">
          {product.highlights.map((item) => (
            <li key={item}>
              <CheckIcon width="16" height="16" />
              {item}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="section" aria-labelledby="capabilities-title">
        <div className="container">
          <SectionHeading id="capabilities-title" title="What it does." />
          <div className={styles.fourGrid}>
            {product.capabilities.map((capability) => {
              const Icon = icons[capability.icon];
              return (
                <article key={capability.title} className="card" aria-label={capability.title}>
                  <div className="card-icon" aria-hidden="true">
                    <Icon />
                  </div>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section section--muted" aria-labelledby="workflow-title">
        <div className="container">
          <SectionHeading id="workflow-title" title="How it works." />
          <ol className={`${roleStyles.steps} ${roleStyles.stepsDescribed}`}>
            {product.workflow.map((step) => (
              <li key={step.title}>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-label="Team control and availability">
        <div className={`container ${styles.controlSplit}`}>
          <article className={`card ${roleStyles.teamCard}`} aria-labelledby="team-title">
            <h2 id="team-title">What stays with your team</h2>
            <ul className="check-list">
              {product.humanControls.map((item) => (
                <li key={item}>
                  <CheckIcon width="18" height="18" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className={`card ${styles.statusCard}`} aria-labelledby="status-title">
            <h2 id="status-title">Availability</h2>
            <StatusBadge label={moduleAvailabilityLabels[product.availability]} />
            <p>
              Scope, connections and timing depend on your systems and are confirmed with you before
              anything goes live.
            </p>
            <Link href={demoHref} className="button button--secondary">
              Talk to us about your setup
            </Link>
          </article>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="use-cases-title">
        <div className="container">
          <SectionHeading id="use-cases-title" title="Where it helps" />
          <div className={`grid-3 ${roleStyles.useCases}`}>
            {product.useCases.map((useCase) => (
              <article key={useCase.title} className={`card ${roleStyles.useCase}`} aria-label={useCase.title}>
                <h3>{useCase.title}</h3>
                <p>{useCase.description}</p>
              </article>
            ))}
          </div>
          {relatedIndustries.length > 0 && (
            <div className={roleStyles.related}>
              <h3 id="industries-title">Common in</h3>
              <ul className={roleStyles.industryLinks} aria-labelledby="industries-title">
                {relatedIndustries.map((industry) => (
                  <li key={industry.slug}>
                    <Link href={`/industries/${industry.slug}`}>
                      {industry.name}
                      <ArrowRightIcon width="16" height="16" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container">
          <SectionHeading id="faq-title" title={`Questions about the ${product.title}`} />
          <FaqList questions={product.faqs} />
        </div>
      </section>

      <CtaBand
        id="product-cta-title"
        title={`See the ${product.title} with your own workflow.`}
        text="Tell us how your customers and partners reach you today. We’ll shape the demo around your products, systems and rules."
        action={{ href: demoHref, label: "Book a Demo" }}
        showWhatsApp={product.slug === "whatsapp-orders"}
      />
    </>
  );
}
