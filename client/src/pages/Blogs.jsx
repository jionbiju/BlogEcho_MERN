import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import blogData from '../assets/blogData';

const Blogs = () => {
    const { id } = useParams();
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    
    const blogId = parseInt(id);
    const blog = blogData.find((blogItem) => blogItem.id === blogId);
    
    useEffect(() => {
        window.scrollTo(0, 0);
        if (blog) {
            setLikes(blog.likes);
        }
    }, [blog]);

    
    // useEffect(() => {
    //     const handleScroll = () => {
    //         setIsScrolled(window.scrollY > 100);
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, []);

    const handleLike = () => {
        setIsLiked(!isLiked);
        setLikes(prev => isLiked ? prev - 1 : prev + 1);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title,
                    text: blog.excerpt,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };
    
    if (!blog) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
                <div className="text-center max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 bg-red-900/20 rounded-full flex items-center justify-center border border-red-800/30">
                        <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-100 mb-3">Post Not Found</h2>
                    <p className="text-slate-400 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
                    <Link 
                        to="/blogs" 
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Blogs
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {/* Header Navigation */}
            <div className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-sm border-b border-slate-700/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-22">
                        <Link 
                            to="/blogs"
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            All Posts
                        </Link>
                        
                        <div className="flex items-center space-x-4">
                            <button 
                                onClick={handleLike}
                                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                                    isLiked 
                                        ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30' 
                                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-300 border border-slate-600/30'
                                }`}
                            >
                                <svg className="w-4 h-4 mr-1.5" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                {likes}
                            </button>
                            
                            <button 
                                onClick={handleShare}
                                className="inline-flex items-center px-3 py-1.5 bg-slate-700/50 text-slate-400 rounded-full text-sm font-medium hover:bg-slate-700 hover:text-slate-300 transition-all duration-200 border border-slate-600/30"
                            >
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <header className="mb-8">
                    {/* Category */}
                    <div className="mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600/20 text-blue-300 border border-blue-500/30">
                            {blog.category}
                        </span>
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 leading-tight mb-6">
                        {blog.title}
                    </h1>
                    
                    {/* Excerpt */}
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
                        {blog.excerpt}
                    </p>
                    
                    {/* Author Info & Meta */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-8 border-b border-slate-700/50">
                        <div className="flex items-center mb-4 sm:mb-0">
                            <img 
                                src={blog.author.avatar} 
                                alt={blog.author.name}
                                className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-slate-600/50"
                            />
                            <div>
                                <h3 className="font-semibold text-slate-100">{blog.author.name}</h3>
                                <p className="text-sm text-slate-400">{blog.author.role}</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-slate-400">
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {blog.publishDate}
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {blog.readTime}
                            </div>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                {blog.views} views
                            </div>
                        </div>
                    </div>
                </header>

                {/* Featured Image */}
                <div className="mb-8">
                    <div className="aspect-video rounded-xl overflow-hidden bg-slate-800 border border-slate-700/50">
                        <img 
                            src={blog.image} 
                            alt={blog.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="prose prose-lg max-w-none mb-12">
                    <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-slate-700/30">
                        <div className="text-slate-200 leading-relaxed whitespace-pre-wrap text-lg">
                            {blog.content}
                        </div>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-slate-700/50">
                    {blog.tags.map((tag) => (
                        <span 
                            key={tag} 
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-slate-100 transition-all duration-200 cursor-pointer border border-slate-600/30 hover:border-slate-500/50"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Related Articles */}
                {blogData.filter(item => item.id !== blog.id && item.category === blog.category).length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold text-slate-100 mb-8">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {blogData
                                .filter(item => item.id !== blog.id && item.category === blog.category)
                                .slice(0, 2)
                                .map((relatedBlog) => (
                                    <Link key={relatedBlog.id} to={`/blogs/${relatedBlog.id}`}>
                                        <article className="group bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/50">
                                            <div className="aspect-video overflow-hidden bg-slate-800">
                                                <img 
                                                    src={relatedBlog.image} 
                                                    alt={relatedBlog.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="font-semibold text-slate-100 mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                                    {relatedBlog.title}
                                                </h3>
                                                <p className="text-slate-400 text-sm line-clamp-2 mb-3">
                                                    {relatedBlog.excerpt}
                                                </p>
                                                <div className="flex items-center text-xs text-slate-500">
                                                    <span>{relatedBlog.author.name}</span>
                                                    <span className="mx-2">•</span>
                                                    <span>{relatedBlog.readTime}</span>
                                                </div>
                                            </div>
                                        </article>
                                    </Link>
                                ))
                            }
                        </div>
                    </section>
                )}
            </article>
        </div>
    );
}

export default Blogs