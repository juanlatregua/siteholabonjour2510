import { NextRequest, NextResponse } from "next/server";
import { createCorrectionCheckoutSession, CORRECTION_PACK_PRICES } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { packKey, email } = body;

    if (!packKey || !email) {
      return NextResponse.json(
        { error: "packKey y email son obligatorios" },
        { status: 400 },
      );
    }

    if (!CORRECTION_PACK_PRICES[packKey]) {
      return NextResponse.json(
        { error: "Pack no válido" },
        { status: 400 },
      );
    }

    const session = await createCorrectionCheckoutSession({
      packKey,
      customerEmail: email,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("[corrections/purchase] Error:", error);
    return NextResponse.json(
      { error: "Error al crear sesión de pago" },
      { status: 500 },
    );
  }
}
