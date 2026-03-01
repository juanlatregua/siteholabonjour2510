import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HolaBonjour — Aprende francés. Vive en francés.";
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
          background: "linear-gradient(135deg, #1a1a2e 0%, #1a1028 50%, #1a1a2e 100%)",
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
              color: "#e8b865",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase" as const,
            }}
          >
            Aprende franc&eacute;s. Vive en franc&eacute;s.
          </div>
          <div
            style={{
              marginTop: 24,
              display: "flex",
              gap: 16,
            }}
          >
            {["Test de nivel", "Profesores nativos", "Método inmersivo"].map(
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
