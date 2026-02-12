'use client'

import { motion } from 'framer-motion'
import { Users, Receipt, Settings2, Headset } from 'lucide-react'

const PRIMARY = '#EB8B23'
const SECONDARY = '#8A3E1D'

const features = [
  {
    icon: Users,
    title: 'Curated Vendor Network',
    description: 'We onboard and verify vendors to ensure consistent quality and reliability.',
  },
  {
    icon: Receipt,
    title: 'Transparent Pricing',
    description: 'Clear packages and pricing with no hidden surprises.',
  },
  {
    icon: Settings2,
    title: 'Custom Event Solutions',
    description: 'Flexible catering options tailored to your event size and preferences.',
  },
  {
    icon: Headset,
    title: 'Dedicated Support',
    description: 'Our team assists you from discovery to final booking.',
  },
]

export default function WhyMeraHalwai() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto px-4 mt-16"
    >
      <div className="text-left mb-4">
        <h2
          className="text-2xl sm:text-3xl font-bold tracking-tight mb-4"
          style={{ color: '#fff', letterSpacing: '-0.02em' }}
        >
          Why Choose Mera Halwai?
        </h2>
        <p className="text-base text-white/80 tracking-wide mb-6">
          Built to make every celebration seamless, reliable, and stress-free.
        </p>
      </div>

      {/* Horizontal cards - white/gradient bg, readable dark text */}
      <div className="space-y-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className="rounded-xl flex items-center gap-4 p-6 border transition-all duration-200 hover:shadow-lg"
            style={{
              borderColor: 'rgba(138,62,29,0.2)',
              background: 'linear-gradient(135deg, #ffffff 0%, #FFF8F2 50%, #fff 100%)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}
          >
            <div
              className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(138,62,29,0.12)' }}
            >
              <feature.icon className="w-6 h-6" style={{ color: SECONDARY }} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0 text-left">
              <h3 className="text-base font-bold mb-0.5 text-slate-800" style={{ color: SECONDARY }}>
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 leading-snug">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
