import { Sparkles, ArrowLeft, FileText, AlertTriangle, Scale, Ban, Download, Users } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Términos de Uso | StickerAI',
  description: 'Lee los términos y condiciones de uso de StickerAI. Conoce tus derechos y responsabilidades al usar nuestro generador de stickers con IA.',
}

export default function TermsPage() {
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
                <FileText className="w-6 h-6 text-[#1a2634]" strokeWidth={1.5} />
              </div>
              <p className="text-xs font-light tracking-[0.25em] uppercase text-[#9ca3af]">
                Documento Legal
              </p>
            </div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-[#1a2634] mb-4">
              Términos de Uso
            </h1>
            <p className="text-sm text-[#9ca3af]">
              Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-10">
            <p className="text-base font-light text-[#4b5563] leading-relaxed">
              Bienvenido a StickerAI. Al acceder y utilizar este sitio web y sus servicios, aceptas
              cumplir con estos términos de uso. Si no estás de acuerdo con alguna parte de estos
              términos, te pedimos que no utilices nuestro servicio.
            </p>
          </section>

          {/* Section 1 */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-5 h-5 text-[#6b7280]" strokeWidth={1.5} />
              <h2 className="text-xl font-normal text-[#1a2634]">1. Descripción del Servicio</h2>
            </div>
            <div className="pl-8 space-y-3 text-[#4b5563] font-light leading-relaxed">
              <p>StickerAI es una herramienta gratuita de generación de stickers que utiliza
              inteligencia artificial para crear imágenes basadas en descripciones de texto.
              El servicio permite:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Generar stickers personalizados mediante descripciones de texto</li>
                <li>Descargar los stickers generados para uso personal</li>
                <li>Visualizar stickers creados por otros usuarios en la galería comunitaria</li>
              </ul>
              <p className="mt-4">El servicio se proporciona "tal cual" y "según disponibilidad",
              sin garantías de ningún tipo.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-[#6b7280]" strokeWidth={1.5} />
              <h2 className="text-xl font-normal text-[#1a2634]">2. Uso Aceptable</h2>
            </div>
            <div className="pl-8 space-y-4 text-[#4b5563] font-light leading-relaxed">
              <p>Al utilizar StickerAI, te comprometes a:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Usar el servicio solo para fines legales y de acuerdo con estos términos</li>
                <li>No intentar eludir las medidas de seguridad o límites de uso</li>
                <li>No utilizar el servicio de manera que pueda dañar, deshabilitar o sobrecargar nuestros servidores</li>
                <li>No utilizar sistemas automatizados para acceder al servicio sin autorización</li>
                <li>Respetar los derechos de propiedad intelectual de terceros</li>
              </ul>
            </div>
          </section>

          {/* Section 3 - Prohibited Content */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Ban className="w-5 h-5 text-red-500" strokeWidth={1.5} />
              <h2 className="text-xl font-normal text-[#1a2634]">3. Contenido Prohibido</h2>
            </div>
            <div className="pl-8 space-y-4 text-[#4b5563] font-light leading-relaxed">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 font-medium mb-3">Está estrictamente prohibido generar contenido que:</p>
                <ul className="list-disc pl-5 space-y-2 text-red-700">
                  <li>Sea sexualmente explícito, pornográfico o de naturaleza adulta</li>
                  <li>Represente violencia gráfica, gore o contenido perturbador</li>
                  <li>Promueva el odio, discriminación o violencia contra individuos o grupos</li>
                  <li>Involucre la explotación o abuso de menores de cualquier forma</li>
                  <li>Infrinja derechos de autor, marcas registradas u otros derechos de propiedad intelectual</li>
                  <li>Sea difamatorio, acosador o amenazante</li>
                  <li>Promueva actividades ilegales o sustancias controladas</li>
                  <li>Contenga información personal de terceros sin su consentimiento</li>
                </ul>
              </div>
              <p>Nos reservamos el derecho de eliminar cualquier contenido que viole estas políticas
              y de restringir el acceso a usuarios que incumplan repetidamente estas normas.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Download className="w-5 h-5 text-[#6b7280]" strokeWidth={1.5} />
              <h2 className="text-xl font-normal text-[#1a2634]">4. Propiedad Intelectual y Licencia</h2>
            </div>
            <div className="pl-8 space-y-4 text-[#4b5563] font-light leading-relaxed">
              <div className="bg-white/50 border border-[#e5e7eb] rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-[#1a2634]">Contenido generado por el usuario</h3>
                <p>Los stickers que generas utilizando StickerAI son de tu propiedad y puedes usarlos
                libremente para fines personales y no comerciales. Al publicar un sticker en la galería
                comunitaria, otorgas a StickerAI una licencia no exclusiva para mostrar ese contenido.</p>
              </div>

              <div className="bg-white/50 border border-[#e5e7eb] rounded-lg p-4 space-y-3">
                <h3 className="font-medium text-[#1a2634]">Contenido del sitio</h3>
                <p>El diseño, logotipos, textos y otros elementos del sitio web de StickerAI están
                protegidos por derechos de autor y son propiedad de StickerAI o sus licenciantes.</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-medium text-amber-800 mb-2">Nota sobre IA generativa</h3>
                <p className="text-amber-700 text-sm">
                  Las imágenes son generadas por inteligencia artificial y pueden tener limitaciones
                  en cuanto a derechos de autor. Te recomendamos no usar los stickers generados para
                  fines comerciales sin verificar la originalidad del contenido.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-5 h-5 text-[#6b7280]" strokeWidth={1.5} />
              <h2 className="text-xl font-normal text-[#1a2634]">5. Limitación de Responsabilidad</h2>
            </div>
            <div className="pl-8 space-y-3 text-[#4b5563] font-light leading-relaxed">
              <p>En la máxima medida permitida por la ley aplicable:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>StickerAI no será responsable por daños directos, indirectos, incidentales,
                especiales o consecuentes que resulten del uso o la imposibilidad de usar el servicio</li>
                <li>No garantizamos que el servicio esté libre de errores, virus u otros componentes dañinos</li>
                <li>No somos responsables del contenido generado por usuarios ni de cómo otros usuarios
                utilicen los stickers disponibles en la galería</li>
                <li>El servicio puede experimentar interrupciones, mantenimiento o cambios sin previo aviso</li>
              </ul>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-10">
            <h2 className="text-xl font-normal text-[#1a2634] mb-4">6. Límites de Uso</h2>
            <div className="pl-0 space-y-3 text-[#4b5563] font-light leading-relaxed">
              <p>Para garantizar un servicio justo para todos los usuarios, implementamos límites de uso:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Máximo de 5 generaciones de stickers cada 10 minutos por usuario</li>
                <li>Los prompts deben tener entre 3 y 200 caracteres</li>
                <li>Los stickers se almacenan durante un máximo de 30 días</li>
              </ul>
              <p>Nos reservamos el derecho de modificar estos límites en cualquier momento para
              mantener la calidad del servicio.</p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-10">
            <h2 className="text-xl font-normal text-[#1a2634] mb-4">7. Modificaciones del Servicio y Términos</h2>
            <div className="pl-0 text-[#4b5563] font-light leading-relaxed">
              <p>Nos reservamos el derecho de modificar o discontinuar el servicio (o cualquier parte
              del mismo) temporal o permanentemente, con o sin previo aviso. También podemos actualizar
              estos términos de uso en cualquier momento. El uso continuado del servicio después de
              cualquier cambio constituye tu aceptación de los nuevos términos.</p>
            </div>
          </section>

          {/* Section 8 */}
          <section className="mb-10">
            <h2 className="text-xl font-normal text-[#1a2634] mb-4">8. Ley Aplicable</h2>
            <div className="pl-0 text-[#4b5563] font-light leading-relaxed">
              <p>Estos términos se regirán e interpretarán de acuerdo con las leyes aplicables,
              sin tener en cuenta sus disposiciones sobre conflictos de leyes. Cualquier disputa
              relacionada con estos términos se resolverá en los tribunales competentes.</p>
            </div>
          </section>

          {/* Section 9 */}
          <section className="mb-10">
            <h2 className="text-xl font-normal text-[#1a2634] mb-4">9. Contacto</h2>
            <div className="pl-0 text-[#4b5563] font-light leading-relaxed">
              <p>Si tienes preguntas sobre estos términos de uso, puedes contactarnos a través de
              nuestra página de <Link href="/about" className="text-[#1a2634] underline hover:no-underline">Acerca de</Link>.</p>
            </div>
          </section>

          {/* Acceptance notice */}
          <section className="mt-12 p-6 bg-[#1a2634]/5 border border-[#1a2634]/10 rounded-xl">
            <p className="text-[#4b5563] font-light text-center">
              Al utilizar StickerAI, confirmas que has leído, entendido y aceptado estos términos de uso.
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  )
}
