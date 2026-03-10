-- Zoom recording fields (Phase 1A)
ALTER TABLE "lessons" ADD COLUMN "recordingUrl" TEXT;
ALTER TABLE "lessons" ADD COLUMN "recordingPassword" TEXT;
ALTER TABLE "lessons" ADD COLUMN "recordingReadyAt" TIMESTAMP(3);

-- Zoom attendance tracking (Phase 2)
ALTER TABLE "lessons" ADD COLUMN "teacherJoinedAt" TIMESTAMP(3);
ALTER TABLE "lessons" ADD COLUMN "teacherLeftAt" TIMESTAMP(3);
ALTER TABLE "lessons" ADD COLUMN "studentJoinedAt" TIMESTAMP(3);
ALTER TABLE "lessons" ADD COLUMN "studentLeftAt" TIMESTAMP(3);
ALTER TABLE "lessons" ADD COLUMN "actualDurationMin" INTEGER;
ALTER TABLE "lessons" ADD COLUMN "attendanceSource" TEXT;

-- Post-class flow (Phase 3)
ALTER TABLE "lessons" ADD COLUMN "postClassEmailSentAt" TIMESTAMP(3);

-- Zoom webhook events (Phase 2 — idempotency)
CREATE TABLE "zoom_events" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "payload" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "zoom_events_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "zoom_events_meetingId_idx" ON "zoom_events"("meetingId");
