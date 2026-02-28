"use client";

import React, { useState } from "react";

const COLORS = {
  bg: "#0C0F1A",
  card: "#141825",
  cardHover: "#1A1F30",
  accent1: "#3B82F6",  // Blue - Traducciones
  accent2: "#F59E0B",  // Amber - HolaBonjour
  accent3: "#10B981",  // Emerald - TraductorJurado.es
  textPrimary: "#F1F5F9",
  textSecondary: "#94A3B8",
  textMuted: "#64748B",
  border: "#1E293B",
  danger: "#EF4444",
  success: "#22C55E",
};

const tabs = [
  { id: "overview", label: "Visión Global", icon: "◉" },
  { id: "market", label: "Mercado", icon: "◈" },
  { id: "traducciones", label: "Traducciones", icon: "◆" },
  { id: "holabonjour", label: "HolaBonjour", icon: "◇" },
  { id: "marketplace", label: "Marketplace", icon: "⬡" },
  { id: "roadmap", label: "Roadmap", icon: "▸" },
];

// ── METRIC CARD ──
function Metric({ label, value, sub, color, small }: { label: string; value: string; sub?: string; color?: string; small?: boolean }) {
  return (
    <div style={{ textAlign: small ? "left" : "center" }}>
      <div style={{ fontSize: small ? 11 : 10, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: small ? 18 : 26, fontWeight: 700, color: color || COLORS.textPrimary, fontFamily: "'DM Mono', monospace" }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: COLORS.textSecondary, marginTop: 1 }}>{sub}</div>}
    </div>
  );
}

