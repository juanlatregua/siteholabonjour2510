import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const FEI_ORIGIN = "https://www.france-education-international.fr";

const LEVEL_SOURCES = [
  {
    level: "A1",
    exam: "DELF",
    sourcePath: "/diplome/delf-tout-public/niveau-a1/exemples-sujets?langue=fr",
  },
  {
    level: "A2",
    exam: "DELF",
    sourcePath: "/diplome/delf-tout-public/niveau-a2/exemples-sujets?langue=fr",
  },
  {
    level: "B1",
    exam: "DELF",
    sourcePath: "/diplome/delf-tout-public/niveau-b1/exemples-sujets?langue=fr",
  },
  {
    level: "B2",
    exam: "DELF",
    sourcePath: "/diplome/delf-tout-public/niveau-b2/exemples-sujets?langue=fr",
  },
  {
    level: "C1",
    exam: "DALF",
    sourcePath: "/diplome/dalf/exemples-sujets?langue=fr",
  },
  {
    level: "C2",
    exam: "DALF",
    sourcePath: "/diplome/dalf/dalf-c2-exemples-de-sujets?langue=fr",
  },
];

const ENTITY_MAP = {
  amp: "&",
  quot: '"',
  apos: "'",
  nbsp: " ",
  laquo: "«",
  raquo: "»",
  rsquo: "’",
  lsquo: "‘",
  ndash: "–",
  mdash: "—",
  eacute: "é",
  agrave: "à",
  ecirc: "ê",
  ucirc: "û",
};

