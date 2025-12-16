'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Play, ChevronLeft, ChevronRight, X, Image as ImageIcon, Video } from 'lucide-react'

// Gallery images from videos folder (new images first)
const galleryImages = [
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

// Gallery videos from videos folder
const galleryVideos = [
  {
    src: '/videos/IMG_1928.MOV',
    thumbnail: '/videos/WhatsApp Image 2025-12-16 at 2.03.24 PM (1).jpeg',
    title: 'Video 1'
  },
  {
    src: '/videos/IMG_1957.MOV',
    thumbnail: '/videos/WhatsApp Image 2025-12-16 at 2.03.25 PM (1).jpeg',
    title: 'Video 2'
  },
  {
    src: '/videos/IMG_5942.MOV',
    thumbnail: '/videos/WhatsApp Image 2025-12-16 at 2.03.25 PM (2).jpeg',
    title: 'Video 3'
  },
  {
    src: '/videos/WhatsApp Video 2025-12-16 at 1.56.47 PM.mp4',
    thumbnail: '/videos/WhatsApp Image 2025-12-16 at 2.03.25 PM (3).jpeg',
    title: 'Video 4'
  },
  {
    src: '/videos/WhatsApp Video 2025-12-16 at 1.59.37 PM.mp4',
    thumbnail: '/videos/WhatsApp Image 2025-12-16 at 2.03.26 PM.jpeg',
    title: 'Video 5'
  },
]

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [photoIndex, setPhotoIndex] = useState(0)
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState(true)

  // Preload all gallery images on mount for faster loading
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Preload first 10 images immediately
      galleryImages.slice(0, 10).forEach((src) => {
        const img = document.createElement('img')
        img.src = src
        img.loading = 'eager'
      })
      // Lazy preload remaining images
      setTimeout(() => {
        galleryImages.slice(10).forEach((src) => {
          const img = document.createElement('img')
          img.src = src
        })
      }, 500)
    }
  }, [])

  // Preload adjacent images when lightbox opens or index changes
  useEffect(() => {
    if (lightboxOpen && typeof window !== 'undefined') {
      setImageLoading(true)
      const preloadIndexes = [
        photoIndex === 0 ? galleryImages.length - 1 : photoIndex - 1,
        photoIndex,
        photoIndex === galleryImages.length - 1 ? 0 : photoIndex + 1,
      ]
      preloadIndexes.forEach((idx) => {
        const img = document.createElement('img')
        img.src = galleryImages[idx]
        img.onload = () => {
          if (idx === photoIndex) {
            setImageLoading(false)
          }
        }
      })
    }
  }, [lightboxOpen, photoIndex])

  const openLightbox = (index: number) => {
    setPhotoIndex(index)
    setLightboxOpen(true)
    setImageLoading(true)
  }

  const openVideo = (videoSrc: string) => {
    setSelectedVideo(videoSrc)
    // Auto scroll to top to ensure full view and close button visibility
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const handlePrevious = () => {
    setImageLoading(true)
    setPhotoIndex((prev) => {
      if (prev === 0) {
        return galleryImages.length - 1
      }
      return prev - 1
    })
  }

  const handleNext = () => {
    setImageLoading(true)
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
        setImageLoading(true)
        setPhotoIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
      } else if (e.key === 'ArrowRight') {
        setImageLoading(true)
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
        {/* Tab Buttons - Clean Single Color Design */}
        <div className="flex gap-3 mb-4 sm:mb-6 px-2">
          <motion.button
            onClick={() => setActiveTab('photos')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 px-5 py-3.5 rounded-2xl font-semibold text-sm sm:text-base transition-all relative overflow-hidden ${
              activeTab === 'photos'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/90 border border-slate-700/50'
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              <ImageIcon className={`w-5 h-5 ${activeTab === 'photos' ? 'text-white' : 'text-slate-400'}`} strokeWidth={2.5} />
              <span>Photos</span>
            </span>
          </motion.button>
          <motion.button
            onClick={() => setActiveTab('videos')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex-1 px-5 py-3.5 rounded-2xl font-semibold text-sm sm:text-base transition-all relative overflow-hidden ${
              activeTab === 'videos'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/90 border border-slate-700/50'
            }`}
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              <Video className={`w-5 h-5 ${activeTab === 'videos' ? 'text-white' : 'text-slate-400'}`} strokeWidth={2.5} />
              <span>Videos</span>
            </span>
          </motion.button>
        </div>

        {/* Images Section */}
        {activeTab === 'photos' && galleryImages.length > 0 && (
          <div>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {galleryImages.map((imageSrc, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
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
                    priority={index < 8}
                    loading={index < 8 ? 'eager' : 'lazy'}
                    quality={85}
                    unoptimized={false}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Videos Section - 2 per row in 9:16 */}
        {activeTab === 'videos' && galleryVideos.length > 0 && (
          <div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {galleryVideos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="rounded-xl sm:rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all relative bg-slate-900 w-full"
                  onClick={() => openVideo(video.src)}
                  style={{ willChange: 'opacity' }}
                >
                  {/* 9:16 Aspect Ratio Container - Portrait/Full Size */}
                  <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
                    {video.thumbnail ? (
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 33vw"
                        priority={index < 4}
                        loading={index < 4 ? 'eager' : 'lazy'}
                        quality={90}
                        unoptimized={false}
                      />
                    ) : (
                      <video
                        src={video.src}
                        className="absolute inset-0 w-full h-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                      />
                    )}
                    {/* Play Button Overlay - Larger on Mobile */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/95 rounded-full flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 sm:w-8 sm:h-8 text-slate-900 ml-0.5" fill="currentColor" />
                      </div>
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
              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src={galleryImages[photoIndex]}
                alt={`Gallery image ${photoIndex + 1}`}
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

      {/* Video Modal - Full Size 9:16 Lightbox */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/98 backdrop-blur-sm flex items-start justify-center pt-12 sm:pt-16 px-2 sm:px-4"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Video Container - Full Size 9:16 Portrait - Moved Up */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full mx-auto"
              onClick={(e) => e.stopPropagation()}
              style={{ 
                aspectRatio: '9/16',
                maxWidth: 'min(90vw, 400px)',
                maxHeight: '85vh',
                width: '100%'
              }}
            >
              {/* Close Button - Top Right - With Gap */}
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-[10000] p-2.5 sm:p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all backdrop-blur-md border-2 border-white/30 shadow-xl"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={2.5} />
              </button>
              
              <video
                src={selectedVideo}
                controls
                autoPlay
                className="w-full h-full rounded-xl sm:rounded-2xl shadow-2xl"
                style={{ objectFit: 'contain' }}
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
