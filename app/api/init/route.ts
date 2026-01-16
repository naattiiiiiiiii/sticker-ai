import { NextRequest, NextResponse } from 'next/server'
import { initDatabase } from '@/lib/db'

export const dynamic = 'force-dynamic'

// Esta ruta inicializa la base de datos (crear tablas)
// Solo ejecutar una vez después del deploy
export async function GET(request: NextRequest) {
  try {
    // Verificar autorización (solo admin puede inicializar)
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await initDatabase()

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
    })
  } catch (error) {
    console.error('Error initializing database:', error)

    return NextResponse.json(
      { error: 'Error initializing database', details: String(error) },
      { status: 500 }
    )
  }
}
