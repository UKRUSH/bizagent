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
- General enquiry form on `/contact` and security-information request on `/security`, using the same pipeline (moved from Part 8).
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
| 6 | Done | `/whatsapp-ai` and `/pricing`. 71 tests, typecheck, lint, build and 26/26 smoke checks pass. |
| 7 | Done | `/industries`, 17 `/industries/[slug]` pages, `/integrations`. 75 tests, typecheck, lint, build and 46/46 smoke checks pass. |
| 8 | Done | `/security`, `/about`, `/contact`; `/privacy`, `/terms`, `/cookies` gated. 76 tests, typecheck, lint, build and 52/52 smoke checks pass. |
| 9 | Done | Demo request, contact and security-information forms on one durable pipeline. 94 tests, typecheck, lint, build, 55/55 smoke checks and 11/11 browser end-to-end checks pass. |
| 10 | Done | `/demo`, theme selector, SEO, analytics events, security headers, launch QA. 129 tests, typecheck, lint, build, 59/59 smoke and 20/20 browser checks pass. See `docs/LAUNCH_CHECKLIST.md`. |
| QA | Done | Bug-fix pass over parts 1–10 and header light/dark toggle. 129 tests, typecheck, lint, build, 59/59 smoke, 36/36 browser and 7/7 site-audit checks pass (dev and production). |

### UI polish layer

