// app/services/stretcher-transport/page.js
import { metadata } from './metadata'
export { metadata }

export default function StretcherTransportPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-600 to-red-600 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-3xl">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🏥 Professional Medical Staff
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              Stretcher Transportation Services in California
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Safe, dignified stretcher transport for bed-bound patients with certified medical personnel and specialized equipment
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+15109578383" className="bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition shadow-xl">
                📞 Call (510) 957-8383
              </a>
              <a href="/contact" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition">
                Book Stretcher Transport
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xl text-gray-700 leading-relaxed mb-12">
            Eden Medical Transport provides professional non-emergency stretcher transportation throughout California. Our specially-equipped stretcher vans and certified medical staff ensure safe, comfortable transport for bed-bound patients who cannot sit upright during transport. Whether you need hospital discharge transport, facility transfers, or medical appointment transportation, we deliver compassionate care with the highest safety standards.
          </p>

          <h2 className="text-3xl font-bold text-purple-700 mb-8">Why Choose Our Stretcher Service?</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-bold mb-3">Certified Medical Personnel</h3>
              <p className="text-gray-700">EMR-certified staff trained in patient care, positioning, and emergency response</p>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">🚑</div>
              <h3 className="text-xl font-bold mb-3">Specialized Equipment</h3>
              <p className="text-gray-700">Modern stretcher vans with secure restraints, climate control, and medical equipment</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">💙</div>
              <h3 className="text-xl font-bold mb-3">Dignified Care</h3>
              <p className="text-gray-700">Compassionate service focused on patient comfort and dignity</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-md">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-bold mb-3">24/7 Availability</h3>
              <p className="text-gray-700">Round-the-clock service for emergency discharges and scheduled transports</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-purple-700 mb-6">Types of Stretcher Transport</h2>
          <div className="bg-gray-50 p-8 rounded-2xl mb-12">
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-2xl">🏥</span>
                <div><strong>Hospital Discharge:</strong> Safe transport from hospital to home or care facility</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🏢</span>
                <div><strong>Facility Transfers:</strong> Inter-facility transfers between hospitals, nursing homes, and rehab centers</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🔬</span>
                <div><strong>Medical Procedures:</strong> Transport to/from diagnostic tests, imaging, and outpatient procedures</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🏠</span>
                <div><strong>Home to Hospital:</strong> Non-emergency transport for scheduled admissions</div>
              </li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-purple-700 mb-6">Patient Types We Serve</h2>
          <p className="text-lg mb-6">Our stretcher service is ideal for patients who:</p>
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            <div className="bg-white border-2 border-purple-200 p-6 rounded-xl">
              <p className="text-gray-700">✅ Cannot sit upright during transport</p>
            </div>
            <div className="bg-white border-2 border-purple-200 p-6 rounded-xl">
              <p className="text-gray-700">✅ Require continuous supine positioning</p>
            </div>
            <div className="bg-white border-2 border-purple-200 p-6 rounded-xl">
              <p className="text-gray-700">✅ Are recovering from surgery or procedures</p>
            </div>
            <div className="bg-white border-2 border-purple-200 p-6 rounded-xl">
              <p className="text-gray-700">✅ Have mobility limitations or paralysis</p>
            </div>
            <div className="bg-white border-2 border-purple-200 p-6 rounded-xl">
              <p className="text-gray-700">✅ Need oxygen or medical monitoring</p>
            </div>
            <div className="bg-white border-2 border-purple-200 p-6 rounded-xl">
              <p className="text-gray-700">✅ Require bariatric stretcher service</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-purple-700 mb-6">Safety & Comfort Features</h2>
          <div className="bg-purple-50 border-l-4 border-purple-600 p-8 mb-12">
            <ul className="space-y-3 text-lg">
              <li><strong>🔒 Secure Restraint Systems:</strong> Five-point safety harnesses and cushioned restraints</li>
              <li><strong>🌡️ Climate Control:</strong> Temperature-regulated vehicles for patient comfort</li>
              <li><strong>💨 Smooth Suspension:</strong> Advanced suspension systems for gentle rides</li>
              <li><strong>🧼 Sanitization:</strong> Hospital-grade cleaning between every transport</li>
              <li><strong>📱 Real-time Updates:</strong> Family can track transport status</li>
              <li><strong>🩺 Medical Equipment:</strong> Oxygen, monitoring devices available as needed</li>
            </ul>
          </div>

          <h2 className="text-3xl font-bold text-purple-700 mb-6">Service Areas</h2>
          <p className="text-lg mb-6">We provide stretcher transportation throughout California including:</p>
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

          <h2 className="text-3xl font-bold text-purple-700 mb-6">Insurance & Pricing</h2>
          <div className="bg-gradient-to-r from-purple-50 to-red-50 p-8 rounded-2xl border border-purple-200">
            <p className="text-lg mb-4">
              We accept <strong>Medi-Cal</strong>, <strong>Medicare</strong>, most <strong>private insurance</strong>, and private pay for stretcher transportation services.
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
          <h2 className="text-4xl font-bold mb-6">Need Stretcher Transportation?</h2>
          <p className="text-xl mb-8">Available 24/7 for hospital discharges and scheduled transports</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+15109578383" className="bg-white text-purple-700 px-10 py-5 rounded-xl font-bold text-xl hover:scale-105 transition shadow-2xl">
              📞 (510) 957-8383
            </a>
            <a href="/contact" className="bg-white/20 backdrop-blur-sm border-2 border-white px-10 py-5 rounded-xl font-bold text-xl hover:scale-105 transition">
              Book Online
            </a>
          </div>
        </div>
      </section>
    </>
  )
}