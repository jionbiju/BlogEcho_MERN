import React from 'react'
import hero from '../assets/hero.jpg'

const Hero = () => {
  return (
    <div className='flex justify-between px-20  items-center mt-28'>
      <div className='flex-col items-start justify-center max-w-2xl space-y-6'>
        <div className='inline-block px-4 py-2 bg-slate-800 border border-slate-700 text-blue-400 rounded-full text-sm font-medium mb-4'>
          🚀 Welcome to the Future of Blogging
        </div>
        
        <h1 className='text-6xl font-bold text-slate-100 leading-tight'>
          Welcome to 
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'> BlogEcho</span>
        </h1>
        
        <h2 className='text-3xl font-semibold text-slate-300 leading-relaxed'>
          Where Ideas Resonate and Stories Come Alive
        </h2>
        
        <p className='text-xl text-slate-400 leading-relaxed'>
          Discover a world of compelling stories, expert insights, and thought-provoking content. 
          Join our community of writers, thinkers, and readers who are passionate about sharing 
          knowledge and exploring new perspectives that shape our world.
        </p>

        <div className='flex flex-col sm:flex-row gap-6 pt-4'>
          <button className='px-8 py-4 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1 transition-all duration-300'>
            Start Reading
          </button>
          <button className='cursor-pointer px-8 py-4 border-2 border-slate-600 text-slate-300 font-semibold rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all duration-300'>
            Join Our Community
          </button>
        </div>
      </div>
      
      <div className='flex items-center justify-center ml-10'>
        <div className='relative'>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-lg transform rotate-3'></div>
          <img 
            src={hero} 
            className='relative rounded-3xl shadow-2xl shadow-slate-900/50 ' 
            alt="BlogEcho - Modern Blogging Platform" 
            width={700}
          />
        </div>
      </div>
    </div>
  )
}

export default Hero