import { NextRequest, NextResponse } from 'next/server'
import { getStickerById, incrementDownloads } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json(
        { error: 'ID del sticker requerido' },
        { status: 400 }
      )
    }

    // Obtener sticker de la base de datos
    const sticker = await getStickerById(id)

    if (!sticker) {
      return NextResponse.json(
        { error: 'Sticker no encontrado' },
        { status: 404 }
      )
    }

    // Incrementar contador de descargas
    await incrementDownloads(id)

    // Descargar la imagen desde Supabase Storage
    const imageResponse = await fetch(sticker.image_url)

    if (!imageResponse.ok) {
      throw new Error('Error fetching image from storage')
    }

    const imageBuffer = await imageResponse.arrayBuffer()

    // Devolver la imagen como descarga
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/webp',
        'Content-Disposition': `attachment; filename="sticker_${id}.webp"`,
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    console.error('Error downloading sticker:', error)

    return NextResponse.json(
      { error: 'Error al descargar el sticker' },
      { status: 500 }
    )
  }
}
