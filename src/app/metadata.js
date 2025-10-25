// app/metadata.js
export const metadata = {
  title: "Eden Medical Transport | Non-Emergency Medical Transportation California 24/7",
  description: "Professional non-emergency medical transportation in California. Wheelchair accessible, stretcher service, dialysis transport. Licensed, insured, 24/7 available. Call (510) 957-8383 for booking.",
  
  keywords: [
    "medical transportation California",
    "non-emergency medical transport",
    "NEMT California",
    "wheelchair transport service",
    "dialysis transportation",
    "stretcher ambulance service",
    "medical rides California",
    "patient transport service",
    "ambulette service California",
    "medical appointment transport",
    "Medi-Cal transportation",
    "Medicare transport service"
  ],
  
  authors: [{ name: "Eden Medical Transport" }],
  
  openGraph: {
    title: "Eden Medical Transport | Professional Medical Transportation California",
    description: "Safe, reliable non-emergency medical transportation throughout California. Wheelchair accessible vans, stretcher service, 24/7 availability.",
    url: "https://edenmedical.com",
    siteName: "Eden Medical Transport",
    images: [
      {
        url: "https://edenmedical.com/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Eden Medical Transport - California Medical Transportation Service"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Eden Medical Transport | Non-Emergency Medical Transportation California",
    description: "Professional medical transportation services in California. Wheelchair accessible, stretcher service, 24/7 available.",
    images: ["https://edenmedical.com/og-image-home.jpg"],
    creator: "@edenmedical",
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  alternates: {
    canonical: "https://edenmedical.com",
  },
  
  verification: {
    google: "your-google-verification-code",
    // yandex: "your-yandex-verification",
    // bing: "your-bing-verification",
  },
  
  category: "Medical Transportation Services",
}