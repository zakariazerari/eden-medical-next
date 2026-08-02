// app/components/schemas/LocalBusinessSchema.js
export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://edenmedtrans.com/#localbusiness",
    "name": "Eden Medical Transport",
    "image": "https://edenmedtrans.com/logo.png",
    "logo": "https://edenmedtrans.com/logo.png",
    "url": "https://edenmedtrans.com",
    "telephone": "+1-510-957-8383",
    "email": "edenmedtrans@gmail.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Medical Plaza",
      "addressLocality": "Oakland",
      "addressRegion": "CA",
      "postalCode": "94612",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 37.8044,
      "longitude": -122.2712
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "California"
      }
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", 
          "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/edentransport",
      "https://www.instagram.com/edentransport",
      "https://twitter.com/edentransport",
      "https://www.linkedin.com/company/edentransport"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-510-957-8383",
      "contactType": "Customer Service",
      "areaServed": "US-CA",
      "availableLanguage": ["English", "Spanish"]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}