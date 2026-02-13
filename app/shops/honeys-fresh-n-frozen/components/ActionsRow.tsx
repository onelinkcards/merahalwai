'use client'

import { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Download, MapPin, ShoppingCart, Share2, Star, X, Instagram } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { shopConfig, ContactPerson } from '../config'
import { getTelLink, getWhatsAppLink, formatPhoneDisplay } from '../../../lib/phone'
import { generateVCard, downloadVCard } from '../../../lib/vcard'
import { useLanguage } from '../../../contexts/LanguageContext'

const PRIMARY = '#EB8B23'
const SECONDARY = '#8A3E1D'

interface ActionsRowProps {
  onOpenPayments?: () => void
  variant?: 'default' | 'merahalwai'
}

export interface ActionsRowRef {
  openWhatsAppSelector: () => void
  openInstagramSelector: () => void
}

const ActionsRow = forwardRef<ActionsRowRef, ActionsRowProps>(({ onOpenPayments, variant = 'default' }, ref) => {
  const { t } = useLanguage()
  const [callSelectorOpen, setCallSelectorOpen] = useState(false)
  const [whatsappSelectorOpen, setWhatsappSelectorOpen] = useState(false)
  const [instagramSelectorOpen, setInstagramSelectorOpen] = useState(false)
  const callSelectorRef = useRef<HTMLDivElement>(null)
  const whatsappSelectorRef = useRef<HTMLDivElement>(null)
  const instagramSelectorRef = useRef<HTMLDivElement>(null)

  useImperativeHandle(ref, () => ({
    openWhatsAppSelector: () => {
      setWhatsappSelectorOpen(true)
      setCallSelectorOpen(false)
      setInstagramSelectorOpen(false)
    },
    openInstagramSelector: () => {
      setInstagramSelectorOpen(true)
      setCallSelectorOpen(false)
      setWhatsappSelectorOpen(false)
    }
  }))

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (callSelectorOpen || whatsappSelectorOpen || instagramSelectorOpen) {
        const target = e.target as HTMLElement
        if (!target.closest('.popup-selector') && !target.closest('[data-call-button]') && !target.closest('[data-whatsapp-button]') && !target.closest('[data-instagram-button]')) {
          setCallSelectorOpen(false)
          setWhatsappSelectorOpen(false)
          setInstagramSelectorOpen(false)
        }
      }
    }

    if (callSelectorOpen || whatsappSelectorOpen || instagramSelectorOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [callSelectorOpen, whatsappSelectorOpen, instagramSelectorOpen])

  // Mera Halwai: exactly 8 buttons, 4 rows. Call/WhatsApp open sliders like Honey (icon + label).
  if (variant === 'merahalwai') {
    type MeraHalwaiContact = { label: string; phoneE164: string; phoneDisplay: string; whatsappE164: string }
    const merahalwaiContact: MeraHalwaiContact = {
      label: 'Mera Halwai',
      phoneE164: '917300321034',
      phoneDisplay: '73003 21034',
      whatsappE164: '917300321034',
    }
    const merahalwaiContacts: MeraHalwaiContact[] = [merahalwaiContact]
    const handleCallMeraHalwai = (person: MeraHalwaiContact) => {
      window.location.href = getTelLink(person.phoneE164)
      setCallSelectorOpen(false)
    }
    const handleWhatsAppMeraHalwai = (person: MeraHalwaiContact) => {
      const message = "Hi, I'd like to explore catering options for my event."
      window.open(getWhatsAppLink(person.whatsappE164, message), '_blank', 'noopener,noreferrer')
      setWhatsappSelectorOpen(false)
    }
    const handleSaveContactMeraHalwai = () => {
      const vCard = generateVCard({
        name: 'Mera Halwai',
        organization: 'Mera Halwai',
        phones: ['7300321034'],
        email: 'hello@merahalwai.com',
        address: 'House number 1034 Mahaveer Nagar 2nd, Kota, Rajasthan 324005',
        website: 'https://www.merahalwai.com',
      })
      downloadVCard(vCard, 'Mera-Halwai-contact.vcf')
    }
    const btnClass = 'h-11 rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation font-semibold text-sm'
    const btnWhite = 'bg-white/90 backdrop-blur-md hover:bg-white border-2 border-slate-200/50'
    const rowClass = 'grid grid-cols-2 gap-2'
    return (
      <>
      <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
        {/* Row 1: Download App, Become Vendor */}
        <div className={rowClass}>
          <Link href="https://www.merahalwai.com/app" target="_blank" rel="noopener noreferrer"
            className={`${btnClass} text-white relative overflow-hidden`}
            style={{
              background: `linear-gradient(135deg, ${PRIMARY} 0%, ${PRIMARY}ee 50%, #d97a1a 100%)`,
              boxShadow: '0 10px 24px rgba(235,139,35,0.35), 0 4px 10px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.25)',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" style={{ animation: 'shimmer 2.5s infinite' }} />
            <span className="relative z-10">Download App</span>
          </Link>
          <Link href="https://vendors.merahalwai.com/vendor/onboarding" target="_blank" rel="noopener noreferrer"
            className={`${btnClass} bg-white/95 hover:bg-white backdrop-blur-md text-slate-800 rounded-2xl border-2 border-amber-700/60 hover:border-amber-800/80 relative overflow-hidden transition-all touch-manipulation`}
            style={{ boxShadow: '0 8px 20px rgba(120,53,15,0.18), 0 4px 8px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)', WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-amber-400/25 to-transparent pointer-events-none" style={{ animation: 'shimmer 2s infinite' }} />
            <span className="relative z-10 font-semibold">Become Vendor</span>
          </Link>
        </div>
        {/* Row 2: Call Now, WhatsApp - slider aata hai (Honey jaisa), icon + label */}
        <div className={rowClass}>
          <button
            type="button"
            data-call-button
            onClick={(e) => {
              e.stopPropagation()
              setCallSelectorOpen(true)
              setWhatsappSelectorOpen(false)
            }}
            className={`${btnClass} text-white relative overflow-hidden w-full`}
            style={{
              background: `linear-gradient(135deg, ${SECONDARY} 0%, #6b3018 100%)`,
              boxShadow: '0 10px 24px rgba(138,62,29,0.35), 0 4px 10px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" style={{ animation: 'shimmer 2.5s infinite' }} />
            <Phone className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Call Now</span>
          </button>
          <button
            type="button"
            data-whatsapp-button
            onClick={(e) => {
              e.stopPropagation()
              setWhatsappSelectorOpen(true)
              setCallSelectorOpen(false)
            }}
            className={`${btnClass} bg-white/95 hover:bg-white backdrop-blur-md rounded-2xl border-2 relative overflow-hidden transition-all w-full`}
            style={{ borderColor: '#25D366', color: '#0d9668', boxShadow: '0 8px 20px rgba(37,211,102,0.2), 0 4px 8px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.9)', WebkitTapHighlightColor: 'transparent' }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
            <span className="font-semibold">WhatsApp</span>
          </button>
        </div>
        {/* Row 3: Website, Review Us */}
        <div className={rowClass}>
          <Link href="https://www.merahalwai.com/" target="_blank" rel="noopener noreferrer"
            className={`${btnClass} ${btnWhite}`}
            style={{ color: '#0F172A', boxShadow: '0 8px 16px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.8)', WebkitTapHighlightColor: 'transparent' }}
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
            Website
          </Link>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); alert('Coming soon') }}
            className={`${btnClass} ${btnWhite}`}
            style={{ color: '#0F172A', boxShadow: '0 8px 16px rgba(234,179,8,0.25), 0 4px 8px rgba(234,179,8,0.2), inset 0 1px 0 rgba(255,255,255,0.8)', WebkitTapHighlightColor: 'transparent' }}
          >
            <Star className="w-4 h-4" style={{ color: '#EAB308' }} fill="#EAB308" />
            Review Us
          </button>
        </div>
        {/* Row 4: Save Contact, Payment */}
        <div className={rowClass}>
          <button type="button" onClick={handleSaveContactMeraHalwai}
            className={`${btnClass} bg-white/90 hover:bg-white backdrop-blur-md text-slate-700 rounded-2xl border-2 border-teal-500/70 hover:border-teal-600/90 relative overflow-hidden transition-all touch-manipulation`}
            style={{ boxShadow: '0 8px 16px rgba(0,0,0,0.15), 0 4px 8px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)', WebkitTapHighlightColor: 'transparent' }}
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-teal-400/30 to-transparent pointer-events-none" style={{ animation: 'shimmer 2s infinite' }} />
            <div className="relative z-10 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Save Contact
            </div>
          </button>
          {onOpenPayments && (
            <button type="button" onClick={(e) => { e.stopPropagation(); onOpenPayments(); }}
              className={`${btnClass} text-white`}
              style={{ backgroundColor: SECONDARY, boxShadow: '0 8px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)', WebkitTapHighlightColor: 'transparent' }}
            >
              <Image src="/icons8-bhim-48.png" alt="" width={16} height={16} className="w-4 h-4 object-contain brightness-0 invert" />
              Payment
            </button>
          )}
        </div>
      </div>

        {/* Mera Halwai: Call Selector - bottom slider (Honey jaisa, icon + label) */}
        <AnimatePresence>
          {callSelectorOpen && (
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="popup-selector fixed bottom-0 left-0 right-0 z-[9999] bg-white rounded-3xl shadow-2xl p-6 pb-8 m-4 mb-6"
              style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))', maxHeight: '80vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="text-base font-semibold text-slate-800">Select Number to Call</div>
                <button onClick={() => setCallSelectorOpen(false)} className="p-2 rounded-full hover:bg-slate-100 transition-colors" aria-label="Close">
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <div className="flex gap-4 justify-center flex-wrap">
                {merahalwaiContacts.map((person) => (
                  <motion.button
                    key={person.label}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => handleCallMeraHalwai(person)}
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
          )}
        </AnimatePresence>

        {/* Mera Halwai: WhatsApp Selector - bottom slider (Honey jaisa, icon + label) */}
        <AnimatePresence>
          {whatsappSelectorOpen && (
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="popup-selector fixed bottom-0 left-0 right-0 z-[9999] bg-white rounded-3xl shadow-2xl p-6 pb-8 m-4 mb-6"
              style={{ paddingBottom: 'calc(1.5rem + env(safe-area-inset-bottom))', maxHeight: '80vh' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="text-base font-semibold text-slate-800">Select Number for WhatsApp</div>
                <button onClick={() => setWhatsappSelectorOpen(false)} className="p-2 rounded-full hover:bg-slate-100 transition-colors" aria-label="Close">
                  <X className="w-5 h-5 text-slate-600" />
                </button>
              </div>
              <div className="flex gap-4 justify-center flex-wrap">
                {merahalwaiContacts.map((person) => (
                  <motion.button
                    key={person.label}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => handleWhatsAppMeraHalwai(person)}
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
          )}
        </AnimatePresence>
      </>
    )
  }

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shopConfig.name,
          text: `Check out ${shopConfig.name} - ${shopConfig.tagline}`,
          url: window.location.href,
        })
      } catch (err) {
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }


  return (
    <>
      <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
        {/* Top Row: Call Now, Payment */}
        <div className="flex gap-2 items-stretch">
          {/* Call Now - Enhanced Premium Design */}
          <Button
            data-call-button
            onClick={(e) => {
              e.stopPropagation()
              setCallSelectorOpen(!callSelectorOpen)
              setWhatsappSelectorOpen(false)
            }}
            className="flex-1 h-11 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation relative overflow-hidden group"
            style={{ 
              background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%)',
              boxShadow: '0 8px 20px rgba(37, 99, 235, 0.4), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(37, 99, 235, 0.5), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
              e.currentTarget.style.background = 'linear-gradient(135deg, #4A90F4 0%, #2E7CE8 50%, #2563EB 100%)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(37, 99, 235, 0.4), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(-1px) scale(1)'
              e.currentTarget.style.background = 'linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%)'
            }}
          >
            {/* Shine effect overlay */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                transform: 'translateX(-100%)',
                animation: 'shine-sweep 2s infinite'
            }}
            />
            <Phone className="w-4 h-4 relative z-10" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))' }} />
            <span className="text-sm primary-btn-text relative z-10 font-bold" style={{ fontSize: '14px', textShadow: '0 1px 2px rgba(0, 0, 0, 0.1)' }}>{t('callNow')}</span>
          </Button>

          {/* Payment Button with Enhanced Premium Design */}
          {onOpenPayments && (
            <div className="flex-1 relative">
              <span 
                className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 text-white text-[8px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap z-20 animate-pulse"
                style={{
                  background: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
                  boxShadow: '0 2px 8px rgba(239, 68, 68, 0.5), 0 0 12px rgba(239, 68, 68, 0.3)'
                }}
              >
                NEW
              </span>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  onOpenPayments()
                }}
                className="w-full h-11 text-white font-semibold rounded-full transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation relative overflow-hidden group"
                style={{ 
                  background: 'radial-gradient(circle at 30% 30%, rgb(21, 124, 130) 0%, rgb(15, 118, 110) 40%, rgb(17, 19, 21) 100%)',
                  boxShadow: '0 8px 20px rgba(21, 124, 130, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                  WebkitTapHighlightColor: 'transparent',
                  transform: 'translateY(-1px)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 12px 28px rgba(21, 124, 130, 0.5), 0 6px 12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                  e.currentTarget.style.background = 'radial-gradient(circle at 30% 30%, rgb(25, 140, 145) 0%, rgb(20, 130, 120) 40%, rgb(20, 25, 30) 100%)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(21, 124, 130, 0.4), 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                  e.currentTarget.style.transform = 'translateY(-1px) scale(1)'
                  e.currentTarget.style.background = 'radial-gradient(circle at 30% 30%, rgb(21, 124, 130) 0%, rgb(15, 118, 110) 40%, rgb(17, 19, 21) 100%)'
                }}
              >
                {/* Shine effect overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                    transform: 'translateX(-100%)',
                    animation: 'shine-sweep 2s infinite'
                  }}
                />
                <Image
                  src="/icons8-bhim-48.png"
                  alt="Payment"
                  width={16}
                  height={16}
                  className="w-4 h-4 object-contain relative z-10"
                  style={{ filter: 'brightness(0) invert(1) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}
                />
                <span className="text-sm primary-btn-text relative z-10 font-bold" style={{ fontSize: '14px', textShadow: '0 1px 2px rgba(0, 0, 0, 0.2)' }}>{t('openPayment')}</span>
              </Button>
            </div>
          )}
        </div>

        {/* Second Row: Menu/Order and Location */}
        <div className="grid grid-cols-2 gap-2">
          {/* Menu/Shopping Cart Button */}
          <Link
            href="https://honeymoneyfish.co/order-online/menu"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation"
            style={{ 
              color: '#0F172A',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              fontSize: '14px',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
          >
            <ShoppingCart className="w-4 h-4" style={{ color: '#475569', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }} />
            <span className="text-sm font-bold" style={{ color: '#0F172A', fontSize: '14px' }}>Menu/Order</span>
          </Link>
          
          {/* Location Button */}
          <Button
            onClick={handleDirections}
            className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation"
            style={{ 
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              fontSize: '14px',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
          >
            <MapPin className="w-4 h-4" style={{ color: '#EF4444', filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }} />
            <span className="text-sm font-bold" style={{ color: '#0F172A', fontSize: '14px' }}>Location</span>
          </Button>
        </div>

        {/* Third Row: Reviews and Share */}
        <div className="grid grid-cols-2 gap-2">
          {/* Review Button */}
          <Link
            href="/reviews"
            onClick={(e) => e.stopPropagation()}
            className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation"
            style={{ 
              color: '#0F172A',
              boxShadow: '0 8px 16px rgba(234, 179, 8, 0.25), 0 4px 8px rgba(234, 179, 8, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              fontSize: '14px',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(234, 179, 8, 0.3), 0 6px 12px rgba(234, 179, 8, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(234, 179, 8, 0.25), 0 4px 8px rgba(234, 179, 8, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
          >
            <Star className="w-4 h-4" style={{ color: '#EAB308' }} fill="#EAB308" />
            <span className="text-sm font-bold" style={{ color: '#0F172A', fontSize: '14px' }}>Reviews</span>
          </Link>

          {/* Share Button */}
          <Button
            onClick={(e) => {
              e.stopPropagation()
              handleShare()
            }}
            className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation"
            style={{ 
              color: '#0F172A',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              fontSize: '14px',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
          >
            <Share2 className="w-4 h-4" style={{ color: '#3B82F6' }} />
            <span className="text-sm font-bold" style={{ color: '#0F172A', fontSize: '14px' }}>Share</span>
          </Button>
        </div>

        {/* Bottom Row: Save Contact & Gallery */}
        <div className="grid grid-cols-2 gap-2 actions-row-bottom">
          <Button
            onClick={handleSaveContact}
            className="h-11 bg-white/90 hover:bg-white backdrop-blur-md text-slate-700 rounded-2xl border-2 border-teal-500/70 hover:border-teal-600/90 relative overflow-hidden transition-all touch-manipulation"
            style={{
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              fontSize: '14px',
              WebkitTapHighlightColor: 'transparent',
              transform: 'translateY(-1px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(21, 124, 130, 0.25), 0 6px 12px rgba(21, 124, 130, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
          >
            {/* Animated border highlight glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-teal-400/30 to-transparent animate-[shimmer_2s_infinite] pointer-events-none" />
            <div className="relative z-10 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              <span className="text-sm font-bold" style={{ fontSize: '14px' }}>{t('saveContact')}</span>
            </div>
          </Button>
          <Link 
            href="/gallery" 
            className="h-11 bg-white/90 backdrop-blur-md hover:bg-white rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.97] touch-manipulation"
            style={{ 
              color: '#0F172A',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
              borderRadius: '16px',
              WebkitTapHighlightColor: 'transparent',
              fontSize: '14px',
              transform: 'translateY(-1px)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
          >
            <div className="flex items-center -space-x-1.5 relative z-10">
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center overflow-hidden relative"
                style={{ boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}
              >
                <Image
                  src={shopConfig.assets.logo}
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
                  src={shopConfig.assets.logo}
                  alt="Gallery"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </div>
            <span className="text-sm font-bold" style={{ color: '#0F172A', fontSize: '14px' }}>Gallery</span>
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

        {/* Instagram Selector - Bottom Pop-out */}
        <AnimatePresence>
          {instagramSelectorOpen && (
            <>
              {/* Popup */}
              <motion.div
                ref={instagramSelectorRef}
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
                  <div className="text-base font-bold text-slate-800">Select Instagram Account</div>
                  <button
                    onClick={() => setInstagramSelectorOpen(false)}
                    className="p-2 rounded-full hover:bg-slate-100 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 text-slate-600" />
                  </button>
                </div>
                <div className="flex gap-6 justify-center flex-wrap">
                  {/* Frozen Nation Instagram */}
                  {shopConfig.social?.instagram && (
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      onClick={() => {
                        window.open(shopConfig.social.instagram, '_blank', 'noopener,noreferrer')
                        setInstagramSelectorOpen(false)
                      }}
                      className="flex flex-col items-center gap-3 touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform overflow-hidden p-1"
                        style={{
                          background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045)',
                        }}
                      >
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                          <Image
                            src="/social.png"
                            alt="Instagram"
                            width={72}
                            height={72}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-slate-800 mb-1">Frozen Nation</div>
                        <div className="text-xs text-slate-600">@frozennation.in</div>
                      </div>
                    </motion.button>
                  )}
                  
                  {/* Honey Money Fish Jammu Instagram */}
                  {shopConfig.social?.instagramJammu && (
                    <motion.button
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      onClick={() => {
                        window.open(shopConfig.social.instagramJammu, '_blank', 'noopener,noreferrer')
                        setInstagramSelectorOpen(false)
                      }}
                      className="flex flex-col items-center gap-3 touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform overflow-hidden p-1"
                        style={{
                          background: 'linear-gradient(135deg, #833AB4, #FD1D1D, #FCB045)',
                        }}
                      >
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                          <Image
                            src="/social.png"
                            alt="Instagram"
                            width={72}
                            height={72}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-slate-800 mb-1">Honey Money Fish</div>
                        <div className="text-xs text-slate-600">@honeymoneyfish_jammu</div>
                      </div>
                    </motion.button>
                  )}
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
