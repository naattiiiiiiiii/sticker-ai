import sharp from 'sharp'

// Convertir imagen a WebP optimizado para WhatsApp stickers
// Requisitos: 512x512, < 100KB, fondo transparente opcional
export async function convertToWebPSticker(
  inputBuffer: Buffer,
  options: {
    removeBackground?: boolean
    quality?: number
  } = {}
): Promise<Buffer> {
  const { quality = 80 } = options

  let image = sharp(inputBuffer)

  // Redimensionar a 512x512 manteniendo aspecto y rellenando con transparente
  image = image
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .flatten({ background: { r: 255, g: 255, b: 255 } }) // Fondo blanco para stickers

  // Convertir a WebP con compresión
  let webpBuffer = await image
    .webp({
      quality,
      alphaQuality: 100,
      lossless: false,
    })
    .toBuffer()

  // Si el archivo es > 100KB, reducir calidad iterativamente
  let currentQuality = quality
  while (webpBuffer.length > 100 * 1024 && currentQuality > 20) {
    currentQuality -= 10
    webpBuffer = await sharp(inputBuffer)
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .flatten({ background: { r: 255, g: 255, b: 255 } })
      .webp({
        quality: currentQuality,
        alphaQuality: 100,
        lossless: false,
      })
      .toBuffer()
  }

  return webpBuffer
}

// Generar un nombre de archivo único
export function generateFilename(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `sticker_${timestamp}_${random}.webp`
}
