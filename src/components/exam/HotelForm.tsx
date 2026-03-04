"use client";

import { HOTEL_FORM_FIELDS } from "@/data/delf-a1-exam";

interface HotelFormProps {
  values: Record<string, string>;
  onChange: (fieldId: string, value: string) => void;
  showCorrection: boolean;
}

export default function HotelForm({ values, onChange, showCorrection }: HotelFormProps) {
  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-bold text-gray-800 text-center mb-1">
          HÔTEL LE SOLEIL — FICHE D&apos;INSCRIPTION
        </h4>
        <p className="text-xs text-gray-500 text-center">
          Remplissez ce formulaire avec vos informations personnelles
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {HOTEL_FORM_FIELDS.map((field) => (
          <div key={field.id}>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              {field.label}
            </label>
            <input
              type="text"
              value={values[field.id] || ""}
              onChange={(e) => onChange(field.id, e.target.value)}
              disabled={showCorrection}
              placeholder={field.placeholder}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:border-[#395D9F] transition-colors"
            />
          </div>
        ))}
      </div>

      {showCorrection && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-sm text-blue-800">
            <strong>Évaluation :</strong> Le formulaire est évalué sur la capacité à fournir des
            informations personnelles pertinentes, l&apos;orthographe des données et la cohérence.
          </p>
          <p className="text-xs text-blue-600 mt-1">
            Puntuación estimada: {Object.values(values).filter((v) => v.trim()).length >= 9
              ? "8-10"
              : Object.values(values).filter((v) => v.trim()).length >= 6
              ? "5-7"
              : "0-4"} / 10 pts
          </p>
        </div>
      )}
    </div>
  );
}
