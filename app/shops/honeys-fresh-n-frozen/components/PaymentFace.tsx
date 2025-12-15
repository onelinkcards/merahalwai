'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, ArrowLeft, Check, CreditCard, Shield, Lock, Download, Share2, QrCode } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '../../../contexts/LanguageContext'
import { shopConfig } from '../config'

interface PaymentFaceProps {
  upiId: string
  upiName: string
  amountINR?: number
  upiQrImageUrl?: string
  scannerImage?: string
  bank?: {
    bankName: string
    accountNumberMasked: string
    ifsc: string
    accountHolder: string
    branchName?: string
  }
  onBack: () => void
}

// Build UPI deep link - Secure and properly encoded
function buildUpiLink(upiId: string, upiName: string, amount?: number): string {
  // URLSearchParams automatically encodes special characters like @
  const params = new URLSearchParams({
    pa: upiId, // Payee Address (UPI ID) - @ symbol will be encoded as %40
    pn: upiName, // Payee Name
    cu: 'INR', // Currency
  })
  if (amount && amount > 0) {
    params.set('am', amount.toString())
  }
  return `upi://pay?${params.toString()}`
}

// Copy to clipboard with toast
function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
    }
  }

  return { copy, copied }
}

export default function PaymentFace({
  upiId,
  upiName,
  amountINR,
  upiQrImageUrl,
  scannerImage,
  bank,
  onBack,
}: PaymentFaceProps) {
  const { t } = useLanguage()
  const { copy: copyUpi, copied: upiCopied } = useCopyToClipboard()
  const { copy: copyBank, copied: bankCopied } = useCopyToClipboard()
  const { copy: copyAccountHolder, copied: accountHolderCopied } = useCopyToClipboard()
  const { copy: copyBankName, copied: bankNameCopied } = useCopyToClipboard()
  const { copy: copyAccountNumber, copied: accountNumberCopied } = useCopyToClipboard()
  const { copy: copyIFSC, copied: ifscCopied } = useCopyToClipboard()
  const [paymentModalOpen, setPaymentModalOpen] = useState(false)
  const [bankTransferModalOpen, setBankTransferModalOpen] = useState(false)
  const [scannerModalOpen, setScannerModalOpen] = useState(false)
  const [canShare, setCanShare] = useState(false)

  const upiLink = buildUpiLink(upiId, upiName, amountINR)

  // Generate QR code URL from UPI ID if not provided
  const getQRCodeUrl = () => {
    if (upiQrImageUrl) return upiQrImageUrl
    // Generate QR code using UPI link
    const encodedUpiLink = encodeURIComponent(upiLink)
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodedUpiLink}&bgcolor=ffffff&color=000000&margin=1`
  }

  const qrCodeUrl = getQRCodeUrl()

  // Check if Web Share API is available
  useEffect(() => {
    setCanShare(!!navigator.share && !!navigator.canShare)
  }, [])

  // Download QR Code
  const handleDownloadQR = async () => {
    try {
      // Fetch QR code image and download
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `upi-qr-${upiId.replace('@', '-')}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      // Fallback: create img element to convert to canvas
      const img = new window.Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        if (ctx) {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0)
          canvas.toBlob((blob) => {
            if (blob) {
              const url = window.URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `upi-qr-${upiId.replace('@', '-')}.png`
              document.body.appendChild(a)
              a.click()
              window.URL.revokeObjectURL(url)
              document.body.removeChild(a)
            }
          }, 'image/png')
        }
      }
      img.src = qrCodeUrl
    }
  }

  // Share QR Code
  const handleShareQR = async () => {
    if (!canShare) return

    try {
      // Fetch QR image as blob
      const response = await fetch(qrCodeUrl)
      const blob = await response.blob()
      const file = new File([blob], `upi-qr-${upiId.replace('@', '-')}.png`, { type: 'image/png' })

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'UPI Payment QR Code',
          text: `Scan to pay ${upiName}`,
          files: [file],
        })
      }
    } catch (error) {
    }
  }

  // Build Paytm app deep link with UPI ID - Secure and optimized
  const buildPaytmLink = () => {
    // URLSearchParams automatically encodes @ symbol as %40
    const params = new URLSearchParams({
      pa: upiId, // Payee Address (UPI ID) - Same account for all apps
      pn: upiName, // Payee Name
      cu: 'INR', // Currency
    })
    if (amountINR && amountINR > 0) {
      params.set('am', amountINR.toString()) // Amount
    }
    // Paytm deep link - opens Paytm app directly with pre-filled UPI ID
    return `paytmmp://pay?${params.toString()}`
  }

  // Build Google Pay deep link - Secure and optimized
  const buildGooglePayLink = () => {
    // URLSearchParams automatically encodes @ symbol as %40
    const params = new URLSearchParams({
      pa: upiId, // Payee Address (UPI ID) - Same account for all apps
      pn: upiName, // Payee Name
      cu: 'INR', // Currency
    })
    if (amountINR && amountINR > 0) {
      params.set('am', amountINR.toString()) // Amount
    }
    // Google Pay deep link - opens Google Pay app directly with pre-filled UPI ID
    return `tez://upi/pay?${params.toString()}`
  }

  // Build PhonePe UPI link - Secure and optimized
  const buildPhonePeLink = () => {
    // URLSearchParams automatically encodes @ symbol as %40
    const params = new URLSearchParams({
      pa: upiId, // Payee Address (UPI ID) - Same account for all apps
      pn: upiName, // Payee Name
      cu: 'INR', // Currency
    })
    if (amountINR && amountINR > 0) {
      params.set('am', amountINR.toString()) // Amount
    }
    // PhonePe deep link - opens PhonePe app directly with pre-filled UPI ID
    return `phonepe://pay?${params.toString()}`
  }

  const handlePayWithPaytm = () => {
    try {
      const paytmLink = buildPaytmLink()
      setPaymentModalOpen(false)
      
      // Open Paytm app with UPI ID pre-filled
      window.location.href = paytmLink
      
      // Smart fallback: if Paytm app doesn't open, use standard UPI link
      setTimeout(() => {
        if (document.hasFocus()) {
          // App didn't open, fallback to standard UPI
          window.open(upiLink, '_blank')
        }
      }, 1500)
    } catch (error) {
      // Fallback to standard UPI link on error
      window.open(upiLink, '_blank')
      setPaymentModalOpen(false)
    }
  }

  const handlePayWithGooglePay = () => {
    try {
      const googlePayLink = buildGooglePayLink()
      setPaymentModalOpen(false)
      
      // Open Google Pay app with UPI ID pre-filled
      window.location.href = googlePayLink
      
      // Smart fallback: if Google Pay app doesn't open, use standard UPI link
      setTimeout(() => {
        if (document.hasFocus()) {
          // App didn't open, fallback to standard UPI
          window.open(upiLink, '_blank')
        }
      }, 1500)
    } catch (error) {
      // Fallback to standard UPI link on error
      window.open(upiLink, '_blank')
      setPaymentModalOpen(false)
    }
  }

  const handlePayWithPhonePe = () => {
    try {
      const phonePeLink = buildPhonePeLink()
      setPaymentModalOpen(false)
      
      // Open PhonePe app with UPI ID pre-filled
      window.location.href = phonePeLink
      
      // Smart fallback: if PhonePe app doesn't open, use standard UPI link
      setTimeout(() => {
        if (document.hasFocus()) {
          // App didn't open, fallback to standard UPI
          window.open(upiLink, '_blank')
        }
      }, 1500)
    } catch (error) {
      // Fallback to standard UPI link on error
      window.open(upiLink, '_blank')
      setPaymentModalOpen(false)
    }
  }

  const handleCopyUpi = () => {
    copyUpi(upiId)
  }

  const handleCopyBank = () => {
    if (bank) {
      const bankDetails = `Bank: ${bank.bankName}${bank.branchName ? `\nBranch: ${bank.branchName}` : ''}\nAccount: ${bank.accountNumberMasked}\nIFSC: ${bank.ifsc}\nHolder: ${bank.accountHolder}`
      copyBank(bankDetails)
    }
  }

  const handleCopyAccountHolder = () => {
    if (bank) {
      copyAccountHolder(bank.accountHolder)
    }
  }

  const handleCopyBankName = () => {
    if (bank) {
      copyBankName(bank.bankName)
    }
  }

  const handleCopyAccountNumber = () => {
    if (bank) {
      copyAccountNumber(bank.accountNumberMasked)
    }
  }

  const handleCopyIFSC = () => {
    if (bank) {
      copyIFSC(bank.ifsc)
    }
  }

  // Handle Escape key to go back
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onBack])

  return (
    <div
      className="rounded-[24px] shadow-2xl overflow-y-auto border-2 border-slate-700/50 relative w-full max-w-md mx-auto"
      style={{
        background: 'radial-gradient(circle at 50% 50%, #1FB6D9 0%, #0E7490 50%, #111315 100%)',
        backfaceVisibility: 'hidden',
        willChange: 'transform',
        minHeight: '580px',
        borderRadius: '24px'
      }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-[24px]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          borderRadius: '24px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 py-6 text-center" style={{ minHeight: 'auto', paddingBottom: '6rem', pointerEvents: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="w-full max-w-xs"
        >
          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-black text-white mb-2 tracking-tight drop-shadow-lg" style={{ fontSize: '24px' }}>
              {t('securePayment')}
            </h2>
            <div className="flex items-center justify-center gap-2 text-white/70 text-xs">
              <Lock className="w-3.5 h-3.5" />
              <span style={{ fontSize: '12px' }}>{t('secureEncrypted')}</span>
            </div>
          </motion.div>

          {/* Transfer via Bank Button */}
          {bank && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="mb-3"
            >
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setBankTransferModalOpen(true)
                }}
                className="w-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white font-bold py-3.5 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer relative z-20 touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent', fontSize: '14px', minHeight: '52px' }}
                aria-label={t('transferViaBank')}
              >
                <CreditCard className="w-5 h-5 pointer-events-none" />
                <span className="pointer-events-none">{t('transferViaBank')}</span>
              </motion.button>
            </motion.div>
          )}

          {/* Pay via Scanner Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.3 }}
            className="mb-3"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setScannerModalOpen(true)
              }}
              className="w-full bg-white hover:bg-gray-50 font-bold py-3.5 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer relative z-20 touch-manipulation border-[1.5px]"
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                borderColor: 'rgba(31, 182, 217, 0.35)',
                color: '#0E7490',
                boxShadow: '0 2px 8px rgba(14, 116, 144, 0.08)',
                fontSize: '14px',
                minHeight: '52px'
              }}
              aria-label="Pay via Scanner"
            >
              <QrCode className="w-5 h-5" style={{ color: '#1FB6D9' }} />
              <span className="pointer-events-none">Pay via Scanner</span>
            </motion.button>
          </motion.div>

          {/* Payment Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="mb-3 relative z-20"
          >
            {/* Pay via UPI Button */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setPaymentModalOpen(true)
              }}
              className="w-full text-white font-bold py-3.5 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 cursor-pointer relative z-30 touch-manipulation"
              style={{ 
                WebkitTapHighlightColor: 'transparent',
                background: 'linear-gradient(135deg, #0E7490 0%, #1FB6D9 50%, #0E7490 100%)',
                boxShadow: '0 4px 16px rgba(14, 116, 144, 0.3), 0 2px 8px rgba(14, 116, 144, 0.2)',
                fontSize: '14px',
                minHeight: '52px'
              }}
              aria-label="Pay via UPI"
            >
              {/* Horizontal Payment Logos */}
              <div className="flex items-center gap-1.5">
                <Image
                  src="/icons8-paytm-48.png"
                  alt="Paytm"
                  width={22}
                  height={22}
                  className="w-5.5 h-5.5 object-contain"
                  style={{ filter: 'brightness(1.1) contrast(1.1)' }}
                />
                <Image
                  src="/icons8-google-pay-48.png"
                  alt="Google Pay"
                  width={22}
                  height={22}
                  className="w-5.5 h-5.5 object-contain"
                  style={{ filter: 'brightness(1.1) contrast(1.1)' }}
                />
                <Image
                  src="/icons8-phone-pe-48.png"
                  alt="PhonePe"
                  width={22}
                  height={22}
                  className="w-5.5 h-5.5 object-contain"
                  style={{ filter: 'brightness(1.1) contrast(1.1)' }}
                />
              </div>
              <span>{t('payViaUPI')}</span>
            </motion.button>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="mb-4 relative z-20"
          >
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onBack()
              }}
              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-2.5 px-4 rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer relative z-30 touch-manipulation"
              style={{ WebkitTapHighlightColor: 'transparent', fontSize: '14px' }}
              aria-label={t('backToDetails')}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('backToDetails')}</span>
            </motion.button>
          </motion.div>

          {/* Helper Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="mt-4 mb-0"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <p className="text-white/80 text-xs font-medium" style={{ fontSize: '12px' }}>
                {t('securePaymentGateway')}
              </p>
            </div>
            <p className="text-white/60 text-xs" style={{ fontSize: '12px' }}>
              {t('worksWith')}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* OneLink Branding - Bottom Edge */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 pb-3 pt-2 px-4"
      >
        <div className="flex items-center justify-center">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
            style={{
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              background: 'rgba(30, 30, 30, 0.8)',
              borderColor: 'rgba(255, 255, 255, 0.2)'
            }}
          >
            <Shield className="w-3.5 h-3.5" style={{ color: '#e0e0e0' }} />
            <span 
              className="text-xs font-semibold flex items-center gap-1.5"
              style={{ 
                color: '#e0e0e0',
                fontSize: '12px',
                fontWeight: 600
              }}
            >
              Secure payment gateway
              <span style={{ color: '#9ca3af' }}>•</span>
              OneLink
            </span>
            <Image
              src="/gallery/onelink.png"
              alt="OneLink Logo"
              width={32}
              height={11}
              className="opacity-100 w-8 h-auto"
              quality={100}
              priority
            />
          </div>
        </div>
      </motion.div>

      {/* Payment Options Modal - Same Card */}
      <AnimatePresence>
        {paymentModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 rounded-[24px] flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(31, 182, 217, 0.95) 0%, rgba(14, 116, 144, 0.95) 50%, rgba(17, 19, 21, 0.98) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setPaymentModalOpen(false)
              }
            }}
          >
            {/* Grain overlay */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-[24px]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-50 w-full max-w-xs px-6"
              onClick={(e) => e.stopPropagation()}
              style={{ pointerEvents: 'auto' }}
            >
              <h3 className="text-2xl font-black text-white mb-6 tracking-tight drop-shadow-lg text-center" style={{ fontSize: '24px' }}>
                Choose Payment App
              </h3>
              
              <div className="space-y-3 mb-4 relative z-30">
                {/* Paytm Button - Blur Background */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handlePayWithPaytm()
                  }}
                  className="w-full bg-[#00BAF2]/25 hover:bg-[#00BAF2]/35 backdrop-blur-md border-2 border-[#00BAF2]/60 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 py-3.5 px-6 cursor-pointer touch-manipulation"
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    pointerEvents: 'auto',
                    WebkitTouchCallout: 'none',
                    userSelect: 'none'
                  }}
                  aria-label="Pay with Paytm"
                >
                  <Image
                    src="/icons8-paytm-48.png"
                    alt="Paytm"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                    style={{ pointerEvents: 'none', filter: 'brightness(1.2) contrast(1.2)' }}
                  />
                  <span className="text-white font-bold text-base">Paytm</span>
                </motion.button>

                {/* Google Pay Button - Blur Background */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handlePayWithGooglePay()
                  }}
                  className="w-full bg-[#4285F4]/25 hover:bg-[#4285F4]/35 backdrop-blur-md border-2 border-[#4285F4]/60 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 py-3.5 px-6 cursor-pointer touch-manipulation"
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    pointerEvents: 'auto',
                    WebkitTouchCallout: 'none',
                    userSelect: 'none'
                  }}
                  aria-label="Pay with Google Pay"
                >
                  <Image
                    src="/icons8-google-pay-48.png"
                    alt="Google Pay"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                    style={{ pointerEvents: 'none', filter: 'brightness(1.2) contrast(1.2)' }}
                  />
                  <span className="text-white font-bold text-base">Google Pay</span>
                </motion.button>

                {/* PhonePe Button - Blur Background */}
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handlePayWithPhonePe()
                  }}
                  className="w-full bg-[#5F259F]/25 hover:bg-[#5F259F]/35 backdrop-blur-md border-2 border-[#5F259F]/60 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 py-3.5 px-6 cursor-pointer touch-manipulation"
                  style={{ 
                    WebkitTapHighlightColor: 'transparent',
                    pointerEvents: 'auto',
                    WebkitTouchCallout: 'none',
                    userSelect: 'none'
                  }}
                  aria-label="Pay with PhonePe"
                >
                  <Image
                    src="/icons8-phone-pe-48.png"
                    alt="PhonePe"
                    width={32}
                    height={32}
                    className="w-8 h-8 object-contain"
                    style={{ pointerEvents: 'none', filter: 'brightness(1.2) contrast(1.2)' }}
                  />
                  <span className="text-white font-bold text-base">PhonePe</span>
                </motion.button>
              </div>

              {/* Close Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setPaymentModalOpen(false)
                }}
                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-2.5 px-4 rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer relative z-30 touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent', fontSize: '14px' }}
              >
                <span>{t('close')}</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bank Transfer Modal Overlay - Same Card */}
      <AnimatePresence>
        {bankTransferModalOpen && bank && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 rounded-[24px] flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(31, 182, 217, 0.95) 0%, rgba(14, 116, 144, 0.95) 50%, rgba(17, 19, 21, 0.98) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setBankTransferModalOpen(false)
              }
            }}
          >
            {/* Grain overlay */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-[24px]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-xs px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-black text-white mb-6 tracking-tight drop-shadow-lg text-center" style={{ fontSize: '24px' }}>
                {t('bankDetails')}
              </h3>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-4 space-y-3">
                <div className="space-y-3">
                  {/* Account Holder Name */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-white/60 text-xs mb-0.5">{t('accountHolderName')}</p>
                      <p className="text-white font-semibold text-sm">{bank.accountHolder}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopyAccountHolder}
                      className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2.5 rounded-xl transition-all touch-manipulation"
                      style={{ WebkitTapHighlightColor: 'transparent', minWidth: '44px', minHeight: '44px' }}
                      aria-label="Copy Account Holder Name"
                    >
                      {accountHolderCopied ? (
                        <Check className="w-4 h-4 text-blue-300" />
                      ) : (
                        <Copy className="w-4 h-4 text-white" />
                      )}
                    </motion.button>
                  </div>
                  
                  {/* Bank Name */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-white/60 text-xs mb-0.5">{t('bankName')}</p>
                      <p className="text-white font-semibold text-sm">{bank.bankName}</p>
                      {bank.branchName && (
                        <p className="text-white/70 text-xs mt-0.5">{bank.branchName}</p>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopyBankName}
                      className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-xl transition-all"
                      aria-label="Copy Bank Name"
                    >
                      {bankNameCopied ? (
                        <Check className="w-4 h-4 text-blue-300" />
                      ) : (
                        <Copy className="w-4 h-4 text-white" />
                      )}
                    </motion.button>
                  </div>
                  
                  {/* Account Number */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-white/60 text-xs mb-0.5">{t('accountNumber')}</p>
                      <p className="text-white font-bold text-base tracking-wide">{bank.accountNumberMasked}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopyAccountNumber}
                      className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-xl transition-all"
                      aria-label="Copy Account Number"
                    >
                      {accountNumberCopied ? (
                        <Check className="w-4 h-4 text-blue-300" />
                      ) : (
                        <Copy className="w-4 h-4 text-white" />
                      )}
                    </motion.button>
                  </div>
                  
                  {/* IFSC Code */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-white/60 text-xs mb-0.5">{t('ifscCode')}</p>
                      <p className="text-white font-bold text-base tracking-wide">{bank.ifsc}</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleCopyIFSC}
                      className="flex-shrink-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-xl transition-all"
                      aria-label="Copy IFSC Code"
                    >
                      {ifscCopied ? (
                        <Check className="w-4 h-4 text-blue-300" />
                      ) : (
                        <Copy className="w-4 h-4 text-white" />
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setBankTransferModalOpen(false)}
                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-2.5 px-4 rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                style={{ fontSize: '14px' }}
              >
                <span className="pointer-events-none">{t('close')}</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanner Modal Overlay - Same Card */}
      <AnimatePresence>
        {scannerModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 rounded-[24px] flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(31, 182, 217, 0.95) 0%, rgba(14, 116, 144, 0.95) 50%, rgba(17, 19, 21, 0.98) 100%)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setScannerModalOpen(false)
              }
            }}
          >
            {/* Grain overlay */}
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none rounded-[24px]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />

            {/* Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-50 w-full max-w-xs px-4 py-3 flex flex-col"
              onClick={(e) => e.stopPropagation()}
              style={{ pointerEvents: 'auto', maxHeight: '90vh', overflowY: 'auto' }}
            >
              <h3 className="text-xl font-black text-white mb-3 tracking-tight drop-shadow-lg text-center">
                Scan to Pay
              </h3>
              
              {/* Scanner Image */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 mb-3">
                <div className="flex justify-center mb-2">
                  <Image
                    src={scannerImage || shopConfig.payment.scannerImage}
                    alt="Payment Scanner"
                    width={250}
                    height={250}
                    className="w-full max-w-[250px] h-auto object-contain rounded-lg"
                    priority
                    unoptimized
                  />
                </div>
                <p className="text-white/80 text-xs text-center">
                  Open your payment app and scan this code to make a payment
                </p>
              </div>

              {/* Download QR Code Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleDownloadQR()
                }}
                className="w-full bg-white hover:bg-gray-50 font-bold py-2.5 px-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer relative z-30 touch-manipulation border-[1.5px] mb-2"
                style={{ 
                  WebkitTapHighlightColor: 'transparent',
                  borderColor: 'rgba(31, 182, 217, 0.35)',
                  color: '#0E7490',
                  boxShadow: '0 2px 8px rgba(14, 116, 144, 0.08)'
                }}
                aria-label="Download QR Code"
              >
                <Download className="w-4 h-4" style={{ color: '#1FB6D9' }} />
                <span className="text-sm">Download QR Code</span>
              </motion.button>

              {/* Close Button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setScannerModalOpen(false)
                }}
                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-semibold py-2.5 px-4 rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer relative z-30 touch-manipulation"
                style={{ WebkitTapHighlightColor: 'transparent', fontSize: '14px' }}
                aria-label="Close Scanner"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm">Close</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

