-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "studentName" TEXT,
    "rating" INTEGER,
    "comment" TEXT,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" TIMESTAMP(3),

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "reviews_lessonId_key" ON "reviews"("lessonId");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_token_key" ON "reviews"("token");

-- CreateIndex
CREATE INDEX "reviews_studentId_idx" ON "reviews"("studentId");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
