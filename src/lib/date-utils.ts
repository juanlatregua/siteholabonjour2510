/**
 * Parse a date + time string into a Date object using Europe/Madrid timezone.
 * This ensures bookings are always interpreted in Spain time regardless of server TZ.
 */
export function parseSpainDateTime(date: string, time: string): Date {
  const probe = new Date(`${date}T${time}:00`);
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Madrid",
    timeZoneName: "shortOffset",
  });
  const parts = formatter.formatToParts(probe);
  const offset = parts.find((p) => p.type === "timeZoneName")?.value || "+01:00";
  const match = offset.match(/GMT([+-])(\d+)/);
  const isoOffset = match
    ? `${match[1]}${match[2].padStart(2, "0")}:00`
    : "+01:00";
  return new Date(`${date}T${time}:00${isoOffset}`);
}
