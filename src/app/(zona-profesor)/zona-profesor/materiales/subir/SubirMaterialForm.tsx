"use client";

import React, { useState } from "react";
import Select from "@/components/ui/Select";
import FileUploader from "@/components/zona/FileUploader";
import { useRouter } from "next/navigation";

interface SubirMaterialFormProps {
  students: { value: string; label: string }[];
}

export default function SubirMaterialForm({ students }: SubirMaterialFormProps) {
  const router = useRouter();
  const [studentId, setStudentId] = useState("");

  return (
    <div className="space-y-4">
      <Select
        label="Alumno"
        options={students}
        placeholder="Selecciona un alumno"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      {studentId ? (
        <FileUploader
          studentId={studentId}
          onUploadComplete={() => {
            router.refresh();
          }}
        />
      ) : (
        <p className="py-8 text-center text-sm text-gray-400">
          Selecciona un alumno para subir materiales.
        </p>
      )}
    </div>
  );
}
