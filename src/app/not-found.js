import Link from "next/link";
import { FaHome, FaPhoneAlt, FaAmbulance, FaMapMarkerAlt } from "react-icons/fa";

export const metadata = {
  title: "404 - Page Not Found | Eden Medical Transport",
  description: "The page you're looking for cannot be found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50 px-4 py-16">
      <div className="text-center max-w-3xl mx-auto">
        
        {/* 404 Number with Animation */}
        <div className="mb-8 relative">
          <h1 className="text-[150px] md:text-[200px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 leading-none animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-8xl animate-bounce">🚑</div>
          </div>
        </div>

        {/* Title & Description */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Oops! Wrong Route
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-4">
          Looks like this page took a detour!
        </p>
        
        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
          Don't worry, we know these California roads well. Let's get you back on track 
          to where you need to go.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all text-lg"
          >
            <FaHome className="text-xl" /> 
            Back to Home
          </Link>

          <a
            href="tel:+15109578383"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all text-lg"
          >
            <FaPhoneAlt className="text-xl" /> 
            Call: (510) 957-8383
          </a>
        </div>

        {/* Quick Links */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Popular Destinations
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Link 
              href="/services/wheelchair-transport" 
              className="group p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all border-2 border-transparent hover:border-blue-300"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">♿</div>
              <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition">
                Wheelchair Transport
              </h4>
              <p className="text-sm text-gray-600">ADA accessible vans</p>
            </Link>
            
            <Link 
              href="/contact" 
              className="group p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all border-2 border-transparent hover:border-purple-300"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">📧</div>
              <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-purple-600 transition">
                Contact Us
              </h4>
              <p className="text-sm text-gray-600">Get in touch 24/7</p>
            </Link>
            
            <Link 
              href="/faq" 
              className="group p-6 bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all border-2 border-transparent hover:border-red-300"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">❓</div>
              <h4 className="font-bold text-lg text-gray-900 mb-2 group-hover:text-red-600 transition">
                FAQ
              </h4>
              <p className="text-sm text-gray-600">Common questions</p>
            </Link>
          </div>
        </div>

        {/* All Services Links */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            🚑 All Our Services
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <Link href="/services/wheelchair-transport" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
              Wheelchair Transport
            </Link>
            <Link href="/services/stretcher-transport" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
              Stretcher Service
            </Link>
            <Link href="/services/dialysis-transport" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
              Dialysis Transport
            </Link>
            <Link href="/about" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
              About Us
            </Link>
            <Link href="/gallery" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
              Our Fleet
            </Link>
            <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
              Blog
            </Link>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-100 to-red-100 rounded-2xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <FaAmbulance className="text-3xl text-red-600" />
            <FaMapMarkerAlt className="text-2xl text-blue-600" />
          </div>
          <p className="text-gray-800 font-semibold text-lg">
            Available 24/7 Throughout California
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Serving all 58 California counties with professional medical transportation
          </p>
        </div>
      </div>
    </div>
  );
}
