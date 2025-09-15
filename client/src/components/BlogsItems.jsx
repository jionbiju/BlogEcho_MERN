import React, { useState } from 'react'
import blogData from '../assets/blogData';
import {Link} from 'react-router-dom'
const BlogsItems = () => {
    const categories = ['All', 'Technology', 'Lifestyle', 'Business', 'Travel'];
    const [isactive, setIsActive] = useState('All');

    // Filter blogs based on active category
    const filteredBlogs = isactive === 'All' 
        ? blogData 
        : blogData.filter(blog => blog.category === isactive);

    return (
        <div className='flex-col py-24 max-w-7xl mx-auto px-6'>
            {/* Header Section */}
            <div className='text-center mb-12'>
                <h2 className='text-4xl font-bold text-slate-100 mb-4'>
                    Explore Our <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>Articles</span>
                </h2>
                <p className='text-lg text-slate-400'>
                    Discover content that inspires and informs
                </p>
            </div>

            {/* Category Navigation */}
            <div className='flex justify-center space-x-8 items-center border-b border-slate-800 pb-2 max-w-4xl mx-auto mb-16'>
                {categories.map((category) => {
                    return (
                        <div 
                            key={category} 
                            className={`relative px-6 py-4 font-semibold cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-105 ${isactive === category ?
                                'text-blue-400'
                                :
                                'text-slate-300 hover:text-slate-100'
                            }`} 
                            onClick={() => setIsActive(category)}
                        >
                            {category}
                            
                            {/* Animated underline */}
                            <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500 ease-in-out ${
                                isactive === category ? 'w-full' : 'w-0'
                            }`}></div>
                            
                            {/* Hover effect underline */}
                            <div className={`absolute bottom-0 left-0 h-0.5 bg-slate-500 transition-all duration-300 ease-in-out ${
                                isactive !== category ? 'hover:w-full w-0' : 'w-0'
                            }`}></div>
                        </div>
                    )
                })}
            </div>

            {/* Blog Posts Grid */}
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 '>
                {filteredBlogs.map((blog) => (
                    <Link key={blog.id} to={`/Blogs/${blog.id}`}>
                    <article key={blog.id} className='bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/20'>
                        {/* Blog Image */}
                        <div className='relative overflow-hidden'>
                            <img 
                                src={blog.image} 
                                alt={blog.title}
                                className='w-full h-48 object-cover transition-transform duration-300 hover:scale-105'
                            />
                            <div className='absolute top-4 left-4'>
                                <span className='px-3 py-1 bg-slate-900/80 text-slate-200 text-xs font-medium rounded-full border border-slate-600'>
                                    {blog.category}
                                </span>
                            </div>
                        </div>

                        {/* Blog Content */}
                        <div className='p-6'>
                            {/* Title */}
                            <h3 className='text-xl font-bold text-slate-100 mb-3 line-clamp-2 hover:text-blue-400 transition-colors cursor-pointer'>
                                {blog.title}
                            </h3>

                            {/* Excerpt */}
                            <p className='text-slate-400 text-sm mb-4 line-clamp-3'>
                                {blog.excerpt}
                            </p>

                            {/* Tags */}
                            <div className='flex flex-wrap gap-2 mb-4'>
                                {blog.tags.slice(0, 3).map((tag) => (
                                    <span key={tag} className='px-2 py-1 bg-slate-700 text-slate-300 text-xs rounded-md'>
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Author & Meta Info */}
                            <div className='flex items-center justify-between text-xs text-slate-500 mb-2'>
                                <div className='flex items-center space-x-2'>
                                    
                                    <span>{blog.author.name}</span>
                                </div>
                                <div className='flex items-center space-x-3'>
                                    <span>{blog.readTime}</span>
                                    <span>•</span>
                                    <span>{blog.views} views</span>
                                </div>
                            </div>
                        </div>
                    </article>
                    </Link>
                ))}
            </div>


            {/* No posts message */}
            {filteredBlogs.length === 0 && (
                <div className='text-center py-12'>
                    <p className='text-slate-400 text-lg'>No articles found in this category.</p>
                </div>
            )}
        </div>
    )
}

export default BlogsItems