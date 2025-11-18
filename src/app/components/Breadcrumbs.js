// app/components/Breadcrumbs.js - ✅ NEW FILE
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaChevronRight, FaHome } from 'react-icons/fa'

export default function Breadcrumbs() {
  const pathname = usePathname()
  
  // Don't show breadcrumbs on these pages
  if (pathname === '/' || pathname.startsWith('/admin') || pathname === '/404') {
    return null
  }

  const paths = pathname.split('/').filter(Boolean)
  
  const breadcrumbItems = [
    { name: 'Home', url: '/', current: false }
  ]

  let currentPath = ''
  paths.forEach((path, index) => {
    currentPath += `/${path}`
    const isLast = index === paths.length - 1
    
    // Format name: "san-francisco" → "San Francisco"
    const formattedName = path.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
    
    breadcrumbItems.push({
      name: formattedName,
      url: currentPath,
      current: isLast
    })
  })

  // ✅ Structured data for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://edenmedical.com${item.url}`
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <nav 
        aria-label="Breadcrumb" 
        className="bg-gray-50 border-b border-gray-200 py-3"
      >
        <ol className="flex items-center space-x-2 text-sm max-w-7xl mx-auto px-4">
          {breadcrumbItems.map((item, index) => (
            <li key={item.url} className="flex items-center">
              {index > 0 && (
                <FaChevronRight className="text-gray-400 mx-2 text-xs" />
              )}
              
              {item.current ? (
                <span className="text-gray-600 font-medium flex items-center">
                  {index === 0 ? (
                    <FaHome className="text-base" />
                  ) : (
                    item.name
                  )}
                </span>
              ) : (
                <Link 
                  href={item.url}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center"
                >
                  {index === 0 ? (
                    <FaHome className="text-base" />
                  ) : (
                    item.name
                  )}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}