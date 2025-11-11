"use client";
import { useEffect, useState } from "react";
import { FaImages, FaTrash, FaUpload, FaSpinner, FaFilter, FaTimes, FaEye } from "react-icons/fa";
import toast from "react-hot-toast";

export default function GalleryManagementPage() {
  const [galleryImages, setGalleryImages] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadForm, setUploadForm] = useState({
    title: "",
    category: "vehicles",
    image: null
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setGalleryImages(data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!uploadForm.image) {
      toast.error("Please select an image");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("title", uploadForm.title);
    formData.append("category", uploadForm.category);
    formData.append("image", uploadForm.image);

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("🎉 Image uploaded successfully!");
        setShowUploadModal(false);
        setUploadForm({ title: "", category: "vehicles", image: null });
        fetchGallery();
      } else {
        toast.error("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      
      if (res.ok) {
        toast.success("🗑️ Image deleted successfully!");
        fetchGallery();
      } else {
        const data = await res.json();
        toast.error("Delete failed: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Delete failed: " + error.message);
    }
  };

  const categories = ["all", "vehicles", "interior", "staff"];
  const filteredImages = filter === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === filter);

  const getCategoryColor = (category) => {
    const colors = {
      vehicles: "from-blue-500 to-blue-600",
      interior: "from-green-500 to-green-600",
      staff: "from-orange-500 to-orange-600",
      all: "from-red-600 to-red-700"
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  const getCategoryBadgeColor = (category) => {
    const colors = {
      vehicles: "bg-blue-600",
      interior: "bg-green-600",
      staff: "bg-orange-600"
    };
    return colors[category] || "bg-gray-600";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl sm:text-5xl lg:text-6xl text-red-600 mx-auto mb-3 sm:mb-4" />
          <p className="text-gray-600 font-semibold text-base sm:text-lg lg:text-xl">Loading Gallery...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-gray-800 flex items-center gap-2 sm:gap-3">
            <FaImages className="text-red-600 text-lg sm:text-xl lg:text-2xl xl:text-3xl" />
            Gallery Management
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1 sm:mt-2">
            Manage your gallery - {galleryImages.length} total images
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 lg:py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg sm:rounded-xl hover:scale-105 transition-all shadow-lg font-semibold text-xs sm:text-sm lg:text-base whitespace-nowrap w-full sm:w-auto"
        >
          <FaUpload className="text-xs sm:text-sm lg:text-base" /> 
          <span className="hidden xs:inline">Upload New Image</span>
          <span className="xs:hidden">Upload</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        <div className="bg-gradient-to-br from-red-600 to-red-700 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg text-white hover:scale-105 transition-transform cursor-pointer">
          <p className="text-[10px] sm:text-xs lg:text-sm opacity-90">Total Images</p>
          <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mt-1 sm:mt-2">{galleryImages.length}</h3>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg text-white hover:scale-105 transition-transform cursor-pointer">
          <p className="text-[10px] sm:text-xs lg:text-sm opacity-90">Vehicles</p>
          <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mt-1 sm:mt-2">
            {galleryImages.filter(img => img.category === "vehicles").length}
          </h3>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg text-white hover:scale-105 transition-transform cursor-pointer">
          <p className="text-[10px] sm:text-xs lg:text-sm opacity-90">Interior</p>
          <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mt-1 sm:mt-2">
            {galleryImages.filter(img => img.category === "interior").length}
          </h3>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-3 sm:p-4 lg:p-6 rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg text-white hover:scale-105 transition-transform cursor-pointer">
          <p className="text-[10px] sm:text-xs lg:text-sm opacity-90">Staff</p>
          <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mt-1 sm:mt-2">
            {galleryImages.filter(img => img.category === "staff").length}
          </h3>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl p-3 sm:p-4 lg:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <FaFilter className="text-gray-600 text-xs sm:text-sm lg:text-base" />
          <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-800">Filter by Category</h2>
        </div>
        <div className="flex gap-1.5 sm:gap-2 lg:gap-3 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-2 sm:px-3 lg:px-6 py-1 sm:py-1.5 lg:py-2 rounded-md sm:rounded-lg lg:rounded-xl font-semibold capitalize transition-all text-[10px] sm:text-xs lg:text-sm xl:text-base ${
                filter === cat
                  ? `bg-gradient-to-r ${getCategoryColor(cat)} text-white shadow-lg scale-105`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="hidden sm:inline">{cat}</span>
              <span className="sm:hidden">{cat.slice(0, 3)}</span>
              <span className="ml-1">({cat === "all" ? galleryImages.length : galleryImages.filter(img => img.category === cat).length})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg sm:shadow-xl p-3 sm:p-4 lg:p-6">
        <h2 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-800 mb-3 sm:mb-4 lg:mb-6">
          {filter === "all" ? "All Images" : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Images`}
        </h2>

        {filteredImages.length === 0 ? (
          <div className="text-center py-12 sm:py-16 lg:py-20 bg-gray-50 rounded-lg sm:rounded-xl">
            <FaImages className="text-4xl sm:text-5xl lg:text-6xl text-gray-300 mx-auto mb-3 sm:mb-4" />
            <p className="text-gray-500 text-xs sm:text-sm lg:text-lg px-4">
              {filter === "all" 
                ? "No images yet. Upload your first image!" 
                : `No ${filter} images found`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3 lg:gap-4">
            {filteredImages.map((img) => (
              <div key={img.id} className="relative group">
                {/* Image */}
                <div className="relative overflow-hidden rounded-md sm:rounded-lg lg:rounded-xl shadow-md hover:shadow-xl transition-all">
                  <img
                    src={img.image_url}
                    alt={img.title}
                    className="w-full h-28 sm:h-32 md:h-40 lg:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Category Badge */}
                  <span className={`absolute top-1 right-1 sm:top-2 sm:right-2 text-white text-[9px] sm:text-[10px] lg:text-xs font-semibold capitalize ${getCategoryBadgeColor(img.category)} px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full shadow-lg`}>
                    {img.category}
                  </span>

                  {/* Desktop Hover Overlay */}
                  <div className="hidden sm:flex absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex-col items-center justify-center gap-2 p-2">
                    <button
                      onClick={() => {
                        setSelectedImage(img);
                        setShowImageModal(true);
                      }}
                      className="bg-blue-600 text-white p-2 sm:p-3 rounded-lg hover:bg-blue-700 transition-all"
                    >
                      <FaEye className="text-sm sm:text-base" />
                    </button>
                    <button
                      onClick={() => handleDeleteImage(img.id)}
                      className="bg-red-600 text-white p-2 sm:p-3 rounded-lg hover:bg-red-700 transition-all"
                    >
                      <FaTrash className="text-sm sm:text-base" />
                    </button>
                  </div>
                </div>

                {/* Title & Mobile Actions */}
                <div className="mt-1.5 sm:mt-2">
                  <p className="text-[10px] sm:text-xs lg:text-sm text-gray-700 truncate font-medium">{img.title}</p>
                  
                  {/* Mobile Action Buttons */}
                  <div className="flex sm:hidden gap-1.5 mt-1.5">
                    <button
                      onClick={() => {
                        setSelectedImage(img);
                        setShowImageModal(true);
                      }}
                      className="flex-1 bg-blue-600 text-white px-2 py-1 rounded-md text-[10px] font-semibold flex items-center justify-center gap-1"
                    >
                      <FaEye className="text-[9px]" /> View
                    </button>
                    <button
                      onClick={() => handleDeleteImage(img.id)}
                      className="flex-1 bg-red-600 text-white px-2 py-1 rounded-md text-[10px] font-semibold flex items-center justify-center gap-1"
                    >
                      <FaTrash className="text-[9px]" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {showImageModal && selectedImage && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4" onClick={() => setShowImageModal(false)}>
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute -top-10 sm:-top-12 right-0 text-white hover:text-red-500 transition-colors"
            >
              <FaTimes className="text-2xl sm:text-3xl" />
            </button>
            <img
              src={selectedImage.image_url}
              alt={selectedImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg sm:rounded-xl shadow-2xl"
            />
            <div className="bg-white mt-3 sm:mt-4 p-3 sm:p-4 rounded-lg sm:rounded-xl">
              <h3 className="text-base sm:text-xl font-bold text-gray-800">{selectedImage.title}</h3>
              <span className={`inline-block mt-2 text-white text-[10px] sm:text-xs font-semibold capitalize ${getCategoryBadgeColor(selectedImage.category)} px-2 sm:px-3 py-1 rounded-full`}>
                {selectedImage.category}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
          <div className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Upload New Image</h3>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadForm({ title: "", category: "vehicles", image: null });
                }}
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                <FaTimes className="text-lg sm:text-xl" />
              </button>
            </div>
            
            <form onSubmit={handleUpload} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">
                  Image Title *
                </label>
                <input
                  type="text"
                  value={uploadForm.title}
                  onChange={(e) => setUploadForm({...uploadForm, title: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-red-500 focus:outline-none text-xs sm:text-sm lg:text-base"
                  placeholder="e.g., Wheelchair Van"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">
                  Category *
                </label>
                <select
                  value={uploadForm.category}
                  onChange={(e) => setUploadForm({...uploadForm, category: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-red-500 focus:outline-none text-xs sm:text-sm lg:text-base"
                >
                  <option value="vehicles">Vehicles 🚗</option>
                  <option value="interior">Interior 🪑</option>
                  <option value="staff">Staff 👥</option>
                </select>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">
                  Select Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setUploadForm({...uploadForm, image: e.target.files[0]})}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-red-500 focus:outline-none text-xs sm:text-sm lg:text-base file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-full file:border-0 file:bg-red-50 file:text-red-700 hover:file:bg-red-100 file:text-[10px] sm:file:text-xs lg:file:text-sm file:font-semibold"
                  required
                />
                {uploadForm.image && (
                  <p className="text-[10px] sm:text-xs lg:text-sm text-green-600 mt-2 flex items-center gap-2">
                    ✅ Selected: {uploadForm.image.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4 pt-3 sm:pt-4">
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl font-semibold hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs sm:text-sm lg:text-base"
                >
                  {uploading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FaUpload />
                      Upload Image
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowUploadModal(false);
                    setUploadForm({ title: "", category: "vehicles", image: null });
                  }}
                  disabled={uploading}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 sm:py-2.5 lg:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-gray-300 transition-all disabled:opacity-50 text-xs sm:text-sm lg:text-base"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}