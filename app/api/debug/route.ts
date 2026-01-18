import { NextResponse } from 'next/server'
import { getStickerCount, getRecentStickers } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const hasDbUrl = !!process.env.DATABASE_URL
  const hasPostgresUrl = !!process.env.POSTGRES_URL
  const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN

  let stickerCount = 0
  let dbError: string | null = null
  let recentStickers: { id: string; prompt: string }[] = []

  try {
    stickerCount = await getStickerCount()
    const stickers = await getRecentStickers(3)
    recentStickers = stickers.map(s => ({ id: s.id, prompt: s.prompt.substring(0, 50) }))
  } catch (error) {
    dbError = error instanceof Error ? error.message : String(error)
  }

  return NextResponse.json({
    env: {
      hasDbUrl,
      hasPostgresUrl,
      hasBlobToken,
      dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 30) + '...',
    },
    database: {
      stickerCount,
      error: dbError,
      recentStickers,
    },
  })
}
