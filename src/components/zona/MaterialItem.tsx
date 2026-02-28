import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { FiFileText, FiMusic, FiFile, FiEdit } from "react-icons/fi";

interface MaterialItemProps {
  title: string;
  type: string;
  storagePath: string;
  publicUrl?: string | null;
  createdAt: Date | string;
  sizeBytes?: number | null;
}

const typeIcons: Record<string, React.ReactNode> = {
  PDF: <FiFileText className="h-5 w-5 text-red-500" />,
  AUDIO: <FiMusic className="h-5 w-5 text-purple-500" />,
  DOC: <FiFile className="h-5 w-5 text-blue-500" />,
  NOTE: <FiEdit className="h-5 w-5 text-green-500" />,
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MaterialItem({
  title,
  type,
  storagePath,
  publicUrl,
  createdAt,
  sizeBytes,
}: MaterialItemProps) {
  const date =
    typeof createdAt === "string" ? new Date(createdAt) : createdAt;
  const downloadHref = publicUrl || storagePath;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
      <div className="flex-shrink-0">{typeIcons[type] || <FiFile className="h-5 w-5 text-gray-400" />}</div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">
          {format(date, "d MMM yyyy", { locale: es })}
          {sizeBytes != null && <> &middot; {formatBytes(sizeBytes)}</>}
        </p>
      </div>
      <a
        href={downloadHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-[#0b3c6f] transition-colors hover:bg-[#0b3c6f]/5"
      >
        Descargar
      </a>
    </div>
  );
}
