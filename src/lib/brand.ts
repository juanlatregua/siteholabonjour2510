/**
 * HBTJ Brand Tokens — Single source of truth for all design constants.
 *
 * Three visual identities unified:
 * 1. Main HolaBonjour (professional, academic)
 * 2. Le Côté Vie (cultural, editorial)
 * 3. HBTJ Dashboard (dark, data-driven)
 */

// ─── Main Brand (derived from logo: bleu #395D9F, rouge #E50046, blanc #FFF) ───
export const brand = {
  bleu:       "#395D9F",
  bleuDark:   "#1e2d4a",
  bleuLight:  "#5a7fbf",
  bleuHover:  "#2e4d8a",
  rouge:      "#E50046",
  rougeLight: "#ff3366",
  rougeHover: "#c7003b",
  blanc:      "#ffffff",
  offWhite:   "#f8fafc",
  cream:      "#faf7f2",
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

// ─── Cinematic (Variante C — light public pages) ───
export const cinematic = {
  bg:         "#faf7f2",
  bgAlt:      "#f0ede6",
  bgCard:     "#ffffff",
  border:     "rgba(30,45,74,0.10)",
  accent:     "#E50046",
  accentLight:"#ff3366",
  text:       "#1e2d4a",
  textBody:   "#3d4a5c",
  textMuted:  "#5f6b78",
  navBg:      "#1e2d4a",
  navText:    "#f1f5f9",
} as const;

// ─── City scenes (Le Voyage) ───
export const scenes = {
  paris:     { bg: "linear-gradient(135deg, #1e2d4a 0%, #253d5e 50%, #1a3a6b 100%)", accent: "#E50046", particleColor: "rgba(229,0,70,0.5)" },
  lyon:      { bg: "linear-gradient(135deg, #2d1b4e 0%, #1e2d4a 50%, #462255 100%)", accent: "#c77dba", particleColor: "rgba(199,125,186,0.5)" },
  bordeaux:  { bg: "linear-gradient(135deg, #1b2838 0%, #1e2d4a 50%, #1b3a4b 100%)", accent: "#6ec6ca", particleColor: "rgba(110,198,202,0.5)" },
  marseille: { bg: "linear-gradient(135deg, #1a2740 0%, #1e2d4a 50%, #324a5f 100%)", accent: "#f0a500", particleColor: "rgba(240,165,0,0.5)" },
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

// ─── Contact ───
export const contact = {
  phone:    "685 070 304",
  email:    "info@holabonjour.es",
  whatsapp: "https://wa.me/34685070304",
} as const;
