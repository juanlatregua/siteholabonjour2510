"use client";

import { useState, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import type {
  Examen,
  ConfigNivel,
  SeccionExamen,
  Ejercicio,
  Pregunta,
} from "@/lib/examenes/types";
import Temporizador from "@/components/examenes/Temporizador";

type Respuestas = Record<string, string | boolean>;

interface ExamenClientProps {
  examen: Examen;
  config: ConfigNivel;
}

type Estado = "intro" | "en-curso" | "resultado";

// Light theme palette
const C = {
  bleu: "#1471B3",
  bleuDark: "#395D9F",
  rouge: "#E50046",
  violet: "#6B3FA0",
  bg: "#F5F7FF",
  card: "#FFFFFF",
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
  text: "#1a1a2e",
  textMuted: "#6b7280",
  textSecondary: "#374151",
};

const SECCION_ICONS: Record<string, string> = {
  CO: "🎧",
  CE: "📖",
  PE: "✍️",
  PO: "🗣️",
};

export default function ExamenClient({ examen, config }: ExamenClientProps) {
  const { data: session } = useSession();
  const [estado, setEstado] = useState<Estado>("intro");
  const [seccionIdx, setSeccionIdx] = useState(0);
  const [respuestas, setRespuestas] = useState<Respuestas>({});
  const [textos, setTextos] = useState<Record<string, string>>({});
  const attemptIdRef = useRef<string | null>(null);

  const seccion = examen.secciones[seccionIdx];

  // Create attempt in DB when exam starts (authenticated users only)
  const crearIntento = useCallback(async () => {
    if (!session?.user) return;
    try {
      const res = await fetch("/api/examenes/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ examenId: examen.id, nivel: examen.nivel }),
      });
      if (res.ok) {
        const data = await res.json();
        attemptIdRef.current = data.id;
      }
    } catch { /* silently fail — exam still works without persistence */ }
  }, [session, examen.id, examen.nivel]);

  // Save results to DB when exam finishes
  const guardarResultado = useCallback(async (scores: { scoreCO?: number; scoreCE?: number; scorePE?: number; scorePO?: number; totalScore: number; passed: boolean }) => {
    if (!attemptIdRef.current) return;
    try {
      await fetch(`/api/examenes/attempts/${attemptIdRef.current}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(scores),
      });
    } catch { /* silently fail */ }
  }, []);

  const handleRespuesta = useCallback(
    (id: string, val: string | boolean) => {
      setRespuestas((prev) => ({ ...prev, [id]: val }));
    },
    []
  );

  const handleTexto = useCallback(
    (id: string, val: string) => {
      setTextos((prev) => ({ ...prev, [id]: val }));
    },
    []
  );

  const siguiente = () => {
    if (seccionIdx < examen.secciones.length - 1) {
      setSeccionIdx((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setEstado("resultado");
      window.scrollTo({ top: 0, behavior: "smooth" });
      // Save results to DB
      const scores: Record<string, number> = {};
      let total = 0;
      for (const sec of examen.secciones) {
        const pts = calcularPuntos(sec);
        scores[sec.codigo] = pts;
        total += pts;
      }
      guardarResultado({
        scoreCO: scores.CO,
        scoreCE: scores.CE,
        scorePE: scores.PE,
        scorePO: scores.PO,
        totalScore: total,
        passed: total >= examen.puntuacionMinTotal,
      });
    }
  };

  const calcularPuntos = (sec: SeccionExamen) => {
    let pts = 0;
    for (const ej of sec.ejercicios) {
      for (const p of ej.preguntas) {
        if (p.tipo === "production" || p.tipo === "synthese" || p.tipo === "oral") continue;
        const resp = respuestas[p.id];
        if (resp === undefined || resp === null) continue;

        if (p.tipo === "qcm" && typeof p.respuestaCorrecta === "string") {
          if (resp === p.respuestaCorrecta) pts += p.puntos;
        } else if (p.tipo === "vrai-faux" && typeof p.respuestaCorrecta === "boolean") {
          if (resp === p.respuestaCorrecta) pts += p.puntos;
        } else if (p.tipo === "reponse-libre" && typeof p.respuestaCorrecta === "string") {
          if (
            typeof resp === "string" &&
            resp.trim().toLowerCase() === p.respuestaCorrecta.toLowerCase()
          )
            pts += p.puntos;
        }
      }
    }
    return pts;
  };

  const wordCount = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;

  // ── INTRO ──
  if (estado === "intro") {
    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: C.rouge,
            }}
          >
            {config.diploma} {config.nivel} — Exemple {examen.ejemplo}
          </span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 700,
              marginTop: "0.5rem",
              marginBottom: "0.75rem",
              color: C.text,
            }}
          >
            {examen.titulo}
          </h1>
          <p style={{ color: C.textMuted, fontSize: "0.95rem" }}>
            {config.descripcionEs} — {config.duracionTotalMinutos} minutos
          </p>
        </div>

        {/* Sections table */}
        <div
          style={{
            borderRadius: "0.75rem",
            border: `1px solid ${C.border}`,
            overflow: "hidden",
            marginBottom: "2rem",
            background: C.card,
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
            <thead>
              <tr style={{ background: "#F8FAFC" }}>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 600, color: C.textMuted }}>
                  Sección
                </th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "center", fontWeight: 600, color: C.textMuted }}>
                  Duración
                </th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "center", fontWeight: 600, color: C.textMuted }}>
                  Puntos
                </th>
              </tr>
            </thead>
            <tbody>
              {examen.secciones.map((s) => (
                <tr key={s.id} style={{ borderTop: `1px solid ${C.borderLight}` }}>
                  <td style={{ padding: "0.75rem 1rem", color: C.text }}>
                    {SECCION_ICONS[s.codigo]} {s.titulo}
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "center", color: C.textMuted }}>
                    {s.duracionMinutos} min
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "center", color: C.textMuted }}>
                    {s.puntuacionTotal} pts
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rules */}
        <div
          style={{
            background: "rgba(20,113,179,0.06)",
            border: "1px solid rgba(20,113,179,0.15)",
            borderRadius: "0.75rem",
            padding: "1.25rem",
            marginBottom: "2.5rem",
            fontSize: "0.9rem",
            lineHeight: 1.6,
            color: C.textSecondary,
          }}
        >
          <strong style={{ color: C.text }}>Instrucciones:</strong>
          <ul style={{ margin: "0.5rem 0 0", paddingLeft: "1.25rem" }}>
            <li>Cada sección tiene su propio temporizador</li>
            <li>No puedes volver a secciones anteriores</li>
            <li>Mínimo {examen.puntuacionMinPorSeccion}/25 por sección y {examen.puntuacionMinTotal}/100 global</li>
            <li>La producción escrita y oral será revisada por un profesor</li>
          </ul>
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => { crearIntento(); setEstado("en-curso"); }}
            style={{
              padding: "0.85rem 2.5rem",
              borderRadius: "0.625rem",
              background: C.bleu,
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.05rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            Comenzar examen
          </button>
        </div>
      </div>
    );
  }

  // ── EN CURSO ──
  if (estado === "en-curso") {
    const esPO = seccion.codigo === "PO";

    return (
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1rem 4rem" }}>
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "1rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: "0.75rem", color: C.textMuted, fontWeight: 600, marginBottom: "0.25rem" }}>
              Sección {seccionIdx + 1} de {examen.secciones.length}
            </div>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.4rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: C.text,
              }}
            >
              {SECCION_ICONS[seccion.codigo]} {seccion.titulo}
            </h2>
            <p style={{ fontSize: "0.85rem", color: C.textMuted, marginTop: "0.25rem" }}>
              {seccion.puntuacionTotal} puntos · {seccion.duracionMinutos} min
            </p>
          </div>

          <Temporizador
            key={seccion.id}
            duracionMinutos={seccion.duracionMinutos}
            onTiempoAgotado={siguiente}
          />
        </div>

        {/* General instructions */}
        <div
          style={{
            background: "#F8FAFC",
            border: `1px solid ${C.border}`,
            borderRadius: "0.75rem",
            padding: "1rem 1.25rem",
            marginBottom: "2rem",
            fontSize: "0.88rem",
            color: C.textSecondary,
            lineHeight: 1.6,
          }}
        >
          {seccion.instruccionesGenerales}
        </div>

        {/* PO: informational */}
        {esPO ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {seccion.ejercicios.map((ej) => (
              <div
                key={ej.id}
                style={{
                  background: C.card,
                  border: `1px solid ${C.border}`,
                  borderRadius: "0.75rem",
                  padding: "1.5rem",
                }}
              >
                <h3 style={{ fontWeight: 700, marginBottom: "0.5rem", color: C.text }}>{ej.titulo}</h3>
                <p style={{ fontSize: "0.9rem", color: C.textSecondary, lineHeight: 1.6, margin: 0 }}>
                  {ej.instrucciones}
                </p>
                {ej.preguntas.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      marginTop: "1rem",
                      padding: "1rem",
                      background: "#F8FAFC",
                      borderRadius: "0.5rem",
                      fontSize: "0.9rem",
                      color: C.textSecondary,
                      whiteSpace: "pre-line",
                      lineHeight: 1.6,
                    }}
                  >
                    {p.enunciado}
                  </div>
                ))}
              </div>
            ))}
            <div
              style={{
                background: "rgba(229,0,70,0.06)",
                border: "1px solid rgba(229,0,70,0.15)",
                borderRadius: "0.75rem",
                padding: "1rem",
                fontSize: "0.88rem",
                color: C.textSecondary,
                textAlign: "center",
              }}
            >
              La production orale se réalise en face à face avec un examinateur.
            </div>
          </div>
        ) : (
          /* Exercises */
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {seccion.ejercicios.map((ej) => (
              <EjercicioCard
                key={ej.id}
                ejercicio={ej}
                respuestas={respuestas}
                textos={textos}
                onRespuesta={handleRespuesta}
                onTexto={handleTexto}
                wordCount={wordCount}
              />
            ))}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "2.5rem" }}>
          <button
            onClick={siguiente}
            style={{
              padding: "0.75rem 2rem",
              borderRadius: "0.5rem",
              background: seccionIdx === examen.secciones.length - 1 ? C.rouge : C.bleu,
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.9rem",
              border: "none",
              cursor: "pointer",
            }}
          >
            {seccionIdx === examen.secciones.length - 1 ? "Terminer et corriger" : "Section suivante"}
          </button>
        </div>
      </div>
    );
  }

  // ── RESULTADO ──
  const puntuaciones = examen.secciones.map((s) => ({
    seccion: s,
    pts: calcularPuntos(s),
    esProduccion: s.codigo === "PE" || s.codigo === "PO",
  }));
  const totalPts = puntuaciones.reduce((sum, p) => sum + p.pts, 0);
  const aprobado = totalPts >= examen.puntuacionMinTotal;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "4rem 1rem" }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, marginBottom: "1rem", color: C.text }}>
          Résultats — {config.diploma} {config.nivel}
        </h2>
        <div style={{ fontSize: "3.5rem", fontWeight: 800, fontFamily: "'Playfair Display', serif", color: aprobado ? "#16a34a" : "#dc2626" }}>
          {totalPts}
          <span style={{ fontSize: "1.5rem", color: C.textMuted, fontWeight: 400 }}>/100</span>
        </div>
        <div style={{ maxWidth: 300, margin: "1rem auto", height: 8, borderRadius: 4, background: "#E2E8F0", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${totalPts}%`, background: aprobado ? "#16a34a" : "#dc2626", borderRadius: 4 }} />
        </div>
        <p style={{ fontSize: "1rem", color: aprobado ? "#16a34a" : "#dc2626", fontWeight: 600 }}>
          {aprobado ? "Félicitations ! Vous auriez réussi l'examen." : `Il faut ${examen.puntuacionMinTotal}/100 pour réussir.`}
        </p>
      </div>

      {/* Section scores */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
        {puntuaciones.map(({ seccion: s, pts, esProduccion }) => (
          <div key={s.id} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "0.75rem", padding: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <span>{SECCION_ICONS[s.codigo]}</span>
              <span style={{ fontSize: "0.8rem", fontWeight: 600, color: C.textMuted }}>{s.codigo}</span>
            </div>
            {esProduccion ? (
              <p style={{ fontSize: "0.8rem", color: "#d97706", margin: 0, fontStyle: "italic" }}>Pendiente de revisión</p>
            ) : (
              <>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: C.text }}>
                  {pts}<span style={{ fontSize: "0.9rem", color: C.textMuted, fontWeight: 400 }}>/{s.puntuacionTotal}</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: "#E2E8F0", overflow: "hidden", marginTop: "0.5rem" }}>
                  <div style={{ height: "100%", width: `${(pts / s.puntuacionTotal) * 100}%`, background: pts >= s.puntuacionTotal / 2 ? C.bleu : "#dc2626", borderRadius: 2 }} />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
        <Link href="/tarifas" style={{ padding: "0.75rem 1.5rem", borderRadius: "0.5rem", background: C.rouge, color: "#fff", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
          Ver tarifas y packs
        </Link>
        <Link href="/correccion-ia" style={{ padding: "0.75rem 1.5rem", borderRadius: "0.5rem", background: C.bleu, color: "#fff", fontWeight: 700, fontSize: "0.9rem", textDecoration: "none" }}>
          Prueba la corrección IA
        </Link>
        <button
          onClick={() => { setRespuestas({}); setTextos({}); setSeccionIdx(0); setEstado("intro"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ padding: "0.75rem 1.5rem", borderRadius: "0.5rem", border: `1.5px solid ${C.border}`, background: "transparent", color: C.textSecondary, fontWeight: 600, fontSize: "0.9rem", cursor: "pointer" }}
        >
          Recommencer
        </button>
      </div>
    </div>
  );
}

// ── Exercise Card ──

function EjercicioCard({
  ejercicio,
  respuestas,
  textos,
  onRespuesta,
  onTexto,
  wordCount,
}: {
  ejercicio: Ejercicio;
  respuestas: Respuestas;
  textos: Record<string, string>;
  onRespuesta: (id: string, val: string | boolean) => void;
  onTexto: (id: string, val: string) => void;
  wordCount: (t: string) => number;
}) {
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.border}`,
        borderRadius: "0.75rem",
        padding: "1.5rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.75rem" }}>
        <h3 style={{ fontWeight: 700, fontSize: "1rem", color: C.text }}>{ejercicio.titulo}</h3>
        <span style={{ fontSize: "0.75rem", color: C.textMuted }}>{ejercicio.puntuacionTotal} pts</span>
      </div>

      <p style={{ fontSize: "0.88rem", color: C.textSecondary, lineHeight: 1.6, marginBottom: "1rem" }}>
        {ejercicio.instrucciones}
      </p>

      {/* Reading text */}
      {ejercicio.texto && (
        <div
          style={{
            background: "#F8FAFC",
            border: `1px solid ${C.borderLight}`,
            borderRadius: "0.5rem",
            padding: "1rem",
            marginBottom: "1rem",
            fontSize: "0.9rem",
            color: C.textSecondary,
            lineHeight: 1.7,
            whiteSpace: "pre-line",
          }}
        >
          {ejercicio.texto}
        </div>
      )}

      {/* Audio */}
      {ejercicio.audio && (
        <div
          style={{
            background: "rgba(20,113,179,0.06)",
            border: "1px solid rgba(20,113,179,0.15)",
            borderRadius: "0.5rem",
            padding: "0.75rem 1rem",
            marginBottom: "1rem",
            fontSize: "0.85rem",
            color: C.bleu,
          }}
        >
          🎧 Audio: {ejercicio.numEscuchas || 2} écoute(s) — {ejercicio.audio}
        </div>
      )}

      {/* Questions */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {ejercicio.preguntas.map((p) => (
          <PreguntaRender
            key={p.id}
            pregunta={p}
            respuesta={respuestas[p.id]}
            texto={textos[p.id] || ""}
            onRespuesta={onRespuesta}
            onTexto={onTexto}
            wordCount={wordCount}
          />
        ))}
      </div>
    </div>
  );
}

// ── Question Renderer ──

function PreguntaRender({
  pregunta: p,
  respuesta,
  texto,
  onRespuesta,
  onTexto,
  wordCount,
}: {
  pregunta: Pregunta;
  respuesta: string | boolean | undefined;
  texto: string;
  onRespuesta: (id: string, val: string | boolean) => void;
  onTexto: (id: string, val: string) => void;
  wordCount: (t: string) => number;
}) {
  // QCM
  if (p.tipo === "qcm" && p.opciones) {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <p style={{ fontSize: "0.9rem", color: C.text, margin: 0 }}>{p.enunciado}</p>
          <span style={{ fontSize: "0.75rem", color: C.textMuted, whiteSpace: "nowrap", marginLeft: "0.5rem" }}>{p.puntos} pt{p.puntos > 1 ? "s" : ""}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {p.opciones.map((o) => {
            const sel = respuesta === o.letra;
            return (
              <label
                key={o.letra}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.55rem 0.85rem",
                  borderRadius: "0.4rem",
                  border: sel ? `1.5px solid ${C.bleu}` : `1.5px solid ${C.border}`,
                  background: sel ? "rgba(20,113,179,0.08)" : "transparent",
                  cursor: "pointer",
                  fontSize: "0.88rem",
                  color: sel ? C.text : C.textSecondary,
                  transition: "all 0.15s",
                }}
              >
                <input
                  type="radio"
                  name={p.id}
                  checked={sel}
                  onChange={() => onRespuesta(p.id, o.letra)}
                  style={{ display: "none" }}
                />
                <span style={{ fontWeight: 700, color: C.bleu, minWidth: 18 }}>{o.letra}.</span>
                {o.texto}
              </label>
            );
          })}
        </div>
      </div>
    );
  }

  // Vrai-Faux
  if (p.tipo === "vrai-faux") {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <p style={{ fontSize: "0.9rem", color: C.text, margin: 0 }}>{p.enunciado}</p>
          <span style={{ fontSize: "0.75rem", color: C.textMuted, whiteSpace: "nowrap", marginLeft: "0.5rem" }}>{p.puntos} pt{p.puntos > 1 ? "s" : ""}</span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[true, false].map((val) => {
            const sel = respuesta === val;
            return (
              <button
                key={String(val)}
                onClick={() => onRespuesta(p.id, val)}
                style={{
                  flex: 1,
                  padding: "0.55rem",
                  borderRadius: "0.4rem",
                  border: sel ? `1.5px solid ${C.bleu}` : `1.5px solid ${C.border}`,
                  background: sel ? "rgba(20,113,179,0.08)" : "transparent",
                  color: sel ? C.text : C.textSecondary,
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                }}
              >
                {val ? "Vrai" : "Faux"}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Production
  if (p.tipo === "production" || p.tipo === "synthese") {
    return (
      <div>
        <p style={{ fontSize: "0.9rem", color: C.text, lineHeight: 1.6, marginBottom: "0.75rem", whiteSpace: "pre-line" }}>
          {p.enunciado}
        </p>
        <textarea
          value={texto}
          onChange={(e) => onTexto(p.id, e.target.value)}
          placeholder="Écrivez votre réponse ici..."
          rows={8}
          style={{
            width: "100%",
            padding: "1rem",
            borderRadius: "0.5rem",
            border: `1px solid ${C.border}`,
            background: "#fff",
            color: C.text,
            fontSize: "0.9rem",
            lineHeight: 1.6,
            resize: "vertical",
            fontFamily: "inherit",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.4rem", fontSize: "0.8rem", color: C.textMuted }}>
          <span>{wordCount(texto)} mots{p.minPalabras ? ` (min. ${p.minPalabras})` : ""}</span>
          <span>{p.puntos} pts</span>
        </div>
      </div>
    );
  }

  // Grille (tabla de asociación)
  if (p.tipo === "grille" && p.criterios && p.opcionesGrille) {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <p style={{ fontSize: "0.9rem", color: C.text, margin: 0 }}>{p.enunciado}</p>
          <span style={{ fontSize: "0.75rem", color: C.textMuted, whiteSpace: "nowrap", marginLeft: "0.5rem" }}>{p.puntos} pt{p.puntos > 1 ? "s" : ""}</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ background: "rgba(20,113,179,0.06)" }}>
                <th style={{ padding: "0.6rem", textAlign: "left", fontWeight: 600, color: C.text, borderBottom: `2px solid rgba(20,113,179,0.2)` }}></th>
                {p.opcionesGrille.map((o) => (
                  <th key={o.id} style={{ padding: "0.6rem", textAlign: "center", fontWeight: 600, color: C.text, borderBottom: `2px solid rgba(20,113,179,0.2)` }}>
                    {o.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.criterios.map((c) => (
                <tr key={c.id} style={{ borderBottom: `1px solid ${C.borderLight}` }}>
                  <td style={{ padding: "0.6rem", color: C.textSecondary, fontWeight: 500 }}>{c.label}</td>
                  {p.opcionesGrille!.map((o) => {
                    const key = `${p.id}__${c.id}`;
                    const sel = respuesta === `${c.id}:${o.id}` ||
                      (typeof respuesta === "string" && respuesta.includes(`${c.id}:${o.id}`));
                    return (
                      <td key={o.id} style={{ padding: "0.6rem", textAlign: "center" }}>
                        <input
                          type="radio"
                          name={key}
                          checked={!!sel}
                          onChange={() => onRespuesta(p.id, `${c.id}:${o.id}`)}
                          style={{ width: 18, height: 18, cursor: "pointer", accentColor: C.bleu }}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // Réponse libre
  if (p.tipo === "reponse-libre") {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <p style={{ fontSize: "0.9rem", color: C.text, margin: 0 }}>{p.enunciado}</p>
          <span style={{ fontSize: "0.75rem", color: C.textMuted, whiteSpace: "nowrap", marginLeft: "0.5rem" }}>{p.puntos} pt{p.puntos > 1 ? "s" : ""}</span>
        </div>
        <input
          type="text"
          value={typeof respuesta === "string" ? respuesta : ""}
          onChange={(e) => onRespuesta(p.id, e.target.value)}
          placeholder="Votre réponse..."
          style={{
            width: "100%",
            padding: "0.6rem 1rem",
            borderRadius: "0.4rem",
            border: `1px solid ${C.border}`,
            background: "#fff",
            color: C.text,
            fontSize: "0.9rem",
            fontFamily: "inherit",
          }}
        />
      </div>
    );
  }

  // Oral (PO informational)
  if (p.tipo === "oral") {
    return (
      <div>
        <p style={{ fontSize: "0.9rem", color: C.textSecondary, lineHeight: 1.6, marginBottom: "0.5rem", whiteSpace: "pre-line" }}>
          {p.enunciado}
        </p>
        {p.sujetosAlternativos && p.sujetosAlternativos.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {p.sujetosAlternativos.map((s, i) => (
              <div key={i} style={{ padding: "0.75rem", background: "rgba(20,113,179,0.04)", border: "1px solid rgba(20,113,179,0.12)", borderRadius: "0.5rem", fontSize: "0.88rem", color: C.textSecondary }}>
                <span style={{ fontWeight: 600, color: C.bleu }}>Sujet {i + 1} :</span> {s}
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: "0.5rem", fontSize: "0.8rem", color: C.textMuted, fontStyle: "italic" }}>
          {p.puntos} pts — Évaluation en face à face
        </div>
      </div>
    );
  }

  return null;
}
