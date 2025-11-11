// app/services/recurring-rides/page.js
import { metadata } from './metadata'
export { metadata }

export default function RecurringRidesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-600 to-orange-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              📅 Scheduled Service Specialist
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Recurring Transportation Services in California
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Reliable, punctual transportation for your regular trips - daily, weekly, or monthly schedules. Never worry about your commute again.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+15109578383" className="bg-white text-red-700 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition shadow-xl">
                📞 Call (510) 957-8383
              </a>
              <a href="/" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition">
                Schedule Regular Rides
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xl text-gray-700 leading-relaxed mb-12">
            Eden Transport Services specializes in reliable recurring transportation throughout California. We understand that consistency matters for your daily routine, which is why punctuality and dependability are our top priorities. Our professional drivers ensure you arrive on time for every scheduled trip.
          </p>

          <h2 className="text-3xl font-bold text-red-700 mb-8">Why Choose Recurring Rides?</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold mb-3">Always On Time</h3>
              <p className="text-gray-700">Punctuality guaranteed. We build buffer time to ensure you're never late</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold mb-3">Flexible Scheduling</h3>
              <p className="text-gray-700">Set up daily, weekly, or monthly schedules that fit your routine perfectly</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3">Save Money</h3>
              <p className="text-gray-700">Special discounted rates for recurring ride packages</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3">Familiar Drivers</h3>
              <p className="text-gray-700">Same drivers when possible for consistency and comfort</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-red-700 mb-6">Common Recurring Routes</h2>
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-2xl mb-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">🏫 School Transportation</h4>
                  <p className="text-gray-700">Daily pickup and drop-off for students, children, university commutes</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">💼 Work Commute</h4>
                  <p className="text-gray-700">Reliable transportation to and from work, 5 days a week or custom schedule</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">🏥 Medical Appointments</h4>
                  <p className="text-gray-700">Regular visits to doctors, therapy, or treatment centers</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">🛍️ Errands & Shopping</h4>
                  <p className="text-gray-700">Weekly grocery shopping, mall visits, personal errands</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-red-700 mb-6">Benefits of Recurring Service</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border-2 border-red-200 p-6 rounded-xl">
              <div className="text-3xl mb-3">✅</div>
              <h4 className="font-bold mb-2">No Daily Booking</h4>
              <p className="text-gray-600 text-sm">Set it once, ride worry-free every day</p>
            </div>
            <div className="bg-white border-2 border-red-200 p-6 rounded-xl">
              <div className="text-3xl mb-3">💵</div>
              <h4 className="font-bold mb-2">Better Pricing</h4>
              <p className="text-gray-600 text-sm">Save up to 30% with recurring packages</p>
            </div>
            <div className="bg-white border-2 border-red-200 p-6 rounded-xl">
              <div className="text-3xl mb-3">📱</div>
              <h4 className="font-bold mb-2">Easy Changes</h4>
              <p className="text-gray-600 text-sm">Modify schedule anytime with one call</p>
            </div>
            <div className="bg-white border-2 border-red-200 p-6 rounded-xl">
              <div className="text-3xl mb-3">⏱️</div>
              <h4 className="font-bold mb-2">Priority Service</h4>
              <p className="text-gray-600 text-sm">Recurring customers get priority booking</p>
            </div>
            <div className="bg-white border-2 border-red-200 p-6 rounded-xl">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="font-bold mb-2">Personalized</h4>
              <p className="text-gray-600 text-sm">Your preferences remembered and followed</p>
            </div>
            <div className="bg-white border-2 border-red-200 p-6 rounded-xl">
              <div className="text-3xl mb-3">🧼</div>
              <h4 className="font-bold mb-2">Clean Vehicles</h4>
              <p className="text-gray-600 text-sm">Sanitized and maintained regularly</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-red-700 mb-6">Flexible Schedule Options</h2>
          <div className="bg-gray-50 p-8 rounded-2xl mb-12">
            <ul className="grid md:grid-cols-2 gap-3 text-lg">
              <li className="flex items-center gap-2">
                <span className="text-red-600">✓</span> Daily (Monday - Friday)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✓</span> Weekly (Custom Days)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✓</span> Bi-weekly Schedules
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✓</span> Monthly Packages
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✓</span> Weekend Options Available
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✓</span> Custom Schedules
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-red-700 mb-6">Coverage Areas</h2>
          <p className="text-lg mb-6">Recurring transportation available throughout California including:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {['Alameda County', 'San Francisco', 'Contra Costa', 'Santa Clara', 'San Mateo', 'Marin County'].map(area => (
              <div key={area} className="bg-red-100 p-4 rounded-lg text-center font-semibold">
                {area}
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-red-700 mb-6">Pricing & Payment</h2>
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-2xl border border-red-200">
            <p className="text-lg mb-4">
              We offer <strong>discounted monthly packages</strong> for recurring rides. Save money compared to one-time bookings while enjoying guaranteed availability.
            </p>
            <p className="text-lg">
              💰 <strong>Contact us for a custom quote:</strong> <a href="tel:+15109578383" className="text-red-600 font-bold hover:underline">(510) 957-8383</a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Set Up Your Recurring Transportation</h2>
          <p className="text-xl mb-8">Reliable service • Flexible schedules • Save money</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+15109578383" className="bg-white text-red-700 px-10 py-5 rounded-xl font-bold text-xl hover:scale-105 transition shadow-2xl">
              📞 (510) 957-8383
            </a>
            <a href="/" className="bg-white/20 backdrop-blur-sm border-2 border-white px-10 py-5 rounded-xl font-bold text-xl hover:scale-105 transition">
              Schedule Online
            </a>
          </div>
        </div>
      </section>
    </>
  )
}