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

// Validate cursor format (ISO date string)
function isValidCursor(cursor: string | null): cursor is string {
  if (!cursor) return false
  // Basic ISO date validation
  const date = new Date(cursor)
  return !isNaN(date.getTime())
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseLimit(searchParams.get('limit'))
    const cursorParam = searchParams.get('cursor')
    const cursor = isValidCursor(cursorParam) ? cursorParam : undefined

    const stickers = await getRecentStickers(limit, cursor)

    // Cursor para la siguiente página
    const nextCursor = stickers.length === limit
      ? stickers[stickers.length - 1]?.created_at
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
