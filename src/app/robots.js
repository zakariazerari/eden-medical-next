// app/robots.js - ✅ VERSION CORRIGÉE
export default function robots() {
  const baseUrl = 'https://edenmedical.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/*',           // ✅ Block admin pages only
          '/api/admin/*',       // ✅ Block admin API only
          '/_next/static/*',    // ✅ Block Next.js internals
          '/private/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/*',
          '/api/admin/*',
        ],
        // ✅ ALLOW public API routes for dynamic content
        allow: [
          '/api/blog/*',
          '/api/gallery/*',
        ]
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/admin/*'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/admin/*',
          '/api/admin/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}