import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — building things, thinking about everything`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#F7F5F0", color: "#20211F" }}>
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 6, color: "#6B6A63" }}>HASAN BUSALIH · MELBOURNE</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, lineHeight: 1.02, letterSpacing: -2 }}>
          <span>Building things.</span>
          <span style={{ color: "#777B59" }}>Thinking about everything.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", borderTop: "2px solid #DFDDD5", paddingTop: 24, fontSize: 24, color: "#6B6A63" }}>
          <span>Projects · Writing · Notes</span>
          <span>An engineer in progress</span>
        </div>
      </div>
    ),
    size,
  );
}
