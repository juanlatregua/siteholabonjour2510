"use client";

import React, { useState, useRef } from "react";
import { FiCamera, FiSave, FiExternalLink, FiCheck } from "react-icons/fi";

interface Profile {
  id: string;
  slug: string;
  displayName: string;
  bio: string;
  photo: string | null;
  photoUrl: string | null;
  languages: string[];
  specialties: string[];
  levels: string[];
  hourlyRate: number;
  videoLink: string;
  status: string;
  certificationVerified: boolean;
  avgRating: number | null;
  totalClasses: number;
}

const ALL_LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const ALL_SPECIALTIES = [
  "DELF", "DALF", "TCF", "TEF",
  "Conversación", "Gramática", "Fonética",
  "Francés empresas", "Francés jurídico", "Francés médico",
  "Niños", "Adultos",
];
const ALL_LANGUAGES = ["Francés", "Español", "Inglés", "Portugués", "Italiano", "Alemán", "Árabe", "Chino"];

export default function PerfilProfesorForm({ profile }: { profile: Profile }) {
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [bio, setBio] = useState(profile.bio);
  const [languages, setLanguages] = useState<string[]>(profile.languages);
  const [specialties, setSpecialties] = useState<string[]>(profile.specialties);
  const [levels, setLevels] = useState<string[]>(profile.levels);
  const [hourlyRate, setHourlyRate] = useState(profile.hourlyRate);
  const [videoLink, setVideoLink] = useState(profile.videoLink);
  const [photoUrl, setPhotoUrl] = useState(profile.photoUrl);
  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function toggleItem(arr: string[], item: string, setter: (v: string[]) => void) {
    setter(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
  }

  async function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPhoto(true);
    try {
      const formData = new FormData();
      formData.append("photo", file);

      const res = await fetch("/api/zona-profesor/perfil", {
        method: "PATCH",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPhotoUrl(data.photoUrl);
      setMessage({ type: "success", text: "Foto actualizada" });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Error al subir la foto" });
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function handleSave() {
    if (!displayName.trim() || displayName.trim().length < 2) {
      setMessage({ type: "error", text: "El nombre debe tener al menos 2 caracteres" });
      return;
    }
    if (levels.length === 0) {
      setMessage({ type: "error", text: "Selecciona al menos un nivel" });
      return;
    }
    if (hourlyRate < 5) {
      setMessage({ type: "error", text: "La tarifa mínima es 5€/h" });
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/zona-profesor/perfil", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName, bio, languages, specialties, levels, hourlyRate, videoLink }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setMessage({ type: "success", text: "Perfil guardado correctamente" });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Error al guardar" });
    } finally {
      setSaving(false);
    }
  }

  const statusBadge = profile.status === "ACTIVE"
    ? { bg: "#d1fae5", text: "#065f46", label: "Activo" }
    : profile.status === "PENDING"
    ? { bg: "#fef3c7", text: "#92400e", label: "Pendiente de activación" }
    : { bg: "#fee2e2", text: "#991b1b", label: "Suspendido" };

  return (
    <div className="space-y-6">
      {/* Status + Public link */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
          padding: "1rem 1.25rem",
          background: "#fff",
          border: "1px solid rgba(30,45,74,0.08)",
          borderRadius: "0.875rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              padding: "0.2rem 0.6rem",
              borderRadius: "0.25rem",
              background: statusBadge.bg,
              color: statusBadge.text,
            }}
          >
            {statusBadge.label}
          </span>
          {profile.certificationVerified && (
            <span style={{ fontSize: "0.75rem", color: "#059669", display: "inline-flex", alignItems: "center", gap: "0.2rem" }}>
              <FiCheck size={12} /> Diplomas verificados
            </span>
          )}
          {profile.avgRating !== null && (
            <span style={{ fontSize: "0.8rem", color: "#5f6b78" }}>
              ★ {profile.avgRating.toFixed(1)} · {profile.totalClasses} clases
            </span>
          )}
        </div>
        <a
          href={`/preparateurs/${profile.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.3rem",
            fontSize: "0.82rem",
            color: "#395D9F",
            textDecoration: "none",
          }}
        >
          Ver perfil público <FiExternalLink size={12} />
        </a>
      </div>

      {/* Photo + Name */}
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(30,45,74,0.08)",
          borderRadius: "0.875rem",
          padding: "1.5rem",
        }}
      >
        <SectionTitle>Foto y nombre</SectionTitle>
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginTop: "1rem" }}>
          {/* Photo */}
          <div style={{ position: "relative" }}>
            {photoUrl ? (
              <img
                src={photoUrl}
                alt={displayName}
                style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <div
                style={{
                  width: 96,
                  height: 96,
                  borderRadius: "50%",
                  background: "#1e2d4a",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploadingPhoto}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#1e2d4a",
                color: "#fff",
                border: "2px solid #fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <FiCamera size={14} />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              style={{ display: "none" }}
              onChange={handlePhotoUpload}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#5f6b78", marginBottom: "0.3rem" }}>
              Nombre público
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Bio */}
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(30,45,74,0.08)",
          borderRadius: "0.875rem",
          padding: "1.5rem",
        }}
      >
        <SectionTitle>Biografía profesional</SectionTitle>
        <p style={{ fontSize: "0.78rem", color: "#5f6b78", margin: "0.25rem 0 0.75rem" }}>
          Describe tu experiencia, metodología y qué ofreces a tus alumnos.
        </p>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={5}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          placeholder="Soy profesora nativa de francés con más de 10 años de experiencia..."
        />
        <p style={{ fontSize: "0.75rem", color: bio.length >= 100 ? "#059669" : "#92400e", marginTop: "0.25rem" }}>
          {bio.length} caracteres {bio.length < 100 ? "(mínimo 100)" : "✓"}
        </p>
      </div>

      {/* Levels */}
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(30,45,74,0.08)",
          borderRadius: "0.875rem",
          padding: "1.5rem",
        }}
      >
        <SectionTitle>Niveles que enseñas</SectionTitle>
        <div className="flex flex-wrap gap-2 mt-3">
          {ALL_LEVELS.map((level) => {
            const active = levels.includes(level);
            return (
              <button
                key={level}
                onClick={() => toggleItem(levels, level, setLevels)}
                style={{
                  padding: "0.4rem 1rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.85rem",
                  fontWeight: active ? 700 : 500,
                  background: active ? "#1e2d4a" : "#fff",
                  color: active ? "#fff" : "#3d4a5c",
                  border: active ? "none" : "1px solid rgba(30,45,74,0.15)",
                  cursor: "pointer",
                }}
              >
                {level}
              </button>
            );
          })}
        </div>
      </div>

      {/* Specialties */}
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(30,45,74,0.08)",
          borderRadius: "0.875rem",
          padding: "1.5rem",
        }}
      >
        <SectionTitle>Especialidades</SectionTitle>
        <div className="flex flex-wrap gap-2 mt-3">
          {ALL_SPECIALTIES.map((spec) => {
            const active = specialties.includes(spec);
            return (
              <button
                key={spec}
                onClick={() => toggleItem(specialties, spec, setSpecialties)}
                style={{
                  padding: "0.35rem 0.9rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.82rem",
                  fontWeight: active ? 600 : 500,
                  background: active ? "#f0f4ff" : "#fff",
                  color: active ? "#395D9F" : "#5f6b78",
                  border: `1px solid ${active ? "#395D9F" : "rgba(30,45,74,0.12)"}`,
                  cursor: "pointer",
                }}
              >
                {spec}
              </button>
            );
          })}
        </div>
      </div>

      {/* Languages */}
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(30,45,74,0.08)",
          borderRadius: "0.875rem",
          padding: "1.5rem",
        }}
      >
        <SectionTitle>Idiomas que hablas</SectionTitle>
        <div className="flex flex-wrap gap-2 mt-3">
          {ALL_LANGUAGES.map((lang) => {
            const active = languages.includes(lang);
            return (
              <button
                key={lang}
                onClick={() => toggleItem(languages, lang, setLanguages)}
                style={{
                  padding: "0.35rem 0.9rem",
                  borderRadius: "0.5rem",
                  fontSize: "0.82rem",
                  fontWeight: active ? 600 : 500,
                  background: active ? "#ecfdf5" : "#fff",
                  color: active ? "#065f46" : "#5f6b78",
                  border: `1px solid ${active ? "#059669" : "rgba(30,45,74,0.12)"}`,
                  cursor: "pointer",
                }}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rate + Video link */}
      <div
        style={{
          background: "#fff",
          border: "1px solid rgba(30,45,74,0.08)",
          borderRadius: "0.875rem",
          padding: "1.5rem",
        }}
      >
        <SectionTitle>Tarifa y presentación</SectionTitle>
        <div className="grid gap-4 sm:grid-cols-2 mt-3">
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#5f6b78", marginBottom: "0.3rem" }}>
              Tarifa por hora (€)
            </label>
            <input
              type="number"
              min={5}
              step={1}
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#5f6b78", marginBottom: "0.3rem" }}>
              Enlace de vídeo de presentación (opcional)
            </label>
            <input
              type="url"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="https://youtube.com/..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            fontSize: "0.85rem",
            fontWeight: 500,
            background: message.type === "success" ? "#d1fae5" : "#fee2e2",
            color: message.type === "success" ? "#065f46" : "#991b1b",
          }}
        >
          {message.text}
        </div>
      )}

      {/* Save button */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.65rem 2rem",
            background: "#1e2d4a",
            color: "#fff",
            fontWeight: 600,
            fontSize: "0.9rem",
            borderRadius: "0.5rem",
            border: "none",
            cursor: saving ? "wait" : "pointer",
            opacity: saving ? 0.6 : 1,
          }}
        >
          <FiSave size={16} />
          {saving ? "Guardando..." : "Guardar cambios"}
        </button>
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#1e2d4a", margin: 0 }}>{children}</h3>;
}
