// models/ContactMessage.js
import mongoose from "mongoose";

const ContactMessageSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true,
    maxlength: 100,
    trim: true
  },
  email: { 
    type: String, 
    required: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  phone: { 
    type: String,
    maxlength: 15,
    default: ''
  },
  message: { 
    type: String, 
    required: true,
    maxlength: 1000,
    minlength: 5
  },
  status: { 
    type: String,
    enum: ['pending', 'confirmed', 'canceled'],
    default: 'pending',
    // Removed index: true to avoid duplicate
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

// Indexes for better performance
ContactMessageSchema.index({ createdAt: -1 });
ContactMessageSchema.index({ status: 1 });

export default mongoose.models.ContactMessage || mongoose.model("ContactMessage", ContactMessageSchema);