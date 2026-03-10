import { prisma } from "@/lib/prisma";

/**
 * Get next factura number for a given serie + year.
 * Format: HB-2026-001
 */
export async function getNextFacturaNumber(
  serie = "HB",
  anio?: number
): Promise<{ numero: string; secuencial: number; anio: number }> {
  const year = anio ?? new Date().getFullYear();

  const last = await prisma.factura.findFirst({
    where: { serie, anio: year },
    orderBy: { secuencial: "desc" },
    select: { secuencial: true },
  });

  const secuencial = (last?.secuencial ?? 0) + 1;
  const numero = `${serie}-${year}-${String(secuencial).padStart(3, "0")}`;

  return { numero, secuencial, anio: year };
}
