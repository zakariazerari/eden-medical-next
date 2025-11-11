export const metadata = {
  title: "Terms of Service | Eden Medical Transport California",
  description: "Terms and conditions for using Eden Medical Transport non-emergency medical transportation services in California",
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-red-600 to-orange-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-white/90">
            Please read these terms carefully before using our services
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
            
            {/* Last Updated */}
            <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
              <p className="text-sm font-semibold text-red-800">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Agreement */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                By booking or using Eden Medical Transport services, you agree to be bound by these 
                Terms of Service. If you disagree with any part of these terms, you may not use our services. 
                These terms apply to all users of our non-emergency medical transportation services in California.
              </p>
            </section>

            {/* Services */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Services Provided</h2>
              <div className="bg-blue-50 rounded-xl p-6 mb-4">
                <h3 className="text-xl font-bold text-blue-900 mb-3">We Provide:</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Non-emergency medical transportation (NEMT)</li>
                  <li>Wheelchair accessible transportation</li>
                  <li>Stretcher transportation services</li>
                  <li>Dialysis transportation (recurring appointments)</li>
                  <li>Medical appointment transportation</li>
                  <li>Hospital discharge transportation</li>
                  <li>24/7 availability throughout California</li>
                </ul>
              </div>

              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-red-900 mb-3">We Do NOT Provide:</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>❌ Emergency ambulance services (call 911 for emergencies)</li>
                  <li>❌ Medical treatment or healthcare services</li>
                  <li>❌ Paramedic or EMT services</li>
                  <li>❌ Transportation for unstable or critical patients</li>
                </ul>
              </div>
            </section>

            {/* Booking */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Booking & Reservations</h2>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">Advance Booking</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Reservations should be made at least <strong>24 hours in advance</strong> when possible</li>
                <li>Same-day service available based on availability</li>
                <li>Recurring appointments can be scheduled weekly/monthly</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">Required Information</h3>
              <p className="text-gray-700 mb-2">You must provide:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Patient name and contact information</li>
                <li>Pickup and destination addresses</li>
                <li>Appointment date and time</li>
                <li>Mobility requirements (wheelchair, stretcher, ambulatory)</li>
                <li>Any special needs or medical equipment</li>
              </ul>
            </section>

            {/* Cancellation */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Cancellation Policy</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-2 border-green-300 rounded-xl p-6 bg-green-50">
                  <h4 className="text-lg font-bold text-green-900 mb-3">✅ No Cancellation Fee</h4>
                  <p className="text-gray-700">
                    Cancellations made <strong>2+ hours before</strong> scheduled pickup time incur no fee
                  </p>
                </div>
                <div className="border-2 border-red-300 rounded-xl p-6 bg-red-50">
                  <h4 className="text-lg font-bold text-red-900 mb-3">⚠️ Cancellation Fee May Apply</h4>
                  <p className="text-gray-700">
                    Cancellations with <strong>less than 2 hours notice</strong> or no-shows may incur a cancellation fee
                  </p>
                </div>
              </div>
              <p className="text-gray-700 mt-4">
                To cancel, call us immediately at <a href="tel:+15109578383" className="text-blue-600 font-bold">(510) 957-8383</a>
              </p>
            </section>

            {/* Payment */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Payment Terms</h2>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">Accepted Payment Methods</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-100 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">💵</div>
                  <p className="font-bold text-sm">Cash</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">💳</div>
                  <p className="font-bold text-sm">Credit/Debit</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">📱</div>
                  <p className="font-bold text-sm">Zelle/Digital</p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg text-center">
                  <div className="text-3xl mb-2">🏥</div>
                  <p className="font-bold text-sm">Insurance</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">Payment Timing</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Payment is due at time of service</li>
                <li>Insurance: We bill directly to Medi-Cal, Medicare, and private insurance</li>
                <li>You are responsible for any co-pays or deductibles</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3">Pricing</h3>
              <p className="text-gray-700">
                Prices vary based on distance, service type (wheelchair/stretcher/sedan), and whether it's 
                a one-time or recurring service. Contact us for a free quote specific to your needs.
              </p>
            </section>

            {/* Passenger Responsibilities */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Passenger Responsibilities</h2>
              <p className="text-gray-700 mb-4">As a passenger, you agree to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Be ready at scheduled pickup time (drivers wait up to 15 minutes)</li>
                <li>Provide accurate information about mobility and medical needs</li>
                <li>Treat drivers and staff with respect</li>
                <li>Not smoke, eat, or drink in vehicles</li>
                <li>Secure personal belongings</li>
                <li>Follow driver instructions for safety</li>
                <li>Notify us of changes to appointment times immediately</li>
                <li>Ensure companion/caregiver accompanies if required</li>
              </ul>
            </section>

            {/* Companion Policy */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Companion & Family Policy</h2>
              <p className="text-gray-700 mb-4">
                One companion or family member may accompany the patient at no additional charge, 
                space permitting. Additional passengers may incur extra fees. Please inform us when 
                booking if companions will be traveling.
              </p>
            </section>

            {/* Wait Time */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Wait Time Policy</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Included:</strong> Up to 15 minutes of wait time at pickup location (no charge)</li>
                <li><strong>Extended Wait:</strong> Additional wait time beyond 15 minutes may incur hourly charges</li>
                <li><strong>Appointment Wait:</strong> If you need us to wait during appointment, please arrange in advance</li>
              </ul>
            </section>

            {/* Safety */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Safety & Compliance</h2>
              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-yellow-900 mb-3">🛡️ Our Commitments</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>All vehicles maintained to California DMV standards</li>
                  <li>All drivers licensed, background-checked, and trained</li>
                  <li>ADA compliant wheelchair accessible vehicles</li>
                  <li>Comprehensive commercial insurance coverage</li>
                  <li>Regular vehicle safety inspections</li>
                  <li>HIPAA compliant patient information handling</li>
                </ul>
              </div>
            </section>

            {/* Liability */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                We maintain full commercial liability insurance. However, we are not liable for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Delays due to traffic, weather, or circumstances beyond our control</li>
                <li>Missed appointments due to patient late readiness</li>
                <li>Personal belongings left in vehicles</li>
                <li>Medical emergencies requiring 911 services</li>
                <li>Indirect or consequential damages</li>
              </ul>
              <p className="text-gray-700 mt-4 font-semibold">
                For emergencies, always call 911 immediately.
              </p>
            </section>

            {/* Service Refusal */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Right to Refuse Service</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to refuse or discontinue service if:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Patient condition requires emergency medical attention (we'll call 911)</li>
                <li>Passenger is abusive, threatening, or disruptive</li>
                <li>Payment is not received or insufficient</li>
                <li>Patient misrepresented mobility or medical needs</li>
                <li>Safety concerns for driver or other passengers</li>
              </ul>
            </section>

            {/* Modifications */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Modifications to Terms</h2>
              <p className="text-gray-700">
                We may modify these terms at any time. Changes will be posted on this page with an updated 
                "Last Updated" date. Continued use of services after modifications constitutes acceptance of 
                the new terms.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700">
                These Terms are governed by the laws of the State of California. Any disputes shall be 
                resolved in the appropriate courts of California.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                Questions about these terms? Contact us:
              </p>
              <div className="space-y-2 text-gray-800">
                <p><strong>24/7 Hotline:</strong> <a href="tel:+15109578383" className="text-red-600 hover:text-red-700 font-bold text-xl">(510) 957-8383</a></p>
                <p><strong>Email:</strong> <a href="mailto:info@edenmedical.com" className="text-red-600 hover:text-red-700 font-semibold">info@edenmedical.com</a></p>
                <p><strong>Address:</strong> Eden Medical Transport, Oakland, California</p>
              </div>
            </section>

            {/* Acknowledgment */}
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Acknowledgment</h3>
              <p className="text-gray-700">
                By using Eden Medical Transport services, you acknowledge that you have read, understood, 
                and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Transportation?</h2>
          <p className="text-xl mb-6">We're available 24/7 to serve you</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+15109578383" className="bg-white text-red-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition text-lg">
              📞 Call (510) 957-8383
            </a>
            <a href="/" className="bg-white/20 backdrop-blur-sm border-2 border-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition text-lg">
              📅 Book Online
            </a>
          </div>
        </div>
      </section>
    </>
  );
}