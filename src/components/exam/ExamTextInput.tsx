"use client";

interface ExamTextInputProps {
  questionId: string;
  questionText: string;
  value: string;
  onChange: (questionId: string, value: string) => void;
  correctAnswers?: string[];
  showCorrection: boolean;
  points: number;
}

export default function ExamTextInput({
  questionId,
  questionText,
  value,
  onChange,
  correctAnswers,
  showCorrection,
  points,
}: ExamTextInputProps) {
  const isCorrect =
    showCorrection &&
    correctAnswers?.some(
      (a) =>
        value.trim().toLowerCase().includes(a.toLowerCase()) ||
        a.toLowerCase().includes(value.trim().toLowerCase())
    );

  let borderClass = "border-gray-200 focus-within:border-[#395D9F]";
  if (showCorrection) {
    borderClass = isCorrect ? "border-green-500" : "border-red-400";
  }

  return (
    <div className="space-y-1.5">
      <p className="font-medium text-gray-800 text-sm">
        {questionText}
        <span className="text-gray-400 ml-2 text-xs">({points} pt{points > 1 ? "s" : ""})</span>
      </p>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(questionId, e.target.value)}
        disabled={showCorrection}
        placeholder="Votre réponse..."
        className={`w-full px-3 py-2 border rounded-lg text-sm text-gray-700 outline-none transition-colors ${borderClass} ${
          showCorrection ? "bg-gray-50" : ""
        }`}
      />
      {showCorrection && (
        <p className={`text-xs ${isCorrect ? "text-green-600" : "text-red-500"}`}>
          {isCorrect ? "✓ Correct" : `✗ Réponse attendue : ${correctAnswers?.[0] || ""}`}
        </p>
      )}
    </div>
  );
}
