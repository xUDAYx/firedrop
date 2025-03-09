"use client"
import { motion } from "motion/react"
import { GraduationCap, ArrowRight } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"

export default function BoostCTA() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 dark:bg-blue-500 opacity-20 blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-blue-200 dark:via-blue-100 dark:to-blue-200 pb-2">
              Ready to Get Your Project Done by Experts?
            </h2>
            
            {/* Subheading */}
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              Let us handle your academic project while you focus on learning. Get professional development, complete documentation, and guaranteed results.
            </p>

            {/* CTA Button */}
            <motion.div>
              <Link href="/get-quote">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-500 text-white rounded-full px-8 h-12 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-200"
                >
                  Get Your Project Done Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 