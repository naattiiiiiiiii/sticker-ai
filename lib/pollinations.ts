// Wrapper para la API de Pollinations.ai (nueva API unificada gen.pollinations.ai)
// Requiere API key (POLLINATIONS_API_KEY)

const POLLINATIONS_BASE_URL = 'https://gen.pollinations.ai/image'

interface GenerateOptions {
  width?: number
  height?: number
  seed?: number
  model?: string
}

function getApiKey(): string {
  const key = process.env.POLLINATIONS_API_KEY
  if (!key) {
    throw new Error('POLLINATIONS_API_KEY no está configurada. Añádela en .env.local o en las variables de entorno de Vercel.')
  }
  return key
}

export async function generateImage(
  prompt: string,
  options: GenerateOptions = {}
): Promise<Buffer> {
  const {
    width = 512,
    height = 512,
    seed = -1, // -1 = random del lado del servidor
    model = 'zimage',
  } = options

  const apiKey = getApiKey()

  // Construir URL con parámetros
  const encodedPrompt = encodeURIComponent(prompt)
  const params = new URLSearchParams({
    width: width.toString(),
    height: height.toString(),
    seed: seed.toString(),
    model,
  })

  const url = `${POLLINATIONS_BASE_URL}/${encodedPrompt}?${params}`

  // Hacer la petición con timeout de 90 segundos
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 90000)

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'image/*',
        'Authorization': `Bearer ${apiKey}`,
      },
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (response.status === 401) {
      throw new Error('API key de Pollinations inválida. Verifica POLLINATIONS_API_KEY.')
    }

    if (response.status === 402) {
      throw new Error('Sin créditos en Pollinations. Recarga créditos en https://pollinations.ai')
    }

    if (!response.ok) {
      throw new Error(`Pollinations API error: ${response.status} ${response.statusText}`)
    }

    // Convertir a Buffer
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Validar que sea una imagen real (>1KB)
    if (buffer.length < 1024) {
      throw new Error('Pollinations devolvió una respuesta vacía o inválida. Intenta de nuevo.')
    }

    return buffer
  } catch (error) {
    clearTimeout(timeout)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Timeout: La generación de imagen tardó demasiado. Intenta de nuevo.')
    }
    throw error
  }
}
