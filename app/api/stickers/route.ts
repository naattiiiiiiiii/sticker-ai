import { NextRequest, NextResponse } from 'next/server'
import { getRecentStickers, DatabaseError } from '@/lib/db'

export const dynamic = 'force-dynamic'

// Validate and parse limit parameter
function parseLimit(value: string | null): number {
  if (!value) return 20
  const parsed = parseInt(value, 10)
  if (isNaN(parsed) || parsed < 1) return 20
  return Math.min(parsed, 50)
}

// Validate cursor format (created_at|id)
function isValidCursor(cursor: string | null): cursor is string {
  if (!cursor) return false
  const parts = cursor.split('|')
  if (parts.length !== 2) return false
  // Validate date part
  const date = new Date(parts[0])
  if (isNaN(date.getTime())) return false
  // Validate UUID part (basic check)
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(parts[1])
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseLimit(searchParams.get('limit'))
    const cursorParam = searchParams.get('cursor')
    const cursor = isValidCursor(cursorParam) ? cursorParam : undefined

    const stickers = await getRecentStickers(limit, cursor)

    // Cursor compuesto para la siguiente página (created_at|id)
    const lastSticker = stickers[stickers.length - 1]
    const nextCursor = stickers.length === limit && lastSticker
      ? `${lastSticker.created_at}|${lastSticker.id}`
      : null

    return NextResponse.json(
      {
        stickers,
        nextCursor,
        hasMore: stickers.length === limit,
      },
      {
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
        },
      }
    )
  } catch (error) {
    console.error('[stickers] Error fetching stickers:', error)

    // Provide more specific error messages
    if (error instanceof DatabaseError) {
      return NextResponse.json(
        { error: 'Error de base de datos. Por favor, intenta de nuevo.', code: 'DB_ERROR' },
        { status: 503 }
      )
    }

    // Check for connection errors
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (errorMessage.includes('DATABASE_URL') || errorMessage.includes('connect')) {
      return NextResponse.json(
        { error: 'Servicio temporalmente no disponible.', code: 'SERVICE_UNAVAILABLE' },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { error: 'Error al obtener los stickers', code: 'UNKNOWN_ERROR' },
      { status: 500 }
    )
  }
}
