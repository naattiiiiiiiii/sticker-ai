'use client'

import { useEffect } from 'react'

interface AdBannerProps {
  slot: string
  format?: 'horizontal' | 'vertical' | 'rectangle'
  className?: string
}

// AdSense Publisher ID
const ADSENSE_PUBLISHER_ID = 'ca-pub-3128901609046162'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export function AdBanner({ slot, format = 'horizontal', className = '' }: AdBannerProps) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  return (
    <div className={`${className} mx-auto`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format === 'vertical' ? 'vertical' : 'auto'}
        data-full-width-responsive="true"
      />
    </div>
  )
}
