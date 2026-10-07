# BizMaster AI Agent Website — Analysis and 10-Part Build Plan

Source: [`docs/specification.md`](./specification.md) (BizMaster AI Agent Next.js Website Specification, prepared 7 October 2026).
Project: Next.js 16.4 App Router, React 19.3, TypeScript, `cacheComponents: true`, custom CSS (no Tailwind).

---

## 1. What the specification asks for

The specification turns a product/business document (`BIZ AI call Agent(1).docx`, v2.0) into a **public marketing website** for **BizMaster AI Agent**, owned by **BizMaster Solutions — Tech Hub Division**.

| Area | Summary |
| --- | --- |
| Product | One AI agent for calls, WhatsApp chat, WhatsApp voice, follow-ups, reminders and campaigns |
| Three roles | Call Center Agent, Sales Agent, Personal Call Assistant |
| 13 modules | Inbound, outbound, WhatsApp messaging, WhatsApp voice, follow-ups, reminders, call filtering, segmentation, recording, campaigns, sales agent, call center, personal assistant |
| WhatsApp offer | **Agent BIZ MASTER** — Chat plans (Trial, Basic, Plus, Pro) and Voice plans (Basic, Plus, Pro Voice) in LKR |
| Buyers | 17 industry segments, SMEs through BPOs and enterprise |
| Conversions | Primary **Book a Demo**; secondary **Explore Plans**; WhatsApp enquiry; **Talk to Sales** |
| Out of scope (later phase) | Authenticated dashboard, real telephony, WhatsApp calling, campaigns, provider auth |

### 1.1 Brand rules (verified)

- Primary purple `#5D0E8B`, deep purple `#4A0B70`, greys `#F8F9FA / #F5F5F5 / #666666 / #E5E5E5`, dark `#1A1A1A / #333333`, light purple `#F3E8FF`, WhatsApp `#25D366 / #075E54`.
- Design extensions (not brand): `#E6C6FF` (links on dark), `#B67BE0` (focus on dark).
- Logo: original white PNG from `bizmastersolutions.lk/nw_logo.png`, cropped only of transparent padding to 1596×552. Always on purple/dark. Never redrawn, tinted or turned into a favicon.

### 1.2 Design system

Purple sticky header (76 px) → dark gradient hero with a CSS conversation preview labelled **Illustrative demo** → light reading sections → purple CTA band → deep-purple footer. Inter font, 1200 px container, 18–24 px card radius, 44 px minimum targets, subtle motion only, WCAG 2.2 AA target.

### 1.3 Publication guardrails (the most important part of the spec)

The source document contains many claims the website **must not publish as fact** until confirmed. Every part of the build must respect these:

| Do not publish as verified | Treatment |
| --- | --- |
| "Sri Lanka's first", 60 % after-hours, "replace 2–10 receptionists" | Omit; position AI as support for staff |
| 100 % answer rate, zero wait, 100+ concurrent, 1,000+ calls/day | Targets only, never facts |
| Sub-200 ms latency, <5 s / <10 s reply | Internal targets with defined measurement |
| Meta Tech Provider / partner badge | Only with approved attribution |
| AWS/KMS/Bedrock/MFA/no-training security assurances | Only controls actually deployed |
| "No hidden charges", "live in 5 minutes", "no card" | Only with confirmed trial terms |
| Rs. 8,000–70,000 range | Discard; use the explicit plan table (Pro Voice = LKR 100,000) |
| Prices | Draft until approved; `publicationStatus` controls display |
| Clients, testimonials, case studies, ratings, contact details | Never invent |

All illustrative conversations are fictional, identify the AI as an AI, and trigger no real calls/messages.

### 1.4 Open confirmations needed from the business

These block *publication*, not *building*. The code keeps them as flags.

1. Product naming and Agent Dilu / Dilexus attribution wording.
2. Commercial approval of all plan prices and the definition of an "AI-managed chat".
3. Trial terms (duration, card, provisioning), setup fees, Meta pass-through wording, taxes, cancellation.
4. Contact details — WhatsApp `+94 77 796 0231` is a *candidate* only; email, phone, address unknown.
5. Which modules/integrations are actually **available** vs planned.
6. Supported languages in the tested product configuration.
7. Approved privacy, terms and cookie text.
8. Production domain (`SITE_URL`) and hosting.
9. Lead storage/notification provider for demo requests.
10. An approved favicon/icon asset.

