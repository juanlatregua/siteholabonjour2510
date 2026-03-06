// ═══════════════════════════════════════════════════════
// PLANTILLA PARA NUEVO EXAMEN DELF/DALF
// Copiar este archivo y renombrar: {NIVEL}-exemple{N}.ts
// Reemplazar todos los TODO con el contenido real del PDF
// ═══════════════════════════════════════════════════════

import { Examen } from '../types'

export const examen_XX_exempleN: Examen = {
  id: 'XX-exempleN',           // ej: 'A2-exemple1'
  nivel: 'B1',                 // TODO: cambiar nivel
  diploma: 'DELF',             // TODO: DELF o DALF
  modalidad: 'demo',
  ejemplo: 1,                  // TODO: 1 o 2
  titulo: 'DELF XX — Exemple N',
  puntuacionMinPorSeccion: 5,
  puntuacionMinTotal: 50,

  secciones: [
    // ─── COMPRÉHENSION DE L'ORAL ───────────────────────
    {
      id: 'XX-eN-CO',
      numero: 1,
      codigo: 'CO',
      titulo: "Compréhension de l'oral",
      duracionMinutos: 25,     // TODO: según nivel
      puntuacionTotal: 25,
      instruccionesGenerales: 'Vous allez entendre plusieurs documents. ...',
      notasEspeciales: [],
      ejercicios: [
        {
          id: 'XX-eN-CO-ex1',
          numero: 1,
          titulo: 'Exercice 1',
          instrucciones: 'TODO',
          audio: '/examenes/audio/XX/exempleN-exercice1.mp3',
          numEscuchas: 2,
          tiempoLecturaPrevia: 30,
          pausaEntreEscuchas: 60,
          tiempoRespuestaFinal: 30,
          puntuacionTotal: 6,
          preguntas: [
            {
              id: 'XX-eN-CO-ex1-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado: 'TODO: pregunta',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'TODO' },
                { letra: 'B', texto: 'TODO' },
                { letra: 'C', texto: 'TODO' },
              ],
              respuestaCorrecta: 'B',
            },
            // TODO: añadir más preguntas
          ],
        },
        // TODO: añadir ejercicios 2 y 3
      ],
    },

    // ─── COMPRÉHENSION DES ÉCRITS ──────────────────────
    {
      id: 'XX-eN-CE',
      numero: 2,
      codigo: 'CE',
      titulo: 'Compréhension des écrits',
      duracionMinutos: 30,     // TODO: según nivel
      puntuacionTotal: 25,
      instruccionesGenerales: 'Répondez aux questions en cochant la bonne réponse...',
      ejercicios: [
        {
          id: 'XX-eN-CE-ex1',
          numero: 1,
          titulo: 'Exercice 1',
          instrucciones: 'TODO',
          texto: 'TODO: texto del documento',
          puntuacionTotal: 6,
          preguntas: [
            {
              id: 'XX-eN-CE-ex1-p1',
              numero: 1,
              tipo: 'qcm',
              enunciado: 'TODO',
              puntos: 1,
              opciones: [
                { letra: 'A', texto: 'TODO' },
                { letra: 'B', texto: 'TODO' },
                { letra: 'C', texto: 'TODO' },
              ],
              respuestaCorrecta: 'A',
            },
          ],
        },
      ],
    },

    // ─── PRODUCTION ÉCRITE ─────────────────────────────
    {
      id: 'XX-eN-PE',
      numero: 3,
      codigo: 'PE',
      titulo: 'Production écrite',
      duracionMinutos: 45,     // TODO: según nivel
      puntuacionTotal: 25,
      instruccionesGenerales: 'Vous allez écrire un texte.',
      ejercicios: [
        {
          id: 'XX-eN-PE-ex1',
          numero: 1,
          titulo: 'Exercice 1',
          instrucciones: 'TODO: consigna completa',
          puntuacionTotal: 13,
          preguntas: [
            {
              id: 'XX-eN-PE-ex1-p1',
              numero: 1,
              tipo: 'production',
              enunciado: 'TODO: tarea de escritura',
              puntos: 13,
              minPalabras: 60,   // TODO: según nivel
              criteriosEvaluacion: [
                { label: 'Réalisation de la tâche', valores: [0, 1, 2, 3, 4] },
                { label: 'Cohérence et cohésion', valores: [0, 1, 2, 3] },
                { label: 'Compétence lexicale', valores: [0, 1, 2, 3] },
                { label: 'Compétence grammaticale', valores: [0, 1, 2, 3] },
              ],
            },
          ],
        },
      ],
    },

    // ─── PRODUCTION ORALE ──────────────────────────────
    {
      id: 'XX-eN-PO',
      numero: 4,
      codigo: 'PO',
      titulo: 'Production orale',
      duracionMinutos: 10,     // TODO: según nivel
      puntuacionTotal: 25,
      instruccionesGenerales: "L'épreuve se déroule en présentiel avec un examinateur.",
      ejercicios: [
        {
          id: 'XX-eN-PO-ex1',
          numero: 1,
          titulo: 'Partie 1 — Entretien dirigé',
          instrucciones: 'Sans préparation. Parlez de vous, de votre famille, de vos activités...',
          puntuacionTotal: 8,
          preguntas: [],        // Evaluación en vivo, sin preguntas digitales
        },
        {
          id: 'XX-eN-PO-ex2',
          numero: 2,
          titulo: 'Partie 2 — Monologue suivi',
          instrucciones: 'TODO: instrucciones y sujetos',
          puntuacionTotal: 8,
          preguntas: [
            {
              id: 'XX-eN-PO-ex2-p1',
              numero: 1,
              tipo: 'production',
              enunciado: 'TODO: Sujet 1',
              puntos: 8,
            },
          ],
        },
        {
          id: 'XX-eN-PO-ex3',
          numero: 3,
          titulo: 'Partie 3 — Exercice en interaction',
          instrucciones: 'TODO: instrucciones',
          puntuacionTotal: 9,
          preguntas: [
            {
              id: 'XX-eN-PO-ex3-p1',
              numero: 1,
              tipo: 'production',
              enunciado: 'TODO: Sujet 1',
              puntos: 9,
            },
          ],
        },
      ],
    },
  ],
}
