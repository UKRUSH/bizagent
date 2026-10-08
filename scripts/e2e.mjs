// Browser end-to-end checks through headless Chrome/Edge (DevTools Protocol, no extra deps).
//
//   npm run build && npm start            (optionally with LEAD_STORE_DIR set)
//   npm run e2e                           (in another terminal)
//
// Environment: BASE_URL (default http://localhost:3000), CHROME_PATH (auto-detected),
// LEAD_STORE_DIR (when the server uses a file store, the stored request is verified;
// otherwise the honest "couldn't receive" path is verified), E2E_SHOTS (screenshot folder).
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createReporter, launchBrowser, sleep } from "./lib/cdp.mjs";

const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const STORE_DIR = process.env.LEAD_STORE_DIR;
const SHOTS = process.env.E2E_SHOTS;

const networkLog = [];
const browser = await launchBrowser({
  onEvent(method, params) {
    if (method === "Network.requestWillBeSent") networkLog.push({ url: params.request.url, method: params.request.method });
  },
});
const { send, evaluate, waitFor, viewport } = browser;
const goto = (pathname, settleMs) => browser.goto(`${BASE}${pathname}`, settleMs);
const { check, summary } = createReporter();

async function key(keyName, code = keyName, keyCode = 0) {
  // Enter needs text "\r" so the browser treats it like a real keypress that activates buttons.
  const text = keyName === "Enter" ? "\r" : undefined;
  await send("Input.dispatchKeyEvent", { type: text ? "keyDown" : "rawKeyDown", key: keyName, code, windowsVirtualKeyCode: keyCode, text });
  await send("Input.dispatchKeyEvent", { type: "keyUp", key: keyName, code, windowsVirtualKeyCode: keyCode });
}
async function screenshot(name) {
  if (!SHOTS) return;
  await mkdir(SHOTS, { recursive: true });
  const { result } = await send("Page.captureScreenshot", { format: "png" });
  await writeFile(path.join(SHOTS, `${name}.png`), Buffer.from(result.data, "base64"));
}
async function section(title, run) {
  console.log(`\n# ${title}`);
  try {
    await run();
  } catch (error) {
    check(`${title} completed`, false, String(error));
  }
}
const clickButton = (label, scope = "document") =>
  evaluate(`[...${scope}.querySelectorAll('button')].find((b) => b.textContent.trim() === ${JSON.stringify(label)}).click()`);

const setValueHelper = `function setValue(id, value) {
  const el = document.getElementById(id);
  const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : el instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, value);
  el.dispatchEvent(new Event(el.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }));
}`;

await viewport(1280);

await section("Demo request journey (spec 12)", async () => {
  await goto("/book-demo?plan=pro-voice&module=inbound-calls&industry=hotels&role=sales&plan=evil");
  const pre = await evaluate(`({ plan: document.getElementById('demo-form-plan').value,
    inbound: document.getElementById('demo-form-modules-inbound-calls').checked,
    banner: document.querySelector('#demo-form [role=note]')?.textContent ?? '' })`);
  check("preselects allowlisted query values and shows the context", pre.plan === "pro-voice" && pre.inbound && pre.banner.includes("Pro Voice"), JSON.stringify(pre));

  await evaluate(`document.getElementById('demo-form').requestSubmit()`);
  await sleep(400);
  const invalid = await evaluate(`({ focused: document.activeElement?.id,
    status: document.querySelector('#demo-form [role=status]')?.textContent ?? '',
    describedBy: document.getElementById('demo-form-fullName').getAttribute('aria-describedby') })`);
  check("focuses the first invalid field", invalid.focused === "demo-form-fullName", invalid.focused);
  check("announces errors and links them to fields", invalid.status.startsWith("Please check") && invalid.describedBy?.includes("-error"), JSON.stringify(invalid));

  await evaluate(`(() => { ${setValueHelper}
    setValue('demo-form-fullName', 'Asha Perera');
    setValue('demo-form-businessName', 'Fictional Seaside Hotel');
    setValue('demo-form-workEmail', 'asha@example.com');
    setValue('demo-form-phoneNumber', '077 123 4567');
    document.getElementById('demo-form-privacyAck').click(); })()`);
  await sleep(200);
  check("an error clears once the field is corrected", await evaluate(`!document.getElementById('demo-form-fullName-error')`));
  await evaluate(`document.getElementById('demo-form').requestSubmit()`);

  if (STORE_DIR) {
    await waitFor(`location.pathname === '/thank-you' && document.body.textContent.includes('Reference:')`);
    const reference = await evaluate(`document.querySelector('[role=status] strong')?.textContent ?? ''`);
    const stored = JSON.parse(await readFile(path.join(STORE_DIR, "requests", `${reference}.json`), "utf8"));
    check("receipt reference matches a stored request", stored.reference === reference, reference);
    check("stored values are normalised", stored.data.phone?.e164 === "+94771234567" && stored.data.plan === "pro-voice");
  } else {
    await waitFor(`document.querySelector('#demo-form [role=status]')?.textContent.includes("couldn't receive")`);
    const stillHere = await evaluate(`location.pathname === '/book-demo' && document.getElementById('demo-form-fullName').value === 'Asha Perera'`);
    check("without a store: honest failure, no redirect, answers kept", stillHere);
  }

  await evaluate(`sessionStorage.clear()`);
  await goto("/thank-you");
  check("a direct visit to /thank-you shows no receipt", await evaluate(`!document.body.textContent.includes('Reference:')`));
});