// ── CARD WRAPPER ──
function PlanCard({ children, style, accent }: { children: React.ReactNode; style?: React.CSSProperties; accent?: string }) {
  return (
    <div style={{
      background: COLORS.card,
      border: `1px solid ${COLORS.border}`,
      borderRadius: 12,
      padding: 20,
      position: "relative",
      overflow: "hidden",
      ...style,
    }}>
      {accent && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, ${accent}, transparent)`,
        }} />
      )}
      {children}
    </div>
  );
}

// ── SECTION HEADER ──
function SectionHeader({ title, subtitle, color }: { title: string; subtitle?: string; color?: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: COLORS.textPrimary, margin: 0, fontFamily: "'Space Grotesk', sans-serif" }}>
        <span style={{ color: color || COLORS.accent1, marginRight: 8 }}>●</span>{title}
      </h2>
      {subtitle && <p style={{ fontSize: 12, color: COLORS.textSecondary, margin: "4px 0 0 20px" }}>{subtitle}</p>}
    </div>
  );
}

// ── BADGE ──
function PlanBadge({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span style={{
      display: "inline-block", padding: "2px 8px", borderRadius: 4,
      fontSize: 10, fontWeight: 600, color: color, background: `${color}15`,
      border: `1px solid ${color}30`, letterSpacing: "0.04em",
    }}>{children}</span>
  );
}

// ── COMPETITOR ROW ──
function CompRow({ name, type, langs, price, ux, seo, niche }: { name: string; type: string; langs: string; price: string; ux: number; seo: number; niche: number }) {
  const score = (v: number) => {
    const colors: Record<number, string> = { 1: "#EF4444", 2: "#F97316", 3: "#EAB308", 4: "#22C55E", 5: "#10B981" };
    return <span style={{ color: colors[v], fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{v}/5</span>;
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "140px 80px 50px 40px 40px 40px", gap: 8, padding: "8px 0", borderBottom: `1px solid ${COLORS.border}`, alignItems: "center", fontSize: 11 }}>
      <div>
        <div style={{ fontWeight: 600, color: COLORS.textPrimary }}>{name}</div>
        <div style={{ fontSize: 9, color: COLORS.textMuted }}>{type}</div>
      </div>
      <div style={{ color: COLORS.textSecondary }}>{langs}</div>
      <div style={{ color: COLORS.textSecondary }}>{price}</div>
      <div>{score(ux)}</div>
      <div>{score(seo)}</div>
      <div>{score(niche)}</div>
    </div>
  );
}

// ══════════════════════════════════════════
// ── OVERVIEW TAB ──
// ══════════════════════════════════════════
function Overview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Hero */}
      <PlanCard style={{ background: `linear-gradient(135deg, ${COLORS.card}, #1a1040)`, padding: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div style={{ maxWidth: 520 }}>
            <div style={{ fontSize: 10, color: COLORS.accent2, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>HBTJ Consultores Lingüísticos</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, color: COLORS.textPrimary, margin: "0 0 8px 0", lineHeight: 1.2, fontFamily: "'Space Grotesk', sans-serif" }}>
              Tres negocios.<br/>Un ecosistema.
            </h1>
            <p style={{ fontSize: 13, color: COLORS.textSecondary, lineHeight: 1.6, margin: 0 }}>
              Plan estratégico integrado para dominar el mercado de servicios lingüísticos francés-español en España: traducción jurada directa, formación FLE con experiencias inmersivas, y el primer marketplace de traductores jurados.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ textAlign: "center", padding: "12px 16px", background: `${COLORS.accent1}15`, borderRadius: 10, border: `1px solid ${COLORS.accent1}30` }}>
              <div style={{ fontSize: 9, color: COLORS.accent1, textTransform: "uppercase", letterSpacing: "0.1em" }}>Traducciones</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.accent1, fontFamily: "'DM Mono', monospace" }}>●</div>
              <div style={{ fontSize: 9, color: COLORS.textMuted }}>Servicio directo</div>
            </div>
            <div style={{ textAlign: "center", padding: "12px 16px", background: `${COLORS.accent2}15`, borderRadius: 10, border: `1px solid ${COLORS.accent2}30` }}>
              <div style={{ fontSize: 9, color: COLORS.accent2, textTransform: "uppercase", letterSpacing: "0.1em" }}>HolaBonjour</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.accent2, fontFamily: "'DM Mono', monospace" }}>◇</div>
              <div style={{ fontSize: 9, color: COLORS.textMuted }}>Academia FLE</div>
            </div>
            <div style={{ textAlign: "center", padding: "12px 16px", background: `${COLORS.accent3}15`, borderRadius: 10, border: `1px solid ${COLORS.accent3}30` }}>
              <div style={{ fontSize: 9, color: COLORS.accent3, textTransform: "uppercase", letterSpacing: "0.1em" }}>TraductorJurado</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.accent3, fontFamily: "'DM Mono', monospace" }}>⬡</div>
              <div style={{ fontSize: 9, color: COLORS.textMuted }}>Marketplace</div>
            </div>
          </div>
        </div>
      </PlanCard>

      {/* Flywheel Visual */}
      <PlanCard accent={COLORS.accent2}>
        <div style={{ fontSize: 11, color: COLORS.accent2, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12, fontWeight: 600 }}>El Flywheel — Cómo se alimentan mutuamente</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", alignItems: "center", gap: 8 }}>
          {/* TJ.net */}
          <div style={{ background: `${COLORS.accent1}10`, border: `1px solid ${COLORS.accent1}30`, borderRadius: 10, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent1, marginBottom: 6 }}>traduccionesjuradas.net</div>
            <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              Genera tráfico SEO<br/>
              Capta leads francófonos<br/>
              FR + EN + AR + RO directo<br/>
              <span style={{ color: COLORS.accent1, fontWeight: 600 }}>↓ Revenue directo</span>
            </div>
          </div>
          <div style={{ fontSize: 18, color: COLORS.textMuted }}>⟷</div>
          {/* HB */}
          <div style={{ background: `${COLORS.accent2}10`, border: `1px solid ${COLORS.accent2}30`, borderRadius: 10, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent2, marginBottom: 6 }}>HolaBonjour.com</div>
            <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              Ecosistema cultural &quot;Le Côté Vie&quot;<br/>
              Leads por gamificación<br/>
              DELF/DALF + oposiciones<br/>
              <span style={{ color: COLORS.accent2, fontWeight: 600 }}>↓ Suscripciones + cursos</span>
            </div>
          </div>
          <div style={{ fontSize: 18, color: COLORS.textMuted }}>⟷</div>
          {/* MP */}
          <div style={{ background: `${COLORS.accent3}10`, border: `1px solid ${COLORS.accent3}30`, borderRadius: 10, padding: 14, textAlign: "center" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.accent3, marginBottom: 6 }}>TraductorJurado.es</div>
            <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.5 }}>
              Red de 1.200+ traductores<br/>
              Cubre todos los idiomas<br/>
              Comisión 15-20%<br/>
              <span style={{ color: COLORS.accent3, fontWeight: 600 }}>↓ Revenue escalable</span>
            </div>
          </div>
        </div>
        {/* Cross-links */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 12 }}>
          <div style={{ fontSize: 9, color: COLORS.textMuted, textAlign: "center", padding: "6px 8px", background: `${COLORS.bg}80`, borderRadius: 6 }}>
            Cliente pide chino/polaco → deriva al marketplace → comisión
          </div>
          <div style={{ fontSize: 9, color: COLORS.textMuted, textAlign: "center", padding: "6px 8px", background: `${COLORS.bg}80`, borderRadius: 6 }}>
            Alumno necesita tradución DELF → deriva a TJ.net → descuento
          </div>
          <div style={{ fontSize: 9, color: COLORS.textMuted, textAlign: "center", padding: "6px 8px", background: `${COLORS.bg}80`, borderRadius: 6 }}>
            Contenido SEO de TJ.net atrae traductores → se registran en marketplace
          </div>
        </div>
      </PlanCard>

      {/* KPIs target */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "Tráfico orgánico", now: "~500/mes", target: "2.000/mes", color: COLORS.accent1 },
          { label: "Leads/mes", now: "~15", target: "120+", color: COLORS.accent2 },
          { label: "Reseñas Google", now: "19 ★5.0", target: "60+", color: COLORS.success },
          { label: "Idiomas cubiertos", now: "9+AR+RO", target: "11+MP", color: COLORS.accent3 },
        ].map((k, i) => (
          <PlanCard key={i} accent={k.color}>
            <div style={{ fontSize: 9, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>{k.label}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontSize: 11, color: COLORS.textMuted, textDecoration: "line-through" }}>{k.now}</span>
              <span style={{ fontSize: 10, color: COLORS.textMuted }}>→</span>
              <span style={{ fontSize: 18, fontWeight: 800, color: k.color, fontFamily: "'DM Mono', monospace" }}>{k.target}</span>
            </div>
            <div style={{ fontSize: 9, color: COLORS.textMuted, marginTop: 4 }}>Objetivo 6 meses</div>
          </PlanCard>
        ))}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════
