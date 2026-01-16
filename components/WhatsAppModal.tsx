'use client'

import { useEffect } from 'react'
import { X, Download, Smartphone, Apple, ExternalLink } from 'lucide-react'
import type { Sticker } from '@/lib/db'
import { Button } from '@/components/ui/button'

interface WhatsAppModalProps {
  sticker: Sticker
  onClose: () => void
}

export function WhatsAppModal({ sticker, onClose }: WhatsAppModalProps) {
  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Prevenir scroll del body
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
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#1a2634]/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}>
        {/* Botón cerrar */}
        <button onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#faf8f5] transition-colors duration-200">
          <X className="w-5 h-5 text-[#6b7280]" strokeWidth={1.5} />
        </button>

        {/* Preview del sticker */}
        <div className="flex justify-center mb-6">
          <img src={sticker.image_url} alt={sticker.prompt}
            className="w-40 h-40 object-contain rounded-2xl border border-[#e5e7eb]" />
        </div>

        {/* Título */}
        <h3 className="text-xl font-light text-[#1a2634] text-center mb-2">
          Descargar Sticker
        </h3>
        <p className="text-sm text-[#6b7280] text-center mb-6">
          Sigue estos pasos para añadirlo a WhatsApp
        </p>

        {/* Botón de descarga */}
        <Button onClick={handleDownload} variant="secondary" size="lg" className="w-full mb-6">
          <Download className="w-5 h-5 mr-2" strokeWidth={1.5} />
          Descargar Sticker
        </Button>

        {/* Instrucciones */}
        <div className="space-y-4">
          {/* Android */}
          <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e5e7eb]">
            <div className="flex items-center gap-2 mb-2">
              <Smartphone className="w-5 h-5 text-[#1a2634]" strokeWidth={1.5} />
              <span className="font-medium text-[#1a2634]">Android</span>
            </div>
            <ol className="text-sm text-[#6b7280] space-y-1 list-decimal list-inside">
              <li>Descarga el sticker</li>
              <li>Abre la app &quot;Sticker Maker&quot;</li>
              <li>Crea un nuevo pack e importa la imagen</li>
              <li>Añade a WhatsApp</li>
            </ol>
            <a href="https://play.google.com/store/apps/details?id=com.marsvard.stickermakerforwhatsapp"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-xs text-[#1a2634] hover:underline">
              Descargar Sticker Maker
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* iOS */}
          <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e5e7eb]">
            <div className="flex items-center gap-2 mb-2">
              <Apple className="w-5 h-5 text-[#1a2634]" strokeWidth={1.5} />
              <span className="font-medium text-[#1a2634]">iPhone</span>
            </div>
            <ol className="text-sm text-[#6b7280] space-y-1 list-decimal list-inside">
              <li>Descarga el sticker</li>
              <li>Abre la app &quot;Sticker Maker Studio&quot;</li>
              <li>Importa la imagen como sticker</li>
              <li>Añade a WhatsApp</li>
            </ol>
            <a href="https://apps.apple.com/app/sticker-maker-studio/id1443326904"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 text-xs text-[#1a2634] hover:underline">
              Descargar Sticker Maker Studio
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Nota */}
        <p className="mt-4 text-xs text-[#9ca3af] text-center">
          El sticker está en formato WebP (512x512), optimizado para WhatsApp.
        </p>
      </div>
    </div>
  )
}
