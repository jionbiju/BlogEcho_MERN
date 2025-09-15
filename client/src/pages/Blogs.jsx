import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import blogData from '../assets/blogData';
import Footer from '../components/Footer';

const Blogs = () => {
    const { id } = useParams();
    
    const blogId = parseInt(id);
    
    
    const blog = blogData.find((blogItem) => blogItem.id === blogId);
    useEffect(() => {
        window.scrollTo(0,0);
    })
    
    if (!blog) {
        return (
            <div className='flex justify-center items-center min-h-screen bg-slate-900'>
                <div className='text-center'>
                    <h2 className='text-2xl font-bold text-slate-100 mb-4'>Blog Post Not Found</h2>
                    <p className='text-slate-400'>The blog post you're looking for doesn't exist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-slate-900 py-24'>
            <div className='max-w-4xl mx-auto px-6'>
                {/* Blog Header */}
                <div className='text-center mb-12'>
                    <div className='mb-6'>
                        <span className='px-4 py-2 bg-slate-800 text-slate-200 text-sm font-medium rounded-full border border-slate-600'>
                            {blog.category}
                        </span>
                    </div>
                    
                    <h1 className='text-4xl md:text-5xl font-bold text-slate-100 mb-6 leading-tight'>
                        {blog.title}
                    </h1>
                    
                    <p className='text-xl text-slate-400 mb-8 max-w-3xl mx-auto'>
                        {blog.excerpt}
                    </p>
                    
                    {/* Author and Meta Info */}
                    <div className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-slate-500'>
                        <div className='flex items-center space-x-3'>
                            <img 
                                src={blog.author.avatar} 
                                alt={blog.author.name}
                                className='w-10 h-10 rounded-full'
                            />
                            <div className='text-left'>
                                <p className='text-slate-300 font-medium'>{blog.author.name}</p>
                                <p className='text-sm'>{blog.author.role}</p>
                            </div>
                        </div>
                        
                        <div className='flex items-center space-x-4 text-sm'>
                            <span>{blog.publishDate}</span>
                            <span>•</span>
                            <span>{blog.readTime}</span>
                            <span>•</span>
                            <span>{blog.views} views</span>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className='mb-12'>
                    <img 
                        src={blog.image} 
                        alt={blog.title}
                        className='w-full h-64 md:h-96 object-cover rounded-xl shadow-2xl'
                    />
                </div>

                {/* Tags */}
                <div className='flex flex-wrap gap-2 mb-8 justify-center'>
                    {blog.tags.map((tag) => (
                        <span key={tag} className='px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-md border border-slate-700'>
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Blog Content */}
                <div className='prose prose-invert prose-lg max-w-none'>
                    <div className='text-slate-300 leading-relaxed text-[20px] whitespace-pre-wrap'>
                        {blog.content}
                    </div>
                </div>

                {/* Engagement Stats */}
                <div className='mt-12 pt-8 border-t border-slate-800'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-6'>
                            <button className='flex items-center space-x-2 text-slate-400 hover:text-blue-400 transition-colors'>
                                <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                                    <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/>
                                </svg>
                                <span>{blog.likes} likes</span>
                            </button>
                            
                            <button className='flex items-center space-x-2 text-slate-400 hover:text-green-400 transition-colors'>
                                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                                </svg>
                                <span>Comment</span>
                            </button>
                        </div>
                        
                        <button className='flex items-center space-x-2 text-slate-400 hover:text-purple-400 transition-colors'>
                            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z' />
                            </svg>
                            <span>Share</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blogs
// import React, { useEffect, useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import blogData from '../assets/blogData';

// const Blogs = () => {
//     const { id } = useParams();
//     const [isLiked, setIsLiked] = useState(false);
//     const [likes, setLikes] = useState(0);
//     const [isScrolled, setIsScrolled] = useState(false);
    
//     const blogId = parseInt(id);
//     const blog = blogData.find((blogItem) => blogItem.id === blogId);
    
//     useEffect(() => {
//         window.scrollTo(0,0);
//         if (blog) {
//             setLikes(blog.likes);
//         }
//     }, [blog]);

//     // Track scroll for floating back button
//     useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 100);
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     const handleLike = () => {
//         setIsLiked(!isLiked);
//         setLikes(prev => isLiked ? prev - 1 : prev + 1);
//     };
    
//     if (!blog) {
//         return (
//             <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
//                 <div className='text-center p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm'>
//                     <div className='w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 flex items-center justify-center'>
//                         <svg className='w-8 h-8 text-red-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                             <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
//                         </svg>
//                     </div>
//                     <h2 className='text-3xl font-bold text-slate-100 mb-4'>Blog Post Not Found</h2>
//                     <p className='text-slate-400 mb-6'>The blog post you're looking for doesn't exist.</p>
//                     <Link to="/blogs" className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105'>
//                         <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                             <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
//                         </svg>
//                         Back to Blogs
//                     </Link>
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className='min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'>
//             {/* Floating Back Button */}
//             <Link 
//                 to="/blogs"
//                 className={`fixed top-6 left-6 z-50 p-3 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-full text-slate-300 hover:text-white hover:bg-slate-700/80 transition-all duration-300 ${
//                     isScrolled ? 'shadow-xl shadow-slate-900/50' : ''
//                 }`}
//             >
//                 <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                     <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
//                 </svg>
//             </Link>

//             {/* Hero Section with Parallax Effect */}
//             <div className='relative overflow-hidden'>
//                 {/* Background Pattern */}
//                 <div className='absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5'></div>
//                 <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-purple-900/20'></div>
                
//                 <div className='relative pt-32 pb-20'>
//                     <div className='max-w-4xl mx-auto px-6'>
//                         {/* Category Badge */}
//                         <div className='text-center mb-8'>
//                             <span className='inline-flex items-center px-4 py-2 bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm text-slate-200 text-sm font-medium rounded-full border border-slate-600/50 shadow-lg'>
//                                 <div className='w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-2 animate-pulse'></div>
//                                 {blog.category}
//                             </span>
//                         </div>
                        
//                         {/* Title */}
//                         <h1 className='text-5xl md:text-7xl font-bold text-center mb-8 leading-tight'>
//                             <span className='bg-gradient-to-r from-slate-100 via-white to-slate-100 bg-clip-text text-transparent'>
//                                 {blog.title}
//                             </span>
//                         </h1>
                        
//                         {/* Excerpt */}
//                         <p className='text-xl md:text-2xl text-center text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light'>
//                             {blog.excerpt}
//                         </p>
                        
//                         {/* Author and Meta Info */}
//                         <div className='flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-12'>
//                             <div className='flex items-center space-x-4'>
//                                 <div className='relative'>
//                                     <img 
//                                         src={blog.author.avatar} 
//                                         alt={blog.author.name}
//                                         className='w-14 h-14 rounded-full border-2 border-slate-600 shadow-lg'
//                                     />
//                                     <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-800'></div>
//                                 </div>
//                                 <div className='text-left'>
//                                     <p className='text-slate-200 font-semibold text-lg'>{blog.author.name}</p>
//                                     <p className='text-slate-400 text-sm'>{blog.author.role}</p>
//                                 </div>
//                             </div>
                            
//                             <div className='flex items-center space-x-6 text-slate-400'>
//                                 <div className='flex items-center space-x-2'>
//                                     <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                         <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
//                                     </svg>
//                                     <span className='font-medium'>{blog.publishDate}</span>
//                                 </div>
//                                 <div className='flex items-center space-x-2'>
//                                     <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                         <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
//                                     </svg>
//                                     <span className='font-medium'>{blog.readTime}</span>
//                                 </div>
//                                 <div className='flex items-center space-x-2'>
//                                     <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                         <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
//                                         <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
//                                     </svg>
//                                     <span className='font-medium'>{blog.views} views</span>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className='max-w-4xl mx-auto px-6 pb-20'>
//                 {/* Featured Image */}
//                 <div className='mb-16 -mt-8 relative'>
//                     <div className='relative overflow-hidden rounded-2xl shadow-2xl shadow-slate-900/50'>
//                         <img 
//                             src={blog.image} 
//                             alt={blog.title}
//                             className='w-full h-64 md:h-96 object-cover transform hover:scale-105 transition-transform duration-700'
//                         />
//                         <div className='absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent'></div>
//                     </div>
//                 </div>

//                 {/* Tags */}
//                 <div className='flex flex-wrap gap-3 mb-12 justify-center'>
//                     {blog.tags.map((tag, index) => (
//                         <span 
//                             key={tag} 
//                             className='px-4 py-2 bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-sm text-slate-300 text-sm rounded-full border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 cursor-pointer hover:transform hover:scale-105'
//                             style={{
//                                 animationDelay: `${index * 100}ms`
//                             }}
//                         >
//                             #{tag}
//                         </span>
//                     ))}
//                 </div>

//                 {/* Blog Content */}
//                 <article className='prose prose-invert prose-xl max-w-none mb-16'>
//                     <div className='bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-slate-700/30 shadow-xl'>
//                         <div className='text-slate-200 leading-relaxed text-lg md:text-xl whitespace-pre-wrap font-light'>
//                             {blog.content}
//                         </div>
//                     </div>
//                 </article>

//                 {/* Engagement Section */}
//                 <div className='bg-gradient-to-r from-slate-800/40 to-slate-700/40 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/30 shadow-xl'>
//                     <div className='flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0'>
//                         <div className='flex items-center space-x-8'>
//                             <button 
//                                 onClick={handleLike}
//                                 className={`flex items-center space-x-3 px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
//                                     isLiked 
//                                         ? 'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/30' 
//                                         : 'bg-slate-700/50 text-slate-400 hover:text-red-400 border border-slate-600/30 hover:border-red-500/30'
//                                 }`}
//                             >
//                                 <svg className={`w-6 h-6 transition-all duration-300 ${isLiked ? 'scale-110' : ''}`} fill={isLiked ? 'currentColor' : 'none'} stroke='currentColor' viewBox='0 0 24 24'>
//                                     <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' />
//                                 </svg>
//                                 <span>{likes} likes</span>
//                             </button>
                            
//                             <button className='flex items-center space-x-3 px-6 py-3 bg-slate-700/50 text-slate-400 hover:text-green-400 rounded-full font-medium transition-all duration-300 transform hover:scale-105 border border-slate-600/30 hover:border-green-500/30'>
//                                 <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                     <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
//                                 </svg>
//                                 <span>Comment</span>
//                             </button>
//                         </div>
                        
//                         <button className='flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-slate-300 hover:text-white rounded-full font-medium transition-all duration-300 transform hover:scale-105 border border-slate-600/30 hover:border-purple-500/50'>
//                             <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
//                                 <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z' />
//                             </svg>
//                             <span>Share Article</span>
//                         </button>
//                     </div>
//                 </div>

//                 {/* Related Articles Section */}
//                 <div className='mt-20'>
//                     <h3 className='text-3xl font-bold text-center mb-12'>
//                         <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
//                             You Might Also Like
//                         </span>
//                     </h3>
                    
//                     <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
//                         {blogData
//                             .filter(item => item.id !== blog.id && item.category === blog.category)
//                             .slice(0, 2)
//                             .map((relatedBlog) => (
//                                 <Link key={relatedBlog.id} to={`/blogs/${relatedBlog.id}`}>
//                                     <article className='group bg-slate-800/30 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/50'>
//                                         <div className='relative overflow-hidden h-48'>
//                                             <img 
//                                                 src={relatedBlog.image} 
//                                                 alt={relatedBlog.title}
//                                                 className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
//                                             />
//                                             <div className='absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
//                                         </div>
//                                         <div className='p-6'>
//                                             <h4 className='text-lg font-semibold text-slate-100 mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors'>
//                                                 {relatedBlog.title}
//                                             </h4>
//                                             <p className='text-slate-400 text-sm line-clamp-2'>
//                                                 {relatedBlog.excerpt}
//                                             </p>
//                                         </div>
//                                     </article>
//                                 </Link>
//                             ))
//                         }
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Blogs