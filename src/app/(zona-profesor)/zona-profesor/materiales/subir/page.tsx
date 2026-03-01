import React from "react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import SubirMaterialForm from "./SubirMaterialForm";

export default async function SubirMaterialPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/iniciar-sesion");

  const students = await prisma.user.findMany({
    where: { coachId: session.user.id },
    select: { id: true, name: true, email: true },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Subir material</h2>
        <p className="mt-1 text-sm text-gray-500">
          Selecciona un alumno y sube un archivo.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nuevo material</CardTitle>
        </CardHeader>
        <CardContent>
          <SubirMaterialForm
            students={students.map((s) => ({
              value: s.id,
              label: s.name || s.email,
            }))}
          />
        </CardContent>
      </Card>
    </div>
  );
}
