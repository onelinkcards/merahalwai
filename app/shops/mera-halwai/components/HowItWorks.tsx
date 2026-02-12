'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const SECONDARY = '#8A3E1D'

export default function HowItWorks() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-md mx-auto px-4 mt-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1], delay: 0.05 }}
        className="text-left mb-4"
      >
        <h2
          className="text-2xl sm:text-3xl font-bold tracking-tight mb-4"
          style={{ color: '#fff', letterSpacing: '-0.02em' }}
        >
          How It Works
        </h2>
        <p className="text-sm text-white/65 tracking-wide mb-6">
          Simple steps to plan your celebration effortlessly.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        className="relative w-full rounded-2xl overflow-hidden bg-white p-6 border-2 min-h-[320px] flex items-center justify-center"
        style={{ borderColor: 'rgba(138,62,29,0.2)' }}
      >
        <div className="w-[88%] max-w-[360px] mx-auto">
          <Image
            src="/Groups%208321.png"
            alt="How it works: Get started in seconds, Explore menus and vendors, Book or join an order"
            width={360}
            height={484}
            className="w-full h-auto object-contain"
            sizes="(max-width: 448px) 88vw, 360px"
            priority={false}
          />
        </div>
      </motion.div>

      {/* Two buttons after How It Works - #8A3E1D */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.15 }}
        className="mt-6 flex flex-col sm:flex-row gap-3"
      >
        <motion.a
          href="https://www.merahalwai.com/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 rounded-xl flex items-center justify-center py-3.5 px-6 font-bold text-white text-sm transition-all min-h-[48px]"
          style={{
            backgroundColor: SECONDARY,
            boxShadow: `0 4px 16px ${SECONDARY}66`,
          }}
        >
          Start Planning
        </motion.a>
        <motion.a
          href="https://www.merahalwai.com/app"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 rounded-xl flex items-center justify-center py-3.5 px-6 font-bold text-sm transition-all min-h-[48px] border-2"
          style={{
            borderColor: 'rgba(138,62,29,0.25)',
            color: SECONDARY,
            backgroundColor: '#fff',
            boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
          }}
        >
          Download App
        </motion.a>
      </motion.div>
    </motion.section>
  )
}
