"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { Nivel, Diploma, CodigoSeccion } from "@/lib/examenes/types";

// ── Types ──

interface PreguntaForm {
  id: string;
  tipo: "qcm" | "vrai-faux";
  enunciado: string;
  puntos: number;
  opciones: { letra: string; texto: string }[];
  respuestaCorrecta: string | boolean;
}

interface EjercicioForm {
  id: string;
  titulo: string;
  instrucciones: string;
  texto?: string;
  audio?: string;
  numEscuchas?: number;
  preguntas: PreguntaForm[];
}

interface SeccionForm {
  codigo: CodigoSeccion;
  titulo: string;
  duracionMinutos: number;
  instruccionesGenerales: string;
  ejercicios: EjercicioForm[];
}

interface PESeccionForm {
  instrucciones: string;
  minPalabras: number;
  criterios: string[];
}

interface POSeccionForm {
  instrucciones: string;
  sujeto1: string;
  sujeto2: string;
}

interface ExamFormData {
  titulo: string;
  nivel: Nivel | "";
  diploma: Diploma;
  numero: number;
  esPago: boolean;
  precio: number | null;
  seccionesCO: SeccionForm;
  seccionesCE: SeccionForm;
  pe: PESeccionForm;
  po: POSeccionForm;
}

// ── Helpers ──

const NIVELES: { value: Nivel; diploma: Diploma }[] = [
  { value: "A2", diploma: "DELF" },
  { value: "B1", diploma: "DELF" },
  { value: "B2", diploma: "DELF" },
  { value: "C1", diploma: "DALF" },
  { value: "C2", diploma: "DALF" },
];

let _uid = 0;
function uid() {
  return `tmp-${++_uid}-${Date.now()}`;
}

function emptyPregunta(): PreguntaForm {
  return {
    id: uid(),
    tipo: "qcm",
    enunciado: "",
    puntos: 1,
    opciones: [
      { letra: "A", texto: "" },
      { letra: "B", texto: "" },
      { letra: "C", texto: "" },
    ],
    respuestaCorrecta: "A",
  };
}

function emptyEjercicio(): EjercicioForm {
  return {
    id: uid(),
    titulo: "",
    instrucciones: "",
    numEscuchas: 2,
    preguntas: [emptyPregunta()],
  };
}

function initialFormData(): ExamFormData {
  return {
    titulo: "",
    nivel: "",
    diploma: "DELF",
    numero: 1,
    esPago: true,
    precio: null,
    seccionesCO: {
      codigo: "CO",
      titulo: "Compréhension de l'oral",
      duracionMinutos: 25,
      instruccionesGenerales: "",
      ejercicios: [emptyEjercicio()],
    },
    seccionesCE: {
      codigo: "CE",
      titulo: "Compréhension des écrits",
      duracionMinutos: 30,
      instruccionesGenerales: "",
      ejercicios: [{ ...emptyEjercicio(), texto: "" }],
    },
    pe: {
      instrucciones: "",
      minPalabras: 160,
      criterios: ["Respect de la consigne", "Lexique", "Grammaire", "Cohérence"],
    },
    po: {
      instrucciones: "",
      sujeto1: "",
      sujeto2: "",
    },
  };
}

// ── Step indicators ──

const STEPS = [
  { num: 1, label: "Configuración" },
  { num: 2, label: "CO — Oral" },
  { num: 3, label: "CE — Escrito" },
  { num: 4, label: "PE / PO" },
];

// ── Component ──

interface ExamWizardProps {
  initialData?: {
    id: string;
    titulo: string;
    nivel: string;
    diploma: string;
    numero: number;
    esPago: boolean;
    precio: number | null;
    status: string;
    secciones: unknown;
  };
}

