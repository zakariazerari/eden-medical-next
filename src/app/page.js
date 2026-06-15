"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  FaExclamationTriangle,
  FaAmbulance,
  FaClock,
  FaStar,
  FaQuoteLeft,
  FaPhone,
} from "react-icons/fa";


export default function HomePage() {
  const [formData, setFormData] = useState({
    serviceType: "Non-Emergency",
    mobility: "Wheelchair",
    date: "",
    time: "",
    appointmentTime: "",
    returnTime: "",
    pickup: "",
    destination: "",
    patientName: "",
    phone: "",
    email: "",
    paymentMethod: "",
    specialNotes: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Eden Medical Transport",
    description: "Professional non-emergency medical transportation in East Bay",
    url: "https://edenmedical.com",
    telephone: "+1-510-957-8383",
    address: {
      "@type": "PostalAddress",
      addressLocality: "East Bay",
      addressCountry: "US",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed: {
      "@type": "State",
      name: "California",
    },
    priceRange: "$$",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const newErr = { ...errors };
      delete newErr[name];
      setErrors(newErr);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.time) newErrors.time = "Pick-up time is required.";
    if (!formData.appointmentTime) newErrors.appointmentTime = "Appointment time is required.";
    if (!formData.pickup.trim()) newErrors.pickup = "Pick-up address is required.";
    if (!formData.destination.trim()) newErrors.destination = "Destination address is required.";
    if (!formData.patientName.trim()) newErrors.patientName = "Patient name is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.paymentMethod.trim()) newErrors.paymentMethod = "Please select a payment method.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("❗ Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("✅ Booking submitted successfully!");
        setFormData({
          serviceType: "Non-Emergency",
          mobility: "Wheelchair",
          date: "",
          time: "",
          appointmentTime: "",
          returnTime: "",
          pickup: "",
          destination: "",
          patientName: "",
          phone: "",
          email: "",
          paymentMethod: "",
          specialNotes: "",
        });
        setErrors({});
      } else {
        toast.error("❌ Error: " + (data.message || "Something went wrong"));
      }
    } catch (err) {
      toast.error("⚠ Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat flex items-center justify-center min-h-[620px] sm:min-h-[720px]" style={{ backgroundImage: "url('/image3.jpg')" }}>
        <div className="absolute inset-0 bg-gray-900/80"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8 text-sm font-medium tracking-wide">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Available 24/7 · Licensed & Insured in the Bay Area
          </div>
          <h1 className="text-2xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Bay Area&apos;s Most Trusted{" "}
            <span className="text-red-400">Non-Emergency Transportation</span>
          </h1>
          <p className="text-lg sm:text-xl mb-10 text-white/85 max-w-2xl mx-auto leading-relaxed">
            Safe, comfortable, and reliable wheelchair transport, stair assistance, ambulatory transport and gurney transportation. Serving the Bay Area and surrounding area.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#book" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all text-base">
              Book Your Ride Now
            </a>
            <a href="tel:+15109578383" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-all text-base">
              Call (510) 957-8383
            </a>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 sm:py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 text-center">
            {[
              { value: "5,000+", label: "Safe Rides", color: "text-red-600" },
              { value: "2,500+", label: "Happy Patients", color: "text-blue-600" },
              { value: "10+", label: "Years of Excellence", color: "text-gray-800" },
            ].map((stat, i) => (
              <div key={i} className="p-4 sm:p-6 transform hover:scale-105 transition-transform">
                <div className={`text-3xl sm:text-5xl font-extrabold ${stat.color} mb-1 sm:mb-2`}>{stat.value}</div>
                <p className="text-gray-600 text-xs sm:text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50/30 to-red-50/20" id="book">
        <div className="relative z-10 bg-white border border-gray-200 shadow-2xl rounded-3xl w-full max-w-4xl p-4 md:p-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-center text-gray-900 mb-4 md:mb-10">Book Your Medical Ride</h2>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="text-sm font-semibold block mb-2 text-gray-700">Service Type</label>
                <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option>Non-Emergency</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2 text-gray-700">Mobility Need</label>
                <select name="mobility" value={formData.mobility} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option>Wheelchair</option>
                  <option>Stretcher</option>
                  <option>Sedan</option>
                  <option>Stair Assistance</option>
                </select>
              </div>
            </div>

            {/* DATE & 3 TIMES */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 md:p-6 rounded-xl border-2 border-blue-200">
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <FaClock className="text-blue-600" />
                Schedule Details
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs md:text-sm font-semibold block mb-1 text-gray-700">Transport Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full p-2 md:p-3 text-sm border ${errors.date ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.date && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><FaExclamationTriangle className="text-[10px]" />{errors.date}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                  <div>
                    <label className="text-xs md:text-sm font-semibold block mb-1 text-gray-700">Pick-Up Time *</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={`w-full p-2 md:p-3 text-sm border ${errors.time ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    {errors.time && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><FaExclamationTriangle className="text-[10px]" />{errors.time}</p>}
                  </div>

                  <div>
                    <label className="text-xs md:text-sm font-semibold block mb-1 text-gray-700">Appointment Time *</label>
                    <input
                      type="time"
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      className={`w-full p-2 md:p-3 text-sm border ${errors.appointmentTime ? "border-red-500" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    {errors.appointmentTime && <p className="text-red-600 text-xs mt-1 flex items-center gap-1"><FaExclamationTriangle className="text-[10px]" />{errors.appointmentTime}</p>}
                  </div>

                  <div>
                    <label className="text-xs md:text-sm font-semibold block mb-1 text-gray-700">Return Time <span className="text-green-600">(Optional)</span></label>
                    <input
                      type="time"
                      name="returnTime"
                      value={formData.returnTime}
                      onChange={handleChange}
                      className="w-full p-2 md:p-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold block mb-2 text-gray-700">Pick-Up Address</label>
              <input type="text" name="pickup" placeholder="123 Main St, City, CA" value={formData.pickup} onChange={handleChange} className={`w-full p-3 border ${errors.pickup ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent`} />
              {errors.pickup && <p className="text-red-600 text-sm mt-1 flex items-center gap-2"><FaExclamationTriangle />{errors.pickup}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold block mb-2 text-gray-700">Destination Address</label>
              <input type="text" name="destination" placeholder="456 Hospital Rd, City, CA" value={formData.destination} onChange={handleChange} className={`w-full p-3 border ${errors.destination ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent`} />
              {errors.destination && <p className="text-red-600 text-sm mt-1 flex items-center gap-2"><FaExclamationTriangle />{errors.destination}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="text-sm font-semibold block mb-2 text-gray-700">Patient's Name</label>
                <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} className={`w-full p-3 border ${errors.patientName ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent`} />
                {errors.patientName && <p className="text-red-600 text-sm mt-1 flex items-center gap-2"><FaExclamationTriangle />{errors.patientName}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2 text-gray-700">Phone Number</label>
                <input type="tel" name="phone" placeholder="(555) 123-4567" value={formData.phone} onChange={handleChange} className={`w-full p-3 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent`} />
                {errors.phone && <p className="text-red-600 text-sm mt-1 flex items-center gap-2"><FaExclamationTriangle />{errors.phone}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="text-sm font-semibold block mb-2 text-gray-700">Email Address</label>
                <input type="email" name="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent`} />
                {errors.email && <p className="text-red-600 text-sm mt-1 flex items-center gap-2"><FaExclamationTriangle />{errors.email}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2 text-gray-700">Payment Method</label>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className={`w-full p-3 border ${errors.paymentMethod ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent`}>
                  <option value="">Select payment method</option>
                  <option>Cash</option>
                  <option>Credit Card</option>
                  <option>Zelle</option>
                </select>
                {errors.paymentMethod && <p className="text-red-600 text-sm mt-1 flex items-center gap-2"><FaExclamationTriangle />{errors.paymentMethod}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold block mb-2 text-gray-700">Special Requirements</label>
              <textarea rows="3" name="specialNotes" value={formData.specialNotes} onChange={handleChange} placeholder="Oxygen required, wheelchair dimensions, etc..." className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent" />
            </div>

            <button type="submit" className={`w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl text-lg font-bold shadow-lg ${submitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-2xl hover:scale-[1.02]"} transition-all`} disabled={submitting}>
              {submitting ? "Processing..." : "Book My Ride →"}
            </button>
          </form>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-4">Why Choose Eden Medical Transport?</h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">Trusted by thousands of patients and healthcare facilities across East Bay</p>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all">
              <FaAmbulance className="text-6xl text-red-600 mb-4 mx-auto" />
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Professional Fleet</h4>
              <p className="text-gray-600">Modern, wheelchair-accessible vehicles equipped with latest safety features and comfort amenities</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all">
              <FaClock className="text-6xl text-blue-600 mb-4 mx-auto" />
              <h4 className="text-2xl font-bold text-gray-900 mb-3">On-Time Guarantee</h4>
              <p className="text-gray-600">We understand medical appointments are critical. 98% on-time arrival rate across all bookings</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all">
              <FaStar className="text-6xl text-yellow-500 mb-4 mx-auto" />
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Certified Staff</h4>
              <p className="text-gray-600">All drivers are certified EMRs with extensive training in patient care and medical transport</p>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-16">What Our Patients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Maria S.", text: "Professional, caring, and always on time. Eden Transport made my dialysis appointments so much easier.", rating: 5 },
              { name: "John D.", text: "The drivers are knowledgeable and compassionate. I feel safe every time I ride with Eden.", rating: 5 },
              { name: "Sarah L.", text: "Reliable service at fair prices. They helped my mother get to her chemotherapy sessions with dignity.", rating: 5 }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-red-50 to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <FaQuoteLeft className="text-3xl text-red-400 mb-4" />
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <FaStar key={j} className="text-yellow-500" />
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gray-200"></div>
      </div>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-3">Frequently Asked Questions</h2>
          <p className="text-center text-gray-500 mb-12">Everything you need to know about our services</p>
          <div className="space-y-3">
            {[
              { q: "What counties do you serve?", a: "We serve all of East Bay including Alameda County, Contra Costa County, and surrounding areas. Whether it's wheelchair transport, stair assistance or gurney transportation, we're here to help." },
              { q: "Can I book same-day rides?", a: "Yes! We offer same-day service based on availability. Call us for urgent bookings." },
              { q: "Are your vehicles wheelchair accessible?", a: "All our vehicles are fully wheelchair and stretcher accessible with trained staff." }
            ].map((faq, i) => (
              <details key={i} className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <summary className="flex items-center justify-between px-6 py-5 font-semibold text-gray-900 cursor-pointer list-none">
                  <span>{faq.q}</span>
                  <span className="ml-4 w-6 h-6 flex items-center justify-center rounded-full bg-red-50 text-red-600 font-bold text-lg flex-shrink-0 group-open:bg-red-600 group-open:text-white transition-colors">+</span>
                </summary>
                <p className="px-6 pb-5 text-gray-600 border-t border-gray-100 pt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-600 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Ready to Book Your Ride?</h2>
          <p className="text-lg text-red-100 mb-10">Available 24/7 across the Bay Area and surrounding area</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#book" className="bg-white text-red-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all shadow-xl">
              Book Now - It&apos;s Easy!
            </a>
            <a href="tel:+15109578383" className="bg-red-700 border border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-red-800 hover:scale-105 transition-all">
              Call (510) 957-8383
            </a>
          </div>
        </div>
      </section>

      {/* Floating Call Button - Mobile */}
      <a
        href="tel:+15109578383"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-5 py-3 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 lg:hidden"
        aria-label="Call Eden Medical Transport"
      >
        <FaPhone className="text-lg animate-pulse" />
        <span className="font-bold text-sm">Call Now</span>
      </a>
    </main>
  );
}