import { mkdir, writeFile, unlink } from 'fs/promises'
import path from 'path'

// Check if we have Vercel Blob configured
const isProduction = process.env.BLOB_READ_WRITE_TOKEN !== undefined

// Local storage directory for development
const LOCAL_STORAGE_DIR = path.join(process.cwd(), 'public', 'uploads')

// Ensure local storage directory exists
async function ensureLocalDir() {
  try {
    await mkdir(LOCAL_STORAGE_DIR, { recursive: true })
  } catch (error) {
    // Directory might already exist
  }
}

// Subir imagen al blob storage
export async function uploadImage(buffer: Buffer, filename: string): Promise<string> {
  if (!isProduction) {
    // Development: save locally
    await ensureLocalDir()

    const localFilename = filename.replace('stickers/', '')
    const localPath = path.join(LOCAL_STORAGE_DIR, localFilename)

    await writeFile(localPath, buffer)

    // Return local URL
    return `/uploads/${localFilename}`
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
  if (!isProduction) {
    // Development: delete local file
    try {
      const filename = url.replace('/uploads/', '')
      const localPath = path.join(LOCAL_STORAGE_DIR, filename)
      await unlink(localPath)
    } catch (error) {
      console.error('Error deleting local image:', error)
    }
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
