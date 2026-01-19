import { StickerGrid } from '@/components/StickerGrid'
import { Footer } from '@/components/Footer'
import { Sparkles, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Galería de Stickers | StickerAI',
  description: 'Explora todos los stickers creados por la comunidad. Descarga gratis para WhatsApp.',
}

export const revalidate = 60

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="px-6 sm:px-8 lg:px-16 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Sparkles className="w-5 h-5 text-[#1a2634] group-hover:-rotate-12 transition-transform duration-300" strokeWidth={1.5} />
          <span className="text-lg font-light tracking-wide text-[#1a2634]">
            StickerAI
          </span>
        </Link>
        <Link
          href="/"
          className="group flex items-center gap-1.5 text-sm font-light text-[#6b7280] hover:text-[#1a2634] transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" strokeWidth={1.5} />
          Crear sticker
        </Link>
      </header>

      {/* Título */}
      <section className="px-6 sm:px-8 lg:px-16 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-light tracking-[0.25em] uppercase text-[#9ca3af] mb-2">
            Comunidad
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1a2634]">
            Galería de Stickers
          </h1>
          <p className="mt-4 text-base font-light text-[#6b7280]">
            Explora los stickers creados por la comunidad
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 sm:px-8 lg:px-16 pb-20">
        <div className="max-w-5xl mx-auto">
          <StickerGrid />
        </div>
      </section>

      <Footer />
    </div>
  )
}
