'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Fish, Drumstick, Beef, Waves } from 'lucide-react'
import Image from 'next/image'
import { menuCategories } from '../menu'

// Map menu categories to preview format
const menuPreviewData = [
  { 
    key: 'fish' as const,
    icon: Fish
  },
  { 
    key: 'chicken' as const,
    icon: Drumstick
  },
  { 
    key: 'mutton' as const,
    icon: Beef
  },
  { 
    key: 'prawns' as const,
    icon: Waves
  },
]

export default function MenuPreview() {
  return (
    <section id="menu" className="w-full max-w-md mx-auto px-3 py-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mb-6 px-1"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
          Our Menu
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-medium">
          Fresh • Frozen • Hygienic • Trusted
        </p>
      </motion.div>

      {/* 4 Cards Grid - Image Style */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {menuPreviewData.map((preview, index) => {
          const category = menuCategories[preview.key]
          const IconComponent = preview.icon
          return (
            <Link key={preview.key} href="/menu">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
                className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group shadow-lg hover:shadow-xl transition-all"
              >
                {/* Background Image */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Dark Gradient Overlay with Whitish Touch */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent"></div>
                
                {/* Circular Icon - Top Right - Enhanced Glassmorphism */}
                <div 
                  className="absolute top-3 right-3 w-12 h-12 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2), 0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <IconComponent 
                    className="w-6 h-6" 
                    style={{ 
                      color: '#FFFFFF', 
                      filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4))',
                      strokeWidth: 2.5
                    }}
                  />
                </div>
                
                {/* Content - Bottom with White Text */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className="text-white font-bold text-lg mb-2 leading-tight drop-shadow-lg">
                    {category.name}
                  </h3>
                  <p className="text-white/95 text-sm font-medium leading-relaxed drop-shadow-md">
                    {category.items.length} items available
                  </p>
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>

      {/* View All Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        <Link
          href="/menu"
          className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          View All Menu
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  )
}
