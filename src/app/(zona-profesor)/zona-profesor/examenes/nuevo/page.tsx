import React from "react";
import { requireTeacher } from "@/lib/auth-helpers";
import ExamWizard from "./ExamWizard";

export default async function NuevoExamenPage() {
  await requireTeacher();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Crear nuevo examen</h2>
        <p className="mt-1 text-sm text-gray-500">
          Sigue los pasos para crear un modelo de examen DELF/DALF.
        </p>
      </div>
      <ExamWizard />
    </div>
  );
}
