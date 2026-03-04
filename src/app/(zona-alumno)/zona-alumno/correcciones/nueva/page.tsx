import React from "react";
import { requireStudent } from "@/lib/auth-helpers";
import CorrectionPage from "@/components/correction/CorrectionPage";

export default async function NuevaCorreccionPage() {
  await requireStudent();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Nueva corrección</h2>
        <p className="mt-1 text-sm text-gray-500">
          Escribe o pega tu texto en francés para recibir una corrección detallada.
        </p>
      </div>
      <CorrectionPage />
    </div>
  );
}