// ── MARKET TAB ──
// ══════════════════════════════════════════
function Market() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionHeader title="Análisis de Mercado" subtitle="Traducción jurada + FLE en España — datos reales 2025-2026" color={COLORS.accent1} />

      {/* Market size */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <PlanCard accent={COLORS.accent1}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 12 }}>Mercado Traducción Jurada España</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <Metric label="Traductores MAEC" value="6.132" sub="Registrados julio 2024" color={COLORS.accent1} small />
            <Metric label="Francés" value="1.328" sub="2º idioma más representado" color={COLORS.accent1} small />
            <Metric label="Inglés" value="3.800+" sub="61% del total — saturado" color={COLORS.textMuted} small />
            <Metric label="Árabe" value="65" sub="← TÚ lo cubres directo" color={COLORS.success} small />
          </div>
          <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.6 }}>
            <strong style={{ color: COLORS.textPrimary }}>Insight clave:</strong> Solo 65 traductores jurados de árabe para +880.000 residentes marroquíes. 134 de rumano para +1M de residentes rumanos. <strong style={{ color: COLORS.success }}>Tú ya cubres ambos idiomas directamente a precio inglés/francés.</strong> Esto te convierte en el único servicio que cubre francés + árabe + rumano con precios competitivos — justo los 3 idiomas de mayor demanda en extranjería.
          </div>
        </PlanCard>

        <PlanCard accent={COLORS.accent2}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 12 }}>Mercado FLE en España</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            <Metric label="Centros examen DELF" value="32" sub="En toda España" color={COLORS.accent2} small />
            <Metric label="Alianzas Francesas" value="~15" sub="Principal competidor FLE" color={COLORS.accent2} small />
            <Metric label="Convocatorias/año" value="4" sub="DELF Tout Public" color={COLORS.accent2} small />
            <Metric label="Online puro" value="~3" sub="La Casa del Francés lidera" color={COLORS.accent2} small />
          </div>
          <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.6 }}>
            <strong style={{ color: COLORS.textPrimary }}>Insight clave:</strong> El DELF B2 es requisito para universidades francesas y puntúa en oposiciones. La demanda crece, pero la oferta online especializada es mínima. Nadie combina FLE + experiencia cultural inmersiva + gamificación. HolaBonjour tiene campo abierto.
          </div>
        </PlanCard>
      </div>

      {/* Traductores por idioma */}
      <PlanCard>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 12 }}>Traductores jurados por idioma — distribución y oportunidad</div>
        <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 120, padding: "0 4px" }}>
          {[
            { lang: "EN", count: 3800, color: COLORS.textMuted },
            { lang: "FR", count: 1328, color: COLORS.accent1 },
            { lang: "DE", count: 614, color: COLORS.textSecondary },
            { lang: "RO", count: 134, color: COLORS.accent3 },
            { lang: "IT", count: 83, color: COLORS.textSecondary },
            { lang: "AR", count: 65, color: COLORS.danger },
            { lang: "PL", count: 54, color: COLORS.textMuted },
            { lang: "PT", count: 42, color: COLORS.textMuted },
            { lang: "UK", count: 4, color: COLORS.danger },
          ].map((d, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontSize: 9, color: d.color, fontWeight: 700, fontFamily: "'DM Mono', monospace", marginBottom: 2 }}>{d.count}</div>
              <div style={{
                width: "100%", maxWidth: 40,
                height: `${Math.max((d.count / 3800) * 80, 4)}px`,
                background: `linear-gradient(to top, ${d.color}40, ${d.color})`,
                borderRadius: "3px 3px 0 0",
              }} />
              <div style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 4, fontWeight: 600 }}>{d.lang}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: COLORS.accent1, display: "inline-block" }} />
            <span style={{ color: COLORS.textSecondary }}>Tu especialidad</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: COLORS.danger, display: "inline-block" }} />
            <span style={{ color: COLORS.textSecondary }}>Escasez crítica → oportunidad marketplace</span>
          </div>
        </div>
      </PlanCard>

      {/* Competitor map */}
      <PlanCard>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 14 }}>Mapa competitivo — Traducción jurada online España</div>
        <div style={{ display: "grid", gridTemplateColumns: "140px 80px 50px 40px 40px 40px", gap: 8, padding: "0 0 6px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: 9, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          <div>Competidor</div><div>Idiomas</div><div>Desde</div><div>UX</div><div>SEO</div><div>Nicho</div>
        </div>
        <CompRow name="traduccionesjuradas.net" type="TÚ — Directo" langs="11 idiomas" price="40€" ux={5} seo={2} niche={5} />
        <CompRow name="Ibidem Group" type="Agencia — Barcelona" langs="30+" price="30€" ux={3} seo={5} niche={1} />
        <CompRow name="traductor-jurado.org" type="Agencia — Madrid+BCN" langs="20+" price="30€" ux={3} seo={5} niche={1} />
        <CompRow name="JTI" type="Agencia — Nacional" langs="36" price="—" ux={2} seo={3} niche={1} />
        <CompRow name="CBLingua" type="Agencia — Nacional" langs="15+" price="—" ux={3} seo={3} niche={1} />
        <CompRow name="Tradutema" type="Plataforma online" langs="10+" price="—" ux={4} seo={2} niche={1} />
        <CompRow name="Gramae" type="Agencia — Contenido" langs="15+" price="—" ux={3} seo={4} niche={2} />
        <CompRow name="Juridiomas" type="Agencia — Nacional" langs="20+" price="—" ux={2} seo={2} niche={1} />

        <div style={{ marginTop: 14, padding: 12, background: `${COLORS.accent1}08`, borderRadius: 8, border: `1px solid ${COLORS.accent1}20` }}>
          <div style={{ fontSize: 10, color: COLORS.accent1, fontWeight: 700, marginBottom: 4 }}>Tu ventaja competitiva real</div>
          <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.6 }}>
            <strong style={{ color: COLORS.textPrimary }}>Nadie tiene las 4 cosas:</strong> (1) Traductor jurado directo sin intermediarios, (2) Especialización real en documentos marroquíes, (3) <strong style={{ color: COLORS.success }}>Francés + Árabe + Rumano a precio competitivo</strong> — los 3 idiomas clave en extranjería, cubiertos directamente, (4) Capacidad técnica para herramientas digitales que las agencias no pueden construir.
          </div>
        </div>
      </PlanCard>

      {/* Pricing comparison */}
      <PlanCard accent={COLORS.success}>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 12 }}>Comparativa de precios del mercado</div>
        <div style={{ display: "grid", gridTemplateColumns: "180px repeat(3, 1fr)", gap: 8, fontSize: 10 }}>
          <div style={{ color: COLORS.textMuted, fontWeight: 600 }}>Documento</div>
          <div style={{ color: COLORS.accent1, fontWeight: 600, textAlign: "center" }}>TÚ</div>
          <div style={{ color: COLORS.textMuted, fontWeight: 600, textAlign: "center" }}>Agencias</div>
          <div style={{ color: COLORS.textMuted, fontWeight: 600, textAlign: "center" }}>Ahorro</div>
          {[
            { doc: "Certificado nacimiento (FR)", tu: "42€", ag: "45-65€", save: "~30%" },
            { doc: "Certificado nacimiento (AR)", tu: "42€", ag: "55-80€", save: "~40%" },
            { doc: "Certificado nacimiento (RO)", tu: "42€", ag: "50-75€", save: "~35%" },
            { doc: "Antecedentes penales", tu: "45€", ag: "50-70€", save: "~25%" },
            { doc: "Contrato de trabajo", tu: "55€", ag: "65-90€", save: "~30%" },
            { doc: "Paquete teletrabajo (10 docs)", tu: "~450€", ag: "600-900€", save: "~40%" },
          ].map((r, i) => (
            <React.Fragment key={i}>
              <div style={{ color: COLORS.textSecondary, padding: "4px 0", borderTop: `1px solid ${COLORS.border}` }}>{r.doc}</div>
              <div style={{ color: COLORS.success, fontWeight: 700, textAlign: "center", padding: "4px 0", borderTop: `1px solid ${COLORS.border}`, fontFamily: "'DM Mono', monospace" }}>{r.tu}</div>
              <div style={{ color: COLORS.textMuted, textAlign: "center", padding: "4px 0", borderTop: `1px solid ${COLORS.border}` }}>{r.ag}</div>
              <div style={{ color: COLORS.success, fontWeight: 700, textAlign: "center", padding: "4px 0", borderTop: `1px solid ${COLORS.border}` }}>{r.save}</div>
            </React.Fragment>
          ))}
        </div>
      </PlanCard>
    </div>
  );
}

