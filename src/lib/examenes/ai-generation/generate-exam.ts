/**
 * AI Exam Generation — Claude API integration
 *
 * Generates exam sections (CO, CE, PE, PO) that are indistinguishable from
 * real FEI DELF/DALF exams, respecting exact structure, question types,
 * scoring, and evaluation criteria.
 */

import Anthropic from '@anthropic-ai/sdk'
import { FEI_SPECS } from './fei-specs'
import type { CodigoSeccion } from '../types'

const client = new Anthropic()

export type GenerableNivel = 'B1' | 'B2' | 'C1' | 'C2'
export type GenerableSeccion = CodigoSeccion

export interface GeneratedSection {
  ejercicios: unknown[]
  instruccionesGenerales: string
}

// ─── System prompt ────────────────────────────────────────────────

function buildSystemPrompt(nivel: GenerableNivel, seccion: GenerableSeccion): string {
  const spec = FEI_SPECS[nivel]
  if (!spec) throw new Error(`No FEI spec for level ${nivel}`)

  const seccionSpec = spec.secciones.find((s) => s.codigo === seccion)
  if (!seccionSpec) throw new Error(`No spec for section ${seccion} at level ${nivel}`)

  const grilleSection = seccion === 'PE'
    ? `\n\n## Grille d'évaluation PE ${nivel}\n${spec.grillePE.map((g) => `- ${g.criterio} (max ${g.maxPuntos} pts)`).join('\n')}`
    : seccion === 'PO'
      ? `\n\n## Grille d'évaluation PO ${nivel}\n${spec.grillePO.map((g) => `- ${g.criterio} (max ${g.maxPuntos} pts)`).join('\n')}`
      : ''

  return `Tu es un expert de la conception d'épreuves officielles DELF/DALF pour France Éducation international (FEI).

# MISSION
Génère le contenu de la section ${seccion} d'un examen ${spec.diploma} ${nivel} qui soit INDISTINGUIBLE d'un vrai examen FEI.

# SPÉCIFICATIONS EXACTES — ${spec.diploma} ${nivel} — Section ${seccion}

## Structure de la section
${seccionSpec.estructura}

## Exercices requis
${seccionSpec.ejercicios.map((ej) => `
### ${ej.titulo}
- Description : ${ej.descripcion}
- Type de document : ${ej.tipoDocumento}
- Nombre de questions : ${ej.numPreguntas}
- Types de questions : ${ej.tipoPreguntasPermitidos.join(', ')}
- Points total : ${ej.puntuacionTotal}
- Détails : ${ej.detalles || 'N/A'}
${ej.numEscuchas ? `- Nombre d'écoutes : ${ej.numEscuchas}` : ''}
`).join('\n')}
${grilleSection}

${seccion === 'PE' ? `## Consigne PE
Type : ${spec.peConsigneType}
Minimum de mots : ${spec.peMinPalabras}` : ''}

${seccion === 'PO' ? `## Structure PO
${spec.poStructure}` : ''}

# RÈGLES CRITIQUES

1. **Authenticité** : Le contenu doit ressembler à un vrai examen FEI. Utilise un français courant et naturel. Les thèmes doivent être des sujets de société actuels (environnement, technologie, éducation, travail, culture, santé, transport, alimentation).

2. **Structure exacte** : Respecte EXACTEMENT le nombre d'exercices, le nombre de questions, les types de questions et les barèmes indiqués ci-dessus.

3. **Points** : La somme des points de TOUTES les questions d'un exercice doit être EXACTEMENT égale au total indiqué. Utilise des demi-points (0.5, 1, 1.5, 2, 2.5) pour atteindre le total exact.

4. **QCM** : Toujours exactement 3 choix (A, B, C). Les distracteurs doivent être plausibles. La réponse correcte doit être distribuée aléatoirement entre A, B et C.

5. **Vrai/faux** : Alterner entre true et false. Varier les formulations.

6. **Textes** : Pour CE, les textes doivent être réalistes, ~400-600 mots pour B1/B2, ~800-1000 mots pour C1/C2. Inclure un titre, une source fictive crédible, et des paragraphes bien structurés.

7. **PE** : Fournir une consigne situationnelle claire avec un rôle, un contexte et un destinataire. Inclure les critères d'évaluation exacts de la grille FEI.

8. **PO** : Fournir des sujets alternatifs variés et des instructions claires pour l'examinateur.

# FORMAT DE SORTIE

Retourne un JSON valide avec la structure suivante. NE retourne RIEN d'autre que le JSON.

${getOutputSchema(seccion, nivel)}`
}

