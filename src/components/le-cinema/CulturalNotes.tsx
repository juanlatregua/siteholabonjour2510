import type { CulturalNote } from "@/data/films/films";

export default function CulturalNotes({ notes }: { notes: CulturalNote[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {notes.map((note, idx) => (
        <div
          key={idx}
          className="vie-card rounded-xl p-5"
          style={{ borderLeft: "4px solid var(--vie-gold)" }}
        >
          <h4
            className="mb-2 text-sm font-bold"
            style={{ color: "var(--vie-navy)", fontFamily: "var(--font-display)" }}
          >
            {note.title}
          </h4>
          <p className="text-sm leading-relaxed text-gray-600">{note.content}</p>
        </div>
      ))}
    </div>
  );
}
