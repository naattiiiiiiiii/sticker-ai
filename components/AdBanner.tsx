'use client'

import { Sparkles } from 'lucide-react'

interface AdBannerProps {
  slot: string
  format?: 'horizontal' | 'vertical' | 'rectangle'
  className?: string
}

// Set your AdSense Publisher ID here or in NEXT_PUBLIC_ADSENSE_ID env var
const ADSENSE_PUBLISHER_ID = process.env.NEXT_PUBLIC_ADSENSE_ID || ''

export function AdBanner({ format = 'horizontal', className = '' }: AdBannerProps) {
  // If no AdSense configured, show promotional banner instead
  if (!ADSENSE_PUBLISHER_ID) {
    if (format === 'vertical') {
      // Don't show anything for vertical ads when no AdSense
      return null
    }

    // Show a subtle promotional message
    return (
      <div className={`${className} mx-auto max-w-xl`}>
        <div className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#faf8f5] to-[#f0ede8] border border-[#e5e7eb]">
          <Sparkles className="w-4 h-4 text-[#9ca3af]" strokeWidth={1.5} />
          <p className="text-xs font-light text-[#9ca3af]">
            Crea stickers gratis con IA en{' '}
            <span className="text-[#1a2634] font-normal">stickerai.is-a.dev</span>
          </p>
        </div>
      </div>
    )
  }

  // Show real AdSense ads when configured
  return (
    <div className={`${className} mx-auto`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
