"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaArrowLeft, FaSave, FaBold, FaItalic, FaListUl, FaListOl, FaUndo, FaRedo } from "react-icons/fa";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function NewBlogPost() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    category: 'Medical Transport',
    tags: '',
    featuredImage: '',
    metaDescription: '',
    published: false
  });

  const categories = [
    'Medical Transport',
    'Healthcare Tips',
    'Patient Guide',
    'Industry News',
    'Company Updates'
  ];

  // ✅ VISUAL EDITOR
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<h2>Introduction</h2><p>Start writing your blog post here... Just type normally like in Microsoft Word!</p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg focus:outline-none min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] p-4 sm:p-6 max-w-none',
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const content = editor ? editor.getHTML() : '';
    
    if (!formData.title || !formData.excerpt || !content) {
      toast.error("⚠️ Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const postData = {
        ...formData,
        content,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      };

      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      if (res.ok) {
        toast.success("✅ Blog post created successfully!");
        router.push('/admin/blog');
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to create post");
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error creating post");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ MOBILE-FRIENDLY TOOLBAR
  const MenuBar = () => {
    if (!editor) return null;

    return (
      <div className="border-b border-gray-300 p-2 sm:p-3 flex flex-wrap gap-1 sm:gap-2 bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
        
        {/* TEXT FORMATTING */}
        <div className="flex gap-1 border-r pr-1 sm:pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-1.5 sm:p-2 rounded-lg transition-all ${
              editor.isActive('bold') 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-white hover:bg-gray-200'
            }`}
            title="Bold"
          >
            <FaBold className="text-sm sm:text-base" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-1.5 sm:p-2 rounded-lg transition-all ${
              editor.isActive('italic') 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-white hover:bg-gray-200'
            }`}
            title="Italic"
          >
            <FaItalic className="text-sm sm:text-base" />
          </button>
        </div>

        {/* HEADINGS */}
        <div className="flex gap-1 border-r pr-1 sm:pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium transition-all text-xs sm:text-sm ${
              editor.isActive('paragraph') 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-white hover:bg-gray-200'
            }`}
            title="Normal"
          >
            P
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-bold transition-all text-xs sm:text-sm ${
              editor.isActive('heading', { level: 2 }) 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-white hover:bg-gray-200'
            }`}
            title="Big Heading"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-semibold transition-all text-xs sm:text-sm ${
              editor.isActive('heading', { level: 3 }) 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-white hover:bg-gray-200'
            }`}
            title="Medium Heading"
          >
            H3
          </button>
        </div>

        {/* LISTS */}
        <div className="flex gap-1 border-r pr-1 sm:pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-1.5 sm:p-2 rounded-lg transition-all ${
              editor.isActive('bulletList') 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-white hover:bg-gray-200'
            }`}
            title="Bullet List"
          >
            <FaListUl className="text-sm sm:text-base" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-1.5 sm:p-2 rounded-lg transition-all ${
              editor.isActive('orderedList') 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-white hover:bg-gray-200'
            }`}
            title="Numbered List"
          >
            <FaListOl className="text-sm sm:text-base" />
          </button>
        </div>

        {/* UNDO/REDO */}
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            className="p-1.5 sm:p-2 rounded-lg bg-white hover:bg-gray-200 transition-all disabled:opacity-30"
            title="Undo"
            disabled={!editor.can().undo()}
          >
            <FaUndo className="text-sm sm:text-base" />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            className="p-1.5 sm:p-2 rounded-lg bg-white hover:bg-gray-200 transition-all disabled:opacity-30"
            title="Redo"
            disabled={!editor.can().redo()}
          >
            <FaRedo className="text-sm sm:text-base" />
          </button>
        </div>

        {/* HELP TEXT - Hide on mobile */}
        <div className="hidden lg:flex ml-auto items-center text-xs xl:text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-lg">
          ✨ Type like Microsoft Word!
        </div>
      </div>
    );
  };

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <Link
          href="/admin/blog"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base"
        >
          <FaArrowLeft /> Back to Blog Posts
        </Link>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-1 sm:mb-2">
          ✍️ Create New Blog Post
        </h1>
        <p className="text-xs sm:text-sm text-gray-600">
          ✨ Visual editor - Just type like in Word!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        
        {/* BASIC INFO CARD */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 border-b pb-2 sm:pb-3">Basic Information</h2>
          
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-2.5 sm:p-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              placeholder="Complete Guide to Wheelchair Transport"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Short Summary * (max 300 chars)
            </label>
            <textarea
              rows={3}
              value={formData.excerpt}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              className="w-full p-2.5 sm:p-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm sm:text-base"
              placeholder="Everything you need to know about wheelchair-accessible transportation..."
              maxLength={300}
              required
            />
            <p className="text-xs text-gray-500 mt-1">{formData.excerpt.length}/300 characters</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-2.5 sm:p-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="w-full p-2.5 sm:p-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                placeholder="wheelchair, transport, accessibility"
              />
            </div>
          </div>
        </div>

        {/* CONTENT EDITOR CARD */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 sm:p-6 border-b bg-gradient-to-r from-blue-50 to-purple-50">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Content Editor</h2>
            <p className="text-xs sm:text-sm text-gray-600">
              ✨ Just type normally! Use buttons to format.
            </p>
          </div>
          
          <MenuBar />
          
          <div className="bg-white">
            <EditorContent 
              editor={editor} 
              className="prose-headings:text-gray-900 prose-p:text-gray-700"
            />
          </div>

          <div className="p-3 sm:p-4 bg-gray-50 border-t">
            <div className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700">
              <div className="text-xl sm:text-2xl">💡</div>
              <div>
                <p className="font-semibold mb-1">How to use:</p>
                <ul className="space-y-1 text-xs text-gray-600">
                  <li>• Type normally - editor formats automatically</li>
                  <li>• Select text and click <strong>B</strong> or <em>I</em> buttons</li>
                  <li>• Click H2/H3 to make headings</li>
                  <li>• Click list buttons for bullet/numbered lists</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* ADDITIONAL INFO CARD */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 space-y-4 sm:space-y-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 border-b pb-2 sm:pb-3">Additional Settings</h2>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              Featured Image URL
            </label>
            <input
              type="url"
              value={formData.featuredImage}
              onChange={(e) => setFormData({...formData, featuredImage: e.target.value})}
              className="w-full p-2.5 sm:p-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
              placeholder="https://images.unsplash.com/photo-..."
            />
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              💡 Get free images from <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Unsplash</a>
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">
              SEO Description (max 160 chars)
            </label>
            <textarea
              rows={2}
              value={formData.metaDescription}
              onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
              className="w-full p-2.5 sm:p-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm sm:text-base"
              placeholder="This text appears in Google search results..."
              maxLength={160}
            />
            <p className="text-xs text-gray-500 mt-1">{formData.metaDescription.length}/160 characters</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-lg sm:rounded-xl">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({...formData, published: e.target.checked})}
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="published" className="font-semibold text-gray-900 cursor-pointer text-sm sm:text-base">
              ✅ Publish immediately (make it visible to everyone)
            </label>
          </div>
        </div>

        {/* SUBMIT BUTTONS */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg text-sm sm:text-base lg:text-lg"
            >
              <FaSave className="text-base sm:text-xl" />
              {submitting ? 'Creating...' : 'Create Blog Post'}
            </button>
            <Link
              href="/admin/blog"
              className="flex items-center justify-center px-6 sm:px-10 py-3 sm:py-4 bg-gray-200 text-gray-800 font-bold rounded-lg sm:rounded-xl hover:bg-gray-300 transition-all text-sm sm:text-base lg:text-lg"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}