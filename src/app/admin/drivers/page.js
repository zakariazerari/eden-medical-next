"use client";
import { useState, useEffect } from "react";
import { FaStar, FaUserCircle, FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaImage } from "react-icons/fa";
import toast from "react-hot-toast";
import Image from "next/image";

export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    _id: null,
    name: "",
    age: "",
    image: null,
    isActive: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const res = await fetch("/api/drivers");
      const data = await res.json();
      if (data.success) {
        setDrivers(data.drivers);
      }
    } catch (error) {
      console.error("Error fetching drivers:", error);
      toast.error("Failed to load drivers");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.age) {
      toast.error('Please fill name and age');
      return;
    }
    
    setUploading(true);
    try {
      const method = isEditing ? "PUT" : "POST";
      const res = await fetch("/api/drivers", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        toast.success(isEditing ? "Driver updated!" : "Driver added!");
        fetchDrivers();
        resetForm();
      } else {
        toast.error(data.message || "Error saving driver");
      }
    } catch (error) {
      console.error("Error saving driver:", error);
      toast.error("Error saving driver");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      _id: null,
      name: "",
      age: "",
      image: null,
      isActive: true
    });
    setImagePreview(null);
    setIsEditing(false);
    setShowForm(false);
  };

  const handleEdit = (driver) => {
    setFormData({
      _id: driver._id,
      name: driver.name,
      age: driver.age,
      image: driver.image,
      isActive: driver.isActive
    });
    setImagePreview(driver.image);
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure? This will also delete all reviews for this driver.')) return;
    
    try {
      const res = await fetch("/api/drivers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: id })
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Driver deleted!");
        fetchDrivers();
      }
    } catch (error) {
      toast.error("Error deleting driver");
    }
  };

  const toggleActive = async (driver) => {
    try {
      const res = await fetch("/api/drivers", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...driver, isActive: !driver.isActive })
      });

      const data = await res.json();
      if (data.success) {
        toast.success(driver.isActive ? "Driver hidden" : "Driver activated");
        fetchDrivers();
      }
    } catch (error) {
      toast.error("Error updating driver");
    }
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
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-violet-800">Driver Management</h1>
          <p className="text-slate-600 mt-2">Add drivers - Customers will review them on the website</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center gap-2"
        >
          <FaPlus /> {showForm ? "Cancel" : "Add New Driver"}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-violet-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            {isEditing ? "Edit Driver" : "Add New Driver"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-br from-violet-50 to-indigo-50 rounded-xl border-2 border-dashed border-violet-300">
              <div className="relative">
                {imagePreview ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-violet-500">
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center">
                    <FaUserCircle className="text-7xl text-white" />
                  </div>
                )}
              </div>
              
              <label className="cursor-pointer bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all">
                <FaImage />
                <span>{imagePreview ? "Change Photo" : "Upload Photo"}</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              <p className="text-sm text-slate-600">PNG, JPG or JPEG (Max 5MB)</p>
            </div>

            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Driver Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500"
                  placeholder="e.g., Ahmed Hassan"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  required
                  min="18"
                  max="70"
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* Active Status */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="isActive"
                id="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="w-5 h-5 text-violet-600 rounded"
              />
              <label htmlFor="isActive" className="text-sm font-semibold text-slate-700">
                Show on Home Page
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={uploading}
                className={`bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all ${uploading ? 'opacity-50' : ''}`}
              >
                {uploading ? "Saving..." : isEditing ? "Update Driver" : "Add Driver"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-slate-200 text-slate-700 px-8 py-3 rounded-xl font-semibold hover:bg-slate-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Drivers List */}
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">All Drivers ({drivers.length})</h2>
          <div className="text-sm text-slate-600">
            Active: {drivers.filter(d => d.isActive).length}
          </div>
        </div>

        {drivers.length === 0 ? (
          <div className="text-center py-12">
            <FaUserCircle className="text-6xl mx-auto mb-4 text-slate-300" />
            <p className="text-lg text-slate-500">No drivers added yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {drivers.map((driver) => (
              <div
                key={driver._id}
                className={`border-2 rounded-xl p-6 ${driver.isActive ? 'border-violet-200 bg-violet-50' : 'border-slate-200 bg-slate-50 opacity-60'}`}
              >
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Image */}
                  <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                    {driver.image ? (
                      <Image src={driver.image} alt={driver.name} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center">
                        <FaUserCircle className="text-5xl text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800">{driver.name}</h3>
                    <p className="text-slate-600 mb-2">Age: {driver.age} years</p>
                    
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className={i < Math.round(driver.averageRating) ? "text-yellow-500" : "text-slate-300"} />
                        ))}
                      </div>
                      <span className="font-bold text-slate-800">{driver.averageRating || 0}</span>
                      <span className="text-sm text-slate-600">({driver.totalReviews || 0} reviews)</span>
                    </div>

                    <p className="text-xs text-slate-500">
                      Added: {new Date(driver.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex md:flex-col gap-2">
                    <button
                      onClick={() => toggleActive(driver)}
                      className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${driver.isActive ? 'bg-green-100 text-green-700' : 'bg-slate-200 text-slate-700'}`}
                    >
                      {driver.isActive ? <FaEye /> : <FaEyeSlash />}
                      {driver.isActive ? 'Active' : 'Hidden'}
                    </button>
                    <button
                      onClick={() => handleEdit(driver)}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold flex items-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(driver._id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold flex items-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-800 mb-2">ℹ️ How it works</h3>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>• Add drivers with their name, age, and photo</li>
          <li>• Customers can review drivers on the website</li>
          <li>• You can approve/reject reviews from the Reviews page</li>
          <li>• Ratings are calculated automatically</li>
          <li>• Toggle "Active" to show/hide drivers on the homepage</li>
        </ul>
      </div>
    </div>
  );
}