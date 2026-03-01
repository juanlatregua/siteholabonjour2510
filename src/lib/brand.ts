/**
 * HBTJ Brand Tokens — Single source of truth for all design constants.
 *
 * Three visual identities unified:
 * 1. Main HolaBonjour (professional, academic)
 * 2. Le Côté Vie (cultural, editorial)
 * 3. HBTJ Dashboard (dark, data-driven)
 */

// ─── Main Brand ───
export const brand = {
  navy:       "#0b3c6f",
  blue:       "#0f5da0",
  blueLight:  "#1b78c2",
  blueHover:  "#0e4f8d",
  gold:       "#c9a84c",
  goldLight:  "#e8d9a0",
  white:      "#ffffff",
  offWhite:   "#f8fafc",
  text:       "#1f2937",
  textLight:  "#475569",
  textMuted:  "#94a3b8",
  border:     "#e2e8f0",
  success:    "#22c55e",
  danger:     "#ef4444",
  warning:    "#f59e0b",
} as const;

// ─── Le Côté Vie ───
export const vie = {
  cream:      "#faf7f2",
  gold:       "#c9a84c",
  goldLight:  "#e8d9a0",
  navy:       "#1a2744",
  wine:       "#722f37",
  sage:       "#7c9a6e",
  bleu:       "#2d5f8a",
  rose:       "#d4a5a5",
} as const;

// ─── HBTJ Dashboard ───
export const dashboard = {
  bg:            "#0C0F1A",
  card:          "#141825",
  cardHover:     "#1A1F30",
  accent1:       "#3B82F6",
  accent2:       "#F59E0B",
  accent3:       "#10B981",
  textPrimary:   "#F1F5F9",
  textSecondary: "#94A3B8",
  textMuted:     "#64748B",
  border:        "#1E293B",
  danger:        "#EF4444",
  success:       "#22C55E",
} as const;

// ─── Cinematic (Le Voyage / marketing) ───
export const cinematic = {
  bg:         "#1a1a2e",
  bgCard:     "rgba(255,255,255,0.06)",
  border:     "rgba(255,255,255,0.10)",
  gold:       "#e8b865",
  goldLight:  "#f0d08a",
  text:       "#f1f5f9",
  textMuted:  "rgba(255,255,255,0.5)",
} as const;

// ─── City scenes (Le Voyage) ───
export const scenes = {
  paris:     { bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)", accent: "#e8b865", particleColor: "rgba(232,184,101,0.6)" },
  lyon:      { bg: "linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 50%, #462255 100%)", accent: "#c77dba", particleColor: "rgba(199,125,186,0.5)" },
  bordeaux:  { bg: "linear-gradient(135deg, #1b2838 0%, #0d1b2a 50%, #1b3a4b 100%)", accent: "#6ec6ca", particleColor: "rgba(110,198,202,0.5)" },
  marseille: { bg: "linear-gradient(135deg, #0c1821 0%, #1b2838 50%, #324a5f 100%)", accent: "#f0a500", particleColor: "rgba(240,165,0,0.5)" },
} as const;

// ─── Font Families ───
export const fonts = {
  display: "'Playfair Display', Georgia, serif",
  body:    "'DM Sans', 'Inter', system-ui, sans-serif",
  heading: "'Space Grotesk', 'DM Sans', system-ui, sans-serif",
  mono:    "'DM Mono', 'Fira Code', monospace",
} as const;

// ─── Logo Paths ───
export const logo = {
  main: "/images/logo-holabonjour-01.svg",
  width: 134,
  height: 48,
} as const;

// ─── Social Links ───
export const social = {
  facebook:  "https://www.facebook.com/holabonjourmalaga/",
  twitter:   "https://twitter.com/Holabonjour_mlg",
  instagram: "https://www.instagram.com/holabonjourmalaga/",
  youtube:   "https://www.youtube.com/channel/UCSqK90F1Tm9iYLpZN0tFIGg",
} as const;

// ─── Contact ───
export const contact = {
  phone:    "685 070 304",
  email:    "hola@holabonjour.es",
  whatsapp: "https://wa.me/34685070304",
} as const;
