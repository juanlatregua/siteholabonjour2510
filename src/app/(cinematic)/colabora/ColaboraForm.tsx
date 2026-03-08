"use client";

import React, { useState, useRef, useCallback } from "react";

const NIVEL_OPTIONS = [
  "Hablante nativo",
  "DALF C2",
  "DALF C1",
  "Otro (especificar)",
];

const TITULACION_OPTIONS = [
  "Filología Francesa / Estudios Franceses",
  "Traducción e Interpretación (francés)",
  "Máster FLE",
  "DAEFLE (Alliance Française + CNED)",
  "DPAFP (Alliance Française París)",
  "Magisterio especialidad francés",
  "Máster Formación del Profesorado (francés)",
  "Otra titulación equivalente",
];

const ESPECIALIDAD_OPTIONS = [
  "Preparación DELF/DALF",
  "Francés de negocios / empresas",
  "Conversación y pronunciación",
  "Francés para niños o adolescentes",
  "Francés jurídico o administrativo",
];

const COMO_OPTIONS = [
  "",
  "Google",
  "Redes sociales",
  "Recomendación",
  "Alliance Française",
  "Otro",
];

interface UploadedFile {
  name: string;
  path: string;
}

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  nivelFrances: string;
  nivelFrancesOtro: string;
  titulacion: string;
  titulacionDetalle: string;
  experiencia: string;
  disponibilidad: string;
  linkedinUrl: string;
  motivacion: string;
  especialidades: string[];
  especialidadOtro: string;
  otrosIdiomas: string;
  comoNosConociste: string;
}

const initial: FormData = {
  nombre: "",
  email: "",
  telefono: "+34 ",
  nivelFrances: "",
  nivelFrancesOtro: "",
  titulacion: "",
  titulacionDetalle: "",
  experiencia: "",
  disponibilidad: "",
  linkedinUrl: "",
  motivacion: "",
  especialidades: [],
  especialidadOtro: "",
  otrosIdiomas: "",
  comoNosConociste: "",
};

const MAX_FILES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

type Errors = Partial<Record<keyof FormData, string>>;

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.65rem 1rem",
  borderRadius: "0.75rem",
  border: "1px solid rgba(30,45,74,0.15)",
  background: "#ffffff",
  color: "#1e2d4a",
  fontSize: "0.9rem",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: 600,
  marginBottom: "0.25rem",
  color: "#1e2d4a",
};

const errorStyle: React.CSSProperties = {
  fontSize: "0.8rem",
  color: "#ef4444",
  marginTop: "0.25rem",
};

