'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, Mail, MapPin, Globe } from 'lucide-react'

const SECONDARY = '#8A3E1D'

const PHONE = '7300321034'
const PHONE_E164 = '+917300321034'
const WHATSAPP_LINK = "https://wa.me/917300321034?text=Hi%2C%20I'd%20like%20to%20explore%20catering%20options%20for%20my%20event."
const EMAIL = 'hello@merahalwai.com'
const ADDRESS_LINES = ['House number 1034', 'Mahaveer Nagar 2nd', 'Kota, Rajasthan 324005']
const MAP_LINK = 'https://www.google.com/maps/search/?api=1&query=House+number+1034+Mahaveer+Nagar+2nd+Kota+Rajasthan+324005'
const MAP_EMBED = 'https://www.google.com/maps?q=House+number+1034+Mahaveer+Nagar+2nd+Kota+Rajasthan+324005&output=embed'
const WEBSITE_URL = 'https://www.merahalwai.com/'

export default function ContactCard() {
  const sectionRef = useRef<HTMLElement | null>(null)

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full max-w-md mx-auto px-4 mt-20"
    >
      <div
        className="rounded-3xl p-6 shadow-xl border-2 overflow-hidden"
        style={{
          backgroundColor: '#fff',
          borderColor: 'rgba(138,62,29,0.2)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
        }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center tracking-tight" style={{ color: SECONDARY }}>
          Get in Touch
        </h2>

        <div className="space-y-4">
          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl p-4 border bg-white/80"
            style={{ borderColor: 'rgba(138,62,29,0.15)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(138,62,29,0.1)' }}>
                <Phone className="w-5 h-5" style={{ color: SECONDARY }} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-base" style={{ color: SECONDARY }}>Phone</h3>
                <p className="text-slate-600 text-sm font-medium">+91 {PHONE}</p>
              </div>
            </div>
            <a
              href={`tel:${PHONE_E164}`}
              className="w-full h-11 rounded-xl flex items-center justify-center gap-2 font-semibold text-white transition-all"
              style={{ backgroundColor: SECONDARY }}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </motion.div>

          {/* WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="rounded-2xl p-4 border bg-white/80"
            style={{ borderColor: 'rgba(138,62,29,0.15)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(138,62,29,0.1)' }}>
                <MessageCircle className="w-5 h-5" style={{ color: SECONDARY }} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-base" style={{ color: SECONDARY }}>WhatsApp</h3>
                <p className="text-slate-600 text-sm">Chat with us directly for quick event assistance.</p>
              </div>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-xl flex items-center justify-center gap-2 font-semibold text-white transition-all bg-[#25D366] hover:bg-[#20bd5a]"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-4 border bg-white/80"
            style={{ borderColor: 'rgba(138,62,29,0.15)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(138,62,29,0.1)' }}>
                <Mail className="w-5 h-5" style={{ color: SECONDARY }} strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-slate-800 text-base" style={{ color: SECONDARY }}>Email</h3>
                <p className="text-slate-600 text-sm break-all">{EMAIL}</p>
              </div>
            </div>
            <a
              href={`mailto:${EMAIL}`}
              className="w-full h-11 rounded-xl flex items-center justify-center gap-2 font-semibold text-white transition-all"
              style={{ backgroundColor: SECONDARY }}
            >
              <Mail className="w-4 h-4" />
              Send Email
            </a>
          </motion.div>

          {/* Address + Map */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl overflow-hidden border bg-white/80"
            style={{ borderColor: 'rgba(138,62,29,0.15)' }}
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(138,62,29,0.1)' }}>
                  <MapPin className="w-5 h-5" style={{ color: SECONDARY }} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-base" style={{ color: SECONDARY }}>Address</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {ADDRESS_LINES[0]}<br />
                    {ADDRESS_LINES[1]}<br />
                    {ADDRESS_LINES[2]}
                  </p>
                </div>
              </div>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 rounded-xl flex items-center justify-center gap-2 font-semibold text-white transition-all"
                style={{ backgroundColor: SECONDARY }}
              >
                <MapPin className="w-4 h-4" />
                Open in Maps
              </a>
            </div>
            <div className="h-40 w-full bg-slate-800/50">
              <iframe
                title="Mera Halwai Kota - Map"
                src={MAP_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Website */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-4 border bg-white/80"
            style={{ borderColor: 'rgba(138,62,29,0.15)' }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(138,62,29,0.1)' }}>
                <Globe className="w-5 h-5" style={{ color: SECONDARY }} strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-base" style={{ color: SECONDARY }}>Website</h3>
                <p className="text-slate-600 text-sm">Visit us online at merahalwai.com</p>
              </div>
            </div>
            <a
              href={WEBSITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-11 rounded-xl flex items-center justify-center gap-2 font-semibold text-white transition-all"
              style={{ backgroundColor: SECONDARY }}
            >
              <Globe className="w-4 h-4" />
              Visit Website
            </a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
