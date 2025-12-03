// app/services/premium-rides/page.js
import { metadata } from './metadata'
export { metadata }

export default function PremiumRidesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              ⭐ Premium Comfort Service
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Premium Ride Services in California
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Comfortable, reliable, and professional transportation with certified drivers and luxury vehicles for all your travel needs
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+15109578383" className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition shadow-xl">
                📞 Call (510) 957-8383
              </a>
              <a href="/" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition">
                Book Online
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              Eden Transport Services provides professional premium transportation throughout California. Our modern fleet of comfortable vehicles ensures passengers can travel to any destination with safety, comfort, and style. Whether you need rides for appointments, work, school, shopping, or special occasions, we provide the perfect transportation solution.
            </p>

            <h2 className="text-3xl font-bold text-blue-700 mt-12 mb-6">Why Choose Our Premium Service?</h2>
            
            <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-md border border-blue-200">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">Comfortable Vehicles</h3>
                <p className="text-gray-700">Modern, spacious, and well-maintained cars with air conditioning, comfortable seating, and smooth rides.</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-md border border-purple-200">
                <div className="text-4xl mb-4">👨‍✈️</div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">Professional Drivers</h3>
                <p className="text-gray-700">Our drivers are professionally trained, background-checked, licensed, and committed to excellent customer service.</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-md border border-green-200">
                <div className="text-4xl mb-4">🧼</div>
                <h3 className="text-xl font-bold text-green-900 mb-3">Clean & Safe</h3>
                <p className="text-gray-700">Vehicles are thoroughly cleaned and sanitized regularly, ensuring a pleasant and hygienic travel experience.</p>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-md border border-red-200">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-bold text-red-900 mb-3">24/7 Availability</h3>
                <p className="text-gray-700">Book rides any time, day or night, including weekends and holidays. We're always ready to serve you.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-blue-700 mt-16 mb-6">Transportation Services We Provide</h2>
            <div className="bg-gray-50 p-8 rounded-2xl my-8">
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🏥</span>
                  <div>
                    <strong className="text-gray-900">Appointments:</strong>
                    <span className="text-gray-700"> Doctor visits, business meetings, interviews, consultations</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🏫</span>
                  <div>
                    <strong className="text-gray-900">School & University:</strong>
                    <span className="text-gray-700"> Daily commutes to schools, colleges, and training centers</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">💼</span>
                  <div>
                    <strong className="text-gray-900">Work Commute:</strong>
                    <span className="text-gray-700"> Reliable transportation to and from work every day</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🛍️</span>
                  <div>
                    <strong className="text-gray-900">Shopping & Errands:</strong>
                    <span className="text-gray-700"> Grocery shopping, mall visits, personal errands</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">✈️</span>
                  <div>
                    <strong className="text-gray-900">Airport Transport:</strong>
                    <span className="text-gray-700"> Reliable rides to/from SFO, OAK, SJC and all California airports</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🎉</span>
                  <div>
                    <strong className="text-gray-900">Special Events:</strong>
                    <span className="text-gray-700"> Weddings, parties, concerts, and celebrations</span>
                  </div>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-blue-700 mt-16 mb-6">Service Areas Throughout California</h2>
            <p className="text-lg mb-6">We provide transportation services in all major California cities and counties:</p>
            <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                <h4 className="font-bold text-xl mb-2">📍 Alameda County</h4>
                <p className="text-blue-100 text-sm">Service Areas throughout California and replace serving the Bay Area and sounding areas</p>
                <p className="font-mono text-sm mt-3">☎️ (510) 957-8383</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
                <h4 className="font-bold text-xl mb-2">📍 San Francisco</h4>
                <p className="text-purple-100 text-sm">All neighborhoods served citywide</p>
                <p className="font-mono text-sm mt-3">☎️ (415) 994-1442</p>
              </div>
              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
                <h4 className="font-bold text-xl mb-2">📍 Santa Clara County</h4>
                <p className="text-red-100 text-sm">San Jose, Palo Alto, Sunnyvale, Mountain View</p>
                <p className="font-mono text-sm mt-3">☎️ (408) 579-9775</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-blue-700 mt-16 mb-6">Pricing & Payment</h2>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200 my-8">
              <p className="text-lg mb-4">
                We offer <strong>competitive rates</strong> with transparent pricing. Payment options include <strong>cash</strong>, <strong>credit/debit cards</strong>, and <strong>digital payments</strong>.
              </p>
              <p className="text-lg">
                <strong>💰 Contact us for a free quote</strong> based on your destination and requirements. Call <a href="tel:+15109578383" className="text-blue-600 font-bold hover:underline">(510) 957-8383</a> or use our online booking form.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-blue-700 mt-16 mb-6">Safety Features & Standards</h2>
            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-3 text-gray-900">🔒 Secure Rides</h4>
                <p className="text-gray-700">GPS tracking, background-checked drivers, and safety protocols</p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-3 text-gray-900">🛡️ Safety Inspections</h4>
                <p className="text-gray-700">Regular vehicle inspections and maintenance checks</p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-3 text-gray-900">🧼 Sanitization Protocol</h4>
                <p className="text-gray-700">Thorough cleaning and disinfection between rides</p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-3 text-gray-900">👨‍✈️ Trained Drivers</h4>
                <p className="text-gray-700">Licensed, insured, and customer service trained</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Book Your Ride Now
          </h2>
          <p className="text-xl md:text-2xl mb-8">
            Available 24/7 throughout California • Same-day service available
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+15109578383" className="bg-white text-blue-700 px-10 py-5 rounded-xl font-bold text-xl hover:scale-105 transition shadow-2xl">
              📞 Call (510) 957-8383
            </a>
            <a href="/" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-xl hover:scale-105 transition">
              Online Booking Form
            </a>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-8">Other Transport Services</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="/services/recurring-rides" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-200">
              <div className="text-4xl mb-3">📅</div>
              <h4 className="font-bold text-xl mb-2">Recurring Rides</h4>
              <p className="text-gray-600">Schedule regular daily or weekly transportation →</p>
            </a>
            <a href="/services/group-transport" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-200">
              <div className="text-4xl mb-3">👥</div>
              <h4 className="font-bold text-xl mb-2">Group Transportation</h4>
              <p className="text-gray-600">Larger vehicles for groups and families →</p>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}