- `app/ui-polish.css` (loaded after `globals.css`) plus small edits in the home, features, pricing and forms CSS modules. Content and tested colour tokens are unchanged; new tokens (`--brand-bright`, `--gradient-brand`, shadows, `--ring`, `--dot-grid`) live in `:root`.
- Gradient primary buttons with brand shadows; nav pill hovers (current page keeps an underline, so it isn't colour-only); card hover lift and accent border; input focus rings; connected workflow steps; plan cards with an accent bar; form sections as panels; FAQ chevron chips; balanced headline wrapping.
- Decorative glows and dot grids on the home hero, interior page heroes, CTA band, featured banner and trial banner are drawn in `::before`/`::after` layers, so text keeps a solid background that the audit can measure. Dark mode sections use a darker `--surface` (#101010) so cards stand out.
- Homepage: hero eyebrow pill with a pulsing marker, gradient accent on "moving." (the smoke check matches the start of the headline because of the span), slow glow behind the preview, numbered problem cards (numbers hidden from screen readers via `content: … / ""`), whole-card links on role and industry cards, a lighter module list with a fading detail panel, and integration systems shown as chips in masonry columns.
- Hero conversation preview removed at the owner's request (`ConversationPreview.tsx` deleted). The hero is now copy on the left with the video's subject on the right; the role preview data in `content/previews.ts` is still used on `/solutions/[slug]`. The video is shown at its natural size (no zoom in or out): never enlarged past 1280 px, centred at 68% of the hero on desktop, full frame at the top on narrower screens.
- Hero background video (`components/home/HeroVideo.tsx`): web copies of `public/140521-775376205_medium.mp4` (30 s camera move around a robotic head in a lab) in `public/media/` (`hero-lab-720.mp4` 3.5 MB, `hero-lab-480.mp4` 2.0 MB below 768 px, 26 KB WebP poster; H.264 at 30 fps from the 50 fps source, audio removed, faststart). To change the footage, re-encode into `public/media/` with new file names so browsers don't serve the cached old clip. Muted, `aria-hidden`, autoplayed from script only without reduced motion, a visible pause/play button (WCAG 2.2.2), paused while off-screen and while the page is hidden by Activity. A left-to-right overlay keeps hero text above 4.5:1 against the brightest footage; the conversation preview is frosted glass over it. Covered by five e2e checks. The original clips in `public/` (four files, 3.5–11 MB each) are unused and still get deployed; delete them if they aren't needed.
- Platform page (`components/platform/`): hero hub diagram (`PlatformHub`, the assistant at the centre with channels, systems and the team on a ring; decorative with a screen-reader caption, hidden below 768 px); icons on the channel, shared-layer, interface and deployment cards (keyed by content title in the page, so a renamed title just drops its icon); arrowheads on the architecture diagram connectors; handoff triggers and "what your team receives" chips in one panel beside numbered handover tiles; deployment cards with a "Best for" box and badges aligned at the bottom.
- WhatsApp AI page (`components/whatsapp/`): the fictional chat is now a phone mockup (notch, avatar with the green channel dot, dotted wallpaper behind solid bubbles); hero chips restating the intro; icons on capability, business-tool and PBX cards (keyed by content title); voice notes vs live calls as two cards with a "vs" marker; business tools as compact two-column tiles; onboarding as numbered circles joined by a line; the password note as a shield callout; rules and "who it's for" as panels. `whatsapp.module.css` is shared with `/pricing` (`anchor`, `note`, `split` only).
- Features page: hero panel of the five module groups with counts (`FeatureOverview`); filters as a sticky pill bar with module counts (static on phones); catalogue cards with a module icon and number, check-mark benefits, a footer row and a whole-card link; a closing "One platform under every module" tile fills the empty slots after module 13 in the All view and links to `/platform`. Module and category icons live in `components/features/moduleIcons.tsx`, typed by slug so a new module fails typecheck until it has an icon.
- **Fixed: "URL data outside of Suspense" (Instant Navigation insight)** on `/solutions/[slug]`, `/features/[slug]` and `/industries/[slug]`. Each page awaited `params` at the top level, so a client navigation between two slugs blocked on the server. The default export now renders the content inside `<Suspense fallback={<PageSkeleton />}>` (the docs require this even with `generateStaticParams`). Direct visits are still fully prerendered; client navigations show the skeleton instantly while the content streams. Verified in a browser against the dev overlay, with a temporary control route that still reproduced the insight.
- Role pages (`/solutions/*`, shared template): assistant and team cards with icon headers and a "Handoff" marker between them (arrow points down when stacked); workflow as numbered circles joined by a line (shared with `/enterprise`); module cards with module icon, number, shaded feature groups, footer row and whole-card link; numbered use-case cards; industry chips with arrows; the BPO note as a callout; conversation panel with a call icon, timeline dots and a handoff icon.
- Enterprise page: hero panel restating the intro (deployment, integrations, approvals and branding scoped with your team; for multi-team businesses, BPOs, agencies and institutions); package tiers with icons, an accent bar and a five-dot stage indicator; white-label points with icons and a callout; deployment cards sharing the Platform style (`components/platform/deploymentIcons.tsx` and `platform.module.css`); requirements, embedding, governance and security as panels with icon headers.
- Industries page: hero tile grid linking to the first eight industries plus "+9 more" (`IndustryMosaic`); search in a panel with an icon, a labelled clear button and one-tap suggestion chips; cards with an industry icon (`components/directory/industryIcons.tsx`, typed by the new `IndustrySlug`), whole-card links, and a closing "start from a capability" tile linking to `/features` when no search is active. The search text builder and the suggestions moved to `content/industries.ts` (`industrySearchText`, `industrySearchSuggestions`) and are passed to the client component, which keeps the content data out of the browser bundle. **Fixed:** the search placeholder suggested "renewals", which matched no industry (the text says "renewal"); a unit test now checks every suggestion finds at least one industry, and an e2e check covers the chips and clear button.
- Pricing page: hero links to the two plan families (`#chat-plans` / `#voice-plans` select the matching tab); plan cards (shared with `/whatsapp-ai` and the homepage preview) with a family badge, a smaller "Request current pricing" line and allowance tiles ("Up to 2,000 AI-managed chats per month", call minutes for voice plans); trial banner with an icon; comparison table with a tinted header, family pills, "Enquire" pills, the plan name pinned while it scrolls sideways and a 64rem minimum width so rows stay compact on phones; the WhatsApp charges note as a callout; quote terms and larger-team packages as icon-header panels (package icons shared with `/enterprise` via `components/pricing/packageTierIcons.tsx`). `whatsapp.module.css` is now shared with `/pricing` for `anchor` and `split` only.
- **Fixed: homepage module explorer ignored early clicks.** A click on the static-shell copy (the Suspense fallback shown until the live explorer streams in) changed `?module=` but not the panel. The view now keeps the clicked module in local state until the URL sync arrives. Found by the e2e suite while the dev server was under load.
- About page (still only facts from the specification): hero "Who handles what" panel built from the positioning text (the assistant: routine questions, first responses, scheduled follow-ups; your people: relationships, negotiations, exceptions); an "at a glance" strip (product, owner division, and counts read from the content arrays: roles, modules, industry guides); the principle as a pull quote in a full-width brand band beside the explanation; "Three roles, one platform" as linked role cards (role icons shared with the homepage via `components/solutions/roleIcons.tsx`); "How we work" as six numbered icon cards in three columns (no empty slots). New classes live in the About section of `trust.module.css`; the shared `grid` and `split` classes are unchanged.
- Security page (still no certifications, badges, document links or unapproved controls): hero panel of the three safeguards from the intro; handoff section reusing the Platform panel, chips and numbered handover tiles; approvals, consent and business responsibilities as icon-header panels; review topics as eight icon cards; documentation list as file-icon tiles; the request-form intro sticky beside the long form, restating two existing statements.
- Integrations page: hero summary counted from the directory (systems, categories, and only the statuses currently in use); connection approaches with icons; the status legend as four tiles; directory search panel with a search icon beside the status filter; a category jump bar linking to each visible card (ids such as `#crm` unchanged); category cards with an icon (`components/directory/integrationIcons.tsx`, typed by category id) and a system count; website and mobile embedding as icon-header panels.
- Homepage, second pass: industry cards carry their directory icon beside the title (`industryIcon(slug)`); handoff triggers are icon tiles under a "Handoff happens when" label that names the list; card links use `text-wrap: balance` so an arrow never wraps onto a line of its own.
- Contact page (still only verified channels, no invented contacts or response times): hero actions to the form and topics; hero panel listing the intro's three "please don't send" items; topic cards with icons and whole-card links; the enquiry intro sticky beside the form, which sits in a card, with a demo prompt reusing the Book a Demo route's wording; company information and "Before you get in touch" as icon-header panels, the latter as icon link rows.
- Book a Demo page (form component unchanged): hero actions to the form and Contact; hero panel outlining the form's five sections in order, with the existing "a preference, not a confirmed booking" note; the form's top-level section legends numbered by a CSS counter (screen readers skip the number); form in the wider column; "What happens next" as an icon timeline, a contact prompt and "Before your demo" link rows, sticky only on screens tall enough to show the whole aside. Second pass, scoped to the page wrapper: checkbox and radio options as selectable tiles (label fills the tile; checked tiles highlighted via `:has(input:checked)`); the section being filled in is highlighted (`:focus-within`); the empty status live region is taken out of the grid flow (still rendered) so it no longer adds a second gap above the button; a larger submit button, full width on phones.
- Scroll-in reveal for cards and section headings uses CSS scroll-driven animations only, and only with `prefers-reduced-motion: no-preference`. `npm run audit` turns animations off before measuring contrast so below-the-fold content is still checked.

### Bug-fix pass and theme toggle

- **Header light/dark toggle** (`components/layout/ThemeToggle.tsx`): sun/moon button next to the demo CTA (next to Menu on phones), labelled with the action it takes. It shares one store with the footer Light/Dark/System selector (`lib/theme-client.ts`), so both stay in sync, across tabs too. Both icons are rendered and CSS shows the right one from `data-theme`, so the icon is correct before hydration.
- **Fixed: theme flash on hydration.** The old footer selector applied the theme from a layout effect, which first ran with the server snapshot ("light") and flipped dark-theme visitors back to light for a moment. `data-theme` is now written only by event handlers.
- **Fixed: forms after a received request.** With `cacheComponents`, Next.js keeps visited pages mounted but hidden (React Activity). Returning to `/book-demo`, `/contact` or `/security` after a successful request showed the old answers and a disabled button, and a new request would have reused the old submission ID (so the server would treat it as a duplicate). `useSubmission` now resets the form when its page is hidden after a received request; unsent drafts are still kept. A cached `/thank-you` page now updates to the newest receipt.
- **Fixed: answers lost while `/book-demo` streams.** The Suspense fallback was a fully interactive copy of the form; text typed into it vanished when the preselected form streamed in. The fallback is now an inert placeholder.
- **Fixed:** `data-scroll-behavior="smooth"` on `<html>` (Next.js warning; new pages start at the top instantly while anchor links still scroll smoothly); 320 px header overflow after adding the toggle.
- **New `npm run audit`** (`scripts/audit.mjs`, shared driver `scripts/lib/cdp.mjs`): all sitemap routes in both themes for console errors/warnings, failed requests, broken links and anchors, duplicate ids, broken ARIA references, missing alt text and accessible names, one visible h1, WCAG contrast against the rendered background (with a self-test), and client-side navigation landing at the top. Browser tests count only visible elements, since cached pages stay in the DOM hidden.

### Part 10 implementation notes

- `/demo` (`components/demo/DemoPlayer.tsx`, data in `content/demo-scenarios.ts`): five fictional scenarios × three roles × phone/WhatsApp; Play/Pause/Resume, Show all, Reset; one timeout per step; reduced-motion users get the whole conversation at once; the disclosure is always visible. The e2e suite asserts no network requests during playback.
- Theme selector in the footer (`ThemeSelector`): Light/Dark/System, stored in `localStorage`, applied before paint by the Part 1 script, follows OS changes in System mode. Verified persistence across reloads.
- SEO: `app/sitemap.ts` (published routes only), `app/robots.ts` (blocks everything until `SITE_INDEXING=true`), `app/opengraph-image.tsx` (original logo on brand purple), Open Graph/Twitter defaults, homepage JSON-LD (Organization, SoftwareApplication, FAQPage) with no prices, offers or ratings.
- Analytics (`lib/analytics.ts`): the spec 19 event names as a typed DOM event; nothing is sent and no provider is loaded.
- Security headers in `next.config.ts` (nosniff, referrer policy, frame denial, Permissions-Policy without camera/microphone, HSTS); `X-Powered-By` removed. CSP is a deployment decision (documented).
- Test suites: `tests/seo.test.ts`, `tests/contrast.test.ts` (WCAG ratios read from the CSS tokens), and `scripts/e2e.mjs` (`npm run e2e`) driving headless Chrome over the DevTools Protocol.
- **Bug found by the overflow sweep:** `/pricing` widened the whole page on phones because `.sr-only` text (absolutely positioned) inside the comparison table escaped its scroll container. Fixed with `position: relative` on `.table-scroll`.

### Part 9 implementation notes

- **Pipeline** (`lib/server/submissions.ts`), shared by `POST /api/demo-requests` and `POST /api/enquiries`: same-origin check → JSON content type → 16 KB body limit → JSON parse → per-client rate limit (5 per 10 minutes, in-memory per instance) → honeypot → server-side validation → durable save → notification queued after the response with `after()`. Success (201, or 200 for a retried duplicate) is returned only after the store accepts the request. With no store configured the API returns an honest 503 ("nothing has been sent"), verified against the running server.
- **Storage** (`lib/server/lead-store.ts`), configured in `.env.example`: `LEAD_STORE_URL` + `LEAD_STORE_SECRET` forwards each request to an HTTPS endpoint (accepted only on 2xx, `Idempotency-Key` header), or `LEAD_STORE_DIR` writes fsynced JSON files (persistent-disk Node hosts only). The reference (e.g. `BM-PXFD-2NRR`) is derived from the browser's submission ID, so retries keep the same reference and never create a second lead.
- **Notifications** (`lib/server/notification-outbox.ts`): with a file store and `NOTIFICATION_WEBHOOK_URL`, each request queues a minimal notification (reference, kind, name, business, email). Failures retry with exponential backoff and move to `dead-letter/` after 6 attempts; the lead is never affected. `POST /api/internal/outbox` (Bearer `OUTBOX_PROCESS_SECRET`) lets a cron job retry.
- **Validation** (`lib/validation/requests.ts`) is shared by browser and server: all spec 12.1 fields, allowlists, length limits, phone normalised to E.164 only against a chosen country code (the country code is stripped only from international-format numbers, so Indian `91…` mobiles survive), preferred date between today and a year ahead, time zone shown with Asia/Colombo as a visible suggestion, marketing consent separate and unticked with chosen channels recorded.
- **Forms** (`components/forms/`): labelled fields with `aria-describedby`/`aria-invalid`, `noValidate` with our own messages, first invalid field focused, polite live region, values preserved on failure, "Try Again" reuses the submission ID. `/book-demo` preselects allowlisted `plan`, `module`, `industry` and `role` and shows "You're asking about…"; the general enquiry form is on `/contact` and the security request (with document checkboxes) on `/security#request-form`.
- **Receipt**: `/thank-you` (noindex) shows a reference only if this browser received a confirmed acceptance (stored in `sessionStorage`); a direct visit shows "No recent request on this device".
- **Open item:** the enquiry acknowledgement wording in `content/forms.ts` is a draft (`approved: false`) and must be replaced with approved privacy wording (open confirmation 7). The privacy-notice link appears automatically once `/privacy` is published.
- Browser end-to-end check (headless Chrome over the DevTools Protocol, run against a file store with a deliberately unreachable webhook): preselection, empty-submit errors and focus, successful submission, receipt matching the stored file, normalised phone, failed notification queued for retry, no fake receipt on direct visit, and a general enquiry through the same pipeline.

### Part 8 implementation notes

- `/security` (spec 11): escalation triggers, handoff types and context, approvals with an approval record, consent and conduct principles, "questions we answer in a security review" (topics, not claimed controls), approved controls rendered only when any are approved (none yet), security documentation available on request through an access-controlled process (no links to documents that don't exist), the business's own compliance responsibilities. CTA is "Request Security Information" rather than "Request Security Pack", because no pack exists yet.
- `/about`: purpose, the source's positioning principle, and six operating-approach points. No invented history, team, clients or address.
- `/contact`: four enquiry routes, direct channels only when verified in `config/site.ts` (none are yet, so the section shows company information), link to the corporate website, and a warning not to send passwords or payment details. Privacy-policy-style statements were removed: they need approved wording.
- Legal pages: `content/legal.ts` holds each document as `null` until approved text exists. A null document returns the real 404, and footer links derive from published documents (the separate `legalPagesApproved` flag was removed). Dates are formatted without constructing a `Date`.
- **Scope change:** the general enquiry form and the security-information request form move to Part 9, so all three forms share one validated, durable request pipeline. Until then those routes point at `/book-demo`.

### Part 7 implementation notes

- `/industries`: searchable directory (`IndustryDirectory`) over name, summary, workflows and modules; result count announced via `role="status"`; empty state links to `/book-demo?industry=other`. All cards are in the server HTML.
- `/industries/[slug]` (spec 9): summary + "the challenge", labelled fictional scenario (`IndustryScenario`; team-member messages marked by label and dashed outline, not colour alone), workflows, "Where your team stays in charge" boundaries, recommended modules with availability, integration links to `/integrations#<id>`, related industries, CTA `/book-demo?industry=<slug>`.
- `/integrations` (spec 10): connection approaches, a plain-language legend for the four statuses, searchable directory with a status filter that shows honest counts (Available: 0), every system's status as text, and `id="<category>"` anchors (smoke-checked). Website/mobile embedding requirements.
- `industrySlugs` added to `content/types.ts` for `proxy.ts` (unknown `/industries/*` → 404); a test keeps it in sync with the industry data.
- Search matching lives in `lib/search.ts` and is unit-tested (`tests/search.test.ts`), since typing into the page can't be exercised in the headless screenshot checks.
- Status badges now use a rounded-rectangle radius so long labels wrap cleanly.

### Part 6 implementation notes

- `/whatsapp-ai`: fictional WhatsApp preview with a transcribed voice note, 8 capabilities, voice notes vs live calls, 10 business tools, 3 PBX workflows, 6 onboarding stages ("we never ask for account passwords"), Chat/Voice plan tabs, platform rules, industries, FAQ. No Meta/official-platform naming or partner badge; `siteConfig.providerAttribution` renders only when `flags.providerAttributionApproved` is true.
- `/pricing`: Chat AI / Voice + Chat AI tabs (trial as a banner above the paid cards), comparison table of all 7 plans in a labelled, focusable scroll region, "confirmed in your quote" billing terms, quoted packages, pricing FAQ. Monthly only; no annual toggle, discounts or "Most Popular".
- `Tabs` now supports `hashTargets`: `/pricing#voice-plans` selects the Voice tab after hydration (via `useSyncExternalStore`, so no hydration mismatch). Verified in a screenshot.
- `PlanFamilyTabs` and `PlanComparisonTable` are shared by both pages and read the single plan source.
- Smoke test now also asserts that "LKR" never appears on `/` or `/pricing` while prices are draft.
- Tables keep a 48rem minimum width and scroll inside their region on phones.
- Wording removed during review: "no surprises" (too close to the banned "no hidden charges") — now a banned pattern in the tests.

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
