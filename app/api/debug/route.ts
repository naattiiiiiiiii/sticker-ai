import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const hasDbUrl = !!process.env.DATABASE_URL
  const hasPostgresUrl = !!process.env.POSTGRES_URL
  const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN

  return NextResponse.json({
    hasDbUrl,
    hasPostgresUrl,
    hasBlobToken,
    dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 30) + '...',
  })
}
