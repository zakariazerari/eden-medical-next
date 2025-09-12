"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaExclamationTriangle } from "react-icons/fa";
import FloatingBubbles from "./components/FloatingBulbbles";
;

export default function HomePage() {
  const [formData, setFormData] = useState({
    serviceType: "Non-Emergency",
    mobility: "Wheelchair",
    date: "",
    time: "",
    pickup: "",
    destination: "",
    patientName: "",
    phone: "",
    email: "",
    paymentMethod: "",
    specialNotes: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErr = { ...prev };
        delete newErr[name];
        return newErr;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.time) newErrors.time = "Time is required.";
    if (!formData.pickup.trim())
      newErrors.pickup = "Pick-up address is required.";
    if (!formData.destination.trim())
      newErrors.destination = "Destination address is required.";
    if (!formData.patientName.trim())
      newErrors.patientName = "Patient name is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.paymentMethod.trim())
      newErrors.paymentMethod = "Please select a payment method.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("❗ Please fill in all required fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("✅ Booking submitted successfully!");
        setFormData({
          serviceType: "Non-Emergency",
          mobility: "Wheelchair",
          date: "",
          time: "",
          pickup: "",
          destination: "",
          patientName: "",
          phone: "",
          email: "",
          paymentMethod: "",
          specialNotes: "",
        });
        setErrors({});
      } else {
        toast.error("❌ Error: " + (data.message || "Something went wrong"));
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("⚠ Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-white to-blue-100 text-gray-800 overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat px-6 py-20 flex items-center justify-center min-h-[600px]"
        style={{ backgroundImage: "url('/image3.jpg')" }}
      >
        <div className="absolute inset-0 bg-indigo-900 opacity-40"></div>
        <div className="relative z-10 max-w-4xl text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 drop-shadow-md text-violet-100">
            Comfortable and Safe Medical Transportation for All Your Healthcare
            Needs
          </h2>
          <p className="text-lg md:text-xl mb-8 text-indigo-100">
            Eden Medical Transport offers non-emergency medical transport
            services with the highest level of comfort and safety in California.
          </p>
          <a
            href="#book"
            className="bg-gradient-to-r from-violet-600 to-blue-500 text-white px-6 py-4 rounded-lg font-semibold hover:shadow-xl transition-all"
          >
            Book Now
          </a>
        </div>
      </section>

      {/* Booking Section */}
      <section
        className="relative min-h-screen flex items-center justify-center px-4 py-10 overflow-hidden bg-gradient-to-br from-indigo-100 via-white to-blue-100"
        id="book"
      >
        <FloatingBubbles />

        <div className="relative z-10 backdrop-blur-md bg-white/80 border border-white/30 shadow-[0_15px_40px_rgba(0,0,0,0.2)] rounded-3xl w-full max-w-4xl p-10">
          <h2 className="text-4xl font-extrabold text-center text-violet-800 mb-10 drop-shadow-lg">
            Book a Medical Ride
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service & Mobility */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold block mb-2">
                  Type of Service
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-violet-500 bg-white"
                >
                  <option>Non-Emergency</option>
                  <option>Emergency</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2">
                  Mobility
                </label>
                <select
                  name="mobility"
                  value={formData.mobility}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-violet-500 bg-white"
                >
                  <option>Wheelchair</option>
                  <option>Stretcher</option>
                  <option>Sedan</option>
                </select>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold block mb-2">
                  Transport Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.date ? "border-red-500" : "border-gray-300"
                  } rounded-xl shadow-inner focus:ring-2 focus:ring-violet-500 bg-white`}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-500" />
                    {errors.date}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2">
                  Pick-Up Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.time ? "border-red-500" : "border-gray-300"
                  } rounded-xl shadow-inner focus:ring-2 focus:ring-violet-500 bg-white`}
                />
                {errors.time && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-500" />
                    {errors.time}
                  </p>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="text-sm font-semibold block mb-2">
                Pick-Up Address
              </label>
              <input
                type="text"
                name="pickup"
                placeholder="123 Main St"
                value={formData.pickup}
                onChange={handleChange}
                className={`w-full p-3 border ${
                  errors.pickup ? "border-red-500" : "border-gray-300"
                } rounded-xl shadow-inner focus:ring-2 focus:ring-violet-500 bg-white`}
              />
              {errors.pickup && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-2">
                  <FaExclamationTriangle className="text-red-500" />
                  {errors.pickup}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold block mb-2">
                Destination Address
              </label>
              <input
                type="text"
                name="destination"
                placeholder="456 Elm St"
                value={formData.destination}
                onChange={handleChange}
                className={`w-full p-3 border ${
                  errors.destination ? "border-red-500" : "border-gray-300"
                } rounded-xl shadow-inner focus:ring-2 focus:ring-violet-500 bg-white`}
              />
              {errors.destination && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-2">
                  <FaExclamationTriangle className="text-red-500" />
                  {errors.destination}
                </p>
              )}
            </div>

            {/* Contact */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold block mb-2">
                  Patient's Name
                </label>
                <input
                  type="text"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.patientName ? "border-red-500" : "border-gray-300"
                  } rounded-xl shadow-inner focus:ring-2 focus:ring-violet-500 bg-white`}
                />
                {errors.patientName && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-500" />
                    {errors.patientName}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } rounded-xl shadow-inner focus:ring-2 focus:ring-violet-500 bg-white`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-500" />
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-xl shadow-inner focus:ring-2 focus:ring-violet-500 bg-white`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-500" />
                    {errors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm font-semibold block mb-2">
                  Payment Method
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.paymentMethod ? "border-red-500" : "border-gray-300"
                  } rounded-xl shadow-inner focus:ring-2 focus:ring-violet-500 bg-white`}
                >
                  <option value="">Select payment method</option>
                  <option>Cash</option>
                  <option>Credit Card</option>
                  <option>Zelle</option>
                  <option>Insurance</option>
                </select>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-2">
                    <FaExclamationTriangle className="text-red-500" />
                    {errors.paymentMethod}
                  </p>
                )}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="text-sm font-semibold block mb-2">
                Special Requirements
              </label>
              <textarea
                rows="4"
                name="specialNotes"
                value={formData.specialNotes}
                onChange={handleChange}
                placeholder="Any instructions..."
                className="w-full p-3 border border-gray-300 rounded-xl shadow-inner focus:ring-2 focus:ring-violet-500 bg-white"
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-violet-600 text-white py-3 rounded-xl transition text-lg font-semibold shadow-lg ${
                submitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-violet-700"
              }`}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-violet-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-violet-800 mb-12 drop-shadow-xl animate-bounce">
            WHY CHOOSE EDEN?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-2 hover:rotate-1 duration-300">
              <div className="text-violet-700 text-3xl mb-4">♿</div>
              <h4 className="text-xl font-semibold text-violet-800 mb-3">
                Accessibility
              </h4>
              <p className="text-gray-600">
                Personalized wheelchair & non-emergency transport services
                tailored to your needs.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-2 hover:rotate-1 duration-300">
              <div className="text-violet-700 text-3xl mb-4">🚑</div>
              <h4 className="text-xl font-semibold text-violet-800 mb-3">
                Safe & Certified
              </h4>
              <p className="text-gray-600">
                Certified EMRs ride along every gurney van ensuring full medical
                support.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-transform hover:-translate-y-2 hover:rotate-1 duration-300">
              <div className="text-violet-700 text-3xl mb-4">⏱</div>
              <h4 className="text-xl font-semibold text-violet-800 mb-3">
                On-Time Always
              </h4>
              <p className="text-gray-600">
                Doctor appointments, rehab centers or any medical visit – always
                on schedule.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
