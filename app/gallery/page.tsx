'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Play, ChevronLeft, ChevronRight, X } from 'lucide-react'

// Gallery images from shop assets
const galleryImages = [
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

const galleryVideos: any[] = []

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  const openLightbox = (index: number) => {
    setPhotoIndex(index)
    setLightboxOpen(true)
  }

  const handlePrevious = () => {
    setPhotoIndex((prev) => {
      if (prev === 0) {
        return galleryImages.length - 1
      }
      return prev - 1
    })
  }

  const handleNext = () => {
    setPhotoIndex((prev) => {
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
        setPhotoIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
      } else if (e.key === 'ArrowRight') {
        setPhotoIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
      } else if (e.key === 'Escape') {
        setLightboxOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen])

  return (
    <main className="min-h-screen pb-12 relative z-10 bg-[#1a1a1a]">
      {/* Header */}
      <div className="border-b border-slate-700 sticky top-0 z-10 backdrop-blur-sm bg-black/30">
        <div className="max-w-md mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center gap-2 sm:gap-3">
          <Link
            href="/#gallery"
            className="p-2.5 sm:p-3 hover:bg-slate-800 rounded-full transition-colors"
            onClick={() => {
              if (typeof window !== 'undefined') {
                sessionStorage.setItem('fromGallery', 'true')
              }
            }}
          >
            <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7 text-slate-200" />
          </Link>
          <h1 className="text-lg sm:text-xl font-bold text-white" style={{ fontSize: 'clamp(1.125rem, 4vw, 1.25rem)' }}>Gallery</h1>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-md mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Images Section */}
        {galleryImages.length > 0 && (
          <div className="mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3 px-2" style={{ fontSize: 'clamp(1rem, 3.5vw, 1.125rem)' }}>Photos</h2>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {galleryImages.map((imageSrc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl sm:rounded-2xl shadow-md aspect-square overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all relative"
                  onClick={() => openLightbox(index)}
                  style={{ willChange: 'opacity', borderRadius: 'clamp(12px, 3vw, 16px)' }}
                >
                  <Image
                    src={imageSrc}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                    priority={index < 6}
                    loading={index < 6 ? 'eager' : 'lazy'}
                    quality={index < 6 ? 90 : 80}
                    unoptimized={false}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Videos Section */}
        {galleryVideos.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-3 px-2">Videos</h2>
            <div className="grid grid-cols-2 gap-3">
              {galleryVideos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: (galleryImages.length + index) * 0.03, duration: 0.3 }}
                  className="rounded-2xl shadow-md aspect-square overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all relative"
                  onClick={() => setSelectedVideo(video.src)}
                  style={{ backgroundColor: '#FDFFFF', willChange: 'opacity' }}
                >
                  <video
                    src={video.src}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-6 h-6 text-slate-900 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
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
              key={photoIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative max-w-5xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[photoIndex]}
                alt={`Gallery image ${photoIndex + 1}`}
                width={1600}
                height={1600}
                className="w-full h-auto max-h-[90vh] object-contain rounded-xl"
                priority
                quality={90}
              />
              
              {/* Image Counter - Bottom Center */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                <span className="text-white text-sm font-medium">
                  {photoIndex + 1} / {galleryImages.length}
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

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-slate-300 text-sm"
            >
              Close
            </button>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full rounded-lg"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </main>
  )
}
