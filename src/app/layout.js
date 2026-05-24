// app/layout.js - FINAL OPTIMIZED VERSION WITH ICONS
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import HeaderFooterWrapper from "./components/HeaderFooterWrapper";


const geistSans = Geist({ 
  variable: "--font-geist-sans", 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({ 
  variable: "--font-geist-mono", 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata = {
  metadataBase: new URL('https://edenmedical.com'),
  
  title: {
    default: "Eden Medical Transport | Professional Medical Rides in East Bay 24/7",
    template: "%s | Eden Medical Transport"
  },
  
  description: "Book safe, reliable non-emergency medical transportation in East Bay. Wheelchair accessible, stretcher service, dialysis transport. Licensed, insured, available 24/7. Call (510) 957-8383",
  
  keywords: [
    "medical transport East Bay",
    "non-emergency transportation",
    "NEMT East Bay",
    "wheelchair van service",
    "dialysis transport",
    "stretcher service",
    "medical rides East Bay",
    "Eden Medical Transport",
    "ambulette service",
    "patient transportation",
    "wheelchair accessible van",
    "medical appointment transport",
    "senior transportation East Bay",
    "Medi-Cal transportation",
    "Medicare transport"
  ],
  
  authors: [{ name: "Eden Medical Transport", url: "https://edenmedical.com" }],
  creator: "Eden Medical Transport",
  publisher: "Eden Medical Transport",
  
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
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
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://edenmedical.com',
    title: 'Eden Medical Transport - Safe Medical Rides in East Bay',
    description: 'Professional non-emergency medical transportation across East Bay. Wheelchair accessible, licensed & insured. Available 24/7.',
    siteName: 'Eden Medical Transport',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Eden Medical Transport - Professional Medical Transportation East Bay',
      }
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Eden Medical Transport | East Bay Medical Transportation 24/7',
    description: 'Professional medical transportation in East Bay. Wheelchair accessible, stretcher service, dialysis transport.',
    images: ['/twitter-image.jpg'],
    creator: '@edenmedical',
  },
  
  alternates: {
    canonical: 'https://edenmedical.com',
  },
  
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  
  manifest: '/site.webmanifest',
  
  other: {
    'google-site-verification': 'your-google-verification-code-here',
  },
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalBusiness",
        "@id": "https://edenmedical.com/#organization",
        "name": "Eden Medical Transport",
        "legalName": "Eden Medical Transport LLC",
        "url": "https://edenmedical.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://edenmedical.com/logo.png",
          "width": 600,
          "height": 600
        },
        "image": "https://edenmedical.com/og-image.jpg",
        "description": "Professional non-emergency medical transportation services in East Bay. Wheelchair accessible, stretcher service, dialysis transport. Licensed, insured, available 24/7.",
        "telephone": "+1-510-957-8383",
        "email": "info@edenmedical.com",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "123 Medical Plaza",
          "addressLocality": "Oakland",
          "addressRegion": "California",
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
          },
          {
            "@type": "City",
            "name": "San Francisco"
          },
          {
            "@type": "City",
            "name": "Oakland"
          },
          {
            "@type": "City",
            "name": "San Jose"
          },
          {
            "@type": "City",
            "name": "Fremont"
          },
          {
            "@type": "City",
            "name": "Hayward"
          }
        ],
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday", 
            "Thursday", "Friday", "Saturday", "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        },
        "priceRange": "$$",
        "paymentAccepted": "Cash, Credit Card, Insurance, Zelle, Medi-Cal, Medicare",
        "currenciesAccepted": "USD",
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Medical Transportation Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Wheelchair Transportation",
                "description": "Safe and comfortable wheelchair accessible transportation with ADA compliant vehicles"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Stretcher Transportation",
                "description": "Professional stretcher service for bed-bound patients requiring full support"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Dialysis Transportation",
                "description": "Reliable recurring transport to and from dialysis appointments 3-4 times per week"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Medical Appointment Transport",
                "description": "Door-to-door service for all medical appointments and procedures"
              }
            }
          ]
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+1-510-957-8383",
          "contactType": "Customer Service",
          "areaServed": "US-CA",
          "availableLanguage": ["English", "Spanish"],
          "contactOption": "TollFree"
        },
        "sameAs": [
          "https://www.facebook.com/edenmedical",
          "https://www.instagram.com/edenmedical",
          "https://twitter.com/edenmedical",
          "https://www.linkedin.com/company/edenmedical"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "127",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://edenmedical.com/#website",
        "url": "https://edenmedical.com",
        "name": "Eden Medical Transport",
        "description": "Professional non-emergency medical transportation services in East Bay",
        "publisher": {
          "@id": "https://edenmedical.com/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://edenmedical.com/search?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "WebPage",
        "@id": "https://edenmedical.com/#webpage",
        "url": "https://edenmedical.com",
        "name": "Eden Medical Transport - Professional Medical Rides in East Bay 24/7",
        "isPartOf": {
          "@id": "https://edenmedical.com/#website"
        },
        "about": {
          "@id": "https://edenmedical.com/#organization"
        },
        "description": "Book safe, reliable non-emergency medical transportation in East Bay. Wheelchair accessible, stretcher service, dialysis transport.",
        "inLanguage": "en-US"
      }
    ]
  };

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                    page_path: window.location.pathname,
                    anonymize_ip: true,
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}>
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <div id="main-content">
          <HeaderFooterWrapper>
            {children}
          </HeaderFooterWrapper>
        </div>
        <noscript>
          <div style={{ padding: '20px', background: '#fef3c7', textAlign: 'center' }}>
            This website works best with JavaScript enabled.
          </div>
        </noscript>
      </body>
    </html>
  );
}