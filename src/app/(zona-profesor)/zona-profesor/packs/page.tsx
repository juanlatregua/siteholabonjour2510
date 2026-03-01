import React from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";

import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import DataTable from "@/components/ui/DataTable";
import EmptyState from "@/components/ui/EmptyState";
import { FiPlus, FiPackage } from "react-icons/fi";

interface PackWithStudent {
  id: string;
  hoursTotal: number;
  hoursUsed: number;
  levelRange: string;
  status: string;
  price: number;
  purchasedAt: Date;
  student: { name: string | null; email: string };
}

export default async function PacksPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/iniciar-sesion");

  const studentIds = await prisma.user.findMany({
    where: { coachId: session.user.id },
    select: { id: true },
  });

  const packs = await prisma.pack.findMany({
    where: {
      studentId: { in: studentIds.map((s) => s.id) },
    },
    orderBy: { purchasedAt: "desc" },
    include: {
      student: { select: { name: true, email: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Packs</h2>
          <p className="mt-1 text-sm text-gray-500">
            {packs.length} pack{packs.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/zona-profesor/packs/nuevo"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#0b3c6f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0e4f8d]"
        >
          <FiPlus className="h-4 w-4" />
          Nuevo pack
        </Link>
      </div>

      {packs.length > 0 ? (
        <Card padding={false}>
          <DataTable
            columns={[
              {
                key: "student",
                header: "Alumno",
                render: (item: PackWithStudent) => (
                  <span className="text-sm font-medium text-gray-900">
                    {item.student.name || item.student.email}
                  </span>
                ),
              },
              {
                key: "pack",
                header: "Pack",
                render: (item: PackWithStudent) => (
                  <span className="text-sm text-gray-700">{item.levelRange}</span>
                ),
              },
              {
                key: "hours",
                header: "Horas",
                render: (item: PackWithStudent) => (
                  <span className="text-sm text-gray-700">
                    {item.hoursUsed}h / {item.hoursTotal}h
                  </span>
                ),
              },
              {
                key: "price",
                header: "Precio",
                render: (item: PackWithStudent) => (
                  <span className="text-sm text-gray-700">
                    {item.price.toLocaleString("es-ES", { style: "currency", currency: "EUR" })}
                  </span>
                ),
              },
              {
                key: "status",
                header: "Estado",
                render: (item: PackWithStudent) => {
                  const variant =
                    item.status === "ACTIVE"
                      ? "success"
                      : item.status === "EXPIRED"
                        ? "warning"
                        : "danger";
                  return <Badge variant={variant}>{item.status}</Badge>;
                },
              },
              {
                key: "date",
                header: "Fecha",
                render: (item: PackWithStudent) => (
                  <span className="text-sm text-gray-500">
                    {format(item.purchasedAt, "d MMM yyyy", { locale: es })}
                  </span>
                ),
              },
            ]}
            data={packs}
            keyExtractor={(item) => item.id}
            emptyMessage="No hay packs"
          />
        </Card>
      ) : (
        <EmptyState
          icon={<FiPackage className="h-12 w-12" />}
          title="Sin packs"
          description="No hay packs registrados para tus alumnos."
          action={
            <Link
              href="/zona-profesor/packs/nuevo"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0b3c6f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0e4f8d]"
            >
              <FiPlus className="h-4 w-4" />
              Crear pack
            </Link>
          }
        />
      )}
    </div>
  );
}
