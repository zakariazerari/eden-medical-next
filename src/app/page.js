"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  FaExclamationTriangle,
  FaAmbulance,
  FaClock,
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaUserCircle,
} from "react-icons/fa";
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

  // Driver Testimonials State
  const [drivers, setDrivers] = useState([]);
  const [reviews, setReviews] = useState({});
  const [loadingDrivers, setLoadingDrivers] = useState(true);
  const [currentDriverIndex, setCurrentDriverIndex] = useState(0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Eden Medical Transport",
    description: "Professional non-emergency medical transportation in California",
    url: "https://edenmedical.com",
    telephone: "+1-510-957-8383",
    address: {
      "@type": "PostalAddress",
      addressLocality: "California",
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

  // Stats Counter Animation
  useEffect(() => {
    const animateCounter = (target, key, duration = 2000) => {
      const increment = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setStats((prev) => ({ ...prev, [key]: target }));
          clearInterval(timer);
        } else {
          setStats((prev) => ({ ...prev, [key]: Math.floor(current) }));
        }
      }, 16);
    };

    animateCounter(5000, "rides");
    animateCounter(2500, "customers");
    animateCounter(10, "years");
  }, []);

  // Fetch Drivers & Reviews
  useEffect(() => {
    fetchDriversData();
  }, []);

  const fetchDriversData = async () => {
    try {
      const driversRes = await fetch("/api/drivers");
      const driversData = await driversRes.json();

      if (driversData.success) {
        const activeDrivers = driversData.drivers.filter(d => d.isActive);
        setDrivers(activeDrivers);

        const reviewsData = {};
        for (const driver of activeDrivers) {
          const reviewsRes = await fetch(`/api/reviews?driverId=${driver._id}`);
          const data = await reviewsRes.json();
          if (data.success && data.reviews.length > 0) {
            reviewsData[driver._id] = data.reviews[0];
          }
        }
        setReviews(reviewsData);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingDrivers(false);
    }
  };

  // Auto-play Drivers Carousel
  useEffect(() => {
    if (drivers.length === 0) return;
    const interval = setInterval(() => {
      setCurrentDriverIndex((prev) => (prev + 1) % drivers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [drivers.length]);

  const nextDriver = () => setCurrentDriverIndex((prev) => (prev + 1) % drivers.length);
  const prevDriver = () => setCurrentDriverIndex((prev) => (prev - 1 + drivers.length) % drivers.length);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat px-6 py-32 flex items-center justify-center min-h-[700px]" style={{ backgroundImage: "url('/image3.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/70 to-violet-900/50"></div>
        <div className="relative z-10 max-w-5xl text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
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

      {/* Patient Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center text-violet-800 mb-16">What Our Patients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Maria S.", text: "Professional, caring, and always on time. Eden Transport made my dialysis appointments so much easier.", rating: 5 },
              { name: "John D.", text: "The drivers are knowledgeable and compassionate. I feel safe every time I ride with Eden.", rating: 5 },
              { name: "Sarah L.", text: "Reliable service at fair prices. They helped my mother get to her chemotherapy sessions with dignity.", rating: 5 }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gradient-to-br from-violet-50 to-indigo-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
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

      {/* Driver Testimonials Section - LIGHTWEIGHT */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-indigo-50 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-indigo-700 mb-3">
              Meet Our Drivers
            </h2>
            <p className="text-base md:text-lg text-slate-600">Professional, certified, and compassionate</p>
          </div>

          {loadingDrivers ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-violet-200 rounded-full border-t-violet-600 animate-spin"></div>
            </div>
          ) : drivers.length > 0 ? (
            <>
              <div className="relative">
                <div className="overflow-hidden">
                  <div 
                    className="flex transition-transform duration-700 ease-out"
                    style={{ transform: `translateX(-${currentDriverIndex * 100}%)` }}
                  >
                    {drivers.map((driver) => {
                      const review = reviews[driver._id];
                      
                      return (
                        <div key={driver._id} className="w-full flex-shrink-0 px-2 md:px-4">
                          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-3xl mx-auto transform hover:scale-[1.02] transition-transform duration-300">
                            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mb-6">
                              <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full blur opacity-40 group-hover:opacity-60 transition"></div>
                                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                                  {driver.image ? (
                                    <img src={driver.image} alt={driver.name} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                                      <FaUserCircle className="text-5xl text-white" />
                                    </div>
                                  )}
                                </div>
                                <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                              </div>

                              <div className="text-center sm:text-left flex-1">
                                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-1">
                                  {driver.name}
                                </h3>
                                <p className="text-slate-600 text-sm md:text-base mb-2">
                                  {driver.age} years old • Professional Driver
                                </p>
                                
                                <div className="flex items-center justify-center sm:justify-start gap-2">
                                  <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar
                                        key={i}
                                        className={`text-sm md:text-base ${
                                          i < Math.round(driver.averageRating) ? "text-yellow-500" : "text-slate-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-slate-800 font-bold text-sm md:text-base">
                                    {driver.averageRating || 0}
                                  </span>
                                  <span className="text-slate-600 text-xs md:text-sm">
                                    ({driver.totalReviews || 0} reviews)
                                  </span>
                                </div>

                                {driver.averageRating >= 4.5 && (
                                  <span className="inline-block mt-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                    ⭐ TOP RATED
                                  </span>
                                )}
                              </div>
                            </div>

                            {review ? (
                              <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl p-4 md:p-6">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar
                                        key={i}
                                        className={`text-sm ${i < review.rating ? "text-yellow-500" : "text-slate-300"}`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                
                                <p className="text-slate-700 text-sm md:text-base leading-relaxed italic mb-3">
                                  "{review.comment}"
                                </p>
                                
                                <p className="font-semibold text-violet-800 text-sm">
                                  — {review.patientName}
                                </p>
                              </div>
                            ) : (
                              <div className="bg-violet-50 rounded-xl p-4 text-center">
                                <p className="text-slate-600 text-sm">Be the first to review {driver.name.split(' ')[0]}!</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {drivers.length > 1 && (
                  <>
                    <button
                      onClick={prevDriver}
                      className="absolute left-0 top-1/2 -translate-y-1/2 bg-white text-violet-600 p-2 md:p-3 rounded-full shadow-lg hover:bg-violet-50 transition-all hover:scale-110 z-10"
                    >
                      <FaChevronLeft className="text-lg md:text-xl" />
                    </button>
                    <button
                      onClick={nextDriver}
                      className="absolute right-0 top-1/2 -translate-y-1/2 bg-white text-violet-600 p-2 md:p-3 rounded-full shadow-lg hover:bg-violet-50 transition-all hover:scale-110 z-10"
                    >
                      <FaChevronRight className="text-lg md:text-xl" />
                    </button>
                  </>
                )}
              </div>

              {drivers.length > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {drivers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentDriverIndex(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentDriverIndex
                          ? "w-8 bg-gradient-to-r from-violet-600 to-indigo-600"
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>
              )}

              <div className="mt-12 bg-gradient-to-r from-violet-700 to-indigo-700 rounded-2xl p-6 md:p-8 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-center text-white">
                  <div>
                    <div className="text-2xl md:text-4xl font-bold mb-1">{drivers.length}+</div>
                    <p className="text-xs md:text-base text-violet-100">Certified Drivers</p>
                  </div>
                  <div>
                    <div className="text-2xl md:text-4xl font-bold mb-1">
                      {drivers.reduce((sum, d) => sum + (d.totalReviews || 0), 0)}+
                    </div>
                    <p className="text-xs md:text-base text-violet-100">Happy Patients</p>
                  </div>
                  <div>
                    <div className="text-2xl md:text-4xl font-bold mb-1">
                      {drivers.length > 0
                        ? (drivers.reduce((sum, d) => sum + (parseFloat(d.averageRating) || 0), 0) / drivers.length).toFixed(1)
                        : 0}⭐
                    </div>
                    <p className="text-xs md:text-base text-violet-100">Avg Rating</p>
                  </div>
                </div>
              </div>
            </>
          ) : null}
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