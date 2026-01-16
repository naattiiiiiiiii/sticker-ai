-- =============================================
-- StickerAI - Configuración de Supabase
-- =============================================

-- 1. Crear tabla de stickers
CREATE TABLE IF NOT EXISTS stickers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prompt TEXT NOT NULL,
  image_url TEXT NOT NULL,
  downloads INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- 2. Índices para optimización
CREATE INDEX IF NOT EXISTS idx_stickers_created_at ON stickers(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_stickers_expires_at ON stickers(expires_at);

-- 3. Habilitar Row Level Security
ALTER TABLE stickers ENABLE ROW LEVEL SECURITY;

-- 4. Política: Lectura pública (cualquiera puede ver stickers)
CREATE POLICY "Stickers are publicly readable"
  ON stickers
  FOR SELECT
  TO public
  USING (true);

-- 5. Política: Solo service role puede insertar
CREATE POLICY "Only service role can insert"
  ON stickers
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- 6. Política: Solo service role puede actualizar
CREATE POLICY "Only service role can update"
  ON stickers
  FOR UPDATE
  TO service_role
  USING (true);

-- 7. Política: Solo service role puede eliminar
CREATE POLICY "Only service role can delete"
  ON stickers
  FOR DELETE
  TO service_role
  USING (true);

-- 8. Función para incrementar descargas
CREATE OR REPLACE FUNCTION increment_downloads(sticker_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE stickers
  SET downloads = downloads + 1
  WHERE id = sticker_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- Storage Bucket
-- =============================================
-- Crear desde el dashboard de Supabase:
-- 1. Ir a Storage
-- 2. Crear bucket "stickers"
-- 3. Marcar como "Public bucket"
-- 4. Políticas:
--    - Lectura: Pública (allow all)
--    - Escritura: Solo service_role
