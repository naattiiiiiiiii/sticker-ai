'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import type { Sticker } from '@/lib/supabase'
import { WhatsAppModal } from './WhatsAppModal'

interface StickerCardProps {
  sticker: Sticker
}

export function StickerCard({ sticker }: StickerCardProps) {
  const [showModal, setShowModal] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <>
      <div className="group relative rounded-2xl border border-[#e5e7eb] p-3
        transition-all duration-300 hover:border-[#1a2634] bg-white">
        {/* Imagen */}
        <div className="relative aspect-square overflow-hidden rounded-xl bg-[#faf8f5]">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#e5e7eb] border-t-[#1a2634] rounded-full animate-spin" />
            </div>
          )}
          <img
            src={sticker.image_url}
            alt={sticker.prompt}
            className={`w-full h-full object-contain transition-opacity duration-300
              ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Overlay con acciones */}
          <div className="absolute inset-0 bg-[#1a2634]/80 opacity-0 group-hover:opacity-100
            transition-all duration-300 flex items-center justify-center gap-3">
            <button
              onClick={() => setShowModal(true)}
              className="p-3 rounded-full bg-white text-[#1a2634]
                hover:scale-110 transition-transform duration-200"
              title="Descargar"
            >
              <Download className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Prompt */}
        <p className="mt-3 text-xs text-[#6b7280] line-clamp-2 font-light" title={sticker.prompt}>
          {sticker.prompt}
        </p>

        {/* Descargas */}
        {sticker.downloads > 0 && (
          <p className="mt-1 text-xs text-[#9ca3af]">
            {sticker.downloads} descarga{sticker.downloads !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Modal de descarga */}
      {showModal && (
        <WhatsAppModal sticker={sticker} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}
