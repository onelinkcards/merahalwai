'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const MERA_HALWAI_INSTAGRAM = 'https://www.instagram.com/merahalwai/'
const MERA_HALWAI_CONTACT = 'https://www.merahalwai.com/contact'

const PRIMARY = '#EB8B23'
const SECONDARY = '#8A3E1D'

export default function SocialConnect() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-md mx-auto px-4 mt-16"
    >
      <div className="bg-white rounded-3xl p-6 shadow-lg text-center border-2" style={{ borderColor: 'rgba(138,62,29,0.2)' }}>
        {/* Two small logos side by side - Mera Halwai | Instagram - with border */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shadow-md overflow-hidden border-2 flex-shrink-0 bg-white"
            style={{ borderColor: 'rgba(138,62,29,0.25)' }}
          >
            <Image
              src="/merahalwailogo.png"
              alt="Mera Halwai"
              width={64}
              height={64}
              className="w-full h-full object-contain"
            />
          </div>
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-md overflow-hidden border-2 border-white bg-white flex-shrink-0"
            style={{ borderColor: 'rgba(138,62,29,0.2)' }}
          >
            <Image
              src="/social.png"
              alt="Instagram"
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-3">
          <motion.button
            onClick={() => window.open(MERA_HALWAI_INSTAGRAM, '_blank', 'noopener,noreferrer')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-white font-semibold rounded-2xl h-12 px-6 shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 border-2"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #EC4899 50%, #F97316 100%)',
              borderColor: 'rgba(139,92,246,0.3)',
              boxShadow: '0 4px 14px rgba(139,92,246,0.25), 0 2px 6px rgba(236,72,153,0.2)',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" style={{ filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))' }}>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span className="text-[15px] font-semibold tracking-tight">Follow us on Instagram</span>
          </motion.button>

          <motion.a
            href={MERA_HALWAI_CONTACT}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-white font-semibold rounded-2xl h-12 px-6 shadow-lg transition-all duration-200 flex items-center justify-center gap-2.5 border-2"
            style={{
              backgroundColor: SECONDARY,
              borderColor: 'rgba(138,62,29,0.5)',
              boxShadow: `0 4px 14px ${SECONDARY}99, 0 2px 6px rgba(0,0,0,0.1)`,
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <span className="text-[15px] font-semibold tracking-tight">Get in touch — Mera Halwai</span>
          </motion.a>
        </div>
      </div>
    </motion.section>
  )
}