function getOutputSchema(seccion: GenerableSeccion, nivel: GenerableNivel): string {
  const spec = FEI_SPECS[nivel]

  if (seccion === 'CO') {
    return `{
  "instruccionesGenerales": "string — instructions générales de la section CO",
  "ejercicios": [
    // UN objet par exercice (${spec.secciones[0].ejercicios.length} exercices)
    {
      "titulo": "Exercice 1",
      "instrucciones": "string — instructions pour le candidat",
      "numEscuchas": 2,
      "tiempoLecturaPrevia": 30,
      "pausaEntreEscuchas": 30,
      "tiempoRespuestaFinal": 30,
      "preguntas": [
        {
          "tipo": "qcm",
          "enunciado": "string — la question",
          "puntos": 1,
          "opciones": [
            {"letra": "A", "texto": "string"},
            {"letra": "B", "texto": "string"},
            {"letra": "C", "texto": "string"}
          ],
          "respuestaCorrecta": "B",
          "nota": "string (optionnel — contexte supplémentaire)"
        }
      ]
    }
  ]
}`
  }

  if (seccion === 'CE') {
    return `{
  "instruccionesGenerales": "string — instructions générales de la section CE",
  "ejercicios": [
    // UN objet par exercice (${spec.secciones[1].ejercicios.length} exercices)
    {
      "titulo": "Exercice 1",
      "instrucciones": "string — instructions + contexte situationnel",
      "texto": "string — LE TEXTE COMPLET du document à lire (400-600 mots pour B1/B2, 800-1000 mots pour C1/C2). IMPORTANT : ce texte doit être réaliste et complet.",
      "preguntas": [
        {
          "tipo": "qcm" | "vrai-faux",
          "enunciado": "string",
          "puntos": 1,
          "opciones": [{"letra": "A", "texto": "..."}, ...],  // seulement pour qcm
          "respuestaCorrecta": "A" | true | false
        }
      ]
    }
  ]
}`
  }

  if (seccion === 'PE') {
    const grille = spec.grillePE
    return `{
  "instruccionesGenerales": "string — instructions générales de la section PE",
  "ejercicios": [
    {
      "titulo": "string — titre de l'exercice",
      "instrucciones": "string — LA CONSIGNE COMPLÈTE (situationnelle, avec rôle, contexte, destinataire)",
      "preguntas": [
        {
          "tipo": "production",
          "enunciado": "string — reformulation courte de la tâche",
          "puntos": 25,
          "minPalabras": ${spec.peMinPalabras},
          "criteriosEvaluacion": [
${grille.map((g) => `            {"label": "${g.criterio}", "valores": [${Array.from({ length: g.maxPuntos * 2 + 1 }, (_, i) => i * 0.5).join(', ')}]}`).join(',\n')}
          ]
        }
      ]
    }
  ]
}`
  }

  // PO
  return `{
  "instruccionesGenerales": "string — instructions générales de la section PO",
  "ejercicios": [
    // Selon la structure PO du niveau (voir spécifications ci-dessus)
    {
      "titulo": "string — Partie N — Nom",
      "instrucciones": "string — instructions détaillées",
      "preguntas": [
        {
          "tipo": "oral",
          "enunciado": "string — instruction pour le candidat",
          "puntos": number,
          "sujetosAlternativos": ["string — sujet 1", "string — sujet 2", ...]
        }
      ]
    }
  ]
}`
}

// ─── Main generation function ─────────────────────────────────────

export async function generateExamSection(
  nivel: GenerableNivel,
  seccion: GenerableSeccion
): Promise<GeneratedSection> {
  const systemPrompt = buildSystemPrompt(nivel, seccion)

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 8192,
    temperature: 0.8,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: `Génère maintenant le contenu complet de la section ${seccion} pour un examen ${FEI_SPECS[nivel].diploma} ${nivel}. Le thème doit être original et actuel. Retourne uniquement le JSON.`,
      },
    ],
  })

  // Extract text content from response
  const textBlock = response.content.find((b) => b.type === 'text')
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('No text response from Claude')
  }

  // Parse JSON — handle potential markdown code blocks
  let jsonStr = textBlock.text.trim()
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }

  let parsed: GeneratedSection
  try {
    parsed = JSON.parse(jsonStr)
  } catch (e) {
    throw new Error(`Failed to parse AI response as JSON: ${(e as Error).message}\n\nRaw response:\n${jsonStr.substring(0, 500)}`)
  }

  // Validate basic structure
  if (!parsed.ejercicios || !Array.isArray(parsed.ejercicios)) {
    throw new Error('Invalid response: missing ejercicios array')
  }
  if (!parsed.instruccionesGenerales) {
    throw new Error('Invalid response: missing instruccionesGenerales')
  }

  // Assign IDs to all generated content
  const prefix = `gen-${Date.now()}`
  parsed.ejercicios = (parsed.ejercicios as Record<string, unknown>[]).map(
    (ej, ejIdx) => {
      const ejercicio: Record<string, unknown> = {
        ...ej,
        id: `${prefix}-${seccion}-ex${ejIdx + 1}`,
        numero: ejIdx + 1,
        puntuacionTotal: 0,
      }

      if (Array.isArray(ej.preguntas)) {
        ejercicio.preguntas = (ej.preguntas as Record<string, unknown>[]).map(
          (p, pIdx) => ({
            ...p,
            id: `${prefix}-${seccion}-ex${ejIdx + 1}-p${pIdx + 1}`,
            numero: pIdx + 1,
          })
        )
        ejercicio.puntuacionTotal = (ejercicio.preguntas as { puntos?: number }[]).reduce(
          (sum, p) => sum + (p.puntos || 0),
          0
        )
      }

      return ejercicio
    }
  )

  return parsed
}
