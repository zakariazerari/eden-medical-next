// app/services/wheelchair-transport/page.js
import { metadata } from './metadata'
export { metadata }

export default function WheelchairTransportPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              ♿ ADA Compliant Service
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Wheelchair Transportation Services in California
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Safe, comfortable, and reliable wheelchair accessible medical transportation with certified drivers and modern ADA-compliant vehicles
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+15109578383" className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition shadow-xl">
                📞 Call (510) 957-8383
              </a>
              <a href="/contact" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition">
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
              Eden Medical Transport provides professional wheelchair accessible transportation throughout California. Our modern fleet of ADA-compliant vans ensures patients can travel to medical appointments with dignity, safety, and comfort. Whether you use a manual wheelchair, power wheelchair, or mobility scooter, we have the right vehicle and trained staff to meet your needs.
            </p>

            <h2 className="text-3xl font-bold text-blue-700 mt-12 mb-6">Why Choose Our Wheelchair Transport Service?</h2>
            
            <div className="grid md:grid-cols-2 gap-6 my-10 not-prose">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-md border border-blue-200">
                <div className="text-4xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">ADA Compliant Vehicles</h3>
                <p className="text-gray-700">All our wheelchair vans meet or exceed ADA accessibility standards with secure hydraulic lifts, ramps, and advanced tie-down systems for maximum safety.</p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-md border border-purple-200">
                <div className="text-4xl mb-4">👨‍⚕️</div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">Certified EMR Drivers</h3>
                <p className="text-gray-700">Our drivers are trained Emergency Medical Responders certified in wheelchair securement, patient assistance, CPR, and first aid.</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-md border border-green-200">
                <div className="text-4xl mb-4">🧼</div>
                <h3 className="text-xl font-bold text-green-900 mb-3">Comfortable & Clean</h3>
                <p className="text-gray-700">Vehicles are climate-controlled, spacious, and sanitized with hospital-grade disinfectants between every trip.</p>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-md border border-red-200">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-bold text-red-900 mb-3">24/7 Availability</h3>
                <p className="text-gray-700">Book wheelchair transport any time, day or night, including weekends and holidays. We're always here when you need us.</p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-blue-700 mt-16 mb-6">Types of Wheelchair Transport We Provide</h2>
            <div className="bg-gray-50 p-8 rounded-2xl my-8">
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🏥</span>
                  <div>
                    <strong className="text-gray-900">Medical Appointments:</strong>
                    <span className="text-gray-700"> Doctor visits, specialist consultations, diagnostic tests, lab work</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">💉</span>
                  <div>
                    <strong className="text-gray-900">Dialysis Transport:</strong>
                    <span className="text-gray-700"> Recurring transportation to dialysis centers 3-4 times per week with punctual service</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🏋️</span>
                  <div>
                    <strong className="text-gray-900">Physical Therapy:</strong>
                    <span className="text-gray-700"> Regular trips to PT and rehabilitation facilities</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🏥</span>
                  <div>
                    <strong className="text-gray-900">Hospital Discharge:</strong>
                    <span className="text-gray-700"> Safe transport home after hospital stays or procedures</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <strong className="text-gray-900">Assisted Living Transport:</strong>
                    <span className="text-gray-700"> Facility-to-facility and facility-to-appointment transportation</span>
                  </div>
                </li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-blue-700 mt-16 mb-6">Wheelchair Sizes We Accommodate</h2>
            <p className="text-lg mb-6">Our spacious vehicles can safely transport various wheelchair types and sizes:</p>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
              <ul className="space-y-3 text-lg">
                <li><strong>✅ Standard Manual Wheelchairs:</strong> Up to 300 lbs capacity</li>
                <li><strong>✅ Power Wheelchairs & Scooters:</strong> Up to 600 lbs capacity</li>
                <li><strong>✅ Bariatric Wheelchairs:</strong> Up to 850 lbs with advance notice</li>
                <li><strong>✅ Reclining Wheelchairs:</strong> For patients requiring elevated positioning</li>
                <li><strong>✅ Pediatric Wheelchairs:</strong> Safe transport for children with special needs</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold text-blue-700 mt-16 mb-6">Service Areas Throughout California</h2>
            <p className="text-lg mb-6">We provide wheelchair transportation in all 58 California counties, including:</p>
            <div className="grid md:grid-cols-3 gap-4 my-8 not-prose">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
                <h4 className="font-bold text-xl mb-2">📍 Alameda County</h4>
                <p className="text-blue-100 text-sm">Oakland, Berkeley, Fremont, Hayward, San Leandro</p>
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

            <h2 className="text-3xl font-bold text-blue-700 mt-16 mb-6">Pricing & Insurance Coverage</h2>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200 my-8">
              <p className="text-lg mb-4">
                We accept <strong>Medi-Cal</strong>, <strong>Medicare</strong> (for eligible trips), most <strong>private insurance</strong>, and private pay. Many wheelchair transport trips are fully or partially covered by insurance.
              </p>
              <p className="text-lg">
                <strong>💰 Contact us for a free quote</strong> based on your specific needs, distance, and insurance coverage. Call <a href="tel:+15109578383" className="text-blue-600 font-bold hover:underline">(510) 957-8383</a> or use our online form.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-blue-700 mt-16 mb-6">Safety Features & Protocols</h2>
            <div className="grid md:grid-cols-2 gap-6 my-8 not-prose">
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-3 text-gray-900">🔒 Secure Wheelchair Restraints</h4>
                <p className="text-gray-700">Four-point tie-down systems meeting federal safety standards</p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-3 text-gray-900">🛡️ Safety Inspections</h4>
                <p className="text-gray-700">Regular vehicle inspections and maintenance checks</p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-3 text-gray-900">🧼 Sanitization Protocol</h4>
                <p className="text-gray-700">Hospital-grade disinfection between every transport</p>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <h4 className="font-bold text-lg mb-3 text-gray-900">👨‍⚕️ Trained Personnel</h4>
                <p className="text-gray-700">EMR certified drivers with patient care training</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Book Wheelchair Transportation Now
          </h2>
          <p className="text-xl md:text-2xl mb-8">
            Available 24/7 throughout California • Same-day service available
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+15109578383" className="bg-white text-blue-700 px-10 py-5 rounded-xl font-bold text-xl hover:scale-105 transition shadow-2xl">
              📞 Call (510) 957-8383
            </a>
            <a href="/contact" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-xl hover:scale-105 transition">
              Online Booking Form
            </a>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-8">Other Medical Transport Services</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="/services/stretcher-transport" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-200">
              <div className="text-4xl mb-3">🏥</div>
              <h4 className="font-bold text-xl mb-2">Stretcher Transportation</h4>
              <p className="text-gray-600">For bed-bound patients requiring full support →</p>
            </a>
            <a href="/services/dialysis-transport" className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition border border-gray-200">
              <div className="text-4xl mb-3">💉</div>
              <h4 className="font-bold text-xl mb-2">Dialysis Transportation</h4>
              <p className="text-gray-600">Reliable recurring transport 3-4x per week →</p>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}