// ══════════════════════════════════════════
// ── TRADUCCIONES TAB ──
// ══════════════════════════════════════════
function Traducciones() {
  const [showContent, setShowContent] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionHeader title="traduccionesjuradas.net — Plan de Acción" subtitle="3 ejes: contenido de nicho, herramientas digitales, comunidad" color={COLORS.accent1} />

      {/* 3 Axes */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {[
          { num: "01", title: "Contenido de Nicho", desc: "15 páginas long-tail que nadie más puede escribir", items: ["Guía documentos Marruecos", "Teletrabajo Marruecos→España", "Precios 2026 (transparencia)", "Página en FRANCÉS", "Página en ÁRABE", "Apostilla Marruecos", "Oposiciones Andalucía", "Herencias Francia-España"], color: COLORS.accent1 },
          { num: "02", title: "Herramientas Killer", desc: "Funcionalidades que ningún competidor puede replicar", items: ["Estimador IA (sube doc → precio 10s)", "Tracker de pedidos (tipo Amazon)", "Checklist por trámite × país", "Calculadora paquete completo", "PDF descargable (lead magnet)"], color: COLORS.accent2 },
          { num: "03", title: "Comunidad Francófona", desc: "Ser EL referente para +1M francófonos en España", items: ["Grupos Facebook marroquíes", "Alianzas 5-10 gestorías Málaga", "Newsletter mensual clientes", "Google Business → 60 reseñas", "Contenido redes 2-3/semana", "Referral con HolaBonjour"], color: COLORS.accent3 },
        ].map((axis, i) => (
          <PlanCard key={i} accent={axis.color}>
            <div style={{ fontSize: 32, fontWeight: 800, color: `${axis.color}30`, fontFamily: "'DM Mono', monospace", lineHeight: 1 }}>{axis.num}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.textPrimary, margin: "6px 0 2px" }}>{axis.title}</div>
            <div style={{ fontSize: 10, color: COLORS.textSecondary, marginBottom: 10 }}>{axis.desc}</div>
            {axis.items.map((item, j) => (
              <div key={j} style={{ fontSize: 10, color: COLORS.textSecondary, padding: "3px 0", borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: axis.color, fontSize: 8 }}>▸</span>{item}
              </div>
            ))}
          </PlanCard>
        ))}
      </div>

      {/* Content pages detail */}
      <PlanCard>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: showContent ? 14 : 0 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textPrimary }}>15 Páginas de Contenido — Detalle</div>
            <div style={{ fontSize: 10, color: COLORS.textSecondary }}>Ordenadas por impacto SEO × esfuerzo</div>
          </div>
          <button onClick={() => setShowContent(!showContent)} style={{ background: `${COLORS.accent1}20`, border: `1px solid ${COLORS.accent1}40`, color: COLORS.accent1, padding: "4px 12px", borderRadius: 6, fontSize: 10, cursor: "pointer" }}>
            {showContent ? "Colapsar" : "Expandir detalle"}
          </button>
        </div>
        {showContent && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { pri: "P1", url: "/guia-documentos-marruecos-espana", title: "Guía documentos marroquíes", kw: "traducción jurada Marruecos España", words: "2.500+", diff: "ÚNICA en el mercado" },
              { pri: "P1", url: "/teletrabajo-marruecos-espana", title: "Teletrabajo Marruecos→España", kw: "visa nómada digital Marruecos", words: "2.000+", diff: "Checklist descargable" },
              { pri: "P1", url: "/precios-traduccion-jurada", title: "Precios transparentes 2026", kw: "precio traducción jurada", words: "2.000+", diff: "Nadie es transparente" },
              { pri: "P1", url: "/traduction-assermentee-espagne", title: "Guide en FRANÇAIS", kw: "traduction assermentée espagnol", words: "1.500+", diff: "Capta Google.fr/.ma/.be" },
              { pri: "P2", url: "/apostilla-documentos-marruecos", title: "Apostilla Marruecos", kw: "apostilla Haya Marruecos", words: "1.500+", diff: "Haya desde 2016" },
              { pri: "P2", url: "/traduccion-jurada-oposiciones-andalucia", title: "Oposiciones Andalucía", kw: "traducción jurada oposiciones", words: "1.200+", diff: "Nicho geográfico 0 comp." },
              { pri: "P2", url: "/traduccion-jurada-titulos-universitarios", title: "Títulos universitarios", kw: "homologación título España", words: "1.500+", diff: "Proceso NARIC/ENIC" },
              { pri: "P2", url: "/traduccion-jurada-herencias-francia-espana", title: "Herencias Francia-España", kw: "herencia Francia traductor", words: "1.200+", diff: "Ultra-nicho notarial" },
              { pri: "P3", url: "/que-es-traductor-jurado", title: "¿Qué es un traductor jurado?", kw: "qué es traductor jurado", words: "1.500+", diff: "Evergreen" },
              { pri: "P3", url: "/guia-traduccion-jurada-arabe", title: "Guía en ÁRABE", kw: "—", words: "1.000+", diff: "NUCLEAR: nadie lo hace" },
            ].map((p, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "30px 240px 1fr 60px 1fr", gap: 8, alignItems: "center", fontSize: 10, padding: "6px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <PlanBadge color={p.pri === "P1" ? COLORS.danger : p.pri === "P2" ? COLORS.accent2 : COLORS.accent3}>{p.pri}</PlanBadge>
                <div>
                  <div style={{ color: COLORS.textPrimary, fontWeight: 600 }}>{p.title}</div>
                  <div style={{ fontSize: 9, color: COLORS.textMuted, fontFamily: "'DM Mono', monospace" }}>{p.url}</div>
                </div>
                <div style={{ color: COLORS.textSecondary, fontSize: 9 }}>{p.kw}</div>
                <div style={{ color: COLORS.textMuted, fontSize: 9 }}>{p.words}</div>
                <div><PlanBadge color={COLORS.success}>{p.diff}</PlanBadge></div>
              </div>
            ))}
          </div>
        )}
      </PlanCard>

      {/* Tools detail */}
      <PlanCard accent={COLORS.accent2}>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 14 }}>Herramientas Digitales — Specs</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {[
            { name: "Estimador IA", desc: "Sube PDF/foto → Claude API identifica tipo, idioma, páginas → precio + plazo en 10 segundos", tech: "Next.js + Claude API + OCR", impact: "WOW factor", impactColor: COLORS.danger },
            { name: "Tracker Pedidos", desc: "Timeline visual: Recibido → Traducción → Revisión → Firmado → Entregado. Link único sin login.", tech: "Next.js + Supabase + Email", impact: "Reduce llamadas 80%", impactColor: COLORS.success },
            { name: "Checklist Trámite", desc: "Wizard: ¿Qué trámite? + ¿Qué país? → Lista docs con precios + total + PDF descargable", tech: "Next.js + JSON datos", impact: "Lead magnet #1", impactColor: COLORS.accent2 },
          ].map((t, i) => (
            <div key={i} style={{ background: COLORS.bg, borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.5, marginBottom: 8 }}>{t.desc}</div>
              <div style={{ fontSize: 9, color: COLORS.textMuted, marginBottom: 6 }}>{t.tech}</div>
              <PlanBadge color={t.impactColor}>{t.impact}</PlanBadge>
            </div>
          ))}
        </div>
      </PlanCard>
    </div>
  );
}

