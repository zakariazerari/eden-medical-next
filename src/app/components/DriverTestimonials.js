"use client";
import { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft, FaUserCircle, FaChevronLeft, FaChevronRight, FaPaperPlane } from "react-icons/fa";
import Image from "next/image";
import toast from "react-hot-toast";

export default function DriverTestimonials() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState({});
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    patientName: "",
    rating: 5,
    comment: ""
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // ✅ OPTIMIZED: Single API call with all data
     const res = await fetch("/api/drivers?includeReviews=true&limit=20");
      const data = await res.json();

      if (data.success) {
        // Filter only active drivers with images
        const activeDrivers = data.drivers.filter(d => d.isActive && d.image);
        setDrivers(activeDrivers);

        // Initialize review indexes
        const initialIndexes = {};
        activeDrivers.forEach(driver => {
          initialIndexes[driver._id] = 0;
        });
        setCurrentReviewIndex(initialIndexes);
      }                                       
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load drivers");
    } finally {
      setLoading(false);
    }
  };

  // Auto-play carousel for drivers
  useEffect(() => {
    if (!isAutoPlaying || drivers.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % drivers.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, drivers.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % drivers.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + drivers.length) % drivers.length);
    setIsAutoPlaying(false);
  };

  const handleReviewSubmit = async (e, driverId) => {
    e.preventDefault();

    if (!reviewForm.patientName.trim() || !reviewForm.comment.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          driverId,
          ...reviewForm
        })
      });

      const data = await res.json();
      if (data.success) {
        toast.success("✅ Thank you! Your review has been posted.");
        setReviewForm({ patientName: "", rating: 5, comment: "" });
        setShowReviewForm(null);
        // Refresh drivers data
        fetchData();
      } else {
        toast.error(data.message || "Error submitting review");
      }
    } catch (error) {
      toast.error("Error submitting review");
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 px-4 md:px-6 bg-gradient-to-br from-violet-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-violet-200 rounded-full border-t-violet-600 animate-spin"></div>
          <p className="mt-4 text-violet-600 font-semibold">Loading Drivers...</p>
        </div>
      </div>
    );
  }

  if (drivers.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-24 px-4 md:px-6 bg-gradient-to-br from-violet-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-700 to-indigo-700 mb-4">
            Meet Our Professional Drivers
          </h2>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            Certified, compassionate, and dedicated to your safety and comfort
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden py-8 md:py-12">
            <div className="relative h-[800px] md:h-[700px]" style={{ perspective: '1000px' }}>
              {drivers.map((driver, index) => {
                const position = (index - currentSlide + drivers.length) % drivers.length;
                const isCenter = position === 0;
                const isLeft = position === drivers.length - 1;
                const isRight = position === 1;
                
                return (
                  <div
                    key={driver._id}
                    className={`absolute top-0 left-1/2 w-full max-w-md transition-all duration-700 ${
                      isCenter
                        ? 'transform -translate-x-1/2 z-30 scale-100 opacity-100'
                        : isLeft
                        ? 'transform -translate-x-[150%] z-10 scale-75 opacity-40'
                        : isRight
                        ? 'transform translate-x-[50%] z-10 scale-75 opacity-40'
                        : 'transform -translate-x-1/2 z-0 scale-50 opacity-0'
                    }`}
                    style={{
                      transformStyle: 'preserve-3d'
                    }}
                  >
                    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border-4 border-violet-200">
                      {/* Driver Image */}
                      <div className="flex justify-center mb-6">
                        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-violet-600 shadow-xl">
                          {driver.image ? (
                            <Image
                              src={driver.image}
                              alt={driver.name}
                              fill
                              className="object-cover"
                              sizes="128px"
                              priority={isCenter}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center">
                              <FaUserCircle className="text-7xl text-white" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Driver Info */}
                      <div className="text-center mb-6">
                        <h3 className="text-3xl font-bold text-violet-800 mb-2">{driver.name}</h3>
                        <p className="text-slate-600 mb-3">Age: {driver.age} years</p>
                        
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar 
                                key={i} 
                                className={i < Math.round(driver.averageRating || 0) ? "text-yellow-500" : "text-slate-300"} 
                              />
                            ))}
                          </div>
                          <span className="font-bold text-xl text-violet-800">
                            {driver.averageRating || 0}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">
                          {driver.totalReviews || 0} {driver.totalReviews === 1 ? 'review' : 'reviews'}
                        </p>
                      </div>

                      {/* Review Form/Button */}
                      {isCenter && (
                        <>
                          {showReviewForm === driver._id ? (
                            <form onSubmit={(e) => handleReviewSubmit(e, driver._id)} className="bg-indigo-50 rounded-2xl p-6 space-y-4">
                              <h4 className="font-bold text-lg text-violet-800 mb-4">Share Your Experience</h4>
                              
                              <div>
                                <label className="block text-sm font-semibold mb-2">Your Name</label>
                                <input
                                  type="text"
                                  value={reviewForm.patientName}
                                  onChange={(e) => setReviewForm(prev => ({ ...prev, patientName: e.target.value }))}
                                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-violet-500"
                                  placeholder="e.g., John D."
                                  required
                                />
                              </div>

                              <div>
                                <label className="block text-sm font-semibold mb-2">Rating</label>
                                <div className="flex gap-2">
                                  {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                      key={star}
                                      type="button"
                                      onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))}
                                      className="p-2"
                                    >
                                      <FaStar
                                        className={`text-3xl ${
                                          star <= reviewForm.rating ? "text-yellow-500" : "text-slate-300"
                                        }`}
                                      />
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-semibold mb-2">Your Review</label>
                                <textarea
                                  value={reviewForm.comment}
                                  onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                                  rows="3"
                                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-violet-500 resize-none"
                                  placeholder="Share your experience with this driver..."
                                  required
                                />
                              </div>

                              <div className="flex gap-2">
                                <button
                                  type="submit"
                                  disabled={submittingReview}
                                  className="flex-1 bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-violet-700 flex items-center justify-center gap-2"
                                >
                                  <FaPaperPlane /> {submittingReview ? "Submitting..." : "Submit Review"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setShowReviewForm(null);
                                    setReviewForm({ patientName: "", rating: 5, comment: "" });
                                  }}
                                  className="px-6 py-3 bg-slate-200 text-slate-700 rounded-xl font-semibold"
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>
                          ) : (
                            <button
                              onClick={() => setShowReviewForm(driver._id)}
                              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                              <FaStar /> Leave a Review
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 bg-white text-violet-600 p-3 md:p-4 rounded-full shadow-xl hover:bg-violet-50 transition-all hover:scale-110 z-20"
          >
            <FaChevronLeft className="text-xl md:text-2xl" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 bg-white text-violet-600 p-3 md:p-4 rounded-full shadow-xl hover:bg-violet-50 transition-all hover:scale-110 z-20"
          >
            <FaChevronRight className="text-xl md:text-2xl" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center gap-2 md:gap-3 mt-8">
            {drivers.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
                className={`h-2 md:h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "w-8 md:w-12 bg-gradient-to-r from-violet-600 to-indigo-600"
                    : "w-2 md:w-3 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>                                
        </div>

        {/* Stats */}
        <div className="mt-16 bg-gradient-to-r from-violet-700 to-indigo-700 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center text-white">
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2">{drivers.length}+</div>
              <p className="text-lg md:text-xl text-violet-100">Certified Drivers</p>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {drivers.reduce((sum, d) => sum + (d.totalReviews || 0), 0)}+
              </div>
              <p className="text-lg md:text-xl text-violet-100">Happy Patients</p>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {drivers.length > 0
                  ? (drivers.reduce((sum, d) => sum + (parseFloat(d.averageRating) || 0), 0) / drivers.length).toFixed(1)
                  : 0}⭐
              </div>
              <p className="text-lg md:text-xl text-violet-100">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}