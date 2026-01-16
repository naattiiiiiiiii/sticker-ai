import { StickerGenerator } from '@/components/StickerGenerator'
import { StickerGrid } from '@/components/StickerGrid'
import { Sparkles, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 60 // ISR: revalidar cada 60 segundos

export default function Home() {
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
          href="/gallery"
          className="text-sm font-light text-[#6b7280] hover:text-[#1a2634]
            transition-colors duration-300 flex items-center gap-1"
        >
          Ver todos
          <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
        </Link>
      </header>

      {/* Hero */}
      <section className="px-6 sm:px-8 lg:px-16 py-12 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#1a2634] tracking-tight leading-tight">
            Crea stickers únicos
            <br />
            <span className="text-[#6b7280]">para WhatsApp</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#6b7280] font-light max-w-xl mx-auto">
            Describe lo que quieres y la IA lo crea al instante.
            Gratis, sin registro, para siempre.
          </p>
        </div>
      </section>

      {/* Generador */}
      <section className="px-6 sm:px-8 lg:px-16 pb-16">
        <StickerGenerator />
      </section>

      {/* Separador */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="h-px bg-[#e5e7eb]" />
      </div>

      {/* Stickers recientes */}
      <section className="px-6 sm:px-8 lg:px-16 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-light text-[#1a2634]">
              Stickers recientes
            </h2>
            <Link
              href="/gallery"
              className="text-sm font-light text-[#6b7280] hover:text-[#1a2634]
                transition-colors duration-300 flex items-center gap-1"
            >
              Ver todos
              <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </div>
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
