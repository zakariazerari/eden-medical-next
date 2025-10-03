// ═══════════════════════════════════════════════════════════════
// 🖼️ GALLERY PAGE - ENHANCED WITH CATEGORIES & BETTER LIGHTBOX
// ═══════════════════════════════════════════════════════════════
// app/gallery/page.js

"use client";
import { useState } from "react";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";

const galleryImages = [
  { src: "/image1.jpg", category: "vehicles", title: "Wheelchair Accessible Van" },
  { src: "/image3.jpg", category: "vehicles", title: "Medical Transport Vehicle" },
  { src: "/image4.jpg", category: "vehicles", title: "Sedan Service" },
  { src: "/image1.jpg", category: "interior", title: "Comfortable Interior" },
  { src: "/image3.jpg", category: "staff", title: "Professional Team" },
  { src: "/image4.jpg", category: "vehicles", title: "Fleet Overview" },
];

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const categories = ["all", "vehicles", "interior", "staff"];
  const filtered = filter === "all" ? galleryImages : galleryImages.filter(img => img.category === filter);

  const openLightbox = (index) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const nextImage = () => setLightbox(prev => ({ ...prev, index: (prev.index + 1) % filtered.length }));
  const prevImage = () => setLightbox(prev => ({ ...prev, index: (prev.index - 1 + filtered.length) % filtered.length }));

  return (
    <section className="relative bg-gradient-to-br from-indigo-50 via-white to-violet-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-center text-violet-800 mb-6">Our Gallery</h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Take a look at our modern fleet and professional service
        </p>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-3 rounded-xl font-semibold capitalize transition-all ${
                filter === cat
                  ? "bg-violet-600 text-white shadow-lg scale-105"
                  : "bg-white text-violet-600 hover:bg-violet-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((img, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300"
            >
              <Image
                src={img.src}
                alt={img.title}
                width={400}
                height={300}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <p className="text-white font-bold">{img.title}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox.open && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={closeLightbox}>
            <button onClick={closeLightbox} className="absolute top-6 right-6 text-white text-4xl hover:text-violet-400 transition z-10">
              <FaTimes />
            </button>
            
            <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="absolute left-6 text-white text-5xl hover:text-violet-400 transition">‹</button>
            
            <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={filtered[lightbox.index].src}
                alt={filtered[lightbox.index].title}
                width={1200}
                height={800}
                className="w-full h-auto rounded-xl"
              />
              <p className="text-white text-center mt-4 text-xl font-bold">{filtered[lightbox.index].title}</p>
            </div>
            
            <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="absolute right-6 text-white text-5xl hover:text-violet-400 transition">›</button>
          </div>
        )}
      </div>
    </section>
  );
}