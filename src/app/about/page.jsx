// app/about/page.js

"use client";
import Image from "next/image";
import ParticlesMaskBG from "../components/ParticlesMaskBG";
import { FaAward, FaUsers, FaHeart, FaShieldAlt, FaCar, FaCheckCircle, FaStar, FaHandshake } from "react-icons/fa";

export default function About() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-blue-50 py-16 md:py-24 lg:py-32">
        <div className="absolute inset-0 z-0">
          <ParticlesMaskBG />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 xl:px-24 relative z-10">
          {/* Hero Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-4 md:mb-6">
              About <span className="text-red-600">Eden Transport</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
              More than a ride - a promise of comfort, reliability, and professional transportation services across California
            </p>
          </div>

          {/* Main Story Section */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 md:mb-24">
            <div className="space-y-4 md:space-y-6 text-gray-700 text-base md:text-lg leading-relaxed order-2 lg:order-1">
              <p className="text-lg md:text-xl">
                <strong className="text-red-700 text-xl md:text-2xl block mb-2">Eden Transport Services</strong>
                Founded with a simple mission: provide safe, reliable, and comfortable transportation for everyone who needs it.
              </p>
              <p>
                Since <strong className="text-blue-700">2011</strong>, we've served <strong className="text-red-700">thousands of customers</strong> across California, helping them reach important appointments, school, work, shopping, and any destination with comfort and peace of mind.
              </p>
              <p>
                Our fleet of modern, comfortable vehicles is maintained to the highest standards. Every driver is professionally trained, background-checked, and certified, ensuring your safety and comfort throughout your journey.
              </p>
              <div className="bg-gradient-to-r from-blue-50 to-red-50 p-4 md:p-6 rounded-xl border-l-4 border-blue-600">
                <p className="text-blue-800 font-semibold text-lg md:text-xl italic">
                  "Your destination matters. So does how you get there."
                </p>
              </div>
            </div>

            <div className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 border-red-200 transform hover:scale-105 transition-transform duration-500 order-1 lg:order-2">
              <Image
                src="/image3.jpg"
                alt="Eden Transport Vehicle"
                width={600}
                height={400}
                className="w-full h-64 md:h-80 lg:h-96 object-cover"
                priority
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 md:mb-24">
            {[
              { number: "50K+", label: "Safe Rides", icon: FaCar, color: "red" },
              { number: "98%", label: "On-Time Rate", icon: FaCheckCircle, color: "green" },
              { number: "24/7", label: "Available", icon: FaStar, color: "yellow" },
              { number: "10+", label: "Years Experience", icon: FaAward, color: "blue" }
            ].map((stat, i) => (
              <div key={i} className={`bg-white p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg text-center transform hover:scale-105 transition-all border-t-4 ${
                stat.color === 'red' ? 'border-red-600' :
                stat.color === 'green' ? 'border-green-600' :
                stat.color === 'yellow' ? 'border-yellow-500' :
                'border-blue-600'
              }`}>
                <stat.icon className={`text-3xl md:text-4xl mx-auto mb-2 md:mb-3 ${
                  stat.color === 'red' ? 'text-red-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'yellow' ? 'text-yellow-500' :
                  'text-blue-600'
                }`} />
                <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1">{stat.number}</p>
                <p className="text-xs md:text-sm text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
            <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all border-b-4 border-red-600">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaHeart className="text-3xl md:text-4xl text-red-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Our Mission</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Provide reliable, comfortable transportation that puts customer satisfaction and safety first, every single ride.
              </p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all border-b-4 border-blue-600">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-3xl md:text-4xl text-blue-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Our Vision</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Be California's most trusted transportation provider, setting the standard for excellence in service.
              </p>
            </div>
            
            <div className="bg-white p-6 md:p-8 rounded-xl md:rounded-2xl shadow-xl text-center transform hover:-translate-y-2 transition-all border-b-4 border-gray-600 sm:col-span-2 lg:col-span-1">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-3xl md:text-4xl text-gray-700" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Our Values</h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Reliability, safety, comfort, professionalism, and customer care in every single journey.
              </p>
            </div>
          </div>

          {/* Why Choose Us */}
          <div className="bg-gradient-to-br from-blue-50 to-white p-6 md:p-12 rounded-2xl md:rounded-3xl shadow-2xl mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-8 md:mb-12">Why Choose Eden Transport?</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {[
                { icon: FaCheckCircle, title: "Professional Drivers", desc: "Background-checked, trained, and certified professionals" },
                { icon: FaCar, title: "Modern Fleet", desc: "Well-maintained, comfortable vehicles with latest safety features" },
                { icon: FaStar, title: "98% On-Time", desc: "Exceptional punctuality rate for all appointments" },
                { icon: FaShieldAlt, title: "Fully Insured", desc: "Comprehensive insurance for your peace of mind" },
                { icon: FaHandshake, title: "Customer First", desc: "Dedicated to your comfort and satisfaction" },
                { icon: FaAward, title: "Licensed & Certified", desc: "All required permits and certifications in place" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 md:gap-4 items-start bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                  <item.icon className="text-2xl md:text-3xl text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">{item.title}</h4>
                    <p className="text-xs md:text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-8 md:mb-12">Our Journey</h2>
            <div className="space-y-6 md:space-y-8 max-w-4xl mx-auto">
              {[
                { year: "2014", title: "Founded", desc: "Eden Medical transport establish with 2 vehicle and a vision to serve the Bay Area and surrounding areas with reliable wheelchair, gurney and ambulatory transportation" },
                { year: "2016", title: "Expansion", desc: "coming soon..." },
                { year: "2019", title: "Recognition", desc: "Awarded 'Best Transport Service' by California Business Association" },
                { year: "2022", title: "Milestone", desc: "Completed 50,000+ safe rides with industry-leading 98% on-time rate" },
                { year: "2024", title: "Innovation", desc: "Online booking for easier reservation" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row gap-4 md:gap-6 items-start">
                  <div className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 ${i % 2 === 0 ? 'bg-gradient-to-br from-red-600 to-red-700' : 'bg-gradient-to-br from-blue-600 to-blue-700'} rounded-full flex items-center justify-center shadow-xl`}>
                    <span className="text-white font-bold text-base md:text-lg">{item.year}</span>
                  </div>
                  <div className="flex-1 bg-white p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <h3 className={`text-lg md:text-xl font-bold ${i % 2 === 0 ? 'text-red-700' : 'text-blue-700'} mb-2`}>{item.title}</h3>
                    <p className="text-sm md:text-base text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-gradient-to-br from-gray-900 to-blue-900 p-8 md:p-12 rounded-2xl md:rounded-3xl shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white mb-6 md:mb-8">Certified & Trusted</h2>
            <p className="text-center text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
              We maintain all required licenses, certifications, and insurance to provide you with safe, legal, and professional transportation services.
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 text-center">
              {[
                { title: "Licensed by CA DMV", icon: FaAward },
                { title: "Professional Drivers", icon: FaCar },
                { title: "Insured & Bonded", icon: FaShieldAlt },
                { title: "24/7 Available", icon: FaStar }
              ].map((cert, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm p-4 md:p-6 rounded-xl hover:bg-white/20 transition-all">
                  <cert.icon className="text-4xl md:text-5xl text-yellow-400 mx-auto mb-3 md:mb-4" />
                  <p className="font-bold text-white text-sm md:text-base">{cert.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}