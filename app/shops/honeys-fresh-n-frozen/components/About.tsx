'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { shopConfig } from '../config'

const PRIMARY = '#EB8B23'
const SECONDARY = '#8A3E1D'

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto px-4 mt-16"
    >
      <div
        className="backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${PRIMARY}cc 0%, ${PRIMARY}aa 35%, ${SECONDARY}bb 70%, ${SECONDARY} 100%)`,
          borderColor: 'rgba(255,255,255,0.25)',
        }}
      >
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight drop-shadow-sm">
            {shopConfig.about.title}
          </h2>
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div
                key="short"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-white/95 leading-[1.7] text-[15px] mb-6 whitespace-pre-line">
                  {shopConfig.about.shortDescription}
                </p>
                <motion.button
                  onClick={() => setIsExpanded(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 text-white font-semibold text-sm transition-colors py-1"
                >
                  Read More
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="full"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p className="text-white/95 leading-[1.7] text-[15px] mb-6 whitespace-pre-line">
                  {shopConfig.about.fullDescription}
                </p>
                <motion.button
                  onClick={() => setIsExpanded(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 text-white font-semibold text-sm transition-colors py-1"
                >
                  Show Less
                  <ChevronUp className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  )
}
