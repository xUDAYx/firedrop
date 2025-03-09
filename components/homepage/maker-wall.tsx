"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Sparkles, ExternalLink, X, PlayCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const testimonials = [
  {
    author: {
      name: <span>Rahul <span className="blur-[5px] select-none opacity-70">Kumar</span></span>,
      role: "AI/ML Student, Class of '24",
      avatar: "/avatars/avatar.svg"
    },
    rating: 5,
    content: (
      <span>
        I was{' '}
        <span className="bg-yellow-100/50 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-200 px-1.5 py-0.5 rounded-md font-medium">struggling with my final year AI/ML project</span>
        {' '}while my classmates were all doing similar basic models. These guys helped me{' '}
        <span className="bg-yellow-100/50 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-200 px-1.5 py-0.5 rounded-md font-medium">stand out with 96.11% accuracy</span>
        ! Not just that - they created a{' '}
        <span className="bg-yellow-100/50 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-200 px-1.5 py-0.5 rounded-md font-medium">professional UI and hosted everything online</span>
        . My age prediction model is now live 24/7 and my guide was super impressed. Definitely the best investment for my project!
      </span>
    ),
    images: [
      {
        src: "/testimonials/about.png",
        alt: "Project accuracy metrics showing 96.11% success rate"
      },
      {
        src: "/testimonials/pre-model.png",
        alt: "Live deployment dashboard and architecture"
      }
    ],
    date: "Feb 2024"
  },
  {
    author: {
      name: <span>Priya <span className="blur-[5px] select-none opacity-70">Singh</span></span>,
      role: "Data Science, Class of '23",
      avatar: "/avatars/bitmoji-2.svg"
    },
    rating: 5,
    content: (
      <span>
        The developer went above and beyond with this project! They{' '}
        <span className="bg-yellow-100/50 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-200 px-1.5 py-0.5 rounded-md font-medium">helped us every step of the way</span>
        {' '}- from installation to{' '}
        <span className="bg-yellow-100/50 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-200 px-1.5 py-0.5 rounded-md font-medium">explaining the architecture</span>
        . The{' '}
        <span className="bg-yellow-100/50 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-200 px-1.5 py-0.5 rounded-md font-medium">documentation was crystal clear</span>
        , and the modern UI design absolutely blew me away. The functionality works flawlessly and the user experience is exactly what we were looking for. Couldn't be happier!
      </span>
    ),
    image: "/testimonials/audiobook.jpg",
    date: "Jan 2024"
  },
  {
    author: {
      name: <span>Amit <span className="blur-[5px] select-none opacity-70">Verma</span></span>,
      role: "CS Student, Final Year",
      avatar: "/avatars/bitmoji-3.svg"
    },
    rating: 5,
    content: "They developed a complex blockchain project for my final year. The implementation included smart contracts and a beautiful frontend. Documentation was top-notch!",
    date: "Feb 2024"
  },
  {
    author: {
      name: <span>Neha <span className="blur-[5px] select-none opacity-70">Gupta</span></span>,
      role: "Web Development Major",
      avatar: "/avatars/bitmoji-4.svg"
    },
    rating: 5,
    content: "My e-commerce project was delivered with all requirements met. Clean code, responsive design, and great features like real-time cart updates and payment integration.",
    date: "Jan 2024"
  },
  {
    author: {
      name: <span>Arjun <span className="blur-[5px] select-none opacity-70">Reddy</span></span>,
      role: "Cybersecurity Student",
      avatar: "/avatars/bitmoji-5.svg"
    },
    rating: 5,
    content: (
      <span>
        These developers are{' '}
        <span className="bg-yellow-100/50 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-200 px-1.5 py-0.5 rounded-md font-medium">incredibly thorough</span>
        . They provided{' '}
        <span className="bg-yellow-100/50 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-200 px-1.5 py-0.5 rounded-md font-medium">detailed video explanations</span>
        {' '}for our security project implementation. We used their documentation for our{' '}
        <span className="bg-yellow-100/50 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-200 px-1.5 py-0.5 rounded-md font-medium">college presentation</span>
        . Outstanding work making complex concepts accessible.
      </span>
    ),
    video: "https://youtu.be/0Zp4EnEsBB0",
    image: `https://img.youtube.com/vi/0Zp4EnEsBB0/maxresdefault.jpg`,
    date: "Dec 2023"
  },
  {
    author: {
      name: <span>Riya <span className="blur-[5px] select-none opacity-70">Patel</span></span>,
      role: "IoT Project Student",
      avatar: "/avatars/bitmoji-6.svg"
    },
    rating: 5,
    content: (
      <span>
        I'm truly{' '}
        <span className="bg-yellow-100/50 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-200 px-1.5 py-0.5 rounded-md font-medium">grateful from the bottom of my heart</span> for your incredible support! Without your{' '}
        <span className="bg-yellow-100/50 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-200 px-1.5 py-0.5 rounded-md font-medium">expert guidance and dedication</span>, I would have never been able to publish my research paper. You didn't just help with the project - you{' '}
        <span className="bg-yellow-100/50 dark:bg-yellow-500/20 text-yellow-900 dark:text-yellow-200 px-1.5 py-0.5 rounded-md font-medium">transformed my academic journey</span>. Words can't express how thankful I am for making my dream of publication come true. Thank you for believing in me! 🙏
      </span>
    ),
    image: "/testimonials/research-paper.jpg",
    date: "Feb 2024"
  }
]

// Add a helper function to get YouTube video ID and thumbnail
const getYouTubeInfo = (url: string) => {
  const videoId = url.split('/').pop()
  return {
    videoId,
    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }
}

