import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyZoomSignature, generateCRCResponse } from "@/lib/zoom-webhook";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const timestamp = req.headers.get("x-zm-request-timestamp") || "";
  const signature = req.headers.get("x-zm-signature") || "";

  // Parse body
  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Handle Zoom CRC validation challenge
  if (payload.event === "endpoint.url_validation") {
    const plainToken = (payload.payload as Record<string, unknown>)?.plainToken as string;
    if (!plainToken) {
      return NextResponse.json({ error: "Missing plainToken" }, { status: 400 });
    }
    const hashForValidation = generateCRCResponse(plainToken);
    return NextResponse.json({ plainToken, encryptedToken: hashForValidation });
  }

  // Verify HMAC signature for all other events
  if (!verifyZoomSignature(body, timestamp, signature)) {
    console.error("[zoom-webhook] Invalid signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const eventType = payload.event as string;
  const eventPayload = payload.payload as Record<string, unknown> | undefined;
  const eventId = (payload as Record<string, string>).event_ts
    ? `${eventType}_${(payload as Record<string, string>).event_ts}`
    : `${eventType}_${Date.now()}`;

  if (!eventPayload) {
    return NextResponse.json({ received: true });
  }

  // Extract meeting ID — Zoom sends it as a number in the object
  const meetingObj = eventPayload.object as Record<string, unknown> | undefined;
  const rawMeetingId = meetingObj?.id;
  const meetingId = rawMeetingId != null ? String(rawMeetingId) : null;

  if (!meetingId) {
    return NextResponse.json({ received: true });
  }

  // Idempotency check
  const existingEvent = await prisma.zoomEvent.findUnique({ where: { id: eventId } });
  if (existingEvent) {
    return NextResponse.json({ received: true });
  }

  // Store event for idempotency
  await prisma.zoomEvent.create({
    data: {
      id: eventId,
      type: eventType,
      meetingId,
      payload: body.length < 10_000 ? body : null,
    },
  }).catch(() => {}); // Ignore duplicate key race condition

  // Find the lesson by zoomMeetingId
  const lesson = await prisma.lesson.findFirst({
    where: { zoomMeetingId: meetingId },
  });

  if (!lesson) {
    console.warn(`[zoom-webhook] No lesson found for meeting ${meetingId}`);
    return NextResponse.json({ received: true });
  }

  try {
    switch (eventType) {
      case "meeting.participant_joined":
        await handleParticipantJoined(lesson.id, meetingObj);
        break;

      case "meeting.participant_left":
        await handleParticipantLeft(lesson.id, meetingObj);
        break;

      case "meeting.ended":
        await handleMeetingEnded(lesson.id, meetingObj);
        break;

      case "recording.completed":
        await handleRecordingCompleted(lesson.id, eventPayload);
        break;

      default:
        console.log(`[zoom-webhook] Unhandled event: ${eventType}`);
    }
  } catch (err) {
    console.error(`[zoom-webhook] Error handling ${eventType}:`, err);
  }

  return NextResponse.json({ received: true });
}

// ── Handlers ──

async function handleParticipantJoined(
  lessonId: string,
  meetingObj: Record<string, unknown> | undefined,
) {
  const participant = (meetingObj?.participant as Record<string, unknown>) || {};
  const isHost = participant.role === "host" || participant.role === undefined;
  const joinTime = new Date();

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { teacherJoinedAt: true, studentJoinedAt: true },
  });

  if (!lesson) return;

  // Host = teacher, participant = student
  // Store first joinedAt only
  if (isHost && !lesson.teacherJoinedAt) {
    await prisma.lesson.update({
      where: { id: lessonId },
      data: { teacherJoinedAt: joinTime, attendanceSource: "zoom_webhook" },
    });
  } else if (!isHost && !lesson.studentJoinedAt) {
    await prisma.lesson.update({
      where: { id: lessonId },
      data: { studentJoinedAt: joinTime, attendanceSource: "zoom_webhook" },
    });
  }
}

async function handleParticipantLeft(
  lessonId: string,
  meetingObj: Record<string, unknown> | undefined,
) {
  const participant = (meetingObj?.participant as Record<string, unknown>) || {};
  const isHost = participant.role === "host" || participant.role === undefined;
  const leaveTime = new Date();

  // Always update leftAt (captures last leave)
  if (isHost) {
    await prisma.lesson.update({
      where: { id: lessonId },
      data: { teacherLeftAt: leaveTime },
    });
  } else {
    await prisma.lesson.update({
      where: { id: lessonId },
      data: { studentLeftAt: leaveTime },
    });
  }
}

async function handleMeetingEnded(
  lessonId: string,
  meetingObj: Record<string, unknown> | undefined,
) {
  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { teacherJoinedAt: true, studentJoinedAt: true, status: true },
  });
  if (!lesson) return;

  // Calculate actual duration
  const endTime = new Date();
  const startTime = lesson.teacherJoinedAt || lesson.studentJoinedAt;
  const actualDurationMin = startTime
    ? Math.round((endTime.getTime() - startTime.getTime()) / 60_000)
    : (meetingObj?.duration as number) || null;

  // Auto-complete the class
  if (lesson.status === "SCHEDULED") {
    await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        status: "COMPLETED",
        actualDurationMin,
        attendanceSource: "zoom_webhook",
      },
    });

    // Trigger post-class flow (fire-and-forget)
    import("@/lib/post-class").then(({ triggerPostClassFlow }) => {
      triggerPostClassFlow(lessonId).catch((err: unknown) =>
        console.error("[zoom-webhook] Post-class flow failed:", err)
      );
    });
  }
}

async function handleRecordingCompleted(
  lessonId: string,
  eventPayload: Record<string, unknown>,
) {
  const object = eventPayload.object as Record<string, unknown> | undefined;
  const recordingFiles = (object?.recording_files as Array<Record<string, unknown>>) || [];

  // Find the shared screen or active speaker recording with share_url
  const mainRecording = recordingFiles.find(
    (f) => f.file_type === "MP4" && f.status === "completed",
  );

  const shareUrl = (object?.share_url as string) || (mainRecording?.share_url as string);
  const password = (object?.password as string) || (mainRecording?.recording_play_passcode as string);

  if (!shareUrl) {
    console.warn(`[zoom-webhook] No share_url in recording.completed for lesson ${lessonId}`);
    return;
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
    select: { postClassEmailSentAt: true },
  });

  await prisma.lesson.update({
    where: { id: lessonId },
    data: {
      recordingUrl: shareUrl,
      recordingPassword: password || null,
      recordingReadyAt: new Date(),
    },
  });

  // If post-class email was already sent, send recording-ready follow-up
  if (lesson?.postClassEmailSentAt) {
    import("@/lib/post-class").then(({ sendRecordingFollowup }) => {
      sendRecordingFollowup(lessonId).catch((err: unknown) =>
        console.error("[zoom-webhook] Recording followup failed:", err)
      );
    });
  }
}
