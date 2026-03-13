import Anthropic from "@anthropic-ai/sdk";
import { getSignedUrlFromBucket } from "@/lib/supabase";

const client = new Anthropic();
const MODEL = process.env.CHAT_MODEL || "claude-sonnet-4-20250514";

export interface DiplomaResult {
  type: string; // "Master FLE", "DAEFLE", "DELF/DALF Habilitación", "CAPES", "Otro"
  institution: string;
  date: string | null;
  holderName: string;
  classification: "VALID" | "DUBIOUS" | "INVALID";
  reason: string;
}

export interface ScanResult {
  diplomas: DiplomaResult[];
  overallClassification: "VALID" | "DUBIOUS" | "INVALID";
  summary: string;
}

const SYSTEM_PROMPT = `Eres un verificador de diplomas para una plataforma de profesores de francés (FLE).

Tu tarea: analizar imágenes/PDFs de diplomas y extraer información estructurada.

Diplomas válidos para enseñar FLE:
- Máster FLE / Didactique du FLE (universidades francesas o españolas)
- DAEFLE (Alliance Française + CNED)
- DPAFP (Alliance Française de Paris)
- Habilitación como examinador DELF/DALF/TCF/TEF
- CAPES de Lettres / FLE (sistema educativo francés)
- Filología Francesa / Études françaises
- Traducción e Interpretación (especialidad francés)
- Magisterio / Máster Formación del Profesorado (especialidad francés)
- Licenciatura/Grado en Lengua y Literatura francesa

Clasificación:
- VALID: documento claramente legible, institución reconocida, nombre visible
- DUBIOUS: documento parcialmente legible, institución no reconocida, o nombre no coincide con el solicitante
- INVALID: no es un diploma, documento ilegible, o no tiene relación con la enseñanza de francés

IMPORTANTE: Responde SIEMPRE usando la herramienta scan_diploma.`;

const SCAN_TOOL: Anthropic.Tool = {
  name: "scan_diploma",
  description: "Resultado del escaneo de un diploma",
  input_schema: {
    type: "object" as const,
    properties: {
      type: {
        type: "string",
        description: "Tipo de diploma: Master FLE, DAEFLE, Habilitación DELF/DALF, CAPES, Filología Francesa, Traducción e Interpretación, Magisterio Francés, Otro",
      },
      institution: {
        type: "string",
        description: "Institución que emite el diploma",
      },
      date: {
        type: "string",
        description: "Fecha de emisión (YYYY-MM-DD o YYYY si solo aparece el año). null si no visible",
      },
      holderName: {
        type: "string",
        description: "Nombre completo del titular tal como aparece en el documento",
      },
      classification: {
        type: "string",
        enum: ["VALID", "DUBIOUS", "INVALID"],
        description: "Clasificación del documento",
      },
      reason: {
        type: "string",
        description: "Breve justificación de la clasificación (1-2 frases)",
      },
    },
    required: ["type", "institution", "holderName", "classification", "reason"],
  },
};

export async function scanDiplomas(
  diplomaPaths: string[],
  applicantName: string,
  bucket = "candidaturas"
): Promise<ScanResult> {
  if (diplomaPaths.length === 0) {
    return {
      diplomas: [],
      overallClassification: "INVALID",
      summary: "No se proporcionaron diplomas.",
    };
  }

  const results: DiplomaResult[] = [];

  for (const path of diplomaPaths) {
    try {
      const signedUrl = await getSignedUrlFromBucket(path, bucket, 3600);

      const content: Anthropic.ContentBlockParam[] = [
        {
          type: "image",
          source: { type: "url", url: signedUrl },
        } as Anthropic.ImageBlockParam,
        {
          type: "text",
          text: `Analiza este documento. El solicitante se llama "${applicantName}". Extrae la información del diploma usando la herramienta scan_diploma.`,
        },
      ];

      const response = await client.messages.create({
        model: MODEL,
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        tools: [SCAN_TOOL],
        tool_choice: { type: "tool", name: "scan_diploma" },
        messages: [{ role: "user", content }],
      });

      const toolBlock = response.content.find(
        (b): b is Anthropic.ToolUseBlock => b.type === "tool_use"
      );

      if (toolBlock) {
        const input = toolBlock.input as Record<string, string>;
        results.push({
          type: input.type || "Desconocido",
          institution: input.institution || "Desconocida",
          date: input.date || null,
          holderName: input.holderName || "",
          classification: (input.classification as DiplomaResult["classification"]) || "DUBIOUS",
          reason: input.reason || "",
        });
      }
    } catch (err) {
      console.error(`[diploma-scanner] Error scanning ${path}:`, err);
      results.push({
        type: "Error",
        institution: "—",
        date: null,
        holderName: "—",
        classification: "DUBIOUS",
        reason: `Error al escanear: ${err instanceof Error ? err.message : "desconocido"}`,
      });
    }
  }

  // Determine overall classification
  const hasValid = results.some((r) => r.classification === "VALID");
  const hasInvalid = results.some((r) => r.classification === "INVALID");
  const allInvalid = results.every((r) => r.classification === "INVALID");

  let overallClassification: ScanResult["overallClassification"] = "DUBIOUS";
  if (hasValid && !hasInvalid) overallClassification = "VALID";
  else if (allInvalid) overallClassification = "INVALID";

  const validCount = results.filter((r) => r.classification === "VALID").length;
  const summary = `${results.length} documento(s) analizado(s): ${validCount} válido(s), ${
    results.length - validCount
  } pendiente(s) de revisión.`;

  return { diplomas: results, overallClassification, summary };
}
