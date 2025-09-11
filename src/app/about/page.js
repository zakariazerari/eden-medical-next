"use client";
import Image from "next/image";

export default function About() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-white to-indigo-50 py-24" id="about">
      {/* خلفية ديكور خفيف */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute rounded-full bg-violet-300 opacity-20 w-72 h-72 top-10 left-10 blur-3xl animate-pulse"></div>
        <div className="absolute rounded-full bg-blue-200 opacity-30 w-96 h-96 bottom-14 right-10 blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-24">
        <h2 className="text-5xl font-extrabold text-center text-violet-800 mb-16 drop-shadow-2xl transform transition-all duration-700 hover:scale-105">
          About Eden Medical Transport
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-center perspective-normal transform-style-3d">
          <div className="space-y-6 text-gray-800 text-lg leading-relaxed">
            <p className="transform transition-transform duration-500 hover:-rotate-y-2 hover:translate-x-2">
              <strong className="text-violet-700 font-semibold">Eden Medical Transport</strong> is more than just a ride — it’s a promise of care. We specialize in non-emergency medical transportation services designed to meet the needs of those who require safe, respectful, and dependable travel to and from their medical appointments.
            </p>
            <p className="transform transition-transform duration-500 hover:-rotate-y-2 hover:translate-x-2">
              Our team consists of highly trained professionals — from dispatchers to drivers — who prioritize punctuality, empathy, and excellence.
            </p>
            <p className="transform transition-transform duration-500 hover:-rotate-y-2 hover:translate-x-2">
              We proudly maintain a modern fleet of clean, wheelchair-accessible, smoke-free vehicles that are regularly sanitized and maintained.
            </p>
            <p className="transform transition-transform duration-500 hover:-rotate-y-2 hover:translate-x-2">
              At Eden, we don’t just transport — we care. We bridge the gap between medical needs and human dignity.
            </p>
            <p className="text-violet-700 font-semibold transform transition-transform duration-500 hover:-rotate-y-2 hover:translate-x-2">
              Your health matters — and so does how you get there.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-violet-100 transform transition-transform duration-700 hover:scale-110 hover:rotate-y-6">
            <Image
              src="/image3.jpg"
              alt="Eden Medical Transport Vehicle"
              width={600}
              height={400}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}