import { StickerGenerator } from '@/components/StickerGenerator'
import { StickerGrid } from '@/components/StickerGrid'
import { AdBanner } from '@/components/AdBanner'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 60

export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#faf8f5]/80 backdrop-blur-md">
        <div className="px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between max-w-6xl mx-auto">
          <Link href="/" className="flex items-center gap-2 group">
            <Sparkles className="w-5 h-5 text-[#1a2634] group-hover:-rotate-12 transition-transform duration-300" strokeWidth={1.5} />
            <span className="text-lg font-light tracking-wide text-[#1a2634]">
              StickerAI
            </span>
          </Link>
          <Link
            href="/gallery"
            className="group flex items-center gap-1.5 px-4 py-2 text-sm font-light text-[#6b7280]
              hover:text-[#1a2634] rounded-full border border-[#e5e7eb] hover:border-[#1a2634] transition-all duration-300"
          >
            Ver galería
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="px-4 sm:px-6 lg:px-12 pt-12 sm:pt-16 pb-8">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <p className="text-[10px] sm:text-xs font-light tracking-[0.25em] uppercase text-[#9ca3af] mb-4">
            Generador de stickers con IA
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#1a2634] leading-[1.15] mb-4">
            Crea stickers únicos
            <br />
            <span className="text-[#4b5563]">para WhatsApp</span>
          </h1>
          <p className="text-sm sm:text-base font-light text-[#6b7280] max-w-md mx-auto leading-relaxed mb-6">
            Describe lo que imaginas y nuestra IA lo convertirá en un sticker.
            100% gratis, sin registro, ilimitado.
          </p>

          {/* Mini steps */}
          <div className="flex items-center justify-center gap-3 text-xs text-[#9ca3af] font-light">
            <span>1. Describe</span>
            <span className="text-[#e5e7eb]">→</span>
            <span>2. Genera</span>
            <span className="text-[#e5e7eb]">→</span>
            <span>3. Descarga</span>
          </div>
        </div>
      </section>

      {/* Generator */}
      <section className="px-4 sm:px-6 lg:px-12 pb-12">
        <div className="max-w-xl mx-auto animate-slide-up">
          <StickerGenerator />
        </div>
      </section>

      {/* Ad Banner - Horizontal */}
      <section className="px-4 sm:px-6 lg:px-12 pb-12">
        <AdBanner slot="1234567890" format="horizontal" />
      </section>

      {/* Divider */}
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-[#e5e7eb] to-transparent" />
      </div>

      {/* Gallery with sidebar ad on desktop */}
      <section className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            {/* Main content */}
            <div className="flex-1 max-w-6xl">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-[10px] sm:text-xs font-light tracking-[0.2em] uppercase text-[#9ca3af] mb-1">
                    Comunidad
                  </p>
                  <h2 className="text-xl sm:text-2xl font-light tracking-tight text-[#1a2634]">
                    Stickers recientes
                  </h2>
                </div>
                <Link
                  href="/gallery"
                  className="flex items-center gap-1 text-xs sm:text-sm font-light text-[#6b7280]
                    hover:text-[#1a2634] transition-colors duration-300 group"
                >
                  Ver todos
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" strokeWidth={1.5} />
                </Link>
              </div>
              <StickerGrid />
            </div>

            {/* Sidebar ad - only on desktop */}
            <aside className="hidden xl:block w-[160px] flex-shrink-0">
              <div className="sticky top-20">
                <AdBanner slot="0987654321" format="vertical" />
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-12 py-6 border-t border-[#e5e7eb]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#9ca3af]" strokeWidth={1.5} />
            <span className="text-sm font-light text-[#9ca3af]">StickerAI</span>
          </div>
          <p className="text-[10px] sm:text-xs font-light text-[#9ca3af]">
            Gratis · Sin registro · Sin límites
          </p>
        </div>
      </footer>
    </div>
  )
}
