// Minimal Chrome DevTools Protocol driver shared by e2e.mjs and audit.mjs (no dependencies).
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function findChrome() {
  return (
    process.env.CHROME_PATH ??
    [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/usr/bin/google-chrome",
      "/usr/bin/chromium",
    ].find((candidate) => existsSync(candidate))
  );
}

/**
 * Launches headless Chrome with a fresh profile and returns a small client.
 * `onEvent(method, params)` receives protocol events (console, network, ...).
 */
export async function launchBrowser({ onEvent } = {}) {
  const chromePath = findChrome();
  if (!chromePath) throw new Error("No Chrome or Edge found. Set CHROME_PATH.");
  const port = 9300 + Math.floor(Math.random() * 600);
  const profile = await mkdtemp(path.join(tmpdir(), "bizmaster-cdp-"));
  const chrome = spawn(
    chromePath,
    ["--headless=new", "--disable-gpu", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"],
    { stdio: "ignore" },
  );

  let targets = [];
  for (let i = 0; i < 80 && !targets.length; i++) {
    try {
      targets = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).filter((t) => t.type === "page");
    } catch {
      await sleep(250);
    }
  }
  if (!targets.length) throw new Error("Chrome did not start.");

  const socket = new WebSocket(targets[0].webSocketDebuggerUrl);
  await new Promise((resolve) => socket.addEventListener("open", resolve, { once: true }));
  let nextId = 0;
  const pending = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    } else if (message.method) {
      onEvent?.(message.method, message.params);
    }
  });

  const send = (method, params = {}) => {
    const id = ++nextId;
    socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve) => pending.set(id, resolve));
  };

  async function evaluate(expression) {
    const response = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    if (response.result?.exceptionDetails) {
      throw new Error(response.result.exceptionDetails.exception?.description ?? "evaluation failed");
    }
    return response.result?.result?.value;
  }

  async function waitFor(expression, timeoutMs = 15000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      if (await evaluate(expression).catch(() => false)) return;
      await sleep(150);
    }
    throw new Error(`Timed out waiting for: ${expression}`);
  }

  async function goto(url, settleMs = 900) {
    await send("Page.navigate", { url });
    await waitFor(`document.readyState === 'complete' && location.protocol !== 'about:'`, 60000);
    await sleep(settleMs);
  }

  async function viewport(width, height = 900) {
    await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: width < 768 });
  }

  async function close() {
    socket.close();
    chrome.kill();
    await sleep(300);
    await rm(profile, { recursive: true, force: true }).catch(() => undefined);
  }

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");
  await send("Log.enable");
  return { send, evaluate, waitFor, goto, viewport, close };
}

/** Returns a `check(name, ok, detail)` recorder and a `summary()` that sets the exit code. */
export function createReporter() {
  const results = [];
  return {
    check(name, ok, detail = "") {
      results.push(ok);
      console.log(`${ok ? "ok  " : "FAIL"} ${name}${!ok && detail ? ` — ${detail}` : ""}`);
    },
    summary(label) {
      const failed = results.filter((ok) => !ok).length;
      console.log(`\n${results.length - failed}/${results.length} ${label} passed`);
      process.exitCode = failed ? 1 : 0;
    },
  };
}
