"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setMessage("");

    if (newPassword.length < 8) {
      setStatus("error");
      setMessage("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus("error");
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/zona-profesor/cuenta", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Error al cambiar la contraseña.");
        return;
      }

      setStatus("success");
      setMessage("Contraseña actualizada correctamente.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Inténtalo de nuevo.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Contraseña actual
        </label>
        <input
          id="currentPassword"
          type="password"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Nueva contraseña
        </label>
        <input
          id="newPassword"
          type="password"
          required
          minLength={8}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirmar nueva contraseña
        </label>
        <input
          id="confirmPassword"
          type="password"
          required
          minLength={8}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
        />
      </div>

      {message && (
        <p className={`text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-[#1e2d4a] px-4 py-2 text-sm font-medium text-white hover:bg-[#2a3d5c] disabled:opacity-50 transition-colors"
      >
        {status === "loading" ? "Guardando..." : "Cambiar contraseña"}
      </button>
    </form>
  );
}
