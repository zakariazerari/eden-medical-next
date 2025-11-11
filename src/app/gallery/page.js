"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaTimes, FaSpinner } from "react-icons/fa";

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      // ✅ Load 50 images
      const res = await fetch("/api/gallery?limit=50");
      const data = await res.json();
      
      // Handle both array and object responses
      if (Array.isArray(data)) {
        setImages(data);
      } else if (data.images && Array.isArray(data.images)) {
        setImages(data.images);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories
  const categories = ["all", ...new Set(images.map(img => img.category))];
  
  // Filter images
  const filtered = filter === "all" 
    ? images 
    : images.filter(img => img.category === filter);

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  
  const nextImage = () => {
    setLightbox(prev => ({ 
      ...prev, 
      index: (prev.index + 1) % filtered.length 
    }));
  };
  
  const prevImage = () => {
    setLightbox(prev => ({ 
      ...prev, 
      index: (prev.index - 1 + filtered.length) % filtered.length 
    }));
  };

  // Keyboard navigation for accessibility
  useEffect(() => {
    if (!lightbox.open) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.open, lightbox.index, filtered.length]);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-20">
        <div className="text-center">
          <FaSpinner className="animate-spin text-6xl text-red-600 mx-auto mb-4" />
          <p className="text-gray-600 font-semibold text-xl">Loading Gallery...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-24 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            Our Gallery
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Take a look at our modern fleet and professional service
          </p>
        </div>

        {/* Filter Buttons */}
        {categories.length > 1 && (
          <div className="flex justify-center gap-3 md:gap-4 mb-12 flex-wrap">
            {categories.map((cat) => {
              const isActive = filter === cat;
              const isRed = categories.indexOf(cat) % 2 === 0;
              
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold capitalize transition-all text-sm md:text-base ${
                    isActive
                      ? isRed
                        ? "bg-red-600 text-white shadow-lg scale-105"
                        : "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-600 border border-gray-300"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {/* Gallery Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-gray-500 text-xl mb-2">No images available yet</p>
            <p className="text-gray-400">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => openLightbox(idx)}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 aspect-square bg-gray-200"
              >
                {/* Next.js Image with lazy loading */}
                <Image
                  src={img.image_url || '/placeholder.jpg'}
                  alt={img.title || 'Gallery image'}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                  quality={75}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div>
                    <p className="text-white font-bold text-base md:text-lg">{img.title}</p>
                    <p className="text-white/80 text-xs md:text-sm capitalize">{img.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {lightbox.open && filtered.length > 0 && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" 
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close Button */}
            <button 
              onClick={closeLightbox} 
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white text-3xl md:text-4xl hover:text-red-400 transition z-10 w-12 h-12 flex items-center justify-center"
              aria-label="Close lightbox"
            >
              <FaTimes />
            </button>
            
            {/* Navigation Buttons */}
            {filtered.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }} 
                  className="absolute left-2 md:left-6 text-white text-4xl md:text-5xl hover:text-red-400 transition w-12 h-12 flex items-center justify-center"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }} 
                  className="absolute right-2 md:right-6 text-white text-4xl md:text-5xl hover:text-red-400 transition w-12 h-12 flex items-center justify-center"
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
            
            {/* Image Container */}
            <div className="max-w-5xl w-full relative" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <Image
                  src={filtered[lightbox.index]?.image_url || '/placeholder.jpg'}
                  alt={filtered[lightbox.index]?.title || 'Gallery image'}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-contain rounded-xl"
                  priority
                  quality={90}
                />
              </div>
              
              {/* Image Info */}
              <div className="text-center mt-4">
                <p className="text-white text-lg md:text-xl font-bold">
                  {filtered[lightbox.index]?.title}
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  {lightbox.index + 1} / {filtered.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}