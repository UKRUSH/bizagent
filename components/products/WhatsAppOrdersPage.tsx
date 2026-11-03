import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { moduleAvailabilityLabels } from "@/content/modules";
import type { Product, ProductIcon } from "@/content/types";
import {
  alwaysOn,
  audienceLine,
  closingStatement,
  customAgent,
  extraConnections,
  finalCta,
  heroHeadline,
  heroPoints,
  integrationScope,
  manualVersusAgent,
  notAnIvr,
  orderIndustries,
  orderIntegrations,
  orderNetwork,
  teamControlNote,
} from "@/content/whatsappOrders";
import { AgentNetwork } from "@/components/agentic/AgentNetwork";
import agenticStyles from "@/components/agentic/agentic.module.css";
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
  ClockIcon,
  CloseIcon,
  GlobeIcon,
  MegaphoneIcon,
  MessageIcon,
  PhoneIcon,
  PhoneOutgoingIcon,
  PlugIcon,
  RefreshIcon,
  SearchIcon,
  ShieldIcon,
  ShoppingBagIcon,
  SlidersIcon,
  SparkIcon,
  TrendingUpIcon,
  UsersIcon,
  WorkflowIcon,
} from "@/components/ui/icons";
import roleStyles from "@/components/solutions/solutions.module.css";
import { OrderChatDemo } from "./OrderChatDemo";
import productStyles from "./products.module.css";
import styles from "./orders.module.css";

type Icon = ComponentType<SVGProps<SVGSVGElement>>;

const icons: Record<ProductIcon, Icon> = {
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
  phone: PhoneIcon,
  outgoing: PhoneOutgoingIcon,
  megaphone: MegaphoneIcon,
  clock: ClockIcon,
};

const notAnIvrIcons: Icon[] = [ClockIcon, UsersIcon, PhoneIcon, PhoneOutgoingIcon];

/**
 * /whatsapp-orders. Orders by WhatsApp and phone call (content/whatsappOrders.ts). The hero
 * shares the Agentic Solutions layout and agent-network visual. Claims follow spec 1.2.
 */
