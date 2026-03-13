"use client";

import React, { useState, useCallback, useRef } from "react";

interface FormData {
  fullName: string;
  email: string;
  nationality: string;
  location: string;
  yearsExperience: number;
  levels: string[];
  specialties: string[];
  bio: string;
}

interface UploadedFile {
  name: string;
  path: string;
}

type Errors = Partial<Record<keyof FormData | "diplomas", string>>;

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const SPECIALTIES = [
  "Preparación DELF",
  "Preparación DALF",
  "Conversación",
  "Francés para empresas",
  "Oposiciones",
  "Francés general",
  "Francés para niños",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "#fff",
  border: "1px solid rgba(30,45,74,0.15)",
  borderRadius: "0.75rem",
  fontSize: "0.9rem",
  color: "#1e2d4a",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.82rem",
  fontWeight: 600,
  color: "#1e2d4a",
  marginBottom: "0.35rem",
};

const errorStyle: React.CSSProperties = {
  fontSize: "0.78rem",
  color: "#dc2626",
  marginTop: "0.25rem",
};

export default function AplicarForm() {
  const [form, setForm] = useState<FormData>({
    fullName: "",
    email: "",
    nationality: "",
    location: "",
    yearsExperience: 1,
    levels: [],
    specialties: [],
    bio: "",
  });

  const [diplomas, setDiplomas] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const set = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  function toggleArray(key: "levels" | "specialties", value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value],
    }));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!form.fullName.trim()) e.fullName = "El nombre es obligatorio";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Email inválido";
    if (!form.location.trim()) e.location = "La ubicación es obligatoria";
    if (form.yearsExperience < 1) e.yearsExperience = "Mínimo 1 año";
    if (form.levels.length === 0) e.levels = "Selecciona al menos un nivel";
    if (form.specialties.length === 0) e.specialties = "Selecciona al menos una especialidad";
    if (form.bio.length < 100) e.bio = "Mínimo 100 caracteres";
    if (diplomas.length === 0) e.diplomas = "Sube al menos un diploma";
    return e;
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    for (const file of Array.from(files)) {
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} es demasiado grande (máx 10 MB)`);
        continue;
      }

      const fd = new FormData();
      fd.append("file", file);

      try {
        const res = await fetch("/api/public/colabora/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (data.ok && data.path) {
          setDiplomas((prev) => [...prev, { name: file.name, path: data.path }]);
        } else {
          alert(`Error al subir ${file.name}`);
        }
      } catch {
        alert(`Error de red al subir ${file.name}`);
      }
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeDiploma(path: string) {
    setDiplomas((prev) => prev.filter((d) => d.path !== path));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const firstKey = Object.keys(errs)[0];
      document.querySelector(`[data-field="${firstKey}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/profesores/aplicar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          diplomaUrls: diplomas.map((d) => d.path),
        }),
      });

      if (res.ok) {
        setSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const data = await res.json();
        alert(data.message || "Error al enviar la candidatura");
      }
    } catch {
      alert("Error de red. Inténtalo de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #a7f3d0",
          borderRadius: "1rem",
          padding: "2.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>&#9989;</div>
        <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "0.75rem" }}>
          Candidatura recibida
        </h2>
        <p style={{ color: "#3d4a5c", fontSize: "0.95rem", lineHeight: 1.6, maxWidth: 420, margin: "0 auto" }}>
          Estamos verificando tus diplomas con IA y revisando tu perfil.
          Recibirás una respuesta en tu email en un máximo de <strong>48 horas</strong>.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#fff",
        border: "1px solid rgba(30,45,74,0.08)",
        borderRadius: "1rem",
        padding: "2rem",
      }}
    >
      {/* Full Name */}
      <div data-field="fullName" style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Nombre completo *</label>
        <input
          type="text"
          value={form.fullName}
          onChange={(e) => set("fullName", e.target.value)}
          placeholder="Como aparece en tus diplomas"
          style={inputStyle}
        />
        {errors.fullName && <p style={errorStyle}>{errors.fullName}</p>}
      </div>

      {/* Email */}
      <div data-field="email" style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Email *</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => set("email", e.target.value)}
          placeholder="tu@email.com"
          style={inputStyle}
        />
        {errors.email && <p style={errorStyle}>{errors.email}</p>}
      </div>

      {/* Nationality + Location */}
      <div className="grid gap-4 sm:grid-cols-2" style={{ marginBottom: "1.25rem" }}>
        <div>
          <label style={labelStyle}>Nacionalidad</label>
          <input
            type="text"
            value={form.nationality}
            onChange={(e) => set("nationality", e.target.value)}
            placeholder="Francesa, española..."
            style={inputStyle}
          />
        </div>
        <div data-field="location">
          <label style={labelStyle}>Ubicación *</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => set("location", e.target.value)}
            placeholder="Ciudad, país"
            style={inputStyle}
          />
          {errors.location && <p style={errorStyle}>{errors.location}</p>}
        </div>
      </div>

      {/* Experience */}
      <div data-field="yearsExperience" style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Años de experiencia enseñando francés *</label>
        <input
          type="number"
          min={1}
          max={50}
          value={form.yearsExperience}
          onChange={(e) => set("yearsExperience", parseInt(e.target.value) || 1)}
          style={{ ...inputStyle, maxWidth: 120 }}
        />
        {errors.yearsExperience && <p style={errorStyle}>{errors.yearsExperience}</p>}
      </div>

      {/* Levels */}
      <div data-field="levels" style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Niveles que impartes *</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {LEVELS.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => toggleArray("levels", l)}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: "0.5rem",
                fontSize: "0.85rem",
                fontWeight: form.levels.includes(l) ? 700 : 500,
                background: form.levels.includes(l) ? "#1e2d4a" : "#fff",
                color: form.levels.includes(l) ? "#fff" : "#3d4a5c",
                border: form.levels.includes(l) ? "none" : "1px solid rgba(30,45,74,0.15)",
                cursor: "pointer",
              }}
            >
              {l}
            </button>
          ))}
        </div>
        {errors.levels && <p style={errorStyle}>{errors.levels}</p>}
      </div>

      {/* Specialties */}
      <div data-field="specialties" style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Especialidades *</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {SPECIALTIES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleArray("specialties", s)}
              style={{
                padding: "0.4rem 0.85rem",
                borderRadius: "0.5rem",
                fontSize: "0.82rem",
                fontWeight: form.specialties.includes(s) ? 700 : 500,
                background: form.specialties.includes(s) ? "#E50046" : "#fff",
                color: form.specialties.includes(s) ? "#fff" : "#3d4a5c",
                border: form.specialties.includes(s) ? "none" : "1px solid rgba(30,45,74,0.15)",
                cursor: "pointer",
              }}
            >
              {s}
            </button>
          ))}
        </div>
        {errors.specialties && <p style={errorStyle}>{errors.specialties}</p>}
      </div>

      {/* Diplomas upload */}
      <div data-field="diplomas" style={{ marginBottom: "1.25rem" }}>
        <label style={labelStyle}>Diplomas y certificaciones *</label>
        <p style={{ fontSize: "0.78rem", color: "#5f6b78", marginBottom: "0.5rem" }}>
          PDF o imagen (máx 10 MB). Máster FLE, DAEFLE, habilitación DELF/DALF, CAPES, Filología...
        </p>
        <input
          ref={fileRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.webp"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            width: "100%",
            padding: "1rem",
            background: "#faf7f2",
            border: "2px dashed rgba(30,45,74,0.15)",
            borderRadius: "0.75rem",
            fontSize: "0.9rem",
            color: "#5f6b78",
            cursor: uploading ? "wait" : "pointer",
          }}
        >
          {uploading ? "Subiendo..." : "Haz clic para subir diplomas"}
        </button>
        {diplomas.length > 0 && (
          <div className="mt-2 space-y-1.5">
            {diplomas.map((d) => (
              <div
                key={d.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.5rem 0.75rem",
                  background: "#f0f4ff",
                  borderRadius: "0.5rem",
                  fontSize: "0.82rem",
                }}
              >
                <span style={{ color: "#1e2d4a", fontWeight: 500 }}>{d.name}</span>
                <button
                  type="button"
                  onClick={() => removeDiploma(d.path)}
                  style={{ color: "#dc2626", fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontSize: "0.8rem" }}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
        {errors.diplomas && <p style={errorStyle}>{errors.diplomas}</p>}
      </div>

      {/* Bio */}
      <div data-field="bio" style={{ marginBottom: "1.5rem" }}>
        <label style={labelStyle}>Cuéntanos sobre ti *</label>
        <p style={{ fontSize: "0.78rem", color: "#5f6b78", marginBottom: "0.5rem" }}>
          Breve bio profesional. Esto aparecerá en tu perfil público. Mínimo 100 caracteres.
        </p>
        <textarea
          value={form.bio}
          onChange={(e) => set("bio", e.target.value)}
          rows={5}
          maxLength={2000}
          placeholder="Tu formación, experiencia, enfoque de enseñanza..."
          style={{ ...inputStyle, resize: "vertical" }}
        />
        <p
          style={{
            fontSize: "0.75rem",
            textAlign: "right",
            color: form.bio.length >= 100 ? "#059669" : "#5f6b78",
            marginTop: "0.2rem",
          }}
        >
          {form.bio.length}/2000
        </p>
        {errors.bio && <p style={errorStyle}>{errors.bio}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        style={{
          width: "100%",
          padding: "1rem",
          background: "#E50046",
          color: "#fff",
          fontWeight: 700,
          fontSize: "1rem",
          borderRadius: "0.75rem",
          border: "none",
          cursor: submitting ? "wait" : "pointer",
          opacity: submitting ? 0.7 : 1,
          boxShadow: "0 4px 14px rgba(229,0,70,0.3)",
        }}
      >
        {submitting ? "Enviando candidatura..." : "Enviar candidatura"}
      </button>

      <p style={{ textAlign: "center", fontSize: "0.78rem", color: "#5f6b78", marginTop: "1rem" }}>
        Al enviar, aceptas que escaneemos tus diplomas con IA para verificar tus credenciales.
      </p>
    </form>
  );
}
