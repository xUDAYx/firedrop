"use client"
import { motion } from "motion/react"
import { ArrowRight, Clock, CheckCircle2, Sparkles, Bot } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

const comparisonData = {
  manual: {
    title: "Doing Projects Yourself",
    description: "Struggling with complex requirements and tight deadlines",
    points: [
      { time: "40+ hrs", task: "learning new technologies from scratch" },
      { time: "20+ hrs", task: "debugging errors and fixing issues" },
      { time: "15+ hrs", task: "writing documentation and reports" },
      { time: "10+ hrs", task: "searching for solutions online" },
      { time: "8+ hrs", task: "setting up development environment" },
      { time: "Risk", task: "of failing grades due to incomplete or late submission" }
    ]
  },
  ai: {
    title: "Let Us Handle Your Project",
    description: "Professional development with guaranteed results",
    points: [
      { time: "Expert", task: "developers with years of experience" },
      { time: "24/7", task: "support and project updates" },
      { time: "Complete", task: "documentation and source code provided" },
      { time: "Tested", task: "and verified implementation" },
      { time: "On-time", task: "delivery guaranteed" },
      { time: "100%", task: "satisfaction and plagiarism-free guarantee" }
    ]
  }
}

export default function PainPointsSection() {
  return (
    <section className="py-16 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-blue-200 dark:via-blue-100 dark:to-blue-200 pb-2">
              Why Students Choose Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              See how our professional service saves you time and guarantees better results
            </p>
          </motion.div>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {Object.entries(comparisonData).map(([key, data]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-2xl ${
                key === 'manual' 
                  ? 'bg-red-50/80 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20' 
                  : 'bg-green-50/80 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20'
              }`}
            >
              {/* Header */}
              <div className="mb-8 space-y-2">
                <h3 className={`text-xl font-semibold ${
                  key === 'manual' ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                }`}>
                  {data.title}
                </h3>
                <p className="text-muted-foreground">{data.description}</p>
              </div>

              {/* Points */}
              <div className="space-y-4">
                {data.points.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: key === 'manual' ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex items-start gap-4 p-4 rounded-xl ${
                      key === 'manual' 
                        ? 'bg-white/80 dark:bg-gray-800/80' 
                        : 'bg-white/80 dark:bg-gray-800/80'
                    }`}
                  >
                    <span className={`font-semibold whitespace-nowrap ${
                      key === 'manual' ? 'text-red-500' : 'text-green-500'
                    }`}>
                      {point.time}
                    </span>
                    <span className="text-muted-foreground">
                      {point.task}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-6">
            <span className="text-2xl font-semibold text-foreground">
              Ready to get your project done professionally?
            </span>
            <Link href="/get-quote">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-12 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200"
              >
                Get Your Project Done Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 