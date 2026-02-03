import { StickerGrid } from '@/components/StickerGrid'
import { AdBanner } from '@/components/AdBanner'
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

      {/* Hero Section with Editorial Content */}
      <section className="px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-[#9ca3af] mb-2">
            Comunidad
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-[#1a2634]">
            Galería de Stickers
          </h1>
          <p className="mt-3 text-sm sm:text-base font-light text-[#6b7280] max-w-2xl leading-relaxed">
            Explora los stickers creados por nuestra comunidad. Cada sticker ha sido generado con inteligencia artificial
            y está listo para descargar gratis. Encuentra inspiración o descarga los que más te gusten para WhatsApp.
          </p>

          {/* Quick Tips */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-white/60">
              <div className="w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-4 h-4 text-[#1a2634]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-[#1a2634] mb-0.5">Formato optimizado</h3>
                <p className="text-xs sm:text-sm font-light text-[#6b7280]">
                  Todos en formato WebP para WhatsApp.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-white/60">
              <div className="w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center flex-shrink-0">
                <Share2 className="w-4 h-4 text-[#1a2634]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-[#1a2634] mb-0.5">Fácil de compartir</h3>
                <p className="text-xs sm:text-sm font-light text-[#6b7280]">
                  Usa Sticker Maker para añadirlos a WhatsApp.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-white/60">
              <div className="w-8 h-8 rounded-full bg-[#f3f4f6] flex items-center justify-center flex-shrink-0">
                <Heart className="w-4 h-4 text-[#1a2634]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-medium text-[#1a2634] mb-0.5">100% gratis</h3>
                <p className="text-xs sm:text-sm font-light text-[#6b7280]">
                  Sin marcas de agua, descarga ilimitada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner - After editorial content */}
      <section className="px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <AdBanner slot="1234567890" format="horizontal" />
        </div>
      </section>

      {/* Grid */}
      <section className="px-4 sm:px-6 lg:px-12 pb-8">
        <div className="max-w-5xl mx-auto">
          <StickerGrid />
        </div>
      </section>

      {/* Divider */}
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-[#e5e7eb] to-transparent" />
      </div>

      {/* How to Use Section */}
      <section className="px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-light tracking-tight text-[#1a2634] mb-5 text-center">
            Cómo usar los stickers en WhatsApp
          </h2>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex gap-3 sm:gap-4 items-start">
              <span className="w-6 h-6 rounded-full bg-[#1a2634] text-white text-xs flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <h3 className="text-sm sm:text-base font-medium text-[#1a2634] mb-0.5">Descarga el sticker</h3>
                <p className="text-xs sm:text-sm font-light text-[#6b7280]">
                  Haz clic en cualquier sticker y pulsa descargar. Se guardará en formato WebP.
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <span className="w-6 h-6 rounded-full bg-[#1a2634] text-white text-xs flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <h3 className="text-sm sm:text-base font-medium text-[#1a2634] mb-0.5">Abre Sticker Maker</h3>
                <p className="text-xs sm:text-sm font-light text-[#6b7280]">
                  Descarga la app desde App Store o Google Play y crea un nuevo pack.
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4 items-start">
              <span className="w-6 h-6 rounded-full bg-[#1a2634] text-white text-xs flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <h3 className="text-sm sm:text-base font-medium text-[#1a2634] mb-0.5">Añade a WhatsApp</h3>
                <p className="text-xs sm:text-sm font-light text-[#6b7280]">
                  Importa los stickers al pack y pulsa "Añadir a WhatsApp".
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1a2634] text-white text-sm font-light rounded-full hover:bg-[#2a3644] transition-colors duration-300"
            >
              <Sparkles className="w-4 h-4" strokeWidth={1.5} />
              Crear mi propio sticker
            </Link>
          </div>
        </div>
      </section>

      {/* Second Ad Banner - After how-to content */}
      <section className="px-4 sm:px-6 lg:px-12 pb-8">
        <div className="max-w-5xl mx-auto">
          <AdBanner slot="0987654321" format="horizontal" />
        </div>
      </section>

      <Footer />
    </div>
  )
}
