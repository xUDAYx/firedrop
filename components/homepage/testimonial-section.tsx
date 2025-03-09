"use client"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"
import { Clock, GraduationCap } from "lucide-react"
import { useState, useEffect } from "react"

// Move testimonials array outside the component
const testimonials = [
  {
    quote: "They delivered my machine learning project perfectly. The code quality and documentation were excellent, and they helped me understand every aspect of the implementation.",
    author: {
      name: <span>Rahul <span className="blur-[5px] select-none opacity-70">Really</span></span>,
      role: "AI/ML Student, Class of '24",
      image: "/emojis/student-avatar-1.png"  // Generic student avatar
    }
  },
  {
    quote: "Outstanding service! They helped me with a complex data science project. Not only did I get great grades, but I also learned a lot from their detailed documentation and explanations.",
    author: {
      name: <span>Priya <span className="blur-[5px] select-none opacity-70">Singh</span></span>,
      role: "Data Science, Class of '23",
      image: "/emojis/student-avatar-2.png"  // Generic student avatar
    }
  }
] as const

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % testimonials.length)
    }, 5000) // Switch every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-12 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-12 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
          {/* Comparison Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Project Success Rate</span>
                    <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                      100% Guaranteed
                    </span>
                  </div>
                </div>
              </div>

              {/* Comparison Cards */}
              <div className="space-y-6">
                {/* Self Development Card */}
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-red-50 dark:bg-red-900/30">
                      <Clock className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Self Development</h3>
                      <p className="text-sm text-gray-500 mt-1">Time-consuming and risky</p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex-1 h-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "40%" }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="h-full bg-red-500 dark:bg-red-400 rounded-full"
                          />
                        </div>
                        <span className="text-sm font-medium">40% Success Rate</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Professional Development Card */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Our Service</h3>
                      <p className="text-sm text-gray-500 mt-1">Professional development with support</p>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="flex-1 h-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
                          />
                        </div>
                        <span className="text-sm font-medium">100% Success Rate</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Testimonial Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <svg
                className="absolute -top-6 -left-8 h-16 w-16 text-blue-300 dark:text-blue-700"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <blockquote className="relative">
                    <p className="text-xl font-medium text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-blue-200 dark:via-blue-100 dark:to-blue-200">
                      {testimonials[currentIndex].quote}
                    </p>
                    <footer className="mt-8">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                          <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {testimonials[currentIndex].author.name}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {testimonials[currentIndex].author.role}
                          </div>
                        </div>
                      </div>
                    </footer>
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}