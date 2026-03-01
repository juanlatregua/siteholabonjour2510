import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0b3c6f, #0f5da0)",
          borderRadius: 32,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <span style={{ fontSize: 100, fontWeight: 800, color: "#ffffff" }}>H</span>
      </div>
    ),
    { ...size }
  );
}
