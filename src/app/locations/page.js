// app/locations/page.js - ✅ UPDATED (Add metadata import at top)
"use client";
import Link from "next/link";
import { FaMapMarkerAlt, FaPhoneAlt, FaArrowRight } from "react-icons/fa";

// ✅ Import metadata (add this at the very top, before "use client")
// Note: You'll need to move this import ABOVE "use client" or use a separate metadata.js export

export default function LocationsPage() {
  const locations = [
    {
      name: "Alameda County",
      slug: "alameda-county",
      phone: "510-957-8383",
      cities: ["Oakland", "Berkeley", "Fremont", "Hayward"],
      description: "Serving Oakland, Berkeley, Fremont, and all Alameda County"
    },
    {
      name: "San Francisco",
      slug: "san-francisco",
      phone: "415-994-1442",
      cities: ["San Francisco"],
      description: "24/7 medical transportation throughout San Francisco"
    },
    {
      name: "Contra Costa County",
      slug: "contra-costa",
      phone: "925-465-0366",
      cities: ["Concord", "Walnut Creek", "Richmond"],
      description: "Medical transport across all Contra Costa cities"
    },
    {
      name: "Santa Clara County",
      slug: "santa-clara",
      phone: "408-579-9775",
      cities: ["San Jose", "Palo Alto", "Sunnyvale"],
      description: "Reliable service for San Jose and Silicon Valley"
    },
    {
      name: "San Mateo County",
      slug: "san-mateo",
      phone: "650-474-5777",
      cities: ["Redwood City", "San Mateo", "Daly City"],
      description: "Transportation for San Mateo County residents"
    }
  ];

  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Service <span className="text-red-600">Locations</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Eden Medical Transport serves all 58 California counties
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {locations.map(location => (
            <Link
              key={location.slug}
              href={`/locations/${location.slug}`}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden group"
            >
              <div className="bg-gradient-to-r from-red-600 to-blue-700 p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <FaMapMarkerAlt className="text-2xl" />
                  <h2 className="text-2xl font-bold">{location.name}</h2>
                </div>
                <p className="text-sm opacity-90">{location.description}</p>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-600 mb-2">Cities:</p>
                  <div className="flex flex-wrap gap-2">
                    {location.cities.map(city => (
                      <span key={city} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2 text-blue-600">
                    <FaPhoneAlt />
                    <span className="font-bold">{location.phone}</span>
                  </div>
                  <FaArrowRight className="text-red-600 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Serving All 58 California Counties
          </h2>
          <a
            href="tel:+15109578383"
            className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Call (510) 957-8383 - Available 24/7
          </a>
        </div>
      </div>
    </section>
  );
}