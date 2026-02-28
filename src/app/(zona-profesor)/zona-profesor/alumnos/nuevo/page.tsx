import React from "react";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import NuevoAlumnoForm from "./NuevoAlumnoForm";

export default function NuevoAlumnoPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Nuevo alumno</h2>
        <p className="mt-1 text-sm text-gray-500">
          Registra un nuevo alumno en tu lista.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Datos del alumno</CardTitle>
        </CardHeader>
        <CardContent>
          <NuevoAlumnoForm />
        </CardContent>
      </Card>
    </div>
  );
}
