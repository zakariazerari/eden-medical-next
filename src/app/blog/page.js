// app/blog/page.js - FULLY RESPONSIVE VERSION
import { metadata } from './metadata'
export { metadata }

export default function BlogPage() {
  const posts = [];
  const categories = ['All', 'Health Tips', 'Transportation', 'Industry News', 'Patient Stories', 'Guides'];

  return (
    <>
      {/* Hero Section - RESPONSIVE */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 text-white py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
            Medical Transport Blog
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
            Expert insights, health tips, and industry news to help you navigate medical transportation with confidence
          </p>
        </div>
      </section>

      {/* Category Filter - RESPONSIVE */}
      <section className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                className="px-4 sm:px-6 py-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition whitespace-nowrap font-semibold text-sm sm:text-base flex-shrink-0"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid - RESPONSIVE */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12 sm:py-16 md:py-20">
            <div className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6">📝</div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Coming Soon!
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 px-4 max-w-2xl mx-auto">
              We're working on great content for you. Check back soon!
            </p>
            <a 
              href="/"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition text-sm sm:text-base"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section - RESPONSIVE */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 px-2">
            Need Medical Transportation?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 px-2">
            Book reliable, professional medical transport service throughout California
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <a 
              href="tel:+15109578383" 
              className="bg-white text-blue-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:scale-105 transition shadow-xl"
            >
              📞 Call (510) 957-8383
            </a>
            <a 
              href="/" 
              className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:scale-105 transition"
            >
              Book Online
            </a>
          </div>
        </div>
      </section>
    </>
  )
}