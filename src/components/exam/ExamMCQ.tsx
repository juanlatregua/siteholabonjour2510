"use client";

interface ExamMCQProps {
  questionId: string;
  questionText: string;
  options: string[];
  selected: number | null;
  onChange: (questionId: string, index: number) => void;
  correctAnswer?: number;
  showCorrection: boolean;
  points: number;
}

export default function ExamMCQ({
  questionId,
  questionText,
  options,
  selected,
  onChange,
  correctAnswer,
  showCorrection,
  points,
}: ExamMCQProps) {
  return (
    <div className="space-y-2">
      <p className="font-medium text-gray-800 text-sm">
        {questionText}
        <span className="text-gray-400 ml-2 text-xs">({points} pt{points > 1 ? "s" : ""})</span>
      </p>
      <div className="space-y-1.5">
        {options.map((option, i) => {
          const isSelected = selected === i;
          const isCorrect = correctAnswer === i;

          let borderClass = "border-gray-200";
          let bgClass = "bg-white";

          if (showCorrection) {
            if (isCorrect) {
              borderClass = "border-green-500";
              bgClass = "bg-green-50";
            } else if (isSelected && !isCorrect) {
              borderClass = "border-red-400";
              bgClass = "bg-red-50";
            }
          } else if (isSelected) {
            borderClass = "border-[#395D9F]";
            bgClass = "bg-blue-50";
          }

          return (
            <label
              key={i}
              className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${borderClass} ${bgClass} ${
                !showCorrection ? "hover:border-[#395D9F] hover:bg-blue-50" : ""
              }`}
            >
              <input
                type="radio"
                name={questionId}
                checked={isSelected}
                onChange={() => onChange(questionId, i)}
                disabled={showCorrection}
                className="accent-[#395D9F]"
              />
              <span className="text-sm text-gray-700">{option}</span>
              {showCorrection && isCorrect && (
                <span className="ml-auto text-green-600 text-xs font-semibold">✓</span>
              )}
              {showCorrection && isSelected && !isCorrect && (
                <span className="ml-auto text-red-500 text-xs font-semibold">✗</span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
