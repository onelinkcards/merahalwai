'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react'

// Gallery images - Latest 4 from videos folder first, then old gallery images
const allGalleryImages = [
  // Latest images from videos folder (newest first)
  '/videos/WhatsApp Image 2025-12-16 at 2.03.24 PM (1).jpeg',
  '/videos/WhatsApp Image 2025-12-16 at 2.03.24 PM.jpeg',
  '/videos/WhatsApp Image 2025-12-16 at 2.03.25 PM (1).jpeg',
  '/videos/WhatsApp Image 2025-12-16 at 2.03.25 PM (2).jpeg',
  '/videos/WhatsApp Image 2025-12-16 at 2.03.25 PM (3).jpeg',
  '/videos/WhatsApp Image 2025-12-16 at 2.03.25 PM.jpeg',
  '/videos/WhatsApp Image 2025-12-16 at 2.03.26 PM.jpeg',
  // Old gallery images
  '/shops/honeys-fresh-n-frozen/assets/gallery/WhatsApp Image 2025-12-13 at 17.08.07.jpeg',
  '/shops/honeys-fresh-n-frozen/assets/gallery/WhatsApp Image 2025-12-13 at 17.08.12.jpeg',
  '/shops/honeys-fresh-n-frozen/assets/gallery/WhatsApp Image 2025-12-13 at 17.08.13 (1).jpeg',
  '/shops/honeys-fresh-n-frozen/assets/gallery/WhatsApp Image 2025-12-13 at 17.08.13.jpeg',
  '/shops/honeys-fresh-n-frozen/assets/gallery/WhatsApp Image 2025-12-13 at 17.08.14.jpeg',
  '/shops/honeys-fresh-n-frozen/assets/gallery/WhatsApp Image 2025-12-13 at 17.10.32 (1).jpeg',
  '/shops/honeys-fresh-n-frozen/assets/gallery/WhatsApp Image 2025-12-13 at 17.10.32.jpeg',
  '/shops/honeys-fresh-n-frozen/assets/gallery/WhatsApp Image 2025-12-13 at 17.10.33 (1).jpeg',
  '/shops/honeys-fresh-n-frozen/assets/gallery/WhatsApp Image 2025-12-13 at 17.10.34 (1).jpeg',
  '/shops/honeys-fresh-n-frozen/assets/gallery/WhatsApp Image 2025-12-13 at 17.10.34.jpeg',
]

const galleryImages = allGalleryImages

export default function Gallery() {
  const router = useRouter()
  const [visibleImages] = useState(galleryImages.slice(0, 4))
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [imageLoading, setImageLoading] = useState(true)

  // Preload all gallery images on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      galleryImages.forEach((src) => {
        const img = document.createElement('img')
        img.src = src
      })
    }
  }, [])

  // Preload adjacent images when lightbox opens or index changes
  useEffect(() => {
    if (lightboxOpen && typeof window !== 'undefined') {
      setImageLoading(true)
      const preloadIndexes = [
        lightboxIndex === 0 ? galleryImages.length - 1 : lightboxIndex - 1,
        lightboxIndex,
        lightboxIndex === galleryImages.length - 1 ? 0 : lightboxIndex + 1,
      ]
      preloadIndexes.forEach((idx) => {
        const img = document.createElement('img')
        img.src = galleryImages[idx]
        img.onload = () => {
          if (idx === lightboxIndex) {
            setImageLoading(false)
          }
        }
      })
    }
  }, [lightboxOpen, lightboxIndex])

  const handleImageClick = (index: number, imageSrc: string) => {
    // Navigate to gallery page
    router.push('/gallery')
  }

  const openLightbox = (index: number) => {
    const actualIndex = galleryImages.indexOf(visibleImages[index])
    setLightboxIndex(actualIndex)
    setLightboxOpen(true)
    setImageLoading(true)
  }

  const handlePrevious = () => {
    setImageLoading(true)
    setLightboxIndex((prev) => {
      if (prev === 0) {
        return galleryImages.length - 1
      }
      return prev - 1
    })
  }

  const handleNext = () => {
    setImageLoading(true)
    setLightboxIndex((prev) => {
      if (prev === galleryImages.length - 1) {
        return 0
      }
      return prev + 1
    })
  }

  // Handle keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setImageLoading(true)
        setLightboxIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
      } else if (e.key === 'ArrowRight') {
        setImageLoading(true)
        setLightboxIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
      } else if (e.key === 'Escape') {
        setLightboxOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen])

  return (
    <section id="gallery" className="w-full max-w-md mx-auto px-4 pt-8 pb-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="mb-5 px-2"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
          Gallery
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-medium">
          Explore Videos and Images
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {visibleImages.map((imageSrc, index) => (
          <motion.div
            key={`gallery-${index}-${imageSrc}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.1 }}
            className="rounded-2xl shadow-xl overflow-hidden cursor-pointer group hover:shadow-2xl hover:-translate-y-1 transition-all relative aspect-square bg-gray-800"
            style={{ 
              willChange: 'opacity, transform',
            }}
            onClick={() => handleImageClick(index, imageSrc)}
          >
            <Image
              src={imageSrc}
              alt={`Gallery image ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 50vw, 33vw"
              priority={index < 2}
              loading={index < 2 ? "eager" : "lazy"}
              unoptimized
            />
            
            {/* Subtle overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Hover indicator */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <p className="text-slate-800 font-semibold text-sm">View Gallery</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close Button - Top Right */}
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-md border border-white/20"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image Container */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src={galleryImages[lightboxIndex]}
                alt={`Gallery image ${lightboxIndex + 1}`}
                width={1600}
                height={1600}
                className={`w-full h-auto max-h-[90vh] object-contain rounded-xl transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
                priority
                quality={90}
                unoptimized
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />
              
              {/* Image Counter - Bottom Center */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="text-white text-sm font-medium">
                  {lightboxIndex + 1} / {galleryImages.length}
                </span>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            {galleryImages.length > 1 && (
              <>
                {/* Previous Button - Left Side */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrevious()
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-md border border-white/20"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                
                {/* Next Button - Right Side */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNext()
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-md border border-white/20"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="mt-5"
      >
        <Link
          href="/gallery"
          className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          View Gallery
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>

    </section>
  )
}
