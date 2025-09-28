import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userContext } from '../Context/context';
// import { createBlog } from '../api/blogServices'; // You'll need to create this API function

const CreatePost = () => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    authorName: user?.name || '',
    category: '',
    tags: '',
  });
  
  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      setFeaturedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove image
  const removeImage = () => {
    setFeaturedImage(null);
    setImagePreview('');
    // Reset file input
    document.getElementById('featured-image').value = '';
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const blogData = new FormData();
      blogData.append('title', formData.title);
      blogData.append('description', formData.description);
      blogData.append('content', formData.content);
      blogData.append('authorName', formData.authorName);
      blogData.append('category', formData.category);
      blogData.append('tags', formData.tags);
      
      if (featuredImage) {
        blogData.append('featuredImage', featuredImage);
      }

      // Uncomment when you create the API function
      // const response = await createBlog(blogData);
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Blog published successfully!');
      navigate('/'); // or navigate to the created blog page
      
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('Failed to publish blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-700">
            <h1 className="text-3xl font-bold text-slate-100">Write New Blog</h1>
            <p className="text-slate-400 mt-2">Share your thoughts with the world</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-2">
                Blog Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter an engaging title for your blog"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-2">
                Short Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                placeholder="Write a brief description of your blog post"
              />
            </div>

            {/* Featured Image */}
            <div>
              <label htmlFor="featured-image" className="block text-sm font-medium text-slate-300 mb-2">
                Featured Image
              </label>
              
              {!imagePreview ? (
                <div className="border-2 border-dashed border-slate-600 rounded-md p-6 text-center hover:border-slate-500 transition-colors">
                  <input
                    type="file"
                    id="featured-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label htmlFor="featured-image" className="cursor-pointer">
                    <div className="text-slate-400 mb-2">
                      <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-slate-300">Click to upload featured image</p>
                    <p className="text-xs text-slate-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-md"
                  />
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

            {/* Author Name and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="authorName" className="block text-sm font-medium text-slate-300 mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  id="authorName"
                  name="authorName"
                  value={formData.authorName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a category</option>
                  <option value="technology">Technology</option>
                  <option value="lifestyle">Lifestyle</option>
                  <option value="travel">Travel</option>
                  <option value="food">Food</option>
                  <option value="health">Health</option>
                  <option value="business">Business</option>
                  <option value="education">Education</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-slate-300 mb-2">
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter tags separated by commas (e.g., react, javascript, web development)"
              />
            </div>

            {/* Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-slate-300 mb-2">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="12"
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                placeholder="Write your blog content here..."
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
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
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </span>
                ) : (
                  'Publish Blog'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;