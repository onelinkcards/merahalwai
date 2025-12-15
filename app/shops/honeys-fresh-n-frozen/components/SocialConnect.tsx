'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronUp } from 'lucide-react'
import { shopConfig } from '../config'

export default function SocialConnect() {
  const [instagramSelectorOpen, setInstagramSelectorOpen] = useState(false)
  const instagramSelectorRef = useRef<HTMLDivElement>(null)

  // Check if URL hash or sessionStorage indicates to open Instagram selector
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if coming from Hero Instagram icon click
      const checkAndOpen = () => {
        const openInstagram = sessionStorage.getItem('openInstagramSelector')
        if (openInstagram === 'true') {
          setTimeout(() => {
            setInstagramSelectorOpen(true)
            sessionStorage.removeItem('openInstagramSelector')
          }, 600) // Wait for scroll to complete
        }
      }
      
      // Check immediately
      checkAndOpen()
      
      // Also check after a delay in case component loads before scroll
      const timeout = setTimeout(checkAndOpen, 1000)
      
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [])

  // Auto scroll when selector opens
  useEffect(() => {
    if (instagramSelectorOpen && instagramSelectorRef.current) {
      setTimeout(() => {
        instagramSelectorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 100)
    }
  }, [instagramSelectorOpen])

  const handleInstagramClick = (url: string) => {
    if (url) {
      window.open(url, '_blank')
      setInstagramSelectorOpen(false)
    }
  }

  // Extract Instagram username from URL
  const getInstagramUsername = (url: string) => {
    if (url) {
      const match = url.match(/instagram\.com\/([^/?]+)/)
      return match ? match[1] : 'instagram'
    }
    return 'instagram'
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full max-w-md mx-auto px-4 py-6"
    >
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 rounded-3xl p-6 shadow-lg text-center border border-pink-100/50">
        {/* Logo and Instagram Icon */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-md border-2 border-pink-200 overflow-hidden">
            <Image
              src="/logo-fish.png"
              alt={shopConfig.name}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-md overflow-hidden border-2 border-white">
            <Image
              src="/ins.jpg"
              alt="Instagram"
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-2">
          Follow Us on Instagram
        </h2>
        
        <p className="text-slate-600 mb-6 text-sm font-medium">
          Latest updates & fresh fish offers
        </p>
        
        {/* Instagram Button - Opens Selector */}
        <Button
          onClick={() => setInstagramSelectorOpen(!instagramSelectorOpen)}
          className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-semibold rounded-full h-12 px-8 shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current mr-2">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          Follow on Instagram
        </Button>

        {/* Instagram Selector - Slides in like Call Now */}
        <AnimatePresence>
          {instagramSelectorOpen && (
            <motion.div
              ref={instagramSelectorRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-4 space-y-2"
              style={{ overflow: 'visible', paddingBottom: '8px' }}
            >
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="text-xs font-semibold text-slate-600">Select Instagram Account</div>
                <button
                  onClick={() => setInstagramSelectorOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Close"
                >
                  <ChevronUp className="w-4 h-4 text-slate-600" />
                </button>
              </div>
              {/* Frozen Nation - First */}
              {shopConfig.social.instagram && (
                <button
                  onClick={() => handleInstagramClick(shopConfig.social.instagram)}
                  className="w-full h-14 bg-white/80 backdrop-blur-md hover:bg-white/90 rounded-2xl transition-all flex items-center gap-3 px-4"
                  style={{ 
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <div className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#E4405F" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }}>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="flex-1 flex flex-col items-start">
                    <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>@{getInstagramUsername(shopConfig.social.instagram)}</span>
                    <span className="text-xs font-medium" style={{ color: '#475569' }}>Frozen Nation</span>
                  </div>
                </button>
              )}
              {/* Honey Money Fish - Second */}
              {shopConfig.social.instagramJammu && (
                <button
                  onClick={() => handleInstagramClick(shopConfig.social.instagramJammu)}
                  className="w-full h-14 bg-white/80 backdrop-blur-md hover:bg-white/90 rounded-2xl transition-all flex items-center gap-3 px-4"
                  style={{ 
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)'
                  }}
                >
                  <div className="w-10 h-10 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#E4405F" style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))' }}>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>
                  <div className="flex-1 flex flex-col items-start">
                    <span className="text-sm font-semibold" style={{ color: '#0F172A' }}>@{getInstagramUsername(shopConfig.social.instagramJammu)}</span>
                    <span className="text-xs font-medium" style={{ color: '#475569' }}>Honey Money Fish</span>
                  </div>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}