// ══════════════════════════════════════════
// ── HOLABONJOUR TAB ──
// ══════════════════════════════════════════
function HolaBonjourTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionHeader title="HolaBonjour — Le Côté Vie" subtitle="Ecosistema cultural gamificado que transforma visitantes en alumnos" color={COLORS.accent2} />

      {/* Dual architecture */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <PlanCard style={{ borderLeft: `3px solid ${COLORS.accent1}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent1, marginBottom: 8 }}>Le Côté Pro</div>
          <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.6 }}>
            Lo que paga las facturas. Cursos DELF/DALF, preparación oposiciones, francés empresas, clases online. Profesores nativos Master FLE/DAEFLE, examinadores oficiales. Conversión directa → matrícula.
          </div>
        </PlanCard>
        <PlanCard style={{ borderLeft: `3px solid ${COLORS.accent2}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent2, marginBottom: 8 }}>Le Côté Vie</div>
          <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.6 }}>
            Lo que atrae. Espacio cultural gratuito: quizzes, cine, recetas, juegos, mapa interactivo. El usuario viene por la cultura, se queda por la comunidad, se matricula por la confianza. Leads indirectos masivos.
          </div>
        </PlanCard>
      </div>

      {/* 6 pieces */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
        {[
          { icon: "🧀", name: "Le Marché", desc: "Quiz cultural semanal — 5 preguntas, ranking, 8 temas", seo: "quiz cultura francesa", freq: "Lunes", funnel: "Email para ranking → curso" },
          { icon: "🗺️", name: "La Carte", desc: "Mapa SVG 13 regiones — pasaporte virtual gamificado", seo: "13 URLs indexables", freq: "Continuo", funnel: "5 regiones → clase prueba" },
          { icon: "🎬", name: "Le Cinéma", desc: "20 películas A2→C1 con fichas didácticas completas", seo: "películas francés por nivel", freq: "Miércoles", funnel: "Sin subtítulos → curso" },
          { icon: "🥐", name: "La Cuisine", desc: "Recetas EN FRANCÉS × 3 niveles — toggle interactivo", seo: "recetas francesas fáciles", freq: "Viernes", funnel: "PDF receta → newsletter" },
          { icon: "💬", name: "Le Mot du Jour", desc: "60 expresiones idiomáticas — widget + newsletter diaria", seo: "expresiones francesas", freq: "Diario 8AM", funnel: "Contacto diario → test" },
          { icon: "🔐", name: "Le Jeu", desc: "Escape room lingüístico — 4 escenarios A2→C1", seo: "juego aprender francés", freq: "Mensual", funnel: "Certificado → compartir → viral" },
        ].map((piece, i) => (
          <PlanCard key={i} accent={COLORS.accent2}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>{piece.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 4 }}>{piece.name}</div>
            <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.5, marginBottom: 8 }}>{piece.desc}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{ fontSize: 9, color: COLORS.textMuted }}>SEO: <span style={{ color: COLORS.accent2 }}>{piece.seo}</span></div>
              <div style={{ fontSize: 9, color: COLORS.textMuted }}>Frecuencia: <span style={{ color: COLORS.textPrimary }}>{piece.freq}</span></div>
              <div style={{ fontSize: 9, color: COLORS.textMuted }}>Funnel: <span style={{ color: COLORS.success }}>{piece.funnel}</span></div>
            </div>
          </PlanCard>
        ))}
      </div>

      {/* Le Voyage */}
      <PlanCard style={{ background: `linear-gradient(135deg, #1a1040, ${COLORS.card})` }}>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <PlanBadge color={COLORS.accent2}>PIEZA ESTRELLA</PlanBadge>
            <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.textPrimary, margin: "8px 0 4px", fontFamily: "'Space Grotesk', sans-serif" }}>Le Voyage — Test de Nivel Inmersivo</div>
            <div style={{ fontSize: 10, color: COLORS.textSecondary, lineHeight: 1.6, marginBottom: 10 }}>
              El test de nivel no es un formulario. Es un viaje cinematográfico por Francia en 4 actos: intro oscura con partículas de luz → pasaporte (lead capture natural) → 4 ciudades con atmósferas de color únicas (París oro, Lyon violeta, Bordeaux turquesa, Marseille ámbar) → sello de pasaporte animado como resultado.
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <PlanBadge color={COLORS.accent2}>Ninguna academia FLE lo tiene</PlanBadge>
              <PlanBadge color={COLORS.success}>Lead capture natural</PlanBadge>
              <PlanBadge color={COLORS.accent1}>Resultado compartible</PlanBadge>
              <PlanBadge color={COLORS.danger}>Ya prototipado en React</PlanBadge>
            </div>
          </div>
          <div style={{ width: 120, height: 120, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.accent2}40, transparent)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, flexShrink: 0 }}>
            ✈️
          </div>
        </div>
      </PlanCard>
    </div>
  );
}

