'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Wand2, Download, ArrowRight, Sparkles, MessageCircle } from 'lucide-react'
import type { Sticker } from '@/lib/db'
import { WhatsAppModal } from './WhatsAppModal'

interface StickerGeneratorProps {
  onStickerGenerated?: (sticker: Sticker) => void
}

const EXAMPLE_PROMPTS = [
  'realistic wolf howling',
  'anime girl pink hair',
  'pixel art mushroom',
  'watercolor butterfly',
  'neon cyberpunk cat',
  '3D render donut',
  'vintage rose flower',
  'chibi samurai warrior',
]

export function StickerGenerator({ onStickerGenerated }: StickerGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedSticker, setGeneratedSticker] = useState<Sticker | null>(null)
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!prompt.trim()) {
      setError('Escribe qué quieres en tu sticker')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al generar el sticker')
      }

      setGeneratedSticker(data.sticker)
      onStickerGenerated?.(data.sticker)
      setPrompt('')

      // Dispatch event to update the gallery grid
      window.dispatchEvent(new CustomEvent('newSticker', { detail: data.sticker }))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al generar el sticker')
    } finally {
      setLoading(false)
    }
  }

  const handleExampleClick = (example: string) => {
    setPrompt(example)
  }

  return (
    <div className="w-full">
      {/* Input y botón */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe tu sticker..."
              disabled={loading}
              maxLength={200}
              className="w-full h-14 px-5 pr-16 rounded-2xl border border-[#e5e7eb] bg-white/50
                font-light text-[#1a2634] placeholder:text-[#9ca3af]
                focus:border-[#1a2634] focus:outline-none transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#9ca3af]">
              {prompt.length}/200
            </span>
          </div>
          <Button
            type="submit"
            variant="secondary"
            loading={loading}
            disabled={!prompt.trim()}
            className="h-14 px-6 sm:px-8"
          >
            <Wand2 className="w-4 h-4 mr-2" strokeWidth={1.5} />
            <span className="hidden sm:inline">Crear sticker</span>
            <span className="sm:hidden">Crear</span>
          </Button>
        </div>

        {/* Loading message */}
        {loading && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-[#6b7280]">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Creando tu sticker con IA...</span>
          </div>
        )}
      </form>

      {/* Ejemplos */}
      <div className="mt-6">
        <p className="text-xs font-light tracking-[0.15em] uppercase text-[#9ca3af] mb-3">
          Ideas
        </p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((example) => (
            <button
              key={example}
              onClick={() => handleExampleClick(example)}
              disabled={loading}
              className="px-3 py-1.5 text-xs sm:text-sm font-light rounded-full border border-[#e5e7eb]
                text-[#6b7280] hover:border-[#1a2634] hover:text-[#1a2634] hover:bg-white/50
                transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-6 p-4 rounded-2xl border border-red-200 bg-red-50 text-red-600 text-sm font-light">
          {error}
        </div>
      )}

      {/* Modal del sticker generado */}
      {generatedSticker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setGeneratedSticker(null)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#1a2634]/50 backdrop-blur-sm" />

          {/* Modal */}
          <div
            className="relative bg-[#faf8f5] rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Preview */}
            <div className="flex justify-center mb-6">
              <div
                className="w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden"
                style={{
                  backgroundImage: 'linear-gradient(45deg, #e8e8e8 25%, transparent 25%), linear-gradient(-45deg, #e8e8e8 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e8e8e8 75%), linear-gradient(-45deg, transparent 75%, #e8e8e8 75%)',
                  backgroundSize: '12px 12px',
                  backgroundPosition: '0 0, 0 6px, 6px -6px, -6px 0px',
                  backgroundColor: '#f5f5f5'
                }}
              >
                <img
                  src={generatedSticker.image_url}
                  alt={generatedSticker.prompt}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Prompt */}
            <p className="text-center text-sm font-light text-[#6b7280] mb-6">
              &ldquo;{generatedSticker.prompt}&rdquo;
            </p>

            {/* Buttons */}
            <div className="flex flex-col gap-3">
              <a
                href={`/api/download/${generatedSticker.id}`}
                download={`sticker_${generatedSticker.id}.webp`}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full
                  bg-[#1a2634] text-white font-light tracking-wide
                  hover:bg-[#2d3d4f] transition-all duration-300"
              >
                <Download className="w-4 h-4" strokeWidth={1.5} />
                Descargar
              </a>

              <button
                onClick={() => setShowWhatsAppModal(true)}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full
                  border border-[#25D366] text-[#25D366] font-light tracking-wide
                  hover:bg-[#25D366] hover:text-white transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                Añadir a WhatsApp
              </button>

              <button
                onClick={() => setGeneratedSticker(null)}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full
                  text-[#6b7280] font-light hover:text-[#1a2634] transition-all duration-300"
              >
                Crear otro
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Modal */}
      {showWhatsAppModal && generatedSticker && (
        <WhatsAppModal
          sticker={generatedSticker}
          onClose={() => setShowWhatsAppModal(false)}
          onCreateAnother={() => {
            setShowWhatsAppModal(false)
            setGeneratedSticker(null)
          }}
        />
      )}
    </div>
  )
}
