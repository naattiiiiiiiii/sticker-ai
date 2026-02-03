import { StickerGenerator } from '@/components/StickerGenerator'
import { StickerGrid } from '@/components/StickerGrid'
import { Footer } from '@/components/Footer'
import { Sparkles, ArrowRight, Download, MessageCircle, Palette, Zap } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 60

// Set to true when AdSense is approved
const ADSENSE_ENABLED = false

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
      <section className="px-4 sm:px-6 lg:px-12 pt-6 sm:pt-10 pb-4">
        <div className="max-w-2xl mx-auto text-center animate-fade-in">
          <p className="text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-[#9ca3af] mb-2">
            Generador de stickers con IA
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#1a2634] leading-[1.15] mb-2">
            Crea stickers únicos
            <br />
            <span className="text-[#4b5563]">para WhatsApp</span>
          </h1>
          <p className="text-sm sm:text-base font-light text-[#6b7280] max-w-md mx-auto leading-relaxed mb-3">
            Describe lo que imaginas y nuestra IA lo convertirá en un sticker.
            100% gratis, sin registro, ilimitado.
          </p>
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-[#9ca3af] font-light">
            <span>1. Describe</span>
            <span className="text-[#e5e7eb]">→</span>
            <span>2. Genera</span>
            <span className="text-[#e5e7eb]">→</span>
            <span>3. Descarga</span>
          </div>
        </div>
      </section>

      {/* Generator */}
      <section className="px-4 sm:px-6 lg:px-12 pb-6">
        <div className="max-w-xl mx-auto animate-slide-up">
          <StickerGenerator />
        </div>
      </section>

      {/* Divider */}
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-[#e5e7eb] to-transparent" />
      </div>

      {/* Gallery Section */}
      <section className="px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-xs sm:text-sm font-light tracking-[0.15em] uppercase text-[#9ca3af] mb-0.5">
                Comunidad
              </p>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-light tracking-tight text-[#1a2634]">
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
      </section>

      {/* Divider */}
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-[#e5e7eb] to-transparent" />
      </div>

      {/* How It Works */}
      <section className="px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-5">
            <p className="text-xs sm:text-sm font-light tracking-[0.15em] uppercase text-[#9ca3af] mb-0.5">
              Cómo funciona
            </p>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-light tracking-tight text-[#1a2634]">
              Crea stickers personalizados en segundos
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="text-center p-3">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#f3f4f6] flex items-center justify-center">
                <Palette className="w-4 h-4 text-[#1a2634]" strokeWidth={1.5} />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-[#1a2634] mb-1">Describe tu idea</h3>
              <p className="text-xs sm:text-sm font-light text-[#6b7280] leading-relaxed">
                Escribe lo que quieres: un gato con sombrero, un emoji, tu mascota.
              </p>
            </div>

            <div className="text-center p-3">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#f3f4f6] flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#1a2634]" strokeWidth={1.5} />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-[#1a2634] mb-1">IA genera el sticker</h3>
              <p className="text-xs sm:text-sm font-light text-[#6b7280] leading-relaxed">
                Nuestra IA crea una imagen única con fondo transparente.
              </p>
            </div>

            <div className="text-center p-3">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#f3f4f6] flex items-center justify-center">
                <Download className="w-4 h-4 text-[#1a2634]" strokeWidth={1.5} />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-[#1a2634] mb-1">Descarga gratis</h3>
              <p className="text-xs sm:text-sm font-light text-[#6b7280] leading-relaxed">
                Formato WebP optimizado. Sin marcas de agua.
              </p>
            </div>

            <div className="text-center p-3">
              <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#f3f4f6] flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-[#1a2634]" strokeWidth={1.5} />
              </div>
              <h3 className="text-xs sm:text-sm font-medium text-[#1a2634] mb-1">Úsalo en WhatsApp</h3>
              <p className="text-xs sm:text-sm font-light text-[#6b7280] leading-relaxed">
                Importa con Sticker Maker y comparte.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-[#e5e7eb] to-transparent" />
      </div>

      {/* FAQ Section */}
      <section className="px-4 sm:px-6 lg:px-12 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-5">
            <p className="text-xs sm:text-sm font-light tracking-[0.15em] uppercase text-[#9ca3af] mb-0.5">
              Preguntas frecuentes
            </p>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-light tracking-tight text-[#1a2634]">
              Todo sobre los stickers de WhatsApp
            </h2>
          </div>

          <div className="space-y-4">
            <div className="border-b border-[#e5e7eb] pb-4">
              <h3 className="text-sm sm:text-base font-medium text-[#1a2634] mb-1">¿Qué es un sticker de WhatsApp?</h3>
              <p className="text-xs sm:text-sm font-light text-[#6b7280] leading-relaxed">
                Los stickers son imágenes con fondo transparente que puedes enviar en tus conversaciones.
                Son más expresivos que los emojis. WhatsApp admite stickers en formato WebP de hasta 512x512 píxeles.
              </p>
            </div>

            <div className="border-b border-[#e5e7eb] pb-4">
              <h3 className="text-sm sm:text-base font-medium text-[#1a2634] mb-1">¿Cómo añado stickers a WhatsApp?</h3>
              <p className="text-xs sm:text-sm font-light text-[#6b7280] leading-relaxed">
                Descarga tu sticker, luego usa una app como Sticker Maker (iOS/Android) para importarlo.
                Crea un pack, añade las imágenes y pulsa "Añadir a WhatsApp".
              </p>
            </div>

            <div className="border-b border-[#e5e7eb] pb-4">
              <h3 className="text-sm sm:text-base font-medium text-[#1a2634] mb-1">¿Es realmente gratis?</h3>
              <p className="text-xs sm:text-sm font-light text-[#6b7280] leading-relaxed">
                Sí, StickerAI es completamente gratis. No necesitas registrarte, no hay límites y sin marcas de agua.
              </p>
            </div>

            <div className="border-b border-[#e5e7eb] pb-4">
              <h3 className="text-sm sm:text-base font-medium text-[#1a2634] mb-1">¿Qué tipo de stickers puedo crear?</h3>
              <p className="text-xs sm:text-sm font-light text-[#6b7280] leading-relaxed">
                Casi cualquier cosa: personajes, mascotas, memes, emojis personalizados, objetos, comida y más.
                Usa descripciones claras como "un gato naranja con gafas de sol".
              </p>
            </div>

            <div>
              <h3 className="text-sm sm:text-base font-medium text-[#1a2634] mb-1">¿Puedo usar los stickers comercialmente?</h3>
              <p className="text-xs sm:text-sm font-light text-[#6b7280] leading-relaxed">
                Los stickers son para uso personal. Para uso comercial, consulta nuestros{' '}
                <Link href="/terms" className="text-[#1a2634] underline hover:no-underline">términos de uso</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
