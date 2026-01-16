import { sql } from '@vercel/postgres'

// Tipos
export interface Sticker {
  id: string
  prompt: string
  image_url: string
  downloads: number
  created_at: string
  expires_at: string
}

// Crear tabla si no existe (ejecutar una vez en setup)
export async function initDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS stickers (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      prompt TEXT NOT NULL,
      image_url TEXT NOT NULL,
      downloads INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
    )
  `

  // Crear índices
  await sql`
    CREATE INDEX IF NOT EXISTS idx_stickers_created_at ON stickers(created_at DESC)
  `
  await sql`
    CREATE INDEX IF NOT EXISTS idx_stickers_expires_at ON stickers(expires_at)
  `
}

// Obtener stickers recientes con paginación cursor-based
export async function getRecentStickers(limit = 20, cursor?: string): Promise<Sticker[]> {
  if (cursor) {
    const { rows } = await sql`
      SELECT * FROM stickers
      WHERE created_at < ${cursor}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `
    return rows as Sticker[]
  }

  const { rows } = await sql`
    SELECT * FROM stickers
    ORDER BY created_at DESC
    LIMIT ${limit}
  `
  return rows as Sticker[]
}

// Obtener sticker por ID
export async function getStickerById(id: string): Promise<Sticker | null> {
  const { rows } = await sql`
    SELECT * FROM stickers WHERE id = ${id}
  `
  return rows[0] as Sticker | null
}

// Crear nuevo sticker
export async function createSticker(prompt: string, imageUrl: string): Promise<Sticker> {
  const { rows } = await sql`
    INSERT INTO stickers (prompt, image_url)
    VALUES (${prompt}, ${imageUrl})
    RETURNING *
  `
  return rows[0] as Sticker
}

// Incrementar descargas
export async function incrementDownloads(id: string): Promise<void> {
  await sql`
    UPDATE stickers SET downloads = downloads + 1 WHERE id = ${id}
  `
}

// Eliminar stickers expirados
export async function deleteExpiredStickers(): Promise<{ deleted: number }> {
  const { rowCount } = await sql`
    DELETE FROM stickers WHERE expires_at < NOW()
  `
  return { deleted: rowCount || 0 }
}
