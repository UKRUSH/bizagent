import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";

/**
 * WCAG 2.2 contrast for the design tokens in app/globals.css (spec 4.3, 17, 23.2).
 * Tokens are read from the stylesheet, so a palette change that breaks contrast fails here.
 */

const css = readFileSync("app/globals.css", "utf8");

function tokens(selector: string): Record<string, string> {
  const start = css.indexOf(`${selector} {`);
  assert.ok(start >= 0, `missing ${selector}`);
  const block = css.slice(start, css.indexOf("}", start));
  return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map(([, name, value]) => [name, value]));
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((index) => {
    const channel = parseInt(hex.slice(index, index + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground: string, background: string): number {
  const [light, dark] = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

const light = tokens(":root");
const dark = { ...light, ...tokens('[data-theme="dark"]') };

/** [foreground token, background token, minimum ratio] — 4.5 for text, 3 for UI boundaries. */
const pairs: [string, string, number][] = [
  ["text", "page", 4.5],
  ["text", "surface", 4.5],
  ["muted", "page", 4.5],
  ["muted", "surface", 4.5],
  ["link", "page", 4.5],
  ["link", "surface", 4.5],
  ["link", "brand-soft", 4.5],
  ["error", "page", 4.5],
  ["success", "page", 4.5],
  ["control-border", "page", 3],
  ["focus", "page", 3],
];

for (const [themeName, theme] of [["light", light], ["dark", dark]] as const) {
  describe(`${themeName} theme contrast`, () => {
    for (const [foreground, background, minimum] of pairs) {
      it(`${foreground} on ${background} is at least ${minimum}:1`, () => {
        const ratio = contrast(theme[foreground], theme[background]);
        assert.ok(ratio >= minimum, `${theme[foreground]} on ${theme[background]} is ${ratio.toFixed(2)}:1`);
      });
    }
  });
}

describe("brand surfaces (both themes)", () => {
  it("white text on the brand purple and deep purple is at least 4.5:1", () => {
    assert.ok(contrast("#ffffff", light.brand) >= 4.5);
    assert.ok(contrast("#ffffff", light["brand-deep"]) >= 4.5);
  });

  it("brand purple text on white buttons is at least 4.5:1", () => {
    assert.ok(contrast(light.brand, "#ffffff") >= 4.5);
  });

  it("white text on the WhatsApp button colour is at least 4.5:1", () => {
    assert.ok(contrast("#ffffff", "#075e54") >= 4.5);
  });

  it("light-purple links on the dark preview surfaces are at least 4.5:1", () => {
    assert.ok(contrast(light["brand-on-dark"], "#1a1a1a") >= 4.5);
    assert.ok(contrast("#cccccc", "#1a1a1a") >= 4.5);
  });
});
