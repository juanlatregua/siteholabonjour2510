"use client";

import { useState, type FormEvent } from "react";

const objectiveOptions = [
  { value: "", label: "Selecciona tu objetivo" },
  { value: "delf", label: "Preparación DELF" },
  { value: "dalf", label: "Preparación DALF" },
  { value: "conversacion", label: "Conversación" },
  { value: "empresas", label: "Francés para empresas" },
  { value: "particular", label: "Clases particulares" },
  { value: "otro", label: "Otro" },
];

const inputStyles: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  color: "var(--cin-text)",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s ease",
};

const labelStyles: React.CSSProperties = {
  display: "block",
  marginBottom: 6,
  fontSize: "0.875rem",
  fontWeight: 500,
  color: "rgba(255,255,255,0.7)",
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    objetivo: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="text-center py-12 px-6"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 24,
        }}
      >
        <div className="text-4xl mb-4" aria-hidden="true">
          &#10003;
        </div>
        <h3
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: "var(--font-display)", color: "var(--cin-gold)" }}
        >
          Message envoyé
        </h3>
        <p style={{ color: "rgba(255,255,255,0.65)" }}>
          Te responderemos en menos de 24 horas. Merci !
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 24,
        padding: "32px",
      }}
    >
      <h3
        className="text-2xl font-bold mb-2"
        style={{ fontFamily: "var(--font-display)", color: "var(--cin-gold)" }}
      >
        Écrivez-nous
      </h3>

      <div>
        <label htmlFor="contact-name" style={labelStyles}>
          Nom / Nombre
        </label>
        <input
          id="contact-name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Tu nombre"
          style={inputStyles}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#e8b865";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
        />
      </div>

      <div>
        <label htmlFor="contact-email" style={labelStyles}>
          Courriel / Email
        </label>
        <input
          id="contact-email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="tu@email.com"
          style={inputStyles}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#e8b865";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
        />
      </div>

      <div>
        <label htmlFor="contact-objetivo" style={labelStyles}>
          Objectif / Objetivo
        </label>
        <select
          id="contact-objetivo"
          required
          value={formData.objetivo}
          onChange={(e) =>
            setFormData({ ...formData, objetivo: e.target.value })
          }
          style={{
            ...inputStyles,
            appearance: "none",
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23e8b865' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 16px center",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#e8b865";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
        >
          {objectiveOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" style={labelStyles}>
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Cuéntanos qué necesitas..."
          style={{ ...inputStyles, resize: "vertical" }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "#e8b865";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
          }}
        />
      </div>

      <button
        type="submit"
        className="mt-2 font-semibold cursor-pointer transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_24px_rgba(232,184,101,0.35)]"
        style={{
          padding: "14px 28px",
          borderRadius: 12,
          background: "var(--cin-gold)",
          color: "var(--cin-bg)",
          border: "none",
          fontSize: "0.95rem",
          fontFamily: "var(--font-heading)",
          letterSpacing: "0.01em",
        }}
      >
        Envoyer le message
      </button>
    </form>
  );
}
