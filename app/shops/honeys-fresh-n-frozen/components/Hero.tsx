'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Clock, Store, Hand, CreditCard, Fish, Waves, Calendar, Shield, Sparkles } from 'lucide-react'
import { shopConfig, ContactPerson } from '../config'
import ActionsRow, { ActionsRowRef } from './ActionsRow'
import Card3D, { Face } from '../../../components/Card3D'
import PaymentFace from './PaymentFace'
import { useLanguage } from '../../../contexts/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const [currentFace, setCurrentFace] = useState<Face>('front')
  const [isFlipping, setIsFlipping] = useState(false)
  const actionsRowRef = useRef<ActionsRowRef>(null)

  const handleFlip = (e?: React.MouseEvent, forceFlip = false) => {
    // Prevent flip if clicking on buttons or during animation (unless forced by flip button)
    if (isFlipping) return
    if (!forceFlip && e && (e.target as HTMLElement).closest('button, a, [role="button"]')) {
      return
    }
    
    setIsFlipping(true)
    if (currentFace === 'front') {
      setCurrentFace('info')
    } else if (currentFace === 'info') {
      setCurrentFace('front')
    } else {
      setCurrentFace('info')
    }
    
    setTimeout(() => {
      setIsFlipping(false)
    }, 850) // Slightly longer than animation duration (0.8s)
  }

  const handleOpenPayments = () => {
    if (isFlipping) return
    setIsFlipping(true)
    setCurrentFace('payment')
    setTimeout(() => {
      setIsFlipping(false)
    }, 850)
  }

  const handleBackFromPayment = () => {
    if (isFlipping) return
    setIsFlipping(true)
    setCurrentFace('front')
    setTimeout(() => {
      setIsFlipping(false)
    }, 850)
  }


  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-md mx-auto px-2 pt-4 pb-6"
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
            boxSizing: 'border-box'
          }}
            onClick={(e) => {
              // Flip on click anywhere except buttons/links
              const target = e.target as HTMLElement
              // Only prevent flip if clicking directly on a button, link, or inside ActionsRow buttons area, or social icons
              const isButton = target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button, a')
              const isInActionsRow = target.closest('[data-actions-row]')
              const isInSocialIcons = target.closest('[data-social-icons]')
              const isSVG = target.tagName === 'svg' || target.closest('svg')
              const isInSVG = isSVG && target.closest('[data-social-icons]')
              
              // Allow flip on header image, logo, text, badges - everything except buttons
              if (!isButton && !isInActionsRow && !isInSocialIcons && !isInSVG) {
                handleFlip(e)
              }
            }}
          >
            {/* Flip Button - Top Right */}
            {currentFace === 'front' && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation()
                  handleFlip(e, true) // Force flip when clicking the flip button
                }}
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
            )}

            {/* Header with Fish Image */}
            <div className="relative h-40 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
              <Image
                src="/fish-category.jpg"
                alt="Fresh Fish"
                fill
                className="object-cover"
                priority
              />
              {/* Black gradient from bottom fading upward */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>

            {/* Social Media Icons - At header border line (same line as logo, right side) */}
            <motion.div 
              data-social-icons
              className="absolute right-2 z-20 flex items-center gap-3 social-icons-top"
              style={{ top: '8.5rem' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: 1, 
                y: 0,
              }}
              transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              onMouseDown={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
              onTouchStart={(e) => {
                e.stopPropagation()
                e.preventDefault()
              }}
            >
              {/* Instagram - Opens selector */}
              {(shopConfig.social?.instagram || shopConfig.social?.instagramJammu) && (
                <motion.button
                  data-instagram-button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    // Open Instagram selector
                    if (actionsRowRef.current) {
                      actionsRowRef.current.openInstagramSelector()
                    }
                  }}
                  className="h-11 w-11 p-0.5 rounded-full shadow-2xl flex items-center justify-center overflow-hidden transition-all cursor-pointer touch-manipulation"
                  style={{
                    background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045)',
                    WebkitTapHighlightColor: 'transparent',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2)'
                  }}
                  title="Instagram"
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <Image
                      src="/social.png"
                      alt="Instagram"
                      width={44}
                      height={44}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.button>
              )}
              
              {/* Facebook */}
              {shopConfig.social?.facebook && (
                <motion.a
                  href={shopConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    window.open(shopConfig.social.facebook, '_blank', 'noopener,noreferrer')
                  }}
                  className="h-11 w-11 p-0 rounded-full shadow-2xl border-2 border-[#1877F2] flex items-center justify-center overflow-hidden transition-all cursor-pointer bg-white touch-manipulation"
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </motion.a>
              )}
              
              {/* WhatsApp - Opens Selector in Card */}
              <motion.button
                data-whatsapp-button
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  // Trigger WhatsApp selector in ActionsRow
                  actionsRowRef.current?.openWhatsAppSelector()
                }}
                onMouseDown={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
                onTouchStart={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="h-11 w-11 p-0 rounded-full shadow-2xl border-2 border-[#25D366] flex items-center justify-center overflow-hidden transition-all cursor-pointer bg-white touch-manipulation"
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.2)'
                }}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </motion.button>
            </motion.div>

            {/* Content */}
            <div className="relative px-5 pb-6 pt-3" style={{ backgroundColor: 'rgba(253, 255, 255, 0.5)' }}>
              {/* Logo Circle */}
              <motion.div 
                className="absolute -top-14 left-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                }}
                transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl overflow-hidden"
                  style={{ 
                    border: '4px solid rgba(31, 182, 217, 0.4)',
                    boxShadow: '0 4px 20px rgba(14, 116, 144, 0.2)'
                  }}
                >
                  <Image
                    src={shopConfig.assets.logo}
                    alt={`${shopConfig.name} Logo`}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    style={{ transform: 'scale(1.2)' }}
                  />
                </div>
              </motion.div>

              {/* Brand info */}
              <motion.div 
                className="pt-20 mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h1 className="text-2xl font-black text-slate-900 mb-1 leading-tight tracking-tight">
                  {shopConfig.name}
                </h1>
                <p className="text-blue-600 font-semibold text-[15px]">
                  {shopConfig.tagline}
                </p>
              </motion.div>


              {/* Trust Badges - Since 1968, Clean & Hygienic, Freshness Guaranteed - White BG Simple */}
              <motion.div 
                className="mb-6 flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* First Badge - Since 1968 */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm border border-blue-200/40 shadow-sm" style={{ backgroundColor: 'rgba(239, 246, 255, 0.6)' }}>
                  <div className="w-4 h-4 rounded-full flex items-center justify-center">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" strokeWidth={2} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Since 1968</span>
                </div>
                
                {/* Second Badge - Clean & Hygienic */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm border border-blue-200/40 shadow-sm" style={{ backgroundColor: 'rgba(239, 246, 255, 0.6)' }}>
                  <div className="w-4 h-4 rounded-full flex items-center justify-center">
                    <Shield className="w-3.5 h-3.5 text-blue-600" strokeWidth={2} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Clean & Hygienic</span>
                </div>
                
                {/* Third Badge - Freshness Guaranteed */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-sm border border-blue-200/40 shadow-sm" style={{ backgroundColor: 'rgba(239, 246, 255, 0.6)' }}>
                  <div className="w-4 h-4 rounded-full flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" strokeWidth={2} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">Freshness Guaranteed</span>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                data-actions-row
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
              >
                <ActionsRow 
                  ref={actionsRowRef}
                  onOpenPayments={handleOpenPayments}
                />
              </motion.div>

            </div>
          </div>
        }
        faceInfo={
          <div
            className="bg-gradient-to-br from-blue-400/80 via-blue-500/80 to-blue-600/80 backdrop-blur-md rounded-[24px] shadow-2xl border-2 border-blue-300/50 cursor-pointer relative h-full"
            style={{ overflow: 'hidden', minHeight: '580px', boxSizing: 'border-box' }}
            onClick={handleFlip}
          >
            {/* Animated Background Pattern */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08) 0%, transparent 50%)',
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Content */}
            <div className="relative flex flex-col items-center justify-center h-full px-6 py-8 text-center text-white">
              <motion.div
                initial={{ opacity: 0 }}
                animate={currentFace === 'info' ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                className="w-full flex flex-col items-center"
              >
              {/* Title */}
              <h2 className="text-2xl font-black mb-6 tracking-tight drop-shadow-lg">
                Business Snapshot
              </h2>

              {/* Address */}
              <div className="flex items-start gap-3 mb-3 w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 drop-shadow-md" />
                <p className="text-sm font-semibold leading-relaxed text-left drop-shadow-md">
                  {shopConfig.contact.address}
                </p>
              </div>

              {/* Deals */}
              <div className="flex items-start gap-3 mb-3 w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                <Store className="w-5 h-5 flex-shrink-0 mt-0.5 drop-shadow-md" />
                <p className="text-sm leading-relaxed text-left drop-shadow-md">
                  <span className="font-semibold">Services:</span> {shopConfig.brands.map(b => b.name).join(', ')}
                </p>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-3 mb-6 w-full max-w-sm bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                <Clock className="w-5 h-5 flex-shrink-0 drop-shadow-md" />
                <p className="text-sm font-medium text-left drop-shadow-md">
                  {shopConfig.contact.storeHours}
                </p>
              </div>

              {/* Google Maps Preview */}
              <div 
                className="w-full max-w-sm h-40 rounded-2xl overflow-hidden shadow-2xl mb-4 border-2 border-white/30 pointer-events-none"
                style={{ borderRadius: '16px' }}
              >
                <iframe
                  src={`https://www.google.com/maps?q=${encodeURIComponent(shopConfig.contact.mapQuery)}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '16px', pointerEvents: 'none' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Open in Maps Button */}
              <motion.a
                href={`https://www.google.com/maps?q=${encodeURIComponent(shopConfig.contact.mapQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-2 bg-white text-yellow-900 px-6 py-3 rounded-full shadow-2xl hover:shadow-xl transition-all font-bold border-2 border-white/50 overflow-hidden touch-manipulation pointer-events-auto"
                onClick={(e) => {
                  // Flip first, then open maps after delay
                  e.preventDefault()
                  handleFlip(e, true)
                  setTimeout(() => {
                    window.open(`https://www.google.com/maps?q=${encodeURIComponent(shopConfig.contact.mapQuery)}`, '_blank', 'noopener,noreferrer')
                  }, 700)
                }}
                style={{ fontSize: '14px', WebkitTapHighlightColor: 'transparent' }}
              >
                <MapPin className="w-5 h-5 transition-all group-hover:opacity-0 group-hover:scale-0" />
                <span className="transition-all group-hover:opacity-0">Open in Maps</span>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-lg">🏢</span>
                  </div>
                </div>
              </motion.a>
            </motion.div>

            {/* Tap to Return Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={currentFace === 'info' ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFlip}
                className="absolute top-4 right-4 text-xs text-white font-semibold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg cursor-pointer transition-all flex items-center gap-1.5 touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent' }}
                aria-label={t('tapToReturn')}
              >
                <Hand className="w-3.5 h-3.5 text-white" />
                <span style={{ fontSize: '12px' }}>{t('tapToReturn')}</span>
            </motion.button>
          </div>
        </div>
        }
        facePayment={
          <PaymentFace
            upiId={shopConfig.payment.upiId}
            upiName={shopConfig.payment.upiName}
            upiQrImageUrl={shopConfig.payment.upiQrImageUrl}
            scannerImage={shopConfig.payment.scannerImage}
            bank={shopConfig.payment.bank}
            onBack={handleBackFromPayment}
          />
        }
      />

    </motion.section>
  )
}
