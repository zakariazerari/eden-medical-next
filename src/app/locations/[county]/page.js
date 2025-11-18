// app/locations/[county]/page.js - ✅ FIXED VERSION
import Link from "next/link";
import { FaPhoneAlt, FaMapMarkerAlt, FaArrowLeft, FaCheckCircle } from "react-icons/fa";

const countyData = {
  "alameda-county": {
    name: "Alameda County",
    phone: "510-957-8383",
    cities: ["Oakland", "Berkeley", "Fremont", "Hayward", "Alameda"],
    description: "Comprehensive medical transportation throughout Alameda County"
  },
  "san-francisco": {
    name: "San Francisco",
    phone: "415-994-1442",
    cities: ["San Francisco"],
    description: "Serving all San Francisco neighborhoods 24/7"
  },
  "contra-costa": {
    name: "Contra Costa County",
    phone: "925-465-0366",
    cities: ["Concord", "Walnut Creek", "Richmond"],
    description: "Reliable medical transport across Contra Costa"
  },
  "santa-clara": {
    name: "Santa Clara County",
    phone: "408-579-9775",
    cities: ["San Jose", "Palo Alto", "Sunnyvale"],
    description: "Professional service for Silicon Valley"
  },
  "san-mateo": {
    name: "San Mateo County",
    phone: "650-474-5777",
    cities: ["Redwood City", "San Mateo", "Daly City"],
    description: "Safe transportation for San Mateo residents"
  }
};

// ✅ METADATA FUNCTION (Server Component)
export async function generateMetadata({ params }) {
  const county = countyData[params.county];
  
  if (!county) {
    return {
      title: 'Location Not Found | Eden Medical Transport',
    }
  }

  return {
    title: `${county.name} Medical Transportation | Eden Medical Transport California`,
    description: `${county.description}. Call ${county.phone} for 24/7 medical transport in ${county.name}. Wheelchair accessible, licensed & insured.`,
    keywords: [
      `${county.name} medical transport`,
      `medical transportation ${county.name}`,
      `NEMT ${county.name}`,
      `wheelchair transport ${county.name}`,
      ...county.cities.map(city => `medical transport ${city}`)
    ],
    openGraph: {
      title: `Medical Transportation ${county.name} | 24/7 Service`,
      description: county.description,
      url: `https://edenmedical.com/locations/${params.county}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://edenmedical.com/locations/${params.county}`,
    },
  }
}

// ✅ STATIC PARAMS (Server Component)
export function generateStaticParams() {
  return Object.keys(countyData).map(county => ({
    county: county
  }))
}

// ✅ PAGE COMPONENT (Server Component - No "use client"!)
export default function CountyPage({ params }) {
  const county = countyData[params.county];

  if (!county) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Location Not Found</h1>
          <Link href="/locations" className="text-red-600 hover:underline">
            ← Back to Locations
          </Link>
        </div>
      </div>
    );
  }

  const services = [
    "Emergency medical transport",
    "Non-emergency medical transport",
    "Wheelchair accessible transport",
    "Stretcher transport",
    "Dialysis transportation",
    "Hospital discharge transport",
    "Doctor appointment transport"
  ];

  return (
    <section className="bg-white">
      <div className="relative bg-gradient-to-r from-red-600 to-blue-700 py-20">
        <div className="max-w-7xl mx-auto px-4 text-white">
          <Link 
            href="/locations" 
            className="inline-flex items-center gap-2 mb-6 hover:underline"
          >
            <FaArrowLeft /> Back to Locations
          </Link>

          <h1 className="text-5xl font-extrabold mb-4">
            Medical Transport in {county.name}
          </h1>
          <p className="text-xl opacity-90 mb-8">{county.description}</p>

          <a
            href={`tel:${county.phone.replace(/[^0-9]/g, '')}`}
            className="inline-flex items-center gap-3 px-6 py-3 bg-white text-red-600 font-bold rounded-xl hover:shadow-2xl transition-all"
          >
            <FaPhoneAlt /> {county.phone}
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Our Services in {county.name}</h2>
        <div className="grid md:grid-cols-2 gap-4 mb-16">
          {services.map((service, i) => (
            <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
              <FaCheckCircle className="text-green-600 text-xl flex-shrink-0" />
              <span className="font-medium">{service}</span>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold mb-8">Cities We Serve</h2>
        <div className="flex flex-wrap gap-3 mb-16">
          {county.cities.map(city => (
            <span 
              key={city} 
              className="px-6 py-3 bg-white border-2 rounded-xl font-semibold hover:border-red-600 transition-colors"
            >
              {city}
            </span>
          ))}
        </div>

        <div className="bg-gradient-to-r from-red-600 to-blue-700 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Need Transportation in {county.name}?
          </h2>
          <p className="text-xl mb-8">Call now for immediate assistance</p>
          <a
            href={`tel:${county.phone.replace(/[^0-9]/g, '')}`}
            className="inline-block px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:shadow-2xl text-xl transition-all"
          >
            📞 {county.phone}
          </a>
        </div>
      </div>
    </section>
  );
}