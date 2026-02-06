// app/metadata.js
export const metadata = {
  title: "Eden Medical Transport | Non-Emergency Medical Transportation East Bay 24/7",
  description: "Professional non-emergency medical transportation in East Bay. Wheelchair accessible, stretcher service, dialysis transport. Licensed, insured, 24/7 available. Call (510) 957-8383 for booking.",
  
  keywords: [
    "medical transportation East Bay",
    "non-emergency medical transport",
    "NEMT East Bay",
    "wheelchair transport service",
    "dialysis transportation",
    "stretcher ambulance service",
    "medical rides East Bay",
    "patient transport service",
    "ambulette service East Bay",
    "medical appointment transport",
    "Medi-Cal transportation",
    "Medicare transport service"
  ],
  
  authors: [{ name: "Eden Medical Transport" }],
  
  openGraph: {
    title: "Eden Medical Transport | Professional Medical Transportation East Bay",
    description: "Safe, reliable non-emergency medical transportation throughout East Bay. Wheelchair accessible vans, stretcher service, 24/7 availability.",
    url: "https://edenmedical.com",
    siteName: "Eden Medical Transport",
    images: [
      {
        url: "https://edenmedical.com/og-image-home.jpg",
        width: 1200,
        height: 630,
        alt: "Eden Medical Transport - East Bay Medical Transportation Service"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Eden Medical Transport | Non-Emergency Medical Transportation East Bay",
    description: "Professional medical transportation services in East Bay. Wheelchair accessible, stretcher service, 24/7 available.",
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