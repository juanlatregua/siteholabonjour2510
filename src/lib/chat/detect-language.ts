const FRENCH_INDICATORS = [
  /\b(bonjour|merci|salut|bonsoir|oui|non|je\s|tu\s|il\s|elle\s|nous|vous|ils|elles|c'est|qu[ei]|avec|pour|dans|une?\s|des?\s|les?\s|cette?|comment|combien|pourquoi|parce\s+que|est-ce|n'est|l'|d'|j'|s'|qu')\b/i,
  /[àâäéèêëïîôùûüÿçœæ]/,
];

const ENGLISH_INDICATORS = [
  /\b(hello|hi|good\s|please|thank|the\s|this|that|what|where|when|how|why|would|could|should|have|has|been|will|can|about|with)\b/i,
];

const ARABIC_SCRIPT = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/;

export function detectLanguage(text: string): "es" | "fr" | "en" | "ar" {
  if (ARABIC_SCRIPT.test(text)) return "ar";

  const frenchScore = FRENCH_INDICATORS.reduce(
    (score, pattern) => score + (pattern.test(text) ? 1 : 0),
    0
  );

  const englishScore = ENGLISH_INDICATORS.reduce(
    (score, pattern) => score + (pattern.test(text) ? 1 : 0),
    0
  );

  if (frenchScore > englishScore && frenchScore > 0) return "fr";
  if (englishScore > frenchScore && englishScore > 0) return "en";

  return "es"; // Default to Spanish
}
