import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',
        '/cancel',
        '/not-subscriber',
        '/marketing',
        '/playground'
      ],
    },
    sitemap: 'https://firedrop.site/sitemap.xml',
  }
}