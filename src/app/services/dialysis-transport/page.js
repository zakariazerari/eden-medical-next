// app/services/dialysis-transport/page.js
import { metadata } from './metadata'
export { metadata }

export default function DialysisTransportPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-600 to-orange-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              💉 Recurring Service Specialist
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Dialysis Transportation Services in California
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Reliable, punctual transportation to dialysis centers 3-4 times per week. Never miss a treatment with our dedicated dialysis transport service.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+15109578383" className="bg-white text-red-700 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition shadow-xl">
                📞 Call (510) 957-8383
              </a>
              <a href="/contact" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition">
                Schedule Dialysis Rides
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xl text-gray-700 leading-relaxed mb-12">
            Eden Medical Transport specializes in reliable dialysis transportation throughout California. We understand that missing dialysis treatments isn't an option, which is why punctuality and dependability are our top priorities. Our wheelchair-accessible vehicles and compassionate drivers ensure you arrive on time for every session and get home safely afterward.
          </p>

          <h2 className="text-3xl font-bold text-red-700 mb-8">Why Choose Us for Dialysis Transportation?</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold mb-3">Always On Time</h3>
              <p className="text-gray-700">Punctuality guaranteed. We build buffer time to ensure you never miss a treatment</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold mb-3">Recurring Schedule</h3>
              <p className="text-gray-700">Set up standing appointments for Mon/Wed/Fri or Tue/Thu/Sat dialysis schedules</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">♿</div>
              <h3 className="text-xl font-bold mb-3">Wheelchair Accessible</h3>
              <p className="text-gray-700">All vehicles equipped with lifts for patients with mobility limitations</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-bold mb-3">Insurance Accepted</h3>
              <p className="text-gray-700">Medi-Cal, Medicare, and most private insurance plans accepted</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-red-700 mb-6">Our Dialysis Transport Process</h2>
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-2xl mb-12">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Schedule Setup</h4>
                  <p className="text-gray-700">Call us to set up your recurring dialysis transportation schedule (Mon/Wed/Fri or Tue/Thu/Sat)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Timely Pickup</h4>
                  <p className="text-gray-700">Driver arrives 5-10 minutes early to ensure punctual arrival at dialysis center</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Safe Transport</h4>
                  <p className="text-gray-700">Comfortable ride to dialysis center with assistance getting in/out of vehicle</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Return Home</h4>
                  <p className="text-gray-700">After treatment, safe transport back home with same care and attention</p>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-red-700 mb-6">Benefits of Our Dialysis Service</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white border-2 border-red-200 p-6 rounded-xl">
              <div className="text-3xl mb-3">✅</div>
              <h4 className="font-bold mb-2">Never Miss Treatment</h4>
              <p className="text-gray-600 text-sm">Reliable service ensures you make every dialysis appointment</p>
            </div>
            <div className="bg-white border-2 border-red-200 p-6 rounded-xl">
              <div className="text-3xl mb-3">👥</div>
              <h4 className="font-bold mb-2">Familiar Drivers</h4>
              <p className="text-gray-600 text-sm">Same drivers when possible for consistency and comfort</p>
            </div>
            <div className="bg-white border-2 border-red-200 p-6 rounded-xl">
              <div className="text-3xl mb-3">📅</div>
              <h4 className="font-bold mb-2">Flexible Scheduling</h4>
              <p className="text-gray-600 text-sm">Easy to adjust pickup times if treatment schedule changes</p>
            </div>
            <div className="bg-white border-2 border-red-200 p-6 rounded-xl">
              <div className="text-3xl mb-3">💰</div>
              <h4 className="font-bold mb-2">Affordable Rates</h4>
              <p className="text-gray-600 text-sm">Competitive pricing and insurance coverage</p>
            </div>
            <div className="bg-white border-2 border-red-200 p-6 rounded-xl">
              <div className="text-3xl mb-3">🆘</div>
              <h4 className="font-bold mb-2">Emergency Backup</h4>
              <p className="text-gray-600 text-sm">24/7 availability if your schedule changes unexpectedly</p>
            </div>
            <div className="bg-white border-2 border-red-200 p-6 rounded-xl">
              <div className="text-3xl mb-3">🧼</div>
              <h4 className="font-bold mb-2">Clean Vehicles</h4>
              <p className="text-gray-600 text-sm">Sanitized after every trip for your health</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-red-700 mb-6">Dialysis Centers We Serve</h2>
          <p className="text-lg mb-6">We provide transportation to all dialysis centers throughout California, including:</p>
          <div className="bg-gray-50 p-8 rounded-2xl mb-12">
            <ul className="grid md:grid-cols-2 gap-3 text-lg">
              <li className="flex items-center gap-2">
                <span className="text-red-600">✓</span> DaVita Dialysis Centers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✓</span> Fresenius Kidney Care
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✓</span> US Renal Care Centers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✓</span> Independent Dialysis Facilities
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✓</span> Hospital-Based Dialysis Units
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-600">✓</span> All Other Licensed Centers
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-red-700 mb-6">Coverage Areas</h2>
          <p className="text-lg mb-6">Dialysis transportation available throughout California including:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {['Alameda County', 'San Francisco', 'Contra Costa', 'Santa Clara', 'San Mateo', 'Marin County'].map(area => (
              <div key={area} className="bg-red-100 p-4 rounded-lg text-center font-semibold">
                {area}
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-red-700 mb-6">Insurance & Payment</h2>
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-8 rounded-2xl border border-red-200">
            <p className="text-lg mb-4">
              Most dialysis transportation is covered by <strong>Medi-Cal</strong> and <strong>Medicare</strong> for eligible patients. We also accept private insurance and private pay.
            </p>
            <p className="text-lg">
              💰 <strong>Contact us to verify coverage:</strong> <a href="tel:+15109578383" className="text-red-600 font-bold hover:underline">(510) 957-8383</a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Set Up Your Dialysis Transportation</h2>
          <p className="text-xl mb-8">Reliable service • Recurring schedules • Never miss a treatment</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+15109578383" className="bg-white text-red-700 px-10 py-5 rounded-xl font-bold text-xl hover:scale-105 transition shadow-2xl">
              📞 (510) 957-8383
            </a>
            <a href="/contact" className="bg-white/20 backdrop-blur-sm border-2 border-white px-10 py-5 rounded-xl font-bold text-xl hover:scale-105 transition">
              Schedule Online
            </a>
          </div>
        </div>
      </section>
    </>
  )
}