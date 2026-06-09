import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../api/postServices'
import { getImageUrl } from '../api/config'

const CATEGORIES = ['All', 'Technology', 'Lifestyle', 'Business', 'Travel', 'Education', 'Health', 'Other'];

const BlogsItems = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);

    const fetchPosts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getAllPosts({
                page: currentPage,
                limit: 9,
                category: activeCategory,
                search
            });
            setPosts(data.posts);
            setTotalPages(data.totalPages);
            setTotal(data.total);
        } catch (err) {
            setError('Failed to load posts. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [currentPage, activeCategory, search]);

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // Reset to page 1 when category or search changes
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setCurrentPage(1);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(searchInput);
        setCurrentPage(1);
    };

    const handleSearchClear = () => {
        setSearchInput('');
        setSearch('');
        setCurrentPage(1);
    };

    // Get image URL — handled by shared config utility

    return (
        <div id='blogs-section' className='flex-col py-24 max-w-7xl mx-auto px-6'>
            {/* Header Section */}
            <div className='text-center mb-12'>
                <h2 className='text-4xl font-bold text-slate-100 mb-4'>
                    Explore Our <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>Articles</span>
                </h2>
                <p className='text-lg text-slate-400'>Discover content that inspires and informs</p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className='flex justify-center mb-8 gap-2 max-w-lg mx-auto'>
                <div className='relative flex-1'>
                    <input
                        type='text'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder='Search posts by title, excerpt or tag...'
                        className='w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                    {searchInput && (
                        <button
                            type='button'
                            onClick={handleSearchClear}
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300'
                        >
                            ✕
                        </button>
                    )}
                </div>
                <button
                    type='submit'
                    className='px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors'
                >
                    Search
                </button>
            </form>

            {/* Category Navigation */}
            <div className='flex flex-wrap justify-center gap-2 border-b border-slate-800 pb-4 max-w-4xl mx-auto mb-12'>
                {CATEGORIES.map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`relative px-5 py-2 font-semibold rounded-full transition-all duration-300 text-sm ${
                            activeCategory === category
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                : 'text-slate-300 hover:text-slate-100 hover:bg-slate-800'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Results count */}
            {!loading && !error && (
                <p className='text-slate-500 text-sm text-center mb-6'>
                    {total} {total === 1 ? 'post' : 'posts'} found
                    {search && ` for "${search}"`}
                    {activeCategory !== 'All' && ` in ${activeCategory}`}
                </p>
            )}

            {/* Loading State */}
            {loading && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className='bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50 animate-pulse'>
                            <div className='w-full h-48 bg-slate-700' />
                            <div className='p-6 space-y-3'>
                                <div className='h-4 bg-slate-700 rounded w-3/4' />
                                <div className='h-3 bg-slate-700 rounded w-full' />
                                <div className='h-3 bg-slate-700 rounded w-5/6' />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className='text-center py-12'>
                    <p className='text-red-400 mb-4'>{error}</p>
                    <button
                        onClick={fetchPosts}
                        className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors'
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Blog Posts Grid */}
            {!loading && !error && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {posts.map((post) => (
                        <Link key={post._id} to={`/Blogs/${post._id}`}>
                            <article className='bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/20 h-full flex flex-col'>
                                {/* Blog Image */}
                                <div className='relative overflow-hidden'>
                                    <img
                                        src={getImageUrl(post.image) || 'https://via.placeholder.com/400x200/1e293b/94a3b8?text=No+Image'}
                                        alt={post.title}
                                        className='w-full h-48 object-cover transition-transform duration-300 hover:scale-105'
                                        onError={(e) => {
                                            e.target.src = 'https://via.placeholder.com/400x200/1e293b/94a3b8?text=No+Image';
                                        }}
                                    />
                                    <div className='absolute top-4 left-4'>
                                        <span className='px-3 py-1 bg-slate-900/80 text-slate-200 text-xs font-medium rounded-full border border-slate-600'>
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Blog Content */}
                                <div className='p-6 flex flex-col flex-1'>
                                    <h3 className='text-xl font-bold text-slate-100 mb-3 line-clamp-2 hover:text-blue-400 transition-colors cursor-pointer'>
                                        {post.title}
                                    </h3>
                                    <p className='text-slate-400 text-sm mb-4 line-clamp-3 flex-1'>
                                        {post.excerpt || post.content?.slice(0, 120) + '...'}
                                    </p>

                                    {/* Tags */}
                                    {post.tags?.length > 0 && (
                                        <div className='flex flex-wrap gap-2 mb-4'>
                                            {post.tags.slice(0, 3).map((tag) => (
                                                <span key={tag} className='px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-md'>
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}

                                    {/* Author & Meta */}
                                    <div className='flex items-center justify-between text-xs text-slate-500'>
                                        <div className='flex items-center gap-2'>
                                            {post.author?.profilePic ? (
                                                <img
                                                    src={getImageUrl(post.author.profilePic)}
                                                    alt={post.author?.username}
                                                    className='w-5 h-5 rounded-full object-cover'
                                                />
                                            ) : (
                                                <div className='w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs'>
                                                    {post.author?.username?.[0]?.toUpperCase()}
                                                </div>
                                            )}
                                            <span>{post.author?.username || 'Anonymous'}</span>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <span>{post.readTime}</span>
                                            <span>•</span>
                                            <span>{post.views} views</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            )}

            {/* No posts message */}
            {!loading && !error && posts.length === 0 && (
                <div className='text-center py-16'>
                    <p className='text-slate-400 text-lg mb-2'>No posts found.</p>
                    <p className='text-slate-500 text-sm'>Try a different category or search term.</p>
                </div>
            )}

            {/* Pagination */}
            {!loading && !error && totalPages > 1 && (
                <div className='flex justify-center items-center gap-2 mt-12'>
                    <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className='px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors'
                    >
                        ← Prev
                    </button>

                    {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1;
                        // Show first, last, current and neighbours
                        if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
                            return (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                                        currentPage === page
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                                    }`}
                                >
                                    {page}
                                </button>
                            );
                        }
                        
                        if (page === currentPage - 2 || page === currentPage + 2) {
                            return <span key={page} className='text-slate-600 px-1'>…</span>;
                        }
                        return null;
                    })}

                    <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className='px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700 transition-colors'
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
};

export default BlogsItems;
