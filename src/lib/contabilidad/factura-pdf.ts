import { jsPDF } from "jspdf";

const COMPANY = {
  name: process.env.COMPANY_NAME || "HBTJ Consultores Lingüísticos S.L.",
  nif: process.env.COMPANY_NIF || "B93712784",
  address: process.env.COMPANY_ADDRESS || "Málaga, España",
  email: "info@holabonjour.es",
  web: "holabonjour.es",
};

export interface FacturaPdfData {
  numero: string;
  fechaEmision: Date;
  clienteNombre: string;
  clienteNif?: string | null;
  clienteRazonSocial?: string | null;
  clienteDireccion?: string | null;
  clienteEmail?: string | null;
  concepto: string;
  baseImponible: number;
  tipoIva: number;
  cuotaIva: number;
  total: number;
  formaPago?: string | null;
  // For rectificativa
  esRectificativa?: boolean;
  facturaOriginalNumero?: string;
  motivoAnulacion?: string;
}

function buildPdf(data: FacturaPdfData): Buffer {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 25;

  // Title
  const title = data.esRectificativa ? "FACTURA RECTIFICATIVA" : "FACTURA";

  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 45, 74);
  doc.text("HolaBonjour", margin, y);
  y += 8;

  doc.setFontSize(14);
  doc.text(title, margin, y);
  y += 8;

  // Company info (left)
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128);
  doc.text(COMPANY.name, margin, y);
  y += 4;
  doc.text(`CIF: ${COMPANY.nif}`, margin, y);
  y += 4;
  doc.text(COMPANY.address, margin, y);
  y += 4;
  doc.text(`${COMPANY.email} · ${COMPANY.web}`, margin, y);

  // Invoice number + date (right side)
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 45, 74);
  doc.text(`Nº ${data.numero}`, pageWidth - margin, 25, { align: "right" });
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128);
  const dateStr = data.fechaEmision.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  doc.text(`Fecha: ${dateStr}`, pageWidth - margin, 32, { align: "right" });

  if (data.esRectificativa && data.facturaOriginalNumero) {
    doc.setFontSize(9);
    doc.setTextColor(229, 0, 70);
    doc.text(
      `Rectifica factura: ${data.facturaOriginalNumero}`,
      pageWidth - margin,
      39,
      { align: "right" }
    );
  }

  // Divider
  y += 10;
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  // Client info
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 45, 74);
  doc.text("Cliente:", margin, y);
  y += 6;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(61, 74, 92);

  if (data.clienteRazonSocial) {
    doc.text(data.clienteRazonSocial, margin, y);
    y += 5;
  }
  doc.text(data.clienteNombre, margin, y);
  y += 5;
  if (data.clienteNif) {
    doc.text(`NIF/CIF: ${data.clienteNif}`, margin, y);
    y += 5;
  }
  if (data.clienteDireccion) {
    doc.text(data.clienteDireccion, margin, y);
    y += 5;
  }
  if (data.clienteEmail) {
    doc.text(data.clienteEmail, margin, y);
    y += 5;
  }
  y += 10;

  // Table header
  const col1 = margin;
  const col2 = pageWidth - margin - 70;
  const col3 = pageWidth - margin - 35;
  const col4 = pageWidth - margin;

  doc.setFillColor(248, 250, 252);
  doc.rect(margin, y - 4, pageWidth - 2 * margin, 8, "F");
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(107, 114, 128);
  doc.text("Concepto", col1, y);
  doc.text("Base", col2, y, { align: "right" });
  doc.text("IVA", col3, y, { align: "right" });
  doc.text("Total", col4, y, { align: "right" });
  y += 10;

  // Table row
  doc.setFont("helvetica", "normal");
  doc.setTextColor(61, 74, 92);
  doc.setFontSize(10);

  // Wrap concepto if long
  const conceptLines = doc.splitTextToSize(data.concepto, col2 - col1 - 10);
  doc.text(conceptLines, col1, y);

  doc.text(`${data.baseImponible.toFixed(2)} €`, col2, y, { align: "right" });
  doc.text(`${data.cuotaIva.toFixed(2)} €`, col3, y, { align: "right" });
  doc.setFont("helvetica", "bold");
  doc.text(`${data.total.toFixed(2)} €`, col4, y, { align: "right" });
  y += Math.max(8, conceptLines.length * 5 + 3);

  // Divider
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Totals breakdown
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128);
  doc.text("Base imponible:", col3 - 25, y, { align: "right" });
  doc.setTextColor(61, 74, 92);
  doc.text(`${data.baseImponible.toFixed(2)} €`, col4, y, { align: "right" });
  y += 5;
  doc.setTextColor(107, 114, 128);
  doc.text(`IVA (${data.tipoIva}%):`, col3 - 25, y, { align: "right" });
  doc.setTextColor(61, 74, 92);
  doc.text(`${data.cuotaIva.toFixed(2)} €`, col4, y, { align: "right" });
  y += 7;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(229, 0, 70);
  doc.text("TOTAL:", col3 - 25, y, { align: "right" });
  doc.text(`${data.total.toFixed(2)} €`, col4, y, { align: "right" });
  y += 12;

  // Forma de pago
  if (data.formaPago) {
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(107, 114, 128);
    doc.text(`Forma de pago: ${data.formaPago}`, margin, y);
    y += 6;
  }

  // Motivo anulación (rectificativa)
  if (data.esRectificativa && data.motivoAnulacion) {
    y += 4;
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(229, 0, 70);
    doc.text("Motivo de la rectificación:", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(61, 74, 92);
    const motivoLines = doc.splitTextToSize(
      data.motivoAnulacion,
      pageWidth - 2 * margin
    );
    doc.text(motivoLines, margin, y);
  }

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(156, 163, 175);
  doc.text(
    `${COMPANY.name} · CIF ${COMPANY.nif} · ${COMPANY.web}`,
    pageWidth / 2,
    footerY,
    { align: "center" }
  );

  return Buffer.from(doc.output("arraybuffer"));
}

export function generateFacturaPdf(data: FacturaPdfData): Buffer {
  return buildPdf({ ...data, esRectificativa: false });
}

export function generateRectificativaPdf(data: FacturaPdfData): Buffer {
  return buildPdf({ ...data, esRectificativa: true });
}