export function WhatsAppOrdersPage({ product }: { product: Product }) {
  const demoHref = `/book-demo?role=${product.formRole}`;

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: product.navLabel }]}
        eyebrow={product.navLabel}
        title={heroHeadline}
        actions={
          <>
            <Link href={demoHref} className="button">
              Start an AI Order Agent
              <ArrowRightIcon width="18" height="18" />
            </Link>
            <a href="#features" className="button button--secondary">
              View Services
            </a>
          </>
        }
        aside={
          <AgentNetwork
            id="order-network"
            hub={{ ...orderNetwork.hub, icon: icons[orderNetwork.hub.icon] }}
            agents={orderNetwork.agents.map((agent) => ({ ...agent, icon: icons[agent.icon] }))}
            feed={orderNetwork.feed}
            caption="Orders and details are fictional."
          />
        }
      >
        <p className={styles.heroLead}>{product.headline}</p>
        <p>{product.description}</p>
        <ul className={agenticStyles.heroPoints}>
          {heroPoints.map((point) => (
            <li key={point}>
              <CheckIcon width="16" height="16" />
              {point}
            </li>
          ))}
        </ul>
      </PageHero>

      <section className={`section ${styles.alwaysOn}`} aria-labelledby="always-on-title">
        <div className="container">
          <span className="eyebrow section-eyebrow">{alwaysOn.kicker}</span>
          <h2 id="always-on-title">{alwaysOn.title}</h2>
          <p>{alwaysOn.text}</p>
          <p className={styles.highlight}>
            <ClockIcon width="20" height="20" aria-hidden="true" />
            {alwaysOn.highlight}
          </p>
          <ul className={styles.tagRow} aria-label="Order channels and tasks">
            {alwaysOn.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          <p className={styles.audience}>
            <span>Built for</span> {audienceLine.join(" • ")}
          </p>
        </div>
      </section>

      <section id="features" className="section" aria-labelledby="capabilities-title">
        <div className="container">
          <SectionHeading id="capabilities-title" eyebrow="02 · Services" title="Everything your AI order agent handles.">
            <p>From the first call or message to payment, delivery and the next reorder.</p>
          </SectionHeading>
          <div className={productStyles.fourGrid}>
            {product.capabilities.map((capability) => {
              const CapabilityIcon = icons[capability.icon];
              return (
                <article key={capability.title} className={`card ${styles.featureCard}`} aria-label={capability.title}>
                  <div className="card-icon" aria-hidden="true">
                    <CapabilityIcon />
                  </div>
                  <span className={styles.powered}>BIZny AI powered</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section section--muted" aria-labelledby="workflow-title">
        <div className={`container ${styles.liveSplit}`}>
          <div>
            <SectionHeading id="workflow-title" eyebrow="03 · How it works" title="One order, start to finish." />
            <ol className={styles.timeline}>
              {product.workflow.map((step, index) => (
                <li key={step.title}>
                  <span className={styles.stepLabel}>Step {String(index + 1).padStart(2, "0")}</span>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className={styles.demoHeading}>WhatsApp order demo</h3>
            <OrderChatDemo preview={product.preview} title="Home Bakery – Chocolate Cake Order" />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="custom-title">
        <div className={`container ${styles.customPanel}`}>
          <div>
            <span className="eyebrow section-eyebrow">04 · Custom order agent</span>
            <h2 id="custom-title">{customAgent.title}</h2>
            <p>{customAgent.text}</p>
            <Link href={customAgent.cta.href} className="button button--white">
              {customAgent.cta.label}
              <ArrowRightIcon width="18" height="18" />
            </Link>
          </div>
          <ul className="check-list">
            {customAgent.points.map((point) => (
              <li key={point}>
                <CheckIcon width="18" height="18" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="not-ivr-title">
        <div className="container">
          <SectionHeading id="not-ivr-title" eyebrow="05 · BIZny AI order agent" title={notAnIvr.title}>
            <p>{notAnIvr.text}</p>
          </SectionHeading>
          <div className={productStyles.fourGrid}>
            {notAnIvr.points.map((item, index) => {
              const PointIcon = notAnIvrIcons[index] ?? SparkIcon;
              return (
                <article key={item.title} className={`card ${styles.notBotCard}`} aria-label={item.title}>
                  <span className={styles.discIcon} aria-hidden="true">
                    <PointIcon width="22" height="22" />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="industries-title">
        <div className="container">
          <SectionHeading id="industries-title" eyebrow="06 · Use cases" title="An order assistant for every kind of business." />
          <div className={styles.industryGrid}>
            {orderIndustries.map((industry, index) => (
              <article key={industry.title} className={`card ${styles.industryCard}`} aria-labelledby={`industry-${index}`}>
                <span className={styles.assistant}>{industry.assistant}</span>
                <h3 id={`industry-${index}`}>{industry.title}</h3>
                <ul className="feature-list">
                  {industry.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
                {industry.note && (
                  <p className={styles.industryNote}>
                    <ShieldIcon width="16" height="16" aria-hidden="true" />
                    {industry.note}
                  </p>
                )}
                <p className={styles.benefit}>
                  <strong>BIZny benefit:</strong> {industry.benefit}
                </p>
                {industry.slug && (
                  <Link href={`/industries/${industry.slug}`} className={styles.industryLink}>
                    See the industry<span className="sr-only">: {industry.title}</span>
                    <ArrowRightIcon width="16" height="16" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="compare-title">
        <div className="container">
          <SectionHeading id="compare-title" eyebrow="07 · People + AI" title="Routine orders go to AI. Your team keeps the rest.">
            <p>{manualVersusAgent.intro}</p>
          </SectionHeading>
          <div className={styles.compare}>
            <article className={`card ${styles.manual}`} aria-labelledby="manual-title">
              <h3 id="manual-title">{manualVersusAgent.manualTitle}</h3>
              <ul>
                {manualVersusAgent.manual.map((item) => (
                  <li key={item}>
                    <CloseIcon width="18" height="18" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className={`card ${styles.agent}`} aria-labelledby="agent-title">
              <h3 id="agent-title">{manualVersusAgent.agentTitle}</h3>
              <ul>
                {manualVersusAgent.agent.map((item) => (
                  <li key={item}>
                    <CheckIcon width="18" height="18" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className={`section ${styles.closing}`} aria-labelledby="closing-title">
        <div className="container">
          <h2 id="closing-title">{closingStatement.title}</h2>
          <p>{closingStatement.text}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="integrations-title">
        <div className="container">
          <SectionHeading id="integrations-title" eyebrow="08 · Integrations" title="Connect BIZny with the tools you already use.">
            <p>Each connection is assessed for your setup before it goes live.</p>
          </SectionHeading>
          <div className={styles.integrationGrid}>
            {orderIntegrations.map((integration) => (
              <article key={integration.title} className={`card ${styles.integration}`} aria-label={integration.title}>
                <span className={styles.integrationIcon} aria-hidden="true">
                  <PlugIcon width="20" height="20" />
                </span>
                <div>
                  <h3>{integration.title}</h3>
                  <p>{integration.description}</p>
                </div>
              </article>
            ))}
          </div>
          <ul className={styles.tagRow} aria-label="Other connection options">
            {extraConnections.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={styles.scopeNote}>{integrationScope}</p>
        </div>
      </section>

      <section className="section section--muted" aria-label="Team control and availability">
        <div className={`container ${productStyles.controlSplit}`}>
          <article className={`card ${roleStyles.teamCard}`} aria-labelledby="team-title">
            <h2 id="team-title">What stays with your team</h2>
            <p>{teamControlNote}</p>
            <ul className="check-list">
              {product.humanControls.map((item) => (
                <li key={item}>
                  <CheckIcon width="18" height="18" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
          <article className={`card ${productStyles.statusCard}`} aria-labelledby="status-title">
            <h2 id="status-title">Availability</h2>
            <StatusBadge label={moduleAvailabilityLabels[product.availability]} />
            <p>{integrationScope}</p>
            <Link href={finalCta.contact.href} className="button button--secondary">
              {finalCta.contact.label}
            </Link>
          </article>
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="container">
          <SectionHeading id="faq-title" title={`Questions about ${product.navLabel}`} />
          <FaqList questions={product.faqs} />
        </div>
      </section>

      <CtaBand
        id="product-cta-title"
        title={finalCta.title}
        text={finalCta.text}
        action={{ href: demoHref, label: finalCta.start }}
        secondaryAction={finalCta.contact}
        showWhatsApp
      />
    </>
  );
}
