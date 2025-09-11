import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  serviceType: String,
  mobility: String,
  date: String,
  time: String,
  pickup: String,
  destination: String,
  patientName: String,
  phone: String,
  email: String,
  paymentMethod: String,
  specialNotes: String,
}, { timestamps: true });

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;