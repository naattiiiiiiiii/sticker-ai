import { NextRequest, NextResponse } from 'next/server'
import { deleteExpiredStickers } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Verificar autorización del cron job
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    // En Vercel, los cron jobs incluyen este header automáticamente
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
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
