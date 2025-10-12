import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo1 from '../assets/ku-red-small-logo-1.webp';
import logo2 from '../assets/logo2.png'
import logo3 from '../assets/logo3.png'
import logo4 from '../assets/logo4.png'

import DropDown from '../feature/DropDown';
import { useAuth } from '../context/AuthContext';
import { useFormState } from 'react-dom';
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import {motion} from 'framer-motion'
const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated ,backendURL} = useAuth();
  const [isOpen, setisOpen] = useState(false)



  
  
  const handleLogOut = async () => {
    try {
      await axios.get(backendURL + '/user/logout-user', { withCredentials: true });
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error("LogOut failed!!", error.response?.data || error.message);
    }
  };

  return (
    <>
    <motion.div
      initial={{y:-30,opacity:0}}
      whileInView={{y:0,opacity:1}}
      transition={{duration:0.75,ease:'easeInOut',delay:0.4}}

     className="fixed top-0 left-0 w-screen md:w-full z-99 
     md:h-22 flex md:justify-normal items-center justify-between md:p-7 
      border-black-400 bg-white md:z-99  shadow-sm">
      <img
            className="w-40 h-16 mt-[-10px]   md:w-80 md:h-32  md:ml-[-30px]  md:mt-[-16px]"
            src={logo3}
            alt="Logo"
/>
      <div className="hidden md:flex w-full gap-20 items-center ml-120 justify-end ">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>

        {/* <DropDown
          
          navElement="Services"
          features={[
            { name: 'Send Email', url: '/sendemail' },
            { name: 'Find Courses', url: '/courses' },
            { name: 'Rating', url: '/rating' },
          ]}
        /> */}

        <Link to="/contact" className="nav-link">
          Contact
        </Link>

        {isAuthenticated ? (
          <button
            onClick={handleLogOut}
            className="btn px-4 py-2 bg-red-500 text-white rounded-lg hover:-translate-y-1.5 transition-transform duration-300"
          >
            Log Out
          </button>
        ) : (
          <Link to="/login" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:-translate-y-1.5 transition-transform duration-300">
            Sign Up
          </Link>
        )}

</div>

         {/* Hamburger Icon */}
         <div className="md:hidden pr-4 z-99">
          {isOpen ? (
            <RiCloseLine
              className="text-3xl cursor-pointer"
              onClick={() => setisOpen(false)}
            />
          ) : (
            <RiMenu3Line
              className="text-3xl cursor-pointer"
              onClick={() => setisOpen(true)}
            />
          )}
        </div>


    </motion.div>

    {isOpen && (
        <div className="fixed top-14 left-[40%] w-full  bg-white  flex flex-col items-start  gap-6 pt-12 pl-6 transition-all overflow-hidden z-99">
          <Link onClick={() => setisOpen(false)} className="nav-link" to="/">Home</Link>
          <Link onClick={() => setisOpen(false)} className="nav-link" to="/about">About</Link>
          <Link onClick={() => setisOpen(false)} className="nav-link" to="/sendemail">Send Email</Link>
          <Link onClick={() => setisOpen(false)} className="nav-link" to="/courses">Courses</Link>
          <Link onClick={() => setisOpen(false)} className="nav-link" to="/rating">Rating</Link>
          <Link onClick={() => setisOpen(false)} className="nav-link" to="/contact">Contact</Link>
          
          {isAuthenticated ? (
            <button
              onClick={() => {
                handleLogOut();
                setisOpen(false);
              }}
              className="pb-2"
            >
              Log Out
            </button>
          ) : (
            <Link
              onClick={() => setisOpen(false)}
              to="/login"
              className="pb-2 underline"
            >
              Sign Up
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
