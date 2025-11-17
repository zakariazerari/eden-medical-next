// FIXED VERSION - BlogPost Model
// Location: /models/BlogPost.js

import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true  // ✅ ONLY ONE INDEX HERE!
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    maxlength: [300, 'Excerpt cannot exceed 300 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  featuredImage: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Medical Transport',
      'Healthcare Tips',
      'Patient Guide',
      'Industry News',
      'Company Updates'
    ]
  },
  tags: [{
    type: String,
    trim: true
  }],
  author: {
    type: String,
    default: 'Eden Medical Transport'
  },
  published: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  metaDescription: {
    type: String,
    maxlength: [160, 'Meta description cannot exceed 160 characters']
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// ✅ AUTO-GENERATE SLUG
blogPostSchema.pre('save', async function(next) {
  if (this.isModified('title')) {
    let baseSlug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    let slug = baseSlug;
    let counter = 1;
    
    while (await mongoose.models.BlogPost?.findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }
    
    this.slug = slug;
  }
  
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// ✅ NO DUPLICATE INDEX HERE!
// Remove schema.index() if it exists

const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;