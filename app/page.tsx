import { StickerGenerator } from '@/components/StickerGenerator'
import { StickerGrid } from '@/components/StickerGrid'
import { AdBanner } from '@/components/AdBanner'
import { Footer } from '@/components/Footer'
import { Sparkles, ArrowRight, Download, MessageCircle, Palette, Zap } from 'lucide-react'
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

      {/* Divider */}
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-[#e5e7eb] to-transparent" />
      </div>

      {/* Gallery Section */}
      <section className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
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
      </section>

      {/* Divider */}
      <div className="px-4 sm:px-6 lg:px-12">
        <div className="max-w-5xl mx-auto h-px bg-gradient-to-r from-transparent via-[#e5e7eb] to-transparent" />
      </div>

      {/* How It Works - Editorial Content */}
      <section className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] sm:text-xs font-light tracking-[0.2em] uppercase text-[#9ca3af] mb-2">
              Cómo funciona
            </p>
            <h2 className="text-xl sm:text-2xl font-light tracking-tight text-[#1a2634]">
              Crea stickers personalizados en segundos
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#f3f4f6] flex items-center justify-center">
                <Palette className="w-5 h-5 text-[#1a2634]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-medium text-[#1a2634] mb-2">Describe tu idea</h3>
              <p className="text-xs font-light text-[#6b7280] leading-relaxed">
                Escribe una descripción de lo que quieres. Puede ser cualquier cosa: un gato con sombrero, un emoji personalizado, tu mascota favorita.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#f3f4f6] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#1a2634]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-medium text-[#1a2634] mb-2">IA genera el sticker</h3>
              <p className="text-xs font-light text-[#6b7280] leading-relaxed">
                Nuestra inteligencia artificial procesa tu descripción y crea una imagen única con fondo transparente lista para usar como sticker.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#f3f4f6] flex items-center justify-center">
                <Download className="w-5 h-5 text-[#1a2634]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-medium text-[#1a2634] mb-2">Descarga gratis</h3>
              <p className="text-xs font-light text-[#6b7280] leading-relaxed">
                Descarga tu sticker en formato WebP optimizado para WhatsApp. Sin marcas de agua, sin límites, completamente gratis.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#f3f4f6] flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#1a2634]" strokeWidth={1.5} />
              </div>
              <h3 className="text-sm font-medium text-[#1a2634] mb-2">Úsalo en WhatsApp</h3>
              <p className="text-xs font-light text-[#6b7280] leading-relaxed">
                Importa el sticker a WhatsApp usando Sticker Maker u otra app similar. Comparte tus creaciones únicas con amigos y familia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Banner - After editorial content */}
      <section className="px-4 sm:px-6 lg:px-12 pb-8">
        <AdBanner slot="1234567890" format="horizontal" />
      </section>

      {/* FAQ Section - More Editorial Content */}
      <section className="px-4 sm:px-6 lg:px-12 py-12 sm:py-16 bg-white/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-[10px] sm:text-xs font-light tracking-[0.2em] uppercase text-[#9ca3af] mb-2">
              Preguntas frecuentes
            </p>
            <h2 className="text-xl sm:text-2xl font-light tracking-tight text-[#1a2634]">
              Todo sobre los stickers de WhatsApp
            </h2>
          </div>

          <div className="space-y-6">
            <div className="border-b border-[#e5e7eb] pb-6">
              <h3 className="text-sm font-medium text-[#1a2634] mb-2">¿Qué es un sticker de WhatsApp?</h3>
              <p className="text-sm font-light text-[#6b7280] leading-relaxed">
                Los stickers de WhatsApp son imágenes con fondo transparente que puedes enviar en tus conversaciones.
                Son más expresivos que los emojis tradicionales y te permiten personalizar tus chats con imágenes únicas.
                WhatsApp admite stickers en formato WebP de hasta 512x512 píxeles.
              </p>
            </div>

            <div className="border-b border-[#e5e7eb] pb-6">
              <h3 className="text-sm font-medium text-[#1a2634] mb-2">¿Cómo añado stickers a WhatsApp?</h3>
              <p className="text-sm font-light text-[#6b7280] leading-relaxed">
                Después de descargar tu sticker, necesitas una app como Sticker Maker (disponible en iOS y Android)
                para importarlo a WhatsApp. Abre la app, crea un nuevo pack de stickers, añade las imágenes descargadas
                y pulsa "Añadir a WhatsApp". Tus stickers aparecerán en la sección de stickers de WhatsApp.
              </p>
            </div>

            <div className="border-b border-[#e5e7eb] pb-6">
              <h3 className="text-sm font-medium text-[#1a2634] mb-2">¿Es realmente gratis?</h3>
              <p className="text-sm font-light text-[#6b7280] leading-relaxed">
                Sí, StickerAI es completamente gratis. No necesitas registrarte, no hay límites de uso y los stickers
                no tienen marcas de agua. Puedes crear tantos stickers como quieras sin ningún costo.
              </p>
            </div>

            <div className="border-b border-[#e5e7eb] pb-6">
              <h3 className="text-sm font-medium text-[#1a2634] mb-2">¿Qué tipo de stickers puedo crear?</h3>
              <p className="text-sm font-light text-[#6b7280] leading-relaxed">
                Puedes crear casi cualquier tipo de sticker: personajes de dibujos animados, mascotas, memes,
                emojis personalizados, objetos, comida, y mucho más. La IA funciona mejor con descripciones
                claras y específicas. Por ejemplo, "un gato naranja con gafas de sol" dará mejores resultados
                que simplemente "un gato".
              </p>
            </div>

            <div className="pb-6">
              <h3 className="text-sm font-medium text-[#1a2634] mb-2">¿Puedo usar los stickers comercialmente?</h3>
              <p className="text-sm font-light text-[#6b7280] leading-relaxed">
                Los stickers generados son para uso personal. Si deseas usar las imágenes con fines comerciales,
                consulta nuestros <Link href="/terms" className="text-[#1a2634] underline hover:no-underline">términos de uso</Link> para
                más información sobre licencias y restricciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Second Ad Banner - After FAQ content */}
      <section className="px-4 sm:px-6 lg:px-12 py-8">
        <AdBanner slot="0987654321" format="horizontal" />
      </section>

      <Footer />
    </div>
  )
}
