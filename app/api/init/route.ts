import { NextRequest, NextResponse } from 'next/server'
import { initDatabase } from '@/lib/db'
import { verifyAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

// Esta ruta inicializa la base de datos (crear tablas)
// Solo ejecutar una vez después del deploy
export async function GET(request: NextRequest) {
  try {
    // Verificar autorización (solo admin puede inicializar)
    const authHeader = request.headers.get('authorization')
    const auth = verifyAuth(authHeader, 'CRON_SECRET', 'CRON_SECRET')

    if (!auth.authorized) {
      return NextResponse.json(
        { error: auth.error },
        { status: auth.status }
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
      { error: 'Error initializing database' },
      { status: 500 }
    )
  }
}
