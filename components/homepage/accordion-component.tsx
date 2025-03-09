"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { motion } from "motion/react"
import { Sparkles, Plus, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

// Custom AccordionTrigger component
const CustomTrigger = ({ className, children, ...props }: any) => {
  return (
    <AccordionTrigger
      className={cn(
        "flex flex-1 items-center justify-between py-4 px-4 md:px-6 font-medium transition-all hover:no-underline hover:bg-blue-50/50 dark:hover:bg-blue-900/20 rounded-t-lg [&[data-state=open]>div>svg]:rotate-0 [&[data-state=open]>div>.plus]:hidden [&[data-state=open]>div>.minus]:block [&>svg]:hidden",
        className
      )}
      {...props}
    >
      <div className="text-left font-medium text-base md:text-lg pr-4">{children}</div>
      <div className="shrink-0 transition-transform duration-200">
        <Plus className="h-4 w-4 plus" />
        <Minus className="h-4 w-4 minus hidden" />
      </div>
    </AccordionTrigger>
  )
}

const faqs = [
    {
        question: "What types of projects do you handle?",
        answer: "We specialize in AI/ML, Data Science, and Cybersecurity projects. This includes machine learning models, deep learning applications, data analysis, network security, web applications, and more. Our team has expertise in Python, TensorFlow, PyTorch, React, Node.js, and other popular frameworks."
    },
    {
        question: "How do you ensure project quality?",
        answer: "We follow a rigorous development process that includes thorough planning, regular testing, and comprehensive code reviews. All projects are built following industry best practices and academic standards. We also provide complete documentation and test cases to ensure quality."
    },
    {
        question: "What about plagiarism and originality?",
        answer: "Every project is developed from scratch and customized to your specific requirements. We maintain strict originality standards and provide a plagiarism-free guarantee. You receive full ownership of unique, well-documented code that passes academic integrity checks."
    },
    {
        question: "How long does it take to complete a project?",
        answer: "Project timelines vary based on complexity and requirements. Most projects are completed within 1-2 weeks, but we can accommodate urgent deadlines. We'll provide a specific timeline after reviewing your project details and always ensure delivery before your submission deadline."
    },
    {
        question: "Do you provide project support after delivery?",
        answer: "Yes, we offer 30 days of free support after project delivery. This includes bug fixes, minor adjustments, and help with implementation. We also provide a detailed setup guide and documentation to help you understand and present your project effectively."
    },
    {
        question: "How do revisions and modifications work?",
        answer: "We offer unlimited revisions until you're completely satisfied with your project. You can request changes at any stage of development, and we'll implement them promptly. Our goal is to ensure your project meets all requirements perfectly."
    },
    {
        question: "Is my project information kept confidential?",
        answer: "Absolutely. We maintain strict confidentiality of all project details and personal information. Your project specifications, source code, and documentation are never shared or reused. We can also sign an NDA if required."
    },
    {
        question: "What is your payment process?",
        answer: "We offer flexible payment options with a clear milestone-based structure. Typically, we require a partial upfront payment to begin work, with the remaining amount due upon project completion and your satisfaction. We provide detailed invoices and secure payment methods."
    }
]

export function AccordionComponent() {
    return (
        <section className="py-12 md:py-16 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-3xl text-center mb-8 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        {/* Pill badge */}
                        <div className="mx-auto w-fit rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/30 px-4 py-1 mb-4 md:mb-6">
                            <div className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-200">
                                <Sparkles className="h-4 w-4" />
                                <span>FAQ</span>
                            </div>
                        </div>

                        <h2 className="text-[1.75rem] sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 dark:from-blue-200 dark:via-blue-100 dark:to-blue-200 pb-2 px-2 sm:px-4 leading-[1.2] md:leading-tight">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mt-2 md:mt-4 max-w-[300px] sm:max-w-2xl mx-auto px-2 sm:px-4">
                            Everything you need to know about our project development service
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <AccordionItem value={`item-${index}`} className="border border-blue-100 dark:border-blue-900/50 rounded-lg bg-white dark:bg-gray-900/50 backdrop-blur-sm">
                                    <CustomTrigger>
                                        {faq.question}
                                    </CustomTrigger>
                                    <AccordionContent className="px-4 md:px-6 pb-4 text-left">
                                        <div className="text-muted-foreground text-sm md:text-base leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    )
}
