'use client'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface AvatarCirclesProps {
  className?: string
}

export default function AvatarCircles({ className }: AvatarCirclesProps) {
  return (
    <div className={cn('z-10 flex flex-col mt-4 md:flex-row items-center justify-center gap-4 ', className)}>
      {/* Avatar Stack */}
      <div className="relative flex items-center -space-x-4 rtl:space-x-reverse">
        {[
          { src: '/testimonials/lennard.webp', alt: 'Lennard' },
          { src: '/testimonials/andrew.webp', alt: 'Andrew' },
          { src: '/testimonials/naveen.webp', alt: 'Naveen' },
          { src: '/testimonials/artificery.webp', alt: 'Artificery' },
          { src: '/testimonials/dunsin.webp', alt: 'Dunsin' }
        ].map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <img
              className="relative h-11 w-11 rounded-full border-2 border-background bg-background"
              src={image.src}
              alt={image.alt}
            />
          </motion.div>
        ))}
      </div>

      {/* Rating and Text */}
      <div className="flex items-center flex-col md:items-start">
        {/* Stars with animation */}
        <motion.div 
          className="flex mb-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.svg
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.5 + i * 0.1 }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 text-yellow-400 mr-1"
            >
              <path
                fillRule="evenodd"
                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                clipRule="evenodd"
              />
            </motion.svg>
          ))}
        </motion.div>

        {/* Text with gradient */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="text-sm font-medium"
        >
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent font-bold">
            2000+
          </span>
          <span className="text-muted-foreground ml-1">Students Helped</span>
        </motion.div>
      </div>
    </div>
  )
} 