await section("Returning to a form after a received request (cached routes)", async () => {
  // Next.js keeps visited pages mounted but hidden. The API is mocked inside the page so this
  // runs without a lead store; only client-side navigation is used so the mock survives.
  await goto("/thank-you");
  await evaluate(`(() => {
    window.__submissions = [];
    const realFetch = window.fetch;
    window.fetch = async (url, init) => {
      if (!String(url).startsWith('/api/')) return realFetch(url, init);
      const body = JSON.parse(init.body);
      window.__submissions.push(body.submissionId);
      const reference = 'BM-E2E-' + window.__submissions.length;
      return new Response(JSON.stringify({ ok: true, reference, receivedAt: new Date().toISOString(), kind: 'demo' }), { status: 201, headers: { 'content-type': 'application/json' } });
    };
  })()`);
  const fillAndSubmit = `(() => { ${setValueHelper}
    setValue('demo-form-fullName', 'Asha Perera');
    setValue('demo-form-businessName', 'Fictional Seaside Hotel');
    setValue('demo-form-workEmail', 'asha@example.com');
    setValue('demo-form-industry', 'hotels');
    setValue('demo-form-role', 'call-center');
    if (!document.getElementById('demo-form-privacyAck').checked) document.getElementById('demo-form-privacyAck').click();
    setTimeout(() => document.getElementById('demo-form').requestSubmit(), 100);
  })()`;
  const visibleReceipt = `[...document.querySelectorAll('[role=status] strong')].find((el) => el.checkVisibility())?.textContent ?? ''`;
  const openBookDemo = `[...document.querySelectorAll('a[href="/book-demo"]')].find((a) => a.checkVisibility()).click()`;

  await evaluate(openBookDemo);
  await waitFor(`location.pathname === '/book-demo' && document.getElementById('demo-form-fullName')?.checkVisibility() && !document.getElementById('demo-form').inert`);
  await evaluate(fillAndSubmit);
  await waitFor(`location.pathname === '/thank-you' && (${visibleReceipt}) === 'BM-E2E-1'`);
  check("a previously opened /thank-you page shows the new receipt", true);

  await evaluate(openBookDemo);
  await waitFor(`location.pathname === '/book-demo' && document.getElementById('demo-form-fullName')?.checkVisibility() && !document.getElementById('demo-form').inert`);
  await sleep(300);
  const form = await evaluate(`({ name: document.getElementById('demo-form-fullName').value,
    disabled: document.querySelector('#demo-form button[type=submit]').disabled,
    status: document.querySelector('#demo-form [role=status]')?.textContent ?? '' })`);
  check("the form is fresh after a received request (empty, enabled, no old status)", form.name === "" && !form.disabled && !form.status.includes("received"), JSON.stringify(form));

  await evaluate(fillAndSubmit);
  await waitFor(`location.pathname === '/thank-you' && (${visibleReceipt}) === 'BM-E2E-2'`);
  const ids = await evaluate(`window.__submissions`);
  check("a second request gets its own submission ID", ids.length === 2 && ids[0] !== ids[1], JSON.stringify(ids));
  await evaluate(`sessionStorage.clear()`);
});

