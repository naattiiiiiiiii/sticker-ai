'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { StickerCard } from './StickerCard'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import type { Sticker } from '@/lib/db'

interface StickerGridProps {
  initialStickers?: Sticker[]
}

// Store newly generated stickers outside component to survive remounts
const newlyGeneratedStickers: Sticker[] = []

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
      const newSticker = event.detail
      if (!newSticker) return

      // Store in module-level array to survive remounts
      if (!newlyGeneratedStickers.some(s => s.id === newSticker.id)) {
        newlyGeneratedStickers.unshift(newSticker)
      }

      // Update state
      setStickers(prev => {
        if (prev.some(s => s.id === newSticker.id)) return prev
        return [newSticker, ...prev]
      })
    }

    window.addEventListener('newSticker', handleNewSticker as EventListener)
    return () => window.removeEventListener('newSticker', handleNewSticker as EventListener)
  }, [])

  // Merge newly generated stickers on mount
  useEffect(() => {
    if (newlyGeneratedStickers.length > 0) {
      setStickers(prev => {
        const existingIds = new Set(prev.map(s => s.id))
        const toAdd = newlyGeneratedStickers.filter(s => !existingIds.has(s.id))
        return [...toAdd, ...prev]
      })
    }
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
        // Handle specific error codes
        if (data.code === 'DB_ERROR' || data.code === 'SERVICE_UNAVAILABLE') {
          throw new Error('El servicio está temporalmente no disponible. Intenta de nuevo en unos segundos.')
        }
        throw new Error(data.error || 'Error cargando stickers')
      }

      // Use functional update to avoid stale closures
      setStickers((prev) => {
        // Combine: newly generated (module-level) + previous + new from API
        const allStickers = [...newlyGeneratedStickers, ...prev]
        const existingIds = new Set(allStickers.map(s => s.id))
        const fromApi = data.stickers.filter((s: Sticker) => !existingIds.has(s.id))

        // Deduplicate and sort by date
        const combined = [...allStickers, ...fromApi]
        const unique = combined.filter((s, i, arr) => arr.findIndex(x => x.id === s.id) === i)
        return unique.sort((a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
      })
      setCursor(data.nextCursor)
      setHasMore(data.hasMore)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error cargando stickers'
      setError(message)
      // Log error for debugging but don't expose internals to user
      console.error('[StickerGrid] Load error:', err)
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

  if (stickers.length === 0 && !loading && initialLoadDone.current) {
    return (
      <div className="text-center py-12">
        <p className="text-[#9ca3af] text-sm font-light">No hay stickers todavía. ¡Crea el primero!</p>
      </div>
    )
  }

  if (stickers.length === 0 && !initialLoadDone.current) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-6 h-6 border-2 border-[#e5e7eb] border-t-[#1a2634] rounded-full animate-spin" />
      </div>
    )
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
