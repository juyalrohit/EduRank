import React from 'react'
import Logo from '../assets/logo-print.png'
import { Link } from 'react-router-dom'
import logo3 from '../assets/logo4.png'
import logo from '../assets/logo3.png'

const Foter = () => {
  return (
  
  <div className='w-full min-h-[100vh] sm:min-h-[46vh] bg-slate-900 relative sm:mb-0'>
  <div className='w-full flex  items-center justify-center h-full flex-col gap-4 text-white  '>
            <img className='sm:w-80 w-72 sm:h-45 h-35 sm:mt-5  mt-46  sm:ml-0 ml-24' src={logo} alt="" />
            <p className='tracking-wider sm:block hidden -mt-10'>Your Guide to College, Departments & Teacher</p>
            <p></p>
        </div>

        <div className=' w-full flex justify-evenly sm:px-16 px-4 absolute sm:text-base text-sm sm:top-[85%] top-[90%] text-white'>
           <p className='text-center'>IT Policy</p>
           <p className='text-center'>Copyright © 2025 EduRank. All Rights Reserved</p>
           <p className='text-center'> Privacy Policy</p>
        </div>

    <div className=' absolute top-8 sm:top-12 left-2 sm:left-16 text-white'>
      <h4 class=" font-normal mb-6 sm:font-semibold">Connect With Us</h4>
      <div class="flex gap-5 flex-col text-sm sm:text-base ">
        <a className='hover:text-red-500 ' href="#"><span><i class="ri-arrow-right-double-line"></i></span> Twitter <span><i class="ri-twitter-x-line"></i></span></a>
        <a className='hover:text-red-500' href="#"><span><i class="ri-arrow-right-double-line"></i></span>Linkedin <span><i class="ri-linkedin-box-line"></i></span></a>
        <a className='hover:text-red-500' href=""><span><i class="ri-arrow-right-double-line"></i></span>YouTube <span><i class="ri-youtube-line"></i></span></a>
        <a className='hover:text-red-500' href=""><span><i class="ri-arrow-right-double-line"></i></span>Instagram <span><i class="ri-instagram-line"></i></span></a>
      </div>
    </div>

    <div className=' absolute top-74 sm:top-12 sm:left-[90%] left-2 sm:right-16 text-white'>
      <h4 class=" font-normal mb-6 sm:font-semibold">Quick Links</h4>
      <div class="flex gap-4 flex-col text-sm sm:text-base">
        <Link to={'/'} className='hover:text-red-500 ' href="#"><span><i class="ri-arrow-right-double-line"></i></span> Home </Link>
        <Link to={'/about'} className='hover:text-red-500' href="#"><span><i class="ri-arrow-right-double-line"></i></span>About Us </Link>
        <Link to={'/courses'} className='hover:text-red-500' href=""><span><i class="ri-arrow-right-double-line"></i></span>Courses</Link>
        <Link to={'/contact'} className='hover:text-red-500' href=""><span><i class="ri-arrow-right-double-line"></i></span>Contact</Link>
      </div>
    </div>
    
    </div>
    
    
  )
}

export default Foter;