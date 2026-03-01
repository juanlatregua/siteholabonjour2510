// Bank details (HBTJ Consultores Lingüísticos S.L.)
export const BANK = {
  holder: "HBTJ Consultores Lingüísticos S.L.",
  iban: "ES66 0182 3370 67 0201616991",
  bic: "BBVAESMM",
} as const;

// Pack pricing
export const PRICING = {
  "A1-B2": { hours: 4, price: 140 },
  "C1-C2": { hours: 4, price: 200 },
} as const;

// Teacher emails with fixed access
export const TEACHER_EMAILS = [
  "juansilva@traduccionesjuradas.net",
  "isabelleguitton@holabonjour.es",
] as const;

// Contact
export const CONTACT = {
  phone: "685 070 304",
  whatsapp: "https://wa.me/34685070304",
  email: "hola@holabonjour.es",
} as const;
