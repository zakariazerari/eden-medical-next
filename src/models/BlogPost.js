// models/BlogPost.js
import mongoose from "mongoose"

const BlogPostSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    maxlength: 200,
    trim: true
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: { 
    type: String, 
    required: true,
    maxlength: 300
  },
  content: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String,
    default: '/blog-default.jpg'
  },
  category: { 
    type: String, 
    enum: ['Health Tips', 'Transportation', 'Industry News', 'Patient Stories', 'Guides'],
    default: 'Transportation'
  },
  tags: [{ 
    type: String,
    trim: true
  }],
  author: { 
    type: String, 
    default: 'Eden Medical Team' 
  },
  published: { 
    type: Boolean, 
    default: true 
  },
  seoTitle: { 
    type: String,
    maxlength: 70
  },
  seoDescription: { 
    type: String,
    maxlength: 160
  },
  seoKeywords: [String],
  views: {
    type: Number,
    default: 0
  },
  readTime: {
    type: String,
    default: '5 min read'
  }
}, { 
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
      return ret;
    }
  }
})

// Index for faster searches
BlogPostSchema.index({ slug: 1 });
BlogPostSchema.index({ published: 1, createdAt: -1 });
BlogPostSchema.index({ category: 1 });

export default mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema)