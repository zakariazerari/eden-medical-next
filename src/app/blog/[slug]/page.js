// app/blog/[slug]/page.js - COMPLETE OPTIMIZED VERSION
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { connectDB } from "@/lib/mongo";
import BlogPost from "@/models/BlogPost";

// Generate metadata dynamically
export async function generateMetadata({ params }) {
  try {
    await connectDB();
    const { slug } = await params; // Next.js 15+ requires await
    const post = await BlogPost.findOne({ slug, published: true }).lean();
    
    if (!post) {
      return {
        title: 'Post Not Found | Eden Medical Transport Blog',
        description: 'The requested blog post could not be found.',
      };
    }
    
    return {
      title: post.seoTitle || `${post.title} | Eden Medical Transport Blog`,
      description: post.seoDescription || post.excerpt,
      keywords: post.seoKeywords || [],
      authors: [{ name: post.author }],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `https://edenmedical.com/blog/${post.slug}`,
        type: 'article',
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        authors: [post.author],
        images: [{
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        }],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: [post.image],
      },
      alternates: {
        canonical: `https://edenmedical.com/blog/${post.slug}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Post | Eden Medical Transport',
    };
  }
}

export default async function BlogPostPage({ params }) {
  try {
    await connectDB();
    const { slug } = await params;
    const post = await BlogPost.findOne({ slug, published: true }).lean();
    
    if (!post) {
      notFound();
    }
    
    // Increment views (optional - fire and forget)
    BlogPost.findByIdAndUpdate(post._id, { $inc: { views: 1 } }).catch(err => 
      console.error('Failed to increment views:', err)
    );

    return (
      <>
        {/* Breadcrumbs */}
        <nav className="bg-gray-50 py-4 border-b">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition">
                Home
              </Link>
              <span>→</span>
              <Link href="/blog" className="hover:text-blue-600 transition">
                Blog
              </Link>
              <span>→</span>
              <span className="text-gray-900 font-semibold">{post.category}</span>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <article className="min-h-screen bg-white">
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-700 text-white py-20">
            <div className="absolute inset-0">
              <Image 
                src={post.image} 
                alt={post.title}
                fill
                className="object-cover opacity-30"
                priority
              />
            </div>
            <div className="relative max-w-4xl mx-auto px-6">
              <div className="inline-block bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                {post.category}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <span>✍️</span>
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <time dateTime={post.createdAt}>
                    {new Date(post.createdAt).toLocaleDateString('en-US', { 
                      month: 'long', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏱️</span>
                  <span>{post.readTime}</span>
                </div>
                {post.views > 0 && (
                  <div className="flex items-center gap-2">
                    <span>👁️</span>
                    <span>{post.views} views</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-6 py-16">
            {/* Excerpt */}
            {post.excerpt && (
              <div className="text-xl text-gray-700 leading-relaxed mb-12 p-6 bg-blue-50 rounded-2xl border-l-4 border-blue-600">
                <p className="italic">{post.excerpt}</p>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg prose-blue max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-200 transition"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Share this article:</h3>
              <div className="flex flex-wrap gap-4">
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=https://edenmedical.com/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg transform hover:scale-105"
                  aria-label="Share on Facebook"
                >
                  📘 Facebook
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?url=https://edenmedical.com/blog/${post.slug}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-sky-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-sky-600 transition shadow-md hover:shadow-lg transform hover:scale-105"
                  aria-label="Share on Twitter"
                >
                  🐦 Twitter
                </a>
                <a 
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=https://edenmedical.com/blog/${post.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition shadow-md hover:shadow-lg transform hover:scale-105"
                  aria-label="Share on LinkedIn"
                >
                  💼 LinkedIn
                </a>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition group"
              >
                <span className="transform group-hover:-translate-x-1 transition">←</span>
                <span>Back to All Articles</span>
              </Link>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white py-16">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Need Medical Transportation?
              </h2>
              <p className="text-xl mb-8">
                Book your ride with Eden Medical Transport today
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+15109578383" 
                  className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition shadow-xl"
                >
                  📞 (510) 957-8383
                </a>
                <a 
                  href="/contact" 
                  className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition"
                >
                  Book Online
                </a>
              </div>
            </div>
          </div>

          {/* Related Services */}
          <div className="py-16 bg-gray-50">
            <div className="max-w-4xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                Our Medical Transport Services
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link 
                  href="/services/wheelchair-transport"
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition group text-center"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition">♿</div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition">
                    Wheelchair Transport
                  </h3>
                  <p className="text-sm text-gray-600">ADA accessible vans</p>
                </Link>
                <Link 
                  href="/services/stretcher-transport"
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition group text-center"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition">🏥</div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-purple-600 transition">
                    Stretcher Service
                  </h3>
                  <p className="text-sm text-gray-600">Bed-bound patients</p>
                </Link>
                <Link 
                  href="/services/dialysis-transport"
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition group text-center"
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition">💉</div>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-red-600 transition">
                    Dialysis Transport
                  </h3>
                  <p className="text-sm text-gray-600">Recurring appointments</p>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
}

// Generate static params for static generation (optional)
export async function generateStaticParams() {
  try {
    await connectDB();
    const posts = await BlogPost.find({ published: true })
      .select('slug')
      .lean();
    
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}