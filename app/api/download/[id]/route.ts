import { NextRequest, NextResponse } from 'next/server'
import { getStickerById, incrementDownloads } from '@/lib/db'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

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

    let imageBuffer: ArrayBuffer

    // Check the image URL type
    if (sticker.image_url.startsWith('data:')) {
      // Base64 data URL - decode it
      const base64Data = sticker.image_url.split(',')[1]
      const binaryString = atob(base64Data)
      const bytes = new Uint8Array(binaryString.length)
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }
      imageBuffer = bytes.buffer
    } else {
      // Remote URL - fetch from Vercel Blob
      const imageResponse = await fetch(sticker.image_url)

      if (!imageResponse.ok) {
        throw new Error('Error fetching image from storage')
      }

      imageBuffer = await imageResponse.arrayBuffer()
    }

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
