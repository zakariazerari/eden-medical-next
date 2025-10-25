
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
  const [drivers, setDrivers] = useState([]);
  const [reviews, setReviews] = useState({});
  const [loadingDrivers, setLoadingDrivers] = useState(true);
  const [currentDriverIndex, setCurrentDriverIndex] = useState(0);
  
  // REVIEW FORM STATES
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedDriverForReview, setSelectedDriverForReview] = useState(null);
  const [reviewFormData, setReviewFormData] = useState({
    rating: 0,
    comment: "",
    patientName: "",
  });
  const [submittingReview, setSubmittingReview] = useState(false);

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

  useEffect(() => {
    fetchDriversData();
  }, []);

  const fetchDriversData = async () => {
  console.log("🚀 Loading drivers...");
  setLoadingDrivers(true);
  
  try {
    // ✅ Request drivers WITH images for home page
    const [driversRes, reviewsRes] = await Promise.all([
      fetch("/api/drivers?includeImages=true"), // ← Add this parameter
      fetch("/api/reviews?limit=100")
    ]);

    const driversData = await driversRes.json();
    const reviewsData = await reviewsRes.json();

    if (driversData.success) {
      const activeDrivers = driversData.drivers.filter(d => d.isActive);
      setDrivers(activeDrivers);

      if (reviewsData.success && reviewsData.reviews) {
        const reviewsMap = {};
        
        activeDrivers.forEach(driver => {
          const latestReview = reviewsData.reviews.find(
            r => r.driverId === driver._id && r.isApproved
          );
          
          if (latestReview) {
            reviewsMap[driver._id] = latestReview;
          }
        });
        
        setReviews(reviewsMap);
      }
    }
  } catch (error) {
    console.error("❌ Error loading drivers:", error);
    toast.error("Failed to load drivers");
  } finally {
    console.log("✅ Loading finished!");
    setLoadingDrivers(false);
  }
};
  useEffect(() => {
    if (drivers.length === 0) return;
    const interval = setInterval(() => {
      setCurrentDriverIndex((prev) => (prev + 1) % drivers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [drivers.length]);

  const nextDriver = () => setCurrentDriverIndex((prev) => (prev + 1) % drivers.length);
  const prevDriver = () => setCurrentDriverIndex((prev) => (prev - 1 + drivers.length) % drivers.length);

  // REVIEW FORM FUNCTIONS
  const openReviewForm = (driver) => {
    setSelectedDriverForReview(driver);
    setShowReviewForm(true);
    setReviewFormData({
      rating: 0,
      comment: "",
      patientName: "",
    });
  };

  const closeReviewForm = () => {
    setShowReviewForm(false);
    setSelectedDriverForReview(null);
    setReviewFormData({
      rating: 0,
      comment: "",
      patientName: "",
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (reviewFormData.rating === 0) {
      toast.error("Please select a rating!");
      return;
    }
    
    if (!reviewFormData.comment.trim()) {
      toast.error("Please write a comment!");
      return;
    }
    
    if (!reviewFormData.patientName.trim()) {
      toast.error("Please enter your name!");
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          driverId: selectedDriverForReview._id,
          rating: reviewFormData.rating,
          comment: reviewFormData.comment,
          patientName: reviewFormData.patientName,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("✅ " + (data.message || "Review submitted! Awaiting admin approval."));
        closeReviewForm();
      } else {
        toast.error("❌ " + (data.message || "Failed to submit review"));
      }
    } catch (err) {
      toast.error("⚠ Something went wrong.");
    } finally {
      setSubmittingReview(false);
    }
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
    <main className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-cover bg-center bg-no-repeat px-6 py-32 flex items-center justify-center min-h-[700px]" style={{ backgroundImage: "url('/image3.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-blue-900/60"></div>
        <div className="relative z-10 max-w-5xl text-center text-white">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            California's Most Trusted <span className="text-red-400">Medical Transport</span>
          </h1>
          <p className="text-lg md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
            Safe, comfortable, and reliable non-emergency medical transportation across all California counties
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#book" className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all">
              Book Your Ride Now
            </a>
            <Link href="/about" className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 hover:scale-105 transition-all">
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
              <div className="text-5xl font-extrabold text-red-600 mb-2">{stats.rides.toLocaleString()}+</div>
              <p className="text-gray-600 text-lg">Safe Rides Completed</p>
            </div>
            <div className="p-6 transform hover:scale-105 transition-transform">
              <div className="text-5xl font-extrabold text-blue-600 mb-2">{stats.customers.toLocaleString()}+</div>
              <p className="text-gray-600 text-lg">Happy Customers</p>
            </div>
            <div className="p-6 transform hover:scale-105 transition-transform">
              <div className="text-5xl font-extrabold text-gray-800 mb-2">{stats.years}+</div>
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
        <div className="relative z-10 backdrop-blur-md bg-white/95 border border-gray-200 shadow-2xl rounded-3xl w-full max-w-4xl p-10">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">Book Your Medical Ride</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold block mb-2 text-gray-700">Service Type</label>
                <select name="serviceType" value={formData.serviceType} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option>Non-Emergency</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2 text-gray-700">Mobility Need</label>
                <select name="mobility" value={formData.mobility} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option>Wheelchair</option>
                  <option>Stretcher</option>
                  <option>Sedan</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold block mb-2 text-gray-700">Transport Date</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} className={`w-full p-3 border ${errors.date ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent`} />
                {errors.date && <p className="text-red-600 text-sm mt-1 flex items-center gap-2"><FaExclamationTriangle />{errors.date}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2 text-gray-700">Pick-Up Time</label>
                <input type="time" name="time" value={formData.time} onChange={handleChange} className={`w-full p-3 border ${errors.time ? "border-red-500" : "border-gray-300"} rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent`} />
                {errors.time && <p className="text-red-600 text-sm mt-1 flex items-center gap-2"><FaExclamationTriangle />{errors.time}</p>}
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

            <div className="grid md:grid-cols-2 gap-6">
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

            <div className="grid md:grid-cols-2 gap-6">
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
                  <option>Insurance</option>
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
          <p className="text-xl text-gray-600 mb-16 max-w-3xl mx-auto">Trusted by thousands of patients and healthcare facilities across California</p>

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

      {/* Driver Section */}
     <section className="py-12 md:py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden relative">
  {/* Animated Background */}
  <div className="absolute inset-0 opacity-20">
    <div className="absolute top-0 left-0 w-72 h-72 bg-red-500 rounded-full filter blur-3xl animate-pulse"></div>
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse"></div>
  </div>

  <div className="max-w-6xl mx-auto px-4 relative z-10">
    {/* Header */}
    <div className="text-center mb-8">
      <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-2xl">
        Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400">Professional Drivers</span>
      </h2>
      <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto">
        Certified, Compassionate, and Highly Rated
      </p>
    </div>

    {loadingDrivers ? (
      <div className="text-center py-12">
        <div className="inline-block">
          <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin"></div>
        </div>
      </div>
    ) : drivers.length > 0 ? (
      <>
        {/* Enhanced Swiper Container */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-all duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentDriverIndex * 100}%)` }}
            >
              {drivers.map((driver) => {
                const review = reviews[driver._id];
                
                return (
                  <div key={driver._id} className="w-full flex-shrink-0 px-2 md:px-4">
                    <div className="max-w-3xl mx-auto">
                      {/* Enhanced Card with Smoother Animations */}
                      <div className="relative group">
                        {/* Glowing Border Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 rounded-2xl blur opacity-40 group-hover:opacity-75 transition-opacity duration-300"></div>
                        
                        {/* Main Card */}
                        <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl overflow-hidden transform transition-transform duration-300 group-hover:scale-[1.02]">
                          
                          {/* Driver Header with Gradient */}
                          <div className="bg-gradient-to-r from-red-600 to-blue-600 p-5 md:p-7">
                            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
                              
                              {/* Profile Picture with Enhanced Glow */}
                              <div className="relative">
                                <div className="absolute -inset-1.5 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full blur-md opacity-60 animate-pulse"></div>
                                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-white/30">
                                  {driver.image ? (
                                    <img 
                                      src={driver.image} 
                                      alt={driver.name} 
                                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-red-500 to-blue-600 flex items-center justify-center">
                                      <FaUserCircle className="text-6xl md:text-7xl text-white" />
                                    </div>
                                  )}
                                </div>
                                
                                {/* Verified Badge */}
                                <div className="absolute -bottom-1 -right-1 bg-green-500 w-7 h-7 md:w-8 md:h-8 rounded-full border-3 border-white shadow-xl flex items-center justify-center animate-bounce">
                                  <span className="text-white text-sm font-bold">✓</span>
                                </div>
                              </div>

                              {/* Driver Info */}
                              <div className="text-center md:text-left flex-1 text-white">
                                <h3 className="text-2xl md:text-3xl font-extrabold mb-1 tracking-tight">
                                  {driver.name}
                                </h3>
                                <p className="text-xs md:text-sm text-red-100 mb-3 font-medium">
                                  {driver.age} years old • Certified Professional
                                </p>
                                
                                {/* Rating Stars */}
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                  <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar
                                        key={i}
                                        className={`text-base md:text-lg transition-all duration-200 ${
                                          i < Math.round(driver.averageRating) 
                                            ? "text-yellow-300 drop-shadow-lg" 
                                            : "text-white/20"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xl md:text-2xl font-black text-yellow-300 drop-shadow-lg">
                                    {driver.averageRating || 0}
                                  </span>
                                </div>

                                {/* Review Count */}
                                <p className="text-sm md:text-base text-white/90 mb-3 font-semibold">
                                  ⭐ <span className="font-black">{driver.totalReviews || 0}</span> Reviews
                                </p>

                                {/* Top Rated Badge */}
                                {driver.averageRating >= 4.5 && (
                                  <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 text-gray-900 px-4 py-1.5 rounded-full text-xs font-black shadow-xl animate-pulse">
                                    <FaStar className="text-white text-sm" />
                                    TOP RATED
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Review Section */}
                          {review ? (
                            <div className="p-5 md:p-7">
                              <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-red-50 rounded-2xl p-5 md:p-6 shadow-lg border-2 border-blue-100 transform transition-all duration-300 hover:shadow-xl">
                                
                                {/* Review Header */}
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <FaStar
                                        key={i}
                                        className={`text-sm md:text-base transition-all ${
                                          i < review.rating ? "text-yellow-500" : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span className="text-xs font-bold text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                                    Latest Review
                                  </span>
                                </div>
                                
                                {/* Quote Icon */}
                                <FaQuoteLeft className="text-3xl text-red-400/30 mb-3" />
                                
                                {/* Review Text */}
                                <p className="text-gray-800 text-sm md:text-base leading-relaxed italic mb-4 font-medium">
                                  "{review.comment}"
                                </p>
                                
                                {/* Reviewer Info */}
                                <div className="flex items-center gap-3 pt-3 border-t-2 border-gray-200">
                                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-base shadow-lg">
                                    {review.patientName.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-bold text-gray-900 text-sm md:text-base">
                                      {review.patientName}
                                    </p>
                                    <p className="text-xs text-gray-600">✓ Verified Patient</p>
                                  </div>
                                </div>
                              </div>

                              {/* CTA Button */}
                              <div className="mt-5 text-center">
                                <button
                                  onClick={() => openReviewForm(driver)}
                                  className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl text-sm md:text-base font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                  ✍️ Write Your Review
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="p-5 md:p-7">
                              <div className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 rounded-2xl p-6 md:p-7 text-center border-2 border-dashed border-blue-300 transform transition-all duration-300 hover:scale-105">
                                <div className="text-5xl mb-3 animate-bounce">⭐</div>
                                <h4 className="text-xl font-black text-gray-900 mb-2">
                                  Be the First to Review!
                                </h4>
                                <p className="text-gray-700 text-sm md:text-base mb-5 font-medium">
                                  Share your experience with {driver.name.split(' ')[0]}
                                </p>
                                
                                <button
                                  onClick={() => openReviewForm(driver)}
                                  className="bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl text-sm md:text-base font-bold shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                  ✍️ Write First Review
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Navigation Buttons */}
          {drivers.length > 1 && (
            <>
              <button
                onClick={prevDriver}
                className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 bg-gradient-to-br from-red-600 to-red-700 text-white p-3 md:p-4 rounded-full shadow-2xl hover:from-red-700 hover:to-red-800 transition-all duration-300 hover:scale-125 z-20 border-3 border-white ring-4 ring-red-500/30 backdrop-blur-sm"
              >
                <FaChevronLeft className="text-xl md:text-2xl" />
              </button>
              <button
                onClick={nextDriver}
                className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 md:p-4 rounded-full shadow-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 hover:scale-125 z-20 border-3 border-white ring-4 ring-blue-500/30 backdrop-blur-sm"
              >
                <FaChevronRight className="text-xl md:text-2xl" />
              </button>
            </>
          )}
        </div>

        {/* Enhanced Pagination Dots */}
        {drivers.length > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {drivers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentDriverIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === currentDriverIndex
                    ? "w-10 bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 shadow-lg scale-110"
                    : "w-2.5 bg-white/30 hover:bg-white/50 hover:scale-110"
                }`}
              />
            ))}
          </div>
        )}

        {/* Enhanced Stats */}
        <div className="mt-8 flex items-center justify-center gap-8 text-white/80 text-sm md:text-base">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="font-black text-red-400 text-lg">{drivers.length}</span>
            <span className="font-semibold">Drivers</span>
          </div>
          <div className="w-px h-6 bg-white/20"></div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="font-black text-blue-400 text-lg">{drivers.reduce((sum, d) => sum + (d.totalReviews || 0), 0)}</span>
            <span className="font-semibold">Reviews</span>
          </div>
          <div className="w-px h-6 bg-white/20"></div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <FaStar className="text-yellow-300 text-base" />
            <span className="font-black text-yellow-300 text-lg">
              {drivers.length > 0
                ? (drivers.reduce((sum, d) => sum + (parseFloat(d.averageRating) || 0), 0) / drivers.length).toFixed(1)
                : 0}
            </span>
          </div>
        </div>
      </>
    ) : (
      <div className="text-center py-12">
        <p className="text-white text-xl">No drivers available at the moment</p>
      </div>
    )}
  </div>
</section>

{/* Enhanced Review Form Modal */}
{showReviewForm && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
    <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl transform transition-all scale-100 animate-slideUp">
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900">
          Review <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">{selectedDriverForReview?.name}</span>
        </h3>
        <button
          onClick={closeReviewForm}
          className="text-gray-400 hover:text-gray-600 text-4xl font-bold transition-transform hover:rotate-90 duration-300"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleReviewSubmit} className="space-y-5">
        {/* Rating Selection */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">
            Your Rating *
          </label>
          <div className="flex justify-center gap-3 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setReviewFormData({...reviewFormData, rating: star})}
                className="w-14 h-14 rounded-full flex items-center justify-center hover:scale-125 transition-all duration-300 transform"
              >
                <FaStar
                  className={`text-4xl transition-all duration-300 ${
                    star <= reviewFormData.rating
                      ? "text-yellow-400 drop-shadow-lg scale-110"
                      : "text-gray-300 hover:text-gray-400"
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="text-center text-sm font-semibold text-gray-600">
            {reviewFormData.rating > 0 ? `${reviewFormData.rating} star${reviewFormData.rating > 1 ? 's' : ''} selected` : 'Click to rate'}
          </p>
        </div>

        {/* Name Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            value={reviewFormData.patientName}
            onChange={(e) => setReviewFormData({...reviewFormData, patientName: e.target.value})}
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium transition-all"
            placeholder="John Doe"
            required
          />
        </div>

        {/* Comment Textarea */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Your Review *
          </label>
          <textarea
            value={reviewFormData.comment}
            onChange={(e) => setReviewFormData({...reviewFormData, comment: e.target.value})}
            rows="5"
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 font-medium transition-all resize-none"
            placeholder="Share your experience with this driver..."
            required
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={closeReviewForm}
            className="flex-1 bg-gray-200 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-300 transition-all duration-300 hover:scale-105"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submittingReview}
            className={`flex-1 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 text-white py-3.5 rounded-xl font-bold shadow-xl ${
              submittingReview ? "opacity-70 cursor-not-allowed" : "hover:shadow-2xl hover:scale-105"
            } transition-all duration-300`}
          >
            {submittingReview ? "Submitting..." : "✓ Submit Review"}
          </button>
        </div>
      </form>

      {/* Info Text */}
      <p className="text-xs text-gray-500 text-center mt-5 font-medium">
        ✅ Your review will be posted immediately
      </p>
    </div>
  </div>
)}

      {/* FAQ Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 to-red-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-extrabold text-center text-gray-900 mb-16">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "What counties do you serve?", a: "We serve all California counties including Alameda, San Francisco, Contra Costa, Santa Clara, and San Mateo." },
              { q: "Do you accept insurance?", a: "Yes, we accept most major insurance plans. Contact us for specific coverage details." },
              { q: "Can I book same-day rides?", a: "Yes! We offer same-day service based on availability. Call us for urgent bookings." },
              { q: "Are your vehicles wheelchair accessible?", a: "All our vehicles are fully wheelchair and stretcher accessible with trained staff." }
            ].map((faq, i) => (
              <details key={i} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">{faq.q}</summary>
                <p className="mt-4 text-gray-600 pl-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-700 to-blue-700 py-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to Book Your Ride?</h2>
          <p className="text-xl text-red-100 mb-8">Join thousands of satisfied patients across California</p>
          <a href="#book" className="inline-block bg-white text-red-700 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 hover:scale-105 transition-all shadow-2xl">
            Book Now - It's Easy!
          </a>
        </div>
      </section>
    </main>
  );
}
                                        