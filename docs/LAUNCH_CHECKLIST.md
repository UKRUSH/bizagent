# BizMaster AI Agent website — launch checklist

Status of the specification's acceptance checklist (§23), what still needs a business decision, and how to deploy. Everything marked **Verified** is covered by an automated check that can be re-run.

## How to verify

```bash
npm test            # 129 unit/content tests: plan data, 13 modules, guardrails, validation, pipeline, SEO, contrast
npm run typecheck   # route types + TypeScript
npm run lint
npm run build
npm start           # in one terminal (add LEAD_STORE_DIR=... to exercise a real store)
npm run smoke       # 59 HTTP route checks: statuses, 404s, draft prices hidden, sitemap/robots
npm run e2e         # 41 browser checks (40 without a lead store): forms, cached-route form reset, hero video, demo, theme toggle, keyboard, overflow at 6 widths
npm run audit       # every sitemap route × light/dark: console, failed requests, links, ARIA/ids, WCAG contrast, client navigation
```

`npm run e2e` and `npm run audit` need Chrome or Edge (set `CHROME_PATH` if it isn't found). With `LEAD_STORE_DIR` set on both the server and the e2e run, e2e verifies the stored request; without it, it verifies the honest "couldn't receive" path. Running `npm run audit` against `npm run dev` also catches React development warnings.

## §23.1 Content and branding

| Requirement | Status | Evidence |
| --- | --- | --- |
| Original logo legible on purple/dark, no distortion or padding | Verified | Transparent-margin crop 1596×552 (bounding box matched the spec exactly); fixed aspect ratio in `BrandLogo`; screenshots |
| Primary purple `#5D0E8B`; derived shades documented | Verified | `app/globals.css` tokens; derived `#E6C6FF`, `#B67BE0` documented in the spec and plan |
| Every source section traceable | Verified | `docs/specification.md` appendix; `sourceSection` on every module |
| All 13 modules, 3 roles, industries, deployment options, integration categories covered | Verified | `tests/content.test.ts`; smoke test requests every module, role and industry page |
| Draft plan values match §18.7 (incl. LKR 100,000 Pro Voice); approval state respected | Verified | Exact-value test; smoke asserts "LKR" never appears on `/` or `/pricing` while prices are draft |
| No unsupported market, capacity, latency, staff-replacement, security, partner or ROI claims | Verified (content data) | Guardrail scan over all public content in `content/`; page copy reviewed manually during each part |
| Human handoff, consent, data handling and sensitive-action boundaries explained | Verified | `/security`, `/platform`, module and industry pages |
| No invented clients, reviews, contact details, offers or legal documents | Verified | Contacts render only when `verified: true`; legal pages 404 until approved text exists; scenarios use initials only |

## §23.2 Functionality and quality

| Requirement | Status | Evidence |
| --- | --- | --- |
| Navigation, module selection, pricing controls, forms, FAQs work with keyboard and touch | Verified | e2e keyboard checks (menus open with Enter, close with Escape, focus returns); ARIA tabs with arrow keys; native `<details>` FAQs |
| Invalid slugs show a correct not-found page | Verified | `proxy.ts` returns real 404s; smoke checks `/features/*`, `/solutions/*`, `/industries/*`, legal pages |
| Request accepted only after durable storage; retry and notification failures handled | Verified | `tests/requests.test.ts` (store, idempotency, 503, outbox retry/dead-letter); e2e receipt matches stored file |
| Illustrative demo labelled; cannot send messages or calls | Verified | e2e asserts the disclosure and **zero** network requests during playback |
| Server validation, useful errors, rate limits, separate promotional consent | Verified | Shared validator tests; pipeline tests (403/413/415/422/429); e2e focus and live-region checks |
| No secrets, private data or unapproved analytics in browser code | Verified | Secrets read only in `lib/server/config.ts` (`server-only`); analytics sends nothing and payloads are typed without personal data |
| No page-level overflow; images reserve space; long content wraps | Verified | e2e: 18 page templates × 320/375/390/768/1024/1440 px |
| Both themes preserve contrast and visible focus | Verified | `tests/contrast.test.ts` (26 WCAG checks from the actual tokens); e2e theme checks; dark screenshots |
| Production metadata, sitemap, robots, redirects, approved legal content | Partly | Metadata, sitemap, robots and OG image done and tested. Needs `SITE_URL`, `SITE_INDEXING=true` and approved legal text at launch. No redirects are needed for a new product domain |
| Type checking, linting and production build pass | Verified | See commands above |
| Checks for plan data, 13 module routes, form success/failure, menu keyboard, preview boundaries | Verified | Unit, smoke and e2e suites |
| Security claims reconciled with deployed controls; capacity targets evaluated separately | Needs business input | No security control is published as implemented (`securityControls` all under review). Confirm controls and mark them `approved` in `content/security.ts` |

## Decisions the business must make before launch

| # | Decision | Where to change it |
| --- | --- | --- |
| 1 | Product naming and Agent Dilu / Dilexus attribution wording | `config/site.ts` → `providerAttribution` + `flags.providerAttributionApproved` |
| 2 | Plan prices approved; definition of an "AI-managed chat" | `content/plans.ts` → `publicationStatus: "approved"`; `config/site.ts` → `flags.pricingPublished` |
| 3 | Trial, setup, platform-fee, tax and cancellation terms | `content/plans.ts` → `billingTermsToConfirm`; pricing FAQ in `content/faqs.ts` |
| 4 | Contact channels (the WhatsApp number is a candidate only) | `config/site.ts` → `contact.*.verified` |
| 5 | Which modules and integrations are live | `availability` in `content/modules.ts`; `status` in `content/integrations.ts` |
| 6 | Languages supported in the tested product (hero chip, FAQ) | `components/home/Hero.tsx`, `content/faqs.ts` |
| 7 | Approved privacy, terms and cookie text; enquiry acknowledgement wording | `content/legal.ts`; `content/forms.ts` (`enquiryAcknowledgement`, set `approved: true`) |
| 8 | Production domain | `SITE_URL` environment variable |
| 9 | Where demo requests are stored and who is notified | `LEAD_STORE_URL`/`LEAD_STORE_SECRET`, or `LEAD_STORE_DIR` + `NOTIFICATION_WEBHOOK_URL` |
| 10 | Approved favicon / app icon | Replace the temporary `app/icon.svg` |
| 11 | Confirmed security controls | `content/security.ts` → set each confirmed control to `approved` |
| 12 | Whether to add an analytics tool (needs consent and a cookie notice) | Subscribe to the `bizmaster:analytics` DOM event (`lib/analytics.ts`) |

## Deployment

1. **Host:** a Node.js host (`npm run build && npm start`). A static export cannot run the request API. Use `LEAD_STORE_DIR` only where the disk persists between deploys; otherwise use `LEAD_STORE_URL`.
2. **Environment:** copy `.env.example`. Set `SITE_URL`; leave `SITE_INDEXING=false` until content is approved; never set `SHOW_DRAFT_PRICES` in production.
3. **HTTPS:** required. HSTS is already sent and takes effect over HTTPS.
4. **Notifications:** if using `LEAD_STORE_DIR` + `NOTIFICATION_WEBHOOK_URL`, schedule a job to `POST /api/internal/outbox` with `Authorization: Bearer $OUTBOX_PROCESS_SECRET` (every 5–15 minutes) and review `dead-letter/` periodically. Back up the store directory.
5. **Rate limits** are per server instance. With several instances, move the limiter to a shared store.
6. **Content Security Policy:** not set yet. A nonce-based CSP makes every page dynamic (Next.js requirement). Choose between that, a hash-based policy, or a host-level policy, and allow the inline theme script.
7. **After launch:** measure Core Web Vitals on the real host (targets: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1). These have **not** been measured yet.

## Not covered by this build

- A manual accessibility audit with screen readers (automated checks cover contrast, focus, labels, keyboard and live regions; spec §17 asks not to claim compliance before an audit).
- Sinhala and Tamil translations of the website (spec §17: add only with full, reviewed translations).
- The authenticated platform: dashboards, telephony, WhatsApp calling, campaigns (spec §20, a separate phase).
