import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  serviceType: String,
  mobility: String,
  date: Date,
  time: String,
  pickup: String,
  destination: String,
  patientName: String,
  phone: String,
  email: String,
  paymentMethod: String,
  specialNotes: String,
  status: { type: String, default: "pending" }, // pending / confirmed / canceled
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model("Booking", bookingSchema);