export default function ExamWizard({ initialData }: ExamWizardProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [generating, setGenerating] = useState<Record<string, boolean>>({});

  // Initialize form from initialData if editing
  const [form, setForm] = useState<ExamFormData>(() => {
    if (initialData?.secciones) {
      return deserializeSecciones(initialData);
    }
    return initialFormData();
  });

  // ── Serialization ──

  function serializeSecciones(): unknown[] {
    const secciones = [];

    // CO
    const co = form.seccionesCO;
    secciones.push({
      id: `seccion-co`,
      numero: 1,
      codigo: "CO",
      titulo: co.titulo,
      duracionMinutos: co.duracionMinutos,
      puntuacionTotal: co.ejercicios.reduce(
        (sum, ej) => sum + ej.preguntas.reduce((s, p) => s + p.puntos, 0),
        0
      ),
      instruccionesGenerales: co.instruccionesGenerales,
      ejercicios: co.ejercicios.map((ej, i) => ({
        id: ej.id,
        numero: i + 1,
        titulo: ej.titulo,
        instrucciones: ej.instrucciones,
        audio: ej.audio || undefined,
        numEscuchas: ej.numEscuchas || 2,
        puntuacionTotal: ej.preguntas.reduce((s, p) => s + p.puntos, 0),
        preguntas: ej.preguntas.map((p, j) => ({
          id: p.id,
          numero: j + 1,
          tipo: p.tipo,
          enunciado: p.enunciado,
          puntos: p.puntos,
          opciones: p.tipo === "qcm" ? p.opciones : undefined,
          respuestaCorrecta: p.respuestaCorrecta,
        })),
      })),
    });

    // CE
    const ce = form.seccionesCE;
    secciones.push({
      id: `seccion-ce`,
      numero: 2,
      codigo: "CE",
      titulo: ce.titulo,
      duracionMinutos: ce.duracionMinutos,
      puntuacionTotal: ce.ejercicios.reduce(
        (sum, ej) => sum + ej.preguntas.reduce((s, p) => s + p.puntos, 0),
        0
      ),
      instruccionesGenerales: ce.instruccionesGenerales,
      ejercicios: ce.ejercicios.map((ej, i) => ({
        id: ej.id,
        numero: i + 1,
        titulo: ej.titulo,
        instrucciones: ej.instrucciones,
        texto: ej.texto || undefined,
        puntuacionTotal: ej.preguntas.reduce((s, p) => s + p.puntos, 0),
        preguntas: ej.preguntas.map((p, j) => ({
          id: p.id,
          numero: j + 1,
          tipo: p.tipo,
          enunciado: p.enunciado,
          puntos: p.puntos,
          opciones: p.tipo === "qcm" ? p.opciones : undefined,
          respuestaCorrecta: p.respuestaCorrecta,
        })),
      })),
    });

    // PE
    secciones.push({
      id: `seccion-pe`,
      numero: 3,
      codigo: "PE",
      titulo: "Production écrite",
      duracionMinutos: 45,
      puntuacionTotal: 25,
      instruccionesGenerales: form.pe.instrucciones,
      ejercicios: [
        {
          id: "pe-ej1",
          numero: 1,
          titulo: "Production écrite",
          instrucciones: form.pe.instrucciones,
          puntuacionTotal: 25,
          preguntas: [
            {
              id: "pe-q1",
              numero: 1,
              tipo: "production",
              enunciado: form.pe.instrucciones,
              puntos: 25,
              minPalabras: form.pe.minPalabras,
              criteriosEvaluacion: form.pe.criterios.map((c) => ({
                label: c,
                valores: [0, 0.5, 1, 1.5, 2, 2.5, 3],
              })),
            },
          ],
        },
      ],
    });

    // PO
    secciones.push({
      id: `seccion-po`,
      numero: 4,
      codigo: "PO",
      titulo: "Production orale",
      duracionMinutos: 15,
      puntuacionTotal: 25,
      instruccionesGenerales: form.po.instrucciones,
      ejercicios: [
        {
          id: "po-ej1",
          numero: 1,
          titulo: "Production orale",
          instrucciones: form.po.instrucciones,
          puntuacionTotal: 25,
          preguntas: [
            {
              id: "po-q1",
              numero: 1,
              tipo: "oral",
              enunciado: form.po.instrucciones,
              puntos: 25,
              sujetosAlternativos: [form.po.sujeto1, form.po.sujeto2].filter(Boolean),
            },
          ],
        },
      ],
    });

    return secciones;
  }

  // ── Save ──

  const handleSave = useCallback(
    async (status: "DRAFT" | "REVIEW") => {
      if (!form.nivel) {
        setError("Selecciona un nivel");
        setStep(1);
        return;
      }
      if (!form.titulo.trim()) {
        setError("El título es obligatorio");
        setStep(1);
        return;
      }

      setSaving(true);
      setError("");

      try {
        const payload = {
          titulo: form.titulo,
          nivel: form.nivel,
          diploma: form.diploma,
          numero: form.numero,
          esPago: form.esPago,
          precio: form.esPago ? form.precio : null,
          secciones: serializeSecciones(),
          status,
        };

        const url = isEdit
          ? `/api/zona-profesor/examenes/${initialData!.id}`
          : "/api/zona-profesor/examenes";
        const method = isEdit ? "PUT" : "POST";

        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!data.ok) {
          setError(data.message || "Error al guardar");
          return;
        }

        router.push("/zona-profesor/examenes");
        router.refresh();
      } catch {
        setError("Error de conexión");
      } finally {
        setSaving(false);
      }
    },
    [form, isEdit, initialData, router]
  );

  // ── Audio upload ──

  const handleAudioUpload = useCallback(
    async (ejercicioIdx: number, file: File) => {
      const fd = new FormData();
      fd.append("file", file);

      const res = await fetch("/api/zona-profesor/examenes/upload-audio", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!data.ok) {
        setError(data.message || "Error al subir audio");
        return;
      }

      setForm((prev) => {
        const next = { ...prev };
        const ejercicios = [...next.seccionesCO.ejercicios];
        ejercicios[ejercicioIdx] = { ...ejercicios[ejercicioIdx], audio: data.url };
        next.seccionesCO = { ...next.seccionesCO, ejercicios };
        return next;
      });
    },
    []
  );

  // ── AI Generation ──

  const canGenerate = ["B1", "B2", "C1", "C2"].includes(form.nivel);

  const handleGenerate = useCallback(
    async (seccion: "CO" | "CE" | "PE" | "PO") => {
      if (!form.nivel || !canGenerate) return;

      setGenerating((prev) => ({ ...prev, [seccion]: true }));
      setError("");

      try {
        const res = await fetch("/api/zona-profesor/examenes/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nivel: form.nivel, seccion }),
        });

        const result = await res.json();
        if (!result.ok) {
          setError(result.message || "Error al generar con IA");
          return;
        }

        const data = result.data;

        if (seccion === "CO") {
          setForm((prev) => ({
            ...prev,
            seccionesCO: {
              ...prev.seccionesCO,
              instruccionesGenerales: data.instruccionesGenerales || prev.seccionesCO.instruccionesGenerales,
              ejercicios: (data.ejercicios || []).map((ej: Record<string, unknown>) => ({
                id: (ej.id as string) || uid(),
                titulo: (ej.titulo as string) || "",
                instrucciones: (ej.instrucciones as string) || "",
                audio: undefined,
                numEscuchas: (ej.numEscuchas as number) || 2,
                preguntas: ((ej.preguntas as Record<string, unknown>[]) || []).map((p: Record<string, unknown>) => ({
                  id: (p.id as string) || uid(),
                  tipo: ((p.tipo as string) || "qcm") as "qcm" | "vrai-faux",
                  enunciado: (p.enunciado as string) || "",
                  puntos: (p.puntos as number) || 1,
                  opciones: (p.opciones as { letra: string; texto: string }[]) || [
                    { letra: "A", texto: "" },
                    { letra: "B", texto: "" },
                    { letra: "C", texto: "" },
                  ],
                  respuestaCorrecta: (p.respuestaCorrecta as string | boolean) ?? "A",
                })),
              })),
            },
          }));
        }

        if (seccion === "CE") {
          setForm((prev) => ({
            ...prev,
            seccionesCE: {
              ...prev.seccionesCE,
              instruccionesGenerales: data.instruccionesGenerales || prev.seccionesCE.instruccionesGenerales,
              ejercicios: (data.ejercicios || []).map((ej: Record<string, unknown>) => ({
                id: (ej.id as string) || uid(),
                titulo: (ej.titulo as string) || "",
                instrucciones: (ej.instrucciones as string) || "",
                texto: (ej.texto as string) || "",
                numEscuchas: 2,
                preguntas: ((ej.preguntas as Record<string, unknown>[]) || []).map((p: Record<string, unknown>) => ({
                  id: (p.id as string) || uid(),
                  tipo: ((p.tipo as string) || "qcm") as "qcm" | "vrai-faux",
                  enunciado: (p.enunciado as string) || "",
                  puntos: (p.puntos as number) || 1,
                  opciones: (p.opciones as { letra: string; texto: string }[]) || [
                    { letra: "A", texto: "" },
                    { letra: "B", texto: "" },
                    { letra: "C", texto: "" },
                  ],
                  respuestaCorrecta: (p.respuestaCorrecta as string | boolean) ?? "A",
                })),
              })),
            },
          }));
        }

        if (seccion === "PE") {
          const peEj = data.ejercicios?.[0];
          const peQ = peEj?.preguntas?.[0];
          if (peEj && peQ) {
            setForm((prev) => ({
              ...prev,
              pe: {
                instrucciones: peEj.instrucciones || peQ.enunciado || prev.pe.instrucciones,
                minPalabras: peQ.minPalabras || prev.pe.minPalabras,
                criterios: peQ.criteriosEvaluacion
                  ? peQ.criteriosEvaluacion.map((c: { label: string }) => c.label)
                  : prev.pe.criterios,
              },
            }));
          }
        }

        if (seccion === "PO") {
          const ejercicios = data.ejercicios || [];
          if (ejercicios.length > 0) {
            // Collect sujetos from all parts
            const sujetos: string[] = [];
            let instrucciones = data.instruccionesGenerales || "";

            for (const ej of ejercicios) {
              if (ej.preguntas?.[0]?.sujetosAlternativos) {
                sujetos.push(...ej.preguntas[0].sujetosAlternativos);
              }
              if (!instrucciones && ej.instrucciones) {
                instrucciones = ej.instrucciones;
              }
            }

            setForm((prev) => ({
              ...prev,
              po: {
                instrucciones,
                sujeto1: sujetos[0] || prev.po.sujeto1,
                sujeto2: sujetos[1] || prev.po.sujeto2,
              },
            }));
          }
        }
      } catch {
        setError("Error de conexión al generar");
      } finally {
        setGenerating((prev) => ({ ...prev, [seccion]: false }));
      }
    },
    [form.nivel, canGenerate]
  );

  // ── Updaters ──

  function updateCOEjercicio(idx: number, patch: Partial<EjercicioForm>) {
    setForm((prev) => {
      const ejercicios = [...prev.seccionesCO.ejercicios];
      ejercicios[idx] = { ...ejercicios[idx], ...patch };
      return { ...prev, seccionesCO: { ...prev.seccionesCO, ejercicios } };
    });
  }

  function updateCOPregunta(ejIdx: number, pIdx: number, patch: Partial<PreguntaForm>) {
    setForm((prev) => {
      const ejercicios = [...prev.seccionesCO.ejercicios];
      const preguntas = [...ejercicios[ejIdx].preguntas];
      preguntas[pIdx] = { ...preguntas[pIdx], ...patch };
      ejercicios[ejIdx] = { ...ejercicios[ejIdx], preguntas };
      return { ...prev, seccionesCO: { ...prev.seccionesCO, ejercicios } };
    });
  }

  function updateCEEjercicio(idx: number, patch: Partial<EjercicioForm>) {
    setForm((prev) => {
      const ejercicios = [...prev.seccionesCE.ejercicios];
      ejercicios[idx] = { ...ejercicios[idx], ...patch };
      return { ...prev, seccionesCE: { ...prev.seccionesCE, ejercicios } };
    });
  }

  function updateCEPregunta(ejIdx: number, pIdx: number, patch: Partial<PreguntaForm>) {
    setForm((prev) => {
      const ejercicios = [...prev.seccionesCE.ejercicios];
      const preguntas = [...ejercicios[ejIdx].preguntas];
      preguntas[pIdx] = { ...preguntas[pIdx], ...patch };
      ejercicios[ejIdx] = { ...ejercicios[ejIdx], preguntas };
      return { ...prev, seccionesCE: { ...prev.seccionesCE, ejercicios } };
    });
  }

  // ── Render ──

  return (
    <div className="space-y-6">
      {/* Step indicator */}
      <div className="flex gap-2">
        {STEPS.map((s) => (
          <button
            key={s.num}
            onClick={() => setStep(s.num)}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              step === s.num
                ? "bg-rose-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
              {s.num}
            </span>
            {s.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Step 1: Config */}
      {step === 1 && (
        <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900">Configuración general</h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Nivel</label>
              <select
                value={form.nivel}
                onChange={(e) => {
                  const nivel = e.target.value as Nivel;
                  const match = NIVELES.find((n) => n.value === nivel);
                  setForm((prev) => ({
                    ...prev,
                    nivel,
                    diploma: match?.diploma || "DELF",
                  }));
                }}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              >
                <option value="">Seleccionar nivel</option>
                {NIVELES.map((n) => (
                  <option key={n.value} value={n.value}>
                    {n.diploma} {n.value}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Diploma</label>
              <input
                type="text"
                value={form.diploma}
                readOnly
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium text-gray-700">Título</label>
              <input
                type="text"
                value={form.titulo}
                onChange={(e) => setForm((prev) => ({ ...prev, titulo: e.target.value }))}
                placeholder="Ej: DELF B1 — Exemple 3"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Número de ejemplo</label>
              <input
                type="number"
                min={1}
                value={form.numero}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, numero: parseInt(e.target.value) || 1 }))
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div className="flex items-end gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.esPago}
                  onChange={(e) => setForm((prev) => ({ ...prev, esPago: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                De pago
              </label>
              {form.esPago && (
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Precio (céntimos)</label>
                  <input
                    type="number"
                    min={0}
                    value={form.precio ?? ""}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        precio: e.target.value ? parseInt(e.target.value) : null,
                      }))
                    }
                    placeholder="990"
                    className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="rounded-lg bg-rose-600 px-6 py-2 text-sm font-semibold text-white hover:bg-rose-700"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {/* Step 2: CO */}
      {step === 2 && (
        <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              🎧 Compréhension de l&apos;oral (CO)
            </h3>
            <div className="flex gap-2">
              {canGenerate && (
                <button
                  onClick={() => handleGenerate("CO")}
                  disabled={generating.CO}
                  className="rounded-lg border border-purple-300 bg-purple-50 px-3 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-100 disabled:opacity-50"
                >
                  {generating.CO ? "Génération en cours..." : "✨ Générer avec l'IA"}
                </button>
              )}
              <button
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    seccionesCO: {
                      ...prev.seccionesCO,
                      ejercicios: [...prev.seccionesCO.ejercicios, emptyEjercicio()],
                    },
                  }))
                }
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                + Ejercicio
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Instrucciones generales CO
            </label>
            <textarea
              value={form.seccionesCO.instruccionesGenerales}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  seccionesCO: { ...prev.seccionesCO, instruccionesGenerales: e.target.value },
                }))
              }
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          {form.seccionesCO.ejercicios.map((ej, ejIdx) => (
            <div key={ej.id} className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">Ejercicio {ejIdx + 1}</h4>
                {form.seccionesCO.ejercicios.length > 1 && (
                  <button
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        seccionesCO: {
                          ...prev.seccionesCO,
                          ejercicios: prev.seccionesCO.ejercicios.filter((_, i) => i !== ejIdx),
                        },
                      }))
                    }
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  placeholder="Título del ejercicio"
                  value={ej.titulo}
                  onChange={(e) => updateCOEjercicio(ejIdx, { titulo: e.target.value })}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                <input
                  placeholder="Instrucciones"
                  value={ej.instrucciones}
                  onChange={(e) => updateCOEjercicio(ejIdx, { instrucciones: e.target.value })}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              {/* Audio upload */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Audio</label>
                {ej.audio ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-green-600">Audio cargado ✓</span>
                    <button
                      onClick={() => updateCOEjercicio(ejIdx, { audio: undefined })}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Quitar
                    </button>
                  </div>
                ) : (
                  <input
                    type="file"
                    accept=".mp3,.wav,.ogg,.m4a"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleAudioUpload(ejIdx, file);
                    }}
                    className="w-full text-sm text-gray-500 file:mr-3 file:rounded-lg file:border-0 file:bg-rose-50 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-rose-600 hover:file:bg-rose-100"
                  />
                )}
              </div>

              {/* Preguntas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Preguntas</span>
                  <button
                    onClick={() =>
                      updateCOEjercicio(ejIdx, {
                        preguntas: [...ej.preguntas, emptyPregunta()],
                      })
                    }
                    className="text-xs text-rose-600 hover:text-rose-700"
                  >
                    + Pregunta
                  </button>
                </div>

                {ej.preguntas.map((p, pIdx) => (
                  <PreguntaEditor
                    key={p.id}
                    pregunta={p}
                    index={pIdx}
                    onUpdate={(patch) => updateCOPregunta(ejIdx, pIdx, patch)}
                    onRemove={
                      ej.preguntas.length > 1
                        ? () =>
                            updateCOEjercicio(ejIdx, {
                              preguntas: ej.preguntas.filter((_, i) => i !== pIdx),
                            })
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              ← Anterior
            </button>
            <button
              onClick={() => setStep(3)}
              className="rounded-lg bg-rose-600 px-6 py-2 text-sm font-semibold text-white hover:bg-rose-700"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {/* Step 3: CE */}
      {step === 3 && (
        <div className="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              📖 Compréhension des écrits (CE)
            </h3>
            <div className="flex gap-2">
              {canGenerate && (
                <button
                  onClick={() => handleGenerate("CE")}
                  disabled={generating.CE}
                  className="rounded-lg border border-purple-300 bg-purple-50 px-3 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-100 disabled:opacity-50"
                >
                  {generating.CE ? "Génération en cours..." : "✨ Générer avec l'IA"}
                </button>
              )}
              <button
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    seccionesCE: {
                      ...prev.seccionesCE,
                      ejercicios: [
                        ...prev.seccionesCE.ejercicios,
                        { ...emptyEjercicio(), texto: "" },
                      ],
                    },
                  }))
                }
                className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                + Ejercicio
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Instrucciones generales CE
            </label>
            <textarea
              value={form.seccionesCE.instruccionesGenerales}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  seccionesCE: { ...prev.seccionesCE, instruccionesGenerales: e.target.value },
                }))
              }
              rows={2}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
          </div>

          {form.seccionesCE.ejercicios.map((ej, ejIdx) => (
            <div key={ej.id} className="space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">Ejercicio {ejIdx + 1}</h4>
                {form.seccionesCE.ejercicios.length > 1 && (
                  <button
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        seccionesCE: {
                          ...prev.seccionesCE,
                          ejercicios: prev.seccionesCE.ejercicios.filter((_, i) => i !== ejIdx),
                        },
                      }))
                    }
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  placeholder="Título del ejercicio"
                  value={ej.titulo}
                  onChange={(e) => updateCEEjercicio(ejIdx, { titulo: e.target.value })}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                <input
                  placeholder="Instrucciones"
                  value={ej.instrucciones}
                  onChange={(e) => updateCEEjercicio(ejIdx, { instrucciones: e.target.value })}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              {/* Reading text */}
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Texto de lectura
                </label>
                <textarea
                  value={ej.texto || ""}
                  onChange={(e) => updateCEEjercicio(ejIdx, { texto: e.target.value })}
                  rows={6}
                  placeholder="Pega aquí el texto que el alumno debe leer..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>

              {/* Preguntas */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Preguntas</span>
                  <button
                    onClick={() =>
                      updateCEEjercicio(ejIdx, {
                        preguntas: [...ej.preguntas, emptyPregunta()],
                      })
                    }
                    className="text-xs text-rose-600 hover:text-rose-700"
                  >
                    + Pregunta
                  </button>
                </div>

                {ej.preguntas.map((p, pIdx) => (
                  <PreguntaEditor
                    key={p.id}
                    pregunta={p}
                    index={pIdx}
                    onUpdate={(patch) => updateCEPregunta(ejIdx, pIdx, patch)}
                    onRemove={
                      ej.preguntas.length > 1
                        ? () =>
                            updateCEEjercicio(ejIdx, {
                              preguntas: ej.preguntas.filter((_, i) => i !== pIdx),
                            })
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              ← Anterior
            </button>
            <button
              onClick={() => setStep(4)}
              className="rounded-lg bg-rose-600 px-6 py-2 text-sm font-semibold text-white hover:bg-rose-700"
            >
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {/* Step 4: PE + PO */}
      {step === 4 && (
        <div className="space-y-6 rounded-xl border bg-white p-6 shadow-sm">
          {/* PE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">✍️ Production écrite (PE)</h3>
              {canGenerate && (
                <button
                  onClick={() => handleGenerate("PE")}
                  disabled={generating.PE}
                  className="rounded-lg border border-purple-300 bg-purple-50 px-3 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-100 disabled:opacity-50"
                >
                  {generating.PE ? "Génération en cours..." : "✨ Générer avec l'IA"}
                </button>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Instrucciones / Consigne
              </label>
              <textarea
                value={form.pe.instrucciones}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, pe: { ...prev.pe, instrucciones: e.target.value } }))
                }
                rows={4}
                placeholder="Escribe aquí las instrucciones de la producción escrita..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Mínimo de palabras
              </label>
              <input
                type="number"
                min={0}
                value={form.pe.minPalabras}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    pe: { ...prev.pe, minPalabras: parseInt(e.target.value) || 0 },
                  }))
                }
                className="w-40 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Criterios de evaluación (FEI)
              </label>
              <div className="space-y-1">
                {form.pe.criterios.map((c, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      value={c}
                      onChange={(e) =>
                        setForm((prev) => {
                          const criterios = [...prev.pe.criterios];
                          criterios[i] = e.target.value;
                          return { ...prev, pe: { ...prev.pe, criterios } };
                        })
                      }
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                    {form.pe.criterios.length > 1 && (
                      <button
                        onClick={() =>
                          setForm((prev) => ({
                            ...prev,
                            pe: {
                              ...prev.pe,
                              criterios: prev.pe.criterios.filter((_, j) => j !== i),
                            },
                          }))
                        }
                        className="text-xs text-red-500"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      pe: { ...prev.pe, criterios: [...prev.pe.criterios, ""] },
                    }))
                  }
                  className="text-xs text-rose-600 hover:text-rose-700"
                >
                  + Criterio
                </button>
              </div>
            </div>
          </div>

          <hr />

          {/* PO */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">🎤 Production orale (PO)</h3>
              {canGenerate && (
                <button
                  onClick={() => handleGenerate("PO")}
                  disabled={generating.PO}
                  className="rounded-lg border border-purple-300 bg-purple-50 px-3 py-1.5 text-sm font-medium text-purple-700 hover:bg-purple-100 disabled:opacity-50"
                >
                  {generating.PO ? "Génération en cours..." : "✨ Générer avec l'IA"}
                </button>
              )}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Instrucciones generales
              </label>
              <textarea
                value={form.po.instrucciones}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, po: { ...prev.po, instrucciones: e.target.value } }))
                }
                rows={3}
                placeholder="Instrucciones para la producción oral..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Sujeto 1</label>
                <textarea
                  value={form.po.sujeto1}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, po: { ...prev.po, sujeto1: e.target.value } }))
                  }
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Sujeto 2</label>
                <textarea
                  value={form.po.sujeto2}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, po: { ...prev.po, sujeto2: e.target.value } }))
                  }
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
              </div>
            </div>
          </div>

          <hr />

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep(3)}
              className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              ← Anterior
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => handleSave("DRAFT")}
                disabled={saving}
                className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Guardar borrador"}
              </button>
              <button
                onClick={() => handleSave("REVIEW")}
                disabled={saving}
                className="rounded-lg bg-rose-600 px-6 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
              >
                {saving ? "Enviando..." : "Enviar a revisión"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── PreguntaEditor sub-component ──

function PreguntaEditor({
  pregunta,
  index,
  onUpdate,
  onRemove,
}: {
  pregunta: PreguntaForm;
  index: number;
  onUpdate: (patch: Partial<PreguntaForm>) => void;
  onRemove?: () => void;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 text-sm">
      <div className="mb-2 flex items-center gap-3">
        <span className="font-medium text-gray-700">P{index + 1}</span>
        <select
          value={pregunta.tipo}
          onChange={(e) => {
            const tipo = e.target.value as "qcm" | "vrai-faux";
            const patch: Partial<PreguntaForm> = { tipo };
            if (tipo === "vrai-faux") {
              patch.respuestaCorrecta = true;
              patch.opciones = [];
            } else {
              patch.respuestaCorrecta = "A";
              patch.opciones = [
                { letra: "A", texto: "" },
                { letra: "B", texto: "" },
                { letra: "C", texto: "" },
              ];
            }
            onUpdate(patch);
          }}
          className="rounded border border-gray-300 px-2 py-1 text-xs"
        >
          <option value="qcm">QCM</option>
          <option value="vrai-faux">Vrai / Faux</option>
        </select>
        <input
          type="number"
          min={0.5}
          step={0.5}
          value={pregunta.puntos}
          onChange={(e) => onUpdate({ puntos: parseFloat(e.target.value) || 1 })}
          className="w-16 rounded border border-gray-300 px-2 py-1 text-xs"
          title="Puntos"
        />
        <span className="text-xs text-gray-400">pts</span>
        {onRemove && (
          <button onClick={onRemove} className="ml-auto text-xs text-red-500 hover:text-red-700">
            ×
          </button>
        )}
      </div>

      <input
        placeholder="Enunciado de la pregunta"
        value={pregunta.enunciado}
        onChange={(e) => onUpdate({ enunciado: e.target.value })}
        className="mb-2 w-full rounded border border-gray-300 px-2 py-1.5 text-sm focus:border-rose-500 focus:outline-none"
      />

      {pregunta.tipo === "qcm" && (
        <div className="space-y-1">
          {pregunta.opciones.map((op, i) => (
            <div key={op.letra} className="flex items-center gap-2">
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="radio"
                  name={`correcta-${pregunta.id}`}
                  checked={pregunta.respuestaCorrecta === op.letra}
                  onChange={() => onUpdate({ respuestaCorrecta: op.letra })}
                  className="text-rose-600"
                />
                {op.letra}
              </label>
              <input
                value={op.texto}
                onChange={(e) => {
                  const opciones = [...pregunta.opciones];
                  opciones[i] = { ...opciones[i], texto: e.target.value };
                  onUpdate({ opciones });
                }}
                placeholder={`Opción ${op.letra}`}
                className="flex-1 rounded border border-gray-200 px-2 py-1 text-xs focus:border-rose-500 focus:outline-none"
              />
            </div>
          ))}
          {pregunta.opciones.length < 4 && (
            <button
              onClick={() => {
                const letras = ["A", "B", "C", "D"];
                const next = letras[pregunta.opciones.length];
                if (next) {
                  onUpdate({ opciones: [...pregunta.opciones, { letra: next, texto: "" }] });
                }
              }}
              className="text-xs text-rose-600"
            >
              + Opción
            </button>
          )}
        </div>
      )}

      {pregunta.tipo === "vrai-faux" && (
        <div className="flex gap-4">
          <label className="flex items-center gap-1 text-xs">
            <input
              type="radio"
              name={`vf-${pregunta.id}`}
              checked={pregunta.respuestaCorrecta === true}
              onChange={() => onUpdate({ respuestaCorrecta: true })}
              className="text-rose-600"
            />
            Vrai
          </label>
          <label className="flex items-center gap-1 text-xs">
            <input
              type="radio"
              name={`vf-${pregunta.id}`}
              checked={pregunta.respuestaCorrecta === false}
              onChange={() => onUpdate({ respuestaCorrecta: false })}
              className="text-rose-600"
            />
            Faux
          </label>
        </div>
      )}
    </div>
  );
}

// ── Deserialization helper ──

function deserializeSecciones(data: ExamWizardProps["initialData"]): ExamFormData {
  const base = initialFormData();
  if (!data) return base;

  base.titulo = data.titulo;
  base.nivel = (data.nivel as Nivel) || "";
  base.diploma = (data.diploma as Diploma) || "DELF";
  base.numero = data.numero;
  base.esPago = data.esPago;
  base.precio = data.precio;

  const secciones = (data.secciones as Array<{
    codigo: string;
    instruccionesGenerales?: string;
    duracionMinutos?: number;
    titulo?: string;
    ejercicios?: Array<{
      id: string;
      titulo: string;
      instrucciones: string;
      texto?: string;
      audio?: string;
      numEscuchas?: number;
      preguntas: Array<{
        id: string;
        tipo: string;
        enunciado: string;
        puntos: number;
        opciones?: { letra: string; texto: string }[];
        respuestaCorrecta?: string | boolean;
        minPalabras?: number;
        criteriosEvaluacion?: { label: string }[];
        sujetosAlternativos?: string[];
      }>;
    }>;
  }>) || [];

  for (const sec of secciones) {
    if (sec.codigo === "CO" && sec.ejercicios) {
      base.seccionesCO.instruccionesGenerales = sec.instruccionesGenerales || "";
      base.seccionesCO.duracionMinutos = sec.duracionMinutos || 25;
      base.seccionesCO.titulo = sec.titulo || base.seccionesCO.titulo;
      base.seccionesCO.ejercicios = sec.ejercicios.map((ej) => ({
        id: ej.id,
        titulo: ej.titulo,
        instrucciones: ej.instrucciones,
        audio: ej.audio,
        numEscuchas: ej.numEscuchas || 2,
        preguntas: ej.preguntas.map((p) => ({
          id: p.id,
          tipo: (p.tipo as "qcm" | "vrai-faux") || "qcm",
          enunciado: p.enunciado,
          puntos: p.puntos,
          opciones: p.opciones || [
            { letra: "A", texto: "" },
            { letra: "B", texto: "" },
            { letra: "C", texto: "" },
          ],
          respuestaCorrecta: p.respuestaCorrecta ?? "A",
        })),
      }));
    }

    if (sec.codigo === "CE" && sec.ejercicios) {
      base.seccionesCE.instruccionesGenerales = sec.instruccionesGenerales || "";
      base.seccionesCE.duracionMinutos = sec.duracionMinutos || 30;
      base.seccionesCE.titulo = sec.titulo || base.seccionesCE.titulo;
      base.seccionesCE.ejercicios = sec.ejercicios.map((ej) => ({
        id: ej.id,
        titulo: ej.titulo,
        instrucciones: ej.instrucciones,
        texto: ej.texto,
        numEscuchas: 2,
        preguntas: ej.preguntas.map((p) => ({
          id: p.id,
          tipo: (p.tipo as "qcm" | "vrai-faux") || "qcm",
          enunciado: p.enunciado,
          puntos: p.puntos,
          opciones: p.opciones || [
            { letra: "A", texto: "" },
            { letra: "B", texto: "" },
            { letra: "C", texto: "" },
          ],
          respuestaCorrecta: p.respuestaCorrecta ?? "A",
        })),
      }));
    }

    if (sec.codigo === "PE" && sec.ejercicios?.[0]?.preguntas?.[0]) {
      const peQ = sec.ejercicios[0].preguntas[0];
      base.pe.instrucciones = peQ.enunciado || sec.instruccionesGenerales || "";
      base.pe.minPalabras = peQ.minPalabras || 160;
      base.pe.criterios = peQ.criteriosEvaluacion?.map((c) => c.label) || base.pe.criterios;
    }

    if (sec.codigo === "PO" && sec.ejercicios?.[0]?.preguntas?.[0]) {
      const poQ = sec.ejercicios[0].preguntas[0];
      base.po.instrucciones = poQ.enunciado || sec.instruccionesGenerales || "";
      base.po.sujeto1 = poQ.sujetosAlternativos?.[0] || "";
      base.po.sujeto2 = poQ.sujetosAlternativos?.[1] || "";
    }
  }

  return base;
}