await section("Interactive components (parts 3–9)", async () => {
  await goto("/");
  await evaluate(`[...document.querySelectorAll('.module-button')].find((b) => b.textContent.trim() === 'Campaigns').click()`);
  await sleep(300);
  const explorer = await evaluate(`({ url: location.search, title: document.getElementById('module-detail-title')?.textContent,
    pressed: document.querySelector('.module-button[aria-pressed="true"]')?.textContent })`);
  check("module explorer updates the panel and the ?module= URL", explorer.url === "?module=promotions-campaigns" && explorer.title === "Promotions and Campaigns" && explorer.pressed === "Campaigns", JSON.stringify(explorer));

  const faq = `document.querySelector('.faq-item')`;
  await evaluate(`${faq}.querySelector('summary').click()`);
  check("FAQ answers open", await evaluate(`${faq}.open === true`));

  await goto("/pricing");
  await evaluate(`document.querySelector('[role=tab][aria-selected="true"]').focus()`);
  await key("ArrowRight", "ArrowRight", 39);
  await sleep(150);
  const tabs = await evaluate(`({ selected: document.querySelector('[role=tab][aria-selected="true"]')?.textContent,
    focused: document.activeElement?.getAttribute('role'),
    voiceVisible: [...document.querySelectorAll('[role=tabpanel]')].some((p) => !p.hidden && p.textContent.includes('Pro Voice')) })`);
  check("pricing tabs move with the arrow keys and show the Voice plans", tabs.selected === "Voice + Chat AI" && tabs.focused === "tab" && tabs.voiceVisible, JSON.stringify(tabs));

  await goto("/features");
  // Filter buttons carry a count badge ("Grow 2"), so match on the label's start.
  await evaluate(`[...document.querySelectorAll('[aria-label="Filter modules by category"] button')].find((b) => b.textContent.trim().startsWith('Grow')).click()`);
  await sleep(200);
  const features = await evaluate(`({ cards: [...document.querySelectorAll('ul > li')].filter((li) => li.querySelector('article') && !li.hidden).length,
    status: document.querySelector('[role=status]')?.textContent ?? '' })`);
  check("feature catalogue filters by category", features.cards === 2 && features.status.includes("Showing 2 of 13"), JSON.stringify(features));

  await goto("/industries");
  await evaluate(`(() => { ${setValueHelper} setValue(document.querySelector('input[type=search]').id, 'renewal'); })()`);
  await sleep(200);
  const industries = await evaluate(`({ visible: [...document.querySelectorAll('li')].filter((li) => li.querySelector('article') && !li.hidden).map((li) => li.querySelector('h2').textContent),
    status: document.querySelector('[role=status]')?.textContent })`);
  check("industry search filters cards and announces the count", industries.visible.includes("Insurance") && !industries.visible.includes("Restaurants") && /match/.test(industries.status), JSON.stringify(industries));

  await evaluate(`document.querySelector('button[aria-label="Clear search"]').click()`);
  await sleep(200);
  await evaluate(`[...document.querySelectorAll('[aria-label="Try a search"] button')].find((b) => b.textContent === 'admissions').click()`);
  await sleep(200);
  const suggestion = await evaluate(`({ value: document.querySelector('input[type=search]').value,
    status: document.querySelector('[role=status]')?.textContent ?? '',
    pressed: document.querySelector('[aria-label="Try a search"] [aria-pressed="true"]')?.textContent })`);
  await evaluate(`document.querySelector('button[aria-label="Clear search"]').click()`);
  await sleep(200);
  const cleared = await evaluate(`({ value: document.querySelector('input[type=search]').value, status: document.querySelector('[role=status]')?.textContent ?? '' })`);
  check("a suggestion chip fills the search and Clear resets it",
    suggestion.value === "admissions" && /^\d+ of 17 industries match/.test(suggestion.status) && suggestion.pressed === "admissions" && cleared.value === "" && cleared.status === "17 industries.",
    JSON.stringify({ suggestion, cleared }));

  await goto("/integrations");
  await evaluate(`(() => { ${setValueHelper} setValue(document.querySelector('select').id, 'custom'); })()`);
  await sleep(200);
  const integrations = await evaluate(`({ status: document.querySelector('[role=status]')?.textContent,
    crmVisible: !document.getElementById('crm').hidden, telephonyHidden: document.getElementById('telephony').hidden })`);
  check("integration status filter narrows the directory", /Showing \d+ of/.test(integrations.status) && integrations.crmVisible && integrations.telephonyHidden, JSON.stringify(integrations));

  await goto("/");
  await evaluate(`document.getElementById('nav-trigger-solutions').click()`);
  await sleep(150);
  await evaluate(`document.querySelector('h1').dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))`);
  await sleep(150);
  check("a desktop menu closes on an outside click", (await evaluate(`document.getElementById('nav-trigger-solutions').getAttribute('aria-expanded')`)) === "false");

  await viewport(390);
  await goto("/");
  await evaluate(`document.querySelector('.menu-button').click()`);
  await sleep(150);
  await evaluate(`[...document.querySelectorAll('#mobile-navigation a')].find((a) => a.getAttribute('href') === '/pricing').click()`);
  await waitFor(`location.pathname === '/pricing'`);
  await sleep(500);
  check("the mobile menu closes after following a link", await evaluate(`document.getElementById('mobile-navigation').hidden`));
  await viewport(1280);
});

