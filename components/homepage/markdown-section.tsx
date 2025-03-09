"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MarkdownSection() {
  return (
    <section className="py-12 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
          {/* Left side with image and heading */}
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative w-full max-w-[400px] md:max-w-full mx-auto">
                <Image
                  src="/markdown-section/multiple-websites.png"
                  alt="Multiple Websites Crawling"
                  width={800}
                  height={600}
                  className="rounded-b-lg overflow-hidden mt-6 md:mt-10 w-full h-auto"
                />
              </div>
              <div className="relative max-w-4xl mx-auto text-center pt-8 md:pt-12">
                <h2 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-orange-800 to-gray-900 dark:from-orange-200 dark:via-orange-100 dark:to-orange-200 pb-2">
                  Crawl, Scrape, Clean
                </h2>
                <p className="text-base md:text-lg max-w-md text-center mx-auto text-gray-600 dark:text-gray-400">
                  We crawl all accessible subpages and give you clean markdown for each. No sitemap required.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Arrow SVG */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="transform rotate-90 scale-75 md:scale-100 md:rotate-0 my-6 md:my-0 flex-shrink-0"
          >
            <svg 
              width="72"
              height="16"
              viewBox="0 0 96 21" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="w-[48px] h-[12px] md:w-[72px] md:h-[16px]"
            >
              <path
                d="M1.87544 6.62775C24.3035 4.98106 46.8418 5.28783 69.2236 7.48722C74.0995 7.96712 78.9687 8.54294 83.8201 9.20183C83.4786 9.00323 83.1307 8.8102 82.7891 8.6116C79.8519 6.94214 76.9146 5.27269 73.9773 3.60323C73.2527 3.19709 72.259 2.24802 72.9757 1.38858C73.6596 0.569005 75.3244 0.968676 76.0832 1.40131C79.5711 3.38039 83.059 5.35947 86.5405 7.34413C89.3852 8.95891 93.8226 10.5406 95.0419 13.8609C95.2598 14.4484 95.1256 14.9028 94.5664 15.2312C90.4284 17.6342 85.9426 19.3261 81.2545 20.2931C80.1729 20.5125 78.7513 20.0817 78.0603 19.196C77.4354 18.3992 77.6854 17.4951 78.7246 17.2787C82.7647 16.4471 86.5749 15.0271 90.1766 13.0564C90.0707 12.9345 89.9639 12.8247 89.8452 12.7139C89.3873 12.8867 88.8029 12.8879 88.3969 12.8354C66.5383 9.61846 44.4287 8.26342 22.3425 8.81358C16.0062 8.97239 9.67097 9.2879 3.34967 9.74897C1.28411 9.91159 -1.24326 6.86122 1.87544 6.62775Z"
                fill="currentColor"
                className="text-gray-900 dark:text-white"
              />
            </svg>
          </motion.div>

          {/* Right side with code */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <div className="w-full">
              <pre className="max-h-[3  00px] md:max-h-[650px] w-full text-xs md:text-sm p-3 md:p-4 overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900 ">
                <code className="text-white dark:text-white whitespace-pre-wrap md:whitespace-pre break-words md:break-normal">
                  {`[{
  "url": "firedrop.site/",
  "markdown": "## Welcome
    firedrop is a web scraper that extracts webpage content."
}, {
  "url": "firedrop.site/features",
  "markdown": "## Features
    Discover how our cutting-edge features transform data ops."
}, {
  "url": "firedrop.site/pricing",
  "markdown": "## Pricing
    Choose your perfect plan."
}, {
  "url": "firedrop.site/about",
  "markdown": "## About Us
    Learn about our mission and team."
}]`}
                </code>
              </pre>
              <p className="text-[10px] md:text-xs text-muted-foreground mt-2 text-center w-full mb-24">
                Note: The markdown has been edited for display purposes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 