// Site-wide quality audit in a real browser. Run against `npm run dev` to also catch React
// development warnings (hydration mismatches, missing keys), or against `npm start`.
//
//   BASE_URL=http://localhost:3000 npm run audit
//
// Checks every route in the sitemap plus key extra routes, in light and dark themes:
// console errors/warnings, uncaught exceptions, failed requests, broken internal links and
// in-page anchors, duplicate ids, broken ARIA/label references, images without alt, links
// and buttons without accessible names, one h1 per page, and WCAG text contrast measured
// against the rendered background.
import { createReporter, launchBrowser } from "./lib/cdp.mjs";

const BASE = (process.env.BASE_URL ?? "http://localhost:3000").replace(/\/$/, "");
const { check, summary } = createReporter();

const sitemapXml = await (await fetch(`${BASE}/sitemap.xml`)).text();
const sitemapPaths = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) => new URL(url).pathname);
const routes = [
  ...new Set([...sitemapPaths, "/book-demo?plan=pro-voice&module=inbound-calls", "/thank-you", "/does-not-exist"]),
];

let current = null;
const findings = { console: [], requests: [] };
const browser = await launchBrowser({
  onEvent(method, params) {
    if (!current) return;
    if (method === "Runtime.consoleAPICalled" && ["error", "warning", "assert"].includes(params.type)) {
      const text = params.args.map((arg) => arg.value ?? arg.description ?? "").join(" ");
      findings.console.push(`${current}: [${params.type}] ${text.slice(0, 300)}`);
    } else if (method === "Runtime.exceptionThrown") {
      findings.console.push(`${current}: [exception] ${params.exceptionDetails.exception?.description?.slice(0, 300)}`);
    } else if (method === "Network.responseReceived") {
      const { url, status } = params.response;
      const expected404 = status === 404 && params.type === "Document" && current.includes("does-not-exist");
      if (status >= 400 && !expected404) findings.requests.push(`${current}: ${status} ${url}`);
    } else if (method === "Network.loadingFailed" && !params.canceled && params.errorText !== "net::ERR_ABORTED") {
      findings.requests.push(`${current}: ${params.errorText} (${params.type})`);
    }
  },
});

/** Runs inside the page: structural accessibility checks and link collection. */
const domAudit = `(() => {
  const problems = [];
  const ids = new Map();
  for (const el of document.querySelectorAll('[id]')) ids.set(el.id, (ids.get(el.id) ?? 0) + 1);
  for (const [id, count] of ids) if (count > 1) problems.push('duplicate id "' + id + '" ×' + count);
  for (const attr of ['aria-labelledby', 'aria-describedby', 'aria-controls']) {
    for (const el of document.querySelectorAll('[' + attr + ']')) {
      for (const ref of el.getAttribute(attr).split(/\\s+/).filter(Boolean)) {
        if (!document.getElementById(ref)) problems.push(attr + ' → missing #' + ref + ' on <' + el.tagName.toLowerCase() + '>');
      }
    }
  }
  for (const label of document.querySelectorAll('label[for]')) {
    if (!document.getElementById(label.htmlFor)) problems.push('label for missing #' + label.htmlFor);
  }
  for (const img of document.querySelectorAll('img')) if (!img.hasAttribute('alt')) problems.push('img without alt: ' + img.src);
  for (const el of document.querySelectorAll('a[href], button')) {
    const name = (el.getAttribute('aria-label') || el.textContent || el.title || [...el.querySelectorAll('img[alt]')].map((i) => i.alt).join('')).trim();
    const labelled = el.getAttribute('aria-labelledby');
    if (!name && !labelled && !el.closest('[aria-hidden="true"]')) problems.push('<' + el.tagName.toLowerCase() + '> without accessible name: ' + el.outerHTML.slice(0, 120));
  }
  const h1s = document.querySelectorAll('h1').length;
  if (h1s !== 1) problems.push(h1s + ' h1 elements');
  // Same-page anchors are checked here; links to other pages are fetched afterwards.
  for (const a of document.querySelectorAll('a[href^="#"]')) {
    const target = a.getAttribute('href').slice(1);
    if (target && !document.getElementById(target)) problems.push('anchor to missing #' + target);
  }
  const links = [...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href'));
  return { problems, links };
})()`;

