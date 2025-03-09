"use client"

import { motion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"

export function WhatsAppButton() {
  const [whatsappLink, setWhatsappLink] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const [showButton, setShowButton] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)
  
  // Handle dialog close
  const handleCloseMessage = () => {
    setShowMessage(false)
    setIsPulsing(true)
    // Stop pulsing after 3 pulses (3 * 1000ms)
    setTimeout(() => setIsPulsing(false), 3000)
  }

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Handle scroll for mobile
    const handleScroll = () => {
      if (!isMobile) return
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight
        setShowButton(window.scrollY > heroBottom)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
      handleScroll() // Initial check
    }

    // Show message after delay (different timing for mobile/desktop)
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, isMobile ? 5000 : 3000) // Longer delay on mobile

    // Encoded phone number
    const encodedPhone = "OTkyMjY5OTc2Nw=="
    const decode = (encoded: string) => {
      try {
        const decoded = atob(encoded)
        return `https://wa.me/91${decoded}`
      } catch {
        return ""
      }
    }
    setWhatsappLink(decode(encodedPhone))

    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [isMobile])

  if (!whatsappLink || !showButton) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end">
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="mb-2 mr-4 relative"
          >
            <div className={`
              bg-white dark:bg-gray-800 rounded-lg shadow-lg relative
              ${isMobile ? 'p-2 max-w-[150px]' : 'p-4 max-w-[200px]'}
            `}>
              <button 
                onClick={handleCloseMessage}
                className="absolute -top-2 -right-2 w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                ×
              </button>
              <p className={`
                text-gray-800 dark:text-gray-200
                ${isMobile ? 'text-xs' : 'text-sm'}
              `}>
                👋 Need help with your project? Let's chat!
              </p>
              <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white dark:bg-gray-800"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className={isPulsing ? 'animate-pulse' : ''}
      >
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110 hover:shadow-xl group relative
            ${isMobile ? 'w-10 h-10' : 'w-14 h-14'}
            ${isPulsing ? 'ring-4 ring-green-500/50' : ''}
          `}
          aria-label="Chat on WhatsApp"
          onClick={(e) => {
            e.preventDefault()
            window.open(whatsappLink, '_blank', 'noopener,noreferrer')
            setShowMessage(false)
            setIsPulsing(false)
          }}
        >
          {/* Hover tooltip - only on desktop */}
          {!isMobile && (
            <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black/75 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
              Chat on WhatsApp
            </span>
          )}
          <div className={`relative ${isMobile ? 'w-6 h-6' : 'w-8 h-8'}`}>
            <svg 
              viewBox="0 0 24 24" 
              className="w-full h-full fill-white"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
        </a>
      </motion.div>
    </div>
  )
} 