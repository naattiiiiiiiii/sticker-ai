import { NextRequest, NextResponse } from 'next/server'
import { isPromptSafe, sanitizePrompt } from '@/lib/content-filter'
import { generateImage } from '@/lib/pollinations'
import { convertToWebPSticker } from '@/lib/image-utils'
import { createSticker } from '@/lib/db'
import { uploadImage, generateFilename } from '@/lib/storage'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Rate limiting con limpieza automática
const WINDOW_MS = 10 * 60 * 1000 // 10 minutos
const MAX_REQUESTS = 5
const MAX_MAP_SIZE = 10000 // Límite para evitar memory leaks
const CLEANUP_INTERVAL = 5 * 60 * 1000 // Limpiar cada 5 minutos

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
let lastCleanup = Date.now()

function cleanupExpiredEntries() {
  const now = Date.now()
  // Solo limpiar si pasaron 5 minutos desde última limpieza
  if (now - lastCleanup < CLEANUP_INTERVAL) return

  lastCleanup = now
  const entries = Array.from(rateLimitMap.entries())
  for (const [ip, entry] of entries) {
    if (now > entry.resetTime) {
      rateLimitMap.delete(ip)
    }
  }
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()

  // Limpieza periódica
  cleanupExpiredEntries()

  // Protección contra memory leak: si el map es muy grande, limpiar todo
  if (rateLimitMap.size > MAX_MAP_SIZE) {
    rateLimitMap.clear()
  }

  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS })
    return { allowed: true, remaining: MAX_REQUESTS - 1 }
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  entry.count++
  return { allowed: true, remaining: MAX_REQUESTS - entry.count }
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
