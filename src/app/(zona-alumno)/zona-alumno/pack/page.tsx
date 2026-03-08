import React from "react";
import Link from "next/link";
import { requireStudent } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import PackCard from "@/components/zona/PackCard";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { FiPackage, FiPlus } from "react-icons/fi";

export default async function PackPage() {
  const session = await requireStudent();

  const packs = await prisma.pack.findMany({
    where: { studentId: session.user.id },
    orderBy: { purchasedAt: "desc" },
  });

  const activePack = packs.find((p) => p.status === "ACTIVE");
  const pastPacks = packs.filter((p) => p.status !== "ACTIVE");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mi Pack</h2>
        <p className="mt-1 text-sm text-gray-500">
          Consulta tus horas disponibles y el historial de packs.
        </p>
      </div>

      {activePack ? (
        <div className="max-w-lg">
          <PackCard
            hoursTotal={activePack.hoursTotal}
            hoursUsed={activePack.hoursUsed}
            levelRange={activePack.levelRange}
            status={activePack.status}
            purchasedAt={activePack.purchasedAt}
          />
        </div>
      ) : (
        <EmptyState
          icon={<FiPackage className="h-12 w-12" />}
          title="Sin pack activo"
          description="Contrata un pack de clases para empezar."
          action={
            <Link
              href="/contratar"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#E50046] px-4 py-2 text-sm font-semibold text-white hover:bg-[#c7003d]"
            >
              <FiPlus className="h-4 w-4" />
              Contratar pack
            </Link>
          }
        />
      )}

      {pastPacks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Historial de packs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pastPacks.map((pack) => (
                <PackCard
                  key={pack.id}
                  hoursTotal={pack.hoursTotal}
                  hoursUsed={pack.hoursUsed}
                  levelRange={pack.levelRange}
                  status={pack.status}
                  purchasedAt={pack.purchasedAt}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
