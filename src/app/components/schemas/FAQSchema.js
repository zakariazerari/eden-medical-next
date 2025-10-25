// app/components/schemas/FAQSchema.js
export default function FAQSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is non-emergency medical transportation (NEMT)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Non-emergency medical transportation (NEMT) provides safe, reliable transportation for patients who need to attend medical appointments but don't require emergency ambulance services. This includes wheelchair transport, stretcher service, and transportation to dialysis, physical therapy, and doctor appointments throughout California."
        }
      },
      {
        "@type": "Question",
        "name": "Do you accept insurance for medical transportation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we accept various insurance plans including Medi-Cal and Medicare for eligible trips. We also accept cash, credit cards, and Zelle payments. Contact us at (510) 957-8383 to verify your specific insurance coverage for medical transportation."
        }
      },
      {
        "@type": "Question",
        "name": "What areas do you serve in California?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Eden Medical Transport serves all 58 California counties. We have dedicated phone lines for major areas: Alameda County (510-957-8383), San Francisco (415-994-1442), Contra Costa (925-465-0366), Santa Clara (408-579-9775), and San Mateo (650-474-5777)."
        }
      },
      {
        "@type": "Question",
        "name": "Are your vehicles wheelchair accessible?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our entire fleet is equipped with wheelchair lifts and ramps, meeting ADA compliance standards. We can accommodate standard wheelchairs, power wheelchairs, scooters, and bariatric wheelchairs. We also offer stretcher service and sedan options based on patient needs."
        }
      },
      {
        "@type": "Question",
        "name": "How far in advance should I book medical transportation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend booking at least 24-48 hours in advance for scheduled appointments to ensure availability. However, we also accommodate same-day and urgent requests based on vehicle availability. Call us 24/7 at (510) 957-8383 for immediate booking."
        }
      },
      {
        "@type": "Question",
        "name": "How much does medical transportation cost in California?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Medical transportation costs vary based on distance, service type (wheelchair, stretcher, sedan), and insurance coverage. Many trips are covered by Medi-Cal or Medicare. Contact us for a free, no-obligation quote specific to your transportation needs."
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}