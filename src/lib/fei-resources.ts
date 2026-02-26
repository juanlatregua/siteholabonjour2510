import resourcesCatalog from "@/data/fei-exam-resources.json";
import type { CEFRLevel } from "@/lib/delf-dalf";

export type FeiResourceType = "document" | "audio";

export interface FeiResource {
  label: string;
  type: FeiResourceType;
  role: string;
  url: string;
  slug: string;
  contentType?: string;
  fileName?: string;
}

export interface FeiLevelResources {
  level: CEFRLevel;
  exam: "DELF" | "DALF";
  sourcePage: string;
  counts: {
    total: number;
    documents: number;
    audios: number;
  };
  resources: FeiResource[];
}

export interface FeiCatalog {
  generatedAt: string;
  source: string;
  sourceOrigin: string;
  legalNotice: string;
  levels: FeiLevelResources[];
}

export const feiCatalog = resourcesCatalog as FeiCatalog;

export const feiAllLevels = feiCatalog.levels;

export const getFeiLevelResources = (level: CEFRLevel): FeiLevelResources | undefined => {
  return feiAllLevels.find((entry) => entry.level === level);
};
