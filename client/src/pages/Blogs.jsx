import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getPostById, toggleLike, getPostsByUser } from '../api/postServices'
import { getImageUrl } from '../api/config'
import { userContext } from '../Context/context'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'

const Blogs = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isLogin } = useContext(userContext);

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [relatedPosts, setRelatedPosts] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPostById(id);
            setPost(data);
            setLikes(data.likes);
            // Check if current user already liked this post
            if (user && data.likedBy) {
                setIsLiked(data.likedBy.includes(user.userId));
            }
            // Fetch related posts by same author
            if (data.author?._id) {
                const authorPosts = await getPostsByUser(data.author._id);
                setRelatedPosts(authorPosts.filter(p => p._id !== data._id).slice(0, 2));
            }
        } catch (err) {
            setError('Post not found or failed to load.');
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
        if (!isLogin) {
            toast.info('Please log in to like posts');
            navigate('/login');
            return;
        }
        try {
            const result = await toggleLike(id);
            setIsLiked(result.liked);
            setLikes(result.likes);
        } catch {
            toast.error('Failed to update like');
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    // image URL resolution handled by shared config utility

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900">
                <Navbar />
                <div className="max-w-4xl mx-auto px-4 py-16 animate-pulse space-y-6">
                    <div className="h-8 bg-slate-800 rounded w-3/4" />
                    <div className="h-4 bg-slate-800 rounded w-1/2" />
                    <div className="aspect-video bg-slate-800 rounded-xl" />
                    <div className="space-y-3">
                        {[...Array(6)].map((_, i) => <div key={i} className="h-4 bg-slate-800 rounded" />)}
                    </div>
                </div>
            </div>
        );
    }

    // Error / not found
    if (error || !post) {
        return (
            <div className="min-h-screen bg-slate-900">
                <Navbar />
                <div className="flex items-center justify-center py-24 p-4">
                    <div className="text-center max-w-md mx-auto">
                        <div className="w-20 h-20 mx-auto mb-6 bg-red-900/20 rounded-full flex items-center justify-center border border-red-800/30">
                            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-100 mb-3">Post Not Found</h2>
                        <p className="text-slate-400 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
                        <Link to="/" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                            ← Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const isAuthor = user && post.author?._id === user.userId;
    const publishDate = new Date(post.publishDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100">
            <Navbar />

            {/* Sticky top bar */}
            <div className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-sm border-b border-slate-700/50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 gap-2">
                        <Link to="/" className="inline-flex items-center px-2 py-1.5 text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors flex-shrink-0">
                            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span className="hidden sm:inline">All Posts</span>
                        </Link>

                        <div className="flex items-center gap-2">
                            {isAuthor && (
                                <button
                                    onClick={() => navigate(`/edit/${post._id}`)}
                                    className="inline-flex items-center px-2 sm:px-3 py-1.5 bg-slate-700/50 text-slate-300 rounded-full text-xs sm:text-sm font-medium hover:bg-slate-700 hover:text-white transition-all border border-slate-600/30"
                                >
                                    ✏️ <span className="ml-1 hidden sm:inline">Edit</span>
                                </button>
                            )}

                            <button
                                onClick={handleLike}
                                className={`inline-flex items-center px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                                    isLiked
                                        ? 'bg-red-600/20 text-red-400 hover:bg-red-600/30 border border-red-500/30'
                                        : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 hover:text-slate-300 border border-slate-600/30'
                                }`}
                            >
                                <svg className="w-4 h-4 mr-1" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                {likes}
                            </button>

                            <button
                                onClick={handleShare}
                                className="inline-flex items-center px-2 sm:px-3 py-1.5 bg-slate-700/50 text-slate-400 rounded-full text-xs sm:text-sm font-medium hover:bg-slate-700 hover:text-slate-300 transition-all duration-200 border border-slate-600/30"
                            >
                                <svg className="w-4 h-4 sm:mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                                <span className="hidden sm:inline">Share</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Category */}
                <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600/20 text-blue-300 border border-blue-500/30">
                        {post.category}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 leading-tight mb-6">
                    {post.title}
                </h1>

                {/* Excerpt */}
                {post.excerpt && (
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8">
                        {post.excerpt}
                    </p>
                )}

                {/* Author & Meta */}
                <div className="flex flex-col gap-4 pb-8 border-b border-slate-700/50">
                    <div className="flex items-center">
                        {post.author?.profilePic ? (
                            <img
                                src={getImageUrl(post.author.profilePic)}
                                alt={post.author?.username}
                                className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-slate-600/50"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full mr-4 bg-blue-600 flex items-center justify-center text-white font-bold text-lg border-2 border-slate-600/50">
                                {post.author?.username?.[0]?.toUpperCase()}
                            </div>
                        )}
                        <div>
                            <h3 className="font-semibold text-slate-100">{post.author?.username || 'Anonymous'}</h3>
                            {post.author?.bio && (
                                <p className="text-sm text-slate-400 line-clamp-1">{post.author.bio}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {publishDate}
                        </div>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {post.readTime}
                        </div>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {post.views} views
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                {post.image && (
                    <div className="my-8">
                        <div className="aspect-video rounded-xl overflow-hidden bg-slate-800 border border-slate-700/50">
                            <img
                                src={getImageUrl(post.image)}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* Content */}
                <div className="mb-12">
                    <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-slate-700/30">
                        <div className="text-slate-200 leading-relaxed whitespace-pre-wrap text-lg">
                            {post.content}
                        </div>
                    </div>
                </div>

                {/* Tags */}
                {post.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-slate-700/50">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-slate-100 transition-all duration-200 cursor-pointer border border-slate-600/30"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* More from this author */}
                {relatedPosts.length > 0 && (
                    <section className='mb-16'>
                        <h2 className="text-2xl font-bold text-slate-100 mb-8">
                            More from {post.author?.username}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedPosts.map((related) => (
                                <Link key={related._id} to={`/Blogs/${related._id}`}>
                                    <article className="group bg-slate-800/50 rounded-xl border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
                                        <div className="aspect-video overflow-hidden bg-slate-800">
                                            <img
                                                src={getImageUrl(related.image) || 'https://via.placeholder.com/400x200/1e293b/94a3b8?text=No+Image'}
                                                alt={related.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                onError={(e) => { e.target.src = 'https://via.placeholder.com/400x200/1e293b/94a3b8?text=No+Image'; }}
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="font-semibold text-slate-100 mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                                                {related.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm line-clamp-2 mb-3">
                                                {related.excerpt || related.content?.slice(0, 100) + '...'}
                                            </p>
                                            <div className="flex items-center text-xs text-slate-500">
                                                <span>{related.readTime}</span>
                                                <span className="mx-2">•</span>
                                                <span>{related.views} views</span>
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </article>
        </div>
    );
};

export default Blogs;
