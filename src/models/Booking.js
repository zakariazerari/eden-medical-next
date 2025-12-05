import mongoose from "mongoose";

// ✅ FORCE DELETE OLD CACHED MODEL
if (mongoose.models.Booking) {
  delete mongoose.models.Booking;
  delete mongoose.connection.models.Booking;
}

const bookingSchema = new mongoose.Schema({
  serviceType: { 
    type: String, 
    required: true,
    enum: ['Non-Emergency']
  },
  mobility: { 
    type: String, 
    required: true,
    enum: ['Wheelchair', 'Stretcher', 'Sedan', 'Stair Assistance']
  },
  date: { 
    type: Date, 
    required: true,
    index: true
  },
  time: { 
    type: String, 
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  },
  appointmentTime: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  },
  returnTime: {
    type: String,
    required: false,
    default: '',
    match: /^$|^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  },
  pickup: { 
    type: String, 
    required: true,
    maxlength: 200
  },
  destination: { 
    type: String, 
    required: true,
    maxlength: 200
  },
  patientName: { 
    type: String, 
    required: true,
    maxlength: 100
  },
  phone: { 
    type: String, 
    required: true,
    maxlength: 15
  },
  email: { 
    type: String, 
    required: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  paymentMethod: { 
    type: String, 
    required: true,
    enum: ['Cash', 'Credit Card', 'Zelle']
  },
  specialNotes: { 
    type: String,
    maxlength: 1000,
    default: ''
  },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'canceled'],
    default: 'pending'
  },
  ipAddress: {
    type: String,
    select: false
  }
}, { 
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.ipAddress;
      delete ret.__v;
      return ret;
    }
  }
});

// Indexes for performance
bookingSchema.index({ createdAt: -1 });
bookingSchema.index({ status: 1, date: 1 });
bookingSchema.index({ status: 1, createdAt: -1 });

// ✅ CREATE NEW MODEL
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;