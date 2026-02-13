'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Hand, Calendar, Shield, Sparkles, MapPin, Store, Clock, Globe } from 'lucide-react'
import ActionsRow, { ActionsRowRef } from './ActionsRow'
import Card3D, { Face } from '../../../components/Card3D'
import PaymentFace from './PaymentFace'
import { useLanguage } from '../../../contexts/LanguageContext'

const PRIMARY = '#EB8B23'
const SECONDARY = '#8A3E1D'

export default function Hero() {
  const { t } = useLanguage()
  const [currentFace, setCurrentFace] = useState<Face>('front')
  const [isFlipping, setIsFlipping] = useState(false)
  const actionsRowRef = useRef<ActionsRowRef>(null)

  const handleFlip = (e?: React.MouseEvent, forceFlip = false) => {
    if (isFlipping) return
    if (!forceFlip && e && (e.target as HTMLElement).closest('button, a, [role="button"]')) return
    const target = e?.target as HTMLElement
    if (!forceFlip && target?.closest('[data-actions-row]')) return
    if (!forceFlip && target?.closest('[data-social-icons]')) return
    setIsFlipping(true)
    setCurrentFace(currentFace === 'front' ? 'info' : 'front')
    setTimeout(() => setIsFlipping(false), 850)
  }

  const handleOpenPayments = () => {
    if (isFlipping) return
    setIsFlipping(true)
    setCurrentFace('payment')
    setTimeout(() => setIsFlipping(false), 850)
  }

  const handleBackFromPayment = () => {
    if (isFlipping) return
    setIsFlipping(true)
    setCurrentFace('front')
    setTimeout(() => setIsFlipping(false), 850)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-md mx-auto px-4 pt-4 pb-0"
      style={{ width: '100%' }}
    >
      <Card3D
        currentFace={currentFace}
        isFlipping={isFlipping}
        faceFront={
          <div
            className="rounded-[24px] shadow-2xl border-2 border-slate-200/50 relative cursor-pointer"
            style={{
              backgroundColor: '#FDFFFF',
              overflow: 'hidden',
              minHeight: '580px',
              boxSizing: 'border-box',
            }}
            onClick={(e) => {
              const target = e.target as HTMLElement
              if (target.closest('button, a, [data-actions-row], [data-social-icons]')) return
              handleFlip(e)
            }}
          >
            {/* Tap to Flip - same place as before */}
            <motion.button
              onClick={(e) => { e.stopPropagation(); handleFlip(e, true); }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 z-10 text-xs text-slate-900 font-semibold bg-white/95 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg cursor-pointer hover:shadow-xl transition-all flex items-center gap-1.5 touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <Hand className="w-3.5 h-3.5 text-slate-900" />
              {t('tapToFlip')}
            </motion.button>

            {/* Header - high quality hero image */}
            <div className="relative h-40 overflow-hidden rounded-t-[22px]">
              <Image
                src="/Fraddme%202147226096.png"
                alt="Mera Halwai"
                fill
                className="object-cover object-center"
                priority
                quality={95}
                sizes="(max-width: 448px) 100vw, 448px"
              />
            </div>

            {/* Social - Instagram + Website circles (same row) */}
            <motion.div
              data-social-icons
              className="absolute right-2 z-20 flex items-center gap-2.5"
              style={{ top: '8.5rem' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.a
                href="https://www.instagram.com/merahalwai/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="h-12 w-12 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0 bg-white border-2 border-white/90"
                style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.06)' }}
                title="Instagram"
              >
                <Image src="/social.png" alt="Instagram" width={48} height={48} className="w-full h-full object-cover" />
              </motion.a>
              <motion.a
                href="https://www.merahalwai.com/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="h-12 w-12 rounded-full flex items-center justify-center flex-shrink-0 bg-white border-2 border-white/90"
                style={{ boxShadow: '0 4px 14px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.06)' }}
                title="Website"
              >
                <Globe className="w-6 h-6" style={{ color: SECONDARY }} strokeWidth={2.25} />
              </motion.a>
            </motion.div>

            {/* Content - same padding and structure */}
            <div className="relative px-5 pb-6 pt-3" style={{ backgroundColor: 'rgba(253, 255, 255, 0.5)' }}>
              {/* Logo circle - frame same size; logo inside zoomed bigger */}
              <motion.div
                className="absolute -top-14 left-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div
                  className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl overflow-hidden"
                  style={{
                    border: `4px solid ${SECONDARY}40`,
                    boxShadow: `0 4px 20px ${SECONDARY}25`,
                  }}
                >
                  <Image
                    src="/merahalwailogo.png"
                    alt="Mera Halwai"
                    width={128}
                    height={128}
                    className="object-contain"
                    quality={95}
                    style={{ transform: 'scale(1.45)' }}
                  />
                </div>
              </motion.div>

              {/* Brand info - same typography structure */}
              <motion.div
                className="pt-20 mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h1 className="text-2xl font-black text-slate-900 mb-1 leading-tight tracking-tight">
                  Mera Halwai
                </h1>
                <p className="font-semibold text-[15px] mb-0.5" style={{ color: SECONDARY }}>
                  Trusted Halwais & Caterers for Every Celebration
                </p>
                <p className="text-slate-600 text-sm font-medium">
                  Weddings • Parties • Festivals • Corporate Events
                </p>
              </motion.div>

              {/* Trust Badges - 2 in first row, 1 in second row; height same as before */}
              <motion.div
                className="mb-6 grid grid-cols-2 gap-2 items-start content-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="inline-flex items-center justify-center gap-1.5 px-3 h-[30px] rounded-full backdrop-blur-sm border shadow-sm self-start" style={{ backgroundColor: `${PRIMARY}15`, borderColor: `${SECONDARY}40` }}>
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: SECONDARY }} strokeWidth={2} />
                  <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">Verified Vendors</span>
                </div>
                <div className="inline-flex items-center justify-center gap-1.5 px-3 h-[30px] rounded-full backdrop-blur-sm border shadow-sm self-start" style={{ backgroundColor: `${PRIMARY}15`, borderColor: `${SECONDARY}40` }}>
                  <Shield className="w-3.5 h-3.5 flex-shrink-0" style={{ color: SECONDARY }} strokeWidth={2} />
                  <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">Transparent Pricing</span>
                </div>
                <div className="inline-flex items-center justify-center gap-1.5 px-3 h-[30px] rounded-full backdrop-blur-sm border shadow-sm self-start" style={{ backgroundColor: `${PRIMARY}15`, borderColor: `${SECONDARY}40` }}>
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0" style={{ color: SECONDARY }} strokeWidth={2} />
                  <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">Seamless Booking</span>
                </div>
              </motion.div>

              {/* Actions - same wrapper, Mera Halwai variant */}
              <motion.div
                data-actions-row
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <ActionsRow variant="merahalwai" onOpenPayments={handleOpenPayments} />
              </motion.div>
            </div>
          </div>
        }
        faceInfo={
          <div
            className="backdrop-blur-md rounded-[24px] shadow-2xl border-2 cursor-pointer relative overflow-hidden h-full"
            style={{
              boxSizing: 'border-box',
              background: `linear-gradient(135deg, ${PRIMARY}cc 0%, ${PRIMARY}aa 30%, ${SECONDARY}bb 70%, ${SECONDARY} 100%)`,
              borderColor: 'rgba(255,255,255,0.25)',
            }}
            onClick={handleFlip}
          >
            <div className="absolute inset-0 bg-white/5 rounded-[22px]" aria-hidden />
            <div className="relative flex flex-col items-center justify-center px-5 pt-10 pb-8 text-white overflow-y-auto h-full min-h-0">
              <h2 className="text-2xl font-black mb-5 tracking-tight drop-shadow-lg text-center w-full">Business Snapshot</h2>

              {/* Location - glass card */}
              <div className="flex items-start gap-3 mb-3 w-full max-w-sm rounded-2xl p-3 border border-white/20 bg-white/10 backdrop-blur-md">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" strokeWidth={2} />
                <div className="text-left">
                  <p className="text-sm font-bold text-white">Kota Office</p>
                  <p className="text-sm font-medium text-white/95 leading-relaxed">House number 1034 Mahaveer Nagar 2nd, Kota, Rajasthan 324005</p>
                </div>
              </div>

              {/* Services - glass card */}
              <div className="flex items-start gap-3 mb-3 w-full max-w-sm rounded-2xl p-3 border border-white/20 bg-white/10 backdrop-blur-md">
                <Store className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" strokeWidth={2} />
                <p className="text-sm font-semibold leading-relaxed text-left text-white/95">Services: Trusted Halwais & Caterers, Weddings • Parties • Festivals • Corporate Events</p>
              </div>

              {/* Hours / Contact - glass card */}
              <div className="flex items-start gap-3 mb-4 w-full max-w-sm rounded-2xl p-3 border border-white/20 bg-white/10 backdrop-blur-md">
                <Clock className="w-5 h-5 flex-shrink-0 mt-0.5 text-white" strokeWidth={2} />
                <div className="text-left">
                  <p className="text-sm font-semibold text-white/95">Contact: 7300321034 • hello@merahalwai.com</p>
                </div>
              </div>

              {/* Google Map embed */}
              <div className="w-full max-w-sm h-40 rounded-2xl overflow-hidden border-2 border-white/25 shadow-xl mb-4 bg-slate-800/50">
                <iframe
                  title="Mera Halwai Kota"
                  src="https://www.google.com/maps?q=House+number+1034+Mahaveer+Nagar+2nd+Kota+Rajasthan+324005&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Open in Maps - brand color button */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=House+number+1034+Mahaveer+Nagar+2nd+Kota+Rajasthan+324005"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-bold px-6 py-3 rounded-2xl shadow-xl text-sm transition-all hover:opacity-95"
                style={{
                  background: `linear-gradient(135deg, ${PRIMARY} 0%, ${SECONDARY} 100%)`,
                  boxShadow: `0 8px 20px ${SECONDARY}66, inset 0 1px 0 rgba(255,255,255,0.2)`,
                }}
              >
                <MapPin className="w-5 h-5" />
                Open in Maps
              </a>

              <motion.button
                onClick={handleFlip}
                className="absolute top-4 right-4 text-xs text-white font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg cursor-pointer transition-all flex items-center gap-1.5 touch-manipulation z-10"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                <Hand className="w-3.5 h-3.5 text-white" />
                {t('tapToReturn')}
              </motion.button>
            </div>
          </div>
        }
        facePayment={
          <PaymentFace
            upiId="7976917952-2@ybl"
            upiName="Mera Halwai"
            scannerImage="/Untitled%2020.jpg"
            onBack={handleBackFromPayment}
          />
        }
      />
    </motion.section>
  )
}
