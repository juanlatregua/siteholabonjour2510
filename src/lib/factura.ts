// lib/factura.ts — Invoice PDF generation + Supabase storage
import { jsPDF } from "jspdf";
import { prisma } from "@/lib/prisma";
import { uploadFile, getSignedUrlFromBucket } from "@/lib/supabase";
import { sendInvoiceEmail } from "@/lib/email";

const BUCKET = "facturas";

const COMPANY = {
  name: process.env.COMPANY_NAME || "HBTJ Consultores Lingüísticos S.L.",
  nif: process.env.COMPANY_NIF || "B93712784",
  address: process.env.COMPANY_ADDRESS || "Málaga, España",
  email: "info@holabonjour.es",
  web: "holabonjour.es",
};

export async function getNextInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const prefix = `HB-${year}-`;

  const lastInvoice = await prisma.invoice.findFirst({
    where: { number: { startsWith: prefix } },
    orderBy: { number: "desc" },
  });

  let seq = 1;
  if (lastInvoice) {
    const lastSeq = parseInt(lastInvoice.number.replace(prefix, ""), 10);
    if (!isNaN(lastSeq)) seq = lastSeq + 1;
  }

  return `${prefix}${String(seq).padStart(4, "0")}`;
}

export function generateInvoicePdf(data: {
  number: string;
  studentName: string;
  studentEmail: string;
  concept: string;
  baseAmount: number;
  ivaRate: number;
  ivaAmount: number;
  totalAmount: number;
  issuedAt: Date;
}): Buffer {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 25;

  // Header: Company info
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(30, 45, 74); // navy
  doc.text("HolaBonjour", margin, y);
  y += 7;
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
  doc.text(`Factura ${data.number}`, pageWidth - margin, 25, { align: "right" });
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128);
  const dateStr = data.issuedAt.toLocaleDateString("es-ES", {
    day: "numeric", month: "long", year: "numeric",
  });
  doc.text(`Fecha: ${dateStr}`, pageWidth - margin, 32, { align: "right" });

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
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(61, 74, 92);
  doc.text(data.studentName, margin, y);
  y += 5;
  doc.text(data.studentEmail, margin, y);
  y += 15;

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
  doc.text(data.concept, col1, y);
  doc.text(`${data.baseAmount.toFixed(2)} €`, col2, y, { align: "right" });
  doc.text(`${data.ivaAmount.toFixed(2)} €`, col3, y, { align: "right" });
  doc.setFont("helvetica", "bold");
  doc.text(`${data.totalAmount.toFixed(2)} €`, col4, y, { align: "right" });
  y += 8;

  // Divider
  doc.setDrawColor(226, 232, 240);
  doc.line(margin, y, pageWidth - margin, y);
  y += 8;

  // Totals
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(107, 114, 128);
  doc.text("Base imponible:", col3 - 25, y, { align: "right" });
  doc.setTextColor(61, 74, 92);
  doc.text(`${data.baseAmount.toFixed(2)} €`, col4, y, { align: "right" });
  y += 5;
  doc.setTextColor(107, 114, 128);
  doc.text(`IVA (${data.ivaRate}%):`, col3 - 25, y, { align: "right" });
  doc.setTextColor(61, 74, 92);
  doc.text(`${data.ivaAmount.toFixed(2)} €`, col4, y, { align: "right" });
  y += 7;
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(229, 0, 70); // rouge
  doc.text("TOTAL:", col3 - 25, y, { align: "right" });
  doc.text(`${data.totalAmount.toFixed(2)} €`, col4, y, { align: "right" });

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 15;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(156, 163, 175);
  doc.text(
    `${COMPANY.name} · CIF ${COMPANY.nif} · ${COMPANY.web}`,
    pageWidth / 2, footerY, { align: "center" }
  );

  return Buffer.from(doc.output("arraybuffer"));
}

export async function createAndStoreInvoice(paymentId: string) {
  // Check if invoice already exists
  const existing = await prisma.invoice.findUnique({
    where: { paymentId },
  });
  if (existing) return existing;

  const payment = await prisma.payment.findUnique({
    where: { id: paymentId },
    include: {
      student: { select: { id: true, name: true, email: true } },
      pack: { select: { levelRange: true, hoursTotal: true } },
    },
  });

  if (!payment) throw new Error(`Payment ${paymentId} not found`);

  const number = await getNextInvoiceNumber();
  const ivaRate = 21;
  const totalAmount = payment.amount;
  const baseAmount = +(totalAmount / (1 + ivaRate / 100)).toFixed(2);
  const ivaAmount = +(totalAmount - baseAmount).toFixed(2);

  const concept = payment.pack
    ? `Pack ${payment.pack.hoursTotal} clases de francés (${payment.pack.levelRange})`
    : `Clases de francés`;

  const issuedAt = new Date();

  const pdfBuffer = generateInvoicePdf({
    number,
    studentName: payment.student.name || "Cliente",
    studentEmail: payment.student.email,
    concept,
    baseAmount,
    ivaRate,
    ivaAmount,
    totalAmount,
    issuedAt,
  });

  // Upload to Supabase
  const storagePath = `${issuedAt.getFullYear()}/${number}.pdf`;
  await uploadFile(pdfBuffer, storagePath, BUCKET);

  // Create invoice record
  const invoice = await prisma.invoice.create({
    data: {
      number,
      paymentId,
      studentId: payment.student.id,
      studentName: payment.student.name || "Cliente",
      studentEmail: payment.student.email,
      concept,
      baseAmount,
      ivaRate,
      ivaAmount,
      totalAmount,
      storagePath,
      issuedAt,
    },
  });

  // Fire-and-forget email with PDF attached
  sendInvoiceEmail({
    toEmail: payment.student.email,
    customerName: payment.student.name || "Cliente",
    concept,
    totalEur: totalAmount.toFixed(2),
    invoiceNumber: number,
    pdfBuffer,
  }).catch((err) => console.error("Failed to send invoice email:", err));

  return invoice;
}

export async function getInvoicePdfUrl(invoiceId: string): Promise<string> {
  const invoice = await prisma.invoice.findUnique({ where: { id: invoiceId } });
  if (!invoice || !invoice.storagePath) throw new Error("Invoice not found");
  return getSignedUrlFromBucket(invoice.storagePath, BUCKET, 3600);
}
