// Tipos
export interface Sticker {
  id: string
  prompt: string
  image_url: string
  downloads: number
  created_at: string
  expires_at: string
}

// Check if we have Vercel Postgres configured
const hasPostgres = process.env.POSTGRES_URL !== undefined

// In-memory storage for serverless (stickers won't persist between cold starts)
// This is a fallback when no database is configured
let memoryStickers: Sticker[] = []

// Load stickers (from memory in serverless)
function loadStickers(): Sticker[] {
  return memoryStickers
}

// Save stickers (to memory in serverless)
function saveStickers(stickers: Sticker[]): void {
  memoryStickers = stickers
}

// Generate UUID
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Crear tabla si no existe (solo para producción con Postgres)
export async function initDatabase() {
  if (!hasPostgres) {
    console.log('No Postgres configured: using in-memory storage')
    return
  }

  const { sql } = await import('@vercel/postgres')

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
  await sql`
    CREATE INDEX IF NOT EXISTS idx_stickers_expires_at ON stickers(expires_at)
  `
}

// Obtener stickers recientes con paginación cursor-based
export async function getRecentStickers(limit = 20, cursor?: string): Promise<Sticker[]> {
  if (!hasPostgres) {
    const stickers = loadStickers()
    let sorted = [...stickers].sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

    if (cursor) {
      const cursorIndex = sorted.findIndex(s => s.created_at === cursor)
      if (cursorIndex !== -1) {
        sorted = sorted.slice(cursorIndex + 1)
      }
    }

    return sorted.slice(0, limit)
  }

  const { sql } = await import('@vercel/postgres')

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
  if (!hasPostgres) {
    const stickers = loadStickers()
    return stickers.find(s => s.id === id) || null
  }

  const { sql } = await import('@vercel/postgres')
  const { rows } = await sql`
    SELECT * FROM stickers WHERE id = ${id}
  `
  return rows[0] as Sticker | null
}

// Crear nuevo sticker
export async function createSticker(prompt: string, imageUrl: string): Promise<Sticker> {
  if (!hasPostgres) {
    const stickers = loadStickers()
    const now = new Date()
    const expires = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)

    const sticker: Sticker = {
      id: generateUUID(),
      prompt,
      image_url: imageUrl,
      downloads: 0,
      created_at: now.toISOString(),
      expires_at: expires.toISOString(),
    }

    stickers.push(sticker)
    saveStickers(stickers)
    return sticker
  }

  const { sql } = await import('@vercel/postgres')
  const { rows } = await sql`
    INSERT INTO stickers (prompt, image_url)
    VALUES (${prompt}, ${imageUrl})
    RETURNING *
  `
  return rows[0] as Sticker
}

// Incrementar descargas
export async function incrementDownloads(id: string): Promise<void> {
  if (!hasPostgres) {
    const stickers = loadStickers()
    const sticker = stickers.find(s => s.id === id)
    if (sticker) {
      sticker.downloads++
      saveStickers(stickers)
    }
    return
  }

  const { sql } = await import('@vercel/postgres')
  await sql`
    UPDATE stickers SET downloads = downloads + 1 WHERE id = ${id}
  `
}

// Minimum number of stickers to keep in the gallery
const MIN_STICKERS = 40

// Eliminar stickers expirados (mantener mínimo MIN_STICKERS)
export async function deleteExpiredStickers(): Promise<{ deleted: number }> {
  if (!hasPostgres) {
    const stickers = loadStickers()
    const now = new Date()

    // Sort by created_at descending (newest first)
    const sorted = [...stickers].sort((a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

    // Keep at least MIN_STICKERS, only delete expired ones beyond that
    const toKeep: Sticker[] = []
    const toDelete: Sticker[] = []

    sorted.forEach((sticker, index) => {
      const isExpired = new Date(sticker.expires_at) < now
      // Keep if: not expired OR we haven't reached minimum yet
      if (!isExpired || toKeep.length < MIN_STICKERS) {
        toKeep.push(sticker)
      } else {
        toDelete.push(sticker)
      }
    })

    saveStickers(toKeep)
    return { deleted: toDelete.length }
  }

  const { sql } = await import('@vercel/postgres')

  // First, count total stickers
  const { rows: countRows } = await sql`SELECT COUNT(*) as count FROM stickers`
  const totalCount = parseInt(countRows[0].count)

  // Only delete if we have more than minimum
  if (totalCount <= MIN_STICKERS) {
    return { deleted: 0 }
  }

  // Delete expired stickers but keep at least MIN_STICKERS
  const { rowCount } = await sql`
    DELETE FROM stickers
    WHERE id IN (
      SELECT id FROM stickers
      WHERE expires_at < NOW()
      ORDER BY created_at ASC
      LIMIT ${totalCount - MIN_STICKERS}
    )
  `
  return { deleted: rowCount || 0 }
}

// Get total sticker count
export async function getStickerCount(): Promise<number> {
  if (!hasPostgres) {
    return loadStickers().length
  }

  const { sql } = await import('@vercel/postgres')
  const { rows } = await sql`SELECT COUNT(*) as count FROM stickers`
  return parseInt(rows[0].count)
}
