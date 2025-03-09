"use client"
import { motion } from "motion/react"
import { Sparkles } from "lucide-react"
import Image from "next/image"
import { JSX } from "react"

type Step = {
  number: string;
  title: string;
  description: string | JSX.Element;
  emojiImage: string;
  customContent: JSX.Element;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Share Your Project Details",
    description: (
      <div className="space-y-2">
        <div className="text-gray-600 dark:text-gray-400">
          Have a project requirement or need a project idea? We'll develop any type of project - from your specific requirements or we can create a custom project that matches your course needs.
        </div>
      </div>
    ),
    emojiImage: "/emojis/memo.png",
    customContent: (
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-dashed border-blue-200 dark:border-blue-800 rounded-xl p-6 max-w-md">
        <div className="space-y-4">
          <div className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-4">
            Project Development Options
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white text-sm">Your Project Requirements</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">We'll develop exactly what you need for your course</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white text-sm">Custom Project Creation</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">We'll create a project that meets your course criteria</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white text-sm">Quick Project Quote</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">Get project cost and timeline instantly</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              <div>
                <div className="font-medium text-gray-900 dark:text-white text-sm">All Project Types</div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">AI/ML, Data Science, Cybersecurity, Web Apps, more</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    number: "02",
    title: "Development & Updates",
    description: (
      <div className="space-y-2">
        <div className="text-gray-600 dark:text-gray-400">
          Our expert team develops your project with regular updates and progress reports. You can request changes and modifications at any stage.
        </div>
      </div>
    ),
    emojiImage: "/emojis/crystal-ball.png",
    customContent: (
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-dashed border-blue-200 dark:border-blue-800 rounded-xl p-6 max-w-md">
        <div className="space-y-4">
          <div className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-4">
            Development Progress
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3 bg-white dark:bg-blue-900/40 p-3 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300">
                📝
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-white">Planning</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Architecture & Design</div>
              </div>
              <div className="w-12 h-6 rounded-full bg-green-100 dark:bg-green-800/50 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-blue-900/40 p-3 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/>
                  <path d="M16 3h1a2 2 0 0 1 2 2v5a2 2 0 0 0 2 2 2 2 0 0 0-2 2v5a2 2 0 0 1-2 2h-1"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-white">Development</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Core functionality</div>
              </div>
              <div className="w-12 h-6 rounded-full bg-blue-100 dark:bg-blue-800/50 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-blue-900/40 p-3 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300">
                🧪
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-white">Testing</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">QA & Bug fixes</div>
              </div>
              <div className="w-12 h-6 rounded-full bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gray-500"></div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white dark:bg-blue-900/40 p-3 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300">
                📚
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-white">Documentation</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Guide & Reports</div>
              </div>
              <div className="w-12 h-6 rounded-full bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-gray-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    number: "03",
    title: "Project Delivery",
    description: (
      <div className="space-y-2">
        <div className="text-gray-600 dark:text-gray-400">
          Receive your complete project with full documentation, source code, and implementation guide. We ensure everything meets your requirements.
        </div>
        <div className="text-blue-600 dark:text-blue-400 font-medium">
          + Free post-delivery support
        </div>
      </div>
    ),
    emojiImage: "/emojis/bar-chart.png",
    customContent: (
      <div className="bg-blue-50 dark:bg-blue-950/30 border border-dashed border-blue-200 dark:border-blue-800 rounded-xl p-6 max-w-md">
        <div className="space-y-3">
          <div className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-4">
            Project Deliverables
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500 dark:text-gray-400">Source Code</div>
            <div className="text-gray-900 dark:text-gray-100">✓ Complete</div>
            
            <div className="text-gray-500 dark:text-gray-400">Documentation</div>
            <div className="text-gray-900 dark:text-gray-100">✓ Included</div>
            
            <div className="text-gray-500 dark:text-gray-400">Test Cases</div>
            <div className="text-gray-900 dark:text-gray-100">✓ Provided</div>
            
            <div className="text-gray-500 dark:text-gray-400">Setup Guide</div>
            <div className="text-gray-900 dark:text-gray-100">✓ Included</div>
            
            <div className="text-gray-500 dark:text-gray-400">Demo Video</div>
            <div className="text-gray-900 dark:text-gray-100">✓ Available</div>
            
            <div className="text-gray-500 dark:text-gray-400">Support</div>
            <div className="text-gray-900 dark:text-gray-100">✓ 30 Days Free</div>
            
            <div className="text-gray-500 dark:text-gray-400">Revisions</div>
            <div className="text-gray-900 dark:text-gray-100">✓ Unlimited</div>
          </div>
        </div>
      </div>
    )
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 dark:bg-blue-500 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="mx-auto w-fit rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 px-4 py-1 mb-6">
              <div className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-200">
                <Sparkles className="h-4 w-4" />
                <span>Simple Process</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-blue-200 dark:via-blue-100 dark:to-blue-200 pb-2">
              How It Works
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              Get your project done in three simple steps
            </p>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-[15px] md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500/60 to-blue-500/10 z-[1]" />

            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative mb-12 last:mb-0"
              >
                <div className={`flex flex-col md:flex-row gap-8 md:gap-16 items-start ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}>
                  {/* Content Side */}
                  <div className="flex-1 relative pl-12 md:pl-0">
                    {/* Number Badge - Mobile */}
                    <div className="absolute left-0 md:hidden w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold z-[5]">
                      {step.number}
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 relative z-[2]">
                        {/* Number Badge - Desktop */}
                        <div className="hidden md:flex w-12 h-12 rounded-full bg-blue-600 text-white items-center justify-center text-xl font-bold shadow-lg">
                          {step.number}
                        </div>
                        <div className="w-8 h-8 relative">
                          <Image
                            src={step.emojiImage}
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="relative z-[2]">
                        <h3 className="text-2xl font-semibold text-foreground mb-2">
                          {step.title}
                        </h3>
                        <div className="text-muted-foreground text-lg">
                          {step.description}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Image/Custom Content Side */}
                  <div className="flex-1 w-full relative z-[2] bg-background/80 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none">
                    {step.customContent}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 