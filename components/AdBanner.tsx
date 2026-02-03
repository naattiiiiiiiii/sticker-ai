'use client'

import { useEffect, useState } from 'react'

interface AdBannerProps {
  slot: string
  format?: 'horizontal' | 'vertical' | 'rectangle'
  className?: string
}

// AdSense Publisher ID
const ADSENSE_PUBLISHER_ID = 'ca-pub-3128901609046162'

// Set to true when AdSense is approved and working
const ADSENSE_APPROVED = false

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export function AdBanner({ slot, format = 'horizontal', className = '' }: AdBannerProps) {
  const [adLoaded, setAdLoaded] = useState(false)

  useEffect(() => {
    if (!ADSENSE_APPROVED) return

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({})
      const timer = setTimeout(() => {
        const adElement = document.querySelector(`ins[data-ad-slot="${slot}"]`)
        if (adElement && adElement.getAttribute('data-ad-status') === 'filled') {
          setAdLoaded(true)
        }
      }, 1000)
      return () => clearTimeout(timer)
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [slot])

  // Show placeholder when AdSense is not approved yet
  if (!ADSENSE_APPROVED) {
    return (
      <div className={`${className} mx-auto`}>
        <div className="w-full h-[90px] bg-[#f3f4f6] rounded-lg flex items-center justify-center border border-dashed border-[#e5e7eb]">
          <span className="text-xs text-[#9ca3af] font-light">Espacio publicitario</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`${className} mx-auto overflow-hidden transition-all duration-300 ${adLoaded ? '' : 'min-h-0'}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: 0 }}
        data-ad-client={ADSENSE_PUBLISHER_ID}
        data-ad-slot={slot}
        data-ad-format={format === 'vertical' ? 'vertical' : 'auto'}
        data-full-width-responsive="true"
      />
    </div>
  )
}
