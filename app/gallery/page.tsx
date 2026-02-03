import { StickerGrid } from '@/components/StickerGrid'
import { Footer } from '@/components/Footer'
import { Sparkles, ArrowLeft, Smartphone, Share2, Heart } from 'lucide-react'
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
      <header className="px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between max-w-6xl mx-auto">
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

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-[#9ca3af] mb-1">
            Comunidad
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[#1a2634]">
            Galería de Stickers
          </h1>
          <p className="mt-2 text-sm sm:text-base font-light text-[#6b7280] max-w-2xl leading-relaxed">
            Explora los stickers creados por nuestra comunidad. Cada sticker ha sido generado con IA
            y está listo para descargar gratis para WhatsApp.
          </p>

          {/* Quick Tips */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/60">
              <div className="w-7 h-7 rounded-full bg-[#f3f4f6] flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-3.5 h-3.5 text-[#1a2634]" strokeWidth={1.5} />
              </div>
              <p className="text-xs sm:text-sm font-light text-[#6b7280]">
                Formato WebP para WhatsApp
              </p>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/60">
              <div className="w-7 h-7 rounded-full bg-[#f3f4f6] flex items-center justify-center flex-shrink-0">
                <Share2 className="w-3.5 h-3.5 text-[#1a2634]" strokeWidth={1.5} />
              </div>
              <p className="text-xs sm:text-sm font-light text-[#6b7280]">
                Usa Sticker Maker para añadir
              </p>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/60">
              <div className="w-7 h-7 rounded-full bg-[#f3f4f6] flex items-center justify-center flex-shrink-0">
                <Heart className="w-3.5 h-3.5 text-[#1a2634]" strokeWidth={1.5} />
              </div>
              <p className="text-xs sm:text-sm font-light text-[#6b7280]">
                100% gratis, sin marcas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 sm:px-6 lg:px-12 pb-6">
        <div className="max-w-5xl mx-auto">
          <StickerGrid />
        </div>
      </section>

      {/* Divider */}
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-[#e5e7eb] to-transparent" />
      </div>

      {/* How to Use Section */}
      <section className="px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg sm:text-xl font-light tracking-tight text-[#1a2634] mb-4 text-center">
            Cómo usar los stickers en WhatsApp
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1a2634] text-white text-xs flex items-center justify-center flex-shrink-0">1</span>
              <p className="text-xs sm:text-sm font-light text-[#6b7280]">Descarga el sticker</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1a2634] text-white text-xs flex items-center justify-center flex-shrink-0">2</span>
              <p className="text-xs sm:text-sm font-light text-[#6b7280]">Abre Sticker Maker</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#1a2634] text-white text-xs flex items-center justify-center flex-shrink-0">3</span>
              <p className="text-xs sm:text-sm font-light text-[#6b7280]">Añade a WhatsApp</p>
            </div>
          </div>

          <div className="mt-5 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2 bg-[#1a2634] text-white text-sm font-light rounded-full hover:bg-[#2a3644] transition-colors duration-300"
            >
              <Sparkles className="w-4 h-4" strokeWidth={1.5} />
              Crear mi propio sticker
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
