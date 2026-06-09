import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPost } from '../api/postServices';
import Navbar from '../components/Navbar';

const CATEGORIES = ['Technology', 'Lifestyle', 'Travel', 'Food', 'Health', 'Business', 'Education', 'Entertainment', 'Other'];

const generateSlug = (title) =>
    title.toLowerCase().trim()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

const calculateReadTime = (content) => {
    const words = content.trim().split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const CreatePost = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        tags: '',
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image must be under 5MB');
            return;
        }
        if (!file.type.startsWith('image/')) {
            toast.error('Please select a valid image file');
            return;
        }
        setImage(file);
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const removeImage = () => {
        setImage(null);
        setImagePreview('');
        document.getElementById('featured-image').value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title, content, category } = formData;

        if (!title.trim() || !content.trim()) {
            toast.error('Title and content are required');
            return;
        }
        if (!category) {
            toast.error('Please select a category');
            return;
        }

        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append('title', title.trim());
            data.append('excerpt', formData.excerpt.trim());
            data.append('content', content.trim());
            data.append('category', category);
            data.append('readTime', calculateReadTime(content));
            data.append('tags', formData.tags);
            if (image) data.append('image', image);

            const response = await createPost(data);

            if (response.success) {
                toast.success('Post published successfully!');
                navigate(`/Blogs/${response.post._id}`);
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Failed to publish post';
            toast.error(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const wordCount = formData.content.trim() ? formData.content.trim().split(/\s+/).length : 0;

    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-slate-700">
                        <h1 className="text-3xl font-bold text-slate-100">Write New Post</h1>
                        <p className="text-slate-400 mt-2">Share your thoughts with the world</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Title <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Write an engaging title..."
                                required
                            />
                            {formData.title && (
                                <p className="text-xs text-slate-500 mt-1">
                                    Slug: <span className="text-slate-400">{generateSlug(formData.title)}</span>
                                </p>
                            )}
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Excerpt</label>
                            <textarea
                                name="excerpt"
                                value={formData.excerpt}
                                onChange={handleInputChange}
                                rows={3}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                                placeholder="A short summary shown on the post card..."
                            />
                        </div>

                        {/* Featured Image */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Featured Image</label>
                            {!imagePreview ? (
                                <div className="border-2 border-dashed border-slate-600 rounded-md p-8 text-center hover:border-slate-500 transition-colors">
                                    <input
                                        type="file"
                                        id="featured-image"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <label htmlFor="featured-image" className="cursor-pointer">
                                        <svg className="mx-auto h-12 w-12 text-slate-500 mb-3" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <p className="text-slate-300 font-medium">Click to upload image</p>
                                        <p className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP up to 5MB</p>
                                    </label>
                                </div>
                            ) : (
                                <div className="relative">
                                    <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover rounded-md" />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
                                    >
                                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Category & Tags */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Category <span className="text-red-400">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select a category</option>
                                    {CATEGORIES.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Tags</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="react, javascript, web (comma separated)"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Content <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                rows={14}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                                placeholder="Write your post content here..."
                                required
                            />
                            {wordCount > 0 && (
                                <p className="text-xs text-slate-500 mt-1">
                                    {wordCount} words · {calculateReadTime(formData.content)}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-2">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-slate-200 font-medium rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Publishing...
                                    </span>
                                ) : 'Publish Post'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
