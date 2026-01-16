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

    return NextResponse.json(
      {
        stickers,
        nextCursor,
        hasMore: stickers.length === limit,
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
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
