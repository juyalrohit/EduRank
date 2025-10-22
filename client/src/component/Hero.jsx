import React from 'react'
import College from '../assets/maxresdefault.jpg'
import Search from './Search'
import { Link } from 'react-router-dom'





const Hero = () => {
  return (
    <div className='w-[100vw] min-h-screen bg-slate-900 relative sm:mt-22 mt-14 '>

        <div className='overflow-hidden whitespace-nowrap '>
              <h2
                  className="inline-block font-bold text-base text-yellow-300 tracking-wider 
                  animate-[scroll-right-to-left_26s_linear_infinite] 
                  sm:animate-none md:pt-7 md:px-6 p-3 sm:p-6"
                  >
              Find What You Need :
              <span className="ml-2 font-light tracking-widest  text-white">
                Whether you’re a student, faculty, or staff, our platform makes it easy to access the information you need—quickly and efficiently!
              </span>
            </h2>
        </div>

        <h1 id='text-effect' className="font-sans text-xl sm:text-4xl font-extrabold text-white shadow-2xl absolute top-[30%]
           sm:top-[30%] z-50 left-[8%] sm:left-[29%] tracking-tighter
          sm:tracking-wider text-center sm:text-left ">
            EXPLORE DSB CAMPUS ON EduRank
        </h1>


       
        <img className="object-cover w-full h-[93%] sm:h-[90%] absolute  sm:top-[10%] opacity-85 " src={College} alt="College" />

        <Search/>

        <div className='w-full absolute top-[80%] sm:top-[80%] flex flex-row gap-7 sm:gap-60 items-center justify-center '>
          <Link to={'/sendemail'}><button className=' z-20 bg-gradient-to-r from-gray-400 to-gray-600
           hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-950 py-5 cursor-pointer
            sm:5 px-2 sm:px-6 border-white text-white rounded-lg   text-xl sm:text-2xl
           '>Send Email <span><i className="ri-mail-line"></i></span></button></Link>
           
          <Link to={'/courses'} >  <button className='  bg-gradient-to-r from-blue-400 to-blue-600 cursor-pointer p-5 
          hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-900
          sm:5 px-2 sm:px-6 border-white text-white rounded-lg   text-xl sm:text-2xl '>Find Courses <span><i className="ri-graduation-cap-line"></i></span></button></Link>

        </div>

      
        
    </div>
  )
}

export default Hero