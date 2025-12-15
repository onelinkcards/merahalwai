'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { shopConfig } from '../config'

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto px-4 py-6"
    >
      <div className="bg-gradient-to-br from-blue-400/80 via-blue-500/80 to-blue-600/80 backdrop-blur-md rounded-3xl p-7 shadow-lg border border-blue-300/30 overflow-hidden">
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight">
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
                <p className="text-white/90 leading-[1.7] text-[15px] mb-4">
                  {shopConfig.about.shortDescription}
                </p>
                <motion.button
                  onClick={() => setIsExpanded(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-white/90 hover:text-white font-semibold text-sm transition-colors"
                >
                  Read Full Story
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
                <p className="text-white/90 leading-[1.7] text-[15px] mb-4 whitespace-pre-line">
                  {shopConfig.about.fullDescription}
                </p>
                <motion.button
                  onClick={() => setIsExpanded(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-white/90 hover:text-white font-semibold text-sm transition-colors"
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
