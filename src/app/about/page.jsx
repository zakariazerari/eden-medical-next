
import Image from "next/image";
import ParticlesMaskBG from "../components/ParticlesMaskBG";

export default function About() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-white to-indigo-50 py-24" id="about">
       <div className="absolute inset-0 z-0">
       <ParticlesMaskBG />
        </div>
      <div className="container mx-auto px-6 lg:px-24 relative z-10">
        <h2 className="text-5xl font-extrabold text-center text-violet-800 mb-16 drop-shadow-2xl transform transition-all duration-700 hover:scale-105">
          About Eden Medical Transport
        </h2>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-gray-800 text-lg leading-relaxed">
            <p>
              <strong className="text-violet-700 font-semibold">Eden Medical Transport</strong> is more than just a ride — it’s a promise of care. We specialize in non-emergency medical transportation services designed to meet the needs of those who require safe, respectful, and dependable travel to and from their medical appointments.
            </p>
            <p>
              Our team consists of highly trained professionals — from dispatchers to drivers — who prioritize punctuality, empathy, and excellence.
            </p>
            <p>
              We proudly maintain a modern fleet of clean, wheelchair-accessible, smoke-free vehicles that are regularly sanitized and maintained.
            </p>
            <p>
              At Eden, we don’t just transport — we care. We bridge the gap between medical needs and human dignity.
            </p>
            <p className="text-violet-700 font-semibold">
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