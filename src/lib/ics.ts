// lib/ics.ts — Generate RFC 5545 .ics calendar invites (no external deps)

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

function formatDateUTC(d: Date): string {
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    "Z"
  );
}

function escapeICS(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

interface GenerateICSOptions {
  title: string;
  startTime: Date;
  durationMinutes: number;
  location?: string;
  description?: string;
  organizerEmail?: string;
}

export function generateICS(opts: GenerateICSOptions): string {
  const start = formatDateUTC(opts.startTime);
  const endDate = new Date(opts.startTime.getTime() + opts.durationMinutes * 60_000);
  const end = formatDateUTC(endDate);
  const now = formatDateUTC(new Date());
  const uid = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}@holabonjour.es`;
  const organizer = opts.organizerEmail || "info@holabonjour.es";

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//HolaBonjour//Clase//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeICS(opts.title)}`,
    ...(opts.location ? [`LOCATION:${escapeICS(opts.location)}`] : []),
    ...(opts.description ? [`DESCRIPTION:${escapeICS(opts.description)}`] : []),
    `ORGANIZER;CN=HolaBonjour:mailto:${organizer}`,
    // Alarm: 1 hour before
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    "DESCRIPTION:Clase de franc\\u00e9s en 1 hora",
    "END:VALARM",
    // Alarm: 15 minutes before
    "BEGIN:VALARM",
    "TRIGGER:-PT15M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Clase de franc\\u00e9s en 15 minutos",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.join("\r\n");
}

/** Build ICS for a HolaBonjour lesson */
export function generateLessonICS(opts: {
  studentName: string;
  scheduledAt: Date;
  durationMinutes: number;
  zoomLink?: string | null;
}): string {
  const title = `Clase de francés — HolaBonjour`;
  const description = opts.zoomLink
    ? `Clase con ${opts.studentName}.\nZoom: ${opts.zoomLink}`
    : `Clase con ${opts.studentName}.`;

  return generateICS({
    title,
    startTime: opts.scheduledAt,
    durationMinutes: opts.durationMinutes,
    location: opts.zoomLink || undefined,
    description,
  });
}
