"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import CorrectionInput from "./CorrectionInput";
import CorrectionResult from "./CorrectionResult";
import type { CEFRLevel } from "@/lib/correction/rubrics";

/* ─── Types ─── */

interface CorrectionData {
  globalScore: number;
  maxScore: number;
  criterionScores: Record<string, { score: number; max: number; comment: string }>;
  annotations: Array<{
    start: number;
    end: number;
    type: string;
    original: string;
    correction: string;
    explanation: string;
  }>;
  correctedText: string;
  overallFeedback: string;
  estimatedLevel: string;
  nextSteps: string[];
  wordCount: number;
  level: string;
  taskType: string;
  id: string;
}

interface QuotaData {
  canSubmit: boolean;
  freeRemaining: number;
  paidRemaining: number;
  hasActivePack: boolean;
}

/* ─── Example data ─── */

const EXAMPLE_TEXT = `Je suis allé en vacances à la plage avec ma famille. Nous avons resté dans un hôtel près de la mer. Le temps était très bien et nous avons profité beaucoup. Je pense que les vacances sont importants pour se reposer.`;

const EXAMPLE_ERRORS = [
  { start: 62, end: 77, word: "avons resté", fix: "sommes restés", type: "Grammaire", explanation: "Avec les verbes de mouvement et 'rester', on utilise l'auxiliaire 'être' au passé composé, pas 'avoir'. De plus, le participe passé s'accorde avec le sujet 'nous'." },
  { start: 119, end: 128, word: "très bien", fix: "très beau", type: "Lexique", explanation: "'Le temps' (météo) se décrit avec 'beau/mauvais', pas 'bien'. 'Bien' est un adverbe qui modifie des verbes, pas des noms." },
  { start: 145, end: 162, word: "profité beaucoup", fix: "beaucoup profité", type: "Syntaxe", explanation: "En français, l'adverbe 'beaucoup' se place avant le participe passé dans les temps composés : 'nous avons beaucoup profité'." },
  { start: 196, end: 206, word: "importants", fix: "importantes", type: "Grammaire", explanation: "'Vacances' est un nom féminin pluriel. L'adjectif doit s'accorder en genre et en nombre : 'importantes'." },
];

const EXAMPLE_SCORES = [
  { label: "Respeto a la consigna", score: 2.5, max: 3 },
  { label: "Cohesión y coherencia", score: 2, max: 3 },
  { label: "Competencia léxica", score: 1.5, max: 3 },
  { label: "Competencia gramatical", score: 1.5, max: 3 },
];

/* ─── Shared styles ─── */

const sectionTitle: React.CSSProperties = {
  fontSize: "clamp(1.3rem, 3vw, 1.7rem)",
  fontWeight: 800,
  color: "#1e2d4a",
  textAlign: "center",
  marginBottom: "0.5rem",
  lineHeight: 1.25,
};

const sectionSubtitle: React.CSSProperties = {
  fontSize: "0.95rem",
  color: "#3d4a5c",
  textAlign: "center",
  maxWidth: 640,
  margin: "0 auto 2rem",
  lineHeight: 1.6,
};

/* ─── Example section sub-component ─── */

function ExampleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setRevealedCount(i);
      if (i >= EXAMPLE_ERRORS.length) clearInterval(timer);
    }, 600);
    return () => clearInterval(timer);
  }, [visible]);

  // Build annotated text with progressive reveal
  function renderAnnotatedExample() {
    const parts: React.ReactNode[] = [];
    let cursor = 0;

    EXAMPLE_ERRORS.forEach((err, idx) => {
      // Text before error
      if (cursor < err.start) {
        parts.push(<span key={`t${idx}`}>{EXAMPLE_TEXT.slice(cursor, err.start)}</span>);
      }
      const isRevealed = idx < revealedCount;
      parts.push(
        <span
          key={`e${idx}`}
          style={{
            background: isRevealed ? "rgba(239,68,68,0.12)" : "transparent",
            borderBottom: isRevealed ? "2px solid #ef4444" : "none",
            transition: "all 0.5s ease",
            position: "relative",
          }}
          title={isRevealed ? `${err.type}: ${err.word} → ${err.fix}` : undefined}
        >
          {err.word}
        </span>
      );
      cursor = err.start + err.word.length;
    });
    if (cursor < EXAMPLE_TEXT.length) {
      parts.push(<span key="end">{EXAMPLE_TEXT.slice(cursor)}</span>);
    }
    return parts;
  }

  const totalScore = EXAMPLE_SCORES.reduce((a, s) => a + s.score, 0);
  const totalMax = EXAMPLE_SCORES.reduce((a, s) => a + s.max, 0);

  return (
    <div ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT — Texto del alumno */}
        <div style={{ background: "#ffffff", border: "1px solid rgba(30,45,74,0.08)", borderRadius: "1rem", padding: "1.5rem" }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#E50046", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
            Texto del alumno (B1)
          </p>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#1e2d4a", fontStyle: "italic" }}>
            {renderAnnotatedExample()}
          </p>
          {/* Error annotations */}
          <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {EXAMPLE_ERRORS.map((err, idx) => (
              <div
                key={idx}
                style={{
                  opacity: idx < revealedCount ? 1 : 0,
                  transform: idx < revealedCount ? "translateY(0)" : "translateY(8px)",
                  transition: "all 0.4s ease",
                  padding: "0.6rem 0.75rem",
                  background: "rgba(239,68,68,0.04)",
                  borderRadius: "0.5rem",
                  borderLeft: "3px solid #ef4444",
                  fontSize: "0.8rem",
                }}
              >
                <span style={{ fontWeight: 700, color: "#ef4444" }}>{err.type}:</span>{" "}
                <span style={{ textDecoration: "line-through", color: "#5f6b78" }}>{err.word}</span>{" "}
                <span style={{ color: "#1e2d4a", fontWeight: 600 }}>{err.fix}</span>
                <p style={{ color: "#3d4a5c", marginTop: "0.2rem", lineHeight: 1.4 }}>{err.explanation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Resultado */}
        <div style={{ background: "#ffffff", border: "1px solid rgba(30,45,74,0.08)", borderRadius: "1rem", padding: "1.5rem" }}>
          <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#395D9F", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
            Resultado de la corrección
          </p>

          {/* Score table */}
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", marginBottom: "1rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid rgba(30,45,74,0.1)" }}>
                <th style={{ textAlign: "left", padding: "0.5rem 0", color: "#5f6b78", fontWeight: 600 }}>Criterio</th>
                <th style={{ textAlign: "center", padding: "0.5rem 0", color: "#5f6b78", fontWeight: 600, width: 70 }}>Nota</th>
                <th style={{ textAlign: "center", padding: "0.5rem 0", color: "#5f6b78", fontWeight: 600, width: 70 }}>Máx.</th>
              </tr>
            </thead>
            <tbody>
              {EXAMPLE_SCORES.map((row) => {
                const pct = row.score / row.max;
                const color = pct >= 0.7 ? "#10b981" : pct >= 0.5 ? "#f59e0b" : "#ef4444";
                return (
                  <tr key={row.label} style={{ borderBottom: "1px solid rgba(30,45,74,0.06)" }}>
                    <td style={{ padding: "0.5rem 0", color: "#1e2d4a" }}>{row.label}</td>
                    <td style={{ textAlign: "center", padding: "0.5rem 0", fontWeight: 700, color }}>{row.score}</td>
                    <td style={{ textAlign: "center", padding: "0.5rem 0", color: "#5f6b78" }}>{row.max}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr style={{ borderTop: "2px solid rgba(30,45,74,0.15)" }}>
                <td style={{ padding: "0.6rem 0", fontWeight: 800, color: "#1e2d4a" }}>TOTAL</td>
                <td style={{ textAlign: "center", padding: "0.6rem 0", fontWeight: 800, color: "#1e2d4a" }}>{totalScore}</td>
                <td style={{ textAlign: "center", padding: "0.6rem 0", fontWeight: 800, color: "#5f6b78" }}>{totalMax}</td>
              </tr>
            </tfoot>
          </table>

          {/* Badges */}
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <span style={{ display: "inline-block", padding: "0.3rem 0.75rem", borderRadius: "2rem", fontSize: "0.8rem", fontWeight: 700, background: "rgba(57,93,159,0.1)", color: "#395D9F" }}>
              Nivel estimado: B1
            </span>
            <span style={{ display: "inline-block", padding: "0.3rem 0.75rem", borderRadius: "2rem", fontSize: "0.8rem", fontWeight: 700, background: "rgba(239,68,68,0.08)", color: "#ef4444" }}>
              Por debajo del mínimo para aprobar (10/25)
            </span>
          </div>

          {/* Feedback preview */}
          <div style={{ background: "rgba(57,93,159,0.05)", borderRadius: "0.75rem", padding: "1rem", marginBottom: "1rem" }}>
            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#395D9F", marginBottom: "0.4rem" }}>Feedback general</p>
            <p style={{ fontSize: "0.85rem", color: "#3d4a5c", lineHeight: 1.6 }}>
              <strong>Puntos fuertes:</strong> Buen uso del passé composé y estructura básica del relato.
              Vocabulario adecuado para el tema.
            </p>
            <p style={{ fontSize: "0.85rem", color: "#3d4a5c", lineHeight: 1.6, marginTop: "0.4rem" }}>
              <strong>A mejorar:</strong> Auxiliar être/avoir con verbos de movimiento,
              adjetivos descriptivos para la météo, posición de los adverbios
              y concordancia de género en adjetivos.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={() => document.getElementById("correccion-form")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: "0.75rem",
              background: "#E50046",
              color: "white",
              border: "none",
              fontWeight: 700,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            Corregir mi propio texto
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─── */

export default function CorrectionPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CorrectionData | null>(null);
  const [inputText, setInputText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [quota, setQuota] = useState<QuotaData | null>(null);
  const [lastEmail, setLastEmail] = useState("");

  const fetchQuota = useCallback(async (email: string) => {
    try {
      const res = await fetch(`/api/corrections/quota?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setQuota(data);
      }
    } catch {
      // Quota check failure is non-blocking
    }
  }, []);

  const handleSubmit = async (data: {
    email: string;
    level: CEFRLevel;
    taskType: string;
    inputText: string;
  }) => {
    setLoading(true);
    setError(null);
    setInputText(data.inputText);

    if (data.email !== lastEmail) {
      setLastEmail(data.email);
      await fetchQuota(data.email);
    }

    try {
      const res = await fetch("/api/corrections/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        if (json.quotaExhausted) {
          setError("Has agotado tus correcciones gratuitas. Contrata un pack para continuar.");
        } else {
          setError(json.error || "Error al procesar la corrección");
        }
        return;
      }

      setResult(json);
      await fetchQuota(data.email);
    } catch {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "var(--cin-bg, #faf7f2)", color: "#1e2d4a" }}>

      {/* ════════ SECTION 1 — Hero ════════ */}
      <section style={{ padding: "4rem 1rem 3rem", background: "var(--cin-bg, #faf7f2)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h1 style={{
            fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
            fontWeight: 800,
            lineHeight: 1.2,
            color: "#1e2d4a",
            marginBottom: "1rem",
          }}>
            Tu producción escrita corregida con las rúbricas oficiales del DELF y el DALF
          </h1>
          <p style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: "#3d4a5c",
            lineHeight: 1.6,
            maxWidth: 660,
            margin: "0 auto 2rem",
          }}>
            La misma <em>grille d&apos;évaluation</em> que usa el examinador oficial.
            Corrección detallada en menos de 30 segundos.
            Las 3 primeras son gratis.
          </p>
          <button
            onClick={() => document.getElementById("correccion-form")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              padding: "0.85rem 2.5rem",
              borderRadius: "0.75rem",
              background: "#E50046",
              color: "white",
              border: "none",
              fontWeight: 700,
              fontSize: "1.05rem",
              cursor: "pointer",
              transition: "transform 0.15s, box-shadow 0.15s",
              boxShadow: "0 4px 16px rgba(229,0,70,0.25)",
            }}
          >
            Corregir mi texto ahora
          </button>
        </div>

        {/* Trust bar */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
          marginTop: "2.5rem",
          fontSize: "0.85rem",
          color: "#5f6b78",
        }}>
          {[
            "Rúbricas oficiales FEI",
            "DELF A2 · B1 · B2 y DALF C1 · C2",
            "Corrección en menos de 30 segundos",
          ].map((text) => (
            <span key={text} style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <span style={{ color: "#10b981", fontWeight: 700 }}>✓</span> {text}
            </span>
          ))}
        </div>
      </section>

      {/* ════════ SECTION 2 — Qué evalúa ════════ */}
      <section style={{ padding: "4rem 1rem", background: "var(--cin-bg-alt, #f0ede6)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={sectionTitle}>
            Lo que evalúa el examinador oficial — y lo que evalúa nuestra IA
          </h2>
          <p style={sectionSubtitle}>
            Los 4 criterios de la <em>grille d&apos;évaluation</em> de France Éducation Internationale
            aplicados a tu texto en tiempo real.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" style={{ maxWidth: 800, margin: "0 auto" }}>
            {[
              {
                icon: "🎯",
                title: "Respeto a la consigna",
                desc: "¿Has respondido exactamente lo que pedía la tarea? Extensión mínima, tipo de texto, registro adecuado.",
              },
              {
                icon: "🔗",
                title: "Cohesión y coherencia",
                desc: "¿Tu texto tiene estructura lógica? Introducción, desarrollo, conclusión. Conectores bien usados.",
              },
              {
                icon: "📖",
                title: "Competencia léxica",
                desc: "Riqueza de vocabulario, precisión, registro adecuado al nivel y al tipo de texto.",
              },
              {
                icon: "⚙️",
                title: "Competencia gramatical",
                desc: "Estructuras correctas, concordancias, tiempos verbales, ortografía.",
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(30,45,74,0.08)",
                  borderRadius: "1rem",
                  padding: "1.5rem",
                }}
              >
                <p style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{card.icon}</p>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "0.4rem" }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#3d4a5c", lineHeight: 1.5 }}>{card.desc}</p>
              </div>
            ))}
          </div>

          <p style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.9rem",
            color: "#3d4a5c",
            lineHeight: 1.6,
            maxWidth: 640,
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            Nuestra IA evalúa tu texto en cada uno de estos criterios con la misma escala
            que usa el examinador: <strong style={{ color: "#1e2d4a" }}>0 / 0.5 / 1 / 1.5 / 2 / 2.5 / 3</strong> puntos
            por criterio.
          </p>
        </div>
      </section>

      {/* ════════ SECTION 3 — Ejemplo real ════════ */}
      <section style={{ padding: "4rem 1rem", background: "var(--cin-bg, #faf7f2)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2 style={sectionTitle}>Así es una corrección real</h2>
          <p style={sectionSubtitle}>
            Un texto B1 con 4 errores. Mira cómo la IA los detecta, los explica
            y puntúa cada criterio.
          </p>
          <ExampleSection />
        </div>
      </section>

      {/* ════════ SECTION 4 — Formulario ════════ */}
      <section id="correccion-form" style={{ padding: "4rem 1rem", background: "var(--cin-bg-alt, #f0ede6)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={sectionTitle}>Envía tu producción escrita</h2>
          <p style={sectionSubtitle}>
            Selecciona nivel y tipo de tarea, pega tu texto y obtén la corrección en segundos.
          </p>

          {error && (
            <div style={{ maxWidth: 800, margin: "0 auto 1rem" }}>
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
                {error.includes("agotado") && (
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white rounded-lg border border-red-100 p-4">
                      <p className="font-semibold text-gray-800 text-sm mb-1">Pack correcciones sueltas</p>
                      <p className="text-xs text-gray-500 mb-3">10 correcciones por 19 € — sin compromiso</p>
                      <button
                        onClick={() => {
                          fetch("/api/corrections/purchase", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ packKey: "10-corrections", email: lastEmail }),
                          })
                            .then((r) => r.json())
                            .then((d) => { if (d.url) window.location.href = d.url; });
                        }}
                        className="w-full py-2 rounded-lg bg-[#E50046] text-white text-sm font-semibold hover:bg-[#c7003b] transition-colors"
                      >
                        Comprar 10 correcciones — 19 €
                      </button>
                    </div>
                    <div className="bg-white rounded-lg border border-red-100 p-4">
                      <p className="font-semibold text-gray-800 text-sm mb-1">Pack de clases + correcciones ilimitadas</p>
                      <p className="text-xs text-gray-500 mb-3">Desde 150 € — clases con profesora nativa</p>
                      <Link
                        href="/contratar"
                        className="block w-full py-2 rounded-lg bg-[#395D9F] text-white text-sm font-semibold hover:bg-[#2e4d85] transition-colors text-center"
                      >
                        Ver packs de clases
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" style={{ maxWidth: 1000, margin: "0 auto" }}>
            {/* Left: Input */}
            <div style={{ background: "#ffffff", border: "1px solid rgba(30,45,74,0.08)", borderRadius: "1rem", padding: "1.5rem", display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "1rem" }}>Tu texto</h3>
              <CorrectionInput
                onSubmit={handleSubmit}
                loading={loading}
                freeRemaining={quota?.freeRemaining}
                paidRemaining={quota?.paidRemaining}
                hasActivePack={quota?.hasActivePack}
              />
            </div>

            {/* Right: Result */}
            <div style={{ background: "#ffffff", border: "1px solid rgba(30,45,74,0.08)", borderRadius: "1rem", padding: "1.5rem", display: "flex", flexDirection: "column", minHeight: 500 }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "1rem" }}>Resultado</h3>
              {loading ? (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ textAlign: "center" }}>
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#395D9F] border-t-transparent" style={{ marginBottom: "0.75rem" }} />
                    <p style={{ fontSize: "0.9rem", color: "#5f6b78" }}>Analizando tu texto con IA...</p>
                    <p style={{ fontSize: "0.8rem", color: "#3d4a5c", marginTop: "0.25rem" }}>Esto puede tardar 10-20 segundos</p>
                  </div>
                </div>
              ) : result ? (
                <CorrectionResult result={result} inputText={inputText} onReset={() => { setResult(null); setInputText(""); }} />
              ) : (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
                  <div>
                    <p style={{ fontSize: "3rem", opacity: 0.2, marginBottom: "0.75rem" }}>✍️</p>
                    <p style={{ fontSize: "0.9rem", color: "#5f6b78", maxWidth: 280 }}>
                      Escribe tu texto y pulsa &quot;Corriger mon texte&quot; para recibir tu corrección detallada
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 5 — Precios ════════ */}
      <section style={{ padding: "4rem 1rem", background: "var(--cin-bg, #faf7f2)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2 style={sectionTitle}>Sin sorpresas</h2>
          <p style={sectionSubtitle}>
            Empieza gratis. Si necesitas más, elige el plan que mejor se adapte a ti.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Free */}
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(30,45,74,0.08)",
              borderRadius: "1rem",
              padding: "1.5rem",
              textAlign: "center",
            }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                Para empezar
              </p>
              <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1e2d4a" }}>Gratis</p>
              <p style={{ fontSize: "0.9rem", color: "#3d4a5c", margin: "0.5rem 0 1.25rem" }}>
                3 correcciones completas
              </p>
              <button
                onClick={() => document.getElementById("correccion-form")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  width: "100%",
                  padding: "0.7rem",
                  borderRadius: "0.75rem",
                  background: "transparent",
                  border: "2px solid #1e2d4a",
                  color: "#1e2d4a",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                Probar ahora
              </button>
            </div>

            {/* Pack */}
            <div style={{
              background: "#ffffff",
              border: "2px solid #E50046",
              borderRadius: "1rem",
              padding: "1.5rem",
              textAlign: "center",
              position: "relative",
            }}>
              <span style={{
                position: "absolute",
                top: -12,
                left: "50%",
                transform: "translateX(-50%)",
                background: "#E50046",
                color: "white",
                fontSize: "0.7rem",
                fontWeight: 700,
                padding: "0.2rem 0.75rem",
                borderRadius: "2rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}>
                Popular
              </span>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#E50046", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                Pack correcciones
              </p>
              <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1e2d4a" }}>
                9,90 €
              </p>
              <p style={{ fontSize: "0.9rem", color: "#3d4a5c", margin: "0.5rem 0 1.25rem" }}>
                5 correcciones · 1,98 €/unidad
              </p>
              <Link
                href="/contratar"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.7rem",
                  borderRadius: "0.75rem",
                  background: "#E50046",
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Comprar pack
              </Link>
            </div>

            {/* Ilimitado */}
            <div style={{
              background: "#ffffff",
              border: "1px solid rgba(30,45,74,0.08)",
              borderRadius: "1rem",
              padding: "1.5rem",
              textAlign: "center",
            }}>
              <p style={{ fontSize: "0.8rem", fontWeight: 700, color: "#395D9F", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
                Ilimitado
              </p>
              <p style={{ fontSize: "1.75rem", fontWeight: 800, color: "#1e2d4a" }}>
                desde 150 €
              </p>
              <p style={{ fontSize: "0.9rem", color: "#3d4a5c", margin: "0.5rem 0 1.25rem" }}>
                Pack de clases + correcciones ilimitadas
              </p>
              <Link
                href="/contratar"
                style={{
                  display: "block",
                  width: "100%",
                  padding: "0.7rem",
                  borderRadius: "0.75rem",
                  background: "transparent",
                  border: "2px solid #395D9F",
                  color: "#395D9F",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Ver packs de clases
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SECTION 6 — FAQ ════════ */}
      <section style={{ padding: "4rem 1rem", background: "var(--cin-bg-alt, #f0ede6)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={sectionTitle}>Preguntas frecuentes</h2>
          <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              {
                q: "¿Es tan precisa como un profesor humano?",
                a: "Para los criterios formales (gramática, léxico, cohesión) la precisión es comparable a la de un corrector experto. Para matices culturales muy específicos, recomendamos complementar con la revisión de Isabelle, nuestra profesora nativa.",
              },
              {
                q: "¿Qué pasa si no estoy de acuerdo con la nota?",
                a: "Puedes pedir una revisión humana a Isabelle con descuento del 50% si ya tienes una corrección IA. Tu profesora revisará la corrección automática y añadirá sus comentarios personalizados.",
              },
              {
                q: "¿Funciona para el DALF C1 y C2?",
                a: "Sí, incluyendo la synthèse de documents del C1 y la production à partir de documents del C2, que son las pruebas más complejas. La IA usa las rúbricas específicas de cada nivel.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(30,45,74,0.08)",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                }}
              >
                <summary
                  style={{
                    padding: "1rem 1.25rem",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "#1e2d4a",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {item.q}
                  <span style={{ fontSize: "1.2rem", color: "#5f6b78", transition: "transform 0.2s" }} className="group-open:rotate-45">+</span>
                </summary>
                <div style={{ padding: "0 1.25rem 1rem", fontSize: "0.9rem", color: "#3d4a5c", lineHeight: 1.6 }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
