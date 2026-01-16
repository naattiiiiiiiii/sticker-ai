// Lista de palabras prohibidas para filtrar contenido inapropiado
const BLOCKED_WORDS = [
  // Contenido sexual
  'nsfw', 'nude', 'naked', 'porn', 'pornography', 'xxx', 'sex', 'sexual',
  'erotic', 'hentai', 'lewd', 'explicit', 'adult content', 'genitals',
  'desnudo', 'desnuda', 'porno', 'sexo', 'erotico',

  // Violencia
  'violence', 'violent', 'gore', 'gory', 'blood', 'bloody', 'murder',
  'kill', 'killing', 'death', 'dead body', 'corpse', 'torture',
  'violencia', 'violento', 'sangre', 'muerte', 'matar', 'tortura',

  // Drogas
  'drug', 'drugs', 'cocaine', 'heroin', 'meth', 'marijuana', 'weed',
  'cannabis', 'lsd', 'ecstasy', 'overdose',
  'droga', 'drogas', 'cocaina', 'heroina',

  // Armas
  'weapon', 'weapons', 'gun', 'guns', 'rifle', 'pistol', 'bomb',
  'explosive', 'grenade', 'missile', 'shoot', 'shooting',
  'arma', 'armas', 'pistola', 'bomba', 'explosivo',

  // Terrorismo/odio
  'terrorist', 'terrorism', 'isis', 'al qaeda', 'nazi', 'swastika',
  'hate', 'racist', 'racism', 'sexist', 'sexism', 'homophobic',
  'terrorista', 'terrorismo', 'odio', 'racista', 'racismo',

  // Abuso infantil
  'child abuse', 'pedophile', 'minor', 'underage',
  'abuso infantil', 'pedofilo', 'menor de edad',

  // Autolesión
  'suicide', 'self harm', 'cutting', 'suicidal',
  'suicidio', 'autolesion',
]

// Palabras que combinadas son problemáticas
const BLOCKED_COMBINATIONS = [
  ['child', 'sexy'],
  ['child', 'nude'],
  ['kid', 'sexy'],
  ['kid', 'nude'],
  ['minor', 'sexy'],
  ['niño', 'sexy'],
  ['niña', 'sexy'],
]

export function isPromptSafe(prompt: string): { safe: boolean; reason?: string } {
  const normalized = prompt.toLowerCase().trim()

  // Verificar palabras bloqueadas individuales
  for (const word of BLOCKED_WORDS) {
    if (normalized.includes(word)) {
      return {
        safe: false,
        reason: 'El prompt contiene contenido no permitido. Por favor, usa un prompt apropiado para todas las edades.',
      }
    }
  }

  // Verificar combinaciones problemáticas
  for (const combo of BLOCKED_COMBINATIONS) {
    if (combo.every(word => normalized.includes(word))) {
      return {
        safe: false,
        reason: 'El prompt contiene contenido no permitido. Por favor, usa un prompt apropiado para todas las edades.',
      }
    }
  }

  // Verificar longitud mínima y máxima
  if (normalized.length < 3) {
    return {
      safe: false,
      reason: 'El prompt es demasiado corto. Describe lo que quieres ver en el sticker.',
    }
  }

  if (normalized.length > 500) {
    return {
      safe: false,
      reason: 'El prompt es demasiado largo. Máximo 500 caracteres.',
    }
  }

  return { safe: true }
}

// Sanitizar el prompt para la IA (añadir contexto de sticker)
export function sanitizePrompt(prompt: string): string {
  const cleaned = prompt
    .trim()
    .replace(/\s+/g, ' ') // Múltiples espacios a uno
    .slice(0, 500) // Limitar longitud

  // Añadir contexto de sticker para mejores resultados
  return `cute sticker design, ${cleaned}, simple flat illustration, white background, cartoon style, emoji style, kawaii, vector art, no text`
}
