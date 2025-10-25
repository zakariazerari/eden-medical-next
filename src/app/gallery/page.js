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
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["all", ...new Set(images.map(img => img.category))];
  const filtered = filter === "all" ? images : images.filter(img => img.category === filter);

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const nextImage = () => setLightbox(prev => ({ ...prev, index: (prev.index + 1) % filtered.length }));
  const prevImage = () => setLightbox(prev => ({ ...prev, index: (prev.index - 1 + filtered.length) % filtered.length }));

  // ✅ Keyboard navigation for accessibility
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
        <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-6">Our Gallery</h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Take a look at our modern fleet and professional service
        </p>

        {/* Filter Buttons */}
        {categories.length > 1 && (
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all ${
                  filter === cat
                    ? idx % 2 === 0 
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg scale-105"
                      : "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">No images available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => openLightbox(idx)}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 aspect-square"
              >
                {/* ✅ OPTIMIZED: Using Next.js Image */}
                <Image
                  src={img.image_url}
                  alt={img.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                  quality={75}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white font-bold text-lg">{img.title}</p>
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
              className="absolute top-6 right-6 text-white text-4xl hover:text-red-400 transition z-10"
              aria-label="Close lightbox"
            >
              <FaTimes />
            </button>
            
            {/* Navigation Buttons */}
            {filtered.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); prevImage(); }} 
                  className="absolute left-6 text-white text-5xl hover:text-red-400 transition"
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextImage(); }} 
                  className="absolute right-6 text-white text-5xl hover:text-red-400 transition"
                  aria-label="Next image"
                >
                  ›
                </button>
              </>
            )}
            
            {/* Image Container */}
            <div className="max-w-5xl w-full relative" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                {/* ✅ OPTIMIZED: Using Next.js Image in lightbox */}
                <Image
                  src={filtered[lightbox.index].image_url}
                  alt={filtered[lightbox.index].title}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-contain rounded-xl"
                  priority
                  quality={90}
                />
              </div>
              <p className="text-white text-center mt-4 text-xl font-bold">
                {filtered[lightbox.index].title}
              </p>
              <p className="text-gray-400 text-center text-sm mt-2">
                {lightbox.index + 1} / {filtered.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}