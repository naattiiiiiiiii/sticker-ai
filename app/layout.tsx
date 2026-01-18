import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  other: {
    'google-adsense-account': 'ca-pub-3128901609046162',
  },
  title: 'StickerAI - Crea Stickers para WhatsApp con IA Gratis',
  description: 'Genera stickers personalizados para WhatsApp con inteligencia artificial. 100% gratis, sin registro, sin límites. Describe tu idea y descarga tu sticker en segundos.',
  keywords: ['stickers whatsapp', 'crear stickers', 'stickers ia', 'stickers gratis', 'generador stickers', 'whatsapp stickers', 'ai sticker maker', 'stickers personalizados'],
  authors: [{ name: 'StickerAI' }],
  creator: 'StickerAI',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'StickerAI - Crea Stickers para WhatsApp con IA',
    description: 'Genera stickers personalizados con inteligencia artificial. 100% gratis, sin registro.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'StickerAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StickerAI - Stickers con IA para WhatsApp',
    description: 'Crea stickers únicos con IA. Gratis y sin registro.',
  },
  alternates: {
    canonical: 'https://sticker-ai-natalia-s-projects-29dfd446.vercel.app',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3128901609046162"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
