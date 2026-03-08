import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendExamFollowupEmail } from "@/lib/email";

// Vercel cron: every 30 min — sends follow-up emails ~1h after exam completion

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
  const fortyEightHoursAgo = new Date(now.getTime() - 48 * 60 * 60 * 1000);

  try {
    const attempts = await prisma.examAttempt.findMany({
      where: {
        status: "finished",
        followupSentAt: null,
        finishedAt: {
          lt: oneHourAgo,
          gt: fortyEightHoursAgo,
        },
        user: {
          email: { not: "" },
        },
      },
      include: { user: true },
      take: 50,
    });

    let sent = 0;
    for (const attempt of attempts) {
      if (!attempt.user.email || attempt.totalScore === null || attempt.passed === null) continue;

      let analysis: {
        probabilityOfPassing?: number;
        personalizedMessage?: string;
        recommendedAction?: string;
        studyPlan?: string[];
      } = {};
      if (attempt.aiAnalysis) {
        try {
          analysis = JSON.parse(attempt.aiAnalysis);
        } catch { /* ignore parse errors */ }
      }

      try {
        await sendExamFollowupEmail({
          toEmail: attempt.user.email,
          customerName: (attempt.user.name || "").split(" ")[0] || "Étudiant",
          nivel: attempt.nivel,
          totalScore: attempt.totalScore,
          passed: attempt.passed,
          probabilityOfPassing: analysis.probabilityOfPassing,
          personalizedMessage: analysis.personalizedMessage,
          recommendedAction: analysis.recommendedAction,
          studyPlan: analysis.studyPlan,
        });

        await prisma.examAttempt.update({
          where: { id: attempt.id },
          data: { followupSentAt: new Date() },
        });

        sent++;
      } catch (err) {
        console.error(`[cron/exam-followup] Failed for attempt ${attempt.id}:`, err);
      }
    }

    return NextResponse.json({ ok: true, sent, found: attempts.length });
  } catch (err) {
    console.error("[cron/exam-followup]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
