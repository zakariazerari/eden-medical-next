// app/sitemap.js - ✅ DYNAMIC VERSION
import { connectDB } from '@/lib/mongo'
import BlogPost from '@/models/BlogPost'

export default async function sitemap() {
  const baseUrl = 'https://edenmedical.com'
  const now = new Date()

  // ✅ 1. Static pages (High Priority)
  const staticPages = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // ✅ 2. Service pages
  const servicePages = [
    'premium-rides',
    'recurring-rides', 
    'group-transport',
  ].map(slug => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  // ✅ 3. Location pages
  const locationPages = [
    'alameda-county',
    'san-francisco',
    'contra-costa',
    'santa-clara',
    'san-mateo',
  ].map(slug => ({
    url: `${baseUrl}/locations/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  // ✅ 4. Blog posts (DYNAMIC from database)
  let blogPages = []
  try {
    await connectDB()
    
    // Fetch only published blog posts
    const posts = await BlogPost.find({ published: true })
      .select('slug updatedAt')
      .lean()
      .limit(100) // Limit to prevent sitemap from being too large
    
    blogPages = posts.map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || now,
      changeFrequency: 'weekly',
      priority: 0.7,
    }))
    
    console.log(`✅ Sitemap: Added ${posts.length} blog posts`)
  } catch (error) {
    console.error('❌ Sitemap error fetching blog posts:', error)
    // Continue without blog posts if there's an error
  }

  // ✅ 5. Combine all URLs
  return [
    ...staticPages,
    ...servicePages,
    ...locationPages,
    ...blogPages,
  ]
}

// ✅ 6. Revalidate every 24 hours
export const revalidate = 86400 // 24 hours in seconds