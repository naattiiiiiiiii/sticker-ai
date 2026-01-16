import sharp from 'sharp'

// Convertir imagen a WebP optimizado para WhatsApp stickers
// Requisitos: 512x512, < 100KB, fondo transparente
export async function convertToWebPSticker(
  inputBuffer: Buffer,
  options: {
    quality?: number
  } = {}
): Promise<Buffer> {
  const { quality = 85 } = options

  // Primero, obtener los datos raw de la imagen para hacer el fondo transparente
  const image = sharp(inputBuffer)
  const metadata = await image.metadata()

  // Procesar la imagen: convertir fondo blanco/casi-blanco a transparente
  let processedBuffer = await sharp(inputBuffer)
    .ensureAlpha() // Asegurar canal alpha
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { data, info } = processedBuffer

  // Reemplazar píxeles blancos/casi-blancos con transparentes
  // Threshold: si R, G, B > 240, hacerlo transparente
  const threshold = 240
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    // Si el pixel es muy claro (casi blanco), hacerlo transparente
    if (r > threshold && g > threshold && b > threshold) {
      data[i + 3] = 0 // Alpha = 0 (transparente)
    }
  }

  // Reconstruir imagen desde raw data
  let webpBuffer = await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4
    }
  })
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }, // Fondo transparente
    })
    .webp({
      quality,
      alphaQuality: 100,
      lossless: false,
    })
    .toBuffer()

  // Si el archivo es > 100KB, reducir calidad iterativamente
  let currentQuality = quality
  while (webpBuffer.length > 100 * 1024 && currentQuality > 30) {
    currentQuality -= 10
    webpBuffer = await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
      .resize(512, 512, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
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
