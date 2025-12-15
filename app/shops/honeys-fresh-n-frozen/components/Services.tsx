'use client'

import { motion } from 'framer-motion'
import { Fish, Drumstick, Beef, Truck } from 'lucide-react'
import { shopConfig } from '../config'

const services = [
  {
    id: 'service-1',
    icon: Fish,
    title: 'Fresh and Frozen Fish',
    description: 'Boneless cuts, premium handling',
  },
  {
    id: 'service-2',
    icon: Drumstick,
    title: 'Chicken Products',
    description: 'Fresh and frozen, hygienic packed',
  },
  {
    id: 'service-3',
    icon: Beef,
    title: 'Mutton Items',
    description: 'Clean cuts and kabab range',
  },
  {
    id: 'service-4',
    icon: Truck,
    title: 'Doorstep Delivery',
    description: 'Fast delivery across Jammu',
  },
]

export default function Services() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto px-3 py-6"
    >
      <div className="mb-6 px-1">
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1.5">
          Why Choose Us
        </h2>
        <p className="text-sm text-slate-300/80 font-normal">
          58+ years of trust • Premium hygiene • Wide variety
        </p>
      </div>

      {/* Services Grid - Premium White/Cream Cards */}
      <div className="grid grid-cols-1 gap-3">
        {services.map((service, index) => {
          const IconComponent = service.icon
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.05, duration: 0.3, ease: 'easeOut' }}
              className="relative rounded-2xl p-5 flex items-center gap-4 overflow-hidden group hover:shadow-xl transition-all"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 251, 245, 0.98) 0%, rgba(250, 247, 240, 0.98) 50%, rgba(245, 243, 238, 0.98) 100%)',
                border: '1px solid rgba(191, 219, 254, 0.4)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
            >
              {/* Subtle Bluish Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-cyan-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Icon Container - Premium Blue with Cream Background */}
              <div 
                className="relative w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/60"
                style={{
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.15)'
                }}
              >
                <IconComponent 
                  className="w-7 h-7 relative z-10" 
                  style={{ color: '#2563eb' }}
                  strokeWidth={2}
                />
                {/* Subtle blue glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 to-cyan-100/40 rounded-xl"></div>
              </div>

              {/* Content */}
              <div className="flex-1 relative z-10">
                <h3 
                  className="font-bold text-base mb-1 leading-tight"
                  style={{ color: '#1e293b' }}
                >
                  {service.title}
                </h3>
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: '#475569' }}
                >
                  {service.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

    </motion.section>
  )
}