await section("Hero background video", async () => {
  await viewport(1280);
  await goto("/");
  const video = `document.querySelector('.hero video')`;
  const toggleLabel = `document.querySelector('.hero button[aria-label$="background video"]').getAttribute('aria-label')`;
  const canPlay = await evaluate(`${video}.canPlayType('video/mp4') !== ''`);
  check("the video is muted, decorative and has a poster", await evaluate(`${video}.muted && ${video}.closest('[aria-hidden="true"]') !== null && Boolean(${video}.poster)`));
  if (canPlay) {
    await waitFor(`!${video}.paused`, 20000);
    check("autoplays and offers a pause button", (await evaluate(toggleLabel)) === "Pause background video");
    await evaluate(`document.querySelector('.hero button[aria-label$="background video"]').click()`);
    await sleep(200);
    check("the button pauses it", (await evaluate(`${video}.paused`)) && (await evaluate(toggleLabel)) === "Play background video");
    await evaluate(`document.querySelector('.hero button[aria-label$="background video"]').click()`);
    await waitFor(`!${video}.paused`);
    await evaluate(`window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })`);
    await waitFor(`${video}.paused`);
    await evaluate(`window.scrollTo({ top: 0, behavior: 'instant' })`);
    await waitFor(`!${video}.paused`);
    check("stops while scrolled out of view and resumes on return", true);
  }
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await goto("/", 1500);
  check("does not play when reduced motion is preferred", (await evaluate(`${video}.paused`)) && (await evaluate(toggleLabel)) === "Play background video");
  await send("Emulation.setEmulatedMedia", { features: [] });
});

await section("Illustrative demo (spec 13)", async () => {
  await goto("/demo");
  networkLog.length = 0;
  check("the disclosure is visible", await evaluate(`document.body.textContent.includes('Illustrative demo — no real calls or messages are sent')`));
  await evaluate(`(() => { ${setValueHelper} setValue('demo-scenario', 'property-viewing'); setValue('demo-role', 'sales-agent'); setValue('demo-channel', 'phone'); })()`);
  await sleep(200);
  await clickButton("Play conversation");
  await waitFor(`document.body.textContent.includes('Qualified buyer lead')`, 20000);
  const transcript = await evaluate(`document.querySelectorAll('[aria-label="Fictional conversation"] li').length`);
  check("plays the full conversation and shows the role's proposed action", transcript === 4, `messages: ${transcript}`);
  await screenshot("demo-complete");
  await clickButton("Reset");
  await sleep(200);
  check("reset clears the conversation", (await evaluate(`document.querySelectorAll('[aria-label="Fictional conversation"] li').length`)) === 0);
  const sideEffects = networkLog.filter(({ url }) => !url.startsWith(`${BASE}/_next/`) && !url.startsWith("data:"));
  check("makes no network requests while playing", sideEffects.length === 0, JSON.stringify(sideEffects));
});

