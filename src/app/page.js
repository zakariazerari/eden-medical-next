// app/page.js

"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaExclamationTriangle, FaAmbulance, FaClock, FaStar, FaQuoteLeft } from "react-icons/fa";
import ParticlesBg from "./components/ParticlesBg";
import Link from "next/link";

export default function HomePage() {
  const [formData, setFormData] = useState({
    serviceType: "Non-Emergency",
    mobility: "Wheelchair",
    date: "",
    time: "",
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
  const [stats, setStats] = useState({ rides: 0, customers: 0, years: 0 });

  // Animated counter for stats
  useEffect(() => {
    const animateCounter = (target, key, duration = 2000) => {
      const start = 0;
      const increment = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setStats(prev => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setStats(prev => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, 16);
    };

    animateCounter(5000, "rides");
    animateCounter(2500, "customers");
    animateCounter(10, "years");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[name];
        return newErr;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.time) newErrors.time = "Time is required.";
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
    <main className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat px-6 py-32 flex items-center justify-center min-h-[700px]" style={{ backgroundImage: "url('/image3.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 to-violet-900/50"></div>
        <div className="relative z-10 max-w-5xl text-center text-white animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-2xl leading-tight">
            California's Most Trusted <span className="text-violet-300">Medical Transport</span>
          </h1>
          <p className="text-lg md:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
            Safe, comfortable, and reliable non-emergency medical transportation across all California counties
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#book" className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all">
              Book Your Ride Now
            </a>
            <Link href="/about" className="bg-white text-violet-700 px-8 py-4 rounded-xl font-bold hover:bg-violet-50 hover:scale-105 transition-all">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6 transform hover:scale-105 transition-transform">
              <div className="text-5xl font-extrabold text-violet-700 mb-2">{stats.rides.toLocaleString()}+</div>
              <p className="text-gray-600 text-lg">Safe Rides Completed</p>
            </div>
            <div className="p-6 transform hover:scale-105 transition-transform">
              <div className="text-5xl font-extrabold text-indigo-700 mb-2">{stats.customers.toLocaleString()}+</div>
              <p className="text-gray-600 text-lg">Happy Customers</p>
            </div>
            <div className="p-6 transform hover:scale-105 transition-transform">
              <div className="text-5xl font-extrabold text-blue-700 mb-2">{stats.years}+</div>
              <p className="text-gray-600 text-lg">Years of Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-16 overflow-hidden" id="book">
        <div className="absolute inset-0 z-0">
          <ParticlesBg />
        </div>
        <div className="relative z-10 backdrop-blur-md bg-white/90 border border-white/30 shadow-2xl rounded-3xl w-full max-w-4xl p-10">
          <h2 className="text-4xl font-extrabold text-center text-violet-800 mb-10">Book Your Medical Ride</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold block mb-2">Service Type</label>
                <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-violet-500">
                  <option>Non-Emergency</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2">Mobility Need</label>
                <select name="mobility" value={formData.mobility} onChange={handleChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-violet-500">
                  <option>Wheelchair</option>
                  <option>Stretcher</option>
                  <option>Sedan</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold block mb-2">Transport Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className={`w-full p-3 border ${errors.date ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-violet-500`} />
                {errors.date && <p className="text-red-500 text-sm mt-1 flex items-center gap-2"><FaExclamationTriangle />{errors.date}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2">Pick-Up Time</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} className={`w-full p-3 border ${errors.time ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-violet-500`} />
                {errors.time && <p className="text-red-500 text-sm mt-1 flex items-center gap-2"><FaExclamationTriangle />{errors.time}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold block mb-2">Pick-Up Address</label>
              <input type="text" name="pickup" placeholder="123 Main St, City, CA" value={formData.pickup} onChange={handleChange} className={`w-full p-3 border ${errors.pickup ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-violet-500`} />
              {errors.pickup && <p className="text-red-500 text-sm mt-1 flex items-center gap-2"><FaExclamationTriangle />{errors.pickup}</p>}
            </div>

            <div>
              <label className="text-sm font-semibold block mb-2">Destination Address</label>
              <input type="text" name="destination" placeholder="456 Hospital Rd, City, CA" value={formData.destination} onChange={handleChange} className={`w-full p-3 border ${errors.destination ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-violet-500`} />
              {errors.destination && <p className="text-red-500 text-sm mt-1 flex items-center gap-2"><FaExclamationTriangle />{errors.destination}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold block mb-2">Patient's Name</label>
                <input type="text" name="patientName" value={formData.patientName} onChange={handleChange} className={`w-full p-3 border ${errors.patientName ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-violet-500`} />
                {errors.patientName && <p className="text-red-500 text-sm mt-1 flex items-center gap-2"><FaExclamationTriangle />{errors.patientName}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2">Phone Number</label>
                <input type="tel" name="phone" placeholder="(555) 123-4567" value={formData.phone} onChange={handleChange} className={`w-full p-3 border ${errors.phone ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-violet-500`} />
                {errors.phone && <p className="text-red-500 text-sm mt-1 flex items-center gap-2"><FaExclamationTriangle />{errors.phone}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold block mb-2">Email Address</label>
                <input type="email" name="email" placeholder="email@example.com" value={formData.email} onChange={handleChange} className={`w-full p-3 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-violet-500`} />
                {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center gap-2"><FaExclamationTriangle />{errors.email}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2">Payment Method</label>
                <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} className={`w-full p-3 border ${errors.paymentMethod ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-violet-500`}>
                  <option value="">Select payment method</option>
                  <option>Cash</option>
                  <option>Credit Card</option>
                  <option>Zelle</option>
                  <option>Insurance</option>
                </select>
                {errors.paymentMethod && <p className="text-red-500 text-sm mt-1 flex items-center gap-2"><FaExclamationTriangle />{errors.paymentMethod}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold block mb-2">Special Requirements</label>
              <textarea rows="3" name="specialNotes" value={formData.specialNotes} onChange={handleChange} placeholder="Oxygen required, wheelchair dimensions, etc..." className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-violet-500" />
            </div>

            <button type="submit" className={`w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-4 rounded-xl text-lg font-bold shadow-lg ${submitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-2xl hover:scale-[1.02]"} transition-all`} disabled={submitting}>
              {submitting ? "Processing..." : "Book My Ride →"}
            </button>
          </form>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-gradient-to-br from-violet-50 to-indigo-50 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-extrabold text-violet-800 mb-4">Why Choose Eden Medical Transport?</h2>
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">Trusted by thousands of patients and healthcare facilities across California</p>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all">
              <FaAmbulance className="text-6xl text-violet-600 mb-4 mx-auto" />
              <h4 className="text-2xl font-bold text-violet-800 mb-3">Professional Fleet</h4>
              <p className="text-gray-600">Modern, wheelchair-accessible vehicles equipped with latest safety features and comfort amenities</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all">
              <FaClock className="text-6xl text-indigo-600 mb-4 mx-auto" />
              <h4 className="text-2xl font-bold text-violet-800 mb-3">On-Time Guarantee</h4>
              <p className="text-gray-600">We understand medical appointments are critical. 98% on-time arrival rate across all bookings</p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all">
              <FaStar className="text-6xl text-yellow-500 mb-4 mx-auto" />
              <h4 className="text-2xl font-bold text-violet-800 mb-3">Certified Staff</h4>
              <p className="text-gray-600">All drivers are certified EMRs with extensive training in patient care and medical transport</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center text-violet-800 mb-16">What Our Patients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Maria S.", text: "Professional, caring, and always on time. Eden Transport made my dialysis appointments so much easier.", rating: 5 },
              { name: "John D.", text: "The drivers are knowledgeable and compassionate. I feel safe every time I ride with Eden.", rating: 5 },
              { name: "Sarah L.", text: "Reliable service at fair prices. They helped my mother get to her chemotherapy sessions with dignity.", rating: 5 }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-violet-50 to-indigo-50 p-8 rounded-2xl shadow-lg">
                <FaQuoteLeft className="text-3xl text-violet-400 mb-4" />
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <p className="font-bold text-violet-800">{testimonial.name}</p>
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

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-50 to-violet-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center text-violet-800 mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What counties do you serve?", a: "We serve all California counties including Alameda, San Francisco, Contra Costa, Santa Clara, and San Mateo." },
              { q: "Do you accept insurance?", a: "Yes, we accept most major insurance plans. Contact us for specific coverage details." },
              { q: "Can I book same-day rides?", a: "Yes! We offer same-day service based on availability. Call us for urgent bookings." },
              { q: "Are your vehicles wheelchair accessible?", a: "All our vehicles are fully wheelchair and stretcher accessible with trained staff." }
            ].map((faq, i) => (
              <details key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <summary className="font-bold text-lg text-violet-800 cursor-pointer">{faq.q}</summary>
                <p className="mt-4 text-gray-600 pl-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-violet-700 to-indigo-700 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to Book Your Ride?</h2>
          <p className="text-xl text-violet-100 mb-8">Join thousands of satisfied patients across California</p>
          <a href="#book" className="inline-block bg-white text-violet-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-violet-50 hover:scale-105 transition-all shadow-2xl">
            Book Now - It's Easy!
          </a>
        </div>
      </section>
    </main>
  );
}