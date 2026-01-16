import { put, del } from '@vercel/blob'

// Subir imagen al blob storage
export async function uploadImage(buffer: Buffer, filename: string): Promise<string> {
  const blob = await put(filename, buffer, {
    access: 'public',
    contentType: 'image/webp',
  })

  return blob.url
}

// Eliminar imagen del blob storage
export async function deleteImage(url: string): Promise<void> {
  try {
    await del(url)
  } catch (error) {
    console.error('Error deleting image:', error)
  }
}

// Generar nombre de archivo único
export function generateFilename(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 8)
  return `stickers/sticker_${timestamp}_${random}.webp`
}
