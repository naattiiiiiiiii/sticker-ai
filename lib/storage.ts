// Check if we have Vercel Blob configured - dynamic check
function hasBlobStorage(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN
}

// Subir imagen al blob storage
export async function uploadImage(buffer: Buffer, filename: string): Promise<string> {
  if (!hasBlobStorage()) {
    // No blob storage: return as base64 data URL
    const base64 = buffer.toString('base64')
    return `data:image/webp;base64,${base64}`
  }

  // Production: use Vercel Blob
  const { put } = await import('@vercel/blob')

  const blob = await put(filename, buffer, {
    access: 'public',
    contentType: 'image/webp',
  })

  return blob.url
}

// Eliminar imagen del blob storage
export async function deleteImage(url: string): Promise<void> {
  if (!hasBlobStorage() || url.startsWith('data:')) {
    // No blob storage or data URL: nothing to delete
    return
  }

  // Production: use Vercel Blob
  try {
    const { del } = await import('@vercel/blob')
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
