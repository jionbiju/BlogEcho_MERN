import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getPostById, updatePost, deletePost } from '../api/postServices';
import { getImageUrl } from '../api/config';
import Navbar from '../components/Navbar';

const CATEGORIES = ['Technology', 'Lifestyle', 'Travel', 'Food', 'Health', 'Business', 'Education', 'Entertainment', 'Other'];

const calculateReadTime = (content) => {
    const words = content.trim().split(/\s+/).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        tags: '',
    });
    const [currentImage, setCurrentImage] = useState('');
    const [newImage, setNewImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        const loadPost = async () => {
            try {
                const post = await getPostById(id);
                setFormData({
                    title: post.title,
                    excerpt: post.excerpt || '',
                    content: post.content,
                    category: post.category,
                    tags: post.tags?.join(', ') || '',
                });
                setCurrentImage(post.image || '');
            } catch {
                toast.error('Failed to load post');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        loadPost();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) { toast.error('Image must be under 5MB'); return; }
        if (!file.type.startsWith('image/')) { toast.error('Please select a valid image'); return; }
        setNewImage(file);
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.content.trim()) {
            toast.error('Title and content are required');
            return;
        }
        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append('title', formData.title.trim());
            data.append('excerpt', formData.excerpt.trim());
            data.append('content', formData.content.trim());
            data.append('category', formData.category);
            data.append('tags', formData.tags);
            data.append('readTime', calculateReadTime(formData.content));
            if (newImage) data.append('image', newImage);

            const result = await updatePost(id, data);
            if (result.success) {
                toast.success('Post updated successfully!');
                navigate(`/Blogs/${id}`);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update post');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        try {
            await deletePost(id);
            toast.success('Post deleted');
            navigate('/profile');
        } catch {
            toast.error('Failed to delete post');
        }
    };

    // image URL resolution handled by shared config utility

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900">
                <Navbar />
                <div className="max-w-4xl mx-auto px-4 py-16 animate-pulse space-y-4">
                    <div className="h-8 bg-slate-800 rounded w-1/3" />
                    <div className="h-12 bg-slate-800 rounded" />
                    <div className="h-64 bg-slate-800 rounded" />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900">
            <Navbar />
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
                    <div className="px-8 py-6 border-b border-slate-700 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-100">Edit Post</h1>
                            <p className="text-slate-400 mt-1">Update your post content</p>
                        </div>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/30 font-medium rounded-md transition-all text-sm"
                        >
                            Delete Post
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
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
                            />
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Featured Image</label>
                            {(imagePreview || currentImage) && (
                                <div className="mb-3 relative">
                                    <img
                                        src={imagePreview || getImageUrl(currentImage)}
                                        alt="Preview"
                                        className="w-full h-48 object-cover rounded-md"
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="block text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-slate-700 file:text-slate-300 hover:file:bg-slate-600 cursor-pointer"
                            />
                            <p className="text-xs text-slate-500 mt-1">Leave empty to keep current image</p>
                        </div>

                        {/* Category & Tags */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select category</option>
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
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
                                    placeholder="tag1, tag2, tag3"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Content *</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                rows={14}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                                required
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4 pt-2">
                            <button
                                type="button"
                                onClick={() => navigate(`/Blogs/${id}`)}
                                className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-slate-200 font-medium rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors"
                            >
                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 max-w-sm w-full">
                        <h3 className="text-xl font-bold text-slate-100 mb-2">Delete Post?</h3>
                        <p className="text-slate-400 mb-6 text-sm">This action cannot be undone. The post will be permanently deleted.</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-md transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditPost;
