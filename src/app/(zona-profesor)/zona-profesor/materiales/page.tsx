import React from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import MaterialItem from "@/components/zona/MaterialItem";
import Card from "@/components/ui/Card";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import { FiPlus, FiFolder } from "react-icons/fi";

interface MaterialWithStudent {
  id: string;
  title: string;
  type: string;
  storagePath: string;
  publicUrl: string | null;
  createdAt: Date;
  sizeBytes: number | null;
  student: { name: string | null; email: string };
}

export default async function MaterialesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/iniciar-sesion");

  // Get all students for this teacher
  const studentIds = await prisma.user.findMany({
    where: { coachId: session.user.id },
    select: { id: true },
  });

  const materials = await prisma.material.findMany({
    where: {
      studentId: { in: studentIds.map((s) => s.id) },
    },
    orderBy: { createdAt: "desc" },
    include: {
      student: { select: { name: true, email: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Materiales</h2>
          <p className="mt-1 text-sm text-gray-500">
            {materials.length} material{materials.length !== 1 ? "es" : ""}
          </p>
        </div>
        <Link
          href="/zona-profesor/materiales/subir"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#0b3c6f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0e4f8d]"
        >
          <FiPlus className="h-4 w-4" />
          Subir material
        </Link>
      </div>

      {materials.length > 0 ? (
        <Card padding={false}>
          <DataTable
            columns={[
              {
                key: "material",
                header: "Material",
                render: (item: MaterialWithStudent) => (
                  <MaterialItem
                    title={item.title}
                    type={item.type}
                    storagePath={item.storagePath}
                    publicUrl={item.publicUrl}
                    createdAt={item.createdAt}
                    sizeBytes={item.sizeBytes}
                  />
                ),
              },
              {
                key: "student",
                header: "Alumno",
                render: (item: MaterialWithStudent) => (
                  <span className="text-sm text-gray-700">
                    {item.student.name || item.student.email}
                  </span>
                ),
              },
              {
                key: "date",
                header: "Fecha",
                render: (item: MaterialWithStudent) => (
                  <span className="text-sm text-gray-500">
                    {format(item.createdAt, "d MMM yyyy", { locale: es })}
                  </span>
                ),
              },
            ]}
            data={materials}
            keyExtractor={(item) => item.id}
            emptyMessage="No hay materiales"
          />
        </Card>
      ) : (
        <EmptyState
          icon={<FiFolder className="h-12 w-12" />}
          title="Sin materiales"
          description="Aun no has subido materiales para tus alumnos."
          action={
            <Link
              href="/zona-profesor/materiales/subir"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0b3c6f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0e4f8d]"
            >
              <FiPlus className="h-4 w-4" />
              Subir material
            </Link>
          }
        />
      )}
    </div>
  );
}
