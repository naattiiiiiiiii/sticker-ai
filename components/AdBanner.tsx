'use client'

interface AdBannerProps {
  slot: string // ID del slot de AdSense
  format?: 'horizontal' | 'vertical' | 'rectangle'
  className?: string
}

// En desarrollo mostramos un placeholder
// En producción se reemplaza con el código real de AdSense
const isDev = process.env.NODE_ENV === 'development'

export function AdBanner({ slot, format = 'horizontal', className = '' }: AdBannerProps) {
  // Dimensiones según formato
  const dimensions = {
    horizontal: 'h-[90px] w-full max-w-[728px]', // Leaderboard 728x90
    vertical: 'w-[160px] h-[600px]', // Wide Skyscraper 160x600
    rectangle: 'w-[300px] h-[250px]', // Medium Rectangle 300x250
  }

  if (isDev) {
    // Placeholder para desarrollo
    return (
      <div
        className={`${dimensions[format]} ${className}
          bg-gradient-to-br from-gray-100 to-gray-200
          border border-dashed border-gray-300 rounded-lg
          flex items-center justify-center text-gray-400 text-xs
          mx-auto`}
      >
        <div className="text-center">
          <p className="font-medium">Espacio publicitario</p>
          <p className="text-[10px] mt-1">
            {format === 'horizontal' && '728 x 90'}
            {format === 'vertical' && '160 x 600'}
            {format === 'rectangle' && '300 x 250'}
          </p>
        </div>
      </div>
    )
  }

  // Código real de AdSense para producción
  return (
    <div className={`${className} mx-auto`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXX" // Tu ID de publisher
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: '(adsbygoogle = window.adsbygoogle || []).push({});',
        }}
      />
    </div>
  )
}
