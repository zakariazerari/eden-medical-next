"use client";
import { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import Link from "next/link";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    if (!confirm("Delete this post?")) return;

    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        toast.success("Post deleted!");
        fetchPosts();
      }
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  const togglePublish = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/admin/blog/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus })
      });

      if (res.ok) {
        toast.success(currentStatus ? "Post unpublished!" : "Post published!");
        fetchPosts();
      }
    } catch (error) {
      toast.error("Failed to update post");
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-purple-200">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1">
            📝 Blog Posts
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Manage your blog content
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-red-600 text-white rounded-lg sm:rounded-xl hover:bg-red-700 font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
        >
          <FaPlus /> New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[
          { label: "Total", count: posts.length, color: "blue" },
          { label: "Published", count: posts.filter(p => p.published).length, color: "green" },
          { label: "Drafts", count: posts.filter(p => !p.published).length, color: "yellow" },
          { label: "Views", count: posts.reduce((sum, p) => sum + (p.views || 0), 0), color: "purple" }
        ].map((stat, i) => (
          <div key={i} className={`bg-white p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-md border-l-4 ${
            stat.color === 'blue' ? 'border-blue-600' :
            stat.color === 'green' ? 'border-green-600' :
            stat.color === 'yellow' ? 'border-yellow-500' :
            'border-purple-600'
          }`}>
            <p className="text-xs sm:text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{stat.count}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block w-12 h-12 sm:w-16 sm:h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm sm:text-base mt-4">Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white rounded-2xl border-2 border-dashed border-gray-300">
          <div className="text-6xl sm:text-7xl mb-4 opacity-20">📝</div>
          <p className="text-lg sm:text-xl text-gray-600 mb-4 font-semibold">No blog posts yet</p>
          <p className="text-sm text-gray-500 mb-6">Create your first post to get started</p>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 font-semibold shadow-lg"
          >
            <FaPlus /> Create First Post
          </Link>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-200">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Views</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Date</th>
                  <th className="px-6 py-4 text-center text-sm font-bold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((post, index) => (
                  <tr key={post._id} className={`hover:bg-purple-50 transition ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                  }`}>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900 mb-1">{post.title}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {post.published ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                          Published
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-semibold">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-semibold">{post.views || 0}</td>
                    <td className="px-6 py-4 text-gray-700 text-sm">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/admin/blog/edit/${post._id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => togglePublish(post._id, post.published)}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition"
                          title={post.published ? "Unpublish" : "Publish"}
                        >
                          {post.published ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <button
                          onClick={() => deletePost(post._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile/Tablet Cards */}
          <div className="lg:hidden space-y-4">
            {posts.map(post => (
              <div key={post._id} className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden">
                <div className="p-4 space-y-3">
                  {/* Title & Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                    </div>
                    {post.published ? (
                      <span className="px-2.5 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold flex-shrink-0">
                        Published
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-bold flex-shrink-0">
                        Draft
                      </span>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                    <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full font-semibold">
                      {post.category}
                    </span>
                    <span className="text-gray-600">
                      👁️ {post.views || 0} views
                    </span>
                    <span className="text-gray-500">
                      📅 {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t">
                    <Link
                      href={`/admin/blog/edit/${post._id}`}
                      className="flex items-center justify-center gap-2 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-xs sm:text-sm font-semibold"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => togglePublish(post._id, post.published)}
                      className="flex items-center justify-center gap-2 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition text-xs sm:text-sm font-semibold"
                    >
                      {post.published ? <><FaEyeSlash /> Hide</> : <><FaEye /> Show</>}
                    </button>
                    <button
                      onClick={() => deletePost(post._id)}
                      className="flex items-center justify-center gap-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-xs sm:text-sm font-semibold"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}