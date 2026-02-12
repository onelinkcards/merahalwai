'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const PRIMARY = '#EB8B23'

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#000000',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: '100vh',
        width: '100vw'
      }}
    >
      <div className="flex flex-col items-center" style={{ transform: 'translateY(-10%)' }}>
        {/* Square Frame with Logo and Scanning Animation */}
        <div className="relative mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="w-40 h-40 bg-white rounded-xl shadow-2xl flex items-center justify-center overflow-hidden border-2 border-slate-200 relative"
          >
            <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center shadow-xl overflow-hidden">
              <Image
                src="/merahalwailogo.png"
                alt="Mera Halwai"
                width={144}
                height={144}
                className="w-full h-full object-cover"
                priority
                quality={95}
                style={{ transform: 'scale(1.2)' }}
              />
            </div>

            {/* Scanning Line */}
            <motion.div
              className="absolute inset-0 w-full h-[2px] pointer-events-none"
              initial={{ top: 0 }}
              animate={{ top: '100%' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
                repeatDelay: 0.3
              }}
              style={{
                background: `linear-gradient(90deg, transparent, ${PRIMARY}, transparent)`,
                boxShadow: `0 0 20px ${PRIMARY}cc, 0 0 40px ${PRIMARY}66`
              }}
            />

            {/* Corner Indicators */}
            <motion.div
              className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-xl"
              style={{ borderColor: PRIMARY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
            <motion.div
              className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-xl"
              style={{ borderColor: PRIMARY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-xl"
              style={{ borderColor: PRIMARY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
            <motion.div
              className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-xl"
              style={{ borderColor: PRIMARY }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            />
          </motion.div>
        </div>

        {/* Welcome to + Mera Halwai - same as before, only name changed */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-sm text-slate-400 mb-1">Welcome to</p>
          <p className="text-base font-bold text-white">Mera Halwai</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
