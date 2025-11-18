// app/blog/loading.js - ✅ NEW FILE
export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          
          {/* Header skeleton */}
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded-lg w-2/3 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>

          {/* Filter buttons skeleton */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-10 w-32 bg-gray-200 rounded-full"></div>
            ))}
          </div>

          {/* Blog cards skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="flex gap-4 pt-2">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}