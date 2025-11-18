'use client'

import Link from 'next/link'
import { FaExclamationTriangle, FaHome, FaPhoneAlt } from 'react-icons/fa'

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-gray-50 px-4 py-16">
      <div className="text-center max-w-2xl mx-auto">
        
        {/* Error Icon */}
        <div className="text-8xl mb-6 animate-bounce">
          <FaExclamationTriangle className="text-red-600 mx-auto" />
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Something Went Wrong
        </h1>
        
        {/* Description */}
        <p className="text-xl text-gray-600 mb-3">
          We encountered an unexpected error
        </p>
        
        {/* Error message (if available) */}
        {error?.message && (
          <div className="mb-8">
            <p className="text-sm text-gray-500 font-mono bg-gray-100 p-4 rounded-lg border border-gray-200">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 hover:shadow-lg transition-all"
          >
            🔄 Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg transition-all"
          >
            <FaHome /> Go Home
          </Link>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <p className="text-gray-700 mb-4 font-semibold">
            Need immediate assistance?
          </p>
          <a
            href="tel:+15109578383"
            className="inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors"
          >
            <FaPhoneAlt /> Call (510) 957-8383
          </a>
          <p className="text-sm text-gray-600 mt-2">
            Available 24/7 for medical transportation
          </p>
        </div>
      </div>
    </div>
  )
}