---

## 2. Project structure decision

The spec suggests a `src/` directory. This project was scaffolded with `app/` at the root and the alias `@/* → ./*`, so the same structure is kept at the root:

```text
app/                    routes (root layout, (marketing) group, api/)
components/             layout/, ui/, home/, features/, pricing/, forms/ ...
config/site.ts          contact details, URLs, feature flags
content/                typed data: modules, roles, industries, plans, integrations, faqs
lib/                    validation/, server/
public/brand/           logo original + cropped derivative
docs/                   specification + this plan
```

Global tokens/reset/utilities live in `app/globals.css` (spec §15). Component-specific styles go in CSS Modules.

---

## 3. The 10 parts

Each part ends with `npm run lint` and `npm run build` passing.

### Part 1 — Foundation, brand and site shell ✅ (this part)
Spec: §3, §4.1, §4.3, §5.2, §12.3, §14, §15.
- Copy the specification into `docs/`; write this plan.
- Remove create-next-app boilerplate and Tailwind; install the §15 CSS foundation as `app/globals.css`.
- Download the original logo and create the transparent-margin crop in `public/brand/`.
- Root layout: Inter via `next/font`, flash-free theme initializer, skip link, global metadata and viewport.
- `config/site.ts` (single source for contact details; missing values hide controls).
- `content/types.ts` (content contracts from §14.3).
- `content/navigation.ts` + `(marketing)` layout with `BrandLogo`, `Header` (desktop dropdowns), `MobileNavigation`, `Footer`.
- Root `not-found.tsx` and `error.tsx`; a temporary homepage placeholder.

### Part 2 — Typed content data layer
Spec: §7, §8.2–8.5, §9, §10, §11.1, §6.11, Appendix A.
- `content/modules.ts`: all 13 modules with full feature groups, use cases, human controls, integrations, availability.
- `content/roles.ts`, `content/industries.ts` (17 segments), `content/plans.ts` (7 plans + 5 broader tiers, publication status), `content/integrations.ts` (14 categories, "Needs assessment"), `content/faqs.ts`, `content/deployment.ts`, `content/handoff.ts`.
- Helper selectors (by slug, by category) and allowlists reused by forms.

### Part 3 — Homepage
Spec: §6.1–6.12, §4.2.
- Hero + `ConversationPreview` (dark, labelled, four-stage timeline).
- Problem cards, three roles, `ModuleExplorer` (list/detail, `?module=` deep link, mobile select), WhatsApp spotlight (Chat/Voice tabs), workflow steps, six industry cards, human handoff panel, integrations groups, pricing preview (respects `pricingPublished`), security summary + 8-question FAQ accordion, final CTA band.

### Part 4 — Platform, feature catalogue and 13 module pages
Spec: §5 routes `/platform`, `/features`, `/features/[slug]`, §7.1, §7.2.
- `/platform` with the shared architecture diagram (accessible HTML/SVG version of the Mermaid flow).
- `/features` with category filter.
- `/features/[slug]` with `generateStaticParams`, the standard module template, unknown slugs → `notFound()`.

### Part 5 — Solutions roles and Enterprise
Spec: §5, §6.3, §8.5, §10 deployment cards, §11.
- `/solutions/call-center`, `/solutions/sales-agent`, `/solutions/personal-assistant`.
- `/enterprise`: deployment options, white-label, controls, SLA discussion, **Talk to Sales**.

### Part 6 — Agent BIZ MASTER (WhatsApp AI) and Pricing
Spec: §8, §6.5, §6.10.
- `/whatsapp-ai`: capabilities, voice notes vs live calls, business tools, PBX workflows, onboarding stages, compliance notes.
- `/pricing`: Chat AI / Voice + Chat AI tabs, trial banner, plan cards, comparison table in a scroll region, broader packages, billing notes, draft labels.

### Part 7 — Industries and Integrations
Spec: §9, §10, §6.7, §6.9.
- `/industries` searchable directory; `/industries/[slug]` with problem, fictional scenario, modules, boundaries, CTA.
- `/integrations` searchable directory with availability statuses.

### Part 8 — Trust and company pages
Spec: §11, §5, §12.3, §16, §21.
- `/security` (human control, confirmed controls, proof-pack request), `/about`, `/contact`.
- `/privacy`, `/terms`, `/cookies` gated by approval flags (kept out of nav/sitemap until approved text exists).

