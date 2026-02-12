'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
// Shop-specific components
import Hero from './shops/honeys-fresh-n-frozen/components/Hero'
import About from './shops/honeys-fresh-n-frozen/components/About'
import HowItWorks from './shops/mera-halwai/components/HowItWorks'
import WhyMeraHalwai from './shops/mera-halwai/components/WhyMeraHalwai'
import SocialConnect from './shops/honeys-fresh-n-frozen/components/SocialConnect'
import ContactCard from './shops/honeys-fresh-n-frozen/components/ContactCard'
// Shared components
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import LoadingScreen from './components/LoadingScreen'

export default function Home() {
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 3500)
    const fallbackTimer = setTimeout(() => setShowLoading(false), 5000)
    return () => {
      clearTimeout(timer)
      clearTimeout(fallbackTimer)
    }
  }, [])

  useEffect(() => {
    if (!showLoading && typeof window !== 'undefined' && window.location.hash === '#gallery') {
      window.history.replaceState(null, '', window.location.pathname)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [showLoading])

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      {!showLoading && (
        <main 
          className="min-h-screen pb-12 relative z-10"
          style={{ backgroundColor: '#1a1a1a' }}
        >
          <Hero />
          <About />
          <HowItWorks />
          <WhyMeraHalwai />
          <SocialConnect />
          <ContactCard />
          <Footer />
          <BackToTop />
        </main>
      )}
    </>
  )
}
