export const metadata = {
  title: "Privacy Policy | Eden Medical Transport California",
  description: "Privacy policy and data protection information for Eden Medical Transport services in California",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-white/90">
            Your privacy and data security are our top priorities
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 space-y-8">
            
            {/* Last Updated */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <p className="text-sm font-semibold text-blue-800">
                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>

            {/* Introduction */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                Eden Medical Transport ("we," "our," or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you use our non-emergency medical transportation services in California.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">Personal Information</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number, physical address</li>
                <li><strong>Booking Details:</strong> Pickup/destination addresses, appointment dates and times</li>
                <li><strong>Medical Information:</strong> Mobility requirements (wheelchair, stretcher, ambulatory)</li>
                <li><strong>Payment Information:</strong> Payment method, billing address (processed securely)</li>
                <li><strong>Emergency Contacts:</strong> Names and phone numbers of emergency contacts</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 mb-3 mt-6">Automatically Collected Information</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>IP Address:</strong> For security and fraud prevention</li>
                <li><strong>Browser Information:</strong> Browser type, operating system</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent on site</li>
                <li><strong>Cookies:</strong> To enhance user experience (see Cookie Policy below)</li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4">We use your information to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide and manage transportation services</li>
                <li>Process bookings and payments</li>
                <li>Communicate about appointments and service updates</li>
                <li>Improve our services and customer experience</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Send service-related notifications (not marketing unless you opt-in)</li>
                <li>Ensure safety and security of passengers and drivers</li>
                <li>Respond to customer service requests</li>
              </ul>
            </section>

            {/* HIPAA Compliance */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">3. HIPAA Compliance</h2>
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  As a medical transportation provider, <strong>we comply with the Health Insurance 
                  Portability and Accountability Act (HIPAA)</strong> to protect your Protected Health 
                  Information (PHI). We implement appropriate administrative, physical, and technical 
                  safeguards to protect the confidentiality, integrity, and availability of your health 
                  information.
                </p>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Information Sharing & Disclosure</h2>
              <p className="text-gray-700 mb-4">We may share your information with:</p>
              
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-800">Service Providers</h4>
                  <p className="text-gray-700">Third-party vendors who assist with payment processing, 
                  scheduling, and communications (all under strict confidentiality agreements)</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-800">Healthcare Facilities</h4>
                  <p className="text-gray-700">Medical facilities where you're being transported to/from, 
                  as necessary for service coordination</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-gray-800">Legal Requirements</h4>
                  <p className="text-gray-700">When required by law, court order, or legal process</p>
                </div>
              </div>

              <p className="text-gray-700 mt-4 font-semibold">
                ⚠️ We do NOT sell your personal information to third parties for marketing purposes.
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>🔒 SSL/TLS encryption for data transmission</li>
                <li>🔐 Secure password hashing (bcrypt)</li>
                <li>🛡️ Regular security audits and updates</li>
                <li>👥 Limited employee access on need-to-know basis</li>
                <li>📱 Secure authentication and session management</li>
                <li>🔄 Regular data backups</li>
                <li>🚨 Intrusion detection systems</li>
              </ul>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Your Privacy Rights (CCPA)</h2>
              <p className="text-gray-700 mb-4">
                Under the California Consumer Privacy Act (CCPA), California residents have the right to:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">✓ Right to Know</h4>
                  <p className="text-sm text-gray-700">Request information about data we collect about you</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">✓ Right to Delete</h4>
                  <p className="text-sm text-gray-700">Request deletion of your personal information</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">✓ Right to Opt-Out</h4>
                  <p className="text-sm text-gray-700">Opt-out of sale of personal information</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-2">✓ Right to Non-Discrimination</h4>
                  <p className="text-sm text-gray-700">Equal service regardless of privacy rights exercise</p>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Cookies & Tracking</h2>
              <p className="text-gray-700 mb-4">We use cookies and similar technologies to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Remember your preferences and settings</li>
                <li>Maintain your login session</li>
                <li>Analyze website traffic and usage patterns</li>
                <li>Improve user experience</li>
              </ul>
              <p className="text-gray-700 mt-4">
                You can control cookies through your browser settings. However, disabling cookies 
                may affect website functionality.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
              <p className="text-gray-700">
                We retain your information for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
                <li>Provide services to you</li>
                <li>Comply with legal obligations (typically 7 years for medical records)</li>
                <li>Resolve disputes and enforce agreements</li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700">
                Our services are not directed to children under 13. We do not knowingly collect 
                information from children. Transportation for minors must be arranged by a parent 
                or legal guardian.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy periodically. We will notify you of significant 
                changes by posting the new policy on this page with an updated "Last Updated" date. 
                Continued use of our services after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                For privacy-related questions, concerns, or to exercise your rights, contact us:
              </p>
              <div className="space-y-2 text-gray-800">
                <p><strong>Email:</strong> <a href="mailto:edenmedtrans@gmail.com" className="text-blue-600 hover:text-blue-700 font-semibold">edenmedtrans@gmail.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+15109578383" className="text-blue-600 hover:text-blue-700 font-semibold">(510) 957-8383</a></p>
                <p><strong>Address:</strong> Eden Medical Transport, Oakland, California</p>
                <p><strong>Response Time:</strong> We respond to privacy requests within 30 days</p>
              </div>
            </section>

            {/* Footer Note */}
            <div className="bg-gray-100 rounded-lg p-6 text-center">
              <p className="text-sm text-gray-600">
                This Privacy Policy is effective as of the date listed above and applies to 
                Eden Medical Transport services in California.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Have Questions About Privacy?</h2>
          <p className="text-xl mb-6">We're here to help clarify any concerns</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+15109578383" className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition">
              📞 Call Us
            </a>
            <a href="/contact" className="bg-white/20 backdrop-blur-sm border-2 border-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition">
              📧 Send Message
            </a>
          </div>
        </div>
      </section>
    </>
  );
}