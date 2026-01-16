'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sparkles, Wand2 } from 'lucide-react'
import type { Sticker } from '@/lib/db'

interface StickerGeneratorProps {
  onStickerGenerated?: (sticker: Sticker) => void
}

const EXAMPLE_PROMPTS = [
  'a happy cat with sunglasses',
  'a dancing avocado',
  'a sleepy panda with coffee',
  'a rainbow unicorn',
  'a cool penguin on skateboard',
  'a smiling taco',
]

export function StickerGenerator({ onStickerGenerated }: StickerGeneratorProps) {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generatedSticker, setGeneratedSticker] = useState<Sticker | null>(null)

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
    <div className="w-full max-w-2xl mx-auto">
      {/* Formulario */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe tu sticker... ej: un gato feliz con gafas de sol"
            disabled={loading}
            maxLength={500}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              loading={loading}
              disabled={!prompt.trim()}
            >
              <Wand2 className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Crear
            </Button>
          </div>
        </div>

        {/* Contador de caracteres */}
        <div className="flex justify-between text-sm text-[#9ca3af]">
          <span>{prompt.length}/500</span>
          {loading && (
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Creando tu sticker...
            </span>
          )}
        </div>
      </form>

      {/* Ejemplos */}
      <div className="mt-6">
        <p className="text-sm text-[#6b7280] mb-3">Prueba con:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((example) => (
            <button
              key={example}
              onClick={() => handleExampleClick(example)}
              className="px-3 py-1.5 text-sm rounded-full border border-[#e5e7eb] text-[#6b7280]
                hover:border-[#1a2634] hover:text-[#1a2634] transition-all duration-300"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Sticker generado */}
      {generatedSticker && (
        <div className="mt-8 flex flex-col items-center">
          <div className="relative group">
            <img
              src={generatedSticker.image_url}
              alt={generatedSticker.prompt}
              className="w-64 h-64 object-contain rounded-2xl border border-[#e5e7eb]
                group-hover:border-[#1a2634] transition-all duration-300"
            />
          </div>
          <p className="mt-4 text-sm text-[#6b7280] text-center max-w-xs">
            &ldquo;{generatedSticker.prompt}&rdquo;
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href={`/api/download/${generatedSticker.id}`}
              download
              className="rounded-full border border-[#1a2634] px-6 py-3 font-light
                tracking-wide transition-all duration-300 hover:bg-[#1a2634] hover:text-white
                inline-flex items-center"
            >
              Descargar para WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