### Part 9 — Demo request journey
Spec: §12.1–12.2, §21.
- `DemoRequestForm` with all §12.1 fields, query-string preselection checked against allowlists, separate marketing consent.
- Shared validation (client + server), `POST /api/demo-requests` Route Handler, durable lead store interface, notification outbox, rate limit, honeypot, origin check, body limit.
- Honest failure when storage is not configured; `/thank-you` only after durable acceptance.

### Part 10 — Interactive demo, theme, SEO and launch QA
Spec: §13, §4.3, §16–19, §23.
- `/demo` deterministic fictional preview (industry/role/channel, play/stop/reset, visible disclosure).
- Light/Dark/System theme selector.
- `sitemap.ts`, `robots.ts`, per-page metadata, Open Graph image, accurate structured data.
- Cookie preferences only if optional scripts exist; privacy-safe analytics events.
- Accessibility, responsive (320–1440 px), performance and acceptance-checklist pass.

---

## 4. Progress log

| Part | Status | Notes |
| --- | --- | --- |
| 1 | Done | Foundation, brand assets, shell. Lint + build pass; all routes static. Nav links to pages from later parts return the real 404 until those parts land. |
| 2 | Done | Typed content layer + 60 automated checks (`npm test`). Typecheck, lint and build pass. |
| 3 | Done | Homepage, all 12 sections. 64 tests, typecheck, lint and build pass; page is fully static. Reviewed in screenshots at 1440 px and a true 390 px viewport. |
| 4 | Done | `/platform`, `/features`, 13 `/features/[slug]` pages. 65 tests, typecheck, lint, build and 18/18 route smoke checks pass. |
| 5 | Done | `/solutions/[slug]` (3 roles) and `/enterprise`. 68 tests, typecheck, lint, build and 23/23 smoke checks pass. |
| 6–10 | Not started | |

### Part 5 implementation notes

- Role pages share one template: hero with a static labelled conversation (`RoleConversation`, reusing `content/previews.ts`), "what the assistant handles / what stays with your team", 5-step workflow, the role's modules with highlights and availability, 3 use cases, related industries, FAQs, CTA. The CTA links to `/book-demo?role=<formRole>` so Part 9 can preselect the role.
- `content/roles.ts` gained headline, workflow, use cases, FAQs, related industries and `formRole`; `roleSlugs` is exported from `content/types.ts` and registered in `proxy.ts` (unknown `/solutions/*` → 404).
- Enterprise page (`content/enterprise.ts`): five quoted packages (no prices; CTA `/book-demo?plan=<tier>`), white-label points, deployment options with status, requirements assessed case by case (VPC, private links, own cloud and on-prem are only named as requirements to assess, per spec 10), website/app embedding, approval controls, interim security statement, contract-based service levels (no SLA figures), 5-step engagement process.
- **Bug fixed across parts:** global classes inside CSS Modules (e.g. `.tierGrid .card`) are hashed and never match. All such selectors now use `:global(.card)`; this also fixed card padding on the Platform and module pages from Part 4.

### Part 4 implementation notes

- Module page (`app/(marketing)/features/[slug]/page.tsx`) follows the spec 7.1 template: intro, labelled illustration (`content/module-illustrations.ts`), every feature group, workflow, three use cases, benefits, human controls, integrations + dependencies, FAQ, related modules, demo CTA preselecting the module.
- **404 for unknown slugs:** Cache Components removes `dynamicParams`, and the shell for an unknown param starts streaming before `notFound()` runs, which fixed the status at 200. `proxy.ts` now checks `/features/:slug` against the slug list and rewrites unknown ones to an unmatched path, giving a real 404 (the approach the Next docs recommend). **Part 7 must add industry slugs to `proxy.ts`.**
- Platform page: channels, the spec 7.2 architecture as responsive HTML with a written description, shared layer, three interfaces, handoff triggers/types/context, deployment options with status badges.
- `/features` catalogue: category filter (`aria-pressed` buttons, status announcement); all cards are in the server HTML. Featured Agent BIZ MASTER card.
- Shared components added: `PageHero`, `Breadcrumbs`, `CtaBand`, `StatusBadge`.
- Module pages link to `/integrations#<category-id>` — Part 7 must give each integration category that element id.
- New scripts: `npm run smoke` (HTTP route checks against a running server; `BASE_URL` to override). `npm run typecheck` now runs `next typegen` first so `PageProps<"/features/[slug]">` resolves.

