'use client'

import { useState, useEffect, useCallback } from 'react'
import { StickerCard } from './StickerCard'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import type { Sticker } from '@/lib/db'

interface StickerGridProps {
  initialStickers?: Sticker[]
}

export function StickerGrid({ initialStickers = [] }: StickerGridProps) {
  const [stickers, setStickers] = useState<Sticker[]>(initialStickers)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [cursor, setCursor] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({ limit: '20' })
      if (cursor) params.set('cursor', cursor)

      const response = await fetch(`/api/stickers?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error cargando stickers')
      }

      setStickers((prev) => [...prev, ...data.stickers])
      setCursor(data.nextCursor)
      setHasMore(data.hasMore)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando stickers')
    } finally {
      setLoading(false)
    }
  }, [cursor, hasMore, loading])

  // Cargar inicial
  useEffect(() => {
    if (initialStickers.length === 0) {
      loadMore()
    }
  }, [])

  // Intersection Observer para infinite scroll
  useEffect(() => {
    if (!hasMore || loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { rootMargin: '200px' }
    )

    const sentinel = document.getElementById('load-more-sentinel')
    if (sentinel) observer.observe(sentinel)

    return () => observer.disconnect()
  }, [hasMore, loading, loadMore])

  if (stickers.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6b7280] font-light">
          Aún no hay stickers. ¡Crea el primero!
        </p>
      </div>
    )
  }

  return (
    <div>
      {/* Grid responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {stickers.map((sticker) => (
          <StickerCard key={sticker.id} sticker={sticker} />
        ))}
      </div>

      {/* Sentinel para infinite scroll */}
      <div id="load-more-sentinel" className="h-4" />

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 text-[#6b7280] animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center py-8">
          <p className="text-red-500 text-sm mb-4">{error}</p>
          <Button onClick={loadMore} variant="primary" size="sm">
            Reintentar
          </Button>
        </div>
      )}

      {/* Fin del contenido */}
      {!hasMore && stickers.length > 0 && (
        <p className="text-center text-[#9ca3af] text-sm py-8">
          Has visto todos los stickers
        </p>
      )}
    </div>
  )
}
