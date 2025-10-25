// app/blog/page.js
import { metadata } from './metadata'
export { metadata }

export default async function BlogPage() {
  // Fetch blog posts from API
  let posts = [];
  
  try {
    const res = await fetch('https://edenmedical.com/api/blog', {
      next: { revalidate: 600 } // Revalidate every 10 minutes
    });
    const data = await res.json();
    if (data.success) {
      posts = data.posts;
    }
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
  }

  const categories = ['All', 'Health Tips', 'Transportation', 'Industry News', 'Patient Stories', 'Guides'];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-red-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Medical Transport Blog
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Expert insights, health tips, and industry news to help you navigate medical transportation with confidence
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                className="px-6 py-2 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition whitespace-nowrap font-semibold"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📝</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
              <p className="text-xl text-gray-600">We're working on great content for you. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(post => (
                <article key={post._id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition group">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span>📅 {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>⏱️ {post.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <a 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
                    >
                      Read More 
                      <span className="text-xl">→</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Medical Transportation?
          </h2>
          <p className="text-xl mb-8">
            Book reliable, professional medical transport service throughout California
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+15109578383" className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition shadow-xl">
              📞 Call (510) 957-8383
            </a>
            <a href="/contact" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition">
              Book Online
            </a>
          </div>
        </div>
      </section>
    </>
  )
}