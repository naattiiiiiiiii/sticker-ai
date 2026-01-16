'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
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
  const initialLoadDone = useRef(false)

  // Listen for new sticker events
  useEffect(() => {
    const handleNewSticker = (event: CustomEvent<Sticker>) => {
      setStickers(prev => {
        // Add new sticker at the beginning if not already present
        if (prev.some(s => s.id === event.detail.id)) return prev
        return [event.detail, ...prev]
      })
    }

    window.addEventListener('newSticker', handleNewSticker as EventListener)
    return () => window.removeEventListener('newSticker', handleNewSticker as EventListener)
  }, [])

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

      // Use functional update to avoid stale closures
      setStickers((prev) => {
        // Filter out duplicates by ID
        const existingIds = new Set(prev.map(s => s.id))
        const newStickers = data.stickers.filter((s: Sticker) => !existingIds.has(s.id))
        return [...prev, ...newStickers]
      })
      setCursor(data.nextCursor)
      setHasMore(data.hasMore)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando stickers')
    } finally {
      setLoading(false)
    }
  }, [cursor, hasMore, loading])

  // Initial load - only runs once
  useEffect(() => {
    if (initialStickers.length === 0 && !initialLoadDone.current) {
      initialLoadDone.current = true
      loadMore()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || loading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
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
    return null
  }

  return (
    <div>
      <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
        {stickers.map((sticker) => (
          <StickerCard key={sticker.id} sticker={sticker} />
        ))}
      </div>

      <div id="load-more-sentinel" className="h-4" />

      {loading && (
        <div className="flex justify-center py-8 sm:py-12">
          <Loader2 className="w-5 h-5 text-[#9ca3af] animate-spin" />
        </div>
      )}

      {error && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-red-500 text-sm font-light mb-4">{error}</p>
          <Button onClick={loadMore} variant="primary" size="sm">
            Reintentar
          </Button>
        </div>
      )}

      {!hasMore && stickers.length > 0 && (
        <p className="text-center text-[#9ca3af] text-xs sm:text-sm font-light py-8 sm:py-12">
          Has visto todos los stickers
        </p>
      )}
    </div>
  )
}
