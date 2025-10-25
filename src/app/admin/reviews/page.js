"use client";
import { useState, useEffect } from "react";
import { FaStar, FaCheck, FaTimes, FaTrash, FaUserCircle, FaFilter } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedDriver, setSelectedDriver] = useState("all");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [reviewsRes, driversRes] = await Promise.all([
        fetch("/api/reviews?includeUnapproved=true"),
        fetch("/api/drivers")
      ]);

      const reviewsData = await reviewsRes.json();
      const driversData = await driversRes.json();

      if (reviewsData.success) setReviews(reviewsData.reviews);
      if (driversData.success) setDrivers(driversData.drivers);
    } catch (error) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, isApproved: true })
      });
      
      if ((await res.json()).success) {
        toast.success("✅ Review approved and now visible!");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to approve");
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch("/api/reviews", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id, isApproved: false })
      });
      
      if ((await res.json()).success) {
        toast.success("❌ Review hidden from website!");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to reject");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to permanently delete this review?")) return;
    
    try {
      const res = await fetch("/api/reviews", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id })
      });
      
      if ((await res.json()).success) {
        toast.success("Review deleted permanently!");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const filteredReviews = reviews.filter(r => {
    if (filter === "pending" && r.isApproved) return false;
    if (filter === "approved" && !r.isApproved) return false;
    if (selectedDriver !== "all" && r.driverId !== selectedDriver) return false;
    return true;
  });

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => !r.isApproved).length,
    approved: reviews.filter(r => r.isApproved).length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen md:ml-64">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full border-t-gray-600 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:ml-64 space-y-8 bg-gray-50">
      <h1 className="text-4xl font-extrabold text-gray-800">Reviews Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white">
          <p className="text-sm opacity-90">Total Reviews</p>
          <h3 className="text-4xl font-bold mt-2">{stats.total}</h3>
        </div>
        <div className="bg-gradient-to-br from-red-400 to-red-500 p-6 rounded-2xl shadow-lg text-white">
          <p className="text-sm opacity-90">Hidden Reviews</p>
          <h3 className="text-4xl font-bold mt-2">{stats.pending}</h3>
        </div>
        <div className="bg-gradient-to-br from-green-400 to-green-500 p-6 rounded-2xl shadow-lg text-white">
          <p className="text-sm opacity-90">Visible on Website</p>
          <h3 className="text-4xl font-bold mt-2">{stats.approved}</h3>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <FaFilter className="absolute left-3 top-3.5 text-gray-400" />
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900"
              style={{ WebkitTextFillColor: '#111827' }}
            >
              <option value="all">All Reviews</option>
              <option value="pending">Hidden Only</option>
              <option value="approved">Visible Only</option>
            </select>
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-3.5 text-gray-400" />
            <select 
              value={selectedDriver} 
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 text-gray-900"
              style={{ WebkitTextFillColor: '#111827' }}
            >
              <option value="all">All Drivers</option>
              {drivers.map(d => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Reviews ({filteredReviews.length})</h2>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <FaStar className="text-6xl mx-auto mb-4 text-gray-300" />
            <p className="text-lg text-gray-500">No reviews found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReviews.map((review) => {
              const driver = drivers.find(d => d._id === review.driverId);
              return (
                <div 
                  key={review._id} 
                  className={`border-2 rounded-xl p-6 ${
                    review.isApproved 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  {/* Driver Info */}
                  <div className="flex gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      {driver?.image ? (
                        <Image 
                          src={driver.image} 
                          alt={driver.name} 
                          width={64} 
                          height={64} 
                          className="object-cover w-full h-full" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-500 flex items-center justify-center">
                          <FaUserCircle className="text-4xl text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">{driver?.name || 'Unknown Driver'}</h3>
                      <p className="text-sm text-gray-600">Driver</p>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-gray-800">{review.patientName}</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < review.rating ? "text-red-500" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{review.comment}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{new Date(review.createdAt).toLocaleDateString()} at {new Date(review.createdAt).toLocaleTimeString()}</span>
                      <span className={`px-3 py-1 rounded-full font-bold ${
                        review.isApproved 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {review.isApproved ? '✅ Visible on Website' : '❌ Hidden'}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-wrap">
                    {!review.isApproved ? (
                      <button 
                        onClick={() => handleApprove(review._id)}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 flex items-center gap-2"
                      >
                        <FaCheck /> Show on Website
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleReject(review._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 flex items-center gap-2"
                      >
                        <FaTimes /> Hide from Website
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(review._id)}
                      className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-800 flex items-center gap-2"
                    >
                      <FaTrash /> Delete Permanently
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-800 mb-2">ℹ️ Review Management - Updated</h3>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>• ✅ <strong>All reviews are now posted immediately</strong> when customers submit them</li>
          <li>• 👁️ Reviews are visible on the website by default</li>
          <li>• ❌ You can hide spam/inappropriate reviews anytime</li>
          <li>• 🗑️ Deleting a review is permanent and cannot be undone</li>
          <li>• ⭐ Ratings are automatically calculated from visible reviews only</li>
          <li>• 🛡️ Same IP cannot review same driver within 24 hours (spam protection)</li>
        </ul>
      </div>
    </div>
  );
}