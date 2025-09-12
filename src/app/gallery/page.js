"use client";
import { useState } from "react";

const images = [
  "/image1.jpg", 
  "/image3.jpg",
  "/image4.jpg",
];

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (idx) => {
    setCurrentIndex(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const prevImage = () =>
    setCurrentIndex((currentIndex + images.length - 1) % images.length);
  const nextImage = () =>
    setCurrentIndex((currentIndex + 1) % images.length);

  return (
    <section
      id="gallery"
      className="relative bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-violet-800 mb-12 drop-shadow-lg">
          Our Gallery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((src, idx) => (
            <div
              key={idx}
              className="overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:rotate-1 hover:shadow-2xl"
              onClick={() => openLightbox(idx)}
            >
              <img
                src={src}
                alt={`Gallery image ${idx + 1}`}
                className="w-full h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-5 text-white text-4xl hover:text-violet-400 transition"
          >
            ‹
          </button>

          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-full rounded-lg"
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-5 text-white text-4xl hover:text-violet-400 transition"
          >
            ›
          </button>

          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white text-3xl hover:text-violet-400 transition"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
