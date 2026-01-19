import { NextRequest, NextResponse } from 'next/server'
import { deleteExpiredStickers } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Verificar autorización del cron job
    const authHeader = request.headers.get('authorization')
    const auth = verifyAuth(authHeader, 'CRON_SECRET', 'CRON_SECRET')

    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: auth.status }
      )
    }

    // Ejecutar limpieza
    const result = await deleteExpiredStickers()

    console.log(`Cleanup completed: ${result.deleted} stickers deleted`)

    return NextResponse.json({
      success: true,
      deleted: result.deleted,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error in cleanup cron:', error)

    return NextResponse.json(
      { error: 'Error during cleanup' },
      { status: 500 }
    )
  }
}
