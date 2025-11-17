// Premium Single Blog Post Page - Clean Version (FIXED)
// Location: /app/blog/[slug]/page.js

"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  FaArrowLeft, 
  FaCalendar, 
  FaEye, 
  FaTag, 
  FaPhone, 
  FaShare,
  FaFacebook,
  FaTwitter,
  FaLinkedin
} from "react-icons/fa";

export default function SinglePostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [params.slug]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setReadProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/blog/${params.slug}`);
      const data = await res.json();
      
      if (data.success) {
        setPost(data.post);
      } else {
        router.push('/404');
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const sharePost = (platform) => {
    const url = window.location.href;
    const title = post.title;
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 pt-24">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-red-200 rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-0 w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-6 text-gray-600 font-medium animate-pulse">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white pt-24">
        <div className="text-center px-4">
          <div className="text-8xl mb-6 opacity-20">📄</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 hover:shadow-lg transition-all"
          >
            <FaArrowLeft /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-red-600 via-pink-600 to-blue-600 transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <article className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 pt-24">
        
        {/* Simple Header */}
        <div className="bg-gradient-to-br from-gray-50 to-white border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Back Button & Category */}
            <div className="flex items-center gap-4 mb-6">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold group transition-all"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
                <span>Back to Blog</span>
              </Link>
              
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 text-sm font-bold rounded-full">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
              <span className="flex items-center gap-2">
                <FaCalendar className="text-blue-600" />
                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <FaEye className="text-gray-600" />
                {post.views || 0} views
              </span>
              <span>•</span>
              <span>By {post.author || 'Eden Medical Transport'}</span>
            </div>

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-red-600 hover:text-red-600 transition-all shadow-sm"
              >
                <FaShare /> Share
              </button>

              {showShareMenu && (
                <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-2xl p-3 flex gap-3 animate-fadeIn z-10 border border-gray-200">
                  <button
                    onClick={() => sharePost('facebook')}
                    className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all hover:scale-110"
                    title="Share on Facebook"
                  >
                    <FaFacebook size={18} />
                  </button>
                  <button
                    onClick={() => sharePost('twitter')}
                    className="p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all hover:scale-110"
                    title="Share on Twitter"
                  >
                    <FaTwitter size={18} />
                  </button>
                  <button
                    onClick={() => sharePost('linkedin')}
                    className="p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all hover:scale-110"
                    title="Share on LinkedIn"
                  >
                    <FaLinkedin size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative w-full h-[400px] overflow-hidden">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Excerpt */}
          <div className="mb-10 p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-l-4 border-red-600 rounded-xl shadow-md">
            <p className="text-xl text-gray-800 font-medium leading-relaxed italic">
              {post.excerpt}
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-10">
            <div 
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="prose prose-lg lg:prose-xl max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b-2 prose-h2:border-red-600 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-blue-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg prose-a:text-red-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-bold prose-ul:my-6 prose-ul:space-y-2 prose-li:text-gray-700 prose-li:leading-relaxed prose-ol:my-6 prose-ol:space-y-2 prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-gray-700 prose-img:rounded-xl prose-img:shadow-lg"
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-10 p-6 bg-white rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FaTag className="text-red-600" />
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-red-100 hover:text-red-600 transition-all cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-red-600 to-blue-700 rounded-2xl shadow-2xl p-8 md:p-10 text-white text-center">
            <div className="text-5xl mb-4">🚑</div>
            <h3 className="text-3xl font-bold mb-3">
              Need Medical Transportation?
            </h3>
            <p className="text-lg mb-6 opacity-95 max-w-2xl mx-auto">
              Eden Medical Transport provides reliable, wheelchair-accessible transportation 
              throughout California. Available 24/7.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:5109578383"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                <FaPhone />
                Call (510) 957-8383
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-red-600 transition-all"
              >
                Book Online →
              </Link>
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-10 text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 font-semibold group transition-all"
            >
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              More Articles
            </Link>
          </div>
        </div>
      </article>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}