### Part 3 implementation notes

- Sections (spec 6.1–6.12) live in `components/home/`; the page is `app/(marketing)/page.tsx`.
- Shared components for later parts: `ui/Tabs` (full ARIA tab keyboard pattern), `ui/FaqList` (native `<details>`), `ui/SectionHeading`, `pricing/PlanCard` + `TrialBanner`, `features/ModuleExplorer`.
- Hero preview (`ConversationPreview`, data in `content/previews.ts`): three fictional role scenarios, four-stage timeline, action + handoff cards, permanent "Illustrative demo" label. The whole transcript is visible on first paint; the reveal animation runs only after a role switch, so content never depends on an animation finishing.
- Module explorer: buttons with `aria-pressed`, `<select>` under 768 px, selection mirrored to `?module=` with `history.replaceState`. Verified that `/?module=sales-agent` selects Sales Agent after hydration. The static shell renders the default module inside `Suspense`.
- Pricing preview shows "Request current pricing" (all plans are draft). No "Most Popular" label.
- Integrations show the default "Needs assessment" status in words, not colour.
- Not stated publicly: Meta/official-platform attribution, response times, security controls. The language chip ("Sinhala, Tamil and English workflows") is the spec's copy but still depends on open confirmation 6.
- Headless Chrome can't render narrower than ~500 px, so mobile checks use a 390 px iframe.

### Part 2 implementation notes

- Files in `content/`: `types.ts`, `modules.ts` (13), `roles.ts` (3), `industries.ts` (17), `plans.ts` (7 plans + 5 packages), `integrations.ts` (14 categories), `faqs.ts` (8), `handoff.ts`, `security.ts`, `deployment.ts`, `whatsapp.ts`, `form-options.ts`.
- Every source feature item is preserved; wording is softened where the source states an unverified claim (e.g. "100+ concurrent calls" → "sized to your provider capacity and plan", "AES-256" → "encrypted storage and transmission, confirmed per deployment", "human-like tone" → "identifies itself as an AI assistant").
- Status defaults: modules `needs-assessment` (shown as "Availability confirmed in your demo"), integrations `needs-assessment` (custom systems `custom`), plans `draft`, security controls `under-review`.
- Prices: `getPriceDisplay()` shows "Request current pricing" unless `pricingPublished` is on and the plan is approved. `SHOW_DRAFT_PRICES=true` shows draft amounts with a "Draft price — awaiting approval" label for internal previews.
- Internal-only exports (not for rendering): `internalPersonalAssistantPriceIdeas`, `internalWhatsappTargets`, and the `securityControls` source-requirement column.
- `tests/content.test.ts` checks exact plan values, all 13 modules against the page template (80–140-word intros, 3 use cases), 17 industries, 6 homepage cards, valid cross-references, allowlist parsing, and scans public content for the banned claims in spec 1.2.
- Added `tsx` (dev) and `npm test` / `npm run typecheck` scripts.

### Part 1 implementation notes

- Logo: visible bounding box measured as (45, 575, 1601, 1087), matching the spec. Cropped with `sharp` (bundled with Next) because Pillow is not installed.
- Tailwind removed (`tailwindcss`, `@tailwindcss/turbopack`, turbopack CSS rule) — the spec calls for custom CSS.
- `next/image` uses `preload` (Next 16 deprecated `priority`).
- `cacheComponents` rejects `new Date()` during prerender, so the footer year is a `"use cache"` component with `cacheLife("days")`.
- Navigation components read `usePathname` inside `Suspense` with a pathname-less fallback, so routes with request-time params still prerender.
- Theme: inline `<head>` script reads `localStorage["bizmaster-theme"]` (`light`/`dark`/`system`). Needs a CSP nonce/hash when a CSP is added. Selector UI is Part 10.
- Indexing is off unless `SITE_INDEXING=true`; `SITE_URL` sets `metadataBase`.
- The WhatsApp number is stored as an unverified candidate in `config/site.ts` and is not rendered.
- `app/icon.svg` is a temporary neutral purple square pending an approved icon.
- §15.1 CSS in `docs/specification.md` now points to `app/globals.css`, which holds the stylesheet verbatim plus a marked "Part 1 additions" block.
