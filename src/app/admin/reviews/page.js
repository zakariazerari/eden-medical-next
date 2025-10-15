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
        toast.success("✅ Review approved!");
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
        toast.success("❌ Review unapproved!");
        fetchData();
      }
    } catch (error) {
      toast.error("Failed to reject");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    
    try {
      const res = await fetch("/api/reviews", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id })
      });
      
      if ((await res.json()).success) {
        toast.success("Review deleted!");
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
        <div className="w-16 h-16 border-4 border-violet-200 rounded-full border-t-violet-600 animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:ml-64 space-y-8">
      <h1 className="text-4xl font-extrabold text-violet-800">Reviews Management</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white">
          <p className="text-sm opacity-90">Total Reviews</p>
          <h3 className="text-4xl font-bold mt-2">{stats.total}</h3>
        </div>
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-2xl shadow-lg text-white">
          <p className="text-sm opacity-90">Pending Approval</p>
          <h3 className="text-4xl font-bold mt-2">{stats.pending}</h3>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-lg text-white">
          <p className="text-sm opacity-90">Approved</p>
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
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 text-gray-900"
              style={{ WebkitTextFillColor: '#111827' }}
            >
              <option value="all">All Reviews</option>
              <option value="pending">Pending Only</option>
              <option value="approved">Approved Only</option>
            </select>
          </div>
          <div className="relative">
            <FaFilter className="absolute left-3 top-3.5 text-gray-400" />
            <select 
              value={selectedDriver} 
              onChange={(e) => setSelectedDriver(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-violet-500 text-gray-900"
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
          <h2 className="text-2xl font-bold">Reviews ({filteredReviews.length})</h2>
        </div>

        {filteredReviews.length === 0 ? (
          <div className="text-center py-12">
            <FaStar className="text-6xl mx-auto mb-4 text-slate-300" />
            <p className="text-lg text-slate-500">No reviews found</p>
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
                      : 'bg-yellow-50 border-yellow-200'
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
                        <div className="w-full h-full bg-violet-500 flex items-center justify-center">
                          <FaUserCircle className="text-4xl text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{driver?.name || 'Unknown Driver'}</h3>
                      <p className="text-sm text-slate-600">Driver</p>
                    </div>
                  </div>

                  {/* Review Content */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-bold text-slate-800">{review.patientName}</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar 
                            key={i} 
                            className={i < review.rating ? "text-yellow-500" : "text-slate-300"} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-700 mb-2">{review.comment}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{new Date(review.createdAt).toLocaleDateString()} at {new Date(review.createdAt).toLocaleTimeString()}</span>
                      <span className={`px-3 py-1 rounded-full font-bold ${
                        review.isApproved 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {review.isApproved ? 'Approved' : 'Pending'}
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
                        <FaCheck /> Approve
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleReject(review._id)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 flex items-center gap-2"
                      >
                        <FaTimes /> Unapprove
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(review._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 flex items-center gap-2"
                    >
                      <FaTrash /> Delete
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
        <h3 className="text-lg font-bold text-blue-800 mb-2">ℹ️ Review Moderation</h3>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>• All reviews are pending by default and need your approval</li>
          <li>• Only approved reviews appear on the website</li>
          <li>• You can unapprove reviews at any time</li>
          <li>• Deleting a review is permanent and cannot be undone</li>
          <li>• Ratings are automatically calculated from approved reviews only</li>
        </ul>
      </div>
    </div>
  );
}