// ══════════════════════════════════════════
// ── MARKETPLACE TAB ──
// ══════════════════════════════════════════
function MarketplaceTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionHeader title="TraductorJurado.es — Marketplace" subtitle="El LinkedIn de los traductores jurados en España" color={COLORS.accent3} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <PlanCard accent={COLORS.accent3}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 10 }}>Modelo de Negocio</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { label: "Mercado objetivo", value: "6.132 traductores MAEC + clientes" },
              { label: "Comisión", value: "15-20% (vs 30-50% agencias)" },
              { label: "Diferenciador", value: "Reputación verificable + sin intermediarios" },
              { label: "Tech stack", value: "Next.js, PostgreSQL, Prisma, Stripe" },
              { label: "Competencia directa", value: "Proz.com (obsoleto, genérico, global)" },
              { label: "Ventaja sobre Proz", value: "España-only, nicho jurado, UX moderna" },
            ].map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 10, padding: "4px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <span style={{ color: COLORS.textMuted }}>{r.label}</span>
                <span style={{ color: COLORS.textPrimary, fontWeight: 600, textAlign: "right", maxWidth: "55%" }}>{r.value}</span>
              </div>
            ))}
          </div>
        </PlanCard>

        <PlanCard accent={COLORS.accent3}>
          <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 10 }}>Revenue Model</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { stream: "Comisión por pedido", pct: "70%", desc: "15-20% sobre cada traducción gestionada" },
              { stream: "Perfil premium traductor", pct: "15%", desc: "€9.99/mes — destacado, estadísticas, badge verificado" },
              { stream: "Leads derivados TJ.net", pct: "10%", desc: "Idiomas no cubiertos → marketplace → comisión" },
              { stream: "Verificación acelerada", pct: "5%", desc: "Verificación MAEC express — €29.99 one-time" },
            ].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.accent3, fontFamily: "'DM Mono', monospace", minWidth: 36 }}>{s.pct}</div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: COLORS.textPrimary }}>{s.stream}</div>
                  <div style={{ fontSize: 9, color: COLORS.textMuted }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </PlanCard>
      </div>

      {/* Idiomas opportunity */}
      <PlanCard>
        <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textPrimary, marginBottom: 12 }}>Oportunidad por idioma — Demanda vs Oferta</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {[
            { lang: "Árabe", demand: "ALTA", supply: "65 traductores", gap: "TÚ LO CUBRES", color: COLORS.success },
            { lang: "Rumano", demand: "ALTA", supply: "134 traductores", gap: "TÚ LO CUBRES", color: COLORS.success },
            { lang: "Chino", demand: "MEDIA", supply: "~20 traductores", gap: "ALTA", color: COLORS.accent2 },
            { lang: "Ucraniano", demand: "CRECIENTE", supply: "4 traductores", gap: "EXTREMA", color: COLORS.danger },
            { lang: "Ruso", demand: "MEDIA", supply: "~30 traductores", gap: "MEDIA", color: COLORS.accent2 },
            { lang: "Polaco", demand: "MEDIA", supply: "54 traductores", gap: "MEDIA", color: COLORS.accent2 },
            { lang: "Francés", demand: "ALTA", supply: "1.328 traductores", gap: "BAJA", color: COLORS.success },
            { lang: "Inglés", demand: "MUY ALTA", supply: "3.800+ traductores", gap: "BAJA", color: COLORS.success },
          ].map((l, i) => (
            <div key={i} style={{ background: COLORS.bg, borderRadius: 6, padding: 8, borderLeft: `2px solid ${l.color}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.textPrimary }}>{l.lang}</div>
              <div style={{ fontSize: 9, color: COLORS.textMuted, marginTop: 2 }}>{l.supply}</div>
              <div style={{ fontSize: 9, color: l.color, fontWeight: 600, marginTop: 2 }}>Gap: {l.gap}</div>
            </div>
          ))}
        </div>
      </PlanCard>
    </div>
  );
}

// ══════════════════════════════════════════
// ── ROADMAP TAB ──
// ══════════════════════════════════════════
function RoadmapTab() {
  const phases = [
    {
      phase: "FASE 1", title: "Fundamentos", weeks: "Semanas 1-4", color: COLORS.accent1,
      items: [
        { biz: "TJ", task: "Guía documentos Marruecos (2.500 palabras)", type: "Contenido" },
        { biz: "TJ", task: "Página precios 2026 ampliada", type: "Contenido" },
        { biz: "TJ", task: "Página en francés (traduction assermentée)", type: "Contenido" },
        { biz: "TJ", task: "Ampliar teletrabajo + checklist PDF", type: "Contenido" },
        { biz: "HB", task: "Le Mot du Jour — widget + newsletter Resend", type: "Dev" },
        { biz: "HB", task: "Le Marché — quiz semana 1 (8 temas, 40 preguntas)", type: "Dev" },
        { biz: "MP", task: "Landing page + formulario registro traductores", type: "Dev" },
      ]
    },
    {
      phase: "FASE 2", title: "Herramientas", weeks: "Semanas 5-8", color: COLORS.accent2,
      items: [
        { biz: "TJ", task: "Checklist interactivo por trámite × país", type: "Dev" },
        { biz: "TJ", task: "Tracker de pedidos (admin + cliente)", type: "Dev" },
        { biz: "TJ", task: "4 páginas más: apostilla, oposiciones, herencias, títulos", type: "Contenido" },
        { biz: "HB", task: "Le Cinéma — 10 películas con fichas didácticas", type: "Dev" },
        { biz: "HB", task: "La Cuisine — 4 recetas × 3 niveles", type: "Dev" },
        { biz: "MP", task: "Perfiles traductor + búsqueda por idioma/provincia", type: "Dev" },
      ]
    },
    {
      phase: "FASE 3", title: "Escala", weeks: "Semanas 9-12", color: COLORS.accent3,
      items: [
        { biz: "TJ", task: "Estimador IA (v1 con Claude API)", type: "Dev" },
        { biz: "TJ", task: "Contactar 5-10 gestorías Málaga", type: "Comunidad" },
        { biz: "TJ", task: "Página en árabe + publicar en 3 grupos Facebook", type: "Contenido" },
        { biz: "TJ", task: "Google Business → campaña reseñas", type: "Comunidad" },
        { biz: "HB", task: "La Carte — 6 regiones + pasaporte virtual", type: "Dev" },
        { biz: "HB", task: "Le Jeu — escape room A2 (metro París)", type: "Dev" },
        { biz: "MP", task: "Página /otros-idiomas en TJ.net → puente marketplace", type: "Dev" },
        { biz: "MP", task: "Stripe Connect para pagos + comisión automática", type: "Dev" },
      ]
    }
  ];

  const bizColors: Record<string, string> = { TJ: COLORS.accent1, HB: COLORS.accent2, MP: COLORS.accent3 };
  const bizLabels: Record<string, string> = { TJ: "Traducciones", HB: "HolaBonjour", MP: "Marketplace" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionHeader title="Roadmap de Implementación" subtitle="12 semanas — 3 fases — los 3 negocios en paralelo" color={COLORS.textPrimary} />

      {phases.map((phase, pi) => (
        <PlanCard key={pi} accent={phase.color}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div>
              <span style={{ fontSize: 10, fontWeight: 800, color: phase.color, letterSpacing: "0.1em" }}>{phase.phase}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: COLORS.textPrimary, marginLeft: 8 }}>{phase.title}</span>
            </div>
            <PlanBadge color={phase.color}>{phase.weeks}</PlanBadge>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {phase.items.map((item, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "90px 1fr 70px", gap: 8, alignItems: "center", padding: "5px 0", borderBottom: `1px solid ${COLORS.border}` }}>
                <PlanBadge color={bizColors[item.biz]}>{bizLabels[item.biz]}</PlanBadge>
                <span style={{ fontSize: 10, color: COLORS.textSecondary }}>{item.task}</span>
                <span style={{ fontSize: 9, color: COLORS.textMuted, textAlign: "right" }}>{item.type}</span>
              </div>
            ))}
          </div>
        </PlanCard>
      ))}

      {/* What NOT to do */}
      <PlanCard style={{ borderLeft: `3px solid ${COLORS.danger}` }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.danger, marginBottom: 8 }}>Lo que NO hacer</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 10, color: COLORS.textSecondary }}>
          {[
            "No competir por 'traducción jurada online' — keyword imposible sin presupuesto",
            "No crear contenido genérico tipo 'qué es traducción jurada' × 10 variaciones",
            "No invertir en Google Ads antes de tener contenido que convierta",
            "No intentar cubrir 30 idiomas — ser el mejor en francés, derivar el resto",
            "No copiar la estética genérica WordPress de los competidores",
            "No publicar en redes sin estrategia — solo contenido que derive a las guías",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
              <span style={{ color: COLORS.danger, flexShrink: 0 }}>✕</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </PlanCard>
    </div>
  );
}

// ══════════════════════════════════════════
// ── MAIN COMPONENT ──
// ══════════════════════════════════════════
export default function HBTJMasterPlan() {
  const [activeTab, setActiveTab] = useState("overview");

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <Overview />;
      case "market": return <Market />;
      case "traducciones": return <Traducciones />;
      case "holabonjour": return <HolaBonjourTab />;
      case "marketplace": return <MarketplaceTab />;
      case "roadmap": return <RoadmapTab />;
      default: return <Overview />;
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', -apple-system, sans-serif", background: COLORS.bg, minHeight: "100vh", color: COLORS.textPrimary }}>
      {/* Top bar */}
      <div style={{ borderBottom: `1px solid ${COLORS.border}`, padding: "10px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: `${COLORS.card}cc`, backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: `linear-gradient(135deg, ${COLORS.accent1}, ${COLORS.accent2})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff" }}>H</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textPrimary, letterSpacing: "-0.02em" }}>HBTJ Master Plan</div>
            <div style={{ fontSize: 9, color: COLORS.textMuted }}>Plan Estratégico Integrado — Feb 2026</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? `${COLORS.accent1}20` : "transparent",
                border: activeTab === tab.id ? `1px solid ${COLORS.accent1}40` : "1px solid transparent",
                color: activeTab === tab.id ? COLORS.accent1 : COLORS.textMuted,
                padding: "6px 12px",
                borderRadius: 6,
                fontSize: 11,
                cursor: "pointer",
                fontWeight: activeTab === tab.id ? 700 : 400,
                transition: "all 0.15s ease",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span style={{ fontSize: 10 }}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 20px 60px" }}>
        {renderContent()}
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${COLORS.border}`, padding: "12px 24px", textAlign: "center", fontSize: 9, color: COLORS.textMuted }}>
        HBTJ Consultores Lingüísticos S.L. — Málaga — Juan A. Silva Moreno, Traductor Jurado nº 3850 MAEC — Febrero 2026
      </div>
    </div>
  );
}
