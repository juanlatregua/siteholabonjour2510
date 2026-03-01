import React from "react";
import { requireStudent } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import MaterialItem from "@/components/zona/MaterialItem";
import EmptyState from "@/components/ui/EmptyState";
import { FiFolder } from "react-icons/fi";
import RecursosFilter from "./RecursosFilter";

export default async function RecursosPage(props: {
  searchParams: Promise<{ type?: string }>;
}) {
  const session = await requireStudent();
  const { type } = await props.searchParams;

  const typeFilter =
    type && type !== "ALL" ? { type } : {};

  const materials = await prisma.material.findMany({
    where: {
      studentId: session.user.id,
      ...typeFilter,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Recursos</h2>
        <p className="mt-1 text-sm text-gray-500">
          Materiales y recursos de tus clases.
        </p>
      </div>

      <RecursosFilter active={type || "ALL"} />

      {materials.length > 0 ? (
        <div className="space-y-2">
          {materials.map((m) => (
            <MaterialItem
              key={m.id}
              title={m.title}
              type={m.type}
              storagePath={m.storagePath}
              publicUrl={m.publicUrl}
              createdAt={m.createdAt}
              sizeBytes={m.sizeBytes}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FiFolder className="h-12 w-12" />}
          title="Sin recursos"
          description="Los materiales de tus clases aparecerán aquí."
        />
      )}
    </div>
  );
}
