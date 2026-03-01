"use client";

import { useState } from "react";
import { FiShare2, FiCopy, FiCheck } from "react-icons/fi";
import type { AssessmentResult } from "@/lib/assessment/types";

interface ShareButtonsProps {
  result: AssessmentResult;
}

export default function ShareButtons({ result }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `He obtenido nivel ${result.estimatedLevel} (${result.percentage}%) en la prueba de frances de HolaBonjour. Haz la tuya!`;
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.origin + "/test-de-nivel"
      : "https://holabonjour.es/test-de-nivel";

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-500">
        <FiShare2 className="inline" /> Compartir:
      </span>
      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
      >
        Twitter
      </a>
      <a
        href={linkedinUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
      >
        LinkedIn
      </a>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
      >
        WhatsApp
      </a>
      <button
        type="button"
        onClick={() => void copyToClipboard()}
        className="rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
      >
        {copied ? (
          <>
            <FiCheck className="inline" /> Copiado
          </>
        ) : (
          <>
            <FiCopy className="inline" /> Copiar
          </>
        )}
      </button>
    </div>
  );
}
