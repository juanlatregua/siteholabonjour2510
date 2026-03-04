"use client";

interface CorrectedTextDiffProps {
  original: string;
  corrected: string;
}

export default function CorrectedTextDiff({
  original,
  corrected,
}: CorrectedTextDiffProps) {
  // Simple word-level diff
  const origWords = original.split(/(\s+)/);
  const corrWords = corrected.split(/(\s+)/);

  const maxLen = Math.max(origWords.length, corrWords.length);
  const segments: Array<{
    orig: string;
    corr: string;
    changed: boolean;
  }> = [];

  for (let i = 0; i < maxLen; i++) {
    const ow = origWords[i] || "";
    const cw = corrWords[i] || "";
    segments.push({
      orig: ow,
      corr: cw,
      changed: ow !== cw,
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-gray-500 mb-2">
          Texto corregido
        </h4>
        <div className="leading-7 text-[15px]">
          {segments.map((seg, i) =>
            seg.changed ? (
              <span key={i}>
                {seg.orig && (
                  <span className="bg-red-100 text-red-700 line-through px-0.5 rounded">
                    {seg.orig}
                  </span>
                )}
                {seg.corr && (
                  <span className="bg-green-100 text-green-700 px-0.5 rounded">
                    {seg.corr}
                  </span>
                )}
              </span>
            ) : (
              <span key={i}>{seg.corr}</span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
