import { StickerGrid } from '@/components/StickerGrid'
import { Sparkles, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galería de Stickers | StickerAI',
  description: 'Explora todos los stickers creados por la comunidad. Descarga gratis para WhatsApp.',
}

export const revalidate = 60 // ISR: revalidar cada 60 segundos

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="px-6 sm:px-8 lg:px-16 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-[#1a2634]" strokeWidth={1.5} />
          <span className="text-lg font-light tracking-wide text-[#1a2634]">
            StickerAI
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm font-light text-[#6b7280] hover:text-[#1a2634]
            transition-colors duration-300 flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
          Crear sticker
        </Link>
      </header>

      {/* Título */}
      <section className="px-6 sm:px-8 lg:px-16 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#1a2634] tracking-tight">
            Galería de Stickers
          </h1>
          <p className="mt-4 text-lg text-[#6b7280] font-light">
            Explora los stickers creados por la comunidad
          </p>
        </div>
      </section>

      {/* Grid de stickers */}
      <section className="px-6 sm:px-8 lg:px-16 pb-16">
        <div className="max-w-7xl mx-auto">
          <StickerGrid />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-8 lg:px-16 py-8 border-t border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#9ca3af]" strokeWidth={1.5} />
            <span className="text-sm font-light text-[#9ca3af]">
              StickerAI — Hecho con IA
            </span>
          </div>
          <p className="text-xs text-[#9ca3af] text-center sm:text-right">
            Los stickers se eliminan después de 30 días.
            <br className="sm:hidden" />
            {' '}No almacenamos datos personales.
          </p>
        </div>
      </footer>
    </div>
  )
}
