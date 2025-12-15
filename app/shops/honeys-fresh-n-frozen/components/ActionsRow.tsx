'use client'

import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Download, MapPin, ShoppingCart, Share2, Star, ChevronUp, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { shopConfig, ContactPerson } from '../config'
import { getTelLink, getWhatsAppLink, formatPhoneDisplay } from '../../../lib/phone'
import { generateVCard, downloadVCard } from '../../../lib/vcard'
import { useLanguage } from '../../../contexts/LanguageContext'

interface ActionsRowProps {
  onOpenPayments?: () => void
}

export interface ActionsRowRef {
  openWhatsAppSelector: () => void
}

const ActionsRow = forwardRef<ActionsRowRef, ActionsRowProps>(({ onOpenPayments }, ref) => {
  const { t } = useLanguage()
  const [callSelectorOpen, setCallSelectorOpen] = useState(false)
  const [whatsappSelectorOpen, setWhatsappSelectorOpen] = useState(false)
  const callSelectorRef = useRef<HTMLDivElement>(null)
  const whatsappSelectorRef = useRef<HTMLDivElement>(null)

  // Expose WhatsApp selector toggle to parent via ref
  useImperativeHandle(ref, () => ({
    openWhatsAppSelector: () => {
      setWhatsappSelectorOpen(true)
      setCallSelectorOpen(false)
    }
  }))

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (callSelectorOpen || whatsappSelectorOpen) {
        const target = e.target as HTMLElement
        if (!target.closest('.popup-selector') && !target.closest('[data-call-button]') && !target.closest('[data-whatsapp-button]')) {
          setCallSelectorOpen(false)
          setWhatsappSelectorOpen(false)
        }
      }
    }

    if (callSelectorOpen || whatsappSelectorOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [callSelectorOpen, whatsappSelectorOpen])

  const handleCall = (person: ContactPerson) => {
    const telLink = getTelLink(person.phoneE164)
    window.location.href = telLink
    setCallSelectorOpen(false)
  }

  const handleWhatsApp = (person: ContactPerson) => {
    const message = `Hello ${person.label}, I want to place an order. Please share today's availability and rates.`
    const whatsappLink = getWhatsAppLink(person.whatsappE164, message)
    window.open(whatsappLink, '_blank')
    setWhatsappSelectorOpen(false)
  }

  const handleDirections = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(shopConfig.contact.mapQuery)}`
    window.open(mapUrl, '_blank')
  }

  const handleShare = async () => {
    const url = window.location.href
    const title = shopConfig.name
    const text = `Check out ${shopConfig.name}!`

    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        })
      } catch (err) {
        // User cancelled or error occurred
        console.log('Share cancelled')
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
      } catch (err) {
        console.error('Failed to copy:', err)
      }
    }
  }

  const handleSaveContact = () => {
    const vCard = generateVCard({
      name: shopConfig.name,
      organization: shopConfig.name,
      phones: shopConfig.contactPersons.map(p => p.phoneE164.replace(/^91/, '')),
      email: shopConfig.contact.email,
      address: shopConfig.contact.address,
      website: shopConfig.url,
    })
    downloadVCard(vCard, `${shopConfig.name.replace(/\s+/g, '-')}-contact.vcf`)
  }


  return (
    <>
      <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
        {/* Top Row: Call Now, Payment */}
        <div className="flex gap-2 items-stretch">
          {/* Call Now - Blue like Welcome Card */}
          <Button
            data-call-button
            onClick={(e) => {
              e.stopPropagation()
              setCallSelectorOpen(!callSelectorOpen)
              setWhatsappSelectorOpen(false)
            }}
            className="flex-1 h-11 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 active:scale-[0.98] hover:opacity-90 touch-manipulation"
            style={{ 
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(37, 99, 235, 0.8) 50%, rgba(29, 78, 216, 0.8) 100%)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <Phone className="w-4 h-4" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }} />
            <span className="text-sm primary-btn-text" style={{ fontSize: '14px' }}>{t('callNow')}</span>
          </Button>

          {/* Payment Button with NEW Badge - Only Gradient Allowed */}
          {onOpenPayments && (
            <div className="flex-1 relative">
              <span className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 bg-[#EF4444] text-white text-[8px] font-semibold px-1.5 py-0.5 rounded-full whitespace-nowrap z-20">
                NEW
              </span>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenPayments()
                }}
                className="w-full h-11 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm hover:opacity-90 touch-manipulation"
                style={{ 
                  background: 'radial-gradient(circle, rgb(21, 124, 130) 0%, rgb(17, 19, 21) 100%)',
                  WebkitTapHighlightColor: 'transparent'
                }}
              >
                <Image
                  src="/icons8-bhim-48.png"
                  alt="Payment"
                  width={16}
                  height={16}
                  className="w-4 h-4 object-contain"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
                <span className="text-sm primary-btn-text" style={{ fontSize: '14px' }}>{t('openPayment')}</span>
              </Button>
            </div>
          )}
        </div>

        {/* Second Row: Menu/Order and Location */}
        <div className="flex gap-2">
          {/* Menu/Shopping Cart Button */}
          <Link
            href="https://honeymoneyfish.co/order-online/menu"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 h-11 bg-white/80 backdrop-blur-md hover:bg-white/90 rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] px-4 touch-manipulation"
            style={{ 
              color: '#0F172A',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
              WebkitTapHighlightColor: 'transparent',
              fontSize: '14px'
            }}
          >
            <ShoppingCart className="w-4 h-4" style={{ color: '#475569', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }} />
            <span className="text-sm font-semibold" style={{ color: '#0F172A', fontSize: '14px' }}>Menu/Order</span>
          </Link>
          
          {/* Location Button */}
          <Button
            onClick={handleDirections}
            className="flex-1 h-11 bg-white/80 backdrop-blur-md hover:bg-white/90 rounded-2xl transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] px-4 touch-manipulation"
            style={{ 
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
              WebkitTapHighlightColor: 'transparent',
              fontSize: '14px'
            }}
          >
            <MapPin className="w-4 h-4" style={{ color: '#EF4444', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }} />
            <span className="text-sm font-semibold" style={{ color: '#0F172A', fontSize: '14px' }}>Location</span>
          </Button>
        </div>

        {/* Third Row: Reviews and Share */}
        <div className="flex gap-2">
          {/* Review Button */}
          <Link
            href="/reviews"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 h-11 bg-white/80 backdrop-blur-md hover:bg-white/90 rounded-2xl transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] px-4 touch-manipulation"
            style={{ 
              color: '#0F172A',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
              WebkitTapHighlightColor: 'transparent',
              fontSize: '14px'
            }}
          >
            <Star className="w-4 h-4" style={{ color: '#EAB308' }} fill="#EAB308" />
            <span className="text-sm font-semibold" style={{ color: '#0F172A', fontSize: '14px' }}>Reviews</span>
          </Link>

          {/* Share Button */}
          <Button
            onClick={(e) => {
              e.stopPropagation()
              handleShare()
            }}
            className="flex-1 h-11 bg-white/80 backdrop-blur-md hover:bg-white/90 rounded-2xl transition-all flex items-center justify-center gap-1.5 active:scale-[0.98] px-4 touch-manipulation"
            style={{ 
              color: '#0F172A',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
              WebkitTapHighlightColor: 'transparent',
              fontSize: '14px'
            }}
          >
            <Share2 className="w-4 h-4" style={{ color: '#3B82F6' }} />
            <span className="text-sm font-semibold" style={{ color: '#0F172A', fontSize: '14px' }}>Share</span>
          </Button>
        </div>

        {/* Bottom Row: Save Contact & Gallery */}
        <div className="grid grid-cols-2 gap-2 actions-row-bottom">
          <Button
            onClick={handleSaveContact}
            className="h-11 bg-white/80 hover:bg-white/90 backdrop-blur-md text-slate-700 font-medium rounded-2xl border-2 border-teal-500/70 hover:border-teal-600/90 relative overflow-hidden transition-all touch-manipulation"
            style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
              WebkitTapHighlightColor: 'transparent',
              fontSize: '14px'
            }}
          >
            {/* Animated border highlight glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-teal-400/30 to-transparent animate-[shimmer_2s_infinite] pointer-events-none" />
            <div className="relative z-10 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium" style={{ fontSize: '14px' }}>{t('saveContact')}</span>
            </div>
          </Button>
          <Link 
            href="/gallery" 
            className="h-11 gallery-btn font-medium rounded-2xl transition-all flex items-center justify-center gap-2 px-3 active:scale-[0.98] bg-white/80 backdrop-blur-md hover:bg-white/90 touch-manipulation"
            style={{ 
              color: '#0F172A',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            <div className="flex items-center -space-x-1.5 relative z-10">
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center overflow-hidden relative"
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
              >
                <Image
                  src="/gallery/WhatsApp Image 2025-12-13 at 17.08.07.jpeg"
                  alt="Gallery"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center overflow-hidden relative"
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
              >
                <Image
                  src="/gallery/WhatsApp Image 2025-12-13 at 17.08.12.jpeg"
                  alt="Gallery"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
            <span className="text-sm font-medium" style={{ color: '#0F172A', fontSize: '14px' }}>Gallery</span>
          </Link>
        </div>


        {/* Call Selector - Bottom Pop-out */}
        <AnimatePresence>
          {callSelectorOpen && (
            <>
              {/* Popup */}
              <motion.div
                ref={callSelectorRef}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="popup-selector fixed bottom-0 left-0 right-0 z-[9999] bg-white rounded-3xl shadow-2xl p-6 pb-8 m-4 mb-6"
                style={{ 
                  paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
                  maxHeight: '80vh'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-base font-semibold text-slate-800">Select Number to Call</div>
                  <button
                    onClick={() => setCallSelectorOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <div className="flex gap-4 justify-center flex-wrap">
                  {shopConfig.contactPersons.map((person) => (
                    <motion.button
                      key={person.label}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: shopConfig.contactPersons.indexOf(person) * 0.1 }}
                      onClick={() => handleCall(person)}
                      className="flex flex-col items-center gap-2 touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                        <Phone className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-xs font-semibold text-slate-800 text-center">{person.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* WhatsApp Selector - Bottom Pop-out */}
        <AnimatePresence>
          {whatsappSelectorOpen && (
            <>
              {/* Popup */}
              <motion.div
                ref={whatsappSelectorRef}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="popup-selector fixed bottom-0 left-0 right-0 z-[9999] bg-white rounded-3xl shadow-2xl p-6 pb-8 m-4 mb-6"
                style={{ 
                  paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
                  maxHeight: '80vh'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-base font-semibold text-slate-800">Select Number for WhatsApp</div>
                  <button
                    onClick={() => setWhatsappSelectorOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <div className="flex gap-4 justify-center flex-wrap">
                  {shopConfig.contactPersons.map((person) => (
                    <motion.button
                      key={person.label}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: shopConfig.contactPersons.indexOf(person) * 0.1 }}
                      onClick={() => handleWhatsApp(person)}
                      className="flex flex-col items-center gap-2 touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-[#25D366] to-[#20BA5A] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-slate-800 text-center">{person.label}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  )
})

ActionsRow.displayName = 'ActionsRow'

export default ActionsRow
