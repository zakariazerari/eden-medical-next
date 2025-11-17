// Leave Review Form Page
// Location: /app/leave-review/page.js

"use client";
import { useState } from "react";
import { FaStar, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

export default function LeaveReviewPage() {
  const [formData, setFormData] = useState({
    patientName: '',
    rating: 0,
    comment: '',
    driverId: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!formData.patientName.trim()) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }

    if (formData.rating === 0) {
      setError('Please select a rating');
      setLoading(false);
      return;
    }

    if (!formData.comment.trim() || formData.comment.length < 10) {
      setError('Please write a review (at least 10 characters)');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ patientName: '', rating: 0, comment: '', driverId: '' });
      } else {
        setError(data.message || 'Failed to submit review');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const rating = index + 1;
      return (
        <button
          key={rating}
          type="button"
          onClick={() => setFormData({ ...formData, rating })}
          onMouseEnter={() => setHoveredRating(rating)}
          onMouseLeave={() => setHoveredRating(0)}
          className="focus:outline-none transition-transform hover:scale-125"
        >
          <FaStar
            size={40}
            className={`${
              rating <= (hoveredRating || formData.rating)
                ? 'text-yellow-400'
                : 'text-gray-300'
            } transition-colors`}
          />
        </button>
      );
    });
  };

  if (success) {
    return (
      <section className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 flex items-center justify-center py-24">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-green-600 text-5xl" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Thank You!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Your review has been submitted and is pending approval. 
              We appreciate your feedback!
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/reviews"
                className="px-8 py-4 bg-gradient-to-r from-red-600 to-blue-700 text-white font-bold rounded-xl hover:shadow-xl transition-all"
              >
                View All Reviews
              </Link>
              <button
                onClick={() => setSuccess(false)}
                className="px-8 py-4 bg-white text-gray-700 font-bold rounded-xl border-2 border-gray-300 hover:border-red-600 transition-all"
              >
                Leave Another Review
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Leave a <span className="text-red-600">Review</span>
          </h1>
          <p className="text-xl text-gray-600">
            Share your experience with Eden Medical Transport
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Name */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-3">
                Your Name *
              </label>
              <input
                type="text"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                placeholder="Enter your name"
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none text-lg transition-colors"
                maxLength={100}
              />
            </div>

            {/* Rating */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-3">
                Rating *
              </label>
              <div className="flex gap-2 mb-2">
                {renderStars()}
              </div>
              <p className="text-sm text-gray-600">
                {formData.rating === 0 && "Click to rate"}
                {formData.rating === 1 && "⭐ Poor"}
                {formData.rating === 2 && "⭐⭐ Fair"}
                {formData.rating === 3 && "⭐⭐⭐ Good"}
                {formData.rating === 4 && "⭐⭐⭐⭐ Very Good"}
                {formData.rating === 5 && "⭐⭐⭐⭐⭐ Excellent"}
              </p>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-lg font-bold text-gray-900 mb-3">
                Your Review *
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Tell us about your experience with our service..."
                rows={6}
                className="w-full px-6 py-4 border-2 border-gray-300 rounded-xl focus:border-red-600 focus:outline-none text-lg resize-none transition-colors"
                maxLength={1000}
              />
              <p className="text-sm text-gray-500 mt-2">
                {formData.comment.length}/1000 characters (minimum 10)
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
                <p className="text-red-600 font-medium">⚠️ {error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-5 bg-gradient-to-r from-red-600 to-blue-700 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <FaPaperPlane />
                  Submit Review
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              * Required fields | Your review will be published after approval
            </p>
          </form>
        </div>

        {/* Bottom Link */}
        <div className="text-center mt-8">
          <Link
            href="/reviews"
            className="text-red-600 font-semibold hover:underline"
          >
            ← View Existing Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}