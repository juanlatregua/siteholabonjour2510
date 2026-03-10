export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { generateRectificativaPdf } from "@/lib/contabilidad/factura-pdf";
import { uploadFile } from "@/lib/supabase";

const BUCKET = "facturas";

const schema = z.object({
  facturaId: z.string().min(1),
  motivo: z.string().min(1, "El motivo es obligatorio"),
});

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }
  if (session.user.role !== "TEACHER" && session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Acceso denegado" }, { status: 403 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { facturaId, motivo } = parsed.data;

  const original = await prisma.factura.findUnique({
    where: { id: facturaId },
  });

  if (!original) {
    return NextResponse.json(
      { error: "Factura no encontrada" },
      { status: 404 }
    );
  }

  if (original.estado === "anulada") {
    return NextResponse.json(
      { error: "La factura ya está anulada" },
      { status: 400 }
    );
  }

  const now = new Date();
  const rectNumero = `${original.numero}-R`;

  // Generate rectificativa PDF (negative amounts)
  const pdfBuffer = generateRectificativaPdf({
    numero: rectNumero,
    fechaEmision: now,
    clienteNombre: original.clienteNombre,
    clienteNif: original.clienteNif,
    clienteRazonSocial: original.clienteRazonSocial,
    clienteDireccion: original.clienteDireccion,
    clienteEmail: original.clienteEmail,
    concepto: original.concepto,
    baseImponible: -original.baseImponible,
    tipoIva: original.tipoIva,
    cuotaIva: -original.cuotaIva,
    total: -original.total,
    formaPago: original.formaPago,
    esRectificativa: true,
    facturaOriginalNumero: original.numero,
    motivoAnulacion: motivo,
  });

  const storagePath = `${original.anio}/${rectNumero}.pdf`;
  await uploadFile(pdfBuffer, storagePath, BUCKET);

  // Create rectificativa + mark original as anulada in a transaction
  const [rectificativa] = await prisma.$transaction([
    prisma.factura.create({
      data: {
        numero: rectNumero,
        serie: original.serie,
        anio: original.anio,
        secuencial: original.secuencial,
        pagoId: original.pagoId,
        alumnoId: original.alumnoId,
        clienteNombre: original.clienteNombre,
        clienteNif: original.clienteNif,
        clienteRazonSocial: original.clienteRazonSocial,
        clienteDireccion: original.clienteDireccion,
        clienteEmail: original.clienteEmail,
        concepto: `Rectificativa: ${original.concepto}`,
        baseImponible: -original.baseImponible,
        tipoIva: original.tipoIva,
        cuotaIva: -original.cuotaIva,
        total: -original.total,
        formaPago: original.formaPago,
        estado: "emitida",
        facturaRectificativaId: original.id,
        fechaEmision: now,
        pdfPath: storagePath,
      },
    }),
    prisma.factura.update({
      where: { id: facturaId },
      data: {
        estado: "anulada",
        fechaAnulacion: now,
        motivoAnulacion: motivo,
      },
    }),
  ]);

  return NextResponse.json({
    ok: true,
    rectificativaId: rectificativa.id,
    numero: rectNumero,
  });
}
