import { Providers } from "./providers"
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AuthWrapper from "@/components/wrapper/auth-wrapper";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import Script from 'next/script';
import "./globals.css";
import { WhatsAppButton } from "@/components/ui/whatsapp-button"

export const metadata: Metadata = {
  metadataBase: new URL("https://firescrap.site/"),
  title: {
    default: "The #1 Platform to Automate Data & Scale with AI – FireScrap",
    template: `%s | FireScrap`,
  },
  description: 'Automate web scraping, WordPress data migration, eCommerce product imports, and booking automation with FireScrap. Use AI-powered solutions to save time, reduce errors, and scale your business effortlessly!',
  openGraph: {
    title: "The #1 Platform to Automate Data & Scale with AI – FireScrap",
    description:
      "Automate web scraping, WordPress data migration, eCommerce product imports, and booking automation with FireScrap. Use AI-powered solutions to save time, reduce errors, and scale your business effortlessly!",
    images: [
      {
        url: '/testimonials/ss_rohit.jpg',
        width: 1200,
        height: 630,
        alt: 'FireScrap - The #1 Platform to Automate Data & Scale with AI'
      }
    ],
    url: "https://firescrap.site/",
  },
  twitter: {
    card: "summary_large_image",
    title: "The #1 Platform to Automate Data & Scale with AI – FireScrap",
    description:
      "Automate web scraping, WordPress data migration, eCommerce product imports, and booking automation with FireScrap. Use AI-powered solutions to save time, reduce errors, and scale your business effortlessly!",
    siteId: "",
    creator: "@firescrap",
    creatorId: "",
    images: [
      {
        url: '/testimonials/ss_rohit.jpg',
        width: 1200,
        height: 630,
        alt: 'FireScrap - The #1 Platform to Automate Data & Scale with AI'
      }
    ],
  },
  keywords: [
    "web automation",
    "AI web agent",
    "web scraping",
    "data extraction",
    "WordPress migration",
    "eCommerce automation",
    "booking automation",
    "data automation",
    "FireScrap",
    "AI automation",
    "business automation",
    "scale faster"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <html lang="en" suppressHydrationWarning>
        <head>
          <Script
            id="structured-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "firedrop AI Agent",
                "applicationCategory": "BusinessApplication",
                "operatingSystem": "Any",
                "description": "Automate your data collection and task management with intelligent AI web agents",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "ratingCount": "150"
                },
                "author": {
                  "@type": "Organization",
                  "name": "firedrop",
                  "url": "https://firedrop.site"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "firedrop",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://firedrop.site/favicon.ico"
                  }
                }
              })
            }}
          />
          <Script
            id="organization-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "firedrop",
                "url": "https://firedrop.site",
                "logo": "https://firedrop.site/favicon.ico",
                "sameAs": [
                  "https://twitter.com/firedrop"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer support",
                  "availableLanguage": ["English"]
                }
              })
            }}
          />
          <Script
            id="website-data"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "firedrop AI Agent",
                "url": "https://firedrop.site",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://firedrop.site/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              })
            }}
          />
        </head>
        <body className={GeistSans.className}>
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <WhatsAppButton />
              <Toaster />
            </ThemeProvider>
          </Providers>
          <Analytics />
        </body>
      </html>
    </AuthWrapper>
  );
}
