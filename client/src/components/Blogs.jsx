// import React, { useState } from 'react'

// const Blogs = () => {
//     const categories=['All','Technology','Lifestyle','Business','Travel'];
//     const [isactive,setIsActive] = useState('All');
//   return (
//     <div className='flex-col py-24'>
//       <div className='flex justify-center space-x-6 items-center'>
//         {categories.map((categories) => {
//             return (
//                 <div key={categories} className={`flex p-5 font-semibold ${isactive===categories?
//                     :
//                 }`} onClick={() => setIsActive(categories)}>
//                     {categories}
//                 </div>
//             )
//         })}
//       </div>
//     </div>
//   )
// }

// export default Blogs

import React, { useState } from 'react'

const Blogs = () => {
    const categories=['All','Technology','Lifestyle','Business','Travel'];
    const [isactive,setIsActive] = useState('All');
  return (
    <div className='flex-col py-24 mt-10'>
      <div className='text-center mb-12'>
        <h2 className='text-4xl font-bold text-slate-100 mb-4'>
          Explore Our <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400'>Articles</span>
        </h2>
        <p className='text-lg text-slate-400'>
          Discover content that inspires and informs
        </p>
      </div>
      
      <div className='flex justify-center space-x-8 items-center border-b border-slate-800 pb-2 max-w-4xl mx-auto'>
        {categories.map((categories) => {
            return (
                <div 
                  key={categories} 
                  className={`relative px-6 py-4 font-semibold cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-105 ${isactive===categories?
                    'text-blue-400'
                    :
                    'text-slate-300 hover:text-slate-100'
                  }`} 
                  onClick={() => setIsActive(categories)}
                >
                    {categories}
                    
                  
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500 ease-in-out ${
                      isactive===categories ? 'w-full' : 'w-0'
                    }`}></div>
                    
                   
                    <div className={`absolute bottom-0 left-0 h-0.5 bg-slate-500 transition-all duration-300 ease-in-out ${
                      isactive!==categories ? 'hover:w-full w-0' : 'w-0'
                    }`}></div>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default Blogs