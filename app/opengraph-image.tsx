import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/** Shared Open Graph image (spec 16): the original white logo on the brand purple. */
export const alt = "BizMaster AI Agent: calls, WhatsApp and follow-ups, with your team in control";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logo = await readFile(join(process.cwd(), "public/brand/bizmaster-logo-white.png"));
const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #5d0e8b 0%, #4a0b70 100%)",
          color: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img */}
        <img src={logoSrc} width={399} height={138} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>BizMaster AI Agent</div>
          <div style={{ fontSize: 36, color: "#e6c6ff" }}>Calls, WhatsApp and follow-ups, with your team in control.</div>
        </div>
      </div>
    ),
    size,
  );
}
