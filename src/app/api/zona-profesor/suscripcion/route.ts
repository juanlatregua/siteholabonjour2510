export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createSubscriptionCheckout, createCustomerPortalSession } from "@/lib/stripe";

// POST: create subscription checkout session
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user || (session.user.role !== "TEACHER" && session.user.role !== "ADMIN")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.preparateurProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) {
    return NextResponse.json({ error: "No profile found" }, { status: 404 });
  }

  if (profile.subscriptionStatus === "active") {
    return NextResponse.json({ error: "Already subscribed" }, { status: 409 });
  }

  const body = await request.json();
  const { action } = body as { action: "subscribe" | "portal" };

  // Manage existing subscription via Customer Portal
  if (action === "portal") {
    if (!profile.stripeCustomerId) {
      return NextResponse.json({ error: "No subscription to manage" }, { status: 400 });
    }
    const portalSession = await createCustomerPortalSession(profile.stripeCustomerId);
    return NextResponse.json({ url: portalSession.url });
  }

  // Create new subscription checkout
  const checkoutSession = await createSubscriptionCheckout({
    profileId: profile.id,
    customerEmail: session.user.email!,
    customerId: profile.stripeCustomerId || undefined,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
