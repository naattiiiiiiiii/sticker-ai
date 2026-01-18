import { neon } from '@neondatabase/serverless'

// Tipos
export interface Sticker {
  id: string
  prompt: string
  image_url: string
  downloads: number
  created_at: string
  expires_at: string
}

// Get SQL client - check dynamically at runtime
function getSQL() {
  const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL
  if (!databaseUrl) {
    throw new Error('DATABASE_URL not configured')
  }
  return neon(databaseUrl)
}

// Check if database is configured - dynamic check
function hasDatabase(): boolean {
  return !!(process.env.DATABASE_URL || process.env.POSTGRES_URL)
}

// In-memory fallback when no database
let memoryStickers: Sticker[] = []

// Generate UUID
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Crear tabla si no existe
export async function initDatabase() {
  if (!hasDatabase()) {
    console.log('No database configured: using in-memory storage')
    return
  }

  const sql = getSQL()

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

  await sql`
    CREATE INDEX IF NOT EXISTS idx_stickers_created_at ON stickers(created_at DESC)
  `
}

// Obtener stickers recientes
export async function getRecentStickers(limit = 20, cursor?: string): Promise<Sticker[]> {
  if (!hasDatabase()) {
    let sorted = [...memoryStickers].sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    if (cursor) {
      const idx = sorted.findIndex(s => s.created_at === cursor)
      if (idx !== -1) sorted = sorted.slice(idx + 1)
    }
    return sorted.slice(0, limit)
  }

  const sql = getSQL()

  if (cursor) {
    const rows = await sql`
      SELECT * FROM stickers
      WHERE created_at < ${cursor}
      ORDER BY created_at DESC
      LIMIT ${limit}
    `
    return rows as Sticker[]
  }

  const rows = await sql`
    SELECT * FROM stickers
    ORDER BY created_at DESC
    LIMIT ${limit}
  `
  return rows as Sticker[]
}

// Obtener sticker por ID
export async function getStickerById(id: string): Promise<Sticker | null> {
  if (!hasDatabase()) {
    return memoryStickers.find(s => s.id === id) || null
  }

  const sql = getSQL()
  const rows = await sql`SELECT * FROM stickers WHERE id = ${id}`
  return rows[0] as Sticker | null
}

// Crear nuevo sticker
export async function createSticker(prompt: string, imageUrl: string): Promise<Sticker> {
  if (!hasDatabase()) {
    const now = new Date()
    const sticker: Sticker = {
      id: generateUUID(),
      prompt,
      image_url: imageUrl,
      downloads: 0,
      created_at: now.toISOString(),
      expires_at: new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    }
    memoryStickers.push(sticker)
    return sticker
  }

  const sql = getSQL()
  const rows = await sql`
    INSERT INTO stickers (prompt, image_url)
    VALUES (${prompt}, ${imageUrl})
    RETURNING *
  `
  return rows[0] as Sticker
}

// Incrementar descargas
export async function incrementDownloads(id: string): Promise<void> {
  if (!hasDatabase()) {
    const sticker = memoryStickers.find(s => s.id === id)
    if (sticker) sticker.downloads++
    return
  }

  const sql = getSQL()
  await sql`UPDATE stickers SET downloads = downloads + 1 WHERE id = ${id}`
}

// Minimum stickers to keep
const MIN_STICKERS = 40

// Eliminar stickers expirados
export async function deleteExpiredStickers(): Promise<{ deleted: number }> {
  if (!hasDatabase()) {
    const now = new Date()
    const sorted = [...memoryStickers].sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    const toKeep: Sticker[] = []
    sorted.forEach(sticker => {
      const isExpired = new Date(sticker.expires_at) < now
      if (!isExpired || toKeep.length < MIN_STICKERS) {
        toKeep.push(sticker)
      }
    })
    const deleted = memoryStickers.length - toKeep.length
    memoryStickers = toKeep
    return { deleted }
  }

  const sql = getSQL()

  const countResult = await sql`SELECT COUNT(*) as count FROM stickers`
  const totalCount = parseInt(countResult[0].count)

  if (totalCount <= MIN_STICKERS) {
    return { deleted: 0 }
  }

  const result = await sql`
    DELETE FROM stickers
    WHERE id IN (
      SELECT id FROM stickers
      WHERE expires_at < NOW()
      ORDER BY created_at ASC
      LIMIT ${totalCount - MIN_STICKERS}
    )
  `
  return { deleted: result.length || 0 }
}

// Get sticker count
export async function getStickerCount(): Promise<number> {
  if (!hasDatabase()) {
    return memoryStickers.length
  }

  const sql = getSQL()
  const rows = await sql`SELECT COUNT(*) as count FROM stickers`
  return parseInt(rows[0].count)
}
