// app/components/schemas/ServiceSchema.js
export default function ServiceSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Non-Emergency Medical Transportation",
    "provider": {
      "@id": "https://edenmedical.com/#localbusiness"
    },
    "areaServed": {
      "@type": "State",
      "name": "California"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Medical Transportation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Wheelchair Transportation",
            "description": "Safe wheelchair accessible medical transportation throughout California with ADA compliant vehicles and certified drivers."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Stretcher Transportation",
            "description": "Professional stretcher medical transport for bed-bound patients with certified medical personnel."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Dialysis Transportation",
            "description": "Reliable recurring transportation to dialysis centers 3-4 times per week. Never miss an appointment."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Hospital Discharge Transport",
            "description": "Safe transport from hospital to home or facility after discharge."
          }
        }
      ]
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://edenmedical.com/contact",
      "servicePhone": "+1-510-957-8383",
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