// app/faq/page.js
import { metadata } from './metadata'
export { metadata }

export default function FAQPage() {
  const faqData = [
    {
      category: "Services & Transportation",
      icon: "🚗",
      questions: [
        {
          q: "What types of transportation services do you provide?",
          a: "Eden Transport Services provides comfortable, reliable transportation for all your needs including airport transfers, daily commutes, school transport, shopping trips, special events, recurring appointments, and group transportation. We serve individuals, families, and businesses throughout the Bay Area whether it is wheelchair transport, stairs assistance, ambulatory or  stretcher transportation.  With professional drivers and modern vehicles."
        },
        {
          q: "What types of vehicles do you have?",
          a: "We have a modern fleet including comfortable sedans, spacious wheelchair and gurney vans , All vehicles are well-maintained, climate-controlled, clean, and regularly inspected to ensure the highest safety and comfort standards."
        },
        {
          q: "Are your drivers professional and trained?",
          a: "Yes! All our drivers are professionally trained, licensed, background-checked, and experienced in customer service. they know the roads well and are committed to providing safe, punctual, and courteous transportation service."
        },
        {
          q: "Can I choose my driver or request a specific vehicle?",
          a: "While we can't guarantee a specific driver, we do our best to accommodate special requests. If you have preferences or specific needs, let us know when booking and we'll match you with the most suitable driver and vehicle."
        }
      ]
    },
    {
      category: "Booking & Scheduling",
      icon: "📅",
      questions: [
        {
          q: "How do I book a ride?",
          a: "You can book in three easy ways: (1) Call our 24/7 hotline at (510) 957-8383, (2) Use our online booking form on the website, or (3) Email us at info@edentransport.com. We recommend booking in advance for scheduled trips, but we also accommodate same-day requests based on availability."
        },
        {
          q: "Do you provide 24/7 service?",
          a: "Yes! Eden Transport Services is available 24 hours a day, 7 days a week, 365 days a year including all holidays. Whether you need early morning airport transport or late-night rides, we're here to help."
        },
        {
          q: "Can I schedule recurring rides?",
          a: "Absolutely! We specialize in recurring transportation like daily work commutes, school transport, weekly shopping trips, and regular appointments. We can set up a standing schedule with discounted rates. Contact us to arrange your recurring transportation plan."
        },
        {
          q: "What if I need to cancel or reschedule?",
          a: "Please call us as soon as possible if you need to cancel or reschedule."
        },
      ]
    },
    {
      category: "Pricing & Payment",
      icon: "💳",
      questions: [
        {
          q: "How much does transportation cost?",
          a: "Costs vary based on distance, service type, wait time, and whether it's a one-time or recurring ride. We offer competitive rates and discounts for recurring customers. For a free, no-obligation quote specific to your transportation needs, call us at (510) 957-8383 or use our online form."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept cash, all major credit cards (Visa, MasterCard, American Express, Discover), digital payments (Venmo, Zelle, Cash App), and online payments. Payment can be made before service or immediately after your trip. We provide detailed receipts upon request."
        },
        
      ]
    },
    {
      category: "Service Areas & Coverage",
      icon: "📍",
      questions: [
        {
          q: "What areas do you serve in The Bay Area ? ",
          a: "We provide service in Alameda County, San Francisco, Contra Costa, Santa Clara, San Mateo, Marin, Solano counties and throughout the Bay Area. Call (510) 957-8383 for wheelchair, stairs assistance, ambulatory and stretcher transportation."
        },
      
        {
          q: "Can you transport to airports?",
          a: "Absolutely! Airport transportation is one of our specialties. We serve all major cities including SFO, OAK, SJC, and more. We track your flight and adjust pickup times if there are delays. Professional, reliable airport service every time."
        },
        {
          q: "Do you provide out-of-state transportation?",
          a: "While we primarily serve the Bay Area and surrounding cities, we can arrange special out-of-state transportation for certain situations. Contact us to discuss your specific needs and we'll do our best to help or refer you to trusted partners."
        }
      ]
    },
    {
      category: "Safety & Requirements",
      icon: "🛡️",
      questions: [
        {
          q: "What safety measures do you have?",
          a: "Passenger and driver safety is our top priority. All vehicles are thoroughly cleaned between trips. Drivers follow safe driving practices and California traffic laws. Vehicles are well-maintained with regular inspections. We have comprehensive insurance coverage for your peace of mind."
        },
        {
          q: "Are you licensed, insured, and certified?",
          a: "Absolutely. Eden Transport Services is fully licensed with , commercially insured comprehensive liability coverage, bonded, and compliant with all California regulations. We maintain all required certifications and undergo regular inspections."
        },
        {
          q: "What if I need to make multiple stops?",
          a: "We can accommodate multiple stops! Just let us know your itinerary when booking. There may be a small fee for additional stops depending on distance and wait time, but we're happy to customize your route to meet your needs."
        }
      ]
    },
    {
      category: "Special Situations",
      icon: "⭐",
      questions: [
        {
          q: "Do you help passengers with getting in/out of the vehicle?",
          a: "Yes! Our drivers provide door-to-door service and will assist passengers as needed. We're here to make your journey comfortable and stress-free from start to finish."
        },
        {
          q: "Do you provide transportation for events and parties?",
          a: "Absolutely! We specialize in event transportation including weddings, concerts, sporting events, corporate events, birthdays, and nights out. We can provide single vehicles or coordinate multiple vehicles for larger groups. Contact us for event transportation planning."
        },
        {
          q: "Can you accommodate special requests?",
          a: "We do our best to accommodate special requests! Whether you need a specific route, music preferences, temperature settings, or other accommodations, just let us know when booking. Customer satisfaction is our priority."
        },
      ]
    }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Everything you need to know about our transportation services
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+15109578383" className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold hover:scale-105 transition shadow-xl">
              📞 Call (510) 957-8383
            </a>
            <a href="/" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition">
              Book Online
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          {faqData.map((category, idx) => (
            <div key={idx} className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-4xl">{category.icon}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {category.category}
                </h2>
              </div>
              
              <div className="space-y-6">
                {category.questions.map((item, qIdx) => (
                  <div key={qIdx} className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-700 mb-4 flex items-start gap-3">
                      <span className="text-2xl mt-1">❓</span>
                      {item.q}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed pl-11">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl mb-8">
            Our friendly team is available 24/7 to help you with any questions about transportation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+15109578383" className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition shadow-xl">
              📞 Call Now: (510) 957-8383
            </a>
            <a href="/contact" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition">
              Send Message
            </a>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-center mb-8">Explore Our Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <a href="/services/premium-rides" className="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition text-center">
              <div className="text-4xl mb-3">⭐</div>
              <h4 className="font-bold text-lg mb-2">Premium Rides</h4>
              <p className="text-gray-600 text-sm">Comfortable transportation</p>
            </a>
            <a href="/services/recurring-rides" className="bg-purple-50 p-6 rounded-xl hover:shadow-lg transition text-center">
              <div className="text-4xl mb-3">📅</div>
              <h4 className="font-bold text-lg mb-2">Recurring Rides</h4>
              <p className="text-gray-600 text-sm">Daily & weekly schedules</p>
            </a>
            <a href="/services/group-transport" className="bg-red-50 p-6 rounded-xl hover:shadow-lg transition text-center">
              <div className="text-4xl mb-3">👥</div>
              <h4 className="font-bold text-lg mb-2">Group Transport</h4>
              <p className="text-gray-600 text-sm">Families </p>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}