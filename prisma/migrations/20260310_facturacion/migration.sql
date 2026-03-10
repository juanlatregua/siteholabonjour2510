-- AlterTable: Add billing fields to users
ALTER TABLE "users" ADD COLUMN "billingType" TEXT;
ALTER TABLE "users" ADD COLUMN "billingNif" TEXT;
ALTER TABLE "users" ADD COLUMN "billingRazonSocial" TEXT;
ALTER TABLE "users" ADD COLUMN "billingDireccion" TEXT;
ALTER TABLE "users" ADD COLUMN "billingCiudad" TEXT;
ALTER TABLE "users" ADD COLUMN "billingCP" TEXT;
ALTER TABLE "users" ADD COLUMN "billingPais" TEXT DEFAULT 'España';
ALTER TABLE "users" ADD COLUMN "billingContacto" TEXT;
ALTER TABLE "users" ADD COLUMN "billingEmail" TEXT;

-- CreateTable: facturas
CREATE TABLE "facturas" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "serie" TEXT NOT NULL DEFAULT 'HB',
    "anio" INTEGER NOT NULL,
    "secuencial" INTEGER NOT NULL,
    "pagoId" TEXT,
    "alumnoId" TEXT NOT NULL,
    "clienteNombre" TEXT NOT NULL,
    "clienteNif" TEXT,
    "clienteRazonSocial" TEXT,
    "clienteDireccion" TEXT,
    "clienteEmail" TEXT,
    "concepto" TEXT NOT NULL,
    "baseImponible" DOUBLE PRECISION NOT NULL,
    "tipoIva" DOUBLE PRECISION NOT NULL DEFAULT 21,
    "cuotaIva" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "formaPago" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'emitida',
    "facturaRectificativaId" TEXT,
    "fechaEmision" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaAnulacion" TIMESTAMP(3),
    "motivoAnulacion" TEXT,
    "pdfPath" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "facturas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "facturas_numero_key" ON "facturas"("numero");
CREATE INDEX "facturas_alumnoId_idx" ON "facturas"("alumnoId");
CREATE INDEX "facturas_anio_serie_idx" ON "facturas"("anio", "serie");

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "facturas_alumnoId_fkey" FOREIGN KEY ("alumnoId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
