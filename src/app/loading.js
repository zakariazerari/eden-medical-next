// app/loading.js - ✅ NEW FILE
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-red-50 pt-24">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-20 h-20 border-4 border-red-200 rounded-full animate-pulse"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-gray-600 font-semibold text-lg animate-pulse">Loading...</p>
      </div>
    </div>
  )
}