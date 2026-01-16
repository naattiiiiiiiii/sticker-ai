'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import type { Sticker } from '@/lib/db'
import { WhatsAppModal } from './WhatsAppModal'

interface StickerCardProps {
  sticker: Sticker
}

// Checkered background style for showing transparency
const checkeredBg = {
  backgroundImage: 'linear-gradient(45deg, #e8e8e8 25%, transparent 25%), linear-gradient(-45deg, #e8e8e8 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e8e8e8 75%), linear-gradient(-45deg, transparent 75%, #e8e8e8 75%)',
  backgroundSize: '12px 12px',
  backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px',
  backgroundColor: '#f5f5f5'
}

export function StickerCard({ sticker }: StickerCardProps) {
  const [showModal, setShowModal] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <>
      <div className="group relative rounded-2xl border border-[#e5e7eb] p-2 sm:p-3
        transition-all duration-300 hover:border-[#1a2634] hover:shadow-md hover:shadow-black/5 bg-white/50">
        {/* Imagen con fondo checkered para mostrar transparencia */}
        <div
          className="relative aspect-square overflow-hidden rounded-xl"
          style={checkeredBg}
        >
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#faf8f5]">
              <div className="w-5 h-5 sm:w-6 sm:h-6 border border-[#e5e7eb] border-t-[#1a2634] rounded-full animate-spin" />
            </div>
          )}
          <img
            src={sticker.image_url}
            alt={sticker.prompt}
            className={`w-full h-full object-contain transition-all duration-500
              ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-[#1a2634]/70 opacity-0 group-hover:opacity-100
            transition-all duration-300 flex items-center justify-center rounded-xl">
            <button
              onClick={() => setShowModal(true)}
              className="p-2.5 sm:p-3 rounded-full bg-white text-[#1a2634]
                hover:scale-110 active:scale-95 transition-transform duration-200"
              title="Descargar"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Info */}
        <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs font-light text-[#6b7280] line-clamp-2 leading-relaxed" title={sticker.prompt}>
          {sticker.prompt}
        </p>

        {sticker.downloads > 0 && (
          <p className="mt-1 text-[10px] font-light text-[#9ca3af]">
            {sticker.downloads} descarga{sticker.downloads !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      {showModal && (
        <WhatsAppModal sticker={sticker} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}
