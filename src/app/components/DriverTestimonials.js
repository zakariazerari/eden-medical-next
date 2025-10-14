"use client";
import { useState, useEffect } from "react";
import { FaStar, FaQuoteLeft, FaUserCircle, FaChevronLeft, FaChevronRight, FaPaperPlane } from "react-icons/fa";
import Image from "next/image";
import toast from "react-hot-toast";

export default function DriverTestimonials() {
  const [drivers, setDrivers] = useState([]);
  const [reviews, setReviews] = useState({});
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
      // جلب السائقين
      const driversRes = await fetch("/api/drivers");
      const driversData = await driversRes.json();

      if (driversData.success) {
        setDrivers(driversData.drivers);

        // جلب Reviews المعتمدة لكل سائق
        const reviewsData = {};
        for (const driver of driversData.drivers) {
          const reviewsRes = await fetch(`/api/reviews?driverId=${driver._id}`);
          const data = await reviewsRes.json();
          if (data.success) {
            reviewsData[driver._id] = data.reviews;
          }
        }
        setReviews(reviewsData);

        // تهيئة مؤشرات المراجعات
        const initialIndexes = {};
        driversData.drivers.forEach(driver => {
          initialIndexes[driver._id] = 0;
        });
        setCurrentReviewIndex(initialIndexes);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Auto-play carousel للسائقين
  useEffect(() => {
    if (!isAutoPlaying || activeDrivers.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeDrivers.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, drivers]);

  // Auto-play للمراجعات
  useEffect(() => {
    const intervals = {};
    activeDrivers.forEach(driver => {
      const driverReviews = reviews[driver._id] || [];
      if (driverReviews.length > 1) {
        intervals[driver._id] = setInterval(() => {
          setCurrentReviewIndex(prev => ({
            ...prev,
            [driver._id]: (prev[driver._id] + 1) % driverReviews.length
          }));
        }, 5000);
      }
    });

    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [drivers, reviews]);

  const activeDrivers = drivers.filter(d => d.isActive);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeDrivers.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeDrivers.length) % activeDrivers.length);
    setIsAutoPlaying(false);
  };

  const nextReview = (driverId, totalReviews) => {
    setCurrentReviewIndex(prev => ({
      ...prev,
      [driverId]: (prev[driverId] + 1) % totalReviews
    }));
  };

  const prevReview = (driverId, totalReviews) => {
    setCurrentReviewIndex(prev => ({
      ...prev,
      [driverId]: (prev[driverId] - 1 + totalReviews) % totalReviews
    }));
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
        toast.success("✅ Thank you! Your review is pending approval.");
        setReviewForm({ patientName: "", rating: 5, comment: "" });
        setShowReviewForm(null);
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

  if (activeDrivers.length === 0) {
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
              {activeDrivers.map((driver, index) => {
                const position = (index - currentSlide + activeDrivers.length) % activeDrivers.length;
                const isCenter = position === 0;
                const isLeft = position === activeDrivers.length - 1;
                const isRight = position === 1;
                
                let transformStyle = "translateX(-50%) translateZ(-300px) scale(0.7)";
                let opacityStyle = 0.3;
                let zIndex = 0;

                if (isCenter) {
                  transformStyle = "translateX(-50%) translateZ(0) scale(1)";
                  opacityStyle = 1;
                  zIndex = 10;
                } else if (isLeft) {
                  transformStyle = "translateX(-150%) translateZ(-200px) scale(0.8) rotateY(35deg)";
                  opacityStyle = 0.5;
                  zIndex = 5;
                } else if (isRight) {
                  transformStyle = "translateX(50%) translateZ(-200px) scale(0.8) rotateY(-35deg)";
                  opacityStyle = 0.5;
                  zIndex = 5;
                }

                const driverReviews = reviews[driver._id] || [];
                const currentReview = driverReviews[currentReviewIndex[driver._id] || 0];

                return (
                  <div
                    key={driver._id}
                    className="absolute top-0 left-1/2 w-full max-w-2xl transition-all duration-700 ease-out px-4"
                    style={{
                      transform: transformStyle,
                      opacity: opacityStyle,
                      zIndex: zIndex,
                    }}
                  >
                    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10">
                      {/* Driver Info */}
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 mb-6">
                        <div className="relative flex-shrink-0">
                          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-4 border-violet-500 shadow-lg">
                            {driver.image ? (
                              <Image src={driver.image} alt={driver.name} fill className="object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center">
                                <FaUserCircle className="text-7xl text-white" />
                              </div>
                            )}
                          </div>
                          <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                            <span className="text-white text-xs font-bold">✓</span>
                          </div>
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-1">
                            {driver.name}
                          </h3>
                          <p className="text-slate-600 text-base md:text-lg mb-3">
                            {driver.age} years old • Professional Driver
                          </p>
                          
                          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={`text-lg md:text-xl ${
                                      i < Math.round(driver.averageRating) ? "text-yellow-500" : "text-slate-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-slate-800 font-bold text-lg">
                                {driver.averageRating || 0}
                              </span>
                            </div>
                            <span className="text-slate-600 font-semibold text-sm md:text-base">
                              ({driver.totalReviews || 0} review{driver.totalReviews !== 1 ? 's' : ''})
                            </span>
                          </div>

                          {driver.averageRating >= 4.5 && (
                            <span className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                              ⭐ EXCELLENT DRIVER
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Current Review or No Reviews */}
                      {currentReview ? (
                        <div className="relative">
                          <div className="bg-gradient-to-br from-violet-50 to-indigo-50 rounded-2xl p-6 md:p-8 mb-4">
                            <div className="flex items-start justify-between mb-4">
                              <FaQuoteLeft className="text-3xl md:text-4xl text-violet-400" />
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={`text-base ${
                                      i < currentReview.rating ? "text-yellow-500" : "text-slate-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            
                            <p className="text-slate-700 text-base md:text-lg leading-relaxed italic mb-4">
                              {currentReview.comment}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-violet-800">
                                — {currentReview.patientName}
                              </p>
                              <p className="text-xs text-slate-500">
                                {new Date(currentReview.date).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          {driverReviews.length > 1 && isCenter && (
                            <div className="flex justify-center items-center gap-4 mb-4">
                              <button
                                onClick={() => prevReview(driver._id, driverReviews.length)}
                                className="p-2 bg-violet-600 text-white rounded-full hover:bg-violet-700"
                              >
                                <FaChevronLeft />
                              </button>
                              
                              <div className="flex gap-2">
                                {driverReviews.map((_, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => setCurrentReviewIndex(prev => ({ ...prev, [driver._id]: idx }))}
                                    className={`h-2 rounded-full transition-all ${
                                      idx === (currentReviewIndex[driver._id] || 0)
                                        ? "w-8 bg-violet-600"
                                        : "w-2 bg-slate-300"
                                    }`}
                                  />
                                ))}
                              </div>

                              <button
                                onClick={() => nextReview(driver._id, driverReviews.length)}
                                className="p-2 bg-violet-600 text-white rounded-full hover:bg-violet-700"
                              >
                                <FaChevronRight />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="bg-violet-50 rounded-2xl p-6 mb-4 text-center">
                          <p className="text-slate-600">No reviews yet. Be the first to review!</p>
                        </div>
                      )}

                      {/* Add Review Button/Form */}
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

          {/* Driver Navigation */}
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

          {/* Driver Indicators */}
          <div className="flex justify-center gap-2 md:gap-3 mt-8">
            {activeDrivers.map((_, index) => (
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
              <div className="text-4xl md:text-5xl font-bold mb-2">{activeDrivers.length}+</div>
              <p className="text-lg md:text-xl text-violet-100">Certified Drivers</p>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {activeDrivers.reduce((sum, d) => sum + (d.totalReviews || 0), 0)}+
              </div>
              <p className="text-lg md:text-xl text-violet-100">Happy Patients</p>
            </div>
            <div className="transform hover:scale-105 transition-transform">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {activeDrivers.length > 0
                  ? (activeDrivers.reduce((sum, d) => sum + (parseFloat(d.averageRating) || 0), 0) / activeDrivers.length).toFixed(1)
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