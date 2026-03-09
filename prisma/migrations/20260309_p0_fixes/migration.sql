-- P0 Fix: Lead model
CREATE TABLE IF NOT EXISTS "leads" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "objetivo" TEXT,
    "message" TEXT,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);
CREATE INDEX IF NOT EXISTS "leads_email_idx" ON "leads"("email");

-- P0 Fix: StripeEvent idempotency table
CREATE TABLE IF NOT EXISTS "stripe_events" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "stripe_events_pkey" PRIMARY KEY ("id")
);

-- P0 Fix: Partial unique index to prevent double-booking
-- Only active lesson statuses are constrained (SCHEDULED, PENDING_PAYMENT)
CREATE UNIQUE INDEX IF NOT EXISTS "lesson_teacher_slot_active"
    ON "lessons" ("teacherId", "scheduledAt")
    WHERE status IN ('SCHEDULED', 'PENDING_PAYMENT');