export default function ColaboraForm() {
  const [form, setForm] = useState<FormData>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) =>
      setForm((prev) => ({ ...prev, [key]: value })),
    []
  );

  async function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files;
    if (!selected || selected.length === 0) return;

    const remaining = MAX_FILES - files.length;
    if (remaining <= 0) {
      setUploadError(`Máximo ${MAX_FILES} archivos`);
      return;
    }

    const toUpload = Array.from(selected).slice(0, remaining);
    setUploadError("");
    setUploading(true);

    for (const file of toUpload) {
      if (file.size > MAX_FILE_SIZE) {
        setUploadError(`"${file.name}" supera 5 MB`);
        continue;
      }
      if (!["application/pdf", "image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        setUploadError(`"${file.name}": solo PDF, JPG o PNG`);
        continue;
      }

      const fd = new window.FormData();
      fd.append("file", file);

      try {
        const res = await fetch("/api/public/colabora/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (!res.ok) {
          setUploadError(data.error || "Error al subir archivo");
          continue;
        }
        setFiles((prev) => [...prev, { name: file.name, path: data.path }]);
      } catch {
        setUploadError("Error de conexión al subir archivo");
      }
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeFile(path: string) {
    setFiles((prev) => prev.filter((f) => f.path !== path));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!form.nombre.trim()) e.nombre = "El nombre es obligatorio";
    if (!form.email.trim()) e.email = "El email es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email inválido";
    if (!form.telefono.trim() || form.telefono.trim() === "+34") e.telefono = "El teléfono es obligatorio";
    if (!form.nivelFrances) e.nivelFrances = "Selecciona tu nivel de francés";
    if (form.nivelFrances === "Otro (especificar)" && !form.nivelFrancesOtro.trim())
      e.nivelFrancesOtro = "Especifica tu nivel";
    if (!form.titulacion) e.titulacion = "Selecciona tu titulación";
    if (!form.titulacionDetalle.trim()) e.titulacionDetalle = "Especifica tu titulación y centro";
    const exp = parseInt(form.experiencia, 10);
    if (!form.experiencia || isNaN(exp) || exp < 1)
      e.experiencia = "Se requiere al menos 1 año de experiencia";
    const disp = parseInt(form.disponibilidad, 10);
    if (!form.disponibilidad || isNaN(disp) || disp < 4)
      e.disponibilidad = "La disponibilidad mínima es de 4 horas semanales";
    if (form.linkedinUrl.trim() && !/^https?:\/\//.test(form.linkedinUrl))
      e.linkedinUrl = "La URL debe empezar por http:// o https://";
    if (form.motivacion.length < 200)
      e.motivacion = "Por favor escribe al menos 200 caracteres contando tu motivación y experiencia relevante.";
    return e;
  }

  function scrollToFirstError(errs: Errors) {
    const firstKey = Object.keys(errs)[0];
    if (firstKey && formRef.current) {
      const el = formRef.current.querySelector(`[data-field="${firstKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      scrollToFirstError(errs);
      return;
    }

    setSubmitting(true);
    setServerError("");

    try {
      const res = await fetch("/api/public/colabora", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          experiencia: parseInt(form.experiencia, 10),
          disponibilidad: parseInt(form.disponibilidad, 10),
          archivos: files,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.message || "Error al enviar. Inténtalo de nuevo.");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div
        style={{
          background: "#ffffff",
          border: "1px solid rgba(16,185,129,0.3)",
          borderRadius: "1rem",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🎉</p>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "0.75rem" }}>
          ¡Gracias por tu candidatura!
        </h3>
        <p style={{ fontSize: "0.9rem", color: "#3d4a5c", lineHeight: 1.6 }}>
          Revisaremos tu perfil y nos pondremos en contacto contigo en un plazo de 7 días.
          Hemos enviado un acuse de recibo a <strong>{form.email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      style={{
        background: "#ffffff",
        border: "1px solid rgba(30,45,74,0.08)",
        borderRadius: "1rem",
        padding: "1.5rem",
        boxShadow: "0 2px 12px rgba(30,45,74,0.06)",
      }}
    >
      <div className="space-y-5">
        {/* Nombre */}
        <div data-field="nombre">
          <label style={labelStyle}>Nombre completo *</label>
          <input
            type="text"
            value={form.nombre}
            onChange={(e) => set("nombre", e.target.value)}
            placeholder="Tu nombre completo"
            style={{ ...inputStyle, borderColor: errors.nombre ? "#ef4444" : undefined }}
          />
          {errors.nombre && <p style={errorStyle}>{errors.nombre}</p>}
        </div>

        {/* Email */}
        <div data-field="email">
          <label style={labelStyle}>Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="tu@email.com"
            style={{ ...inputStyle, borderColor: errors.email ? "#ef4444" : undefined }}
          />
          {errors.email && <p style={errorStyle}>{errors.email}</p>}
        </div>

        {/* Teléfono */}
        <div data-field="telefono">
          <label style={labelStyle}>Teléfono *</label>
          <input
            type="tel"
            value={form.telefono}
            onChange={(e) => set("telefono", e.target.value)}
            placeholder="+34 600 123 456"
            style={{ ...inputStyle, borderColor: errors.telefono ? "#ef4444" : undefined }}
          />
          {errors.telefono && <p style={errorStyle}>{errors.telefono}</p>}
        </div>

        {/* Nivel de francés */}
        <div data-field="nivelFrances">
          <label style={labelStyle}>Nivel de francés *</label>
          <select
            value={form.nivelFrances}
            onChange={(e) => set("nivelFrances", e.target.value)}
            style={{ ...inputStyle, borderColor: errors.nivelFrances ? "#ef4444" : undefined }}
          >
            <option value="">Seleccionar...</option>
            {NIVEL_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {errors.nivelFrances && <p style={errorStyle}>{errors.nivelFrances}</p>}
          {form.nivelFrances === "Otro (especificar)" && (
            <div style={{ marginTop: "0.5rem" }} data-field="nivelFrancesOtro">
              <input
                type="text"
                value={form.nivelFrancesOtro}
                onChange={(e) => set("nivelFrancesOtro", e.target.value)}
                placeholder="Especifica tu nivel y certificación"
                style={{ ...inputStyle, borderColor: errors.nivelFrancesOtro ? "#ef4444" : undefined }}
              />
              {errors.nivelFrancesOtro && <p style={errorStyle}>{errors.nivelFrancesOtro}</p>}
            </div>
          )}
        </div>

        {/* Titulación */}
        <div data-field="titulacion">
          <label style={labelStyle}>Titulación principal *</label>
          <select
            value={form.titulacion}
            onChange={(e) => set("titulacion", e.target.value)}
            style={{ ...inputStyle, borderColor: errors.titulacion ? "#ef4444" : undefined }}
          >
            <option value="">Seleccionar...</option>
            {TITULACION_OPTIONS.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
          {errors.titulacion && <p style={errorStyle}>{errors.titulacion}</p>}
        </div>

        {/* Titulación detalle */}
        <div data-field="titulacionDetalle">
          <label style={labelStyle}>Especifica tu titulación y centro *</label>
          <input
            type="text"
            value={form.titulacionDetalle}
            onChange={(e) => set("titulacionDetalle", e.target.value)}
            placeholder="Ej: Máster FLE — Université de Grenoble"
            style={{ ...inputStyle, borderColor: errors.titulacionDetalle ? "#ef4444" : undefined }}
          />
          <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.2rem" }}>
            Se aceptan titulaciones equivalentes de sistemas educativos francófonos (CAPES, etc.)
          </p>
          {errors.titulacionDetalle && <p style={errorStyle}>{errors.titulacionDetalle}</p>}
        </div>

        {/* Experiencia */}
        <div data-field="experiencia">
          <label style={labelStyle}>Años de experiencia enseñando francés a adultos *</label>
          <input
            type="number"
            min={1}
            value={form.experiencia}
            onChange={(e) => set("experiencia", e.target.value)}
            placeholder="Ej: 3"
            style={{ ...inputStyle, maxWidth: 160, borderColor: errors.experiencia ? "#ef4444" : undefined }}
          />
          {errors.experiencia && <p style={errorStyle}>{errors.experiencia}</p>}
        </div>

        {/* Disponibilidad */}
        <div data-field="disponibilidad">
          <label style={labelStyle}>Disponibilidad semanal (horas) *</label>
          <input
            type="number"
            min={4}
            value={form.disponibilidad}
            onChange={(e) => set("disponibilidad", e.target.value)}
            placeholder="Mínimo 4"
            style={{ ...inputStyle, maxWidth: 160, borderColor: errors.disponibilidad ? "#ef4444" : undefined }}
          />
          {errors.disponibilidad && <p style={errorStyle}>{errors.disponibilidad}</p>}
        </div>

        {/* Documentación */}
        <div data-field="archivos">
          <label style={labelStyle}>CV y documentación (títulos, certificados) *</label>
          <p style={{ fontSize: "0.8rem", color: "#5f6b78", marginBottom: "0.5rem" }}>
            Sube tu CV y copias de títulos o certificaciones. PDF, JPG o PNG, máx. 5 MB por archivo.
          </p>

          {/* Uploaded files list */}
          {files.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", marginBottom: "0.5rem" }}>
              {files.map((f) => (
                <div
                  key={f.path}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.4rem 0.75rem",
                    background: "rgba(16,185,129,0.06)",
                    border: "1px solid rgba(16,185,129,0.2)",
                    borderRadius: "0.5rem",
                    fontSize: "0.85rem",
                    color: "#1e2d4a",
                  }}
                >
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>
                    ✓ {f.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(f.path)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ef4444",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      marginLeft: "0.5rem",
                      flexShrink: 0,
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload button */}
          {files.length < MAX_FILES && (
            <label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.75rem",
                borderRadius: "0.75rem",
                border: "2px dashed rgba(30,45,74,0.15)",
                background: "rgba(30,45,74,0.02)",
                cursor: uploading ? "default" : "pointer",
                fontSize: "0.9rem",
                color: uploading ? "#9ca3af" : "#395D9F",
                fontWeight: 600,
                transition: "all 0.15s",
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                multiple
                onChange={handleFileSelect}
                disabled={uploading}
                style={{ display: "none" }}
              />
              {uploading ? "Subiendo..." : `+ Añadir archivo${files.length > 0 ? "" : " (CV, títulos...)"}`}
            </label>
          )}

          {uploadError && <p style={errorStyle}>{uploadError}</p>}
          <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.25rem" }}>
            {files.length}/{MAX_FILES} archivos · Formatos: PDF, JPG, PNG
          </p>
        </div>

        {/* LinkedIn (opcional) */}
        <div data-field="linkedinUrl">
          <label style={labelStyle}>LinkedIn o enlace a portfolio online</label>
          <input
            type="url"
            value={form.linkedinUrl}
            onChange={(e) => set("linkedinUrl", e.target.value)}
            placeholder="https://linkedin.com/in/tu-perfil"
            style={{ ...inputStyle, borderColor: errors.linkedinUrl ? "#ef4444" : undefined }}
          />
          {errors.linkedinUrl && <p style={errorStyle}>{errors.linkedinUrl}</p>}
        </div>

        {/* Motivación */}
        <div data-field="motivacion">
          <label style={labelStyle}>Carta de motivación *</label>
          <textarea
            value={form.motivacion}
            onChange={(e) => set("motivacion", e.target.value)}
            rows={6}
            placeholder="Cuéntanos por qué quieres colaborar con HolaBonjour, tu experiencia relevante y qué te motiva como profesor/a de FLE..."
            style={{
              ...inputStyle,
              resize: "vertical",
              minHeight: 140,
              borderColor: errors.motivacion ? "#ef4444" : undefined,
            }}
          />
          <p style={{
            fontSize: "0.8rem",
            marginTop: "0.25rem",
            color: form.motivacion.length >= 200 ? "#10b981" : "#9ca3af",
            fontWeight: form.motivacion.length >= 200 ? 600 : 400,
          }}>
            {form.motivacion.length} / 200 caracteres mínimos
          </p>
          {errors.motivacion && <p style={errorStyle}>{errors.motivacion}</p>}
        </div>

        {/* Separator */}
        <hr style={{ border: 0, borderTop: "1px solid rgba(30,45,74,0.08)", margin: "0.5rem 0" }} />
        <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#5f6b78" }}>Campos opcionales</p>

        {/* Especialidades */}
        <div>
          <label style={labelStyle}>Especialidades</label>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {ESPECIALIDAD_OPTIONS.map((esp) => (
              <label key={esp} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#3d4a5c", cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={form.especialidades.includes(esp)}
                  onChange={(e) => {
                    set(
                      "especialidades",
                      e.target.checked
                        ? [...form.especialidades, esp]
                        : form.especialidades.filter((s) => s !== esp)
                    );
                  }}
                  style={{ accentColor: "#E50046" }}
                />
                {esp}
              </label>
            ))}
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.9rem", color: "#3d4a5c", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={form.especialidades.includes("Otro")}
                onChange={(e) => {
                  set(
                    "especialidades",
                    e.target.checked
                      ? [...form.especialidades, "Otro"]
                      : form.especialidades.filter((s) => s !== "Otro")
                  );
                  if (!e.target.checked) set("especialidadOtro", "");
                }}
                style={{ accentColor: "#E50046" }}
              />
              Otro
            </label>
            {form.especialidades.includes("Otro") && (
              <input
                type="text"
                value={form.especialidadOtro}
                onChange={(e) => set("especialidadOtro", e.target.value)}
                placeholder="Especifica..."
                style={{ ...inputStyle, marginLeft: "1.5rem", width: "calc(100% - 1.5rem)" }}
              />
            )}
          </div>
        </div>

        {/* Otros idiomas */}
        <div>
          <label style={labelStyle}>Otros idiomas que hablas</label>
          <input
            type="text"
            value={form.otrosIdiomas}
            onChange={(e) => set("otrosIdiomas", e.target.value)}
            placeholder="Ej: Español nativo, inglés C1, árabe B2"
            style={inputStyle}
          />
        </div>

        {/* Cómo nos conociste */}
        <div>
          <label style={labelStyle}>¿Cómo nos has conocido?</label>
          <select
            value={form.comoNosConociste}
            onChange={(e) => set("comoNosConociste", e.target.value)}
            style={inputStyle}
          >
            {COMO_OPTIONS.map((o) => (
              <option key={o} value={o}>{o || "Seleccionar..."}</option>
            ))}
          </select>
        </div>

        {/* Server error */}
        {serverError && (
          <p style={{
            borderRadius: "0.75rem",
            padding: "0.75rem",
            fontSize: "0.85rem",
            fontWeight: 600,
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#ef4444",
          }}>
            {serverError}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            padding: "0.85rem",
            borderRadius: "0.75rem",
            background: submitting ? "rgba(229,0,70,0.4)" : "#E50046",
            color: "white",
            border: "none",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: submitting ? "default" : "pointer",
            transition: "all 0.15s",
          }}
        >
          {submitting ? "Enviando..." : "Enviar candidatura"}
        </button>
      </div>
    </form>
  );
}
