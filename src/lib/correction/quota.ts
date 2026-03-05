// Quota management for AI writing corrections

import { prisma } from "@/lib/prisma";

export interface QuotaStatus {
  canSubmit: boolean;
  freeUsed: number;
  freeLimit: number;
  freeRemaining: number;
  paidRemaining: number;
  hasActivePack: boolean;
  reason?: string;
}

export async function getQuotaStatus(email: string, userId?: string): Promise<QuotaStatus> {
  // Check if user has an active class pack → unlimited corrections
  const hasActivePack = userId ? await checkActivePack(userId) : false;

  if (hasActivePack) {
    return {
      canSubmit: true,
      freeUsed: 0,
      freeLimit: 3,
      freeRemaining: 0,
      paidRemaining: 0,
      hasActivePack: true,
    };
  }

  // Get or create quota record
  const quota = await prisma.correctionQuota.upsert({
    where: { email },
    create: { email },
    update: {},
  });

  const freeRemaining = Math.max(0, quota.freeLimit - quota.freeUsed);
  const canSubmit = freeRemaining > 0 || quota.paidRemaining > 0;

  return {
    canSubmit,
    freeUsed: quota.freeUsed,
    freeLimit: quota.freeLimit,
    freeRemaining,
    paidRemaining: quota.paidRemaining,
    hasActivePack: false,
    reason: canSubmit ? undefined : "No te quedan correcciones. Compra un pack para continuar.",
  };
}

export async function decrementQuota(email: string, userId?: string): Promise<boolean> {
  const status = await getQuotaStatus(email, userId);
  if (!status.canSubmit) return false;

  // Active pack = unlimited, no need to decrement
  if (status.hasActivePack) return true;

  const quota = await prisma.correctionQuota.findUnique({ where: { email } });
  if (!quota) return false;

  // Use free quota first, then paid
  if (quota.freeUsed < quota.freeLimit) {
    await prisma.correctionQuota.update({
      where: { email },
      data: { freeUsed: { increment: 1 } },
    });
  } else if (quota.paidRemaining > 0) {
    await prisma.correctionQuota.update({
      where: { email },
      data: { paidRemaining: { decrement: 1 } },
    });
  } else {
    return false;
  }

  return true;
}

export async function addPaidCorrections(email: string, count: number): Promise<void> {
  await prisma.correctionQuota.upsert({
    where: { email },
    create: { email, paidRemaining: count },
    update: { paidRemaining: { increment: count } },
  });
}

async function checkActivePack(userId: string): Promise<boolean> {
  const activePack = await prisma.pack.findFirst({
    where: {
      studentId: userId,
      status: "ACTIVE",
    },
  });
  return !!activePack;
}
