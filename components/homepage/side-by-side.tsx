"use client"
import { LucideIcon } from 'lucide-react'
import {
  CheckCircle,
  Brain,
  ShieldAlert,
  Database,
  GraduationCap,
  HeartHandshake,
  MessageSquareCode,
  Shield,
  Timer,
  Sparkles
} from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils"

interface FeatureItem {
  icon: LucideIcon
  title: string
  description: string
}

const features: FeatureItem[] = [
  {
    icon: Brain,
    title: 'AI/ML Projects',
    description: 'Machine Learning, Deep Learning, Neural Networks, Computer Vision, and NLP projects with popular frameworks.'
  },
  {
    icon: ShieldAlert,
    title: 'Cybersecurity',
    description: 'Network Security, Penetration Testing, Cryptography, and Security Analysis projects with industry tools.'
  },
  {
    icon: Database,
    title: 'Data Science',
    description: 'Data Analysis, Visualization, Big Data Processing, and Statistical Modeling using Python and R.'
  },
  {
    icon: MessageSquareCode,
    title: '24/7 Support',
    description: 'Get instant help and updates about your project through our dedicated support team.'
  },
  {
    icon: Timer,
    title: 'On-time Delivery',
    description: 'We ensure your project is delivered well before the deadline, giving you time to review.'
  },
  {
    icon: GraduationCap,
    title: 'Academic Standards',
    description: 'Projects that meet academic requirements and coding best practices.'
  },
  {
    icon: HeartHandshake,
    title: 'Unlimited Revisions',
    description: 'We will revise until you are completely satisfied with your project.'
  },
  {
    icon: CheckCircle,
    title: 'Quality Assurance',
    description: 'Rigorous testing and code review before delivery to ensure perfect functionality.'
  },
  {
    icon: Shield,
    title: 'Confidential',
    description: 'Your project details and personal information remain completely confidential.'
  }
]

const FeatureCard = ({ icon: Icon, title, description, index }: FeatureItem & { index: number }) => (
  <div className={cn(
    "w-fit p-4 rounded-xl transition-all duration-300",
    // Special styling for first three cards (index 0-2)
    index < 3 ? 
    "bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950/50 dark:to-transparent border-2 border-blue-200 dark:border-blue-800 hover:shadow-lg hover:shadow-blue-100/50 dark:hover:shadow-blue-900/50" 
    : "hover:bg-blue-50/50 dark:hover:bg-blue-950/50"
  )}>
    <div className={cn(
      "p-2 flex items-center justify-center w-fit border border-blue-200 dark:border-blue-800 rounded-lg",
      index < 3 ? "bg-blue-100 dark:bg-blue-800/50" : "bg-blue-50 dark:bg-blue-900/30"
    )}>
      <Icon 
        strokeWidth={index < 3 ? 2 : 1.5} 
        width={index < 3 ? 24 : 18} 
        height={index < 3 ? 24 : 18} 
        className={cn(
          index < 3 
            ? "text-blue-700 dark:text-blue-300 animate-pulse" 
            : "text-blue-600 dark:text-blue-400"
        )}
      />
    </div>
    <div className="flex items-center space-x-2 mb-2 mt-4">
      <h4 className={cn(
        "font-medium",
        index < 3 
          ? "text-lg text-blue-700 dark:text-blue-300 font-semibold" 
          : "text-base text-foreground"
      )}>
        {title}
      </h4>
    </div>
    <p className={cn(
      "text-sm",
      index < 3 
        ? "text-blue-600 dark:text-blue-400" 
        : "text-muted-foreground text-xs"
    )}>
      {description}
    </p>
  </div>
)

export default function SideBySide() {
  return (
    <section id="features" className="relative py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 dark:bg-blue-500 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4">
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
                <span>Why Choose Us</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 dark:from-blue-400 dark:via-blue-300 dark:to-blue-400 pb-2">
              Expert Project Development
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              We deliver high-quality academic projects with guaranteed success
            </p>
          </motion.div>
        </div>
      
        <div className="divide-y divide-zinc-800/10 dark:divide-zinc-200/10 max-w-6xl mx-auto px-4 sm:px-6 w-fit">
          <div className="py-4 first-of-type:pt-0 last-of-type:pb-0 mx-auto w-fit">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-2 justify-center w-fit">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <FeatureCard {...feature} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
