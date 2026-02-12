'use client'

import Image from 'next/image'
import Link from 'next/link'

const ONELINK_URL = 'https://repixelx.com/onelink'

export default function Footer() {
  return (
    <footer className="w-full max-w-md mx-auto px-4 mt-16 pb-8">
      <div className="text-center space-y-4">
        <p className="text-sm text-white font-medium">
          © {new Date().getFullYear()} Mera Halwai. All rights reserved.
        </p>
        <div className="space-y-3 pt-2 border-t border-gray-700">
          <div className="flex flex-col items-center gap-2">
            <Link
              href={ONELINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
            >
              <span>OneLink</span>
              <Image
                src="/gallery/onelink.png"
                alt="OneLink Logo"
                width={40}
                height={14}
                className="opacity-100"
                quality={100}
                priority
              />
              <span>— your business, one link away.</span>
            </Link>
            <Link
              href={ONELINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-zinc-400 hover:text-amber-400/90 underline underline-offset-2 decoration-zinc-500 hover:decoration-amber-400/70 transition-colors"
            >
              Create Your Own OneLink →
            </Link>
            <Link
              href={ONELINK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:opacity-90"
              style={{
                background: 'rgba(30, 30, 30, 0.8)',
                color: '#e0e0e0',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              Powered by RepixelX Studio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
