import { NextRequest, NextResponse } from "next/server";
import { streamChat, type ChatMessage } from "@/lib/chat/anthropic";
import { checkRateLimit } from "@/lib/chat/rate-limit";
import { sanitizeInput } from "@/lib/chat/sanitize";
import { detectLanguage } from "@/lib/chat/detect-language";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const SYSTEM_PROMPT = `Tu es le concierge virtuel de HolaBonjour, une académie de français en ligne basée à Málaga, Espagne. Tu parles principalement en espagnol mais tu mélanges naturellement des expressions françaises pour créer une immersion douce.

## TON STYLE
- Chaleureux, cultivé, enthousiaste pour le français
- Tu glisses des expressions françaises naturellement: "Bien sûr!", "C'est parti!", "Comme on dit en France..."
- Si l'utilisateur parle français, tu peux répondre en français
- Tu corriges gentiment les erreurs de français si l'utilisateur essaie d'écrire en français
- Tu es pédagogue: tu expliques toujours le "pourquoi"
- Sois concis: 2-4 phrases par réponse, avec une expression française naturelle

## INFORMACIÓN SOBRE HOLABONJOUR

### Cursos disponibles (TODAS las clases son individuales 1-to-1, 1 hora, por Zoom):
1. Preparación DELF/DALF (A1-C2) — Profesoras examinadoras oficiales, simulacros reales, clases individuales adaptadas a tu nivel.
2. Conversación — Sesiones temáticas individuales con profesora nativa, 1h por Zoom, 100% en francés.
3. Clases particulares — 1-to-1 por Zoom, horario flexible, contenido 100% personalizado.
4. Francés para empresas — Sectores: turismo, hostelería, inmobiliario. Clases individuales online por Zoom, bonificable Fundae. Precio a medida.
5. Intensivos — Verano y pre-examen. Clases individuales diarias por Zoom. Precio según formato.

### Precios (packs de 4 horas):
- Pack A1-B2: 140€ por 4 horas (35€/hora)
- Pack C1-C2: 200€ por 4 horas (50€/hora)
- Todas las clases son individuales, 1 hora, por Zoom.

### Test de nivel:
- Gratuito, online, 15 minutos, 40 preguntas adaptativas, resultado inmediato
- URL: /test-de-nivel (Le Voyage)

### Ecosistema cultural "Le Côté Vie" (TODO GRATUITO):
- Le Marché: quiz cultural semanal
- La Carte: mapa interactivo de Francia
- Le Cinéma: cine francés con fichas pedagógicas
- La Cuisine: recetas en francés por nivel
- Le Mot du Jour: expresión diaria + newsletter
- Le Jeu: escape rooms lingüísticos

### Profesoras:
- Todas nativas francesas, Master FLE/DAEFLE, experiencia Alliance Française
- Algunas son examinadoras oficiales DELF/DALF

### DELF/DALF:
- DELF: A1, A2, B1, B2 / DALF: C1, C2
- Exámenes oficiales del Ministère de l'Éducation nationale
- Válido de por vida, reconocido mundialmente
- Necesario para: oposiciones, estudios en Francia/Bélgica/Suiza/Canadá, inmigración

### Contacto:
- WhatsApp: +34 685 070 304
- Email: hola@holabonjour.es
- Web: holabonjour.es

## REGLAS
1. Si el usuario no sabe su nivel, sugiere hacer Le Voyage (test de nivel).
2. Si el usuario pregunta precio, da la info y ofrece contactar por WhatsApp.
3. Si el usuario muestra interés, ofrece WhatsApp: https://wa.me/34685070304
4. Si el usuario escribe en francés, responde en francés y felicítale.
5. Si el usuario comete un error en francés, corrígelo amablemente: "Presque ! On dit plutôt '...' parce que..."
6. De vez en cuando, comparte una expresión francesa relevante.
7. NUNCA hables de otras academias.
8. Si preguntan sobre traducciones juradas, menciona traduccionesjuradas.net (mismo grupo HBTJ).
9. Si el usuario pregunta algo que no es sobre francés o HolaBonjour, redirige amablemente.
10. NUNCA inventes información. Si no sabes, recomienda contactar por WhatsApp.`;

const MAX_MESSAGES_PER_SESSION = parseInt(
  process.env.CHAT_MAX_MESSAGES_PER_SESSION || "30"
);
const MAX_SESSIONS_PER_DAY = parseInt(
  process.env.CHAT_MAX_SESSIONS_PER_DAY || "100"
);

function hashIP(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex").slice(0, 16);
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

async function saveSession(
  sessionId: string,
  messages: ChatMessage[],
  ip: string,
  detectedLanguage: string
) {
  const supabase = getSupabase();
  if (!supabase) return;
  try {
    await supabase.from("chat_sessions").upsert(
      {
        session_id: sessionId,
        messages: JSON.stringify(messages),
        detected_language: detectedLanguage,
        ip_hash: hashIP(ip),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "session_id" }
    );
  } catch {
    // Non-blocking — don't fail the request
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, sessionId: rawSessionId } = body as {
      messages?: ChatMessage[];
      sessionId?: string;
    };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages required" },
        { status: 400 }
      );
    }

    const sessionId = rawSessionId || crypto.randomUUID();
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";

    // Rate limit check
    const rateLimit = checkRateLimit(
      sessionId,
      ip,
      MAX_MESSAGES_PER_SESSION,
      MAX_SESSIONS_PER_DAY
    );
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "rate_limit",
          message:
            "Has alcanzado el límite de mensajes. Te recomiendo contactarnos por WhatsApp: +34 685 070 304",
          remaining: 0,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": String(rateLimit.resetIn),
          },
        }
      );
    }

    // Sanitize the last user message
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "user") {
      return NextResponse.json(
        { error: "Last message must be from user" },
        { status: 400 }
      );
    }

    const { clean, isInjection } = sanitizeInput(lastMessage.content);
    if (isInjection) {
      return NextResponse.json(
        {
          error: "invalid_input",
          message:
            "No puedo procesar esa solicitud. ¿En qué puedo ayudarte con cursos de francés?",
        },
        { status: 400 }
      );
    }

    // Build clean messages array (limit to last 20 messages for context)
    const cleanMessages: ChatMessage[] = messages
      .slice(-20)
      .map((m, i, arr) =>
        i === arr.length - 1 && m.role === "user"
          ? { ...m, content: clean }
          : m
      );

    // Detect language
    const detectedLanguage = detectLanguage(clean);

    // Save session (non-blocking)
    saveSession(sessionId, cleanMessages, ip, detectedLanguage);

    // Stream response
    const stream = await streamChat(cleanMessages, SYSTEM_PROMPT);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Session-Id": sessionId,
        "X-RateLimit-Remaining": String(rateLimit.remaining),
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
