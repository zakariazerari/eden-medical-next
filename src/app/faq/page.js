// app/faq/page.js
import { metadata } from './metadata'
export { metadata }

export default function FAQPage() {
  const faqData = [
    {
      category: "Services & Transportation",
      icon: "🚐",
      questions: [
        {
          q: "What is non-emergency medical transportation (NEMT)?",
          a: "Non-emergency medical transportation (NEMT) provides safe, reliable transportation for patients who need to attend medical appointments but don't require emergency ambulance services. This includes wheelchair transport, stretcher service, and transportation to dialysis, physical therapy, chemotherapy, and doctor appointments throughout California."
        },
        {
          q: "What types of vehicles do you have?",
          a: "We have a modern fleet including wheelchair-accessible vans with hydraulic lifts, stretcher vans for bed-bound patients, and comfortable sedans. All vehicles are ADA-compliant, climate-controlled, clean, and maintained to the highest safety standards with regular inspections."
        },
        {
          q: "Are your drivers certified and trained?",
          a: "Yes, all our drivers are certified EMRs (Emergency Medical Responders) with extensive training in patient care, wheelchair securement, CPR, first aid, and safe medical transportation. They undergo background checks and regular safety training to ensure the highest quality of care."
        },
        {
          q: "Can I choose my driver or request a specific vehicle?",
          a: "While we can't guarantee a specific driver, we do our best to accommodate special requests. If you have accessibility needs or preferences, let us know when booking and we'll match you with the most suitable driver and vehicle for your requirements."
        }
      ]
    },
    {
      category: "Booking & Scheduling",
      icon: "📅",
      questions: [
        {
          q: "How do I book a medical transportation ride?",
          a: "You can book in three easy ways: (1) Call our 24/7 hotline at (510) 957-8383, (2) Use our online booking form on the website, or (3) Email us at info@edenmedical.com. We recommend booking 24-48 hours in advance for scheduled appointments, but we also accommodate same-day urgent requests based on availability."
        },
        {
          q: "Do you provide 24/7 service?",
          a: "Yes! Eden Medical Transport is available 24 hours a day, 7 days a week, 365 days a year including all holidays. Whether you need early morning dialysis transport or late-night emergency discharge, we're here to help."
        },
        {
          q: "Can I schedule recurring appointments?",
          a: "Absolutely! We specialize in recurring medical appointments like dialysis (3-4 times per week), chemotherapy, physical therapy, and regular doctor visits. We can set up a standing schedule to ensure you never miss an appointment. Contact us to arrange your recurring transportation plan."
        },
        {
          q: "What if I need to cancel or reschedule?",
          a: "Please call us as soon as possible if you need to cancel or reschedule. We understand medical situations change, and we're flexible. For the best service, try to give us at least 2 hours notice for cancellations when possible."
        },
        {
          q: "How early will the driver arrive?",
          a: "Our drivers typically arrive 5-10 minutes before your scheduled pickup time. For time-sensitive appointments like dialysis, we build in extra buffer time to ensure punctual arrival. You'll receive a call or text when your driver is en route."
        }
      ]
    },
    {
      category: "Insurance & Payment",
      icon: "💳",
      questions: [
        {
          q: "Do you accept insurance for medical transportation?",
          a: "Yes, we accept various insurance plans including Medi-Cal, Medicare (for eligible trips), and most private insurance providers. We'll verify your coverage when you book. Contact us at (510) 957-8383 with your insurance information to confirm eligibility before your trip."
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept cash, all major credit cards (Visa, MasterCard, American Express, Discover), Zelle, and insurance. Payment can be made before service or immediately after your trip. We provide detailed receipts for insurance reimbursement if needed."
        },
        {
          q: "How much does medical transportation cost in California?",
          a: "Costs vary based on distance, service type (wheelchair, stretcher, or sedan), wait time, and insurance coverage. Many trips are fully or partially covered by Medi-Cal or Medicare. For a free, no-obligation quote specific to your transportation needs, call us at (510) 957-8383 or use our online form."
        },
        {
          q: "Is there a waiting time fee?",
          a: "We include up to 15 minutes of wait time at your destination (for appointments) at no extra charge. If you need us to wait longer, there's a small hourly fee. Let us know in advance if you expect a longer appointment and we'll accommodate you."
        },
        {
          q: "Do you offer discounts for frequent riders?",
          a: "Yes! We offer special rates for recurring appointments and frequent riders. If you need transportation 2+ times per week (like dialysis patients), ask about our loyalty program discounts when booking."
        }
      ]
    },
    {
      category: "Service Areas & Coverage",
      icon: "📍",
      questions: [
        {
          q: "What areas do you serve in California?",
          a: "We proudly serve all 58 California counties! We have dedicated phone lines for major areas: Alameda County (510-957-8383), San Francisco (415-994-1442), Contra Costa (925-465-0366), Santa Clara (408-579-9775), and San Mateo (650-474-5777). Call the number for your county or our main line for service anywhere in California."
        },
        {
          q: "Do you provide long-distance medical transportation?",
          a: "Yes, we provide medical transportation throughout California, including long-distance trips between counties and cities. Whether you need transport from San Francisco to Los Angeles or Oakland to San Diego, we can accommodate inter-city and inter-county medical transportation."
        },
        {
          q: "Can you transport me out of state?",
          a: "While we primarily serve California, we can arrange special out-of-state medical transportation for certain situations. Contact us to discuss your specific needs and we'll do our best to help or refer you to trusted partners."
        }
      ]
    },
    {
      category: "Safety & Requirements",
      icon: "🛡️",
      questions: [
        {
          q: "What COVID-19 and health safety measures do you have?",
          a: "Patient and driver safety is our top priority. All vehicles are thoroughly sanitized between every trip with hospital-grade disinfectants. Drivers wear masks and gloves when requested. Hand sanitizer is provided in every vehicle. Vehicles are well-ventilated with HEPA air filters. We follow all CDC and California health department guidelines."
        },
        {
          q: "Can a family member or caregiver ride with me?",
          a: "Yes! We allow one companion to accompany patients at no extra charge, space permitting. This is especially helpful for elderly patients, those with cognitive issues, or anyone who wants support during medical appointments. Additional companions may be accommodated based on vehicle capacity."
        },
        {
          q: "Are you licensed, insured, and certified?",
          a: "Absolutely. Eden Medical Transport is fully licensed by the California DMV for medical transportation, commercially insured with comprehensive liability coverage, bonded, and ADA compliant. We maintain all required certifications and undergo regular inspections to ensure we meet or exceed state safety standards."
        },
        {
          q: "What if I need oxygen during transport?",
          a: "We can safely transport patients who require oxygen. Our vehicles are equipped to secure oxygen tanks, and our drivers are trained in oxygen safety protocols. Please inform us when booking if you'll be traveling with oxygen so we can prepare appropriately."
        },
        {
          q: "Do you transport patients with infectious diseases?",
          a: "We follow strict infection control protocols and can transport patients with certain infectious conditions when appropriate safety measures are in place. Please inform us of any infectious conditions when booking so we can prepare with proper PPE and ensure the safety of all parties."
        }
      ]
    },
    {
      category: "Special Situations",
      icon: "⭐",
      questions: [
        {
          q: "Can you help patients get from the vehicle to the appointment?",
          a: "Yes! Our drivers provide door-through-door service. They will assist patients from their home to the vehicle, and from the vehicle to the medical facility entrance. If you need additional assistance inside the facility, please arrange for facility staff to meet you at the entrance."
        },
        {
          q: "What if I'm being discharged from the hospital?",
          a: "We specialize in hospital discharge transportation. Once you know your discharge time, call us and we'll coordinate with hospital staff to ensure timely pickup. Our drivers will assist you from the hospital to your home or care facility safely and comfortably."
        },
        {
          q: "Do you transport bariatric patients?",
          a: "Yes, we have bariatric-equipped vehicles and specialized equipment to safely transport patients up to 850 lbs. Our drivers are trained in bariatric patient care and dignity-focused service. Please inform us of weight requirements when booking so we can dispatch the appropriate vehicle."
        },
        {
          q: "Can you transport children or minors?",
          a: "Yes, we transport pediatric patients with an accompanying adult (parent or guardian required). We have car seats available for younger children if needed. Our drivers are experienced in working with children and creating a calm, comfortable environment."
        }
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
            Everything you need to know about our medical transportation services
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+15109578383" className="bg-white text-blue-700 px-8 py-3 rounded-xl font-bold hover:scale-105 transition shadow-xl">
              📞 Call (510) 957-8383
            </a>
            <a href="/contact" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition">
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
            Our friendly team is available 24/7 to help you with any questions about medical transportation
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
            <a href="/services/wheelchair-transport" className="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition text-center">
              <div className="text-4xl mb-3">♿</div>
              <h4 className="font-bold text-lg mb-2">Wheelchair Transport</h4>
              <p className="text-gray-600 text-sm">ADA accessible vans</p>
            </a>
            <a href="/services/stretcher-transport" className="bg-purple-50 p-6 rounded-xl hover:shadow-lg transition text-center">
              <div className="text-4xl mb-3">🏥</div>
              <h4 className="font-bold text-lg mb-2">Stretcher Service</h4>
              <p className="text-gray-600 text-sm">For bed-bound patients</p>
            </a>
            <a href="/services/dialysis-transport" className="bg-red-50 p-6 rounded-xl hover:shadow-lg transition text-center">
              <div className="text-4xl mb-3">💉</div>
              <h4 className="font-bold text-lg mb-2">Dialysis Transport</h4>
              <p className="text-gray-600 text-sm">Recurring appointments</p>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}