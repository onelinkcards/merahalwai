'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import { menuCategories, MenuItem } from '../shops/honeys-fresh-n-frozen/menu'

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof menuCategories>('fish')

  const currentCategory = menuCategories[activeCategory]

  return (
    <>
      <main className="min-h-screen" style={{ backgroundColor: '#1a1a1a' }}>
        {/* Header */}
        <div className="border-b border-gray-700 sticky top-0 z-20 shadow-lg backdrop-blur-md" style={{ backgroundColor: 'rgba(26, 26, 26, 0.95)' }}>
          <div className="max-w-md mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
            <Link
              href="/#menu"
              className="p-2 sm:p-2.5 hover:bg-gray-800 rounded-full transition-colors active:scale-95"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  sessionStorage.setItem('fromMenu', 'true')
                }
              }}
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </Link>
            <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight" style={{ fontSize: 'clamp(1.125rem, 4vw, 1.25rem)' }}>Our Menu</h1>
            <div className="w-8 sm:w-10" /> {/* Spacer for centering */}
          </div>
        </div>

        {/* Category Header with Image */}
        <div className="max-w-md mx-auto px-3 sm:px-4 pt-4 sm:pt-6 pb-3 sm:pb-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative h-48 sm:h-56 md:h-64 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 shadow-lg border border-gray-200"
              style={{ borderRadius: 'clamp(12px, 3vw, 16px)' }}
            >
              <Image
                src={currentCategory.image}
                alt={currentCategory.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, 448px"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2">
                  <span className="text-3xl sm:text-4xl md:text-5xl drop-shadow-lg" style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}>{currentCategory.icon}</span>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg" style={{ fontSize: 'clamp(1.25rem, 5vw, 1.875rem)' }}>{currentCategory.name}</h2>
                </div>
                <p className="text-white text-xs sm:text-sm font-semibold bg-white/20 backdrop-blur-sm px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full inline-block" style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)' }}>
                  {currentCategory.items.length} items available
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Category Tabs - Horizontal Scroll */}
        <div className="max-w-md mx-auto px-3 sm:px-4 pb-3 sm:pb-4">
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-3 sm:-mx-4 px-3 sm:px-4">
            {Object.entries(menuCategories).map(([key, category]) => (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key as keyof typeof menuCategories)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold whitespace-nowrap transition-all shadow-sm flex-shrink-0 ${
                  activeCategory === key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                style={{ borderRadius: 'clamp(8px, 2vw, 12px)' }}
              >
                <span className="text-lg sm:text-xl" style={{ fontSize: 'clamp(1.125rem, 3vw, 1.25rem)' }}>{category.icon}</span>
                <span className="text-xs sm:text-sm font-medium" style={{ fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)' }}>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Order Online Button - After Category */}
        <div className="max-w-md mx-auto px-3 sm:px-4 pb-3 sm:pb-4">
          <Link
            href="https://honeymoneyfish.co/order-online/menu"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 sm:py-3.5 px-4 sm:px-6"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 251, 245, 0.98) 0%, rgba(250, 247, 240, 0.98) 100%)',
              border: '1px solid rgba(191, 219, 254, 0.4)',
              borderRadius: 'clamp(16px, 4vw, 24px)'
            }}
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: '#2563eb' }} />
            <span className="font-semibold text-xs sm:text-sm" style={{ color: '#1e293b', fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)' }}>Order Online</span>
          </Link>
        </div>

        {/* Menu Items Grid - Square Grid */}
        <div className="max-w-md mx-auto px-3 sm:px-4 py-4 sm:py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-2.5 sm:gap-4"
            >
              {currentCategory.items.map((item, index) => {
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                    className="group rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all aspect-square"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 251, 245, 0.98) 0%, rgba(250, 247, 240, 0.98) 100%)',
                      border: '1px solid rgba(191, 219, 254, 0.4)',
                      borderRadius: 'clamp(16px, 4vw, 24px)'
                    }}
                  >
                    <div className="p-3 sm:p-4 md:p-5 flex flex-col h-full">
                      <h3 className="font-bold text-sm sm:text-base mb-2 sm:mb-3 leading-tight line-clamp-2" style={{ color: '#1e293b', fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>
                        {item.name}
                      </h3>
                      <div className="mt-auto space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                          <span className="font-semibold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-xs"
                            style={{
                              background: 'rgba(59, 130, 246, 0.15)',
                              color: '#2563eb',
                              border: '1px solid rgba(59, 130, 246, 0.3)',
                              fontSize: 'clamp(0.625rem, 2vw, 0.75rem)',
                              borderRadius: 'clamp(8px, 2vw, 12px)'
                            }}
                          >
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-1.5 sm:gap-2">
                          <span className="font-bold text-base sm:text-lg block" style={{ color: '#1e293b', fontSize: 'clamp(1rem, 3.5vw, 1.125rem)' }}>
                            {item.price}
                          </span>
                          <Link
                            href="https://honeymoneyfish.co/order-online/menu"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl sm:rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-1 sm:gap-1.5"
                            style={{
                              background: 'rgba(59, 130, 246, 0.1)',
                              border: '1px solid rgba(59, 130, 246, 0.3)',
                              borderRadius: 'clamp(12px, 3vw, 16px)'
                            }}
                          >
                            <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color: '#2563eb' }} />
                            <span className="text-[10px] sm:text-xs font-semibold" style={{ color: '#2563eb', fontSize: 'clamp(0.625rem, 2vw, 0.75rem)' }}>Order</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </AnimatePresence>

          {/* Footer Note */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 sm:mt-8 text-center"
          >
            <p className="text-[10px] sm:text-xs text-gray-400 leading-relaxed" style={{ fontSize: 'clamp(0.625rem, 2vw, 0.75rem)' }}>
              All prices are subject to market rates.<br />
              Please confirm availability before ordering.
            </p>
          </motion.div>
        </div>

      </main>
    </>
  )
}
