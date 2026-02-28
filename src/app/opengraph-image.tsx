import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HolaBonjour — Preparación online DELF/DALF";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0b3c6f 0%, #0f5da0 50%, #1b78c2 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.02em",
            }}
          >
            HolaBonjour
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#e8d9a0",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
            }}
          >
            Preparación online DELF / DALF
          </div>
          <div
            style={{
              marginTop: 24,
              display: "flex",
              gap: 16,
            }}
          >
            {["Prueba de nivel", "Clases en directo", "Exámenes oficiales"].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    padding: "8px 20px",
                    borderRadius: 999,
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "#e0efff",
                    fontSize: 18,
                  }}
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 16,
            color: "rgba(255,255,255,0.6)",
          }}
        >
          holabonjour.es
        </div>
      </div>
    ),
    { ...size }
  );
}
