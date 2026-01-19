'use client'

import { Sparkles } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="px-4 sm:px-6 lg:px-12 py-8 border-t border-[#e5e7eb] bg-[#faf8f5]">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#9ca3af]" strokeWidth={1.5} />
            <span className="text-sm font-light text-[#9ca3af]">StickerAI</span>
          </div>
          <p className="text-xs font-light text-[#9ca3af]">
            Gratis · Sin registro · Sin límites
          </p>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 border-t border-[#e5e7eb]/50">
          <Link
            href="/about"
            className="text-xs font-light text-[#9ca3af] hover:text-[#6b7280] transition-colors"
          >
            Acerca de
          </Link>
          <Link
            href="/privacy"
            className="text-xs font-light text-[#9ca3af] hover:text-[#6b7280] transition-colors"
          >
            Política de Privacidad
          </Link>
          <Link
            href="/terms"
            className="text-xs font-light text-[#9ca3af] hover:text-[#6b7280] transition-colors"
          >
            Términos de Uso
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-[10px] text-center text-[#c0c4c8] mt-4">
          © {new Date().getFullYear()} StickerAI. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