/**
 * Runs inside the page: WCAG contrast of visible text against its rendered background.
 * Animations are switched off first: scroll-in reveals keep below-the-fold content at
 * opacity 0, which would otherwise exclude it from the check.
 */
const contrastAudit = `(() => {
  if (!document.getElementById('audit-no-motion')) {
    const style = document.createElement('style');
    style.id = 'audit-no-motion';
    style.textContent = '*, *::before, *::after { animation: none !important; transition: none !important; }';
    document.head.append(style);
  }
  const parse = (value) => {
    const m = value.match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(/[\\s,\\/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const lum = ({ r, g, b }) => [r, g, b].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; })
    .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
  const blend = (top, bottom) => ({ r: top.r * top.a + bottom.r * (1 - top.a), g: top.g * top.a + bottom.g * (1 - top.a), b: top.b * top.a + bottom.b * (1 - top.a), a: 1 });
  function background(el) {
    const layers = [];
    for (let node = el; node; node = node.parentElement) {
      const style = getComputedStyle(node);
      if (style.backgroundImage !== 'none') return null; // gradients and images: not measurable here
      const color = parse(style.backgroundColor);
      if (color && color.a > 0) { layers.push(color); if (color.a >= 1) break; }
    }
    let result = { r: 255, g: 255, b: 255, a: 1 };
    for (const layer of layers.reverse()) result = blend(layer, result);
    return result;
  }
  const failures = [];
  for (const el of document.body.querySelectorAll('*')) {
    const text = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
    if (!text) continue;
    const rect = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    if (rect.width <= 1 || rect.height <= 1 || style.visibility === 'hidden' || el.closest('[hidden], [aria-hidden="true"], button:disabled')) continue;
    if (parseFloat(style.opacity) === 0) continue;
    const bg = background(el);
    const fg = parse(style.color);
    if (!bg || !fg) continue;
    const ratio = (Math.max(lum(blend(fg, bg)), lum(bg)) + 0.05) / (Math.min(lum(blend(fg, bg)), lum(bg)) + 0.05);
    const size = parseFloat(style.fontSize);
    const large = size >= 24 || (size >= 18.66 && parseInt(style.fontWeight, 10) >= 700);
    const minimum = large ? 3 : 4.5;
    if (ratio < minimum) failures.push(ratio.toFixed(2) + ':1 "' + text.slice(0, 40) + '" (' + style.color + ' on rgb(' + [bg.r, bg.g, bg.b].map(Math.round).join(',') + '))');
  }
  return failures;
})()`;

const structure = [];
const contrast = [];
const allLinks = new Map();

await browser.viewport(1280);
for (const theme of ["light", "dark"]) {
  current = null;
  await browser.goto(`${BASE}/`, 300);
  await browser.evaluate(`localStorage.setItem('bizmaster-theme', '${theme}')`);
  for (const route of routes) {
    current = `${route} [${theme}]`;
    await browser.goto(`${BASE}${route}`, 1200);
    if (theme === "light") {
      const { problems, links } = await browser.evaluate(domAudit);
      for (const problem of problems) structure.push(`${route}: ${problem}`);
      for (const href of links) allLinks.set(href, route);
    }
    for (const failure of await browser.evaluate(contrastAudit)) contrast.push(`${route} [${theme}]: ${failure}`);
  }
}
current = null;

// The contrast checker must be able to fail: inject a known low-contrast element.
await browser.goto(`${BASE}/`, 600);
await browser.evaluate(`localStorage.setItem('bizmaster-theme', 'light')`);
await browser.evaluate(`(() => { const p = document.createElement('p'); p.id = 'audit-self-test'; p.textContent = 'Audit self test'; p.style.cssText = 'color:#777777;background:#888888;font-size:16px'; document.body.prepend(p); })()`);
const selfTest = await browser.evaluate(contrastAudit);
check("contrast checker detects a known failure (self-test)", selfTest.some((failure) => failure.includes("Audit self test")));

