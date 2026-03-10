export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { getNextFacturaNumber } from "@/lib/contabilidad/numeracion";
import { generateFacturaPdf } from "@/lib/contabilidad/factura-pdf";
import { uploadFile } from "@/lib/supabase";

const BUCKET = "facturas";

const schema = z.object({
  pagoId: z.string().optional(),
  alumnoId: z.string().min(1),
  numero: z.string().optional(),
  fechaEmision: z.string().optional(),
  clienteNombre: z.string().min(1),
  clienteNif: z.string().optional(),
  clienteRazonSocial: z.string().optional(),
  clienteDireccion: z.string().optional(),
  clienteEmail: z.string().email().optional(),
  concepto: z.string().min(1),
  baseImponible: z.number().positive(),
  tipoIva: z.number().min(0).default(21),
  cuotaIva: z.number().min(0),
  total: z.number().positive(),
  formaPago: z.string().optional(),
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

  const data = parsed.data;
  const fechaEmision = data.fechaEmision
    ? new Date(data.fechaEmision)
    : new Date();
  const anio = fechaEmision.getFullYear();

  // Generate or use provided number
  let numero = data.numero;
  let secuencial: number;

  if (numero) {
    // Check uniqueness
    const existing = await prisma.factura.findUnique({ where: { numero } });
    if (existing) {
      return NextResponse.json(
        { error: `Ya existe una factura con número ${numero}` },
        { status: 409 }
      );
    }
    // Extract secuencial from format HB-2026-001
    const parts = numero.split("-");
    secuencial = parseInt(parts[parts.length - 1], 10) || 1;
  } else {
    const next = await getNextFacturaNumber("HB", anio);
    numero = next.numero;
    secuencial = next.secuencial;
  }

  // Generate PDF
  const pdfBuffer = generateFacturaPdf({
    numero,
    fechaEmision,
    clienteNombre: data.clienteNombre,
    clienteNif: data.clienteNif,
    clienteRazonSocial: data.clienteRazonSocial,
    clienteDireccion: data.clienteDireccion,
    clienteEmail: data.clienteEmail,
    concepto: data.concepto,
    baseImponible: data.baseImponible,
    tipoIva: data.tipoIva,
    cuotaIva: data.cuotaIva,
    total: data.total,
    formaPago: data.formaPago,
  });

  // Upload to Supabase
  const storagePath = `${anio}/${numero}.pdf`;
  await uploadFile(pdfBuffer, storagePath, BUCKET);

  // Create DB record
  const factura = await prisma.factura.create({
    data: {
      numero,
      serie: "HB",
      anio,
      secuencial,
      pagoId: data.pagoId,
      alumnoId: data.alumnoId,
      clienteNombre: data.clienteNombre,
      clienteNif: data.clienteNif,
      clienteRazonSocial: data.clienteRazonSocial,
      clienteDireccion: data.clienteDireccion,
      clienteEmail: data.clienteEmail,
      concepto: data.concepto,
      baseImponible: data.baseImponible,
      tipoIva: data.tipoIva,
      cuotaIva: data.cuotaIva,
      total: data.total,
      formaPago: data.formaPago,
      fechaEmision,
      pdfPath: storagePath,
    },
  });

  return NextResponse.json({
    ok: true,
    facturaId: factura.id,
    numero: factura.numero,
    pdfPath: factura.pdfPath,
  });
}
