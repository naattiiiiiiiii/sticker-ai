import { NextRequest, NextResponse } from 'next/server'
import { isPromptSafe, sanitizePrompt } from '@/lib/content-filter'
import { generateImage } from '@/lib/pollinations'
import { convertToWebPSticker } from '@/lib/image-utils'
import { createSticker } from '@/lib/db'
import { uploadImage, generateFilename } from '@/lib/storage'

// Rate limiting simple (en producción usar Vercel KV)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const windowMs = 10 * 60 * 1000 // 10 minutos
  const maxRequests = 5

  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: maxRequests - entry.count }
}

export async function POST(request: NextRequest) {
  try {
    // Obtener IP para rate limiting
    const ip = request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown'

    // Verificar rate limit
    const rateLimit = checkRateLimit(ip)
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: 'Has alcanzado el límite de generaciones. Espera 10 minutos.' },
        {
          status: 429,
          headers: {
            'X-RateLimit-Remaining': '0',
            'Retry-After': '600',
          },
        }
      )
    }

    // Obtener prompt del body
    const body = await request.json()
    const { prompt } = body

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'El prompt es requerido' },
        { status: 400 }
      )
    }

    // Verificar contenido seguro
    const safetyCheck = isPromptSafe(prompt)
    if (!safetyCheck.safe) {
      return NextResponse.json(
        { error: safetyCheck.reason },
        { status: 400 }
      )
    }

    // Sanitizar y preparar prompt para la IA
    const sanitizedPrompt = sanitizePrompt(prompt)

    // Generar imagen con Pollinations
    const imageBuffer = await generateImage(sanitizedPrompt, {
      width: 512,
      height: 512,
    })

    // Convertir a WebP optimizado para WhatsApp
    const webpBuffer = await convertToWebPSticker(imageBuffer)

    // Generar nombre de archivo único
    const filename = generateFilename()

    // Subir a Vercel Blob
    const imageUrl = await uploadImage(webpBuffer, filename)

    // Guardar en base de datos
    const sticker = await createSticker(prompt, imageUrl)

    return NextResponse.json(
      {
        success: true,
        sticker: {
          id: sticker.id,
          prompt: sticker.prompt,
          image_url: sticker.image_url,
          created_at: sticker.created_at,
        },
      },
      {
        headers: {
          'X-RateLimit-Remaining': rateLimit.remaining.toString(),
        },
      }
    )
  } catch (error) {
    console.error('Error generating sticker:', error)

    // More specific error messages
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
      return NextResponse.json(
        { error: 'Error de conexión con el servicio de IA. Intenta de nuevo.' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Error al generar el sticker. Por favor, intenta de nuevo.' },
      { status: 500 }
    )
  }
}