// Client-side navigation: click real links like a visitor. Pages must start at the top,
// show their h1 and log nothing. With cacheComponents, previously visited routes stay in the
// DOM hidden by <Activity>, so only visible headings count. Scrolling is instant and settles
// before the click: Next.js keeps the scroll position when the new page's top is in view,
// so a smooth scroll still animating at click time would leave a misleading offset.
const softNavigation = [];
const hubs = ["/", "/features", "/industries", "/pricing"];
const softTargets = ["/platform", "/features", "/features/whatsapp-voice", "/solutions/call-center", "/whatsapp-ai", "/pricing", "/industries", "/industries/hotels", "/integrations", "/security", "/about", "/contact", "/book-demo", "/demo", "/enterprise"];
await browser.goto(`${BASE}/`, 800);
for (const target of softTargets) {
  current = `client navigation to ${target}`;
  let clicked = false;
  for (const hub of [null, ...hubs]) {
    if (hub) await browser.goto(`${BASE}${hub}`, 800);
    const found = await browser.evaluate(`(() => {
      const link = [...document.querySelectorAll('a[href="${target}"]')].find((a) => a.checkVisibility());
      if (!link) return false;
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' });
      return true;
    })()`);
    if (!found) continue;
    await new Promise((resolve) => setTimeout(resolve, 200));
    clicked = await browser.evaluate(`(() => {
      const link = [...document.querySelectorAll('a[href="${target}"]')].find((a) => a.checkVisibility());
      link?.click();
      return Boolean(link);
    })()`);
    if (clicked) break;
  }
  if (!clicked) {
    softNavigation.push(`${target}: no visible link found on hub pages`);
    continue;
  }
  try {
    const visibleH1s = `[...document.querySelectorAll('h1')].filter((h) => h.checkVisibility()).length`;
    await browser.waitFor(`location.pathname === '${target}' && ${visibleH1s} > 0`, 20000);
    await new Promise((resolve) => setTimeout(resolve, 700));
    const state = await browser.evaluate(`({ y: Math.round(window.scrollY), h1: ${visibleH1s} })`);
    if (state.y > 0) softNavigation.push(`${target}: page opened scrolled to ${state.y}px instead of the top`);
    if (state.h1 !== 1) softNavigation.push(`${target}: ${state.h1} h1 elements after navigation`);
  } catch (error) {
    softNavigation.push(`${target}: ${error.message}`);
  }
}
current = null;
check("client-side navigation lands at the top of each page", softNavigation.length === 0, `\n      ${softNavigation.join("\n      ")}`);

// Internal links and anchors resolve.
const broken = [];
const htmlCache = new Map();
for (const [href, foundOn] of allLinks) {
  const [pathAndQuery, hash] = href.split("#");
  const target = pathAndQuery || "/";
  if (!htmlCache.has(target)) {
    const response = await fetch(`${BASE}${target}`);
    htmlCache.set(target, { status: response.status, html: await response.text() });
  }
  const { status, html } = htmlCache.get(target);
  if (status !== 200) broken.push(`${href} → ${status} (linked from ${foundOn})`);
  else if (hash && !html.includes(`id="${hash}"`)) broken.push(`${href} → missing #${hash} (linked from ${foundOn})`);
}

await browser.close();

const show = (items) => [...new Set(items)].slice(0, 40).join("\n      ");
console.log(`Audited ${routes.length} routes × 2 themes, ${allLinks.size} internal links.\n`);
check("no console errors or warnings", findings.console.length === 0, `\n      ${show(findings.console)}`);
check("no failed requests", findings.requests.length === 0, `\n      ${show(findings.requests)}`);
check("internal links and anchors resolve", broken.length === 0, `\n      ${show(broken)}`);
check("valid ids, ARIA references, alt text, accessible names, one h1", structure.length === 0, `\n      ${show(structure)}`);
check("text contrast meets WCAG AA in both themes", contrast.length === 0, `\n      ${show(contrast)}`);
summary("audit checks");