export default function MakerWall() {
  const [columns, setColumns] = useState(3)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Update columns based on container width
  useEffect(() => {
    const updateColumns = () => {
      if (!containerRef.current) return
      const width = containerRef.current.offsetWidth
      if (width < 768) {
        setColumns(1)
      } else if (width < 1024) {
        setColumns(2)
      } else {
        setColumns(3)
      }
    }

    updateColumns()
    window.addEventListener("resize", updateColumns)
    return () => window.removeEventListener("resize", updateColumns)
  }, [])

  // Distribute testimonials into columns for masonry layout
  const getColumnTestimonials = () => {
    const result: (typeof testimonials)[] = Array.from({ length: columns }, () => [])
    
    // Distribute testimonials to columns in original order
    testimonials.forEach((testimonial, index) => {
      const columnIndex = index % columns
      result[columnIndex].push(testimonial)
    })

    return result
  }

  const columnTestimonials = getColumnTestimonials()

  // Handle image click
  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc)
  }

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedImage(null)
  }

  // Handle click outside modal
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal()
    }
  }

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal()
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <>
      <section id="wall-of-love" className="relative py-24 overflow-hidden">
        {/* Background with dot pattern */}
        <div className="absolute inset-0 bg-dot-gray-100/50 dark:bg-dot-white/[0.2] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent -z-10" />
        
        <div className="container relative mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Pill badge - Updated colors to match theme */}
              <div className="mx-auto w-fit rounded-full border border-blue-200/30 bg-blue-50/50 dark:bg-blue-900/20 px-4 py-1.5">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-700 dark:text-blue-300">
                  <Sparkles className="h-4 w-4" />
                  <span>Student Success Stories</span>
                </div>
              </div>

              {/* Updated heading text and gradient colors */}
              <h2 className="text-[1.5rem] sm:text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-blue-200 dark:via-blue-100 dark:to-blue-200 pb-2 px-2 sm:px-4 leading-[1.2] md:leading-tight max-w-[300px] sm:max-w-none mx-auto">
                2000+ Students Achieved Excellence With Our Help
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-[280px] sm:max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed">
                See how students across different domains achieved top grades with our professional development service
              </p>
            </motion.div>
          </div>

          {/* Testimonial Cards - Updated border colors */}
          <div ref={containerRef} className="w-full">
            <div className="flex flex-wrap -mx-2" style={{ '--clr-rating': '#FBBF24' } as any}>
              {columnTestimonials.map((column, colIndex) => (
                <div
                  key={`column-${colIndex}`}
                  className={`px-2 w-full ${columns === 1 ? 'md:w-full' : columns === 2 ? 'md:w-1/2' : 'md:w-1/3'}`}
                >
                  {column.map((testimonial, index) => (
                    <motion.div
                      key={`testimonial-${colIndex}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="border border-blue-100 dark:border-blue-900/50 bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 mb-4 h-fit"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative w-12 h-12">
                          <Image
                            src={testimonial.author.avatar}
                            alt={`${testimonial.author.name} avatar`}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author.name}</div>
                          {testimonial.author.role && (
                            <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.author.role}</div>
                          )}
                        </div>
                      </div>

                      {testimonial.rating && (
                        <div className="flex gap-1 mb-4">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 -10 187.673 179.503"
                              fill={i < testimonial.rating ? "#FBBF24" : "rgba(180, 180, 180, 0.5)"}
                            >
                              <path d="M187.183 57.47a9.955 9.955 0 00-8.587-6.86l-54.167-4.918-21.42-50.134a9.978 9.978 0 00-9.172-6.052 9.972 9.972 0 00-9.172 6.061l-21.42 50.125L9.07 50.611a9.973 9.973 0 00-8.578 6.858 9.964 9.964 0 002.917 10.596l40.944 35.908-12.073 53.184a9.97 9.97 0 003.878 10.298A9.953 9.953 0 0042 169.357a9.937 9.937 0 005.114-1.424l46.724-27.925 46.707 27.925a9.936 9.936 0 0010.964-.478 9.979 9.979 0 003.88-10.298l-12.074-53.184 40.944-35.9a9.98 9.98 0 002.925-10.604z" />
                            </svg>
                          ))}
                        </div>
                      )}

                      <div className="text-gray-800 dark:text-gray-200 mb-4 whitespace-pre-wrap leading-relaxed">{testimonial.content}</div>

                      {testimonial.images ? (
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          {testimonial.images.map((image, idx) => (
                            <div 
                              key={idx}
                              className="relative w-full rounded-lg overflow-hidden group cursor-pointer"
                              onClick={() => handleImageClick(image.src)}
                            >
                              <div className="relative aspect-[16/9] w-full">
                                <Image
                                  src={image.src}
                                  alt={image.alt}
                                  fill
                                  className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                  priority
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                  <ExternalLink className="w-6 h-6 text-white" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : testimonial.image && (
                        <div 
                          className="relative w-full mb-4 rounded-lg overflow-hidden group cursor-pointer"
                          onClick={() => handleImageClick(testimonial.video || testimonial.image!)}
                        >
                          <div className="relative aspect-[16/9] w-full">
                            <Image
                              src={testimonial.image}
                              alt="Testimonial image"
                              fill
                              className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              priority
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                              {testimonial.video ? (
                                <PlayCircle className="w-12 h-12 text-white" />
                              ) : (
                                <ExternalLink className="w-6 h-6 text-white" />
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.date}</div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image/Video Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOutsideClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-7xl w-full aspect-video rounded-lg overflow-hidden"
            >
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              {selectedImage.includes('youtu.be') || selectedImage.includes('youtube.com') ? (
                <iframe
                  src={`https://www.youtube.com/embed/${selectedImage.split('/').pop()}?autoplay=1&mute=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <Image
                  src={selectedImage}
                  alt="Full size image"
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 