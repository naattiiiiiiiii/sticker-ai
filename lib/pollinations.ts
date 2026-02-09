// Wrapper para la API de Pollinations.ai
// 100% gratuito, sin API key, sin límites

const POLLINATIONS_BASE_URL = 'https://image.pollinations.ai/prompt'

interface GenerateOptions {
  width?: number
  height?: number
  seed?: number
  nologo?: boolean
  model?: string
}

export async function generateImage(
  prompt: string,
  options: GenerateOptions = {}
): Promise<Buffer> {
  const {
    width = 512,
    height = 512,
    seed = Math.floor(Math.random() * 1000000),
    nologo = true,
    model = 'turbo', // Modelo por defecto (flux ya no disponible)
  } = options

  // Construir URL con parámetros
  const encodedPrompt = encodeURIComponent(prompt)
  const params = new URLSearchParams({
    width: width.toString(),
    height: height.toString(),
    seed: seed.toString(),
    nologo: nologo.toString(),
    model,
  })

  const url = `${POLLINATIONS_BASE_URL}/${encodedPrompt}?${params}`

  // Hacer la petición con timeout de 60 segundos
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 60000)

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'image/*',
      },
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!response.ok) {
      throw new Error(`Pollinations API error: ${response.status} ${response.statusText}`)
    }

    // Convertir a Buffer
    const arrayBuffer = await response.arrayBuffer()
    return Buffer.from(arrayBuffer)
  } catch (error) {
    clearTimeout(timeout)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Timeout: La generación de imagen tardó demasiado. Intenta de nuevo.')
    }
    throw error
  }
}

// Generar URL directa (para preview rápido sin guardar)
export function getPollinationsUrl(
  prompt: string,
  options: GenerateOptions = {}
): string {
  const {
    width = 512,
    height = 512,
    seed = Math.floor(Math.random() * 1000000),
    nologo = true,
    model = 'turbo',
  } = options

  const encodedPrompt = encodeURIComponent(prompt)
  const params = new URLSearchParams({
    width: width.toString(),
    height: height.toString(),
    seed: seed.toString(),
    nologo: nologo.toString(),
    model,
  })

  return `${POLLINATIONS_BASE_URL}/${encodedPrompt}?${params}`
}
