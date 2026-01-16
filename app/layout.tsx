import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'StickerAI - Genera Stickers de WhatsApp con IA',
  description: 'Crea stickers únicos para WhatsApp usando inteligencia artificial. Gratis, sin registro, descarga al instante.',
  keywords: ['stickers', 'whatsapp', 'ai', 'generator', 'free', 'gratis'],
  openGraph: {
    title: 'StickerAI - Genera Stickers de WhatsApp con IA',
    description: 'Crea stickers únicos para WhatsApp usando inteligencia artificial. Gratis.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.variable} font-sans antialiased`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
