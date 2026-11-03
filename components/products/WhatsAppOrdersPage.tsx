import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import { moduleAvailabilityLabels } from "@/content/modules";
import { previewDisclosure } from "@/content/previews";
import type { Product, ProductIcon } from "@/content/types";
import {
  alwaysOnTags,
  audienceLine,
  customAgentPoints,
  extraConnections,
  heroAgents,
  heroBoardTags,
  heroStats,
  manualVersusAgent,
  notAMenuBot,
  orderIndustries,
  orderIntegrations,
} from "@/content/whatsappOrders";
import { ProviderBadge } from "@/components/solutions/ProviderBadge";
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
import whatsappStyles from "@/components/whatsapp/whatsapp.module.css";
import productStyles from "./products.module.css";
import styles from "./orders.module.css";

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

const notBotIcons = [MessageIcon, ClockIcon, CheckIcon, UserCheckIcon];

/** Hero mockup: fictional agents at work and a live order board (spec 4.2: labelled demo). */
function AgentBoard() {
  return (
    <figure className={styles.board} aria-labelledby="agent-board-caption">
      <div className={styles.boardHeader}>
        <span className={styles.online}>
          <span className={styles.pulse} aria-hidden="true" />
          AI agents online
        </span>
        <span className={styles.demoBadge}>Illustrative demo</span>
      </div>
      <ul className={styles.agents}>
        {heroAgents.map((agent) => (
          <li key={agent.label}>
            <span className={styles.agentIcon} aria-hidden="true">
              <MessageIcon width="18" height="18" />
            </span>
            <span>
              <span className={styles.agentLabel}>{agent.label}</span>
              <strong>{agent.status}</strong>
              <span className={styles.agentDetail}>{agent.detail}</span>
            </span>
          </li>
        ))}
      </ul>
      <ul className={styles.boardTags} aria-label="Order board">
        {heroBoardTags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <figcaption id="agent-board-caption" className={styles.boardCaption}>
        {previewDisclosure}. Orders and details are fictional.
      </figcaption>
    </figure>
  );
}

/** The product's fictional order chat, in the shared WhatsApp phone frame. */
function OrderChat({ preview }: { preview: Product["preview"] }) {
  return (
    <div className={whatsappStyles.preview}>
      <figure className={whatsappStyles.screen} aria-labelledby="order-chat-caption">
        <div className={whatsappStyles.header}>
          <span className={whatsappStyles.channel}>
            <span className={whatsappStyles.avatar} aria-hidden="true">
              <MessageIcon />
              <span className={whatsappStyles.dot} />
            </span>
            {preview.context}
          </span>
          <span className={whatsappStyles.demoBadge}>Illustrative demo</span>
        </div>
        <ol className={whatsappStyles.chat} aria-label="Fictional WhatsApp order">
          {preview.messages.map((message, index) => (
            <li key={index} className={message.side === "right" ? whatsappStyles.assistant : whatsappStyles.customer}>
              <span className={whatsappStyles.sender}>{preview.speakers[message.side]}</span>
              <span>{message.text}</span>
            </li>
          ))}
        </ol>
        <div className={`${whatsappStyles.outcome} ${roleStyles.channelHandoff}`}>
          <BoxIcon width="18" height="18" />
          <span>
            {preview.outcome.title}
            <small>{preview.outcome.details}</small>
          </span>
        </div>
        <figcaption id="order-chat-caption" className={whatsappStyles.caption}>
          {previewDisclosure}. Names and details are fictional.
        </figcaption>
      </figure>
    </div>
  );
}

/**
 * /whatsapp-orders. Layout modelled on an agent-platform landing page (live agents, an
 * "always on" band, industry cards, manual vs AI, integrations). Claims follow spec 1.2.
 */
export function WhatsAppOrdersPage({ product }: { product: Product }) {
  const demoHref = `/book-demo?role=${product.formRole}`;

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Home", href: "/" }, { label: product.navLabel }]}
        eyebrow={product.title}
        title={product.headline}
        actions={
          <>
            <Link href={demoHref} className="button">
              Start an Order Agent
            </Link>
            <a href="#features" className="button button--secondary">
              View features
            </a>
          </>
        }
        aside={<AgentBoard />}
      >
        <p>{product.description}</p>
        <dl className={styles.stats}>
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.audience}>
          <span>Built for</span> {audienceLine.join(" • ")}
        </p>
        <ProviderBadge />
      </PageHero>

      <section className={`section ${styles.alwaysOn}`} aria-labelledby="always-on-title">
        <div className="container">
          <span className="eyebrow section-eyebrow">01 · Always on</span>
          <h2 id="always-on-title">Your customers order on WhatsApp. Your agent is awake 24 hours.</h2>
          <p>
            Take orders, answer product questions, send payment links and keep customers updated
            from one platform, while your team focuses on packing, cooking and delivering.
          </p>
          <ul className={styles.tagRow}>
            {alwaysOnTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </section>

      <section id="features" className="section" aria-labelledby="capabilities-title">
        <div className="container">
          <SectionHeading id="capabilities-title" eyebrow="02 · Features" title="Everything an order needs, in one chat." />
          <div className={productStyles.fourGrid}>
            {product.capabilities.map((capability) => {
              const Icon = icons[capability.icon];
              return (
                <article key={capability.title} className={`card ${styles.featureCard}`} aria-label={capability.title}>
                  <div className="card-icon" aria-hidden="true">
                    <Icon />
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
              {product.workflow.map((step) => (
                <li key={step.title}>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
          <OrderChat preview={product.preview} />
        </div>
      </section>

      <section className="section" aria-labelledby="custom-title">
        <div className={`container ${styles.customPanel}`}>
          <div>
            <span className="eyebrow section-eyebrow">04 · Custom order agent</span>
            <h2 id="custom-title">An order agent shaped around your business.</h2>
            <p>Tell us how you take orders today. We configure the agent to your products, prices and rules.</p>
            <Link href={demoHref} className="button button--white">
              Discuss your order flow
            </Link>
          </div>
          <ul className="check-list">
            {customAgentPoints.map((point) => (
              <li key={point}>
                <CheckIcon width="18" height="18" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--muted" aria-labelledby="not-bot-title">
        <div className="container">
          <SectionHeading id="not-bot-title" eyebrow="05 · Conversational AI" title="Not a menu bot. A real order agent.">
            <p>Customers chat naturally. The agent understands, confirms and records the order for you.</p>
          </SectionHeading>
          <div className={productStyles.fourGrid}>
            {notAMenuBot.map((item, index) => {
              const Icon = notBotIcons[index] ?? SparkIcon;
              return (
                <article key={item.title} className={`card ${styles.notBotCard}`} aria-label={item.title}>
                  <span className={styles.discIcon} aria-hidden="true">
                    <Icon width="22" height="22" />
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
          <SectionHeading id="industries-title" eyebrow="06 · Use cases" title="Built for every business that sells on WhatsApp." />
          <div className={styles.industryGrid}>
            {orderIndustries.map((industry, index) => (
              <article key={industry.title} className={`card ${styles.industryCard}`} aria-labelledby={`industry-${index}`}>
                <h3 id={`industry-${index}`}>{industry.title}</h3>
                <ul className="feature-list">
                  {industry.tasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
                <p className={styles.benefit}>
                  <strong>Benefit:</strong> {industry.benefit}
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
            <p>The agent takes the repetitive work, so your staff can spend time where it matters.</p>
          </SectionHeading>
          <div className={styles.compare}>
            <article className={`card ${styles.manual}`} aria-labelledby="manual-title">
              <h3 id="manual-title">Taking orders by hand</h3>
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
              <h3 id="agent-title">With the BIZny order agent</h3>
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

      <section className="section" aria-labelledby="integrations-title">
        <div className="container">
          <SectionHeading id="integrations-title" eyebrow="08 · Integrations" title="Connect to the tools you already use.">
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
          <ul className={styles.tagRow} aria-label="Also available">
            {extraConnections.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--muted" aria-label="Team control and availability">
        <div className={`container ${productStyles.controlSplit}`}>
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
          <article className={`card ${productStyles.statusCard}`} aria-labelledby="status-title">
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

      <section className="section" aria-labelledby="faq-title">
        <div className="container">
          <SectionHeading id="faq-title" title={`Questions about ${product.navLabel}`} />
          <FaqList questions={product.faqs} />
        </div>
      </section>

      <CtaBand
        id="product-cta-title"
        title="More time for your team. Faster orders for your customers."
        text="Tell us what you sell and how customers order today. We’ll shape the demo around your products, systems and rules."
        action={{ href: demoHref, label: "Book a Demo" }}
        showWhatsApp
      />
    </>
  );
}
