import hero from '../assets/hero.jpg'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../Context/context'

const Hero = () => {
  const navigate = useNavigate();
  const { isLogin } = useContext(userContext);

  const handleStartReading = () => {
    document.getElementById('blogs-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleJoinCommunity = () => {
    if (isLogin) {
      navigate('/createpost');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className='flex flex-col-reverse lg:flex-row justify-between items-center gap-10 px-4 sm:px-8 lg:px-16 xl:px-24 py-14 sm:py-20 max-w-7xl mx-auto'>

      {/* Text content */}
      <div className='flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl w-full space-y-5'>
        <div className='inline-block px-4 py-2 bg-slate-800 border border-slate-700 text-blue-400 rounded-full text-sm font-medium'>
          🚀 Welcome to the Future of Blogging
        </div>

        <h1 className='text-4xl sm:text-5xl xl:text-6xl font-bold text-slate-100 leading-tight'>
          Welcome to
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'> BlogEcho</span>
        </h1>

        <h2 className='text-xl sm:text-2xl xl:text-3xl font-semibold text-slate-300 leading-relaxed'>
          Where Ideas Resonate and Stories Come Alive
        </h2>

        <p className='text-base sm:text-lg text-slate-400 leading-relaxed'>
          Discover a world of compelling stories, expert insights, and thought-provoking content.
          Join our community of writers, thinkers, and readers who are passionate about sharing
          knowledge and exploring new perspectives that shape our world.
        </p>

        <div className='flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto'>
          <button
            onClick={handleStartReading}
            className='px-8 py-4 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/25 hover:-translate-y-1 transition-all duration-300'
          >
            Start Reading
          </button>
          <button
            onClick={handleJoinCommunity}
            className='cursor-pointer px-8 py-4 border-2 border-slate-600 text-slate-300 font-semibold rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all duration-300'
          >
            {isLogin ? 'Write a Post' : 'Join Our Community'}
          </button>
        </div>
      </div>

      {/* Hero image — hidden on small, visible from lg */}
      <div className='hidden lg:flex items-center justify-center flex-shrink-0 w-full lg:w-auto'>
        <div className='relative'>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-lg transform rotate-3' />
          <img
            src={hero}
            className='relative rounded-3xl shadow-2xl shadow-slate-900/50 w-full max-w-lg xl:max-w-xl'
            alt="BlogEcho - Modern Blogging Platform"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
