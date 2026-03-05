import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const examType = params.get("examType");
  const level = params.get("level");
  const community = params.get("community");
  const city = params.get("city");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};
  if (examType) where.examType = examType;
  if (level) where.level = level;
  if (community) where.autonomousCommunity = community;
  if (city) where.city = city;

  const sessions = await prisma.examSession.findMany({
    where,
    orderBy: [{ writtenExamDate: "asc" }, { level: "asc" }],
  });

  return NextResponse.json(sessions);
}
