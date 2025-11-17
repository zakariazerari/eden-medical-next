// app/blog/page.js - ✅ REPLACE EXISTING (Safe)
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaClock, FaEye, FaTag, FaArrowRight } from "react-icons/fa";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const categories = [
    'All',
    'Medical Transport',
    'Healthcare Tips',
    'Patient Guide',
    'Industry News'
  ];

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  const fetchPosts = async () => {
    try {
      const url = filter === 'all' 
        ? '/api/blog' 
        : `/api/blog?category=${filter}`;
      
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-white via-gray-50 to-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Medical Transport <span className="text-red-600">Blog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, healthcare tips, and transportation guides
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat === 'All' ? 'all' : cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                (filter === 'all' && cat === 'All') || filter === cat
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <article
                key={post._id}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  {post.featuredImage && (
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <FaClock className="text-blue-600" />
                        {post.readTime} min
                      </span>
                      <span className="flex items-center gap-1">
                        <FaEye className="text-gray-600" />
                        {post.views}
                      </span>
                    </div>
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          <FaTag className="text-gray-500" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all"
                  >
                    Read More
                    <FaArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-20 bg-gradient-to-r from-red-600 to-blue-700 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Need Medical Transportation?</h2>
          <p className="text-xl mb-8 opacity-90">
            Available 24/7 across all California counties
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Book Your Ride Now
          </Link>
        </div>
      </div>
    </section>
  );
}