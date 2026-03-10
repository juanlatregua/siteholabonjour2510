// lib/post-class.ts — Post-class automated flow
import { prisma } from "@/lib/prisma";
import { sendPostClassEmail, sendRecordingReadyEmail } from "@/lib/email";
import { sendNotification } from "@/lib/sms";
import { smsPostClase } from "@/lib/sms-templates";

/**
 * Triggered when a Zoom meeting ends (meeting.ended webhook).
 * Sends post-class email + SMS to the student.
 */
export async function triggerPostClassFlow(lessonId: string): Promise<void> {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      student: { select: { id: true, name: true, email: true, phone: true } },
      pack: { select: { hoursTotal: true, hoursUsed: true } },
    },
  });

  if (!lesson) {
    console.warn(`[post-class] Lesson ${lessonId} not found`);
    return;
  }

  // Avoid double-sending
  if (lesson.postClassEmailSentAt) {
    console.log(`[post-class] Already sent for lesson ${lessonId}`);
    return;
  }

  const student = lesson.student;
  const firstName = (student.name || "").split(" ")[0] || "Alumno";
  const hoursRemaining = lesson.pack
    ? Math.max(0, lesson.pack.hoursTotal - lesson.pack.hoursUsed)
    : null;

  // Send email
  await sendPostClassEmail({
    toEmail: student.email,
    customerName: student.name || "Alumno",
    recordingUrl: lesson.recordingUrl || undefined,
    hoursRemaining,
  });

  // Mark as sent
  await prisma.lesson.update({
    where: { id: lessonId },
    data: { postClassEmailSentAt: new Date() },
  });

  // Send SMS (fire-and-forget)
  if (student.phone) {
    sendNotification({
      to: student.phone,
      body: smsPostClase({ nombre: firstName }),
    }).catch((err) => console.error("[post-class] SMS failed:", err));
  }

  console.log(`[post-class] Flow completed for lesson ${lessonId}`);
}

/**
 * Triggered when a recording becomes available (recording.completed webhook)
 * AFTER the post-class email was already sent without a recording link.
 */
export async function sendRecordingFollowup(lessonId: string): Promise<void> {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    include: {
      student: { select: { name: true, email: true } },
    },
  });

  if (!lesson || !lesson.recordingUrl) {
    console.warn(`[post-class] No recording URL for lesson ${lessonId}`);
    return;
  }

  await sendRecordingReadyEmail({
    toEmail: lesson.student.email,
    customerName: lesson.student.name || "Alumno",
    recordingUrl: lesson.recordingUrl,
  });

  console.log(`[post-class] Recording followup sent for lesson ${lessonId}`);
}