await section("Theme (spec 4.3)", async () => {
  await goto("/");
  const theme = `document.documentElement.dataset.theme`;
  await evaluate(`document.querySelector('.theme-toggle').click()`);
  await sleep(150);
  check("the header toggle switches to dark", (await evaluate(theme)) === "dark");
  check("the footer selector reflects the header toggle", (await evaluate(`document.querySelector('.theme-selector [aria-pressed="true"]')?.textContent`)) === "Dark");
  await goto("/pricing", 0);
  check("the choice persists before hydration (no flash)", (await evaluate(theme)) === "dark");
  await sleep(900);
  await screenshot("pricing-dark");
  await evaluate(`document.querySelector('.theme-toggle').click()`);
  await sleep(150);
  check("the header toggle switches back to light", (await evaluate(theme)) === "light");

  const pressButton = (label) => `[...document.querySelectorAll('.theme-selector button')].find((b) => b.textContent === '${label}').click()`;
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: "light" }] });
  await evaluate(pressButton("System"));
  await sleep(150);
  check("System follows the OS preference", (await evaluate(theme)) === "light");
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-color-scheme", value: "dark" }] });
  await sleep(200);
  check("System reacts when the OS preference changes", (await evaluate(theme)) === "dark");
  check("the header toggle describes the action it will take", /light/i.test(await evaluate(`document.querySelector('.theme-toggle').getAttribute('aria-label')`)));
  await evaluate(pressButton("Light"));
  await send("Emulation.setEmulatedMedia", { features: [] });
  check("Light restores the light theme", (await evaluate(theme)) === "light");
});

await section("Keyboard navigation (spec 5.2)", async () => {
  await viewport(1280);
  await goto("/");
  await evaluate(`document.getElementById('nav-trigger-features').focus()`);
  await key("Enter", "Enter", 13);
  await sleep(150);
  check("Enter opens a desktop menu", (await evaluate(`document.getElementById('nav-trigger-features').getAttribute('aria-expanded')`)) === "true");
  await key("Escape", "Escape", 27);
  await sleep(150);
  const desktop = await evaluate(`({ expanded: document.getElementById('nav-trigger-features').getAttribute('aria-expanded'), focused: document.activeElement?.id })`);
  check("Escape closes it and returns focus to the trigger", desktop.expanded === "false" && desktop.focused === "nav-trigger-features", JSON.stringify(desktop));

  await viewport(390);
  await goto("/");
  await evaluate(`document.querySelector('.menu-button').focus()`);
  await key("Enter", "Enter", 13);
  await sleep(150);
  check("the mobile menu opens", await evaluate(`!document.getElementById('mobile-navigation').hidden`));
  await key("Escape", "Escape", 27);
  await sleep(150);
  const mobile = await evaluate(`({ hidden: document.getElementById('mobile-navigation').hidden, focused: document.activeElement?.classList.contains('menu-button') })`);
  check("Escape closes the mobile menu and returns focus", mobile.hidden && mobile.focused, JSON.stringify(mobile));
  await viewport(1280);
});

await section("No horizontal page overflow (spec 18)", async () => {
  const routes = [
    "/", "/platform", "/features", "/features/recording-transcription", "/solutions/personal-assistant", "/enterprise",
    "/whatsapp-ai", "/pricing", "/industries", "/industries/finance-professional-services", "/integrations",
    "/security", "/about", "/contact", "/book-demo", "/thank-you", "/demo", "/does-not-exist",
  ];
  const widths = [320, 375, 390, 768, 1024, 1440];
  const overflows = [];
  for (const width of widths) {
    await viewport(width);
    for (const route of routes) {
      await goto(route, 300);
      const extra = await evaluate(`document.documentElement.scrollWidth - document.documentElement.clientWidth`);
      if (extra > 1) overflows.push(`${route} @ ${width}px (+${extra}px)`);
    }
  }
  check(`${routes.length} routes × ${widths.length} widths without page-level overflow`, overflows.length === 0, overflows.join(", "));
  await viewport(1280);
});

await browser.close();
summary("end-to-end checks");
