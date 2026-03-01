"use client";

import { useCallback } from "react";
import type { AssessmentResult } from "@/lib/assessment/types";

interface CertificatePDFProps {
  result: AssessmentResult;
  assessmentTitle: string;
}

export default function CertificatePDF({ result, assessmentTitle }: CertificatePDFProps) {
  const generatePDF = useCallback(async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });

    // Background
    doc.setFillColor(11, 60, 111); // navy
    doc.rect(0, 0, 297, 210, "F");

    // White inner card
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(15, 15, 267, 180, 5, 5, "F");

    // Border
    doc.setDrawColor(201, 168, 76); // gold
    doc.setLineWidth(1);
    doc.roundedRect(20, 20, 257, 170, 3, 3, "S");

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(11, 60, 111);
    doc.text("HolaBonjour", 148.5, 50, { align: "center" });

    doc.setFontSize(16);
    doc.setTextColor(100, 100, 100);
    doc.text("Certificado de Nivel", 148.5, 62, { align: "center" });

    // Level
    doc.setFontSize(48);
    doc.setTextColor(15, 93, 160);
    doc.text(result.estimatedLevel, 148.5, 95, { align: "center" });

    // Score
    doc.setFontSize(14);
    doc.setTextColor(60, 60, 60);
    doc.text(
      `Puntuacion: ${result.totalScore}/${result.maxScore} (${result.percentage}%)`,
      148.5,
      112,
      { align: "center" },
    );

    // Assessment title
    doc.setFontSize(11);
    doc.text(`Prueba: ${assessmentTitle}`, 148.5, 125, { align: "center" });

    // Date
    doc.setFontSize(10);
    doc.setTextColor(120, 120, 120);
    const date = new Date(result.calculatedAt).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    doc.text(`Fecha: ${date}`, 148.5, 140, { align: "center" });

    // Recommended exam
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Examen recomendado: ${result.recommendedExam}`, 148.5, 155, { align: "center" });

    // Disclaimer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "Este certificado es orientativo y no sustituye una certificacion oficial DELF/DALF.",
      148.5,
      170,
      { align: "center" },
    );

    doc.save(`holabonjour-nivel-${result.estimatedLevel.toLowerCase()}.pdf`);
  }, [result, assessmentTitle]);

  return (
    <button
      type="button"
      onClick={() => void generatePDF()}
      className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#0f5da0] px-5 py-2.5 text-sm font-semibold text-[#0f5da0] transition hover:bg-blue-50"
    >
      Descargar certificado PDF
    </button>
  );
}
