import { NextRequest, NextResponse } from 'next/server'
import { getRecentStickers } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 50)
    const cursor = searchParams.get('cursor') || undefined

    const stickers = await getRecentStickers(limit, cursor)

    // Cursor para la siguiente página
    const nextCursor = stickers.length === limit
      ? stickers[stickers.length - 1]?.created_at
      : null

    console.log('[stickers] Returning', stickers.length, 'stickers')

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
    console.error('Error fetching stickers:', error)

    return NextResponse.json(
      { error: 'Error al obtener los stickers' },
      { status: 500 }
    )
  }
}
