import { Sparkles, ArrowLeft, Shield, Eye, Database, Cookie, Mail } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Política de Privacidad | StickerAI',
  description: 'Conoce cómo StickerAI protege tu privacidad. No recopilamos datos personales. Tu información está segura con nosotros.',
}

export default function PrivacyPage() {
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
          Volver
        </Link>
      </header>

      {/* Content */}
      <main className="flex-1 px-4 sm:px-6 lg:px-12 py-12">
        <article className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#1a2634]/5 rounded-lg">
                <Shield className="w-6 h-6 text-[#1a2634]" strokeWidth={1.5} />
              </div>
              <p className="text-xs font-light tracking-[0.25em] uppercase text-[#9ca3af]">
                Documento Legal
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-[#1a2634] mb-4">
              Política de Privacidad
            </h1>
            <p className="text-sm text-[#9ca3af]">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <p className="text-base font-light text-[#4b5563] leading-relaxed">
              En StickerAI, valoramos y respetamos tu privacidad. Esta política describe qué información
              recopilamos (o más bien, qué <strong>no</strong> recopilamos), cómo utilizamos los datos
              necesarios para el funcionamiento del servicio, y cómo protegemos tu información.
            </p>
          </section>

          {/* Section 1 */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5 text-[#6b7280]" strokeWidth={1.5} />
              <h2 className="text-xl font-normal text-[#1a2634]">1. Información que NO Recopilamos</h2>
            </div>
            <div className="pl-8 space-y-3 text-[#4b5563] font-light leading-relaxed">
              <p>StickerAI está diseñado con la privacidad como prioridad. <strong>No recopilamos:</strong></p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Nombres, direcciones de correo electrónico o información de contacto</li>
                <li>Información de cuentas de usuario (no requerimos registro)</li>
                <li>Datos de ubicación o geolocalización</li>
                <li>Historial de navegación fuera de nuestra aplicación</li>
                <li>Información de pago o financiera</li>
                <li>Datos biométricos o identificadores únicos de dispositivos</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-5 h-5 text-[#6b7280]" strokeWidth={1.5} />
              <h2 className="text-xl font-normal text-[#1a2634]">2. Información que Procesamos</h2>
            </div>
            <div className="pl-8 space-y-4 text-[#4b5563] font-light leading-relaxed">
              <p>Para proporcionar nuestro servicio de generación de stickers, procesamos temporalmente:</p>

              <div className="bg-white/50 border border-[#e5e7eb] rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-[#1a2634]">Prompts de texto</h3>
                <p>Las descripciones que escribes para generar stickers se envían a nuestra API de
                inteligencia artificial para crear las imágenes. Estos textos se almacenan temporalmente
                junto con los stickers generados para mostrarlos en la galería comunitaria.</p>
              </div>

              <div className="bg-white/50 border border-[#e5e7eb] rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-[#1a2634]">Imágenes generadas</h3>
                <p>Los stickers creados se almacenan temporalmente en nuestros servidores para permitir
                su descarga y visualización en la galería. <strong>Todas las imágenes se eliminan
                automáticamente después de 30 días.</strong></p>
              </div>

              <div className="bg-white/50 border border-[#e5e7eb] rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-[#1a2634]">Datos técnicos anónimos</h3>
                <p>Recopilamos información técnica básica y anónima como el tipo de navegador y
                estadísticas de uso agregadas para mejorar el rendimiento del servicio.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-5 h-5 text-[#6b7280]" strokeWidth={1.5} />
              <h2 className="text-xl font-normal text-[#1a2634]">3. Cookies y Publicidad</h2>
            </div>
            <div className="pl-8 space-y-4 text-[#4b5563] font-light leading-relaxed">
              <p>Utilizamos cookies esenciales para el funcionamiento básico del sitio y cookies de
              terceros para mostrar publicidad a través de Google AdSense.</p>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-medium text-amber-800 mb-2">Google AdSense</h3>
                <p className="text-amber-700 text-sm">
                  Google puede utilizar cookies para mostrar anuncios basados en visitas anteriores
                  a este u otros sitios web. Puedes gestionar tus preferencias de anuncios personalizados
                  visitando la <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer"
                  className="underline hover:no-underline">configuración de anuncios de Google</a>.
                </p>
              </div>

              <p>Puedes configurar tu navegador para rechazar todas las cookies o para que te avise
              cuando se envía una cookie. Sin embargo, algunas funciones del sitio pueden no funcionar
              correctamente sin cookies.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <h2 className="text-xl font-normal text-[#1a2634] mb-4">4. Seguridad de los Datos</h2>
            <div className="pl-0 space-y-3 text-[#4b5563] font-light leading-relaxed">
              <p>Implementamos medidas de seguridad técnicas y organizativas para proteger la información
              que procesamos, incluyendo:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Conexiones cifradas mediante HTTPS</li>
                <li>Filtros de contenido para prevenir la generación de material inapropiado</li>
                <li>Límites de uso para prevenir abusos del servicio</li>
                <li>Eliminación automática de datos después de 30 días</li>
              </ul>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <h2 className="text-xl font-normal text-[#1a2634] mb-4">5. Tus Derechos</h2>
            <div className="pl-0 space-y-3 text-[#4b5563] font-light leading-relaxed">
              <p>Dado que no recopilamos datos personales identificables, la mayoría de los derechos
              de protección de datos (acceso, rectificación, eliminación) no aplican directamente.
              Sin embargo, tienes derecho a:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>No utilizar el servicio si no estás de acuerdo con esta política</li>
                <li>Configurar tu navegador para gestionar cookies</li>
                <li>Contactarnos para cualquier pregunta sobre privacidad</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-xl font-normal text-[#1a2634] mb-4">6. Menores de Edad</h2>
            <div className="pl-0 text-[#4b5563] font-light leading-relaxed">
              <p>StickerAI no está dirigido a menores de 13 años. No recopilamos conscientemente
              información de niños menores de 13 años. Si eres padre o tutor y crees que tu hijo
              nos ha proporcionado información, contáctanos para que podamos tomar las medidas necesarias.</p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="text-xl font-normal text-[#1a2634] mb-4">7. Cambios en esta Política</h2>
            <div className="pl-0 text-[#4b5563] font-light leading-relaxed">
              <p>Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos
              cualquier cambio publicando la nueva política en esta página y actualizando la fecha
              de "última actualización".</p>
            </div>
          </section>

          {/* Contact */}
          <section className="mt-12 p-6 bg-white/50 border border-[#e5e7eb] rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-[#1a2634]" strokeWidth={1.5} />
              <h2 className="text-lg font-normal text-[#1a2634]">Contacto</h2>
            </div>
            <p className="text-[#4b5563] font-light">
              Si tienes preguntas sobre esta política de privacidad o sobre cómo manejamos tus datos,
              puedes contactarnos a través de nuestra página de <Link href="/about" className="text-[#1a2634] underline hover:no-underline">Acerca de</Link>.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  )
}
