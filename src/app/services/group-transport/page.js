// app/services/group-transport/page.js
import { metadata } from './metadata'
export { metadata }

export default function GroupTransportPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-600 to-red-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              👥 Group Service Specialist
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Group Transportation Services in East Bay
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Safe, comfortable group transportation for families, friends, and teams traveling together
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+15109578383" className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition shadow-xl">
                📞 Call (510) 957-8383
              </a>
              <a href="/" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition">
                Book Group Transport
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xl text-gray-700 leading-relaxed mb-12">
            Eden Transport Services provides professional group transportation throughout East Bay and Bay Area. Our spacious vehicles accommodate families, friend groups, business teams, and event attendees traveling together. Whether you need airport shuttles, event transportation, or group outings, we deliver safe and comfortable rides with experienced drivers.
          </p>

          <h2 className="text-3xl font-bold text-purple-700 mb-8">Why Choose Our Group Service?</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">🚐</div>
              <h3 className="text-xl font-bold mb-3">Spacious Vehicles</h3>
              <p className="text-gray-700">Vans and minibuses with comfortable seating for 6-15 passengers</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">👨‍✈️</div>
              <h3 className="text-xl font-bold mb-3">Professional Drivers</h3>
              <p className="text-gray-700">Experienced drivers trained in group transportation and customer service</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">💙</div>
              <h3 className="text-xl font-bold mb-3">Comfortable Rides</h3>
              <p className="text-gray-700">Air conditioning, spacious legroom, and smooth suspension for pleasant journeys</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold mb-3">24/7 Availability</h3>
              <p className="text-gray-700">Round-the-clock service for all your group transportation needs</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-purple-700 mb-6">Types of Group Transport</h2>
          <div className="bg-gray-50 p-8 rounded-2xl mb-12">
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-2xl">✈️</span>
                <div><strong>Airport Shuttles:</strong> Group transportation to/from SFO, OAK, SJC airports</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🎉</span>
                <div><strong>Event Transport:</strong> Weddings, parties, concerts, conferences, and celebrations</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🏢</span>
                <div><strong>Corporate Shuttles:</strong> Employee transportation, business meetings, team events</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🏫</span>
                <div><strong>School Groups:</strong> Field trips, sports events, educational excursions</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
                <div><strong>Family Outings:</strong> Reunions, vacations, sightseeing tours</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🎭</span>
                <div><strong>Entertainment:</strong> Concerts, shows, sporting events, nightlife</div>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-purple-700 mb-6">Group Sizes We Serve</h2>
          <p className="text-lg mb-6">We accommodate various group sizes with the right vehicle:</p>
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="bg-white border-2 border-purple-200 p-6 rounded-xl">
              <p className="text-gray-700">✅ Small Groups (2-6 passengers)</p>
            </div>
            <div className="bg-white border-2 border-purple-200 p-6 rounded-xl">
              <p className="text-gray-700">✅ Medium Groups (7-10 passengers)</p>
            </div>
            <div className="bg-white border-2 border-purple-200 p-6 rounded-xl">
              <p className="text-gray-700">✅ Large Groups (11-15 passengers)</p>
            </div>
            <div className="bg-white border-2 border-purple-200 p-6 rounded-xl">
              <p className="text-gray-700">✅ Multiple Vehicles for Larger Groups</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-purple-700 mb-6">Vehicle Features</h2>
          <div className="bg-purple-50 border-l-4 border-purple-600 p-8 mb-12">
            <ul className="space-y-3 text-lg">
              <li><strong>❄️ Climate Control:</strong> Air conditioning and heating for comfort</li>
              <li><strong>🎵 Entertainment:</strong> Bluetooth audio system (on select vehicles)</li>
              <li><strong>🧳 Luggage Space:</strong> Ample storage for bags and belongings</li>
              <li><strong>🧼 Sanitization:</strong> Thoroughly cleaned between trips</li>
              <li><strong>📱 USB Charging:</strong> Keep devices charged during travel</li>
              <li><strong>🔒 Safety Features:</strong> Seat belts, airbags, and safety equipment</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-purple-700 mb-6">Service Areas</h2>
          <p className="text-lg mb-6">We provide group transportation throughout East Bay including:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <p className="font-bold">Alameda County</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <p className="font-bold">San Francisco</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <p className="font-bold">Contra Costa</p>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg text-center">
              <p className="font-bold">Santa Clara</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-purple-700 mb-6">Pricing</h2>
          <div className="bg-gradient-to-r from-purple-50 to-red-50 p-8 rounded-2xl border border-purple-200">
            <p className="text-lg mb-4">
              Group rates available with <strong>discounts for larger groups</strong>. Pricing depends on group size, distance, and duration.
            </p>
            <p className="text-lg">
              📞 <strong>Call for a free quote:</strong> <a href="tel:+15109578383" className="text-purple-600 font-bold hover:underline">(510) 957-8383</a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Book Group Transportation</h2>
          <p className="text-xl mb-8">Available 24/7 for events, trips, and group outings</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+15109578383" className="bg-white text-purple-700 px-10 py-5 rounded-xl font-bold text-xl hover:scale-105 transition shadow-2xl">
              📞 (510) 957-8383
            </a>
            <a href="/" className="bg-white/20 backdrop-blur-sm border-2 border-white px-10 py-5 rounded-xl font-bold text-xl hover:scale-105 transition">
              Book Online
            </a>
          </div>
        </div>
      </section>
    </>
  )
}