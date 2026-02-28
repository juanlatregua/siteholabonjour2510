"use client";

import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Button from "@/components/ui/Button";

interface FileUploaderProps {
  studentId: string;
  onUploadComplete?: () => void;
}

const ACCEPTED_TYPES: Record<string, string[]> = {
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  "audio/mpeg": [".mp3"],
  "video/mp4": [".mp4"],
};

const MAX_SIZE = 50 * 1024 * 1024; // 50MB

export default function FileUploader({ studentId, onUploadComplete }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    setSuccess(false);
    if (acceptedFiles.length > 0) {
      const f = acceptedFiles[0];
      setFile(f);
      if (!title) {
        setTitle(f.name.replace(/\.[^/.]+$/, ""));
      }
    }
  }, [title]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE,
    multiple: false,
    onDropRejected: (rejections) => {
      const rejection = rejections[0];
      if (rejection?.errors[0]?.code === "file-too-large") {
        setError("El archivo supera el limite de 50MB.");
      } else if (rejection?.errors[0]?.code === "file-invalid-type") {
        setError("Tipo de archivo no permitido. Usa PDF, DOC, DOCX, MP3 o MP4.");
      } else {
        setError("Archivo no valido.");
      }
    },
  });

  async function handleUpload() {
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("studentId", studentId);
      formData.append("title", title || file.name);

      // Simulate progress steps
      setProgress(20);

      const res = await fetch("/api/zona-profesor/upload", {
        method: "POST",
        body: formData,
      });

      setProgress(80);

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.message || "Error al subir el archivo");
      }

      setProgress(100);
      setSuccess(true);
      setFile(null);
      setTitle("");
      onUploadComplete?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir el archivo");
    } finally {
      setUploading(false);
    }
  }

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          isDragActive
            ? "border-[#0f5da0] bg-[#0f5da0]/5"
            : "border-gray-300 hover:border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-sm font-medium text-[#0f5da0]">
            Suelta el archivo aqui...
          </p>
        ) : (
          <div>
            <p className="text-sm font-medium text-gray-700">
              Arrastra un archivo o haz clic para seleccionar
            </p>
            <p className="mt-1 text-xs text-gray-500">
              PDF, DOC, DOCX, MP3, MP4 - Max 50MB
            </p>
          </div>
        )}
      </div>

      {/* File preview */}
      {file && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <div className="flex items-center justify-between">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-500">{formatSize(file.size)}</p>
            </div>
            <button
              onClick={() => {
                setFile(null);
                setTitle("");
              }}
              className="ml-2 flex-shrink-0 text-xs text-red-500 hover:text-red-700"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}

      {/* Title input */}
      {file && (
        <div>
          <label htmlFor="material-title" className="mb-1 block text-sm font-medium text-gray-700">
            Titulo del material
          </label>
          <input
            id="material-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nombre del material"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#0b3c6f] focus:outline-none focus:ring-2 focus:ring-[#0b3c6f]/20"
          />
        </div>
      )}

      {/* Progress bar */}
      {uploading && (
        <div className="space-y-1">
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-[#0f5da0] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">Subiendo... {progress}%</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Success */}
      {success && (
        <p className="text-sm text-green-600">Archivo subido correctamente.</p>
      )}

      {/* Upload button */}
      {file && (
        <Button
          variant="primary"
          size="md"
          loading={uploading}
          disabled={!file || uploading}
          onClick={handleUpload}
        >
          Subir material
        </Button>
      )}
    </div>
  );
}
