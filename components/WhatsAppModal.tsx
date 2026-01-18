'use client'

import { useEffect, useState } from 'react'
import { X, Download, Smartphone, Apple, ExternalLink, Check, Heart, Share2, ChevronDown } from 'lucide-react'
import type { Sticker } from '@/lib/db'
import { Button } from '@/components/ui/button'

interface WhatsAppModalProps {
  sticker: Sticker
  onClose: () => void
  onCreateAnother?: () => void
}

// Checkered background style
const checkeredBg = {
  backgroundImage: 'linear-gradient(45deg, #e8e8e8 25%, transparent 25%), linear-gradient(-45deg, #e8e8e8 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e8e8e8 75%), linear-gradient(-45deg, transparent 75%, #e8e8e8 75%)',
  backgroundSize: '16px 16px',
  backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
  backgroundColor: '#f5f5f5'
}

export function WhatsAppModal({ sticker, onClose, onCreateAnother }: WhatsAppModalProps) {
  const [downloaded, setDownloaded] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = `/api/download/${sticker.id}`
    link.download = `sticker_${sticker.id}.webp`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setDownloaded(true)
    setShowInstructions(true)
  }

  const formattedDate = new Date(sticker.created_at).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#1a2634]/60 backdrop-blur-sm" />

      {/* Modal - Product Page Style */}
      <div
        className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-3xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 backdrop-blur-sm
            hover:bg-white transition-all duration-300 shadow-sm"
        >
          <X className="w-5 h-5 text-[#1a2634]" strokeWidth={1.5} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left: Sticker Preview */}
          <div className="flex-1 p-4 sm:p-8 flex items-center justify-center bg-[#faf8f5]">
            <div
              className="w-48 h-48 xs:w-56 xs:h-56 sm:w-72 sm:h-72 rounded-3xl overflow-hidden shadow-lg"
              style={checkeredBg}
            >
              <img
                src={sticker.image_url}
                alt={sticker.prompt}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex-1 p-4 sm:p-8 flex flex-col">
            {/* Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                Gratis
              </span>
              <span className="px-3 py-1 text-xs font-light rounded-full bg-[#f3f4f6] text-[#6b7280]">
                WebP 512x512
              </span>
            </div>

            {/* Title/Prompt */}
            <h2 className="text-lg sm:text-2xl font-medium text-[#1a2634] mb-2 leading-tight line-clamp-2">
              {sticker.prompt}
            </h2>

            {/* Meta info */}
            <p className="text-sm font-light text-[#9ca3af] mb-6">
              Creado {formattedDate} · {sticker.downloads} descarga{sticker.downloads !== 1 ? 's' : ''}
            </p>

            {/* Download Button */}
            <Button
              onClick={handleDownload}
              variant="secondary"
              size="lg"
              className="w-full mb-4"
            >
              {downloaded ? (
                <>
                  <Check className="w-5 h-5 mr-2" strokeWidth={2} />
                  Descargado
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 mr-2" strokeWidth={1.5} />
                  Descargar para WhatsApp
                </>
              )}
            </Button>

            {/* Instructions Accordion */}
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="w-full flex items-center justify-between p-4 rounded-2xl border border-[#e5e7eb]
                hover:border-[#1a2634] transition-all duration-300 mb-4"
            >
              <span className="text-sm font-light text-[#1a2634]">
                Cómo añadirlo a WhatsApp
              </span>
              <ChevronDown
                className={`w-5 h-5 text-[#6b7280] transition-transform duration-300 ${showInstructions ? 'rotate-180' : ''}`}
                strokeWidth={1.5}
              />
            </button>

            {/* Instructions Content */}
            {showInstructions && (
              <div className="space-y-3 animate-fade-in mb-4">
                {/* Android */}
                <div className="p-4 rounded-2xl bg-[#faf8f5]">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-4 h-4 text-[#1a2634]" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-[#1a2634]">Android</span>
                  </div>
                  <ol className="text-xs font-light text-[#6b7280] space-y-1 list-decimal list-inside ml-1">
                    <li>Abre &quot;Sticker Maker&quot;</li>
                    <li>Crea un pack e importa el sticker</li>
                    <li>Añade el pack a WhatsApp</li>
                  </ol>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.marsvard.stickermakerforwhatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-[#1a2634] hover:underline"
                  >
                    Descargar app <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* iOS */}
                <div className="p-4 rounded-2xl bg-[#faf8f5]">
                  <div className="flex items-center gap-2 mb-2">
                    <Apple className="w-4 h-4 text-[#1a2634]" strokeWidth={1.5} />
                    <span className="text-sm font-medium text-[#1a2634]">iPhone</span>
                  </div>
                  <ol className="text-xs font-light text-[#6b7280] space-y-1 list-decimal list-inside ml-1">
                    <li>Abre &quot;Sticker Maker Studio&quot;</li>
                    <li>Importa el sticker descargado</li>
                    <li>Añade el pack a WhatsApp</li>
                  </ol>
                  <a
                    href="https://apps.apple.com/app/sticker-maker-studio/id1443326904"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-[#1a2634] hover:underline"
                  >
                    Descargar app <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Crear otro button */}
            {onCreateAnother && (
              <button
                onClick={onCreateAnother}
                className="w-full py-3 text-sm font-light text-[#6b7280] hover:text-[#1a2634] transition-colors"
              >
                Crear otro sticker
              </button>
            )}

            {/* Footer info */}
            <div className="mt-auto pt-4 border-t border-[#e5e7eb]">
              <p className="text-[11px] font-light text-[#9ca3af] text-center">
                Optimizado para WhatsApp · Fondo transparente · Sin marca de agua
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
