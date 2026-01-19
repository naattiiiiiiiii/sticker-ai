import { Sparkles, ArrowLeft, Heart, Zap, Shield, HelpCircle, Mail, MessageSquare, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Acerca de StickerAI | Generador de Stickers con IA',
  description: 'Conoce StickerAI, la herramienta gratuita para crear stickers personalizados con inteligencia artificial. Preguntas frecuentes y contacto.',
}

const faqs = [
  {
    question: '¿Qué es StickerAI?',
    answer: 'StickerAI es una herramienta gratuita que utiliza inteligencia artificial para generar stickers personalizados a partir de descripciones de texto. Simplemente describe lo que quieres ver y nuestra IA creará un sticker único para ti.'
  },
  {
    question: '¿Es realmente gratis?',
    answer: 'Sí, StickerAI es 100% gratuito. No requiere registro, no hay planes de pago y puedes generar stickers ilimitados. El servicio se mantiene mediante publicidad no intrusiva.'
  },
  {
    question: '¿Necesito crear una cuenta?',
    answer: 'No, no necesitas crear ninguna cuenta ni registrarte. Puedes empezar a crear stickers inmediatamente sin proporcionar ningún dato personal.'
  },
  {
    question: '¿Cómo funciona la generación de stickers?',
    answer: 'Utilizamos tecnología de IA generativa avanzada. Cuando escribes una descripción, nuestra IA interpreta tu texto y genera una imagen única en formato de sticker con fondo transparente, optimizada para usar en WhatsApp y otras aplicaciones de mensajería.'
  },
  {
    question: '¿Puedo usar los stickers comercialmente?',
    answer: 'Los stickers generados están destinados principalmente para uso personal. Si deseas usarlos comercialmente, te recomendamos verificar que no infrinjan derechos de terceros, ya que las imágenes generadas por IA pueden tener limitaciones legales.'
  },
  {
    question: '¿Por qué hay un límite de generaciones?',
    answer: 'Implementamos un límite de 5 generaciones cada 10 minutos para garantizar que todos los usuarios puedan disfrutar del servicio de manera equitativa y para prevenir abusos que podrían afectar la calidad del servicio.'
  },
  {
    question: '¿Cuánto tiempo se guardan mis stickers?',
    answer: 'Los stickers generados se almacenan durante 30 días en nuestra galería comunitaria. Después de este período, se eliminan automáticamente. Te recomendamos descargar los stickers que quieras conservar.'
  },
  {
    question: '¿Qué tipo de contenido puedo crear?',
    answer: 'Puedes crear casi cualquier tipo de sticker, siempre que respete nuestras políticas de uso. No está permitido generar contenido para adultos, violento, que incite al odio, o que infrinja derechos de autor.'
  },
  {
    question: '¿Por qué mi prompt fue rechazado?',
    answer: 'Tenemos un filtro de contenido que bloquea automáticamente prompts que podrían generar contenido inapropiado. Si tu prompt fue rechazado y crees que es un error, intenta reformularlo de manera diferente.'
  },
  {
    question: '¿Cómo uso los stickers en WhatsApp?',
    answer: 'Después de descargar el sticker, puedes agregarlo a WhatsApp usando aplicaciones como "Sticker Maker" o "Personal Stickers for WhatsApp" disponibles en las tiendas de aplicaciones. Estas apps te permiten crear packs de stickers personalizados.'
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-12 py-4 flex items-center justify-between max-w-6xl mx-auto w-full">
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

      {/* Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-[#1a2634]/5 rounded-2xl mb-6">
              <Sparkles className="w-8 h-8 text-[#1a2634]" strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#1a2634] mb-4">
              Acerca de StickerAI
            </h1>
            <p className="text-lg font-light text-[#6b7280] max-w-2xl mx-auto leading-relaxed">
              Tu herramienta gratuita para crear stickers únicos con inteligencia artificial.
              Sin registro, sin complicaciones, sin límites.
            </p>
          </section>

          {/* Features */}
          <section className="grid sm:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/50 border border-[#e5e7eb] rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-lg mb-4">
                <Zap className="w-5 h-5 text-green-600" strokeWidth={1.5} />
              </div>
              <h3 className="font-medium text-[#1a2634] mb-2">Rápido y Simple</h3>
              <p className="text-sm font-light text-[#6b7280]">
                Describe tu idea y obtén un sticker en segundos. Sin pasos complicados.
              </p>
            </div>

            <div className="bg-white/50 border border-[#e5e7eb] rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-lg mb-4">
                <Heart className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
              </div>
              <h3 className="font-medium text-[#1a2634] mb-2">100% Gratuito</h3>
              <p className="text-sm font-light text-[#6b7280]">
                Sin costos ocultos, sin planes premium. Gratis para siempre.
              </p>
            </div>

            <div className="bg-white/50 border border-[#e5e7eb] rounded-xl p-6 text-center">
              <div className="inline-flex items-center justify-center p-2 bg-purple-100 rounded-lg mb-4">
                <Shield className="w-5 h-5 text-purple-600" strokeWidth={1.5} />
              </div>
              <h3 className="font-medium text-[#1a2634] mb-2">Sin Registro</h3>
              <p className="text-sm font-light text-[#6b7280]">
                Respetamos tu privacidad. No necesitas crear cuenta ni dar datos personales.
              </p>
            </div>
          </section>

          {/* Our Mission */}
          <section className="mb-16">
            <h2 className="text-2xl font-light text-[#1a2634] mb-6 text-center">Nuestra Misión</h2>
            <div className="bg-white/50 border border-[#e5e7eb] rounded-xl p-8">
              <p className="text-[#4b5563] font-light leading-relaxed text-center max-w-2xl mx-auto">
                Creemos que la creatividad debe ser accesible para todos. Por eso creamos StickerAI:
                una herramienta que permite a cualquier persona expresarse a través de stickers personalizados,
                sin barreras técnicas ni económicas. Nuestra IA está entrenada para convertir tus ideas
                en imágenes únicas que puedes compartir con amigos y familia.
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <div className="flex items-center justify-center gap-3 mb-8">
              <HelpCircle className="w-6 h-6 text-[#1a2634]" strokeWidth={1.5} />
              <h2 className="text-2xl font-light text-[#1a2634]">Preguntas Frecuentes</h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details
                  key={index}
                  className="group bg-white/50 border border-[#e5e7eb] rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-5 cursor-pointer list-none">
                    <span className="font-medium text-[#1a2634] pr-4">{faq.question}</span>
                    <ChevronDown className="w-5 h-5 text-[#9ca3af] group-open:rotate-180 transition-transform flex-shrink-0" strokeWidth={1.5} />
                  </summary>
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-[#4b5563] font-light leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section className="mb-8">
            <div className="bg-[#1a2634] rounded-2xl p-8 sm:p-10 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-xl mb-6">
                <MessageSquare className="w-6 h-6 text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-2xl font-light text-white mb-4">¿Tienes preguntas?</h2>
              <p className="text-white/70 font-light mb-6 max-w-md mx-auto">
                Si tienes dudas, sugerencias o encuentras algún problema, nos encantaría escucharte.
              </p>
              <div className="flex items-center justify-center gap-2 text-white/90">
                <Mail className="w-5 h-5" strokeWidth={1.5} />
                <a
                  href="mailto:contacto@stickerai.app"
                  className="font-light hover:text-white transition-colors"
                >
                  contacto@stickerai.app
                </a>
              </div>
            </div>
          </section>

          {/* Legal Links */}
          <section className="text-center">
            <p className="text-sm text-[#9ca3af] font-light mb-4">
              Al usar StickerAI, aceptas nuestros términos y políticas:
            </p>
            <div className="flex items-center justify-center gap-6">
              <Link
                href="/privacy"
                className="text-sm text-[#6b7280] hover:text-[#1a2634] transition-colors underline"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/terms"
                className="text-sm text-[#6b7280] hover:text-[#1a2634] transition-colors underline"
              >
                Términos de Uso
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
