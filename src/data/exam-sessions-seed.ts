// Initial seed data for exam sessions — 10 main DELF/DALF centers in Spain, 2026 dates
// Source: Alliance Française & Institut Français websites (dates are approximate for seeding)

export interface ExamSessionSeed {
  examType: "DELF" | "DALF" | "EOI";
  level: string;
  center: string;
  centerType: "ALLIANCE_FRANCAISE" | "INSTITUT_FRANCAIS" | "EOI";
  city: string;
  province: string;
  autonomousCommunity: string;
  registrationStart?: string;
  registrationEnd?: string;
  writtenExamDate?: string;
  oralExamStart?: string;
  oralExamEnd?: string;
  resultsDate?: string;
  fee?: number;
  sourceUrl?: string;
  notes?: string;
}

export const examSessionSeeds: ExamSessionSeed[] = [
  // ── Alliance Française Madrid ──
  ...["A1", "A2", "B1", "B2"].map((level) => ({
    examType: "DELF" as const,
    level,
    center: "Alliance Française de Madrid",
    centerType: "ALLIANCE_FRANCAISE" as const,
    city: "Madrid",
    province: "Madrid",
    autonomousCommunity: "Comunidad de Madrid",
    registrationStart: "2026-02-15",
    registrationEnd: "2026-04-15",
    writtenExamDate: "2026-05-23",
    oralExamStart: "2026-05-25",
    oralExamEnd: "2026-06-05",
    resultsDate: "2026-07-15",
    fee: level === "A1" || level === "A2" ? 108 : 130,
    sourceUrl: "https://www.alliancefrancaise.es/madrid",
    notes: "Convocatoria mayo-junio 2026",
  })),
  ...["C1", "C2"].map((level) => ({
    examType: "DALF" as const,
    level,
    center: "Alliance Française de Madrid",
    centerType: "ALLIANCE_FRANCAISE" as const,
    city: "Madrid",
    province: "Madrid",
    autonomousCommunity: "Comunidad de Madrid",
    registrationStart: "2026-02-15",
    registrationEnd: "2026-04-15",
    writtenExamDate: "2026-05-23",
    oralExamStart: "2026-05-25",
    oralExamEnd: "2026-06-05",
    resultsDate: "2026-07-15",
    fee: level === "C1" ? 155 : 170,
    sourceUrl: "https://www.alliancefrancaise.es/madrid",
    notes: "Convocatoria mayo-junio 2026",
  })),

  // ── Alliance Française Málaga ──
  ...["A1", "A2", "B1", "B2"].map((level) => ({
    examType: "DELF" as const,
    level,
    center: "Alliance Française de Málaga",
    centerType: "ALLIANCE_FRANCAISE" as const,
    city: "Málaga",
    province: "Málaga",
    autonomousCommunity: "Andalucía",
    registrationStart: "2026-03-01",
    registrationEnd: "2026-04-30",
    writtenExamDate: "2026-06-06",
    oralExamStart: "2026-06-08",
    oralExamEnd: "2026-06-19",
    resultsDate: "2026-07-20",
    fee: level === "A1" || level === "A2" ? 108 : 130,
    sourceUrl: "https://www.alliancefrancaise.es/malaga",
    notes: "Convocatoria junio 2026",
  })),
  ...["C1"].map((level) => ({
    examType: "DALF" as const,
    level,
    center: "Alliance Française de Málaga",
    centerType: "ALLIANCE_FRANCAISE" as const,
    city: "Málaga",
    province: "Málaga",
    autonomousCommunity: "Andalucía",
    registrationStart: "2026-03-01",
    registrationEnd: "2026-04-30",
    writtenExamDate: "2026-06-06",
    oralExamStart: "2026-06-08",
    oralExamEnd: "2026-06-19",
    resultsDate: "2026-07-20",
    fee: 155,
    sourceUrl: "https://www.alliancefrancaise.es/malaga",
    notes: "Convocatoria junio 2026",
  })),

  // ── Institut Français Barcelona ──
  ...["A1", "A2", "B1", "B2"].map((level) => ({
    examType: "DELF" as const,
    level,
    center: "Institut Français de Barcelone",
    centerType: "INSTITUT_FRANCAIS" as const,
    city: "Barcelona",
    province: "Barcelona",
    autonomousCommunity: "Cataluña",
    registrationStart: "2026-02-01",
    registrationEnd: "2026-04-10",
    writtenExamDate: "2026-05-16",
    oralExamStart: "2026-05-18",
    oralExamEnd: "2026-05-29",
    resultsDate: "2026-07-10",
    fee: level === "A1" || level === "A2" ? 108 : 130,
    sourceUrl: "https://www.institutfrancais.es/barcelona",
    notes: "Convocatoria mayo 2026",
  })),
  ...["C1", "C2"].map((level) => ({
    examType: "DALF" as const,
    level,
    center: "Institut Français de Barcelone",
    centerType: "INSTITUT_FRANCAIS" as const,
    city: "Barcelona",
    province: "Barcelona",
    autonomousCommunity: "Cataluña",
    registrationStart: "2026-02-01",
    registrationEnd: "2026-04-10",
    writtenExamDate: "2026-05-16",
    oralExamStart: "2026-05-18",
    oralExamEnd: "2026-05-29",
    resultsDate: "2026-07-10",
    fee: level === "C1" ? 155 : 170,
    sourceUrl: "https://www.institutfrancais.es/barcelona",
    notes: "Convocatoria mayo 2026",
  })),

  // ── Alliance Française Sevilla ──
  ...["A1", "A2", "B1", "B2"].map((level) => ({
    examType: "DELF" as const,
    level,
    center: "Alliance Française de Séville",
    centerType: "ALLIANCE_FRANCAISE" as const,
    city: "Sevilla",
    province: "Sevilla",
    autonomousCommunity: "Andalucía",
    registrationStart: "2026-03-01",
    registrationEnd: "2026-04-25",
    writtenExamDate: "2026-05-30",
    oralExamStart: "2026-06-01",
    oralExamEnd: "2026-06-12",
    resultsDate: "2026-07-20",
    fee: level === "A1" || level === "A2" ? 108 : 130,
    sourceUrl: "https://www.alliancefrancaise.es/sevilla",
    notes: "Convocatoria mayo-junio 2026",
  })),

  // ── Alliance Française Valencia ──
  ...["A1", "A2", "B1", "B2"].map((level) => ({
    examType: "DELF" as const,
    level,
    center: "Alliance Française de Valencia",
    centerType: "ALLIANCE_FRANCAISE" as const,
    city: "Valencia",
    province: "Valencia",
    autonomousCommunity: "Comunitat Valenciana",
    registrationStart: "2026-02-15",
    registrationEnd: "2026-04-20",
    writtenExamDate: "2026-05-23",
    oralExamStart: "2026-05-25",
    oralExamEnd: "2026-06-05",
    resultsDate: "2026-07-15",
    fee: level === "A1" || level === "A2" ? 108 : 130,
    sourceUrl: "https://www.alliancefrancaise.es/valencia",
    notes: "Convocatoria mayo-junio 2026",
  })),

  // ── Institut Français Bilbao ──
  ...["B1", "B2"].map((level) => ({
    examType: "DELF" as const,
    level,
    center: "Institut Français de Bilbao",
    centerType: "INSTITUT_FRANCAIS" as const,
    city: "Bilbao",
    province: "Vizcaya",
    autonomousCommunity: "País Vasco",
    registrationStart: "2026-02-15",
    registrationEnd: "2026-04-15",
    writtenExamDate: "2026-05-30",
    oralExamStart: "2026-06-01",
    oralExamEnd: "2026-06-12",
    resultsDate: "2026-07-15",
    fee: 130,
    sourceUrl: "https://www.institutfrancais.es/bilbao",
    notes: "Convocatoria mayo-junio 2026",
  })),
  {
    examType: "DALF" as const,
    level: "C1",
    center: "Institut Français de Bilbao",
    centerType: "INSTITUT_FRANCAIS" as const,
    city: "Bilbao",
    province: "Vizcaya",
    autonomousCommunity: "País Vasco",
    registrationStart: "2026-02-15",
    registrationEnd: "2026-04-15",
    writtenExamDate: "2026-05-30",
    oralExamStart: "2026-06-01",
    oralExamEnd: "2026-06-12",
    resultsDate: "2026-07-15",
    fee: 155,
    sourceUrl: "https://www.institutfrancais.es/bilbao",
    notes: "Convocatoria mayo-junio 2026",
  },

  // ── Alliance Française Zaragoza ──
  ...["A2", "B1", "B2"].map((level) => ({
    examType: "DELF" as const,
    level,
    center: "Alliance Française de Zaragoza",
    centerType: "ALLIANCE_FRANCAISE" as const,
    city: "Zaragoza",
    province: "Zaragoza",
    autonomousCommunity: "Aragón",
    registrationStart: "2026-03-01",
    registrationEnd: "2026-04-30",
    writtenExamDate: "2026-06-06",
    oralExamStart: "2026-06-08",
    oralExamEnd: "2026-06-19",
    resultsDate: "2026-07-20",
    fee: level === "A2" ? 108 : 130,
    sourceUrl: "https://www.alliancefrancaise.es/zaragoza",
    notes: "Convocatoria junio 2026",
  })),
];
