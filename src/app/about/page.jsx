  // app/about/page.js

"use client";
import Image from "next/image";
import ParticlesMaskBG from "../components/ParticlesMaskBG";
import { FaAward, FaUsers, FaHeart, FaShieldAlt } from "react-icons/fa";

export default function About() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 py-24">
        <div className="absolute inset-0 z-0">
          <ParticlesMaskBG />
        </div>
        
        <div className="container mx-auto px-6 lg:px-24 relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold text-center text-gray-900 mb-6">About Eden Medical Transport</h1>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            More than a ride - a promise of care, dignity, and professional medical transportation across California
          </p>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                <strong className="text-red-700 text-xl">Eden Medical Transport</strong> was founded with a simple mission: provide safe, reliable, and compassionate non-emergency medical transportation for those who need it most.
              </p>
              <p>
                Since 2014, we've served thousands of patients across California, helping them reach critical medical appointments, dialysis treatments, therapy sessions, and hospital visits with dignity and comfort.
              </p>
              <p>
                Our fleet of modern, wheelchair-accessible vehicles is maintained to the highest standards. Every driver is a certified EMR with extensive training in patient care, ensuring your safety and comfort throughout your journey.
              </p>
              <p className="text-blue-700 font-semibold text-xl">
                Your health matters. So does how you get there.
              </p>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-red-200 transform hover:scale-105 transition-transform duration-500">
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

          {/* Mission, Vision, Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all">
              <FaHeart className="text-5xl text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                Provide compassionate, reliable medical transportation that puts patient dignity and safety first.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all">
              <FaShieldAlt className="text-5xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                Be California's most trusted medical transport provider, setting the standard for excellence.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all">
              <FaUsers className="text-5xl text-gray-700 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h3>
              <p className="text-gray-600">
                Compassion, reliability, safety, dignity, and professionalism in every ride.
              </p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-24">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">Our Journey</h2>
            <div className="space-y-8 max-w-4xl mx-auto">
              {[
                { year: "2014", title: "Founded", desc: "Eden Medical Transport established with 2 vehicles and a vision" },
                { year: "2016", title: "Expansion", desc: "Expanded to serve all major California counties" },
                { year: "2019", title: "Recognition", desc: "Awarded 'Best Medical Transport Service' by CA Healthcare Association" },
                { year: "2022", title: "Milestone", desc: "Completed 5,000+ safe rides with 98% on-time rate" },
                { year: "2024", title: "Innovation", desc: "Launched online booking system and mobile app" }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className={`flex-shrink-0 w-24 h-24 ${i % 2 === 0 ? 'bg-gradient-to-br from-red-600 to-red-700' : 'bg-gradient-to-br from-blue-600 to-blue-700'} rounded-full flex items-center justify-center shadow-xl`}>
                    <span className="text-white font-bold text-lg">{item.year}</span>
                  </div>
                  <div className="flex-1 bg-white p-6 rounded-xl shadow-lg">
                    <h3 className={`text-xl font-bold ${i % 2 === 0 ? 'text-red-700' : 'text-blue-700'} mb-2`}>{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-12 rounded-3xl shadow-2xl">
            <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Certified & Trusted</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <FaAward className="text-5xl text-yellow-500 mx-auto mb-3" />
                <p className="font-bold text-gray-800">Licensed by CA DMV</p>
              </div>
              <div>
                <FaAward className="text-5xl text-yellow-500 mx-auto mb-3" />
                <p className="font-bold text-gray-800">Certified EMR Staff</p>
              </div>
              <div>
                <FaAward className="text-5xl text-yellow-500 mx-auto mb-3" />
                <p className="font-bold text-gray-800">Insured & Bonded</p>
              </div>
              <div>
                <FaAward className="text-5xl text-yellow-500 mx-auto mb-3" />
                <p className="font-bold text-gray-800">ADA Compliant</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}