const decodeEntities = (value) => {
  return value
    .replace(/&([a-z]+);/gi, (match, key) => ENTITY_MAP[key.toLowerCase()] ?? match)
    .replace(/&#(\d+);/g, (_match, dec) => String.fromCodePoint(Number.parseInt(dec, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_match, hex) => String.fromCodePoint(Number.parseInt(hex, 16)));
};

const stripTags = (value) => {
  return decodeEntities(value.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
};

const normalizeHref = (href) => {
  if (!href) return null;

  const cleanedHref = decodeEntities(href).trim();

  if (
    cleanedHref.startsWith("#") ||
    cleanedHref.startsWith("mailto:") ||
    cleanedHref.startsWith("javascript:")
  ) {
    return null;
  }

  let url;
  try {
    url = new URL(cleanedHref, FEI_ORIGIN);
  } catch {
    return null;
  }

  if (!url.hostname.endsWith("france-education-international.fr")) {
    return null;
  }

  const isFeiResourcePath =
    url.pathname.startsWith("/document/") || url.pathname.startsWith("/audio/");

  if (!isFeiResourcePath) {
    return null;
  }

  url.search = "";
  url.hash = "";

  return url.toString();
};

const inferType = (pathname) => {
  if (pathname.startsWith("/audio/")) return "audio";
  return "document";
};

const inferRole = (slug) => {
  if (slug.includes("candidat")) return "candidato";
  if (slug.includes("correcteur")) return "corrector";
  if (slug.includes("surveillant")) return "vigilancia";
  if (slug.includes("examinateur")) return "examinador";
  if (slug.includes("grille")) return "rubrica";
  if (slug.includes("descript-perf")) return "descriptor";
  if (slug.includes("manuel")) return "manual";
  return "recurso";
};

const cleanSlugLabel = (slug) => slug.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();

const normalizeLabel = (rawLabel, slug, type) => {
  const cleaned = rawLabel
    .replace(/\s+/g, " ")
    .replace(/^[-•:\s]+|[-•:\s]+$/g, "")
    .trim();

  const weakLabel =
    cleaned.length < 3 ||
    /^(mp3|pdf|audio|document)$/i.test(cleaned) ||
    cleaned.endsWith("(") ||
    cleaned.endsWith(":");

  if (!weakLabel && cleaned.length < 220) {
    return cleaned;
  }

  const fromSlug = cleanSlugLabel(slug);
  if (fromSlug) {
    return `${type === "audio" ? "Audio" : "Documento"}: ${fromSlug}`;
  }

  return type === "audio" ? "Audio oficial" : "Documento oficial";
};

const extractFilenameFromDisposition = (disposition) => {
  if (!disposition) return undefined;

  const utf8Match = disposition.match(/filename\*=(?:UTF-8''|utf-8'')([^;]+)/i);
  if (utf8Match?.[1]) {
    try {
      return decodeURIComponent(utf8Match[1].replace(/['"]/g, "").trim());
    } catch {
      return utf8Match[1].replace(/['"]/g, "").trim();
    }
  }

  const basicMatch = disposition.match(/filename=([^;]+)/i);
  if (basicMatch?.[1]) {
    return basicMatch[1].replace(/['"]/g, "").trim();
  }

  return undefined;
};

const normalizeFilenameLabel = (filename, type) => {
  const withoutExt = filename.replace(/\.[a-z0-9]+$/i, "");
  const normalized = cleanSlugLabel(withoutExt);
  if (!normalized) return undefined;
  return `${type === "audio" ? "Audio" : "Documento"}: ${normalized}`;
};

const hasWeakLabel = (label) => {
  return /^(mp3|pdf|audio|documento|document)$/i.test(label) || label.endsWith("(");
};

const fetchHeadMeta = async (url) => {
  try {
    const response = await fetch(url, {
      method: "HEAD",
      headers: {
        "user-agent": "holabonjour-fei-sync/1.0 (+https://www.holabonjour.es)",
      },
    });

    if (!response.ok) {
      return {};
    }

    const contentType = response.headers.get("content-type") ?? undefined;
    const contentDisposition = response.headers.get("content-disposition") ?? undefined;
    const fileName = extractFilenameFromDisposition(contentDisposition);

    return { contentType, fileName };
  } catch {
    return {};
  }
};

const fetchHtml = async (url) => {
  const response = await fetch(url, {
    headers: {
      "user-agent": "holabonjour-fei-sync/1.0 (+https://www.holabonjour.es)",
      accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`No se pudo leer ${url} (HTTP ${response.status})`);
  }

  return response.text();
};

const extractAnchors = (html) => {
  const anchors = [];
  const regex = /<a\b[^>]*href=("|')([^"']+)\1[^>]*>([\s\S]*?)<\/a>/gi;

  let match;
  while ((match = regex.exec(html)) !== null) {
    anchors.push({ href: match[2], label: stripTags(match[3]) });
  }

  return anchors;
};

const sortResources = (a, b) => {
  if (a.type !== b.type) return a.type.localeCompare(b.type);
  return a.slug.localeCompare(b.slug);
};

const buildLevelResources = async ({ level, exam, sourcePath }) => {
  const sourcePage = new URL(sourcePath, FEI_ORIGIN).toString();
  const html = await fetchHtml(sourcePage);
  const anchors = extractAnchors(html);
  const uniqueResources = new Map();

  for (const anchor of anchors) {
    const resourceUrl = normalizeHref(anchor.href);
    if (!resourceUrl) continue;

    const parsed = new URL(resourceUrl);
    const slug = parsed.pathname.split("/").filter(Boolean).pop() ?? "";
    const type = inferType(parsed.pathname);
    const role = inferRole(slug);

    const existing = uniqueResources.get(resourceUrl);
    const normalizedLabel = normalizeLabel(anchor.label, slug, type);

    if (!existing) {
      uniqueResources.set(resourceUrl, {
        label: normalizedLabel,
        type,
        role,
        url: resourceUrl,
        slug,
      });
      continue;
    }

    if (hasWeakLabel(existing.label) && !hasWeakLabel(normalizedLabel)) {
      existing.label = normalizedLabel;
    }
  }

  const resources = Array.from(uniqueResources.values()).sort(sortResources);

  for (const resource of resources) {
    const meta = await fetchHeadMeta(resource.url);
    resource.contentType = meta.contentType;
    resource.fileName = meta.fileName;

    if (hasWeakLabel(resource.label) && meta.fileName) {
      const labelFromFilename = normalizeFilenameLabel(meta.fileName, resource.type);
      if (labelFromFilename) {
        resource.label = labelFromFilename;
      }
    }
  }

  const counts = {
    total: resources.length,
    documents: resources.filter((item) => item.type === "document").length,
    audios: resources.filter((item) => item.type === "audio").length,
  };

  return {
    level,
    exam,
    sourcePage,
    counts,
    resources,
  };
};

const main = async () => {
  const levels = [];

  for (const source of LEVEL_SOURCES) {
    const levelResources = await buildLevelResources(source);
    levels.push(levelResources);
    console.log(
      `[sync-fei] ${source.level}: ${levelResources.counts.total} recursos (${levelResources.counts.documents} docs / ${levelResources.counts.audios} audios)`,
    );
  }

  const output = {
    generatedAt: new Date().toISOString(),
    source: "France Education international",
    sourceOrigin: FEI_ORIGIN,
    legalNotice:
      "Los enlaces apuntan a recursos oficiales FEI. No reproducir ni redistribuir sujetos oficiales fuera de las condiciones de uso de FEI.",
    levels,
  };

  const currentDir = path.dirname(fileURLToPath(import.meta.url));
  const outputPath = path.join(currentDir, "..", "src", "data", "fei-exam-resources.json");

  await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
  console.log(`[sync-fei] Catálogo actualizado en ${outputPath}`);
};

main().catch((error) => {
  console.error("[sync-fei] Error:", error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
