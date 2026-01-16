import { createClient } from '@supabase/supabase-js'

// Tipos para la base de datos
export interface Sticker {
  id: string
  prompt: string
  image_url: string
  downloads: number
  created_at: string
  expires_at: string
}

// Cliente para uso en el servidor (API routes)
export function createServerClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

// Cliente anónimo para lectura pública
export function createPublicClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase public environment variables')
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Funciones helper para stickers
export async function getRecentStickers(limit = 20, cursor?: string) {
  const supabase = createPublicClient()

  let query = supabase
    .from('stickers')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (cursor) {
    query = query.lt('created_at', cursor)
  }

  const { data, error } = await query

  if (error) throw error
  return data as Sticker[]
}

export async function getStickerById(id: string) {
  const supabase = createPublicClient()

  const { data, error } = await supabase
    .from('stickers')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Sticker
}

export async function incrementDownloads(id: string) {
  const supabase = createServerClient()

  const { error } = await supabase.rpc('increment_downloads', { sticker_id: id })

  if (error) throw error
}

export async function createSticker(prompt: string, imageUrl: string) {
  const supabase = createServerClient()

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30) // 30 días de vida

  const { data, error } = await supabase
    .from('stickers')
    .insert({
      prompt,
      image_url: imageUrl,
      downloads: 0,
      expires_at: expiresAt.toISOString(),
    })
    .select()
    .single()

  if (error) throw error
  return data as Sticker
}

export async function uploadStickerImage(buffer: Buffer, filename: string) {
  const supabase = createServerClient()

  const { data, error } = await supabase.storage
    .from('stickers')
    .upload(filename, buffer, {
      contentType: 'image/webp',
      cacheControl: '31536000', // 1 año de cache
    })

  if (error) throw error

  // Obtener URL pública
  const { data: urlData } = supabase.storage
    .from('stickers')
    .getPublicUrl(filename)

  return urlData.publicUrl
}

export async function deleteExpiredStickers() {
  const supabase = createServerClient()

  // Obtener stickers expirados
  const { data: expired, error: selectError } = await supabase
    .from('stickers')
    .select('id, image_url')
    .lt('expires_at', new Date().toISOString())

  if (selectError) throw selectError
  if (!expired || expired.length === 0) return { deleted: 0 }

  // Extraer nombres de archivo del URL
  const filenames = expired.map(s => {
    const parts = s.image_url.split('/')
    return parts[parts.length - 1]
  })

  // Eliminar archivos del storage
  const { error: storageError } = await supabase.storage
    .from('stickers')
    .remove(filenames)

  if (storageError) console.error('Error deleting files:', storageError)

  // Eliminar registros de la DB
  const { error: deleteError } = await supabase
    .from('stickers')
    .delete()
    .lt('expires_at', new Date().toISOString())

  if (deleteError) throw deleteError

  return { deleted: expired.length }
}
